---
title: Rack Centre Edge Firewall — Approval Gate Mismatch
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-11T16:44:19Z"
updated: "2026-04-11T16:44:19Z"
summary: Firewall reboots randomly (3x in 2 weeks). CTO sent email approval but Jira gate not clicked. Execution status unknown. Firewall on flawed v7.3.1.2.
---

Edge firewall at [[Rack Centre]] reboots randomly (3x in 2 weeks). Cisco recommended upgrade from 7.3.1.2 to 7.6.2. [[TDSD-6506]] filed 19:01 WAT Apr 10; [[Tolu Aina]] approved in Jira 22:05 WAT. CTO sent email approval at 22:56 WAT ("I've approved") and 22:57 WAT ("Pls prioritize asap") to [[Fumbi Lawrence]] — but the Jira approval gate was NOT clicked (TDSD-6506 still at Authorize, confirmed 07:08 WAT Apr 11). Whether the Infra team executed the upgrade based on the email is unknown — no Slack signals found. Firewall may remain on v7.3.1.2 with documented Cisco architectural flaw (BUG SR 700622284).

## Sources
email [[Fumbi Lawrence]] 14:16 WAT Apr 7; email [[Tolu Aina]] 08:48 WAT Apr 8; slack #teamapt-tech-operations; jira TDSD-6506

## Deltas
- 2026-04-10 11:00 WAT — Rack Centre OUTPOST P1 at 08:53 WAT. Resolved 10:12 WAT (1h19min). Firewall upgrade scheduled for tonight.
- 2026-04-10 19:09 WAT — TDSD-6506 filed. Upgrade window tonight 12:00 AM. CTO approval is gating item.
- 2026-04-10 21:12 WAT — [[Fumbi Lawrence]] sent Cisco BUG RCA to [[Tolu Aina]]. Technical basis for CTO approval now in hand. Window opens in ~3 hours.
- 2026-04-10 23:10 WAT — [[Tolu Aina]] posted "Approved" on TDSD-6506 at 22:05 WAT. CTO is now sole remaining approver. Window opens in under 1 hour.
- 2026-04-11 01:09 WAT — UPGRADE WINDOW PASSED WITHOUT CTO APPROVAL. TDSD-6506 still at Authorize. No evidence of execution. Firewall remains on v7.3.1.2.