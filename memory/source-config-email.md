---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T12:09:00Z (13:09 WAT). 13:09 WAT Apr 24 full-level tick: Layer 1 returned 5 threads — 1 significant (Pawel Swiatek Org Changes UPDATED invitation 11:18 WAT, meeting time shifted 16:00→16:30 WAT — calendar D2 refinement), 4 skipped (CEO Gazette newsletter, Greenhouse scorecard reminder, Greenhouse permissions, gemini-notes auto-digest). Layer 2 operational+issuer bucket returned Afeez Kazeem → NIBSS PTSA 11:56 WAT formal pattern-escalation email (thread 19dbf59f056a7ee0, subject 'Persistent Intermittent Failure (RC91) and Transaction Non-Receipt via PTSA Route', CCing CTO Oladapo Onayemi + Moniepoint Sholotan + networkmanagement) — NIBSS PTSA watchpoint formal-escalation-layer signal. MCP health holding 28h+ post-recovery."
updated: "2026-04-24T13:23:28Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T13:09:00Z"
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

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick

14:09 WAT Apr 24 tick.

**Layer 1 `to:me newer_than:1h`** returned **0 threads**. Clean Layer 1 window.

**Operational+issuer keyword bucket** `(RC91 OR RC05 OR RC69 OR RC06 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover") newer_than:1h` returned **1 significant thread**. **Issuer bucket** `(Stanbic OR Monnify OR Keystone OR Union OR Wema OR FCMB OR UBA OR Fidelity OR Sterling OR Polaris OR Access) newer_than:1h` returned the same thread (deduplicated):

- **19dbf704dc7edb8a — USER CREATION ISSUE ON DCIR PORTAL - REQUEST FOR REVIEW, 13:21 WAT Apr 24** — sent 12:21:32 UTC (13:21 WAT). **Sender:** aptpaytechnicalsupport@teamapt.com (TeamApt shared support address). **To:** feyisayo.oyeniran@teamapt.com, aptpaytechnicalsupport@teamapt.com (self-CC). **CC:** OLOGUNSANYA@ecobank.com, ENGCardsandSwitchServices@ecobank.com. Body text signed by Adewuyi Mayowa (Ecobank Cards & Switch Services) and written in first-person-Ecobank voice ("your team," "our Wintel team," "our User Access team") — this is a forward/relay of Mayowa's formal escalation from the Ecobank side through TeamApt's support inbox back to Ecobank leadership. **Body excerpt:** *"We would like to formally escalate an ongoing issue regarding user creation on the DCIR portal, which has persisted for approximately three weeks now. We have carried out joint reviews involving your team, our Wintel team, and User Access team. Our Wintel team has also confirmed that no recent changes were made from their end, however the issue remains unresolved. Given that a recent patch/upgrade was applied on the web server, we kindly request your support to review the application impact of this upgrade, possibly starting from the test environment, to help identify the root cause. We would appreciate your prompt attention to this matter, as it impacts user onboarding on the DCIR portal."* **Situation match:** [[Ecobank — RC91 on NUS Nodes]] — this is a **third DCIR-portal failure mode layer** distinct from (a) transaction-routing RC91 cycles and (b) TDSD-6711 portal-access inaccessibility (Apr 23 22:32 WAT). User-creation (admin-layer onboarding) is a new failure surface with **3-week persistence** — predates both the RC91 cycles and the portal-access layer chronologically. Mayowa suspects recent web-server patch/upgrade. Folded into Ecobank situation as 2026-04-24 14:09 WAT delta. **Strengthens briefing-2026-04-24 D1 CTO-escalation case** — structural concern extends beyond cycle-handling to admin-platform destabilization across 3 weeks on Ecobank's DCIR portal. Awareness — no Immediate dispatch (issue is 3-week persistent, not a new event). Briefing-2026-04-25 Awareness candidate. Factors: source=email, active_situation_entity_match=ecobank, third_failure_mode_dcir_user_creation, 3_week_persistence, mayowa_signed_from_ecobank_forwarded_via_teamapt_support, cross_team_joint_review_no_resolution, patch_upgrade_root_cause_candidate, admin_platform_destabilization, strengthens_d1_cto_escalation_case, no_immediate_dispatch, briefing_2026_04_25_awareness_candidate.

**Net deltas this tick:** 1 significant Ecobank DCIR user-creation 3-week-escalation email (Awareness, situation delta on Ecobank).

MCP health holding — 29h+ post-recovery from the ~64h auth-failure dark window.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick (preserved summary)

13:09 WAT Apr 24 tick: Layer 1 returned 5 threads — 1 significant (Pawel Swiatek Org Changes UPDATED invitation 11:18 WAT, meeting time shifted 16:00→16:30 WAT — calendar D2 refinement), 4 skipped (CEO Gazette newsletter, Greenhouse scorecard reminder, Greenhouse permissions, gemini-notes auto-digest). Layer 2 operational+issuer bucket returned Afeez Kazeem → NIBSS PTSA 11:56 WAT formal pattern-escalation email (thread 19dbf59f056a7ee0, subject 'Persistent Intermittent Failure (RC91) and Transaction Non-Receipt via PTSA Route', CCing CTO Oladapo Onayemi + Moniepoint Sholotan + networkmanagement) — NIBSS PTSA watchpoint formal-escalation-layer signal.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim-elevated-to-full tick (preserved summary)

12:09 WAT Apr 24 tick: Layer 1 returned 1 metaview.ai HoE interview-ready notification (skipped per automated-sender rule); Layer 2 operational+issuer bucket returned Union Bank TEAMAPT TRANSACTION STATUS CONFIRMATION thread with 2 new messages — 11:10 WAT Adeyinka Taiwo (Union Bank) feedback chase + 11:15 WAT Emeka Joseph reply (blocked-on-bank-technical-team; database env access unavailable). Reconciliation workstream signal; Awareness only.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Layer 1 returned 3 threads (GitLab self-sign-in skipped, Phoenix recurring invite skipped, stale Paystack thread); Layer 2 operational+issuer bucket returned 2 NIBSS PTSA watchpoint signals — NEW NIBSS attribution-contested reply 10:56 WAT on Apr 24 thread + Mustapha Ajibade 11:24 WAT revival follow-up on Apr 22 thread. Cross-source: TDSD-6716 formal Jira Incident filed 10:18 WAT completes 3-point proto-pattern.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: Layer 1 returned 1 BambooHR time-off approvals reminder (Awareness-only, skip-rule applies but queued); operational+issuer bucket returned NEW NIBSS PTSA thread 19dbec21731fddeb Afeez Kazeem → NIBSS PTSA at 10:10 WAT "SUCCESSFUL RESPONSE NOT SENT| 20260424" (distinct failure mode from retired VPN flap; watchpoint-match delta folded into situation page).

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full backlog catch-up (preserved summary)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure Apr 23 (3 RC91 cycles + DCIR portal); TeamApt Org Changes invite (Pawel Swiatek → briefing D2); Jira approval queue (TDSD-6699 + TDSD-6690 → briefing D3); Wema Bank RC91/22 Apr 23 single-day cycle; Union Bank RC69 Apr 23 first observation; AWS Outposts case 177635165100470 7-day inactivity prompt; various HR + interview scorecard reminders. Backlog catch-up complete; `last_processed` advanced from 2026-04-20T16:09:00Z to 2026-04-24T05:09:00Z.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Surfaced as briefing-2026-04-22 B2 and briefing-2026-04-23 D4. Recovery confirmed 09:11 WAT Apr 23.
