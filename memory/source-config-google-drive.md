---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; ~48 consecutive quiet ticks as of 2026-04-18 12:09 WAT."
updated: "2026-04-18T11:18:54Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T11:09:34Z"
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

Tick 2026-04-18 12:09 WAT window (11:10 WAT → 12:09 WAT, Skim tick): No new or modified Notes-by-Gemini files. Extends the consecutive-quiet-tick streak to ~48 ticks (~3.2 days at 15 ticks/day). Well below the 7-day absence-of-signal threshold. No action.
