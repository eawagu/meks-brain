---
title: Account Switch — Extended Portal Outage with Zero Documentation
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-11T16:43:27Z"
updated: "2026-04-11T16:43:27Z"
summary: "Portal unreachable since Apr 9 ~06:00 WAT (41h+ as of last scan). Two Jira tickets (TDSD-6488, TDSD-6508), zero comments across both. SLA breached. Process failure on record."
---

[[Account Switch]] portal unreachable since Apr 9 ~06:00 WAT. Bot alert at 05:08 WAT Apr 11 confirms still down (41h+). [[TDSD-6488]] zero Jira comments (confirmed 07:08 WAT, last updated Apr 9 13:40 WAT). [[TDSD-6508]] filed by [[Ekene Udodi]] at 00:16 WAT Apr 11 (Work in Progress, zero comments). SLA breach occurred 13:40 WAT Apr 10. Two tickets, zero documentation across both. Windows 3 and 4 reports did not generate (Daily Report #20260410). This is a process failure on record — 41h outage with zero Jira documentation regardless of resolution state.

## Sources
email Duty Handover #20260409; jira TDSD-6483, TDSD-6488; slack #account-switch-alerts; slack #teamapt-tech-operations; slack #teamapt-x-paystack-transfer-support

## Deltas
- 2026-04-10 07:00 WAT — Paystack traffic loss confirmed resolved. Portal unreachable since Apr 9 ~06:00 WAT. TDSD-6488 zero comments, SLA breach at 13:40 WAT today.
- 2026-04-10 09:09 WAT — Additional bot alerts confirm portal still unreachable. TDSD-6488 SLA breach in 4h31m.
- 2026-04-10 11:00 WAT — Rack Centre OUTPOST P1 (08:53 WAT, resolved 10:12 WAT, 1h19min). Separate from TDSD-6488. SLA breach 2h40m away.
- 2026-04-10 13:00 WAT — Bot alert at 11:52 WAT confirms portal still unreachable. SLA breach ~29min away.
- 2026-04-10 15:00 WAT — SLA BREACHED CONFIRMED. 32h+ total outage. Zero Jira comments.
- 2026-04-10 17:05 WAT — 34h+ outage. Tech Support Meeting with [[Ekene Udodi]] was the last in-person escalation venue.
- 2026-04-10 19:09 WAT — Tech Support Meeting produced no Jira documentation. 3h+ bot silence — possible recovery, unconfirmed.
- 2026-04-10 21:12 WAT — Still zero Jira comments. 5h+ bot silence.
- 2026-04-10 23:10 WAT — "Likely recovered" assessment REVERSED. Bot alerts at 22:55 and 23:00 WAT confirm portal still down. 36h+.
- 2026-04-11 01:09 WAT — TDSD-6508 filed by [[Ekene Udodi]]. 38h+ outage. First Jira documentation connected to the portal outage.
- 2026-04-11 05:12 WAT — Bot alert at 05:08 WAT — 4h silence was monitoring gap, not recovery. 39h+. Both tickets zero comments.