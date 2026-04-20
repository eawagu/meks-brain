---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; last_processed 2026-04-20T14:09:00Z. 15:09 WAT tick: **Drive MCP auth RESTORED** — 6-tick block (09:09–14:09 WAT) broken. search_files returned 4 recent Notes-by-Gemini; new file since prior tick: ATPP Daily Standup 2026-04-20 13:26 WAT (created 14:29 WAT by Ruth Adetunji). Backlog accessible for ingest; re-auth elevation flag REMOVED from Apr 21 briefing Decision candidate status."
updated: "2026-04-20T15:22:05Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T15:09:00Z"
---

## Connection

Google Drive MCP. Scope: files whose title starts with "Notes by Gemini" (meeting transcription artifacts).

## Directives

### Scope
- Only "Notes by Gemini" files are in-scope. All other Drive activity is out-of-scope for this source.

### Surfacing rules
- New Notes-by-Gemini file → ingest-candidate flag (not auto-surfaced; routed to ingress review).
- Modified existing Notes-by-Gemini file → delta flag, re-ingest.

## Notes

Tick 2026-04-20 16:09 WAT Full-level. Drive MCP auth remains healthy (restored at prior 15:09 WAT tick after 6-tick auth-block streak).

**1 new Notes-by-Gemini file in-window:**
- **"Project delivery realignment" — 2026-04-20 15:00 WAT — owner [[Emmanuella Edeh]].** Ingest-candidate flag. Routed to review/ subfolder per directive — **no auto capture_note call** this tick. User will trigger full ingest manually if/when the content warrants brain integration.
- Title signals project-delivery-team-internal session. Not auto-surfaced; awareness that it exists in the review backlog.
- Factors: source=drive, file=notes_by_gemini, new_file, owner=emmanuella_edeh, routed_to_review, no_auto_ingest, awareness_only.

**No other Drive modifications** to in-scope Notes-by-Gemini files in the 15:09→16:09 WAT window.

**Absence-of-signal state:** monotonic-silent-ticks counter stays at 0 (files are accessible, new content is present). Auth streak-break from prior tick holds.

**Routing directive reminder:** New Notes-by-Gemini files are ingest-candidates routed to review/ subfolder (manual full ingest only, not auto-scanned). This tick honors the directive.
