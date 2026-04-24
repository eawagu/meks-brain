---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T11:09:00Z (12:09 WAT). 12:09 WAT Apr 24 skim-elevated-to-full tick: Layer 1 returned 1 metaview.ai HoE interview-ready notification (skipped per automated-sender rule); Layer 2 operational+issuer bucket returned Union Bank TEAMAPT TRANSACTION STATUS CONFIRMATION thread with 2 new messages — 11:10 WAT Adeyinka Taiwo (Union Bank) feedback chase + 11:15 WAT Emeka Joseph reply (blocked-on-bank-technical-team; database env access unavailable). Reconciliation workstream signal; Awareness only. MCP health holding 27h+ post-recovery."
updated: "2026-04-24T11:22:06Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T11:09:00Z"
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

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim elevated to full on delta

12:09 WAT Apr 24 tick.

**Layer 1 `to:me newer_than:1h`** returned **1 thread**:
- **19dbf2c142800c74 — metaview.ai HoE interview-ready notification** from `interview@metaview.ai` at 11:07 WAT: "Your interview with Venkatesh Purushothaman is ready for you to review! Executive Interview 60 minutes • 3 participants." Post-interview transcript notification from the interview recording service — confirms the 11:00 WAT Round 2 HoE interview concluded on schedule. Automated sender, no operational keyword, tracks to HoE interview cluster (briefing-2026-04-24 A6). **Skipped per skip rule "Automated status emails without operational keywords — discard unless matches active-situation entity"** (HoE interview cluster is not a situation). Factors: source=email, automated_sender, interview_transcript_ready, no_operational_keyword, no_situation_match, skip.

**Operational+issuer keyword bucket** `(RC91 OR RC05 OR RC69 OR RC06 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover" OR Stanbic OR Monnify OR Keystone OR Union) newer_than:1h` returned **multiple Union-tagged threads**:

- **19db483a28870f92 — "TEAMAPT TRANSACTION STATUS CONFIRMATION 22.04.2026" (Union Bank reconciliation workstream)** — 2 NEW messages this window:
  - **11:10:45 WAT Apr 24 — Adeyinka Taiwo (Union Bank e-Business Reconciliation, tsadeyinka@unionbankng.com, via aptpaytechnicalsupport@teamapt.com shared-mailbox inbound):** *"Dear Emeka, Awaiting your feedback on the attached status confirmation."* Third chase from the Union Bank reconciliation team on this Apr 22 thread (prior messages: Apr 22 10:26 WAT initial send, Apr 23 10:12 WAT first chase, now Apr 24 11:10 WAT second chase).
  - **11:15:13 WAT Apr 24 — Emeka Joseph reply:** *"Hello Taiwo, We are reviewing this. We cannot access the database environment to provide the transaction status. This is being worked on by the bank's technical team and the request will be completed..."* **Blocked-on-bank-technical-team signal** — TeamApt-side has a named internal dependency on bank-side database env access. Reconciliation workstream, not a P1 or outage.
  - **Disposition:** Awareness — reconciliation workstream chase; bank-side dependency explicitly named. No active Union Bank situation (RC91 Apr 20 retired Apr 20 post-cycle-2 closure). Fold into [[Union Bank]] entity context at next entity refresh. Factors: source=email, active_entity_match=union_bank, bank_technical_team_dependency, reconciliation_workstream, 3rd_chase_cadence_24h, emeka_joseph_responded_same_tick, no_p1_no_outage, awareness_only.

- **19c769a836f53719 — Union Bank NSS Consent thread** — stale Feb-March 2026 content, no Apr 24 delta. Skip (stale).
- **19ce759249dd1f6d — Access Bank DAILY BANK STATEMENT REQUEST** — stale March 2026. Skip (stale).
- **19db4e3461c204ea — NIBSS PTSA Apr 22 response-not-sent thread** — no new messages in 11:09→12:09 WAT window (last message Mustapha Ajibade Apr 24 09:24 UTC = 10:24 WAT, already captured in 11:09 WAT tick).

**Net deltas this tick:** 1 Union Bank reconciliation workstream chase + Emeka Joseph reply (Awareness-only, bank-dependency signal); 1 Layer 1 HoE transcript-ready notification (skipped).

MCP health holding — 27h+ post-recovery from the ~64h auth-failure dark window.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Layer 1 returned 3 threads (GitLab self-sign-in skipped, Phoenix recurring invite skipped, stale Paystack thread); Layer 2 operational+issuer bucket returned 2 NIBSS PTSA watchpoint signals — NEW NIBSS attribution-contested reply 10:56 WAT on Apr 24 thread + Mustapha Ajibade 11:24 WAT revival follow-up on Apr 22 thread. Cross-source: TDSD-6716 formal Jira Incident filed 10:18 WAT completes 3-point proto-pattern. MCP health holding — 26h+ post-recovery.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: Layer 1 returned 1 BambooHR time-off approvals reminder (Awareness-only, skip-rule applies but queued); operational+issuer bucket returned NEW NIBSS PTSA thread 19dbec21731fddeb Afeez Kazeem → NIBSS PTSA at 10:10 WAT "SUCCESSFUL RESPONSE NOT SENT| 20260424" (distinct failure mode from retired VPN flap; watchpoint-match delta folded into situation page). MCP health holding — 25h+ post-recovery.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — skim tick, 1 Awareness-only delta (preserved)

09:10 WAT Apr 24 tick: Layer 1 returned 2 threads — Lattice weekly update reminder (automated sender, tracked workstream, Awareness-only queue for next briefing) + Confluence daily digest (stale, skipped). Operational+issuer keyword bucket returned 1 stale Ecobank thread (zero Apr 24 deltas). Net 0 operational deltas; 1 Awareness-only Lattice reminder.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — zero-delta tick (preserved)

08:09 WAT Apr 24 tick: Layer 1 returned 1 Confluence daily digest (skipped). Operational+issuer keyword bucket returned 1 stale Ecobank thread. Net 0 actionable email deltas.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full backlog catch-up (preserved summary)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure Apr 23 (3 RC91 cycles + DCIR portal); TeamApt Org Changes invite (Pawel Swiatek → briefing D2); Jira approval queue (TDSD-6699 + TDSD-6690 → briefing D3); Wema Bank RC91/22 Apr 23 single-day cycle; Union Bank RC69 Apr 23 first observation; AWS Outposts case 177635165100470 7-day inactivity prompt; various HR + interview scorecard reminders. Backlog catch-up complete; `last_processed` advanced from 2026-04-20T16:09:00Z to 2026-04-24T05:09:00Z.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Surfaced as briefing-2026-04-22 B2 and briefing-2026-04-23 D4. Recovery confirmed 09:11 WAT Apr 23.
