---
role: cto-teamapt
type:
  - "situation"
title: Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20
status: developing
created: "2026-04-20T16:20:39Z"
summary: "TDSD-6645 P1 Highest filed 16:52 WAT Apr 20 — Monnify VA 6021082035 reversal blocking settlement. **2026-04-24 16:09 WAT: TDSD-6721 Resolved 15:54 WAT by Opeyemi Ahmed (Samson Anaele's second Opeyemi-direct close today, 1h01m filing-to-Resolved).** Opeyemi-cluster evidence now 7 closures/ownership + 1 in-flight Opeyemi-direct-assigned (TDSD-6720 INITIAL REVIEW) + 1 cross-ticket CC-escalation + 1 fast-close-bypass across 3 reporter clusters. TDSD-6645 still Escalated, 37h01m Dominic silence; TDSD-6684 still Awaiting Scheme Update, 38h08m Dominic silence. Briefing-2026-04-25 Decision candidate: direct-ask Opeyemi path hardens further."
updated: "2026-04-24T15:21:34Z"
cssclasses:
  - "situation"
accountability: operational-reliability
---

[[Monnify]] settlement P1 ticket [[TDSD-6645]] "Urgent Pending Settlement – Re-trigger Required" filed 2026-04-20 16:52 WAT by [[Blessing Obioha]], Priority: **Highest**, Component: Monnify_settlements. **Status as of 2026-04-24 16:09 WAT: Escalated** (unchanged since 2026-04-23 04:08 WAT transition from Awaiting Scheme Update).

**Transaction specifics.** MNFY|46|20260310114548|008618 is pending. VA (6021082035 – Afrinvest-AFR) shows Credit → wallet debit → reversal debit. Ref: MIT|HYD|100004250509160823132420308489|1920873578377506816_CREDIT_0_RVSL. The reversal left the VA insufficiently funded, blocking settlement. Per David: *"No corresponding settlement entry found in DB. Kindly re-trigger settlement entry creation using the SABEC script."*

**Parallel-ticket resolution — TDSD-6268 Done (Apr 24 11:02 WAT).** [[TDSD-6268]] "SETTLEMENT PROCESSING" filed 2026-03-23 by [[Blessing Olawale]] on the **same transaction reference MNFY|46|20260310114548|008618**. Assignee: [[Opeyemi Ahmed]]. Transitioned Work in progress → Done 11:02 WAT Apr 24. No closure RCA comment.

**TDSD-6645 state — Blessing 3rd chase at 11:20 WAT Apr 24, no Dominic response through 16:09 WAT.** Status still Escalated. Dominic ticket-specific silence: 04:08 WAT Apr 23 → 16:09 WAT Apr 24 = **37h01m continuing**. Chase cadence is now daily — accelerating pressure without visible response progression.

**Cross-ticket pressure signal — TDSD-6684 Blessing CC-escalation to Opeyemi Ahmed at 11:19 WAT Apr 24.** [[TDSD-6684]] "Pending Refund Transactions" Dominic-assigned, Medium, Awaiting Scheme Update. Blessing CC'd Opeyemi at 11:19:31 WAT Apr 24. Dominic silence: Apr 23 03:01 WAT → Apr 24 16:09 WAT = 38h08m.

**TDSD-6718 Opeyemi-direct-assign fast-close (filing → In Progress → Closed in 7 minutes) — Apr 24 13:30→13:37 WAT.** [[TDSD-6718]] filed by Samson Anaele, Opeyemi Ahmed direct-assigned, 7-min filing-to-Closed.

**Opeyemi-cluster expansion (Apr 24 14:09→15:09 WAT tick):**
- **[[TDSD-6714]]** "Transaction Status Update" — Closed 14:48 WAT by Opeyemi Ahmed. Reporter: [[Samuel Amos]] — NEW cluster-reporter. 4h37m filing-to-Closed.
- **[[TDSD-6720]]** "PENDING SETTLEMENT" — NEW at 14:43 WAT. Reporter: [[Blessing Olawale]]. Opeyemi direct-assigned, status INITIAL REVIEW. First Blessing-Olawale routing-bypass.
- **[[TDSD-6721]]** "PENDING PAYABLE POSTING" — NEW at 14:53 WAT. Reporter: [[Samson Anaele]]. Opeyemi direct-assigned, status Awaiting Scheme Update. Second Samson-Anaele direct-Opeyemi today.

