---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T14:09:00Z. 15:09 WAT Full tick: 30 deltas, dominated by ATPP MDRS spec-phase continuation (Ruth Adetunji 22 new tickets ATPP-1659 through ATPP-1680, covering Second Presentment/Arbitration/Reason Code Change/Auto-Accept/Collaboration flows). TDSD-6630 NIBSS DD silence extends to 6h51m any-update, 9h42m comment — still user-deferred per B1 triage, no re-dispatch. TDSD-6612 Settlement Payout, TCDD metadata refreshes, ATPP-1607 Done. No new P1/outage filings."
updated: "2026-04-20T14:19:38Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T14:09:00Z"
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

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in ("TDSD", "TCDD", "ATPG", "ADD", "AS", "ATPP")`. Verified at 13:09 WAT tick after two consecutive rejections on unquoted forms.

## Directives

### Priority model
- Service desk tickets (TDSD) with P1/outage markers — Immediate-tier candidates.
- Software project tickets with CTO approval gate — Briefing-tier.
- Routine dev/QA transitions — Awareness-tier.

### Active-situation entity match
Match updated tickets against active situation pages. Overlapping entity or keyword → elevate to Briefing-tier minimum.

### Out-of-scope surfacing via Layer 1 email
When a Jira ticket from an out-of-scope project (not in the 18-project scope above) surfaces to the user via Layer 1 Gmail (To:me) approval request, fetch the ticket metadata and treat per normal tier classification. Record in notes so the next sweep can follow the ticket without re-discovery. Example: TISD-480 surfaced 2026-04-20 via approval email.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

Tick 2026-04-20 15:09 WAT Full-level. TDSD + software-project sweep since 14:09 WAT surfaced 30 deltas.

**Dominant signal — ATPP MDRS spec-phase continuation:**
- [[Ruth Adetunji]] created 22 new ATPP tickets (ATPP-1659 through ATPP-1680), all To Do / Medium / unassigned (except ATPP-1610 Olatunbosun Olaosebikan). Scope: Second Presentment flow (ATPP-1665–1668, 1670–1673), Arbitration (ATPP-1674, 1677), Reason Code Change (ATPP-1676, 1679), Auto-Accept Warning (ATPP-1680), Code C Collaboration (ATPP-1659–1664), Presentment History (ATPP-1673). **Direct continuation of prior tick's spec-phase cluster (ATPP-1652–1664).** Matches Ruth's 13:26 WAT ATPP Daily Standup output (Drive surfaced the Gemini note this tick). Awareness-tier: routine planning work by assigned owner, no CTO action. Factors: source=jira, archetype=software, spec_phase_continuation, batch_creation, reporter=ruth_adetunji, no_cto_action.

**Routine transitions (Awareness-tier):**
- TDSD-6612 Settlement Payout — metadata update (Initial Review, Dominic Usiabulu assigned, Blessing Olawale reporter).
- TCDD-1319 Master-Slave DB Deployment — metadata refresh on Yasir epic.
- TCDD-1175 500 error subscription-plans sorting bug — Victor Madu In Progress.
- ATPP-1647, ATPP-1646 — Ejiro Asiuwhu enhancements In Progress (TeamApt Admin User Views expansion).
- ATPP-1607 Column Rearrangement — **transitioned to Done** by Ejiro Asiuwhu (was Ready for QA Testing prior tick).
- ATPG-90 Harness code coverage stage check — **Done** by Joshua Oluwakuse.

**TDSD-6630 NIBSS DD DOWNTIME silence extends:**
- No new update this tick. Any-update silence → **6h51m** (from 08:18 WAT). Comment silence → **9h42m** (from 05:27 WAT).
- User triage B1 in briefing-2026-04-20 explicitly deferred to Apr 21 briefing — **no Immediate re-dispatch** per triage-deferred state.
- Silent-recovery pattern precedent intact (retired NIBSS DD Apr 14 after 47h silence).

**TDSD-6633 Keystone Settlement Requery:** No update this tick. Still Initial Review per situation tracker.

**TDSD-6638 Merchant Settlement disparity account 0000221603:** No update this tick. Still tracked on [[Merchant Settlement — Systemic Reconciliation Disparity]] situation.

**Out-of-scope carryforward (via Layer 1 email):**
- **TISD-480** ArgoCD CVE remediation — no further updates. Still Awaiting Control Approval. Proposed Apr 17 change window MISSED by 3 days. Briefing-tier Decision candidate for Apr 21 briefing — needs window replan.

**TDSD-6203 Request for Change of ISO Managers** (in-scope, no new update this tick) — still Authorize state; 2nd approval email of 09:18 WAT still pending decision. Briefing-tier Decision candidate for Apr 21 briefing.

No Immediate-tier transitions this tick. No new P1/outage filings. Union Bank RC91 cycle 7 (6m brief) filed via Slack only — no TDSD ticket created (pattern for brief bank-auto-recovered cycles).
