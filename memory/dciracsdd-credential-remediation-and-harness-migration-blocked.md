---
role: cto-teamapt
type:
  - "situation"
title: DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked
status: resolving
created: "2026-04-11T16:42:32Z"
summary: "Five CRITICAL vulnerabilities. TDSD-6479 Harness migration CTO-approved Apr 12. DCIR/Wema failure rate 66% overnight (23:36 WAT Apr 15) — remediation demonstrably failed. Parallex server restart completed 02:29 WAT Apr 16, awaiting DCIR interchange routing. Access Bank vulnerabilities confirmed all closed (Onyinye Nweke 19:24 WAT Apr 15)."
updated: "2026-04-16T05:31:25Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Five CRITICAL vulnerabilities across [[ACS (Access Control Server)]], DCIR, [[DirectDebit]]. ACS connector replacement progressing: [[CoralPay]] service deployed to production ([[TDSD-6047]] Done, 18:45 WAT Apr 10, [[Ekene Udodi]]); [[FCMB]] MFA enrollment for VPN access confirmed. [[Fidelity Bank]] DD P1 ([[TDSD-6499]]) RESOLVED 13:07 WAT Apr 10 (11h7min, root cause: network connection loss to bank transfer API — independent of DCIR chain). TDSD-6504 (DD null mandate errors) escalated to [[NIBSS]] at 15:37 WAT Apr 10 — no resolution. [[TDSD-6479]] (Harness P1 migration) — **CTO approved Apr 12.** Bank Cashout Service and Card transaction routing can now migrate off legacy CI/CD. DCIR Stanbic server memory at 94.97% (threshold 90%) — monitoring alert at 19:46 WAT Apr 11. ATS JAR deployment to [[Stanbic Bank]] requested by [[Babajide Ojoboorun]] at 17:01 WAT.

**Access Bank vulnerabilities — CLOSED.** Onyinye Nweke confirmed 19:24 WAT Apr 15: "Exposed Heap Dump Endpoint Critical Closed; Sensitive Data and Passwords exposed..." — all AptPay web server vulnerability issues fixed. Cannot cross-reference against TDSD credential-remediation family (TDSD-6439 / TDSD-6477 / TDSD-6479) due to Jira blindness.

**DCIR/Wema — remediation failed, rate escalating.** Overnight Apr 15–16: DCIR failure rate 20.4% (23:20 WAT) → **66.0% (23:36 WAT)**. This follows the 40.65% alert at 19:06 WAT. Three data points post-remediation (Wema DB script 11:43 WAT Apr 15) confirm the DB script did NOT fix the underlying DCIR failure-rate generator. The rate is volatile and trending worse — 2 in 3 transactions failing at the 66% peak. See [[Wema Bank — RC91 After Settlement Resolution]] for full trajectory.

**Parallex Bank server restart completed.** Segun Ogunsola (Parallex Bank, Channels Switching) confirmed 02:29 WAT Apr 16 that server restart is done and service restored successfully. Awaiting transaction routing back to DCIR interchange — [[Daniel Armstrong]] to confirm Moniepoint-side routing.

**UBA Direct Card servers restart completed.** Rasheed Olanrewaju (UBA, Channel Switching Services) confirmed 02:46 WAT Apr 16: exercise completed.

**Apr 14 overnight — DCIR COMPLETE FAILURE:** Transaction failure rate escalated through the night: 80% (00:48 WAT) → declined to 33% (01:06) → re-elevated to 50–57% (01:22–01:54) → **100% (03:50 WAT) → 100% (04:06 WAT)**. No human escalation filed at any point.

## Sources
email DCIR TEAMAPT Monitoring Service Alerts 19:06 WAT (40.65%), 23:20 WAT (20.4%), 23:36 WAT (66.0%) Apr 15; email Segun Ogunsola (Parallex) 02:29 WAT Apr 16 (server restart completed); email Rasheed Olanrewaju (UBA) 02:46 WAT Apr 16 (Direct Card restart completed); email Onyinye Nweke 19:24 WAT Apr 15 (Access Bank vulnerabilities all closed); email Segun Ogunsola → [[Babajide Ojoboorun]] 11:09 WAT Apr 15 (DCIR DB INDEX JOB FAILURE); email [[Babajide Ojoboorun]] → Segun Ogunsola 11:07 WAT Apr 15 (Re: Authentication Error Message Exposure — remediation in flight); email [[Babajide Ojoboorun]] 17:55 WAT Apr 8; jira TDSD-6439, TDSD-6477, TDSD-6479, TDSD-6497, TDSD-6499; email DCIR monitoring alerts 00:48–04:06 WAT Apr 14; briefing-2026-04-16 B1

## Deltas
- 2026-04-09 17:02 WAT — [[Access Bank]] ACS P1: mandate creation failed 09:20–13:40 WAT.
- 2026-04-10 01:13 WAT — TDSD-6479 third consecutive deploy window missed.
- 2026-04-10 09:09 WAT — NEW P1: Fidelity DD transactions stuck since 02:00 WAT.
- 2026-04-10 13:00 WAT — Fidelity DD P1 RESOLVED (11h7min).
- 2026-04-11 01:09 WAT — FIFTH CONSECUTIVE MISSED WINDOW CONFIRMED.
- 2026-04-11 19:46 WAT — DCIR Stanbic server memory 94.97%.
- 2026-04-12 16:36 WAT — CTO confirmed TDSD-6479 Harness migration approved.
- 2026-04-14 04:11 WAT — 100% DCIR failure. Immediate alert dispatched.
- 2026-04-15 11:09 WAT — Parallex DCIR DB INDEX JOB FAILURE; remediation in flight.
- 2026-04-15 19:09 WAT — DCIR monitoring resumed: 40.65% failure warning.
- 2026-04-16 06:23 WAT — **DCIR/Wema overnight escalation: 20.4% → 66.0%.** Remediation demonstrably failed. Parallex server restart completed, awaiting DCIR interchange routing. UBA Direct Card restart completed. Access Bank vulnerabilities confirmed all closed.