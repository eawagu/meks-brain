---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-26T12:10:00Z (13:10 WAT). 13:10 WAT Apr 26 skim-tick: Layer 1 zero, Layer 2 zero new in 1h window. Sunday afternoon quiet. Bank reply on Access DD bilateral path STILL not visible at 2h58m post-filing — well past typical 30–60min Access reply window — escalating concern. CoralPay 4th hourly report still missing (Daniel-shift handover at 08:01 WAT)."
updated: 2026-04-26
cssclasses:
  - "source-config"
last_processed: "2026-04-26T12:10:00Z"
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

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (7h after Sunday briefing), Layer 1 zero + Layer 2 zero — boundary-case Access DD bilateral thread no longer surfacing (>3h-old now); bank reply STILL absent 2h58m post-bilateral

13:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim). Window 11:10:00Z → 12:10:00Z = 1h.

**Layer 1 query `to:me newer_than:1d`: 0 threads in window.** Empty result `{}` (Gmail MCP returned no residual-cache thread).

**Operational keyword query: 0 threads in 1h window.** The Access DD bilateral thread `19dc9102d9bde88a` (last message 09:12:36Z) is now ~3h+ old and falls outside the standard `newer_than:2h` window — no longer re-surfacing as boundary-case repeat. Dedup pattern resolved naturally as the window narrowed past the source thread's age.

**No additional issuer-bucket sweeps this skim-tick** (cost cap; next briefing-tick will cover).

**Active P1 silence-rule check (cross-cutting):**
- **CoralPay ZIB RC91** — no email mention since Hourly Reports 07:50 WAT byte-identical resend (5h21m+ silent on email path). The 4th hourly report (when Daniel files it) is the watchpoint signal — still not yet visible at this tick (2h+ past Daniel's 08:01 WAT shift start). Possible explanations unchanged: (a) Daniel hasn't filed an hourly report (ops cadence broken on Sunday handover), (b) hourly report was filed but to a different thread/recipient.
- **Access Bank cycle 8** — closed bank-side at 07:54 WAT (Jira). Email path silent on closure (no closure note from bank, no Slack closure post propagated to email path). 5h17m+ post-resolution.
- **Access Bank DD Mandate Failures** — bilateral filing 10:12 WAT Daniel Armstrong → Access Card Switching Team. **2h58m+ post-bilateral with NO bank reply visible** (well past typical 30–60min Access reply window). The internal containment ticket TDSD-6732 transitioned to Completed at 13:01:54 WAT this tick (route-pause posture preserved in description) — but the bank-side response remains structurally absent. Watchpoint shifts: if no reply by ~14:00 WAT (4h post-bilateral), bank-side coordination breakdown becomes the leading hypothesis (escalation needed).

**No Immediate dispatch from email-side this tick** — zero new substantive content. The TDSD-6732 → Completed status transition is a Jira-side delta (not Immediate-tier).

Factors: source=email, skim_tick, layer1_zero, layer2_zero_boundary_case_naturally_resolved_thread_aged_past_window, sunday_afternoon_quiet_on_email_path, no_immediate_dispatch_from_email_side, no_bank_reply_2h58m_post_bilateral_escalating_concern_watchpoint_at_14_00_wat, coralpay_4th_hourly_report_still_missing_2h_past_daniel_shift_start.

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (preserved summary)

12:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 keyword 0 NEW (Access DD bilateral thread `19dc9102d9bde88a` returned again — third-tick boundary-case repeat dedup). Sunday late-morning quiet. Bank reply 1h59m+ post-bilateral — escalating concern.

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