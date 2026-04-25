---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-25T12:10:00Z (13:10 WAT). 13:10 WAT Apr 25 skim-tick: Layer A 0 genuine deltas + TDSD-6690 staleness correction (status=Completed since Apr 22 16:58 WAT contradicts prior 'still at approval gates' framing). Layer B 0 deltas."
updated: "2026-04-25T12:26:51Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T12:10:00Z"
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

### Active-situation checkpoint re-verification (post 2026-04-25 13:10 WAT TDSD-6690 staleness)
When the source-config trace describes an active-situation ticket's state in narrative shorthand (e.g., "still at approval gates", "still WIP", "still Escalated"), MUST re-verify the description against the live `status` field (and `statusCategory.key`) every full briefing-tick. NEVER propagate a narrative description from a prior tick without checking the current Jira state — descriptions go stale silently when the ticket transitions and prior-tick text is copied forward. Trigger: TDSD-6690 was described as "still at approval gates" across briefing-2026-04-24 D3, briefing-2026-04-25 D4, and four prior source-config-jira tick notes — but Jira state was `status=Completed` (statusCategory=`done`) since 2026-04-22T16:58 WAT (Ekene Udodi "Done" comment, 67h+ ago at the 13:10 WAT tick that caught this). Resolution=null caveats the closure (informal-close-without-formal-authorization candidate), but statusCategory=done is the authoritative bucket signal.

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > "<last_processed>" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in ("ADD","AS",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > "<last_processed>" AND (priority in (Highest, Blocker, Critical) OR status changed FROM ("Open","In Progress") TO ("Resolved","Done","Completed","Escalated"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors.
4. **Client-side UTC filter** — Jira JQL interprets the `"YYYY-MM-DD HH:MM"` datetime literal in the user's configured timezone (Africa/Lagos = WAT). Since `last_processed` is stored in UTC (`YYYY-MM-DDTHH:MM:SSZ`), the server-side JQL filter using the UTC hour as-is is effectively 1h lax — it lets through updates from the hour before `last_processed`. Therefore the heartbeat MUST apply a client-side filter: convert each returned issue's `fields.updated` to UTC and compare to `last_processed`; discard any issue whose UTC-updated time ≤ `last_processed`.

## Notes

### last_processed 2026-04-25T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (10min late), Layer A 0 genuine deltas + TDSD-6690 staleness correction

13:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend-afternoon-prior-zero-delta-active-p1-monitoring). Window 11:10:00Z → 12:10:00Z = 1h.

**Layer A — JQL `key in (TDSD-6645, TDSD-6716, TDSD-6699, TDSD-6690, TDSD-6711, TDSD-6727, TDSD-6726) OR (project in (TDSD, ATPG, "ADD", "AS", ATPP) AND updated >= -65m)` returned 7 issues.** All 7 updated BEFORE 12:10 WAT (the prior tick's last_processed) — they appeared because of the `key in (...)` checkpoint clause, NOT because of fresh updates. **0 genuine new deltas in 12:10 → 13:10 WAT window.**

**Layer B sweep — 0 deltas.**

**Active-situation checkpoints — verified against live Jira state this tick:**
- **TDSD-6645** (Monnify VA reversal "Urgent Pending Settlement – Re-trigger Required") — status=`Escalated`, last updated 2026-04-24T11:20:45 WAT. **~57h47m elapsed since last update**; Dominic silence continues. Unchanged.
- **TDSD-6699** (Firewall HA Configuration on Prod FW 02/03) — status=`Awaiting implementation`, last updated 2026-04-23T15:16:30 WAT. **~46h elapsed at gate**; ~12h above absence-of-signal threshold (already in briefing-2026-04-25 D4 carryforward). Unchanged.
- **TDSD-6690** (Account Switch Reports Stopgap) — **CORRECTION:** Jira API truth `status=Completed` (statusCategory=`done`), `updated=2026-04-22T16:58:28 WAT`, `resolution=null`. Single comment: Ekene Udodi "Done" at 16:58:28 WAT Apr 22 (3min after creation). **Brain narrative across briefing-2026-04-24 D3 → briefing-2026-04-25 D4 → 4 prior source-config-jira tick notes propagated "still at approval gates" — that framing is contradicted by Jira API state.** Competing-interpretation candidates: (a) statusCategory=`done` is authoritative bucket signal → "Completed" means workflow done; D3/D4 framing was wrong (Jira-API-truth wins, parsimonious read); (b) `resolution=null` is the informal-close-without-formal-authorization signal → "Completed" status set without resolution code = ticket marked as work-done by the assignee but not formally authorized through workflow approval gate; D3/D4 framing's "approval gate" reference would describe an as-yet-uncrossed authorization step despite the status name. Without the workflow definition, (a) is the more parsimonious read. **No briefing rewrite this tick** — briefings are historical record. Source-config-jira understanding updated above with the new "Active-situation checkpoint re-verification" directive to prevent recurrence. Calibration note for Improve: this is a self-discovered staleness, not a user-signaled miss — does NOT generate a Tuning Log tuple (acted/dismissed/missed framework doesn't fit), but the directive addition is the structural fix.
- **TDSD-6716** (NIBSS Successful Response Not Sent) — status=`Work in progress`, last updated 2026-04-24T13:48:07 WAT. NIBSS bilateral 18h+ silent (under 48h threshold). Unchanged.
- **TDSD-6711** (Ecobank portal) — status=`Completed`, resolution=`Done`, closed 2026-04-25T08:13:14 WAT (captured by 09:10 WAT prior tick + Ecobank situation page already updated).
- **TDSD-6727** (Union Bank RC96) — status=`Completed`, closed 2026-04-25T08:11:35 WAT (captured by 08:10 WAT prior tick).
- **TDSD-6726** (Habari RC91 Problem ticket) — status=`Completed`, closed 2026-04-24T23:50:35 WAT (captured by 06:09 WAT briefing tick + briefing-2026-04-25 A2).

No Immediate dispatch from this Jira sweep.

Factors: `source=jira`, `skim_tick`, `saturday_afternoon`, `layer_a_zero_genuine_deltas`, `layer_b_zero_deltas`, `tdsd6690_staleness_correction_completed_since_apr22_16_58wat_67h_ago`, `narrative_propagated_5_consecutive_ticks_without_reverification`, `competing_interpretation_status_completed_vs_resolution_null`, `directive_added_active_situation_checkpoint_reverification`, `no_tuple_self_discovered_staleness_not_acted_dismissed_missed`, `no_immediate_dispatch`, `tdsd6645_57h47m_dominic_silence_unchanged`.

### last_processed 2026-04-25T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (10min late), Layer A 0 deltas + Layer B 0 deltas

12:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=active-fcmb-p1-trajectory-resolved+mostly-quiet-priors). Window 10:10:00Z → 11:10:00Z = 1h.

**Layer A — JQL `project in (TDSD, "ADD", "AS", ...) AND updated >= "2026-04-25 11:10" ORDER BY updated DESC` returned 0 issues.** Saturday-midday TDSD quiet — no new ticket filings, no transitions on tracked entities, no priority transitions.

**Layer B sweep — 0 deltas.** No P1/Blocker/Critical priority transitions, no Done-state transitions on pattern-tracked entities, no developing-situation entity matches.

**Active-situation checkpoints (zero new delta this tick):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, **~56h+ Dominic silence** (no movement since 04:08 WAT Apr 23). 1h advance from prior tick.
- **TDSD-6684** (Pending Refund Transactions) — Resolved 10:54 WAT Apr 25 (prior tick). No further delta.
- **TDSD-6699 + TDSD-6690** — still at approval/authorize gates (~49h+ at gate, well above 12h absence-of-signal threshold; in briefing-2026-04-25 D4 carryforward). [13:10 WAT note: TDSD-6690 actually Completed since Apr 22 16:58 WAT — see correction above.]
- **TDSD-6716** (NIBSS PTSA RC91) — still listed Open per Apr 24 23:05 WAT handover; no Jira-side delta in window. NIBSS bilateral negotiation ~17h silent at tick (under 48h threshold).
- **TDSD-6711** (Ecobank portal) — Completed at 08:13 WAT Apr 25; no new activity.
- **TDSD-6727** (Union Bank RC96) — Completed at 08:11 WAT; no new activity.
- **TDSD-6728** (CoralPay ZIB Interchange Stopped) — Completed at 08:47 WAT; CoralPay_Cashout failover persisting in production.

No Immediate dispatch from this Jira sweep.

Factors: `source=jira`, `skim_tick`, `saturday_midday`, `layer_a_zero_deltas`, `layer_b_zero_deltas`, `no_immediate_dispatch`, `active_situation_checkpoints_zero_new`, `tdsd6645_56h_dominic_silence_unchanged`, `tdsd6699_6690_49h_at_approval_gate`, `tdsd6716_nibss_ptsa_under_48h_threshold`.

### last_processed 2026-04-25T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (10min late), Layer A 1 delta — TDSD-6684 Resolved at 10:54 WAT (Dominic, 55h+ silence broken)

11:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend+active-situations-monitoring+prior-tick-quiet+no-immediate-firing). Window 08:10:00Z → 10:10:00Z = 2h (frontmatter was stale at 08:10:00Z; 09:10 WAT tick wrote body section but did not advance frontmatter — this tick reconciles by advancing to 10:10:00Z).

