---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; ~74 consecutive quiet ticks as of 2026-04-20 08:09 WAT. ~2 days from 7-day absence-of-signal threshold at current cadence."
updated: "2026-04-20T07:20:21Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T07:09:34Z"
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

Tick 2026-04-20 08:09 WAT Skim-level. No new or modified Notes-by-Gemini files. Search `title contains 'Notes by Gemini' and modifiedTime > '2026-04-19T18:09:34Z'` returned empty. Consecutive-quiet-tick streak extended to ~74 ticks (~4.95 days at ~15 ticks/day). ~2 days from 7-day absence-of-signal threshold if streak continues — Monday work-hour activation (~08:30 WAT onward) likely to interrupt before crossing. Empty-result fast path held.
