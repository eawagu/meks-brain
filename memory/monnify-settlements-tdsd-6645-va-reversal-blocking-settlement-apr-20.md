---
role: cto-teamapt
type:
  - "situation"
title: Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20
status: developing
created: "2026-04-20T16:20:39Z"
summary: "TDSD-6645 P1 Highest filed 16:52 WAT Apr 20 by Blessing Obioha — Monnify VA 6021082035 reversal blocking settlement; SABEC re-trigger the named fix. 2026-04-22 14:15 WAT tick: status Awaiting Scheme Update; Blessing has sent 2 chase pings (Apr 21 15:02 + Apr 22 12:10 WAT) with no assignee reply — effective silence from Dominic ~45h since 16:53 WAT acknowledgement. SLA to resolution: ~24h remaining (breaches 2026-05-01 16:52 WAT — revised window). Pattern anomaly vs. TDSD-6655 + TDSD-6661 (both 'Urgent Pending Settlement – System Failure', assigned Opeyemi, same-day close) — TDSD-6645 stall correlates with distinct scope (VA-reversal) and distinct assignee (Dominic)."
updated: "2026-04-22T14:24:22Z"
cssclasses:
  - "situation"
accountability: operational-reliability
---

[[Monnify]] settlement P1 ticket [[TDSD-6645]] "Urgent Pending Settlement – Re-trigger Required" filed 2026-04-20 16:52 WAT by [[Blessing Obioha]], Priority: **Highest**, Component: Monnify_settlements, Request Type: Log a service request, Status: **Awaiting Scheme Update** (In Progress).

**Transaction specifics.** MNFY|46|20260310114548|008618 is pending. VA (6021082035 – Afrinvest-AFR) shows:
- Credit → wallet debit → reversal debit
- Ref: MIT|HYD|100004250509160823132420308489|1920873578377506816_CREDIT_0_RVSL

The reversal left the VA insufficiently funded, blocking settlement. Per David (quoted in ticket): *"No corresponding settlement entry found in DB. Kindly re-trigger settlement entry creation using the SABEC script."*

**Request scope:** (1) investigate reversal source, (2) re-trigger settlement entry via SABEC, (3) complete settlement.

**Ownership.** Assignee [[Dominic Usiabulu]] (Moniepoint, Africa/Lagos timezone). Dominic acknowledged at 16:53 WAT Apr 20 with comment "reviewing". Reporter Blessing tagged Dominic at 16:53:02 WAT ("Kindly assist") with Account_Statement_With_Address (15).xls attachment. **No further comment from Dominic since 16:53 WAT Apr 20** — effective assignee silence ~45h at the 14:15 WAT Apr 22 tick.

**Reporter chase chain.**
- Apr 21 15:02 WAT — Blessing first chase ping ("any update?"), no reply.
- Apr 22 12:10 WAT — Blessing second chase ping, no reply.
- Two chase pings without any response is the pattern marker. Status moved to **Awaiting Scheme Update** sometime in this window — consistent with Dominic having punted to scheme/NIBSS side and stopping internal comms.

**Pattern anomaly — comparable settlement tickets resolved same-day.**
- [[TDSD-6655]] "Urgent Pending Settlement – System Failure" — assignee [[Opeyemi]], resolved same-day.
- [[TDSD-6661]] "Urgent Pending Settlement – System Failure" — assignee Opeyemi, resolved same-day.
- TDSD-6645 scope differs (VA-reversal, not system failure) and assignee differs (Dominic, not Opeyemi). The stall correlates with both variables, not just one. Insufficient data to isolate which is causal — but the fact that the same family of tickets moves same-day under Opeyemi while TDSD-6645 stalls 45h+ under Dominic is the signal. Tracks as hypothesis for [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] or a new "settlement-retrigger ownership gap" concept if it recurs.

