import { z } from "zod";
import { query } from "../db.js";
import { embed } from "../embeddings.js";
import type { ToolDef } from "./types.js";

// ─── search ────────────────────────────────────────────────────
export const search: ToolDef = {
  name: "search",
  description:
    "Hybrid search across all brain pages using Reciprocal Rank Fusion (BM25 full-text + pgvector cosine similarity). Returns ranked results with title, type, summary, body snippet, and relevance scores.",
  schema: z.object({
    query: z.string().describe("Natural language search query"),
    type_filter: z
      .array(z.string())
      .optional()
      .describe(
        "Filter results to specific page types (e.g., ['entity', 'concept'])"
      ),
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .default(10)
      .describe("Maximum number of results (default 10, max 50)"),
  }),
  accessLevel: "read",
  handler: async (params) => {
    const { query: q, type_filter, limit } = params;

    // Generate embedding for the query
    const queryEmbedding = await embed(q);
    const embeddingLiteral = `[${queryEmbedding.join(",")}]`;

    const result = await query(
      `SELECT id, title, file_path, type, summary,
              LEFT(body, 500) AS body_snippet,
              frontmatter,
              rrf_score, text_rank, vector_similarity
       FROM hybrid_search($1, $2::vector, $3, 60, $4)`,
      [q, embeddingLiteral, limit, type_filter || null]
    );

    return {
      count: result.rows.length,
      results: result.rows.map((r) => ({
        id: r.id,
        title: r.title,
        file_path: r.file_path,
        type: r.type,
        summary: r.summary,
        body_snippet: r.body_snippet,
        rrf_score: parseFloat(r.rrf_score),
        text_rank: parseFloat(r.text_rank),
        vector_similarity: parseFloat(r.vector_similarity),
      })),
    };
  },
};

// ─── get_page ──────────────────────────────────────────────────
export const getPage: ToolDef = {
  name: "get_page",
  description:
    "Retrieve a single brain page by title or ID. Returns full content including frontmatter, body, and metadata.",
  schema: z.object({
    title: z.string().optional().describe("Page title (exact match)"),
    id: z.number().int().optional().describe("Page ID"),
  }),
  accessLevel: "read",
  handler: async (params) => {
    const { title, id } = params;
    if (!title && !id) {
      throw new Error("Either title or id is required");
    }

    const result = title
      ? await query(
          `SELECT id, title, file_path, type, frontmatter, body, summary,
                  created_at, updated_at
           FROM pages WHERE title = $1 AND deleted = FALSE`,
          [title]
        )
      : await query(
          `SELECT id, title, file_path, type, frontmatter, body, summary,
                  created_at, updated_at
           FROM pages WHERE id = $1 AND deleted = FALSE`,
          [id]
        );

    if (result.rows.length === 0) {
      return { found: false, page: null };
    }

    const p = result.rows[0];
    return {
      found: true,
      page: {
        id: p.id,
        title: p.title,
        file_path: p.file_path,
        type: p.type,
        frontmatter: p.frontmatter,
        body: p.body,
        summary: p.summary,
        created_at: p.created_at,
        updated_at: p.updated_at,
      },
    };
  },
};

