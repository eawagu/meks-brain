---
title: Union Bank — RC91 P1 Apr 19
type:
  - "situation"
cssclasses:
  - "situation"
role: cto-teamapt
status: developing
accountability: Technology Reliability and Security
created: "2026-04-19T07:34:20Z"
updated: "2026-04-19T07:34:20Z"
summary: "Union Bank RC91 cycle overnight Apr 19 (02:40–04:50 WAT, 2h10m, bank-resolved). First-time participant on the active RC91 multi-bank wave. Fifth Union Bank RC91 cycle in 8 days (Apr 12, 15, 16×2, 19). Part of 5-bank overnight concentration (Stanbic, Access, NIBSS PTSA, Fidelity, Union)."
---

[[Union Bank]] RC91 cycle opened 02:40 WAT Apr 19 and resolved ~04:50 WAT Apr 19 — 2h10m duration, bank-resolved. First time Union Bank participated in the active RC91 overnight wave (prior Union Bank RC91 cycles on Apr 12, 15, 16×2 were isolated or part of daylight multi-bank patterns). This cycle is distinctive within the Apr 19 overnight wave for its intermediate duration: Stanbic cycle 31 (7h3m) and Access cycle 8 (7h50m) ran regime-change long; [[NIBSS PTSA — RC91 Apr 19]] (15m) and [[Fidelity Bank ATS — RC91 Failure Ongoing]] cycle 5 (14m) resolved fast; Union's 2h10m sits between the two groups.

**Contextual framing.** Union Bank's overnight onset at 02:40 WAT is ~2h40m after Stanbic/Access same-minute onset at 00:00 WAT — suggests the common-mode upstream driver (if present) did not affect all participating banks synchronously, but Union Bank's routing path was exposed within the same broader window. Opened during overnight-delegation window (23:00–06:00 WAT Immediate-dispatch suppression) — first observed at 06:00+ WAT briefing tick.

**Track interaction.** [[Union Bank]] entity page shows prior cycles (Apr 12 TDSD-6519 16m resolved; Apr 15 15:07 WAT active; Apr 16 11:04 WAT ~56m; Apr 16 17:23 WAT likely-resolved via NIBSS PTSA Apr 16 route restoration). Cycle 5 is the longest Union Bank RC91 cycle in the 8-day tracking window — prior cycles all resolved ≤56m. Cadence: 5 cycles in 8 days = ~0.6/day, below Stanbic's (~2/day overnight inclusive) but above Fidelity's current ~0.25/day.

**Outstanding questions.** (1) Was a TDSD ticket raised for cycle 5? Not verified at tick time. (2) Did Union Bank-side teams (Victor Iyama / FEP Administration) respond during the cycle, or was it bank-auto-recovered? Not verified at tick time. (3) Does the 2h40m offset from the Stanbic/Access onset suggest Union routes through a different NIBSS/CoralPay path that absorbed the upstream degradation with delay? Open — needs routing-path map.

## Sources
Overnight slack/email tracks Apr 19 02:40–04:50 WAT. Jira ticket verification pending.

## Deltas
- [2026-04-19 07:11 WAT] — Situation created at briefing tick. Cycle 5 Apr 19 02:40–04:50 WAT, 2h10m bank-resolved. First-time participant on active RC91 overnight wave. 5th Union Bank RC91 cycle in 8 days. Part of 5-bank overnight concentration. Linked to [[RC91 Multi-Bank Failure Pattern]] overnight-wave update. Carries into briefing-2026-04-19 as awareness item under the overnight-wave Decision item. Factors: source=slack/email, situation_delta (new situation page), pattern_significance (first-time wave participant + overnight concentration), accountability_alignment.