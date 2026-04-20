---
role: cto-teamapt
type:
  - "situation"
title: Union Bank — RC91 P1 Apr 20
status: retired
created: "2026-04-20T06:17:08Z"
summary: "Union Bank RC91 cycle opened 01:17 WAT, bank-resolved 07:56 WAT — 6h39m end-to-end; TDSD-6632 formally Completed 09:47 WAT confirming closure. Retired at 10:09 WAT tick — cycle fully closed, bank-owned resolution, no further signal value. 6th Union Bank cycle in 9 days; longest on record (prior 2h10m)."
updated: "2026-04-20T09:14:35Z"
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

**Jira track:**
- 07:21 WAT — TDSD-6632 "Union Bank Failure #RC91" filed by [[Olamide Ajibulu]], Medium priority
- 07:57 WAT — TDSD-6632 marked Completed with comment: *"This was resolved by the bank after 6hrs, 1AM to 7AM"*
- 09:47 WAT — Final ticket metadata sync confirms Completed status (10:09 WAT tick sweep).

**Anomaly framing held.** [[Union Bank]] historical cycle envelope is 14m–2h10m. This cycle at **6h39m bank-side** is 3x the prior longest (Apr 19 cycle, 2h10m). Crossed the config-salience Immediate-tier trigger #2 envelope (>2h anomalous) by 4h+. Bank engagement pattern was the critical weakness — 6h16m silent before first response at 07:33 WAT, then fast closure once engaged. Contrast with [[Stanbic Bank ATS — Persistent RC91 Pattern]] where bank auto-responder fires in 6m.

**6th Union Bank RC91 cycle in 9 days** (Apr 12, 15, 16×2, 19, 20). Trajectory:
- Apr 12 — isolated
- Apr 15 — isolated
- Apr 16 — two cycles in one day (pattern established)
- Apr 19 — overnight 5-bank wave cycle (2h10m, bank-resolved)
- Apr 20 — overnight cycle, **6h39m bank-side** — longest Union Bank cycle on record

The 9-day trajectory shows escalating frequency AND a new longest-duration ceiling. Pattern significance retained for downstream synthesis (Union Bank response-latency signature contrast with Stanbic).

**Process failure flag captured at 07:09 WAT.** briefing-2026-04-20 A2 stated "Overnight delegation window (23:00–06:00 WAT) — no new RC91 P1s beyond Stanbic cycle 31" — this was **false** at briefing time. Calibration MISS note was captured via `capture_note` MISS: prefix during the 07:09 WAT Skim tick. No further action needed — MISS captured upstream of the tuning log.

**Resolution path observed:** bank-owned self-resolution (reconfirm-status prompt + "resolved" confirmation on TeamApt side). Consistent with the Union Bank resolution signature (slow first response, bank-side fix once engaged) rather than the Stanbic fast-cycle signature. CTO-direct engagement was NOT required despite the 6h+ silence.

**Retirement rationale (2026-04-20 10:09 WAT tick).** Cycle fully closed (bank confirmed transactions processing, Jira ticket Completed, no outstanding action). Signal carries no further tracking value — retaining as `resolving` dilutes active-set attention. Historical pattern implications persist on [[Union Bank]] entity page and will surface in any future synthesis of bank-response latency signatures.

## Sources
email [[Olamide Ajibulu]] 01:17 WAT Apr 20 (thread 19da83fdefd2e946); email [[Olamide Ajibulu]] 01:51 WAT Apr 20; email [[Olamide Ajibulu]] 06:53 WAT Apr 20; email Iyama Victor (Union Bank) 07:33 WAT Apr 20 (same thread); email [[Olamide Ajibulu]] closure 07:56 WAT Apr 20 (same thread); Jira [[TDSD-6632]] filed 07:21 WAT, Completed 07:57 WAT with comment, ticket metadata sync 09:47 WAT; heartbeat Skim tick 07:09 WAT Apr 20; heartbeat Skim tick 08:09 WAT Apr 20; heartbeat Skim tick 10:09 WAT Apr 20

## Deltas
- [2026-04-20 07:09 WAT] — Situation created from Skim tick discovery. 5h52m active, zero bank response across 3 outreach messages at tick time. Immediate-tier DM dispatched. MISS: note captured for 06:09 briefing sweep gap.
- [2026-04-20 08:09 WAT] — **Cycle resolved — bank-side fix.** Bank first response at 07:33 WAT (reconfirm-status prompt), Olamide closure at 07:56 WAT. TDSD-6632 filed 07:21 WAT (post-Skim) and closed 07:57 WAT with comment "resolved by the bank after 6hrs, 1AM to 7AM". End-to-end 6h39m — 3x prior longest Union Bank cycle (Apr 19, 2h10m). Bank-owned resolution path held; CTO-direct engagement was NOT required. Status → resolving. Factors: source=email+jira, cycle_resolution, bank_silent_6h_before_response, longest_union_cycle_on_record, pattern_significance, anomaly_framing_held, accountability_alignment.
- [2026-04-20 10:09 WAT] — **Status → retired.** 10:09 WAT Skim tick Jira sweep confirmed TDSD-6632 Completed at 09:47 WAT (metadata sync, no re-open signal). Cycle fully closed. Retirement per "bias toward retiring when uncertain" — signal carries no further tracking value; active-set attention freed. Pattern implications (6h39m longest-on-record, bank-silent-6h-before-response) persist on [[Union Bank]] entity page. Factors: source=jira, ticket_completion_confirmed, retirement_judgment, active_set_hygiene.
