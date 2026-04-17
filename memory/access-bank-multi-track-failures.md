---
role: cto-teamapt
type:
  - "situation"
title: Access Bank — Multi-Track Failures
status: developing
created: "2026-04-11T16:44:53Z"
summary: "Five concurrent failure tracks: ATS RC91 (cycle 5 overnight Apr 17 01:05 WAT, TDSD-6593, 10min bank-resolved — breaks 72h quiet window), DD mandate failures, settlement failures (Apr 8 + Apr 11), DCIR/ACS credential remediation. Access participant reports from Mar 2025 still pending."
updated: "2026-04-17T08:38:11Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Seven concurrent tracks on [[Access Bank]]: (1) ATS RC91 — **five cycles now in ~5 days** (Apr 10 03:38, Apr 10 20:17, Apr 11 20:41, Apr 12 02:24, Apr 17 01:05 WAT; all bank-resolved). Cycle 5 detail below. (2) DD mandate creation failures linked to ongoing credential remediation. (3) Settlement failures: Apr 8 (Insufficient Balance, per Duty Handover) AND Apr 11 10am settlement failed (Daily Report #20260411 — "will reconfirm tomorrow"). (4) DCIR/ACS credential remediation ([[TDSD-6477]] Authorize, [[TDSD-6489]] Awaiting Implementation). (5) ACS P1 (Apr 9, 4h20min) linked to credential remediation chain. Access participant reports from Mar 3, 2025 still pending (confirmed in Daily Report #20260411 and re-noted in Duty Handover 20260416).

**(6) Access 3DS Unreachable — RC 504** (Apr 14 11:58 WAT): [[Olamide Ajibulu]] emailed Access Card Switching Team, subject "Access 3DS Unreachable | 20260414|504" — 3DS server failure, RC 504 gateway timeout. Card-not-present authentication path; structurally separate from the RC91 decline pattern. Still silent since — no Slack P1 filed, no resolution email — drifted into latent-unresolved category. No new deltas this tick.

**(7) Apr 15 19:24 WAT: CRITICAL VULNERABILITY chain closed.** [[Onyinye Nweke]] (Access Bank, via aptpaytechnicalsupport) to [[Emeka Joseph]] confirmed all issues raised were fixed (Exposed Heap Dump Endpoint: Closed; Sensitive Data/Passwords: Closed). End-to-end resolution cycle inside one business day. Links back to [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]. No further CTO action on this track; closure archived.

**Cycle 5 (Apr 17 01:05 WAT):** [[Qazim Adedigba]]'s Duty Handover Note 20260416 records a new ATS RC91 cycle filed overnight — TDSD-6593, 10-minute duration, bank-resolved per the Slack thread referenced in the handover. Breaks the 72-hour quiet window (Apr 12 → Apr 17). Cycle frequency: five cycles across ~5 days — roughly one every 24h during active periods, with a mid-window quiet interval. Consistent with the [[RC91 Multi-Bank Failure Pattern]] — bank-side CBA instability + Moniepoint routing-restoration gap.

Remaining open tracks: Settlement (2), DD mandate failures (1), DCIR/ACS credential remediation in ticket family, 3DS latent-unresolved. ATS RC91 cycle frequency back to near-daily.

## Sources
slack #teamapt-tech-operations; email [[Innocent Nwaokorie]] 20:17 WAT Apr 10; email Access Bank DD/settlement threads; jira TDSD-6477, TDSD-6489, TDSD-6593; email [[Innocent Nwaokorie]] 20:41 WAT Apr 11; email [[Mudiakevwe Omuvwie]] 21:31 WAT Apr 11; email Daily Report #20260411; email [[Olamide Ajibulu]] 02:24 WAT Apr 12; email [[Mudiakevwe Omuvwie]] 02:58 UTC Apr 12; email [[Olamide Ajibulu]] "Access 3DS Unreachable | 20260414|504" 11:58 WAT Apr 14; email [[Onyinye Nweke]] "Re: CRITICAL VULNERABILITY ON APTPAY WEB SERVER" 19:24 WAT Apr 15; email Duty Handover Note 20260416 (00:19 WAT Apr 17, [[Qazim Adedigba]])

## Deltas
- 2026-04-10 07:00 WAT — New RC91 cycle 03:38–04:12 WAT (34 min). DD mandate creation failures active. [[Yasir Syed Ali]] committed to review JAR scan today. TDSD-6489 filed, Awaiting Implementation.
- 2026-04-11 20:41 WAT — Third RC91 cycle: [[Innocent Nwaokorie]] reported to Access Bank Card Switching Team at 20:41 WAT. No resolution signal yet. Three cycles in 36h.
- 2026-04-11 21:31 WAT — Third RC91 cycle RESOLVED: [[Mudiakevwe Omuvwie]] confirmed transactions processing fine. Cycle duration ~50 min.
- 2026-04-12 00:09 WAT — Daily Report #20260411: Access settlements 10am failed (will reconfirm tomorrow). Access participant reports from Mar 2025 still pending. Second settlement failure adds to multi-track exposure.
- 2026-04-12 02:24 WAT — Fourth RC91 cycle: [[Olamide Ajibulu]] reported. Follow-up 02:40 WAT. [[Mudiakevwe Omuvwie]] confirmed fine at 02:58 UTC. Olamide confirmed resolution 03:04 WAT. Duration ~40 min. Four cycles in 48h.
- 2026-04-14 12:09 WAT — **Track (6) Access 3DS server unreachable.** Olamide emailed Card Switching Team at 11:58 WAT (10:58 UTC) reporting 3DS server failure RC 504. First card-auth-path incident on Access in this watch window. Email-only at heartbeat time.
- 2026-04-15 21:09 WAT — **Vulnerability-jar track closed.** [[Onyinye Nweke]] 19:24 WAT confirmed all Access pen-test findings fixed. 3DS track still silent since 11:58 WAT Apr 14 (33h, latent-unresolved).
- [2026-04-17 01:05 WAT] — **Fifth RC91 cycle.** TDSD-6593 filed per Duty Handover Note 20260416 (Qazim Adedigba, 00:19 WAT Apr 17 delivery). 10-minute duration, bank-resolved per Slack thread. Breaks the 72-hour quiet window (Apr 12 → Apr 17). Cycle frequency returns to ~daily for ATS RC91.