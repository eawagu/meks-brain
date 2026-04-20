---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T14:09:00Z. 15:09 WAT Full tick: 30 deltas, dominated by ATPP MDRS spec-phase continuation (Ruth Adetunji 22 new tickets ATPP-1659 through ATPP-1680, covering Second Presentment/Arbitration/Reason Code Change/Auto-Accept/Collaboration flows). TDSD-6630 NIBSS DD silence extends to 6h51m any-update, 9h42m comment — still user-deferred per B1 triage, no re-dispatch. TDSD-6612 Settlement Payout, TCDD metadata refreshes, ATPP-1607 Done. No new P1/outage filings."
updated: "2026-04-20T15:21:18Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T15:09:00Z"
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

Tick 2026-04-20 16:09 WAT Full-level. TDSD + software-project sweep surfaced key operational deltas plus routine noise.

**TDSD-6639 Stanbic ATS RC91 cycle 32 — raised and Resolved within tick window (16:00 WAT).**
- Reporter/assignee pattern consistent with prior Stanbic cycle tickets (TDSD-6618 cycle 30, TDSD-6629 cycle 31).
- Bank-auto-recovery at 16:00 WAT closes cycle 32 at 56m end-to-end. Within 4m–64m envelope.
- **Third consecutive Stanbic cycle carrying a TDSD ticket** — team ticketing discipline is maturing around the pattern.
- No Immediate dispatch per B6 calibration (bank-owned recurring pattern). Awareness-tier for briefing-2026-04-21.
- Factors: source=jira+slack+email, situation_delta, cycle_32, within_envelope, same_tick_open_and_close.

**TDSD-6627 NIBSS Disbursements Downtime — Completed 15:39 WAT.**
- This closes the NIBSS Disbursements P1 that opened earlier today. Pattern continuity with NIBSS operational P1s earlier this week.
- Awareness-tier: resolved incident, closure confirmation worth recording for Apr 21 briefing accumulation.
- Factors: source=jira, resolution, nibss, p1_closure.

**TDSD-6630 NIBSS Direct Debit — silence extends.**
- No new update this tick. Any-update silence now **7h51m** (from 08:18 WAT). Comment silence **10h42m** (from 05:27 WAT).
- User triage B1 in briefing-2026-04-20 explicitly deferred to Apr 21 briefing — **no Immediate re-dispatch** per triage-deferred state.
- Silent-recovery pattern precedent intact (retired NIBSS DD Apr 14 after 47h silence).

**Routine transitions (Awareness-tier):**
- **TDSD-6612 Settlement Payout** — metadata refresh (Initial Review, Dominic Usiabulu assigned). No transition.
- **AS-4955 Pricing Setup for Moniepoint/Union Bank** — Todo, Gbenga Adeyeye. Routine setup work.
- **TCDD-1106 Habari Pay OTP Challenge** — Log for Re-work (John Oluwole). QA cycle.
- **AS-4242 Sterling Account Switch Project Plan** — Epic transitioned to Done (Glory Alioha). Governance track continuation (aligns with Sterling SLA email thread).

**TDSD-6633 Keystone Settlement Requery:** No update this tick. Still Initial Review per situation tracker.
**TDSD-6638 Merchant Settlement disparity account 0000221603:** No update this tick. Still tracked on [[Merchant Settlement — Systemic Reconciliation Disparity]] situation.

**Out-of-scope carryforward (via Layer 1 email):**
- **TISD-480** ArgoCD CVE remediation — no further updates. Still Awaiting Control Approval. Proposed Apr 17 change window MISSED by 3 days. Briefing-tier Decision candidate for Apr 21 briefing — needs window replan.

**TDSD-6203 Request for Change of ISO Managers** (in-scope, no new update this tick) — still Authorize state; 2nd approval email still pending decision. Briefing-tier Decision candidate for Apr 21 briefing.

No Immediate-tier transitions this tick beyond the already-resolved Stanbic cycle 32 (no dispatch per B6). No new P1/outage filings outside the Stanbic cycle 32 filing.