// ─── list_commitments ──────────────────────────────────────────
export const listCommitments: ToolDef = {
  name: "list_commitments",
  description:
    "List commitment pages, optionally filtered by status. Returns commitments ordered by due date.",
  schema: z.object({
    status: z
      .enum(["open", "fulfilled", "broken", "cancelled"])
      .optional()
      .describe("Filter by commitment status (default: all)"),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(20)
      .describe("Maximum number of results (default 20)"),
  }),
  accessLevel: "read",
  handler: async (params) => {
    const { status, limit } = params;

    const conditions = ["'commitment' = ANY(type)", "deleted = FALSE"];
    const values: any[] = [];

    if (status) {
      values.push(status);
      conditions.push(`frontmatter->>'status' = $${values.length}`);
    }

    values.push(limit);
    const result = await query(
      `SELECT id, title, frontmatter, summary, created_at, updated_at
       FROM pages
       WHERE ${conditions.join(" AND ")}
       ORDER BY (frontmatter->>'due')::date ASC NULLS LAST
       LIMIT $${values.length}`,
      values
    );

    return {
      count: result.rows.length,
      commitments: result.rows.map((r) => ({
        id: r.id,
        title: r.title,
        owner: r.frontmatter.owner,
        counterparty: r.frontmatter.counterparty,
        role: r.frontmatter.role,
        accountability: r.frontmatter.accountability,
        due: r.frontmatter.due,
        status: r.frontmatter.status,
        summary: r.summary,
        updated_at: r.updated_at,
      })),
    };
  },
};

// ─── get_stats ─────────────────────────────────────────────────
export const getStats: ToolDef = {
  name: "get_stats",
  description:
    "Brain statistics: page counts by type, recently updated pages, and open commitment count.",
  schema: z.object({}),
  accessLevel: "read",
  handler: async () => {
    const [typeCounts, recent, openCommitments] = await Promise.all([
      query(
        `SELECT unnest(type) AS page_type, COUNT(*) AS count
         FROM pages WHERE deleted = FALSE
         GROUP BY page_type ORDER BY count DESC`
      ),
      query(
        `SELECT id, title, type, updated_at
         FROM pages WHERE deleted = FALSE
         ORDER BY updated_at DESC LIMIT 10`
      ),
      query(
        `SELECT COUNT(*) AS count FROM pages
         WHERE 'commitment' = ANY(type)
           AND deleted = FALSE
           AND frontmatter->>'status' = 'open'`
      ),
    ]);

    return {
      page_counts: typeCounts.rows.map((r) => ({
        type: r.page_type,
        count: parseInt(r.count),
      })),
      recently_updated: recent.rows.map((r) => ({
        id: r.id,
        title: r.title,
        type: r.type,
        updated_at: r.updated_at,
      })),
      open_commitments: parseInt(openCommitments.rows[0].count),
    };
  },
};

// ─── check_ingress ─────────────────────────────────────────────
export const checkIngress: ToolDef = {
  name: "check_ingress",
  description:
    "Check the ingress folder scan state: last scan timestamp and count of ingested sources. Used by the heartbeat to determine if a scan is needed.",
  schema: z.object({}),
  accessLevel: "read",
  handler: async () => {
    const [scanState, ingestedCount] = await Promise.all([
      query(`SELECT value FROM scan_state WHERE key = 'last_ingress_scan'`),
      query(`SELECT COUNT(*) AS count FROM ingested_sources`),
    ]);

    return {
      last_ingress_scan: scanState.rows[0]?.value || null,
      total_ingested_sources: parseInt(ingestedCount.rows[0].count),
    };
  },
};

