import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url";
import { query } from "../db.js";
import { config } from "../config.js";
import type { ToolDef } from "./types.js";

const execFileAsync = promisify(execFile);

// converter.py lives in src/ — resolve relative to project root
const __ingress_dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__ingress_dirname, "..", "..");  // dist/tools/ → dist/ → project root
const CONVERTER_PATH = path.join(PROJECT_ROOT, "src", "converter.py");

const PYTHON_CMD = config.pythonCmd;

// ─── scan_ingress ─────────────────────────────────────────────

export const scanIngress: ToolDef = {
  name: "scan_ingress",
  description:
    "Scan the ingress folder for new or modified files. Compares filesystem against ingested_sources in Postgres. Returns files that need processing. Excludes the review/ subfolder (per D8 — scheduled ingest ignores review/).",
  schema: z.object({
    include_review: z
      .boolean()
      .default(false)
      .describe(
        "Include files in the review/ subfolder (default: false — only set true for manual full ingest)"
      ),
  }),
  accessLevel: "read",
  handler: async (params) => {
    const { include_review } = params;

    // Get all ingested sources from Postgres
    const ingested = await query(
      "SELECT file_path, file_modified FROM ingested_sources"
    );
    const ingestedMap = new Map<string, string>(
      ingested.rows.map((r: any) => [r.file_path, r.file_modified])
    );

    // Walk the ingress folder
    const candidates: Array<{
      file_path: string;
      absolute_path: string;
      size: number;
      modified: string;
      status: "new" | "modified";
    }> = [];

    async function walk(dir: string) {
      let entries;
      try {
        entries = await fs.readdir(dir, { withFileTypes: true });
      } catch {
        return; // folder doesn't exist or not accessible
      }

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.relative(config.ingressPath, fullPath);

        // Use fs.stat to follow symlinks (OneDrive uses symlinks on Windows)
        let stat;
        try {
          stat = await fs.stat(fullPath);
        } catch {
          continue; // broken symlink or inaccessible
        }

        if (stat.isDirectory()) {
          // Skip review/ unless explicitly included
          if (
            !include_review &&
            (entry.name === "review" || relPath.startsWith("review" + path.sep))
          ) {
            continue;
          }
          await walk(fullPath);
        } else if (stat.isFile()) {
          // Skip review/ files unless included
          if (!include_review && relPath.startsWith("review" + path.sep)) {
            continue;
          }
          const modified = stat.mtime.toISOString();
          const existingModified = ingestedMap.get(relPath);

          if (!existingModified) {
            // New file — not in Postgres
            candidates.push({
              file_path: relPath,
              absolute_path: fullPath,
              size: stat.size,
              modified,
              status: "new",
            });
          } else if (new Date(modified) > new Date(existingModified)) {
            // Modified — filesystem timestamp newer than recorded
            candidates.push({
              file_path: relPath,
              absolute_path: fullPath,
              size: stat.size,
              modified,
              status: "modified",
            });
          }
        }
      }
    }

    await walk(config.ingressPath);

    // Update last scan timestamp
    await query(
      `INSERT INTO scan_state (key, value) VALUES ('last_ingress_scan', NOW())
       ON CONFLICT (key) DO UPDATE SET value = NOW()`
    );

    return {
      total_candidates: candidates.length,
      new_files: candidates.filter((c) => c.status === "new").length,
      modified_files: candidates.filter((c) => c.status === "modified").length,
      files: candidates.map((c) => ({
        file_path: c.file_path,
        size: c.size,
        modified: c.modified,
        status: c.status,
      })),
    };
  },
};

// ─── read_ingress ─────────────────────────────────────────────

export const readIngress: ToolDef = {
  name: "read_ingress",
  description:
    "Read a file from the ingress folder, converting it to markdown on the fly. Supports all common formats: text, documents (docx, doc, rtf, epub), slides (pptx, ppt), spreadsheets (xlsx, xls), PDF, images (OCR), email (eml, msg), audio/video (transcription), and archives (zip, tar.gz, rar, 7z). Unknown formats return an error and the file is moved to review/.",
  schema: z.object({
    file_path: z
      .string()
      .describe(
        "Relative path of the file within the ingress folder (as returned by scan_ingress)"
      ),
  }),
  accessLevel: "read",
  handler: async (params) => {
    const { file_path } = params;
    const absolutePath = path.join(config.ingressPath, file_path);

    // Verify the file exists and is within the ingress folder (prevent path traversal)
    const resolved = path.resolve(absolutePath);
    if (!resolved.startsWith(path.resolve(config.ingressPath))) {
      throw new Error("Path traversal detected — file must be within ingress folder");
    }

    try {
      await fs.access(resolved);
    } catch {
      throw new Error(`File not found: ${file_path}`);
    }

    const stat = await fs.stat(resolved);

    try {
      const { stdout, stderr } = await execFileAsync(
        PYTHON_CMD,
        [CONVERTER_PATH, resolved],
        {
          timeout: 600_000, // 10 minutes for large files / transcription
          maxBuffer: 50 * 1024 * 1024, // 50MB output buffer
          env: {
            ...process.env,
            PYTHONIOENCODING: "utf-8",
            TESSERACT_CMD: config.tesseractCmd,
            PANDOC_CMD: config.pandocCmd,
            LIBREOFFICE_CMD: config.libreofficeCmd,
            SEVENZ_CMD: config.sevenzCmd,
          },
        }
      );

      // Check for warnings on stderr (non-fatal)
      const warnings = stderr?.trim() || null;

      return {
        file_path,
        size: stat.size,
        modified: stat.mtime.toISOString(),
        content: stdout,
        warnings,
      };
    } catch (err: any) {
      // Timeout — transient, throw so file stays for retry next scan
      if (err.killed) {
        throw new Error(
          `Conversion timed out for ${file_path} — will retry next scan`
        );
      }

      // Exit code 2 = unknown format — move to review/
      if (err.code === 2 || err.status === 2) {
        const unknownExt = err.stderr?.trim() || path.extname(file_path);

        const reviewDest = path.join(config.ingressReviewPath, file_path);
        await fs.mkdir(path.dirname(reviewDest), { recursive: true });
        try {
          await fs.rename(resolved, reviewDest);
        } catch {
          await fs.copyFile(resolved, reviewDest);
          await fs.unlink(resolved);
        }

        return {
          file_path,
          error: "unknown_format",
          extension: unknownExt,
          moved_to: path.relative(config.ingressPath, reviewDest),
          message: `Unknown format "${unknownExt}" — moved to review/ for manual processing`,
        };
      }

      // Exit code 1 = conversion failed (missing dependency, corrupt file, etc.) — move to review/
      const reason = err.stderr?.trim() || err.message || "unknown error";
      const reviewDest = path.join(config.ingressReviewPath, file_path);
      await fs.mkdir(path.dirname(reviewDest), { recursive: true });
      try {
        await fs.rename(resolved, reviewDest);
      } catch {
        await fs.copyFile(resolved, reviewDest);
        await fs.unlink(resolved);
      }

      return {
        file_path,
        error: "conversion_failed",
        reason,
        moved_to: path.relative(config.ingressPath, reviewDest),
        message: `Conversion failed — moved to review/. Reason: ${reason}`,
      };
    }
  },
};

export const ingressTools = [scanIngress, readIngress];
