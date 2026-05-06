/**
 * Smoke test — validates that vitest infra works and module mocking is
 * effective before we write substantive tests. Should always pass.
 */
import { describe, expect, it, vi } from "vitest";

vi.mock("../src/db.js", () => ({
  query: vi.fn(async () => ({ rows: [], rowCount: 0 })),
  getClient: vi.fn(),
  shutdown: vi.fn(),
  pool: {},
}));

describe("test infrastructure smoke test", () => {
  it("env vars are set by setup.ts", () => {
    expect(process.env.PGHOST).toBe("localhost");
    expect(process.env.AZURE_OPENAI_API_KEY).toBe("test-key");
  });

  it("can import db with mock in place (no real pool created)", async () => {
    const db = await import("../src/db.js");
    expect(db.query).toBeDefined();
    const result = await db.query("SELECT 1");
    expect(result.rows).toEqual([]);
  });

  it("can import config without crashing", async () => {
    const { config } = await import("../src/config.js");
    expect(config.pgHost).toBe("localhost");
    expect(config.vaultPath).toBe("/tmp/test-vault");
  });
});
