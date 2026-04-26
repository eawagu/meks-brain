---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-26T06:10:00Z (07:10 WAT). 07:10 WAT Apr 26 skim-tick: Layer 1 zero, Layer 2 keyword pass 1 thread — Hourly Reports 20260426 reply (06:44 WAT, byte-identical to 01:56 WAT original, \"0 tickets raised\" stale vs TDSD-6729; does not mention either active P1) — Awareness candidate for briefing-2026-04-27."
updated: "2026-04-26T07:21:31Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T07:10:00Z"
---


## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate. **Bot-sender heuristic MUST NOT preempt Layer 1** — a To:user message from an automated address (bamboohr.com, lattice, calendar invites) is still Layer 1; the bot-sender filter applies only to CC/BCC paths.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity, Union.
- Governance: board, audit, PCI, compliance, regulator.
- Process: duty handover, weekly status report, RCA.
- HR/people-management: time off, leave request, approval pending, hire approval, PIP.

### Skip rules
- Marketing/newsletter senders — skip.
- Automated status emails without operational keywords — discard unless matches active-situation entity OR is To:user (Layer 1 preempts skip).

### Skim-tick query discipline (post 2026-04-25 17:10 WAT FCMB cycle-2 1-tick delay)
Skim-tick MUST run BOTH Layer 1 (`to:me newer_than:Nh`) AND Layer 2 keyword pass (operational keywords + issuer-name buckets) every tick. The 16:10 WAT Apr 25 prior-tick documented only Layer 1 sweep ("clean empty result, no residual-cache") and missed Afeez's FCMB RC91 escalation email filed at 15:04:26Z (within window). The next tick's keyword sweep recovered the signal at 17:10 WAT — 1h05m delay is bounded but undesirable. **Skim-tick MUST run the operational keyword bucket as part of the per-source delta-check pass** — Layer-1-only is not sufficient. Only the issuer-name buckets (which exceed token budget when OR'd) may be deferred under skim cost cap; operational + governance + process buckets fit within budget per the execution pattern below.

### Query execution pattern (post 10:09 limitation note)
Use narrow per-keyword buckets with `newer_than:Nh` to stay inside Gmail MCP token budget:
- Layer 1 pass: `to:me newer_than:Nh`.
- Operational keywords pass: `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:Nh`.
- Governance/process pass: group tight synonyms only.
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR \"Adewuyi Mayowa\") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated through 17:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

### Known limitation — Residual-cache behavior on newer_than filter (observed 2026-04-24 18:09 WAT)
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta.

## Notes

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (2h after Sunday briefing), Layer 1 zero + Layer 2 keyword 2 deltas (Hourly Reports 3rd byte-identical resend NOW POST-HOC DISPROVES "0 tickets raised" via TDSD-6729 resolution; Duty Handover routine shift change propagates stale state)

08:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-post-briefing-active-situations). Window 06:10:00Z → 07:10:00Z = 1h.

**Layer 1 query `to:me newer_than:2h`: 0 threads in window.** Zero genuinely-new Layer-1 traffic in 1h.

**Operational keyword query `(RC91 OR P1 OR \"Hourly Report\" OR Coralpay OR ZIB OR \"Access Bank\" OR outage OR settlement OR resolved) newer_than:2h`: 2 genuinely-new threads** —

1. **Hourly Reports 20260426 thread `19dc749cf20cd04b` reply `19dc88da9c0c0287`** — Qazim Adedigba → aptpaytechnicalsupport@teamapt.com at 07:50:02 WAT Apr 26 (Re: Hourly Reports 20260426). **3rd byte-identical resend** of the 01:56 WAT original. Same content: "Number of tickets raised: 0", "Number of tickets closed: 0", same 14/17-routes-operational with Coralpay banks FBN/PVB/SBP off, ZIB still implicitly operational per the report. Cumulative resend pattern: 01:56 WAT (origin) → 06:44 WAT (1st resend, 4h48m gap) → 07:50 WAT (2nd resend, 1h06m gap). **Critical disambiguator from the parallel Jira signal: TDSD-6729 (Access Bank cycle 8) was active for ~5h30m at the time of this 07:50 WAT resend, and was resolved 4 minutes after this resend was filed (07:54 WAT). The "Number of tickets raised: 0" line is therefore POST-HOC PROVABLY FALSE — TDSD-6729 existed and was about to be resolved when this report claimed zero tickets raised.** This proves the Hourly Reports byte-identical-resend stream is an **ops-cycle reporting failure (interpretation B)** structurally, independent of any individual cycle's resolution status. The most parsimonious explanation: Qazim copy-pastes the prior text without state-checking. Salience factors: `keyword_floor=hourly_report+routes_operational`, `byte_identical_to_prior_3rd_consecutive`, `0_tickets_raised_post_hoc_disproven_by_tdsd6729_resolution`, `interpretation_b_ops_cycle_reporting_failure_structurally_proven`, `parallel_evidence_from_access_jira_resolution`, `awareness_or_decision_tier`, `briefing_apr27_decision_candidate`. Situation pages updated this tick: [[Access Bank — Multi-Track Failures]] + [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]].

2. **Duty Handover Note 20260426 thread `19dc897ecc7b9e7e`** — Qazim Adedigba → daniel.armstrong@teamapt.com at 08:01:16 WAT Apr 26 + Daniel Armstrong acknowledgement reply 08:04:05 WAT (`19dc89a7f6c5b074`). Routine shift change at 08:00 WAT Sunday. Body content (per snippet): "Current System Status: 14 of 17 routes are operational. - Coralpay banks (FBN, PVB, and SBP) were turned off due to business decisions. - Coralpay transactions are routed through the [CoralPay_Cashout]…" — **same 14/17-routes content as the Hourly Reports stream, propagated to next-shift Daniel Armstrong**. The stale state continues into Sunday day shift; Daniel acknowledged without flagging the discrepancy with TDSD-6729 (likely because Daniel does not have visibility into Jira state at the moment of acknowledgement). **Routine handover does not match an Immediate trigger condition.** Salience factors: `keyword_floor=duty_handover`, `routine_shift_change`, `propagates_stale_state_to_next_shift`, `daniel_armstrong_inheritance_of_stale_state`, `awareness_tier`, `cross_referenced_with_hourly_reports_resend_pattern`. No situation page update for shift change itself; the stale-state propagation is folded into the active situation pages above.

**No Immediate dispatch this tick** — both deltas are continuations / structural signals; neither matches a config-salience Immediate trigger condition (not a new P1, not a new instance of >2h silence beyond the existing dispatch, not an urgent direct DM). Both defer to briefing-2026-04-27 (Decision-tier candidate for the structural reporting failure; Awareness-tier for the routine handover).

Factors: source=email, skim_tick, layer1_zero, layer2_two_deltas_hourly_report_3rd_byte_identical_resend_+_duty_handover_routine, ops_cycle_reporting_failure_structurally_proven_by_parallel_jira_evidence, stale_state_propagated_to_next_shift, no_immediate_dispatch_continuation_+_structural.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), Layer 1 zero + Layer 2 keyword 1 delta (Hourly Reports byte-identical resend; ambiguous at the time) (preserved summary)

