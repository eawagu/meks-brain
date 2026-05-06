import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    globals: false,
    setupFiles: ["./tests/setup.ts"],
    pool: "forks",
    // Tests should not run in parallel against shared mock state.
    // Forks isolate per-file; serial within a file via default vitest behaviour.
    fileParallelism: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/server.ts", "src/oauth.ts", "src/auth.ts"],
    },
  },
});
