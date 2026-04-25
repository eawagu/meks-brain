---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-25T14:10:00Z (15:10 WAT). 15:10 WAT Apr 25 skim-tick: zero genuinely-new threads in window; clean empty newer_than:2h result."
updated: "2026-04-25T14:20:36Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T14:10:00Z"
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

### last_processed 2026-04-25T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (10min late), zero genuinely-new threads (clean empty result)

15:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=quiet-saturday-prior-2-ticks-zero-deltas-active-situations-watching). Window 13:10:00Z → 14:10:00Z = 1h.

**Layer 1 query `newer_than:2h`: returned 0 threads (clean empty result, no residual-cache).** **Zero genuinely-new threads in 13:10:00Z → 14:10:00Z window.** No P1 emails. No Layer 1 to:me threads. No active-situation entity matches with new content. BambooHR daily notification not in this 1h window (next expected Apr 26 ~10:06 WAT).

**Active-situation entity coverage:** all situations updated within last 10h. NIBSS PTSA bilateral 20h+ silent (under 48h threshold). Three consecutive zero-genuinely-new-thread skim ticks (13:10/14:10/15:10 WAT).

Factors: `source=email`, `skim_tick`, `saturday_afternoon`, `zero_genuinely_new_threads`, `clean_empty_query_no_residual_cache`, `no_p1_emails`, `no_immediate_dispatch_this_tick`, `quiet_weekend_window`, `three_consecutive_zero_delta_skim_ticks`.

### last_processed 2026-04-25T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (10min late), zero genuinely-new threads

14:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend-afternoon-active-p1-monitoring-post-quiet-13_10-tick). Window 12:10:00Z → 13:10:00Z = 1h.