**Layer A — JQL `project in (TDSD, "ADD", "AS", ...) AND updated >= "2026-04-25 09:10" ORDER BY updated DESC` returned 1 genuinely-new ticket:**

1. **TDSD-6684 — "Pending Refund Transactions"** (Medium, [System] Service request, assignee [[Dominic Usiabulu]]). Status transitioned **Awaiting Scheme Update → Resolved at 10:54:53 WAT.** Per 09:10 WAT prior-tick checkpoint, TDSD-6684 was at "Awaiting Scheme Update" with ~54h+ Dominic silence (no movement since pre-Apr 23). This transition breaks the silence — Dominic processed the ticket Saturday late morning. Counter-signal to the workflow-discipline observation in [[Dominic Usiabulu]]; consistent with the [[briefing-2026-04-24]] A2 "Dominic resolution burst" pattern continuing into Apr 25 morning. **Briefing-2026-04-26 Awareness candidate** (low salience; status transition only, no incident/operational impact, no entity beyond Dominic). Active-situation entity match: none — refund-pending workflow is not part of any developing situation.

Other Jira tickets that updated in the 09:10–10:10 WAT range (TDSD-6728 CoralPay ZIB, TDSD-6711 Ecobank portal, TDSD-6727 Union RC96, TDSD-6706 refund metadata) were already processed by the 09:10 WAT tick — see body section below.

