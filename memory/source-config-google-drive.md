---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; last_processed 2026-04-20T16:09:00Z. 17:09 WAT tick: Drive MCP auth remains healthy. 1 new Notes-by-Gemini file surfaced prior tick (Project delivery realignment 15:00 WAT, Emmanuella Edeh); no additional in-window changes this tick. Routed-to-review directive honored."
updated: "2026-04-20T16:24:10Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T16:09:00Z"
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

Tick 2026-04-20 17:09 WAT Full-level. Drive MCP auth remains healthy.

**Zero new Notes-by-Gemini files in the 16:09→17:09 WAT window.** Prior tick captured "Project delivery realignment" (15:00 WAT, Emmanuella Edeh) — routed to review/ per directive, not auto-ingested, awareness-only.

**Absence-of-signal state:** monotonic-silent-ticks counter at 1 (one tick since last new file). No escalation — single tick of silence is within noise band.

**Routing directive reminder:** New Notes-by-Gemini files are ingest-candidates routed to review/ subfolder (manual full ingest only, not auto-scanned). This tick has nothing new to route.
