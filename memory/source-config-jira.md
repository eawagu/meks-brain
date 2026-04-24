---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T08:10:00Z (09:10 WAT). 09:10 WAT Apr 24 skim elevated to full-processing: 7 deltas — TDSD-6713 NEW Keystone settlements 3am requery (revives retired [[Keystone Bank — Settlement Requery Apr 20]] situation); TDSD-6712 Kafka Monnify fast-close 47m; TDSD-6703 3DS HTTP 422 ongoing Medium; TDSD-6575 Pending Settlement stale on Dominic 9-day INITIAL REVIEW (workflow-discipline data point); TDSD-6709 config update Resolved; TDSD-6555 old Apr 15 Keystone ticket Completed; AS-4404 Highest dev task READY FOR QA (awareness). No Immediate-tier triggers."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T08:10:00Z"
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

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — skim elevated to full-processing on delta

09:10 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 08:09"` returned **6 deltas**. Layer B software JQL returned **1 delta**.

**Layer A — most significant: TDSD-6713 "Keystone | Settlements issue | 20260424"** (NEW — revives retired situation)
- **Type:** System Incident (service_desk archetype). **Priority:** Medium. **Status:** INITIAL REVIEW.
- **Reporter:** [[Daniel Armstrong]]. **Assignee:** [[David Oseji]].
- **Filed:** 08:21 WAT Apr 24; updated 08:30 WAT.
- **Description:** *"Keystone settlements 3am awaiting requery"* — verbatim pattern match with TDSD-6633 (Apr 20: "Settlement for keystone for 12AM is awaiting requery, and 5AM"), now on the 3AM batch.
- **Criterion met:** [[Keystone Bank — Settlement Requery Apr 20]] situation was retired on 2026-04-23 06:10 WAT with pre-committed revival criterion "new Keystone settlement-layer cycle surfaces." TDSD-6713 formally meets that criterion.
- **Action:** Revived situation page (`retired` → `developing`) with Apr 24 delta appended. 4-day Apr 20 → Apr 24 gap — first observable cadence data point; possible ~weekly failure mode when combined with TDSD-6555 (Apr 15) + TDSD-6633 (Apr 20) + TDSD-6713 (Apr 24) intervals (5-day, 4-day).
- **Immediate-tier check:** Medium priority, no outage keyword, settlement layer (not revenue-time-critical), no regulatory deadline. **NO Immediate dispatch.**
- **Disposition:** Briefing-tier awareness for next briefing tick.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_new`, `active_situation_entity_match=keystone_settlement_requery`, `retirement_criterion_met`, `lifecycle_transition=retired→developing`, `verbatim_description_template_match`, `cadence_2nd_data_point`, `assignee_rotation_daniel_david`, `no_immediate_dispatch`.

**Layer A — TDSD-6703 "3ds is currently failing with HTTP 422"** (carryover, in-window update)
- **Type:** System Incident. **Priority:** Medium. **Status:** Work in progress.
- **Reporter + assignee:** [[Olamide Ajibulu]]. Created 16:07 WAT Apr 23; updated 09:01 WAT Apr 24.
- **Description (terse):** "This is being addressed by the TSE".
- **Context:** Prior Access 3DS failure was 11:58 WAT Apr 14 ("Access 3DS Unreachable | 20260414|504") — tracked in [[Access Bank — Multi-Track Failures]] situation as latent-unresolved 3DS track. TDSD-6703 does not explicitly name Access Bank in the title — scope ambiguous (could be 3DS infrastructure generally, or new bank's 3DS, or revival of Access 3DS). Description too terse to disambiguate at this tick.
- **Backfill note:** TDSD-6703 was filed during Apr 23 16:07 WAT window — covered by the briefing-tick 22:09 WAT Apr 23 sweep but not surfaced in briefing-2026-04-24 (Medium priority + terse description = low per-message salience). The 09:01 WAT Apr 24 update indicates continuing work — still no resolution.
- **Immediate-tier check:** Medium, no P1 language, no Access Bank explicit naming. **NO Immediate dispatch.**
- **Disposition:** Awareness-candidate for next briefing tick. If a P1 3DS cycle fires, or if TDSD-6703 elevates, consider surfacing. No situation page creation yet.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_carryover_from_apr23_sweep`, `scope_ambiguous_3ds`, `low_salience_first_surface`, `no_immediate_dispatch`.

