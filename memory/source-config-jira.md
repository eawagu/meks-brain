---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T12:09:00Z (13:09 WAT). 13:09 WAT Apr 24 full-level tick: Layer A returned 3 deltas in 1h window — TDSD-6717 Paystack balance adjustment Resolved 14:01 WAT (routine, 2h24m filing-to-Resolved); **TDSD-6718 NEW 13:30 WAT refund-status-update ticket by Samson Anaele, Opeyemi Ahmed direct-assigned (first Samson-filed ticket bypassing Dominic routing)** — folded into Monnify Settlements situation as Opeyemi-cluster firming signal; TDSD-6037 status touch (old DD logging ticket, Awaiting Scheme Update, routine). Layer B returned 6 routine closures (TCDD-1358 Habari GTB Logo Done + AS-4959/60/62/63/64/67 June-Johnson Zone project closures). No Immediate dispatch."
updated: "2026-04-24T12:26:52Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T12:09:00Z"
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

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick

13:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 12:09"` returned **3 deltas in the 12:09→13:09 WAT window**. Layer B software JQL returned **6 deltas (all routine closures)**.

**Layer A — TDSD-6717 "PAYSTACK BALANCE ADJUSTMENT APRIL 24TH 2026" — Resolved 14:01:56 WAT by [[Daniel Fetuga]]**
- **Transition:** Resolved status at 14:01:56 WAT Apr 24 (24h time = 13:01:56 UTC +0100 = 14:01:56 WAT). Filed 11:38 WAT by [[Christine Ogude]]. Medium priority. 2h23m active from filing to Resolved. Not Paystack treasury ops routine fast-cycle pattern (10-minute cycles are typical; 2h23m is longer — possibly required more verification).
- **Significance:** Routine Paystack treasury-ops resolution. The ticket was captured at 11:09 WAT tick as filed; now closed cleanly. No situation match.
- **Disposition:** Awareness — routine. No briefing item needed.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_transition_wip_to_resolved`, `paystack_treasury_ops_routine`, `2h23m_filing_to_resolved`, `no_situation_match`, `no_immediate_dispatch`.

**Layer A — TDSD-6718 NEW "UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER" — Opeyemi-direct-assigned refund ticket** (situation delta on [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]])
- **Created:** 13:30:30 WAT Apr 24 by [[Samson Anaele]] (Moniepoint, Africa/Lagos). Medium priority.
- **Assignee:** **[[Opeyemi Ahmed]] directly** (not Dominic Usiabulu). **Routing-bypass signal** — Samson Anaele previously routed similar refund-status-update tickets through the Dominic chain (TDSD-6688 Apr 22, TDSD-6706 Apr 23, both Dominic-assigned and closed in the Apr 23 23:25 WAT Dominic-resolution-burst). **First Samson-filed ticket that bypassed Dominic.**
- **Status:** In Progress at 13:38:06 WAT (8m filing-to-WIP — very fast). No comments yet.
- **Significance:** Second Opeyemi-cluster-firming signal in the same tick window (first was Blessing 11:19 WAT CC-to-Opeyemi on TDSD-6684 refund ticket earlier today). Whether this reflects organizational routing change or a one-off is ambiguous, but two independent signals in 2 hours point the same direction. Updates [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] situation with Opeyemi-cluster-evidence now 5:1 on refund/settlement tickets.
- **Disposition:** Awareness — routing signal is positive (workflow firming toward correct owner), not alarm. Briefing-2026-04-25 Decision candidate strengthens (direct-ask Opeyemi for TDSD-6645 closure is lowest-friction path).
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `ticket_new`, `samson_anaele_first_non_dominic_filing`, `opeyemi_direct_assigned_from_filing`, `routing_bypass_signal`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal`, `opeyemi_cluster_firming_2nd_signal_same_tick`, `parallel_to_blessing_cc_opeyemi_tdsd6684`, `8m_filing_to_wip`, `no_immediate_dispatch`.

