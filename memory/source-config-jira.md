---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T11:09:00Z. 12:09 WAT Full tick: 2 in-scope TDSD deltas (TDSD-6636 Clearing Optimizer WIP at 11:42 WAT — settlement-wave carryforward; TDSD-6634 Monnify Doc Awaiting implementation at 11:34 WAT — routine). TDSD-6630 NIBSS DD any-update silence extends to 3h51m, comment silence 6h42m — user-deferred per B1 triage (no Immediate re-dispatch). No new P1/outage filings."
updated: "2026-04-20T11:16:03Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T11:09:00Z"
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

### Out-of-scope surfacing via Layer 1 email
When a Jira ticket from an out-of-scope project (not in the 18-project scope above) surfaces to the user via Layer 1 Gmail (To:me) approval request, fetch the ticket metadata and treat per normal tier classification. Record in notes so the next sweep can follow the ticket without re-discovery. Example: TISD-480 surfaced 2026-04-20 via approval email.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

Tick 2026-04-20 12:09 WAT Full-level. TDSD sweep since 11:09 WAT surfaced 2 in-scope deltas:

**In-scope deltas:**
- **TDSD-6636 IPM File Submission Failure for MIP Transaction – Clearing Optimizer Process Failed** — updated 11:42 WAT; Work in progress; Medium priority; reporter [[Ayooluwa Oladega]]; assignee [[Chiamaka Ofomata]]. Settlement-wave carryforward from 10:09 / 11:09 ticks. Part of the accumulating cluster (TDSD-6495/6553/6637/6636/6635) potentially feeding [[Merchant Settlement — Systemic Reconciliation Disparity]] synthesis candidate. Awareness-tier; continue to monitor pattern density before promoting. Factors: source=jira, archetype=service_desk, ticket_priority=medium, situation_match_candidate=merchant-settlement, pattern_density_watch.
- **TDSD-6634 Deploy Monnify Developer Doc with updated content** — updated 11:34 WAT; Awaiting implementation; Medium priority; reporter [[Muhammad Samu]]; assignee [[Wycliffe Ochieng']]. Routine documentation deployment transition. Awareness-tier. Factors: source=jira, ticket_type=documentation_deploy, routine_transition.

**Out-of-scope carryforward (via Layer 1 email):**
- **TISD-480** (TeamApt Infrastructure Service Desk) ArgoCD CVE remediation — no further updates since 10:30 WAT. Status still **Awaiting Control Approval**. Proposed Apr 17 change window still MISSED by 3 days. Briefing-tier Decision candidate for Apr 21 briefing — needs window replan.

**TDSD-6203 Request for Change of ISO Managers** (in-scope but no new update this tick) — carries forward from 10:13 WAT metadata update. Still Authorize state; 2nd approval email of 09:18 WAT still pending decision. Briefing-tier Decision candidate for Apr 21 briefing.

**TDSD-6630 NIBSS DD DOWNTIME silence status:**
- No new comments since 05:27 WAT Frances Omelu "escalated to NIBSS" — comment silence extends to **6h42m** at tick.
- Last any-update 08:18 WAT (metadata refresh); any-update silence extends to **3h51m**.
- User triage B1 in briefing-2026-04-20 explicitly deferred to Apr 21 briefing — **no Immediate re-dispatch** per triage-deferred state.
- Silent-recovery pattern precedent intact (retired NIBSS DD Apr 14 after 47h silence).

**Settlement wave continuation:** TDSD-6495/6553/6637/6636/6635 cluster accumulating since morning; TDSD-6636 is the only new delta this tick within the cluster.

No Immediate-tier transitions this tick. No new P1/outage filings.
