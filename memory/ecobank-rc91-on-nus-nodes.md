---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "12:10 WAT Apr 29 full-tick: Slack closure post discovered — Qazim auto-recovered, Start 8:45 / End 8:55 / Duration 10 min. Tension with email thread Qazim 10:48 WAT 'still failing intermittently'. Likely: 8:55 WAT initial fast-cycle auto-recovery → re-cycle → bilateral email escalation. Cycle final state ambiguous; Mayowa silent since 10:12 WAT, Tier 1 Slack silent since closure post. Compound stack still 3 layers (route this cycle, settlements re-cycle TDSD-6767 status not in Layer A this tick, user-creation 3-week ~120h silent)."
updated: "2026-04-30T17:24:42Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Ecobank]] RC91 failures on NUS nodes is in active recurrence. Route layer cycles + settlements layer cycles + portal layer + user-creation layer have alternated open across the past two weeks; today brings another route-layer reopen.

**Current state (18:10 WAT Apr 30 pre-overnight full-tick) — NEW route-layer RC91 cycle active 3h20m, Immediate-tier.** [[Olamide Ajibulu]] Slack P1 post 14:59 WAT in #teamapt-tech-operations: "EcoBank RC 91 failures, Start Time 2:50PM, Ongoing, From the bank, escalated to the bank for investigation and resolution." Concurrent email thread `19ddeacc63298826` (subject `Ecobank | RC91 | 20260430`) Olamide → CUMECHIKELU/DCHUKWUJI/OLOGUNSANYA/MADEWUYI/OSOGA@ecobank.com 14:55 WAT: "Please be informed that transactions are failing with RC91. Kindly assist to review." 3h20m active at this tick — **exceeds Immediate trigger #2 (>2h) by 1h20m**. **No TDSD filed yet** — single-track-Slack-only regression pattern (matches FCMB B1 + Polaris afternoon cycle this tick). Bank-side silent on both Slack and email since 14:59 WAT. Bank-side-next-mover.

**Bilateral confusion precursor (Apr 23 thread reopened today).** [[Adewuyi Mayowa]] reopened email thread `19dddb2d518cd8f3` (subject `Ecobank | RC91 | 20260423`) at 13:27 WAT today with: *"@Olamide Ajibulu, Transactions are not getting to our system, can you please check and revert."* This is a bank-side complaint that the reverse direction (Moniepoint → Ecobank) is failing — distinct from the TeamApt-side RC91 (Ecobank route returning RC91 to switch). The exchange precedes Olamide's 14:50 WAT cycle filing by ~1h23m and may be the upstream precursor: bank-side observed traffic interruption first, TeamApt-side detected outbound RC91 shortly after. Mayowa's posture is request-for-recheck (consistent with Apr 29 cycle where Mayowa moved away from "everything looks fine" attribution-mismatch claims) — NOT a 4th attribution-mismatch claim. The Mayowa pattern continues to hold: 3 prior cycles' attribution-mismatch behavior has not extended past Apr 23 closure.

**Eco Settlements TDSD-6767 CLOSED today.** Per briefing-2026-04-30 B8: [[TDSD-6767]] "Eco | Settlements issue | 20260428" Completed at 04:56 WAT Apr 30 by [[Feyisayo Oyeniran]]. Filing 23:49 WAT Apr 28 → close ~29h. Exceeds the Keystone-pattern ~9h cadence by ~20h — settlements layer slower than predicted. Compound stack delta this cycle: settlements layer CLOSED, route layer REOPENED.

**Compound failure stack (current — 2 open layers):**
1. **Route layer (this cycle)** — Slack 14:59 WAT, email 14:55 WAT, no TDSD, 3h20m active. ACTIVE.
2. **User-creation 3-week thread** `19dbf704dc7edb8a` — silent ~144h since 2026-04-24 13:21 WAT initial filing (no engagement signal across 6+ days of ticks).

**Pre-overnight handoff context.** This cycle enters the 12h overnight delegation window (18:00–06:00 WAT) with no internal recovery scheduled. Combined with concurrent Polaris RC91 cycle (active 2h22m, see [[Sterling + Polaris — Routes Degraded]]) and FCMB B1 cycle 2 silent 17h30m+, three issuer-route P1s simultaneously enter overnight in active or ambiguous-active state. Concentration risk at handover.