**SLA posture.**
- Time-to-first-response: met (1min via Dominic's 16:53 WAT reviewing comment).
- Time-to-resolution: started 16:52 WAT Apr 20, breach 2026-05-01 16:52 WAT. Effective working-hours remaining against P1 72h target: ~24h, but since the clock is wall-clock here, formal breach is still ~9 days out. **Functional** stall is the issue, not SLA breach — a P1 Highest sitting in Awaiting Scheme Update for 45h+ with chase pings ignored is the concern.

**Adjacent context.**
- [[Merchant Settlement — Systemic Reconciliation Disparity]] (TDSD-6431, TDSD-6444) tracks pattern of Monnify settlement debit/CBA credit mismatches at merchant account 0000228201 — distinct failure mode (wrong-account credit, not VA reversal), but same product family.
- [[Monnify Atlas NIP — Disbursement Delay P1 Apr 14]] and broader disbursement-downtime pattern tickets TDSD-6627, TDSD-6583 (both Done Apr 20) are separate — NIP disbursement vs. VA-backed settlement re-trigger.

**No Immediate-tier dispatch this tick.** P1 Highest stall of 45h+ without assignee response would normally trip Immediate — but the 3 active Polaris/UBA/CoralPay Immediate items are already in the briefing-2026-04-22 B1 CTO-DM batch to [[Oladapo Onayemi]] awaiting user action. Adding a 4th item mid-stream would dilute the batch. **Carry forward** as next-briefing Decision candidate: if TDSD-6645 is still Awaiting Scheme Update with no Dominic response by briefing-2026-04-23 compose time, escalate under same Oladapo channel with the Opeyemi-vs-Dominic pattern framing as the ask.

## Sources
jira [[TDSD-6645]] filed 16:52 WAT Apr 20 by Blessing Obioha; jira TDSD-6645 comment Blessing 16:53:02 WAT (Dominic ping + xls attachment); jira TDSD-6645 comment Dominic 16:53:59 WAT ("reviewing"); jira TDSD-6645 Blessing chase 15:02 WAT Apr 21; jira TDSD-6645 Blessing chase 12:10 WAT Apr 22; jira TDSD-6645 status Awaiting Scheme Update (observed 14:15 WAT Apr 22 tick); jira TDSD-6655 + TDSD-6661 same-day resolutions (Opeyemi, comparison signal)

## Deltas
- [2026-04-20 17:09 WAT] — Situation created from 17:09 WAT Full tick Jira sweep. TDSD-6645 created 17m before tick end; Dominic acknowledged within 1min. P1 Highest priority, Monnify_settlements component, VA reversal blocking single-transaction settlement, SABEC re-trigger is the named fix. Factors: source=jira, priority=highest, ticket_new, owner_assigned_and_acknowledged, fix_path_named, sla_open, first_surface, no_immediate_dispatch. Next-tick watch: Dominic progress on SABEC re-trigger; investigation findings on reversal source.
- [2026-04-22 14:15 WAT] — **45h+ assignee silence + 2 chase pings from reporter.** Status now Awaiting Scheme Update (consistent with Dominic having punted to scheme and stopping internal comms). Blessing chase pings at Apr 21 15:02 WAT and Apr 22 12:10 WAT both unanswered. **Pattern anomaly:** TDSD-6655 and TDSD-6661 ("Urgent Pending Settlement – System Failure", both assigned Opeyemi) closed same-day; TDSD-6645 (VA-reversal scope, assigned Dominic) stalling. Insufficient data to isolate scope vs. assignee as the causal variable, but both correlate. No Immediate dispatch this tick — 3 active Immediate items (Polaris/UBA/CoralPay) already in briefing-2026-04-22 B1 CTO-DM batch awaiting user action; adding a 4th would dilute. **Carry forward as next-briefing Decision candidate** — if still Awaiting Scheme Update with no Dominic response by briefing-2026-04-23 compose time, escalate under same Oladapo channel. Factors: source=jira, priority=highest, assignee_silent_45h, reporter_chase_2x_unanswered, pattern_anomaly_vs_TDSD-6655+6661, no_immediate_dispatch_due_to_batch_discipline, carry_forward.
