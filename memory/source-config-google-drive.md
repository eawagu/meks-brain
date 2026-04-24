---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only. Handling chain: detect → download → split transcript/non-transcript → process non-transcript layer as in-tick heartbeat source + (if transcript present) dispatch transcript to ingress via capture_note(name=drive-title). last_processed held at 2026-04-20T16:09:00Z pending Phase-2 backlog (20 files). 12:09 WAT Apr 24 skim-level tick: 0 NEW files in 11:09→12:09 WAT tick window (prior tick's Phoenix Stage 1 file already queued in Phase-2 backlog at its 09:23 UTC modifiedTime)."
updated: "2026-04-24T11:25:02Z"
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

### Tick 2026-04-24 12:09 WAT — skim-level, 0 new files in tick window

`search_files` scoped to `title contains 'Notes by Gemini' and modifiedTime > '2026-04-24T10:09:00Z'` returned 1 file (Phoenix Stage 1 Weekly Check in 2026/04/07) with modifiedTime 2026-04-24T09:23:03Z — this file was detected and queued at the 11:09 WAT prior tick; its modifiedTime pre-dates the 11:09→12:09 WAT window, so no new detection this tick. Phase-2 backlog unchanged at 20 files. `last_processed` remains held at 2026-04-20T16:09:00Z per hold policy.

### Tick 2026-04-24 11:09 WAT — skim-level, 1 NEW file in tick window (preserved)

`search_files` scoped to `title contains 'Notes by Gemini' and modifiedTime > '2026-04-24T09:09:00Z'` returned **1 file**:
- **Phoenix Stage 1 - Weekly Check in - 2026/04/07 16:59 BST - Notes by Gemini** (fileId `1onYwTlta_f5aBFTlqAsZj3cIKDH1qp6BxCRC66PPn40`; owner ravi.jakhodia@moniepoint.com; modifiedTime 2026-04-24T09:23:03Z = 10:23 WAT; sharedWithMeTime 10:23 WAT). File queued for Phase-2 backlog dispatch. Correlates to Slack/Gmail cross-source — Ravi owns both the Gemini-transcription ingest and the follow-up invitation flow.

### Tick 2026-04-24 10:09 WAT — skim-level, zero new files in tick window (preserved)

`search_files` scoped to `title contains 'Notes by Gemini' and modifiedTime > '2026-04-24T08:10:00Z'` returned **0 files**.

### Tick 2026-04-24 09:10 WAT — skim-level, zero new files in tick window (preserved)

`search_files` scoped to `title contains 'Notes by Gemini' and modifiedTime > '2026-04-24T07:09:00Z'` returned 0 files.

### Tick 2026-04-24 08:09 WAT — skim-level, zero new files in tick window (preserved)

`search_files` scoped to `title contains 'Notes by Gemini' and modifiedTime > '2026-04-20T16:09:00Z'` returned the **same 5 pre-existing files** surfaced by prior ticks — no file modifiedTime falls inside the 07:10→08:09 WAT tick window.

File set unchanged from prior ticks:
- Interview for Head of Engineering (VP+ level) — Apr 23 15:47 WAT
- Disbursement-CBA integration architecture review — Apr 22 15:19 WAT
- Disbursement Issues & Next steps — Apr 22 20:13 WAT
- Direct to Bank : Daily stand up — Apr 22 08:14 WAT
- Project delivery and optimization realignment — Apr 23 16:17 WAT

### Tick 2026-04-20 17:09 WAT Full-level (condensed — pre-dark)

Zero new Notes-by-Gemini files in the 16:09→17:09 WAT window.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Drive MCP returned auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 ticks pre-recovery. Recovery confirmed 09:11 WAT Apr 23.

### Phase-2 backlog — preserved context (20 files, unchanged this tick)

19 files modified between 2026-04-14 and 2026-04-22 identified in the Apr 23 retrofit backlog; +1 new file detected 11:09 WAT Apr 24 tick (Phoenix Stage 1 Weekly Check-in 2026/04/07) brings backlog to **20 files**. Batch 1 dispatched: 4 SKIPPED on "no transcript section" (correct disposition); 1 file OK CAPTURED (Direct to Bank 04-16 08:14) with possible over-match flag. Batches 2–4 dispatch continuing with tightened instruction. `last_processed` deferred until all 20 files processed.
