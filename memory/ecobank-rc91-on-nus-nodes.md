---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "Ecobank NUS-node RC91 failures reopened 12:01 WAT Apr 17; Adewuyi Mayowa pushback at 12:15 WAT contests attribution — no resolution action."
updated: "2026-04-17T12:18:50Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Ecobank]] RC91 failures on NUS nodes had been marked resolved at 22:01 WAT yesterday (Apr 16). At 12:01 WAT today (Apr 17), Afeez escalated via email stating the team is "still getting intermittent RC91 for transaction" and attached a CSV sample of failed transactions. Yesterday's closure was premature; the issue is active again. At 12:15 WAT, Adewuyi Mayowa pushed back in thread: "Everything looks fine from this end" — attribution is now contested between reporter and operator, no resolution action taken.

The reopen coincides with active P1s on [[NIBSS PTSA — Intermittent RC91 Apr 17]] (3h40m+, Immediate tier) and [[Polaris Bank]] RC91 (filed 11:39 WAT, tracked on [[Sterling + Polaris — Routes Degraded]]), and with cycle 26 on [[Stanbic Bank ATS — Persistent RC91 Pattern]]. The concurrence across four distinct issuer routes on the same morning suggests either a common upstream degradation or coincident independent noise — root cause still unknown. The Adewuyi pushback reinforces the attribution-ambiguity pattern already present in NIBSS (Moses Ajani partial-match dispute): reporters and operators are not converging on a shared diagnosis across multiple routes today.

Calibration note: the 22:14 WAT briefing tick yesterday treated the 22:01 closure as resolved; that surfacing produced a false-positive resolution marker. Today's reopen is evidence that RC91 closures need a longer quiet-period watch before being treated as terminal.

## Sources
Gmail Afeez 2026-04-17 12:01 WAT (email with CSV sample of failed transactions); Slack Adewuyi Mayowa 2026-04-17 12:15 WAT (pushback in Afeez thread); prior closure signal Slack #teamapt-tech-operations 2026-04-16 22:01 WAT

## Deltas
- [2026-04-17 12:01 WAT] — Reopened. Afeez email: "still getting intermittent RC91 for transaction" + CSV sample attached. Yesterday's 22:01 WAT resolution was premature.
- [2026-04-17 12:15 WAT] — Adewuyi Mayowa pushback in thread: "Everything looks fine from this end." Attribution contested; no resolution action.
