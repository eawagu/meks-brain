/**
 * Sample data used by multiple test files.
 */

/**
 * Body of `config-page-types` — the validation schema source loaded by
 * `loadPageTypeConfig` in src/tools/write.ts. Tests that exercise frontmatter
 * validation rely on this canonical shape.
 *
 * Mirrors the production page closely enough that validation logic is exercised
 * the same way as in production. New page types should be added here when added
 * to the production page so tests stay in sync.
 */
export const PAGE_TYPES_BODY = `## Common
- title: string, required
- type: string[], required
- created: date, required
- updated: date, required

## entity

## concept

## source
- source_path: string, optional
- retention_label: enum [postgres, fs, discard], optional
- retention_rationale: string, optional

## synthesis
- status: enum [draft, current, superseded], optional

## commitment
- owner: string, required
- counterparty: string, required
- role: string, required
- accountability: string, required
- due: date, required
- status: enum [open, fulfilled, broken, cancelled], required

## situation
- status: enum [developing, stable, resolving, retired], required
- accountability: string, required
- role: string, required

## reminder
- status: enum [pending, done, dismissed, auto-resolved], required
- due: date, optional

## source-config
- last_processed: string, optional

## config

## briefing
- status: enum [current, superseded], required
`;

/**
 * Standard fake embedding vector — tests that mock `embed` should use this so
 * assertions about the embedding payload have a known shape.
 */
export const FAKE_EMBEDDING = new Array(1536).fill(0).map((_, i) => i / 1536);

/**
 * Convenience: a row-shaped object matching `pages` table SELECT results used
 * by handlers (id, file_path, type, frontmatter, body, summary, etc.).
 */
export interface PageRow {
  id: number | string;
  title?: string;
  file_path?: string;
  type: string[];
  frontmatter: Record<string, any>;
  body?: string;
  summary?: string | null;
  created_at?: string;
  updated_at?: string;
  raw_content?: string | null;
  deleted?: boolean;
}

export function makePageRow(overrides: Partial<PageRow> = {}): PageRow {
  return {
    id: 1,
    title: "Sample Entity",
    file_path: "sample-entity.md",
    type: ["entity"],
    frontmatter: {
      title: "Sample Entity",
      type: ["entity"],
      cssclasses: ["entity"],
      created: "2026-05-01",
      updated: "2026-05-01",
    },
    body: "Sample body content with [[Other Entity]] link.",
    summary: "Sample summary",
    created_at: "2026-05-01T00:00:00Z",
    updated_at: "2026-05-01T00:00:00Z",
    raw_content: null,
    deleted: false,
    ...overrides,
  };
}

/**
 * Build a `config-page-types` row for handlers that load it during validation.
 */
export function makePageTypesRow(): { body: string } {
  return { body: PAGE_TYPES_BODY };
}
