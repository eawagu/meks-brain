---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-26T06:10:00Z (07:10 WAT). 07:10 WAT Apr 26 skim-tick: zero Layer A TDSD transitions in 1h post-briefing window. TDSD-6729 (Access Bank cycle 8) unchanged Work in progress; CoralPay ZIB cycle still has no TDSD ticket (process gap continues at 5h+ post-Slack-post)."
updated: "2026-04-26T07:23:03Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T07:10:00Z"
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

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (2h after Sunday briefing), Layer A 1 delta — TDSD-6729 RESOLVED (Access cycle 8 bank-resolved end-to-end 5h49m); ZIB cycle still no TDSD ticket (6h+ process gap continues)

08:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-post-briefing-active-situations). Window 06:10:00Z → 07:10:00Z = 1h post-prior-tick. **Layer A only this tick** (skim-tick fast-path; Layer B deferred — no observed P1/Blocker filings in last 24h on software projects, ZIB cycle has no software-project filings to surface).

**Layer A (TDSD) JQL `project = TDSD AND updated >= \"2026-04-26 07:10\" ORDER BY updated DESC` returned 1 issue:**

1. **TDSD-6729 — Updated to Completed** "Access Bank | ATS | RC 91 Failures | 20260426", Medium, [System] Incident, reporter+assignee Qazim Adedigba, status transition `Work in progress → Completed` (statusCategory `done`/green), Resolution `Done`, updated 2026-04-26T07:54:06.857+0100 (06:54 UTC). Cycle 8 closure on Jira. **End-to-end on Slack 02:05 WAT → ~07:54 WAT = 5h49m. Slack-to-Jira lag at filing was 19min; Jira-to-Slack lag at closure is currently +∞ (no Slack closure post observed).** **First Access Bank RC91 cycle to break the 3–50m bank-auto-recovery pattern of cycles 1–7** — but ultimately bank-resolved without intervention. Salience factors: `archetype=service_desk`, `priority=medium`, `status_transition=work_in_progress→completed`, `resolution=done`, `active_situation_match=access-bank-multi-track-failures`, `cycle8_anomalous_duration_5h49m`, `bank_resolved_no_intervention`, `consistent_with_implicit_resolve_pattern_at_anomalous_duration`, `slack_closure_post_absent`, `briefing_apr27_decision_candidate_post_mortem_+_workflow_gap`. **Briefing-2026-04-27 carryforward — closure of Briefing-2026-04-26 D2.**

**Active-situation checkpoint summary (skim-tick spot-check on highest-salience tickets):**
- TDSD-6729 (Access Bank cycle 8) — **RESOLVED** at 07:54 WAT, see above. Situation page [[Access Bank — Multi-Track Failures]] updated this tick.
- **CoralPay ZIB cycle (Apr 26 02:01 WAT P1) — STILL NO TDSD TICKET at 6h09m+ post-Slack-post.** Process gap continues. Per source-config-jira historical observation, ZIB cycle is a single-track-Slack regression. The absence of a TDSD ticket means **no Jira-side disambiguator is available for ZIB resolution** — cycle state inferable only from Slack (silent) or future explicit ops posts. Situation page [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] updated this tick.
- TDSD-6716 (NIBSS PTSA) — Completed since 2026-04-25 16:20 WAT (19h+ stable post-closure at this tick). Situation `resolving` retirement-candidate carries forward.
- TDSD-6645 (Monnify VA reversal) — `Escalated` per last verified Apr 24 22:10 WAT; Dominic silence advancing >85h+ at this tick (re-verify at next sweep that includes ATS query).
- TDSD-6699 (Firewall HA) — implementation window opened 18:00 WAT Apr 25, 14h+ ago; re-verify at next briefing tick.

