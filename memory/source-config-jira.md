---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T17:09:00Z (18:09 WAT). 18:09 WAT Apr 24 full-level tick: 3 genuinely new deltas (client-side UTC filter) — **TDSD-6713 Work in progress → Completed 17:43 WAT by David Oseji** (Keystone settlement Apr 24 cycle closed, 9h22m filing-to-close, second consecutive same-day ~9h close matching TDSD-6633 cadence; [[Keystone Bank — Settlement Requery Apr 20]] status → resolving); **ADD-4429 + ADD-4426 Bug Done 17:11 WAT / 17:10 WAT by Ezinne Igbinoba** (Direct Debit description UX fixes — merchant-name + \"To\" prefix; Awareness-only, no active-situation match). No Immediate dispatch."
updated: "2026-04-24T17:18:36Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T17:09:00Z"
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

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > "<last_processed>" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in ("ADD","AS",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > "<last_processed>" AND (priority in (Highest, Blocker, Critical) OR status changed FROM ("Open","In Progress") TO ("Resolved","Done","Completed","Escalated"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors.
4. **Client-side UTC filter** — Jira JQL interprets the `"YYYY-MM-DD HH:MM"` datetime literal in the user's configured timezone (Africa/Lagos = WAT). Since `last_processed` is stored in UTC (`YYYY-MM-DDTHH:MM:SSZ`), the server-side JQL filter using the UTC hour as-is is effectively 1h lax — it lets through updates from the hour before `last_processed`. Therefore the heartbeat MUST apply a client-side filter: convert each returned issue's `fields.updated` to UTC and compare to `last_processed`; discard any issue whose UTC-updated time ≤ `last_processed`.

## Notes

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level tick

18:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 16:09"` returned 3 tickets; client-side UTC filter (>2026-04-24T16:09:00Z) yields **1 genuinely new**. Layer B scoped JQL returned 6 tickets; client-side filter yields **2 genuinely new**.

**Layer A — TDSD-6713 Keystone settlements Apr 24 cycle Completed 17:43 WAT** (active-situation resolution, same-day ~9h close cadence)
- Transition: Work in progress → Completed at 2026-04-24T16:43:55Z (17:43 WAT) by [[David Oseji]] (assignee). Medium, [System] Incident, reporter [[Daniel Armstrong]].
- **Cycle time 9h22m** from filing 08:21 WAT — within 22min of TDSD-6633 cadence (9h0m filing-to-close) predicted at the 12:09 WAT tick. Second consecutive same-day ~9h close on Keystone settlement-layer cycle.
- **Situation update applied this tick** — [[Keystone Bank — Settlement Requery Apr 20]] status transitioned `developing` → `resolving`. Retirement 72h window: expires 17:43 WAT Apr 27. Retirement at briefing-2026-04-28 compose if no new Keystone settlement-layer cycle surfaces in that window.
- Briefing-2026-04-25 Awareness candidate: pattern-holding signal (cadence-prediction tracked, second same-day ~9h close, active-situation status transition).
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `issuetype=incident`, `status_transition=wip_to_completed`, `assignee=david_oseji`, `reporter=daniel_armstrong`, `active_situation_match=keystone_bank_settlement_requery_apr_20`, `cycle_time=9h22m`, `cadence_prediction_tracked`, `second_consecutive_same_day_close`, `situation_status_transition_developing_to_resolving`, `retirement_72h_window_set_2026_04_27`, `briefing_2026_04_25_awareness_pattern_holding`, `no_immediate_dispatch`.

**Layer B — ADD-4429 DD description cancel-button bug fix Done 17:11 WAT** (routine DD dev closure)
- Task Done at 2026-04-24T16:11:06Z (17:11 WAT) by [[Ebenezer Igbinoba]] (assignee). Medium, Bug, reporter [[Fatai Ibrahim]]. Summary: "Replace merchant with the actual merchant name when user hits the cancel button on the description."
- UX-layer bug on Direct Debit description string. No active-situation match. Paired with ADD-4426 (same commit batch) — two merchant-name description UX fixes closed within 1 minute of each other. Awareness-only.
- Factors: `source=jira`, `archetype=software`, `project=ADD`, `priority=medium`, `issuetype=bug`, `status_transition=to_done`, `dd_description_ux_fix`, `paired_closure_add_4426`, `no_active_situation_match`, `awareness_tier`.

**Layer B — ADD-4426 DD "Missing To before the merchant name" Bug Done 17:10 WAT** (routine DD dev closure)
- Task Done at 2026-04-24T16:10:43Z (17:10 WAT) by [[Ebenezer Igbinoba]] (assignee). Medium, Bug, reporter [[Fatai Ibrahim]]. Summary: "Missing To before the merchant name."
- UX-layer fix on DD description string prefix — paired with ADD-4429 (same closure batch). Awareness-only.
- Factors: `source=jira`, `archetype=software`, `project=ADD`, `priority=medium`, `issuetype=bug`, `status_transition=to_done`, `dd_description_ux_fix`, `paired_closure_add_4429`, `no_active_situation_match`, `awareness_tier`.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, **39h01m Dominic silence** since 04:08 WAT Apr 23.
- **TDSD-6684** (Blessing-Dominic refund) — still Awaiting Scheme Update, **40h08m Dominic silence**.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no Jira updates since 22:32 WAT Apr 23 filing. 19h37m silent at 18:09 WAT.
- **TDSD-6699 + TDSD-6690** (CTO approval queue) — both still pending; TDSD-6724 also still at Authorize. TDSD-6699 28h37m at approval gate; TDSD-6690 50h13m at approval gate; TDSD-6724 ~1h49m at Authorize. All surface in briefing-2026-04-24 D3; same-day re-fire is noise.
- **TDSD-6716** (NIBSS PTSA response-not-sent) — still Work in progress.
- **TDSD-6719** (Verve TTP RC06 Problem) — still Problem Investigation.
- **TDSD-6720** (Blessing Olawale NEW PENDING SETTLEMENT) — still INITIAL REVIEW.
- **TDSD-6723** (Mustapha Monnify International routing on Juliana) — still Awaiting Scheme Update.

No Immediate dispatch this tick.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level tick (preserved summary)

17:09 WAT Apr 24 tick: Layer A TDSD JQL returned 6 tickets; 2 new to the 16:09→17:09 WAT window — TDSD-6724 Review → Authorize 16:20 WAT (Ezinne Ogoke Deployment Destination Account Name + CBA Reversal fix — 3rd deploy-approval in briefing-2026-04-24 D3 queue); TDSD-6723 title refined to add "AND ROUTING" (metadata touch). Layer B 4 new closures — AS-4242 Sterling Account Switch Project Plan Epic Done 16:41 WAT (High priority milestone); ADD-4597/4598/4599 bank_reference unique constraint Tasks Done 17:03-17:06 WAT (Bukola Taiwo — duplicate-defense hardening cross-linked to Monnify Atlas duplicate-debit).

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick (preserved summary)

16:09 WAT Apr 24 tick: Layer A 5 deltas — TDSD-6722 UBA RC91 fast-cycle Completed 15:56 WAT (28m, VPN-downtime proximate cause); TDSD-6721 Resolved 15:54 WAT by Opeyemi Ahmed; TDSD-6703 3ds HTTP 422 Completed 15:59 WAT; TDSD-6680 PalmPay portal touch; TDSD-6723 NEW; TDSD-6724 NEW. Layer B 3 routine closures.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level tick (preserved summary)

15:09 WAT Apr 24 tick: Layer A 3 deltas — TDSD-6714 Closed by Opeyemi (Samuel Amos cluster-reporter); TDSD-6720 NEW PENDING SETTLEMENT (Blessing Olawale, Opeyemi direct-assigned); TDSD-6721 NEW PENDING PAYABLE POSTING (Samson Anaele, Opeyemi direct-assigned). Layer B 0.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick (preserved summary)

14:09 WAT Apr 24 tick: TDSD-6719 Verve TTP RC06 Problem + TDSD-6696 Completed; TDSD-6718 Closed 7m after filing by Opeyemi; TDSD-6572 FCMB backlog closure.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23. Dominic resolution burst 23:25–23:32 WAT Apr 23 closed TDSD-6553/6612/6688/6706. TDSD-6711 Ecobank DCIR portal filed 22:32 WAT Apr 23.
