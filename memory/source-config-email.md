---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-25T21:10:00Z (22:10 WAT). 22:10 WAT Apr 25 skim-tick: Layer 1 zero, Layer 2 keyword pass 1 thread — Stanbic RC91 cycle 34 thread 19dc63afd3c001f0 (21:00–21:14 WAT, 14m04s bank-resolved fast-cycle, two-track with Slack); awareness candidate for briefing-2026-04-26."
updated: "2026-04-25T21:25:21Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T21:10:00Z"
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

### last_processed 2026-04-25T21:10:00Z (22:10 WAT) — skim-level 22:00-cron tick (last tick before overnight delegation), Layer 1 zero + Layer 2 keyword 1 delta (Stanbic cycle 34, two-track with Slack)

22:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=last-tick-before-overnight-delegation-with-active-multi-bank-p1s-from-am-briefing). Window 19:10:00Z → 21:10:00Z = 2h.

**Layer 1 query `to:me newer_than:2h`: 0 threads (clean empty result).** **Operational keyword query `(RC91 OR RC96 OR RC05 OR P1 OR outage OR NIBSS OR FCMB OR breach OR "transaction failure" OR "settlement failure") newer_than:2h`: 1 thread** — Stanbic ATS RC91 cycle 34 thread `19dc63afd3c001f0` "Stanbic | RC91| 20260425":
- 2026-04-25T20:00:33Z (21:00:33 WAT) — Olamide Ajibulu → Stanbic IT Service Management (`itservicemanagementnigeria@stanbicibtc.com`, `servicemonitoring@stanbicibtc.com`; CC `aptpaytechnicalsupport@teamapt.com`): "Hello team, Please be informed that Stanbic bank card transactions are currently failing. This is occurring with RC 91. Kindly assist with the review."
- 2026-04-25T20:09:38Z (21:09:38 WAT) — Bank reply Onyekachukwu Okigbo (Officer, Service Monitoring | Information Technology, Stanbic IBTC) → Olamide: "Hello @Olamide Ajibulu, Kindly reconfirm status." — standard Stanbic IT Service Management fast-cycle reconfirmation signature, mirrors cycle 31's bank-side engagement pattern.
- 2026-04-25T20:14:37Z (21:14:37 WAT) — Olamide → Onyekachukwu: "Transactions are processing successfully."

**Email-confirmed end-to-end 14m04s.** Cycle 34 = 21:00–21:14 WAT bank-resolved fast-cycle. Two-track filing with Slack #teamapt-tech-operations Olamide structured P1 post 21:01 WAT (Slack-stated 10m end-to-end). Salience factors: `keyword_floor=RC91+stanbic_issuer`, `active_situation_match=stanbic_bank_ats_persistent_rc91_pattern`, `within_pattern_fast_cycle`, `bank_resolved_pre_tick`, `two_track_with_slack`. Awareness candidate for briefing-2026-04-26 (B6 calibration precedent: bank-owned recurring pattern, no Immediate re-dispatch).

**Active-situation entity coverage:** Stanbic ATS — situation page updated this tick to cycle 34. NIBSS PTSA bilateral 26h+ silent post-19:05 WAT Apr 24 NIBSS counter-reply (under 48h threshold; TDSD-6716 closed unilaterally per Jira sweep 17:10 WAT tick). FCMB cycle 2 silent ~6h post-16:04 WAT email-only filing (within bank-cycle envelope, no escalation criteria fired).

Factors: source=email, skim_tick, saturday_late_evening, layer1_to_me_zero, layer2_keyword_one_delta_stanbic_cycle34, two_track_with_slack, within_pattern_fast_cycle, bank_resolved_pre_tick_56m, no_immediate_dispatch, fcmb_cycle2_silent_6h_within_envelope, nibss_ptsa_bilateral_under_48h_threshold, last_tick_before_overnight_delegation.

