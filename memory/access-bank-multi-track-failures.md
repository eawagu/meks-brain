---
role: cto-teamapt
type:
  - "situation"
title: Access Bank — Multi-Track Failures
status: developing
created: "2026-04-11T16:42:53Z"
summary: "Seven RC91 cycles over ~9 days (Apr 10–18), all bank-auto-recovered in 3–50m. Apr 19 00:00→07:50 WAT event was a scheduled Access maintenance window, NOT an RC91 cycle — reclassified out of the pattern. NEW Apr 19 09:27–09:45 WAT: first RC06 card-layer fast-cycle P1 on Access (18m, bank-resolved). DD mandate, settlements (Apr 8 + Apr 11), DCIR/ACS credential remediation, JAR vulnerability scan open. 3DS track still latent-unresolved."
updated: "2026-04-26T05:31:34Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Eight concurrent tracks on [[Access Bank]]: (1) ATS RC91 — **eight cycles in ~16 days** (Apr 10 03:38, Apr 10 20:17, Apr 11 20:41, Apr 12 02:24, Apr 17 01:05, Apr 18 12:49, Apr 18 20:15, **Apr 26 02:05 WAT**). Cycles 1–7 all bank-auto-recovered in 3–50m. **Cycle 8 (Apr 26 02:05 WAT) breaks the auto-recovery pattern: 4h05m+ active at briefing tick (06:10 WAT), exceeds the 3–50m envelope by >4×.** Plus a brief Apr 25 02:21 WAT 11-minute auto-recovered cycle that did not enter the count given its absence from a formal P1 post. The Apr 19 00:00→07:50 WAT event was reclassified out as a **scheduled Access maintenance window**. (2) DD mandate creation failures linked to ongoing credential remediation. (3) Settlement failures: Apr 8 + Apr 11. (4) DCIR/ACS credential remediation (TDSD-6477 / TDSD-6489). (5) ACS P1 (Apr 9, 4h20min). (6) Access 3DS Unreachable (RC 504, Apr 14) — latent-unresolved. (7) Apr 15 pen-test critical-vulnerability chain — closed. (8) Apr 17 JAR Vulnerabilities Remediation — re-opened. (9) Apr 19 09:27–09:45 WAT RC06 card-layer fast-cycle.

**Cycle 8 (Apr 26 02:05 WAT — ANOMALOUS DURATION, breaks pattern):** [[Qazim Adedigba]] filed in #teamapt-tech-operations at 02:05 WAT Apr 26, structured P1 post: "Product: ATS, Incident Summary: P1: Access Bank RC 91 Failures, Identified Cause: From the bank, Resolution Action: Issue escalated to the bank for resolution, Incident Duration: Ongoing, Start Time: 2:05 AM, End Time: Ongoing." [[TDSD-6729]] filed 02:24 WAT (Medium, [System] Incident, Qazim reporter+assignee, Work in progress, Resolution null). 4h05m active at 06:10 WAT briefing tick — exceeds prior 7-cycle upper bound (50m) by >4×. **First Access Bank RC91 cycle to break the auto-recovery pattern.** Slack-to-Jira lag 19min (shorter than ~30–60min prior median for Service Desk Incidents — Jira-track presence is intact for cycle 8, contrast with TDSD-6729's parallel CoralPay ZIB cycle this morning that has no TDSD ticket). Concurrent with [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] Apr 26 02:01 WAT P1 (4 minutes earlier) — possible upstream common-mode signal but no NIBSS-layer activity overnight to confirm. Combined Immediate-tier Slack DM dispatched to user at 06:10 WAT post-overnight-delegation resume. Briefing-2026-04-26 D2 covers three options: hold to ops cycle, CTO DM to Qazim/Olamide anchoring cycle-8-anomaly framing, or direct CTO outreach to Access Bank IT director.

**(6) Access 3DS Unreachable — RC 504** (Apr 14 11:58 WAT): Olamide emailed Access Card Switching Team — 3DS server failure, RC 504 gateway timeout. Card-not-present authentication path. Still silent — drifted into latent-unresolved.

**(7) Apr 15 19:24 WAT: pen-test vulnerability chain closed.** [[Onyinye Nweke]] confirmed all AptPay web-server issues fixed.

**(8) Apr 17 JAR Vulnerabilities Remediation — re-opened.** Open track.

**(9) Apr 19 09:27–09:45 WAT: ATS RC06 fast-cycle P1.** First RC06 observation on Access (18m, bank-resolved).

Cycle 6 (Apr 18 12:49 WAT): 11-minute bank-auto-recovery, no TDSD raised. Cycle 7 (Apr 18 20:15–20:18 WAT): 3-minute bank-auto-recovery, TDSD-6620 Resolved 20:25 WAT — part of evening-wave concurrence pattern.

**Apr 19 00:00→07:50 WAT — NOT a cycle. Scheduled Access maintenance window.** Reclassified per direct user (CTO) correction during triage.

Remaining open tracks: Settlement (2), DD mandate failures, DCIR/ACS credential remediation, 3DS latent-unresolved, JAR vulnerabilities re-opened, RC06 card-layer (Apr 19), **RC91 cycle 8 anomalous-duration ongoing (Apr 26)**.

