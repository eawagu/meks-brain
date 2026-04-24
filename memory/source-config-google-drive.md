---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only. Handling chain: detect → download → split transcript/non-transcript → process non-transcript layer as in-tick heartbeat source + (if transcript present) dispatch transcript to ingress via capture_note(name=drive-title). last_processed held at 2026-04-20T16:09:00Z pending Phase-2 backlog (NOW 22 files). 13:09 WAT Apr 24 full-level tick: 2 NEW HoE-cluster files detected — Round 2 Venkatesh Purushothaman transcript (modifiedTime 12:10 WAT) + Deliberation: HoE batch interviews transcript (modifiedTime 12:51 WAT); both queued to Phase-2 backlog."
updated: "2026-04-24T13:27:07Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T16:09:00Z"
---

## Connection

Google Drive MCP. Scope: files whose title starts with "Notes by Gemini" (meeting transcription artifacts).

## Directives

### Scope
- Only "Notes by Gemini" files are in-scope. All other Drive activity is out-of-scope for this source.

### Handling chain — two-part split (detect → download → split → dispatch)

When a new or modified Notes-by-Gemini file is detected, the heartbeat MUST execute the full chain in-tick:

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

### Section detection heuristic
- Gemini documents have a machine-generated structure: a meta block at top (date, title, invited attendees, attachments, meeting records link), then structured sections (commonly `### Summary`, `### Decisions`, `### Action items`, `### Next steps`, `### Details`, possibly others), and sometimes a transcript section at the end.
- Split point: the first heading whose text contains "Transcript" (case-insensitive). Everything before is non-transcript layer; everything from that heading onward is transcript layer.
- The "Meeting records [Transcript](link)" line in the meta block is a link to a separate doc tab, NOT a section heading — do not split on it.
- Some Gemini docs embed transcript inline (typically larger files, 500KB+); others keep it only in a separate doc tab accessed via the link. `read_file_content` exports main-tab content only — separate-tab transcripts are unreachable through this path. Files without inline transcripts get zero ingress drops; their content is fully covered by step 3's non-transcript source page.
- Heuristic is best-effort. When uncertain whether a heading is the transcript start, prefer NOT splitting (over-capture to the non-transcript layer is recoverable; a wrong split wrecks both layers).

### Per-tick behavior
- `last_processed` advances to current tick time only after every in-window file has successfully completed the full chain (steps 1–3 for all files, plus step 4 for files with a transcript layer).
- Any file that fails to download / split / process / dispatch: do NOT advance `last_processed` past the failing file's `modifiedTime`; log the failure in the Notes section and retry next tick.

## Notes

### Tick 2026-04-24 14:09 WAT — full-level, 0 new files but 1 backlog file content-updated

`search_files` scoped to `title contains 'Notes by Gemini' and modifiedTime > '2026-04-24T12:09:00Z'` returned 3 files (server-side filter still lossy, client-side filter confirms). Client-side check `modifiedTime > '2026-04-24T12:09:00Z'`:

1. **Deliberation: Head of Engineering batch interviews - 2026/04/24 12:00 WEST - Notes by Gemini** (fileId `1GRwuLzdbZHzv1NujqSUlVBPuvlaOUW22coJ2Kb8vYnM`; owner chris.purkis@moniepoint.com; **modifiedTime 2026-04-24T12:21:44.823Z = 13:21 WAT — refreshed from 11:51 WAT at prior tick**). **Content update on existing Phase-2 backlog file.** The file was first detected at the 13:09 WAT tick (modifiedTime 11:51 UTC then); it has since been content-refreshed (Gemini likely adding/updating summary/details as transcription processes). No new file detection; backlog entry persists at its latest modifiedTime for when Phase-2 dispatch reaches it.

2. **Round 2 Venkatesh Purushothaman** (modifiedTime 11:10 UTC = 12:10 WAT) — predates 12:09 UTC cutoff, not a new detection this tick.

3. **Phoenix Stage 1** (modifiedTime 09:23 UTC) — predates cutoff.

**Phase-2 backlog count: 22 files (unchanged from prior tick).** No genuinely-new files this tick. One backlog file (Deliberation HoE) had modifiedTime refresh — does not alter backlog size but will be processed from the latest content when Phase-2 dispatch reaches it. `last_processed` remains held at 2026-04-20T16:09:00Z per hold policy.

Server-side filter lossiness persists — `modifiedTime > X` still returns files with modifiedTime < X. Continue applying client-side epoch filter as safety.

### Tick 2026-04-24 13:09 WAT — full-level, 2 NEW HoE-cluster files (preserved summary)

13:09 WAT Apr 24 tick: 2 NEW files detected — Round 2 Venkatesh Purushothaman transcript (modifiedTime 12:10 WAT) + Deliberation: HoE batch interviews transcript (modifiedTime 12:51 WAT); both queued to Phase-2 backlog. Backlog 20 → 22.

### Tick 2026-04-24 12:09 WAT — skim-level, 0 new files in tick window (preserved)

12:09 WAT Apr 24 tick: Phase-2 backlog unchanged at 20 files.

### Tick 2026-04-24 11:09 WAT — skim-level, 1 NEW file in tick window (preserved)

Phoenix Stage 1 Weekly Check in 2026/04/07 queued to Phase-2 backlog (19 → 20).

### Tick 2026-04-24 10:09 WAT — skim-level, zero new files in tick window (preserved)

### Tick 2026-04-24 09:10 WAT — skim-level, zero new files in tick window (preserved)

### Tick 2026-04-24 08:09 WAT — skim-level, zero new files in tick window (preserved)

Same 5 pre-existing files, no file modifiedTime inside 07:10→08:09 WAT.

### Tick 2026-04-20 17:09 WAT Full-level (condensed — pre-dark)

Zero new Notes-by-Gemini files.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Drive MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.

### Phase-2 backlog — 22 files as of 2026-04-24 14:09 WAT tick

Unchanged at 22 files. Deliberation HoE file has modifiedTime refresh 13:21 WAT but this is content update on existing backlog entry, not a new file. Phase-2 dispatch will pick up the latest content when it reaches this file. `last_processed` deferred until all 22 files processed.
