import { z } from "zod";
import { query } from "../db.js";
import type { ToolDef } from "./types.js";

// ─── get_config ────────────────────────────────────────────────
//
// Read tool for config / source-config pages. Filters by type so callers
// can't accidentally fetch non-config pages with this tool.
//
// Note: `update_config` was removed (2026-05-07). Its capabilities are now
// covered by `update_page_frontmatter` (frontmatter merges, body untouched
// server-side), `update_page` (full body replace, works on any page including
// config types), and `append_to_page_section` (server-side body section
// append). The type-guard semantics that `update_config` provided were
// validation-only — no unique behavior — so the migration costs nothing.
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

export const configTools = [getConfig];
