/**
 * Vitest global setup — runs before any test module loads.
 *
 * Responsibilities:
 *   1. Set required env vars so `src/config.ts` loads cleanly without a real `.env`.
 *      Tests that need different values can override via `vi.stubEnv` per-test.
 *   2. Suppress the dotenv warning from `src/config.ts` reading a missing `.env`.
 *
 * Module-level mocks (db, embeddings, git, fs/promises) live in each test file
 * via `vi.mock` rather than here — keeps mock surface visible per-test and avoids
 * accidental coupling between unrelated tests.
 */

// Required by src/config.ts — values are placeholders; no real services are hit.
process.env.PGHOST = process.env.PGHOST ?? "localhost";
process.env.PGPORT = process.env.PGPORT ?? "5432";
process.env.PGDATABASE = process.env.PGDATABASE ?? "test_brain";
process.env.PGUSER = process.env.PGUSER ?? "test";
process.env.PGPASSWORD = process.env.PGPASSWORD ?? "test";
process.env.PGSSLMODE = process.env.PGSSLMODE ?? "disable";

process.env.VAULT_PATH = process.env.VAULT_PATH ?? "/tmp/test-vault";
process.env.INGRESS_PATH = process.env.INGRESS_PATH ?? "/tmp/test-ingress";

process.env.PUBLIC_ORIGIN = process.env.PUBLIC_ORIGIN ?? "http://localhost:3100";
process.env.TOKEN_READ = process.env.TOKEN_READ ?? "test-read-token";
process.env.TOKEN_WRITE = process.env.TOKEN_WRITE ?? "test-write-token";

process.env.AZURE_OPENAI_ENDPOINT =
  process.env.AZURE_OPENAI_ENDPOINT ?? "https://example.invalid";
process.env.AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "test-key";
process.env.AZURE_OPENAI_DEPLOYMENT =
  process.env.AZURE_OPENAI_DEPLOYMENT ?? "test-deployment";
process.env.AZURE_OPENAI_API_VERSION =
  process.env.AZURE_OPENAI_API_VERSION ?? "2024-06-01";
