---
title: NIBSS PTSA — Intermittent RC91 Apr 17
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-17T11:19:19Z"
updated: "2026-04-17T11:19:19Z"
summary: "Active P1 intermittent RC91 on NIBSS PTSA route since 09:29 WAT Apr 17, exceeding 2h threshold with partial-match attribution disputed."
---

Intermittent RC91 ("Issuer or Switch Inoperative") failures on the [[NIBSS]] PTSA route began 09:29 WAT today and remained active as of 12:09 WAT — past the 2-hour salience-trigger threshold for anomalously stuck RC91 cycles. P1 was filed in #teamapt-tech-operations at 11:25 WAT by the monitoring team. At 11:03 WAT, Moses Ajani disputed the partial-match attribution line of the initial diagnosis, so root-cause ownership between switch-side and issuer-side is still contested.

This cycle is distinct from the [[NIBSS PTSA — Route Failure Apr 16]] cycle that resolved 17:50 WAT yesterday, but occupies the same root-cause territory (PTSA-routed authorization failures). The brain retires the Apr 16 situation and tracks today's cycle here. Cross-pattern context: [[Stanbic Bank ATS — Persistent RC91 Pattern]] showed cycle 26 today (11:36→11:47, ~11m), and [[Ecobank — RC91 on NUS Nodes]] reopened at 12:01 WAT per Afeez's email — suggesting a broader intermittent authorization-path degradation across multiple issuer routes this morning, not isolated to NIBSS.

A separate P1 on [[Polaris Bank]] RC91 was filed 11:39 WAT (start 11:26 WAT). That one is tracked as a delta on [[Sterling + Polaris — Routes Degraded]] since it's the same entity as an existing stable situation, though a distinct failure mode from the Sterling-OFF Day 6+ settlement issue.

## Sources
Slack #teamapt-tech-operations 2026-04-17 11:25 WAT (P1 filing); Slack #teamapt-tech-operations 2026-04-17 11:03 WAT (Moses Ajani attribution dispute); Gmail Afeez 2026-04-17 12:01 WAT (Ecobank cross-context)

## Deltas
- [2026-04-17 11:25 WAT] — P1 filed in #teamapt-tech-operations: "P1: Intermittent 91 failures from NIBSS. Start Time 9:29 AM. End Time: Ongoing."
- [2026-04-17 11:03 WAT] — Moses Ajani disputed partial-match attribution in thread; ownership contested.
- [2026-04-17 12:09 WAT] — Heartbeat tick observed P1 still active at 2h40m, exceeding the 2h Immediate salience trigger. Dispatch sent to user DM.