// ─── triage ───────────────────────────────────────────────────
export const triage: ToolDef = {
  name: "triage",
  description:
    "Load the daily briefing triage session. Returns the triage protocol (config-triage), briefing format (config-briefing), user config (config-user), and today's briefing page. Call this when the user wants to triage their briefing.",
  schema: z.object({
    date: z
      .string()
      .optional()
      .describe(
        "Override date in YYYY-MM-DD format to triage a past briefing. Defaults to today in user's configured timezone."
      ),
  }),
  accessLevel: "read",
  handler: async (params) => {
    const { date } = params;

    // Load config pages
    const configPages = await query(
      `SELECT title, type, frontmatter, body, summary, updated_at
       FROM pages
       WHERE title = ANY($1)
         AND deleted = FALSE
         AND 'config' = ANY(type)`,
      [["config-triage", "config-briefing", "config-user"]]
    );

    const configs: Record<string, any> = {};
    for (const row of configPages.rows) {
      configs[row.title] = {
        title: row.title,
        type: row.type,
        frontmatter: row.frontmatter,
        body: row.body,
        summary: row.summary,
        updated_at: row.updated_at,
      };
    }

    // Determine briefing date
    let briefingDate = date;
    if (!briefingDate) {
      // Read timezone from config-user, default to UTC
      const tz =
        configs["config-user"]?.body?.match(
          /Current timezone:\s*`([^`]+)`/
        )?.[1] || "UTC";
      briefingDate = new Date().toLocaleDateString("en-CA", {
        timeZone: tz,
      }); // en-CA gives YYYY-MM-DD
    }

    const briefingTitle = `briefing-${briefingDate}`;

    // Load today's briefing page
    const briefingResult = await query(
      `SELECT id, title, file_path, type, frontmatter, body, summary,
              created_at, updated_at
       FROM pages
       WHERE title = $1
         AND deleted = FALSE`,
      [briefingTitle]
    );

    const briefingPage =
      briefingResult.rows.length > 0
        ? {
            id: briefingResult.rows[0].id,
            title: briefingResult.rows[0].title,
            file_path: briefingResult.rows[0].file_path,
            type: briefingResult.rows[0].type,
            frontmatter: briefingResult.rows[0].frontmatter,
            body: briefingResult.rows[0].body,
            summary: briefingResult.rows[0].summary,
            created_at: briefingResult.rows[0].created_at,
            updated_at: briefingResult.rows[0].updated_at,
          }
        : null;

    return {
      briefing_date: briefingDate,
      briefing_page: briefingPage,
      config_triage: configs["config-triage"] || null,
      config_briefing: configs["config-briefing"] || null,
      config_user: configs["config-user"] || null,
      missing_configs: ["config-triage", "config-briefing", "config-user"].filter(
        (c) => !configs[c]
      ),
    };
  },
};

// ─── lint_queries ─────────────────────────────────────────────
export const lintQueries: ToolDef = {
  name: "lint_queries",
  description:
    "Run structured judgment-lint queries against the brain. Returns candidates for review ranked by relevance (occurrence count for concept_gaps, source count for synthesis_candidates, gap_days for stale queries). No fixed quality thresholds — AI judges each candidate per-item. Used by the judgment-lint scheduled task and on-demand analysis.",
  schema: z.object({
    query_type: z
      .enum([
        "stale_claims",
        "concept_gaps",
        "synthesis_candidates",
        "stale_syntheses",
      ])
      .describe(
        "Which lint check to run: stale_claims (entity/concept pages outdated by newer sources), concept_gaps (wiki-linked terms without their own page), synthesis_candidates (pages with many source references but no synthesis), stale_syntheses (syntheses outdated by newer related pages)"
      ),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(50)
      .describe("Maximum number of results — cost cap, not a quality threshold (default 50)"),
  }),
  accessLevel: "read",
  handler: async (params) => {
    const { query_type, limit } = params;

    switch (query_type) {
      case "stale_claims": {
        const result = await query(
          `SELECT p.id, p.title, p.type, p.updated_at AS page_updated,
                  MAX(s.updated_at) AS newest_source_updated,
                  EXTRACT(DAY FROM MAX(s.updated_at) - p.updated_at)::int AS gap_days
           FROM pages p
           JOIN pages s ON s.body LIKE '%[[' || p.title || ']]%'
             AND 'source' = ANY(s.type) AND s.deleted = FALSE
           WHERE p.deleted = FALSE
             AND (p.type && ARRAY['entity','concept'])
           GROUP BY p.id, p.title, p.type, p.updated_at
           HAVING MAX(s.updated_at) > p.updated_at
           ORDER BY EXTRACT(DAY FROM MAX(s.updated_at) - p.updated_at) DESC
           LIMIT $1`,
          [limit]
        );
        return {
          query_type,
          count: result.rows.length,
          results: result.rows.map((r) => ({
            id: r.id,
            title: r.title,
            type: r.type,
            page_updated: r.page_updated,
            newest_source_updated: r.newest_source_updated,
            gap_days: r.gap_days,
          })),
        };
      }

      case "concept_gaps": {
        const result = await query(
          `WITH links AS (
             SELECT DISTINCT
               (regexp_matches(body, '\\[\\[([^\\]]+)\\]\\]', 'g'))[1] AS term,
               id AS page_id
             FROM pages WHERE deleted = FALSE
           )
           SELECT l.term, COUNT(DISTINCT l.page_id) AS occurrence_count,
                  (ARRAY_AGG(DISTINCT p.title ORDER BY p.title))[1:5] AS sample_pages
           FROM links l
           LEFT JOIN pages existing ON existing.title = l.term AND existing.deleted = FALSE
           JOIN pages p ON p.id = l.page_id
           WHERE existing.id IS NULL
           GROUP BY l.term
           ORDER BY COUNT(DISTINCT l.page_id) DESC
           LIMIT $1`,
          [limit]
        );
        return {
          query_type,
          count: result.rows.length,
          results: result.rows.map((r) => ({
            term: r.term,
            occurrence_count: parseInt(r.occurrence_count),
            sample_pages: r.sample_pages,
          })),
        };
      }

      case "synthesis_candidates": {
        const result = await query(
          `SELECT p.id, p.title, p.type, COUNT(DISTINCT s.id) AS source_count
           FROM pages p
           JOIN pages s ON s.body LIKE '%[[' || p.title || ']]%'
             AND 'source' = ANY(s.type) AND s.deleted = FALSE
           WHERE p.deleted = FALSE
             AND (p.type && ARRAY['entity','concept'])
             AND NOT EXISTS (
               SELECT 1 FROM pages syn
               WHERE 'synthesis' = ANY(syn.type)
                 AND syn.deleted = FALSE
                 AND syn.body LIKE '%[[' || p.title || ']]%'
             )
           GROUP BY p.id, p.title, p.type
           ORDER BY COUNT(DISTINCT s.id) DESC
           LIMIT $1`,
          [limit]
        );
        return {
          query_type,
          count: result.rows.length,
          results: result.rows.map((r) => ({
            id: r.id,
            title: r.title,
            type: r.type,
            source_count: parseInt(r.source_count),
          })),
        };
      }

      case "stale_syntheses": {
        const result = await query(
          `WITH syn_refs AS (
             SELECT s.id AS synthesis_id, s.title AS synthesis_title,
                    s.updated_at AS synthesis_updated,
                    (regexp_matches(s.body, '\\[\\[([^\\]]+)\\]\\]', 'g'))[1] AS ref_title
             FROM pages s
             WHERE 'synthesis' = ANY(s.type) AND s.deleted = FALSE
           )
           SELECT sr.synthesis_id, sr.synthesis_title, sr.synthesis_updated,
                  MAX(p.updated_at) AS newest_related_updated,
                  EXTRACT(DAY FROM MAX(p.updated_at) - sr.synthesis_updated)::int AS gap_days
           FROM syn_refs sr
           JOIN pages p ON p.title = sr.ref_title AND p.deleted = FALSE
           GROUP BY sr.synthesis_id, sr.synthesis_title, sr.synthesis_updated
           HAVING MAX(p.updated_at) > sr.synthesis_updated
           ORDER BY EXTRACT(DAY FROM MAX(p.updated_at) - sr.synthesis_updated) DESC
           LIMIT $1`,
          [limit]
        );
        return {
          query_type,
          count: result.rows.length,
          results: result.rows.map((r) => ({
            synthesis_id: r.synthesis_id,
            synthesis_title: r.synthesis_title,
            synthesis_updated: r.synthesis_updated,
            newest_related_updated: r.newest_related_updated,
            gap_days: r.gap_days,
          })),
        };
      }
    }
  },
};

export const readTools = [search, getPage, listCommitments, getStats, checkIngress, triage, lintQueries];
