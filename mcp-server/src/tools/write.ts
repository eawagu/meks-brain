import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { query } from "../db.js";
import { embed, embeddingText } from "../embeddings.js";
import { config } from "../config.js";
import { gitCommit } from "../git.js";
import type { ToolDef } from "./types.js";

// ─── Shared helpers ────────────────────────────────────────────

function buildMarkdown(frontmatter: Record<string, any>, body: string): string {
  const yaml = Object.entries(frontmatter)
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        return `${k}:\n${v.map((item) => `  - ${JSON.stringify(item)}`).join("\n")}`;
      }
      if (typeof v === "string" && (v.includes(":") || v.includes("#") || v.includes("'"))) {
        return `${k}: "${v.replace(/"/g, '\\"')}"`;
      }
      return `${k}: ${v}`;
    })
    .join("\n");

  return `---\n${yaml}\n---\n\n${body}`;
}

function sanitizeFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const VALID_TYPES = [
  "entity",
  "concept",
  "source",
  "synthesis",
  "commitment",
  "source-config",
  "config",
  "situation",
];

function validateTypes(types: string[]): void {
  for (const t of types) {
    if (!VALID_TYPES.includes(t)) {
      throw new Error(`Invalid page type: "${t}". Valid types: ${VALID_TYPES.join(", ")}`);
    }
  }
}

function validateFrontmatter(fm: Record<string, any>, types: string[]): void {
  // Commitment-specific required fields
  if (types.includes("commitment")) {
    for (const f of ["owner", "due", "status"]) {
      if (!fm[f]) throw new Error(`Commitment pages require frontmatter field: ${f}`);
    }
    const validStatuses = ["open", "fulfilled", "broken", "cancelled"];
    if (fm.status && !validStatuses.includes(fm.status)) {
      throw new Error(`Commitment status must be one of: ${validStatuses.join(", ")}`);
    }
  }

  // Synthesis-specific
  if (types.includes("synthesis")) {
    if (fm.coverage && !["high", "medium", "low"].includes(fm.coverage)) {
      throw new Error("Synthesis coverage must be: high, medium, or low");
    }
    if (fm.status) {
      const validStatuses = ["draft", "current", "superseded"];
      if (!validStatuses.includes(fm.status)) {
        throw new Error(`Synthesis status must be one of: ${validStatuses.join(", ")}`);
      }
    }
  }

  // Situation-specific
  if (types.includes("situation")) {
    for (const f of ["status", "accountability", "role"]) {
      if (!fm[f]) throw new Error(`Situation pages require frontmatter field: ${f}`);
    }
    const validStatuses = ["developing", "stable", "resolving", "retired"];
    if (!validStatuses.includes(fm.status)) {
      throw new Error(`Situation status must be one of: ${validStatuses.join(", ")}`);
    }
  }

  // Prevent commitment-only fields on non-commitment/non-situation pages
  // "role" and "accountability" are shared between commitment and situation
  const commitmentExclusiveFields = ["owner", "counterparty", "due"];
  const sharedCommitSituationFields = ["role", "accountability"];
  if (!types.includes("commitment")) {
    for (const f of commitmentExclusiveFields) {
      if (fm[f] !== undefined) {
        throw new Error(`Field "${f}" is only valid on commitment pages`);
      }
    }
  }
  if (!types.includes("commitment") && !types.includes("situation")) {
    for (const f of sharedCommitSituationFields) {
      if (fm[f] !== undefined) {
        throw new Error(`Field "${f}" is only valid on commitment or situation pages`);
      }
    }
  }

  // status field — valid on commitment, synthesis, and situation only
  if (fm.status && !types.includes("commitment") && !types.includes("synthesis") && !types.includes("situation")) {
    throw new Error('Field "status" is only valid on commitment, synthesis, or situation pages');
  }

  // Source-specific
  if (types.includes("source") && !fm.source_path) {
    throw new Error("Source pages require frontmatter field: source_path");
  }
  if (!types.includes("source") && fm.source_path !== undefined) {
    throw new Error('Field "source_path" is only valid on source pages');
  }
}

async function syncToPostgres(
  title: string,
  filePath: string,
  types: string[],
  frontmatter: Record<string, any>,
  body: string,
  summary: string | null,
  createdAt: string,
  updatedAt: string
): Promise<number> {
  // Generate embedding
  const embText = embeddingText(title, summary, body);
  const embedding = await embed(embText);
  const embeddingLiteral = `[${embedding.join(",")}]`;

  const result = await query(
    `INSERT INTO pages (title, file_path, type, frontmatter, body, summary, embedding, created_at, updated_at, indexed_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7::vector, $8, $9, NOW())
     ON CONFLICT (title) DO UPDATE SET
       file_path = EXCLUDED.file_path,
       type = EXCLUDED.type,
       frontmatter = EXCLUDED.frontmatter,
       body = EXCLUDED.body,
       summary = EXCLUDED.summary,
       embedding = EXCLUDED.embedding,
       updated_at = EXCLUDED.updated_at,
       deleted = FALSE,
       indexed_at = NOW()
     RETURNING id`,
    [title, filePath, types, frontmatter, body, summary, embeddingLiteral, createdAt, updatedAt]
  );

  return result.rows[0].id;
}