**Watchpoints:**
1. **Cycle resolution overnight** — bank-side fast-cycle envelope is 10m–2h27m for Ecobank RC91 (Apr 29 cycle was 10m initial fast-recovery + bilateral re-cycle). 3h20m exceeds typical window — escalation candidate if not resolved by 06:00 WAT.
2. **TDSD filing during overnight** — if no TDSD filed by 06:00 WAT briefing tick, single-track-Slack-only regression streak extends.
3. **Mayowa thread engagement** — does the bank-side complaint resolve in tandem with the TeamApt-side RC91 (suggesting bidirectional connectivity issue) or remain separate threads?
4. **User-creation thread 144h silent** — briefing-tier escalation candidate at next briefing tick.

## Sources
Gmail Afeez 2026-04-17 12:01 WAT; Slack Adewuyi Mayowa 2026-04-17 12:15 WAT; Gmail Afeez → Ecobank 2026-04-18 16:09 WAT (thread 19da12452e0edb2e); Jira TDSD-6619 2026-04-18 20:17 WAT; Gmail Daniel Armstrong 2026-04-19 15:01 WAT (thread 19da60c7ea537e24); Gmail Daniel 2026-04-23 06:35 WAT (cycle-A thread 19db8d64f00a406d); Slack #teamapt-tech-operations 2026-04-23 09:38 WAT (cycle-A P1); Gmail Adewuyi Mayowa 2026-04-23 10:19 WAT; Gmail Olamide Ajibulu 2026-04-23 14:38 WAT (cycle-B thread 19dbac740631c4f9); Gmail Qazim 2026-04-23 21:33 WAT (portal inaccessibility thread 19dbc43766215aeb); Jira TDSD-6711 filed 2026-04-23 22:32 WAT, Completed 2026-04-25 08:13 WAT; Gmail 2026-04-24 13:21 WAT thread 19dbf704dc7edb8a (3-week user-creation escalation); Gmail 2026-04-24 16:07 WAT thread 19dc0083cbfa1990 (Afeez → Olamide intraday duty handover); Jira TDSD-6711 closure comment 2026-04-25 08:13 WAT; Jira TDSD-6735 filed 2026-04-26 15:59:43 WAT (Daniel Armstrong reporter, Feyisayo Oyeniran assignee, INITIAL REVIEW), transitioned Completed 16:13:48 WAT Apr 28 by Feyisayo (47h54m total); Jira TDSD-6704 transitioned Completed 17:42:56 WAT Apr 28 by Qazim Adedigba (~5d total); Jira TDSD-6767 "Eco | Settlements issue | 20260428" filed 23:49 WAT Apr 28 by Daniel Armstrong (assignee Feyisayo Oyeniran); Slack Qazim Adedigba structured P1 post 08:49 WAT Apr 29 (Start 08:45 WAT); Jira TDSD-6776 filed 09:19:01 WAT Apr 29 by Qazim (reporter+assignee); Gmail thread 19dd85938244db0e Apr 29 — Qazim → bank 09:25 WAT, Mayowa reply 10:12 WAT "Kindly reconfirm now", Qazim 10:48 WAT "Transactions are still failing intermittently"; Slack #teamapt-tech-operations 2nd Qazim post — closure 8:55 WAT Apr 29 10-min auto-recovery; **Jira [[TDSD-6767]] "Eco | Settlements issue | 20260428" Completed at 04:56 WAT Apr 30 by [[Feyisayo Oyeniran]] — 29h ticket lifetime, exceeds Keystone-pattern ~9h cadence (briefing-2026-04-30 B8 captured); Gmail thread `19dddb2d518cd8f3` (Apr 23 cycle thread) reopened 13:27 WAT Apr 30 by [[Adewuyi Mayowa]] — "transactions are not getting to our system, can you please check and revert" (bank-side complaint, ~1h23m precursor to TeamApt-side cycle); Slack #teamapt-tech-operations [[Olamide Ajibulu]] structured P1 post 14:59 WAT Apr 30 — "EcoBank RC 91 failures, Start Time 2:50PM, Ongoing, Identified Cause: From the bank, Resolution Action: escalated to the bank for investigation and resolution"; Gmail thread `19ddeacc63298826` (subject `Ecobank | RC91 | 20260430`) Olamide → bank 14:55 WAT — "transactions are failing with RC91. Kindly assist to review."; no TDSD filed for this cycle as of 18:10 WAT tick.**

