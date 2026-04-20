---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T12:09:00Z. 13:09 WAT Full tick: 2 settlement-wave cluster resolutions (TDSD-6636 Completed 12:17 WAT, TDSD-6635 Resolved 12:14 WAT); 12 ATPP MDRS planning tickets bulk-created by Ruth Adetunji (12:26–12:49 WAT); routine TCDD/ATPP/ADD transitions. TDSD-6630 NIBSS DD any-update silence extends to 4h51m, comment silence 7h42m — user-deferred per B1 triage (no Immediate re-dispatch). No new P1/outage filings."
updated: "2026-04-20T12:17:43Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T12:09:00Z"
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

Tick 2026-04-20 13:09 WAT Full-level. TDSD + software-project sweep since 12:09 WAT surfaced 22 in-scope deltas:

**Settlement-wave cluster resolutions (key signal):**
- **TDSD-6636 IPM File Submission Failure for MIP Transaction – Clearing Optimizer Process Failed** — transitioned **Completed** at 12:17 WAT; reporter [[Ayooluwa Oladega]], assignee [[Chiamaka Ofomata]]. Prior tick noted this as settlement-wave carryforward; now resolved. Factors: source=jira, archetype=service_desk, cluster_member=settlement_wave, state_transition=wip_to_completed.
- **TDSD-6635 Disparity Between Metabase and Settlement Reports 16th April, 20226 (Window 4)** — transitioned **Resolved** at 12:14 WAT; reporter [[Christine Ogude]], assignee [[Ekene Udodi]]. Also settlement-wave cluster member. Factors: source=jira, archetype=service_desk, cluster_member=settlement_wave, state_transition=open_to_resolved, metabase_vs_settlement_disparity.

Two back-to-back resolutions on the settlement-wave cluster (TDSD-6495/6553/6637/6636/6635). The cluster remains a pattern-density watch for a potential [[Merchant Settlement — Systemic Reconciliation Disparity]] synthesis candidate — but note the existing situation page tracks Account 0000228201 duplicate-debit (TDSD-6431/6444), a distinct failure mode from IPM/MIP file submission and Metabase/settlement-report disparity. Not yet a confirmed situation member — continue pattern-density watch.

**ATPP MDRS planning bulk ticket creation (Ruth Adetunji):** 12 tickets created 12:26–12:49 WAT spec'ing out Merchant Dispute Resolution System (MDRS) work — ATPP-1652 through ATPP-1664. UI tickets (Queue Navigation, Claim Listing, Claim Detail, Filter Panel, Real-Time Queue, Collaboration Detail, Code C Warning, Collaboration Response Submission) + Backend tickets (Collaboration Response API, Validation Engine, Code C Tracking, Auto-Response for Expired Collaborations) + ATPP-1658 (Collaboration Response API). Planning/spec phase, non-operational, Awareness-tier.

**TCDD mandate detail tickets (routine Todo):**
- TCDD-1318 Refactor mandate details API to include card-based mandate indicator — reporter [[Abiodun Famoye]], assignee [[John Oluwole]], 12:21 WAT.
- TCDD-1316 POS Channel validation before mandate initiation — reporter [[Fatai Ibrahim]], assignee [[Victor Madu]], 12:21 WAT.
- TCDD-1300 POS/Card Mandates should not be rendered as multi-account — reporter Fatai Ibrahim, assignee [[Ebenezer Igbinoba]], 12:18 WAT.

**Routine transitions:**
- TCDD-1225 Add Support Button to Failed/Success Transaction Screens — **Done** 12:54 WAT, assignee [[Funsho Abdullahi]], reporter [[Nancy Muorah]].
- ATPP-1608 Centralized Dashboard — Backend Column Rearrangement — **Ready for QA Testing** 12:47 WAT, assignee [[Temitope Bamidele]].
- ATPP-1610 Billing/Invoice Management UI enhancement — 12:10 WAT.
- ADD-4570 Challenge success event not getting posted to SDK Monnify — **In Progress** 12:35 WAT; reporter [[Ebenezer Igbinoba]], assignee [[Funsho Abdullahi]]. Routine bug investigation.

**Out-of-scope carryforward (via Layer 1 email):**
- **TISD-480** (TeamApt Infrastructure Service Desk) ArgoCD CVE remediation — no further updates since 10:30 WAT. Status still **Awaiting Control Approval**. Proposed Apr 17 change window still MISSED by 3 days. Briefing-tier Decision candidate for Apr 21 briefing — needs window replan.

**TDSD-6203 Request for Change of ISO Managers** (in-scope but no new update this tick) — carries forward from 10:13 WAT metadata update. Still Authorize state; 2nd approval email of 09:18 WAT still pending decision. Briefing-tier Decision candidate for Apr 21 briefing.

**TDSD-6630 NIBSS DD DOWNTIME silence status:**
- No new comments since 05:27 WAT Frances Omelu "escalated to NIBSS" — comment silence extends to **7h42m** at tick.
- Last any-update 08:18 WAT (metadata refresh); any-update silence extends to **4h51m**.
- User triage B1 in briefing-2026-04-20 explicitly deferred to Apr 21 briefing — **no Immediate re-dispatch** per triage-deferred state.
- Silent-recovery pattern precedent intact (retired NIBSS DD Apr 14 after 47h silence).

No Immediate-tier transitions this tick. No new P1/outage filings.
