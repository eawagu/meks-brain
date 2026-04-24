---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T16:09:00Z (17:09 WAT). 17:09 WAT Apr 24 full-level tick: Layer A 2 new deltas — **TDSD-6724 Review → Authorize 16:20 WAT (Ezinne Ogoke Deployment Destination Account Name Bug Fix + CBA Reversal Request Fix — 3rd deploy-approval ticket in briefing-2026-04-24 D3 queue alongside TDSD-6699 + TDSD-6690); TDSD-6723 title refined 16:53 WAT (added 'AND ROUTING' — metadata touch)**. Layer B 4 new deltas — **AS-4242 Sterling Account Switch Project Plan Epic Done 16:41 WAT (High priority milestone); ADD-4597/4598/4599 bank_reference unique constraint Tasks Done 17:03-17:06 WAT (Bukola Taiwo — duplicate-debit defense layer, cross-link to [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]])**. No Immediate dispatch."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T16:09:00Z"
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

## Notes

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level tick

17:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 15:09"` returned 6 tickets; **2 are new to the 16:09→17:09 WAT window** (4 were captured in the 16:09 WAT tick).

**Layer A — TDSD-6724 Review → Authorize 16:20 WAT** (approval-queue continuation, briefing-2026-04-24 D3 compound)
- Created 16:08 WAT Apr 24 by [[Ezinne Ogoke]], [System] Change, "Deployment Destination Account Name Bug Fix And CBA Reversal Request Fix" — title trimmed from filing ("Deployment Note For" prefix dropped). **Status transitioned Review → Authorize at 16:20 WAT**, still unassigned.
- **Significance: 3rd deployment-approval ticket in queue.** Briefing-2026-04-24 D3 flagged TDSD-6699 (Firewall HA, filed 13:32 WAT Apr 23) + TDSD-6690 (Ekene Udodi, filed 15:56 WAT Apr 22) as Emeka-approval-chain candidates. TDSD-6724 now reaches Authorize state within 12 minutes of filing — fast-track approval queue entry. Ezinne Ogoke is a regular change-filer. Approver routing not yet observable (unassigned).
- **Briefing-2026-04-25 candidate: approval-queue expansion.** If Emeka appears in TDSD-6724's approval chain (visible via email notification at next tick if routing triggers), roll up under D3 continuation.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `issuetype=change`, `status_transition=review_to_authorize_12min`, `reporter=ezinne_ogoke`, `assignee=unassigned`, `deployment_note_change`, `approval_queue_third_ticket`, `briefing_2026_04_25_candidate`, `awareness_tier`, `no_immediate_dispatch`.

**Layer A — TDSD-6723 title metadata refinement 16:53 WAT** (routine task metadata)
- Originally "Create third party for MONNIFY INTERNATIONAL ON JULIANA SWITCH BO" → refined to **"Create third party for MONNIFY INTERNATIONAL AND ROUTING ON JULIANA SWITCH BO"** (added "AND ROUTING" scope). Still Awaiting Scheme Update, [[Mustapha Ajibade]] self-assigned. No status transition. Scope clarification on routine Juliana Switch onboarding task.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `issuetype=service_request`, `no_status_transition`, `title_scope_refinement`, `juliana_switch_onboarding_monnify_international_and_routing`, `awareness_only`, `no_active_situation_match`.

**Layer B — 4 new closures (Sterling Epic milestone + ADD duplicate-defense dev work):**

- **AS-4242 "Sterling Account Switch Project Plan" Epic Done 15:41 UTC (16:41 WAT)** by [[Glory Alioha]] (assignee, June Johnson reporter, High priority). **Epic-level milestone** — Sterling Account Switch project plan now closed. Sterling separately remains on the CoralPay turned-off list (briefing-2026-04-24 context: Qazim→Daniel 23:06 WAT Apr 23 duty handover listed First Bank/Providus/Sterling as turned-off RC91 routes). The Epic closure is distinct from route-disposition — infrastructure/migration work plan vs. live route failure disposition. Not linked to [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] directly; separate workstream. Factors: `source=jira`, `archetype=software`, `project=AS`, `priority=high`, `issuetype=epic`, `status_transition=in_progress_to_done`, `sterling_account_switch_project_plan_milestone`, `assignee=glory_alioha`, `reporter=june_johnson`, `no_direct_situation_match`, `awareness_tier`.

- **ADD-4599 "Change bankReference field on transactionRequest to use UUID instead of Time base id generator" Task Done 16:06 UTC (17:06 WAT)** by [[Bukola Taiwo]]. Direct Debit dev work: switching bankReference from time-based ID → UUID prevents collision-driven duplicate-transaction risk. Factors: `source=jira`, `archetype=software`, `project=ADD`, `priority=medium`, `issuetype=task`, `status_transition=to_done`, `bank_reference_uuid_migration`, `duplicate_defense_layer`, `cross_link_candidate=monnify_atlas_nip_outwards_transit_duplicate_debit`, `awareness_tier`.

