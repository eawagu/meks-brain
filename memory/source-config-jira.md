---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: 1 Layer A delta — TDSD-6731 NEW 10:18 WAT \"Access | DD | Mandate Creation Failures | 20260426\" Daniel Armstrong reporter / Babajide Ojoboorun assignee (Medium, Work in progress). Process gap closed 11min post-Slack-post / 6min post-bilateral-email. Babajide assignment routes to credential-remediation track owner."
updated: "2026-04-26T17:20:23Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T17:10:00Z"
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

Note: `ADD` and `AS` are JQL reserved words — must be quoted in query: `project in ("ADD", "AS", ...)`.

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
When the source-config trace describes an active-situation ticket's state in narrative shorthand (e.g., "still at approval gates", "still WIP", "still Escalated"), MUST re-verify the description against the live `status` field (and `statusCategory.key`) every full briefing-tick. NEVER propagate a narrative description from a prior tick without checking the current Jira state — descriptions go stale silently when the ticket transitions and prior-tick text is copied forward.

### Description-field reading discipline (post 2026-04-26 12:10 WAT TDSD-6732)
For every Layer A ticket surfaced in a delta sweep, MUST read the `description` field at minimum (in addition to summary, status, priority, assignee, reporter). Description text routinely carries operational signals — route-pause / merchant-notification / escalation / containment decisions — that do NOT appear in any structured field but match config-salience Immediate triggers. The `getJiraIssue` call with `fields=[..., "description"]` (or `*all`) is the canonical pattern for any Layer A delta that lacks a clear summary-only signal. Skim-tick discipline: when Layer A returns ≥1 delta, MUST issue at least one description-fetching `getJiraIssue` call per delta before classifying tier — NEVER rely on summary alone for skim-tick triage. Without this, a ticket like TDSD-6732 (Medium, Work in progress, summary "Access TeamApt DD Mandate Creation Failure" — looks like routine duplicate) silently passes through as Awareness-tier when the description carries Immediate-tier route-off + merchant-notification escalation.

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > "<last_processed>" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in ("ADD","AS",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > "<last_processed>" AND (priority in (Highest, Blocker, Critical) OR status changed FROM ("Open","In Progress") TO ("Resolved","Done","Completed","Escalated"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors. For Layer A deltas, MUST fetch description per Description-field reading discipline above.
4. **Client-side UTC filter** — Jira JQL interprets the `"YYYY-MM-DD HH:MM"` datetime literal in the user's configured timezone (Africa/Lagos = WAT). Since `last_processed` is stored in UTC (`YYYY-MM-DDTHH:MM:SSZ`), the server-side JQL filter using the UTC hour as-is is effectively 1h lax — it lets through updates from the hour before `last_processed`. Therefore the heartbeat MUST apply a client-side filter: convert each returned issue's `fields.updated` to UTC and compare to `last_processed`; discard any issue whose UTC-updated time ≤ `last_processed`.

### Known limitation — Broad updated-window queries exceed token budget (observed 2026-04-26 10:10 WAT)
Layer A JQL `project = TDSD AND updated >= "2026-04-26 06:10" ORDER BY updated DESC` against a window with multiple-day-trailing updates produced a 107K-character response that exceeded the tool token budget. Mitigation: keep `updated >= ...` window narrow (≤6h on full-tick, ≤1h on skim-tick) and cap `maxResults` at 25 unless a specific narrow query is in use. When the broad sweep is needed, scope by active-situation entity (e.g., `(text ~ "Access" OR text ~ "CoralPay" OR text ~ "NIBSS")`) or by status transition rather than pulling all `updated` issues.

## Notes

### last_processed 2026-04-26T17:10:00Z (18:10 WAT) — skim-level 18:00-cron tick (12h after Sunday briefing), 0 Layer A / 1 Layer B (AS-4966 routine project-setup → Done, Awareness)

18:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-evening-active-situations-in-background). Window 16:10:00Z → 17:09:00Z = 59min.

**Layer A — TDSD service_desk delta:** 0 in window (`project = TDSD AND updated > "2026-04-26 17:10" ORDER BY updated DESC` → empty result). Active TDSD ticket states unchanged at this tick:
- **TDSD-6735** (Eco settlements, NEW 2 ticks ago 15:59 WAT) — UNCHANGED INITIAL REVIEW. Watchpoint: 8h first-response SLA breach Mon Apr 27 17:00 WAT (~23h ahead).
- **TDSD-6731** (Access DD Mandate technical track at Babajide) — UNCHANGED ~7h45m+ from filing. Watchpoint: bank-silence past 4h threshold; hardens for briefing-2026-04-27 D-tier escalation if no `accessbankplc.com` sender by 06:10 WAT Apr 27.
- **TDSD-6732** (Access DD Mandate operational containment) — Completed/Done at 13:01:54 WAT (stable post-closure ~5h+). Route-pause status in description STILL not amended.
- **TDSD-6729** (Access cycle 8) — Completed/Done at 07:54 WAT (~10h15m+ stable post-resolution). Slack closure post still NOT propagated.
- **CoralPay ZIB cycle (Apr 26 02:01 WAT P1)** — STILL NO TDSD TICKET at ~16h08m+ post-Slack-post. Process gap continues. Comparator: Access DD ops side filed TDSD-6732 within ~3h of original P1 (technical TDSD-6731 within 11min); CoralPay ZIB ops has filed nothing in 16h+.

**Layer B — Software projects scoped sweep: 1 delta in window via proper Layer B JQL (priority in (Highest, Blocker, Critical) OR status transition gate).**
- **AS-4966** "Stakeholders allocation by both parties (PM & Engineering support)" — Project: AptPay Switch (AS). Status: **Done** at 17:51:40 WAT (transitioned today, status-transition gate fires). Priority: Medium. Assignee: null. Reporter: not in returned fields. **Active-situation check:** No specific bank named in summary; aligns with the AS-4114/AS-4115 pattern observed prior tick (routine new-bank project setup paperwork by AptPay-side PM). No active-situation entity match. **Classification:** Awareness-tier — routine project-setup paperwork closure on a new-bank engagement track. No briefing item; no situation page update. Recorded as observation only.

**Active-situation checkpoint summary (skim-tick spot-check, derived from prior-tick state — no Jira queries this tick beyond the sweep):**
- TDSD-6735 (Eco settlements) — UNCHANGED INITIAL REVIEW. 8h SLA breach Mon Apr 27 17:00 WAT (~23h ahead).
- TDSD-6731 (Access DD Mandate technical track) — Work in progress (Babajide assignee). UNCHANGED ~7h45m+. Watchpoint: bank-silence past 4h threshold; hardens for briefing-2026-04-27.
- TDSD-6732 (Access DD Mandate operational containment) — Completed/Done at 13:01:54 WAT. Stable post-closure ~5h+. Description route-pause status still not amended.
- TDSD-6729 (Access cycle 8) — Completed/Done at 07:54 WAT (~10h15m+ stable). Slack closure post still NOT propagated.
- **CoralPay ZIB cycle — STILL NO TDSD TICKET at ~16h08m+ post-Slack-post.**
- TDSD-6716 (NIBSS PTSA) — Completed since 2026-04-25 16:20 WAT. Situation retired at briefing-2026-04-26 06:10 WAT tick.
- TDSD-6645 (Monnify VA reversal) — `Escalated` last verified 2026-04-24 11:20:45 WAT; Dominic silence advancing >94h+ at this tick.
- TDSD-6699 (Firewall HA) — `Awaiting implementation` last verified 2026-04-23 15:16:30 WAT; 3d+ at this tick.

**Cross-source disambiguation:** Email 1 Layer-1 NEW (Greenhouse Kuldeep Singh scorecard reminder, To:user, Briefing-tier accumulation for briefing-2026-04-27). Operational-keyword zero new. Slack 0 deltas on 4/5 Tier 1 channels; 3 bot alerts on #account-switch-alerts clustered around 18:00 WAT maintenance window start (Awareness, documented bot noise pattern). Calendar 0 priority signals. Drive 0 in-window files.

**Immediate dispatch this tick:** NO. Layer A zero, Layer B 1 with no active-situation match.

Factors: source=jira, skim_tick, layer_a_zero, layer_b_one_as-4966_routine_project_setup_done_transition, project=as_aptpay_switch, priority=medium, assignee=null, no_active_situation_match, awareness_tier_only, sunday_evening_quiet_on_jira_path, no_immediate_dispatch_this_tick, coralpay_zib_no_ticket_16h08m+_continues, access_dd_technical_unchanged_7h45m+_watchpoint_hardens_for_briefing_apr27, eco_settlements_tdsd6735_initial_review_unchanged_23h_to_sla.

### last_processed 2026-04-26T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (preserved summary)

17:10 WAT Apr 26 Sunday skim. Layer A 0 deltas in 1h window. Layer B 0 via proper JQL; broader sweep surfaced 2 below-threshold observations (AS-4114 + AS-4115 routine project-setup pair, Medium/In Progress, no transition — would not surface in proper Layer B sweep). TDSD-6731 UNCHANGED ~7h+. CoralPay ZIB no TDSD ticket 15h09m+. No Immediate.

### last_processed 2026-04-26T15:10:00Z (16:10 WAT) — skim-level 16:00-cron tick (preserved summary)

16:10 WAT Apr 26 Sunday skim. Layer A 1 delta — TDSD-6735 NEW Eco settlements (15:59:43 WAT). Briefing-tier. Active-situation match Ecobank — RC91 on NUS Nodes (4th operational layer). Situation page updated. Layer B 0. No Immediate dispatch.

### last_processed 2026-04-26T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (preserved summary)

15:10 WAT Apr 26 Sunday skim. Layer A 0 deltas, Layer B 0 deltas in 1h window. TDSD-6731 UNCHANGED ~5h+. CoralPay ZIB no ticket 13h09m+. Sunday afternoon quiet on Jira path. No Immediate.

### last_processed 2026-04-26T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (preserved summary)

14:10 WAT Apr 26 Sunday skim. Layer A 1 unrelated delta — TDSD-6734 NEW "UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER AS @26042026" — Samson Anaele reporter / Oladimeji Alabi assignee, Medium, In Progress. Routine refund-status correction Service Request, Awareness-tier, no active-situation match. TDSD-6731 UNCHANGED 4h+. Layer B 0 deltas. No Immediate dispatch.

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (preserved summary)

13:10 WAT Apr 26 Sunday skim. Layer A 1 delta — TDSD-6732 → Completed/Done 13:01:54 WAT (operational containment ticket closed; description NOT amended → route-pause status uncertain); TDSD-6731 unchanged. Layer B 24 VTIE-* tickets created/updated by Chiagoziem Okoye 12:19–12:44 WAT — coordinated reliability program planning batch (Awareness-tier). No Immediate dispatch.

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