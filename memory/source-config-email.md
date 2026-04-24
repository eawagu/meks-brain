---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T17:22:16Z (18:22 WAT). 18:22 WAT Apr 24 skim-level off-cron zero-delta tick (13min after prior 18:09 WAT): broad `newer_than:1h` query returned 0 threads in the 17:09→17:22 UTC window. MCP health holding 33h+ post-recovery."
updated: "2026-04-24T21:16:26Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T21:10:00Z"
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
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta. Observed Apr 24 ticks 18:09 / 20:10 / 22:10: broad `newer_than:Nh` consistently returned a cached April 15–20 Fidelity PayFac settlement thread (19d9052b6c594184, latest 2026-04-20T08:31:45Z) — correctly filtered out by client-side timestamp check each time.

## Notes

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level scheduled 22:00-cron tick (10min late), zero-delta

22:10 WAT Apr 24 Friday skim tick. Window 19:10:00Z → 21:10:00Z = 2h. Consolidated `search_threads(newer_than:3h)` returned 1 thread — 19d9052b6c594184 "Instruction for PayFac Settlement (Monnify)- Fidelity Bank", 5 messages Apr 15–20, latest 2026-04-20T08:31:45Z. **Predates window — residual-cache artifact filtered client-side. 0 genuinely new threads this tick.**

Context: 19dc0ab7bafe02e0 NIBSS PTSA counter-reply captured in prior 20:10 WAT tick at 19:05 WAT — no further NIBSS PTSA thread activity in this 2h window (bilateral negotiation in read-latency state). No new duty handover emails (next handover typically overnight 23:00+ WAT into briefing window).

Cross-source: Slack 0 deltas; Jira 2 Layer B CRLF-security-fix closures; calendar 0; drive 0 genuinely new.

No Immediate dispatch.

Factors: `skim_level`, `scheduled_cron_22wat_10min_late`, `zero_genuinely_new`, `residual_cache_fidelity_payfac_filtered_client_side`, `2h_window`, `mcp_health_37h_post_recovery`, `no_immediate_dispatch`, `no_layer1_new`, `no_issuer_match`.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level 20:00-cron tick (10min late), NIBSS counter-reply

20:10 WAT Apr 24 full-level tick. Window 18:22:16Z → 19:10:00Z. **1 genuinely new — thread 19dc0ab7bafe02e0** "Re: 7259261 Persistent Intermittent Failure (RC91) and Transaction Non-Receipt via PTSA Route" — 1 message at 2026-04-24T18:05:48Z (19:05 WAT). **Active-situation match: [[NIBSS PTSA — VPN Flapping Apr 22]].** Sender routed via `aptpaytechnicalsupport@teamapt.com` (NIBSS as true author). CC preserved: ptsa@nibss-plc.com.ng, mustapha.ajibade@teamapt.com, **oladapo.onayemi@teamapt.com (CTO)**, ademola.adefemi@moniepoint.com, networkmanagement@teamapt.com, oladipupo.sholotan@moniepoint.com. Substantive stance: NIBSS doubles down on responses-were-sent claim; contested-attribution posture continues round 2. "apologies for delayed feedback" acknowledges 7h09m latency without conceding substance. Truncated "However, there is..." indicates additional observation in body. Classification: **Briefing tier** (active-situation delta, bilateral-negotiation, CTO in-loop natural engagement). Delta applied to [[NIBSS PTSA — VPN Flapping Apr 22]].

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim-level off-cron zero-delta tick (preserved)

18:22 WAT Apr 24 off-cron skim tick: single `search_threads(newer_than:1h)` returned empty result set for 17:09→17:22 UTC window.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta tick (preserved)

18:09 WAT Apr 24 tick. All 4 bucket queries returned only cached-residual Zone<>TeamApt Juliana thread (Jan 2026). Client-side filter: **0 new threads**.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level tick, 1 Layer 1 strategic invite (preserved summary)

17:09 WAT Apr 24 tick: 1 Layer 1 new thread — Tracy Ojaigho "Invitation: TPP x Platformization @ Mon Apr 27" 15:31 UTC. Strategic meeting with Moniepoint stakeholder Ravi Jakhodia. Briefing-2026-04-25 candidate. Layer 2 3 reconciliation-workstream threads.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick (preserved summary)

16:09 WAT Apr 24 tick: Afeez Duty Handover Note 16:07 WAT (Ecobank route back ON) + UBA RC91 email filing 15:27 WAT + Daily Report + VALIDATION OF CLAIMS UBA thread. Governance bucket Tolulope Obianwu 14:46 WAT Request for Executive-Level Engagement with Fidelity Bank.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure; TeamApt Org Changes invite; Jira approval queue; Wema Bank RC91/22 Apr 23; Union Bank RC69 Apr 23; AWS Outposts 7-day prompt.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