- **ADD-4598 "Add unique constrain on bank_reference column on transfer table on bank integration service" Task Done 16:05 UTC (17:05 WAT)** by Bukola Taiwo. Direct Debit dev work: DB-layer uniqueness guarantee on `bank_reference` in bank-integration transfer table — prevents duplicate row insertion on retry/race paths. Factors: `source=jira`, `archetype=software`, `project=ADD`, `priority=medium`, `issuetype=task`, `status_transition=to_done`, `bank_reference_unique_constraint_transfer`, `duplicate_defense_layer_db`, `cross_link_candidate=monnify_atlas_nip_outwards_transit_duplicate_debit`, `awareness_tier`.

- **ADD-4597 "Add a unique constrain on bank_reference column on transaction table" Task Done 16:05 UTC (17:05 WAT)** by Bukola Taiwo. Direct Debit dev work: DB-layer uniqueness guarantee on `bank_reference` in transaction table — paired with ADD-4598 to lock duplicate-defense across both transaction + transfer surfaces. Factors: `source=jira`, `archetype=software`, `project=ADD`, `priority=medium`, `issuetype=task`, `status_transition=to_done`, `bank_reference_unique_constraint_transaction`, `duplicate_defense_layer_db`, `cross_link_candidate=monnify_atlas_nip_outwards_transit_duplicate_debit`, `awareness_tier`.

**Cross-link observation (ADD bank_reference trio → Monnify Atlas duplicate-debit):** The three ADD-4597/4598/4599 closures together constitute a **DB-layer + app-layer duplicate-defense hardening** on Direct Debit bank-integration. The ADD project (AptPay Consolidated Direct Debit) is distinct from Monnify Atlas NIP Outwards Transit (duplicate-debit recurrence with ₦32.66M exposure, [[TDSD-6591]] active workstream), but the defensive pattern — unique constraints on reference fields + UUID-based identifier generation — is directly applicable to preventing duplicate-debit reoccurrences. Potential briefing-2026-04-25 Awareness: "ADD duplicate-defense hardening complete — surfacing as reference pattern for Monnify Atlas remediation discussion." Not a decision item — informational cross-link.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, **38h01m Dominic silence** since 04:08 WAT Apr 23.
- **TDSD-6684** (Blessing-Dominic refund) — still Awaiting Scheme Update, **39h08m Dominic silence**.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no Jira updates since 22:32 WAT Apr 23 filing. 18h37m silent at 17:09 WAT.
- **TDSD-6699 + TDSD-6690** (CTO approval queue) — both still pending; no approval action observed. TDSD-6724 joins queue (above). **Note:** TDSD-6699 Firewall HA filed 13:32 WAT Apr 23 = 27h37m at approval gate (exceeds config-salience 12h threshold); TDSD-6690 filed 15:56 WAT Apr 22 = 49h13m at approval gate. Both already surface in briefing-2026-04-24 D3 — same-day re-fire is noise.
- **TDSD-6713** (Keystone settlement requery cycle) — no updates.
- **TDSD-6716** (NIBSS PTSA response-not-sent) — still Work in progress, no updates since 13:48 WAT Apr 24.
- **TDSD-6719** (Verve TTP RC06 Problem) — still Problem Investigation.
- **TDSD-6720** (Blessing Olawale NEW PENDING SETTLEMENT) — still INITIAL REVIEW at tick time.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick (preserved summary)

16:09 WAT Apr 24 tick: Layer A 5 deltas — TDSD-6722 UBA RC91 fast-cycle Completed 15:56 WAT (28m, VPN-downtime proximate cause); TDSD-6721 Resolved 15:54 WAT by Opeyemi Ahmed (1h01m, Samson Anaele second Opeyemi-direct close today — 7th Opeyemi-cluster closure); TDSD-6703 3ds HTTP 422 Completed 15:59 WAT; TDSD-6680 PalmPay portal touch 16:04 WAT; TDSD-6723 NEW 15:56 WAT Mustapha Ajibade Monnify International on Juliana Switch BO (Awaiting Scheme Update); TDSD-6724 NEW 16:08 WAT Deployment Note Destination Account Name Bug Fix + CBA Reversal Request Fix (Ezinne Ogoke, Review status, unassigned). Layer B 3 routine closures. No Immediate dispatch.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level tick (preserved summary)

15:09 WAT Apr 24 tick: Layer A 3 deltas — TDSD-6714 Closed 14:48 WAT by Opeyemi (Samuel Amos NEW cluster-reporter); TDSD-6720 NEW 14:43 WAT PENDING SETTLEMENT (Blessing Olawale, Opeyemi direct-assigned); TDSD-6721 NEW 14:53 WAT PENDING PAYABLE POSTING (Samson Anaele, Opeyemi direct-assigned). Layer B 0.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick (preserved summary)

14:09 WAT Apr 24 tick: TDSD-6719 Verve TTP RC06 Problem + TDSD-6696 Completed; TDSD-6718 Closed 7m after filing by Opeyemi; TDSD-6572 FCMB backlog closure.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23. Dominic resolution burst 23:25–23:32 WAT Apr 23 closed TDSD-6553/6612/6688/6706. TDSD-6711 Ecobank DCIR portal filed 22:32 WAT Apr 23.
