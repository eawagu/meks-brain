---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-25T15:10:00Z (16:10 WAT). 16:10 WAT Apr 25 skim-tick: zero genuinely-new threads in window; clean empty newer_than:2h result. Four consecutive zero-delta skim ticks (13:10/14:10/15:10/16:10 WAT)."
updated: "2026-04-25T16:22:47Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T16:10:00Z"
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
Skim-tick MUST run BOTH Layer 1 (`to:me newer_than:Nh`) AND Layer 2 keyword pass (operational keywords + issuer-name buckets) every tick. The 16:10 WAT Apr 25 prior-tick documented only Layer 1 sweep ("clean empty result, no residual-cache") and missed Afeez's FCMB RC91 escalation email filed at 15:04:26Z (within window). The next tick's keyword sweep recovered the signal at 17:10 WAT — 1h05m delay is bounded but undesirable. **Skim-tick MUST run the operational keyword bucket as part of the per-source delta-check pass** — Layer-1-only is not sufficient. Only the issuer-name buckets (which exceed token budget when OR'd) may be deferred under skim cost cap; operational + governance + process buckets fit within budget per the execution pattern below.

### Query execution pattern (post 10:09 limitation note)
Use narrow per-keyword buckets with `newer_than:Nh` to stay inside Gmail MCP token budget:
- Layer 1 pass: `to:me newer_than:Nh`.
- Operational keywords pass: `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:Nh`.
- Governance/process pass: group tight synonyms only.
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR "Adewuyi Mayowa") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated through 17:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

### Known limitation — Residual-cache behavior on newer_than filter (observed 2026-04-24 18:09 WAT)
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta.

## Notes

### last_processed 2026-04-25T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (10min late), 1 Layer 2 keyword delta — FCMB RC91 cycle 2 escalation (1-tick delay from prior tick Layer-1-only sweep)

17:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend-quiet-priors-with-active-fcmb-p1-needing-verification). Window 15:10:00Z → 16:10:00Z = 1h.

**Layer 1 query `to:me newer_than:2h`: returned 0 threads (clean empty result, no residual-cache).** **Operational keyword query `(RC91 OR RC96 OR P1 OR outage OR NIBSS OR FCMB OR breach OR "transaction failure" OR "settlement failure") newer_than:2h`: returned 1 thread:**

- **Thread 19dc52c43f7e9838 — `FCMB | RC91 | 20260425`** — [[Afeez Kazeem]] → FCMB ([[Bashir Adeyemi]], SwitchApplicationSupport@fcmb.com, Ogundairo.Tobiloba@fcmb.com; CC aptpaytechnicalsupport@teamapt.com) at **16:04:26 WAT Apr 25** (15:04:26Z). Body: *"Hello Team, Please be informed that transactions are failing with RC91 intermittently. Kindly assist to review."* Standard Afeez RC91 escalation template. Active-situation entity match: [[FCMB — RC91 P1 Apr 17]] + [[FCMB]]. Cycle 2 of Apr 25 — cycle 1 (02:33 WAT P1 Slack post) implicit-resolved 07:02 WAT via 14/17 trajectory; 13h31m gap. **Filing time 15:04:26Z falls in PRIOR-TICK window (14:10:00Z → 15:10:00Z), missed by 16:10 WAT skim-tick that ran Layer 1 only (no operational keyword pass). 1-tick delay (~1h05m) from filing to capture.** Routing: full processing — situation page update, no Immediate dispatch (Briefing-tier per within-pattern + Immediate-already-dispatched-this-morning calibration). New skim-tick directive added: MUST run operational keyword pass every tick.

**Active-situation entity coverage:** [[FCMB — RC91 P1 Apr 17]] updated this tick with cycle 2 delta. NIBSS PTSA bilateral 22h+ silent (under 48h threshold) but TDSD-6716 closed 16:20 WAT — see source-config-jira note. All other situations updated within last 12h.

Factors: `source=email`, `skim_tick`, `saturday_afternoon`, `1_layer2_keyword_delta_fcmb_rc91_cycle2`, `prior_tick_layer1_only_miss_recovered_this_tick`, `1h05m_delay_within_bounded_envelope`, `briefing_tier_classification_no_immediate_dispatch`, `within_pattern_recurrence`, `intermittent_framing_not_p1_declaration`, `skim_tick_directive_added_operational_keyword_mandatory`, `awareness_candidate_briefing_2026_04_26`.

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