07:10 WAT Apr 26 Sunday skim tick. Window 05:10:00Z → 06:10:00Z. Layer 1 zero. Operational keyword 1 thread — Hourly Reports 20260426 reply `19dc8519c120d6d2` 06:44 WAT, byte-identical to 01:56 WAT original including "0 tickets raised" line that contradicts TDSD-6729 filed at 02:24 WAT. Two interpretations consistent at this tick (silent resolution vs ops-cycle reporting failure); resolved structurally at 08:10 WAT tick by TDSD-6729 Resolution=Done evidence. No Immediate dispatch.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), Layer 1 zero genuinely-new + Layer 2 keyword 1 delta (Hourly Reports 20260426 origin, 14/17 routes 5min before two P1 onsets) (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick. Window 21:10:00Z Apr 25 → 05:10:00Z Apr 26 = 8h overnight delegation window. Layer 1 zero. Operational keyword 1 delta — Hourly Reports 20260426 thread 19dc749cf20cd04b 01:56 WAT (5min before P1 onsets) — Briefing-2026-04-26 A4. Active-situation entity coverage handled this tick: CoralPay ZIB / Access Bank both Tier 1 dispatched.

### last_processed 2026-04-25T17:10:00Z–22:10:00Z — preserved summary block

Multiple Saturday late-afternoon/evening skim ticks. 22:10 WAT Stanbic cycle 34 thread (two-track with Slack). 20:10 WAT zero-delta. 18:10 WAT end-of-shift handover deltas. 17:10 WAT FCMB cycle 2 keyword recovery (1-tick delay from Layer-1-only sweep prior).

### last_processed 2026-04-25T09:10:00Z–16:10:00Z — preserved summary block

Multiple Saturday morning/afternoon skim ticks. 10:10 WAT BambooHR Layer 1 calibration miss surfaced (5-day silent — bot_sender over-fired, directive amended).

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

06:09 WAT Apr 25 briefing tick. 4 in-window threads (Hourly Reports, Duty Handover, Union RC96, NIBSS PTSA counter-reply latent) via 5 narrow buckets.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks. 06:09 WAT briefing-tick 86h+ backlog sweep via 5 narrow buckets. 20:10 WAT NIBSS counter-reply contested-attribution round 2.
