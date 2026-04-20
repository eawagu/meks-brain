---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; 14:09 WAT tick: Drive MCP auth error persists (6th consecutive tick: 09:09, 10:09, 11:09, 12:09, 13:09, 14:09 WAT). Two Gemini notes produced today (Cards & Account All Hands 10:47 WAT, Direct to Bank Daily stand up 10:03 WAT) per email notifications — files cannot be fetched until re-auth. Source is signal-active but connector-blocked. Absence-of-signal streak ~3.5 days from 7-day threshold; re-auth flag elevated to briefing-tier candidate for Apr 21 briefing after 6 consecutive blocked ticks."
updated: "2026-04-20T13:20:53Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T13:09:00Z"
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

Tick 2026-04-20 14:09 WAT Full-level. **Google Drive MCP auth error persists** (sixth consecutive tick: 09:09, 10:09, 11:09, 12:09, 13:09, 14:09 WAT). `search_files` returned: *"This connector requires authentication. The user needs to connect it before this tool can be used."* Per config-heartbeat error isolation rule: error logged, tick continues for other sources.

**Evidence of new Gemini notes produced today (from Layer 1 email sweep):**
- 10:11 WAT — "Notes: Direct to Bank Daily stand up Apr 20, 2026" (gemini-notes@google.com).
- 10:47 WAT — "Notes: Cards and Account: All Hands Apr 20, 2026" (gemini-notes@google.com).

Both files exist on Drive but cannot be fetched for ingest until re-auth. Source is **signal-active but connector-blocked** — this is a different failure mode from a genuinely silent source. Absence-of-signal threshold calculation per config-salience (7 days zero messages → Awareness alert) should NOT count these connector-error ticks as silent — the signals are being produced but blocked at the retrieval boundary.

**Flag for user action (sixth tick flagged — ELEVATE to Apr 21 briefing Decision candidate):** re-authenticate Google Drive MCP connector in Claude app. Six consecutive ticks of silent failure now establish the pattern as durable, not transient. Backlog continues growing: 2+ transcripts from today alone pending ingest, and Monday working hours typically produce 4–6 transcripts across the day. If not resolved today, tomorrow's briefing window will compound another 4–6 pending ingests on top.
