---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: "Sterling OFF Day 6+ on settlement; Polaris RC91 P1 silent 1h30m since 11:39 WAT filing — fresh Immediate dispatched under absence-of-signal."
updated: "2026-04-17T12:18:51Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Two issuer routes remain degraded. [[Sterling Bank]] has been OFF on settlement for Day 6+ with no resolution signal. [[Polaris Bank]] had been stable on this page until today — at 11:26 WAT Apr 17, a new RC91 P1 started; filed in #teamapt-tech-operations at 11:39 WAT and escalated to the partner. This is a distinct failure mode from Sterling's settlement OFF state — same-entity-class, different mechanism.

Status moves back to `developing` to reflect the Polaris P1. The Polaris event also co-occurs with [[NIBSS PTSA — Intermittent RC91 Apr 17]] (active 3h40m+), reopened [[Ecobank — RC91 on NUS Nodes]] with Adewuyi Mayowa contesting attribution at 12:15 WAT, and cycle 26 on [[Stanbic Bank ATS — Persistent RC91 Pattern]] — cross-route concurrence continues across the noon window.

## Sources
Slack #teamapt-tech-operations 2026-04-17 11:39 WAT (Polaris P1 filing); aggregated Sterling-OFF signal over the prior 6 days

## Deltas
- [2026-04-17 11:39 WAT] — Polaris Bank RC91 P1 filed. Start 11:26 WAT, ongoing at filing. Escalated to partner. Distinct failure mode from Sterling settlement OFF.
- [2026-04-17 13:09 WAT] — Polaris P1 silent 1h30m since 11:39 WAT filing. No thread updates, no resolution signal. Trigger: absence-of-signal on active P1. Fresh dispatch to user DM. Factors: urgency 0.85 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.85 · accountability_alignment 1.0.
- Sterling settlement remains OFF Day 6+ — no resolution signal in the noon tick window.
