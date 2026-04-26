---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-26T11:10:00Z (12:10 WAT). 12:10 WAT Apr 26 skim-tick: 1 NEW Layer A delta — TDSD-6732 NEW 11:18 WAT 'Access TeamApt DD Mandate Creation Failure | 20260426' Kabir Yusuf reporter+assignee (Medium, Work in progress). Description: routing paused + merchants notified — Immediate trigger #7 (route off, revenue impact) FIRED, dispatched 12:11 WAT. Parallel-ticket structure with TDSD-6731 (technical/Babajide engineering) vs TDSD-6732 (operational/Kabir Yusuf containment). Boundary-case dedup on TDSD-6731 (already processed prior tick)."
updated: 2026-04-26
cssclasses:
  - "source-config"
last_processed: "2026-04-26T11:10:00Z"
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
- `description_signal=<route-off|merchant-notification|route-pause|escalated-to-bank|escalated-internally>` — surface description-level operational signals that warrant Immediate dispatch even when ticket priority/status alone do not (e.g., TDSD-6732 12:10 WAT Apr 26 — Medium-priority Work-in-progress ticket whose description carried "Routing has been paused temporarily" matched config-salience Immediate trigger #7 route-off).

### Active-situation checkpoint re-verification (post 2026-04-25 13:10 WAT TDSD-6690 staleness)
When the source-config trace describes an active-situation ticket's state in narrative shorthand (e.g., \"still at approval gates\", \"still WIP\", \"still Escalated\"), MUST re-verify the description against the live `status` field (and `statusCategory.key`) every full briefing-tick. NEVER propagate a narrative description from a prior tick without checking the current Jira state — descriptions go stale silently when the ticket transitions and prior-tick text is copied forward.

### Description-field reading discipline (post 2026-04-26 12:10 WAT TDSD-6732)
For every Layer A ticket surfaced in a delta sweep, MUST read the `description` field at minimum (in addition to summary, status, priority, assignee, reporter). Description text routinely carries operational signals — route-pause / merchant-notification / escalation / containment decisions — that do NOT appear in any structured field but match config-salience Immediate triggers. The `getJiraIssue` call with `fields=[..., "description"]` (or `*all`) is the canonical pattern for any Layer A delta that lacks a clear summary-only signal. Skim-tick discipline: when Layer A returns ≥1 delta, MUST issue at least one description-fetching `getJiraIssue` call per delta before classifying tier — NEVER rely on summary alone for skim-tick triage. Without this, a ticket like TDSD-6732 (Medium, Work in progress, summary "Access TeamApt DD Mandate Creation Failure" — looks like routine duplicate) silently passes through as Awareness-tier when the description carries Immediate-tier route-off + merchant-notification escalation.

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > \"<last_processed>\" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in (\"ADD\",\"AS\",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > \"<last_processed>\" AND (priority in (Highest, Blocker, Critical) OR status changed FROM (\"Open\",\"In Progress\") TO (\"Resolved\",\"Done\",\"Completed\",\"Escalated\"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors. For Layer A deltas, MUST fetch description per Description-field reading discipline above.
4. **Client-side UTC filter** — Jira JQL interprets the `\"YYYY-MM-DD HH:MM\"` datetime literal in the user's configured timezone (Africa/Lagos = WAT). Since `last_processed` is stored in UTC (`YYYY-MM-DDTHH:MM:SSZ`), the server-side JQL filter using the UTC hour as-is is effectively 1h lax — it lets through updates from the hour before `last_processed`. Therefore the heartbeat MUST apply a client-side filter: convert each returned issue's `fields.updated` to UTC and compare to `last_processed`; discard any issue whose UTC-updated time ≤ `last_processed`.

### Known limitation — Broad updated-window queries exceed token budget (observed 2026-04-26 10:10 WAT)
Layer A JQL `project = TDSD AND updated >= \"2026-04-26 06:10\" ORDER BY updated DESC` against a window with multiple-day-trailing updates produced a 107K-character response that exceeded the tool token budget. Mitigation: keep `updated >= ...` window narrow (≤6h on full-tick, ≤1h on skim-tick) and cap `maxResults` at 25 unless a specific narrow query is in use. When the broad sweep is needed, scope by active-situation entity (e.g., `(text ~ \"Access\" OR text ~ \"CoralPay\" OR text ~ \"NIBSS\")`) or by status transition rather than pulling all `updated` issues.

## Notes

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (6h after Sunday briefing), Layer A 1 NEW delta — TDSD-6732 NEW 11:18 WAT Kabir Yusuf "Routing paused" + "merchants notified" → Immediate trigger #7 fired

12:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=non-briefing-tick-with-2-active-overnight-P1s-and-proximate-dad-reminder). Window 10:10:00Z → 11:10:00Z = 1h. **Layer A only this tick** (skim-tick fast-path). Query: `project = TDSD AND updated >= "2026-04-26 10:10" ORDER BY updated DESC` (maxResults=15, narrow 1h window per token-budget directive). Returned 2 issues; client-side UTC filter applied.

