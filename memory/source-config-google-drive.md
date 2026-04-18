---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; ~47 consecutive quiet ticks as of 2026-04-18 11:10 WAT."
updated: "2026-04-18T10:20:22Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T10:10:00Z"
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

Tick 2026-04-18 11:10 WAT window (Skim tick): No new or modified Notes-by-Gemini files. Extends the consecutive-quiet-tick streak to ~47 ticks (~3.1 days at 15 ticks/day). Well below the 7-day absence-of-signal threshold. No action.