### last_processed 2026-04-25T19:10:00Z (20:10 WAT) — skim-level 20:00-cron tick, Layer 1 + Layer 2 both zero-delta in 2h window (preserved summary)

20:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=saturday-evening-fcmb-active-this-am-quiet-priors). Window 17:10:00Z → 19:10:00Z = 2h. Layer 1 + operational keyword passes both clean. FCMB cycle 2 ~4h05m silent post-16:04 WAT filing — within envelope. NIBSS PTSA bilateral 25h+ silent (under 48h threshold).

### last_processed 2026-04-25T17:10:00Z (18:10 WAT) — skim-level 18:00-cron tick, end-of-shift handover deltas only (preserved summary)

18:10 WAT Apr 25 Saturday skim tick. 2 threads in window: Daily Report #20260425 (Afeez 16:17 WAT — 14/17 routes operational, recovery trajectory +4 from 02:20 WAT) + Re: Duty Handover Note #20260425 (Afeez → Olamide 16:22 WAT, Olamide ack 16:23 WAT). Both Layer 2 keyword surface; out of scope for user direct-to-me. No briefing-tier escalation (folded into D2 multi-bank tracking). No FCMB cycle 2 follow-up post-16:04 WAT.

### last_processed 2026-04-25T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (10min late), 1 Layer 2 keyword delta — FCMB RC91 cycle 2 escalation (1-tick delay from prior tick Layer-1-only sweep) (preserved summary)

17:10 WAT Apr 25 Saturday skim tick. Window 15:10:00Z → 16:10:00Z = 1h. Thread 19dc52c43f7e9838 — `FCMB | RC91 | 20260425` from Afeez Kazeem at 16:04:26 WAT to FCMB. Cycle 2 of Apr 25 (cycle 1 implicit-resolved 07:02 WAT, 13h31m gap). Filed during prior-tick window (14:10:00Z → 15:10:00Z), missed by 16:10 WAT skim-tick that ran Layer 1 only. New skim-tick directive added: MUST run operational keyword pass every tick.

### last_processed 2026-04-25T15:10:00Z (16:10 WAT) — skim-level 16:00-cron tick (10min late), zero genuinely-new threads (preserved summary; CALIBRATION NOTE: Afeez FCMB email at 15:04:26Z within window MISSED by Layer-1-only sweep, recovered by next tick keyword pass)

16:10 WAT Apr 25 Saturday skim tick. Window 14:10:00Z → 15:10:00Z = 1h. Documented Layer 1 query only ("clean empty result, no residual-cache"). **CALIBRATION**: this tick missed Afeez Kazeem's FCMB | RC91 | 20260425 email filed 15:04:26Z (within window) because operational keyword pass was not executed. Next tick (17:10 WAT) recovered it via keyword sweep. Skim-tick directive added 17:10 WAT: operational keyword pass MUST run every tick.

### last_processed 2026-04-25T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (10min late), zero genuinely-new threads (preserved summary)

15:10 WAT Apr 25 Saturday skim tick. Window 13:10:00Z → 14:10:00Z = 1h. Layer 1 `newer_than:2h` returned 0 threads (clean empty). Zero genuinely-new. NIBSS PTSA bilateral 20h+ silent.

### last_processed 2026-04-25T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (10min late), zero genuinely-new threads (preserved summary)

14:10 WAT Apr 25 Saturday skim tick. Window 12:10:00Z → 13:10:00Z = 1h. Layer 1 + Operational keyword passes both clean. Zero genuinely-new threads. NIBSS PTSA bilateral 19h+ silent.

### last_processed 2026-04-25T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (10min late), 1 mock-bot signal below Layer 1 threshold (preserved summary)

13:10 WAT Apr 25 Saturday skim tick. Window 11:10:00Z → 12:10:00Z = 1h. Mock Monitoring Service Alert (bot-to-bot recipient, NOT Layer 1) discarded. Zero genuinely-new Layer 1 threads.

### last_processed 2026-04-25T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (10min late), zero genuinely-new threads (preserved summary)

