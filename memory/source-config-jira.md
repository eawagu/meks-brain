---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T09:09:00Z (10:09 WAT). 10:09 WAT Apr 24 skim elevated to full: Layer A returned 5 deltas — TDSD-6617 PENDING DISBURSEMENTS Completed (retires [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] situation); TDSD-6268 SETTLEMENT PROCESSING High priority Work in progress on SAME MNFY transaction as TDSD-6645 situation (Opeyemi Ahmed assignee, possible inwards-team pickup); TDSD-6714 NEW Transaction Status Update (routine); TDSD-6565 + TDSD-6656 routine change closures. Layer B returned 0. No Immediate-tier dispatch."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T09:09:00Z"
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

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta

10:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 09:09"` returned **5 deltas**. Layer B software JQL returned **0 deltas**.

**Layer A — TDSD-6617 "PENDING DISBURSEMENTS"** (closure — retires [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]])
- **Type:** System Incident (service_desk archetype). **Priority:** Medium. **Status transition:** Work in progress → **Completed** 10:09 WAT Apr 24 by [[Chinonyerem Alozie]] (reassigned from original assignee [[Emmanuel Eke]]).
- **Reporter:** [[Temitope Ojo]]. 5d15h57m active from filing 18:06 WAT Apr 18.
- **Action:** Retired [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] situation (`developing` → `retired`). No closure RCA comment observed — consistent with silent-closure pattern on disbursement-state-machine tickets.
- **Open questions unresolved at closure** (scope/pathway/correlation with duplicate-debit pathway) folded forward into [[Monnify]] entity pattern-notes for future synthesis.
- **Disposition:** Awareness; situation retired. No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_transition_completed`, `active_situation_match=monnify_disbursements_stuck_in_progress`, `lifecycle_transition=developing→retired`, `no_closure_rca_observed`, `assignee_reassigned_during_lifecycle`.

**Layer A — TDSD-6268 "SETTLEMENT PROCESSING"** (situation delta on [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]])
- **Type:** Task (service_desk archetype). **Priority:** High. **Status:** Work in progress (updated 09:14 WAT Apr 24).
- **Reporter:** [[Blessing Olawale]]. **Assignee:** [[Opeyemi Ahmed]]. Created 2026-03-23.
- **Scope match:** Same transaction reference `MNFY|46|20260310114548|008618` as TDSD-6645 situation. TDSD-6268 is an older parallel ticket on the same underlying transaction (originally filed for lien-lifted-retry after insufficient-funds rejection; now active again in the TDSD-6645 VA-reversal context).
- **Significance:** Opeyemi Ahmed is within the Opeyemi-assignee cluster that closed TDSD-6655/TDSD-6661/TDSD-6662 same-day on the Settlement family (3-for-3 responsive). TDSD-6268 moving to Work in progress at 09:14 WAT Apr 24 is a **plausible candidate for the unnamed "inwards payments team" owner** Dominic attribution-transferred to at 04:08 WAT Apr 23. Positive movement signal on the underlying transaction even though TDSD-6645 itself is unchanged this tick.
- **Disposition:** Awareness-level situation delta (folded into [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]]). No Immediate dispatch (no P1 change, no priority elevation).
- Factors: `source=jira`, `archetype=service_desk`, `priority=high`, `parallel_ticket_same_transaction_as_tdsd6645`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal`, `status_transition_to_work_in_progress`, `assignee=opeyemi_ahmed_cluster_match`, `inwards_payments_team_owner_candidate`, `positive_movement_signal`, `no_immediate_dispatch`.

