---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; ~60 consecutive quiet ticks as of 2026-04-19 07:11 WAT."
updated: "2026-04-19T07:40:13Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T06:11:27Z"
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

Tick 2026-04-19 07:11 WAT briefing-tick window (22:09 WAT Apr 18 → 07:11 WAT Apr 19, Full work level per briefing-tick override): No new or modified Notes-by-Gemini files. `title contains 'Notes by Gemini' and modifiedTime > '2026-04-18T21:11:27Z'` returned empty. Extends the consecutive-quiet-tick streak to ~60 ticks (~4 days at 15 ticks/day). Well below the 7-day absence-of-signal threshold. Consistent with Sunday morning — no active meetings expected to produce Gemini transcripts overnight. No action. Empty-result fast path held.
