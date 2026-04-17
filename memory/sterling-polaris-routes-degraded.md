---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: "Sterling OFF Day 7+ on settlement; Polaris RC91 P1 silent 4h30m since 11:39 WAT filing, 4th consecutive silent tick post-threshold — holding post-15:09 consolidated dispatch."
updated: "2026-04-17T15:15:46Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Two issuer routes remain degraded. [[Sterling Bank]] has been OFF on settlement for Day 7+ with no resolution signal. [[Polaris Bank]] had been stable on this page until today — at 11:26 WAT Apr 17, a new RC91 P1 started; filed in #teamapt-tech-operations at 11:39 WAT and escalated to the partner. This is a distinct failure mode from Sterling's settlement OFF state — same-entity-class, different mechanism.

Status remains `developing` for the Polaris P1. The Polaris event co-occurs with [[NIBSS PTSA — Intermittent RC91 Apr 17]] (active 6h40m+), a previously-missed [[Wema Bank — RC91 P1 Apr 17]] (8:49 WAT start, 7h20m active, first caught at the 15:09 WAT tick), reopened [[Ecobank — RC91 on NUS Nodes]] with Adewuyi Mayowa contesting attribution at 12:15 WAT, and cycle 26 on [[Stanbic Bank ATS — Persistent RC91 Pattern]]. Cross-route concurrence continues across the noon and afternoon windows and extends back to 08:49 WAT (Wema).

## Sources
Slack #teamapt-tech-operations 2026-04-17 11:39 WAT (Polaris P1 filing); aggregated Sterling-OFF signal over the prior 7 days

## Deltas
- [2026-04-17 11:39 WAT] — Polaris Bank RC91 P1 filed. Start 11:26 WAT, ongoing at filing. Escalated to partner. Distinct failure mode from Sterling settlement OFF.
- [2026-04-17 13:09 WAT] — Polaris P1 silent 1h30m since 11:39 WAT filing. No thread updates, no resolution signal. Trigger: absence-of-signal on active P1. Fresh dispatch to user DM. Factors: urgency 0.85 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.85 · accountability_alignment 1.0.
- [2026-04-17 14:09 WAT] — Polaris P1 silent 2h31m since filing, active 2h44m total. Crosses Immediate #2 threshold (P1 >2h unresolved). No thread updates, no resolution signal — Slack/keyword sweeps zero in this window. Dispatch consolidated with NIBSS in one user DM. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 15:09 WAT] — Polaris P1 silent 3h30m since filing, active 3h43m total. Third consecutive silent tick past Immediate #2 threshold. Search confirms zero new Polaris thread activity today beyond the filing. Dispatch consolidated with Wema (new miss) + NIBSS in one user DM. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 16:09 WAT] — Polaris P1 silent 4h30m since filing, active 4h43m total. 4th consecutive silent tick past Immediate #2 threshold. Tier 1 channel-read sweep zero new parent messages; keyword searches zero in-scope results. No Immediate re-dispatched — 15:09 WAT consolidated dispatch is the authoritative alert and nothing new has emerged. Aging will be folded into briefing-2026-04-18. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
- Sterling settlement remains OFF Day 7+ — no resolution signal in the afternoon tick window.
