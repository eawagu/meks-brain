---
title: UBA Bank — RC91 P1 Apr 17
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
role: cto-teamapt
accountability: Technology Reliability and Security
created: "2026-04-17T20:04:36Z"
updated: "2026-04-17T20:04:36Z"
summary: "UBA Bank RC91 P1 filed 18:45 WAT Apr 17, 1h24m active at 20:09 tick — first UBA P1 of the day, joining concurrent evening wave (Stanbic cycle 27, Polaris second cycle)."
---

[[UBA Bank]] RC91 P1 failures filed by [[Olamide Ajibulu]] in #teamapt-tech-operations at 18:45 WAT Apr 17 — start time 18:45 WAT, ongoing at filing. P1 is 1h24m active at the 20:09 WAT tick observation, approaching the 2h Immediate #2 threshold. No thread activity, no resolution post since filing.

UBA does not have a dedicated situation page prior to this — tracked only via the [[RC91 Multi-Bank Failure Pattern]] concept and the [[UBA Bank]] entity page. This P1 is the first UBA cycle to warrant independent situation tracking in the current pattern window. Creation rationale: active P1 on an issuer route with no existing situation container to carry deltas, and concurrence with the broader evening RC91 wave makes isolated entity-level tracking insufficient.

Cross-pattern context: UBA landed within the 18:00–19:00 WAT evening wave alongside [[Stanbic Bank ATS — Persistent RC91 Pattern]] cycle 27 (18:05 WAT filing, 2h04m active) and [[Polaris Bank]] second-cycle-of-day on [[Sterling + Polaris — Routes Degraded]] (18:16 WAT filing, 1h53m active) — three new P1 filings within 40 minutes. Broader concurrent context: [[Wema Bank — RC91 P1 Apr 17]] (11h20m active, silent since 08:52 WAT), [[NIBSS PTSA — Intermittent RC91 Apr 17]] (10h40m active, silent 9h06m), and reopened [[Ecobank — RC91 on NUS Nodes]].

Historical context on [[UBA Bank]]: UBA is part of the persistent RC91 multi-bank pattern. Prior cycles on UBA route are recorded on the entity page and reflected in the pattern concept. The 18:45 WAT filing tonight is today's first UBA P1 — not a recurring same-day cycle.

## Sources
Slack #teamapt-tech-operations 2026-04-17 18:45 WAT (Olamide Ajibulu P1 filing)

## Deltas
- [2026-04-17 18:45 WAT] — P1 filed in #teamapt-tech-operations by Olamide Ajibulu: "P1: UBA RC 91 failures. Start Time: 18:45." Escalated to partner per standard protocol.
- [2026-04-17 20:09 WAT] — First heartbeat observation of this cycle. P1 active 1h24m, silent 1h24m since filing. Approaching Immediate #2 threshold (2h unresolved) but not yet crossed. Previous-tick gap: 18:09 WAT tick was rate-limited on C0ABU8GMW75 — this filing emerged after that rate-limit window anyway (18:45 WAT filing, 18:09 tick window was 17:09→18:09). Situation page created this tick to carry forward as an independent container. **No Immediate dispatch:** calibration precedent from 16:30 triage (recurring RC91 P1s noted as expected) applies to this pattern too; briefing-2026-04-18 will carry this as a pattern Decision item. Factors: urgency 0.85 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 0.9 · accountability_alignment 1.0.
