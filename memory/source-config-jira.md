---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: 1 Layer A delta — TDSD-6731 NEW 10:18 WAT \"Access | DD | Mandate Creation Failures | 20260426\" Daniel Armstrong reporter / Babajide Ojoboorun assignee (Medium, Work in progress). Process gap closed 11min post-Slack-post / 6min post-bilateral-email. Babajide assignment routes to credential-remediation track owner."
updated: "2026-04-26T13:23:44Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T13:10:00Z"
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

### last_processed 2026-04-26T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (8h after Sunday briefing), Layer A 1 unrelated delta — TDSD-6734 routine refund-status correction by Samson Anaele/Oladimeji Alabi (Awareness-tier, no active-situation match)

14:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-afternoon-with-active-p1-watch). Window 12:10:00Z → 13:10:00Z = 1h. Skim-tick fast-path executed.

**Layer A — TDSD service_desk delta:**

1. **TDSD-6734 NEW — "UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER AS @26042026"**, Medium, In Progress, statusCategory `indeterminate`/yellow. Reporter [[Samson Anaele]] (`samson.anaele@moniepoint.com` — Moniepoint side requester; recurring Service Request reporter on RTGS reconciliations and refund-status corrections). Assignee [[Oladimeji Alabi]] (`oladimeji.alabi@teamapt.com` — TeamApt routing handler). Updated 2026-04-26T13:22:09 WAT. Description: "Dear Oladimeji, Kindly find attached set of transactions and assist to update the refund status to **COMPLETED_VIA_PROVIDER.** [linked Google Sheets]. The transactions have been logged for refund and processed successfully by the provider, so the need to update the status, so as to avoid exposure. Your swift response will be highly appreciated. Regards." Salience factors: `archetype=service_desk`, `priority=medium`, `status=in_progress`, `active_situation_match=null` (refund-status correction is routine ops administration, no tracked situation match), `description_signal=null` (no Immediate trigger keywords — provider-side already processed; ask is to update DB record), `request_type=service_request` (not Incident). **Salience: Awareness-tier, no situation creation needed, no Immediate dispatch.** Pattern adjacency: this is a sibling to TDSD-6721 (Apr 25 23:44 WAT closure of similar PENDING PAYABLE POSTING Service Request from Samson Anaele) — Samson's recurring Service Request cadence on settlement/reconciliation/refund-status corrections is now an established pattern (no situation page warranted; pattern stays at the entity level).
2. **TDSD-6731 (Access DD technical track at Babajide) — UNCHANGED in window.** No status update visible in 1h JQL window. Cumulative Jira-side silence on TDSD-6731: 10:18 WAT filing → 14:09 WAT now = 3h51m. The cross-source sweep (email Layer 2 returned bilateral thread activity at 13:55 WAT but with ambiguous sender attribution — see source-config-email this tick) does not move the Jira ticket; engineering investigation has produced no Jira progress signal in the now-cumulative ~4h window since filing.

**Layer B — Software projects scoped sweep: 0 deltas.** No P1/P0/Blocker/Critical priority transitions in 1h window across the 17 software projects. The Apr 26 13:10 WAT 24-VTIE planning batch by Chiagoziem Okoye is bookkeeping-aged out of this 1h window.

**Active-situation checkpoint summary (skim-tick spot-check):**
- TDSD-6731 (Access DD Mandate technical track) — Work in progress (Babajide assignee). UNCHANGED 4h+. Watchpoint: Awaiting Scheme Update / Escalated / Resolved transitions on Babajide's investigation.
- TDSD-6732 (Access DD Mandate operational containment) — Completed/Done at 13:01:54 WAT. Stable post-closure 1h08m at this tick. Route-pause status in description STILL not amended.
- TDSD-6729 (Access cycle 8) — Completed/Done at 07:54 WAT (6h17m+ stable post-resolution at this tick). Slack closure post still NOT propagated.
- **CoralPay ZIB cycle (Apr 26 02:01 WAT P1) — STILL NO TDSD TICKET at 12h08m+ post-Slack-post.** Process gap continues. Comparator: Access DD ops side filed TDSD-6732 within ~3h of original P1 (technical TDSD-6731 within 11min); CoralPay ZIB ops has filed nothing in 12h+.
- TDSD-6716 (NIBSS PTSA) — Completed since 2026-04-25 16:20 WAT. Situation retired-candidate per Apr 26 06:10 WAT briefing tick (already retired at briefing, per source-config-slack note).
- TDSD-6645 (Monnify VA reversal) — `Escalated` last verified 2026-04-24 11:20:45 WAT; Dominic silence advancing >91h+ at this tick.
- TDSD-6699 (Firewall HA) — `Awaiting implementation` last verified 2026-04-23 15:16:30 WAT; 3d at this tick.

**Cross-source disambiguation:** Email Layer 2 caught 1 thread message on Access DD bilateral path at 13:55 WAT (sender attribution ambiguous — see source-config-email this tick). Slack 0 deltas on all 5 Tier 1 channels. Calendar 0 new events / 0 metadata updates. Drive 0 in-window files.

**Immediate dispatch this tick:** NO. TDSD-6734 is a routine refund-status Service Request, Awareness-tier. The ambiguous-sender bilateral acknowledgment is acknowledgment-only (Email-side analysis). No novel Immediate triggers across any source.

Factors: source=jira, skim_tick, layer_a_one_unrelated_delta_tdsd6734_refund_status_service_request, awareness_tier_routine_ops_administration, no_active_situation_match, samson_anaele_recurring_service_request_pattern, no_situation_creation, layer_b_zero, technical_track_tdsd6731_unchanged_4h+, briefing_apr27_no_decision_candidate_from_jira_this_tick, sunday_afternoon_quiet_otherwise, no_immediate_dispatch_this_tick.

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