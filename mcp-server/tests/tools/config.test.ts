/**
 * Tests for src/tools/config.ts — get_config only.
 *
 * update_config was removed (2026-05-07). Its capabilities are covered by
 * update_page_frontmatter / update_page / append_to_page_section in write.ts,
 * which have their own test coverage in tests/tools/write.test.ts.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { makeMockQuery } from "../helpers.js";

const dbRig = makeMockQuery();

vi.mock("../../src/db.js", () => ({
  query: (...args: any[]) => dbRig.query(...args),
  getClient: vi.fn(),
  shutdown: vi.fn(),
  pool: {},
}));

async function getConfigTools() {
  return import("../../src/tools/config.js");
}

beforeEach(() => {
  dbRig.reset();
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

// ─── configTools registration ─────────────────────────────────

describe("configTools registration", () => {
  it("exports only getConfig (update_config removed 2026-05-07)", async () => {
    const { configTools } = await getConfigTools();
    expect(configTools).toHaveLength(1);
    expect(configTools[0].name).toBe("get_config");
  });

  it("does not export updateConfig", async () => {
    const mod = await getConfigTools();
    expect((mod as any).updateConfig).toBeUndefined();
  });
});
