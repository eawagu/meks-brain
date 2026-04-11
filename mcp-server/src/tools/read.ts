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

export const readTools = [search, getPage, listCommitments, getStats, checkIngress];
