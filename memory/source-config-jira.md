---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-26T09:10:00Z (10:10 WAT). 10:10 WAT Apr 26 skim-tick: 1 Layer A delta — TDSD-6730 Resync RC96 created+completed 09:20 WAT Daniel Armstrong (historical Apr 23 resync, low signal, awareness-only). No new TDSD ticket for the 09:36 WAT Access Bank DD Mandate P1 yet (process gap 38min); no new ticket for CoralPay ZIB cycle (8h+ process gap continues)."
updated: "2026-04-26T09:26:12Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T09:10:00Z"
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

### Known limitation — Broad updated-window queries exceed token budget (observed 2026-04-26 10:10 WAT)
Layer A JQL `project = TDSD AND updated >= \"2026-04-26 06:10\" ORDER BY updated DESC` against a window with multiple-day-trailing updates produced a 107K-character response that exceeded the tool token budget. Mitigation: keep `updated >= ...` window narrow (≤6h on full-tick, ≤1h on skim-tick) and cap `maxResults` at 25 unless a specific narrow query is in use. When the broad sweep is needed, scope by active-situation entity (e.g., `(text ~ \"Access\" OR text ~ \"CoralPay\" OR text ~ \"NIBSS\")`) or by status transition rather than pulling all `updated` issues.

## Notes

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (4h after Sunday briefing), Layer A 1 delta — TDSD-6730 Resync RC96 created+completed 09:20 WAT Daniel Armstrong (historical Apr 23 resync, low signal, awareness-only); no TDSD ticket for new Access DD Mandate P1 (process gap 38min); no TDSD ticket for ZIB cycle (8h+ continues)

10:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim). Window 07:10:00Z → 09:10:00Z = 2h. **Layer A only this tick** (skim-tick fast-path). Active-situation key spot-check used (TDSD-6729, TDSD-6728, TDSD-6645, TDSD-6711, TDSD-6716, TDSD-6699, TDSD-6690, TDSD-6684) plus narrow time-windowed `created >= \"2026-04-26 06:10\"` filter to catch new tickets.

**Layer A new-ticket filter `project = TDSD AND created >= \"2026-04-26 06:10\" ORDER BY created DESC` returned 1 issue:**

1. **TDSD-6730 — NEW + Completed in same tick** "Resync | RC96 | 20260423", Medium, [System] Service Desk Incident, reporter+assignee Daniel Armstrong. Created 09:20:48 WAT Apr 26, Status: Completed (statusCategory `done`/green). **Title references RC96 cycle dated 20260423 (Apr 23) — historical resync.** Daniel filing+closing a historical RC96 cycle as part of day-shift onboarding cleanup. **Low signal value** — resync is a routine ops action, not an incident. **Crucially: no NEW TDSD ticket for the 09:36 WAT Access Bank DD Mandate Creation Failures P1** that Daniel filed on Slack at 10:07 WAT — process gap 38min at this tick (parallel to FCMB cycle 1+2 + CoralPay ZIB Apr 26 process gap). Salience factors: `archetype=service_desk`, `priority=medium`, `created+completed_same_tick`, `historical_resync_action`, `low_signal_value`, `awareness_only`, `daniel_armstrong_day_shift_cleanup`.

**Active-situation checkpoint summary (skim-tick spot-check on highest-salience tickets):**
- TDSD-6729 (Access Bank cycle 8) — Completed/Done at 07:54 WAT (prior-tick observation, unchanged).
- **CoralPay ZIB cycle (Apr 26 02:01 WAT P1) — STILL NO TDSD TICKET at 8h09m+ post-Slack-post.** Process gap continues. No Jira-side disambiguator available.
- **Access Bank DD Mandate Creation Failures (Apr 26 09:36 WAT P1) — NO TDSD TICKET YET** at 38min post-Slack-post. New process-gap track to monitor.
- TDSD-6716 (NIBSS PTSA) — Completed since 2026-04-25 16:20 WAT (17h+ stable post-closure at this tick). Situation retired 06:10 WAT briefing tick.
- TDSD-6645 (Monnify VA reversal) — `Escalated` last verified 2026-04-24 11:20:45 WAT (per ID-list spot-check this tick); Dominic silence advancing >85h+. **Re-verified live** — status unchanged, statusCategory.key `indeterminate`/yellow. Pure aging.
- TDSD-6699 (Firewall HA) — `Awaiting implementation` last verified 2026-04-23 15:16:30 WAT; per direct re-check. Status unchanged. Last update 2d18h+ ago.
- TDSD-6690 (Account Switch Reports stopgap) — `Completed` (re-verified live, last update 2026-04-22).
- TDSD-6684 (Pending Refunds) — `Resolved` (re-verified live, last update 2026-04-25 10:54).
- TDSD-6711 (Ecobank portal) — `Completed` (re-verified live, last update 2026-04-25 08:13).

**Cross-source disambiguation:** Slack caught the new DD P1 (Daniel 10:07 WAT) — distinct failure mode from cycles 1–8. Email caught the bilateral DD track (10:12 WAT). Calendar zero new in 2h. Drive not checked.

**No Immediate dispatch from Jira-side this tick** — TDSD-6730 is a routine resync, no incident value. The new DD P1 Immediate dispatch was Slack-driven (Slack post preceded any Jira filing — no TDSD ticket exists yet for the DD P1).

Factors: source=jira, skim_tick, layer_a_one_delta_tdsd6730_routine_resync, layer_b_deferred_skim_fast_path, no_zib_tdsd_ticket_8h+, no_dd_p1_tdsd_ticket_38min_process_gap_track, broad_query_token_budget_lesson, active_situation_re_verification_passed, no_immediate_dispatch.

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (2h after Sunday briefing), Layer A 1 delta — TDSD-6729 RESOLVED (preserved summary)

08:10 WAT Apr 26 Sunday skim tick. TDSD-6729 → Completed/Done at 07:54 WAT, end-to-end 5h49m on Slack. Slack-to-Jira closure lag: +∞ (no Slack closure post). No Immediate dispatch.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), Layer A 0 deltas (preserved summary)

07:10 WAT Apr 26. Layer A zero. TDSD-6729 unchanged Work in progress. ZIB cycle no TDSD ticket.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26) (preserved summary)

3 Layer A deltas: TDSD-6729 NEW, TDSD-6728 Completed, TDSD-6721 Closed.

### last_processed 2026-04-25T13:10:00Z–22:10:00Z — preserved summary block

Apr 25 afternoon/evening ticks. 17:10 TDSD-6716 Completed leased-line RCA. 14:10 Layer B 2 ADD cluster.

### last_processed 2026-04-25T07:10:00Z–12:10:00Z — preserved summary block

Apr 25 morning ticks. 11:10 TDSD-6684 Resolved. 09:10 TDSD-6728 NEW.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

Apr 25 briefing tick.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks.
