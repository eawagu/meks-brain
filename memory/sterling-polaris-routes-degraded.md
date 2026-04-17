---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: "Sterling OFF Day 7+; Polaris morning P1 silent 8h30m since 11:39 filing; second-cycle-of-day Polaris P1 filed 18:16 WAT, 1h53m active at tick — no re-dispatch (calibration holds)."
updated: "2026-04-17T20:03:16Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Two issuer routes remain degraded. [[Sterling Bank]] has been OFF on settlement for Day 7+ with no resolution signal. [[Polaris Bank]] produced two P1 cycles today: the 11:26 WAT morning cycle (filed 11:39 WAT by Olamide Ajibulu) is still silent 8h30m after filing, and a fresh second cycle filed 18:16 WAT (start time 18:16 WAT, ongoing at filing) is now 1h53m active at the 20:09 WAT tick. Second Polaris cycle in a single day is new behavior for this page — previously a stable entity-level concern, now showing intra-day recurrence.

Status remains `developing`. The Polaris double-cycle co-occurs with [[NIBSS PTSA — Intermittent RC91 Apr 17]] (active 11h+), [[Wema Bank — RC91 P1 Apr 17]] (active 12h+, silent 12h+), cycle 27 on [[Stanbic Bank ATS — Persistent RC91 Pattern]] (new 18:05 WAT filing, 2h04m active), new [[UBA Bank — RC91 P1 Apr 17]] (18:45 WAT filing), and reopened [[Ecobank — RC91 on NUS Nodes]] with Adewuyi Mayowa contesting attribution at 12:15 WAT. Cross-route concurrence has intensified through the evening window — three new P1 filings (Stanbic, Polaris second cycle, UBA) landed within 40 minutes (18:05–18:45 WAT). No confirmed common cause.

## Sources
Slack #teamapt-tech-operations 2026-04-17 11:39 WAT (Polaris P1 filing #1); Slack #teamapt-tech-operations 2026-04-17 18:16 WAT (Polaris P1 filing #2, Olamide Ajibulu); aggregated Sterling-OFF signal over the prior 7 days

## Deltas
- [2026-04-17 11:39 WAT] — Polaris Bank RC91 P1 filed. Start 11:26 WAT, ongoing at filing. Escalated to partner. Distinct failure mode from Sterling settlement OFF.
- [2026-04-17 13:09 WAT] — Polaris P1 silent 1h30m since 11:39 WAT filing. No thread updates, no resolution signal. Trigger: absence-of-signal on active P1. Fresh dispatch to user DM. Factors: urgency 0.85 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.85 · accountability_alignment 1.0.
- [2026-04-17 14:09 WAT] — Polaris P1 silent 2h31m since filing, active 2h44m total. Crosses Immediate #2 threshold (P1 >2h unresolved). No thread updates, no resolution signal — Slack/keyword sweeps zero in this window. Dispatch consolidated with NIBSS in one user DM. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 15:09 WAT] — Polaris P1 silent 3h30m since filing, active 3h43m total. Third consecutive silent tick past Immediate #2 threshold. Search confirms zero new Polaris thread activity today beyond the filing. Dispatch consolidated with Wema (new miss) + NIBSS in one user DM. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 16:09 WAT] — Polaris P1 silent 4h30m since filing, active 4h43m total. 4th consecutive silent tick past Immediate #2 threshold. Tier 1 channel-read sweep zero new parent messages; keyword searches zero in-scope results. No Immediate re-dispatched — 15:09 WAT consolidated dispatch is the authoritative alert and nothing new has emerged. Aging will be folded into briefing-2026-04-18. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 20:09 WAT] — **New Polaris second cycle of day:** RC91 P1 filed 18:16 WAT by Olamide Ajibulu. Start 18:16 WAT, active 1h53m at tick time, approaching Immediate #2 threshold. Morning cycle #1 still silent 8h30m since 11:39 WAT filing — crosses into overnight window with no resolution signal. Double-cycle on same route same day is new pattern behavior. Sterling settlement remains OFF Day 7 (tomorrow Day 8). No Immediate re-dispatch — calibration precedent from 16:30 triage holds (all recurring RC91 P1s noted as expected). Previous-tick gap: 18:09 WAT tick rate-limited on C0ABU8GMW75 missed filing #2; this tick caught it. Factors: urgency 0.9 · impact_scope 0.75 · cto_specificity 0.8 · pattern_significance 1.0 · accountability_alignment 1.0.
- Sterling settlement remains OFF Day 7+ — no resolution signal in the evening tick window.
