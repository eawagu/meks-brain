/**
 * Tests for src/tools/config.ts — get_config and update_config.
 *
 * update_config is the path heartbeat uses for source-config / config pages
 * and shares the same full-body-replace defect class as update_page. Tests
 * here lock in the existing behavior before update_page_frontmatter lands as
 * the recommended replacement for last_processed updates.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FAKE_EMBEDDING } from "../fixtures.js";
import {
  makeMockEmbed,
  makeMockFs,
  makeMockQuery,
  stripFrontmatter,
} from "../helpers.js";

const dbRig = makeMockQuery();
const embedRig = makeMockEmbed(FAKE_EMBEDDING);
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

async function getConfigTools() {
  return import("../../src/tools/config.js");
}

beforeEach(() => {
  dbRig.reset();
  embedRig.reset();
  fsRig.reset();
});

afterEach(() => {
  vi.clearAllMocks();
});

// ─── getConfig ────────────────────────────────────────────────

describe("getConfig", () => {
  it("returns the page when found", async () => {
    dbRig.enqueue([
      {
        id: 100,
        title: "config-salience",
        type: ["config"],
        frontmatter: { title: "config-salience" },
        body: "## Tuning Log\n\n...",
        summary: "salience config",
        updated_at: "2026-05-06",
      },
    ]);

    const { getConfig } = await getConfigTools();
    const result = await getConfig.handler({ title: "config-salience" });
    expect(result.found).toBe(true);
    expect(result.page).toMatchObject({
      id: 100,
      title: "config-salience",
      body: "## Tuning Log\n\n...",
    });
  });

  it("returns found:false when not a config or source-config page", async () => {
    dbRig.enqueue([]); // type filter excludes non-config pages
    const { getConfig } = await getConfigTools();
    const result = await getConfig.handler({ title: "Some Entity" });
    expect(result.found).toBe(false);
    expect(result.page).toBeNull();
  });

  it("filters on type via SQL — only config or source-config returned", async () => {
    dbRig.enqueue([]);
    const { getConfig } = await getConfigTools();
    await getConfig.handler({ title: "x" });
    expect(dbRig.calls[0].sql).toMatch(
      /type && ARRAY\['config', 'source-config'\]/
    );
  });
});

// ─── updateConfig ─────────────────────────────────────────────

describe("updateConfig", () => {
  function existingSourceConfigRow() {
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
      summary: "slack config",
    };
  }

  it("rewrites the file and Postgres row with new body + merged frontmatter", async () => {
    dbRig.enqueue([existingSourceConfigRow()]); // existing fetch
    dbRig.enqueue([]); // UPDATE pages

    const { updateConfig } = await getConfigTools();
    const result = await updateConfig.handler({
      title: "source-config-slack",
      body: "## Connection\nNew body here.",
      frontmatter_updates: { last_processed: "2026-05-06T18:00:00Z" },
    });

    expect(result.id).toBe(50);
    expect(fsRig.writeFile).toHaveBeenCalledOnce();
    const [, content] = fsRig.writeFile.mock.calls[0];
    expect(stripFrontmatter(content as string)).toBe(
      "## Connection\nNew body here."
    );
    // Merged frontmatter — last_processed advanced, original fields preserved
    expect(content).toContain('last_processed: "2026-05-06T18:00:00Z"');
    expect(content).toContain("created: 2026-04-11");

    // Postgres update issued
    const updateCall = dbRig.calls.find((c) =>
      c.sql.includes("UPDATE pages SET")
    );
    expect(updateCall).toBeDefined();

    // Embedding regenerated
    expect(embedRig.embed).toHaveBeenCalledOnce();
  });

  it("updates last_processed when explicitly provided in frontmatter_updates", async () => {
    dbRig.enqueue([existingSourceConfigRow()]);
    dbRig.enqueue([]);
    const { updateConfig } = await getConfigTools();
    await updateConfig.handler({
      title: "source-config-slack",
      body: "x",
      frontmatter_updates: { last_processed: "2026-05-06T18:00:00Z" },
    });
    const [, content] = fsRig.writeFile.mock.calls[0];
    expect(content).toContain('last_processed: "2026-05-06T18:00:00Z"');
  });

  it("preserves last_processed when frontmatter_updates omits it", async () => {
    dbRig.enqueue([existingSourceConfigRow()]);
    dbRig.enqueue([]);
    const { updateConfig } = await getConfigTools();
    await updateConfig.handler({
      title: "source-config-slack",
      body: "x",
      frontmatter_updates: {},
    });
    const [, content] = fsRig.writeFile.mock.calls[0];
    // last_processed from existing frontmatter is preserved via spread
    // (quoted because the ISO timestamp contains ':')
    expect(content).toContain('last_processed: "2026-05-04T17:14:30Z"');
  });

  it("throws when the config page does not exist", async () => {
    dbRig.enqueue([]);
    const { updateConfig } = await getConfigTools();
    await expect(
      updateConfig.handler({
        title: "missing-config",
        body: "x",
        frontmatter_updates: {},
      })
    ).rejects.toThrow(/not found/);
  });

  it("rejects updating a non-config page (filtered out by type ANY check)", async () => {
    dbRig.enqueue([]); // SQL filter requires config OR source-config in type
    const { updateConfig } = await getConfigTools();
    await expect(
      updateConfig.handler({
        title: "Regular Entity",
        body: "x",
        frontmatter_updates: {},
      })
    ).rejects.toThrow(/not found/);
  });

  it("CURRENT BEHAVIOR — body parameter fully replaces existing body (full-replace defect)", async () => {
    // This test locks in the buggy behavior before update_page_frontmatter
    // lands as the recommended frontmatter-only path. Documenting here so
    // anyone reading these tests understands why we added the new tool.
    dbRig.enqueue([
      {
        ...existingSourceConfigRow(),
        // original body in DB — large
      },
    ]);
    dbRig.enqueue([]);

    const { updateConfig } = await getConfigTools();
    await updateConfig.handler({
      title: "source-config-slack",
      body: "tiny body — original directives gone", // caller passed truncated body
      frontmatter_updates: {},
    });

    const [, content] = fsRig.writeFile.mock.calls[0];
    // The new tiny body replaced everything. Pre-existing directives are GONE.
    expect(stripFrontmatter(content as string)).toBe(
      "tiny body — original directives gone"
    );
  });
});
      "tiny body — original directives gone"
    );
  });
});