1. **TDSD-6732 — NEW (ROUTE-PAUSE OPERATIONAL CONTAINMENT TICKET)** "Access TeamApt DD Mandate Creation Failure | 20260426", Medium, [System] Incident, **reporter+assignee [[Kabir Yusuf]]** (accountId `712020:3840698b-07be-427f-84ba-d5fedf93fed5`, email yusuf.obafemi@teamapt.com — same accountId for reporter and assignee). Created 2026-04-26T11:18:54.353+0100 (11:18 WAT), updated 11:22:37 WAT, Status: **Work in progress** (statusCategory `indeterminate`/yellow). **Description (per `getJiraIssue` call):** _"Hello Team, We are currently experiencing issues with mandate creation on Access TeamApt DD. This is impacting our ability to process related transactions. This has been communicated to the respective merchants. Routing has been paused temporarily."_ **NOT a duplicate of TDSD-6731.** TDSD-6731 is the technical investigation track (Daniel Armstrong reporter / Babajide Ojoboorun engineering owner — credential-remediation track), TDSD-6732 is the operational containment track (Kabir Yusuf reporter+assignee — TeamApt DD ops side). The dual-ticket structure reflects parallel internal-engineering vs ops-containment ownership. **Per config-salience Immediate-tier trigger #7 ("Route turned off — A bank route changes from operational to off, direct revenue impact, capacity planning required"): MATCH FIRED.** TeamApt DD routing on Access bank now paused — direct revenue impact. **Combined Immediate-tier Slack DM dispatched to user U080PEXEZ0E DM channel D081JT4AD0Q at 12:11 WAT** covering route-pause, parallel-ticket structure, active P1 picture, and CTO action options. Salience factors: `archetype=service_desk`, `priority=medium`, `active_situation_match=access-bank-multi-track-failures+dcir-acs-credential-remediation`, `description_signal=route_off+merchant_notification+route_pause`, `parallel_ticket_pattern_technical_vs_operational`, `kabir_yusuf_new_entity_dangling_link`, `immediate_trigger_7_fired_route_off`, `immediate_dispatch_third_in_6h_warranted_by_state_change`, `no_bank_reply_2h_post_bilateral_escalating_concern`, `briefing_apr27_decision_candidate_dual_ticket_structure`.
2. **TDSD-6731** — already captured at 11:10 WAT prior tick (updated 10:19:09 WAT). Updated time 10:19:09Z > 10:10:00Z last_processed — passes client-side UTC filter, but boundary-case dedup applies: the substantive content (Babajide assignee, credential-remediation routing) was processed at the prior tick. **Treat as zero-new-delta this tick to avoid duplicate processing.** Per source-config-email's documented dedup pattern: when a returned ticket's update time falls within the window but the ticket already has a prior-tick narrative entry on the situation page, treat as zero-new-delta — the substantive content has been captured. This is a recurring boundary-case pattern under client-side UTC filter when consecutive ticks have overlapping JQL semantics.

