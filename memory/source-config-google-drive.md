---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; ~70 consecutive quiet ticks as of 2026-04-19 20:09 WAT. Well below 7-day absence-of-signal threshold."
updated: "2026-04-19T19:27:16Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T19:09:34Z"
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

Tick 2026-04-19 20:09 WAT **skim-level**. No new or modified Notes-by-Gemini files. Search `title contains 'Notes by Gemini' and modifiedTime > '2026-04-19T17:09:34Z'` returned empty. Consecutive-quiet-tick streak extended to ~70 ticks (~4.7 days at 15 ticks/day). Well below 7-day absence-of-signal threshold. Consistent with Sunday cadence. Empty-result fast path held.