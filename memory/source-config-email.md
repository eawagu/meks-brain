---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T14:09:00Z (15:09 WAT). 15:09 WAT Apr 24 full-level tick: Layer 1 returned 0 new threads in the 14:09→15:09 WAT window. Layer 2 issuer-bucket returned 3 reconciliation-workstream threads — Stanbic settlement validation pending (19dbfa48d456d605, 14:18 WAT), Stanbic DCIR API documentation follow-up (19dbfae110fa739c, 14:28 WAT), Union Bank chargeback reminder (19d77d38df87404c, 14:49 WAT). All Awareness-level; no Immediate dispatch. MCP health holding 30h+ post-recovery."
updated: "2026-04-24T14:20:45Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T14:09:00Z"
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

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level tick

15:09 WAT Apr 24 tick.

**Layer 1 `to:me newer_than:1h`** returned **0 genuinely-new threads** in the 14:09→15:09 WAT window. (Query returned stale threads from Jan–Feb 2026, indicating `newer_than:1h` filter did not apply — all dates predate cutoff. Interpretation: no new Layer 1 activity in the tick window.)

**Layer 2 operational+issuer bucket** `(RC91 OR RC05 OR RC06 OR RC69 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover") newer_than:1h` returned stale threads (no new hits in window).

**Layer 2 issuer bucket** `(Stanbic OR Monnify OR Keystone OR Union OR Wema OR FCMB OR UBA OR Fidelity OR Sterling OR Polaris OR Access) newer_than:1h` returned **3 threads with in-window messages**:

- **19d77d38df87404c — "Re: TEAMAPT UNABLE TO RAISE TRANSACTIONS 0153157786 0221367330 0024665976", 14:49 WAT Apr 24** — `aptpaytechnicalsupport@teamapt.com` (Comfort Iheanacho signing, Cards and Alternate Chan. Dispute Resolution) → Union Bank dispute team + Moniepoint dispute team. Body: "A gentle reminder for the below transactions." **Third chase on a ~14-day-old Union Bank chargeback-raising issue** (first message Apr 10, revival Apr 23 09:25 WAT, chase Apr 24 14:49 WAT). Reconciliation-workstream signal — Union Bank chargeback-raising pipeline blocked on 3 specific card transactions. Awareness only — not matching an active situation (distinct from Union Bank RC91 pattern; this is card-layer chargeback-raising, not switch-layer routing). Factors: `source=email`, `sender=comfort_iheanacho_aptpaytechnicalsupport`, `issuer=union_bank`, `reconciliation_workstream`, `14_day_thread_age`, `3rd_chase_apr10_apr23_apr24`, `awareness_only`, `no_immediate_dispatch`.

- **19dbfa48d456d605 — "Re: TEAMAPT SETTLEMENT ACCOUNT - 0001409339 PENDING VALIDATION FOR 17-04-2026 TO 22-04-2026", 14:18 WAT Apr 24** — NEW thread. `aptpaytechnicalsupport@teamapt.com` → Emeka Joseph (TeamApt) + Stanbic dispute/ChargeBack teams + Moniepoint dispute. Body: "Please, we urgently need your feedback on the status of the attached outstanding transactions. Timely clarification is critical, as these unresolved items are directly affecting our..." 5-day Stanbic settlement account 0001409339 validation backlog (Apr 17-22). Follow-up at 14:23 WAT: `david.oseji@teamapt.com` replied "@TechnologyCardSupport kindly assist with a session." **Urgency keyword ("urgently") + 5-day transaction backlog.** Reconciliation-workstream signal; Emeka Joseph is the internal TeamApt contact ping, not CTO. Not a P1/incident signal. Awareness only. Factors: `source=email`, `sender=aptpaytechnicalsupport`, `issuer=stanbic`, `reconciliation_workstream`, `5_day_transaction_backlog`, `urgency_keyword`, `david_oseji_follow_up_session_ask`, `internal_ping_not_cto`, `awareness_only`, `no_immediate_dispatch`.

- **19dbfae110fa739c — "RE: API DOCUMENTATION FOR THE DCIR PLATFORM", 14:28 WAT Apr 24** — `aptpaytechnicalsupport@teamapt.com` (Nosarieme Faluyi signing, Stanbic side) → Emeka Joseph (TeamApt). Body: "Are there any other ways (like an API endpoint) where we can retrieve the Card Acceptor ID? This information is not available in our core banking..." Follow-up on Stanbic's DCIR API documentation request (Apr 17 → Apr 18 → Apr 23 → Apr 24). Stanbic asking TeamApt for API path to retrieve card acceptor ID. Awareness only — Stanbic reconciliation-process signal, not an operational incident. Emeka Joseph is the internal contact. Factors: `source=email`, `sender=nosarieme_faluyi_via_aptpaytechnicalsupport`, `issuer=stanbic`, `dcir_api_documentation`, `reconciliation_workstream`, `7_day_thread_age`, `awareness_only`, `no_immediate_dispatch`.

**Net deltas this tick:** 3 Stanbic+Union reconciliation-workstream threads (Awareness, no situation match — none are operational incidents). No NIBSS/Ecobank/Monnify deltas in email window (those are captured by Jira sweep this tick).

MCP health holding — 30h+ post-recovery from the ~64h auth-failure dark window.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick (preserved summary)

14:09 WAT Apr 24 tick: Layer 2 issuer bucket returned Ecobank DCIR user-creation 3-week escalation email (thread 19dbf704dc7edb8a, 13:21 WAT) — third DCIR-portal failure mode layer on Ecobank (admin-layer onboarding, distinct from transaction-routing RC91 + portal-access TDSD-6711). Folded into Ecobank situation as 2026-04-24 14:09 WAT delta.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick (preserved summary)

13:09 WAT Apr 24 tick: Layer 1 returned 5 threads — 1 significant (Pawel Swiatek Org Changes UPDATED invitation 11:18 WAT, meeting time shifted 16:00→16:30 WAT). Layer 2 operational+issuer bucket returned Afeez Kazeem → NIBSS PTSA 11:56 WAT formal pattern-escalation email.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim-elevated-to-full tick (preserved summary)

12:09 WAT Apr 24 tick: Layer 1 returned 1 metaview.ai HoE interview-ready notification (skipped); Layer 2 operational+issuer bucket returned Union Bank TEAMAPT TRANSACTION STATUS CONFIRMATION thread with 2 new messages.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Layer 2 returned 2 NIBSS PTSA watchpoint signals — NEW NIBSS attribution-contested reply 10:56 WAT + Mustapha Ajibade 11:24 WAT revival follow-up. Cross-source: TDSD-6716 formal Jira Incident filed 10:18 WAT.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: Layer 2 operational+issuer bucket returned NEW NIBSS PTSA thread 19dbec21731fddeb Afeez Kazeem → NIBSS PTSA at 10:10 WAT "SUCCESSFUL RESPONSE NOT SENT| 20260424."

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full backlog catch-up (preserved summary)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure Apr 23; TeamApt Org Changes invite (→ briefing D2); Jira approval queue (→ briefing D3); Wema Bank RC91/22 Apr 23; Union Bank RC69 Apr 23 first observation; AWS Outposts case 7-day prompt. Backlog catch-up complete; `last_processed` advanced from 2026-04-20T16:09:00Z to 2026-04-24T05:09:00Z.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Surfaced as briefing-2026-04-22 B2 and briefing-2026-04-23 D4. Recovery confirmed 09:11 WAT Apr 23.