**Layer A — TDSD-6712 "Kafka Monnify Live datasource issue | 20260424"** (fast-cycle close)
- **Status transition:** Work in progress → **Completed** 08:47 WAT Apr 24 by [[Peter Ile]] (assignee), previously Kabir Yusuf self-assigned per 08:09 WAT tick observation.
- **Resolution time:** ~47m from filing (07:59 WAT → 08:47 WAT). Fast-cycle close via cloud-engineer team routing.
- **Disposition:** Resolved. The 08:09 WAT tick's Awareness-candidate status is retired. No situation page needed (single-ticket fast-close, pattern not compounding).
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `fast_cycle_resolution_47m`, `assignee_handoff_kabir_peter`, `no_situation_page_needed`, `awareness_close_signal`.

**Layer A — TDSD-6575 "Pending Settlement"** (stale metadata refresh — workflow-discipline data point)
- **Type:** Task. **Priority:** Medium. **Status:** INITIAL REVIEW (unchanged).
- **Reporter:** Samuel Ojuolape. **Assignee:** [[Dominic Usiabulu]] (Moniepoint).
- **Created:** Apr 16. **Updated:** 08:58 WAT Apr 24 (no status transition, likely Jira metadata refresh).
- **Observation:** 9-day-old Pending Settlement cleanup task (historical MNFY transactions from 2022-2025), Dominic-assigned, still INITIAL REVIEW. NOT in the Dominic Apr 23 23:25-23:32 WAT resolution burst. Compounds the Dominic-workflow-discipline observation as a tangential-scope data point (batch cleanup task vs. the primary single-transaction reversal in [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]]). Not directly folded into that situation page — scope is too different (historical batch vs. VA reversal).
- **Disposition:** No action this tick. Observation folded into Dominic workflow-discipline mixed-evidence synthesis candidate.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_stale_9d_initial_review`, `assignee=dominic_usiabulu`, `scope_tangential_to_tdsd6645`, `metadata_refresh_not_status_transition`, `workflow_discipline_peripheral_data_point`.

**Layer A — TDSD-6555 "Keystone | Settlements issue | 20260415"** (historical cycle cleanup)
- **Type:** System Incident. **Priority:** Medium. **Status transition:** Completed 08:21 WAT Apr 24 (by [[Oluwatofunmi Obafemi]] assignee, reporter Daniel Armstrong).
- **Observation:** Apr 15 Keystone settlements 3am ticket closed ~same minute as TDSD-6713 filing. Reinforces the ~weekly cadence hypothesis on the Keystone settlement-requery pattern (Apr 15 → Apr 20 → Apr 24 intervals of 5-day, 4-day).
- **Disposition:** Folded into [[Keystone Bank — Settlement Requery Apr 20]] revival delta as cadence evidence.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_closed`, `keystone_pattern_cadence_reinforcement`, `parallel_cleanup_with_tdsd6713`.

**Layer A — TDSD-6709 "UPDATE MONIEPOINT_INT INTERCHANGE CONFIG FOR F60 SINK INFO"** (routine config change)
- **Type:** Service request. **Priority:** Medium. **Status:** Resolved 08:21 WAT Apr 24.
- **Reporter:** Mustapha Ajibade. **Assignee:** Oluwaseun Oladele (Moniepoint).
- **Scope:** SQL UPDATE on `interchange_config` table to enable F60 sink_info propagation on MONIEPOINT_INT interchange (Aptent_DB).
- **Disposition:** Routine infrastructure change. Closed same-day. No situation signal.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `routine_config_update`, `fast_close`.

