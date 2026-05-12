---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only. Unified always-subagent handling chain — heartbeat never reads file content inline; all per-file processing dispatched to subagents to eliminate size-based context-overflow defers. No 300KB cap, no normal/dark-window split. last_processed advances to max(modifiedTime) regardless of per-file failures; failed files dispatched to ingress via capture_note (where ingest emits MISS calibration on any further failure). See designs/size-defer-fix.md."
updated: "2026-05-12T08:10:32Z"
cssclasses:
  - "source-config"
last_processed: "2026-05-03T17:15:00Z"
---




## Connection

Google Drive MCP. Scope: files whose title starts with "Notes by Gemini" (meeting transcription artifacts).

## Directives

### Scope
- Only "Notes by Gemini" files are in-scope. All other Drive activity is out-of-scope for this source.

### Handling chain — unified, always-subagent

For every in-window file detected during a tick, the heartbeat MUST dispatch per-file processing to a subagent (Task tool) with isolated context. The heartbeat itself NEVER reads file content inline. This eliminates context-budget defers regardless of file size — there is no size threshold and no separate "dark-window recovery" path.

**Per-file subagent procedure:**

1. **Download** the file content via Drive MCP `read_file_content`.
2. **Split** the downloaded content into two layers by section heading:
   - **Transcript layer** — everything from the first heading whose text contains "Transcript" (case-insensitive, matching `^##?#? *Transcript` or similar) to end-of-document. The "Meeting records [Transcript](link)" inline link in the meta block does NOT count — only a section heading triggers the split.
   - **Non-transcript layer** — everything else (meta block, `### Summary`, `### Decisions`, `### Action items`, `### Next steps`, `### Details`, and any other structured content outside the transcript). When no transcript heading is present, the non-transcript layer is the entire document.
3. **Process non-transcript layer as in-tick signal:**
   - Run `search` against the full brain for semantic matches (perfect cross-referencing per CLAUDE.md).
   - Update any matched entity/concept/situation pages with new content.
   - Create a `source` page (`create_page`) for the meeting. Frontmatter: `type: [source]`, `source_path: <Drive file title>`, plus `drive_file_id` and `drive_view_url` for traceability. Body: the extracted non-transcript content plus wiki-links to matched entities/concepts.
4. **Dispatch transcript layer to ingress** — only if a transcript layer was extracted in step 2. Call `capture_note` with:
   - `name` = the Drive file title (MCP server sanitizes Windows-forbidden characters and appends `.md`)
   - `content` = the transcript layer only (no size cap — full transcript regardless of length)
   - The ingest pipeline creates a separate source page with `source_path` matching the Drive title.
   - If no transcript layer was extracted, skip this step entirely.
5. **Return one-line confirmation** to the heartbeat (file ID, action taken — created N source pages, captured M ingress notes).

**Per-file subagent failure handling:**

If any step in the subagent procedure fails (download error, split error, page creation error, capture failure), the subagent MUST execute the failure-fallback path:

- Dispatch the FULL file content (or, if download failed, just the metadata: file ID, title, modifiedTime, owner) to ingress via `capture_note(name=<Drive title>, content=<full content or metadata stub + failure reason>)`. The ingest pipeline will then attempt conversion. If ingest also fails, it will move to `review/` and emit a MISS calibration tuple per `read_ingress` standard error handling — the defer is then visible in config-salience tuning log.
- Return failure confirmation to the heartbeat with file ID and one-line reason.

The heartbeat logs subagent failure reports but does NOT halt — proceeds immediately to the next file.

### Section detection heuristic
- Gemini documents have a machine-generated structure: a meta block at top (date, title, invited attendees, attachments, meeting records link), then structured sections (commonly `### Summary`, `### Decisions`, `### Action items`, `### Next steps`, `### Details`, possibly others), and sometimes a transcript section at the end.
- Split point: the first heading whose text contains "Transcript" (case-insensitive). Everything before is non-transcript layer; everything from that heading onward is transcript layer.
- The "Meeting records [Transcript](link)" line in the meta block is a link to a separate doc tab, NOT a section heading — do not split on it.
- Some Gemini docs embed transcript inline (typically larger files, 500KB+); others keep it only in a separate doc tab accessed via the link. `read_file_content` exports main-tab content only — separate-tab transcripts are unreachable through this path. Files without inline transcripts get zero ingress drops; their content is fully covered by step 3's non-transcript source page.
- Heuristic is best-effort. When uncertain whether a heading is the transcript start, prefer NOT splitting (over-capture to the non-transcript layer is recoverable; a wrong split wrecks both layers).

### Per-tick behavior

- `last_processed` advances to `max(modifiedTime)` across the in-window set after the batch completes, **regardless of per-file success or failure**. A single failed file MUST NOT block subsequent files in the window or hold the watermark back.
- The heartbeat MUST continue iteration on any per-file failure. Failed files are surfaced via the MISS calibration tuple emitted by `read_ingress` when ingest cannot convert them, not by holding `last_processed`.
- No per-file failed-files ledger on this page — the MISS tuple in config-salience tuning log is the durable signal. (See designs/size-defer-fix.md decision 9.)

## Notes

(Per config-heartbeat-prompt Source-config write scope directive: heartbeat MUST NOT modify body content. Tick-level audit lives in git history. This section intentionally empty.)
