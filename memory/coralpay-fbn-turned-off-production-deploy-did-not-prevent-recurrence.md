---
role: cto-teamapt
type:
  - "situation"
title: CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence
status: developing
created: "2026-04-11T16:43:52Z"
summary: "CoralPay (ZIB) RC91 cycle 4 RESOLVED via TDSD-6751 Completed 23:44 WAT Apr 27 — overturns earlier \"no TDSD, 4 consecutive Slack-only filings\" framing (process-gap pattern was 3 cycles, not 4). Cycle 4 filed by Afeez Kazeem, escalated to CoralPay, closed by 23:44 WAT (~7h40m end-to-end). Recurrence trajectory now: 1h53m → 18h44m → 38h+ silent → ~7h40m. Apr 28 10:09 WAT full-tick: Jira auth recovered after 16h17m blind window (briefing-2026-04-28 B3 invalidated by recovery). No new ZIB cycle since Apr 27 16:04 WAT — current ZIB silence 18h+ post-cycle-4-close."
updated: "2026-04-28T09:19:48Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

**Current state (10:09 WAT Apr 28 full-tick):** [[CoralPay]] suite three-bank turned-off disposition (FBN, PVB, SBP) unchanged. **Cycle 4 RESOLVED.** [[Afeez Kazeem]] structured P1 in #teamapt-tech-operations 16:09 WAT Apr 27 (Start 16:04 WAT, "From the bank") was filed as [[TDSD-6751]] "Zenith Bank(Coralpay) INTERMITTENT RC91" by Afeez Kazeem and **Completed at 23:44 WAT Apr 27 (~7h40m end-to-end)** — discovered this tick after Jira MCP auth recovery (briefing-2026-04-28 B3 was based on 16h17m Jira blind window from 17:09 WAT Apr 27). The earlier "no TDSD ticket — 4 consecutive Slack-only cycles" framing in the Apr 27 16:09 WAT entry is therefore **partially incorrect**: TDSD-6751 was filed for cycle 4, just not visible until Jira auth was restored. Process-gap pattern is **3 consecutive Slack-only cycles** (Apr 23, Apr 25 → TDSD-6728 actually filed, Apr 26 silent), not 4 — TDSD-6751 closes the gap on cycle 4.

**Recurrence trajectory now (5 cycles):**
- Apr 23 20:16 WAT: 1h53m (bank-resolved by 22:09 WAT tick observation, Slack-only)
- Apr 25 01:04 → 19:48 WAT: 18h44m end-to-end via [[TDSD-6728]] (workaround = [[CoralPay_Cashout]] failover; permanent-fix manual; Completed 02:13 WAT Apr 26)
- Apr 26 02:01 WAT: 38h+ silent OR ongoing, **no TDSD ticket** — implicitly silent-resolved before cycle 4 (under fresh-Start-Time framing)
- Apr 27 16:04 WAT → cycle 4 active ~5min at 16:09 WAT dispatch
- **Apr 27 23:44 WAT — cycle 4 CLOSED via TDSD-6751 Completed (~7h40m end-to-end, Afeez Kazeem closed)**

Cycle 4 closed within the same single-track-Jira pattern (Afeez filed and closed). No bank-side closure narrative captured at this tick — TDSD-6751 status `Completed` is the only resolution signal.

**Apr 27 16:09 → Apr 28 10:09 = 18h+ ZIB silence post-cycle-4-close.** No new cycle 5 surface in this 18h window. Recurrence cadence has been ~38h between cycles 2→3 and ~38h between cycles 3→4; 18h+ post-close is well within that envelope, not yet a trajectory break.

**Concurrent-track context (briefing-2026-04-28 framing):** [[Wema Bank — RC91 P1 Apr 17]] route turned off (5-bank concentration: Wema + Polaris + First Bank + Providus + Sterling), [[Stanbic Bank ATS — Persistent RC91 Pattern]] active P1 4h30m+ at 09:30 WAT briefing tick (Olamide Ajibulu Slack 06:11 WAT, bilateral Peace Ikhuenbor 04:34 WAT), [[Access Bank — Multi-Track Failures]] DD track silent 47h+ since TDSD-6731 filing. Three concurrent unresolved bank-integration tracks plus this resolved ZIB cycle 4. **CoralPay ZIB is currently the most stable bank in the brain's tracked operational concentration** — 18h+ post-cycle-4-close with no new RC91 signal.

