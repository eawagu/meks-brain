---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T13:09:00Z. 14:09 WAT Full tick: TDSD-6638 pattern-expansion signal — second merchant account (0000221603, Romoke Ojo reporter, Dominic Usiabulu assignee) with identical IRIS/CBA failure mode to TDSD-6431/6444 on account 0000228201 — recorded as scope expansion on Merchant Settlement systemic-reconciliation-disparity situation. Plus 10 routine transitions across TDSD/TCDD/ATPP/ADD. TDSD-6630 NIBSS DD any-update silence extends to 5h51m, comment silence 8h42m — user-deferred per B1 triage, no Immediate re-dispatch. No new P1/outage filings."
updated: "2026-04-20T13:20:10Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T13:09:00Z"
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

Tick 2026-04-20 14:09 WAT Full-level. TDSD + software-project sweep since 13:09 WAT surfaced 11 in-scope deltas.

**Key signal — Merchant Settlement scope expansion (TDSD-6638):**
- **TDSD-6638 Settlement disparity — account 0000221603** — new ticket filed in 13:09→14:09 window. Reporter [[Romoke Ojo]], assignee [[Dominic Usiabulu]]. Same failure mode as TDSD-6431/6444 on account 0000228201 (IRIS/CBA reconciliation disparity, Providus statement report + NIBSS confirmation evidencing). **Second merchant account with identical failure mode.** This is pattern-expansion that reframes the existing [[Merchant Settlement — Systemic Reconciliation Disparity]] situation from single-merchant defect to systemic reconciliation gap. Situation page already updated this tick with the delta. Factors: source=jira, archetype=service_desk, pattern_expansion, cluster_member=reconciliation_disparity, active_situation_entity_match.

**Routine transitions (10 items, Awareness-tier):**
- Assorted TCDD mandate-detail updates (no state transitions, metadata refresh only).
- ATPP MDRS planning tickets (ATPP-1652 through ATPP-1664) — further metadata updates on the spec-phase cluster created by [[Ruth Adetunji]] in the prior tick.
- ADD-4570 (Challenge success event not posted to SDK Monnify) — assignee [[Funsho Abdullahi]] progressing, no state change.
- ATPP-1608 (Centralized Dashboard Backend Column Rearrangement) — still Ready for QA Testing.

**Out-of-scope carryforward (via Layer 1 email):**
- **TISD-480** ArgoCD CVE remediation — no further updates. Still Awaiting Control Approval. Proposed Apr 17 change window MISSED by 3 days. Briefing-tier Decision candidate for Apr 21 briefing — needs window replan.

**TDSD-6203 Request for Change of ISO Managers** (in-scope, no new update this tick) — still Authorize state; 2nd approval email of 09:18 WAT still pending decision. Briefing-tier Decision candidate for Apr 21 briefing.

**TDSD-6630 NIBSS DD DOWNTIME silence status:**
- No new comments since 05:27 WAT Frances Omelu "escalated to NIBSS" — comment silence extends to **8h42m** at tick.
- Last any-update 08:18 WAT (metadata refresh); any-update silence extends to **5h51m**.
- User triage B1 in briefing-2026-04-20 explicitly deferred to Apr 21 briefing — **no Immediate re-dispatch** per triage-deferred state.
- Silent-recovery pattern precedent intact (retired NIBSS DD Apr 14 after 47h silence).

No Immediate-tier transitions this tick. No new P1/outage filings.
