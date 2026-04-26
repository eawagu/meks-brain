---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-25T21:10:00Z (22:10 WAT). 22:10 WAT Apr 25 skim-tick: Layer 1 zero, Layer 2 keyword pass 1 thread — Stanbic RC91 cycle 34 thread 19dc63afd3c001f0 (21:00–21:14 WAT, 14m04s bank-resolved fast-cycle, two-track with Slack); awareness candidate for briefing-2026-04-26."
updated: "2026-04-26T05:25:57Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T05:10:00Z"
---


## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate. **Bot-sender heuristic MUST NOT preempt Layer 1** — a To:user message from an automated address (bamboohr.com, lattice, calendar invites) is still Layer 1; the bot-sender filter applies only to CC/BCC paths.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity, Union.
- Governance: board, audit, PCI, compliance, regulator.
- Process: duty handover, weekly status report, RCA.
- HR/people-management: time off, leave request, approval pending, hire approval, PIP.

### Skip rules
- Marketing/newsletter senders — skip.
- Automated status emails without operational keywords — discard unless matches active-situation entity OR is To:user (Layer 1 preempts skip).

### Skim-tick query discipline (post 2026-04-25 17:10 WAT FCMB cycle-2 1-tick delay)
Skim-tick MUST run BOTH Layer 1 (`to:me newer_than:Nh`) AND Layer 2 keyword pass (operational keywords + issuer-name buckets) every tick. The 16:10 WAT Apr 25 prior-tick documented only Layer 1 sweep (\"clean empty result, no residual-cache\") and missed Afeez's FCMB RC91 escalation email filed at 15:04:26Z (within window). The next tick's keyword sweep recovered the signal at 17:10 WAT — 1h05m delay is bounded but undesirable. **Skim-tick MUST run the operational keyword bucket as part of the per-source delta-check pass** — Layer-1-only is not sufficient. Only the issuer-name buckets (which exceed token budget when OR'd) may be deferred under skim cost cap; operational + governance + process buckets fit within budget per the execution pattern below.

### Query execution pattern (post 10:09 limitation note)
Use narrow per-keyword buckets with `newer_than:Nh` to stay inside Gmail MCP token budget:
- Layer 1 pass: `to:me newer_than:Nh`.
- Operational keywords pass: `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:Nh`.
- Governance/process pass: group tight synonyms only.
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR \"Adewuyi Mayowa\") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated through 17:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

### Known limitation — Residual-cache behavior on newer_than filter (observed 2026-04-24 18:09 WAT)
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta.

## Notes

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), Layer 1 zero genuinely-new + Layer 2 keyword 1 delta (Hourly Reports 20260426, 14/17 routes 5min before two P1 onsets)

06:10 WAT Apr 26 Sunday briefing tick (Step 0: level=full, rationale=briefing-tick — floor override). Window 21:10:00Z Apr 25 → 05:10:00Z Apr 26 = 8h overnight delegation window.

**Layer 1 query `to:me after:2026/04/25`: 5 threads in window, 0 genuinely-new** — all Apr 25 dated emails (BambooHR Time Off Apr 25 10:06 WAT, McKinsey QED report Apr 25 11:04 WAT, TeamApt Juliana Backoffice Update June Johnson Apr 25 07:54 WAT, NPS UAT Script old Jan, PENTEST 2FA DCIR portal old Dec/Jan) all timestamps predate Apr 25 22:10 WAT last_processed cutoff — already captured in prior ticks. Layer 1 zero genuinely-new in this 8h overnight window.

**Operational keyword query `(RC91 OR P1 OR outage OR incident OR breach OR \"settlement failure\" OR \"transaction failure\") after:2026/04/25`: 1 genuinely-new thread** —
- **Hourly Reports 20260426 thread 19dc749cf20cd04b** — Qazim Adedigba → aptpaytechnicalsupport@teamapt.com at 01:56 WAT Apr 26: \"Hello Team, Current System Status: 14 of 17 routes are operational. Coralpay banks (FBN, PVB, and SBP) were turned off due to business decisions. Coralpay transactions are routed through the [CoralPay_Cashout failover].\" 5min BEFORE both new P1s started (CoralPay ZIB 02:01 WAT, Access Bank 02:05 WAT). Salience factors: `keyword_floor=routes_operational+coralpay`, `predates_p1_onset_by_5_to_9_min`, `ops_cycle_gap_4h14m_overnight`, awareness-tier. Briefing-2026-04-26 A4.

