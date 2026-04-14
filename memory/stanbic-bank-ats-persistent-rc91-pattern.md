---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: 22+ P1 RC91 cycles Apr 3–14. Cycle 22 morning Apr 14 captured earlier this morning. Oladapo Onayemi investigating Moniepoint processing latency per NIBSS attribution — commitment due Apr 15 (tomorrow). Escalation posture decision 9+ days overdue.
updated: "2026-04-14T11:17:12Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Twenty-two+ confirmed P1 cycles Apr 3–14 (12 days), all bank-resolved, same root cause unfixed. [[TDSD-6425]] administratively closed Apr 10 — closure does NOT resolve the strategic escalation posture decision. "Decide [[Stanbic Bank]] ATS escalation posture" state item 9+ days overdue (due Apr 6).

**Investigation track:** [[Oladapo Onayemi]] tasked with investigating whether Moniepoint processing latency to NIBSS node is anomalous (per NIBSS attribution of RC91 to Moniepoint timeout). Commitment due Wed Apr 15 (tomorrow). No completion signal as of Apr 14 12:09 WAT. Natural 1:1 check-in scheduled Wed 12:30 WAT per B4 in briefing-2026-04-14. Parallel investigation surface with [[NIBSS DD — Pending Mandate P1 Active]] (same NIBSS-rails root cause) — Oladapo's findings will likely inform both.

Cycle 23 on Apr 14 morning (brief): Slack P1 log 09:51 BST recorded Start 09:46 → End 09:58 BST, **12-minute duration**, bank-resolved. Separate from and shorter than cycle 22 filed earlier by [[Olamide Ajibulu]]. Standard short-cycle pattern.

Cycle 22 on Apr 14 morning: [[Olamide Ajibulu]] filed at 10:48 WAT (09:48 UTC) via email to itservicemanagementnigeria + servicemonitoring, cc aptpaytechnicalsupport. Subject: "Stanbic | RC91| 20260414." Stanbic SRE ([[Onyedikachukwu Udeaja]]) requested reconfirmation at 09:52 WAT. [[Olamide Ajibulu]] confirmed "transactions are now processing successfully" at 10:01 WAT (UTC offset mixed across thread). Pattern unchanged, bank-resolved.

Cycle 21+ on Apr 13 evening: [[Daniel Armstrong]] reported issue resurfaced at 21:30 WAT. Stanbic SRE ([[Samson Ibekwe]]) acknowledged "receiving attention" at 20:41 UTC, then requested reconfirmation at 20:58 UTC. [[Daniel Armstrong]] confirmed "transactions are processing fine" at 21:59 WAT. Duration: ~30 min. Standard quick-cycle pattern.

Concurrent morning pattern: Three banks filed RC91 P1s on Apr 14 morning inside a 4.5-hour window (UBA cycles 1–4 per [[UBA]], Stanbic cycles 22 and 23, Polaris cycle Slack-filed 10:50 BST). Plus active [[NIBSS DD — Pending Mandate P1 Active]] ongoing since 03:00 WAT. The cross-bank co-occurrence is consistent with NIBSS-side degradation rather than per-bank issues — which is exactly what Oladapo's commitment is investigating.

NIBSS Citrix LB migration completed successfully overnight Apr 12–13: [[Oladapo Onayemi]] confirmed all NIBSS services functioning at 19:30 WAT Apr 13. Migration does not appear to have affected RC91 pattern — cycles continued post-migration.

Cycle 20 (TDSD-6518): [[Qazim Adedigba]] filed at 13:47 WAT Apr 12. Gabriel Rerri (Stanbic IT Command Officer) requested reconfirmation at 14:18 WAT. [[Qazim Adedigba]] confirmed resolution at 14:21 WAT. Duration: ~34 min.