**Layer B sweep — 0 deltas.** No P1/Blocker/Critical priority transitions, no Done-state transitions on pattern-tracked entities, no developing-situation entity matches. Saturday-late-morning dev-quiet continues.

**Active-situation checkpoints (zero new delta this tick):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, ~55h+ Dominic silence (no movement since 04:08 WAT Apr 23). 1h advance from 09:10 WAT prior tick.
- **TDSD-6699 + TDSD-6690** — still at approval/authorize gates (~48h+ at gate, above 12h absence-of-signal threshold; in briefing-2026-04-25 D4 carryforward). [13:10 WAT note: TDSD-6690 actually Completed since Apr 22 16:58 WAT — see correction at top of Notes.]
- **TDSD-6716** (NIBSS PTSA RC91) — listed Open per Apr 24 23:05 WAT handover; no Jira-side delta in window. NIBSS bilateral negotiation ~16h silent at tick (under 48h threshold).
- **TDSD-6711** (Ecobank portal) — Completed at 08:13 WAT prior tick; no new activity.
- **TDSD-6727** (Union Bank RC96) — Completed at 08:11 WAT; no new activity.
- **TDSD-6728** (CoralPay ZIB Interchange Stopped) — Completed at 08:47 WAT; CoralPay_Cashout failover persisting in production per duty handover.

