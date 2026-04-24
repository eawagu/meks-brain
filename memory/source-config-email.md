---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T17:22:16Z (18:22 WAT). 18:22 WAT Apr 24 skim-level off-cron zero-delta tick (13min after prior 18:09 WAT): broad `newer_than:1h` query returned 0 threads in the 17:09→17:22 UTC window. MCP health holding 33h+ post-recovery."
updated: "2026-04-24T17:32:25Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T17:22:16Z"
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
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta. Observed 2026-04-24 18:09 tick: all 4 buckets returned the same January 2026 Zone<>TeamApt Juliana Switch thread despite empty in-window state.

## Notes

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim-level off-cron zero-delta tick

18:22 WAT Apr 24 off-cron tick (13min after prior 18:09 WAT cron tick): single consolidated `search_threads(newer_than:1h)` returned empty result set for the 17:09→17:22 UTC window. Skim-level delta-check satisfies per-source sweep requirement; no need for 4-bucket split at this delta size.

Factors: `zero_delta`, `no_immediate_dispatch`, `off_cron_tick`, `user_in_meeting`.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta tick (preserved)

18:09 WAT Apr 24 tick. All 4 bucket queries returned only a cached residual thread (Zone<>TeamApt Juliana Account Transfer Switch Requirements, thread 19be1a59539e3734, latest message 2026-01-23 17:54 UTC). Applied client-side filter (most-recent-message timestamp > 2026-04-24T16:09:00Z): **0 new threads**. This is the first observation of the residual-cache behavior — documented as a known limitation above for future ticks.

- **Layer 1 `to:me newer_than:1h`** — 0 genuinely new threads.
- **Layer 2 operational bucket** `(RC91 OR RC05 OR RC06 OR RC69 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover") newer_than:1h` — 0 genuinely new threads.
- **Layer 2 issuer bucket** `(Stanbic OR Monnify OR Keystone OR Union OR Wema OR FCMB OR UBA OR Fidelity OR Sterling OR Polaris OR Access) newer_than:1h` — 0 genuinely new threads.
- **Layer 2 governance/process bucket** `(board OR audit OR PCI OR compliance OR regulator OR CBN OR "weekly status" OR RCA) newer_than:1h` — 0 genuinely new threads.

Cross-source: Slack all 5 Tier 1 channels silent; Jira 1 Layer A delta (TDSD-6713 Keystone Completed 17:43 WAT) + 2 Layer B deltas (ADD-4429/4426 DD bug fixes Done). Calendar 0 new events. Drive 0 new files. Briefing-2026-04-24 D2 Org Changes meeting concluded 18:00 WAT; no email fallout into this window yet.

Factors: `zero_delta`, `no_immediate_dispatch`, `residual_cache_behavior_observed_first_time`.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level tick, 1 Layer 1 strategic invite (preserved)

17:09 WAT Apr 24 tick. Layer 1 returned 1 genuinely-new thread in the 16:09→17:09 WAT window:

- **19dc01ddeb0473fb — "Invitation: TPP x Platformization @ Mon Apr 27, 2026 11:30am - 12pm (WAT)", 15:31 UTC (16:31 WAT) Apr 24** — `tracy.ojaigho@teamapt.com` → Emeka + Ravi Jakhodia (ravi.jakhodia@moniepoint.com, Moniepoint parent-co stakeholder) + Frank Atashili. Next-weekday 30-min strategic meeting. Thematic cluster with today's Org Changes meeting (briefing-2026-04-24 D2) + Frank's TeamApt-Platformization-Org-Movements shared 18:17 WAT Apr 22. Briefing-2026-04-25 Decision/Awareness candidate.

Layer 2 issuer bucket returned 3 routine reconciliation-workstream threads (UBA validation of claims Apr 21/Apr 22, Moniepoint-Access dispute handling). All Awareness-level; no Immediate dispatch. MCP health 32h+ post-recovery.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick (preserved)

16:09 WAT Apr 24 tick: Layer 1 0 new threads. Layer 2 operational+issuer bucket returned Afeez Duty Handover Note #20260424 16:07 WAT (Ecobank route back ON) + UBA RC91 email filing 15:27 WAT + Daily Report + VALIDATION OF CLAIMS UBA thread continuation. Governance bucket returned Tolulope Obianwu 14:46 WAT Request for Executive-Level Engagement with Fidelity Bank on Settlement Structure.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level tick (preserved summary)

15:09 WAT Apr 24 tick: Layer 2 issuer-bucket returned 3 reconciliation-workstream threads — Stanbic settlement validation pending, Stanbic DCIR API documentation follow-up, Union Bank chargeback reminder. All Awareness-level.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick (preserved summary)

14:09 WAT Apr 24 tick: Layer 2 returned Ecobank DCIR user-creation 3-week escalation email (thread 19dbf704dc7edb8a, 13:21 WAT).

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure; TeamApt Org Changes invite; Jira approval queue; Wema Bank RC91/22 Apr 23; Union Bank RC69 Apr 23; AWS Outposts 7-day prompt. Backlog catch-up complete.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
