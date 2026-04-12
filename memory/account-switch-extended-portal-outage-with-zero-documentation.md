---
role: cto-teamapt
type:
  - "situation"
title: Account Switch — Extended Portal Outage with Zero Documentation
status: developing
created: "2026-04-11T16:43:27Z"
summary: "Portal unreachable since Apr 9 ~06:00 WAT (now ~72h+). Three Jira tickets (TDSD-6488, TDSD-6508, TDSD-6512). 504 errors on routing. Duty Handover #20260412 confirms still down. Bot alerts continuing."
updated: "2026-04-12T00:13:04Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Account Switch]] portal unreachable since Apr 9 ~06:00 WAT. Now ~72h+ outage. Duty Handover #20260412 ([[Innocent Nwaokorie]], 00:11 WAT Apr 12) confirms: "Account switch transactions are currently not being routed because they experienced error 504 when routing traffic. Ticket raised: TDSD-6512." Bot alerts in #account-switch-alerts continuing — 6 empty alerts between 00:28–00:51 WAT Apr 12, confirming portal still down.

Three Jira tickets: [[TDSD-6488]], [[TDSD-6508]], [[TDSD-6512]]. Prior tickets had zero Jira comments as of last scan (Jira auth failure prevents current verification — 3rd consecutive tick). SLA breach occurred 13:40 WAT Apr 10. This is a process failure on record — 72h outage with minimal Jira documentation regardless of resolution state.

Daily Report #20260411 and Duty Handover #20260412 both confirm the outage is ongoing and transactions are not being routed.

## Sources
email Duty Handover #20260409; email Daily Report #20260411; email Duty Handover #20260412; jira TDSD-6483, TDSD-6488, TDSD-6508, TDSD-6512; slack #account-switch-alerts; slack #teamapt-tech-operations; slack #teamapt-x-paystack-transfer-support

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
- 2026-04-12 00:09 WAT — Daily Report #20260411 confirms account switch still not routing (504 errors). TDSD-6512 raised. Bot alerts continuing (5 empty alerts 23:43–23:48 WAT). 66h+ total outage.
- 2026-04-12 01:00 WAT — Duty Handover #20260412 confirms ongoing outage. 6 more empty bot alerts (00:28–00:51 WAT). ~72h+ total outage. Jira auth failure prevents ticket status verification (3rd consecutive tick).