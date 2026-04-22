---
role: cto-teamapt
type:
  - "situation"
title: Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20
status: developing
created: "2026-04-20T16:20:39Z"
summary: "TDSD-6645 P1 Highest filed 16:52 WAT Apr 20 by Blessing Obioha — Monnify VA 6021082035 reversal blocking settlement; SABEC re-trigger the named fix. 2026-04-22 17:09 WAT tick: TDSD-6645 unchanged (Dominic still silent, status Awaiting Scheme Update, assignee silence ~48h16m since 16:53 WAT Apr 20 acknowledgement). **TDSD-6662 Opeyemi-assigned Settlement ticket Done this tick** — third Opeyemi-same-day-close data point alongside TDSD-6655/TDSD-6661, strengthening the assignee-variable side of the pattern anomaly. Carry-forward to briefing-2026-04-23 remains; reframed ask now carries workflow-discipline angle (from TDSD-6688) + strengthened assignee-variable evidence (TDSD-6662 adds third data point under Opeyemi)."
updated: "2026-04-22T16:21:17Z"
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

**Ownership.** Assignee [[Dominic Usiabulu]] (Moniepoint, Africa/Lagos timezone). Dominic acknowledged at 16:53 WAT Apr 20 with comment "reviewing". Reporter Blessing tagged Dominic at 16:53:02 WAT ("Kindly assist") with Account_Statement_With_Address (15).xls attachment. **No further comment from Dominic on TDSD-6645 since 16:53 WAT Apr 20** — effective assignee silence ~48h16m at the 17:09 WAT Apr 22 tick.

**Reporter chase chain.**
- Apr 21 15:02 WAT — Blessing first chase ping ("any update?"), no reply.
- Apr 22 12:10 WAT — Blessing second chase ping, no reply.
- Two chase pings without any response is the pattern marker. Status moved to **Awaiting Scheme Update** sometime in this window — consistent with Dominic having punted to scheme/NIBSS side and stopping internal comms.

**Dominic-is-active, just silent-on-this-ticket (added 16:15 WAT Apr 22).** Jira sweep at 16:15 WAT catches **TDSD-6688** "UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER(22042026)" — Dominic-assigned, Medium priority, **status: Awaiting Scheme Update**. A second Dominic-owned ticket in the exact same stall status as TDSD-6645. This is evidence that Dominic is not absent or overloaded — he is taking new assignments and progressing them into the same "Awaiting Scheme Update" punt-posture where assignee-side comms stop. **Reframes the anomaly:** the issue is not "Dominic is unavailable" but "Dominic's workflow routes tickets into Awaiting Scheme Update without chase-reply discipline." Separately relevant because `Awaiting Scheme Update` is a valid upstream-blocked state — but it should not suppress reply-to-reporter on a P1 Highest.

**Pattern anomaly — comparable settlement tickets resolved same-day (strengthened 17:09 WAT Apr 22).**
- [[TDSD-6655]] "Urgent Pending Settlement – System Failure" — assignee [[Opeyemi]], resolved same-day.
- [[TDSD-6661]] "Urgent Pending Settlement – System Failure" — assignee Opeyemi, resolved same-day.
- **[[TDSD-6662]] — assignee Opeyemi, Done at 17:09 WAT Apr 22 tick window** (third Opeyemi-same-day-close data point).
- TDSD-6645 scope differs (VA-reversal, not system failure) and assignee differs (Dominic, not Opeyemi). The stall correlates with both variables, not just one. Still insufficient data to isolate scope-vs-assignee as the causal variable — but **3 Opeyemi-same-day-closes vs. 1 Dominic-48h+-stall** is a strengthening signal on the assignee axis. The scope-specificity of TDSD-6645 (VA-reversal vs. System Failure) still preserves some alternative hypothesis space, but the delta in sample size is tilting the evidence.

