---
role: cto-teamapt
type:
  - "situation"
title: Access Bank — Multi-Track Failures
status: developing
created: "2026-04-11T16:44:53Z"
summary: "Five concurrent failure tracks: ATS RC91 (four cycles in 48h including new Apr 12 cycle resolved in ~40min), DD mandate failures, settlement failures (Apr 8 + Apr 11), DCIR/ACS credential remediation. Access participant reports from Mar 2025 still pending."
updated: "2026-04-12T02:12:11Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Five concurrent tracks on [[Access Bank]]: (1) ATS RC91 — four cycles in 48h (Apr 10 03:38, Apr 10 20:17, Apr 11 20:41 WAT, Apr 12 02:24 WAT; all bank-resolved). Fourth cycle: [[Olamide Ajibulu]] reported at 02:24 WAT Apr 12, escalated to Card Switching Team; [[Mudiakevwe Omuvwie]] confirmed transactions processing fine at 02:58 UTC; Olamide confirmed resolution at 03:04 WAT. Duration: ~40 min. (2) DD mandate creation failures linked to ongoing credential remediation. (3) Settlement failures: Apr 8 (Insufficient Balance, per Duty Handover) AND Apr 11 10am settlement failed (Daily Report #20260411 — "will reconfirm tomorrow"). (4) DCIR/ACS credential remediation ([[TDSD-6477]] Authorize, [[TDSD-6489]] Awaiting Implementation). (5) ACS P1 (Apr 9, 4h20min) linked to credential remediation chain. Access participant reports from Mar 3, 2025 still pending (confirmed in Daily Report #20260411). Cycle frequency: 4 in 48h — pattern is persistent and unresolved. Access is now one of 6 banks in the current multi-bank RC91 pattern.

## Sources
slack #teamapt-tech-operations; email [[Innocent Nwaokorie]] 20:17 WAT Apr 10; email Access Bank DD/settlement threads; jira TDSD-6477, TDSD-6489; email [[Innocent Nwaokorie]] 20:41 WAT Apr 11; email [[Mudiakevwe Omuvwie]] 21:31 WAT Apr 11; email Daily Report #20260411; email [[Olamide Ajibulu]] 02:24 WAT Apr 12; email [[Mudiakevwe Omuvwie]] 02:58 UTC Apr 12

## Deltas
- 2026-04-10 07:00 WAT — New RC91 cycle 03:38–04:12 WAT (34 min). DD mandate creation failures active. [[Yasir Syed Ali]] committed to review JAR scan today. TDSD-6489 filed, Awaiting Implementation.
- 2026-04-11 20:41 WAT — Third RC91 cycle: [[Innocent Nwaokorie]] reported to Access Bank Card Switching Team at 20:41 WAT. No resolution signal yet. Three cycles in 36h.
- 2026-04-11 21:31 WAT — Third RC91 cycle RESOLVED: [[Mudiakevwe Omuvwie]] confirmed transactions processing fine. Cycle duration ~50 min. Bank-resolved, same pattern as prior cycles.
- 2026-04-12 00:09 WAT — Daily Report #20260411: Access settlements 10am failed (will reconfirm tomorrow). Access participant reports from Mar 2025 still pending (TSE aware). Second settlement failure adds to multi-track exposure.
- 2026-04-12 02:24 WAT — Fourth RC91 cycle: [[Olamide Ajibulu]] reported to Access Card Switching Team. Follow-up at 02:40 WAT. [[Mudiakevwe Omuvwie]] confirmed transactions processing fine at 02:58 UTC. [[Olamide Ajibulu]] confirmed resolution at 03:04 WAT. Duration ~40 min. Four cycles in 48h.