**Layer A — TDSD-6037 "Improve TeamApt DD response code and error message logging" — status touch (routine)**
- **Update:** 13:21:43 WAT by [[Yasir Syed Ali]] (assignee). Status unchanged at Awaiting Scheme Update. Medium priority. Filed 2026-03-04 by [[Emmanuel Eke]] — old software-improvement ticket.
- **Significance:** Routine status touch on an old DD-logging-improvement ticket. Not active-situation-matched. Typical Dominic-team workflow-discipline observation (Yasir-assigned, not Dominic, but same Awaiting-Scheme-Update-without-closure pattern).
- **Disposition:** Awareness — low signal, no briefing item needed.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_unchanged_awaiting_scheme_update`, `old_ticket_march_2026`, `not_active_situation_matched`, `routine_status_touch`, `no_immediate_dispatch`.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no updates since 22:32 WAT Apr 23 Work In Progress filing. 14h37m silent at 13:09 WAT. Route remains off per briefing-2026-04-24 D1.
- **TDSD-6716** (NIBSS response-not-sent formalization) — no Jira status transitions this tick, but email escalation layer fired at 11:56 WAT (see source-config-email + NIBSS PTSA situation).
- **TDSD-6699 + TDSD-6690** (CTO approval queue) — both still pending; no approval action observed.
- **TDSD-6713** (Keystone settlement requery cycle) — no updates since 11:59 WAT Work in progress transition; 1h10m active.
- **TDSD-6645** (Monnify VA reversal) — no Dominic response this tick to Blessing's 11:20 WAT chase; 33h01m Dominic silence continuing.

**Layer B — 6 routine closures:**
- **TCDD-1358** "Habari-Incorrect GTB Logo Displayed on CMV Accept Terms & Conditions Page" — Done 13:19 WAT by Funsho Abdullahi. Medium. Routine UI fix.
- **AS-4959/4960/4962/4963/4964/4967** — June Johnson Zone project task closures ("Kickoff Meeting", "Provision of onboarding/compliance/KYC documents", "Develop and share scope of work", "Scope alignment meeting", "Develop and share project plan", "Chat group forum setup") — all Done or In Progress. Routine project workstream.
- **Disposition:** Awareness — routine Layer B dev/project work. No P1/P0/Blocker, no active-situation match, no briefing item needed.
- Factors: `source=jira`, `archetype=software`, `layer_b_routine_closures`, `no_priority_elevation`, `no_situation_match`, `awareness_only`.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim-elevated-to-full tick (preserved summary)

12:09 WAT Apr 24 tick: Layer A returned 3 NEW deltas — TDSD-6713 Keystone INITIAL REVIEW → Work in progress 11:59 WAT (Daniel Armstrong, 3h38m filing-to-WIP, David Oseji assignee); TDSD-6645 Blessing 3rd-chase 11:20 WAT ("Please do we have an update", Dominic silence 32h01m); TDSD-6684 Blessing 11:19 WAT first-cross-ticket-CC-to-Opeyemi-Ahmed on refund ticket (Dominic silence 32h18m). Layer B 0. No Immediate dispatch.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Layer A returned 8 deltas — TDSD-6268 SETTLEMENT PROCESSING Done 11:02 WAT (same transaction MNFY|46|... as TDSD-6645; 4th Opeyemi-cluster fast-close); **TDSD-6716 NEW Incident Medium 10:18 WAT formalizes NIBSS response-not-sent pattern (RC91 + Access + GTBank scope)**; TDSD-6717 Paystack ₦1.07B balance adjustment; TDSD-6714 routine; TDSD-6715 NEW cron change (Authorize, not CTO-gate); TDSD-6618 Stanbic 6-day-old RC91 backlog closure. Layer B 0. No Immediate dispatch.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: Layer A returned 5 deltas — TDSD-6617 PENDING DISBURSEMENTS Completed (retires [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] situation); TDSD-6268 SETTLEMENT PROCESSING High priority Work in progress on SAME MNFY transaction as TDSD-6645 situation (Opeyemi Ahmed assignee, possible inwards-team pickup); TDSD-6714 NEW Transaction Status Update (routine); TDSD-6565 + TDSD-6656 routine change closures. Layer B returned 0. No Immediate-tier dispatch.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — skim elevated to full on delta (preserved summary)

09:10 WAT Apr 24 tick: Layer A returned 6 deltas. Headline: **TDSD-6713 NEW Keystone Settlements 3am requery** (revives retired [[Keystone Bank — Settlement Requery Apr 20]] situation — `retired` → `developing`, 4-day Apr 20→Apr 24 cadence emerging, 3-ticket sequence TDSD-6555/TDSD-6633/TDSD-6713 = 5-day/4-day intervals). Also: TDSD-6703 3DS HTTP 422 carryover, TDSD-6712 Kafka Monnify fast-close 47m, TDSD-6575 9-day stale Dominic Pending Settlement, TDSD-6555 historical cycle Completed 08:21 WAT, TDSD-6709 routine config update Resolved. Layer B: AS-4404 Highest dev task READY FOR QA (awareness, no incident). No Immediate-tier triggers.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23, 0 Layer B deltas. **Dominic resolution burst 23:25–23:32 WAT Apr 23** closed TDSD-6553/TDSD-6612 (Highest)/TDSD-6688/TDSD-6706. TDSD-6711 Ecobank DCIR portal inaccessibility filed 22:32 WAT Apr 23 by Qazim — folded into briefing-2026-04-24 D1 + [[Ecobank — RC91 on NUS Nodes]] situation.