**Opeyemi-cluster expansion continues (Apr 24 15:09→16:09 WAT tick this tick):**
- **TDSD-6721 "PENDING PAYABLE POSTING" — Resolved 15:54 WAT by Opeyemi Ahmed.** 1h01m filing-to-Resolved (14:53 WAT → 15:54 WAT). Samson Anaele's second Opeyemi-direct close today (after TDSD-6718 at 13:37 WAT). Status transition Awaiting Scheme Update → Resolved. **Seventh Opeyemi-cluster closure.**
- TDSD-6720 unchanged (still INITIAL REVIEW at tick time — Blessing Olawale's first direct-Opeyemi ticket still in-flight).

**Pattern consolidation — Opeyemi-cluster ownership firming + demonstrably faster on refund/settlement cluster + expansion to 3 reporter clusters.** Evidence stack (Apr 20 → Apr 24):
- TDSD-6655, TDSD-6661, TDSD-6662 — Opeyemi-assigned, same-day-closed (Apr 21–22).
- TDSD-6268 — Opeyemi-assigned, Done 11:02 WAT Apr 24 on same transaction as TDSD-6645.
- Blessing CCs Opeyemi on Dominic-assigned TDSD-6684 at 11:19 WAT Apr 24.
- TDSD-6718 — Opeyemi-direct-assigned, 7-min fast-close 13:37 WAT Apr 24 (Samson Anaele).
- TDSD-6714 — Opeyemi-closed 14:48 WAT Apr 24, Samuel Amos reporter (reporter-surface expansion).
- TDSD-6720 — Opeyemi-direct-assigned 14:43 WAT (Blessing Olawale first routing-bypass, INITIAL REVIEW at tick time).
- **TDSD-6721 — Opeyemi-closed 15:54 WAT Apr 24, Samson Anaele reporter, 1h01m filing-to-Resolved (this tick).**

Opeyemi-cluster evidence now **7 closures/ownership + 1 in-flight Opeyemi-direct-assigned (TDSD-6720) + 1 cross-ticket CC-escalation + 1 fast-close-bypass** across **3 distinct reporter clusters** (Samson Anaele, Blessing Obioha/Olawale, Samuel Amos). Vs. Dominic **2 stalls continuing** (TDSD-6645 37h01m, TDSD-6684 38h08m) on refund/settlement cluster.

**Ownership — Apr 23 handoff context.** Assignee [[Dominic Usiabulu]] acknowledged at 16:53 WAT Apr 20 with "reviewing". **Apr 23 04:08 WAT: Dominic broke 59h15m silence** with: *"MIT|HYD|100004250509160823132420308489|1920873578377506816_CREDIT_0_RVSL was triggered by the inwards payments team, we will their review to understand why the reversal was triggered even though we have settled the merchant."* Status transitioned Awaiting Scheme Update → Escalated. Dominic's framing is handoff-to-awaits (await-their-review) rather than drive-to-closure.

**Counter-signal — Dominic end-of-day resolution burst Apr 23 23:25–23:32 WAT.** Four tickets closed: TDSD-6553, TDSD-6612, TDSD-6688, TDSD-6706. TDSD-6645 and TDSD-6684 were NOT in the resolution burst. The burst reframes workflow-discipline concern from "stall" to "backlog-processing-at-end-of-day with ticket-specific silence on TDSD-6645 + TDSD-6684."

**Pattern anomaly — comparable settlement tickets resolved same-day.** 7 Opeyemi-cluster closures + 1 cross-ticket CC-escalation + demonstrably faster close cadence + 1 in-flight Opeyemi-direct-assigned + 3 reporter clusters bypassing Dominic vs. 1 Dominic-37h-stall-continuing on TDSD-6645 + 1 Dominic-38h-stall-on-TDSD-6684 is the assignee-variable evidence.

**SLA posture.** Time-to-first-response met. Time-to-resolution: breach 2026-05-01 16:52 WAT. Escalated status may reset SLA-resolution clock depending on Moniepoint policy — unverified.

**Adjacent context.**
- [[Merchant Settlement — Systemic Reconciliation Disparity]] (TDSD-6431, TDSD-6444, TDSD-6638) tracks pattern of Monnify settlement debit/CBA credit mismatches — distinct failure mode, same product family.
- [[Monnify Atlas NIP — Disbursement Delay P1 Apr 14]] NIP disbursement separate.
- [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] retired Apr 24.

**No Immediate-tier dispatch this tick.** TDSD-6721 Resolved is positive routing signal, not alarm. Accumulating for briefing-2026-04-25 Decision item — "TDSD-6645 Dominic silence 37h post-Escalated + TDSD-6268 Done + TDSD-6718/6721 Opeyemi-direct-closed + TDSD-6714/6720 Opeyemi-cluster expansion across 3 reporter clusters: treat as implicit resolution / ping Dominic / **direct-ask Opeyemi for TDSD-6645 closure**?" With 7 Opeyemi-cluster closures + 1 in-flight Opeyemi-direct + 3-reporter-cluster bypass pattern vs. 1 Dominic-stall-continuing on the core ticket, direct-ask Opeyemi is structurally indicated for TDSD-6645 administrative closure.

## Sources
jira [[TDSD-6645]] filed 16:52 WAT Apr 20 by Blessing Obioha; jira TDSD-6645 Dominic comment 04:08 WAT Apr 23 attribution-transfer + status Escalated; jira TDSD-6645 Blessing chase 11:20 WAT Apr 24 (3rd chase); jira TDSD-6268 High priority same transaction, Opeyemi assignee, Done 11:02 WAT Apr 24; jira TDSD-6684 Blessing chase 11:19 WAT Apr 24 with Opeyemi Ahmed CC; jira TDSD-6718 filed 13:30 WAT Apr 24 by Samson Anaele, Opeyemi Closed 13:37 WAT (7m); jira TDSD-6714 Closed 14:48 WAT Apr 24 by Opeyemi (Samuel Amos reporter); jira TDSD-6720 NEW 14:43 WAT Apr 24 (Blessing Olawale, Opeyemi direct-assigned); jira TDSD-6721 NEW 14:53 WAT Apr 24 (Samson Anaele, Opeyemi direct-assigned); **jira TDSD-6721 Resolved 15:54 WAT Apr 24 by Opeyemi Ahmed (1h01m filing-to-Resolved, Samson-Anaele's second Opeyemi-direct close today)**; jira TDSD-6655/6661/6662 same-day Opeyemi closures; jira TDSD-6688/6553/6612/6706 Dominic resolution burst 23:25–23:32 WAT Apr 23.

## Deltas
- [2026-04-20 17:09 WAT] — Situation created. TDSD-6645 P1 Highest, Monnify_settlements, VA reversal blocking settlement, SABEC re-trigger named fix. Factors: priority=highest, first_surface.
- [2026-04-22 14:15 WAT] — 45h+ assignee silence + 2 chase pings. Pattern anomaly vs. TDSD-6655/6661 Opeyemi same-day closes.
- [2026-04-22 17:09 WAT] — TDSD-6662 Opeyemi Settlement Done; 3:1 Opeyemi-vs-Dominic split.
- [2026-04-23 06:10 WAT] — Dominic broke 59h15m silence 04:08 WAT with attribution-transfer; status Escalated. TDSD-6684 NEW. Surfaced as briefing-2026-04-23 D1 + A2.
- [2026-04-24 11:09 WAT] — TDSD-6268 Done at 11:02 WAT (Opeyemi, same transaction). Inwards-team owner candidate.
- [2026-04-24 12:09 WAT] — Blessing 3rd-chase on TDSD-6645 + first cross-ticket CC-escalation to Opeyemi on TDSD-6684.
- [2026-04-24 13:09 WAT] — TDSD-6718 NEW Samson→Opeyemi direct-assigned 13:30 WAT.
- [2026-04-24 14:09 WAT] — TDSD-6718 Closed 7m after filing. Routing bypass + fast execution together.
- [2026-04-24 15:09 WAT — Opeyemi-cluster expansion across 3 reporter clusters in 1-hour window] — TDSD-6714 Closed 14:48 WAT (Samuel Amos new cluster-reporter) + TDSD-6720 NEW 14:43 WAT (Blessing Olawale first routing-bypass, INITIAL REVIEW) + TDSD-6721 NEW 14:53 WAT (Samson Anaele second direct-Opeyemi today, Awaiting Scheme Update). Evidence stack 6 closures + 2 in-flight + 1 CC-escalation across 3 reporter clusters.
- [2026-04-24 16:09 WAT — TDSD-6721 Resolved 15:54 WAT by Opeyemi Ahmed, seventh Opeyemi-cluster closure] — **TDSD-6721 "PENDING PAYABLE POSTING" transitioned Awaiting Scheme Update → Resolved at 15:54:10 WAT Apr 24** by Opeyemi Ahmed. **1h01m filing-to-Resolved** (14:53 WAT → 15:54 WAT). Samson Anaele's **second Opeyemi-direct close today** after TDSD-6718 (13:37 WAT 7-min fast-close). Opeyemi-cluster evidence stack advances to **7 closures/ownership + 1 in-flight Opeyemi-direct-assigned (TDSD-6720 still INITIAL REVIEW) + 1 cross-ticket CC-escalation + 1 fast-close-bypass** across 3 distinct reporter clusters. Dominic side unchanged: TDSD-6645 still Escalated (37h01m Dominic silence continuing); TDSD-6684 still Awaiting Scheme Update (38h08m Dominic silence). Ratio of Opeyemi closures to Dominic stalls tilts further. No Immediate dispatch — positive routing signal, not alarm. **Briefing-2026-04-25 Decision candidate unchanged but hardened:** direct-ask Opeyemi for TDSD-6645 closure is the evidence-saturated structurally-indicated path. Factors: source=jira, tdsd6721_resolved_15_54_wat, opeyemi_ahmed_closer, 1h01m_filing_to_resolved, seventh_opeyemi_cluster_closure, samson_anaele_second_opeyemi_direct_close_today, tdsd6720_still_initial_review_in_flight, tdsd6645_unchanged_dominic_silence_37h01m, tdsd6684_unchanged_dominic_silence_38h08m, briefing_2026_04_25_decision_candidate_hardened, no_immediate_dispatch.
