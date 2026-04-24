---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T10:09:00Z (11:09 WAT). 11:09 WAT Apr 24 skim elevated to full: Layer 1 returned 3 threads (GitLab self-sign-in skipped, Phoenix recurring invite skipped, stale Paystack thread); Layer 2 operational+issuer bucket returned 2 NIBSS PTSA watchpoint signals — NEW NIBSS attribution-contested reply 10:56 WAT on Apr 24 thread + Mustapha Ajibade 11:24 WAT revival follow-up on Apr 22 thread. Both folded into [[NIBSS PTSA — VPN Flapping Apr 22]] watchpoint. Cross-source: TDSD-6716 formal Jira Incident filed 10:18 WAT completes 3-point proto-pattern. MCP health holding — 26h+ post-recovery."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T10:09:00Z"
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

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta

11:09 WAT Apr 24 tick.

**Layer 1 `to:me newer_than:1h`** returned **3 threads**:
- **19dbeed2fa93ee61 — GitLab sign-in notification** from `gitlab@mg.gitlab.com` at 10:58 WAT: "Someone signed in to your gitlab.com account from a new location... Emeka Awagu (emeka.awagu)... IP 41.76.192.5... Location Ojota, Nigeria." Automated security alert, sign-in from user's own home location in Lagos (consistent with user activity during working hours). Per skip rule "Automated status emails without operational keywords — discard unless matches active-situation entity" — no operational keyword, no active-situation entity match, self-sign-in confirmed by location. **Skipped — no factor match.** Factors: source=email, automated_sender, self_sign_in_own_location, no_operational_keyword, no_entity_match, skip.
- **19dbeccffe9b0633 — Phoenix Stage 1 Weekly Check-in invitation** from `ravi.jakhodia@moniepoint.com` at 10:23 WAT. Weekly recurring Monday 12-1pm WAT meeting invite. Recurring-metadata pattern; calendar-layer event (next tick calendar sweep will capture it if RSVP status changes). **Skipped per recurring-invite pattern** — not a Gmail-layer operational delta. Factors: source=email, recurring_meeting_invite, calendar_layer_event, skip.
- **19d6844f1a9aa74a — Balance Confirmation for Paystack (stale)**: messages Apr 7-13 returned in result set; no Apr 24 delta. Old thread re-surfaced by Gmail's relevance weighting; zero fresh content.

**Operational+issuer keyword bucket** `(RC91 OR RC05 OR RC69 OR RC06 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover" OR Stanbic OR Monnify OR Keystone) newer_than:1h` returned **2 threads**:

- **19dbec21731fddeb — NIBSS PTSA Apr 24 response-not-sent** — 2 messages observable this tick (one pre-existing, one NEW):
  - 10:10 WAT Afeez Kazeem → ptsa@nibss-plc.com.ng filing (already captured at 10:09 WAT tick).
  - **NEW 10:56 WAT — NIBSS attribution-contested reply** (from=aptpaytechnicalsupport@teamapt.com shared-mailbox inbound from Moses Ajani): *"Dear Afeez, Thank you for your mail. We can confirm that responses were sent to the terminals as received from the processor (Teamapt). Please see the attached request and response log of the..."* — NIBSS asserts responses were delivered downstream, pushing attribution back toward TeamApt. Inverts failure-mode framing. **Watchpoint signal strengthened** — mirrors Ecobank Mayowa attribution-contested pattern applied to NIBSS PTSA counterparty. Folded into [[NIBSS PTSA — VPN Flapping Apr 22]] watchpoint annotation. Factors: source=email, active_situation_entity_match=nibss_ptsa, attribution_contested_reply, second_counterparty_ecobank_mayowa_pattern, watchpoint_strengthened, no_immediate_dispatch.

- **19db4e3461c204ea — NIBSS PTSA Apr 22 response-not-sent thread (revived)** — Mustapha Ajibade 11:24 WAT Apr 24 follow-up on 2-day-old thread: *"Hello Moses, The attached transactions were processed successfully on Teamapt Switch, but the acquirer did not get responses. Please help correlate timestamps and investigate."* Revives pre-transition thread as active chase — signals the Apr 22 pre-transition response-not-sent instance was not considered closed on TeamApt side. Historical context for [[NIBSS PTSA — VPN Flapping Apr 22]] watchpoint. Factors: source=email, active_situation_entity_match=nibss_ptsa, apr22_thread_revival, sender=mustapha_ajibade, mechanism_identical_to_apr24, watchpoint_context_strengthened.

**Cross-source correlation — TDSD-6716 filed 10:18 WAT Apr 24** by Afeez Kazeem formalizes the response-not-sent pattern into a Medium Incident Jira ticket with RC91 + Access + GTBank scope (see source-config-jira for details). Email + Jira + thread-revival form the 3-point proto-pattern captured in the [[NIBSS PTSA — VPN Flapping Apr 22]] watchpoint annotation.

**Net deltas this tick:** 1 Gmail Layer 2 NIBSS-PTSA watchpoint strengthening (+ 1 revived Apr 22 thread on same mechanism). No Layer 1 operational deltas.

MCP health holding — 26h+ post-recovery from the ~64h auth-failure dark window.

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
