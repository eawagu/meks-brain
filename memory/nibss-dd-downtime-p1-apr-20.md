---
role: cto-teamapt
type:
  - "situation"
title: NIBSS DD — Downtime P1 Apr 20
status: developing
created: "2026-04-20T05:23:14Z"
summary: "NIBSS DD downtime P1 (TDSD-6630) filed 05:18 WAT Apr 20 by Frances Omelu. 2026-04-22 16:15 WAT tick: TDSD-6683 (Apr 22 P2 cycle) now Completed in Jira at 15:01 WAT — formal closure of the Apr 22 cycle. TDSD-6630 itself still no movement (comment silence ~58h48m, any-update silence ~55h57m). Slack Tier 1 quiet since 15:15 WAT — no new NIBSS customer-facing signal followed the 15:11 WAT retraction, nudging toward housekeeping-only interpretation. Adjacent NIBSS family noise (TDSD-6687 NIP, TDSD-6686 glitch, TDSD-6673 VPN flap) all fast-close. Retirement bar rising — default retire at briefing-2026-04-23 compose unless fresh signal."
updated: "2026-04-22T15:18:31Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] Direct Debit downtime P1 raised via [[TDSD-6630]] at 2026-04-20 05:18 WAT by [[Frances Omelu]], updated 05:59 WAT, Medium priority, Work in progress at the 06:09 WAT briefing tick. Filing occurred during the overnight delegation window (23:00–06:00 WAT), so surfacing was deferred to the 06:09 briefing tick per config-heartbeat rule.

**Structural parallel to retired Apr 14 NIBSS DD P1.** The prior [[NIBSS DD — Pending Mandate P1 Active]] situation (filed 07:05 WAT Apr 14, retired 06:23 WAT Apr 16 after 47h silence, implicit-resolve) exhibited identical pattern: filed, escalated to NIBSS, then silent without human closure. Apr 20 filing repeats the same structural defect that [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] tracks as recurring "silent recovery without human closure" concern. **Apr 22 adds a third data point:** separate P2 cycle filed 10:40 WAT Apr 22 (TDSD-6683), resolved 13:05 WAT Apr 22 Slack-level (2h25m), and now officially Completed in Jira at 15:01 WAT Apr 22 — this one reached explicit closure, but the original TDSD-6630 still has no closure comment.

**User triage:** briefing-2026-04-20 B1 overridden by user — deferred to 2026-04-21 briefing with no action, no commitment. briefing-2026-04-21 never fired (gap — see briefing-2026-04-22 B5). briefing-2026-04-22 did not re-raise TDSD-6630 Immediate as original triage-deferral still holds. **Immediate-tier re-dispatch remains suppressed** per triage-deferred state.

**Comment silence timeline (TDSD-6630 specifically).**
- 05:23 WAT Apr 20 — [[Frances Omelu]] comment: "Pending create mandate transactions cleared before 3am, and we noticed a decrease in pending debit mandate request count. The count kept dropping up until 4:30am, but started to go back up at 4:32am."
- 05:27 WAT Apr 20 — [[Frances Omelu]] public comment: "This has been escalated to NIBSS for review and resolution."
- 08:18 WAT Apr 20 — metadata refresh (last any-update).
- 16:15 WAT Apr 22 tick — **comment silence ~58h48m** since 05:27 WAT Apr 20, **any-update silence ~55h57m** since 08:18 WAT Apr 20. Still Work in progress.

**Apr 22 P2 cycle — reached Slack-level resolution and Jira-level Completion.**
- 10:40 WAT Apr 22 — pending mandate P2 signal filed in #teamapt-tech-operations. Surfaced as briefing-2026-04-22 B4 (Briefing-tier, not Immediate due to P2 priority).
- 13:05 WAT Apr 22 — thread resolved in Slack. Duration 2h25m.
- 15:01 WAT Apr 22 — TDSD-6683 "PENDING CREATE MANDATE REQUEST" transitioned to Completed in Jira (confirms the thread-level resolution with formal closure in ticketing).
- This confirms the 3-in-9-days pattern: Apr 14 (retired, 47h silence), Apr 20 TDSD-6630 (still silent 55h+), Apr 22 (explicit close Slack + Jira).
- The Apr 22 cycle does not directly resolve TDSD-6630 (separate incident window), but its Slack+Jira close compounds evidence that the product's silent-recovery pattern is partially behavioral on TDSD-6630 specifically (NIBSS side moves on without ticket closure on that ticket, while a parallel ticket in the same product gets properly closed).

