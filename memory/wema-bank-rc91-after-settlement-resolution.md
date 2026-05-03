---
role: cto-teamapt
type:
  - "situation"
title: Wema Bank — RC91 After Settlement Resolution
status: developing
created: "2026-04-11T16:44:43Z"
summary: "May 3 cycle (post-Apr-17 series-resumption): TDSD-6820 RC91+Portal P1 filed 01:30 WAT, status Work in progress at 08:20 WAT update. 10h08m+ active at 10:10 WAT skim-tick. Olusegun Eladiya (Wema) 07:17 WAT reply asks us to reroute — structural shift from Apr 8–17 bank-resolved series. Qazim separate Session Request email 08:55 WAT for pending settlements. Hourly Report 07:07 WAT 11/17 operational (vs Daily Report 13/17) — 2 additional routes off, possibly including Wema. Slack #teamapt-tech-operations silent in 4h window post-briefing."
updated: "2026-05-03T09:16:57Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Settlement track ([[TDSD-6446]]) completed Apr 8 by [[Emeka Joseph]]. Seven RC91 cycles with accelerating-then-stabilizing frequency:

1. **Apr 8 evening:** 19:47–20:10 WAT (23 min, bank-resolved, [[Olamide Ajibulu]])
2. **Apr 11 overnight:** 00:30–01:00 WAT (30 min, bank-resolved)
3. **Apr 11 evening:** ~19:21–19:32 WAT (~11 min, bank-resolved, [[Korede Oladunjoye]] confirmed)
4. **Apr 12 midnight:** Filed 00:30 WAT by [[Olamide Ajibulu]] (email to Wema Switching and Payments, 00:40 WAT). Slack P1 posted at 00:43 WAT. Resolution status unknown — no confirmation signal received before cycle 5 began.
5. **Apr 12 03:41 WAT:** Filed by [[Olamide Ajibulu]] (email to [[Wema Bank]] Switching and Payments Services at 03:41 WAT). Transactions failing with RC91 and high processing time.
6. **Apr 16 19:06 WAT:** Filed by [[Olamide Ajibulu]] to Wema Switching and Payments Services. RC91 with high processing time. Wema (Olusegun Eladiya) confirmed processing fine at 19:33 WAT. [[Olamide Ajibulu]] confirmed resolution at 19:46 WAT. ~40 min cycle.
7. **Apr 17 08:54 WAT:** Filed by [[Afeez Kazeem]] to Switching and Payments Services. [[Amonetsone Gbubemi]] confirmed transactions processing at 08:58 WAT (~4 min bank response). Afeez confirmed at 09:19 WAT. Fastest cycle of the series — indicates bank-side visibility is sharp, resolution capacity is there; the underlying generator is still firing.

**Apr 15 remediation:** [[Emeka Joseph]] had a call with [[Amonetsone Gbubemi]] (Wema Switching and Payment Officer, Enterprise Technology Management) and followed up via email at 11:30 WAT Apr 15 asking Wema DB team to execute the outlined script so the completed settlement transactions could be updated to successful status. Amonetsone responded 11:43 WAT Apr 15: "This has been treated." — Wema-side remediation script EXECUTED.

**DCIR failure rate trajectory (post-remediation):**
- 19:06 WAT Apr 15: **40.65%** (2× threshold) — first breach since Apr 14 04:06 WAT 100% episode
- 23:20 WAT Apr 15: **20.4%** (just above threshold) — brief dip
- 23:36 WAT Apr 15: **66.0%** (3.3× threshold) — sharp overnight escalation
- 19:06 WAT Apr 16: **25.26%** — DCIR monitoring alert (threshold 20%)
- 20:06 WAT Apr 16: **26.68%** — rising again
- 08:50 WAT Apr 17: **25.98%** — still persistent

The DCIR failure rate has stabilized in the 25–27% range after the 66% overnight peak. Six readings above threshold across ~38 hours. The DB remediation script addressed stuck-state settlement transactions but is a different layer from the DCIR failure root cause. The underlying failure generator is still active.

Pattern: Seven cycles over 9 days (Apr 8–17). No Jira tickets filed for any of the seven RC91 cycles. Jira connector blindness (source-config-jira 125+ ticks) means any post-hoc filings are unverifiable.

## Sources
email Wema RC91 thread 19:48–20:01 WAT Apr 8; jira TDSD-6446 Completed; slack #teamapt-tech-operations; email Wema RC91 19:21–19:32 WAT Apr 11; email Wema RC91 00:40 WAT Apr 12; slack #teamapt-tech-operations 00:43 WAT Apr 12; email Wema RC91 03:41 WAT Apr 12; email STATUS UPDATE thread Emeka Joseph ↔ Amonetsone Gbubemi 11:30–11:43 WAT Apr 15; email DCIR TEAMAPT Monitoring Service Alert 19:06 WAT Apr 15 (40.65%); email DCIR TEAMAPT Monitoring Service Alert 23:20 WAT Apr 15 (20.4%); email DCIR TEAMAPT Monitoring Service Alert 23:36 WAT Apr 15 (66.0%); email Wema RC91 19:06–19:46 WAT Apr 16; email DCIR TEAMAPT Monitoring Service Alert 19:06 WAT Apr 16 (25.26%); email DCIR TEAMAPT Monitoring Service Alert 20:06 WAT Apr 16 (26.68%); email Wema RC91 08:54–09:19 WAT Apr 17 (cycle 7); email DCIR TEAMAPT Monitoring Service Alert 08:50 WAT Apr 17 (25.98%); slack+email+jira [[TDSD-6820]] May 3 RC91+Portal P1 thread (Qazim 00:36 WAT Slack post; Qazim → Wema team email 23:32 UTC May 2 / 00:32 WAT May 3; Hadiza Abubakar ack 01:20 WAT; Olusegun Eladiya reply 06:17 WAT requesting reroute); email "Wema Bank | Session Request | 20260503" Afeez Kazeem 07:55 WAT requesting session re pending settlements; email Hourly Reports 20260503 Qazim Adedigba 05:26 / 07:07 WAT (11/17 operational — 2 more routes off vs Daily Report's 13/17; Wema route plausibly turned off pending confirmation)

