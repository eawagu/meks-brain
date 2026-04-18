---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; ~51 consecutive quiet ticks as of 2026-04-18 15:09 WAT."
updated: "2026-04-18T14:20:26Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T14:10:00Z"
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

Tick 2026-04-18 15:09 WAT window (14:11 WAT → 15:10 WAT, Skim level, no upgrade for Drive): No new or modified Notes-by-Gemini files. `title contains 'Notes by Gemini' and modifiedTime > '2026-04-18T13:11:47Z'` returned empty. Extends the consecutive-quiet-tick streak to ~51 ticks (~3.4 days at 15 ticks/day). Well below the 7-day absence-of-signal threshold. No action. Empty-result fast path held.
