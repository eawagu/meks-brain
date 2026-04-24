---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T06:10:00Z (07:10 WAT). 07:10 WAT Apr 24 zero-delta tick: Layer 1 to:me + operational+issuer keyword bucket both returned 0 in 2h window. MCP health holding post-recovery."
updated: "2026-04-24T06:16:56Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T06:10:00Z"
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

## Notes

### last_processed 2026-04-24T06:10:00Z (07:10 WAT) — zero-delta tick

07:10 WAT Apr 24 tick: Layer 1 `to:me newer_than:2h` returned 0 threads. Operational+issuer+process keyword bucket `(RC91 OR RC05 OR RC69 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover" OR Stanbic) newer_than:2h` returned 0 threads. Zero signals in 1h post-briefing window. MCP health holding — 22h+ post-recovery (recovered ~09:11 WAT Apr 23). No Ecobank thread activity since 21:33 WAT Qazim portal-inaccessibility email yesterday, consistent with route-off overnight state (bank working their side, no TeamApt-initiated chase this morning yet).

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full backlog catch-up

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets (Layer 1 to:me, operational keywords, issuer bucket 1, issuer bucket 2, governance/process). Issuer bucket 2 (Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) exceeded token budget — output overflowed to persisted file; not re-read (coverage duplicated from operational + issuer bucket 1 sweeps).

**Key signals captured this tick (chronological, pre-briefing-tick window):**

- **Ecobank compound failure Apr 23** — three RC91 cycles (morning 06:35 WAT thread 19db8d64f00a406d, afternoon 14:38 WAT thread 19dbac740631c4f9 resurfaced 17:36 WAT, evening listed in Qazim 21:36 WAT hourly report) + **DCIR portal inaccessibility** (Qazim 21:33 WAT email thread 19dbc43766215aeb, paired with TDSD-6711 22:32 WAT filing). Mayowa attribution-mismatch pattern 3-for-3 week-to-date. Surfaced as briefing-2026-04-24 D1. [[Ecobank — RC91 on NUS Nodes]] situation updated.

- **TeamApt Org Changes invite** — Pawel Swiatek Gmail thread 19dba55e567fab81 13:34 WAT Apr 23 delivering Fri Apr 24 16:00–18:00 WAT calendar invite. Paired with [[Frank Atashili]] drive-share thread 19db668f77e3591f "TeamApt-Platformization-Org-Movements" 18:17 WAT Apr 22. Surfaced as briefing-2026-04-24 D2 + A7.

- **Jira approval queue** — TDSD-6699 Firewall HA 13:32 WAT Apr 23 (paired email from Fumbi Lawrence to Tolu Aina primary-approver), TDSD-6690 15:56 WAT Apr 22 (Ekene Udodi). Surfaced as briefing-2026-04-24 D3.

- **Wema Bank RC91/22 Apr 23** — thread 19dbb0b85f40d34d filed 15:52 WAT Qazim, resurfaced 18:27 WAT, final fine 18:44 WAT; TDSD-6705 Completed 18:45 WAT. Within-pattern. A9.

- **Union Bank RC69 Apr 23 11:12 WAT** — thread 19dba0af1a6fc7a2 Olamide Ajibulu to itechannels@ — first RC69 observation on Union Bank. A10.

- **AWS Outposts case 177635165100470** — "Attention required" 7-day inactivity prompt thread 19dbb3e96bb83fc2 16:48 WAT Apr 23. Situation-delta for [[AWS Outposts — Three Concurrent Health Events]]. A8.

- **FCMB Pending Failed Dcir Transactions** — thread 19dbaeba45c8cc11 15:17 WAT Apr 23 — routine bulk requery filing.

- **Ecobank FAILED BUT SETTLED TRANSACTION** — thread 19db97326ff1ab7a 08:26 WAT Apr 23, then recalled 3x in 13s window. Routine.

- **Duty Handover chains Apr 22/Apr 23** — Olamide→Qazim + Qazim→Daniel. Apr 23 23:06 WAT handover confirms Ecobank explicitly failing RC 91, route off going into overnight.

- **Hourly Reports 20260423** — 17:29 WAT (13/17 routes, Ecobank not yet turned off), 21:36 WAT + 23:03 WAT (12/17 routes, Ecobank failing RC 91 listed).

- **Ha-Shem Academy training cold outreach** — thread 19db5e4896ca64c9 — skipped per marketing rule.

- **BambooHR time-off approvals pending** — thread 19db996af0c72b5a — administrative, Awareness-level if surfaced.

- **Greenhouse interview scorecards** — Kuldeep Singh reminder thread 19dbb2d82e8ce66f 16:30 WAT Apr 23; Venkatesh today-interview reminder thread 19dbc92ab7dd3326 23:00 WAT Apr 23.

- **BambooHR "Welcome 7 New Team Members"** — thread 19dbdaaf86ee01a8 04:06 WAT Apr 24 — informational.

**Backlog catch-up complete.** `last_processed` advanced to 2026-04-24T05:09:00Z. No deferred signals remaining from the Apr 20–23 window.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Surfaced as briefing-2026-04-22 B2 and briefing-2026-04-23 D4. Recovery confirmed 09:11 WAT Apr 23; `last_processed` held at 2026-04-20T16:09:00Z pending this briefing-tick catch-up.
