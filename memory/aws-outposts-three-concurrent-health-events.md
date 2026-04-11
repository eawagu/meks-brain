---
role: cto-teamapt
type:
  - "situation"
title: AWS Outposts — Three Concurrent Health Events
status: developing
created: "2026-04-11T16:44:04Z"
summary: "Four concurrent Outpost health events: connectivity loss, ALB insufficient capacity, RDS impact, and new outbound traffic failure. AWS ops manager escalation in progress."
updated: "2026-04-11T18:50:56Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Four concurrent Outpost health events on account 314146323510 (eu-west-2): (1) Connectivity loss since Apr 7 — prevents operational changes to Outpost resources. NEW connectivity loss event fired at 09:15 UTC Apr 11 (SERVICE_LINK_DOWN). (2) ALB insufficient capacity since Apr 11 01:00 WAT — [[AWS]] cannot launch replacement ALB nodes for mandatory security patching; action required: add C5/M5/R5 capacity. (3) AWS case 177588572106502 opened 05:35 WAT Apr 11 — RDS instances (tapt-grafana-prod-db, MySQL, PostgreSQL, SQL Server) impacted by connectivity issues; AWS unable to monitor, perform daily backups, or run maintenance. (4) NEW: AWS case 177592405600551 opened 17:14 WAT Apr 11 — "No outbound traffic from outpost lags." AWS ops manager Praveen taking personal ownership at 19:35 WAT, apologizing for delayed response to urgent inquiry. [[Tolu Aina]] is the natural owner. If production databases are on this Outpost, data protection is at immediate risk. The Praveen escalation suggests AWS recognizes severity.

## Sources
email, 2026-04-07 04:29 GMT, AWS Health Event notification; email cancellation 16:21 WAT Apr 8; email 09:15 UTC Apr 11 connectivity loss; email 16:14 UTC Apr 11 new case 177592405600551; email 18:35 UTC Apr 11 Praveen response

## Deltas
- 2026-04-11 03:10 WAT — NEW: AWS Health Event at 01:00 WAT — [Action Required] Insufficient Instance Capacity for ALBs. Four identical emails sent. Second distinct issue alongside the Apr 7 connectivity loss.
- 2026-04-11 10:15 WAT — NEW connectivity loss event: AWS_OUTPOSTS_SERVICE_LINK_DOWN at 09:15 UTC. Outpost ID op-005dbfcfaadc1740b lost connectivity to eu-west-2 region.
- 2026-04-11 17:14 WAT — NEW case 177592405600551: "No outbound traffic from outpost lags." Fourth concurrent event.
- 2026-04-11 19:35 WAT — AWS ops manager Praveen taking personal ownership of case 177592405600551, apologized for delayed response. Engineer assignment pending.