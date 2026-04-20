---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T16:09:00Z. 17:09 WAT Full tick: **2 priority deltas** — TDSD-6645 \"Urgent Pending Settlement – Re-trigger Required\" P1 Highest new ticket (Monnify_settlements, Dominic Usiabulu reviewing within 1min; new [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] situation created) + TDSD-6643 Union Bank RC91 cycle 2 Apr 20 (12m auto-recovered, closed). TDSD-6630 NIBSS DD silence extends to any-update ~8h51m / comment ~11h42m — user-deferred, no re-dispatch. Multiple routine transitions."
updated: "2026-04-20T16:22:58Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T16:09:00Z"
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

Tick 2026-04-20 17:09 WAT Full-level. ~30 tickets updated in 16:09→17:09 WAT window; key operational deltas below.

**TDSD-6645 "Urgent Pending Settlement – Re-trigger Required" — P1 Highest NEW (16:52 WAT).**
- Filed by [[Blessing Obioha]] (Moniepoint); component Monnify_settlements; assignee [[Dominic Usiabulu]].
- Transaction MNFY|46|20260310114548|008618 pending; VA 6021082035 (Afrinvest-AFR) credit-debit-reversal left VA insufficiently funded blocking settlement; David recommends SABEC script re-trigger.
- Dominic acknowledged at 16:53 WAT ("reviewing") — 1min TTFR. SLA open: 72h to resolution (breach 2026-05-01 16:52 WAT).
- **New situation page created:** [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]]. Status developing.
- **No Immediate-tier dispatch** — clear ownership, acknowledged within 1min, named fix path, SLA open. Next-tick watch: Dominic progress on SABEC re-trigger.
- Factors: source=jira, priority=highest, ticket_new, owner_acknowledged, fix_path_named, first_surface, situation_created.

**TDSD-6643 "Union Bank | ATS | RC 91 Failure | 20260420" — cycle 2 opened + closed 12m (Medium priority).**
- Filed by [[Qazim Adedigba]] 16:28 WAT; Resolution "Transaction auto recovered" 16:37 WAT; ticket Resolved 16:41 WAT.
- Cycle 2 of 2 on Apr 20; 7th Union Bank cycle in 9 days.
- No Immediate dispatch (within-envelope fast-cycle). [[Union Bank — RC91 P1 Apr 20]] situation updated with cycle 2 delta; page remains retired.
- Factors: source=jira+slack, cycle_2, within_envelope, pattern_compounding, no_cto_action.

**TDSD-6627 NIBSS Disbursements Downtime — Completed in window.**
- NIBSS Disbursements P1 closure (distinct from TDSD-6630 NIBSS DD mandate product).
- Awareness-tier; no bearing on active NIBSS DD situation.

**TDSD-6630 NIBSS Direct Debit — silence extends further.**
- No new update this tick. Any-update silence **~8h51m** (from 08:18 WAT). Comment silence **~11h42m** (from 05:27 WAT).
- User triage B1 in briefing-2026-04-20 explicitly deferred to Apr 21 briefing — **no Immediate re-dispatch** per triage-deferred state.
- Silent-recovery pattern precedent intact (retired NIBSS DD Apr 14 after 47h silence).

**Routine transitions / in-window status refreshes (Awareness-tier):**
- TDSD-6583 "DISBURSEMENT DOWNTIME" — Done in window (companion to TDSD-6627).
- TDSD-6616, TDSD-6644 "Update ipm_ird_IP0040T1 on ACT" — still indeterminate (VCX/ACT workstream, Chijioke Achieme).
- TDSD-6605 "Update VISA ADREF File on Production" — Done.
- TDSD-6607 "Update VCX tool on 13.41.77.200" — Done.
- TDSD-6628 "TPP Documentation for SRE Handover" — Done.
- TDSD-6633 Keystone Settlement — now Done per this tick metadata (was Initial Review prior tick; confirms Keystone situation trajectory).
- TDSD-6638 Merchant Settlement disparity account 0000221603 — still new; no re-surface.
- TDSD-6642 "Backlog of pending disbursement" — indeterminate (Initial Review).
- TDSD-6612 "SETTLEMENT PAYOUT" — indeterminate.
- TDSD-6010 "2ND STREAM OF SETTLEMENT ISSUES" — indeterminate.
- ADD-4573 Done, ADD-4461 Done, ADD-3972 indeterminate.
- TCDD-1106 "Habari Pay OTP Challenge" — indeterminate (QA rework cycle continues).
- ATPP-1647 / ATPP-1608 / ATPP-1603 — indeterminate (ATPP project backlog transitions).
- TDSD-6571 "Resync | RC91 | 20260414" — Done.

**Out-of-scope carryforward (via Layer 1 email):**
- **TISD-480** ArgoCD CVE remediation — no further updates this tick. Still Awaiting Control Approval. Briefing-tier Decision candidate for Apr 21 briefing.
- **TDSD-6203** Request for Change of ISO Managers — no new update. Briefing-tier Decision candidate for Apr 21 briefing.

No Immediate-tier dispatches this tick. New situation (Monnify Settlements TDSD-6645) warrants next-tick monitoring.