**Cross-source:** Slack zero deltas on Tier 1 (ops + alerts) — 5h49m P1 closure did not propagate to Slack ops channel. Email caught 2 deltas — Hourly Reports 20260426 3rd byte-identical resend at 07:50 WAT (post-TDSD-6729-creation AND -resolution proves ops-cycle reporting failure structurally) + routine duty handover at 08:01 WAT. Calendar zero new. Drive zero in-window.

**No Immediate dispatch this tick** — TDSD-6729 → Completed is a resolution signal, not an Immediate trigger.

Factors: source=jira, skim_tick, layer_a_one_delta_tdsd6729_completed_done, end_to_end_5h49m_anomalous_duration_eventually_resolved, layer_b_deferred_skim_fast_path, no_zib_tdsd_ticket_6h+_process_gap_continues, jira_to_slack_closure_lag_unbounded_at_tick, briefing_apr27_decision_candidate_post_mortem_+_workflow_gap, no_immediate_dispatch.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), Layer A 0 deltas in 1h post-briefing window (preserved summary)

07:10 WAT Apr 26 Sunday skim tick. Window 05:10:00Z → 06:10:00Z = 1h. Layer A only (skim fast-path). **Layer A JQL returned 0 issues.** TDSD-6729 (Access Bank cycle 8) unchanged from briefing-tick state (Work in progress, Resolution null). No new TDSD ticket for CoralPay ZIB cycle (5h+ process gap). Cross-source: Slack zero, email Hourly Reports 06:44 WAT byte-identical resend (contradicts TDSD-6729). No Immediate dispatch.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), Layer A 3 deltas (TDSD-6729 NEW + TDSD-6728 Completed + TDSD-6721 Closed) + Layer B 0 deltas (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick. Window 21:10:00Z Apr 25 → 05:10:00Z Apr 26 = 8h overnight delegation window. **Layer A 3 issues:** (1) TDSD-6729 NEW Access Bank cycle 8 02:24 WAT Work in progress (Briefing-2026-04-26 A2/D2). (2) TDSD-6728 → Completed at 02:13 WAT (CoralPay ZIB Apr 25 cycle 18h44m end-to-end / 6h44m downtime, failover-to-CoralPay_Cashout workaround documented; direct precursor to Apr 26 02:01 WAT cycle recurrence; Briefing-2026-04-26 A1). (3) TDSD-6721 PENDING PAYABLE POSTING Closed 23:44 WAT Apr 25 (routine, Briefing-2026-04-26 A3). **Layer B 0 issues.** Active-situation checkpoint summary covered above. No Immediate-tier Jira-driven dispatch (P1s Slack-originated, dispatched via Slack DM).

### last_processed 2026-04-25T13:10:00Z–22:10:00Z — preserved summary block

Multiple Saturday afternoon/evening ticks. 22:10 WAT zero across both layers; FCMB cycle 2 process-gap status continued. 17:10 WAT TDSD-6716 NIBSS PTSA Completed (situation stable→resolving). 14:10 WAT Layer B 2 ADD cluster. 13:10 WAT TDSD-6690 staleness correction.

### last_processed 2026-04-25T07:10:00Z–12:10:00Z — preserved summary block

Saturday morning ticks. 11:10 WAT TDSD-6684 Resolved 10:54 WAT (Dominic silence broken). 09:10 WAT TDSD-6728 NEW CoralPay ZIB Interchange Stopped state incident (Apr 25 cycle precursor). 08:10 WAT TDSD-6727 Union RC96 Completed.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, Layer A 2 deltas + Layer B 2 deltas (preserved summary)

06:09 WAT Apr 25 briefing tick. Layer A 2: TDSD-6727 Union RC96 + TDSD-6726 Habari RC91 Problem ticket. Layer B 2: ADD-4599 + ADD-4597 Bukola Taiwo metadata.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks. 06:09 WAT briefing-tick 5 TDSD deltas. 17:09 WAT TDSD-6713 Keystone Apr 24 cycle Completed. 20:10 WAT TDSD-6725 Paystack ₦4.5B Resolved.