**Layer B — AS-4404 "Refund - Rest [Source Node] for Web Implementation Task (Card Not Present Juliana)"** (Highest priority dev task)
- **Type:** Task (AptPay Switch software project). **Priority:** Highest. **Status:** READY FOR QA TESTING (updated 08:56 WAT Apr 24).
- **Assignee:** Lewis Ugwu. **Reporter:** Kevin Ng'Eno.
- **Scope:** Refund flow implementation for Card-Not-Present payment gateway path (Juliana custom authorization service). Development/QA work.
- **Immediate-tier check:** Highest priority but it's a dev task (not a production incident); active-situation match none; no outage keyword. **NO Immediate dispatch.**
- **Disposition:** Awareness-level only. Tracks dev progress on AptPay Switch; no operational signal.
- Factors: `source=jira`, `archetype=software`, `priority=highest`, `ticket_type=task`, `status_transition_to_ready_for_qa`, `dev_work_no_incident`, `no_active_situation_match`, `no_immediate_dispatch`.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify Settlements Escalated) — no movement since Dominic 04:08 WAT Apr 23 attribution-transfer comment. Unchanged.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no movement since Qazim 22:32 WAT Apr 23 Work In Progress filing. Unchanged. Route remains off per overnight duty handover.
- **TDSD-6699 + TDSD-6690** (CTO approval queue from briefing-2026-04-24 D3) — both still pending; no approval action observed.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — skim-tick elevated to full-processing on delta

08:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 06:09"` returned **1 delta**. Layer B software JQL returned **4 deltas** (all Medium bug closures).

**Layer A — TDSD-6712 "Kafka Monnify Live datasource issue | 20260424"** (NEW)
- **Type:** System Incident (service_desk archetype)
- **Priority:** Medium
- **Status:** Work in progress
- **Reporter + assignee:** [[Kabir Yusuf]] (self-assigned)
- **Filed:** referenced Slack message `p1777011284784829` → 07:14:44 WAT Apr 24 (Moniepoint workspace C0812LH3BNJ). Jira updated 07:59 WAT.
- **Description:** "We are getting not data on KAFKA-MONNIFY-LIVE datasource this has been excalated to the cloud engineer team for review" — escalated to cloud-engineer team.
- **Entity match:** [[Monnify]] — but **distinct subsystem** from [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] (Kafka data streaming vs. VA reversal settlement block). No cross-reference added to that situation page — scopes differ.
- **Immediate-tier check:** Priority Medium, not P1/Highest; no outage/security keywords; no route-off; cloud-engineer team already engaged product-side. NO Immediate dispatch.
- **Disposition:** Awareness-candidate for next briefing tick (Apr 25 06:09 WAT). If TDSD-6712 recurs, compounds, or elevates to Highest priority during today's working hours, a new situation page should be created at next briefing compose. **[Resolved 08:47 WAT per 09:10 WAT tick observation — fast-close, awareness retired.]**
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_new`, `active_situation_entity_match=monnify`, `subsystem_distinct_from_existing_situation`, `product_side_escalation_path_active`, `no_immediate_dispatch`.

**Layer B — 4 routine bug closures** (all Medium, all Done, all Awareness-level with no active-situation match):
- **TCDD-1357** "BETA ENV: Resend OTP returned 400 even when a new OTP was successfully resent" — Mary Alaba assignee, Done 07:20 WAT.
- **TCDD-1255** "PROD: PF Admin is unable to disable PF User" — Fatai Ibrahim assignee, Done 07:18 WAT.
- **TCDD-1254** "PROD: Unable to login as teamapt admin via google on prod" — Akindele Odedoyin assignee, Done 07:16 WAT.
- **ADD-4384** "Bank Admin Unable to Approve Fee Creation Requests on Staging" — Mary Alaba assignee, Done 07:20 WAT.

All 4 are Consolidated Direct Debit (TCDD) + DTB (ADD) product-layer bug closures — routine dev hygiene, not tied to active incident situations.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify Settlements Escalated) — no movement since Dominic 04:08 WAT Apr 23 attribution-transfer comment. Unchanged.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no movement since Qazim 22:32 WAT Apr 23 Work In Progress filing. Unchanged.

### last_processed 2026-04-24T06:10:00Z (07:10 WAT) — zero-delta tick

07:10 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 05:09"` returned 0 issues. Layer B software JQL (scoped to priority Highest/Blocker/Critical or status transitions to resolved/done/completed/escalated) returned 0 issues. Post-briefing quiet. Key state checkpoints:
- **TDSD-6645** (Monnify Settlements Escalated) — no movement since Dominic 04:08 WAT Apr 23 attribution-transfer comment. Unchanged.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no movement since Qazim 22:32 WAT Apr 23 Work In Progress filing. Unchanged.
- **Dominic resolution burst (TDSD-6553/6612/6688/6706)** — all remain closed from 23:25–23:32 WAT Apr 23.

