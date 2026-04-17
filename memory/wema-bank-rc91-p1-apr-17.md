---
title: Wema Bank — RC91 P1 Apr 17
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
role: cto-teamapt
accountability: Technology Reliability and Security
created: "2026-04-17T14:14:24Z"
updated: "2026-04-17T14:14:24Z"
summary: "Active Wema RC91 P1 since 08:49 WAT Apr 17, 6h20m+ with zero thread activity since 08:52 WAT filing — first captured at 15:09 WAT tick (prior 3 ticks missed it)."
---

[[Wema Bank]] RC91 P1 failures across processors filed by [[Afeez Kazeem]] in #teamapt-tech-operations at 08:52 WAT Apr 17 — start time 08:49 WAT, ongoing at filing. Resolution action per the filing: "The issue was escalated to the partner for investigation and resolution." No thread activity, no resolution post, no keyword matches since the filing. P1 is 6h20m active at the 15:09 WAT tick observation and has been silent since filing (6h17m silence).

This situation was NOT surfaced by the 12:09, 13:09, or 14:09 WAT ticks today — three consecutive ticks missed it. The morning briefing-2026-04-17 (emitted ~06:09 WAT) pre-dated the filing, so that miss is isolated to the midday ticks. A `MISS:` calibration note has been captured per the Missed Signal Capture path in [[config-salience]].

Cross-cutting pattern: Wema joins [[NIBSS PTSA — Intermittent RC91 Apr 17]] (5h40m active), [[Polaris Bank]] RC91 P1 on [[Sterling + Polaris — Routes Degraded]] (3h43m active), and the [[Ecobank — RC91 on NUS Nodes]] reopen (contested attribution, silent 2h54m) — four concurrent RC91 routes today with no resolutions. [[FCMB]] P1 at 07:47 WAT also posted but with "services have been restarted" framing — status ambiguous. This is the heaviest multi-route morning of the current [[RC91 Multi-Bank Failure Pattern]] cycle.

Historical context on [[Wema Bank]]: prior RC91 cycles Apr 8 and Apr 11 (3rd cycle same day Apr 11, frequency-increasing pattern), plus earlier settlement failure TDSD-6446 (Apr 6). Today's P1 extends the pattern into April's third week.

## Sources
Slack #teamapt-tech-operations 2026-04-17 08:52 WAT (Afeez Kazeem P1 filing)

## Deltas
- [2026-04-17 08:49 WAT] — RC91 failures began on Wema across processors (per P1 start time).
- [2026-04-17 08:52 WAT] — P1 filed in #teamapt-tech-operations by Afeez Kazeem. Escalated to partner. Ongoing at filing.
- [2026-04-17 15:09 WAT] — First heartbeat observation of this cycle. P1 active 6h20m, silent 6h17m since filing. Immediate #2 threshold (P1 >2h unresolved) crossed. Consolidated dispatch with [[NIBSS PTSA — Intermittent RC91 Apr 17]] and Polaris (on [[Sterling + Polaris — Routes Degraded]]) sent to user DM. Factors: urgency 1.0 · impact_scope 0.75 · cto_specificity 0.85 · pattern_significance 1.0 (prior-tick miss is itself a pattern signal) · accountability_alignment 1.0. Calibration: `MISS:` note captured for prior-tick omission.
