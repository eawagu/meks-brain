---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; ~73 consecutive quiet ticks as of 2026-04-20 06:09 WAT. Approaching 7-day absence-of-signal threshold (estimated crossing within ~2 days at current cadence)."
updated: "2026-04-20T05:39:27Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T05:09:34Z"
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

Tick 2026-04-20 06:09 WAT **full-level (06:00 briefing floor)**. No new or modified Notes-by-Gemini files. Search `title contains 'Notes by Gemini' and modifiedTime > '2026-04-19T17:09:34Z'` returned empty. Consecutive-quiet-tick streak extended to ~73 ticks (~4.9 days at 15 ticks/day). Approaching 7-day absence-of-signal threshold (estimated crossing within ~2 days at current cadence if streak continues). Weekend-plus-Monday-morning quiet consistent with expected pattern — meeting transcripts typically land during weekday work hours; Monday activation expected once team starts at ~08:30 WAT. Empty-result fast path held.
