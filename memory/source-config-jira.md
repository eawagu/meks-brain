---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-26T12:10:00Z (13:10 WAT). 13:10 WAT Apr 26 skim-tick: 1 NEW Layer A delta — TDSD-6732 transitioned Work in progress → Completed/Done at 13:01:54 WAT (operational containment ticket closed; description NOT amended → route-pause status uncertain); TDSD-6731 (technical track at Babajide) unchanged. Layer B: 24 VTIE-* tickets created/updated by Chiagoziem Okoye 12:19–12:44 WAT — coordinated reliability program planning batch (incident management, observability, resilience/toil, governance/SLIs themes) — all Backlog status, Awareness-tier. No Immediate dispatch."
updated: 2026-04-26
cssclasses:
  - "source-config"
last_processed: "2026-04-26T12:10:00Z"
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
For every Layer A ticket surfaced in a delta sweep, MUST read the `description` field at minimum (in addition to summary, status, priority, assignee, reporter). Description text routinely carries operational signals — route-pause / merchant-notification / escalation / containment decisions — that do NOT appear in any structured field but match config-salience Immediate triggers. The `getJiraIssue` call with `fields=[..., \"description\"]` (or `*all`) is the canonical pattern for any Layer A delta that lacks a clear summary-only signal. Skim-tick discipline: when Layer A returns ≥1 delta, MUST issue at least one description-fetching `getJiraIssue` call per delta before classifying tier — NEVER rely on summary alone for skim-tick triage. Without this, a ticket like TDSD-6732 (Medium, Work in progress, summary "Access TeamApt DD Mandate Creation Failure" — looks like routine duplicate) silently passes through as Awareness-tier when the description carries Immediate-tier route-off + merchant-notification escalation.

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

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (7h after Sunday briefing), Layer A 1 delta — TDSD-6732 → Completed/Done 13:01:54 WAT; Layer B large reliability-program planning batch (24 VTIE tickets by Chiagoziem Okoye)

13:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=weekend-with-active-p1-situations). Window 11:10:00Z → 12:10:00Z = 1h. Skim-tick fast-path executed.

**Layer A — TDSD service_desk delta:**

1. **TDSD-6732 — STATUS TRANSITION Work in progress → Completed/Done at 2026-04-26T13:01:54.931+0100 (13:01:54 WAT).** Total ticket lifecycle 11:18 WAT → 13:01:54 WAT = 1h43m. statusCategory: `done`. **Description NOT amended** — body still says "Routing has been paused temporarily." **Interpretive ambiguity:** "Completed" on an operational containment ticket can mean (a) ops side achieved their containment objective and closed the ticket without underlying technical fix (TDSD-6731 remains the open technical track), OR (b) the route has been restored and operational containment is no longer in force — but no description amendment, Slack message, email, or other source carries an explicit restoration signal. **Safer interpretation: containment-ticket lifecycle complete; route-pause posture uncertain pending explicit restoration signal.** Salience factors: `archetype=service_desk`, `status_transition=work_in_progress→completed`, `active_situation_match=access-bank-multi-track-failures+dcir-acs-credential-remediation`, `description_signal=route_pause_persistent_in_description_post_completion`, `interpretive_ambiguity_route_status`, `technical_track_tdsd6731_unchanged`. **No Immediate dispatch this tick** — status-transition downward on already-dispatched containment ticket is not a novel Immediate trigger. Updated [[Access Bank — Multi-Track Failures]] situation with new delta entry capturing the transition + interpretive ambiguity.
2. **TDSD-6731 (technical investigation track at Babajide) — UNCHANGED in window.** No status update visible in 1h JQL window. Watchpoint: Awaiting Scheme Update / Escalated / Resolved transitions on Babajide's investigation.

**Layer B — Software projects scoped sweep (cross-cutting reliability-program signal):**

