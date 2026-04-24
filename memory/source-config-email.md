---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T19:10:00Z (20:10 WAT). 20:10 WAT Apr 24 full-level 20:00-cron tick: 1 Layer 2 genuinely-new thread — **NIBSS contested-attribution reply on thread 19dc0ab7bafe02e0 at 19:05 WAT** (7h09m after Afeez 11:56 WAT formal pattern-escalation); response-not-sent silence broken; substantive stance unchanged (defensive attribution to TeamApt processor). Active-situation delta applied to [[NIBSS PTSA — VPN Flapping Apr 22]]. Other buckets 0 genuinely new (residual Fidelity PayFac settlement thread cached-result predates window). No Immediate dispatch."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T19:10:00Z"
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
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta. Observed 2026-04-24 18:09 tick: all 4 buckets returned the same January 2026 Zone<>TeamApt Juliana Switch thread despite empty in-window state. Reconfirmed 20:10 WAT tick: broad `newer_than:2h` returned a cached April 15–20 Fidelity PayFac settlement thread (19d9052b6c594184) whose latest message date 2026-04-20T08:31:45Z predates the 18:22:16Z → 19:10:00Z window — correctly filtered out by client-side timestamp check.

## Notes

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level 20:00-cron tick (10min late)

20:10 WAT Apr 24 full-level tick. Window 18:22:16Z → 19:10:00Z = 47m44s (~48min). Consolidated `search_threads(newer_than:2h)` executed (sized to comfortably cover the 48min window plus 1h cached-result buffer) returned **2 threads**; client-side timestamp filter (most-recent-message > 2026-04-24T17:22:16Z):

- **Thread 19d9052b6c594184** — "Instruction for PayFac Settlement (Monnify)- Fidelity Bank" — 5 messages Apr 15–20. Latest message 2026-04-20T08:31:45Z. **Predates window — residual-cache artifact, filtered out.** Matches prior 18:09 WAT tick's observation of cached-thread behavior on empty-result queries.

- **Thread 19dc0ab7bafe02e0** — "Re: 7259261 Persistent Intermittent Failure (RC91) and Transaction Non-Receipt via PTSA Route" — 1 message at 2026-04-24T18:05:48Z (19:05 WAT). **Genuinely new. Active-situation match: [[NIBSS PTSA — VPN Flapping Apr 22]].** Sender header `aptpaytechnicalsupport@teamapt.com` (NIBSS reply routed via TeamApt shared technical-support mailbox; message voice "your system, Teamapt" identifies NIBSS as true author). CC list preserved from Afeez's 11:56 WAT escalation: ptsa@nibss-plc.com.ng, aptpaytechnicalsupport@teamapt.com, mustapha.ajibade@teamapt.com, **oladapo.onayemi@teamapt.com (CTO)**, ademola.adefemi@moniepoint.com, networkmanagement@teamapt.com, oladipupo.sholotan@moniepoint.com. Message snippet: *"Dear Afeez Kazeem, Thank you for your mail and apologies for the delayed feedback. Please note that the transactions provided were responded to, as received from your system, Teamapt. However, there is..."* Substantive stance: NIBSS doubles down on responses-were-sent claim; contested-attribution posture continues into round 2. Procedural posture: "apologies for delayed feedback" acknowledges 7h09m latency without conceding substance. Truncated "However, there is..." indicates additional observation/request in the full message body. Classification: **Briefing tier** (active-situation delta, bilateral-negotiation phase, CTO in-loop natural engagement trigger); **no Immediate dispatch** (negotiation, not action-forcing). Delta applied to [[NIBSS PTSA — VPN Flapping Apr 22]] situation page this tick with full factors trace.

**Target-bucket validation.** The broad `newer_than:2h` query captured the in-window signal at lower cost than the prior 4-bucket split; client-side timestamp filter handled the residual-cache correctly. For sub-hour windows with low expected signal density, consolidated-broad-query is cost-efficient — no bucket-specific coverage lost this tick.

Factors: `full_level`, `scheduled_cron_20wat_10min_late`, `1_layer2_genuinely_new`, `active_situation_match_nibss_ptsa_vpn_flapping_apr_22`, `nibss_counter_reply_received_round_2_defensive`, `response_silence_broken_7h09m_latency`, `reescalation_bar_c_in_active_observation_window`, `cto_cc_direct_visibility`, `bilateral_negotiation_continues`, `no_immediate_dispatch`, `residual_cache_behavior_fidelity_payfac_thread_filtered_client_side`, `briefing_2026_04_25_decision_candidate`.

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim-level off-cron zero-delta tick (preserved)

18:22 WAT Apr 24 off-cron skim tick: single `search_threads(newer_than:1h)` returned empty result set for the 17:09→17:22 UTC window.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta tick (preserved)

18:09 WAT Apr 24 tick. All 4 bucket queries returned only the cached-residual Zone<>TeamApt Juliana thread (January 2026). Applied client-side timestamp filter: **0 new threads**. Cross-source: Slack all 5 Tier 1 silent; Jira 1 Layer A delta (TDSD-6713) + 2 Layer B deltas. Calendar 0. Drive 0.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level tick, 1 Layer 1 strategic invite (preserved summary)

17:09 WAT Apr 24 tick: 1 Layer 1 new thread — Tracy Ojaigho "Invitation: TPP x Platformization @ Mon Apr 27" 15:31 UTC. Strategic meeting with Moniepoint stakeholder Ravi Jakhodia. Briefing-2026-04-25 candidate. Layer 2 3 reconciliation-workstream threads.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick (preserved summary)

16:09 WAT Apr 24 tick: Afeez Duty Handover Note 16:07 WAT (Ecobank route back ON) + UBA RC91 email filing 15:27 WAT + Daily Report + VALIDATION OF CLAIMS UBA thread. Governance bucket Tolulope Obianwu 14:46 WAT Request for Executive-Level Engagement with Fidelity Bank.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level tick (preserved summary)

15:09 WAT Apr 24 tick: Layer 2 issuer-bucket 3 reconciliation threads — Stanbic settlement validation pending, Stanbic DCIR API documentation follow-up, Union Bank chargeback reminder. All Awareness-level.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick (preserved summary)

14:09 WAT Apr 24 tick: Layer 2 Ecobank DCIR user-creation 3-week escalation email (thread 19dbf704dc7edb8a, 13:21 WAT).

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure; TeamApt Org Changes invite; Jira approval queue; Wema Bank RC91/22 Apr 23; Union Bank RC69 Apr 23; AWS Outposts 7-day prompt. Backlog catch-up complete.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