Other returned threads in window are repeats already captured: Stanbic cycle 34 thread 19dc63afd3c001f0 (last activity 21:14 WAT Apr 25, predates 22:10 WAT cutoff), FCMB cycle 2 thread 19dc52c43f7e9838 (16:04 WAT Apr 25, predates), Wema cycle thread 19dc390a02e9797c (07:34–07:49 WAT Apr 25, predates), Union RC96 thread 19dc1fd7e4326d6a (00:14–02:52 WAT Apr 25, predates), Duty Handover Note 20260425 (07:06–07:10 WAT Apr 25, predates), Hourly Reports 20260425 (01:20–07:02 WAT Apr 25, predates), Mock Monitoring (11:58 WAT Apr 25, bot-to-bot), TEAMAPT Monitoring (07:32 WAT Apr 25, bot-to-bot).

**Active-situation entity coverage:** CoralPay ZIB / Access Bank — see Slack source-config (both Tier 1 deltas dispatched Immediate). NIBSS PTSA bilateral 35h+ silent post-19:05 WAT Apr 24 NIBSS counter-reply (under 48h threshold; TDSD-6716 Completed unilaterally Apr 25 16:20 WAT — situation retirement candidate). FCMB cycle 2 silent 14h+ post-16:04 WAT Apr 25 email-only filing — within multi-day bank-cycle envelope; FCMB not in Apr 26 01:56 WAT hourly report failure list.

Factors: source=email, briefing_tick, layer1_zero_genuinely_new, layer2_one_delta_hourly_reports_20260426, predates_p1_onset, awareness_tier, post_overnight_delegation_resume.

### last_processed 2026-04-25T21:10:00Z (22:10 WAT) — skim-level 22:00-cron tick (last tick before overnight delegation), Layer 1 zero + Layer 2 keyword 1 delta (Stanbic cycle 34, two-track with Slack) (preserved summary)

22:10 WAT Apr 25 Saturday skim tick. Window 19:10:00Z → 21:10:00Z = 2h. Layer 1 zero. Operational keyword query 1 thread — Stanbic ATS RC91 cycle 34 thread `19dc63afd3c001f0` (Olamide → Stanbic 21:00:33 WAT, bank reconfirm Onyekachukwu Okigbo 21:09:38 WAT, Olamide processing-successfully 21:14:37 WAT). Email-confirmed end-to-end 14m04s, two-track with Slack #teamapt-tech-operations Olamide P1 post 21:01 WAT.

### last_processed 2026-04-25T19:10:00Z (20:10 WAT) — skim-level 20:00-cron tick, Layer 1 + Layer 2 both zero-delta (preserved summary)

20:10 WAT Apr 25 Saturday skim. Layer 1 + operational keyword passes both clean. FCMB cycle 2 ~4h05m silent post-16:04 WAT filing — within envelope.

### last_processed 2026-04-25T17:10:00Z (18:10 WAT) — skim-level 18:00-cron tick, end-of-shift handover deltas only (preserved summary)

18:10 WAT Apr 25 Saturday skim. Daily Report #20260425 (Afeez 16:17 WAT) + Re: Duty Handover Note (Afeez/Olamide 16:22-16:23 WAT) — Layer 2 keyword surface; out of scope direct-to-me.

### last_processed 2026-04-25T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick, FCMB RC91 cycle 2 escalation 1-tick delay calibration (preserved summary)

17:10 WAT Apr 25 Saturday skim. FCMB RC91 cycle 2 from Afeez 16:04:26 WAT to FCMB caught via Layer 2 keyword pass (1-tick delay from 16:10 prior tick Layer-1-only sweep). Skim-tick keyword pass directive added.

### last_processed 2026-04-25T13:10:00Z–15:10:00Z — preserved summary block

Multiple skim ticks Saturday afternoon, all zero-delta with one mock-bot signal discarded.

### last_processed 2026-04-25T11:10:00Z–12:10:00Z — preserved summary block

Saturday late morning/midday skim ticks zero-delta.

### last_processed 2026-04-25T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick, BambooHR Layer 1 calibration miss surfaced (5-day silent) (preserved summary)

10:10 WAT Apr 25 Saturday skim. BambooHR \"Time Off Requested: Ravi Kiran Veluguleti and Muhammad Samu\" 10:06 WAT Layer 1 To:me. **5-consecutive-day silent miss** — `bot_sender` heuristic over-fired, preempting Layer 1. Directive amended above. MISS captured.

### last_processed 2026-04-25T05:09:54Z–08:10:00Z — preserved summary block

Saturday early ticks. 06:09 WAT briefing tick captured 4 in-window threads (Hourly Reports, Duty Handover, Union RC96, NIBSS PTSA counter-reply latent). 08:10 WAT skim implicit-FCMB-resolved via 14/17 trajectory.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks. 06:09 WAT briefing-tick 86h+ backlog sweep via 5 narrow buckets. 20:10 WAT NIBSS counter-reply contested-attribution round 2.
