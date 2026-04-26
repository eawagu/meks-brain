---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-26T06:10:00Z (07:10 WAT). 07:10 WAT Apr 26 skim-tick: Layer 1 zero, Layer 2 keyword pass 1 thread — Hourly Reports 20260426 reply (06:44 WAT, byte-identical to 01:56 WAT original, \"0 tickets raised\" stale vs TDSD-6729; does not mention either active P1) — Awareness candidate for briefing-2026-04-27."
updated: "2026-04-26T06:19:15Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T06:10:00Z"
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
Skim-tick MUST run BOTH Layer 1 (`to:me newer_than:Nh`) AND Layer 2 keyword pass (operational keywords + issuer-name buckets) every tick. The 16:10 WAT Apr 25 prior-tick documented only Layer 1 sweep (\"clean empty result, no residual-cache\") and missed Afeez's FCMB RC91 escalation email filed at 15:04:26Z (within window). The next tick's keyword sweep recovered the signal at 17:10 WAT — 1h05m delay is bounded but undesirable. **Skim-tick MUST run the operational keyword bucket as part of the per-source delta-check pass** — Layer-1-only is not sufficient. Only the issuer-name buckets (which exceed token budget when OR'd) may be deferred under skim cost cap; operational + governance + process buckets fit within budget per the execution pattern below.

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

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), Layer 1 zero + Layer 2 keyword 1 delta (Hourly Reports byte-identical resend; ops-cycle vs Jira-state contradiction)

07:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=hour-after-briefing-with-2-active-p1s-needing-delta-check). Window 05:10:00Z → 06:10:00Z = 1h post-briefing-tick.

**Layer 1 query `to:me newer_than:2h`: 0 threads in window.** Zero genuinely-new Layer-1 traffic in 1h.

**Operational keyword query `newer_than:2h (RC91 OR P1 OR \"Hourly Report\" OR Coralpay OR ZIB OR \"Access Bank\" OR outage OR settlement)`: 1 genuinely-new thread** —
- **Hourly Reports 20260426 thread `19dc749cf20cd04b` reply `19dc8519c120d6d2`** — Qazim Adedigba → aptpaytechnicalsupport@teamapt.com at 06:44:28 WAT Apr 26 (Re: Hourly Reports 20260426). **Body content is byte-identical to the 01:56 WAT original** including "Number of tickets raised: 0" and "Number of tickets closed: 0" — both stale vs reality (TDSD-6729 was filed by Qazim himself at 02:24 WAT, 4h20m before this report). Report does not mention CoralPay (ZIB) RC91 P1 (active 5h+ since 02:01 WAT) or Access Bank RC91 P1 (active 5h+ since 02:05 WAT, TDSD-6729). Same Coralpay-banks-off list as original (FBN, PVB, SBP — ZIB still implicitly operational per the report). **Two interpretations consistent with observed silence:** (A) silent resolution — both P1s recovered bank-side, ops did not Slack-post, hourly report omits resolved cycles correctly; (B) ops-cycle reporting failure — Qazim resent prior text 4h48m later without state-checking, both P1s still active and unrecorded. Parallel pattern across two open P1s (CoralPay ZIB + Access Bank cycle 8) at the same hourly report strengthens (B) as the more parsimonious common cause. Salience factors: `keyword_floor=hourly_report+routes_operational`, `byte_identical_to_prior_4h48m_later`, `contradicts_jira_state_0_tickets_raised_vs_TDSD-6729`, `parallel_silence_two_open_p1s`, `awareness_tier`, `structural_signal_independent_of_resolution`. Awareness candidate for briefing-2026-04-27. Situation pages updated this tick: [[Access Bank — Multi-Track Failures]] + [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]].

**No Immediate dispatch this tick** — both active P1s already covered by 06:22 WAT briefing Immediate dispatch (D1+D2); structural-anomaly framing is novel but does not match a config-salience Immediate trigger condition (not a new P1, not a new instance of >2h silence beyond the existing dispatch, not an urgent direct DM). Defers to briefing-2026-04-27 as Decision/Awareness item.

