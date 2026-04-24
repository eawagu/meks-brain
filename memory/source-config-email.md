---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T16:09:00Z (17:09 WAT). 17:09 WAT Apr 24 full-level tick: Layer 1 returned 1 new thread — **Tracy Ojaigho TPP x Platformization invite 16:31 WAT for Mon Apr 27 11:30-12:00 WAT** (attendees Emeka + Ravi Jakhodia Moniepoint + Frank Atashili — strategic follow-up to today's Org Changes meeting, thematic cluster with [[TeamApt-Platformization-Org-Movements (1)]]). Layer 2 issuer-bucket + operational returned 4 Awareness threads (VALIDATION OF CLAIMS Apr 21 + Apr 22 delivery by Qazim; MONIEPOINT TRANSACTIONS-24042026 dispute handling 15:59-16:02 WAT). No Immediate dispatch. MCP health holding 32h+ post-recovery."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T16:09:00Z"
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

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level tick, 1 Layer 1 strategic invite

17:09 WAT Apr 24 tick.

**Layer 1 `to:me newer_than:1h`** returned **1 genuinely-new thread** in the 16:09→17:09 WAT window:

- **19dc01ddeb0473fb — "Invitation: TPP x Platformization @ Mon Apr 27, 2026 11:30am - 12pm (WAT)", 15:31 UTC (16:31 WAT) Apr 24** — `tracy.ojaigho@teamapt.com` → Emeka + Ravi Jakhodia (ravi.jakhodia@moniepoint.com, Moniepoint parent-co stakeholder) + Frank Atashili. Google Meet attached. **Next-weekday (Monday Apr 27) 30-min strategic meeting.** Thematic cluster: (1) today's 16:30–18:00 WAT TeamApt Org Changes meeting (briefing-2026-04-24 D2, Pawel Swiatek organizer, currently in progress); (2) Frank's TeamApt-Platformization-Org-Movements Google Slides shared 18:17 WAT Apr 22 (briefing-2026-04-24 A7); (3) [[TeamApt Organizational Restructuring]] concept (2026-04-16 tech function migration + 2026-04-22 Phase 1 org movements). TPP likely = **Third-Party Processing**, one of the OpCo business lines under the Switching & Processing merger ([[Babatunde Okufi]] CBDO double-hat per Frank's Apr 22 brief). Tracy Ojaigho is the IPCo Head of [[CI&P]] per Frank's brief — this invite's framing "TPP x Platformization" suggests structural discussion of how TPP fits into the platformization design. **Briefing-2026-04-25 Decision/Awareness candidate** — depending on outcome of today's Org Changes meeting (D2), Apr 27 follow-up may need prep posture decision. Factors: `source=email`, `layer_1_to_me`, `sender=tracy_ojaigho`, `recipient_moniepoint_parent_co=ravi_jakhodia`, `strategic_keyword=platformization+tpp`, `next_weekday_30min_meeting`, `thematic_cluster_org_changes`, `active_situation_match=teamapt_organizational_restructuring`, `briefing_2026_04_25_candidate`, `no_immediate_dispatch`.

**Layer 2 operational bucket** `(RC91 OR RC05 OR RC06 OR RC69 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover") newer_than:1h` returned **0 new threads** in the 16:09→17:09 WAT window.

**Layer 2 issuer bucket** `(Stanbic OR Monnify OR Keystone OR Union OR Wema OR FCMB OR UBA OR Fidelity OR Sterling OR Polaris OR Access) newer_than:1h` returned **3 threads with in-window messages**:

- **19db44306c2e8b62 — "Re: VALIDATION OF CLAIMS ABOVE 6 MONTHS 22/04/2026", 15:20 UTC (16:20 WAT) Apr 24** — Qazim Adedigba → Victor Orukpe (UBA) + UBA dispute team + Moniepoint dispute: *"Please find attached the validation of claims report for 22nd of April, 2026."* Routine reconciliation-workstream delivery for Apr 22 claims batch. Factors: `source=email`, `sender=qazim_adedigba`, `issuer=uba`, `reconciliation_workstream`, `routine_delivery`, `awareness_tier`.

- **19db073a0e7d3595 — "Re: VALIDATION OF CLAIMS ABOVE 6 MONTHS 21/04/2026", 15:14 UTC (16:14 WAT) Apr 24** — Qazim → Victor Orukpe (UBA) + dispute teams: validation report for 21st of April. Routine. Factors: `source=email`, `sender=qazim_adedigba`, `issuer=uba`, `reconciliation_workstream`, `routine_delivery`, `awareness_tier`.

- **19dc00b0d62f9bc1 — "Re: MONIEPOINT TRANSACTIONS-24042026", 15:10 UTC → 16:02 UTC Apr 24** — aptpaytechnicalsupport → Moniepoint dispute team with CCs to compliance, Access Bank (Card Dispute Resolution), UPSL. Thread: TeamApt reviews transactions for cardholder credit determination; refunds processed; clarification with Chiamaka Paul-Igwilo (Access Bank) that transactions failed and should be treated as such with UPSL reversal settlement date. Routine inter-bank dispute-handling workstream. Factors: `source=email`, `sender=aptpay_technical_support`, `issuer=access+moniepoint`, `dispute_handling_workstream`, `routine_delivery`, `awareness_tier`.

**Layer 2 governance/process bucket** `(board OR audit OR PCI OR compliance OR regulator OR CBN OR "weekly status" OR RCA) newer_than:1h` returned **0 new threads**.

**Net deltas this tick:** 1 Layer 1 strategic invite (Tracy TPP x Platformization Apr 27) + 3 Layer 2 routine reconciliation/dispute threads. No Immediate dispatch. MCP health holding 32h+ post-recovery.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick (preserved)

16:09 WAT Apr 24 tick: Layer 1 0 new threads. Layer 2 operational+issuer bucket returned Afeez Duty Handover Note #20260424 16:07 WAT (Ecobank route back ON — absent from turned-off list; First Bank/Providus/Sterling still off) + UBA RC91 email filing 15:27 WAT (TDSD-6722 28m fast-close) + Daily Report 15:47 WAT + VALIDATION OF CLAIMS UBA thread continuation 15:08 WAT. Governance bucket returned Tolulope Obianwu 14:46 WAT to Dennis Ajalie CC Emeka — Request for Executive-Level Engagement with Fidelity Bank on Settlement Structure (TACHA overdraft-enabled settlement account). **Briefing-2026-04-25 Awareness candidate** (governance escalation thread to track).

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level tick (preserved summary)

15:09 WAT Apr 24 tick: Layer 2 issuer-bucket returned 3 reconciliation-workstream threads — Stanbic settlement validation pending, Stanbic DCIR API documentation follow-up, Union Bank chargeback reminder. All Awareness-level.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick (preserved summary)

14:09 WAT Apr 24 tick: Layer 2 returned Ecobank DCIR user-creation 3-week escalation email (thread 19dbf704dc7edb8a, 13:21 WAT) — third DCIR-portal failure mode layer.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure; TeamApt Org Changes invite; Jira approval queue; Wema Bank RC91/22 Apr 23; Union Bank RC69 Apr 23; AWS Outposts 7-day prompt. Backlog catch-up complete.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