No Immediate dispatch from this Jira sweep. TDSD-6684 is awareness-only.

Factors: `source=jira`, `skim_tick`, `saturday_late_morning`, `layer_a_1_delta_tdsd6684_awaiting_scheme_update_to_resolved`, `dominic_workflow_movement_55h_silence_broken`, `counter_signal_to_workflow_discipline_observation`, `awareness_only`, `layer_b_zero_deltas`, `no_immediate_dispatch`, `active_situation_checkpoints_zero_new`.

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, Layer A 4 deltas (1 NEW + 1 portal closure + 2 already-captured/metadata)

09:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=saturday-morning-quiet-priors-active-situations-monitoring). Window 07:10:00Z → 08:10:00Z = ~1h.

**Layer A — JQL `project in (TDSD, ...) AND updated >= "2026-04-25 08:10" ORDER BY updated DESC` returned 4 tickets:**

1. **TDSD-6728 — "Switch | CoralPay (ZIB) | Interchange on Stopped State Incident | 20260425"** (NEW, Medium, Switch component, reporter+assignee [[Qazim Adedigba]]). Created 08:43:55 WAT, transitioned to **Completed at 08:47:23 WAT** (4-min ticket lifetime — post-incident documentation, not active-failure tracker). Description: incident active 01:15 → 07:48 WAT (6h33m, overnight delegation window). Trigger: Zenith EoD issue caused failed transactions; after Zenith resolved their side, CoralPay returned false statuses with interchange state stuck on `Stopped`. Workaround: failover to **CoralPay_Cashout** (now load-bearing in production per duty handover 08:06 WAT). Permanent fix: alternate-key + CoralPay key reselect → state `Running`. Resolution log evidence: `2026-04-25 06:46:56 ERROR ... Sink interchange is not active` + `07:28:01 TRACE ... Client 10.231.18.17:3001, Connected: false`. Comment by Qazim 08:44:55 WAT: "Current Status: Resolved and actively monitoring. NB: Coralpay transactions are currently routed through the CoralPay_Cashout." **Active-situation entity match → [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]]; situation page updated this tick with Apr 25 switch-layer failure-mode delta.** Distinct failure mode from the Apr 23 ZIB RC91 routing failure (RC91 = bank-side issuer-or-switch-inoperative; interchange-Stopped = TeamApt-side switch-state stuck). **Briefing-2026-04-26 Awareness candidate** — configuration-state change (CoralPay_Cashout failover persisting in production) + structural-defect candidate (alternate-key reselect remediation pattern suggests client-side state-machine lock surviving server-side recovery).