**SLA posture.**
- Time-to-first-response: met (1min via Dominic's 16:53 WAT reviewing comment).
- Time-to-resolution: started 16:52 WAT Apr 20, breach 2026-05-01 16:52 WAT. Effective working-hours remaining against P1 72h target: ~22h wall-clock, but formal breach is ~9 days out. **Functional** stall is the issue, not SLA breach — a P1 Highest sitting in Awaiting Scheme Update for 48h+ with chase pings ignored is the concern.

**Adjacent context.**
- [[Merchant Settlement — Systemic Reconciliation Disparity]] (TDSD-6431, TDSD-6444) tracks pattern of Monnify settlement debit/CBA credit mismatches at merchant account 0000228201 — distinct failure mode (wrong-account credit, not VA reversal), but same product family.
- [[Monnify Atlas NIP — Disbursement Delay P1 Apr 14]] and broader disbursement-downtime pattern tickets TDSD-6627, TDSD-6583 (both Done Apr 20) are separate — NIP disbursement vs. VA-backed settlement re-trigger. TDSD-6687 NIP Disbursement Downtime Apr 22 Completed fast-cycle extends that NIP family.

**No Immediate-tier dispatch this tick.** P1 Highest stall of 48h+ without assignee response would normally trip Immediate — but the 3 active Polaris/UBA/CoralPay Immediate items are already in the briefing-2026-04-22 B1 CTO-DM batch to [[Oladapo Onayemi]] awaiting user action. Adding a 4th item mid-stream would dilute the batch. **Carry forward** as next-briefing Decision candidate with the reframed "Awaiting Scheme Update workflow discipline" angle (from TDSD-6688) PLUS the strengthened assignee-variable evidence (3:1 Opeyemi-vs-Dominic split from TDSD-6655/6661/6662 vs. TDSD-6645): if TDSD-6645 is still Awaiting Scheme Update with no Dominic response by briefing-2026-04-23 compose time, escalate under same Oladapo channel with the workflow-discipline + assignee-pattern framing as the ask.

## Sources
jira [[TDSD-6645]] filed 16:52 WAT Apr 20 by Blessing Obioha; jira TDSD-6645 comment Blessing 16:53:02 WAT (Dominic ping + xls attachment); jira TDSD-6645 comment Dominic 16:53:59 WAT ("reviewing"); jira TDSD-6645 Blessing chase 15:02 WAT Apr 21; jira TDSD-6645 Blessing chase 12:10 WAT Apr 22; jira TDSD-6645 status Awaiting Scheme Update (observed 14:15 WAT Apr 22 tick); jira TDSD-6655 + TDSD-6661 same-day resolutions (Opeyemi, comparison signal); jira TDSD-6662 Opeyemi Settlement Done 17:09 WAT Apr 22 tick (third same-day-close data point); jira TDSD-6688 Dominic-assigned Awaiting Scheme Update 15:13 WAT Apr 22 (second-Dominic-ticket-same-stall-status signal)

## Deltas
- [2026-04-20 17:09 WAT] — Situation created from 17:09 WAT Full tick Jira sweep. TDSD-6645 created 17m before tick end; Dominic acknowledged within 1min. P1 Highest priority, Monnify_settlements component, VA reversal blocking single-transaction settlement, SABEC re-trigger is the named fix. Factors: source=jira, priority=highest, ticket_new, owner_assigned_and_acknowledged, fix_path_named, sla_open, first_surface, no_immediate_dispatch. Next-tick watch: Dominic progress on SABEC re-trigger; investigation findings on reversal source.
- [2026-04-22 14:15 WAT] — **45h+ assignee silence + 2 chase pings from reporter.** Status now Awaiting Scheme Update (consistent with Dominic having punted to scheme and stopping internal comms). Blessing chase pings at Apr 21 15:02 WAT and Apr 22 12:10 WAT both unanswered. **Pattern anomaly:** TDSD-6655 and TDSD-6661 ("Urgent Pending Settlement – System Failure", both assigned Opeyemi) closed same-day; TDSD-6645 (VA-reversal scope, assigned Dominic) stalling. Insufficient data to isolate scope vs. assignee as the causal variable, but both correlate. No Immediate dispatch this tick — 3 active Immediate items (Polaris/UBA/CoralPay) already in briefing-2026-04-22 B1 CTO-DM batch awaiting user action; adding a 4th would dilute. **Carry forward as next-briefing Decision candidate** — if still Awaiting Scheme Update with no Dominic response by briefing-2026-04-23 compose time, escalate under same Oladapo channel. Factors: source=jira, priority=highest, assignee_silent_45h, reporter_chase_2x_unanswered, pattern_anomaly_vs_TDSD-6655+6661, no_immediate_dispatch_due_to_batch_discipline, carry_forward.
- [2026-04-22 16:15 WAT] — **TDSD-6688 adds evidence that Dominic is active, just silent on TDSD-6645 specifically.** Jira sweep detects TDSD-6688 "UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER(22042026)" updated 15:13 WAT Apr 22 — Dominic-assigned, Medium priority, status **Awaiting Scheme Update** (same stall status as TDSD-6645). Reframes the pattern: not "Dominic unavailable" but "Dominic's workflow routes to Awaiting Scheme Update without chase-reply discipline." TDSD-6645 itself unchanged this tick — no new Dominic comment, status still Awaiting Scheme Update (assignee silence now ~47h15m). Carry-forward plan for briefing-2026-04-23 remains; reframed ask surface the workflow-discipline angle alongside the assignee-vs-scope comparison. Factors: source=jira, priority=highest, assignee_silent_47h15m, second_dominic_ticket_same_stall_status_TDSD-6688, workflow_discipline_reframe, carry_forward_to_briefing-2026-04-23.
- [2026-04-22 17:09 WAT] — TDSD-6645 unchanged this tick (Dominic still silent, status Awaiting Scheme Update, assignee silence ~48h16m since 16:53 WAT Apr 20). **TDSD-6662 Opeyemi-assigned Settlement ticket Done this tick window** — third Opeyemi-same-day-close data point alongside TDSD-6655 and TDSD-6661. The 3:1 Opeyemi-vs-Dominic split on this ticket family is now more pronounced, strengthening the assignee-variable hypothesis while not yet definitively ruling out the scope-specificity alternative. Reframed carry-forward ask for briefing-2026-04-23 now combines: (a) workflow-discipline angle (Dominic routes to Awaiting Scheme Update without chase-reply discipline, per TDSD-6688), and (b) strengthened assignee-pattern evidence (3 Opeyemi same-day-closes vs. 1 Dominic 48h+ stall). No Immediate dispatch — still batched behind briefing-2026-04-22 B1 items awaiting user action. Factors: source=jira, priority=highest, assignee_silent_48h16m, third_opeyemi_same_day_close_TDSD-6662, assignee_variable_strengthening_3_to_1, carry_forward_reframed_with_two_angles.
