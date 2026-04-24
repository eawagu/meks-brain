---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-24T12:09:00Z (13:09 WAT). 13:09 WAT Apr 24 full-level tick: Layer 1 returned 5 threads — 1 significant (Pawel Swiatek Org Changes UPDATED invitation 11:18 WAT, meeting time shifted 16:00→16:30 WAT — calendar D2 refinement), 4 skipped (CEO Gazette newsletter, Greenhouse scorecard reminder, Greenhouse permissions, gemini-notes auto-digest). Layer 2 operational+issuer bucket returned Afeez Kazeem → NIBSS PTSA 11:56 WAT formal pattern-escalation email (thread 19dbf59f056a7ee0, subject 'Persistent Intermittent Failure (RC91) and Transaction Non-Receipt via PTSA Route', CCing CTO Oladapo Onayemi + Moniepoint Sholotan + networkmanagement) — NIBSS PTSA watchpoint formal-escalation-layer signal. MCP health holding 28h+ post-recovery."
updated: "2026-04-24T12:26:51Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T12:09:00Z"
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

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick

13:09 WAT Apr 24 tick.

**Layer 1 `to:me newer_than:1h`** returned **5 threads**:

- **19dbf368f9c7d8df — Pawel Swiatek UPDATED INVITATION TeamApt Org Changes 12:18 WAT** (sent 11:18 WAT) — *"Updated invitation with note: TeamApt Org Changes @ Fri Apr 24, 2026 4:30pm - 6pm (WAT)"*. **Meeting time shifted 16:00→16:30 WAT** (30-min later start, end unchanged at 18:00 WAT). CCs: dajalie; To: emeka.awagu, frank.atashili, tracy.ojaigho. **Calendar-delta-significance:** briefing-2026-04-24 D2 option 1 plan (accept + decline Tech Support + keep Lattice) still holds; the 30-min shift reduces Tech Support overlap from 1h to 30min (16:30–17:00 WAT overlap), making declining Tech Support slightly less costly. No action change. Fold into briefing-2026-04-25 Awareness as D2 refinement note. Factors: source=email, layer1_to_me, calendar_update_notification, meeting_time_shift_30min_later, moniepoint_leadership_sender_pawel_swiatek, d2_refinement, overlap_severity_reduced, awareness_only.

- **19dbf5e13aa3ad14 — Weekly CEO Gazette Apr 24th 2026** 13:00 WAT from ialiyu@teamapt.com (CCs emeka.awagu, frank.atashili, ibukun.atoyebi) — company newsletter distribution. **Skipped per marketing/newsletter skip rule.** Factors: source=email, newsletter_content, skip_rule_applied.

- **19dbf5ce9a5fe3a2 — Greenhouse scorecard reminder 13:00 WAT** ("REMINDER: Please fill out your scorecard for Venkatesh Purushothaman") — 1h post-interview automated prompt. Tracks to briefing-2026-04-24 A6 HoE interview cluster (already noted scorecard pending). **Skipped per automated-sender skip rule** (no operational keyword, not active situation). Factors: source=email, automated_sender_greenhouse, scorecard_pending_tracked_in_briefing_a6, skip_rule_applied.

- **19dbf55bdc93593a — gemini-notes auto-digest for Deliberation: HoE batch interviews** 12:52 WAT — corresponds to Drive Notes-by-Gemini file detected this tick. **Skipped per automated-sender skip rule** (non-operational, HR interview cluster). Factors: source=email, automated_sender_gemini_notes, cross_source_drive_notes_by_gemini_detected, skip_rule_applied.

- **19dbf4a1242631b1 — Greenhouse permissions update 12:39 WAT** ("Your permissions in Greenhouse have been updated: Job Admin on Operations Team Lead") — low-signal automated admin notification. **Skipped per automated-sender skip rule.** Factors: source=email, automated_sender_greenhouse, low_signal_admin_notification, skip_rule_applied.

**Operational+issuer keyword bucket** `(RC91 OR RC05 OR RC69 OR RC06 OR P1 OR outage OR NIBSS OR compromised OR Ecobank OR "duty handover" OR Stanbic OR Monnify OR Keystone OR Union) newer_than:1h` returned **1 significant thread**:

