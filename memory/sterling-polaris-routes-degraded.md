---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: "Polaris Apr 23 evening cycle (Start 16:49 WAT) 5h20m active at 22:09 WAT tick with no Jira ticket filed — Immediate #2 threshold exceeded. Concurrent with CoralPay ZIB new P1, Wema TDSD-6705 closed 18:45 WAT, Access 11m fast-cycle. DM draft dispatched. Going into overnight handoff active-unresolved."
updated: "2026-04-23T21:16:22Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Two issuer routes remain degraded. [[Sterling Bank]] is now formally part of the [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] suite (SBP reclassification Apr 18). [[Polaris Bank]] has produced recurring RC91 P1 cycles; the Apr 23 evening cycle (Start 16:49 WAT) is **5h20m active at the 22:09 WAT tick with no Jira ticket found in the 15:11→22:09 WAT delta** — Immediate #2 threshold (P1 >2h unresolved) exceeded. This is the 3rd recurring Polaris active-cycle observation (Apr 17 morning cycle, Apr 17 evening second-cycle, Apr 23 evening cycle).

Status remains `developing`. Polaris and CoralPay ZIB are the two active RC91 P1s at overnight handoff (22:09 WAT). Wema RC91/22 (Start 16:44 WAT) closed via TDSD-6705 Completed 18:45 WAT; Access brief RC91 (16:47 WAT) bank-auto-recovered in 11 minutes — neither is active going into overnight.

## Sources
Slack #teamapt-tech-operations 2026-04-17 11:39 WAT (Polaris P1 filing #1); Slack #teamapt-tech-operations 2026-04-17 18:16 WAT (Polaris P1 filing #2, Olamide Ajibulu); Slack #teamapt-tech-operations 2026-04-23 16:59 WAT (Qazim Adedigba Polaris RC91 incident post, Start 16:49 WAT); email 2026-04-23 19:26 WAT TEAMAPT Monitoring Service Alert (TFR 40.13% > 20% threshold); aggregated Sterling-OFF signal over the prior 14 days (now CoralPay suite reclassification)

## Deltas
- [2026-04-17 11:39 WAT] — Polaris Bank RC91 P1 filed. Start 11:26 WAT, ongoing at filing. Escalated to partner. Distinct failure mode from Sterling settlement OFF.
- [2026-04-17 13:09 WAT] — Polaris P1 silent 1h30m since 11:39 WAT filing. No thread updates, no resolution signal. Trigger: absence-of-signal on active P1. Fresh dispatch to user DM. Factors: urgency 0.85 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.85 · accountability_alignment 1.0.
- [2026-04-17 14:09 WAT] — Polaris P1 silent 2h31m since filing, active 2h44m total. Crosses Immediate #2 threshold (P1 >2h unresolved). No thread updates, no resolution signal — Slack/keyword sweeps zero in this window. Dispatch consolidated with NIBSS in one user DM. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 15:09 WAT] — Polaris P1 silent 3h30m since filing, active 3h43m total. Third consecutive silent tick past Immediate #2 threshold. Search confirms zero new Polaris thread activity today beyond the filing. Dispatch consolidated with Wema (new miss) + NIBSS in one user DM. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 16:09 WAT] — Polaris P1 silent 4h30m since filing, active 4h43m total. 4th consecutive silent tick past Immediate #2 threshold. No Immediate re-dispatched. Aging will be folded into briefing-2026-04-18. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 20:09 WAT] — Polaris second cycle of day filed 18:16 WAT, 1h53m active at tick. Morning cycle #1 silent 8h30m since 11:39 WAT filing. Double-cycle on same route same day is new pattern behavior. No Immediate re-dispatch — calibration holds. Factors: urgency 0.9 · impact_scope 0.75 · cto_specificity 0.8 · pattern_significance 1.0 · accountability_alignment 1.0.
- [2026-04-23 22:09 WAT] — **NEW Polaris RC91 P1 active 5h20m at tick.** Qazim Adedigba incident post in #teamapt-tech-operations at 16:59 WAT: "Product: ATS, Incident Summary: P1: Polaris Bank RC 91 Failures Across Processors, Start Time: 4:49 PM [16:49 WAT], End Time: Ongoing, Resolution Action: will be escalated to bank for resolution." Zero Jira tickets found for Polaris in the 15:11→22:09 WAT delta — no TDSD filed in 5h20m, only the Qazim Slack post. Immediate #2 threshold (P1 >2h unresolved) crossed at 18:49 WAT; by 22:09 WAT active 5h20m. Concurrent with (a) Wema RC91/22 same-window filing that resolved via TDSD-6705 at 18:45 WAT (2h cycle), (b) Access brief RC91 11min fast-cycle at 16:47 WAT, (c) CoralPay ZIB RC91 Start 20:16 WAT new P1 1h53m active (see [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]]), (d) TFR email alert 19:26 WAT 40.13% > 20% threshold. This was NOT caught at 16:11 WAT tick (tick timing predates the 16:44 WAT Qazim post cluster); skim-tick at 22:09 WAT caught the full window. Immediate DM draft dispatched at 22:09 WAT consolidating Polaris + CoralPay ZIB. **Going into overnight handoff (23:00 WAT): Polaris active-unresolved, bank-escalated, no closure signal.** Factors: urgency 0.95 · impact_scope 0.75 · cto_specificity 0.7 · pattern_significance 0.9 (3rd recurring active-cycle observation) · accountability_alignment 1.0.
- Sterling settlement — formally reclassified into [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] suite Apr 18. Sterling-specific tracking moved there.
