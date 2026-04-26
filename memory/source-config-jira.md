---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-25T21:10:00Z (22:10 WAT). 22:10 WAT Apr 25 skim-tick: zero deltas across both Layer A (TDSD service_desk) and Layer B (software). Stanbic cycle 34 (Slack+email tick this tick) carries no TDSD ticket — single-track-Jira regression continues across cycles 33+34."
updated: "2026-04-26T05:27:28Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T05:10:00Z"
---


## Connection

- **Connector:** Atlassian MCP
- **Cloud ID:** 15be6fd4-ef3b-4d52-ab1b-e6e706a38e06
- **Site:** teamapt.atlassian.net
- **Scope — 18 projects (1 service_desk + 17 software):**

| Display name | Key | Archetype |
|---|---|---|
| TeamApt-Service-Desk | TDSD | service_desk |
| AptPay Consolidated Direct Debit | TCDD | software |
| Aptpay Core Switching | ATPG | software |
| AptPay Direct Debit (DTB) | ADD | software |
| AptPay Switch | AS | software |
| AptPay Third Party Processing | ATPP | software |
| TeamApt Payment Switch Engine | TPSE | software |
| TeamApt Dev | TD | software |
| TeamApt Messaging | TM | software |
| TeamApt Web Portal | TWP | software |
| Atlas | ATLAS | software |
| TeamApt DevOps | TDEV | software |
| TeamApt Access Vault | TAV | software |
| ATS | ATS | software |
| NIBSS | NIBSS | software |
| OPS | OPS | software |
| NUS | NUS | software |
| NSS | NSS | software |

Note: `ADD` and `AS` are JQL reserved words — must be quoted in query: `project in (\"ADD\", \"AS\", ...)`.

## Directives

### Priority model
- **Archetype signals:** service_desk (TDSD) = operational incidents (Immediate/Briefing tiers); software projects = dev work (mostly Awareness unless P1/P0).
- **Layer A — TDSD service_desk:** surface all P1/Highest/Critical priority, all status transitions on active-situation entities, all new ticket filings matching active situations.
- **Layer B — Software projects:** heuristic — surface P1/P0, Blocker priority, status transitions on pattern-tracked epics (MDRS, Harness migration, CoralPay), tickets touching entities in developing situations.
- **Layer C — Skip list:** low-signal ticket patterns — see Skip list section.

### Salience factors
- `priority=<level>` — Highest/Critical > High > Medium > Low. P1 = Immediate unless resolved fast-cycle.
- `status_transition=<from→to>` — Completed/Resolved/Done = resolution signal; Awaiting Scheme Update = potential stall; Escalated = owner change.
- `active_situation_match=<situation-page>` — ticket names an entity tracked in a developing situation.
- `assignee=<user>` — Dominic routing to Awaiting Scheme Update = workflow-discipline pattern (tracking).
- `archetype=<service_desk|software>` — service_desk tickets default to higher salience.

### Active-situation checkpoint re-verification (post 2026-04-25 13:10 WAT TDSD-6690 staleness)
When the source-config trace describes an active-situation ticket's state in narrative shorthand (e.g., \"still at approval gates\", \"still WIP\", \"still Escalated\"), MUST re-verify the description against the live `status` field (and `statusCategory.key`) every full briefing-tick. NEVER propagate a narrative description from a prior tick without checking the current Jira state — descriptions go stale silently when the ticket transitions and prior-tick text is copied forward.

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > \"<last_processed>\" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in (\"ADD\",\"AS\",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > \"<last_processed>\" AND (priority in (Highest, Blocker, Critical) OR status changed FROM (\"Open\",\"In Progress\") TO (\"Resolved\",\"Done\",\"Completed\",\"Escalated\"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors.
4. **Client-side UTC filter** — Jira JQL interprets the `\"YYYY-MM-DD HH:MM\"` datetime literal in the user's configured timezone (Africa/Lagos = WAT). Since `last_processed` is stored in UTC (`YYYY-MM-DDTHH:MM:SSZ`), the server-side JQL filter using the UTC hour as-is is effectively 1h lax — it lets through updates from the hour before `last_processed`. Therefore the heartbeat MUST apply a client-side filter: convert each returned issue's `fields.updated` to UTC and compare to `last_processed`; discard any issue whose UTC-updated time ≤ `last_processed`.

