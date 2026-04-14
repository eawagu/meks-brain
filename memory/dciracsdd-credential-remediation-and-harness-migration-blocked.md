---
role: cto-teamapt
type:
  - "situation"
title: DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked
status: resolving
created: "2026-04-11T16:42:32Z"
summary: "Five CRITICAL vulnerabilities. TDSD-6479 Harness migration CTO-approved Apr 12 — deploy can proceed. DCIR Stanbic server memory at 94.97%. DCIR transaction failure rate spiked 80% then declined to 33% (monitoring alerts Apr 14 00:48–01:06 WAT)."
updated: "2026-04-14T00:13:14Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Five CRITICAL vulnerabilities across [[ACS (Access Control Server)]], DCIR, [[DirectDebit]]. ACS connector replacement progressing: [[CoralPay]] service deployed to production ([[TDSD-6047]] Done, 18:45 WAT Apr 10, [[Ekene Udodi]]); [[FCMB]] MFA enrollment for VPN access confirmed. [[Fidelity Bank]] DD P1 ([[TDSD-6499]]) RESOLVED 13:07 WAT Apr 10 (11h7min, root cause: network connection loss to bank transfer API — independent of DCIR chain). TDSD-6504 (DD null mandate errors) escalated to [[NIBSS]] at 15:37 WAT Apr 10 — no resolution. [[TDSD-6479]] (Harness P1 migration) — **CTO approved Apr 12.** Bank Cashout Service and Card transaction routing can now migrate off legacy CI/CD. DCIR Stanbic server memory at 94.97% (threshold 90%) — monitoring alert at 19:46 WAT Apr 11. ATS JAR deployment to [[Stanbic Bank]] requested by [[Babajide Ojoboorun]] at 17:01 WAT.

**Apr 14 overnight:** DCIR TEAMAPT Monitoring Service fired two transaction failure alerts: 80% failure rate at 00:48 WAT, declining to 33.33% at 01:06 WAT (both exceeding 20% configured threshold). Automated alerts via aptpaytechnicalsupport distribution list. The declining rate suggests partial recovery. Whether this is connected to the Stanbic server memory stress (94.97%) or the Harness migration window is unknown. No human escalation filed.

## Sources
email [[Babajide Ojoboorun]] 17:55 WAT Apr 8; email [[Yasir Syed Ali]] 01:44 WAT Apr 10; email Fidelity restart 00:30 WAT Apr 10; slack #teamapt-tech-operations; jira TDSD-6439, TDSD-6477, TDSD-6479, TDSD-6497, TDSD-6499; email [[Ezinne Okoro]] 09:45 WAT Apr 10; email dcir-stanbic monitoring 19:46 WAT Apr 11; CTO confirmation Apr 12; email DCIR monitoring alerts 00:48 & 01:06 WAT Apr 14

## Deltas
- 2026-04-09 17:02 WAT — [[Access Bank]] ACS P1 (Direct Debit): mandate creation failed 09:20–13:40 WAT (4h 20min), resolved by bank. TDSD-6479: [[Tolu Aina]] directed [[Ekene Udodi]] to sync with Michael Oyedele — CTO and Tolu approvals still pending.
- 2026-04-10 01:13 WAT — TDSD-6479 third consecutive deploy window missed. Fidelity DCIR REALTIME server restart at 00:30 WAT.
- 2026-04-10 03:10 WAT — TDSD-6479 fourth consecutive missed window confirmed. Still at Authorize.
- 2026-04-10 09:09 WAT — NEW P1: Fidelity DD transactions stuck since 02:00 WAT (7h+). TDSD-6479 unchanged.
- 2026-04-10 11:00 WAT — Fidelity DD P1 still ongoing (9h+). FCMB MFA enrollment confirmed. Fifth missed window tonight if CTO does not approve.
- 2026-04-10 13:00 WAT — Fidelity DD P1 RESOLVED (11h7min). TDSD-6479 still at Authorize.
- 2026-04-10 15:00 WAT — TDSD-6479 confirmed still at Authorize. TDSD-6504 (DD null mandate errors) new failure mode emerging.
- 2026-04-10 17:05 WAT — TDSD-6497 RCA posted: network connection loss to bank transfer API. TDSD-6504 escalated to NIBSS.
- 2026-04-10 21:12 WAT — TDSD-6504 at NIBSS. TDSD-6479 still at Authorize — fifth window opens in ~4 hours.
- 2026-04-11 01:09 WAT — FIFTH CONSECUTIVE MISSED WINDOW CONFIRMED. Bank Cashout Service and Card transaction routing remain on legacy CI/CD.
- 2026-04-11 19:46 WAT — DCIR Stanbic server memory at 94.97% (threshold 90%). Infrastructure stress signal. ATS JAR deployment to Stanbic requested by [[Babajide Ojoboorun]] at 17:01 WAT.
- 2026-04-12 16:36 WAT — CTO confirmed TDSD-6479 Harness migration approved. Deploy can now proceed.
- 2026-04-14 01:09 WAT — DCIR transaction failure rate spiked to 80% (00:48 WAT), declined to 33.33% (01:06 WAT). Automated monitoring alerts. No human escalation. Possible overnight low-volume noise or early sign of degradation linked to Stanbic memory stress.