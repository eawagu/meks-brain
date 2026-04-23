---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only. Handling chain: detect → download → split summary/transcript → process summary as in-tick heartbeat source + dispatch transcript to ingress via capture_note(name=drive-title). 2026-04-23 phase-1 retrofit verified live via schema probe; phase-2 backfill dispatch unblocked at the server level. last_processed frozen at 2026-04-20T16:09:00Z pending phase-2 backfill kickoff."
updated: "2026-04-23T14:34:11Z"
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
   - **Summary layer** — the Gemini-generated top block: title/attendees/attachments metadata, `### Summary`, `### Decisions`, `### Action items` (and any adjacent highlights blocks). High-value distilled content.
   - **Transcript layer** — everything from the transcript/verbatim section onward. Full-fidelity meeting record.
3. **Process summary as a heartbeat source** — treat the summary layer as in-tick signal:
   - Run `search` against the full brain for semantic matches (perfect cross-referencing per CLAUDE.md).
   - Update any matched entity/concept/situation pages.
   - Create a `source` page (via `create_page`) for the meeting summary. Frontmatter: `type: [source]`, `source_path: <Drive file title>`, plus `drive_file_id` and `drive_view_url` for traceability. Body: the extracted summary layer plus wiki-links to matched entities/concepts.
4. **Dispatch transcript to ingress** — call [[capture_note]] with:
   - `name` = the Drive file title (MCP server sanitizes for filesystem safety and appends `.md`)
   - `content` = the transcript layer only
   - The ingest pipeline will create a separate source page with `source_path` matching the Drive title.

This split keeps high-value content (summary/decisions/action items) in the brain immediately at heartbeat time, while preserving the full transcript in the ingress stream for later full-fidelity retrieval and cross-reference.

### Section detection heuristic
- Gemini documents have a machine-generated structure: metadata block at top, `### Summary` heading, optional `### Decisions` and `### Action items` headings, and a transcript section (typically marked by a transcript/verbatim heading or a "Meeting records" block followed by the raw dialogue).
- Split point: the first heading that introduces the transcript/verbatim content. Everything before it is summary layer; everything from that heading onward is transcript layer.
- If no transcript section is present (e.g., very short meetings or empty Gemini output), treat the entire document as summary layer and skip the transcript `capture_note` call.
- Heuristic is best-effort; when uncertain, prefer over-capturing to the summary layer (heartbeat-processed) over under-capturing to ingress (delayed).

### Per-tick behavior
- `last_processed` advances to current tick time only after every in-window file has successfully completed the full chain (steps 1–4 above, or step 1–3 alone for no-transcript files).
- Any file that fails to download / split / dispatch: do NOT advance `last_processed` past the failing file's `modifiedTime`; log the failure in the Notes section and retry next tick. This preserves the detection→dispatch contract even under partial-failure conditions.

## Notes

### Tick 2026-04-20 17:09 WAT Full-level (condensed — pre-dark)

Zero new Notes-by-Gemini files in the 16:09→17:09 WAT window. Prior tick captured "Project delivery realignment" (15:00 WAT, Emmanuella Edeh).

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure)

Drive MCP returned auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 ticks pre-recovery. Surfaced as briefing-2026-04-22 B2 (joint with Gmail/Calendar) and briefing-2026-04-23 D4. New Notes-by-Gemini detection blind for the window.

### Tick 2026-04-23 ~09:11 WAT — RECOVERY (Full-level promotion on state change)

Probe scope: `search_files` with `title contains 'Notes by Gemini' and modifiedTime > '2026-04-20T16:09:00Z'`. Returned 5 new files (chronological):

