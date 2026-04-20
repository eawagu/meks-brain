---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T07:09:34Z. 08:09 WAT Skim tick: TDSD-6632 Union Bank RC91 documented (situation-track); TDSD-6633 Keystone settlement requery new (new situation); TDSD-6631 Interswitch completed; TDSD-6630 NIBSS DD silent 2h10m (no re-dispatch per calibration)."
updated: "2026-04-20T07:20:21Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T07:09:34Z"
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

Tick 2026-04-20 08:09 WAT Skim-level. TDSD sweep since 07:10 WAT surfaced three substantive transitions and one persistent silence:

- **TDSD-6632 Union Bank RC91 Apr 20** — ticket filed overnight (email-only until now); documented on [[Union Bank — RC91 P1 Apr 20]] situation page; resolved in parallel with email closure at 07:56 WAT.
- **TDSD-6633 Keystone Bank settlement requery** — NEW ticket. Settlement-layer issue (12AM + 5AM batches awaiting requery). Distinct from RC91/RC05 authorization class. New situation page created: [[Keystone Bank — Settlement Requery Apr 20]]. Flagged gap: no settlement-silence threshold exists in config-salience (to be captured as tuning tuple).
- **TDSD-6631 Interswitch** — transitioned to Completed.
- **TDSD-6630 NIBSS DD DOWNTIME** — silent 2h10m since 05:59 WAT Frances Omelu comment. Applying calibration precedent from Stanbic cycle 27 — no re-dispatch on unchanged state. 07:09 tick's Immediate dispatch stands.

No other Immediate-tier transitions this tick.
