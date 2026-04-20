---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; 11:09 WAT tick: Drive MCP auth error persists (same as 10:09, 09:09 ticks). Evidence of new Gemini note produced today (Cards & Account All Hands, 09:47 WAT email notification) but file cannot be fetched until re-auth. Source is signal-active but connector-blocked. Prior quiet-tick streak calculation holds at ~2 days from 7-day absence-of-signal threshold."
updated: "2026-04-20T10:17:46Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T10:09:00Z"
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

Tick 2026-04-20 11:09 WAT Full-level. **Google Drive MCP auth error persists** (third consecutive tick: 09:09, 10:09, 11:09 WAT). `search_files` returned: *"This connector requires authentication. The user needs to connect it before this tick can be used."* Per config-heartbeat error isolation rule: error logged, tick continues for other sources.

**Evidence of new Gemini notes produced today (from Layer 1 email sweep):**
- 09:11 WAT — "Notes: Direct to Bank Daily stand up Apr 20, 2026" (gemini-notes@google.com).
- 09:47 WAT — "Notes: Cards and Account: All Hands Apr 20, 2026" (gemini-notes@google.com).

Both files exist on Drive but cannot be fetched for ingest until re-auth. Source is **signal-active but connector-blocked** — this is a different failure mode from a genuinely silent source. Absence-of-signal threshold calculation per config-salience (7 days zero messages → Awareness alert) should NOT count these connector-error ticks as silent — the signals are being produced but blocked at the retrieval boundary.

**Flag for user action (third tick flagged):** re-authenticate Google Drive MCP connector in Claude app. Two meeting transcripts pending ingest since this morning. Daily pattern continues — Monday working hours typically produce 4–6 Gemini transcripts; without re-auth the ingest queue will grow.
