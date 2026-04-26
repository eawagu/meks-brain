---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: Layer 1 zero, Layer 2 keyword 0 NEW (the 09:12 UTC Access DD bilateral thread `19dc9102d9bde88a` was already captured at 10:10 WAT prior tick — boundary case). Sunday morning quiet on email path."
updated: "2026-04-26T16:25:36Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T16:10:00Z"
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

### last_processed 2026-04-26T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (11h after Sunday briefing), Layer 1 zero + operational-keyword zero NEW; 1 issuer-bucket-scope thread observed (Fidelity DCIR credential reset, Awareness)

17:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-afternoon-active-situations-in-background). Window 15:10:00Z → 16:10:00Z = 1h.

**Layer 1 query `to:me newer_than:1d`: 0 To:me threads in 1h skim window.** All threads from broader 24h query date-filter to predates of 15:10:00Z (latest direct-handover at 07:01 UTC = 08:01 WAT, prior tick).

**Operational keyword sweep `(RC91 OR RC05 OR P1 OR outage OR Mandate OR settlement OR CoralPay OR ZIB OR Access) newer_than:1d`: 0 NEW threads in window.** All matches predate 15:10:00Z.

**Issuer-bucket scope observation (broad sweep, deferred under skim cost cap but observed via cross-source disambiguation query):** 1 thread `19dca72d60189611` — \"Reset Teamapt (DCIR) Application User Credentials\" Microsoft Teams meeting invite filed 16:40 WAT (= 15:40 UTC, in-window). Sender `aptpaytechnicalsupport@teamapt.com`. Recipients `aptpaytechnicalsupport@teamapt.com`, `Ayodele.Olukoya@fidelitybank.ng`, `SystemsAdmin@fidelitybank.ng`, `DatabaseAdmin5826@fidelitybank.ng`, `Caleb.Saidu@fidelitybank.ng`, `FEPSupport@fidelitybank.ng`, `Adamma.Ezimora@fidelitybank.ng`. **Classification:** Awareness-tier ops-coordination — routine credential-reset meeting between TeamApt support and Fidelity Bank IT for DCIR application user. No operational-keyword match (no RC91/P1/outage/Mandate/etc); only issuer-name match (Fidelity in recipient domain). User not in any recipient field — Layer 1 does not fire. Active-situation cross-check: [[Fidelity Bank ATS — RC91 Failure Ongoing]] is ATS-track (different application from DCIR); [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] covers DCIR vulnerability remediation but Fidelity is not a current named bank in that track. No briefing-decision tier; no Immediate dispatch.

**Active P1 silence-rule check (cross-cutting, structural pattern observation):**
- **CoralPay ZIB RC91** — no email mention since Hourly Reports 07:50 WAT byte-identical resend (~9h21m+ silent on email path). 4th hourly report (Daniel-on-duty) STILL not visible at this tick. **Pattern observation:** Daniel-on-duty cadence appears to have stopped after the 08:01 WAT handover acknowledgment — no Daniel-authored hourly reports observed in 9h+ since shift start. Structural ops-cycle-reporting failure persists across the entire Daniel shift today.
- **Access Bank cycle 8** — closed bank-side at 07:54 WAT. Email path silent on closure (no closure note from bank, no Slack closure post propagated). ~9h17m+ post-resolution.
- **Access Bank DD Mandate Failures** — bilateral filing 10:12 WAT. ~7h post-bilateral. Post-watchpoint: bank-side `accessbankplc.com` sender still NOT visible. Bank-side coordination breakdown remains the leading hypothesis. Watchpoint hardens for briefing-2026-04-27.
- **Ecobank settlements** TDSD-6735 (filed 15:59 WAT prior tick via Jira portal) — no email thread accompanying the ticket; bilateral channel still silent. Watchpoint: Feyisayo Oyeniran 8h first-response SLA breach Mon Apr 27 17:00 WAT (still ~24h ahead).

