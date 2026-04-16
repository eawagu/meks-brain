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

// ─── Data-driven type & frontmatter validation ───────────────

interface FieldSpec {
  name: string;
  type: "string" | "string[]" | "date" | "enum";
  values?: string[];
  required: boolean;
}

interface PageTypeConfig {
  commonFields: FieldSpec[];
  types: Map<string, FieldSpec[]>;
}

function parseFieldSpec(line: string): FieldSpec | null {
  // Parse: "- name: type, required|optional" or "- name: enum [v1, v2], required|optional"
  const match = line.match(
    /^-\s+(\w[\w_]*)\s*:\s*(string\[\]|string|date|enum\s*\[([^\]]+)\])\s*,\s*(required|optional)\s*$/
  );
  if (!match) return null;

  const name = match[1];
  const rawType = match[2];
  const required = match[4] === "required";

  if (rawType.startsWith("enum")) {
    const values = match[3].split(",").map((v) => v.trim());
    return { name, type: "enum", values, required };
  }

  return { name, type: rawType as "string" | "string[]" | "date", required };
}

function parsePageTypeConfig(body: string): PageTypeConfig {
  const config: PageTypeConfig = { commonFields: [], types: new Map() };
  let currentSection: string | null = null;

  for (const line of body.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      currentSection = heading[1].trim().toLowerCase();
      if (currentSection !== "common") {
        config.types.set(currentSection, []);
      }
      continue;
    }

    if (!currentSection) continue;

    const field = parseFieldSpec(line.trim());
    if (!field) continue;

    if (currentSection === "common") {
      config.commonFields.push(field);
    } else {
      config.types.get(currentSection)!.push(field);
    }
  }

  return config;
}

async function loadPageTypeConfig(): Promise<PageTypeConfig> {
  const result = await query(
    `SELECT body FROM pages WHERE title = 'config-page-types' AND deleted = FALSE`,
    []
  );
  if (result.rows.length === 0) {
    throw new Error(
      "config-page-types page not found in brain — cannot validate. Create this config page to define valid types."
    );
  }
  return parsePageTypeConfig(result.rows[0].body);
}

async function validateTypes(types: string[]): Promise<PageTypeConfig> {
  const ptc = await loadPageTypeConfig();
  for (const t of types) {
    if (!ptc.types.has(t)) {
      throw new Error(
        `Invalid page type: "${t}". Valid types: ${[...ptc.types.keys()].join(", ")}`
      );
    }
  }
  return ptc;
}