**Layer A — TDSD-6714 "Transaction Status Update."** (NEW routine)
- **Type:** System Service request. **Priority:** Medium. **Status:** Awaiting Scheme Update (filed 10:11 WAT Apr 24, updated 10:11 WAT).
- **Reporter:** Samuel Amos (Moniepoint). **Assignee:** [[Opeyemi Ahmed]].
- **Scope:** Single transaction `000013260423194331000130621776` stuck on session log. Routine investigation.
- **Disposition:** Awareness — single-transaction routine. No situation page needed. No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_new`, `assignee=opeyemi_ahmed`, `routine_single_txn_investigation`, `no_active_situation_match`, `no_immediate_dispatch`.

**Layer A — TDSD-6565 "Payment Link Enhancement V2, Security"** (routine change closure)
- **Type:** Change. **Priority:** Medium. **Status:** Completed 10:09 WAT Apr 24, Barakat Ajadi.
- Routine deployment. No situation link. Awareness-level noise.

**Layer A — TDSD-6656 "Update Axios version on web sdk"** (routine change closure)
- **Type:** Change. **Priority:** Medium. **Status:** Completed 09:23 WAT Apr 24, Charles Onuorah.
- Routine dependency upgrade. No situation link. Awareness-level noise.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify Settlements Escalated) — no movement; still Escalated, last Dominic comment 04:08 WAT Apr 23.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no movement since 22:32 WAT Apr 23 Work In Progress filing. Route remains off per overnight duty handover; no bank-side response email today.
- **TDSD-6699 + TDSD-6690** (CTO approval queue) — both still pending; no approval action observed.
- **TDSD-6713** (Keystone Apr 24 revived cycle) — still Medium INITIAL REVIEW from 08:21 WAT filing; no movement.
- **TDSD-6703** (3DS HTTP 422) — Work in progress, no movement since 09:01 WAT Apr 24 update observed 09:10 WAT tick.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — skim elevated to full on delta (preserved summary)

09:10 WAT Apr 24 tick: Layer A returned 6 deltas. Headline: **TDSD-6713 NEW Keystone Settlements 3am requery** (revives retired [[Keystone Bank — Settlement Requery Apr 20]] situation — `retired` → `developing`, 4-day Apr 20→Apr 24 cadence emerging, 3-ticket sequence TDSD-6555/TDSD-6633/TDSD-6713 = 5-day/4-day intervals). Also: TDSD-6703 3DS HTTP 422 carryover (Medium, scope ambiguous 3DS), TDSD-6712 Kafka Monnify fast-close 47m, TDSD-6575 9-day stale Dominic Pending Settlement, TDSD-6555 historical cycle Completed 08:21 WAT, TDSD-6709 routine config update Resolved. Layer B: AS-4404 Highest dev task READY FOR QA (awareness, no incident). No Immediate-tier triggers.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — skim-tick elevated to full (preserved summary)

08:09 WAT Apr 24 tick: Layer A returned 1 delta — TDSD-6712 Kafka Monnify Live datasource issue, Medium, Work in progress, Kabir Yusuf. Distinct subsystem from TDSD-6645. Layer B returned 4 routine bug closures (TCDD-1357, TCDD-1255, TCDD-1254, ADD-4384). No Immediate dispatch.

### last_processed 2026-04-24T06:10:00Z (07:10 WAT) — zero-delta tick (preserved)

07:10 WAT Apr 24 tick: Layer A + Layer B both returned 0. Post-briefing quiet.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23, 0 Layer B deltas. **Dominic resolution burst 23:25–23:32 WAT Apr 23** closed TDSD-6553/TDSD-6612 (Highest)/TDSD-6688/TDSD-6706 — counter-signal on workflow-discipline reframe. TDSD-6711 Ecobank DCIR portal inaccessibility filed 22:32 WAT Apr 23 by Qazim — folded into briefing-2026-04-24 D1 + [[Ecobank — RC91 on NUS Nodes]] situation.

### last_processed 2026-04-23T21:09:00Z (22:09 WAT) — preserved summary

22:09 WAT Apr 23 tick: 21 TDSD deltas in 15:11→22:09 WAT window — Wema TDSD-6705 Completed, Access TDSD-6708 Resolved, NIBSS Dis TDSD-6710/6650 Completed, 4th Dominic Awaiting-Scheme-Update ticket (TDSD-6706). Zero P1/Highest filings despite 4 Slack P1 posts.
