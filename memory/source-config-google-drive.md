---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; 40 consecutive quiet ticks as of 2026-04-17 14:10 WAT."
updated: "2026-04-17T14:17:23Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T14:09:00Z"
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

Tick 2026-04-17 15:09 WAT window: No new or modified Notes-by-Gemini files. Extends the consecutive-quiet-tick streak to 41 ticks (~2.75 days at 15 ticks/day). Well below the 7-day absence-of-signal threshold. No action.