2. **TDSD-6711 — "Ecobank | ATS | Portal Inaccessibility | 20260423"** Medium. **Status transitioned Work In Progress → Completed at 08:13:14 WAT.** Resolution: Done. Closure comment by Qazim Adedigba: *"Portal is accessible now."* Total ticket lifetime ~33h41m from 22:32 WAT Apr 23 filing to 08:13 WAT Apr 25 closure — silent across overnight Apr 24/25 (no comment activity between Qazim's 22:33 WAT Apr 23 escalation note and the 08:13 WAT closure). No bank-side acknowledgement comment recorded — portal recovery appears bank-side autonomous (or recovered via off-Jira SRE escalation thread). **Active-situation entity match → [[Ecobank — RC91 on NUS Nodes]]; situation page updated this tick — compound failure stack reduces from 3 layers (transaction-routing + portal-access + user-creation) to 1 open layer (3-week user-creation persistence remains).** **Briefing-2026-04-26 Awareness candidate** — Ecobank admin-platform CTO-escalation case (briefing-2026-04-24 D1) weakens materially.

3. **TDSD-6727 — "Union Bank | ATS | RC 96 Failures Across Processors | 20260425"** Medium. Last update 08:11:35 WAT (Status Completed). **Already captured in 08:10 WAT prior tick** — re-appearance per JQL window slop directive. No new content; awareness-trace only.

4. **TDSD-6706 — "UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER(23042026)"** Medium, reporter Samson Anaele, assignee Dominic Usiabulu. Status transitioned **Resolved → Closed at 08:23:54 WAT**. Originally Resolved at 23:25 WAT Apr 23 in Dominic's resolution burst (briefing-2026-04-24 A2). Metadata-only transition. Awareness-trace only.

**Layer B sweep — 0 deltas.**

Factors: `source=jira`, `skim_tick`, `saturday_morning`, `layer_a_4_deltas_1_new_1_portal_closure_2_recapture_metadata`, `layer_b_0_deltas`, `tdsd6728_new_coralpay_zib_interchange_stopped_state_post_incident_doc`, `coralpay_cashout_failover_load_bearing`, `tdsd6711_ecobank_portal_completed_qazim_closure_portal_accessible`, `ecobank_compound_stack_3_to_1_layer`, `tdsd6727_jql_slop_recapture`, `tdsd6706_metadata_resolved_to_closed_no_content_delta`.

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, Layer A 1 delta (TDSD-6727 Completed 08:11 WAT, preserved summary)

08:10 WAT Apr 25 skim. Layer A 1 (TDSD-6727 Union RC96 Work in progress → Completed at 08:11 WAT, formalizing 02:52 WAT bank-side resolution; 5h19m formalization lag, within ops-cadence). Layer B 0 deltas. Active situations checkpoints unchanged: TDSD-6645 still ~52h+ Dominic silence, TDSD-6711 Ecobank portal still silent ~33h, TDSD-6699/6690 still at approval gates. No FCMB Jira ticket created post-resolution — process gap persists.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, Layer A 2 deltas + Layer B 2 deltas (preserved summary)

06:09 WAT Apr 25 briefing tick. 8h overnight window. Layer A 2: TDSD-6727 Union RC96 (Work in progress, 02:12 WAT filing) + TDSD-6726 Habari RC91 Problem ticket (Created 23:49 UTC + Completed 23:50 UTC, 1-min cycle = post-incident documentation of Apr 24 18:30–18:55 WAT). Layer B 2: ADD-4599 + ADD-4597 (Bukola Taiwo metadata updates 23:28 WAT Apr 24, post-closure batch).

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level 2 Layer B deltas (preserved summary)

22:10 WAT Apr 24 skim. Layer A 0; Layer B 2 — ADD-4584 + ADD-4574 CRLF Injection fixes (Bukola Taiwo end-of-day batch, paired closure 8min apart). Routine security-hygiene; not DCIR pen-test cluster.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level TDSD-6725 Paystack (preserved summary)

20:10 WAT Apr 24 full tick. TDSD-6725 PAYSTACK BALANCE ADJUSTMENT 20260424 B Resolved 18:56 WAT (22m fast-cycle, ₦4.5B inflow apply); cross-tracked with Slack #teamapt-x-paystack-transfer-support thread.

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim ADD-4596 BETA OTP (preserved)

18:22 WAT Apr 24 skim. ADD-4596 In Progress 18:16 WAT, Medium UX bug, Ebenezer Igbinoba. Awareness.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full TDSD-6713 Keystone Apr 24 cycle (preserved)

18:09 WAT Apr 24 tick. TDSD-6713 Keystone settlements Apr 24 cycle Completed 17:43 WAT David Oseji (9h22m). [[Keystone Bank — Settlement Requery Apr 20]] developing → resolving.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full TDSD-6724 + AS-4242 + ADD batches (preserved summary)

17:09 WAT Apr 24 tick. TDSD-6724 Review → Authorize 16:20 WAT (Ezinne CBA reversal). AS-4242 Sterling AS Project Plan Epic Done. ADD-4597/8/9 Tasks Done 17:03–17:06 WAT Bukola.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick. 5 TDSD deltas since 22:09 WAT Apr 23. Dominic resolution burst 23:25–23:32 WAT Apr 23. TDSD-6711 Ecobank DCIR portal filed 22:32 WAT Apr 23.
