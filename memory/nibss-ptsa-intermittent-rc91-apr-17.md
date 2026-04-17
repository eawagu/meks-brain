---
role: cto-teamapt
type:
  - "situation"
title: NIBSS PTSA — Intermittent RC91 Apr 17
status: developing
created: "2026-04-17T11:19:19Z"
summary: "Active P1 intermittent RC91 on NIBSS PTSA route since 09:29 WAT Apr 17, now 4h41m with 3h07m silence since Moses's last message — consolidated Immediate dispatched (3rd consecutive silent tick)."
updated: "2026-04-17T14:14:49Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Intermittent RC91 ("Issuer or Switch Inoperative") failures on the [[NIBSS]] PTSA route began 09:29 WAT today and remained active as of 15:09 WAT — 5h40m total, well past the 2-hour salience-trigger threshold. P1 was filed in #teamapt-tech-operations at 11:25 WAT by the monitoring team. At 11:03 WAT, Moses Ajani disputed the partial-match attribution line of the initial diagnosis, so root-cause ownership between switch-side and issuer-side is still contested — no thread activity since. Silence is now 4h06m.

This cycle is distinct from the [[NIBSS PTSA — Route Failure Apr 16]] cycle that resolved 17:50 WAT yesterday, but occupies the same root-cause territory (PTSA-routed authorization failures). Cross-pattern context this morning-into-afternoon: a previously-missed [[Wema Bank — RC91 P1 Apr 17]] (filed 08:52 WAT, 6h20m active — captured for the first time this tick), [[Polaris Bank]] RC91 P1 (11:26 WAT start, 3h43m active) on [[Sterling + Polaris — Routes Degraded]], reopened [[Ecobank — RC91 on NUS Nodes]] with Adewuyi Mayowa contesting attribution at 12:15 WAT (silent 2h54m), and cycle 26 on [[Stanbic Bank ATS — Persistent RC91 Pattern]]. Four concurrent RC91 routes with attribution ambiguity as a cross-cutting pattern, not isolated to NIBSS.

A separate P1 on [[Polaris Bank]] RC91 was filed 11:39 WAT (start 11:26 WAT) — tracked as a delta on [[Sterling + Polaris — Routes Degraded]] since same entity as an existing stable situation, though distinct failure mode from the Sterling-OFF Day 6+ settlement issue.

## Sources
Slack #teamapt-tech-operations 2026-04-17 11:25 WAT (P1 filing); Slack #teamapt-tech-operations 2026-04-17 11:03 WAT (Moses Ajani attribution dispute); Gmail Afeez 2026-04-17 12:01 WAT (Ecobank cross-context); Slack Adewuyi Mayowa 2026-04-17 12:15 WAT (Ecobank attribution pushback)

## Deltas
- [2026-04-17 11:25 WAT] — P1 filed in #teamapt-tech-operations: "P1: Intermittent 91 failures from NIBSS. Start Time 9:29 AM. End Time: Ongoing."
- [2026-04-17 11:03 WAT] — Moses Ajani disputed partial-match attribution in thread; ownership contested.
- [2026-04-17 12:09 WAT] — Heartbeat tick observed P1 still active at 2h40m, exceeding the 2h Immediate salience trigger. Dispatch sent to user DM.
- [2026-04-17 13:09 WAT] — Heartbeat tick: P1 still active at 3h40m, 2h06m of silence since Moses's 11:03 WAT message. No resolution signal in this window. Triggers: Immediate #2 (P1 >2h unresolved) + absence-of-signal. Fresh dispatch to user DM. Factors: urgency 1.0 · impact_scope 0.8 · cto_specificity 0.9 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 14:09 WAT] — Heartbeat tick: P1 still active at 4h41m, 3h07m of silence since Moses's 11:03 WAT message. Third consecutive silent tick. Slack/email/keyword sweeps all zero results this window. Triggers: Immediate #2 (P1 >2h unresolved) + absence-of-signal. Dispatch consolidated with Polaris in one user DM. Factors: urgency 1.0 · impact_scope 0.8 · cto_specificity 0.9 · pattern_significance 0.95 · accountability_alignment 1.0.
- [2026-04-17 15:09 WAT] — Heartbeat tick: P1 still active at 5h40m, 4h06m of silence since Moses's 11:03 WAT. Fourth consecutive silent tick. Broader sweep surfaced a previously-untracked [[Wema Bank — RC91 P1 Apr 17]] (8:49 WAT start — not caught by prior 3 ticks); consolidated Immediate dispatch now covers Wema + NIBSS + Polaris. Gmail MCP 2nd consecutive tick failure. Factors: urgency 1.0 · impact_scope 0.8 · cto_specificity 0.9 · pattern_significance 0.95 · accountability_alignment 1.0.
