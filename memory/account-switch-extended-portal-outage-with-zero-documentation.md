---
role: cto-teamapt
type:
  - "situation"
title: Account Switch — Extended Portal Outage with Zero Documentation
status: developing
created: "2026-04-11T16:43:27Z"
summary: "Portal unreachable since Apr 9 ~06:00 WAT (now ~76h+). Three Jira tickets (TDSD-6488, TDSD-6508, TDSD-6512). Hourly Report 20260412 confirms transactions still routed off, awaiting Paystack reroute. Window 1 reports completed on portal."
updated: "2026-04-12T09:12:43Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Account Switch]] portal unreachable since Apr 9 ~06:00 WAT. Now ~76h+ outage. Hourly Report 20260412 ([[Qazim Adedigba]], 09:24 WAT Apr 12) confirms: "Account Switch transactions are routed off due to ongoing maintenance; we are awaiting Paystack to reroute traffic and reconfirm the status." Window 1 reports (TeamApt Revenue Report, Fees, Settlements Advice, Settlement Reports) have been completed on the portal — indicating partial portal functionality restored for reporting, while transaction routing remains off.

Three Jira tickets: [[TDSD-6488]], [[TDSD-6508]], [[TDSD-6512]]. Jira auth failure prevents current ticket status verification (12th consecutive tick). SLA breach occurred 13:40 WAT Apr 10. This remains a process failure on record — 76h+ outage with minimal Jira documentation.

## Sources
email Duty Handover #20260409; email Daily Report #20260411; email Duty Handover #20260412; email Hourly Reports 20260412 (Qazim Adedigba, 09:24 WAT Apr 12); jira TDSD-6483, TDSD-6488, TDSD-6508, TDSD-6512; slack #account-switch-alerts; slack #teamapt-tech-operations; slack #teamapt-x-paystack-transfer-support

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
- 2026-04-12 10:09 WAT — Hourly Report 20260412 confirms transactions still routed off, described as "ongoing maintenance." Awaiting Paystack to reroute and reconfirm. Window 1 reports completed — partial portal functionality for reporting. ~76h+ total outage.