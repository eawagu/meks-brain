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

// ─── Source-config compliance check ───────────────────────────
// Schema invariant: when a briefing is created (the structural signal of
// tick completion), every source-config MUST have last_processed >= updated.
// A directive whose `updated` timestamp is newer than its `last_processed`
// represents an information-to-action gap — the heartbeat had the directive
// update in its working state but did not execute it this tick. Blocking
// briefing creation in that state removes the silent-defer pathway: the
// heartbeat must either (a) execute the directive on the source's in-window
// set and advance last_processed to max(modifiedTime); or (b) advance
// last_processed via update_page_frontmatter to acknowledge no in-window
// work. Either path closes the gap before the briefing can be written.

interface NonCompliantSource {
  title: string;
  updated: string;
  last_processed: string | null;
}

async function checkSourceConfigCompliance(): Promise<NonCompliantSource[]> {
  const result = await query(
    `SELECT title, frontmatter FROM pages
     WHERE deleted = FALSE
       AND type && ARRAY['source-config']`,
    []
  );

  const nonCompliant: NonCompliantSource[] = [];
  for (const row of result.rows) {
    const fm = row.frontmatter ?? {};
    const updated = fm.updated;
    const lastProcessed = fm.last_processed;
    // Without `updated` there is nothing to compare against — skip.
    if (!updated) continue;
    // Missing `last_processed` means the source has never been swept under
    // the current directive, which is functionally identical to "directive
    // updated since last sweep" — gate fires (per config-heartbeat-prompt
    // Directive freshness gate). Otherwise compare timestamps.
    if (
      !lastProcessed ||
      new Date(updated).getTime() > new Date(lastProcessed).getTime()
    ) {
      nonCompliant.push({
        title: row.title,
        updated,
        last_processed: lastProcessed ?? null,
      });
    }
  }

  return nonCompliant;
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

    // Schema invariant: briefings are the tick-completion structural signal.
    // Before a briefing can be created, every source-config must have
    // last_processed >= updated. Closes the information-to-action gap where
    // a heartbeat tick reads an updated directive but writes the briefing
    // without acting on it. See checkSourceConfigCompliance.
    if (types.includes("briefing")) {
      const nonCompliant = await checkSourceConfigCompliance();
      if (nonCompliant.length > 0) {
        const lines = nonCompliant
          .map(
            (s) =>
              `  - ${s.title}: updated=${s.updated}, last_processed=${s.last_processed ?? "null"}`
          )
          .join("\n");
        throw new Error(
          `Cannot create briefing — ${nonCompliant.length} source-config(s) have directive updates not yet acted on. ` +
            `For each, 'updated' is newer than 'last_processed', indicating this tick did not execute the directive after it changed.\n\n` +
            `Non-compliant:\n${lines}\n\n` +
            `Resolution: either (a) execute the current directive on the source's in-window set and advance last_processed to max(modifiedTime) via update_page_frontmatter; or (b) advance last_processed via update_page_frontmatter to acknowledge no in-window work this tick.`
        );
      }
    }

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

// ─── capture_note ─────────────────────────────────────────────
export const captureNote: ToolDef = {
  name: "capture_note",
  description:
    "Capture a note by writing it as a file in the ingress folder. The next ingest cycle picks it up automatically. No format constraints, no Postgres sync — pure capture.\n\nFilename: when `name` is provided, it is used (sanitized for filesystem safety, `.md` appended if no extension is present); otherwise defaults to `note_{ISO-8601}.md`. Use `name` to preserve provenance (e.g., the original Drive or email title) so the ingested source page carries the right source_path.",
  schema: z.object({
    content: z.string().describe("Raw text content to capture"),
    name: z
      .string()
      .optional()
      .describe(
        "Optional filename for the captured note. Characters forbidden on Windows (/ \\ : * ? \" < > |) are replaced with `_`; trailing dots and spaces are trimmed; `.md` is appended if the name has no extension. Omit for the default `note_{timestamp}.md` filename."
      ),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { content, name } = params;
    const now = new Date();
    let filename: string;
    if (name && name.trim().length > 0) {
      // Sanitize for Windows filesystem: replace forbidden chars, trim trailing dots/spaces
      let safe = name.trim().replace(/[\/\\:*?"<>|]/g, "_").replace(/[. ]+$/, "");
      // Append .md if no extension present (1-6 alphanumeric chars after a dot)
      if (!/\.[a-zA-Z0-9]{1,6}$/.test(safe)) {
        safe = safe + ".md";
      }
      filename = safe;
    } else {
      const timestamp = now.toISOString().replace(/[:.]/g, "-");
      filename = `note_${timestamp}.md`;
    }
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


// ─── update_page_frontmatter ──────────────────────────────────
// Frontmatter-only update: body never traverses the caller's context.
//
// Motivation: `update_page` and `update_config` are full-body-replace by
// contract. The caller has to round-trip the entire body through its own
// context window to change a single field. When the caller is an LLM with
// finite context, intermittent body truncation has happened (config-salience
// commit 4d004d5 lost 222 lines from a 246-line file in a single update).
// This tool keeps the body server-side: it reads the existing body from
// Postgres, merges new frontmatter, and rewrites the file with the original
// body. The LLM never holds the body, so it cannot truncate it.
//
// Embedding cost: re-embedding skipped unless `summary` changed (title can't
// change here, body is unchanged). Frees up the embedding budget for cases
// where it's actually needed.

export const updatePageFrontmatter: ToolDef = {
  name: "update_page_frontmatter",
  description:
    "Update only the frontmatter (and optionally summary) of an existing brain page. The body is read server-side and preserved unchanged — the caller never sends or receives the body, so this is safe for routine field updates (last_processed, status, summary) where update_page would risk body truncation under context pressure. Embedding is regenerated only when summary changes. Validates merged frontmatter against the schema. Use this instead of update_page whenever body content is not changing.",
  schema: z.object({
    title: z.string().describe("Page title (exact match to existing page)"),
    frontmatter_updates: z
      .record(z.any())
      .describe(
        "Frontmatter fields to merge with existing frontmatter (e.g., {last_processed: '2026-05-06T18:00:00Z'} or {status: 'superseded'})"
      ),
    summary: z
      .string()
      .optional()
      .describe(
        "Updated summary (omit to keep existing). When changed, embedding is regenerated; otherwise the embedding is left in place."
      ),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { title, frontmatter_updates, summary } = params;

    // Fetch existing page WITH body — we need the body to rewrite the file
    // unchanged on disk, but it never leaves this server-side handler.
    const existing = await query(
      "SELECT id, file_path, type, frontmatter, body, summary FROM pages WHERE title = $1 AND deleted = FALSE",
      [title]
    );
    if (existing.rows.length === 0) {
      throw new Error(`Page "${title}" not found`);
    }

    const page = existing.rows[0];
    const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

    // Merge frontmatter — same shape as update_page's merge to keep behavior
    // consistent (callers can switch from update_page to update_page_frontmatter
    // without observable change to the resulting frontmatter).
    const mergedFm: Record<string, any> = {
      ...page.frontmatter,
      ...frontmatter_updates,
      updated: now,
    };

    const types = mergedFm.type || page.type;
    const ptc = await validateTypes(types);
    validateFrontmatter(mergedFm, types, ptc);

    // Effective summary: explicit `summary` arg wins; otherwise keep existing.
    // Matches update_page behavior so the two tools agree on summary semantics.
    const effectiveSummary = summary ?? page.summary;
    if (effectiveSummary) mergedFm.summary = effectiveSummary;

    // Write file with the EXISTING body — buildMarkdown rebuilds the YAML
    // block + appends body unchanged.
    const filePath = path.join(config.memoryPath, page.file_path);
    const markdown = buildMarkdown(mergedFm, page.body);
    await fs.writeFile(filePath, markdown, "utf-8");

    // Decide whether to regenerate the embedding. The embedding text is
    // title + summary + body (see embeddings.ts/embeddingText). Title can't
    // change via this tool and body is preserved, so summary is the only
    // input that can shift the embedding. Skip regen when summary unchanged.
    const summaryChanged = effectiveSummary !== page.summary;

    if (summaryChanged) {
      const embText = embeddingText(title, effectiveSummary, page.body);
      const embedding = await embed(embText);
      const embeddingLiteral = `[${embedding.join(",")}]`;
      await query(
        `UPDATE pages SET
           frontmatter = $1,
           summary = $2,
           embedding = $3::vector,
           updated_at = $4,
           indexed_at = NOW()
         WHERE id = $5`,
        [mergedFm, effectiveSummary, embeddingLiteral, now, page.id]
      );
    } else {
      await query(
        `UPDATE pages SET
           frontmatter = $1,
           summary = $2,
           updated_at = $3,
           indexed_at = NOW()
         WHERE id = $4`,
        [mergedFm, effectiveSummary, now, page.id]
      );
    }

    await gitCommit(`update-frontmatter: ${title}`);

    return {
      id: page.id,
      title,
      file_path: page.file_path,
      embedding_regenerated: summaryChanged,
      message: `Updated frontmatter for "${title}"${summaryChanged ? " (embedding regenerated)" : ""}`,
    };
  },
};


// ─── append_to_page_section ───────────────────────────────────
// Server-side body patch for appending content to a named section.
//
// Motivation: tools/uses that need to grow a list inside a known section
// (Tuning Log tuples in config-salience, Deltas in situation pages, briefing
// instrumentation rows) currently have to round-trip the entire body through
// the caller's context to do the append. This tool moves the read+patch+write
// loop server-side so the caller never holds the body — the LLM sends the
// new chunk only.
//
// Insertion semantics: content is appended at the END of the section, defined
// as "before the next heading of same-or-higher level, or EOF if none". A
// blank-line separator is inserted between existing content and the new chunk
// so the file stays Markdown-clean across many appends.

/**
 * Patch `body` by appending `content` at the end of the section identified by
 * the exact line `sectionHeading` (e.g. "## Tuning Log"). End of section is
 * the line before the next heading of same-or-higher level, or EOF.
 *
 * Throws when the section is not found — silently appending at EOF would
 * mask author typos in section_heading and lead to data ending up in the
 * wrong place.
 */
function appendToSection(
  body: string,
  sectionHeading: string,
  content: string
): string {
  const headingMatch = sectionHeading.match(/^(#+)\s+/);
  if (!headingMatch) {
    throw new Error(
      `Invalid section_heading "${sectionHeading}" — must start with one or more '#' characters followed by a space and the section title (e.g. "## Tuning Log")`
    );
  }
  const targetLevel = headingMatch[1].length;

  const lines = body.split("\n");
  const headingTrimmed = sectionHeading.trim();
  let sectionStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === headingTrimmed) {
      sectionStart = i;
      break;
    }
  }
  if (sectionStart < 0) {
    throw new Error(
      `Section heading "${sectionHeading}" not found in page body — append rejected to surface authoring typos`
    );
  }

  // Find first subsequent heading of same-or-higher level (lower or equal #
  // count). That's where this section ends.
  let sectionEnd = lines.length;
  for (let i = sectionStart + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#+)\s+/);
    if (m && m[1].length <= targetLevel) {
      sectionEnd = i;
      break;
    }
  }

  // Snapshot the section (heading + content), trim trailing blank lines to
  // prevent unbounded growth of empty separators across many appends.
  const section = lines.slice(sectionStart, sectionEnd);
  while (section.length > 1 && section[section.length - 1].trim() === "") {
    section.pop();
  }

  // Append blank-line separator + new content, then re-trim trailing blanks
  // from the new content too.
  section.push("", ...content.split("\n"));
  while (section.length > 0 && section[section.length - 1].trim() === "") {
    section.pop();
  }

  // Restore one trailing blank line before the next heading for readability,
  // but only if there is a next section (otherwise the file would gain a
  // pointless trailing newline beyond what `body` already had).
  if (sectionEnd < lines.length) {
    section.push("");
  }

  return [
    ...lines.slice(0, sectionStart),
    ...section,
    ...lines.slice(sectionEnd),
  ].join("\n");
}

export const appendToPageSection: ToolDef = {
  name: "append_to_page_section",
  description:
    "Append content to the END of a named section in an existing brain page. Body is read server-side and patched server-side — the caller sends only the new chunk, never the existing body, which makes this safe for routine list-append patterns (Tuning Log tuples, briefing instrumentation rows, situation Deltas) where update_page would risk body truncation under context pressure. Insertion point is the line before the next heading of same-or-higher level, or EOF if the target section is the last one. Throws if section_heading is not found verbatim — surfaces typos rather than silently appending at EOF. Embedding is always regenerated since body content changed.",
  schema: z.object({
    title: z.string().describe("Page title (exact match to existing page)"),
    section_heading: z
      .string()
      .describe(
        'Exact heading line including markdown level marker, e.g. "## Tuning Log" or "### Improve phase note — 2026-04-22 ~12:45 WAT tick"'
      ),
    content: z
      .string()
      .describe(
        "Content to append at the end of the section. May contain newlines; will be inserted as-is after a blank-line separator."
      ),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { title, section_heading, content } = params;

    // Fetch existing page WITH body — patch happens server-side.
    const existing = await query(
      "SELECT id, file_path, type, frontmatter, body, summary FROM pages WHERE title = $1 AND deleted = FALSE",
      [title]
    );
    if (existing.rows.length === 0) {
      throw new Error(`Page "${title}" not found`);
    }

    const page = existing.rows[0];
    const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

    const newBody = appendToSection(page.body, section_heading, content);

    // Touch frontmatter.updated for consistency with update_page conventions.
    const mergedFm: Record<string, any> = {
      ...page.frontmatter,
      updated: now,
    };

    // Re-validate frontmatter — paranoia, but keeps this tool consistent
    // with all other writers (no path that bypasses validation).
    const types = mergedFm.type || page.type;
    const ptc = await validateTypes(types);
    validateFrontmatter(mergedFm, types, ptc);

    if (page.summary) mergedFm.summary = page.summary;

    // Write file
    const filePath = path.join(config.memoryPath, page.file_path);
    const markdown = buildMarkdown(mergedFm, newBody);
    await fs.writeFile(filePath, markdown, "utf-8");

    // Body changed → embedding must be regenerated.
    const embText = embeddingText(title, page.summary, newBody);
    const embedding = await embed(embText);
    const embeddingLiteral = `[${embedding.join(",")}]`;

    await query(
      `UPDATE pages SET
         frontmatter = $1,
         body = $2,
         embedding = $3::vector,
         updated_at = $4,
         indexed_at = NOW()
       WHERE id = $5`,
      [mergedFm, newBody, embeddingLiteral, now, page.id]
    );

    await gitCommit(`append-section: ${title} → ${section_heading}`);

    return {
      id: page.id,
      title,
      file_path: page.file_path,
      section_heading,
      bytes_appended: content.length,
      message: `Appended ${content.length} bytes to "${section_heading}" in "${title}"`,
    };
  },
};

export const writeTools = [createPage, updatePage, updatePageFrontmatter, appendToPageSection, deletePage, finalizeIngest, batchUpsertPages, captureNote, captureReminder];
