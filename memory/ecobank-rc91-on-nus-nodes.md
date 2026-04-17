---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "Ecobank NUS-node RC91 reopened 12:01 WAT; Adewuyi contested at 12:15 WAT; silent 1h55m at 14:09 WAT tick — holding for briefing-2026-04-18 as Decision item (contested-attribution + CSV sample unadjudicated)."
updated: "2026-04-17T14:15:26Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Ecobank]] RC91 failures on NUS nodes had been marked resolved at 22:01 WAT yesterday (Apr 16). At 12:01 WAT today (Apr 17), Afeez escalated via email stating the team is "still getting intermittent RC91 for transaction" and attached a CSV sample of failed transactions. Yesterday's closure was premature; the issue is active again. At 12:15 WAT, Adewuyi Mayowa pushed back in thread: "Everything looks fine from this end" — attribution is now contested between reporter and operator, no resolution action taken.

The reopen coincides with active P1s on [[NIBSS PTSA — Intermittent RC91 Apr 17]] (5h40m+, Immediate tier), [[Polaris Bank]] RC91 (filed 11:39 WAT, tracked on [[Sterling + Polaris — Routes Degraded]]), a previously-missed [[Wema Bank — RC91 P1 Apr 17]] (8:49 WAT start, 6h20m active — first captured this tick), and cycle 26 on [[Stanbic Bank ATS — Persistent RC91 Pattern]]. The concurrence across five distinct issuer routes on the same morning suggests either a common upstream degradation or coincident independent noise — root cause still unknown. The Adewuyi pushback reinforces the attribution-ambiguity pattern already present in NIBSS (Moses Ajani partial-match dispute): reporters and operators are not converging on a shared diagnosis across multiple routes today.

Calibration note: the 22:14 WAT briefing tick yesterday treated the 22:01 closure as resolved; that surfacing produced a false-positive resolution marker. Today's reopen is evidence that RC91 closures need a longer quiet-period watch before being treated as terminal.

## Sources
Gmail Afeez 2026-04-17 12:01 WAT (email with CSV sample of failed transactions); Slack Adewuyi Mayowa 2026-04-17 12:15 WAT (pushback in Afeez thread); prior closure signal Slack #teamapt-tech-operations 2026-04-16 22:01 WAT

## Deltas
- [2026-04-17 12:01 WAT] — Reopened. Afeez email: "still getting intermittent RC91 for transaction" + CSV sample attached. Yesterday's 22:01 WAT resolution was premature.
- [2026-04-17 12:15 WAT] — Adewuyi Mayowa pushback in thread: "Everything looks fine from this end." Attribution contested; no resolution action.
- [2026-04-17 14:09 WAT] — Heartbeat tick: silent 1h55m since Adewuyi's pushback. No new email (Gmail MCP unreachable this tick — failure logged on [[source-config-email]]), no Slack thread activity, no keyword matches. Not dispatched as Immediate: no P1 was filed in Slack for this reopen; the pattern is contested-attribution on an email escalation with operator pushback closure posture. Accumulating for briefing-2026-04-18 as Decision item (attribution tension unresolved + Afeez's CSV sample not yet adjudicated). Factors: urgency 0.4 · impact_scope 0.5 · cto_specificity 0.6 · pattern_significance 0.8 · accountability_alignment 0.9.
- [2026-04-17 15:09 WAT] — Heartbeat tick: silent 2h54m since Adewuyi's 12:15 WAT pushback. Gmail MCP still unreachable (2nd consecutive tick — if 3rd tick also fails, Gmail MCP pattern becomes a Briefing Decision item alongside Jira). No new Slack thread activity; keyword/search sweeps zero new signal on Ecobank. Still holding for briefing-2026-04-18 as Decision item — no change to disposition, just extending the silence-window observation. Factors: urgency 0.45 · impact_scope 0.5 · cto_specificity 0.6 · pattern_significance 0.8 · accountability_alignment 0.9.