**Carryforward signal — 15:11 WAT Apr 22 NIBSS customer-facing retraction (update 16:15 WAT).**
- In-channel message retracting earlier NIBSS customer-facing comms observed at 15:11 WAT Apr 22.
- 16:15 WAT Apr 22 tick: **Tier 1 Slack channels silent since 15:15 WAT** (5/5 channels zero new messages, including #teamapt-tech-operations). No new NIBSS customer-facing signal followed the retraction in the subsequent hour. One data point toward the housekeeping-only interpretation (retraction of stale Apr 20 comms after the Apr 22 cycle resolved), but one tick is not enough to close the ambiguity. Next tick (17:00 WAT or thereafter) determines whether this holds.

**Adjacent NIBSS-family signals (16:15 WAT tick).**
- TDSD-6687 "DISBURSEMENT DOWNTIME (NIP) 20260422" filed + Completed fast-cycle (16:06 WAT Completion, Frances-assigned, Medium). Distinct product (NIP disbursement, not NIBSS DD mandate) — no direct bearing on TDSD-6630. Consistent with the TDSD-6627 / TDSD-6583 NIP family of fast-cycle downtime tickets — product-level noise rather than situation-level signal.
- TDSD-6686 "NIBSS SYSTEM GLITCH" Completed 14:48 WAT Apr 22 — housekeeping closure, Olamide Ajibulu-assigned. Not NIBSS DD specific.
- TDSD-6673 "NIBSS VPN flap 20260421" Completed 14:22 WAT Apr 22 — housekeeping closure of Apr 21 incident already captured in briefing-2026-04-22 A2.

**Retirement posture (16:15 WAT tick update).** Strict reading of retirement bias ("when uncertain, retire") still pushes retirement — TDSD-6630 silent 55h+, Apr 22 cycle fully closed (Slack + Jira), pattern precedent established, Slack channel quiet with no fresh customer-facing NIBSS signal. The 15:11 WAT retraction ambiguity is weakening as one hour of silence accumulates toward the housekeeping-only interpretation. **Retirement decision remains deferred to briefing-2026-04-23** pending one more tick's worth of signal clarity — but the bar for keeping this situation developing is rising. If the next tick confirms no fresh customer-facing NIBSS signal, retirement at briefing-2026-04-23 compose time is the default path.

## Sources
jira TDSD-6630 (comments 4757564, 4757577; created 05:18 WAT Apr 20; metadata 08:18 WAT Apr 20 — no further updates); slack #teamapt-tech-operations NIBSS DD P2 thread 10:40 WAT Apr 22 → resolved 13:05 WAT Apr 22; jira TDSD-6683 Completed 15:01 WAT Apr 22 (formal closure of the Apr 22 P2 cycle); slack #teamapt-tech-operations NIBSS customer-facing comms retraction 15:11 WAT Apr 22; jira TDSD-6687 NIP Disbursement Downtime filed+Completed 16:06 WAT Apr 22 (adjacent-NIBSS-product noise, not TDSD-6630-relevant)

## Deltas
- 2026-04-20 05:18 WAT — TDSD-6630 filed by Frances Omelu during overnight delegation window.
- 2026-04-20 05:23 WAT — Frances Omelu internal comment on mandate count dynamics (drop to 4:30am, climb from 4:32am).
- 2026-04-20 05:27 WAT — Frances Omelu public comment: escalated to NIBSS. Comment-clock starts here.
- 2026-04-20 06:09 WAT — surfaced as B1 in briefing-2026-04-20.
- 2026-04-20 08:18 WAT — last any-update (metadata-only).
- 2026-04-20 08:47 WAT — user overrode B1 triage: deferred to 2026-04-21 briefing, no action, no commitment. Immediate re-dispatch suppressed per triage-deferred state.
- 2026-04-20 09:15 WAT — 09:09 tick: comment silence 3h42m, any-update silence 51m. No re-dispatch.
- 2026-04-20 10:09 WAT — tick: comment silence 4h42m, any-update silence 1h51m. No re-dispatch.
- 2026-04-20 14:09 WAT — tick: comment silence 8h42m, any-update silence 5h51m. Still WIP. Silent-recovery pattern match with retired Apr 14 precedent continues; user-deferral holds through afternoon.
- 2026-04-20 17:09 WAT — tick: comment silence ~11h42m, any-update silence ~8h51m on TDSD-6630. Still WIP. **TDSD-6627 "NIBSS - Disbursements Downtime" Resolved/Done and TDSD-6583 "DISBURSEMENT DOWNTIME" Done in this tick window — both are separate tickets from TDSD-6630 (NIBSS Disbursements product, not NIBSS DD mandate product); no closure bearing on this situation.** User-deferral to 2026-04-21 briefing continues to hold. No re-dispatch.
- 2026-04-21 — briefing-2026-04-21 never fired (structural gap, captured in briefing-2026-04-22 B5). No tick-level checks performed against TDSD-6630 in this window.
- 2026-04-22 06:45 WAT — briefing-2026-04-22 issued (catch-up 43.5h window). TDSD-6630 original triage-deferral still holds; not re-raised as Immediate. B4 tracks a separate Apr 22 P2 cycle (10:40 WAT onset at briefing compose time).
- 2026-04-22 13:05 WAT — Apr 22 P2 cycle resolved in-channel (2h25m from 10:40 WAT). Third NIBSS DD cycle in 9 days confirmed. Pattern: Apr 14 (47h silent→retired), Apr 20 TDSD-6630 (still silent 53h+), Apr 22 (2h25m explicit close).
- 2026-04-22 14:15 WAT — tick: TDSD-6630 still no movement (comment silence ~56h48m, any-update silence ~53h57m). 15:11 WAT observed in-channel NIBSS customer-facing comms retraction — either housekeeping after Apr 22 resolution or fresh incident starting. Retirement decision **deferred to briefing-2026-04-23** pending next-tick signal clarity on the retraction. No Immediate re-dispatch (triage-deferred state). Factors: source=jira+slack, silent_53h+, pattern_3_in_9_days, p2_cycle_resolved_2h25m, customer_facing_retraction_ambiguous, retirement_deferred.
- 2026-04-22 16:15 WAT — tick: TDSD-6630 still no movement. Comment silence ~58h48m, any-update silence ~55h57m. **TDSD-6683 (Apr 22 P2 cycle) transitioned to Completed in Jira at 15:01 WAT** — formal closure of the Apr 22 cycle, compounding evidence that TDSD-6630 silence is ticket-specific rather than product-wide. Slack Tier 1 quiet since 15:15 WAT (5/5 channels, no new NIBSS customer-facing signal after 15:11 WAT retraction) — one hour of silence nudges toward the housekeeping-only interpretation of the retraction. Adjacent NIBSS noise (TDSD-6687 NIP fast-cycle, TDSD-6686 NIBSS glitch housekeeping, TDSD-6673 Apr 21 VPN flap housekeeping) all fast-close; no pattern-significance for TDSD-6630 itself. **Retirement bar rising** — if next tick confirms continued Slack quiet on NIBSS customer comms, retirement at briefing-2026-04-23 compose is the default path. Factors: source=jira+slack, silent_55h+, p2_cycle_jira_completed, retraction_aging_toward_housekeeping, adjacent_nibss_noise_fast_close, retirement_bar_rising.
