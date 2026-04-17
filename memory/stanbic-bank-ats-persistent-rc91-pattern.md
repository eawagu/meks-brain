---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: "Stanbic Bank ATS continues daily RC91 cycles; cycle 27 filed 18:05 WAT Apr 17 evening, 2h04m active at 20:09 tick — no re-dispatch (recurring-pattern calibration holds)."
updated: "2026-04-17T20:02:49Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

The [[Stanbic Bank]] ATS route has produced a persistent pattern of RC91 ("Issuer or Switch Inoperative") cycles since 2026-04-03. Each cycle typically self-resolves on the bank side within 10–20 minutes, but the recurrence frequency (~2 cycles/day average) and multi-week duration mark this as a systemic degradation rather than isolated incidents. Cycle 26 today (Apr 17, 11:36→11:47 WAT, ~11m) followed the usual bank-resolved profile. Cycle 27 filed at 18:05 WAT by [[Olamide Ajibulu]] in #teamapt-tech-operations is still ongoing at the 20:09 WAT tick — 2h04m active, crossing the Immediate #2 threshold. Second same-day cycle stretching past 2h is a break from the morning cycle's resolution profile and is tracked as such.

The pattern co-occurs today with intermittent RC91 on [[NIBSS PTSA — Intermittent RC91 Apr 17]], [[Wema Bank — RC91 P1 Apr 17]], [[UBA Bank — RC91 P1 Apr 17]] (new 18:45 WAT), [[Polaris Bank]] second-cycle-of-day (18:16 WAT) on [[Sterling + Polaris — Routes Degraded]], and reopened [[Ecobank — RC91 on NUS Nodes]] failures, raising the question of whether a broader upstream authorization-path factor is amplifying otherwise-independent issuer-route noise. No confirmed common cause yet — tracking parallel situations with explicit cross-links. The 18:00–19:00 WAT evening window in particular produced three new P1 filings within 40 minutes (Stanbic, Polaris, UBA) — a concentration worth naming.

## Sources
Slack #account-switch-alerts (cycle 26: 2026-04-17 11:36–11:47 WAT); Slack #teamapt-tech-operations 2026-04-17 18:05 WAT (cycle 27 filing by Olamide Ajibulu); aggregated pattern from Apr 3–16 cycles recorded in prior deltas

## Deltas
- [2026-04-17 11:47 WAT] — Cycle 26: 11:36→11:47 WAT, ~11m bank-resolved. Pattern holding. Noted concurrent RC91 signals on NIBSS and Ecobank routes today.
- [2026-04-17 20:09 WAT] — Cycle 27: new RC91 P1 filed 18:05 WAT by Olamide Ajibulu in #teamapt-tech-operations. Active 2h04m at tick time — crosses Immediate #2 threshold. **No Immediate re-dispatch:** briefing-2026-04-17 16:30 triage noted all recurring RC91 P1s (including Stanbic) as expected recurring-pattern; re-firing Immediate for the same pattern would be noise (calibration precedent). Carries into briefing-2026-04-18 as pattern item — second same-day cycle exceeding 2h is a profile break from morning resolution. Previous-tick gap: 18:09 WAT tick was rate-limited on C0ABU8GMW75 and missed this filing; this tick caught it. Factors: urgency 0.9 · impact_scope 0.7 · cto_specificity 0.8 · pattern_significance 1.0 · accountability_alignment 1.0.
