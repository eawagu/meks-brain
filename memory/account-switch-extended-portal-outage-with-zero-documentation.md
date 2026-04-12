---
role: cto-teamapt
type:
  - "situation"
title: Account Switch — Extended Portal Outage with Zero Documentation
status: retired
created: "2026-04-11T16:43:27Z"
summary: RETIRED. Portal back up — CTO confirmed outage was shorter than tracking suggested. Process failure (minimal Jira documentation, SLA breach) remains on record for post-mortem.
updated: "2026-04-12T16:44:49Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Account Switch]] portal outage resolved. CTO confirmed Apr 12 that the portal has been back up for a while and the outage was not as long as tracking suggested. Three Jira tickets were filed: [[TDSD-6488]], [[TDSD-6508]], [[TDSD-6512]].

Process failure remains on record: Jira documentation was minimal throughout the outage (TDSD-6488 had zero comments for 32h+, SLA breached at 13:40 WAT Apr 10). The bot alert pattern in #account-switch-alerts generated noise without actionable content. These are structural issues for post-mortem, not ongoing operational concerns.

## Sources
email Duty Handover #20260409; email Daily Report #20260411; email Duty Handover #20260412; email Hourly Reports 20260412; jira TDSD-6483, TDSD-6488, TDSD-6508, TDSD-6512; slack #account-switch-alerts; slack #teamapt-tech-operations; slack #teamapt-x-paystack-transfer-support; CTO confirmation Apr 12

## Deltas
- 2026-04-10 07:00 WAT — Paystack traffic loss confirmed resolved. Portal unreachable since Apr 9 ~06:00 WAT. TDSD-6488 zero comments, SLA breach at 13:40 WAT today.
- 2026-04-10 15:00 WAT — SLA BREACHED CONFIRMED. 32h+ total outage. Zero Jira comments.
- 2026-04-11 01:09 WAT — TDSD-6508 filed by [[Ekene Udodi]]. First Jira documentation connected to the portal outage.
- 2026-04-12 12:09 WAT — Hourly Report 11:59 WAT reconfirms transactions routed off, awaiting Paystack reroute.
- 2026-04-12 16:36 WAT — CTO confirmed portal is back up and has been for a while. Outage was shorter than monitoring suggested. Situation retired.