---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T12:09:00Z (13:09 WAT). 13:09 WAT Apr 24 full-level tick: Layer A returned 3 deltas in 1h window — TDSD-6717 Paystack balance adjustment Resolved 14:01 WAT (routine, 2h24m filing-to-Resolved); **TDSD-6718 NEW 13:30 WAT refund-status-update ticket by Samson Anaele, Opeyemi Ahmed direct-assigned (first Samson-filed ticket bypassing Dominic routing)** — folded into Monnify Settlements situation as Opeyemi-cluster firming signal; TDSD-6037 status touch (old DD logging ticket, Awaiting Scheme Update, routine). Layer B returned 6 routine closures (TCDD-1358 Habari GTB Logo Done + AS-4959/60/62/63/64/67 June-Johnson Zone project closures). No Immediate dispatch."
updated: "2026-04-24T13:26:06Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T13:09:00Z"
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

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick

14:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 13:09"` returned **7 deltas in the 13:09→14:09 WAT window**. Layer B software JQL returned **0 deltas**.

**Layer A — TDSD-6719 NEW "verve ttp RC06" Problem ticket + TDSD-6696 Incident Completed (incident-to-problem workflow handoff)**
- **TDSD-6719:** Created 14:07:14 WAT by [[Olamide Ajibulu]] (self-assignee), Medium priority, **issuetype = [System] Problem** (root-cause-tracking). Status: **Problem Investigation**. Comment at 14:07:46 WAT: link to `https://teamapt.atlassian.net/browse/TDSD-6696`. Description: null (summary-only at filing).
- **TDSD-6696:** " Intermittent RC 06 on verve TTP " — filed 2026-04-23 10:52 WAT by Olamide Ajibulu, Medium, [System] Incident. **Completed at 14:08:53 WAT Apr 24 by Olamide.** 27h16m active filing-to-Completed.
- **Workflow-discipline positive signal:** Olamide closed the incident + filed a Problem-type ticket with explicit cross-reference in the same minute. This is the canonical Jira ITSM pattern (Incident → Problem for root-cause tracking) and represents structured ownership on a recurring-failure-mode track. Compare to the more common "close incident without follow-up problem record" pattern observed elsewhere in the TDSD queue. **Verve TTP RC06 is a new failure-mode track in the brain — not active-situation-matched yet.** RC06 (\"Invalid transaction / card error\") on Verve TTP (Verve scheme's tap-to-pay rail, see [[Verve]] + [[NFC Tap-to-Pay]] context) is distinct from the RC06 fast-cycle observed on Access Bank Apr 19. Single-cycle observation below new-situation-spin-up threshold.
- **Disposition:** Awareness — monitor for recurrence. If a second Verve TTP RC06 cycle surfaces within a 7-day window, spin up a new situation page. TDSD-6719 Problem ticket is the active RCA tracker.
- Factors: `source=jira`, `archetype=service_desk`, `issuetype=problem+incident_paired`, `priority=medium`, `workflow_discipline_positive_signal`, `incident_to_problem_handoff_structured_ownership`, `27h16m_filing_to_completed`, `verve_ttp_rc06_new_failure_mode_track`, `no_active_situation_match_yet`, `single_cycle_below_situation_threshold`, `no_immediate_dispatch`.

**Layer A — TDSD-6718 Closed 13:37 WAT by Opeyemi Ahmed — 7m fast-close** (situation delta on [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]])
- **Transition:** Filed 13:30:30 WAT by [[Samson Anaele]] → In Progress 13:38 WAT → **Closed at 13:37:48 WAT by [[Opeyemi Ahmed]]** (same assignee). 7 minutes filing-to-Closed — fastest Opeyemi-cluster cycle observed so far. (Note: updated timestamp 13:37:48 vs. 13:38:06 In-Progress ordering reflects Jira's sub-second transition semantics — Closed is the terminal state.)
- **Significance:** Prior-tick ambiguity about whether Opeyemi-direct-assignment signaled real ownership vs. nominal handoff is resolved: Opeyemi actioned and closed within the same 10-minute window. Routing-bypass + execution-discipline paired. Same reporter as TDSD-6688 and TDSD-6706 (Dominic-assigned refund tickets that closed in the Apr 23 23:25 WAT resolution burst with ~1-day+ lag); this one routed direct with 7m lag. Strongest evidence to date that Opeyemi-cluster is the correct owner for Samson-Anaele refund-status tickets. Opeyemi-cluster evidence now **5 closures/ownership + 1 cross-ticket CC-escalation + 1 fast-close-bypass-filing pattern** vs. Dominic 2 stalls continuing (TDSD-6645 34h01m, TDSD-6684 35h08m).
- **Disposition:** Awareness — hardens briefing-2026-04-25 Decision candidate (direct-ask Opeyemi for TDSD-6645 closure) from speculative to evidence-baselined. No Immediate dispatch — positive signal, not alarm.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_transition_in_progress_to_closed`, `7m_fast_close`, `fastest_opeyemi_cluster_cycle_observed`, `routing_bypass_plus_execution_discipline`, `refutes_prior_tick_ambiguity_nominal_handoff`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal`, `opeyemi_cluster_evidence_hardening_5_plus_1_plus_1`, `evidence_baselined_direct_ask_opeyemi`, `no_immediate_dispatch`.

**Layer A — TDSD-6572 "FCMB | RC 91 | 20260416" Completed 13:49 WAT by Afeez Kazeem** (backlog closure, Apr 16 cycle)
- **Transition:** Filed 2026-04-16 08:19 WAT by [[Afeez Kazeem]] (self-assignee), Medium priority, [System] Incident. **Completed at 13:49:32 WAT Apr 24** by Afeez Kazeem. **8 days 5h30m filing-to-Completed** — stale backlog closure, not a fresh cycle. Presumed closed-on-stale rather than closed-on-recent-resolution.
- **Significance:** Cross-referenced to [[FCMB — RC91 P1 Apr 17]] situation — TDSD-6572 is an Apr 16 cycle ticket (date-stamped in summary) that pre-dates the situation's Apr 17 TDSD-6613 P1 anchor by 1 day. Afeez cleaning up the pre-situation-scope FCMB RC91 historical ticket queue. Does not alter the active situation's day-3 multi-surface continuation narrative; just closes the upstream historical ticket.
- **Disposition:** Awareness — routine backlog cleanup, no structural signal. No Immediate dispatch. Briefing-2026-04-25 Awareness candidate (at most) — may skip as low-signal.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_transition_wip_to_completed`, `8_day_stale_backlog_closure`, `pre_situation_scope_historical_ticket`, `active_situation_match=fcmb_rc91_p1_apr17`, `no_structural_signal`, `no_immediate_dispatch`.

**Layer A — TDSD-6716 "NIBSS|SUCCESSFUL RESPONSE NOT SENT| 20260424" — status touch (Work in progress unchanged)**
- **Update:** 13:48:07 WAT by Afeez Kazeem (assignee). Status unchanged at Work in progress (filed 10:18 WAT Apr 24). Medium priority.
- **Significance:** Status-touch without transition (likely comment added or attachment). Folded into [[NIBSS PTSA — VPN Flapping Apr 22]] situation as continuing-tracking delta. Does not change directive-tracking counter — still 1 of 2 post-transition instances, 48h window through 10:10 WAT Apr 26.
- **Disposition:** Awareness — minor continuing-tracking signal. No briefing item needed.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_unchanged_work_in_progress`, `status_touch_without_transition`, `active_situation_match=nibss_ptsa_vpn_flapping_apr22`, `no_immediate_dispatch`.

**Layer A — TDSD-6037 "Improve TeamApt DD response code and error message logging" — In Progress transition (Yasir, from Awaiting Scheme Update)**
- **Update:** 14:02:30 WAT by [[Yasir Syed Ali]] (assignee). **Status transition Awaiting Scheme Update → In Progress.** Medium priority. Filed 2026-03-04 by [[Emmanuel Eke]] — old software-improvement ticket.
- **Significance:** Positive status transition — Yasir picking up the DD logging improvement work after it was previously parked in Awaiting Scheme Update. Not active-situation-matched; software-improvement track, not operational-incident track.
- **Disposition:** Awareness — low-signal status transition on a software-improvement ticket. No briefing item needed.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_transition_awaiting_scheme_update_to_in_progress`, `software_improvement_track`, `not_active_situation_matched`, `yasir_assignee_picks_up_work`, `no_immediate_dispatch`.

**Layer A — TDSD-6566 "CONFIRMATION OF SETTLEMENT CREDIT" — INITIAL REVIEW status touch**
- **Update:** 13:32:51 WAT by unknown actor. Status unchanged at INITIAL REVIEW. Medium priority. Filed 2026-04-15 by Rebecca Adewusi. Assignee null.
- **Significance:** Routine status touch on an older settlement-confirmation ticket. Not active-situation-matched (distinct from Monnify Settlements TDSD-6645 scope).
- **Disposition:** Awareness — low signal, no briefing item needed.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `status_unchanged_initial_review`, `older_ticket_apr_15`, `assignee_null`, `not_active_situation_matched`, `routine_status_touch`, `no_immediate_dispatch`.

**Active-situation checkpoints (zero delta this tick beyond the above):**
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no Jira updates since 22:32 WAT Apr 23 filing. **15h37m silent at 14:09 WAT.** Route remains off per briefing-2026-04-24 D1. Cross-source: new user-creation-layer Ecobank escalation email captured this tick (see source-config-email + Ecobank situation); email-layer pressure building without Jira-layer movement.
- **TDSD-6699 + TDSD-6690** (CTO approval queue) — both still pending; no approval action observed.
- **TDSD-6713** (Keystone settlement requery cycle) — no updates since 11:59 WAT Work in progress transition; 2h10m active.
- **TDSD-6645** (Monnify VA reversal) — no Dominic response this tick to Blessing's 11:20 WAT chase; 34h01m Dominic silence continuing.

**Layer B — 0 deltas.**

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick (preserved summary)

13:09 WAT Apr 24 tick: Layer A returned 3 deltas in 1h window — TDSD-6717 Paystack balance adjustment Resolved 14:01 WAT (routine, 2h24m filing-to-Resolved); TDSD-6718 NEW 13:30 WAT refund-status-update ticket by Samson Anaele, Opeyemi Ahmed direct-assigned (first Samson-filed ticket bypassing Dominic routing) — folded into Monnify Settlements situation as Opeyemi-cluster firming signal; TDSD-6037 status touch (old DD logging ticket, Awaiting Scheme Update, routine). Layer B returned 6 routine closures (TCDD-1358 Habari GTB Logo Done + AS-4959/60/62/63/64/67 June-Johnson Zone project closures). No Immediate dispatch.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim-elevated-to-full tick (preserved summary)

12:09 WAT Apr 24 tick: Layer A returned 3 NEW deltas — TDSD-6713 Keystone INITIAL REVIEW → Work in progress 11:59 WAT (Daniel Armstrong, 3h38m filing-to-WIP, David Oseji assignee); TDSD-6645 Blessing 3rd-chase 11:20 WAT (\"Please do we have an update\", Dominic silence 32h01m); TDSD-6684 Blessing 11:19 WAT first-cross-ticket-CC-to-Opeyemi-Ahmed on refund ticket (Dominic silence 32h18m). Layer B 0. No Immediate dispatch.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Layer A returned 8 deltas — TDSD-6268 SETTLEMENT PROCESSING Done 11:02 WAT (same transaction MNFY|46|... as TDSD-6645; 4th Opeyemi-cluster fast-close); TDSD-6716 NEW Incident Medium 10:18 WAT formalizes NIBSS response-not-sent pattern (RC91 + Access + GTBank scope); TDSD-6717 Paystack ₦1.07B balance adjustment; TDSD-6714 routine; TDSD-6715 NEW cron change (Authorize, not CTO-gate); TDSD-6618 Stanbic 6-day-old RC91 backlog closure. Layer B 0. No Immediate dispatch.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: Layer A returned 5 deltas — TDSD-6617 PENDING DISBURSEMENTS Completed (retires Monnify Disbursements Stuck IN PROGRESS Apr 17+ situation); TDSD-6268 SETTLEMENT PROCESSING High priority Work in progress on SAME MNFY transaction as TDSD-6645 situation (Opeyemi Ahmed assignee, possible inwards-team pickup); TDSD-6714 NEW Transaction Status Update (routine); TDSD-6565 + TDSD-6656 routine change closures. Layer B returned 0. No Immediate-tier dispatch.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — skim elevated to full on delta (preserved summary)

09:10 WAT Apr 24 tick: Layer A returned 6 deltas. Headline: TDSD-6713 NEW Keystone Settlements 3am requery (revives retired Keystone Bank Settlement Requery Apr 20 situation). Also: TDSD-6703 3DS HTTP 422 carryover, TDSD-6712 Kafka Monnify fast-close 47m, TDSD-6575 9-day stale Dominic Pending Settlement, TDSD-6555 historical cycle Completed 08:21 WAT, TDSD-6709 routine config update Resolved. Layer B: AS-4404 Highest dev task READY FOR QA. No Immediate-tier triggers.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23, 0 Layer B deltas. Dominic resolution burst 23:25–23:32 WAT Apr 23 closed TDSD-6553/TDSD-6612 (Highest)/TDSD-6688/TDSD-6706. TDSD-6711 Ecobank DCIR portal inaccessibility filed 22:32 WAT Apr 23 by Qazim — folded into briefing-2026-04-24 D1 + Ecobank — RC91 on NUS Nodes situation.
