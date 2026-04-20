---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T09:09:00Z. 10:09 WAT Skim tick: 12 TDSD deltas — Union Bank TDSD-6632 Completed 09:47 WAT (cycle closure confirmation), Keystone TDSD-6633 + TDSD-6615 INITIAL REVIEW (broader settlement review pattern), settlement wave (TDSD-6495/6553/6637 reopens, TDSD-6636 new IPM File Submission failure Medium), NIBSS DR Exercise TDSD-6626 Completed. NIBSS DD TDSD-6630 silent since 08:18 WAT (any-update silence 1h51m, comment silence 4h42m)."
updated: "2026-04-20T09:17:02Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T09:09:00Z"
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

Tick 2026-04-20 10:09 WAT Skim-level. TDSD sweep since 09:05 WAT surfaced 12 deltas:

**Active-situation ticker confirmations / updates:**
- **TDSD-6632 Union Bank Failure #RC91** — Completed status confirmed 09:47 WAT (post-triage metadata sync). Already closed at 07:57 WAT. Situation [[Union Bank — RC91 P1 Apr 20]] retired at 10:09 WAT — cycle fully resolved.
- **TDSD-6633 KEYSTONE BANK Settlement** — metadata update 09:45 WAT, still INITIAL REVIEW. Situation [[Keystone Bank — Settlement Requery Apr 20]] delta added — broader Keystone settlement review pattern observation.
- **TDSD-6630 NIBSS DD DOWNTIME** — NO update this window (silent since 08:18 WAT). Any-update silence 1h51m, comment silence 4h42m. User defer override holds — no Immediate re-dispatch.

**Historical ticket resurfacing (parallel Keystone settlement review pattern):**
- **TDSD-6615 Keystone Settlement pending #20260119** — 3-month-old Jan 19 ticket transitioned to INITIAL REVIEW 09:54 WAT alongside today's TDSD-6633. Flag for Keystone settlement reconciliation synthesis.

**Settlement wave (multiple reopens/new filings — awareness-tier for now):**
- **TDSD-6495 PENDING SETTLEMENT** — Reopened 09:59 WAT (Medium/Task).
- **TDSD-6553 SETTLEMENT PAYOUT** — Reopened 09:51 WAT (Medium/Task).
- **TDSD-6637 PENDING SETTLEMENT** — NEW INITIAL REVIEW 09:29 WAT (Medium/Task).
- **TDSD-6636 IPM File Submission Failure for MIP Transaction – Clearing Optimizer Process Failed** — NEW INITIAL REVIEW 09:26 WAT (Medium/Incident). IPM = Interbank Payment Message Mastercard clearing — scheme-facing failure. Distinct from RC91 cluster. First observation of this failure class in active tracking.
- **TDSD-6635 Disparity Between Metabase and Settlement Reports 16th April 2026 (Window 4)** — Awaiting Scheme Update 09:19 WAT (Medium/Service request).

**Tail-closures (no active situation, awareness):**
- **TDSD-6624 Stanbic transactions failure 20260419 RC 91** — Completed 09:49 WAT. Tail close of Apr 19 Stanbic cycle.
- **TDSD-6623 Union Settlement 19th April** — Completed 09:52 WAT.
- **TDSD-6548 UBA|SWITCH|RC 91|20260414** — Completed 09:57 WAT. 6-day-old UBA RC91 closed.
- **TDSD-6626 NIBSS conducted Disaster Recovery Exercise** — Completed 09:48 WAT. Scheduled DR exercise, distinct from TDSD-6630 DD downtime.

No Immediate-tier transitions this tick. No new P1/outage filings. IPM File Submission Failure (TDSD-6636) is the newest failure-class signal and warrants synthesis candidate tracking if recurrence observed.
