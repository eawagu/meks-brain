---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-25T12:10:00Z (13:10 WAT). 13:10 WAT Apr 25 skim-tick: 1 mock-monitoring-bot signal below Layer 1 threshold; zero genuinely-new Layer 1 threads."
updated: "2026-04-25T12:23:22Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T12:10:00Z"
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

### Query execution pattern (post 10:09 limitation note)
Use narrow per-keyword buckets with `newer_than:Nh` to stay inside Gmail MCP token budget:
- Layer 1 pass: `to:me newer_than:Nh`.
- Operational keywords pass: `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:Nh`.
- Governance/process pass: group tight synonyms only.
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR "Adewuyi Mayowa") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated through 17:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

### Known limitation — Residual-cache behavior on newer_than filter (observed 2026-04-24 18:09 WAT)
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta.

## Notes

### last_processed 2026-04-25T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (10min late), 1 mock-bot signal below Layer 1 threshold

13:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend-afternoon-prior-zero-delta-active-p1-monitoring). Window 11:10:00Z → 12:10:00Z = 1h. Query `newer_than:2h` returned 1 in-window thread:

1. **Thread 19dc48105ab218b6 — "mock Monitoring Service Alert"** (1 message, 2026-04-25T11:58:01Z = 12:58 WAT, sender `aptpaytechnicalsupport@teamapt.com`, To: `aptpaytechnicalsupport@teamapt.com`). Body: "Transaction failure rate is 5.379284033827176% and has exceeded configured threshold of 5.0%". **NOT Layer 1** (recipient is the bot mailbox itself, not the user). Layer 2 keyword surface (failure-rate keyword) — single mock-flagged alert at 0.38pp over threshold = below actionable noise floor. The "mock" prefix in the subject line indicates a synthetic test alert, not a production-monitor signal. Routine bot heartbeat. No active-situation entity match. Discard per skip rules (automated status email without operational keywords matching active situation).

**Zero genuinely-new Layer 1 threads in window.** No P1 emails. No to:me threads. No active-situation entity matches with new content. BambooHR daily notification not in this 1h window (next expected Apr 26 ~10:06 WAT).

**Active-situation entity coverage:** all situations updated within last 7h (Wema 10:19 WAT, CoralPay 09:10 WAT, Ecobank Jira-side 08:13 WAT). NIBSS PTSA bilateral 18h+ silent (under 48h threshold). No 48h+ silence triggers fire.

Factors: `source=email`, `skim_tick`, `saturday_afternoon`, `1_mock_monitoring_bot_signal_below_threshold`, `not_layer1_bot_to_bot_recipient`, `mock_prefix_synthetic_test`, `no_p1_emails`, `no_immediate_dispatch_this_tick`, `quiet_weekend_window`.

### last_processed 2026-04-25T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (10min late), zero genuinely-new threads

12:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=active-fcmb-p1-trajectory-resolved+mostly-quiet-priors). Window 10:10:00Z → 11:10:00Z = 1h. Query `newer_than:1h` returned empty result (no in-window threads at all this tick — clean zero).

**Zero genuinely-new threads in window.** No P1 emails. No to:me threads. No active-situation entity matches with new content. BambooHR repeat (already routed to briefing-2026-04-26 Decision candidate via 10:10 WAT tick) — no new BambooHR notification this hour.

**Active-situation entity coverage:** all situations updated within last 6h (Wema 10:19 WAT, CoralPay 09:10 WAT, Ecobank Jira-side 08:13 WAT). NIBSS PTSA bilateral 17h+ silent (under 48h threshold). No 48h+ silence triggers fire.

Factors: `source=email`, `skim_tick`, `saturday_midday`, `zero_genuinely_new_threads`, `clean_empty_query_result`, `no_p1_emails`, `no_immediate_dispatch_this_tick`, `quiet_weekend_window`.

### last_processed 2026-04-25T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (10min late), zero genuinely-new threads

11:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend+active-situations-monitoring+prior-tick-quiet+no-immediate-firing). Window 09:10:00Z → 10:10:00Z = 1h. Query `newer_than:1h` returned threads predating 10:10 WAT cutoff (Wema RC91 cycle 08:34–08:49 WAT, BambooHR notification 10:06 WAT, Duty Handover 08:06 WAT, Hourly Reports 07:02 WAT, TACHA Backoffice 06:54 WAT) — all already captured in prior 10:10 WAT tick.

**Zero genuinely-new threads in window.** No P1 emails. No to:me threads (BambooHR repeat already routed to briefing-2026-04-26 Decision candidate per 10:10 WAT tick). No active-situation entity matches with new content.

**Active-situation entity coverage:** all situations updated within last 5h (Wema 10:19 WAT update, CoralPay 09:10 WAT, Ecobank Jira-side 08:13 WAT). No 48h+ silence triggers.

Factors: `skim_tick`, `saturday_late_morning`, `zero_genuinely_new_threads`, `bamboohr_layer1_already_routed_via_prior_tick`, `no_p1_emails`, `no_immediate_dispatch_this_tick`, `quiet_weekend_window`.

### last_processed 2026-04-25T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick, BambooHR Layer 1 calibration miss surfaced (5-day silent)

10:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend+active-situations+2h-since-last-sweep,no-immediate-firing). Window 08:10:00Z → 09:10:00Z = ~1h. Query `newer_than:3h` returned 6 threads, of which 1 is in-window-and-genuinely-new this tick:

1. **Thread 19dc3e3ea8fbbbb9 — "Time Off Requested: Ravi Kiran Veluguleti and Muhammad Samu"** (1 message, 09:06:26 UTC = 10:06 WAT, sender `notifications@app.bamboohr.com`, To: `emeka.awagu@teamapt.com`). **Layer 1 To:me — always-surface per directive.** Pending approvals: Ravi Kiran Veluguleti Wed Apr 01 (1 day Sick) + Muhammad Samu (date in body). **5th consecutive daily notification with identical payload (Apr 21, 22, 23, 24, 25 — thread IDs 19daf4a1b6567477, 19db4706ab8d810c, 19db996af0c72b5a, 19dbebd659fb5484, 19dc3e3ea8fbbbb9 respectively).** None surfaced in any of briefings 2026-04-21 through 2026-04-25 — Layer 1 directive silently bypassed. MISS captured to `MISS-bamboohr-layer1-silent-5-days-2026-04-25.md`. Hypothesis: bot-sender heuristic over-fired and preempted Layer 1 (now corrected — directive amended above to "Bot-sender heuristic MUST NOT preempt Layer 1"). Folded into [[BambooHR]] entity page with the 5-consecutive-day pattern documented. Briefing-2026-04-26 Decision candidate (Confidence: high — single clear action: approve both via BambooHR portal).

Other threads returned by `newer_than:3h` query (already processed by prior ticks):
- Thread 19dc390a02e9797c — Wema Bank RC91 cycle (already in [[Wema Bank — RC91 P1 Apr 17]] situation page; 09:10 WAT prior tick captured email side, 10:10 WAT this tick captured paired Slack post).
- Thread 19dc38d79729fe24 — TEAMAPT Monitoring Service Alert 33% failure rate (paired with Wema cycle, already cross-referenced).
- Thread 19dc376af908d69d — Duty Handover Note 20260425 (already in CoralPay situation page via 09:10 WAT tick).
- Thread 19dc23924c6ed10a — Hourly Reports 20260425 (07:02 WAT update already in source-config-email 08:10 WAT skim notes; 02:20 WAT update already in briefing-2026-04-25).
- Thread 19dc36afa39a2e3e — TACHA Backoffice Update (June Johnson, already in 08:10 WAT skim notes).
- Thread 19b93b9d0b6ac562 — Jan 2026 NPS UAT Script (residual-cache, predates window, filtered out).

**Active-situation entity coverage:** all situations updated within last 4h. No 48h+ silence triggers.

**No Layer 1 to:me threads other than BambooHR.** No new governance/regulatory deadlines. No P1 in window. No FCMB/Habari/Zenith activity (consistent with morning trajectory).

