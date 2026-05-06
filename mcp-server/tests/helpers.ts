import { vi, type Mock } from "vitest";

/**
 * Build a mock `query` function that responds based on a sequence of canned
 * results OR a custom predicate. Each call consumes the next entry in the
 * sequence. Falls back to an empty result if the sequence is exhausted, which
 * surfaces as a "page not found" error in handlers — usually a clearer test
 * failure than a runtime undefined access.
 */
export interface QueryCall {
  sql: string;
  params: any[] | undefined;
}

export interface MockQueryRig {
  query: Mock;
  calls: QueryCall[];
  /** Push a canned response onto the response queue (FIFO). */
  enqueue(rows: any[]): void;
  /** Replace the response queue and any predicate matcher. */
  reset(): void;
}

export function makeMockQuery(): MockQueryRig {
  const responseQueue: any[][] = [];
  const calls: QueryCall[] = [];

  const query = vi.fn(async (sql: string, params?: any[]) => {
    calls.push({ sql, params });
    const rows = responseQueue.shift() ?? [];
    return {
      rows,
      rowCount: rows.length,
      command: "",
      oid: 0,
      fields: [],
    };
  });

  return {
    query,
    calls,
    enqueue(rows: any[]) {
      responseQueue.push(rows);
    },
    reset() {
      responseQueue.length = 0;
      calls.length = 0;
      query.mockClear();
    },
  };
}

/**
 * Tracking mock for `gitCommit` — records calls but never executes a real
 * git command. Tests assert on `commits` array length and message content.
 */
export interface GitMockRig {
  gitCommit: Mock;
  commits: string[];
  reset(): void;
}

export function makeMockGit(): GitMockRig {
  const commits: string[] = [];
  const gitCommit = vi.fn(async (message: string) => {
    commits.push(message);
    return true;
  });
  return {
    gitCommit,
    commits,
    reset() {
      commits.length = 0;
      gitCommit.mockClear();
    },
  };
}

/**
 * Tracking mock for the `embed` function. Returns a fixed vector every call.
 */
export interface EmbedMockRig {
  embed: Mock;
  embeddingText: Mock;
  texts: string[];
  reset(): void;
}

export function makeMockEmbed(fakeVector: number[]): EmbedMockRig {
  const texts: string[] = [];
  const embed = vi.fn(async (text: string) => {
    texts.push(text);
    return fakeVector;
  });
  const embeddingText = vi.fn(
    (title: string, summary: string | null, body: string) => {
      const parts = [title];
      if (summary) parts.push(summary);
      parts.push(body);
      return parts.join("\n\n");
    }
  );
  return {
    embed,
    embeddingText,
    texts,
    reset() {
      texts.length = 0;
      embed.mockClear();
      embeddingText.mockClear();
    },
  };
}

/**
 * In-memory filesystem mock — tracks writes by absolute path.
 */
export interface FsMockRig {
  writeFile: Mock;
  readFile: Mock;
  rename: Mock;
  unlink: Mock;
  copyFile: Mock;
  mkdir: Mock;
  rmdir: Mock;
  files: Map<string, string>;
  reset(): void;
}

export function makeMockFs(): FsMockRig {
  const files = new Map<string, string>();

  const writeFile = vi.fn(async (path: string, content: string) => {
    files.set(path, content);
  });

  const readFile = vi.fn(async (path: string) => {
    if (!files.has(path)) {
      const err: NodeJS.ErrnoException = new Error(
        `ENOENT: no such file or directory, open '${path}'`
      );
      err.code = "ENOENT";
      throw err;
    }
    return files.get(path)!;
  });

  const rename = vi.fn(async (src: string, dest: string) => {
    if (!files.has(src)) {
      const err: NodeJS.ErrnoException = new Error(
        `ENOENT: no such file or directory, rename '${src}'`
      );
      err.code = "ENOENT";
      throw err;
    }
    files.set(dest, files.get(src)!);
    files.delete(src);
  });

  const unlink = vi.fn(async (path: string) => {
    if (!files.has(path)) {
      const err: NodeJS.ErrnoException = new Error(
        `ENOENT: no such file or directory, unlink '${path}'`
      );
      err.code = "ENOENT";
      throw err;
    }
    files.delete(path);
  });

  const copyFile = vi.fn(async (src: string, dest: string) => {
    if (!files.has(src)) {
      const err: NodeJS.ErrnoException = new Error(
        `ENOENT: no such file or directory, copyfile '${src}'`
      );
      err.code = "ENOENT";
      throw err;
    }
    files.set(dest, files.get(src)!);
  });

  const mkdir = vi.fn(async () => {
    // No-op — we don't track directories, only files.
  });

  const rmdir = vi.fn(async (path: string) => {
    // No-op — empty-parent cleanup is best-effort in production code too.
    // Tests that need to assert rmdir behavior should attach their own spy.
  });

  return {
    writeFile,
    readFile,
    rename,
    unlink,
    copyFile,
    mkdir,
    rmdir,
    files,
    reset() {
      files.clear();
      writeFile.mockClear();
      readFile.mockClear();
      rename.mockClear();
      unlink.mockClear();
      copyFile.mockClear();
      mkdir.mockClear();
      rmdir.mockClear();
    },
  };
}

/**
 * Strip frontmatter from a markdown string and return the body. Used in tests
 * that assert "the body remained unchanged" without needing to compare YAML
 * formatting byte-for-byte.
 */
export function stripFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\n[\s\S]*?\n---\n\n?([\s\S]*)$/);
  return match ? match[1] : markdown;
}

/**
 * Extract the YAML frontmatter block as a string. Useful for asserting on
 * specific keys/values without parsing.
 */
export function extractFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  return match ? match[1] : "";
}
