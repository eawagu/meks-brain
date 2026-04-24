---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T10:09:00Z (11:09 WAT). 11:09 WAT Apr 24 skim elevated to full: Layer A returned 8 deltas — TDSD-6268 SETTLEMENT PROCESSING Done 11:02 WAT (same transaction MNFY|46|20260310114548|008618 as TDSD-6645; 4th Opeyemi-cluster fast-close; TDSD-6645 itself still Escalated, 31h01m Dominic silence); **TDSD-6716 NEW Incident Medium 10:18 WAT formalizes NIBSS response-not-sent pattern (RC91 + Access + GTBank scope)** — folded into [[NIBSS PTSA — VPN Flapping Apr 22]] watchpoint; TDSD-6717 Paystack ₦1.07B balance adjustment (routine, 15m filed→resolved); TDSD-6714 routine; TDSD-6715 NEW cron change (Authorize, not CTO-gate); TDSD-6618 Stanbic 6-day-old RC91 backlog closure. Layer B 0. No Immediate dispatch."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T10:09:00Z"
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
- **Layer C — Skip list:** low-signal ticket patterns (bulk config updates, routine documentation) — see Skip list section.

### Salience factors
- `priority=<level>` — Highest/Critical > High > Medium > Low. P1 = Immediate unless resolved fast-cycle.
- `status_transition=<from→to>` — Completed/Resolved/Done = resolution signal; Awaiting Scheme Update = potential stall; Escalated = owner change.
- `active_situation_match=<situation-page>` — ticket names an entity tracked in a developing situation.
- `assignee=<user>` — Dominic routing to Awaiting Scheme Update = workflow-discipline pattern (tracking).
- `archetype=<service_desk|software>` — service_desk tickets default to higher salience.

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience. Dismissed patterns (3+ consecutive) enter a verification queue before being added here.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > "<last_processed>" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in ("ADD","AS",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > "<last_processed>" AND (priority in (Highest, Blocker, Critical) OR status changed FROM ("Open","In Progress") TO ("Resolved","Done","Completed","Escalated"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors.

## Notes

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta

11:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 10:09"` returned **8 deltas**. Layer B software JQL returned **0 deltas**.

**Layer A — TDSD-6268 "SETTLEMENT PROCESSING" Done 11:02 WAT** (situation delta on [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]])
- **Type:** Task (service_desk archetype). **Priority:** High. **Status transition:** Work in progress (09:14 WAT) → **Done 11:02 WAT Apr 24** by [[Opeyemi Ahmed]]. 1h48m fast-close after first Apr 24 activity observation.
- **Reporter:** [[Blessing Olawale]]. Filed 2026-03-23 (13-month-old ticket).
- **Scope:** Same transaction reference `MNFY|46|20260310114548|008618` as TDSD-6645.
- **Significance:** 4th Opeyemi-cluster same-day-close (alongside TDSD-6655/TDSD-6661/TDSD-6662 system-failure settlements). TDSD-6645 itself still Escalated, 31h01m Dominic silence continuing. No closure RCA comment observed. Three non-exclusive closure framings (inwards-team handoff completion / duplicate-path closure / settlement fully processed) underdetermined from status-only data.
- **Disposition:** Situation delta folded into [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]]. Briefing-2026-04-25 Decision candidate: treat as implicit resolution vs. ping Dominic for TDSD-6645 closure vs. direct-ask Opeyemi.
- Factors: `source=jira`, `archetype=service_desk`, `priority=high`, `status_transition_done`, `parallel_ticket_resolution_same_transaction_as_tdsd6645`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal`, `assignee=opeyemi_ahmed_cluster_match`, `1h48m_fast_close`, `no_closure_rca`, `tdsd6645_unchanged_escalated`, `dominic_ticket_specific_silence_continues_31h01m`, `opeyemi_cluster_evidence_4_to_1`, `briefing_2026_04_25_decision_candidate`, `no_immediate_dispatch`.

**Layer A — TDSD-6716 "NIBSS|SUCCESSFUL RESPONSE NOT SENT| 20260424"** (NEW — formalizes response-not-sent pattern)
- **Type:** [System] Incident (service_desk archetype). **Priority:** Medium. **Status:** Work in progress (updated 10:46 WAT Apr 24). Filed **10:18 WAT Apr 24**.
- **Reporter + Assignee:** [[Afeez Kazeem]] (self-assignee).
- **Description:** *"Moniepoint notice high RC91 responses for from Nibss on Access And GTBank transactions being sent to PTSA fro processing. These transactions were processed successfully on Switch side but Nibss did not send response to Moniepoint."*
- **Significance:** Formalizes the response-not-sent pattern from email-only watchpoint to Jira-trackable Medium Incident. **RC91 keyword explicit** — frames the mechanism as producing RC91 on Moniepoint side. **Two banks named — Access and GTBank** — not single-transaction anomaly; scoped to card-layer transactions across multiple issuers routed via PTSA. Elevates response-not-sent watchpoint (see [[NIBSS PTSA — VPN Flapping Apr 22]]) to proto-pattern with formal incident tracking.
- **Disposition:** Situation watchpoint strengthened (folded into [[NIBSS PTSA — VPN Flapping Apr 22]]). No new situation page — directive-tracking 48h window (10:10 WAT Apr 24 → 10:10 WAT Apr 26) still at 1-of-2 post-transition instances. No Immediate dispatch (Medium priority, 2-min self-resolved window, no active customer-facing incident — documentation/escalation ticket).
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_type=incident`, `ticket_new`, `rc91_keyword_explicit`, `two_banks_scope_access_gtbank`, `active_situation_match=nibss_ptsa_vpn_flapping`, `formalizes_email_watchpoint_pattern`, `self_resolved_2min_window`, `watchpoint_layer_strengthening_not_status_driver`, `no_immediate_dispatch_self_resolved`.

**Layer A — TDSD-6717 "PAYSTACK BALANCE ADJUSTMENT APRIL 24TH 2026"** (NEW routine treasury ops — fast-close)
- **Type:** [System] Service request with approvals. **Priority:** Medium. **Status transition:** NEW (10:38 WAT) → **Resolved 10:53 WAT** (15m filed→resolved).
- **Reporter:** [[Christine Ogude]]. **Assignee:** [[Daniel Fetuga]].
- **Description:** Paystack balance update request for NGN 1,074,864,192.35 (₦1.07B).
- **Cross-source correlation:** Matches Slack activity on #teamapt-x-paystack-transfer-support (10:26-10:54 WAT sequence: Caret user treasury application request → Christine acknowledgment → Christine "Done"). Slack sequence precedes Jira filing by 12m; Jira filing precedes Slack "Done" by 16m — parallel documentation of same operational event. Routine treasury operations, no CTO action.
- **Disposition:** Awareness — routine treasury ops. No situation page needed. No Immediate dispatch. Different direction from Paystack-balance-below-₦200m alert pattern (this is inflow application, not low-float alert) — does not compound with that recurring pattern.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_type=service_request_with_approvals`, `ticket_new_and_resolved_same_window`, `15m_filed_to_resolved`, `slack_cross_source_correlation=c096lcnp26p`, `routine_treasury_ops`, `different_direction_from_low_float_pattern`, `no_active_situation_match`, `no_immediate_dispatch`.

**Layer A — TDSD-6714 "Transaction Status Update"** (routine continuation from prior tick)
- **Type:** [System] Service request. **Priority:** Medium. **Status:** In Progress 10:56 WAT (transitioned from Awaiting Scheme Update 10:11 WAT filing).
- **Reporter:** Samuel Amos (Moniepoint). **Assignee:** [[Opeyemi Ahmed]].
- **Disposition:** Awareness — single-transaction routine investigation. No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_transition_awaiting_scheme_update_to_in_progress`, `assignee=opeyemi_ahmed`, `routine_single_txn_investigation`, `no_active_situation_match`.

**Layer A — TDSD-6715 "Turn on cron to fetch bank mandate configs in consolidated"** (NEW routine change)
- **Type:** [System] Change. **Priority:** Medium. **Status:** Authorize (filed 10:12 WAT, updated 10:13 WAT).
- **Reporter + Assignee:** [[Yasir Syed Ali]] (self-assignee; same-person).
- **Description:** *"We just need to turn on cron"*.
- **Disposition:** Awareness — routine consolidated DD infrastructure change. **Not CTO approval-gate** — no deploy/action window approaching within 4 hours per Immediate #4 directive. Standard authorize flow. No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_type=change`, `ticket_new`, `status=authorize`, `self_reporter_and_assignee`, `no_cto_approval_gate`, `routine_infra_change`, `no_active_situation_match`, `no_immediate_dispatch`.

**Layer A — TDSD-6618 "Stanbic | RC91| 20260418"** (backlog closure — 6-day-old ticket)
- **Type:** [System] Incident. **Priority:** Medium. **Status transition:** Work in progress → **Completed 10:27 WAT Apr 24** by [[Afeez Kazeem]] (assignee).
- Filed Apr 18 18:44 WAT — 5d15h43m active lifespan, now closed. Historical [[Stanbic Bank]] RC91 cycle closure; [[Stanbic Bank ATS — Persistent RC91 Pattern]] tracks the ongoing cycle count (32 cycles Apr 3-20) and does not individually surface each ticket closure.
- **Disposition:** Awareness — backlog cleanup. No situation-page update needed (individual ticket closures not tracked on the persistent-pattern situation). No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_type=incident`, `status_transition_completed`, `backlog_6_day_old_ticket_close`, `active_situation_match=stanbic_bank_ats_persistent_rc91_pattern`, `persistent_pattern_individual_cycle_not_tracked`, `no_immediate_dispatch`.

**Layer A — TDSD-6617 + TDSD-6565** (already-processed tickets, tangential edits this window)
- **TDSD-6617** — retired [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] in 10:09 WAT tick. Updated again 10:12 WAT Apr 24 (post-closure metadata edit). No new disposition.
- **TDSD-6565** — Payment Link Enhancement V2 closure processed in 10:09 WAT tick. No new disposition.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify Settlements Escalated) — no movement; still Escalated, last Dominic comment 04:08 WAT Apr 23 (31h01m silence). TDSD-6268 Done captures as parallel-ticket resolution signal.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no movement since 22:32 WAT Apr 23 Work In Progress filing. Route remains off.
- **TDSD-6699 + TDSD-6690** (CTO approval queue) — both still pending; no approval action observed.
- **TDSD-6713** (Keystone Apr 24 revived cycle) — still Medium INITIAL REVIEW from 08:21 WAT filing; no movement.
- **TDSD-6703** (3DS HTTP 422) — Work in progress, no movement.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: Layer A returned 5 deltas — TDSD-6617 PENDING DISBURSEMENTS Completed (retires [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] situation); TDSD-6268 SETTLEMENT PROCESSING High priority Work in progress on SAME MNFY transaction as TDSD-6645 situation (Opeyemi Ahmed assignee, possible inwards-team pickup); TDSD-6714 NEW Transaction Status Update (routine); TDSD-6565 + TDSD-6656 routine change closures. Layer B returned 0. No Immediate-tier dispatch.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — skim elevated to full on delta (preserved summary)

09:10 WAT Apr 24 tick: Layer A returned 6 deltas. Headline: **TDSD-6713 NEW Keystone Settlements 3am requery** (revives retired [[Keystone Bank — Settlement Requery Apr 20]] situation — `retired` → `developing`, 4-day Apr 20→Apr 24 cadence emerging, 3-ticket sequence TDSD-6555/TDSD-6633/TDSD-6713 = 5-day/4-day intervals). Also: TDSD-6703 3DS HTTP 422 carryover (Medium, scope ambiguous 3DS), TDSD-6712 Kafka Monnify fast-close 47m, TDSD-6575 9-day stale Dominic Pending Settlement, TDSD-6555 historical cycle Completed 08:21 WAT, TDSD-6709 routine config update Resolved. Layer B: AS-4404 Highest dev task READY FOR QA (awareness, no incident). No Immediate-tier triggers.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — skim-tick elevated to full (preserved summary)

08:09 WAT Apr 24 tick: Layer A returned 1 delta — TDSD-6712 Kafka Monnify Live datasource issue, Medium, Work in progress, Kabir Yusuf. Layer B returned 4 routine bug closures. No Immediate dispatch.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23, 0 Layer B deltas. **Dominic resolution burst 23:25–23:32 WAT Apr 23** closed TDSD-6553/TDSD-6612 (Highest)/TDSD-6688/TDSD-6706. TDSD-6711 Ecobank DCIR portal inaccessibility filed 22:32 WAT Apr 23 by Qazim — folded into briefing-2026-04-24 D1 + [[Ecobank — RC91 on NUS Nodes]] situation.
