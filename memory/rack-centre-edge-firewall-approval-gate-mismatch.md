---
role: cto-teamapt
type:
  - "situation"
title: Rack Centre Edge Firewall — Approval Gate Mismatch
status: retired
created: "2026-04-11T16:44:19Z"
summary: RETIRED. Firewall upgraded v4.2 → v4.6 → reverted to v4.4 (Cisco recommended). Stable since revert. TDSD-6506 resolved.
updated: "2026-04-12T16:43:57Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Edge firewall at [[Rack Centre]] upgraded from v4.2 to v4.6. v4.6 caused issues — reverted to v4.4 (Cisco's recommended version). Stable since revert. TDSD-6506 resolved. Random reboot issue from v7.3.1.2 (Cisco BUG SR 700622284) no longer applicable — firmware replaced.

NIBSS Citrix LB migration rescheduled to 23:30 WAT Apr 12 – 05:00 WAT Apr 13. [[Oladapo Onayemi]] confirmed resources on standby. No downtime expected.

## Sources
email [[Fumbi Lawrence]] 14:16 WAT Apr 7; email [[Tolu Aina]] 08:48 WAT Apr 8; slack #teamapt-tech-operations; jira TDSD-6506; email [[Haruna Isa]] 10:20 WAT Apr 11; email [[Tomiwa Odumuyiwa]] 14:08 WAT Apr 12; email [[Oladapo Onayemi]] 15:45 WAT Apr 12; CTO confirmation Apr 12

## Deltas
- 2026-04-10 11:00 WAT — Rack Centre OUTPOST P1 at 08:53 WAT. Resolved 10:12 WAT (1h19min). Firewall upgrade scheduled for tonight.
- 2026-04-10 19:09 WAT — TDSD-6506 filed. Upgrade window tonight 12:00 AM. CTO approval is gating item.
- 2026-04-10 21:12 WAT — [[Fumbi Lawrence]] sent Cisco BUG RCA to [[Tolu Aina]]. Technical basis for CTO approval now in hand. Window opens in ~3 hours.
- 2026-04-10 23:10 WAT — [[Tolu Aina]] posted "Approved" on TDSD-6506 at 22:05 WAT. CTO is now sole remaining approver. Window opens in under 1 hour.
- 2026-04-11 01:09 WAT — UPGRADE WINDOW PASSED WITHOUT CTO APPROVAL. TDSD-6506 still at Authorize. No evidence of execution. Firewall remains on v7.3.1.2.
- 2026-04-11 19:47 WAT — TDSD-6506 still at Authorize (Jira scan). Last Jira update 12:00 WAT. No Slack confirmation of execution. Citrix LB migration at NIBSS missed — rescheduling pending.
- 2026-04-12 15:45 WAT — NIBSS Citrix LB migration rescheduled to tonight 23:30–05:00 WAT. [[Oladapo Onayemi]] confirmed resources on standby.
- 2026-04-12 16:36 WAT — CTO confirmed: firewall upgraded from v4.2 → v4.6, v4.6 caused issues, reverted to v4.4 (Cisco recommended). Stable since revert. TDSD-6506 resolved.