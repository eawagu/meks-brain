---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; 38 consecutive quiet ticks as of 2026-04-17 12:09 WAT."
updated: "2026-04-17T11:19:29Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T11:09:32Z"
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

Tick 2026-04-17 11:09 WAT window: no new or modified Notes-by-Gemini files. This extends the consecutive-quiet-tick streak to 38 ticks. No action.