## Deltas
- [2026-04-17 12:01 WAT] — Reopened via Afeez email with CSV sample.
- [2026-04-17 12:15 WAT] — Mayowa pushback: "Everything looks fine." Attribution contested.
- [2026-04-18 16:09 WAT] — Direct-to-bank escalation thread 19da12452e0edb2e.
- [2026-04-18 20:17 WAT] — TDSD-6619 ticket filing.
- [2026-04-19 15:01 WAT] — Daniel Armstrong fresh thread 19da60c7ea537e24.
- [2026-04-23] — Compound failure day: Cycle A morning + Cycle B afternoon + portal inaccessibility (TDSD-6711).
- [2026-04-24 13:21 WAT] — Third DCIR-portal failure mode layer: user-creation 3-week persistent escalation.
- [2026-04-24 16:09 WAT] — Transaction-routing layer implicit recovery per intraday Duty Handover.
- [2026-04-25 09:10 WAT] — Portal-access layer CLOSED. TDSD-6711 → Completed 08:13 WAT.
- [2026-04-26 16:10 WAT] — FOURTH operational layer: settlements. TDSD-6735 filed.
- [2026-04-28 17:09 WAT] — TWO ticket closures (TDSD-6735 + TDSD-6704). Compound stack 2 → 1.
- [2026-04-28 23:49 WAT] — TDSD-6767 settlements re-cycle filed.
- [2026-04-29 09:09 WAT] — TRANSACTION-ROUTING LAYER REOPENS. Qazim Slack P1 08:49 WAT (Start 08:45 WAT).
- [2026-04-29 10:09 WAT] — TDSD-6776 filed 09:19 WAT. Compound stack 3 layers.
- [2026-04-29 11:12 WAT] — Trigger #2 crossed at 10:45 WAT. Bilateral fully open.
- [2026-04-29 12:10 WAT] — SLACK CLOSURE POST DISCOVERED. Qazim auto-recovered 10-min cycle (8:45–8:55 WAT). Cycle final state ambiguous.
- **[2026-04-30 06:10 WAT briefing tick] — Eco Settlements TDSD-6767 Completed 04:56 WAT (29h close, exceeds Keystone-pattern). Captured briefing B8.**
- **[2026-04-30 18:10 WAT pre-overnight full-tick] — NEW route-layer RC91 cycle ACTIVE 3h20m. Olamide Slack 14:59 WAT (Start 14:50 WAT) + email 14:55 WAT thread `19ddeacc63298826`. Exceeds Immediate trigger #2 (>2h) by 1h20m. No TDSD filed. Mayowa reopened Apr 23 thread `19dddb2d518cd8f3` 13:27 WAT today with bank-side complaint "transactions are not getting to our system" — ~1h23m precursor signal pre-cycle filing; request-for-recheck posture (NOT 4th attribution-mismatch claim). Compound stack now 2 open layers: route this cycle + user-creation 3-week (~144h silent). Pre-overnight handoff with three concurrent issuer-route P1s (this + Polaris + FCMB cycle 2 silent). Immediate dispatched paired with Polaris via Slack DM 18:11 WAT. Factors: source=slack+email, channel=C0ABU8GMW75, keyword_floor=RC91+Ecobank, immediate_trigger_2_exceeded_1h20m, single_track_jira_regression, mayowa_bank_side_precursor_complaint_1h23m_pre_filing, mayowa_request_for_recheck_posture_no_attribution_mismatch_4th, three_concurrent_issuer_route_p1s_pre_overnight, accountability_alignment_high, pattern_significance_recurring_route_layer_reopen, cto_specificity_medium.]
