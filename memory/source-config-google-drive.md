---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; 10:09 WAT tick encountered Google Drive MCP authentication error (connector requires re-auth). Isolate error, log, continue. Prior quiet-tick streak (~75 ticks) still carried; ~2 days from 7-day absence-of-signal threshold. Re-auth needed by user."
updated: "2026-04-20T09:17:30Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T09:09:00Z"
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

Tick 2026-04-20 10:09 WAT Skim-level. **Google Drive MCP auth error this tick** — `search_files` returned: *"This connector requires authentication. The user needs to connect it before this tick can be used."* Per config-heartbeat error isolation rule: error logged, tick continues for other sources. Drive scan deferred until connector is re-authenticated by user.

Prior quiet-tick streak (~75 ticks as of 09:09 WAT) not incremented this tick because the sweep itself did not run — last successful sweep was at 09:09 WAT with zero deltas. Absence-of-signal threshold calculation holds at ~2 days from 7-day threshold. Monday work-hour activation (Cards and Account All Hands 10:30, Channels Onboarding 11:30, etc.) likely to produce Notes-by-Gemini transcripts, but re-auth is required first to detect them.

**Flag for user action:** re-authenticate Google Drive MCP connector in Claude app to restore this source's sweep capability. Next tick with auth restored will resume empty-result fast path or process accumulated deltas.
