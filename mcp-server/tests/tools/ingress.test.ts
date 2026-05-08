/**
 * Tests for src/tools/ingress.ts — scan_ingress and read_ingress.
 *
 * scan_ingress: directory walking with raw/ exclusion (always) and review/
 * exclusion (gated by include_review flag).
 *
 * read_ingress: path traversal protection, image content blocks,
 * oversize-image diversion to review/, converter error routing.
 *
 * Both tools rely on fs/promises and child_process — both fully mocked.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { makeMockQuery } from "../helpers.js";

const dbRig = makeMockQuery();

// ─── fs mock — supports directory walking + stat ──────────────
// More complex than the helpers.ts fs rig because scanIngress walks the tree.

interface FakeFsEntry {
  name: string;
  isDirectory: () => boolean;
  isFile: () => boolean;
}

interface FakeStat {
  isDirectory: () => boolean;
  isFile: () => boolean;
  size: number;
  mtime: Date;
}

// In-memory tree: path → entries (for dirs) | content (for files)
const fsTree = new Map<
  string,
  { kind: "dir"; children: string[] } | {
    kind: "file";
    size: number;
    mtime: Date;
    content: string;
  }
>();

function resetFs() {
  fsTree.clear();
}

function addDir(absPath: string, children: string[]) {
  fsTree.set(absPath, { kind: "dir", children });
}

function addFile(absPath: string, size = 100, content = "x") {
  fsTree.set(absPath, {
    kind: "file",
    size,
    mtime: new Date("2026-05-06T00:00:00Z"),
    content,
  });
}

vi.mock("fs/promises", () => {
  const readdir = vi.fn(
    async (dir: string, _opts: any): Promise<FakeFsEntry[]> => {
      const node = fsTree.get(dir);
      if (!node || node.kind !== "dir") {
        const err: NodeJS.ErrnoException = new Error(
          `ENOENT: no such directory, ${dir}`
        );
        err.code = "ENOENT";
        throw err;
      }
      return node.children.map((name) => {
        const child = fsTree.get(`${dir}/${name}`);
        return {
          name,
          isDirectory: () => child?.kind === "dir",
          isFile: () => child?.kind === "file",
        };
      });
    }
  );

  const stat = vi.fn(async (path: string): Promise<FakeStat> => {
    const node = fsTree.get(path);
    if (!node) {
      const err: NodeJS.ErrnoException = new Error(`ENOENT ${path}`);
      err.code = "ENOENT";
      throw err;
    }
    if (node.kind === "dir") {
      return {
        isDirectory: () => true,
        isFile: () => false,
        size: 0,
        mtime: new Date("2026-05-06T00:00:00Z"),
      };
    }
    return {
      isDirectory: () => false,
      isFile: () => true,
      size: node.size,
      mtime: node.mtime,
    };
  });

  const readFile = vi.fn(async (path: string) => {
    const node = fsTree.get(path);
    if (!node || node.kind !== "file") {
      const err: NodeJS.ErrnoException = new Error(`ENOENT ${path}`);
      err.code = "ENOENT";
      throw err;
    }
    return Buffer.from(node.content);
  });

  const access = vi.fn(async (path: string) => {
    if (!fsTree.has(path)) {
      const err: NodeJS.ErrnoException = new Error(`ENOENT ${path}`);
      err.code = "ENOENT";
      throw err;
    }
  });

  const writeFile = vi.fn(async () => {});
  const rename = vi.fn(async () => {});
  const unlink = vi.fn(async () => {});
  const copyFile = vi.fn(async () => {});
  const mkdir = vi.fn(async () => {});

  return {
    default: { readdir, stat, readFile, access, writeFile, rename, unlink, copyFile, mkdir },
    readdir,
    stat,
    readFile,
    access,
    writeFile,
    rename,
    unlink,
    copyFile,
    mkdir,
  };
});

// ─── child_process mock — for read_ingress's converter call ───
// readIngress uses `promisify(execFile)`. Node's promisify checks for the
// well-known symbol `nodejs.util.promisify.custom` to know how to unwrap
// multi-return-value callbacks (execFile returns both stdout AND stderr).
// Without it, promisify would only forward the first non-error callback arg.

const execFileMock = vi.fn();
const promisifyCustom = Symbol.for("nodejs.util.promisify.custom");

vi.mock("child_process", () => {
  const execFile: any = (...args: any[]) => {
    // Direct callback-style usage (not how readIngress uses it, but harmless)
    const cb = args[args.length - 1];
    execFileMock(...args.slice(0, -1)).then(
      (result: any) => cb(null, result.stdout, result.stderr),
      (err: any) => cb(err)
    );
  };
  execFile[promisifyCustom] = (...args: any[]) =>
    execFileMock(...args).then((result: any) => ({
      stdout: result.stdout,
      stderr: result.stderr,
    }));
  return { execFile };
});

vi.mock("../../src/db.js", () => ({
  query: (...args: any[]) => dbRig.query(...args),
  getClient: vi.fn(),
  shutdown: vi.fn(),
  pool: {},
}));

async function getIngressTools() {
  return import("../../src/tools/ingress.js");
}

beforeEach(() => {
  dbRig.reset();
  resetFs();
  execFileMock.mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

const INGRESS = "/tmp/test-ingress";

// ─── scanIngress ──────────────────────────────────────────────

describe("scanIngress", () => {
  it("returns new files at the ingress root", async () => {
    addDir(INGRESS, ["file-a.md", "file-b.txt"]);
    addFile(`${INGRESS}/file-a.md`);
    addFile(`${INGRESS}/file-b.txt`);

    dbRig.enqueue([]); // no ingested_sources rows
    dbRig.enqueue([]); // scan_state upsert

    const { scanIngress } = await getIngressTools();
    const result = await scanIngress.handler({ include_review: false });

    expect(result.total_candidates).toBe(2);
    expect(result.new_files).toBe(2);
    expect(result.modified_files).toBe(0);
    expect(result.files.map((f: any) => f.file_path).sort()).toEqual([
      "file-a.md",
      "file-b.txt",
    ]);
  });

  it("excludes raw/ subfolder always", async () => {
    addDir(INGRESS, ["regular.md", "raw"]);
    addDir(`${INGRESS}/raw`, ["should-not-appear.md"]);
    addFile(`${INGRESS}/regular.md`);
    addFile(`${INGRESS}/raw/should-not-appear.md`);

    dbRig.enqueue([]);
    dbRig.enqueue([]);

    const { scanIngress } = await getIngressTools();
    const result = await scanIngress.handler({ include_review: true });

    expect(result.files.map((f: any) => f.file_path)).toEqual(["regular.md"]);
  });

  it("excludes review/ subfolder when include_review is false", async () => {
    addDir(INGRESS, ["root.md", "review"]);
    addDir(`${INGRESS}/review`, ["under-review.md"]);
    addFile(`${INGRESS}/root.md`);
    addFile(`${INGRESS}/review/under-review.md`);

    dbRig.enqueue([]);
    dbRig.enqueue([]);

    const { scanIngress } = await getIngressTools();
    const result = await scanIngress.handler({ include_review: false });
    expect(result.files.map((f: any) => f.file_path)).toEqual(["root.md"]);
  });

  it("includes review/ subfolder when include_review is true", async () => {
    addDir(INGRESS, ["root.md", "review"]);
    addDir(`${INGRESS}/review`, ["under-review.md"]);
    addFile(`${INGRESS}/root.md`);
    addFile(`${INGRESS}/review/under-review.md`);

    dbRig.enqueue([]);
    dbRig.enqueue([]);

    const { scanIngress } = await getIngressTools();
    const result = await scanIngress.handler({ include_review: true });
    expect(result.files.map((f: any) => f.file_path).sort()).toEqual([
      "review/under-review.md",
      "root.md",
    ]);
  });

  it("marks files as modified when filesystem timestamp newer than recorded", async () => {
    addDir(INGRESS, ["changed.md"]);
    const node = {
      kind: "file" as const,
      size: 100,
      mtime: new Date("2026-05-06T12:00:00Z"),
      content: "x",
    };
    fsTree.set(`${INGRESS}/changed.md`, node);

    dbRig.enqueue([
      {
        file_path: "changed.md",
        file_modified: "2026-05-01T00:00:00Z",
      },
    ]);
    dbRig.enqueue([]);

    const { scanIngress } = await getIngressTools();
    const result = await scanIngress.handler({ include_review: false });

    expect(result.new_files).toBe(0);
    expect(result.modified_files).toBe(1);
    expect(result.files[0].status).toBe("modified");
  });

  it("skips files whose mtime equals recorded timestamp", async () => {
    addDir(INGRESS, ["same.md"]);
    const ts = "2026-05-06T00:00:00.000Z";
    fsTree.set(`${INGRESS}/same.md`, {
      kind: "file",
      size: 100,
      mtime: new Date(ts),
      content: "x",
    });

    dbRig.enqueue([{ file_path: "same.md", file_modified: ts }]);
    dbRig.enqueue([]);

    const { scanIngress } = await getIngressTools();
    const result = await scanIngress.handler({ include_review: false });
    expect(result.total_candidates).toBe(0);
  });

  it("recurses into nested subdirectories (excluding raw/ and review/)", async () => {
    addDir(INGRESS, ["projects"]);
    addDir(`${INGRESS}/projects`, ["alpha"]);
    addDir(`${INGRESS}/projects/alpha`, ["report.md"]);
    addFile(`${INGRESS}/projects/alpha/report.md`);

    dbRig.enqueue([]);
    dbRig.enqueue([]);

    const { scanIngress } = await getIngressTools();
    const result = await scanIngress.handler({ include_review: false });
    expect(result.files[0].file_path).toBe("projects/alpha/report.md");
  });

  it("updates scan_state.last_ingress_scan via upsert", async () => {
    addDir(INGRESS, []);
    dbRig.enqueue([]);
    dbRig.enqueue([]);
    const { scanIngress } = await getIngressTools();
    await scanIngress.handler({ include_review: false });
    const upsertCall = dbRig.calls.find((c) =>
      c.sql.includes("INSERT INTO scan_state")
    );
    expect(upsertCall).toBeDefined();
  });
});

// ─── readIngress ──────────────────────────────────────────────

describe("readIngress", () => {
  it("rejects path traversal", async () => {
    const { readIngress } = await getIngressTools();
    await expect(
      readIngress.handler({ file_path: "../../etc/passwd" })
    ).rejects.toThrow(/Path traversal/);
  });

  it("throws when file does not exist", async () => {
    const { readIngress } = await getIngressTools();
    await expect(
      readIngress.handler({ file_path: "missing.md" })
    ).rejects.toThrow(/File not found/);
  });

  it("returns image as MCP image content block for small images", async () => {
    addFile(`${INGRESS}/photo.png`, 1024, "PNGDATA");

    const { readIngress } = await getIngressTools();
    const result = await readIngress.handler({ file_path: "photo.png" });

    expect(result._content).toBeDefined();
    expect(result._content[0].type).toBe("image");
    expect(result._content[0].mimeType).toBe("image/png");
    // Base64 of "PNGDATA"
    expect(result._content[0].data).toBe(Buffer.from("PNGDATA").toString("base64"));
  });

  it("moves oversize images (>5MB) to review/ instead of returning content", async () => {
    addFile(`${INGRESS}/huge.jpg`, 6 * 1024 * 1024);

    const { readIngress } = await getIngressTools();
    const result = await readIngress.handler({ file_path: "huge.jpg" });

    expect(result.error).toBe("image_too_large");
    expect(result.moved_to).toMatch(/^review\/huge\.jpg$/);
  });

  it("calls converter and returns markdown for non-image files", async () => {
    addFile(`${INGRESS}/doc.docx`, 2048);
    execFileMock.mockResolvedValueOnce({
      stdout: "# Converted markdown",
      stderr: "",
    });

    const { readIngress } = await getIngressTools();
    const result = await readIngress.handler({ file_path: "doc.docx" });

    expect(result.content).toBe("# Converted markdown");
    expect(result.warnings).toBeNull();
    expect(execFileMock).toHaveBeenCalledOnce();
  });

  it("captures non-fatal stderr as warnings", async () => {
    addFile(`${INGRESS}/doc.docx`, 100);
    execFileMock.mockResolvedValueOnce({
      stdout: "ok",
      stderr: "Warning: minor formatting lost",
    });

    const { readIngress } = await getIngressTools();
    const result = await readIngress.handler({ file_path: "doc.docx" });

    expect(result.warnings).toBe("Warning: minor formatting lost");
  });

  it("routes unknown formats (exit code 2) to review/", async () => {
    addFile(`${INGRESS}/strange.xyz`, 100);
    const err: any = new Error("unknown format");
    err.code = 2;
    err.stderr = ".xyz";
    execFileMock.mockRejectedValueOnce(err);

    const { readIngress } = await getIngressTools();
    const result = await readIngress.handler({ file_path: "strange.xyz" });

    expect(result.error).toBe("unknown_format");
    expect(result.extension).toBe(".xyz");
    expect(result.moved_to).toMatch(/^review\/strange\.xyz$/);
  });

  it("routes conversion failures (non-2 exit) to review/", async () => {
    addFile(`${INGRESS}/broken.pdf`, 100);
    const err: any = new Error("conversion crashed");
    err.code = 1;
    err.stderr = "missing dependency: tesseract";
    execFileMock.mockRejectedValueOnce(err);

    const { readIngress } = await getIngressTools();
    const result = await readIngress.handler({ file_path: "broken.pdf" });

    expect(result.error).toBe("conversion_failed");
    expect(result.reason).toBe("missing dependency: tesseract");
  });

  it("re-throws on converter timeout (file stays for retry)", async () => {
    addFile(`${INGRESS}/slow.mp4`, 100);
    const err: any = new Error("timeout");
    err.killed = true;
    execFileMock.mockRejectedValueOnce(err);

    const { readIngress } = await getIngressTools();
    await expect(
      readIngress.handler({ file_path: "slow.mp4" })
    ).rejects.toThrow(/timed out/);
  });
});