12:10 WAT Apr 25 Saturday skim tick. Window 10:10:00Z → 11:10:00Z = 1h. Clean empty query result. Zero genuinely-new threads. No P1 emails. Active-situation entity coverage all within last 6h.

### last_processed 2026-04-25T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (10min late), zero genuinely-new threads (preserved summary)

11:10 WAT Apr 25 Saturday skim tick. Window 09:10:00Z → 10:10:00Z = 1h. Returned threads predating cutoff (Wema/BambooHR/Duty Handover/Hourly Reports/TACHA — all already captured in prior 10:10 WAT tick). Zero genuinely-new.

### last_processed 2026-04-25T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick, BambooHR Layer 1 calibration miss surfaced (5-day silent) (preserved summary)

10:10 WAT Apr 25 Saturday skim tick. Window 08:10:00Z → 09:10:00Z = ~1h. BambooHR "Time Off Requested: Ravi Kiran Veluguleti and Muhammad Samu" 10:06 WAT — Layer 1 To:me always-surface per directive. **5th consecutive daily notification with identical payload (Apr 21–25), none surfaced in any briefings — Layer 1 directive silently bypassed.** MISS captured to `MISS-bamboohr-layer1-silent-5-days-2026-04-25.md`. Hypothesis: bot-sender heuristic over-fired and preempted Layer 1 (now corrected — directive amended above to "Bot-sender heuristic MUST NOT preempt Layer 1"). Briefing-2026-04-26 Decision candidate (Confidence: high — single clear action: approve both via BambooHR portal).

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, 1 thread delta (Wema RC91 cycle) (preserved summary)

09:10 WAT Apr 25 Saturday skim tick. Wema Bank RC91 thread + TEAMAPT Monitoring Service Alert. Wema cycle 14m20s bank-resolved.

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, 4 in-window threads (FCMB implicit-resolved via 14/17 trajectory, preserved summary)

08:10 WAT Apr 25 skim. 4 in-window threads: Hourly Reports update 07:02 WAT (14/17 routes operational, FCMB/Habari/Zenith/Union all dropped from failure list); Duty Handover 08:06 WAT (Qazim → Afeez, 14/17 confirmed stable + "Coralpay transactions are routed through the CoralPay_Cashout"); TACHA Backoffice update 06:54 WAT (June Johnson, internal Layer 1 to:me); Union RC96 thread (no new activity post-resolution). Implicit FCMB P1 closure resolves morning briefing D1 stale-by-trajectory.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, 4 in-window threads (preserved summary)

06:09 WAT Apr 25 briefing tick. 8h overnight window. 4 in-window threads: Hourly Reports 02:20 WAT (10/17 routes, Habari/Zenith failing RC91 to partners + Union RC96); Duty Handover 23:05 WAT Apr 24 (Olamide → Qazim, 14/17, FBN/PVB/SBP off); Union RC96 thread (filed 01:14 WAT, bank-resolved 02:52 WAT); NIBSS PTSA counter-reply thread (no new activity). MCP health 45h+ stable post-Apr-23-recovery.

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level zero-genuinely-new (preserved summary)

22:10 WAT Apr 24 skim. 1 thread returned (Fidelity PayFac Settlement) — predates window, residual-cache filtered. 0 genuinely new. NIBSS PTSA bilateral negotiation in read-latency state.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level NIBSS counter-reply (preserved summary)

20:10 WAT Apr 24 full tick. Thread 19dc0ab7bafe02e0 NIBSS counter-reply 19:05 WAT — contested-attribution round 2 stance with CTO Oladapo CC. Briefing tier delta to [[NIBSS PTSA — VPN Flapping Apr 22]].

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: 86h+ backlog sweep via 5 narrow buckets. Key captures: Ecobank compound failure; TeamApt Org Changes invite; Jira approval queue; Wema Apr 23; Union RC69 Apr 23; AWS Outposts 7-day prompt.
