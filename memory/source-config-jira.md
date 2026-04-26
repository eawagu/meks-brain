---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: 1 Layer A delta — TDSD-6731 NEW 10:18 WAT \"Access | DD | Mandate Creation Failures | 20260426\" Daniel Armstrong reporter / Babajide Ojoboorun assignee (Medium, Work in progress). Process gap closed 11min post-Slack-post / 6min post-bilateral-email. Babajide assignment routes to credential-remediation track owner."
updated: "2026-04-26T10:21:19Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T10:10:00Z"
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

### last_processed 2026-04-26T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (5h after Sunday briefing), Layer A 1 delta — TDSD-6731 NEW 10:18 WAT "Access | DD | Mandate Creation Failures | 20260426" Daniel Armstrong reporter / Babajide Ojoboorun assignee

11:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim). Window 09:10:00Z → 10:10:00Z = 1h. **Layer A only this tick** (skim-tick fast-path). Query: `project = TDSD AND updated >= "2026-04-26 09:10" ORDER BY updated DESC` (maxResults=25, narrow 1h window per token-budget directive). Returned 2 issues — both within client-side UTC filter.

1. **TDSD-6731 — NEW (PROCESS GAP CLOSED FOR ACCESS DD P1)** "Access | DD | Mandate Creation Failures | 20260426", Medium, [System] Incident, **reporter [[Daniel Armstrong]] / assignee [[Babajide Ojoboorun]]**. Created 2026-04-26T10:18:01.107+0100 (10:18 WAT), updated 10:19:09 WAT, Status: **Work in progress** (statusCategory `indeterminate`/yellow). **Process gap closed at 11min post-Slack-post (10:07 WAT) / 6min post-bilateral-email (10:12 WAT) — within typical 19min ATS Slack-to-Jira pattern, faster than the 38min process-gap noted at 10:10 WAT skim-tick prior to filing.** Babajide Ojoboorun assignment is structurally significant: Babajide is the named owner of the ACS connector replacement track per the long-running [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] situation, so this 401 OAuth ticket routes directly to the credential-remediation owner without a hand-off step. **The assignee selection itself is evidence for the credential-rotation hypothesis as the primary internal framing** — ops believes the cause path runs through the connector rather than through a transient bank-side issue. Watchpoint: ticket transitions (Awaiting Scheme Update / Escalated / Resolved) on Babajide's investigation. Salience factors: `archetype=service_desk`, `priority=medium`, `active_situation_match=access-bank-multi-track-failures+dcir-acs-credential-remediation`, `process_gap_closed_11min_slack_to_jira`, `assignee=babajide_ojoboorun_credential_remediation_track_owner`, `assignment_evidence_for_credential_rotation_hypothesis`, `awareness_tier_state_update_no_novel_immediate_trigger`, `briefing_apr27_decision_candidate`.
2. **TDSD-6730** — already captured at 10:10 WAT prior tick (created+completed 09:20 WAT historical RC96 resync, low signal). Prior tick last_processed 09:10:00Z; TDSD-6730 update at 09:23:56 WAT (08:23:56Z) is BEFORE current last_processed (09:10:00Z) — wait, 08:23 < 09:10 yes so it's pre-window. Returned this tick only because the JQL TZ-conversion interprets the WAT literal. Client-side UTC filter discards it (updated 08:23:56Z ≤ last_processed 09:10:00Z). **Discard, no re-processing.**

**Active-situation checkpoint summary (skim-tick spot-check unchanged from prior tick):**
- TDSD-6729 (Access Bank cycle 8) — Completed/Done at 07:54 WAT (3h+ stable post-resolution at this tick). Slack closure post still NOT propagated.
- TDSD-6731 (Access Bank DD Mandate P1) — NEW this tick (Babajide assignee, Work in progress).
- **CoralPay ZIB cycle (Apr 26 02:01 WAT P1) — STILL NO TDSD TICKET at 9h11m+ post-Slack-post.** Process gap continues (now diverges from Access DD process-gap closure timing — Access closed at 11min, ZIB still open 9h+).
- TDSD-6716 (NIBSS PTSA) — Completed since 2026-04-25 16:20 WAT (18h+ stable). Situation retired.
- TDSD-6645 (Monnify VA reversal) — `Escalated` last verified 2026-04-24 11:20:45 WAT; Dominic silence advancing >86h+ at this tick.
- TDSD-6699 (Firewall HA) — `Awaiting implementation` last verified 2026-04-23 15:16:30 WAT; 2d19h+ ago.
- TDSD-6690 (Account Switch Reports stopgap) — `Completed` (re-verified live, last update 2026-04-22).
- TDSD-6684 (Pending Refunds) — `Resolved` (re-verified live, last update 2026-04-25 10:54).
- TDSD-6711 (Ecobank portal) — `Completed` (re-verified live, last update 2026-04-25 08:13).

**Cross-source disambiguation:** Slack zero deltas in 1h (no closure post propagated, no bank reply visible). Email zero new in 1h (the 09:12 UTC bilateral thread already captured). Calendar zero new in 1h. Drive not checked.

**No Immediate dispatch from Jira-side this tick** — TDSD-6731 is a process-discipline state-update for an already-Immediate-dispatched P1; no novel trigger.

Factors: source=jira, skim_tick, layer_a_one_delta_tdsd6731, process_gap_closed_for_access_dd_p1, babajide_ojoboorun_assignment_routes_to_credential_remediation_track_owner, no_zib_tdsd_ticket_9h11m+_diverges_from_access_dd_process_gap_closure_timing, no_immediate_dispatch.

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (4h after Sunday briefing), Layer A 1 delta — TDSD-6730 Resync RC96 (preserved summary)

10:10 WAT Apr 26 Sunday skim tick. Window 07:10:00Z → 09:10:00Z = 2h. Layer A 1 delta: TDSD-6730 NEW + Completed in same tick (Daniel Armstrong historical RC96 resync, low signal, awareness only). No new TDSD ticket for the 09:36 WAT Access Bank DD Mandate P1 yet (process gap 38min at the time). No new ticket for CoralPay ZIB cycle (8h+).

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (preserved summary)

08:10 WAT Apr 26 Sunday skim. Layer A 1 delta — TDSD-6729 → Completed/Done at 07:54 WAT, end-to-end 5h49m. Slack-to-Jira closure lag: +∞ (no Slack closure post). No Immediate dispatch.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (preserved summary)

07:10 WAT Apr 26. Layer A zero. TDSD-6729 unchanged Work in progress. ZIB cycle no TDSD ticket.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (preserved summary)

3 Layer A deltas: TDSD-6729 NEW, TDSD-6728 Completed, TDSD-6721 Closed.

### last_processed 2026-04-25T13:10:00Z–earlier — preserved summary block

Apr 25 afternoon/evening ticks. 17:10 TDSD-6716 Completed leased-line RCA. 14:10 Layer B 2 ADD cluster.

### last_processed 2026-04-25T07:10:00Z–earlier — preserved summary block

Apr 25 morning ticks. 11:10 TDSD-6684 Resolved. 09:10 TDSD-6728 NEW.

### last_processed 2026-04-24T05:09:00Z–earlier — preserved summary block

Apr 24 ticks.
