import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { query } from "../db.js";
import { config } from "../config.js";
import type { ToolDef } from "./types.js";

// ─── get_config ────────────────────────────────────────────────
export const getConfig: ToolDef = {
  name: "get_config",
  description:
    "Retrieve a config or source-config page from the brain. These pages define exec assistant behavior (heartbeat, briefing format, triage thresholds) and signal source directives.",
  schema: z.object({
    title: z.string().describe("Config page title (exact match)"),
  }),
  accessLevel: "read",
  handler: async (params) => {
    const { title } = params;

    const result = await query(
      `SELECT id, title, file_path, type, frontmatter, body, summary, updated_at
       FROM pages
       WHERE title = $1
         AND deleted = FALSE
         AND (type && ARRAY['config', 'source-config'])`,
      [title]
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
        type: p.type,
        frontmatter: p.frontmatter,
        body: p.body,
        summary: p.summary,
        updated_at: p.updated_at,
      },
    };
  },
};

// ─── update_config ─────────────────────────────────────────────
export const updateConfig: ToolDef = {
  name: "update_config",
  description:
    "Update a config or source-config page. For source-config pages, this is how directives are added, removed, or reordered. Pass the complete body.",
  schema: z.object({
    title: z.string().describe("Config page title (exact match)"),
    body: z.string().describe("New complete markdown body"),
    frontmatter_updates: z
      .record(z.any())
      .optional()
      .default({})
      .describe("Frontmatter fields to update (merged with existing)"),
  }),
  accessLevel: "write",
  handler: async (params) => {
    const { title, body, frontmatter_updates } = params;

    const existing = await query(
      `SELECT id, file_path, type, frontmatter, summary
       FROM pages
       WHERE title = $1
         AND deleted = FALSE
         AND (type && ARRAY['config', 'source-config'])`,
      [title]
    );

    if (existing.rows.length === 0) {
      throw new Error(`Config page "${title}" not found`);
    }

    const page = existing.rows[0];
    const today = new Date().toISOString().split("T")[0];

    const mergedFm: Record<string, any> = {
      ...page.frontmatter,
      ...frontmatter_updates,
      updated: today,
    };

    // For source-config, update last_processed if provided
    if (
      page.type.includes("source-config") &&
      frontmatter_updates.last_processed
    ) {
      mergedFm.last_processed = frontmatter_updates.last_processed;
    }

    // Build and write markdown
    const yaml = Object.entries(mergedFm)
      .map(([k, v]) => {
        if (Array.isArray(v)) {
          return `${k}:\n${v.map((item) => `  - ${JSON.stringify(item)}`).join("\n")}`;
        }
        if (
          typeof v === "string" &&
          (v.includes(":") || v.includes("#") || v.includes("'"))
        ) {
          return `${k}: "${v.replace(/"/g, '\\"')}"`;
        }
        return `${k}: ${v}`;
      })
      .join("\n");

    const markdown = `---\n${yaml}\n---\n\n${body}`;
    const filePath = path.join(config.memoryPath, page.file_path);
    await fs.writeFile(filePath, markdown, "utf-8");

    // Sync to Postgres (config pages get embeddings too — enables search discovery)
    const { embed, embeddingText } = await import("../embeddings.js");
    const embText = embeddingText(title, page.summary, body);
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
      [mergedFm, body, embeddingLiteral, today, page.id]
    );

    return {
      id: page.id,
      title,
      message: `Updated config page "${title}"`,
    };
  },
};

export const configTools = [getConfig, updateConfig];
