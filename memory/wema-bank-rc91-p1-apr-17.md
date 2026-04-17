---
role: cto-teamapt
type:
  - "situation"
title: Wema Bank — RC91 P1 Apr 17
status: developing
created: "2026-04-17T14:14:24Z"
summary: "Active Wema RC91 P1 since 08:49 WAT Apr 17, now 11h20m active and silent 11h17m since filing — no Immediate re-dispatched (calibration holds post-15:09 consolidated)."
updated: "2026-04-17T20:03:47Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Wema Bank]] RC91 P1 failures across processors filed by [[Afeez Kazeem]] in #teamapt-tech-operations at 08:52 WAT Apr 17 — start time 08:49 WAT, ongoing at filing. Resolution action per the filing: "The issue was escalated to the partner for investigation and resolution." No thread activity, no resolution post, no keyword matches since the filing. P1 is 11h20m active at the 20:09 WAT tick observation and has been silent since filing (11h17m silence).

This situation was NOT surfaced by the 12:09, 13:09, or 14:09 WAT ticks today — three consecutive ticks missed it. The morning briefing-2026-04-17 (emitted ~06:09 WAT) pre-dated the filing, so that miss is isolated to the midday ticks. A `MISS:` calibration note has been captured per the Missed Signal Capture path in [[config-salience]]. Structural fix: [[source-config-slack]] now mandates a Tier 1 channel-read sweep for parent messages every tick, so subsequent filings cannot slip by a situation-page-only retrieval pattern.

Cross-cutting pattern: Wema joins [[NIBSS PTSA — Intermittent RC91 Apr 17]] (11h+ active), [[Polaris Bank]] double-cycle on [[Sterling + Polaris — Routes Degraded]] (morning P1 silent 8h30m, second-cycle P1 1h53m active), cycle 27 on [[Stanbic Bank ATS — Persistent RC91 Pattern]] (evening filing 18:05 WAT, 2h04m active), new [[UBA Bank — RC91 P1 Apr 17]] (18:45 WAT filing), and the [[Ecobank — RC91 on NUS Nodes]] reopen (contested attribution) — five concurrent RC91 situations today with no resolutions. [[FCMB]] P1 at 07:47 WAT also posted but with "services have been restarted" framing — status ambiguous. This is the heaviest multi-route day of the current [[RC91 Multi-Bank Failure Pattern]] cycle.

Historical context on [[Wema Bank]]: prior RC91 cycles Apr 8 and Apr 11 (3rd cycle same day Apr 11, frequency-increasing pattern), plus earlier settlement failure TDSD-6446 (Apr 6). Today's P1 extends the pattern into April's third week.

## Sources
Slack #teamapt-tech-operations 2026-04-17 08:52 WAT (Afeez Kazeem P1 filing)

## Deltas
- [2026-04-17 08:49 WAT] — RC91 failures began on Wema across processors (per P1 start time).
- [2026-04-17 08:52 WAT] — P1 filed in #teamapt-tech-operations by Afeez Kazeem. Escalated to partner. Ongoing at filing.
- [2026-04-17 15:09 WAT] — First heartbeat observation of this cycle. P1 active 6h20m, silent 6h17m since filing. Immediate #2 threshold (P1 >2h unresolved) crossed. Consolidated dispatch with [[NIBSS PTSA — Intermittent RC91 Apr 17]] and Polaris (on [[Sterling + Polaris — Routes Degraded]]) sent to user DM. Factors: urgency 1.0 · impact_scope 0.75 · cto_specificity 0.85 · pattern_significance 1.0 (prior-tick miss is itself a pattern signal) · accountability_alignment 1.0. Calibration: `MISS:` note captured for prior-tick omission.
- [2026-04-17 16:09 WAT] — Heartbeat tick: P1 still active at 7h20m, 7h17m silent since filing. No Slack thread activity (Tier 1 channel-read zero delta in window), no keyword matches on Wema/RC91. Gmail MCP unreachable (3rd consecutive tick failure — see [[source-config-email]]). No Immediate re-dispatched this tick: 15:09 WAT consolidated dispatch already covers this aging pattern and no new signal or resolution has emerged — re-firing identical content would be noise. Continued silence will surface in briefing-2026-04-18 as a Decision item (carry-forward). Factors: urgency 1.0 · impact_scope 0.75 · cto_specificity 0.85 · pattern_significance 1.0 · accountability_alignment 1.0.
- [2026-04-17 20:09 WAT] — Heartbeat tick: P1 still active at 11h20m, 11h17m silent since filing. Silence crosses into evening window with no resolution signal whatsoever. Gmail MCP **RECOVERED** this tick after 5 consecutive tool-upgrade failures — no new signal on Wema from Gmail side yet (Afeez thread empty). Jira MCP also **RECOVERED** after 139h blackout — no Wema tickets surfaced in initial recovery query. No Immediate re-dispatched — 15:09 WAT consolidated dispatch remains authoritative; briefing-2026-04-18 will carry this as overnight-silent P1. Factors: urgency 1.0 · impact_scope 0.75 · cto_specificity 0.85 · pattern_significance 1.0 · accountability_alignment 1.0.