## Sources
slack #teamapt-tech-operations; email [[Innocent Nwaokorie]] 20:17 WAT Apr 10; email Access Bank DD/settlement threads; jira TDSD-6477, TDSD-6489, TDSD-6593, TDSD-6620, TDSD-6625, **TDSD-6729 (NEW Apr 26 02:24 WAT, Medium, [System] Incident, Work in progress, Qazim Adedigba)**; email [[Innocent Nwaokorie]] 20:41 WAT Apr 11; email [[Mudiakevwe Omuvwie]] 21:31 WAT Apr 11; email Daily Report #20260411; email [[Olamide Ajibulu]] 02:24 WAT Apr 12; email [[Mudiakevwe Omuvwie]] 02:58 UTC Apr 12; email [[Olamide Ajibulu]] "Access 3DS Unreachable | 20260414|504" 11:58 WAT Apr 14; email [[Onyinye Nweke]] "Re: CRITICAL VULNERABILITY ON APTPAY WEB SERVER" 19:24 WAT Apr 15; email Duty Handover Note 20260416 (00:19 WAT Apr 17, [[Qazim Adedigba]]); email Adeolu Victory Atilade "Re: ACCESS BANK VULNERABILITIES REMEDIATION JAR FILE SCAN REPORT" 08:32 WAT Apr 17; email Babajide Ojoboorun fwd + ack 08:46–08:47 WAT Apr 17; slack #teamapt-tech-operations Qazim 01:10 WAT Apr 18 cycle 6; slack #teamapt-tech-operations Afeez 20:23 WAT Apr 18 cycle 7 + TDSD-6620; user correction 2026-04-19 triage (scheduled maintenance reclassification); slack Daniel Armstrong 09:50 WAT Apr 19 RC06; email "Access | RC06 | 20260419"; **slack #teamapt-tech-operations Qazim 02:05 WAT Apr 26 cycle 8 P1 post (Ongoing); briefing-2026-04-26 D2 + A2.**

## Deltas
- 2026-04-10 07:00 WAT — New RC91 cycle 03:38–04:12 WAT (34 min). DD mandate creation failures active.
- 2026-04-11 20:41–21:31 WAT — Third RC91 cycle ~50m bank-resolved.
- 2026-04-12 00:09 WAT — Daily Report #20260411: Access settlements 10am failed.
- 2026-04-12 02:24–03:04 WAT — Fourth RC91 cycle ~40 min. Four cycles in 48h.
- 2026-04-14 12:09 WAT — Track (6) Access 3DS server unreachable RC 504.
- 2026-04-15 21:09 WAT — Pen-test vulnerability track closed.
- 2026-04-17 01:05 WAT — Fifth RC91 cycle (TDSD-6593, 10m bank-resolved).
- 2026-04-17 10:20 WAT — Track (8) JAR vulnerabilities remediation re-opened.
- 2026-04-18 10:29 WAT — Sixth RC91 cycle (overnight, 11m, no TDSD).
- 2026-04-18 22:09 WAT — Seventh RC91 cycle (evening, 3m, TDSD-6620). Evening-wave concurrence pattern.
- 2026-04-19 07:11–08:50 WAT — Mis-logging of "cycle 8" → reclassified as scheduled maintenance per user correction. RC91 cycle count remains at 7.
- 2026-04-19 10:11 WAT — NEW TRACK (9) Access RC06 card-layer fast-cycle P1 (18m, bank-resolved).
- [2026-04-25 02:32 WAT — brief in-window cycle, captured in briefing-2026-04-25 D2 background] Slack Access Bank brief RC91 02:21–02:32 WAT (11m auto-recovered). Did not formalize as a counted RC91 cycle in this situation page (no formal P1 post; classified as RC91 fast-cycle observation under [[RC91 Multi-Bank Failure Pattern]]).
- **[2026-04-26 06:10 WAT — RC91 CYCLE 8 ANOMALOUS DURATION, BREAKS AUTO-RECOVERY PATTERN]** — [[Qazim Adedigba]] filed Slack #teamapt-tech-operations P1 at 02:05 WAT Apr 26: "Product: ATS, P1: Access Bank RC 91 Failures, Identified Cause: From the bank, Resolution Action: escalated to bank, Incident Duration: Ongoing, Start Time: 2:05 AM, End Time: Ongoing." [[TDSD-6729]] filed 02:24 WAT (Medium, [System] Incident, Qazim reporter+assignee, Work in progress, Resolution null). 4h05m active at 06:10 WAT briefing tick. **First Access Bank RC91 cycle to break the 3–50m bank-auto-recovery pattern of cycles 1–7** — exceeds upper bound by >4×. Slack-to-Jira lag 19min (Jira-track present, contrast with concurrent CoralPay ZIB cycle). Concurrent with [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] Apr 26 02:01 WAT P1 (4 minutes earlier — possible upstream common-mode but no observable NIBSS-layer signal). RC91 cycle count advances to 8 (was 7 since Apr 18 evening cycle 7). Combined Immediate-tier Slack DM dispatched to user at 06:10 WAT post-overnight-delegation resume. Briefing-2026-04-26 D2 covers three options: (1) hold to ops cycle, (2) CTO DM to Qazim/Olamide anchoring cycle-8-anomaly framing, (3) direct CTO outreach to Access Bank IT director. Possible interpretations: (a) deeper bank-side fault than prior cycles, (b) structural change on Access integration, (c) silent ops-side resolution unposted. Two-cycle observation (cycle 8 + concurrent CoralPay ZIB) within minutes raises common-mode-upstream hypothesis — flagged for monitoring; no observable evidence. Factors: source=slack+jira, active_situation_entity_match=access-bank-multi-track-failures, cycle8_breaks_3-50m_auto_recovery_pattern_cycles1_7, anomalous_duration_4x_upper_bound, tdsd6729_filed_19min_post_slack, jira_track_present, immediate_tier_dispatched, post_overnight_delegation_resume, possible_upstream_correlation_with_coralpay_zib, urgency_dominant, pattern_significance_dominant, accountability_alignment.
