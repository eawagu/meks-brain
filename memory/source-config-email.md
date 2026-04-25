---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-25T07:10:00Z (08:10 WAT). 08:10 WAT Apr 25 skim-tick: 4 in-window threads — Hourly Reports update 07:02 WAT (14/17 routes operational, FCMB/Habari/Zenith/Union all dropped from failure list), Duty Handover 08:06 WAT (Qazim → Afeez, 14/17 confirmed stable), TACHA Backoffice update 06:54 WAT (June Johnson, internal Layer 1 to:me), Union RC96 thread (no new activity post-resolution). Implicit FCMB P1 closure resolves morning briefing D1 stale-by-trajectory."
updated: "2026-04-25T08:25:07Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T08:10:00Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity, Union.
- Governance: board, audit, PCI, compliance, regulator.
- Process: duty handover, weekly status report, RCA.

### Skip rules
- Marketing/newsletter senders — skip.
- Automated status emails without operational keywords — discard unless matches active-situation entity.

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

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, 1 thread delta (Wema RC91 cycle 5/17days)

09:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=saturday-morning-quiet-priors-active-situations-monitoring). Window 07:10:00Z → 08:10:00Z = ~1h. Query `newer_than:1h` returned **2 threads** in window:

1. **Thread 19dc390a02e9797c — "Wema Bank | RC91 | 20260425"** (4 messages, [[Afeez Kazeem]] ↔ Peace Etim Wema Bank). Layer 2 issuer+keyword bucket (Wema + RC91). Filed 08:34:50 WAT by Afeez to switching&payments_services@wemabank.com (CC aptpaytechnicalsupport): "Please be informed that transactions are failing with RC91. Kindly review the transaction." Bank acknowledgement 08:40:10 WAT (Peace Etim, Switching and Payment Officer): "This is receiving attention, we will revert shortly." Bank reconfirm-status 08:43:58 WAT: "Kindly reconfirm status." Afeez closure 08:49:10 WAT: "Transactions are now processing successfully." **Total cycle: 14m20s, bank-resolved with explicit two-way confirmation.** Filing channel: email-only — no Slack P1 post (5 Tier 1 channels silent), no Jira ticket. Active-situation entity match → [[Wema Bank — RC91 P1 Apr 17]]. **5th cycle in 17 days (Apr 8 → Apr 11 → Apr 17 → Apr 23 → Apr 25); inter-cycle gap narrowing to ~38h (vs. prior 6-day gaps) — frequency-trajectory accelerating.** Within-pattern resolution path (bank-side handling). No CTO action. Briefing-2026-04-26 Awareness candidate.

2. **Thread 19dc38d79729fe24 — "TEAMAPT Monitoring Service Alert"** (1 message, 08:32:00 WAT). Automated alert: "Transaction failure rate is 33.03% and has exceeded configured threshold of 20.0%." Self-recipient (aptpaytechnicalsupport ↔ aptpaytechnicalsupport). Paired with Wema thread above — automated alert preceded Afeez filing by ~3min, implying filing was driven by automated failure-rate detection (not manual escalation). **Skip rule applies under literal directive ("Automated status emails without operational keywords — discard unless matches active-situation entity")** — but body contains threshold-breach data that retroactively contextualizes the Wema filing channel; counted as cross-source confirmation, not a standalone delta.

**No Layer 1 to:me threads in window.** No new governance/regulatory deadlines, no escalation requests.

**Cross-source: Slack 5 Tier 1 silent + DM zero + keyword scan zero + Wema-keyword search zero (Slack indexing window did not yet include the 08:34 WAT Afrz Wema-related activity OR no Slack post was made — second hypothesis confirmed by absence of Slack post in `slack_search_public_and_private` after:2026-04-25 sweep). Jira 4 deltas (TDSD-6728 NEW CoralPay ZIB Interchange post-incident-doc, TDSD-6711 Ecobank Portal Completed 08:13 WAT, TDSD-6727 Union RC96 re-captured from prior tick due to JQL slop, TDSD-6706 metadata Resolved → Closed) — no Wema Jira ticket created (consistent with email-only filing channel). Calendar 0 deltas (weekend clear).**

**Implication for active situations:**
- **[[Wema Bank — RC91 P1 Apr 17]]:** updated this tick with Apr 25 cycle delta. Frequency-trajectory acceleration documented. If the 38h gap holds, next cycle expected within 1–2 days — increases monitoring weight on Wema for Apr 26-27 ticks.
- **briefing-2026-04-25 D1 (FCMB):** further confirmation FCMB resolved — no FCMB activity in 09:10 tick window despite issuer-keyword sweep. The 07:02 WAT hourly-report-implicit-resolution holds.
- **briefing-2026-04-25 D2 (multi-bank degradation):** Wema fast-cycle is within-pattern noise on the multi-bank operational picture; does not change systemic frame.

Factors: `skim_tick`, `saturday_morning`, `1_thread_delta_wema_rc91_apr25`, `wema_5th_cycle_in_17days`, `frequency_trajectory_accelerating_38h_gap`, `bank_two_way_confirmation`, `email_only_filing_channel`, `automated_alert_trigger_33pct_failure_rate`, `cross_source_no_slack_post_no_jira_ticket`, `briefing_d1_fcmb_resolution_holds`, `briefing_d2_systemic_frame_unchanged`, `no_immediate_dispatch_this_tick`.

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
