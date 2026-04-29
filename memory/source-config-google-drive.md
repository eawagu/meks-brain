---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only. Handling chain: detect → download → split transcript/non-transcript → process non-transcript layer as in-tick heartbeat source + (if transcript present) dispatch transcript to ingress via capture_note(name=drive-title). last_processed held at 2026-04-20T16:09:00Z pending Phase-2 backlog (22 files). 06:09 WAT Apr 25 briefing-tick: 0 genuinely-new files; same 3 HoE/Phoenix files predate cutoff. Backlog unchanged."
updated: "2026-04-29T10:25:17Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-29T10:14:00Z"
---



## Connection

Google Drive MCP. Scope: files whose title starts with "Notes by Gemini" (meeting transcription artifacts).

## Directives

### Scope
- Only "Notes by Gemini" files are in-scope. All other Drive activity is out-of-scope for this source.

### Handling chain — normal-tick operation (detect → download → split → dispatch)

When a new or modified Notes-by-Gemini file is detected during a normal tick (i.e., not under dark-window recovery), the heartbeat MUST execute the full chain in-tick:

1. **Download** the file content via Drive MCP `read_file_content`.
2. **Split** the downloaded content into two layers by section:
   - **Transcript layer** — the transcript section, if a heading whose text contains the literal word "Transcript" (case-insensitive, matching `^##?#? *Transcript` or similar heading patterns) is present in the document body. The transcript layer is everything from that heading to end-of-document. The "Meeting records [Transcript](link)" inline link in the meta block does NOT count — only a section heading. If no such heading is present, the document has no inline transcript (often because Gemini keeps the transcript in a separate doc tab not retrieved by `read_file_content`).
   - **Non-transcript layer** — everything else. Meta block, `### Summary`, `### Decisions`, `### Action items`, `### Next steps`, `### Details`, and any other structured content outside the transcript. When no transcript heading is present, the non-transcript layer is the entire document.
3. **Process non-transcript layer as a heartbeat source** — treat the full non-transcript layer as in-tick signal:
   - Run `search` against the full brain for semantic matches (perfect cross-referencing per CLAUDE.md).
   - Update any matched entity/concept/situation pages with the new content.
   - Create a `source` page (via `create_page`) for the meeting. Frontmatter: `type: [source]`, `source_path: <Drive file title>`, plus `drive_file_id` and `drive_view_url` for traceability. Body: the extracted non-transcript content plus wiki-links to matched entities/concepts.
4. **Dispatch transcript to ingress** — only if a transcript layer was extracted in step 2. Call `capture_note` with:
   - `name` = the Drive file title (MCP server sanitizes Windows-forbidden characters and appends `.md`)
   - `content` = the transcript layer only
   - The ingest pipeline will create a separate source page with `source_path` matching the Drive title.
   - If no transcript layer was extracted, skip this step entirely. The non-transcript source page from step 3 is the full representation of the document; no ingress drop happens and nothing is lost.

This split keeps distilled content (summary / decisions / action items) and substantive discussion content (details) in the brain immediately at heartbeat time, while preserving full transcripts in the ingress stream for later full-fidelity retrieval. Files without inline transcripts are fully covered by step 3's non-transcript source page; the absence of a transcript is not a gap.

### Dark-window recovery — bulk-dispatch backlog drain

When Drive MCP recovers from a multi-tick outage and a backlog has accumulated (operationalized as: ≥3 in-window files OR `last_processed` more than 24h stale at tick time), the heartbeat MUST bypass the normal handling chain and execute the bulk-dispatch path instead:

1. **Enumerate** all in-window files via `search_files` (`title contains 'Notes by Gemini' and modifiedTime > '<last_processed>'`). Paginate fully.
2. **Per file, dispatch to ingress via `capture_note`** — no in-tick source page creation, no semantic-search integration:
   - **Files ≤300KB**: download full content; call `capture_note(name=<exact Drive title>, content=<metadata block + full content>)`.
   - **Files >300KB**: download full content; if a heading containing "Transcript" exists at top-level (`^##?#? *.*Transcript`), call `capture_note(name=<exact Drive title>, content=<metadata block + non-transcript content + omitted-transcript note>)`. The full transcript remains accessible via the Drive view URL — dropping it from ingress is a budget concession, not data loss.
   - **Metadata block** (prepended to all bulk-dispatch captures):
     ```
     # Notes
     
     Drive file ID: <id>
     Drive view URL: https://docs.google.com/document/d/<id>/edit
     Modified: <iso timestamp>
     Owner: <owner>
     ```
3. **Budget protection** — if the heartbeat's own context budget would be exceeded by reading large files inline, delegate to subagents (Task tool) with isolated context. Each subagent processes 1–2 files end-to-end (read → split → capture) and returns a one-line confirmation. The heartbeat only sees the confirmation, not the file content.
4. **Advance `last_processed`** to the current tick timestamp ONLY after every file has been successfully dispatched. If any file fails:
   - Log the failure in the Notes section.
   - Set `last_processed` to the most-recent successfully-processed file's `modifiedTime` so the next tick retries the failed file.
   - Continue dispatching the remaining files (errors don't block the batch).
5. **No Phase-2 dispatch deferral.** Bulk-dispatch IS the recovery mechanism — there is no separate Phase-2 process to hand off to. The "Phase-2 backlog hold" pattern that existed Apr 21–25 was a phantom reference to a non-existent mechanism and is now deprecated.

The bulk-dispatch path trades immediate brain integration (normal-chain step 3) for context-budget feasibility on large backlogs. The ingest pipeline picks up the captured notes on its own schedule and creates source pages with full integration. The cost is a delay between dispatch and full brain integration; the benefit is the heartbeat's tick stays bounded and the backlog actually drains.

### Section detection heuristic
- Gemini documents have a machine-generated structure: a meta block at top (date, title, invited attendees, attachments, meeting records link), then structured sections (commonly `### Summary`, `### Decisions`, `### Action items`, `### Next steps`, `### Details`, possibly others), and sometimes a transcript section at the end.
- Split point: the first heading whose text contains "Transcript" (case-insensitive). Everything before is non-transcript layer; everything from that heading onward is transcript layer.
- The "Meeting records [Transcript](link)" line in the meta block is a link to a separate doc tab, NOT a section heading — do not split on it.
- Some Gemini docs embed transcript inline (typically larger files, 500KB+); others keep it only in a separate doc tab accessed via the link. `read_file_content` exports main-tab content only — separate-tab transcripts are unreachable through this path. Files without inline transcripts get zero ingress drops; their content is fully covered by step 3's non-transcript source page.
- Heuristic is best-effort. When uncertain whether a heading is the transcript start, prefer NOT splitting (over-capture to the non-transcript layer is recoverable; a wrong split wrecks both layers).

### Per-tick behavior
- `last_processed` advances to current tick time only after every in-window file has successfully completed its handling path (either normal-chain steps 1–4 or dark-window-recovery steps 1–4 above).
- Any file that fails to download / split / process / dispatch: do NOT advance `last_processed` past the failing file's `modifiedTime`; log the failure in the Notes section and retry next tick.

## Notes

(Per config-heartbeat-prompt Source-config write scope directive: heartbeat MUST NOT modify body content. Tick-level audit lives in git history. This section intentionally empty.)