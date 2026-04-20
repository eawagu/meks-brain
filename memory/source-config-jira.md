---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T08:09:34Z. 09:09 WAT Skim tick: TDSD-6630 NIBSS DD non-comment update 08:18 WAT (any-update silence reset, comment silence 3h42m); TDSD-6622 HIGH PENDING DEBIT MANDATE completed 08:22 WAT; TDSD-6634 Monnify doc deploy new (Medium, Review, awareness-tier)."
updated: "2026-04-20T08:18:33Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T08:09:34Z"
---

## Connection

- **Connector:** Atlassian MCP
- **Cloud ID:** 15be6fd4-ef3b-4d52-ab1b-e6e706a38e06
- **Site:** teamapt.atlassian.net
- **Scope — 18 projects (1 service_desk + 17 software):**

| Display name | Key | Archetype |
|---|---|---|
| TeamApt-Service-Desk | TDSD | service_desk |
| AptPay Consolidated Direct Debit | TCDD | software |
| Aptpay Core Switching | ATPG | software |
| AptPay Direct Debit (DTB) | ADD | software |
| AptPay Switch | AS | software |
| AptPay Third Party Processing | ATPP | software |

## Directives

### Priority model
- Service desk tickets (TDSD) with P1/outage markers — Immediate-tier candidates.
- Software project tickets with CTO approval gate — Briefing-tier.
- Routine dev/QA transitions — Awareness-tier.

### Active-situation entity match
Match updated tickets against active situation pages. Overlapping entity or keyword → elevate to Briefing-tier minimum.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

Tick 2026-04-20 09:09 WAT Skim-level. TDSD sweep since 08:10 WAT surfaced:

- **TDSD-6630 NIBSS DD DOWNTIME** — 08:18 WAT non-comment update (status/assignee change). Ticket still Work in progress. Any-update silence clock reset to 51m at 09:09 WAT (below 1h threshold); comment silence 3h42m since 05:27 WAT NIBSS escalation. No Immediate re-dispatch — state unchanged from 07:09 WAT dispatch. Situation page [[NIBSS DD — Downtime P1 Apr 20]] updated with 09:09 WAT delta.
- **TDSD-6622 HIGH PENDING DEBIT MANDATE** — transitioned to Completed 08:22 WAT. Resolution signal — positive delta. Related to DCIR/DD cluster but no active situation page requiring update at this tick.
- **TDSD-6634 Monnify doc deploy** — NEW ticket, Medium priority, Review status. Developer documentation change. Non-CTO-specific, Awareness-tier. No situation page.
- No other Immediate-tier transitions this tick. No new P1/outage filings.
