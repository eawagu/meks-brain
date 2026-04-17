---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: "Sterling OFF Day 6+ on settlement; Polaris added concurrent RC91 P1 delta at 11:39 WAT Apr 17 (distinct failure mode from Sterling's)."
updated: "2026-04-17T11:19:20Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Two issuer routes remain degraded. [[Sterling Bank]] has been OFF on settlement for Day 6+ with no resolution signal. [[Polaris Bank]] had been stable on this page until today — at 11:26 WAT Apr 17, a new RC91 P1 started; filed in #teamapt-tech-operations at 11:39 WAT and escalated to the partner. This is a distinct failure mode from Sterling's settlement OFF state — same-entity-class, different mechanism.

Status moves back to `developing` to reflect the Polaris P1. The Polaris event also co-occurs with [[NIBSS PTSA — Intermittent RC91 Apr 17]] (active 2h40m+), reopened [[Ecobank — RC91 on NUS Nodes]], and cycle 26 on [[Stanbic Bank ATS — Persistent RC91 Pattern]] — noting the cross-route concurrence for pattern analysis.

## Sources
Slack #teamapt-tech-operations 2026-04-17 11:39 WAT (Polaris P1 filing); aggregated Sterling-OFF signal over the prior 6 days

## Deltas
- [2026-04-17 11:39 WAT] — Polaris Bank RC91 P1 filed. Start 11:26 WAT, ongoing at filing. Escalated to partner. Distinct failure mode from Sterling settlement OFF.
- Sterling settlement remains OFF Day 6+ — no resolution signal in the noon tick window.
