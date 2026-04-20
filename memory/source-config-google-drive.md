---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: "Google Drive signal-source scoped to 'Notes by Gemini' files only; last_processed 2026-04-20T14:09:00Z. 15:09 WAT tick: **Drive MCP auth RESTORED** — 6-tick block (09:09–14:09 WAT) broken. search_files returned 4 recent Notes-by-Gemini; new file since prior tick: ATPP Daily Standup 2026-04-20 13:26 WAT (created 14:29 WAT by Ruth Adetunji). Backlog accessible for ingest; re-auth elevation flag REMOVED from Apr 21 briefing Decision candidate status."
updated: "2026-04-20T14:19:39Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T14:09:00Z"
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

Tick 2026-04-20 15:09 WAT Full-level. **MAJOR STATE CHANGE — Google Drive MCP auth RESTORED.**

Previous 6-tick auth-error streak (09:09, 10:09, 11:09, 12:09, 13:09, 14:09 WAT) ended at 15:09 WAT. `search_files` returned successfully at this tick — no auth error. The connector was re-authenticated between 14:09 and 15:09 WAT (mechanism unverified — user manual re-auth in Claude app assumed, or auto-retry succeeded).

**Files accessible this tick (Notes-by-Gemini, sorted by modifiedTime desc):**
1. ATPP Daily Standup Meeting — 2026/04/20 13:26 WAT — created 14:29 WAT (Ruth Adetunji owner). **NEW since prior tick** — ingest-candidate flag, routed to review/ subfolder.
2. Cards and Account: All Hands — 2026/04/20 10:28 WAT — created 10:46 WAT (David Redemi owner). Known from prior tick email notification; now fetchable.
3. Direct to Bank: Daily stand up — 2026/04/20 08:27 WAT — created 10:10 WAT (Khadijat Musa owner). Known from prior tick email notification; now fetchable.
4. Teamapt X OPEX (ISO 25010 Implementation Session) — 2025/10/14 — modified 13:24 WAT today. Historical file recently edited.

**Backlog clears.** The prior tick's "elevated to Apr 21 briefing Decision candidate" flag (re-authenticate Google Drive MCP) is **removed** — auth has been restored, backlog is now accessible. The Decision candidate stack for Apr 21 briefing drops from 4 → 3 (TISD-480 + TDSD-6203 + Lattice 8 remain).

**Absence-of-signal threshold status:** The 6-tick streak of connector errors did NOT count as signal silence per prior-tick classification (signal-active-but-connector-blocked). With auth restored, threshold calculation resumes normal monotonic-silent-ticks counting — reset to 0 since files are accessible and new ones are present.

**Routing directive:** New Notes-by-Gemini files are ingest-candidates routed to review/ subfolder (manual full ingest only, not auto-scanned). No `capture_note` call this tick — this source does not auto-ingest.