**Active-situation checkpoint summary (skim-tick spot-check unchanged from prior tick):**
- TDSD-6731 (Access Bank DD Mandate P1 — technical track) — Work in progress (Babajide assignee). No status transition since 10:19 WAT prior-tick capture. Watchpoint: Awaiting Scheme Update / Escalated / Resolved transitions on Babajide's investigation.
- TDSD-6732 (Access Bank DD Mandate P1 — operational containment) — NEW this tick (Kabir Yusuf assignee, Work in progress, route paused).
- TDSD-6729 (Access Bank cycle 8) — Completed/Done at 07:54 WAT (4h17m+ stable post-resolution at this tick). Slack closure post still NOT propagated.
- **CoralPay ZIB cycle (Apr 26 02:01 WAT P1) — STILL NO TDSD TICKET at 10h10m+ post-Slack-post.** Process gap continues to diverge from Access DD's 11min closure timing. Comparator: Access DD ops side filed TDSD-6732 within ~3h of original P1 (technical TDSD-6731 within 11min); CoralPay ZIB ops has filed nothing in 10h.
- TDSD-6716 (NIBSS PTSA) — Completed since 2026-04-25 16:20 WAT (19h+ stable). Situation retired-candidate per briefing A5.
- TDSD-6645 (Monnify VA reversal) — `Escalated` last verified 2026-04-24 11:20:45 WAT; Dominic silence advancing >87h+ at this tick.
- TDSD-6699 (Firewall HA) — `Awaiting implementation` last verified 2026-04-23 15:16:30 WAT; 2d20h+ ago.
- TDSD-6690 (Account Switch Reports stopgap) — `Completed` (re-verified live, last update 2026-04-22).
- TDSD-6684 (Pending Refunds) — `Resolved` (re-verified live, last update 2026-04-25 10:54).
- TDSD-6711 (Ecobank portal) — `Completed` (re-verified live, last update 2026-04-25 08:13).

**Cross-source disambiguation:** Slack zero deltas in 1h (no closure post propagated, no bank reply visible). Email zero new in 1h (the 09:12 UTC bilateral thread already captured at prior ticks — boundary-case dedup). Calendar zero new in 1h. Drive zero in 5h+ window (backlog drained, normal-chain handling active).

**Immediate dispatch this tick:** YES — TDSD-6732's description-field route-pause + merchant-notification matched config-salience Immediate trigger #7. Slack DM draft created to U080PEXEZ0E (DM channel D081JT4AD0Q) at 12:11 WAT.

Factors: source=jira, skim_tick, layer_a_one_new_delta_tdsd6732, route_off_immediate_trigger_7_fired, parallel_ticket_pattern_technical_vs_operational, dual_ticket_structure_evidence_for_credential_remediation_hypothesis, kabir_yusuf_new_entity_dangling_link, immediate_dispatch_third_in_6h_warranted_by_state_change, description_field_reading_discipline_validated_by_skim_capture, no_bank_reply_2h_post_bilateral_escalating_concern, no_zib_tdsd_ticket_10h+_continues_to_diverge_from_access_dd_closure_timing.

### last_processed 2026-04-26T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (preserved summary)

11:10 WAT Apr 26 Sunday skim tick. Layer A 1 delta — TDSD-6731 NEW 10:18 WAT Daniel Armstrong reporter / Babajide Ojoboorun assignee. Process gap closed 11min post-Slack / 6min post-bilateral-email. Babajide assignment routes to credential-remediation track owner. No Immediate dispatch (state-update for already-dispatched P1).

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (preserved summary)

10:10 WAT Apr 26 Sunday skim. Layer A 1 delta: TDSD-6730 NEW + Completed in same tick (historical RC96 resync, low signal). No Access DD TDSD ticket yet (process gap 38min). No CoralPay ZIB ticket (8h+).

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (preserved summary)

08:10 WAT Apr 26. Layer A 1 delta — TDSD-6729 → Completed/Done at 07:54 WAT, end-to-end 5h49m. Slack-to-Jira closure lag: +∞ (no Slack closure post).

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