**No Immediate dispatch from email-side this tick** — no new Layer-1 / no operational-keyword signal in 1h window; the issuer-bucket-scope Fidelity DCIR thread is Awareness-tier ops-coordination.

Factors: source=email, skim_tick, layer1_zero, operational_keyword_zero, issuer_bucket_one_observation_fidelity_dcir_credential_reset_meeting_invite, awareness_tier_ops_coordination, no_active_situation_cross_match_dcir_fidelity_intersection, sunday_evening_quiet_on_email_path, no_immediate_dispatch_from_email_side, daniel_on_duty_hourly_report_cadence_stopped_9h_post_handover_structural_ops_failure_persists, watchpoint_hardens_for_briefing_apr27_if_no_accessbankplc_sender, eco_settlements_no_email_thread_jira_portal_only_filing.

### last_processed 2026-04-26T15:10:00Z (16:10 WAT) — skim-level 16:00-cron tick (preserved summary)

16:10 WAT Apr 26 Sunday skim. Layer 1 zero + Layer 2 zero NEW. CoralPay 4th hourly report missing 8h+ post-handover (Daniel cadence stopped — structural full-shift failure). Access DD bank-silence watchpoint hardens for briefing-2026-04-27. Eco settlements TDSD-6735 filed via Jira portal directly, no email thread accompanying. No Immediate.

### last_processed 2026-04-26T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (preserved summary)

15:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 1 thread `19dc9102d9bde88a` returned by residual-cache; latest message 12:55:56Z predates 13:10:00Z window cutoff — discarded. Sunday afternoon quiet. CoralPay 4th hourly report still missing 7h+ past Daniel shift start. No Immediate.

### last_processed 2026-04-26T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (preserved summary)

14:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 1 NEW thread message at 13:55:56 WAT — Access DD bilateral thread, sender `aptpaytechnicalsupport@teamapt.com` signed \"Temitayo Bashir Ola-Buraimo\" — AMBIGUOUS sender (TeamApt vs Access Bank Temitayo). Brain search found no TeamApt employee with that name. Conservative read: TeamApt internal acknowledgment. Bank silence persists at 4h post-bilateral watchpoint (14:12 WAT). No Immediate dispatch.

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (preserved summary)

13:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 0 NEW threads in 1h window. Access DD bank reply 2h58m+ post-bilateral with NO bank reply visible. Watchpoint: if no reply by ~14:00 WAT (4h post-bilateral), bank-side coordination breakdown becomes leading hypothesis. No Immediate dispatch.

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (preserved summary)

12:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 keyword 0 NEW. Bank reply 1h59m+ post-bilateral — escalating concern.

### last_processed 2026-04-26T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (preserved summary)

11:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 keyword 0 NEW (Access DD bilateral thread already captured at 10:10 WAT prior tick — boundary case). Sunday morning quiet. No Immediate dispatch.

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (preserved summary)

10:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 1 new thread `19dc9102d9bde88a` Daniel Armstrong → Access Card Switching Team 10:12 WAT. Immediate-tier dispatched.

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (preserved summary)

08:10 WAT Apr 26 Sunday skim. Hourly Reports 3rd byte-identical resend at 07:50 WAT. Duty Handover Note 08:01 WAT. No Immediate.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (preserved summary)

Layer 1 zero. Operational keyword 1 thread — Hourly Reports 06:44 WAT byte-identical resend.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (preserved summary)

Layer 1 zero. Operational keyword 1 delta — Hourly Reports 20260426 thread 19dc749cf20cd04b 01:56 WAT (Briefing-2026-04-26 A4).

### last_processed 2026-04-25T17:10:00Z–earlier — preserved summary block

Apr 25 ticks (Stanbic cycle 34, end-of-shift handover, FCMB cycle 2 keyword recovery 1-tick delay, BambooHR Layer 1 calibration miss).

### last_processed 2026-04-24T05:09:00Z–earlier — preserved summary block

Apr 24 ticks.