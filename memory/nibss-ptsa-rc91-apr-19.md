---
title: NIBSS PTSA — RC91 Apr 19
type:
  - "situation"
cssclasses:
  - "situation"
role: cto-teamapt
status: developing
accountability: Technology Reliability and Security
created: "2026-04-19T07:34:20Z"
updated: "2026-04-19T07:34:20Z"
summary: "NIBSS PTSA RC91 re-surfaces Apr 19 01:25–01:40 WAT (15m, fast-resolved) after prior NIBSS PTSA Apr 17 situation was retired. Part of overnight 5-bank RC91 wave (Stanbic 7h3m, Access 7h50m, NIBSS PTSA 15m, Fidelity 14m, Union 2h10m)."
---

[[NIBSS]] PTSA (Payment Terminal Service Aggregator) route RC91 cycle opened 01:25 WAT Apr 19 and resolved ~01:40 WAT Apr 19 — 15 minutes, fast-resolved. This is a fresh situation because the prior [[NIBSS PTSA — RC91 Apr 17]] situation was retired after the Apr 17 cycle closed. The Apr 19 surface is a new cycle, not a re-open.

**Contextual framing.** Part of the overnight 5-bank concentration wave Apr 19 (00:00–04:50 WAT): [[Stanbic Bank ATS — Persistent RC91 Pattern]] cycle 31 (7h3m), [[Access Bank — Multi-Track Failures]] cycle 8 (7h50m), NIBSS PTSA (15m, this situation), [[Fidelity Bank ATS — RC91 Failure Ongoing]] cycle 5 (14m), [[Union Bank — RC91 P1 Apr 19]] (2h10m). NIBSS PTSA's 15m fast-cycle groups with Fidelity's 14m fast-cycle — both resolved cleanly, in contrast to the Stanbic/Access regime-change durations. Onset at 01:25 WAT is ~1h25m after the Stanbic/Access 00:00 WAT same-minute onset.

**Why NIBSS PTSA fast-resolving while Stanbic/Access stay out for 7h+ is interesting.** If the common-mode upstream driver is a NIBSS-side event (e.g., TDSD-6626 NIBSS DR Exercise failover), one would expect NIBSS PTSA — the aggregator layer itself — to show the LONGEST cycle, not the shortest. The observed pattern (NIBSS PTSA resolves fast, Stanbic/Access resolve slow) suggests either: (a) the upstream driver is not NIBSS-bounded but downstream of NIBSS, closer to bank-specific route exposure; OR (b) the NIBSS aggregator has auto-failover that recovers quickly while downstream banks absorb backpressure. Both hypotheses warrant verification against TDSD-6626 timeline and NIBSS DR-exercise scope.

**Historical context.** NIBSS PTSA has been in-and-out of the watch window repeatedly — [[NIBSS PTSA — Route Failure Apr 16]] (resolved Apr 16 17:50 WAT), [[NIBSS PTSA — RC91 Apr 17]] (retired). The Apr 19 surface is the third distinct NIBSS PTSA situation in 3 days.

**Outstanding questions.** (1) Was a TDSD ticket raised for the Apr 19 cycle? Not verified at tick time. (2) Is NIBSS's attribution-to-Moniepoint-timeout framing (recurring in prior cycles) present in the Apr 19 cycle's correspondence? Not verified. (3) Does TDSD-6626 (NIBSS DR Exercise) window overlap the 01:25–01:40 WAT cycle? Overlap check pending — this is the critical correlation signal.

## Sources
Overnight slack/email tracks Apr 19 01:25–01:40 WAT. Jira ticket verification pending. Prior retired situation [[NIBSS PTSA — RC91 Apr 17]].

## Deltas
- [2026-04-19 07:11 WAT] — Situation created at briefing tick. RC91 cycle Apr 19 01:25–01:40 WAT, 15m fast-resolved. Part of 5-bank overnight concentration. Third distinct NIBSS PTSA situation in 3 days (Apr 16 Route Failure retired, Apr 17 RC91 retired, Apr 19 RC91 fresh). Fast-cycle profile within the overnight wave distinguishes NIBSS PTSA + Fidelity from the Stanbic/Access regime-change pair. Linked to [[RC91 Multi-Bank Failure Pattern]] overnight-wave update and [[TDSD-6626]] correlation check. Carries into briefing-2026-04-19 as awareness item under the overnight-wave Decision item. Factors: source=slack/email, situation_delta (new situation page), pattern_significance (overnight-wave participant + aggregator-layer signal), accountability_alignment.