No new P1/Highest filings. No status transitions on active-situation entities (Ecobank, Monnify, NIBSS, CoralPay). Friday morning pre-ops-start window consistent with quiet expectation.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23, 0 Layer B deltas. Dominic resolution burst observed:

- **TDSD-6612** "SETTLEMENT PAYOUT" (single txn M0826041000431109080 beneficiary bank not available) — **Highest priority** dormant since filing 22:50 WAT Apr 17 — **Done 23:32 WAT Apr 23** by [[Dominic Usiabulu]] (assignee), reporter [[Blessing Olawale]]. Major resolution — 6-day dormant Highest-priority ticket.
- **TDSD-6553** "SETTLEMENT PAYOUT" (24-transaction batch) — Medium, filed 23:07 WAT Apr 14 — **Done 23:30 WAT Apr 23** by Dominic, reporter Blessing Olawale.
- **TDSD-6688** "UPDATE OF REJECTED REFUND STATUS 22042026" — Medium, filed 16:13 WAT Apr 22 by [[Samson Anaele]] (reporter), Dominic assignee — **Closed 23:25 WAT Apr 23**.
- **TDSD-6706** "UPDATE OF REJECTED REFUND STATUS 23042026" — Medium, filed 17:59 WAT Apr 23 by Samson Anaele, Dominic assignee — **Resolved 23:25 WAT Apr 23**.
- **TDSD-6711** "Ecobank | ATS | Portal Inaccessibility | 20260423" — Medium, filed **22:32 WAT Apr 23** by [[Qazim Adedigba]] (reporter + assignee self-assigned), status Work in Progress. Escalated to Mayowa/Olayombo@ecobank.com. See briefing-2026-04-24 D1 + [[Ecobank — RC91 on NUS Nodes]] situation page — now tracking compound Ecobank failure (3 RC91 cycles Apr 23 + DCIR portal inaccessibility).

**Dominic workflow-discipline pattern — mixed evidence after this tick.** The 4-ticket resolution burst at 23:25-23:32 WAT (TDSD-6553/6612/6688/6706) is a concrete counter-signal to the workflow-discipline concern flagged in briefing-2026-04-22 B4 and briefing-2026-04-23 D1/A2. Dominic is processing backlog at end-of-day — this is resolution behavior, not stall. However, TDSD-6645 (the primary situation-driver) was NOT in the resolution burst and remains static since 22:09 WAT Apr 23, so the single-ticket handoff-to-inwards-payments-team thread is still open. Synthesis candidate ("Monnify Settlements — Dominic-Awaiting-Scheme-Update workflow pattern") status: mixed evidence, defer.

**TDSD-6645 state check.** JQL sweep returned zero updates since 22:09 WAT Apr 23 → TDSD-6645 remains Escalated with Dominic's 04:08 WAT Apr 23 attribution-transfer comment as the latest activity. No new counterparty identified.

### last_processed 2026-04-23T21:09:00Z (22:09 WAT) — preserved from prior note

22:09 WAT Apr 23 tick: 21 TDSD deltas in 15:11→22:09 WAT window — Wema TDSD-6705 Completed 18:45 WAT, Access TDSD-6708 Resolved 18:51, NIBSS Dis TDSD-6710/6650 Completed 21:51/21:42, 4th Dominic Awaiting-Scheme-Update ticket (TDSD-6706). Zero P1/Highest filings despite 4 Slack P1 posts — Polaris + CoralPay ZIB Slack-only (5th data point on cross-source asymmetry tracker).
