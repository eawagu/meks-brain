---
role: cto-teamapt
type:
  - "situation"
title: Access Bank — Multi-Track Failures
status: developing
created: "2026-04-11T16:44:53Z"
summary: "Five concurrent failure tracks: ATS RC91 (three cycles in 36h), DD mandate failures, settlement insufficient balance, DCIR/ACS credential remediation. Access participant reports from Mar 2025 still pending."
updated: "2026-04-11T20:12:01Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Five concurrent tracks on [[Access Bank]]: (1) ATS RC91 — three cycles in 36h (Apr 10 03:38, Apr 10 20:17, Apr 11 20:41 WAT; [[Innocent Nwaokorie]] escalated to bank Card Switching Team each time). (2) DD mandate creation failures linked to ongoing credential remediation. (3) Settlement Apr 8 failed (Insufficient Balance, per Duty Handover). (4) DCIR/ACS credential remediation ([[TDSD-6477]] Authorize, [[TDSD-6489]] Awaiting Implementation). (5) ACS P1 (Apr 9, 4h20min) linked to credential remediation chain. Access participant reports from Mar 3, 2025 still pending. Cycle frequency: 3 in 36h — pattern is persistent and unresolved. Access is now one of 6 banks in the current multi-bank RC91 pattern.

## Sources
slack #teamapt-tech-operations; email [[Innocent Nwaokorie]] 20:17 WAT Apr 10; email Access Bank DD/settlement threads; jira TDSD-6477, TDSD-6489; email [[Innocent Nwaokorie]] 20:41 WAT Apr 11

## Deltas
- 2026-04-10 07:00 WAT — New RC91 cycle 03:38–04:12 WAT (34 min). DD mandate creation failures active. [[Yasir Syed Ali]] committed to review JAR scan today. TDSD-6489 filed, Awaiting Implementation.
- 2026-04-11 20:41 WAT — Third RC91 cycle: [[Innocent Nwaokorie]] reported to Access Bank Card Switching Team at 20:41 WAT. No resolution signal yet. Three cycles in 36h.