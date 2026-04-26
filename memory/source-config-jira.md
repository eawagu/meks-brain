---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: 1 Layer A delta — TDSD-6731 NEW 10:18 WAT \"Access | DD | Mandate Creation Failures | 20260426\" Daniel Armstrong reporter / Babajide Ojoboorun assignee (Medium, Work in progress). Process gap closed 11min post-Slack-post / 6min post-bilateral-email. Babajide assignment routes to credential-remediation track owner."
updated: "2026-04-26T15:21:03Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T15:10:00Z"
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
For every Layer A ticket surfaced in a delta sweep, MUST read the `description` field at minimum (in addition to summary, status, priority, assignee, reporter). Description text routinely carries operational signals — route-pause / merchant-notification / escalation / containment decisions — that do NOT appear in any structured field but match config-salience Immediate triggers. The `getJiraIssue` call with `fields=[..., \"description\"]` (or `*all`) is the canonical pattern for any Layer A delta that lacks a clear summary-only signal. Skim-tick discipline: when Layer A returns ≥1 delta, MUST issue at least one description-fetching `getJiraIssue` call per delta before classifying tier — NEVER rely on summary alone for skim-tick triage. Without this, a ticket like TDSD-6732 (Medium, Work in progress, summary \"Access TeamApt DD Mandate Creation Failure\" — looks like routine duplicate) silently passes through as Awareness-tier when the description carries Immediate-tier route-off + merchant-notification escalation.

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

### last_processed 2026-04-26T15:10:00Z (16:10 WAT) — skim-level 16:00-cron tick (10h after Sunday briefing), 1 Layer A delta — TDSD-6735 NEW (Ecobank settlements layer)

16:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-afternoon-quiet-priors). Window 14:10:00Z → 15:10:00Z = 1h.

**Layer A — TDSD service_desk delta:** 1 issue returned by `project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP) AND updated >= "2026-04-26 14:10" ORDER BY updated DESC` (results filtered to those updated post-14:10:00Z UTC):
- **TDSD-6735** "Eco | Settlements issue | 20260426" — NEW at **15:59:43 WAT** (~10min before this skim tick). Reporter [[Daniel Armstrong]] (Sunday duty officer, on rotation since 08:01 WAT handover). Assignee [[Feyisayo Oyeniran]]. **[System] Incident type, Medium priority, Severity "Significant / Large", Customer "Ecobank", Component "ATS"**, status **INITIAL REVIEW**. Description: *"Eco settlements 20260426 awaiting requery"* + screenshot attachment (image-20260426-145918.png, 109KB). SLA Time-to-first-response 8h goal (breach Mon Apr 27 17:00 WAT); Time-to-resolution 24h goal (breach Wed Apr 29 17:00 WAT). No comments yet; no Slack P1 thread observed in same window (filed straight to Jira via portal). Active-situation match: [[Ecobank — RC91 on NUS Nodes]] — but this is a fourth operational layer (back-office settlements, distinct from the prior transaction-routing / portal-access / user-creation layers). Tier classification: **Briefing-tier** (tracked active-situation entity match, but no P1 + no Immediate trigger keyword + Severity/Customer/Component require situation-page narrative work, not direct Immediate dispatch). Situation page updated this tick to incorporate the new layer; briefing-2026-04-27 Decision-item candidate combining settlements + user-creation + compound-frequency pattern.

**Layer B — Software projects scoped sweep: 0 deltas.** No P1/P0/Blocker/Critical priority transitions in 1h window across the 17 software projects.

