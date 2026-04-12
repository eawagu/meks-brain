import { exec } from "child_process";
import { promisify } from "util";
import { config } from "./config.js";

const execAsync = promisify(exec);

/**
 * Stage all changed files in the vault (respects .gitignore), then commit with a descriptive message.
 * No-ops if there are no changes to commit.
 */
export async function gitCommit(message: string): Promise<boolean> {
  const cwd = config.vaultPath;

  try {
    // Stage memory/
    await execAsync("git add memory/ .trash/", { cwd });

    // Check if there's anything staged
    const { stdout: status } = await execAsync(
      "git diff --cached --quiet || echo CHANGES",
      { cwd }
    );

    if (!status.includes("CHANGES")) {
      return false; // Nothing to commit
    }

    await execAsync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { cwd });

    // Git lock workaround (from CLAUDE.md Git Lock Workaround)
    await cleanGitLocks(cwd);

    return true;
  } catch (err: any) {
    // If git is not initialized or other git errors, log and continue
    // The MCP server should not fail because git isn't set up
    console.warn("Git commit skipped:", err.message);
    await cleanGitLocks(cwd);
    return false;
  }
}

async function cleanGitLocks(cwd: string): Promise<void> {
  try {
    const { stdout } = await execAsync(
      'ls .git/LOCK .git/index.lock 2>/dev/null || echo "no locks"',
      { cwd }
    );
    if (!stdout.includes("no locks")) {
      await execAsync("mkdir -p .git/trash && mv .git/LOCK .git/index.lock .git/trash/ 2>/dev/null || true", { cwd });
    }
  } catch {
    // Ignore — lock cleanup is best-effort
  }
}