- **19dbf59f056a7ee0 — Afeez Kazeem → NIBSS PTSA 12:56 WAT Apr 24 formal pattern-escalation email** — sent 11:56:36 WAT. **To:** ptsa@nibss-plc.com.ng. **CCs:** aptpaytechnicalsupport@teamapt.com, mustapha.ajibade@teamapt.com, **oladapo.onayemi@teamapt.com (CTO)**, ademola.adefemi@moniepoint.com, networkmanagement@teamapt.com, **oladipupo.sholotan@moniepoint.com (Moniepoint leadership)**. **Subject:** *"Persistent Intermittent Failure (RC91) and Transaction Non-Receipt via PTSA Route"*. **Body opens:** *"Dear Team, We have been experiencing the intermittent non-receipt of transactions successfully sent by Moniepoint to NIBSS. This failure often results in transactions being declined with Response Code..."* **Escalation-layer semantics:** (a) subject change from per-event "SUCCESSFUL RESPONSE NOT SENT| 20260424" → broader "Persistent Intermittent Failure (RC91) and Transaction Non-Receipt" indicates TeamApt formally claiming the pattern, not a single event; (b) sent 1 hour after NIBSS's 10:56 WAT contested-attribution reply on thread 19dbec21731fddeb — TeamApt counter-pushing rather than conceding; (c) CTO + Moniepoint-leadership remain CC'd, signaling formal-posture maintenance. **Disposition:** Situation delta on [[NIBSS PTSA — VPN Flapping Apr 22]] response-not-sent watchpoint — folded into situation page as formal-escalation-layer delta. NOT a new 1st/2nd-instance data point for directive-tracking (it's a pattern-escalation, not a new response-not-sent observation); directive window stays at 1 of 2 post-transition instances through 10:10 WAT Apr 26. **Re-escalation bar extended:** added CTO-direct engagement on thread as trigger. Awareness-only for briefing-2026-04-25 — attribution negotiation is bilateral-mediated, not unilateral-action triggering. No Immediate dispatch. Factors: source=email, active_situation_entity_match=nibss_ptsa, active_situation_entity_match=oladapo_onayemi, formal_escalation_layer, pattern_claim_vs_single_event, counter_response_to_nibss_attribution_push, cto_cc_formal_posture, moniepoint_sholotan_cc, subject_change_per_event_to_persistent_pattern, directive_unchanged_1_of_2_instances, re_escalation_bar_extended_cto_direct_engagement, bilateral_negotiation_not_unilateral_trigger, briefing_2026_04_25_awareness_candidate, no_immediate_dispatch.

**Net deltas this tick:** 1 significant NIBSS PTSA formal-escalation email (Awareness, situation delta) + 1 significant Calendar-update notification on Org Changes time-shift (Awareness, D2 refinement); 4 automated-sender threads skipped.

MCP health holding — 28h+ post-recovery from the ~64h auth-failure dark window.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim-elevated-to-full tick (preserved summary)

12:09 WAT Apr 24 tick: Layer 1 returned 1 metaview.ai HoE interview-ready notification (skipped per automated-sender rule); Layer 2 operational+issuer bucket returned Union Bank TEAMAPT TRANSACTION STATUS CONFIRMATION thread with 2 new messages — 11:10 WAT Adeyinka Taiwo (Union Bank) feedback chase + 11:15 WAT Emeka Joseph reply (blocked-on-bank-technical-team; database env access unavailable). Reconciliation workstream signal; Awareness only. MCP health holding 27h+ post-recovery.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Layer 1 returned 3 threads (GitLab self-sign-in skipped, Phoenix recurring invite skipped, stale Paystack thread); Layer 2 operational+issuer bucket returned 2 NIBSS PTSA watchpoint signals — NEW NIBSS attribution-contested reply 10:56 WAT on Apr 24 thread + Mustapha Ajibade 11:24 WAT revival follow-up on Apr 22 thread. Cross-source: TDSD-6716 formal Jira Incident filed 10:18 WAT completes 3-point proto-pattern. MCP health holding — 26h+ post-recovery.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: Layer 1 returned 1 BambooHR time-off approvals reminder (Awareness-only, skip-rule applies but queued); operational+issuer bucket returned NEW NIBSS PTSA thread 19dbec21731fddeb Afeez Kazeem → NIBSS PTSA at 10:10 WAT "SUCCESSFUL RESPONSE NOT SENT| 20260424" (distinct failure mode from retired VPN flap; watchpoint-match delta folded into situation page). MCP health holding — 25h+ post-recovery.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full backlog catch-up (preserved summary)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep completed via 5 narrow buckets. Key captures: Ecobank compound failure Apr 23 (3 RC91 cycles + DCIR portal); TeamApt Org Changes invite (Pawel Swiatek → briefing D2); Jira approval queue (TDSD-6699 + TDSD-6690 → briefing D3); Wema Bank RC91/22 Apr 23 single-day cycle; Union Bank RC69 Apr 23 first observation; AWS Outposts case 177635165100470 7-day inactivity prompt; various HR + interview scorecard reminders. Backlog catch-up complete; `last_processed` advanced from 2026-04-20T16:09:00Z to 2026-04-24T05:09:00Z.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Gmail MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Surfaced as briefing-2026-04-22 B2 and briefing-2026-04-23 D4. Recovery confirmed 09:11 WAT Apr 23.