Factors: `skim_tick`, `saturday_morning`, `1_genuinely_new_thread`, `bamboohr_layer1_5_consecutive_days_silent`, `cto_as_manager_approval_queue_24d_unactioned`, `bot_sender_heuristic_preempted_layer1_directive_corrected`, `miss_captured`, `cross_source_slack_recovers_wema_post`, `no_immediate_dispatch_this_tick`.

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, 1 thread delta (Wema RC91 cycle 5/17days) (preserved summary — note the email-only framing in this entry was corrected at 10:10 WAT tick; Slack post was made and missed due to epoch bug)

09:10 WAT Apr 25 Saturday skim tick. Window 07:10:00Z → 08:10:00Z = ~1h. Query `newer_than:1h` returned 2 threads in window: Wema Bank RC91 thread + TEAMAPT Monitoring Service Alert. Wema cycle 14m20s bank-resolved. **Note: original entry claimed "email-only filing — no Slack P1 post" — this was an artifact of the cross-source Slack epoch bug (see source-config-slack notes). Wema cycle was actually dual-channel filed (email 08:34 WAT + Slack 08:39 WAT). Filing-channel-divergence framing is rescinded.**

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, 4 in-window threads (FCMB implicit-resolved via 14/17 trajectory, preserved summary)

08:10 WAT Apr 25 skim. 4 in-window threads: Hourly Reports update 07:02 WAT (14/17 routes operational, FCMB/Habari/Zenith/Union all dropped from failure list); Duty Handover 08:06 WAT (Qazim → Afeez, 14/17 confirmed stable + "Coralpay transactions are routed through the CoralPay_Cashout"); TACHA Backoffice update 06:54 WAT (June Johnson, internal Layer 1 to:me); Union RC96 thread (no new activity post-resolution). Implicit FCMB P1 closure resolves morning briefing D1 stale-by-trajectory.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, 4 in-window threads (preserved summary)

06:09 WAT Apr 25 briefing tick. 8h overnight window. 4 in-window threads: Hourly Reports 02:20 WAT (10/17 routes, Habari/Zenith failing RC91 to partners + Union RC96); Duty Handover 23:05 WAT Apr 24 (Olamide → Qazim, 14/17, FBN/PVB/SBP off); Union RC96 thread (filed 01:14 WAT, bank-resolved 02:52 WAT); NIBSS PTSA counter-reply thread (no new activity). MCP health 45h+ stable post-Apr-23-recovery.

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level zero-genuinely-new (preserved summary)

22:10 WAT Apr 24 skim. 1 thread returned (Fidelity PayFac Settlement) — predates window, residual-cache filtered. 0 genuinely new. NIBSS PTSA bilateral negotiation in read-latency state.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level NIBSS counter-reply (preserved summary)

20:10 WAT Apr 24 full tick. Thread 19dc0ab7bafe02e0 NIBSS counter-reply 19:05 WAT — contested-attribution round 2 stance with CTO Oladapo CC. Briefing tier delta to [[NIBSS PTSA — VPN Flapping Apr 22]].

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta (preserved)

18:09 WAT Apr 24 tick. All 4 buckets returned cached-residual only. 0 new threads.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level 1 Layer 1 strategic invite (preserved summary)

17:09 WAT Apr 24 tick: 1 Layer 1 — Tracy Ojaigho "Invitation: TPP x Platformization @ Mon Apr 27" 15:31 UTC. Strategic meeting with Moniepoint stakeholder Ravi Jakhodia.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level Afeez handover + UBA + Fidelity governance (preserved summary)

16:09 WAT Apr 24 tick: Afeez Duty Handover (Ecobank route back ON) + UBA RC91 filing 15:27 WAT + Tolulope Obianwu 14:46 WAT Request for Executive-Level Engagement with Fidelity Bank.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep via 5 narrow buckets. Key captures: Ecobank compound failure; TeamApt Org Changes invite; Jira approval queue; Wema Apr 23; Union RC69 Apr 23; AWS Outposts 7-day prompt.
