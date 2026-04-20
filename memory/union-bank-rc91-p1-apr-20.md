---
role: cto-teamapt
type:
  - "situation"
title: Union Bank — RC91 P1 Apr 20
status: retired
created: "2026-04-20T06:17:08Z"
summary: "Union Bank RC91 Apr 20 — two cycles in one day. Cycle 1: 01:17-07:56 WAT (6h39m, bank-resolved, TDSD-6632 Completed 09:47 WAT) — longest Union Bank cycle on record. Cycle 2: 16:22-16:34 WAT (12m fast-cycle, bank auto-recovered, TDSD-6643 Resolved 16:41 WAT). 7th Union Bank cycle in 9 days. Page retired — both cycles fully closed, no further signal value. Pattern significance preserved on [[Union Bank]] entity."
updated: "2026-04-20T16:19:17Z"
cssclasses:
  - "situation"
accountability: operational-reliability
---

[[Union Bank]] RC91 cycle opened 01:17 WAT Apr 20 via email from [[Olamide Ajibulu]] to Union Bank (itechannels@unionbankng.com; CC aptpaytechnicalsupport@teamapt.com) with subject "Union Bank| RC91 | 20260420": *"Please be informed that Union Bank transactions are failing with RC 91. Kindly investigate this issue."* Filing occurred during the overnight delegation window (23:00–06:00 WAT), so Immediate-tier dispatch was deferred to the first in-window tick per config-heartbeat rule.

**Resolution confirmed 07:56 WAT — 6h39m end-to-end. TDSD-6632 formally Completed 09:47 WAT.**

**Full thread chronology (email thread 19da83fdefd2e946):**
1. 01:17 WAT — Olamide initial filing to itechannels@unionbankng.com
2. 01:51 WAT — Olamide "Gentle reminder"
3. 06:53 WAT — Olamide "Please share an update"
4. 07:33 WAT — **Bank first response** — Iyama Victor (Card Infrastructure, Union Bank): *"Dear Team Please reconfirm status"* — standard reconfirm-status prompt (TeamApt becomes next-mover)
5. 07:56 WAT — Olamide confirms: *"Hello Victor, Transactions are now processing successfully"*

**Jira track (cycle 1):**
- 07:21 WAT — TDSD-6632 "Union Bank Failure #RC91" filed by [[Olamide Ajibulu]], Medium priority
- 07:57 WAT — TDSD-6632 marked Completed with comment: *"This was resolved by the bank after 6hrs, 1AM to 7AM"*
- 09:47 WAT — Final ticket metadata sync confirms Completed status (10:09 WAT tick sweep).

**Cycle 2 — 16:22-16:34 WAT fast-cycle (12-minute bank auto-recovery).** After the page was retired at 10:09 WAT following cycle 1 closure, a second RC91 incident opened at 16:22 WAT Apr 20 (8h26m after cycle 1 closure). Posted to #teamapt-tech-operations by [[Qazim Adedigba]] at 16:26:13 WAT (BST) as "P1: Union Bank RC 91 Failures Across Processors". TDSD-6643 "Union Bank | ATS | RC 91 Failure | 20260420" filed at 16:28:54 WAT (Medium priority, Qazim reporter/assignee). Resolution comment at 16:37 WAT: *"Status: Issue resolved. Subsequent transactions are successful. Resolution Action: Transaction auto recovered. Start Time 4:22 PM End Time: 4:34 PM Incident Duration: 12 Minutes"*. Ticket Resolved 16:41 WAT with confirmation: *"Transactions are processing fine now."*

Cycle 2 is a standard fast-cycle within the Union Bank historical envelope (14m–2h10m prior to cycle 1 today; cycle 2 at 12m is tightest of the series). No CTO-direct action; bank auto-recovery path. No re-activation of the situation — cycle 2 closed before the 17:09 WAT tick that discovered it.

**Two-cycle Apr 20 note.** Two RC91 cycles in one calendar day is unusual but not unprecedented (Apr 16 also had 2 cycles). The compounding pattern is the 9-day trajectory: Apr 12 (1), Apr 15 (1), Apr 16 (2), Apr 19 (1), Apr 20 (2) — **7 cycles in 9 days, weekday/weekend agnostic, frequency accelerating**.

**Anomaly framing held for cycle 1.** [[Union Bank]] historical cycle envelope is 14m–2h10m. Cycle 1 at **6h39m bank-side** is 3x the prior longest (Apr 19 cycle, 2h10m). Crossed the config-salience Immediate-tier trigger #2 envelope (>2h anomalous) by 4h+. Bank engagement pattern was the critical weakness — 6h16m silent before first response at 07:33 WAT, then fast closure once engaged. Contrast with [[Stanbic Bank ATS — Persistent RC91 Pattern]] where bank auto-responder fires in 6m. Cycle 2 at 12m matches the Stanbic fast-cycle pattern.

**7th Union Bank RC91 cycle in 9 days** (Apr 12, 15, 16×2, 19, 20×2). Trajectory:
- Apr 12 — isolated
- Apr 15 — isolated
- Apr 16 — two cycles in one day (pattern established)
- Apr 19 — overnight 5-bank wave cycle (2h10m, bank-resolved)
- Apr 20 — two cycles: **cycle 1 6h39m bank-side** (longest on record) + **cycle 2 12m fast-cycle**

