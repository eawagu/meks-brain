---
title: Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20
type:
  - "situation"
cssclasses:
  - "situation"
role: cto-teamapt
status: developing
accountability: operational-reliability
created: "2026-04-20T16:20:39Z"
updated: "2026-04-20T16:20:39Z"
summary: "TDSD-6645 P1 Highest filed 16:52 WAT Apr 20 by Blessing Obioha — Monnify transaction MNFY|46|20260310114548|008618 pending; VA 6021082035 (Afrinvest-AFR) credit-debit-reversal left VA insufficiently funded, blocking settlement; David recommends SABEC script re-trigger. Assignee Dominic Usiabulu reviewing (16:53 WAT). SLA 72h to resolution (breaches 2026-05-01 16:52 WAT)."
---

[[Monnify]] settlement P1 ticket [[TDSD-6645]] "Urgent Pending Settlement – Re-trigger Required" filed 2026-04-20 16:52 WAT by [[Blessing Obioha]], Priority: **Highest**, Component: Monnify_settlements, Request Type: Log a service request, Status: Awaiting Scheme Update (In Progress).

**Transaction specifics.** MNFY|46|20260310114548|008618 is pending. VA (6021082035 – Afrinvest-AFR) shows:
- Credit → wallet debit → reversal debit
- Ref: MIT|HYD|100004250509160823132420308489|1920873578377506816_CREDIT_0_RVSL

The reversal left the VA insufficiently funded, blocking settlement. Per David (quoted in ticket): *"No corresponding settlement entry found in DB. Kindly re-trigger settlement entry creation using the SABEC script."*

**Request scope:** (1) investigate reversal source, (2) re-trigger settlement entry via SABEC, (3) complete settlement.

**Ownership.** Assignee [[Dominic Usiabulu]] (Moniepoint, Africa/Lagos timezone). Dominic acknowledged at 16:53 WAT with comment "reviewing". Reporter Blessing tagged Dominic at 16:53:02 WAT ("Kindly assist") with Account_Statement_With_Address (15).xls attachment.

**SLA posture.**
- Time-to-first-response: started 16:52 WAT, breach 2026-04-23 16:52 WAT (24h elapsing off calendar hours; effectively responded within 1min via Dominic's "reviewing" comment at 16:53 WAT).
- Time-to-resolution: started 16:52 WAT, breach 2026-05-01 16:52 WAT (71h52m remaining at tick observation).

**Adjacent context.**
- [[Merchant Settlement — Systemic Reconciliation Disparity]] (TDSD-6431, TDSD-6444) tracks pattern of Monnify settlement debit/CBA credit mismatches at merchant account 0000228201 — distinct failure mode (wrong-account credit, not VA reversal), but same product family.
- [[Monnify Atlas NIP — Disbursement Delay P1 Apr 14]] and broader disbursement-downtime pattern tickets TDSD-6627, TDSD-6583 (both Done in 16:09-17:09 tick window) are separate — NIP disbursement vs. VA-backed settlement re-trigger.

**No Immediate-tier dispatch this tick.** Clear ownership (Dominic assigned + acknowledged within 1min), named fix path (SABEC script), P1 SLA window open (24h TTFR, 72h TTR). CTO-direct engagement not required at this stage. Situation will track through next ticks: (a) if SABEC re-trigger completes within SLA, retire; (b) if Dominic stalls or investigation expands scope (e.g., reversal source is systemic), escalate.

## Sources
jira [[TDSD-6645]] filed 16:52 WAT Apr 20 by Blessing Obioha; jira TDSD-6645 comment Blessing 16:53:02 WAT (Dominic ping + xls attachment); jira TDSD-6645 comment Dominic 16:53:59 WAT ("reviewing")

## Deltas
- [2026-04-20 17:09 WAT] — Situation created from 17:09 WAT Full tick Jira sweep. TDSD-6645 created 17m before tick end; Dominic acknowledged within 1min. P1 Highest priority, Monnify_settlements component, VA reversal blocking single-transaction settlement, SABEC re-trigger is the named fix. Factors: source=jira, priority=highest, ticket_new, owner_assigned_and_acknowledged, fix_path_named, sla_open, first_surface, no_immediate_dispatch. Next-tick watch: Dominic progress on SABEC re-trigger; investigation findings on reversal source.