Settlement validation thread active: [[Emeka Joseph]] confirming DCIR transaction migration to Stanbic team; Stanbic (Lucky Ohiorenuan) requesting failed transaction list citing CBN timeline pressure at 16:37 WAT Apr 11. ATS JAR deployment: [[Babajide Ojoboorun]] sent jar link to Stanbic (Oluwatobi Meshioye) at 20:11 WAT Apr 11 — deployment session pending Stanbic action. If jars were not deployed, these cycles are expected.

## Sources
email Stanbic RC91 thread Apr 3–14; email [[Olamide Ajibulu]] Stanbic | RC91| 20260414 filed 10:48 WAT Apr 14, reconfirmation/resolution exchange with [[Onyedikachukwu Udeaja]]; slack #teamapt-tech-operations (cycle 22 Olamide 10:48 WAT, cycle 23 Olamide 09:51 BST Apr 14); jira TDSD-6425 (Completed Apr 10); jira TDSD-6518 (filed Apr 12); email settlement validation Apr 10–11; email ATS JAR deployment Apr 11; email NIBSS PTSA RC91 04:49 WAT Apr 12; email NIBSS response 08:56 WAT Apr 12 (Moses Ajani — timeout attribution); email Daniel Armstrong resurfaced 21:30 WAT Apr 13; email Daniel Armstrong resolved 21:59 WAT Apr 13

## Deltas
- 2026-04-09 17:02 WAT — Jira TDSD-6425 confirmed still Work in Progress, last updated Apr 3 09:23 WAT, single comment ("Escalating to the bank"), no new activity in 6+ days.
- 2026-04-09 19:00 WAT — Cycle 15 filed by [[Olamide Ajibulu]] at 18:24 WAT.
- 2026-04-09 21:00 WAT — Cycle 15 RESOLVED at 20:07 WAT. Duration: 2h 37min.
- 2026-04-10 01:13 WAT — TDSD-6425 confirmed no new Jira activity (day 8).
- 2026-04-10 11:00 WAT — TDSD-6425 moved to Completed. Cycle 16 confirmed. Ticket administratively closed.
- 2026-04-11 11:39 WAT — Cycle 17: resurfaced 10:25 WAT, resolved 11:39 WAT.
- 2026-04-11 20:11 WAT — ATS JAR deployment follow-up sent to Stanbic.
- 2026-04-12 01:39 WAT — Cycle 18: Olamide reported. Stanbic claimed resolved, Olamide disputed at 02:48 WAT.
- 2026-04-12 04:49 WAT — NIBSS PTSA escalation. NIBSS attributed RC91 to Moniepoint timeout at 08:56 WAT.
- 2026-04-12 13:47 WAT — Cycle 20 (TDSD-6518). Resolved 14:21 WAT (~34 min).
- 2026-04-12 16:36 WAT — Triage: investigation delegated to [[Oladapo Onayemi]], commitment created (due Apr 15).
- 2026-04-13 21:30 WAT — Cycle 21+: [[Daniel Armstrong]] reported resurfaced. [[Samson Ibekwe]] acknowledged. Resolved 21:59 WAT (~30 min). Pattern continues.
- 2026-04-14 10:09 WAT — Cycle 22: [[Olamide Ajibulu]] filed 10:48 WAT (09:48 UTC), [[Onyedikachukwu Udeaja]] reconfirmation request, [[Olamide Ajibulu]] processing-fine confirmation.
- 2026-04-14 11:09 WAT — No new Stanbic signals in 10:09–11:09 WAT window. Cycle 22 remains closed. Commitment check-in still pending.
- 2026-04-14 12:09 WAT — Cycle 23 identified via Slack P1 log: Start 09:46 BST / End 09:58 BST, 12-min bank-resolved cycle (separate from cycle 22). Oladapo commitment still no signal with 1:1 tomorrow 12:30 WAT. Cross-bank co-occurrence this morning (UBA 4 cycles, Stanbic 2 cycles, Polaris 1 cycle, NIBSS DD active 9h+) continues to support NIBSS-side root cause framing.