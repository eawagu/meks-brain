---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-25T07:10:00Z (08:10 WAT). 08:10 WAT Apr 25 skim-tick: 4 in-window threads — Hourly Reports update 07:02 WAT (14/17 routes operational, FCMB/Habari/Zenith/Union all dropped from failure list), Duty Handover 08:06 WAT (Qazim → Afeez, 14/17 confirmed stable), TACHA Backoffice update 06:54 WAT (June Johnson, internal Layer 1 to:me), Union RC96 thread (no new activity post-resolution). Implicit FCMB P1 closure resolves morning briefing D1 stale-by-trajectory."
updated: "2026-04-25T07:18:31Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T07:10:00Z"
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

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, 4 in-window threads (FCMB implicit-resolved via 14/17 trajectory)

08:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=mid-morning post-briefing tick with active P1 requiring delta-check across all sources). Window 05:09:54Z → 07:10:00Z = ~2h. **4 in-window threads from `(FCMB OR RC91 OR RC96 OR P1 OR outage OR Stanbic OR Habari OR Zenith OR Union OR Ecobank OR NIBSS) after:2026/04/25` + `to:me after:2026/04/25`:**

1. **Thread 19dc23924c6ed10a — "Re: Hourly Reports 20260425"** ([[Qazim Adedigba]] → aptpaytechnicalsupport, 07:02 WAT update on existing thread). **14 of 17 routes are operational** (vs 10/17 at 02:20 WAT). Failure list reduced to: "Coralpay banks (FBN, PVB, and SBP) were turned off due to business decisions." Account Switch transactions processing fine. All portals up. Awaiting authorisation for Window 4/Window 1 reports. Stanbic sweep schedule unchanged. **Net delta: FCMB, Habari, Zenith, Union all dropped from failure list** between 02:33 WAT (FCMB P1 post) and 07:02 WAT (this report). Tickets raised: 2; closed: 2 (TDSD-6727 Union RC96 + TDSD-6726 Habari Problem ticket). Open tickets list trimmed (TDSD-6726 removed; TDSD-6276 Union Settlement Problem, TDSD-6695 Account Switch Stopgap, TDSD-6680 Palmpay Portal remain). New observation: "Keystone Bank Settlement (Keystone Participants) for 25th April 2026, 3 AM failed with RC 05, subsequent settlements have completed." Single-cycle settlement RC05; no situation match — routine ops note.

2. **Thread 19dc376af908d69d — "Duty Handover Note 20260425"** ([[Qazim Adedigba]] → [[Afeez Kazeem]], 08:06 WAT). Same 14/17 operational state. Adds: "Coralpay transactions are routed through the CoralPay_Cashout" (failover routing detail). Same Keystone RC05 settlement note + Union N20M settlement window note + UBA pending reports. Afeez Acknowledged 08:10 WAT (no additional content). Process keyword bucket capture (duty handover).

3. **Thread 19dc36afa39a2e3e — "TeamApt Juliana Backoffice Update (TACHA)"** ([[June Johnson]] → 19 recipients including emeka.awagu@teamapt.com Layer 1, 06:54 WAT). Body: "Please find the attached update regarding Juliana Backoffice (TACHA). If you have any questions, kindly let me know." Attachment-based update; no text content beyond cover note. Recipients include TeamApt + Moniepoint stakeholders (dajalie, frank.atashili, kevin.ngeno, tunde.okufi, abeeb.ahmad, christopher.ogbosuka, ravi.veluguleti, wycliffe.ochieng, ialiyu, abiodun.famoye, dojinaka@moniepoint.com, mdavies@moniepoint.com, projectdelivery@, teamaptoperations@). Layer 1 to:me bucket capture. No action keyword, no urgency markers — informational distribution. Awareness-tier accumulation; pre-read attachment when convenient (no time-sensitive deadline).

4. **Thread 19dc1fd7e4326d6a — "Union Bank | ATS | RC 96 Failure | 20260425 | TDSD-6727"** — already captured in 06:09 WAT briefing-tick (A1). No new in-window activity (last message 02:52 WAT). Retained in result set due to issuer-bucket query; client-side filter recognized as pre-existing.

**No Layer 1 to:me action-required threads.** No P1 declarations, no escalation requests, no governance/regulatory deadlines. Cross-source: Slack 5 Tier 1 silent; Jira 1 delta (TDSD-6727 → Completed at 08:11 WAT, formalizing the bank-resolved Union RC96); calendar 0 (weekend clear).

**Implication for morning briefing items:**
- **briefing-2026-04-25 D1 (FCMB RC91 P1 active 3h36m+):** Stale-resolved by trajectory. The 07:02 WAT hourly report removes FCMB from failure list. No explicit closure post in Slack — Slack-only P1 → no Jira ticket → no formal closure cadence (process gap captured in briefing factors). The morning briefing's three options (CTO-DM / hold / push for route-off) are now retrospectively answered: option 2 (hold) was the right call; ops absorbed the cycle without CTO escalation. Total duration ~4h-ish (02:33 WAT → before 07:02 WAT). Recommended next-briefing-tick: A-item noting the implicit resolution with calibration trace.
- **briefing-2026-04-25 D2 (multi-bank degradation 10/17 → systemic frame):** Trajectory has resolved toward 14/17 with only Coralpay-suite (business-decision off) remaining. The recommended option 1 (hold to systemic synthesis) was correct; pattern absorbed without CTO escalation. Recommended next-briefing-tick: A-item noting trajectory completion.

Factors: `skim_tick`, `saturday_mid_morning`, `4_in_window_threads`, `hourly_report_14_17_operational_vs_10_17_at_0220wat`, `4_route_recovery_fcmb_habari_zenith_union`, `briefing_d1_stale_resolved_by_trajectory`, `briefing_d2_systemic_resolution_path`, `duty_handover_qazim_to_afeez_ack`, `tacha_backoffice_layer1_to_me_attachment_only`, `keystone_rc05_single_cycle_settlement_routine`, `union_n20m_settlement_window_known_issue`, `cross_source_jira_tdsd6727_completed_alignment`, `no_immediate_dispatch_this_tick`.

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
