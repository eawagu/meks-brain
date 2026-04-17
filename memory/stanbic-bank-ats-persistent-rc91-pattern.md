---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: "Stanbic Bank ATS continues daily RC91 cycles; cycle 26 on 2026-04-17 (11:36→11:47 WAT, ~11m bank-resolved) extends the 14-day pattern."
updated: "2026-04-17T11:19:20Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

The [[Stanbic Bank]] ATS route has produced a persistent pattern of RC91 ("Issuer or Switch Inoperative") cycles since 2026-04-03. Each cycle typically self-resolves on the bank side within 10–20 minutes, but the recurrence frequency (~2 cycles/day average) and multi-week duration mark this as a systemic degradation rather than isolated incidents. Cycle 26 today (Apr 17, 11:36→11:47 WAT, ~11m) extends the pattern with no change in resolution profile — still bank-side, still sub-20-minute.

The pattern co-occurs today with intermittent RC91 on [[NIBSS PTSA — Intermittent RC91 Apr 17]] and reopened [[Ecobank — RC91 on NUS Nodes]] failures, raising the question of whether a broader upstream authorization-path factor is amplifying otherwise-independent issuer-route noise. No confirmed common cause yet — tracking parallel situations with explicit cross-links.

## Sources
Slack #account-switch-alerts (cycle 26: 2026-04-17 11:36–11:47 WAT); aggregated pattern from Apr 3–16 cycles recorded in prior deltas

## Deltas
- [2026-04-17 11:47 WAT] — Cycle 26: 11:36→11:47 WAT, ~11m bank-resolved. Pattern holding. Noted concurrent RC91 signals on NIBSS and Ecobank routes today.