// ─── create_page ───────────────────────────────────────────────
export const createPage: ToolDef = {
  name: "create_page",
  description:
    "Create a new brain page. Writes the markdown file to the vault and syncs to Postgres with embedding. Validates frontmatter against the schema.",
  schema: z.object({
    title: z.string().describe("Page title (must be unique)"),
    type: z
      .array(z.string())
      .min(1)
      .describe("Page type array, primary type first"),
    body: z.string().describe("Markdown body content (no frontmatter)"),
    frontmatter: z
      .record(z.any())
      .optional()
      .default({})
      .describe(
        "Additional frontmatter fields beyond title/type/created/updated (e.g., owner, due, source_path)"
      ),
    summary: z
      .string()
      .optional()
      .describe("One-sentence summary for the page"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { title, type: types, body, frontmatter: extraFm, summary } = params;

    validateTypes(types);

    const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    const fullFm: Record<string, any> = {
      title,
      type: types,
      cssclasses: [types[0]],
      ...extraFm,
      created: now,
      updated: now,
    };
    if (summary) fullFm.summary = summary;

    validateFrontmatter(fullFm, types);

    // Check for duplicate
    const existing = await query(
      "SELECT id FROM pages WHERE title = $1 AND deleted = FALSE",
      [title]
    );
    if (existing.rows.length > 0) {
      throw new Error(`Page with title "${title}" already exists (id: ${existing.rows[0].id})`);
    }

    // Write markdown file
    const filename = `${sanitizeFilename(title)}.md`;
    const filePath = path.join(config.memoryPath, filename);

    const markdown = buildMarkdown(fullFm, body);
    await fs.writeFile(filePath, markdown, "utf-8");

    // Sync to Postgres
    const relPath = filename;
    const pageId = await syncToPostgres(
      title,
      relPath,
      types,
      fullFm,
      body,
      summary || null,
      now,
      now
    );

    // Check for orphan (no inbound links in any other page body)
    const linkPattern = `[[${title}]]`;
    const linkCheck = await query(
      "SELECT COUNT(*) AS count FROM pages WHERE body LIKE $1 AND title != $2 AND deleted = FALSE",
      [`%${linkPattern}%`, title]
    );
    const isOrphan = parseInt(linkCheck.rows[0].count) === 0;

    // Git commit
    await gitCommit(`create: ${title} (${types.join(", ")})`);

    return {
      id: pageId,
      title,
      file_path: relPath,
      orphan: isOrphan,
      message: `Created page "${title}" (${types.join(", ")})${isOrphan ? " [orphan — no inbound links]" : ""}`,
    };
  },
};

// ─── update_page ───────────────────────────────────────────────
export const updatePage: ToolDef = {
  name: "update_page",
  description:
    "Update an existing brain page. Rewrites the markdown file and re-syncs to Postgres with fresh embedding. Pass the complete body — this is a full replace, not a patch.",
  schema: z.object({
    title: z.string().describe("Page title (exact match to existing page)"),
    body: z.string().describe("New complete markdown body"),
    frontmatter_updates: z
      .record(z.any())
      .optional()
      .default({})
      .describe("Frontmatter fields to update (merged with existing)"),
    summary: z
      .string()
      .optional()
      .describe("Updated summary (omit to keep existing)"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { title, body, frontmatter_updates, summary } = params;

    // Fetch existing page
    const existing = await query(
      "SELECT id, file_path, type, frontmatter, summary FROM pages WHERE title = $1 AND deleted = FALSE",
      [title]
    );
    if (existing.rows.length === 0) {
      throw new Error(`Page "${title}" not found`);
    }

    const page = existing.rows[0];
    const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

    // Merge frontmatter
    const mergedFm: Record<string, any> = {
      ...page.frontmatter,
      ...frontmatter_updates,
      updated: now,
    };

    const types = mergedFm.type || page.type;
    validateTypes(types);
    validateFrontmatter(mergedFm, types);

    const effectiveSummary = summary ?? page.summary;
    if (effectiveSummary) mergedFm.summary = effectiveSummary;

    // Write file
    const filePath = path.join(config.memoryPath, page.file_path);
    const markdown = buildMarkdown(mergedFm, body);
    await fs.writeFile(filePath, markdown, "utf-8");

    // Sync to Postgres
    const pageId = await syncToPostgres(
      title,
      page.file_path,
      types,
      mergedFm,
      body,
      effectiveSummary,
      mergedFm.created,
      now
    );

    // Git commit
    await gitCommit(`update: ${title}`);

    return {
      id: pageId,
      title,
      file_path: page.file_path,
      message: `Updated page "${title}"`,
    };
  },
};

// ─── delete_page ───────────────────────────────────────────────
export const deletePage: ToolDef = {
  name: "delete_page",
  description:
    "Soft-delete a brain page. Marks as deleted in Postgres and moves the file to .trash/ in the vault. Recoverable.",
  schema: z.object({
    title: z.string().describe("Page title to delete"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { title } = params;

    const existing = await query(
      "SELECT id, file_path FROM pages WHERE title = $1 AND deleted = FALSE",
      [title]
    );
    if (existing.rows.length === 0) {
      throw new Error(`Page "${title}" not found`);
    }

    const page = existing.rows[0];

    // Soft delete in Postgres
    await query("UPDATE pages SET deleted = TRUE, indexed_at = NOW() WHERE id = $1", [page.id]);

    // Move file to .trash/
    const trashDir = path.join(config.vaultPath, ".trash");
    await fs.mkdir(trashDir, { recursive: true });
    const src = path.join(config.memoryPath, page.file_path);
    const dest = path.join(trashDir, page.file_path);
    try {
      await fs.rename(src, dest);
    } catch {
      // File may not exist on disk (index-only page)
    }

    // Git commit
    await gitCommit(`delete: ${title}`);

    return {
      id: page.id,
      title,
      message: `Deleted page "${title}" (moved to .trash/)`,
    };
  },
};

// ─── mark_processed ────────────────────────────────────────────
export const markProcessed: ToolDef = {
  name: "mark_processed",
  description:
    "Record that an ingress source file has been processed. Updates the scan state and ingested_sources table. Called after express or full ingest completes for a file.",
  schema: z.object({
    file_path: z
      .string()
      .describe("Relative path of the source file in the ingress folder"),
    file_modified: z
      .string()
      .describe("ISO-8601 filesystem modification timestamp of the source file"),
    page_id: z
      .number()
      .int()
      .optional()
      .describe("ID of the source page created from this file"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { file_path, file_modified, page_id } = params;

    // Upsert ingested source
    await query(
      `INSERT INTO ingested_sources (file_path, file_modified, ingested_at, page_id)
       VALUES ($1, $2, NOW(), $3)
       ON CONFLICT (file_path) DO UPDATE SET
         file_modified = EXCLUDED.file_modified,
         ingested_at = NOW(),
         page_id = COALESCE(EXCLUDED.page_id, ingested_sources.page_id)`,
      [file_path, file_modified, page_id || null]
    );

    // Update scan timestamp
    await query(
      `UPDATE scan_state SET value = NOW() WHERE key = 'last_ingress_scan'`
    );

    return {
      file_path,
      message: `Marked "${file_path}" as processed`,
    };
  },
};

// ─── append_log ────────────────────────────────────────────────
export const appendLog: ToolDef = {
  name: "append_log",
  description:
    "Append an entry to the brain's log.md. Follows the standard log format: timestamp, operation type, source, pages created/updated, cross-references, contradictions.",
  schema: z.object({
    operation_type: z
      .enum([
        "express-ingest",
        "full-ingest",
        "inbox-processing",
        "structural-lint",
        "judgment-lint",
        "synthesis-created",
        "config-updated",
      ])
      .describe("Operation type"),
    source: z.string().describe("Source filename or description"),
    pages_created: z.array(z.string()).default([]).describe("Titles of pages created"),
    pages_updated: z.array(z.string()).default([]).describe("Titles of pages updated"),
    cross_references: z
      .array(z.string())
      .default([])
      .describe("Cross-references discovered"),
    contradictions: z
      .array(z.string())
      .default([])
      .describe("Contradictions flagged"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const {
      operation_type,
      source,
      pages_created,
      pages_updated,
      cross_references,
      contradictions,
    } = params;

    const now = new Date();
    const timestamp = now.toISOString().replace("T", " ").replace(/\.\d+Z/, " UTC");

    const entry = [
      `\n## ${timestamp} — ${operation_type}\n`,
      `**Source:** ${source}`,
      `**Created:** ${pages_created.length > 0 ? pages_created.join(", ") : "none"}`,
      `**Updated:** ${pages_updated.length > 0 ? pages_updated.join(", ") : "none"}`,
      `**Cross-references discovered:** ${cross_references.length > 0 ? cross_references.join(", ") : "none"}`,
      `**Contradictions flagged:** ${contradictions.length > 0 ? contradictions.join(", ") : "none"}`,
    ].join("\n");

    await fs.appendFile(config.logPath, entry + "\n", "utf-8");

    // Git commit (log entries are lightweight — commit bundles with the operation that triggered them)
    await gitCommit(`log: ${operation_type} — ${source}`);

    return {
      message: `Logged ${operation_type} for "${source}"`,
      timestamp,
    };
  },
};

// ─── append_to_inbox ──────────────────────────────────────────
export const appendToInbox: ToolDef = {
  name: "append_to_inbox",
  description:
    "Append raw text to the brain's inbox.md for the ingest pipeline to process. No format constraints, no Postgres sync — pure capture.",
  schema: z.object({
    content: z.string().describe("Raw text content to append"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { content } = params;
    const timestamp = new Date().toISOString();
    await fs.appendFile(config.inboxPath, `\n${content}\n`, "utf-8");
    return { message: "Appended to inbox.md", timestamp };
  },
};

export const writeTools = [createPage, updatePage, deletePage, markProcessed, appendLog, appendToInbox];