The 9-day trajectory shows escalating frequency AND a new longest-duration ceiling. Pattern significance retained for downstream synthesis (Union Bank response-latency signature contrast with Stanbic). **Candidate for persistent pattern page promotion** if cycle recurrence continues beyond 10-day window.

**Process failure flag captured at 07:09 WAT.** briefing-2026-04-20 A2 stated "Overnight delegation window (23:00–06:00 WAT) — no new RC91 P1s beyond Stanbic cycle 31" — this was **false** at briefing time. Calibration MISS note was captured via `capture_note` MISS: prefix during the 07:09 WAT Skim tick. No further action needed — MISS captured upstream of the tuning log.

**Resolution path observed:** bank-owned self-resolution both cycles. Cycle 1: reconfirm-status prompt + "resolved" confirmation. Cycle 2: transaction auto-recovery (no bank intervention required). Consistent with the Union Bank resolution signature (slow first response, bank-side fix once engaged) for cycle 1; Stanbic-like fast-cycle for cycle 2. CTO-direct engagement was NOT required for either cycle despite the cycle-1 6h+ silence.

**Retirement rationale (2026-04-20 10:09 WAT tick, unchanged by cycle 2).** Cycle 1 fully closed at retirement time; cycle 2 opened and closed cleanly at the 17:09 WAT tick with no ambiguity. Signal carries no further tracking value — retaining as `developing` dilutes active-set attention. Historical pattern implications persist on [[Union Bank]] entity page and will surface in any future synthesis of bank-response latency signatures. **Page remains retired**; cycle 2 appended as historical enrichment per delta-log convention.

## Sources
email [[Olamide Ajibulu]] 01:17 WAT Apr 20 (thread 19da83fdefd2e946); email [[Olamide Ajibulu]] 01:51 WAT Apr 20; email [[Olamide Ajibulu]] 06:53 WAT Apr 20; email Iyama Victor (Union Bank) 07:33 WAT Apr 20 (same thread); email [[Olamide Ajibulu]] closure 07:56 WAT Apr 20 (same thread); Jira [[TDSD-6632]] filed 07:21 WAT, Completed 07:57 WAT with comment, ticket metadata sync 09:47 WAT; Slack #teamapt-tech-operations [[Qazim Adedigba]] 16:26:13 WAT Apr 20 (cycle 2 P1 declaration); Jira [[TDSD-6643]] filed 16:28:54 WAT, Resolved 16:41 WAT (cycle 2, 12m auto-recovery); heartbeat Skim tick 07:09 WAT, 08:09 WAT, 10:09 WAT, 17:09 WAT Apr 20

## Deltas
- [2026-04-20 07:09 WAT] — Situation created from Skim tick discovery. 5h52m active, zero bank response across 3 outreach messages at tick time. Immediate-tier DM dispatched. MISS: note captured for 06:09 briefing sweep gap.
- [2026-04-20 08:09 WAT] — **Cycle 1 resolved — bank-side fix.** Bank first response at 07:33 WAT (reconfirm-status prompt), Olamide closure at 07:56 WAT. TDSD-6632 filed 07:21 WAT (post-Skim) and closed 07:57 WAT with comment "resolved by the bank after 6hrs, 1AM to 7AM". End-to-end 6h39m — 3x prior longest Union Bank cycle (Apr 19, 2h10m). Bank-owned resolution path held; CTO-direct engagement was NOT required. Status → resolving. Factors: source=email+jira, cycle_resolution, bank_silent_6h_before_response, longest_union_cycle_on_record, pattern_significance, anomaly_framing_held, accountability_alignment.
- [2026-04-20 10:09 WAT] — **Status → retired.** 10:09 WAT Skim tick Jira sweep confirmed TDSD-6632 Completed at 09:47 WAT (metadata sync, no re-open signal). Cycle 1 fully closed. Retirement per "bias toward retiring when uncertain" — signal carries no further tracking value; active-set attention freed. Pattern implications (6h39m longest-on-record, bank-silent-6h-before-response) persist on [[Union Bank]] entity page. Factors: source=jira, ticket_completion_confirmed, retirement_judgment, active_set_hygiene.
- [2026-04-20 17:09 WAT] — **Cycle 2 surfaced and closed in same tick.** 17:09 WAT Full tick discovered cycle 2 via Slack #teamapt-tech-operations Qazim 16:26 WAT P1 declaration and Jira TDSD-6643 (filed 16:28 WAT, Resolved 16:41 WAT). Total cycle duration 12 minutes (16:22–16:34 WAT), bank auto-recovered. 8h26m gap between cycle 1 closure (07:56 WAT) and cycle 2 opening (16:22 WAT). Cycle 2 is within Union Bank fast-cycle envelope — no anomaly framing, no Immediate dispatch, no re-activation of the retired situation. Two-cycle Apr 20 increments the 9-day trajectory to 7 cycles. No MISS captured — the earlier Slack sweep had correct tick window but initial read used wrong 2025 timestamp; corrected read this tick caught the signal cleanly. Page remains retired; cycle 2 appended as historical enrichment. Factors: source=slack+jira, cycle_2_auto_recovery, within_fast_cycle_envelope, pattern_compounding, 7_cycles_9_days, persistent_pattern_candidate.