**Active-situation checkpoint summary (skim-tick spot-check, derived from prior-tick state — no Jira queries this tick beyond the sweep):**
- TDSD-6735 (Eco settlements) — NEW this tick. INITIAL REVIEW. Watchpoint: 8h first-response SLA breach Mon Apr 27 17:00 WAT.
- TDSD-6731 (Access DD Mandate technical track) — Work in progress (Babajide assignee). UNCHANGED ~6h+. Watchpoint: Awaiting Scheme Update / Escalated / Resolved transitions on Babajide's investigation.
- TDSD-6732 (Access DD Mandate operational containment) — Completed/Done at 13:01:54 WAT. Stable post-closure ~3h+ at this tick. Route-pause status in description STILL not amended.
- TDSD-6729 (Access cycle 8) — Completed/Done at 07:54 WAT (~8h17m+ stable post-resolution). Slack closure post still NOT propagated.
- **CoralPay ZIB cycle (Apr 26 02:01 WAT P1) — STILL NO TDSD TICKET at ~14h09m+ post-Slack-post.** Process gap continues. Comparator: Access DD ops side filed TDSD-6732 within ~3h of original P1 (technical TDSD-6731 within 11min); CoralPay ZIB ops has filed nothing in 14h+.
- TDSD-6716 (NIBSS PTSA) — Completed since 2026-04-25 16:20 WAT. Situation retired at briefing-2026-04-26 06:10 WAT tick.
- TDSD-6645 (Monnify VA reversal) — `Escalated` last verified 2026-04-24 11:20:45 WAT; Dominic silence advancing >92h+ at this tick.
- TDSD-6699 (Firewall HA) — `Awaiting implementation` last verified 2026-04-23 15:16:30 WAT; 3d+ at this tick.

**Cross-source disambiguation:** Email 0 deltas. Slack 0 deltas all 5 Tier 1 channels. Calendar 0 priority signals. Drive 0 in-window files.

**Immediate dispatch this tick:** NO. TDSD-6735 is Briefing-tier (active-situation match but no Immediate trigger keyword/priority). No P1 keyword, no security signal, no SLA breach <1h.

Factors: source=jira, skim_tick, layer_a_one_delta_tdsd6735_eco_settlements, fourth_operational_layer_on_ecobank_in_9_days, severity_significant_large_customer_ecobank_component_ats, sunday_duty_officer_filing, active_situation_entity_match=ecobank-rc91-on-nus-nodes, layer_b_zero, technical_track_tdsd6731_unchanged_6h+, coralpay_zib_no_ticket_14h09m+, sunday_afternoon_quiet_on_jira_path_except_eco_settlements, no_immediate_dispatch_this_tick, briefing_apr27_decision_item_candidate.

### last_processed 2026-04-26T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (preserved summary)

15:10 WAT Apr 26 Sunday skim. Layer A 0 deltas, Layer B 0 deltas in 1h window. TDSD-6731 UNCHANGED ~5h+. CoralPay ZIB no ticket 13h09m+. Sunday afternoon quiet on Jira path. No Immediate.

### last_processed 2026-04-26T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (preserved summary)

14:10 WAT Apr 26 Sunday skim. Layer A 1 unrelated delta — TDSD-6734 NEW \"UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER AS @26042026\" — Samson Anaele reporter / Oladimeji Alabi assignee, Medium, In Progress. Routine refund-status correction Service Request, Awareness-tier, no active-situation match. TDSD-6731 UNCHANGED 4h+. Layer B 0 deltas. No Immediate dispatch.

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (preserved summary)

13:10 WAT Apr 26 Sunday skim. Layer A 1 delta — TDSD-6732 → Completed/Done 13:01:54 WAT (operational containment ticket closed; description NOT amended → route-pause status uncertain); TDSD-6731 unchanged. Layer B 24 VTIE-* tickets created/updated by Chiagoziem Okoye 12:19–12:44 WAT — coordinated reliability program planning batch (Awareness-tier). No Immediate dispatch.

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (preserved summary)

12:10 WAT Apr 26 Sunday skim tick. Layer A 1 NEW delta — TDSD-6732 NEW 11:18 WAT Kabir Yusuf \"Routing paused\" + \"merchants notified\" → Immediate trigger #7 fired, dispatched 12:11 WAT. Parallel-ticket structure with TDSD-6731 (technical/Babajide engineering) vs TDSD-6732 (operational/Kabir Yusuf containment). Boundary-case dedup on TDSD-6731 (already processed prior tick).

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