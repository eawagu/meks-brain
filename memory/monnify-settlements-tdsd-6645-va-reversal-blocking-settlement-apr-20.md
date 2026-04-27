---
role: cto-teamapt
type:
  - "situation"
title: Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20
status: developing
created: "2026-04-20T16:20:39Z"
summary: "TDSD-6645 P1 Highest filed 16:52 WAT Apr 20. **2026-04-27 09:09 WAT: Blessing-cluster chase compounds — TDSD-6684 5th chase with Chinonyerem CC added (Dominic ticket-specific silence 102h08m since 03:01 WAT Apr 23) + NEW addition TDSD-6637 INITIAL REVIEW Apr 17-vintage Chinonyerem-stalled (7-day Chinonyerem silence broken by Blessing Olawale chase). Dual-assignee stall pattern (Dominic + Chinonyerem) now spans 3 tickets. Opeyemi-cluster velocity unchanged from Apr 24. Direct-ask Opeyemi structurally indicated and further evidence-saturated.**"
updated: "2026-04-27T08:19:22Z"
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

**Opeyemi-cluster expansion continues (Apr 24 15:09→16:09 WAT tick):**
- **TDSD-6721 "PENDING PAYABLE POSTING" — Resolved 15:54 WAT by Opeyemi Ahmed.** 1h01m filing-to-Resolved (14:53 WAT → 15:54 WAT). Samson Anaele's second Opeyemi-direct close today (after TDSD-6718 at 13:37 WAT). Status transition Awaiting Scheme Update → Resolved. **Seventh Opeyemi-cluster closure.**
- TDSD-6720 unchanged (still INITIAL REVIEW at tick time — Blessing Olawale's first direct-Opeyemi ticket still in-flight).

**Apr 27 09:09 WAT — Blessing-cluster chase pattern compounds; dual-assignee stall pattern emerges (Dominic + Chinonyerem).** Two new chase signals this tick window (08:09 → 09:09 WAT):

- **TDSD-6684 chase 5 + Chinonyerem CC added.** [[Blessing Obioha]] comment 08:46:25 WAT, edited 08:55:31 WAT to add `cc @Chinonyerem Alozie`: *"This is yet to be treated. Please finalize merchant initiated refund."* 5th chase total (Apr 22 mediagroup; Apr 22 11:24 first @Dominic; Apr 23 03:01 Dominic's *"thiis is in progress"* reply; Apr 23 10:57 chase 2; Apr 24 11:19 chase 3 with Opeyemi CC; **Apr 27 08:46 chase 4 with Chinonyerem CC**). Status unchanged In Progress / Blocker / Dominic-assigned. **Dominic ticket-specific silence: 03:01 WAT Apr 23 → 09:09 WAT Apr 27 = 102h08m** (4 days 6 hours since Dominic's last reply, despite Blocker priority).

- **TDSD-6637 NEW addition to track — first Apr 27 surface.** [[TDSD-6637]] "PENDING SETTLEMENT" filed by [[Blessing Olawale]] (Apr 17-vintage filing, MNFY|11/12/69 unsettled transactions across Apr 1–9 dates, no back-office record). Assignee: [[Chinonyerem Alozie]]. Priority: Medium. Status: **INITIAL REVIEW** (unchanged since Apr 20 11:04 WAT Chinonyerem comment *"This is being reviewed"*). Today's chase: Blessing Olawale 08:44 WAT Apr 27 *"@Chinonyerem Alozie kindly assist with an update here. This is long overdue."* — **first chase, breaking 7-day Chinonyerem silence** (Apr 20 11:04 WAT → Apr 27 08:44 WAT = 165h40m). Adds Chinonyerem as second stalled-assignee on Blessing-cluster settlement tickets.

**Pattern consolidation — Opeyemi-cluster ownership firming + demonstrably faster on refund/settlement cluster + dual-assignee stall pattern emerges.** Evidence stack (Apr 20 → Apr 27):
- TDSD-6655, TDSD-6661, TDSD-6662 — Opeyemi-assigned, same-day-closed (Apr 21–22).
- TDSD-6268 — Opeyemi-assigned, Done 11:02 WAT Apr 24 on same transaction as TDSD-6645.
- Blessing CCs Opeyemi on Dominic-assigned TDSD-6684 at 11:19 WAT Apr 24.
- TDSD-6718 — Opeyemi-direct-assigned, 7-min fast-close 13:37 WAT Apr 24 (Samson Anaele).
- TDSD-6714 — Opeyemi-closed 14:48 WAT Apr 24, Samuel Amos reporter (reporter-surface expansion).
- TDSD-6720 — Opeyemi-direct-assigned 14:43 WAT (Blessing Olawale first routing-bypass, INITIAL REVIEW at tick time).
- TDSD-6721 — Opeyemi-closed 15:54 WAT Apr 24, Samson Anaele reporter, 1h01m filing-to-Resolved.

Opeyemi-cluster evidence: **7 closures/ownership + 1 in-flight Opeyemi-direct-assigned (TDSD-6720) + 1 cross-ticket CC-escalation + 1 fast-close-bypass** across **3 distinct reporter clusters** (Samson Anaele, Blessing Obioha/Olawale, Samuel Amos). Vs. **2 stalled assignees on 3 tickets**:
- [[Dominic Usiabulu]]: TDSD-6645 (since 04:08 WAT Apr 23, ticket-specific silence 102h08m) + TDSD-6684 (since 03:01 WAT Apr 23, ticket-specific silence 102h08m).
- [[Chinonyerem Alozie]]: TDSD-6637 (since 11:04 WAT Apr 20, ticket-specific silence 165h40m, INITIAL REVIEW Apr 17-vintage).

The dual-assignee stall pattern compounds the structural case for direct-ask-Opeyemi as the routing-bypass that has demonstrably fast-closed similar tickets across all three reporter clusters.

**Ownership — Apr 23 handoff context.** Assignee [[Dominic Usiabulu]] acknowledged at 16:53 WAT Apr 20 with "reviewing". **Apr 23 04:08 WAT: Dominic broke 59h15m silence** with: *"MIT|HYD|100004250509160823132420308489|1920873578377506816_CREDIT_0_RVSL was triggered by the inwards payments team, we will their review to understand why the reversal was triggered even though we have settled the merchant."* Status transitioned Awaiting Scheme Update → Escalated. Dominic's framing is handoff-to-awaits (await-their-review) rather than drive-to-closure.

**Counter-signal — Dominic end-of-day resolution burst Apr 23 23:25–23:32 WAT.** Four tickets closed: TDSD-6553, TDSD-6612, TDSD-6688, TDSD-6706. TDSD-6645 and TDSD-6684 were NOT in the resolution burst. The burst reframes workflow-discipline concern from "stall" to "backlog-processing-at-end-of-day with ticket-specific silence on TDSD-6645 + TDSD-6684."

**Pattern anomaly — comparable settlement tickets resolved same-day.** 7 Opeyemi-cluster closures + 1 cross-ticket CC-escalation + demonstrably faster close cadence + 1 in-flight Opeyemi-direct-assigned + 3 reporter clusters bypassing Dominic vs. dual-assignee stall (Dominic on 2 tickets / Chinonyerem on 1 ticket) is the assignee-variable evidence.

**SLA posture.** Time-to-first-response met. Time-to-resolution: breach 2026-05-01 16:52 WAT. Escalated status may reset SLA-resolution clock depending on Moniepoint policy — unverified.

**Adjacent context.**
- [[Merchant Settlement — Systemic Reconciliation Disparity]] (TDSD-6431, TDSD-6444, TDSD-6638) tracks pattern of Monnify settlement debit/CBA credit mismatches — distinct failure mode, same product family. **Note: Chinonyerem Alozie was the assignee silent 6+ days on TDSD-6431 (Apr 9–15) per that situation page. The TDSD-6637 stall observation continues that Chinonyerem silence pattern across distinct ticket families.**
- [[Monnify Atlas NIP — Disbursement Delay P1 Apr 14]] NIP disbursement separate.
- [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] retired Apr 24.

**No Immediate-tier dispatch this tick.** Apr 27 chase pattern is workflow-discipline accumulation, not emergent operational risk. Briefing-2026-04-27 06:09 WAT did NOT surface this track — carries to next briefing-tick decision queue. **Decision posture unchanged but evidence further saturates:** direct-ask Opeyemi for both TDSD-6645 + TDSD-6637 (as Chinonyerem-side parallel) + chase cadence on TDSD-6684 are the structurally indicated routing actions.

## Sources
jira [[TDSD-6645]] filed 16:52 WAT Apr 20 by Blessing Obioha; jira TDSD-6645 Dominic comment 04:08 WAT Apr 23 attribution-transfer + status Escalated; jira TDSD-6645 Blessing chase 11:20 WAT Apr 24 (3rd chase); jira TDSD-6268 High priority same transaction, Opeyemi assignee, Done 11:02 WAT Apr 24; jira TDSD-6684 Blessing chase 11:19 WAT Apr 24 with Opeyemi Ahmed CC; **jira TDSD-6684 Blessing chase 4 (chase 5 total) 08:46:25 WAT Apr 27 edited 08:55:31 to add Chinonyerem CC; Dominic ticket-specific silence 102h08m**; jira TDSD-6718 filed 13:30 WAT Apr 24 by Samson Anaele, Opeyemi Closed 13:37 WAT (7m); jira TDSD-6714 Closed 14:48 WAT Apr 24 by Opeyemi (Samuel Amos reporter); jira TDSD-6720 NEW 14:43 WAT Apr 24 (Blessing Olawale, Opeyemi direct-assigned); jira TDSD-6721 NEW 14:53 WAT Apr 24 (Samson Anaele, Opeyemi direct-assigned); jira TDSD-6721 Resolved 15:54 WAT Apr 24 by Opeyemi Ahmed (1h01m filing-to-Resolved, Samson-Anaele's second Opeyemi-direct close today); jira TDSD-6655/6661/6662 same-day Opeyemi closures; jira TDSD-6688/6553/6612/6706 Dominic resolution burst 23:25–23:32 WAT Apr 23; **jira TDSD-6637 (Apr 17-vintage Blessing Olawale → Chinonyerem Alozie INITIAL REVIEW): Chinonyerem comment 11:04 WAT Apr 20 "This is being reviewed"; Blessing Olawale chase 08:44 WAT Apr 27 breaking 165h40m Chinonyerem silence**.

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
- [2026-04-24 16:09 WAT — TDSD-6721 Resolved 15:54 WAT by Opeyemi Ahmed, seventh Opeyemi-cluster closure] — TDSD-6721 transitioned Awaiting Scheme Update → Resolved at 15:54:10 WAT by Opeyemi Ahmed. 1h01m filing-to-Resolved. Samson Anaele's second Opeyemi-direct close today (after TDSD-6718 7-min fast-close at 13:37 WAT). Opeyemi-cluster evidence stack 7 closures + 1 in-flight + 1 CC-escalation + 1 fast-close-bypass across 3 reporter clusters. Dominic side unchanged.
- [2026-04-27 09:09 WAT — Blessing-cluster chase pattern compounds; dual-assignee stall pattern emerges (Dominic + Chinonyerem)] — TDSD-6684 Blessing Obioha comment 08:46:25 WAT edited 08:55:31 to add Chinonyerem CC: "This is yet to be treated. Please finalize merchant initiated refund." 5th chase total (Apr 22 mediagroup, Apr 22 11:24 first @Dominic, Apr 23 03:01 Dominic "thiis is in progress" reply, Apr 23 10:57 chase 2, Apr 24 11:19 chase 3 with Opeyemi CC, Apr 27 08:46 chase 4 with Chinonyerem CC). Status unchanged In Progress/Blocker/Dominic-assigned. Dominic ticket-specific silence 03:01 WAT Apr 23 → 09:09 WAT Apr 27 = 102h08m. NEW addition to track: TDSD-6637 (Apr 17-vintage Blessing Olawale→Chinonyerem Alozie INITIAL REVIEW Medium, MNFY|11/12/69 unsettled). Blessing Olawale chase 08:44 WAT Apr 27 breaks 165h40m Chinonyerem silence (Chinonyerem's "This is being reviewed" comment was 11:04 WAT Apr 20). Adds [[Chinonyerem Alozie]] as second stalled-assignee. Dual-assignee stall pattern: Dominic 2 tickets (TDSD-6645, TDSD-6684) + Chinonyerem 1 ticket (TDSD-6637). Briefing-2026-04-27 06:09 WAT did NOT surface this track — carries forward. No Immediate dispatch — workflow-discipline accumulation, not emergent operational risk. Decision posture unchanged but further evidence-saturated: direct-ask Opeyemi for TDSD-6645 + TDSD-6637 administrative closure + chase cadence on TDSD-6684 is structurally indicated. Factors: source=jira, tdsd6684_blessing_chase_5_with_chinonyerem_cc_added, tdsd6684_dominic_silence_102h08m, tdsd6637_blessing_olawale_chase_break_chinonyerem_silence_165h40m, tdsd6637_initial_review_apr17_vintage_first_apr27_surface, dual_assignee_stall_pattern_dominic_plus_chinonyerem, opeyemi_cluster_velocity_unchanged, decision_posture_direct_ask_opeyemi_evidence_saturated, no_immediate_dispatch.
