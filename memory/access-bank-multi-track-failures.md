---
title: Access Bank — Multi-Track Failures
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-11T16:44:53Z"
updated: "2026-04-11T16:44:53Z"
summary: "Four concurrent failure tracks: ATS RC91 (two cycles in 24h), DD mandate failures, settlement insufficient balance, DCIR/ACS credential remediation. Access participant reports from Mar 2025 still pending."
---

Four concurrent tracks on [[Access Bank]]: (1) ATS RC91 — two cycles in 24h (Apr 10 03:38 + Apr 10 20:17, [[Innocent Nwaokorie]] escalated to bank). (2) DD mandate creation failures linked to ongoing credential remediation. (3) Settlement Apr 8 failed (Insufficient Balance, per Duty Handover). (4) DCIR/ACS credential remediation ([[TDSD-6477]] Authorize, [[TDSD-6489]] Awaiting Implementation). Access participant reports from Mar 3, 2025 still pending. ACS P1 (Apr 9, 4h20min) linked to credential remediation chain.

## Sources
slack #teamapt-tech-operations; email [[Innocent Nwaokorie]] 20:17 WAT Apr 10; email Access Bank DD/settlement threads; jira TDSD-6477, TDSD-6489

## Deltas
- 2026-04-10 07:00 WAT — New RC91 cycle 03:38–04:12 WAT (34 min). DD mandate creation failures active. [[Yasir Syed Ali]] committed to review JAR scan today. TDSD-6489 filed, Awaiting Implementation.