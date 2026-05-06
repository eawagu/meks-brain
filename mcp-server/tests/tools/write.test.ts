/**
 * Tests for src/tools/write.ts — covers create_page, update_page, delete_page,
 * batch_upsert_pages, capture_note, capture_reminder, finalize_ingest, and the
 * shared helpers exercised through them (frontmatter validation, retention
 * dispatch, embedding regen, git commit).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  FAKE_EMBEDDING,
  PAGE_TYPES_BODY,
  makePageRow,
} from "../fixtures.js";
import {
  extractFrontmatter,
  makeMockEmbed,
  makeMockFs,
  makeMockGit,
  makeMockQuery,
  stripFrontmatter,
} from "../helpers.js";

// ─── Module mocks ─────────────────────────────────────────────
// Hoisted by vitest. Each test gets a fresh rig via beforeEach.

const dbRig = makeMockQuery();
const embedRig = makeMockEmbed(FAKE_EMBEDDING);
const gitRig = makeMockGit();
const fsRig = makeMockFs();

vi.mock("../../src/db.js", () => ({
  query: (...args: any[]) => dbRig.query(...args),
  getClient: vi.fn(),
  shutdown: vi.fn(),
  pool: {},
}));

vi.mock("../../src/embeddings.js", () => ({
  embed: (...args: any[]) => embedRig.embed(...args),
  embeddingText: (...args: any[]) => embedRig.embeddingText(...args),
}));

vi.mock("../../src/git.js", () => ({
  gitCommit: (...args: any[]) => gitRig.gitCommit(...args),
}));

vi.mock("fs/promises", () => ({
  default: {
    writeFile: (...args: any[]) => fsRig.writeFile(...args),
    readFile: (...args: any[]) => fsRig.readFile(...args),
    rename: (...args: any[]) => fsRig.rename(...args),
    unlink: (...args: any[]) => fsRig.unlink(...args),
    copyFile: (...args: any[]) => fsRig.copyFile(...args),
    mkdir: (...args: any[]) => fsRig.mkdir(...args),
    rmdir: (...args: any[]) => fsRig.rmdir(...args),
  },
  writeFile: (...args: any[]) => fsRig.writeFile(...args),
  readFile: (...args: any[]) => fsRig.readFile(...args),
  rename: (...args: any[]) => fsRig.rename(...args),
  unlink: (...args: any[]) => fsRig.unlink(...args),
  copyFile: (...args: any[]) => fsRig.copyFile(...args),
  mkdir: (...args: any[]) => fsRig.mkdir(...args),
  rmdir: (...args: any[]) => fsRig.rmdir(...args),
}));

// Lazy-import the tool module after mocks are hoisted so it picks up the mocks.
async function getWriteTools() {
  return import("../../src/tools/write.js");
}

beforeEach(() => {
  dbRig.reset();
  embedRig.reset();
  gitRig.reset();
  fsRig.reset();
});

afterEach(() => {
  vi.clearAllMocks();
});

// ─── createPage ───────────────────────────────────────────────

describe("createPage", () => {
  it("creates a new entity page with full frontmatter and body", async () => {
    // Sequence: validateTypes (load page-types), duplicate check, syncToPostgres
    // upsert, orphan check.
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]); // loadPageTypeConfig
    dbRig.enqueue([]); // duplicate check — none
    dbRig.enqueue([{ id: 42 }]); // syncToPostgres INSERT/UPDATE
    dbRig.enqueue([{ count: "0" }]); // orphan link check

    const { createPage } = await getWriteTools();
    const result = await createPage.handler({
      title: "Test Entity",
      type: ["entity"],
      body: "Some body content.",
      summary: "A test entity",
      frontmatter: {},
    });

    expect(result.id).toBe(42);
    expect(result.title).toBe("Test Entity");
    expect(result.file_path).toMatch(/test-entity\.md$/);
    expect(result.orphan).toBe(true);

    // File written with frontmatter + body
    expect(fsRig.writeFile).toHaveBeenCalledOnce();
    const [filePath, content] = fsRig.writeFile.mock.calls[0];
    expect(filePath).toMatch(/test-entity\.md$/);
    // buildMarkdown only quotes strings containing ':', '#', or "'" — plain strings render unquoted
    expect(content).toContain("title: Test Entity");
    expect(content).toContain('- "entity"');
    expect(stripFrontmatter(content as string)).toBe("Some body content.");

    // Embedding was generated
    expect(embedRig.embed).toHaveBeenCalledOnce();

    // Git commit mentions create + type
    expect(gitRig.commits).toHaveLength(1);
    expect(gitRig.commits[0]).toMatch(/^create: Test Entity \(entity\)/);
  });

  it("auto-fills cssclasses from primary type", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);
    dbRig.enqueue([{ id: 99 }]);
    dbRig.enqueue([{ count: "0" }]);

    const { createPage } = await getWriteTools();
    await createPage.handler({
      title: "Concept Page",
      type: ["concept"],
      body: "x",
      frontmatter: {},
    });

    const [, content] = fsRig.writeFile.mock.calls[0];
    expect(content).toContain("cssclasses:");
    expect(content).toMatch(/cssclasses:\s*\n\s*-\s*"concept"/);
  });

  it("rejects an invalid page type", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]); // loadPageTypeConfig

    const { createPage } = await getWriteTools();
    await expect(
      createPage.handler({
        title: "Bad",
        type: ["nonsense"],
        body: "x",
        frontmatter: {},
      })
    ).rejects.toThrow(/Invalid page type/);
  });

  it("rejects when required commitment fields are missing", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);

    const { createPage } = await getWriteTools();
    await expect(
      createPage.handler({
        title: "Promise to do X",
        type: ["commitment"],
        body: "x",
        frontmatter: { owner: "Mek" }, // missing counterparty/role/accountability/due/status
      })
    ).rejects.toThrow(/commitment.*require|counterparty|role|accountability|due|status/i);
  });

  it("rejects when an enum field has an invalid value", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);

    const { createPage } = await getWriteTools();
    await expect(
      createPage.handler({
        title: "C",
        type: ["commitment"],
        body: "x",
        frontmatter: {
          owner: "A",
          counterparty: "B",
          role: "r",
          accountability: "a",
          due: "2026-06-01",
          status: "wibble",
        },
      })
    ).rejects.toThrow(/status.*must be one of/);
  });

  it("rejects a field that does not belong on this page's types", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);

    const { createPage } = await getWriteTools();
    await expect(
      createPage.handler({
        title: "X",
        type: ["entity"],
        body: "x",
        frontmatter: { owner: "Mek" }, // owner is commitment-only
      })
    ).rejects.toThrow(/owner.*only valid on commitment/);
  });

  it("accepts shared optional fields (aliases, tags, related) on any type", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);
    dbRig.enqueue([{ id: 7 }]);
    dbRig.enqueue([{ count: "0" }]);

    const { createPage } = await getWriteTools();
    await expect(
      createPage.handler({
        title: "X",
        type: ["entity"],
        body: "x",
        frontmatter: {
          aliases: ["X-alias"],
          tags: ["t1"],
          related: ["[[Other]]"],
        },
      })
    ).resolves.toBeDefined();
  });

  it("throws when the title is already taken", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([{ id: 123 }]); // duplicate found

    const { createPage } = await getWriteTools();
    await expect(
      createPage.handler({
        title: "Exists",
        type: ["entity"],
        body: "x",
        frontmatter: {},
      })
    ).rejects.toThrow(/already exists/);
  });

  it("marks page as not-orphan when other pages link to it", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);
    dbRig.enqueue([{ id: 1 }]);
    dbRig.enqueue([{ count: "3" }]); // 3 pages link to it

    const { createPage } = await getWriteTools();
    const result = await createPage.handler({
      title: "Linked",
      type: ["entity"],
      body: "x",
      frontmatter: {},
    });
    expect(result.orphan).toBe(false);
  });
});

// ─── updatePage ───────────────────────────────────────────────

describe("updatePage", () => {
  it("updates body and merges frontmatter on existing page", async () => {
    const existing = makePageRow({
      id: 5,
      title: "Existing",
      file_path: "existing.md",
      type: ["entity"],
      frontmatter: {
        title: "Existing",
        type: ["entity"],
        cssclasses: ["entity"],
        created: "2026-04-01",
        updated: "2026-04-15",
      },
      summary: "old summary",
    });

    dbRig.enqueue([existing]); // fetch existing
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]); // validateTypes
    dbRig.enqueue([{ id: 5 }]); // syncToPostgres

    const { updatePage } = await getWriteTools();
    const result = await updatePage.handler({
      title: "Existing",
      body: "New body content with [[X]] link.",
      frontmatter_updates: { tags: ["fresh"] },
      summary: "new summary",
    });

    expect(result.id).toBe(5);
    expect(fsRig.writeFile).toHaveBeenCalledOnce();
    const [, content] = fsRig.writeFile.mock.calls[0];
    expect(stripFrontmatter(content as string)).toBe(
      "New body content with [[X]] link."
    );
    expect(content).toContain("summary: new summary");
    // Frontmatter merge — tags added, original fields preserved
    expect(content).toMatch(/tags:\s*\n\s*-\s*"fresh"/);
    expect(content).toContain("created: 2026-04-01");

    expect(embedRig.embed).toHaveBeenCalledOnce();
    expect(gitRig.commits[0]).toBe("update: Existing");
  });

  it("throws when page does not exist", async () => {
    dbRig.enqueue([]); // not found

    const { updatePage } = await getWriteTools();
    await expect(
      updatePage.handler({
        title: "Missing",
        body: "x",
        frontmatter_updates: {},
      })
    ).rejects.toThrow(/not found/);
  });

  it("keeps existing summary when none provided in update call", async () => {
    const existing = makePageRow({
      id: 5,
      title: "Existing",
      file_path: "existing.md",
      type: ["entity"],
      frontmatter: {
        title: "Existing",
        type: ["entity"],
        cssclasses: ["entity"],
        created: "2026-04-01",
        updated: "2026-04-15",
      },
      summary: "kept summary",
    });

    dbRig.enqueue([existing]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([{ id: 5 }]);

    const { updatePage } = await getWriteTools();
    await updatePage.handler({
      title: "Existing",
      body: "new body",
      frontmatter_updates: {},
    });

    const [, content] = fsRig.writeFile.mock.calls[0];
    expect(content).toContain("summary: kept summary");
  });
});

// ─── deletePage ───────────────────────────────────────────────

describe("deletePage", () => {
  it("soft-deletes the page row and moves the file to .trash/", async () => {
    dbRig.enqueue([{ id: 9, file_path: "doomed.md" }]); // fetch
    dbRig.enqueue([]); // UPDATE pages SET deleted = true

    const { deletePage } = await getWriteTools();
    // Pre-seed the file in the mock fs so rename succeeds
    const fs = await import("fs/promises");
    await fs.writeFile("/tmp/test-vault/memory/doomed.md", "body", "utf-8");

    const result = await deletePage.handler({ title: "Doomed" });

    expect(result.id).toBe(9);
    expect(fsRig.rename).toHaveBeenCalledOnce();
    const [src, dest] = fsRig.rename.mock.calls[0];
    expect(src).toMatch(/memory\/doomed\.md$/);
    expect(dest).toMatch(/\.trash\/doomed\.md$/);
    expect(gitRig.commits[0]).toBe("delete: Doomed");
  });

  it("tolerates missing file on disk (db row still soft-deleted)", async () => {
    dbRig.enqueue([{ id: 10, file_path: "ghost.md" }]);
    dbRig.enqueue([]);

    const { deletePage } = await getWriteTools();
    // Do NOT seed the file — rename will throw ENOENT
    const result = await deletePage.handler({ title: "Ghost" });

    expect(result.id).toBe(10);
    // The db update happened despite the missing file
    expect(dbRig.calls.some((c) => c.sql.includes("SET deleted = TRUE"))).toBe(
      true
    );
  });

  it("throws when page not found", async () => {
    dbRig.enqueue([]);
    const { deletePage } = await getWriteTools();
    await expect(deletePage.handler({ title: "Missing" })).rejects.toThrow(
      /not found/
    );
  });
});

// ─── captureNote ──────────────────────────────────────────────

describe("captureNote", () => {
  it("writes a note with default timestamped filename", async () => {
    const { captureNote } = await getWriteTools();
    const result = await captureNote.handler({ content: "hello world" });

    expect(result.file).toMatch(/^note_.*\.md$/);
    expect(fsRig.writeFile).toHaveBeenCalledOnce();
    const [path, content] = fsRig.writeFile.mock.calls[0];
    expect(path).toContain("test-ingress");
    expect(content).toBe("hello world");
  });

  it("uses provided name when given", async () => {
    const { captureNote } = await getWriteTools();
    const result = await captureNote.handler({
      content: "x",
      name: "my-note.md",
    });
    expect(result.file).toBe("my-note.md");
  });

  it("appends .md when name has no extension", async () => {
    const { captureNote } = await getWriteTools();
    const result = await captureNote.handler({ content: "x", name: "stuff" });
    expect(result.file).toBe("stuff.md");
  });

  it("sanitizes Windows-forbidden characters in name", async () => {
    const { captureNote } = await getWriteTools();
    const result = await captureNote.handler({
      content: "x",
      name: "bad:name?with*chars",
    });
    expect(result.file).toBe("bad_name_with_chars.md");
    expect(result.file).not.toMatch(/[:*?]/);
  });

  it("trims trailing dots and spaces before adding extension", async () => {
    const { captureNote } = await getWriteTools();
    const result = await captureNote.handler({
      content: "x",
      name: "name with trailing... ",
    });
    expect(result.file).toBe("name with trailing.md");
  });

  it("preserves an existing extension other than .md", async () => {
    const { captureNote } = await getWriteTools();
    const result = await captureNote.handler({
      content: "data",
      name: "table.csv",
    });
    expect(result.file).toBe("table.csv");
  });
});

// ─── captureReminder ──────────────────────────────────────────

describe("captureReminder", () => {
  it("creates reminder page with status pending", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]); // duplicate check
    dbRig.enqueue([{ id: 200 }]);

    const { captureReminder } = await getWriteTools();
    const result = await captureReminder.handler({
      title: "Follow up with Oladapo on RC91",
      body: "Context here.",
    });

    expect(result.status).toBe("pending");
    expect(result.due).toBeNull();
    const [, content] = fsRig.writeFile.mock.calls[0];
    expect(content).toContain("status: pending");
    expect(gitRig.commits[0]).toMatch(/^capture-reminder:/);
  });

  it("stores due date when provided", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);
    dbRig.enqueue([{ id: 201 }]);

    const { captureReminder } = await getWriteTools();
    const result = await captureReminder.handler({
      title: "Birthday",
      due: "2026-06-15",
    });
    expect(result.due).toBe("2026-06-15");
    const [, content] = fsRig.writeFile.mock.calls[0];
    expect(content).toContain("due: 2026-06-15");
  });

  it("rejects duplicate reminder title", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([{ id: 99 }]); // duplicate

    const { captureReminder } = await getWriteTools();
    await expect(
      captureReminder.handler({ title: "Dup" })
    ).rejects.toThrow(/already exists/);
  });
});

// ─── finalizeIngest (dispatchRetention) ───────────────────────

describe("finalizeIngest", () => {
  function seedFsForIngress(file: string, content = "raw") {
    return fsRig.writeFile(`/tmp/test-ingress/${file}`, content);
  }

  it("postgres label: writes raw_content + moves file to raw/", async () => {
    await seedFsForIngress("doc.md");

    dbRig.enqueue([]); // ingested_sources upsert
    dbRig.enqueue([]); // scan_state update
    dbRig.enqueue([]); // loadDiscardMode → no config-ingress-retention page
    dbRig.enqueue([{ id: 50 }]); // raw_content write

    const { finalizeIngest } = await getWriteTools();
    const result = await finalizeIngest.handler({
      file_path: "doc.md",
      file_modified: "2026-05-01T00:00:00Z",
      page_id: 50,
      label: "postgres",
      raw_content: "# converted markdown",
    });

    expect(result.effective_label).toBe("postgres");
    expect(result.postgres_written).toBe(true);
    expect(result.moved_to).toBeDefined();
    // File moved from ingress root to raw/ subfolder
    expect(fsRig.rename).toHaveBeenCalledOnce();
    const [src, dest] = fsRig.rename.mock.calls[0];
    expect(src).toMatch(/test-ingress\/doc\.md$/);
    expect(dest).toMatch(/test-ingress\/raw\/doc\.md$/);
  });

  it("fs label: moves to raw/ without writing raw_content", async () => {
    await seedFsForIngress("note.md");
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    dbRig.enqueue([]); // loadDiscardMode

    const { finalizeIngest } = await getWriteTools();
    const result = await finalizeIngest.handler({
      file_path: "note.md",
      file_modified: "2026-05-01T00:00:00Z",
      label: "fs",
    });

    expect(result.effective_label).toBe("fs");
    expect(result.postgres_written).toBe(false);
    expect(result.moved_to).toBeDefined();
    expect(fsRig.rename).toHaveBeenCalledOnce();
  });

  it("discard label in shadow mode redirects to fs (file moved to raw/)", async () => {
    await seedFsForIngress("transient.md");
    dbRig.enqueue([]); // upsert
    dbRig.enqueue([]); // scan_state
    dbRig.enqueue([
      { body: "- **discard_mode:** `shadow`" }, // loadDiscardMode → shadow
    ]);

    const { finalizeIngest } = await getWriteTools();
    const result = await finalizeIngest.handler({
      file_path: "transient.md",
      file_modified: "2026-05-01T00:00:00Z",
      label: "discard",
    });

    expect(result.requested_label).toBe("discard");
    expect(result.effective_label).toBe("fs");
    expect(result.shadow_applied).toBe(true);
    expect(result.deleted).toBe(false);
    expect(fsRig.rename).toHaveBeenCalledOnce();
    expect(fsRig.unlink).not.toHaveBeenCalled();
  });

  it("discard label in live mode deletes the file", async () => {
    await seedFsForIngress("nuke.md");
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    dbRig.enqueue([{ body: "discard_mode: live" }]); // live mode

    const { finalizeIngest } = await getWriteTools();
    const result = await finalizeIngest.handler({
      file_path: "nuke.md",
      file_modified: "2026-05-01T00:00:00Z",
      label: "discard",
    });

    expect(result.effective_label).toBe("discard");
    expect(result.deleted).toBe(true);
    expect(result.shadow_applied).toBe(false);
    expect(fsRig.unlink).toHaveBeenCalledOnce();
  });

  it("rejects path traversal attempts", async () => {
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    dbRig.enqueue([]);

    const { finalizeIngest } = await getWriteTools();
    await expect(
      finalizeIngest.handler({
        file_path: "../escape.md",
        file_modified: "2026-05-01T00:00:00Z",
        label: "fs",
      })
    ).rejects.toThrow(/Path traversal/);
  });

  it("postgres label requires page_id", async () => {
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    dbRig.enqueue([]);

    const { finalizeIngest } = await getWriteTools();
    await expect(
      finalizeIngest.handler({
        file_path: "x.md",
        file_modified: "2026-05-01T00:00:00Z",
        label: "postgres",
        raw_content: "x",
      })
    ).rejects.toThrow(/page_id is required/);
  });

  it("postgres label requires raw_content", async () => {
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    dbRig.enqueue([]);

    const { finalizeIngest } = await getWriteTools();
    await expect(
      finalizeIngest.handler({
        file_path: "x.md",
        file_modified: "2026-05-01T00:00:00Z",
        page_id: 1,
        label: "postgres",
      })
    ).rejects.toThrow(/raw_content is required/);
  });

  it("defaults to shadow mode when config-ingress-retention page is missing", async () => {
    await seedFsForIngress("orphan.md");
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    dbRig.enqueue([]); // empty rows → no config page → fail-closed shadow

    const { finalizeIngest } = await getWriteTools();
    const result = await finalizeIngest.handler({
      file_path: "orphan.md",
      file_modified: "2026-05-01T00:00:00Z",
      label: "discard",
    });
    expect(result.discard_mode).toBe("shadow");
    expect(result.effective_label).toBe("fs");
  });
});

// ─── batchUpsertPages ─────────────────────────────────────────

describe("batchUpsertPages", () => {
  it("creates new pages and updates existing pages in a single batch", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]); // loadPageTypeConfig
    dbRig.enqueue([
      // existing rows lookup — second page exists
      makePageRow({
        id: 99,
        title: "Existing Entity",
        file_path: "existing-entity.md",
        type: ["entity"],
        frontmatter: {
          title: "Existing Entity",
          type: ["entity"],
          cssclasses: ["entity"],
          created: "2026-04-01",
          updated: "2026-04-15",
        },
        summary: "old",
      }),
    ]);
    // For NEW page: syncToPostgres + orphan check
    dbRig.enqueue([{ id: 100 }]);
    dbRig.enqueue([{ count: "0" }]);
    // For EXISTING page: syncToPostgres
    dbRig.enqueue([{ id: 99 }]);

    const { batchUpsertPages } = await getWriteTools();
    const result = await batchUpsertPages.handler({
      pages: [
        { title: "New Concept", type: ["concept"], body: "fresh" },
        {
          title: "Existing Entity",
          type: ["entity"],
          body: "updated body",
          summary: "new",
        },
      ],
    });

    expect(result.total).toBe(2);
    expect(result.succeeded).toBe(2);
    expect(result.failed).toBe(0);
    const actions = result.results.map((r: any) => r.action);
    expect(actions).toContain("created");
    expect(actions).toContain("updated");

    // Single git commit at end of batch
    expect(gitRig.commits).toHaveLength(1);
    expect(gitRig.commits[0]).toMatch(/batch-upsert/);
  });

  it("collects per-page errors and continues processing the rest", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]); // existing-rows lookup — no matches

    // First page (valid concept) — syncToPostgres + orphan check
    dbRig.enqueue([{ id: 11 }]);
    dbRig.enqueue([{ count: "0" }]);
    // Second page is invalid type — no DB calls reach this

    const { batchUpsertPages } = await getWriteTools();
    const result = await batchUpsertPages.handler({
      pages: [
        { title: "Good Concept", type: ["concept"], body: "x" },
        { title: "Bad", type: ["nonsense"], body: "x" }, // invalid type
      ],
    });

    expect(result.succeeded).toBe(1);
    expect(result.failed).toBe(1);
    expect(result.errors?.[0].title).toBe("Bad");
    expect(result.errors?.[0].error).toMatch(/Invalid page type/);
  });

  it("emits no git commit when every page in batch fails", async () => {
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]); // existing-rows lookup

    const { batchUpsertPages } = await getWriteTools();
    const result = await batchUpsertPages.handler({
      pages: [{ title: "Bad", type: ["nope"], body: "x" }],
    });

    expect(result.succeeded).toBe(0);
    expect(result.failed).toBe(1);
    expect(gitRig.commits).toHaveLength(0);
  });
});

// ─── updatePageFrontmatter ────────────────────────────────────
// New tool added to fix the body-truncation defect class. Body is read
// server-side from Postgres and never enters the caller's context, so
// frontmatter-only updates can't truncate body content.

describe("updatePageFrontmatter", () => {
  function existingRow(overrides: Partial<any> = {}) {
    return {
      id: 50,
      file_path: "source-config-slack.md",
      type: ["source-config"],
      frontmatter: {
        title: "source-config-slack",
        type: ["source-config"],
        cssclasses: ["source-config"],
        created: "2026-04-11",
        updated: "2026-05-04",
        last_processed: "2026-05-04T17:14:30Z",
      },
      body: "## Connection\nLong canonical body content with directives.\n\n## Directives\nLayer 1, Layer 2, etc.",
      summary: "Slack source config",
      ...overrides,
    };
  }

  it("updates frontmatter and writes file with body UNCHANGED", async () => {
    dbRig.enqueue([existingRow()]); // SELECT existing
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]); // validateTypes
    dbRig.enqueue([]); // UPDATE pages

    const { updatePageFrontmatter } = await getWriteTools();
    const result = await updatePageFrontmatter.handler({
      title: "source-config-slack",
      frontmatter_updates: { last_processed: "2026-05-06T18:00:00Z" },
    });

    expect(result.id).toBe(50);
    expect(result.embedding_regenerated).toBe(false);

    expect(fsRig.writeFile).toHaveBeenCalledOnce();
    const [filePath, content] = fsRig.writeFile.mock.calls[0];
    expect(filePath).toMatch(/source-config-slack\.md$/);

    // Body preserved EXACTLY
    expect(stripFrontmatter(content as string)).toBe(
      "## Connection\nLong canonical body content with directives.\n\n## Directives\nLayer 1, Layer 2, etc."
    );

    // Frontmatter merge: last_processed advanced, original fields kept
    expect(content).toContain('last_processed: "2026-05-06T18:00:00Z"');
    expect(content).toContain("created: 2026-04-11");
    expect(content).toContain("title: source-config-slack");

    // Embedding NOT regenerated (body + summary unchanged)
    expect(embedRig.embed).not.toHaveBeenCalled();

    // Git commit uses dedicated prefix
    expect(gitRig.commits).toEqual(["update-frontmatter: source-config-slack"]);
  });

  it("preserves existing summary when none provided", async () => {
    dbRig.enqueue([existingRow()]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { updatePageFrontmatter } = await getWriteTools();
    await updatePageFrontmatter.handler({
      title: "source-config-slack",
      frontmatter_updates: {},
    });

    const [, content] = fsRig.writeFile.mock.calls[0];
    expect(content).toContain("summary: Slack source config");
  });

  it("regenerates embedding when summary changes", async () => {
    dbRig.enqueue([existingRow()]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { updatePageFrontmatter } = await getWriteTools();
    const result = await updatePageFrontmatter.handler({
      title: "source-config-slack",
      frontmatter_updates: {},
      summary: "Updated summary text",
    });

    expect(result.embedding_regenerated).toBe(true);
    expect(embedRig.embed).toHaveBeenCalledOnce();
    // Embedding text uses NEW summary + EXISTING body
    expect(embedRig.texts[0]).toContain("Updated summary text");
    expect(embedRig.texts[0]).toContain("Long canonical body content");
  });

  it("does NOT regenerate embedding when summary param matches existing", async () => {
    dbRig.enqueue([existingRow()]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { updatePageFrontmatter } = await getWriteTools();
    const result = await updatePageFrontmatter.handler({
      title: "source-config-slack",
      frontmatter_updates: {},
      summary: "Slack source config", // same value
    });

    expect(result.embedding_regenerated).toBe(false);
    expect(embedRig.embed).not.toHaveBeenCalled();
  });

  it("throws when the page does not exist", async () => {
    dbRig.enqueue([]); // not found

    const { updatePageFrontmatter } = await getWriteTools();
    await expect(
      updatePageFrontmatter.handler({
        title: "Missing",
        frontmatter_updates: {},
      })
    ).rejects.toThrow(/not found/);
  });

  it("validates merged frontmatter (rejects bad enum value)", async () => {
    dbRig.enqueue([
      existingRow({
        type: ["situation"],
        frontmatter: {
          title: "Some Situation",
          type: ["situation"],
          cssclasses: ["situation"],
          created: "2026-04-01",
          updated: "2026-04-15",
          status: "developing",
          accountability: "ops",
          role: "cto",
        },
      }),
    ]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);

    const { updatePageFrontmatter } = await getWriteTools();
    await expect(
      updatePageFrontmatter.handler({
        title: "Some Situation",
        frontmatter_updates: { status: "wibbly" }, // not in enum
      })
    ).rejects.toThrow(/status.*must be one of/);
  });

  it("validates merged frontmatter (rejects field that does not belong to type)", async () => {
    dbRig.enqueue([
      existingRow({
        type: ["entity"],
        frontmatter: {
          title: "Just Entity",
          type: ["entity"],
          cssclasses: ["entity"],
          created: "2026-04-01",
          updated: "2026-04-15",
        },
      }),
    ]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);

    const { updatePageFrontmatter } = await getWriteTools();
    await expect(
      updatePageFrontmatter.handler({
        title: "Just Entity",
        frontmatter_updates: { owner: "Mek" }, // owner is commitment-only
      })
    ).rejects.toThrow(/owner.*only valid on commitment/);
  });

  it("UPDATE statement omits embedding column when summary unchanged", async () => {
    dbRig.enqueue([existingRow()]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { updatePageFrontmatter } = await getWriteTools();
    await updatePageFrontmatter.handler({
      title: "source-config-slack",
      frontmatter_updates: { last_processed: "2026-05-06T18:00:00Z" },
    });

    const updateCall = dbRig.calls.find((c) =>
      c.sql.includes("UPDATE pages SET")
    );
    expect(updateCall).toBeDefined();
    expect(updateCall!.sql).not.toContain("embedding");
  });

  it("UPDATE statement includes embedding column when summary changes", async () => {
    dbRig.enqueue([existingRow()]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { updatePageFrontmatter } = await getWriteTools();
    await updatePageFrontmatter.handler({
      title: "source-config-slack",
      frontmatter_updates: {},
      summary: "Different",
    });

    const updateCall = dbRig.calls.find((c) =>
      c.sql.includes("UPDATE pages SET")
    );
    expect(updateCall).toBeDefined();
    expect(updateCall!.sql).toMatch(/embedding\s*=/);
  });

  it("REGRESSION GUARD: 246-line body survives a frontmatter-only update", async () => {
    // The defect we're fixing: config-salience commit 4d004d5 lost 222 lines
    // from a 246-line body in one update. This test simulates that scenario —
    // a large body must come through untouched.
    const largeBody = Array.from({ length: 246 }, (_, i) => `line ${i}`).join(
      "\n"
    );
    dbRig.enqueue([existingRow({ body: largeBody })]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { updatePageFrontmatter } = await getWriteTools();
    await updatePageFrontmatter.handler({
      title: "source-config-slack",
      frontmatter_updates: { last_processed: "2026-05-06T18:00:00Z" },
    });

    const [, content] = fsRig.writeFile.mock.calls[0];
    const writtenBody = stripFrontmatter(content as string);
    expect(writtenBody).toBe(largeBody);
    expect(writtenBody.split("\n")).toHaveLength(246);
  });
});

// ─── appendToPageSection ──────────────────────────────────────
// Server-side body patch — appends content to a named section without the
// caller ever holding the body. Sister tool to update_page_frontmatter.

describe("appendToPageSection", () => {
  function pageWithBody(body: string) {
    return {
      id: 77,
      file_path: "config-salience.md",
      type: ["config"],
      frontmatter: {
        title: "config-salience",
        type: ["config"],
        cssclasses: ["config"],
        created: "2026-04-11",
        updated: "2026-05-01",
      },
      body,
      summary: "salience config",
    };
  }

  it("appends content at end of section (before next same-level heading)", async () => {
    const body = `## Tuning Log

- tuple A
- tuple B

## Other Section

other content`;
    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    const result = await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Tuning Log",
      content: "- tuple C",
    });

    expect(result.id).toBe(77);
    const [, written] = fsRig.writeFile.mock.calls[0];
    const newBody = stripFrontmatter(written as string);
    expect(newBody).toBe(`## Tuning Log

- tuple A
- tuple B

- tuple C

## Other Section

other content`);
  });

  it("appends at EOF when section is the last in the page", async () => {
    const body = `## Intro

intro text

## Tuning Log

- tuple A`;
    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Tuning Log",
      content: "- tuple B",
    });

    const [, written] = fsRig.writeFile.mock.calls[0];
    expect(stripFrontmatter(written as string)).toBe(`## Intro

intro text

## Tuning Log

- tuple A

- tuple B`);
  });

  it("appends into an empty section", async () => {
    const body = `## Tuning Log

## Other Section

other`;
    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Tuning Log",
      content: "- first tuple",
    });

    const [, written] = fsRig.writeFile.mock.calls[0];
    expect(stripFrontmatter(written as string)).toBe(`## Tuning Log

- first tuple

## Other Section

other`);
  });

  it("preserves multi-line content as-is", async () => {
    const body = `## Tuning Log

- tuple A`;
    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Tuning Log",
      content: "- tuple B with\n  multiple lines\n  of content",
    });

    const [, written] = fsRig.writeFile.mock.calls[0];
    expect(stripFrontmatter(written as string)).toContain(
      "- tuple B with\n  multiple lines\n  of content"
    );
  });

  it("does not stop at a sub-heading (### inside ## section)", async () => {
    // The next heading at level 3 (###) does NOT terminate a level-2 (##)
    // section. Append must skip past the sub-heading and any content under it
    // until the next ## or EOF.
    const body = `## Tuning Log

- tuple A

### Improve phase note

inner content

## Another Section

other`;
    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Tuning Log",
      content: "- tuple B",
    });

    const [, written] = fsRig.writeFile.mock.calls[0];
    const newBody = stripFrontmatter(written as string);
    // Append happens AT END of "## Tuning Log" section — i.e., right before
    // "## Another Section". The ### sub-heading is part of the Tuning Log
    // section per same-or-higher-level-only termination rule.
    expect(newBody).toBe(`## Tuning Log

- tuple A

### Improve phase note

inner content

- tuple B

## Another Section

other`);
  });

  it("can target a sub-heading directly (### terminates at next ### or ##)", async () => {
    const body = `## Tuning Log

- tuple A

### Improve phase note — 2026-04-22

note content

### Improve phase note — 2026-05-06

newer note

## Other`;
    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "### Improve phase note — 2026-04-22",
      content: "- additional note line",
    });

    const [, written] = fsRig.writeFile.mock.calls[0];
    expect(stripFrontmatter(written as string)).toBe(`## Tuning Log

- tuple A

### Improve phase note — 2026-04-22

note content

- additional note line

### Improve phase note — 2026-05-06

newer note

## Other`);
  });

  it("throws when section_heading is not found", async () => {
    const body = `## Tuning Log

- tuple A`;
    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);

    const { appendToPageSection } = await getWriteTools();
    await expect(
      appendToPageSection.handler({
        title: "config-salience",
        section_heading: "## Nonexistent Section",
        content: "x",
      })
    ).rejects.toThrow(/not found/);
  });

  it("throws when section_heading is malformed (no '#' prefix)", async () => {
    dbRig.enqueue([pageWithBody("body")]);

    const { appendToPageSection } = await getWriteTools();
    await expect(
      appendToPageSection.handler({
        title: "config-salience",
        section_heading: "Tuning Log", // missing '##'
        content: "x",
      })
    ).rejects.toThrow(/Invalid section_heading/);
  });

  it("throws when page does not exist", async () => {
    dbRig.enqueue([]);
    const { appendToPageSection } = await getWriteTools();
    await expect(
      appendToPageSection.handler({
        title: "Missing",
        section_heading: "## X",
        content: "y",
      })
    ).rejects.toThrow(/not found/);
  });

  it("regenerates the embedding (body changed)", async () => {
    dbRig.enqueue([pageWithBody("## Section\n\noriginal")]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Section",
      content: "appended",
    });

    expect(embedRig.embed).toHaveBeenCalledOnce();
    expect(embedRig.texts[0]).toContain("appended");
  });

  it("uses 'append-section:' prefix in git commit message", async () => {
    dbRig.enqueue([pageWithBody("## Section\n\noriginal")]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Section",
      content: "x",
    });

    expect(gitRig.commits[0]).toBe(
      "append-section: config-salience → ## Section"
    );
  });

  it("body content BEFORE and AFTER the target section is byte-identical", async () => {
    const before = "# Top\n\nTop content lives here.\n\n## Other Section\n\nlots of content\n\nincluding line breaks\n";
    const target = "## Tuning Log\n\n- existing tuple";
    const after = "\n\n## Last Section\n\nfinal content";
    const body = before + target + after;

    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Tuning Log",
      content: "- new tuple",
    });

    const [, written] = fsRig.writeFile.mock.calls[0];
    const newBody = stripFrontmatter(written as string);
    expect(newBody.startsWith(before)).toBe(true);
    expect(newBody.endsWith(after)).toBe(true);
  });

  it("REGRESSION GUARD: appends to a 246-line body without losing existing content", async () => {
    // Mirror of the update_page_frontmatter regression guard — same defect
    // class, this tool also keeps body server-side.
    const tuples = Array.from({ length: 240 }, (_, i) => `- tuple ${i}`).join(
      "\n"
    );
    const body = `## Tuning Log\n\n${tuples}\n\n## End`;

    dbRig.enqueue([pageWithBody(body)]);
    dbRig.enqueue([{ body: PAGE_TYPES_BODY }]);
    dbRig.enqueue([]);

    const { appendToPageSection } = await getWriteTools();
    await appendToPageSection.handler({
      title: "config-salience",
      section_heading: "## Tuning Log",
      content: "- tuple 240",
    });

    const [, written] = fsRig.writeFile.mock.calls[0];
    const newBody = stripFrontmatter(written as string);
    // All 240 original tuples present + new one
    for (let i = 0; i < 240; i++) {
      expect(newBody).toContain(`- tuple ${i}`);
    }
    expect(newBody).toContain("- tuple 240");
    expect(newBody).toContain("## End");
  });
});