function validateFrontmatter(
  fm: Record<string, any>,
  types: string[],
  ptc: PageTypeConfig
): void {
  // Collect all fields declared across the page's types
  const allowedTypeFields = new Map<string, FieldSpec>();
  for (const t of types) {
    const fields = ptc.types.get(t) || [];
    for (const f of fields) {
      // If same field appears on multiple types, the first wins (most restrictive)
      if (!allowedTypeFields.has(f.name)) {
        allowedTypeFields.set(f.name, f);
      }
    }
  }

  // Common field names (skip these in type-specific checks)
  const commonNames = new Set(ptc.commonFields.map((f) => f.name));
  // Shared optional fields that can appear on any page (Obsidian-native)
  const sharedOptional = new Set([
    "aliases",
    "cssclasses",
    "tags",
    "summary",
    "related",
  ]);

  // Check required fields are present
  for (const [name, spec] of allowedTypeFields) {
    if (spec.required && !fm[name]) {
      const ownerTypes = types.filter((t) =>
        (ptc.types.get(t) || []).some((f) => f.name === name && f.required)
      );
      throw new Error(
        `${ownerTypes.join("/")} pages require frontmatter field: ${name}`
      );
    }
  }

  // Check enum values
  for (const [name, spec] of allowedTypeFields) {
    if (spec.type === "enum" && fm[name] && spec.values) {
      if (!spec.values.includes(fm[name])) {
        throw new Error(
          `Field "${name}" must be one of: ${spec.values.join(", ")}`
        );
      }
    }
  }

  // Check for fields that don't belong on this page's types
  for (const key of Object.keys(fm)) {
    if (commonNames.has(key)) continue;
    if (sharedOptional.has(key)) continue;
    if (allowedTypeFields.has(key)) continue;

    // Check if this field belongs to ANY type (to give a useful error)
    const ownerTypes: string[] = [];
    for (const [typeName, fields] of ptc.types) {
      if (fields.some((f) => f.name === key)) {
        ownerTypes.push(typeName);
      }
    }

    if (ownerTypes.length > 0) {
      throw new Error(
        `Field "${key}" is only valid on ${ownerTypes.join(" or ")} pages`
      );
    }
    // Unknown fields not in any type spec are allowed (forward-compatible)
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

    const ptc = await validateTypes(types);

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

    validateFrontmatter(fullFm, types, ptc);

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
    const ptc = await validateTypes(types);
    validateFrontmatter(mergedFm, types, ptc);

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

// ─── capture_note ─────────────────────────────────────────────
export const captureNote: ToolDef = {
  name: "capture_note",
  description:
    "Capture a note by writing it as a timestamped file in the ingress folder. The next ingest cycle picks it up automatically. No format constraints, no Postgres sync — pure capture.",
  schema: z.object({
    content: z.string().describe("Raw text content to capture"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { content } = params;
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, "-");
    const filename = `note_${timestamp}.md`;
    const filePath = path.join(config.ingressPath, filename);
    await fs.writeFile(filePath, content, "utf-8");
    return { message: `Captured note as ${filename}`, timestamp: now.toISOString(), file: filename };
  },
};

// ─── capture_reminder ─────────────────────────────────────────
export const captureReminder: ToolDef = {
  name: "capture_reminder",
  description:
    "Capture a reminder as a brain page. Writes directly as a reminder page (skips the ingest pipeline). The heartbeat reasons per-tick whether to surface each open reminder by time, context, or age. Use wiki-links in the body to tie the reminder to entities/concepts/situations — this enables context-match surfacing.",
  schema: z.object({
    title: z
      .string()
      .describe("Reminder statement — what to be reminded of (e.g., \"Follow up with Oladapo on RC91 RCA findings\")"),
    body: z
      .string()
      .optional()
      .default("")
      .describe(
        "Context for the heartbeat to reason about surfacing — what the reminder is about, what signals would make it relevant, any dependencies. Use wiki-links to related entities/concepts/situations."
      ),
    due: z
      .string()
      .optional()
      .describe("Optional due date YYYY-MM-DD. Omit for time-less reminders that rely on context-match or periodic judgment."),
    summary: z
      .string()
      .optional()
      .describe("One-sentence summary"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { title, body, due, summary } = params;
    const types = ["reminder"];

    const ptc = await validateTypes(types);

    const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    const fullFm: Record<string, any> = {
      title,
      type: types,
      cssclasses: ["reminder"],
      status: "pending",
      created: now,
      updated: now,
    };
    if (due) fullFm.due = due;
    if (summary) fullFm.summary = summary;

    validateFrontmatter(fullFm, types, ptc);

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

    // Git commit
    await gitCommit(`capture-reminder: ${title}`);

    return {
      id: pageId,
      title,
      file_path: relPath,
      status: "pending",
      due: due || null,
      message: `Captured reminder "${title}"${due ? ` (due ${due})` : ""}`,
    };
  },
};

// ─── Retention disposition (internal) ─────────────────────────
// Per Ingress Retention design: at end of ingest, every successfully processed
// file gets a disposition based on its retention_label. This logic centralises
// the move/delete logic and reads discard_mode from config-ingress-retention
// so the MCP server (not the heartbeat) is the single point that gates
// irreversible discard actions.

const VALID_RETENTION_LABELS = ["postgres", "fs", "discard"] as const;
type RetentionLabel = (typeof VALID_RETENTION_LABELS)[number];

async function loadDiscardMode(): Promise<"shadow" | "live"> {
  const result = await query(
    `SELECT body FROM pages WHERE title = 'config-ingress-retention' AND deleted = FALSE`,
    []
  );
  if (result.rows.length === 0) {
    // Fail closed — if the config page does not exist, behave as shadow.
    // Asymmetric risk: shadowing a discard is recoverable; deleting without config is not.
    return "shadow";
  }
  const body: string = result.rows[0].body;
  // Match: "- **discard_mode:** `value`" (settings block) or "discard_mode: value" anywhere.
  const m =
    body.match(/discard_mode[^\n`]*`(shadow|live)`/i) ||
    body.match(/discard_mode\s*:\s*(shadow|live)/i);
  if (!m) return "shadow";
  return m[1].toLowerCase() === "live" ? "live" : "shadow";
}

// Internal retention dispatch handler — shared by finalize_ingest and dispatch_raw.
async function dispatchRetention(params: {
  file_path: string;
  label: RetentionLabel;
  raw_content?: string;
  page_id?: number;
}): Promise<{
  file_path: string;
  requested_label: RetentionLabel;
  effective_label: RetentionLabel;
  discard_mode: "shadow" | "live";
  shadow_applied: boolean;
  postgres_written: boolean;
  moved_to: string | null;
  deleted: boolean;
  empty_parents_cleaned: number;
}> {
  const { file_path, label, raw_content, page_id } = params;

  // Resolve and guard against path traversal — same protection as read_ingress.
  const absolutePath = path.join(config.ingressPath, file_path);
  const resolved = path.resolve(absolutePath);
  if (!resolved.startsWith(path.resolve(config.ingressPath))) {
    throw new Error("Path traversal detected — file must be within ingress folder");
  }

  // Determine effective label after applying discard_mode gate.
  const discardMode = await loadDiscardMode();
  const effectiveLabel: RetentionLabel =
    label === "discard" && discardMode === "shadow" ? "fs" : label;

  // Helper to move a file from ingress into raw/ subfolder, preserving relative path.
  const moveToRaw = async () => {
    const rawRoot = path.join(config.ingressPath, "raw");
    const rawDest = path.join(rawRoot, file_path);
    await fs.mkdir(path.dirname(rawDest), { recursive: true });
    try {
      await fs.rename(resolved, rawDest);
    } catch {
      // Cross-device rename can fail — fall back to copy + unlink.
      await fs.copyFile(resolved, rawDest);
      await fs.unlink(resolved);
    }
    return path.relative(config.ingressPath, rawDest);
  };

  let postgresWritten = false;
  let movedTo: string | null = null;
  let deleted = false;

  if (effectiveLabel === "postgres") {
    if (!page_id) {
      throw new Error("dispatch_raw: page_id is required when label is 'postgres'");
    }
    if (raw_content === undefined) {
      throw new Error("dispatch_raw: raw_content is required when label is 'postgres'");
    }
    // Write raw content to the existing source page row.
    const updateResult = await query(
      `UPDATE pages SET raw_content = $1, indexed_at = NOW() WHERE id = $2 AND deleted = FALSE RETURNING id`,
      [raw_content, page_id]
    );
    if (updateResult.rows.length === 0) {
      throw new Error(`dispatch_raw: page id ${page_id} not found or deleted — raw_content not written`);
    }
    postgresWritten = true;
    movedTo = await moveToRaw();
  } else if (effectiveLabel === "fs") {
    movedTo = await moveToRaw();
  } else if (effectiveLabel === "discard") {
    // Live discard — irreversible delete from ingress.
    try {
      await fs.unlink(resolved);
      deleted = true;
    } catch (err: any) {
      throw new Error(`dispatch_raw: failed to delete ${file_path}: ${err.message}`);
    }
  }

  // Clean up empty parent directories walking up from the file's original parent.
  // Stop at the ingress root (never remove ingressPath itself) or at a non-empty directory.
  // Rationale: dropped folders contain heterogeneous retention labels — files move
  // individually, leaving the parent directory behind. Cleanup here keeps the ingress
  // root visually clean. rmdir fails on non-empty directories (including OS metadata
  // like .DS_Store / Thumbs.db), which is a feature — if anything remains, leave it.
  const ingressRoot = path.resolve(config.ingressPath);
  const rawRoot = path.resolve(path.join(config.ingressPath, "raw"));
  const reviewRoot = path.resolve(path.join(config.ingressPath, "review"));
  let parentsCleaned = 0;
  let parent = path.dirname(resolved);
  while (
    parent !== ingressRoot &&
    parent.startsWith(ingressRoot + path.sep) &&
    parent !== rawRoot &&
    parent !== reviewRoot &&
    !parent.startsWith(rawRoot + path.sep) &&
    !parent.startsWith(reviewRoot + path.sep)
  ) {
    try {
      await fs.rmdir(parent);
      parentsCleaned++;
    } catch {
      break; // directory not empty or other error — stop climbing
    }
    parent = path.dirname(parent);
  }

  return {
    file_path,
    requested_label: label,
    effective_label: effectiveLabel,
    discard_mode: discardMode,
    shadow_applied: label === "discard" && effectiveLabel === "fs",
    postgres_written: postgresWritten,
    moved_to: movedTo,
    deleted,
    empty_parents_cleaned: parentsCleaned,
  };
}

// ─── finalize_ingest ──────────────────────────────────────────
// Atomic merge of mark_processed + dispatch_raw. Single tool call per file
// at end of ingest — marks the file as processed in Postgres AND disposes
// the raw file per its retention label. Eliminates the gap where mark_processed
// succeeds but dispatch_raw is skipped under execution pressure.

export const finalizeIngest: ToolDef = {
  name: "finalize_ingest",
  description:
    "Atomically mark a file as processed AND dispose of the raw file per its retention label. Single call replaces the former mark_processed + dispatch_raw two-step. Called once per successfully ingested file at end of ingest. Three retention dispositions: 'postgres' writes raw markdown to pages.raw_content AND moves original to raw/; 'fs' moves original to raw/ only; 'discard' deletes original (gated by config-ingress-retention.discard_mode — 'shadow' mode redirects to 'fs').",
  schema: z.object({
    file_path: z
      .string()
      .describe("Relative path of the source file in the ingress folder (as returned by scan_ingress)"),
    file_modified: z
      .string()
      .describe("ISO-8601 filesystem modification timestamp of the source file"),
    page_id: z
      .number()
      .int()
      .optional()
      .describe("ID of the source page created from this file. Required for normal ingest; omit for MISS: routing (no source page created)."),
    label: z
      .enum(VALID_RETENTION_LABELS)
      .describe("Retention label assigned by ingest-time judgment: postgres | fs | discard"),
    raw_content: z
      .string()
      .optional()
      .describe(
        "Markdown-converted raw content. Required when label is 'postgres' (written to pages.raw_content). Omit for 'fs' and 'discard'."
      ),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { file_path, file_modified, page_id, label, raw_content } = params;

    // Step 1: Mark processed (same logic as former mark_processed tool)
    await query(
      `INSERT INTO ingested_sources (file_path, file_modified, ingested_at, page_id)
       VALUES ($1, $2, NOW(), $3)
       ON CONFLICT (file_path) DO UPDATE SET
         file_modified = EXCLUDED.file_modified,
         ingested_at = NOW(),
         page_id = COALESCE(EXCLUDED.page_id, ingested_sources.page_id)`,
      [file_path, file_modified, page_id || null]
    );

    await query(
      `UPDATE scan_state SET value = NOW() WHERE key = 'last_ingress_scan'`
    );

    // Step 2: Dispatch retention (same logic as former dispatch_raw tool)
    const retention = await dispatchRetention({
      file_path,
      label,
      raw_content,
      page_id,
    });

    return {
      ...retention,
      page_id,
      marked_processed: true,
      message: `Finalized "${file_path}" — marked processed + ${retention.effective_label} disposition`,
    };
  },
};

// dispatch_raw removed as standalone tool — finalize_ingest handles both
// normal ingest (with page_id) and MISS: routing (without page_id, label: "discard").

// ─── batch_upsert_pages ──────────────────────────────────────
// Bulk create-or-update for entity/concept pages during ingest.
// The caller reasons about merges, competing interpretations, and body
// composition BEFORE calling this tool. The tool only handles the mechanical
// upsert: frontmatter validation, file write, embedding, Postgres sync.
// Single git commit at end for the entire batch.

const batchUpsertPageSchema = z.object({
  pages: z
    .array(
      z.object({
        title: z.string().describe("Page title (exact match for update, new title for create)"),
        type: z
          .array(z.string())
          .min(1)
          .describe("Page type array, primary type first"),
        body: z
          .string()
          .describe(
            "Complete markdown body — pre-reasoned by the caller. For updates, this is the full merged body incorporating existing + new content. For creates, this is the initial body."
          ),
        summary: z
          .string()
          .optional()
          .describe("One-sentence summary"),
        frontmatter: z
          .record(z.any())
          .optional()
          .default({})
          .describe(
            "Additional frontmatter fields beyond title/type/created/updated"
          ),
      })
    )
    .min(1)
    .max(30)
    .describe("Array of pages to upsert (max 30 per call)"),
});

export const batchUpsertPages: ToolDef = {
  name: "batch_upsert_pages",
  description:
    "Bulk create-or-update brain pages in a single call. For each page: if it exists, updates body/frontmatter/embedding; if not, creates it. Validates frontmatter, writes markdown files, syncs to Postgres with embeddings. Single git commit for the entire batch. The caller is responsible for all reasoning — merges, competing interpretations, body composition — before calling. This tool is mechanical only.",
  schema: batchUpsertPageSchema,
  accessLevel: "write",
  handler: async (params) => {
    const { pages } = params;

    // Load page type config once for the entire batch
    const ptc = await loadPageTypeConfig();

    // Check which titles already exist
    const allTitles = pages.map((p: { title: string }) => p.title);
    const existingResult = await query(
      `SELECT id, title, file_path, type, frontmatter, summary
       FROM pages
       WHERE title = ANY($1) AND deleted = FALSE`,
      [allTitles]
    );
    const existingMap = new Map<string, any>();
    for (const row of existingResult.rows) {
      existingMap.set(row.title, row);
    }

    const results: Array<{
      title: string;
      id: number;
      action: "created" | "updated";
      file_path: string;
      orphan?: boolean;
    }> = [];
    const errors: Array<{ title: string; error: string }> = [];

    for (const page of pages) {
      try {
        const { title, type: types, body, summary, frontmatter: extraFm } = page;

        // Validate types against config
        for (const t of types) {
          if (!ptc.types.has(t)) {
            throw new Error(
              `Invalid page type: "${t}". Valid types: ${[...ptc.types.keys()].join(", ")}`
            );
          }
        }

        const existing = existingMap.get(title);
        const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

        if (existing) {
          // UPDATE path — merge frontmatter, replace body
          const mergedFm: Record<string, any> = {
            ...existing.frontmatter,
            ...extraFm,
            updated: now,
          };

          validateFrontmatter(mergedFm, types, ptc);

          const effectiveSummary = summary ?? existing.summary;
          if (effectiveSummary) mergedFm.summary = effectiveSummary;

          // Write file
          const filePath = path.join(config.memoryPath, existing.file_path);
          const markdown = buildMarkdown(mergedFm, body);
          await fs.writeFile(filePath, markdown, "utf-8");

          // Sync to Postgres
          const pageId = await syncToPostgres(
            title,
            existing.file_path,
            types,
            mergedFm,
            body,
            effectiveSummary,
            mergedFm.created,
            now
          );

          results.push({
            title,
            id: pageId,
            action: "updated",
            file_path: existing.file_path,
          });
        } else {
          // CREATE path
          const fullFm: Record<string, any> = {
            title,
            type: types,
            cssclasses: [types[0]],
            ...extraFm,
            created: now,
            updated: now,
          };
          if (summary) fullFm.summary = summary;

          validateFrontmatter(fullFm, types, ptc);

          const filename = `${sanitizeFilename(title)}.md`;
          const filePath = path.join(config.memoryPath, filename);

          const markdown = buildMarkdown(fullFm, body);
          await fs.writeFile(filePath, markdown, "utf-8");

          const pageId = await syncToPostgres(
            title,
            filename,
            types,
            fullFm,
            body,
            summary || null,
            now,
            now
          );

          // Orphan check
          const linkPattern = `[[${title}]]`;
          const linkCheck = await query(
            "SELECT COUNT(*) AS count FROM pages WHERE body LIKE $1 AND title != $2 AND deleted = FALSE",
            [`%${linkPattern}%`, title]
          );
          const isOrphan = parseInt(linkCheck.rows[0].count) === 0;

          results.push({
            title,
            id: pageId,
            action: "created",
            file_path: filename,
            orphan: isOrphan,
          });
        }
      } catch (err: any) {
        errors.push({ title: page.title, error: err.message });
      }
    }

    // Single git commit for the entire batch
    if (results.length > 0) {
      const created = results.filter((r) => r.action === "created").length;
      const updated = results.filter((r) => r.action === "updated").length;
      const parts: string[] = [];
      if (created > 0) parts.push(`${created} created`);
      if (updated > 0) parts.push(`${updated} updated`);
      await gitCommit(`batch-upsert: ${parts.join(", ")} (${results.map((r) => r.title).join(", ")})`);
    }

    return {
      total: pages.length,
      succeeded: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    };
  },
};

export const writeTools = [createPage, updatePage, deletePage, finalizeIngest, batchUpsertPages, captureNote, captureReminder];
