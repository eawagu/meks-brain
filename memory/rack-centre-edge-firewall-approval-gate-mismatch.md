---
role: cto-teamapt
type:
  - "situation"
title: Rack Centre Edge Firewall — Approval Gate Mismatch
status: developing
created: "2026-04-11T16:44:19Z"
summary: "Firewall reboots randomly (3x in 2 weeks). TDSD-6506 still at Authorize as of 19:47 WAT Apr 11 despite CTO email approval. Execution status unknown. NIBSS Citrix LB migration rescheduled to tonight 23:30–05:00 WAT — Oladapo confirmed resources on standby."
updated: "2026-04-12T15:13:02Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Edge firewall at [[Rack Centre]] reboots randomly (3x in 2 weeks). Cisco recommended upgrade from 7.3.1.2 to 7.6.2. [[TDSD-6506]] filed 19:01 WAT Apr 10; [[Tolu Aina]] approved in Jira 22:05 WAT. CTO sent email approval at 22:56 WAT ("I've approved") and 22:57 WAT ("Pls prioritize asap") to [[Fumbi Lawrence]] — but the Jira approval gate was NOT clicked (TDSD-6506 still at Authorize, confirmed 19:47 WAT Apr 11 Jira scan, last Jira update 12:00 WAT). Whether the Infra team executed the upgrade based on the email is unknown — no Slack signals found. Firewall may remain on v7.3.1.2 with documented Cisco architectural flaw (BUG SR 700622284).

**Citrix LB migration:** Previously missed window ([[Haruna Isa]] at [[NIBSS]] apologized Apr 11). Now rescheduled: [[NIBSS]] ([[Tomiwa Odumuyiwa]]) confirmed maintenance tonight — Citrix environment → LAS migration. Scope: SDX box HQ upgrade, NIP Production and 1st Priority instances across HQ and DR. Approach: DR upgraded first, traffic redirected to DR, then HQ upgraded, then services migrated from Citrix MPX to LAS-enabled Citrix VPX. Window: 23:30 WAT Apr 12 – 05:00 WAT Apr 13. "No service downtime expected." Affected services: NIP, N-Gate, NPS, EasyPay, PAPPS, BVN, POS, NQR, NIBSS PayPlus. [[Oladapo Onayemi]] confirmed resources on standby for testing. [[Dennis Ajalie]] and CTO CC'd. Teams notified: teamapt-switch, AptPay Monitoring, Infra Group, Monnify tech support. Meeting link provided for the window.

## Sources
email [[Fumbi Lawrence]] 14:16 WAT Apr 7; email [[Tolu Aina]] 08:48 WAT Apr 8; slack #teamapt-tech-operations; jira TDSD-6506; email [[Haruna Isa]] 10:20 WAT Apr 11; email [[Tomiwa Odumuyiwa]] 14:08 WAT Apr 12 (Citrix LB migration notice); email [[Oladapo Onayemi]] 15:45 WAT Apr 12 (resources on standby confirmation)

## Deltas
- 2026-04-10 11:00 WAT — Rack Centre OUTPOST P1 at 08:53 WAT. Resolved 10:12 WAT (1h19min). Firewall upgrade scheduled for tonight.
- 2026-04-10 19:09 WAT — TDSD-6506 filed. Upgrade window tonight 12:00 AM. CTO approval is gating item.
- 2026-04-10 21:12 WAT — [[Fumbi Lawrence]] sent Cisco BUG RCA to [[Tolu Aina]]. Technical basis for CTO approval now in hand. Window opens in ~3 hours.
- 2026-04-10 23:10 WAT — [[Tolu Aina]] posted "Approved" on TDSD-6506 at 22:05 WAT. CTO is now sole remaining approver. Window opens in under 1 hour.
- 2026-04-11 01:09 WAT — UPGRADE WINDOW PASSED WITHOUT CTO APPROVAL. TDSD-6506 still at Authorize. No evidence of execution. Firewall remains on v7.3.1.2.
- 2026-04-11 19:47 WAT — TDSD-6506 still at Authorize (Jira scan). Last Jira update 12:00 WAT. No Slack confirmation of execution. Citrix LB migration at NIBSS missed — rescheduling pending.
- 2026-04-12 15:45 WAT — NIBSS Citrix LB migration rescheduled to tonight 23:30–05:00 WAT. [[Oladapo Onayemi]] confirmed resources on standby. Scope: NIP Production, 1st Priority instances, SDX box — HQ and DR. "No downtime expected." TDSD-6506 (firewall upgrade) status still unknown — Jira auth failure prevents verification.