## Deltas
- 2026-04-11 01:09 WAT — New RC91 cycle overnight: 00:30–01:00 WAT (30 min, bank-resolved). Second Wema RC91 cycle.
- 2026-04-11 19:32 WAT — Third RC91 cycle: ~11 min. Two cycles in one day — frequency increasing.
- 2026-04-12 00:43 WAT — Fourth RC91 cycle filed. Three cycles in 28 hours.
- 2026-04-12 03:41 WAT — Fifth RC91 cycle filed. Four cycles in ~27 hours.
- 2026-04-15 12:09 WAT — Remediation executed. Wema DB script run.
- 2026-04-15 19:09 WAT — Post-remediation DCIR failure signal. 40.65% failure warning.
- 2026-04-16 06:23 WAT — **Overnight DCIR escalation confirmed remediation failure.** Two alerts overnight: 20.4% (23:20 WAT) → 66.0% (23:36 WAT). Rate peaked at 3.3× threshold — 2 in 3 transactions failing. Three data points post-remediation confirm the DB script did not address the DCIR failure root cause. Briefing-2026-04-16 B1 Decision item — route disposition needed.
- 2026-04-16 19:09 WAT — **Sixth RC91 cycle.** Filed 19:06 WAT, resolved 19:46 WAT (~40 min). DCIR failure rate still above threshold: 25.26% (19:06) → 26.68% (20:06). Failure rate stabilized in 25-27% range — down from 66% peak but persistent.
- 2026-04-17 10:20 WAT — **Seventh RC91 cycle.** Filed 08:54 WAT Apr 17 by [[Afeez Kazeem]]. [[Amonetsone Gbubemi]] confirmed processing fine at 08:58 WAT (~4 min). Afeez confirmed at 09:19 WAT. DCIR alert at 08:50 WAT Apr 17: 25.98% — sixth consecutive reading in the 25–27% band. Failure generator still active; bank-side response is sharpening (4-min cycle) but underlying root cause not addressed.
- 2026-05-03 10:10 WAT — **NEW cycle (post-Apr-17 series-resumption) — RC91 + Portal compound P1 active 10h08m+ at this tick observation; bank-asks-us-to-reroute posture is structurally distinct from Apr 8–17 series where bank resolved cycles bank-side.** [[TDSD-6820]] "Wema Bank | ATS | Transactions and Portal Incident | 20260503" filed 01:30 WAT (per briefing B1); status **Work in progress** at 08:20 WAT update (Afeez Kazeem assignee). [[Qazim Adedigba]] structured P1 Slack post 00:36 WAT (Start 12:04 AM, RC91 + Portal compound). Bilateral email "Wema Bank | ATS | Transactions and Portal Incident | 20260503" thread evolution: Qazim → Wema team 00:32 WAT; Hadiza Abubakar ack 01:20 WAT "Mail Acknowledged and currently receiving attention"; Qazim → Hadiza 06:27 WAT "We can reach the portal now, but transactions are still failing with RC 91 even after restarting the services. Kindly assist cure" — portal recovered, RC91 persists post-service-restart; **[[Olusegun Eladiya]] (Wema) reply 07:17 WAT (06:17 UTC): "Kindly reroute transactions and confirm status accordingly"** — bank explicitly asking TeamApt to handle rather than fixing bank-side. This is a structural shift from the Apr 8–17 series (where Wema-side resolutions were the norm), and aligns with route-off direction. Concurrent: Qazim email "Wema Bank | Session Request | 20260503" 08:55 WAT (07:55 UTC) to switching&payments_services@wemabank.com requesting session "to review and treat pending settlements" (settlements layer — distinct or extension of TDSD-6820 workflow; resembles Stanbic session pattern from briefing-2026-05-02 B2). Qazim Hourly Reports 20260503 07:07 WAT shows **11 of 17 routes operational** (vs Daily Report 20260503 00:00 WAT 13 of 17) — 2 additional routes off in 7-hour interval; explicit list (FBN, PVB, SBP, Ecobank) accounts for 4 only — the other 2 unaccounted-for routes plausibly include Wema (consistent with bank-asks-reroute posture); requires confirmation. **Downstream signal:** [[Peter Ile]] posts in #monieworld-monnify reporting Wema disbursement timeouts (per briefing B1) suggesting Wema impact extends beyond ATS RC91 layer. Active-P1 silence Immediate trigger #2 (>2h) crossed at 02:04 WAT; briefing tick caught this at 06:12 WAT and dispatched B1 Decision item; this 10:10 WAT skim-tick observes additional bank-side response (Olusegun reroute instruction) but **no Slack closure post in 4h window** (06:12 → 10:10 WAT — Slack #teamapt-tech-operations entirely silent). No new Immediate dispatch this tick — enriching info on already-in-briefing item B1; user gets fresh context at next triage. Factors: source=slack+email+jira, active_situation_match=wema-rc91, immediate_trigger_2_p1_duration_10h08m, bank_asks_reroute_structural_shift, hourly_report_11_of_17_routes_operational_unaccounted_2_routes, downstream_monnify_disbursement_timeouts_per_briefing_b1, separate_session_request_settlements_layer, slack_silence_4h_window_no_closure_post, jira_status_still_wip, accountability_alignment_high, pattern_significance_post_series_resumption_with_structural_shift, no_new_immediate_dispatch_enriches_briefing_b1.