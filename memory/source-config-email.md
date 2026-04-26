---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: Layer 1 zero, Layer 2 keyword 0 NEW (the 09:12 UTC Access DD bilateral thread `19dc9102d9bde88a` was already captured at 10:10 WAT prior tick — boundary case). Sunday morning quiet on email path."
updated: "2026-04-26T10:21:19Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T10:10:00Z"
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
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR \"Adewuyi Mayowa\") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated through 17:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

### Known limitation — Residual-cache behavior on newer_than filter (observed 2026-04-24 18:09 WAT)
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta.

## Notes

### last_processed 2026-04-26T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (5h after Sunday briefing), Layer 1 zero + Layer 2 keyword 0 NEW (Access DD bilateral thread already captured at prior tick — boundary case)

11:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim). Window 09:10:00Z → 10:10:00Z = 1h.

**Layer 1 query `to:me newer_than:2h`: 0 threads in window.** Empty result (Gmail MCP returned `{}` — no residual-cache thread observed).

**Operational keyword query `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised OR Mandate OR resolved OR settlement) newer_than:2h`: 1 thread returned, 0 NEW.**

1. **Already-captured boundary thread** `19dc9102d9bde88a` (Access Bank DD Mandate Creation Failures bilateral track), most-recent-message timestamp 09:12:36Z. **This message arrives 2m36s AFTER last_processed 09:10:00Z** — it is in-window by client-side filter, BUT the prior 10:10 WAT tick's `newer_than:3h` query already captured and processed it (the prior tick's effective sweep window ran past 09:10:00Z to query-execution time). Substantive content is already documented in source-config-email prior-tick narrative and in [[Access Bank — Multi-Track Failures]] situation page. **Treat as zero-new-delta this tick to avoid duplicate processing.** Per-tick deduplication note: when a returned message's `internalDate` falls within the window but the thread already has a prior-tick narrative entry, treat as zero-new-delta — the substantive content has been captured. This is a recurring boundary-case pattern under `newer_than:Nh` semantics that drift past stored `last_processed`.

**No additional issuer-bucket sweeps this skim-tick** (cost cap; next briefing-tick will cover).

**Active P1 silence-rule check (cross-cutting):**
- **CoralPay ZIB RC91** — no email mention since Hourly Reports 07:50 WAT byte-identical resend. 5h+ silent on email path post-briefing-dispatch. The 4th hourly report (when Daniel files it) is the watchpoint signal — still not yet visible at this tick (3h20m+ post-handover).
- **Access Bank cycle 8** — closed bank-side at 07:54 WAT (Jira). Email path silent on closure (no closure note from bank, no Slack closure post propagated to email path).
- **Access Bank DD Mandate Failures** — bilateral filing 10:12 WAT documented at prior tick. ~1h36m active at this tick. **No bank reply on email path yet** (typical Access reply lag 30–60min — currently at 58m post-bilateral, on the edge of expected reply window). Watchpoint: bank reply ETA, internal ACS-connector engineering response (Babajide Ojoboorun's track — now formalized as TDSD-6731 assignee per Jira-side this tick).

**No Immediate dispatch from email-side this tick** — zero new substantive content.

Factors: source=email, skim_tick, layer1_zero, layer2_zero_new_boundary_case_already_captured, dedup_pattern_documented, sunday_morning_quiet_on_email_path, no_immediate_dispatch, briefing_apr27_decision_candidate=none-from-email-path.

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick, Layer 1 zero + Layer 2 keyword 1 NEW delta — Access Bank DD Mandate Creation Failures bilateral track at 10:12 WAT (preserved summary)

10:10 WAT Apr 26 Sunday skim tick. Window 07:10:00Z → 09:10:00Z = 2h. Layer 1 zero. Layer 2 1 new thread `19dc9102d9bde88a` Daniel Armstrong → Access Card Switching Team 10:12 WAT (CC oladapo.onayemi@moniepoint.com + aptpaytechnicalsupport@) — 5min after paired Slack post. Immediate-tier dispatched in concert with Slack path (one dispatch covers both bilateral channels).

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (preserved summary)

08:10 WAT Apr 26 Sunday skim tick. Hourly Reports 3rd byte-identical resend at 07:50 WAT proves ops-cycle reporting failure structurally. Duty Handover Note 08:01 WAT Qazim → Daniel routine. No Immediate dispatch.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (preserved summary)

Layer 1 zero. Operational keyword 1 thread — Hourly Reports 06:44 WAT byte-identical resend.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (preserved summary)

Layer 1 zero. Operational keyword 1 delta — Hourly Reports 20260426 thread 19dc749cf20cd04b 01:56 WAT (Briefing-2026-04-26 A4).

### last_processed 2026-04-25T17:10:00Z–earlier — preserved summary block

Apr 25 ticks (Stanbic cycle 34, end-of-shift handover, FCMB cycle 2 keyword recovery 1-tick delay, BambooHR Layer 1 calibration miss).

### last_processed 2026-04-24T05:09:00Z–earlier — preserved summary block

Apr 24 ticks.
