---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-26T09:10:00Z (10:10 WAT). 10:10 WAT Apr 26 skim-tick: Layer 1 zero, Layer 2 keyword pass 1 NEW thread — Access Bank DD Mandate Creation Failures bilateral track (10:12 WAT, Daniel Armstrong → Access Card Switching Team, CC aptpaytechnicalsupport + oladapo.onayemi). Immediate-tier dispatched in concert with paired Slack post."
updated: "2026-04-26T09:24:55Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T09:10:00Z"
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

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (4h after Sunday briefing), Layer 1 zero + Layer 2 keyword 1 NEW delta — Access Bank DD Mandate Creation Failures bilateral track at 10:12 WAT

10:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim). Window 07:10:00Z → 09:10:00Z = 2h.

**Layer 1 query `to:me newer_than:3h`: 0 threads in window.** Zero genuinely-new Layer-1 traffic in 2h.

**Operational keyword query `(RC91 OR P1 OR Mandate OR \"Access Bank\" OR Coralpay OR ZIB OR settlement OR resolved) newer_than:3h`: 1 NEW thread plus historical context threads.**

1. **NEW — Access Bank | DD | Mandate Creation Failures bilateral track.** Thread `19dc9102d9bde88a`, sender daniel.armstrong@teamapt.com, sent 10:12 WAT Apr 26 (09:12:36Z) to cardswitchingteam@accessbankplc.com + Itunu.Olubode@accessbankplc.com + Adeolu.Atilade@accessbankplc.com + ogheneyoma.erese@accessbankplc.com + Amarachi.Ibe@accessbankplc.com + Tunde.Akingbade@accessbankplc.com + temitayo.ola-buraimo@accessbankplc.com (CC: aptpaytechnicalsupport@teamapt.com, oladapo.onayemi@moniepoint.com). Subject: "Access Bank | DD | Mandate Creation Failures". Snippet: _"Hello Team, Please be informed that we're getting a checkpoint ⇢ 401 UNAUTHORIZED from POST https://acs-connector.accessbankplc.com/api/v1/acs-connector/oauth/token [DefaultWebClient] 2026-04-26..."_ **5 minutes after Daniel's paired Slack post on #teamapt-tech-operations** — standard bilateral filing pattern (Slack 10:07 + email 10:12). CC includes Oladapo Onayemi (CTO escalation visibility from filing time) and aptpaytechnicalsupport@ (ops list). 401 OAuth authentication-layer failure — distinct from RC91 transaction-routing failures. **Consistent with the long-running [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] situation** — Default OAuth secrets remediation, JAR vulnerability re-opened Apr 17, ACS connector replacement track. Salience factors: `keyword_floor=P1+Mandate+401+UNAUTHORIZED+OAuth`, `active_situation_entity_match=access-bank-multi-track-failures+dcir-acs-credential-remediation`, `bilateral_track_paired_with_slack_post_5min_offset`, `sender=daniel_armstrong_active_duty_engineer`, `cc_includes_cto_oladapo_onayemi`, `bot_sender=false`, `urgency=p1_active`, `cto_specificity=high_credential_rotation_hypothesis`, `pattern_significance=third_access_p1_in_8h+credential_remediation_theme`, `immediate_tier_dispatched_at_10:10_wat`. Situation page [[Access Bank — Multi-Track Failures]] updated this tick.

**Other in-window threads (already captured in prior tick or pre-existing context):**

- Thread `19dc7640c5af3022` (Access Bank ATS RC91 cycle 8 bilateral) — additional messages from 02:11 WAT Qazim → Tunde with updated RRN samples. Pre-existing thread from cycle 8. Already captured in source-config-jira this-tick parallel sweep (TDSD-6729 → Completed 07:54 WAT). Salience factor: `cycle8_post_resolution_thread_silent_post-03_11_wat_until_resolution`. No new email content here that wasn't already documented.
- Thread `19dc897ecc7b9e7e` (Duty Handover Note 20260426) — already captured in 08:10 WAT prior-tick.
- Thread `19dc749cf20cd04b` (Hourly Reports 20260426) — preserved context, no new resends in this 2h window. **The 4th hourly report has not yet been filed by Daniel Armstrong** — ops-cycle gap 2h20m at this tick (last hourly 07:50 WAT Qazim, handover 08:01 WAT). Watchpoint for next-tick.

**No additional issuer-bucket sweeps this skim-tick** (cost cap; next briefing-tick will cover).

**Active P1 silence-rule check (cross-cutting):**
- CoralPay ZIB RC91 — no email mention since Hourly Reports 07:50 WAT byte-identical resend. 4h+ silent on email path post-briefing-dispatch. The next hourly report (when filed by Daniel) is the watchpoint signal.
- Access Bank cycle 8 — closed bank-side at 07:54 WAT (Jira). Email path silent on closure (no closure note from bank, no Slack closure post propagated to email path).
- Access Bank DD Mandate Failures — bilateral filing at 10:12 WAT documented above. ~38min active at this tick. Watchpoint: bank reply ETA, internal ACS-connector engineering response (Babajide Ojoboorun's track).

**No additional Immediate dispatch from email-side this tick** — the new DD P1 was already dispatched via Slack-side detection at 10:10 WAT (Slack post 5min preceded the email), so this email is the cross-confirmation. Bilateral pattern means the same incident; one dispatch covers both.

Factors: source=email, skim_tick, layer1_zero, layer2_one_new_delta_dd_mandate_bilateral_track, paired_with_slack_post_5min_offset, cc_oladapo_visibility, no_immediate_dispatch_already_covered_via_slack_path, ops_cycle_4th_hourly_report_not_yet_filed_watchpoint, briefing_apr27_decision_candidate.

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (2h after Sunday briefing), Layer 1 zero + Layer 2 keyword 2 deltas (Hourly Reports 3rd byte-identical resend NOW POST-HOC DISPROVES "0 tickets raised" via TDSD-6729 resolution; Duty Handover routine shift change propagates stale state) (preserved summary)

08:10 WAT Apr 26 Sunday skim tick. Hourly Reports 3rd byte-identical resend at 07:50 WAT proves ops-cycle reporting failure structurally (post-hoc disproves "0 tickets raised" via TDSD-6729 resolution at 07:54 WAT). Duty Handover Note 08:01 WAT Qazim → Daniel routine shift change. No Immediate dispatch.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing) (preserved summary)

Layer 1 zero. Operational keyword 1 thread — Hourly Reports 06:44 WAT byte-identical resend (ambiguous at the time, resolved at 08:10 tick).

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26) (preserved summary)

Layer 1 zero. Operational keyword 1 delta — Hourly Reports 20260426 thread 19dc749cf20cd04b 01:56 WAT (Briefing-2026-04-26 A4).

### last_processed 2026-04-25T17:10:00Z–22:10:00Z — preserved summary block

Multiple Saturday late-afternoon/evening skim ticks. 22:10 Stanbic cycle 34 thread two-track. 18:10 end-of-shift handover deltas. 17:10 FCMB cycle 2 keyword recovery (1-tick delay).

### last_processed 2026-04-25T09:10:00Z–16:10:00Z — preserved summary block

Saturday morning/afternoon skim ticks. 10:10 BambooHR Layer 1 calibration miss surfaced.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

Apr 25 briefing tick.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks.