## Notes

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), Layer A 3 deltas (TDSD-6729 NEW + TDSD-6728 Completed + TDSD-6721 Closed) + Layer B 0 deltas

06:10 WAT Apr 26 Sunday briefing tick (Step 0: level=full, rationale=briefing-tick — floor override). Window 21:10:00Z Apr 25 → 05:10:00Z Apr 26 = 8h overnight delegation window.

**Layer A (TDSD) JQL `project = TDSD AND updated > \"2026-04-25 22:10\" ORDER BY updated DESC` returned 3 issues** (all pass client-side UTC filter against 2026-04-25T21:10:00Z):

1. **TDSD-6729 — NEW** \"Access Bank | ATS | RC 91 Failures | 20260426\", Medium, [System] Incident, reporter+assignee Qazim Adedigba, status `Work in progress` (statusCategory `indeterminate`/yellow), Resolution null, updated 2026-04-26T02:24:13.987+0100 (01:24 UTC). Description: \"Hello Team, Please be informed that Access Bank ATS transactions are failing with RC91. Kindly assist review.\" Slack-to-Jira lag from 02:05 WAT Slack post = 19min. Salience factors: `archetype=service_desk`, `priority=medium`, `status=work_in_progress`, `active_situation_match=access-bank-multi-track-failures`, `cycle8_breaks_3-50m_auto_recovery_pattern_cycles1_7`, `anomalous_duration_4x_upper_bound`, `slack_to_jira_lag_19min`. **Briefing-2026-04-26 A2 (Jira-side of D2).**

2. **TDSD-6728 — Updated to Completed** \"Switch | CoralPay (ZIB) | Interchange on Stopped State Incident | 20260425\", Medium, [System] Incident, reporter+assignee Qazim Adedigba, status transition → `Completed` (statusCategory `done`/green), Resolution `Done`, updated 2026-04-26T02:13:21.294+0100 (01:13 UTC). Description: \"Start Date & Time: Apr 25, 2026, 1:04 AM WAT. End Date & Time: Apr 25, 2026, 7:48 PM WAT. Severity: Medium. Downtime: 6 Hours, 44 Minutes.\" Closure summary documents Zenith EoD upstream trigger + failover-to-CoralPay_Cashout + alternate-key-+-key-reselect manual recovery sequence. Salience factors: `archetype=service_desk`, `priority=medium`, `status_transition=work_in_progress→completed`, `active_situation_match=coralpay-fbn-turned-off-production-deploy-did-not-prevent-recurrence`, `downtime_6h44m`, `end_to_end_18h44m`, `failover_workaround_documented`, `zenith_eod_upstream_trigger`, `direct_precursor_to_d1_apr26_cycle`. **Briefing-2026-04-26 A1 (closure of Apr 25 cycle, direct precursor to Apr 26 02:01 WAT D1 recurrence within ~6h).**

3. **TDSD-6721 — Closed** \"PENDING PAYABLE POSTING\", Medium, [System] Service request, reporter Samson Anaele (moniepoint.com), assignee Opeyemi Ahmed, status transition → `Closed` (statusCategory `done`/green), Resolution `Done`, updated 2026-04-25T23:44:05.021+0100 (22:44 UTC). RTGS reconciliation Service Request via Google Sheets (linked transaction set). Mentions Emmanuel Olatunbosun, Emmanuel Eke, Eniola Ijalana. Salience factors: `archetype=service_desk`, `request_type=service_request`, `status=closed`, `routine_reconciliation`, `no_active_situation_match`. **Briefing-2026-04-26 A3.**

**Layer B (17 software projects) JQL with \"ADD\"/\"AS\" properly quoted + (priority in Highest/Blocker/Critical OR status transition) returned 0 issues.** No software-project P1/Blocker filings or status transitions in 8h overnight window.

