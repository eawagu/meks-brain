---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T11:09:00Z (12:09 WAT). 12:09 WAT Apr 24 skim-elevated-to-full tick: Layer A returned 3 NEW deltas in 1h window — TDSD-6713 Keystone INITIAL REVIEW → Work in progress 11:59 WAT (Daniel Armstrong, 3h38m filing-to-WIP, David Oseji assignee); TDSD-6645 Blessing 3rd-chase 11:20 WAT (\"Please do we have an update\", Dominic silence 32h01m); TDSD-6684 Blessing 11:19 WAT first-cross-ticket-CC-to-Opeyemi-Ahmed on refund ticket (Dominic silence 32h18m). Layer B 0. No Immediate dispatch."
updated: "2026-04-24T11:23:35Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T11:09:00Z"
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

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim elevated to full on delta

12:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 11:09"` returned **3 deltas in the 11:09→12:09 WAT window** (filtered from 10-ticket response; pre-11:09 deltas already processed at prior tick). Layer B software JQL returned **0 deltas**.

**Layer A — TDSD-6713 "Keystone | Settlements issue | 20260424" — status transition** (situation delta on [[Keystone Bank — Settlement Requery Apr 20]])
- **Transition:** INITIAL REVIEW → **Work in progress 11:59:13 WAT Apr 24** by [[Daniel Armstrong]] (ticket filer + post-filing assignee-volley operator). Assignee stable at [[David Oseji]]. Priority Medium. 3h38m from filing (08:21 WAT) to active-WIP.
- **Significance:** Ticket is now actively being handled. No comments on ticket yet; no resolution signal. Pattern watch: TDSD-6633 (Apr 20 cycle) closed same-day (~9h0m filing-to-Done); if TDSD-6713 follows same cadence, expect closure by ~17:00 WAT Apr 24. Situation delta folded into [[Keystone Bank — Settlement Requery Apr 20]].
- **Disposition:** Awareness — briefing-2026-04-25 candidate. No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_transition_initial_review_to_wip`, `active_situation_match=keystone_settlement_requery_apr20`, `assignee_david_oseji_confirmed`, `3h38m_filing_to_wip`, `same_day_close_tracking_17_wat_expected`, `no_immediate_dispatch`.

**Layer A — TDSD-6645 "Urgent Pending Settlement – Re-trigger Required" — Blessing 3rd-chase** (situation delta on [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]])
- **Comment added:** 11:20:45 WAT Apr 24 by [[Blessing Obioha]] (reporter) — *"Please do we have an update"*. Status unchanged at Escalated (since 04:08 WAT Apr 23). Priority unchanged at Highest.
- **Significance:** 3rd Blessing chase on TDSD-6645 (Apr 21 15:02, Apr 22 11:10, Apr 24 11:20) — daily cadence. Dominic ticket-specific silence extends to 32h01m from 04:08 WAT Apr 23 attribution-transfer comment. No dispatcher-side response. Blessing has not yet CC'd Opeyemi Ahmed on this ticket (contrast to TDSD-6684 below).
- **Disposition:** Situation delta folded into [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]]. Briefing-2026-04-25 Decision candidate strengthened.
- Factors: `source=jira`, `archetype=service_desk`, `priority=highest`, `comment_added_reporter_3rd_chase`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal`, `status_unchanged_escalated_32h01m_dominic_silence`, `daily_chase_cadence`, `no_cc_opeyemi_yet_on_this_ticket`, `no_immediate_dispatch`.

**Layer A — TDSD-6684 "Pending Refund Transactions" — Blessing CC-escalation to Opeyemi Ahmed** (situation delta on [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]])
- **Comment added:** 11:19:31 WAT Apr 24 by [[Blessing Obioha]] (reporter) — *"@Dominic Usiabulu Please help with an update cc @Opeyemi Ahmed Kindly assist"*. Status unchanged at Awaiting Scheme Update. Priority unchanged at Medium. Assignee still [[Dominic Usiabulu]].
- **Significance:** **First time Blessing has CC'd Opeyemi Ahmed on a Dominic-assigned ticket.** 17 minutes after TDSD-6268 Done by Opeyemi at 11:02 WAT. Dominic silence on TDSD-6684: Apr 23 03:01 WAT "thiis is in progress" → Apr 24 11:19 WAT = 32h18m (mirrors TDSD-6645 Dominic silence). Cross-ticket escalation pattern emerging: Blessing is routing around Dominic-silence by pulling Opeyemi-cluster ownership into refund-side tickets.
- **Disposition:** Cross-ticket signal folded into [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] situation (TDSD-6684 referenced as pattern-compounding evidence). Not promoting TDSD-6684 to its own situation yet — 1 data point of cross-ticket CC is below threshold; if Blessing similarly CCs Opeyemi on TDSD-6645 in next ticks, reconsider spinning separate "refund escalation" situation.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `comment_added_reporter_chase_with_cross_ticket_cc`, `first_blessing_cc_opeyemi_on_dominic_ticket`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal_pattern_compounding`, `status_unchanged_awaiting_scheme_update_32h18m_dominic_silence`, `cross_ticket_rerouting_signal`, `triggered_17m_after_tdsd6268_done`, `no_immediate_dispatch`.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no updates since 22:32 WAT Apr 23 Work In Progress filing. 13h37m silent at 12:09 WAT. Route remains off per briefing-2026-04-24 D1.
- **TDSD-6716** (NIBSS response-not-sent formalization) — no updates since 10:46 WAT Apr 24 (already captured at 11:09 tick).
- **TDSD-6699 + TDSD-6690** (CTO approval queue) — both still pending; no approval action observed.
- **TDSD-6703** (3DS HTTP 422) — Work in progress, no movement.
- **TDSD-6712** (Kafka Monnify Live datasource) — no updates since prior tick.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Layer A returned 8 deltas — TDSD-6268 SETTLEMENT PROCESSING Done 11:02 WAT (same transaction MNFY|46|20260310114548|008618 as TDSD-6645; 4th Opeyemi-cluster fast-close; TDSD-6645 itself still Escalated, 31h01m Dominic silence); **TDSD-6716 NEW Incident Medium 10:18 WAT formalizes NIBSS response-not-sent pattern (RC91 + Access + GTBank scope)** — folded into [[NIBSS PTSA — VPN Flapping Apr 22]] watchpoint; TDSD-6717 Paystack ₦1.07B balance adjustment (routine, 15m filed→resolved); TDSD-6714 routine; TDSD-6715 NEW cron change (Authorize, not CTO-gate); TDSD-6618 Stanbic 6-day-old RC91 backlog closure. Layer B 0. No Immediate dispatch.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: Layer A returned 5 deltas — TDSD-6617 PENDING DISBURSEMENTS Completed (retires [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] situation); TDSD-6268 SETTLEMENT PROCESSING High priority Work in progress on SAME MNFY transaction as TDSD-6645 situation (Opeyemi Ahmed assignee, possible inwards-team pickup); TDSD-6714 NEW Transaction Status Update (routine); TDSD-6565 + TDSD-6656 routine change closures. Layer B returned 0. No Immediate-tier dispatch.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — skim elevated to full on delta (preserved summary)

09:10 WAT Apr 24 tick: Layer A returned 6 deltas. Headline: **TDSD-6713 NEW Keystone Settlements 3am requery** (revives retired [[Keystone Bank — Settlement Requery Apr 20]] situation — `retired` → `developing`, 4-day Apr 20→Apr 24 cadence emerging, 3-ticket sequence TDSD-6555/TDSD-6633/TDSD-6713 = 5-day/4-day intervals). Also: TDSD-6703 3DS HTTP 422 carryover (Medium, scope ambiguous 3DS), TDSD-6712 Kafka Monnify fast-close 47m, TDSD-6575 9-day stale Dominic Pending Settlement, TDSD-6555 historical cycle Completed 08:21 WAT, TDSD-6709 routine config update Resolved. Layer B: AS-4404 Highest dev task READY FOR QA (awareness, no incident). No Immediate-tier triggers.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — skim-tick elevated to full (preserved summary)

08:09 WAT Apr 24 tick: Layer A returned 1 delta — TDSD-6712 Kafka Monnify Live datasource issue, Medium, Work in progress, Kabir Yusuf. Layer B returned 4 routine bug closures. No Immediate dispatch.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23, 0 Layer B deltas. **Dominic resolution burst 23:25–23:32 WAT Apr 23** closed TDSD-6553/TDSD-6612 (Highest)/TDSD-6688/TDSD-6706. TDSD-6711 Ecobank DCIR portal inaccessibility filed 22:32 WAT Apr 23 by Qazim — folded into briefing-2026-04-24 D1 + [[Ecobank — RC91 on NUS Nodes]] situation.