1. **2026-04-20 15:06 UTC modified** — "Project delivery and optimization realignment" (Drive title `Project delivery and optimization realignment - 2026/04/20 15:00 WAT - Notes by Gemini`) — owner eedeh@ (Emmanuella Edeh). File ID 1aNYGgcSfKrUSRXf_PQFGi56dy26QyC_camXrxEkoju0. Pre-dark; referenced in Apr 20 17:09 WAT tick note but never ingested.
2. **2026-04-20 15:35 UTC modified** — "2026 Strategy Event Debrief" (Drive title `2026 Strategy Event Debrief - 2026/04/20 14:42 WAT - Notes by Gemini`) — owner dajalie@. File ID 1osWNfzZgjQYt39Tffcbq-9_4pbN3neTWoyexmRN30mc. Pre-dark; Strategy Retreat Day 2 debrief artifact.
3. **2026-04-21 12:52 UTC modified** — "Cards Team Str, Systems & Roadmap" (Drive title `Cards Team Str, Systems & Roadmap - 2026/04/21 13:00 WAT - Notes by Gemini`) — owner tracy.ojaigho@. File ID 1vzleqLcJJt7ETSFKkniIASPJpYhp93bJqxUX5wQbLg0. Relates to CI&P Team Structure invite (Apr 24 13:00 WAT Tracy).
4. **2026-04-22 15:19 UTC modified** — "Disbursement-CBA integration architecture review" (Drive title `Disbursement-CBA integration architecture review - 2026/04/22 19:30 IST - Notes by Gemini`) — owner prateek.gupta@. File ID 1cgoS4dOVfh72BhlYcZ5UmZ28LYqwJfVac3EXlpKw26w. **TDSD-6645 product-surface relevant.**
5. **2026-04-22 20:13 UTC modified** — "Disbursement Issues & Next steps" (Drive title `Disbursement Issues & Next steps – 2026/04/22 11:25 WAT – Notes by Gemini`) — owner temitayo.akinmola@. File ID 1jnbTD3yG5v_YHUr-REVC8hRVWc5bi1YSBbUXBWrI3h0. **Directly TDSD-6645 relevant.**

**Correction (2026-04-23 ~11:09 WAT tick):** the original 09:11 WAT tick-note claimed "All 5 routed to review/ subfolder per directive" — that was a misreading of the directive wording ("routed to ingress review" was misinterpreted as "move to the review/ subfolder"). The heartbeat did NOT physically move anything; no dispatch mechanism ran. The 5 files remained in Drive only. Awareness-tier signaling was the only real output of the tick.

**`last_processed` unchanged at 2026-04-20T16:09:00Z** — backlog deferred.

### Tick 2026-04-23 ~11:09 WAT — Full (design retrofit)

User-identified design regressions:

1. Directive "routed to ingress review" phrase was ambiguous and masked a larger design loss — the original intent was a two-part split (summary inline as heartbeat source; transcript only to ingress via capture_note). Neither half was being executed.
2. `capture_note` MCP tool had no way to preserve source-file provenance in filenames — all captures landed as `note_{timestamp}.md`, losing titles.
3. Gemini pipeline was running through ~Apr 14 (initial observation was Apr 11 — corrected to Apr 14 after user review), then silently broke: the heartbeat was switched from direct-drop to `capture_note`, but the split logic was not carried over; directive was never updated to encode the split.

Phase-1 retrofit executed this tick:
- **MCP server code change** — [[capture_note]] tool gained optional `name` parameter (Windows-filesystem-safe sanitization + `.md` appending). Backward-compatible: omitting `name` preserves the prior timestamped default.
- **Directive rewrite (this page)** — Handling chain, section detection, per-tick behavior sections now explicitly codify the two-part split.
- **config-heartbeat-prompt update** — Ingress routing section updated to mention the new `name` parameter for provenance preservation.

**Backfill held.** Earlier dispatch of 5 `capture_note` calls at 12:40 UTC (using the old tool; summary+transcript combined; default timestamp filenames) was reverted by user. Phase-2 re-dispatch of the Apr-14-through-Apr-22 backlog is gated on MCP server redeploy + phase-1 verification. No transcript-only captures executed this tick.

**`last_processed` unchanged at 2026-04-20T16:09:00Z** — phase-2 scope spans files from last-truly-ingested (~Apr 14) through 2026-04-20T16:09:00Z + the 5 dark-window files + any new files since 2026-04-23T09:11:00Z.

### Tick 2026-04-23 ~13:49 UTC — Phase-1 verification (schema probe landed)

[[Phase-1 capture_note rebuild]] verified live on the [[mek-brain]] server. A [[schema probe]] note was dispatched via `capture_note` with an explicit `name` parameter and landed in ingress under the intended filename `mcp-tool-schema-probe-2026-04-23.md` — confirming the rebuilt schema is being served. See source page [[mcp-tool-schema-probe-2026-04-23]]. Phase-2 backfill re-dispatch of the Apr-14-through-Apr-22 Notes-by-Gemini backlog is now unblocked at the server level; remaining gate is manual kickoff.
