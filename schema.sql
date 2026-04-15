-- Brain Index Schema
-- Run this against the Azure Postgres database to initialize the brain's index layer.
-- Postgres is a derived index over the brain vault's markdown files.
-- If this database is lost, it can be rebuilt from the vault files.

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;      -- pgvector for embeddings
CREATE EXTENSION IF NOT EXISTS pg_trgm;     -- trigram index for fuzzy text search

-- ============================================================
-- Core table: every memory page indexed here
-- ============================================================
CREATE TABLE IF NOT EXISTS pages (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL UNIQUE,
    file_path       TEXT NOT NULL UNIQUE,        -- relative path in memory/ (e.g., "stanbic-bank.md")
    type            TEXT[] NOT NULL,              -- array, primary type first
    frontmatter     JSONB NOT NULL DEFAULT '{}', -- full frontmatter as JSON
    body            TEXT NOT NULL DEFAULT '',     -- markdown body (no frontmatter)
    summary         TEXT,                         -- extracted from frontmatter if present
    embedding       vector(1536),                -- text-embedding-3-small output
    created_at      TIMESTAMPTZ NOT NULL,          -- from frontmatter `created` (ISO-8601 UTC)
    updated_at      TIMESTAMPTZ NOT NULL,          -- from frontmatter `updated` (ISO-8601 UTC)
    deleted         BOOLEAN NOT NULL DEFAULT FALSE,
    indexed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Raw content blob for sources labeled retention_label = 'postgres' (Ingress Retention design).
-- Holds the converted-to-markdown raw content alongside the derived source page (pages.body).
-- NULL for source pages with retention_label = 'fs' or 'discard', and for non-source pages.
-- Phase 2 will wire embedding-based semantic search over chunks of this column.
ALTER TABLE pages ADD COLUMN IF NOT EXISTS raw_content TEXT;

-- Full-text search index (BM25 approximation via tsvector)
ALTER TABLE pages ADD COLUMN IF NOT EXISTS tsv tsvector
    GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(body, '')), 'C')
    ) STORED;

CREATE INDEX IF NOT EXISTS idx_pages_tsv ON pages USING GIN (tsv);

-- Vector similarity index (HNSW for 1K-100K scale)
CREATE INDEX IF NOT EXISTS idx_pages_embedding ON pages
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- Type filter index
CREATE INDEX IF NOT EXISTS idx_pages_type ON pages USING GIN (type);

-- Frontmatter JSONB index (for Dataview-style queries)
CREATE INDEX IF NOT EXISTS idx_pages_frontmatter ON pages USING GIN (frontmatter);

-- Updated timestamp index (for recently updated queries)
CREATE INDEX IF NOT EXISTS idx_pages_updated ON pages (updated_at DESC);

-- Soft-delete filter
CREATE INDEX IF NOT EXISTS idx_pages_active ON pages (deleted) WHERE deleted = FALSE;

-- ============================================================
-- Source tracking: which files in the ingress folder have been processed
-- ============================================================
CREATE TABLE IF NOT EXISTS ingested_sources (
    id              BIGSERIAL PRIMARY KEY,
    file_path       TEXT NOT NULL UNIQUE,         -- relative path in OneDrive folder
    file_modified   TIMESTAMPTZ NOT NULL,         -- filesystem modification timestamp at time of ingest
    ingested_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    page_id         BIGINT REFERENCES pages(id)   -- link to the source page created from this file
);

CREATE INDEX IF NOT EXISTS idx_ingested_sources_path ON ingested_sources (file_path);

-- ============================================================
-- Scan state: last scan timestamp for delta detection
-- ============================================================
CREATE TABLE IF NOT EXISTS scan_state (
    key             TEXT PRIMARY KEY,
    value           TIMESTAMPTZ NOT NULL
);

-- Initialize with epoch (first scan processes everything)
INSERT INTO scan_state (key, value)
VALUES ('last_ingress_scan', '1970-01-01T00:00:00Z')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- Audit log: every MCP operation recorded
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_log (
    id              BIGSERIAL PRIMARY KEY,
    timestamp       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    token_id        TEXT,                          -- which token was used (read-only, read-write)
    operation       TEXT NOT NULL,                  -- tool name (search, create_page, etc.)
    params          JSONB,                          -- request parameters
    result_summary  TEXT,                           -- brief outcome
    success         BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON audit_log (timestamp DESC);

-- ============================================================
-- Hybrid search function: Reciprocal Rank Fusion (BM25 + cosine)
-- ============================================================
CREATE OR REPLACE FUNCTION hybrid_search(
    query_text TEXT,
    query_embedding vector(1536),
    match_count INT DEFAULT 10,
    rrf_k INT DEFAULT 60,
    type_filter TEXT[] DEFAULT NULL
)
RETURNS TABLE (
    id BIGINT,
    title TEXT,
    file_path TEXT,
    type TEXT[],
    summary TEXT,
    body TEXT,
    frontmatter JSONB,
    rrf_score FLOAT,
    text_rank FLOAT,
    vector_similarity FLOAT
)
LANGUAGE sql STABLE AS $$
    WITH text_results AS (
        SELECT
            p.id,
            ROW_NUMBER() OVER (ORDER BY ts_rank_cd(p.tsv, websearch_to_tsquery('english', query_text)) DESC) AS rank,
            ts_rank_cd(p.tsv, websearch_to_tsquery('english', query_text)) AS text_rank
        FROM pages p
        WHERE p.deleted = FALSE
          AND p.tsv @@ websearch_to_tsquery('english', query_text)
          AND (type_filter IS NULL OR p.type && type_filter)
        ORDER BY text_rank DESC
        LIMIT match_count * 3
    ),
    vector_results AS (
        SELECT
            p.id,
            ROW_NUMBER() OVER (ORDER BY p.embedding <=> query_embedding) AS rank,
            1 - (p.embedding <=> query_embedding) AS vector_similarity
        FROM pages p
        WHERE p.deleted = FALSE
          AND p.embedding IS NOT NULL
          AND (type_filter IS NULL OR p.type && type_filter)
        ORDER BY p.embedding <=> query_embedding
        LIMIT match_count * 3
    ),
    combined AS (
        SELECT
            COALESCE(t.id, v.id) AS id,
            COALESCE(1.0 / (rrf_k + t.rank), 0.0) + COALESCE(1.0 / (rrf_k + v.rank), 0.0) AS rrf_score,
            COALESCE(t.text_rank, 0.0) AS text_rank,
            COALESCE(v.vector_similarity, 0.0) AS vector_similarity
        FROM text_results t
        FULL OUTER JOIN vector_results v ON t.id = v.id
    )
    SELECT
        p.id,
        p.title,
        p.file_path,
        p.type,
        p.summary,
        p.body,
        p.frontmatter,
        c.rrf_score,
        c.text_rank,
        c.vector_similarity
    FROM combined c
    JOIN pages p ON p.id = c.id
    ORDER BY c.rrf_score DESC
    LIMIT match_count;
$$;
