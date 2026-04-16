---
role: cto-teamapt
type:
  - "situation"
title: AWS Outposts — Three Concurrent Health Events
status: developing
created: "2026-04-11T16:44:04Z"
summary: "Five concurrent Outpost health events: connectivity loss (9+ days), ALB insufficient capacity, RDS impact, outbound traffic failure, and SERVICE_LINK_DOWN Apr 16. Case 177635165100470 now with Goodhope (AWS Outposts team, Dublin) — first Outpost specialist assignment. Engineer requesting additional details."
updated: "2026-04-16T17:15:19Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Four concurrent Outpost health events on account 314146323510 (eu-west-2): (1) Connectivity loss since Apr 7 — prevents operational changes to Outpost resources. NEW connectivity loss event fired at 09:15 UTC Apr 11 (SERVICE_LINK_DOWN). Another SERVICE_LINK_DOWN fired at 13:59 UTC Apr 16 — fifth concurrent event, 9 days into the situation. Support case 177635165100470 opened with "unable to reach some instances." (2) ALB insufficient capacity since Apr 11 01:00 WAT — [[AWS]] cannot launch replacement ALB nodes for mandatory security patching; action required: add C5/M5/R5 capacity. (3) AWS case 177588572106502 opened 05:35 WAT Apr 11 — RDS instances (tapt-grafana-prod-db, MySQL, PostgreSQL, SQL Server) impacted by connectivity issues; AWS unable to monitor, perform daily backups, or run maintenance. (4) AWS case 177592405600551 opened 17:14 WAT Apr 11 — "No outbound traffic from outpost lags." AWS ops manager Praveen took personal ownership at 19:35 WAT. Network engineer Jack assigned at 20:20 WAT — requested outpost ID, source/destination IP, port and protocol details. Jack sent meeting link for live debugging session. [[Tolu Aina]] is the natural owner. If production databases are on this Outpost, data protection is at immediate risk. Active AWS engagement is a positive signal — first meaningful technical response.

**Apr 16 escalation context:** Account switch portal reported unreachable (TDSD-6586, Daily Report #20260416). Possible correlation with Outpost connectivity loss — if the portal infrastructure runs on this Outpost, the SERVICE_LINK_DOWN could be the cause. Concurrent with 3 active P1s (Stanbic RC91, UBA RC91, NIBSS PTSA route failure) — unclear if Outpost connectivity is related to PTSA-level failures or independent.

**Case 177635165100470 — Outpost team assignment (17:16 WAT Apr 16):** AWS support engineer Goodhope (Outposts team, Dublin) took ownership. This is the first Outpost specialist assignment on this case — previous handler Sai Nikhil D. was EC2 team and routed it. Goodhope stated: "I understand from your initial report that you are unable to reach some instances" — requesting: (a) resource IDs of affected instances, (b) exact error messages, (c) timestamps with timezone. Case acknowledged as Business Critical. Positive progression — case now with the correct team.

## Sources
email, 2026-04-07 04:29 GMT, AWS Health Event notification; email cancellation 16:21 WAT Apr 8; email 09:15 UTC Apr 11 connectivity loss; email 16:14 UTC Apr 11 new case 177592405600551; email 18:35 UTC Apr 11 Praveen response; email 19:20–19:39 UTC Apr 11 Jack network team engagement; email 14:15 UTC Apr 16 new SERVICE_LINK_DOWN + case 177635165100470; email 15:00 UTC Apr 16 "unable to reach some instances"; email 15:16 UTC Apr 16 Nikhil routing to Outpost team; email 16:16 UTC Apr 16 Goodhope (Outposts team) takes ownership

## Deltas
- 2026-04-11 03:10 WAT — NEW: AWS Health Event at 01:00 WAT — [Action Required] Insufficient Instance Capacity for ALBs. Fourth distinct issue alongside the Apr 7 connectivity loss.
- 2026-04-11 10:15 WAT — NEW connectivity loss event: AWS_OUTPOSTS_SERVICE_LINK_DOWN at 09:15 UTC.
- 2026-04-11 17:14 WAT — NEW case 177592405600551: "No outbound traffic from outpost lags." Fourth concurrent event.
- 2026-04-11 19:35 WAT — AWS ops manager Praveen taking personal ownership of case 177592405600551.
- 2026-04-11 20:20 WAT — AWS network engineer Jack assigned. Requested details. Meeting link sent.
- 2026-04-16 14:59 WAT — NEW SERVICE_LINK_DOWN event (13:59 UTC). Fifth concurrent event. Support case 177635165100470 opened.
- 2026-04-16 17:09 WAT — AWS engineer Nikhil (EC2 team) routing case 177635165100470 to Outpost support team. Case acknowledged as Business Critical.
- 2026-04-16 18:09 WAT — Goodhope (AWS Outposts team, Dublin) took ownership. First Outpost specialist on this case. Requesting resource IDs, error messages, timestamps. Positive progression.