Originator thread: FBN turned off Apr 11 after [[TDSD-6047]] ([[CoralPay]] service) deployed to production at 18:45 WAT Apr 10 but RC91 recurred overnight (new P1 02:12 WAT Apr 11; ZIB/PVB recovered 34 min, FBN still failing at 02:47 WAT and subsequently turned off per Duty Handover #20260411). The production deploy did NOT prevent recurrence.

**Scope timeline:**
- Apr 11 — FBN turned off.
- Apr 17 00:19 WAT — Duty Handover 20260416 records ZIB, FBN, PVB all turned off per business decision. Routes operational: 13/17 (down from 16/17).
- Apr 18 — Duty Handover 20260418: SBP formally reclassified into the CoralPay suite. Four banks now in CoralPay suite-off (ZIB, FBN, PVB, SBP).
- Apr 23 17:29 WAT — Qazim hourly report lists only FBN/PVB/SBP as turned off. ZIB implicitly re-enabled.
- Apr 23 20:16 WAT — NEW CoralPay (ZIB) RC91 P1 filed by Qazim. 1h53m active at 22:09 WAT tick.
- Apr 25 01:04 → 19:48 WAT — Switch-layer interchange-state incident on ZIB rail (TDSD-6728, 18h44m end-to-end / 6h44m downtime). Workaround: failover to CoralPay_Cashout. **Completed 02:13 WAT Apr 26**.
- Apr 26 02:01 WAT → 38h+ silent — NEW CoralPay (ZIB) RC91 P1 (Qazim Slack), **no TDSD ticket**, implicitly silent-resolved before cycle 4.
- Apr 27 16:04 WAT → cycle 4 NEW (Afeez Kazeem structured P1, "From the bank", escalated to CoralPay).
- **Apr 27 23:44 WAT → cycle 4 CLOSED via TDSD-6751 (Completed by Afeez Kazeem, ~7h40m end-to-end)**.

**Recurrence trajectory now well-established:** 1h53m → 18h44m → 38h+ silent → ~7h40m. Each cycle's duration is independent of the prior; the recurrence cadence (every ~2 days) and the structural workaround (CoralPay_Cashout failover) are the persistent patterns. Per [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]] synthesis: ZIB is the residual exposure on the CoralPay suite — FBN/PVB/SBP are off, ZIB is the only operational rail and carries the full recurrence risk. The 4-cycle process-gap framing was an artifact of Jira blind window — actual process-gap is 3 cycles (Apr 23, Apr 26 silent, plus Apr 25 was filed as TDSD-6728).

## Sources
slack #teamapt-tech-operations 01:24, 06:53, 06:55 WAT Apr 10; jira TDSD-6448, TDSD-6047; drive DD Production Issues notes Apr 9; email Duty Handover #20260411 (Apr 11); email Duty Handover Note 20260415 (00:06 WAT Apr 16); email Duty Handover Note 20260416 (00:19 WAT Apr 17, [[Qazim Adedigba]]); email Duty Handover Note 20260418 (Apr 18, SBP reclassification); email Qazim Hourly Reports 20260423 17:29 WAT; slack #teamapt-tech-operations 2026-04-23 20:30 WAT (Qazim ZIB RC91 P1 post, Start 20:16 WAT); jira TDSD-6728 Created 2026-04-25 (Switch component, 18h44m end-to-end / 6h44m downtime, workaround = CoralPay_Cashout failover, manual fix = alternate-key + CoralPay key reselect, Completed/Done 02:13 WAT Apr 26); email thread 19dc376af908d69d 2026-04-25 08:06 WAT (Qazim → Afeez Duty Handover Note 20260425); slack #teamapt-tech-operations Qazim 02:01 WAT Apr 26 — CoralPay (ZIB) RC91 P1 cycle 3 Ongoing (38h+ silent, no TDSD); briefing-2026-04-26 D1+A1; briefing-2026-04-27 B3 (cycle 3 silence framing); slack #teamapt-tech-operations Afeez Kazeem 16:09:32 WAT Apr 27 — CoralPay (ZIB) RC91 P1 cycle 4 Start 16:04 WAT, "From the bank"; **jira [[TDSD-6751]] "Zenith Bank(Coralpay) INTERMITTENT RC91" filed and Completed 23:44 WAT Apr 27 by Afeez Kazeem (~7h40m end-to-end); discovered 10:09 WAT Apr 28 full-tick after Jira MCP auth recovery; briefing-2026-04-28 B3 (Jira auth-failure decision item) invalidated by this discovery.**

## Deltas
- 2026-04-10 07:00 WAT — New P1: CoralPay VPN Tunnel Downtime at 06:42 WAT, resolved 06:51 WAT (9 min). DD Production Issues meeting confirmed zero CoralPay/TDSD-6448 discussion.
- 2026-04-10 19:09 WAT — TDSD-6047 "DEPLOY CORALPAY SERVICE TO PRODUCTION" marked Done at 18:45 WAT by [[Ekene Udodi]]. Relationship to ACS connector replacement unconfirmed.
- 2026-04-11 03:10 WAT — New RC91 P1 at 02:12 WAT: CoralPay Bank (ZIB, FBN, PVB). ZIB/PVB recovered 34 min. FBN still failing.
- 2026-04-11 05:12 WAT — FBN no resolution signal. 2h25min since partial resolution.
- [2026-04-17 00:19 WAT] — Duty Handover Note 20260416 (Qazim Adedigba): CoralPay (ZIB, FBN, PVB) all turned off per business decision. 13/17 PTSAs operational.
- [2026-04-18 10:29 WAT] — SBP reclassification. Duty Handover Note 20260418 formally moves SBP into CoralPay suite. Four banks now in CoralPay suite-off (ZIB, FBN, PVB, SBP).
- [2026-04-22 earlier ticks] — CoralPay FBN RC91 filed 05:09 WAT Apr 22 was among the P1 batch surfaced as briefing-2026-04-22 B1.
- [2026-04-23 22:09 WAT] — TWO observations: ZIB re-enabled AND new ZIB RC91 P1 active 1h53m. Immediate dispatched.
- [2026-04-25 09:10 WAT] — NEW switch-layer failure-mode signal: TDSD-6728 interchange state Stopped. 18h44m end-to-end / 6h44m downtime.
- [2026-04-26 06:10 WAT — RECURRENCE within ~6h of TDSD-6728 closure: NEW CoralPay (ZIB) RC91 P1 Ongoing, 4h09m active, no TDSD] — Combined Immediate-tier Slack DM dispatched.
- [2026-04-26 07:10 → 22:17 WAT skim-ticks — ZIB cycle silence extends 5h09m+ → 12h+ → 20h16m+ post-filing; no TDSD ticket created; ops-cycle reporting failure structurally proven by byte-identical 07:50 WAT hourly resend].
- [2026-04-27 16:09 WAT — CYCLE 4 NEW: Afeez Kazeem structured P1, Start Time 16:04 WAT, "From the bank", escalated to CoralPay, Active ~5min at dispatch. 4th ZIB cycle in 5 days post-TDSD-6728 closure. Recurrence within 38h of last close. Within-tick observation (later corrected by Apr 28 Jira recovery): NO TDSD ticket visible — actually TDSD-6751 was filed at this same time but Jira MCP returned no Layer A deltas pre-auth-failure. Immediate-tier dispatched via slack_send_message_draft to user DM.]
- **[2026-04-28 10:09 WAT — CYCLE 4 RESOLVED via TDSD-6751 (discovered post-Jira-auth-recovery): "Zenith Bank(Coralpay) INTERMITTENT RC91" Medium, Afeez Kazeem (reporter+assignee), Completed 23:44 WAT Apr 27 (~7h40m end-to-end). 18h+ post-close ZIB silence at this tick. The Apr 27 17:09 WAT framing of "no TDSD, 4 consecutive Slack-only cycles" was an artifact of Jira blind window starting 17:09 WAT — TDSD-6751 was filed during the blind window. Process-gap pattern is **3 consecutive Slack-only cycles** (Apr 23 cycle 1, Apr 26 cycle 3, Apr 25 cycle 2 was filed via TDSD-6728), not 4. Briefing-2026-04-28 B3 (Jira auth-failure Decision item) is invalidated by this auth recovery — disposition recommendation should shift from "re-authenticate now" to "auth already recovered, no action needed". Recurrence trajectory updated: 1h53m → 18h44m → 38h+ silent → ~7h40m. No new cycle 5 surface in 18h+ post-close window — within typical ~38h recurrence cadence envelope. Concurrent context: Stanbic active P1 4h30m+ (briefing-2026-04-28 B1), Wema bilateral standoff carryforward (B2), 5-bank route-off concentration (Wema + Polaris + FBN + Providus + Sterling). CoralPay ZIB is currently the most stable bank in the operational concentration. Factors: source=jira, layer_a_post_auth_recovery, active_situation_match=coralpay-zib, tdsd_6751_filed_and_closed_during_blind_window, framing_correction_4_to_3_slack_only_cycles, briefing_apr28_b3_invalidated_by_auth_recovery, no_immediate_dispatch_resolution_already_complete, accountability_alignment_high, pattern_significance_recurrence_cadence_intact]**