Factors: source=email, skim_tick, layer1_zero, layer2_one_delta_hourly_report_byte_identical_resend, ops_cycle_vs_jira_state_contradiction, parallel_pattern_two_open_p1s, awareness_tier, no_immediate_dispatch_continuation_of_briefing_dispatch.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), Layer 1 zero genuinely-new + Layer 2 keyword 1 delta (Hourly Reports 20260426, 14/17 routes 5min before two P1 onsets) (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick (Step 0: level=full, rationale=briefing-tick — floor override). Window 21:10:00Z Apr 25 → 05:10:00Z Apr 26 = 8h overnight delegation window. Layer 1 zero. Operational keyword 1 delta — Hourly Reports 20260426 thread 19dc749cf20cd04b 01:56 WAT (5min before P1 onsets) — Briefing-2026-04-26 A4. Active-situation entity coverage handled this tick: CoralPay ZIB / Access Bank both Tier 1 dispatched.

### last_processed 2026-04-25T21:10:00Z (22:10 WAT) — skim-level 22:00-cron tick (last tick before overnight delegation), Layer 1 zero + Layer 2 keyword 1 delta (Stanbic cycle 34, two-track with Slack) (preserved summary)

22:10 WAT Apr 25 Saturday skim tick. Window 19:10:00Z → 21:10:00Z = 2h. Layer 1 zero. Operational keyword query 1 thread — Stanbic ATS RC91 cycle 34 thread `19dc63afd3c001f0` (Olamide → Stanbic 21:00:33 WAT, bank reconfirm Onyekachukwu Okigbo 21:09:38 WAT, Olamide processing-successfully 21:14:37 WAT). Email-confirmed end-to-end 14m04s, two-track with Slack #teamapt-tech-operations Olamide P1 post 21:01 WAT.

### last_processed 2026-04-25T19:10:00Z (20:10 WAT) — skim-level 20:00-cron tick, Layer 1 + Layer 2 both zero-delta (preserved summary)

20:10 WAT Apr 25 Saturday skim. Layer 1 + operational keyword passes both clean. FCMB cycle 2 ~4h05m silent post-16:04 WAT filing — within envelope.

### last_processed 2026-04-25T17:10:00Z (18:10 WAT) — skim-level 18:00-cron tick, end-of-shift handover deltas only (preserved summary)

18:10 WAT Apr 25 Saturday skim. Daily Report #20260425 (Afeez 16:17 WAT) + Re: Duty Handover Note (Afeez/Olamide 16:22-16:23 WAT) — Layer 2 keyword surface; out of scope direct-to-me.

### last_processed 2026-04-25T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick, FCMB RC91 cycle 2 escalation 1-tick delay calibration (preserved summary)

17:10 WAT Apr 25 Saturday skim. FCMB RC91 cycle 2 from Afeez 16:04:26 WAT to FCMB caught via Layer 2 keyword pass (1-tick delay from 16:10 prior tick Layer-1-only sweep). Skim-tick keyword pass directive added.

### last_processed 2026-04-25T13:10:00Z–15:10:00Z — preserved summary block

Multiple skim ticks Saturday afternoon, all zero-delta with one mock-bot signal discarded.

### last_processed 2026-04-25T11:10:00Z–12:10:00Z — preserved summary block

Saturday late morning/midday skim ticks zero-delta.

### last_processed 2026-04-25T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick, BambooHR Layer 1 calibration miss surfaced (5-day silent) (preserved summary)

10:10 WAT Apr 25 Saturday skim. BambooHR \"Time Off Requested: Ravi Kiran Veluguleti and Muhammad Samu\" 10:06 WAT Layer 1 To:me. **5-consecutive-day silent miss** — `bot_sender` heuristic over-fired, preempting Layer 1. Directive amended above. MISS captured.

### last_processed 2026-04-25T05:09:54Z–08:10:00Z — preserved summary block

Saturday early ticks. 06:09 WAT briefing tick captured 4 in-window threads (Hourly Reports, Duty Handover, Union RC96, NIBSS PTSA counter-reply latent). 08:10 WAT skim implicit-FCMB-resolved via 14/17 trajectory.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks. 06:09 WAT briefing-tick 86h+ backlog sweep via 5 narrow buckets. 20:10 WAT NIBSS counter-reply contested-attribution round 2.
