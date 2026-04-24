---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T09:09:00Z (10:09 WAT). 10:09 WAT Apr 24 skim elevated to full: Layer 1 returned 1 BambooHR time-off approvals reminder (Awareness-only, skip-rule applies but queued); operational+issuer bucket returned NEW NIBSS PTSA thread 19dbec21731fddeb Afeez Kazeem → NIBSS PTSA at 10:10 WAT \"SUCCESSFUL RESPONSE NOT SENT| 20260424\" (distinct failure mode from the retired VPN flap; watchpoint-match delta folded into situation page). MCP health holding — 25h+ post-recovery."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T09:09:00Z"
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

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta

10:09 WAT Apr 24 tick.

**Layer 1 `to:me newer_than:1h`** returned **1 thread**:
- **19dbebd659fb5484** — BambooHR time-off approvals reminder from `notifications@app.bamboohr.com` at 09:06 WAT: *"Your Team's Pending Time Off Approvals... Outstanding Approvals: Ravi Kiran Veluguleti Wed, Apr 01 1 day of Sick [and] Muhammad Samu..."* Automated sender. Per skip rule "Automated status emails without operational keywords — discard unless matches active-situation entity" — no operational keyword; no active-situation entity match. BUT it is a direct to:me approval-queue prompt (admin action-required). Classification: Awareness-only queue for next-briefing A-item if not superseded; lower priority than D3 pending Jira approvals (TDSD-6699/TDSD-6690) which are infrastructure-scope.

**Operational+issuer keyword bucket** `(RC91 OR RC05 OR RC69 OR RC06 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover" OR Stanbic OR Monnify OR Keystone) newer_than:1h` returned **2 threads**:
- **19dbec21731fddeb — NEW thread** — [[Afeez Kazeem]] → `ptsa@nibss-plc.com.ng` (CC aptpaytechnicalsupport, mustapha.ajibade, oladapo.onayemi, ademola.adefemi@moniepoint, networkmanagement, oladipupo.sholotan@moniepoint) at 10:10 WAT Apr 24. Subject: `NIBSS|SUCCESSFUL RESPONSE NOT SENT| 20260424`. Body: *"we observed that transactions with successful response to you between 09:34AM to 09:36AM were not being sent to Moniepoint. Kindly confirm why the responses for the..."* (snippet truncated in index). **Active-situation entity match** — [[NIBSS]] / NIBSS PTSA. Mechanism: 2-minute window 09:34–09:36 WAT where NIBSS returned successful responses to TeamApt but those responses were not propagated to Moniepoint downstream. Self-resolved; the email is an ask-to-confirm rather than an active-incident escalation. **Distinct failure mode from the retired VPN-flap pattern** — routing/forwarding rather than connectivity. Watchpoint-match delta folded into [[NIBSS PTSA — VPN Flapping Apr 22]] situation (status held `stable`, watchpoint annotation added). If a 2nd response-not-sent signal fires within 48h, spin up a fresh situation page for this non-flap failure mode. No Immediate dispatch (no P1 framing, no outage keyword, no route-off). Factors: source=email, to=ptsa@nibss-plc.com.ng, cc_multi_team, sender=afeez_kazeem, keyword=NIBSS, active_situation_entity_match=nibss_ptsa, distinct_failure_mode_from_flap, self_resolved_2min, watchpoint_match, no_immediate_dispatch.
- **19dbac740631c4f9** — Ecobank RC91 20260423 cycle B stale thread (all 5 returned messages Apr 23 14:38–17:36 WAT; already processed in briefing-2026-04-24 backlog sweep; zero Apr 24 messages). No new delta.

**Net deltas this tick:** 1 Layer 1 Awareness-candidate (BambooHR), 1 Layer 2 watchpoint signal on NIBSS PTSA (situation page updated). Notable absence — no follow-up email from Ecobank side or TeamApt ops re. D1 Ecobank compound failure; route-off state continues without new chase.

MCP health holding — 25h+ post-recovery from the ~64h auth-failure dark window.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — skim tick, 1 Awareness-only delta (preserved)

09:10 WAT Apr 24 tick: Layer 1 returned 2 threads — Lattice weekly update reminder (automated sender, tracked workstream, Awareness-only queue for next briefing) + Confluence daily digest (stale, skipped). Operational+issuer keyword bucket returned 1 stale Ecobank thread (zero Apr 24 deltas). Net 0 operational deltas; 1 Awareness-only Lattice reminder.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — zero-delta tick (preserved)

08:09 WAT Apr 24 tick: Layer 1 returned 1 Confluence daily digest (skipped). Operational+issuer keyword bucket returned 1 stale Ecobank thread. Net 0 actionable email deltas.

### last_processed 2026-04-24T06:10:00Z (07:10 WAT) — zero-delta tick (preserved)

07:10 WAT Apr 24 tick: Layer 1 + operational+issuer keyword bucket both returned 0 in 2h window. Zero signals in 1h post-briefing window.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full backlog catch-up (preserved summary)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure Apr 23 (3 RC91 cycles + DCIR portal); TeamApt Org Changes invite (Pawel Swiatek → briefing D2); Jira approval queue (TDSD-6699 + TDSD-6690 → briefing D3); Wema Bank RC91/22 Apr 23 single-day cycle; Union Bank RC69 Apr 23 first observation; AWS Outposts case 177635165100470 7-day inactivity prompt; various HR + interview scorecard reminders. Backlog catch-up complete; `last_processed` advanced from 2026-04-20T16:09:00Z to 2026-04-24T05:09:00Z.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Surfaced as briefing-2026-04-22 B2 and briefing-2026-04-23 D4. Recovery confirmed 09:11 WAT Apr 23.
