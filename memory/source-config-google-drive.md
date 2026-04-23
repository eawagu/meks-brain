---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only. last_processed remains 2026-04-20T16:09:00Z (full sweep deferred to next briefing tick). 2026-04-23 09:11 WAT tick: Drive MCP RECOVERED after ~64h dark. Probe found 5 new Notes-by-Gemini files Apr 20-22, all ingest-candidates routed to review/ per directive. Most operationally relevant: Disbursement-CBA integration architecture review (Apr 22 19:30 IST) + Disbursement Issues & Next steps (Apr 22 11:25 WAT) — both relate to Monnify Settlements TDSD-6645 situation."
updated: "2026-04-23T08:25:01Z"
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

### Tick 2026-04-20 17:09 WAT Full-level (condensed — pre-dark)

Zero new Notes-by-Gemini files in the 16:09→17:09 WAT window. Prior tick captured "Project delivery realignment" (15:00 WAT, Emmanuella Edeh).

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure)

Drive MCP returned auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 ticks pre-recovery. Surfaced as briefing-2026-04-22 B2 (joint with Gmail/Calendar) and briefing-2026-04-23 D4. New Notes-by-Gemini detection blind for the window.

### Tick 2026-04-23 ~09:11 WAT — RECOVERY (Full-level promotion on state change)

Probe scope: `search_files` with `title contains 'Notes by Gemini' and modifiedTime > '2026-04-20T16:09:00Z'`. Returned 5 new files (chronological):

1. **2026-04-20 15:00 WAT (Apr 20 15:06 modifiedTime)** — "Project delivery and optimization realignment" — owner eedeh@ (Emmanuella Edeh). Parent folder 1n-3BRradT-bV_s1JfALymVbBMoupX5iz. File ID 1aNYGgcSfKrUSRXf_PQFGi56dy26QyC_camXrxEkoju0. Pre-dark; same file referenced in the Apr 20 17:09 WAT tick note but never ingested. Ingest candidate.
2. **2026-04-20 14:42 WAT (Apr 20 15:35 modifiedTime)** — "2026 Strategy Event Debrief" — owner dajalie@. File ID 1osWNfzZgjQYt39Tffcbq-9_4pbN3neTWoyexmRN30mc. Pre-dark; Strategy Retreat Day 2 debrief artifact. Ingest candidate.
3. **2026-04-21 13:00 WAT (Apr 21 12:52 modifiedTime)** — "Cards Team Str, Systems & Roadmap" — owner tracy.ojaigho@. File ID 1vzleqLcJJt7ETSFKkniIASPJpYhp93bJqxUX5wQbLg0. Relates to CI&P Team Structure invite (Apr 24 13:00 WAT Tracy). Ingest candidate.
4. **2026-04-22 19:30 IST (Apr 22 15:19 modifiedTime UTC = 16:19 WAT)** — "Disbursement-CBA integration architecture review" — owner prateek.gupta@. File ID 1cgoS4dOVfh72BhlYcZ5UmZ28LYqwJfVac3EXlpKw26w. **Operationally relevant to Monnify Settlements** — disbursement/CBA integration architecture is in the same product surface family as TDSD-6645 (VA reversal blocking settlement) and TDSD-6684 (pending MIT transactions). Ingest candidate — flag for ingest-prioritization at next briefing.
5. **2026-04-22 11:25 WAT (Apr 22 20:13 modifiedTime)** — "Disbursement Issues & Next steps" — owner temitayo.akinmola@. File ID 1jnbTD3yG5v_YHUr-REVC8hRVWc5bi1YSBbUXBWrI3h0. **Directly relevant to TDSD-6645 situation** — disbursement issues + next steps is exactly the corpus the situation page has been accumulating. Ingest candidate — flag as priority for ingest.

**All 5 routed to review/ subfolder per directive** (new Notes-by-Gemini files are ingest-candidates, not auto-surfaced). Awareness-tier signaling only at heartbeat time; ingest is the operational pathway for file content.

**Backlog catch-up policy.** `last_processed` deliberately NOT advanced — left at 2026-04-20T16:09:00Z. Next briefing tick runs the standard delta scan; since `modifiedTime` filter is already resolving against 2026-04-20T16:09:00Z, the 5 files above would re-surface at the next tick regardless. No data loss risk from keeping the timestamp stationary.

**Dispatch decisions:**
- 5 new Notes-by-Gemini files noted as ingest-candidates — prioritize files #4 and #5 (disbursement-themed, Monnify-settlement-relevant) at next ingest run.
- No Immediate-tier or Decision-tier surface from Drive this tick.
- Awareness-tier only.

**`last_processed` unchanged at 2026-04-20T16:09:00Z** — see backlog catch-up policy above.