**Layer 1 query `to:me newer_than:2h`: returned 1 residual-cache thread** (UBA pen-test thread 19b2e5fb18efdd60 — \"Re: FW: PENTEST_ 2FA on DCIR portal\", latest message 2026-01-08T08:02:23Z = 99 days predates window cutoff). Filtered out per residual-cache directive — user is CC participant on the thread, not in To: of any in-window message. **Zero genuinely-new Layer 1 threads.**

**Operational keyword query `(P1 OR RC91 OR RC96 OR outage OR incident OR breach OR settlement OR \"transaction failure\") newer_than:2h`: returned 2 threads, both out-of-window:**
- Thread 19dc48105ab218b6 \"mock Monitoring Service Alert\" — 2026-04-25T11:58:01Z (12:58 WAT, **predates 12:10:00Z window cutoff**) — already captured by 13:10 WAT prior tick (mock prefix synthetic test, bot-to-bot recipient, NOT Layer 1).
- Thread 19d76cd43ffea769 \"MONIEPOINT TRANSACTIONS-10042026\" — Apr 10 thread, residual-cache (15+ days old).

**Zero genuinely-new threads in 12:10:00Z → 13:10:00Z window.** No P1 emails. No Layer 1 to:me threads. No active-situation entity matches with new content. BambooHR daily notification not in this 1h window (next expected Apr 26 ~10:06 WAT).

**Active-situation entity coverage:** all situations updated within last 9h. NIBSS PTSA bilateral 19h+ silent (under 48h threshold). No 48h+ silence triggers fire.

Factors: `source=email`, `skim_tick`, `saturday_afternoon`, `zero_genuinely_new_threads`, `residual_cache_uba_pentest_99d_old_filtered`, `mock_bot_signal_predates_window_already_captured_prior_tick`, `moniepoint_residual_15d_old`, `no_p1_emails`, `no_immediate_dispatch_this_tick`, `quiet_weekend_window`.

### last_processed 2026-04-25T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (10min late), 1 mock-bot signal below Layer 1 threshold

13:10 WAT Apr 25 Saturday skim tick. Window 11:10:00Z → 12:10:00Z = 1h. Query `newer_than:2h` returned thread 19dc48105ab218b6 \"mock Monitoring Service Alert\" at 11:58:01Z (12:58 WAT, sender `aptpaytechnicalsupport@teamapt.com`, To: `aptpaytechnicalsupport@teamapt.com`). NOT Layer 1 (recipient is bot mailbox, not user). Layer 2 failure-rate keyword surface but \"mock\" prefix indicates synthetic test alert + 0.38pp over threshold = below actionable noise floor. Discard per skip rules. Zero genuinely-new Layer 1 threads.

### last_processed 2026-04-25T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (10min late), zero genuinely-new threads (preserved summary)

12:10 WAT Apr 25 Saturday skim tick. Window 10:10:00Z → 11:10:00Z = 1h. Clean empty query result. Zero genuinely-new threads. No P1 emails. Active-situation entity coverage all within last 6h.

### last_processed 2026-04-25T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (10min late), zero genuinely-new threads (preserved summary)

11:10 WAT Apr 25 Saturday skim tick. Window 09:10:00Z → 10:10:00Z = 1h. Returned threads predating cutoff (Wema/BambooHR/Duty Handover/Hourly Reports/TACHA — all already captured in prior 10:10 WAT tick). Zero genuinely-new.

### last_processed 2026-04-25T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick, BambooHR Layer 1 calibration miss surfaced (5-day silent) (preserved summary)

10:10 WAT Apr 25 Saturday skim tick. Window 08:10:00Z → 09:10:00Z = ~1h. BambooHR \"Time Off Requested: Ravi Kiran Veluguleti and Muhammad Samu\" 10:06 WAT — Layer 1 To:me always-surface per directive. **5th consecutive daily notification with identical payload (Apr 21–25), none surfaced in any briefings — Layer 1 directive silently bypassed.** MISS captured to `MISS-bamboohr-layer1-silent-5-days-2026-04-25.md`. Hypothesis: bot-sender heuristic over-fired and preempted Layer 1 (now corrected — directive amended above to \"Bot-sender heuristic MUST NOT preempt Layer 1\"). Briefing-2026-04-26 Decision candidate (Confidence: high — single clear action: approve both via BambooHR portal).

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, 1 thread delta (Wema RC91 cycle) (preserved summary — original email-only framing was corrected at 10:10 WAT tick; Slack post was made and missed due to epoch bug)

09:10 WAT Apr 25 Saturday skim tick. Wema Bank RC91 thread + TEAMAPT Monitoring Service Alert. Wema cycle 14m20s bank-resolved. Note: original \"email-only filing\" framing was an artifact of the cross-source Slack epoch bug; Wema cycle was actually dual-channel filed (email 08:34 WAT + Slack 08:39 WAT). Filing-channel-divergence framing rescinded.

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, 4 in-window threads (FCMB implicit-resolved via 14/17 trajectory, preserved summary)

08:10 WAT Apr 25 skim. 4 in-window threads: Hourly Reports update 07:02 WAT (14/17 routes operational, FCMB/Habari/Zenith/Union all dropped from failure list); Duty Handover 08:06 WAT (Qazim → Afeez, 14/17 confirmed stable + \"Coralpay transactions are routed through the CoralPay_Cashout\"); TACHA Backoffice update 06:54 WAT (June Johnson, internal Layer 1 to:me); Union RC96 thread (no new activity post-resolution). Implicit FCMB P1 closure resolves morning briefing D1 stale-by-trajectory.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, 4 in-window threads (preserved summary)

06:09 WAT Apr 25 briefing tick. 8h overnight window. 4 in-window threads: Hourly Reports 02:20 WAT (10/17 routes, Habari/Zenith failing RC91 to partners + Union RC96); Duty Handover 23:05 WAT Apr 24 (Olamide → Qazim, 14/17, FBN/PVB/SBP off); Union RC96 thread (filed 01:14 WAT, bank-resolved 02:52 WAT); NIBSS PTSA counter-reply thread (no new activity). MCP health 45h+ stable post-Apr-23-recovery.

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level zero-genuinely-new (preserved summary)

22:10 WAT Apr 24 skim. 1 thread returned (Fidelity PayFac Settlement) — predates window, residual-cache filtered. 0 genuinely new. NIBSS PTSA bilateral negotiation in read-latency state.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level NIBSS counter-reply (preserved summary)

20:10 WAT Apr 24 full tick. Thread 19dc0ab7bafe02e0 NIBSS counter-reply 19:05 WAT — contested-attribution round 2 stance with CTO Oladapo CC. Briefing tier delta to [[NIBSS PTSA — VPN Flapping Apr 22]].

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta (preserved)

18:09 WAT Apr 24 tick. All 4 buckets returned cached-residual only. 0 new threads.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level 1 Layer 1 strategic invite (preserved summary)

17:09 WAT Apr 24 tick: 1 Layer 1 — Tracy Ojaigho \"Invitation: TPP x Platformization @ Mon Apr 27\" 15:31 UTC. Strategic meeting with Moniepoint stakeholder Ravi Jakhodia.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level Afeez handover + UBA + Fidelity governance (preserved summary)

16:09 WAT Apr 24 tick: Afeez Duty Handover (Ecobank route back ON) + UBA RC91 filing 15:27 WAT + Tolulope Obianwu 14:46 WAT Request for Executive-Level Engagement with Fidelity Bank.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep via 5 narrow buckets. Key captures: Ecobank compound failure; TeamApt Org Changes invite; Jira approval queue; Wema Apr 23; Union RC69 Apr 23; AWS Outposts 7-day prompt.