24 VTIE-* tickets created/updated by [[Chiagoziem Okoye]] (apparent SRE/Reliability lead based on ticket framing) between 12:19:29 WAT and 12:44:42 WAT in a coordinated planning batch. Themes by ticket-prefix structure: **INC** (Incident Management) — INC-1 Post-Mortem Coverage with sub-tasks INC-1.1/1.2 (post-mortem standard format + auto-draft tooling); INC-2 Robust/Accurate/Automated Incident Escalation System with sub-tasks INC-2.1/2.2/2.3/2.4/2.5 (escalation matrix workshop + PagerDuty policies + Automated Incident Manager config + simulation drill + comms documentation). **OBS** (Observability) — OBS-1 Comprehensive Authoritative Service Catalog (audit + schema enforcement); OBS-2 Baseline Observability Across All Applications (minimum standard for metrics/logs/traces/alerts + auto-pickup validation runbook). **RES** (Resilience/Toil) — RES-1 Toil Identification and Automation (workshop + estimation + design+build + production deploy + runbook). **GOV** (Governance/SLIs) — GOV-1 Bi-weekly Dashboard Data Quality Review with SRE Lead; GOV-2 Availability + Apdex/Error Rate/Latency SLI instrumentation across all services + dashboard validation. All 24 tickets are at **Backlog** status (planning artifacts, not active incidents). Assignees include [[Kareem Faruk]], [[Victor Dennis]], [[Abiodun Olawole]], [[Victor Ogunka]], plus Chiagoziem Okoye himself. **Salience: Awareness-tier.** A coordinated reliability-program planning batch is structurally significant signal but not Immediate or Briefing-decision tier — these are backlog tickets in planning state, not active operational events. Briefing-2026-04-27 candidate: a single Awareness item summarizing "VTIE reliability program structured (4 themes, 24 backlog tickets, Chiagoziem Okoye + named owners)" with watchpoints for when tickets transition to In Progress (would warrant a tracked situation page). Salience factors: `archetype=software`, `priority=high_or_medium_planning_batch`, `status=backlog`, `coordinated_planning_batch_24_tickets_25min_window`, `reliability_program_4_themes`, `awareness_tier_planning_artifacts_not_active_events`, `briefing_apr27_candidate_awareness_summary`, `chiagoziem_okoye_new_entity_dangling_link_sre_reliability_lead_inferred`. Entity creation deferred to next ingest or full-tick — not a P1-blocking signal.

**Active-situation checkpoint summary (skim-tick spot-check):**
- TDSD-6731 (Access DD Mandate technical track) — Work in progress (Babajide assignee). UNCHANGED.
- TDSD-6732 (Access DD Mandate operational containment) — **Completed/Done 13:01:54 WAT this tick (was Work in progress at prior 12:10 WAT tick).** Route-pause status in description NOT updated.
- TDSD-6729 (Access cycle 8) — Completed/Done at 07:54 WAT (5h17m+ stable post-resolution at this tick). Slack closure post still NOT propagated.
- **CoralPay ZIB cycle (Apr 26 02:01 WAT P1) — STILL NO TDSD TICKET at 11h10m+ post-Slack-post.** Process gap continues to diverge from Access DD's 11min closure timing. Comparator: Access DD ops side filed TDSD-6732 within ~3h of original P1 (technical TDSD-6731 within 11min); CoralPay ZIB ops has filed nothing in 11h.
- TDSD-6716 (NIBSS PTSA) — Completed since 2026-04-25 16:20 WAT. Situation retired-candidate.
- TDSD-6645 (Monnify VA reversal) — `Escalated` last verified 2026-04-24 11:20:45 WAT; Dominic silence advancing >88h+ at this tick.
- TDSD-6699 (Firewall HA) — `Awaiting implementation` last verified 2026-04-23 15:16:30 WAT; 2d21h+ ago.

**Cross-source disambiguation:** Slack 1 minor delta (Mustapha planned maintenance announcement, Awareness). Email 0 deltas (Layer 1 + Layer 2). Calendar 1 minor recurring-meeting metadata update (Channels Onboarding & Disbursement updated 11:37 WAT — stable, no salience-relevant delta). Drive 0 deltas in 1h window.

**Immediate dispatch this tick:** NO. TDSD-6732 → Completed is a status-transition downward on already-dispatched ticket (12:11 WAT prior tick); the underlying route-pause posture and TDSD-6731 technical investigation remain open. Per "Reliability program 24-ticket Backlog batch" salience: Awareness-tier planning artifacts, not Immediate.

Factors: source=jira, skim_tick, layer_a_one_delta_tdsd6732_status_transition, status_completed_on_operational_containment_ticket, interpretive_ambiguity_route_pause_vs_restoration, technical_track_tdsd6731_unchanged, layer_b_24_vtie_tickets_chiagoziem_reliability_program_planning_batch, awareness_tier_planning_artifacts, briefing_apr27_decision_candidate_route_pause_status_clarity_required, briefing_apr27_awareness_candidate_vtie_reliability_program_summary, no_zib_tdsd_ticket_11h+_continues_to_diverge_from_access_dd_closure_timing, no_immediate_dispatch_this_tick.

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (preserved summary)

12:10 WAT Apr 26 Sunday skim tick. Layer A 1 NEW delta — TDSD-6732 NEW 11:18 WAT Kabir Yusuf "Routing paused" + "merchants notified" → Immediate trigger #7 fired, dispatched 12:11 WAT. Parallel-ticket structure with TDSD-6731 (technical/Babajide engineering) vs TDSD-6732 (operational/Kabir Yusuf containment). Boundary-case dedup on TDSD-6731 (already processed prior tick).

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