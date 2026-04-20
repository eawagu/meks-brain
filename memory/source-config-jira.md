---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. 06:09 WAT Monday briefing tick: two substantive transitions — TDSD-6629 Completed ~00:08 WAT (Stanbic cycle 31 closure); TDSD-6630 NIBSS DD DOWNTIME filed ~05:18 WAT (Medium, new situation page created). last_processed 2026-04-20T05:09:34Z."
updated: 2026-04-20
cssclasses:
  - "source-config"
last_processed: "2026-04-20T06:09:34Z"
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

Tick 2026-04-20 07:09 WAT Skim-level (post-06:09 briefing). Jira sweep since 06:10 WAT: many updates but all routine dev/QA transitions (BLST stories, MBPB tasks, MNSHELL mobile items, LFR stories, MPRC settlement task, IN database request). **TDSD-6630 silent** since 05:59 WAT Frances Omelu comment — 1h10m post-briefing silence at tick time. B1 promotion rule fires → Immediate dispatched. No TDSD ticket exists for Union Bank RC91 Apr 20 — email-only track. Zero new Immediate-tier Jira signals this tick.
