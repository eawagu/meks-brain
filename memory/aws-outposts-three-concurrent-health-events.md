---
title: AWS Outposts — Three Concurrent Health Events
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-11T16:44:04Z"
updated: "2026-04-11T16:44:04Z"
summary: "Three concurrent Outpost health events on account 314146323510 (eu-west-2): connectivity loss, ALB insufficient capacity, RDS database impact. Data protection at risk."
---

Three concurrent Outpost health events on account 314146323510 (eu-west-2): (1) Connectivity loss since Apr 7 — prevents operational changes to Outpost resources. (2) ALB insufficient capacity since Apr 11 01:00 WAT — [[AWS]] cannot launch replacement ALB nodes for mandatory security patching; action required: add C5/M5/R5 capacity. (3) NEW: AWS case 177588572106502 opened 05:35 WAT Apr 11 — RDS instances (tapt-grafana-prod-db, MySQL, PostgreSQL, SQL Server) impacted by connectivity issues; AWS unable to monitor, perform daily backups, or run maintenance. [[Tolu Aina]] is the natural owner. If production databases are on this Outpost, data protection is at immediate risk.

## Sources
email, 2026-04-07 04:29 GMT, AWS Health Event notification; email cancellation 16:21 WAT Apr 8

## Deltas
- 2026-04-11 03:10 WAT — NEW: AWS Health Event at 01:00 WAT — [Action Required] Insufficient Instance Capacity for ALBs. Four identical emails sent. Second distinct issue alongside the Apr 7 connectivity loss.