---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-25T05:09:54Z (06:09 WAT). 06:09 WAT Apr 25 briefing-tick: 4 in-window threads — Hourly Reports 02:20 WAT (10/17 routes operational, Habari/Zenith RC91 escalated to partners), Duty Handover 00:05 WAT (3 routes turned off MP-decision), Union Bank RC96 thread 19dc1fd7e4326d6a (filed 01:14 WAT, resolved 02:52 WAT bank-side), NIBSS PTSA prior counter-reply already captured. MCP health holding 45h+ post-recovery."
updated: "2026-04-25T05:27:00Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T05:09:54Z"
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

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, 4 in-window threads

06:09 WAT Apr 25 Saturday briefing tick. Window 21:10:00Z Apr 24 → 05:09:54Z Apr 25 = ~8h overnight. **4 in-window threads from `(RC91 OR P1 OR outage OR FCMB OR Habari OR "Access Bank") newer_than:12h` + issuer bucket pass:**

1. **Thread 19dc23924c6ed10a — "Hourly Reports 20260425"** ([[Qazim Adedigba]] → aptpaytechnicalsupport, 02:20 WAT). Single message: "10 of 17 routes are operational. Coralpay banks (FBN, PVB, SBP) turned off — business decisions. **Habari and Zenith transactions are failing with RC 91, escalated to the partners for resolution.** Union Bank failing RC 96 across processors — service restarted, persists, escalated to bank. All portals up. Tickets raised: 1 (TDSD-6726 Habari Problem ticket); closed: 0." Multi-bank degradation snapshot. Layer 2 keyword bucket capture (RC91, Habari, Union).

2. **Thread 19dc1bdbe990f06e — "Duty Handover Note #20260424"** ([[Olamide Ajibulu]] → [[Qazim Adedigba]], 00:05 WAT, 2 messages). Olamide handover: "14 of 17 PTSAs operational. **First bank, providus and sterling are turned off due to RC91 - MP decision.** Open Tickets: TDSD-6716 NIBSS RC91 Failures. Other Updates: TDSD-6726 GTB RC 91, TDSD-6680 Palmpay portal, TDSD-6276 Union problem ticket, TDSD-6713 Keystone settlements." Qazim Acknowledged 00:11 WAT. Process keyword bucket capture (duty handover).

3. **Thread 19dc1fd7e4326d6a — "Union Bank | ATS | RC 96 Failure | 20260425 | TDSD-6727"** ([[Qazim Adedigba]] → Union Bank itechannels, 5 messages). Filed 01:14 WAT "failing with RC 96." Qazim follow-up 02:58 WAT "any update? issue persists." Bank reply (Iyama Victor) 02:50 WAT "reconfirm now." Qazim 02:52 WAT "processing fine now." Bank-resolved ~1h40m. Layer 2 issuer bucket capture (Union).

4. **Thread 19dc0ab7bafe02e0 — NIBSS PTSA counter-reply** (already captured in 20:10 WAT Apr 24 tick; no new in-window activity, 11h silent at this tick — under 48h absence threshold). Layer 2 issuer bucket capture (NIBSS).

No Layer 1 to:me threads in window. Cross-source: Slack 3 P1s; Jira 2 TDSD deltas (TDSD-6727 Union, TDSD-6726 Habari Problem) + 2 Layer B Bukola Taiwo Apr 24 evening updates; calendar 0; drive 0. MCP health holding 45h+ post-Apr-23-recovery.

Factors: `briefing_tick`, `full_level`, `overnight_window_8h`, `4_in_window_threads`, `hourly_report_multi_bank_degradation`, `duty_handover_3_routes_off_mp_decision`, `union_rc96_fast_cycle_resolved`, `nibss_ptsa_silent_under_48h`, `mcp_health_45h_stable`, `cross_source_aligned`.

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level zero-genuinely-new (preserved summary)

22:10 WAT Apr 24 skim. Window 2h. 1 thread returned (Fidelity PayFac Settlement) — predates window, residual-cache filtered. 0 genuinely new. NIBSS PTSA bilateral negotiation in read-latency state.

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
