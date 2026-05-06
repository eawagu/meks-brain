/**
 * Tests for src/tools/read.ts — search, get_page, batch_get_pages,
 * list_commitments, get_stats, check_ingress, triage, lint_queries.
 *
 * Read tools are pure DB-query wrappers + embedding generation for search.
 * Tests focus on: SQL parameter binding, result mapping, edge cases (not found,
 * empty inputs, invalid args), and per-query-type branching for lint_queries.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FAKE_EMBEDDING } from "../fixtures.js";
import { makeMockEmbed, makeMockQuery } from "../helpers.js";

const dbRig = makeMockQuery();
const embedRig = makeMockEmbed(FAKE_EMBEDDING);

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

async function getReadTools() {
  return import("../../src/tools/read.js");
}

beforeEach(() => {
  dbRig.reset();
  embedRig.reset();
});

afterEach(() => {
  vi.clearAllMocks();
});

// ─── search ───────────────────────────────────────────────────

describe("search", () => {
  it("calls embed for the query and runs hybrid_search SQL", async () => {
    dbRig.enqueue([
      {
        id: 1,
        title: "Result A",
        file_path: "result-a.md",
        type: ["entity"],
        summary: "summary A",
        body_snippet: "snippet A",
        frontmatter: {},
        rrf_score: "0.5",
        text_rank: "0.3",
        vector_similarity: "0.8",
      },
    ]);

    const { search } = await getReadTools();
    const result = await search.handler({
      query: "RC91",
      limit: 10,
      type_filter: undefined,
    });

    expect(embedRig.embed).toHaveBeenCalledWith("RC91");
    expect(dbRig.calls[0].sql).toContain("hybrid_search");
    expect(result.count).toBe(1);
    expect(result.results[0]).toMatchObject({
      id: 1,
      title: "Result A",
      rrf_score: 0.5,
      text_rank: 0.3,
      vector_similarity: 0.8,
    });
  });

  it("passes type_filter through when supplied", async () => {
    dbRig.enqueue([]);
    const { search } = await getReadTools();
    await search.handler({
      query: "x",
      type_filter: ["entity", "concept"],
      limit: 5,
    });
    const call = dbRig.calls[0];
    expect(call.params?.[3]).toEqual(["entity", "concept"]);
  });

  it("returns empty results for unmatched queries", async () => {
    dbRig.enqueue([]);
    const { search } = await getReadTools();
    const result = await search.handler({ query: "nothing", limit: 10 });
    expect(result.count).toBe(0);
    expect(result.results).toEqual([]);
  });
});

// ─── getPage ──────────────────────────────────────────────────

describe("getPage", () => {
  it("looks up by title when provided", async () => {
    dbRig.enqueue([
      {
        id: 7,
        title: "Found",
        file_path: "found.md",
        type: ["entity"],
        frontmatter: { title: "Found", type: ["entity"] },
        body: "body content",
        summary: "s",
        created_at: "2026-04-01",
        updated_at: "2026-05-01",
      },
    ]);

    const { getPage } = await getReadTools();
    const result = await getPage.handler({ title: "Found" });
    expect(result.found).toBe(true);
    expect(result.page).toMatchObject({
      id: 7,
      title: "Found",
      body: "body content",
    });
    expect(dbRig.calls[0].sql).toMatch(/title = \$1/);
    expect(dbRig.calls[0].params).toEqual(["Found"]);
  });

  it("looks up by id when title is not provided", async () => {
    dbRig.enqueue([
      {
        id: 11,
        title: "By ID",
        file_path: "by-id.md",
        type: ["entity"],
        frontmatter: {},
        body: "x",
        summary: null,
        created_at: "2026-04-01",
        updated_at: "2026-05-01",
      },
    ]);

    const { getPage } = await getReadTools();
    const result = await getPage.handler({ id: 11 });
    expect(result.found).toBe(true);
    expect(dbRig.calls[0].sql).toMatch(/WHERE id = \$1/);
    expect(dbRig.calls[0].params).toEqual([11]);
  });

  it("returns found:false when page does not exist", async () => {
    dbRig.enqueue([]);
    const { getPage } = await getReadTools();
    const result = await getPage.handler({ title: "Missing" });
    expect(result.found).toBe(false);
    expect(result.page).toBeNull();
  });

  it("throws when neither title nor id is provided", async () => {
    const { getPage } = await getReadTools();
    await expect(getPage.handler({})).rejects.toThrow(/Either title or id/);
  });
});

// ─── batchGetPages ────────────────────────────────────────────

describe("batchGetPages", () => {
  it("returns rows preserving input title order, marking missing", async () => {
    dbRig.enqueue([
      // Note: DB returns in arbitrary order — handler must reorder
      {
        id: 2,
        title: "B",
        file_path: "b.md",
        type: ["concept"],
        frontmatter: {},
        body: "b body",
        summary: null,
        created_at: "2026-04-01",
        updated_at: "2026-05-01",
      },
      {
        id: 1,
        title: "A",
        file_path: "a.md",
        type: ["entity"],
        frontmatter: {},
        body: "a body",
        summary: null,
        created_at: "2026-04-01",
        updated_at: "2026-05-01",
      },
    ]);

    const { batchGetPages } = await getReadTools();
    const result = await batchGetPages.handler({ titles: ["A", "C", "B"] });

    expect(result.requested).toBe(3);
    expect(result.found).toBe(2);
    expect(result.missing).toBe(1);
    expect(result.pages.map((p: any) => p.title)).toEqual(["A", "C", "B"]);
    expect(result.pages[0].exists).toBe(true);
    expect(result.pages[1].exists).toBe(false);
    expect(result.pages[2].exists).toBe(true);
  });

  it("handles all-missing batch", async () => {
    dbRig.enqueue([]);
    const { batchGetPages } = await getReadTools();
    const result = await batchGetPages.handler({ titles: ["X", "Y"] });
    expect(result.found).toBe(0);
    expect(result.missing).toBe(2);
    expect(result.pages.every((p: any) => !p.exists)).toBe(true);
  });
});

// ─── listCommitments ──────────────────────────────────────────

describe("listCommitments", () => {
  it("filters by status when provided", async () => {
    dbRig.enqueue([
      {
        id: 1,
        title: "Promise",
        frontmatter: {
          owner: "Mek",
          counterparty: "X",
          role: "cto",
          accountability: "a",
          due: "2026-06-01",
          status: "open",
        },
        summary: "s",
        created_at: "2026-04-01",
        updated_at: "2026-05-01",
      },
    ]);

    const { listCommitments } = await getReadTools();
    const result = await listCommitments.handler({ status: "open", limit: 20 });
    expect(result.count).toBe(1);
    expect(result.commitments[0].owner).toBe("Mek");
    expect(dbRig.calls[0].sql).toMatch(/frontmatter->>'status' = \$1/);
    expect(dbRig.calls[0].params).toEqual(["open", 20]);
  });

  it("omits status filter when not provided", async () => {
    dbRig.enqueue([]);
    const { listCommitments } = await getReadTools();
    await listCommitments.handler({ limit: 5 });
    expect(dbRig.calls[0].sql).not.toMatch(/frontmatter->>'status'/);
    expect(dbRig.calls[0].params).toEqual([5]);
  });
});

// ─── getStats ─────────────────────────────────────────────────

describe("getStats", () => {
  it("aggregates 3 queries: counts by type, recent, open commitments", async () => {
    dbRig.enqueue([
      { page_type: "entity", count: "100" },
      { page_type: "concept", count: "30" },
    ]);
    dbRig.enqueue([
      { id: 1, title: "Latest", type: ["entity"], updated_at: "2026-05-06" },
    ]);
    dbRig.enqueue([{ count: "12" }]);

    const { getStats } = await getReadTools();
    const result = await getStats.handler({});

    expect(result.page_counts).toEqual([
      { type: "entity", count: 100 },
      { type: "concept", count: 30 },
    ]);
    expect(result.recently_updated).toHaveLength(1);
    expect(result.open_commitments).toBe(12);
  });
});

// ─── checkIngress ─────────────────────────────────────────────

describe("checkIngress", () => {
  it("returns last_ingress_scan and total_ingested_sources", async () => {
    dbRig.enqueue([{ value: "2026-05-06T12:00:00Z" }]);
    dbRig.enqueue([{ count: "42" }]);
    const { checkIngress } = await getReadTools();
    const result = await checkIngress.handler({});
    expect(result.last_ingress_scan).toBe("2026-05-06T12:00:00Z");
    expect(result.total_ingested_sources).toBe(42);
  });

  it("returns null last_ingress_scan when no scan has run yet", async () => {
    dbRig.enqueue([]);
    dbRig.enqueue([{ count: "0" }]);
    const { checkIngress } = await getReadTools();
    const result = await checkIngress.handler({});
    expect(result.last_ingress_scan).toBeNull();
    expect(result.total_ingested_sources).toBe(0);
  });
});

// ─── triage ───────────────────────────────────────────────────

describe("triage", () => {
  it("loads all 3 configs + today's briefing", async () => {
    // configs lookup
    dbRig.enqueue([
      {
        title: "config-triage",
        type: ["config"],
        frontmatter: {},
        body: "triage protocol",
        summary: null,
        updated_at: "2026-05-01",
      },
      {
        title: "config-briefing",
        type: ["config"],
        frontmatter: {},
        body: "briefing format",
        summary: null,
        updated_at: "2026-05-01",
      },
      {
        title: "config-user",
        type: ["config"],
        frontmatter: {},
        body: "Current timezone: `Africa/Lagos`",
        summary: null,
        updated_at: "2026-05-01",
      },
    ]);
    // briefing lookup
    dbRig.enqueue([
      {
        id: 999,
        title: "briefing-2026-05-06",
        file_path: "briefing-2026-05-06.md",
        type: ["briefing"],
        frontmatter: { status: "current" },
        body: "today's briefing",
        summary: null,
        created_at: "2026-05-06",
        updated_at: "2026-05-06",
      },
    ]);

    const { triage } = await getReadTools();
    const result = await triage.handler({ date: "2026-05-06" });

    expect(result.briefing_date).toBe("2026-05-06");
    expect(result.briefing_page?.title).toBe("briefing-2026-05-06");
    expect(result.config_triage).toBeDefined();
    expect(result.config_briefing).toBeDefined();
    expect(result.config_user).toBeDefined();
    expect(result.missing_configs).toEqual([]);
  });

  it("flags missing configs in result", async () => {
    dbRig.enqueue([
      {
        title: "config-triage",
        type: ["config"],
        frontmatter: {},
        body: "x",
        summary: null,
        updated_at: "2026-05-01",
      },
    ]);
    dbRig.enqueue([]);

    const { triage } = await getReadTools();
    const result = await triage.handler({ date: "2026-05-06" });
    expect(result.missing_configs).toEqual(["config-briefing", "config-user"]);
  });

  it("returns null briefing_page when not found", async () => {
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    const { triage } = await getReadTools();
    const result = await triage.handler({ date: "2026-05-06" });
    expect(result.briefing_page).toBeNull();
  });

  it("uses provided date as-is when given", async () => {
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    const { triage } = await getReadTools();
    const result = await triage.handler({ date: "2026-04-15" });
    expect(result.briefing_date).toBe("2026-04-15");
    // Verify briefing lookup used the date param
    const briefingCall = dbRig.calls[1];
    expect(briefingCall.params).toEqual(["briefing-2026-04-15"]);
  });
});

// ─── lintQueries ──────────────────────────────────────────────

describe("lintQueries", () => {
  it("stale_claims returns rows with gap_days", async () => {
    dbRig.enqueue([
      {
        id: 1,
        title: "Stale Entity",
        type: ["entity"],
        page_updated: "2026-04-01",
        newest_source_updated: "2026-05-01",
        gap_days: 30,
      },
    ]);
    const { lintQueries } = await getReadTools();
    const result = await lintQueries.handler({
      query_type: "stale_claims",
      limit: 50,
    });
    expect(result.query_type).toBe("stale_claims");
    expect(result.results[0].gap_days).toBe(30);
  });

  it("concept_gaps returns wiki-link terms with no page", async () => {
    dbRig.enqueue([
      {
        term: "Orphan Term",
        occurrence_count: "5",
        sample_pages: ["Page A", "Page B"],
      },
    ]);
    const { lintQueries } = await getReadTools();
    const result = await lintQueries.handler({
      query_type: "concept_gaps",
      limit: 50,
    });
    expect(result.results[0].occurrence_count).toBe(5);
    expect(result.results[0].sample_pages).toEqual(["Page A", "Page B"]);
  });

  it("synthesis_candidates returns entities/concepts with many source refs", async () => {
    dbRig.enqueue([
      {
        id: 1,
        title: "Cluster",
        type: ["entity"],
        source_count: "8",
      },
    ]);
    const { lintQueries } = await getReadTools();
    const result = await lintQueries.handler({
      query_type: "synthesis_candidates",
      limit: 50,
    });
    expect(result.results[0].source_count).toBe(8);
  });

  it("stale_syntheses returns syntheses outdated by newer related pages", async () => {
    dbRig.enqueue([
      {
        synthesis_id: 1,
        synthesis_title: "Synth",
        synthesis_updated: "2026-04-01",
        newest_related_updated: "2026-05-01",
        gap_days: 30,
      },
    ]);
    const { lintQueries } = await getReadTools();
    const result = await lintQueries.handler({
      query_type: "stale_syntheses",
      limit: 50,
    });
    expect(result.results[0].gap_days).toBe(30);
  });

  it("respects the limit parameter", async () => {
    dbRig.enqueue([]);
    const { lintQueries } = await getReadTools();
    await lintQueries.handler({
      query_type: "stale_claims",
      limit: 7,
    });
    expect(dbRig.calls[0].params).toEqual([7]);
  });
});