**Active-situation checkpoint summary (briefing-tick re-verification per directive):**
- TDSD-6716 (NIBSS PTSA RC91) — `Completed` since 2026-04-25 16:20 WAT (Resolution=Done, 13h50m+ stable post-closure). [[NIBSS PTSA — VPN Flapping Apr 22]] situation `resolving` → retirement candidate at this tick (briefing-2026-04-26 A5).
- TDSD-6699 (Firewall HA) — Implementation window opened 18:00 WAT Apr 25; no post-window status visible in last sweep. Re-verify at next briefing tick.
- TDSD-6645 (Monnify VA reversal) — `Escalated` per last verified Apr 24 22:10 WAT; Dominic silence advancing ~74h+ at this tick (re-verify at next sweep that includes ATS query).
- TDSD-6711 (Ecobank DCIR portal) — `Completed` since Apr 25 08:13 WAT prior-tick.
- TDSD-6690 (Account Switch Reports Stopgap) — `Completed` since Apr 22 16:58 WAT (informal-close-without-formal-authorization caveat holds).
- TDSD-6729 (Access Bank cycle 8) — NEW this tick, Work in progress (situation [[Access Bank — Multi-Track Failures]] update needed).
- CoralPay ZIB cycle 02:01 WAT Apr 26 — no TDSD ticket yet 4h+ post-Slack-post (process gap; situation [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] update needed).
- Stanbic cycles 33+34 — no Jira-track entries (single-track-Jira regression continues).

**Cross-source:** Slack 2 P1 deltas this tick (CoralPay ZIB + Access Bank); email Hourly Reports 20260426 01:56 WAT 14/17 routes; calendar Mon Apr 27 packed.

**No Immediate-tier Jira-driven dispatch this tick** — both P1s are Slack-originated (Immediate dispatch already routed via combined Slack DM at 06:10 WAT). TDSD-6729 confirms Jira-track presence for cycle 8.

Factors: source=jira, briefing_tick, layer_a_3_deltas, layer_b_0_deltas, tdsd6729_access_bank_cycle8_new_work_in_progress, tdsd6728_coralpay_zib_apr25_completed_18h44m_failover_workaround, tdsd6721_pending_payable_posting_closed_routine, tdsd6716_resolving_situation_retirement_candidate, post_overnight_delegation_resume.

### last_processed 2026-04-25T21:10:00Z (22:10 WAT) — skim-level 22:00-cron tick (last tick before overnight delegation), zero deltas across both layers (preserved summary)

22:10 WAT Apr 25 Saturday skim tick. Window 19:10:00Z → 21:10:00Z = 2h. Layer A 0; Layer B 0. Stanbic cycle 34 (slack+email this tick) carries no TDSD ticket — single-track-Jira regression continues across cycles 33+34. FCMB cycle 2 process-gap status: email cycle 2 escalation filed 16:04 WAT did NOT generate a Jira ticket as of 22:10 WAT (~6h05m later).

### last_processed 2026-04-25T13:10:00Z–19:10:00Z — preserved summary block

Multiple Saturday skim ticks, mostly zero or single Layer B deltas. Notable: 17:10 WAT TDSD-6716 NIBSS PTSA Completed (situation `stable → resolving`); 14:10 WAT Layer B 2 Fatai Ibrahim DD cluster (ADD-4563 + ADD-4542); 13:10 WAT TDSD-6690 staleness correction (Completed since Apr 22, narrative shorthand directive added).

### last_processed 2026-04-25T07:10:00Z–12:10:00Z — preserved summary block

Saturday morning skim ticks. 11:10 WAT TDSD-6684 Resolved 10:54 WAT (Dominic 55h+ silence broken — counter-signal). 09:10 WAT TDSD-6728 NEW CoralPay ZIB Interchange Stopped state incident (Apr 25 cycle precursor). 08:10 WAT TDSD-6727 Union RC96 Completed 08:11 WAT.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, Layer A 2 deltas + Layer B 2 deltas (preserved summary)

06:09 WAT Apr 25 briefing tick. Layer A 2: TDSD-6727 Union RC96 + TDSD-6726 Habari RC91 Problem ticket. Layer B 2: ADD-4599 + ADD-4597 Bukola Taiwo metadata.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks. 06:09 WAT briefing-tick 5 TDSD deltas. 17:09 WAT TDSD-6713 Keystone Apr 24 cycle Completed. 20:10 WAT TDSD-6725 Paystack ₦4.5B Resolved.
