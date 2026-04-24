---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T14:09:00Z (15:09 WAT). 15:09 WAT Apr 24 full-level tick: Layer A returned 3 new deltas in 14:09→15:09 WAT window — **TDSD-6714 Closed 14:48 WAT by Opeyemi Ahmed (Samuel Amos reporter, NEW Opeyemi-cluster-reporter); TDSD-6720 NEW PENDING SETTLEMENT 14:43 WAT by Blessing Olawale, Opeyemi direct-assigned (first Blessing-Olawale routing-bypass); TDSD-6721 NEW PENDING PAYABLE POSTING 14:53 WAT by Samson Anaele, Opeyemi direct-assigned, Awaiting Scheme Update.** All 3 Opeyemi-direct-assigned from filing — routing-bypass now spans 3 reporter clusters (Samson Anaele, Blessing Obioha+Olawale, Samuel Amos). Layer B 0. No Immediate dispatch."
updated: "2026-04-24T14:22:06Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T14:09:00Z"
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

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level tick

15:09 WAT Apr 24 tick: Layer A TDSD JQL `project = TDSD AND updated > "2026-04-24 13:09"` returned 10 deltas, of which **3 are new to the 14:09→15:09 WAT window** (remaining 7 were captured in the 14:09 WAT prior tick and reflected the older section's work). Layer B software JQL returned **0 deltas**.

**Layer A — TDSD-6721 NEW "PENDING PAYABLE POSTING" at 14:53 WAT** (situation delta on [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]])
- **Created 14:53 WAT Apr 24** by [[Samson Anaele]] (samson.anaele@moniepoint.com), Medium priority, [System] Service request. **Assignee: [[Opeyemi Ahmed]] directly from filing** (not Dominic). Status **Awaiting Scheme Update** at tick time.
- **Significance:** Second Samson-Anaele direct-Opeyemi ticket today (first was TDSD-6718 at 13:30 WAT). Confirms the Apr 24 13:30 WAT Samson→Opeyemi direct-routing was not an isolated event. **Awaiting Scheme Update status** suggests Opeyemi is in an intermediate handling phase (not closure-ready) — still Opeyemi-owned, just blocked on scheme. Contrast with TDSD-6718 which closed in 7 minutes — same reporter-to-Opeyemi path, different execution gate.
- **Disposition:** Awareness — Monnify Settlements situation delta. No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `issuetype=service_request`, `ticket_new`, `reporter=samson_anaele`, `assignee=opeyemi_ahmed_direct`, `status=awaiting_scheme_update`, `second_samson_anaele_direct_opeyemi_today`, `opeyemi_cluster_expansion`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal`, `no_immediate_dispatch`.

**Layer A — TDSD-6714 Closed 14:48 WAT by Opeyemi Ahmed** (situation delta on Monnify Settlements + NEW Opeyemi-cluster-reporter)
- **Transition:** Filed 10:11 WAT Apr 24 by [[Samuel Amos]] (amos.samuel@moniepoint.com) → **Closed 14:48 WAT Apr 24** by Opeyemi Ahmed (assignee from filing), Medium priority, "Transaction Status Update." 4h37m filing-to-Closed.
- **Significance:** **NEW Opeyemi-cluster reporter — Samuel Amos.** Previously the Opeyemi-cluster routing-bypass pattern was observed via Samson Anaele (refund status updates) and Blessing Obioha/Olawale (settlement tickets). Samuel Amos adds a third reporter cluster, expanding the cluster-reporter surface and strengthening the "Opeyemi is the de-facto owner for refund/settlement/transaction-status cluster" interpretation from evidence-baselined to evidence-saturated. Not a fast-close (4h37m vs. TDSD-6718's 7m), but still Opeyemi-cluster-closed.
- **Disposition:** Awareness — Monnify Settlements situation delta. No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `issuetype=service_request`, `status_transition=closed`, `4h37m_filing_to_closed`, `reporter=samuel_amos_new_cluster_reporter`, `assignee=opeyemi_ahmed`, `opeyemi_cluster_evidence_expansion_third_reporter_cluster`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal`, `no_immediate_dispatch`.

**Layer A — TDSD-6720 NEW "PENDING SETTLEMENT" at 14:43 WAT** (situation delta on Monnify Settlements + NEW Blessing-Olawale routing-bypass)
- **Created 14:43 WAT Apr 24** by [[Blessing Olawale]] (blessing.olawale@moniepoint.com, distinct from Blessing Obioha), Medium priority, Task issuetype. **Assignee: [[Opeyemi Ahmed]] directly from filing.** Status INITIAL REVIEW.
- **Significance:** **Blessing Olawale's first observed routing-bypass.** Previously Blessing Olawale was the reporter of [[TDSD-6553]] (SETTLEMENT PAYOUT 24-transaction batch) which was Dominic-assigned and Closed in the Apr 23 23:25 WAT Dominic resolution burst. Today's filing direct to Opeyemi signals that Blessing Olawale's workflow is now routing around Dominic for new tickets. Combined with Blessing Obioha's 11:19 WAT CC-escalation on TDSD-6684 (Apr 24), **both Blessing-reporters are now pulling Opeyemi-cluster ownership into their workflow**.
- **Disposition:** Awareness — Monnify Settlements situation delta. No Immediate dispatch.
- Factors: `source=jira`, `archetype=service_desk`, `priority=medium`, `issuetype=task`, `ticket_new`, `reporter=blessing_olawale_first_routing_bypass`, `assignee=opeyemi_ahmed_direct`, `status=initial_review`, `opeyemi_cluster_expansion_blessing_family`, `active_situation_match=monnify_settlements_tdsd6645_va_reversal`, `no_immediate_dispatch`.

**Active-situation checkpoints (zero delta this tick beyond the above):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, 35h01m Dominic silence since 04:08 WAT Apr 23.
- **TDSD-6684** (Blessing-Dominic refund) — still Awaiting Scheme Update, 36h08m Dominic silence.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no Jira updates since 22:32 WAT Apr 23 filing. 16h37m silent at 15:09 WAT.
- **TDSD-6699 + TDSD-6690** (CTO approval queue) — both still pending; no approval action observed.
- **TDSD-6713** (Keystone settlement requery cycle) — no updates since 11:59 WAT Work in progress transition; 3h10m active.
- **TDSD-6719** (Verve TTP RC06 Problem) — still Problem Investigation, no updates since filing 14:07 WAT Apr 24.
- **TDSD-6716** (NIBSS PTSA response-not-sent) — still Work in progress, no updates since 13:48 WAT Apr 24.

**Layer B — 0 deltas.**

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick (preserved summary)

14:09 WAT Apr 24 tick: Layer A returned 7 deltas — TDSD-6719 NEW verve ttp RC06 Problem + TDSD-6696 Incident Completed (incident-to-problem workflow handoff); TDSD-6718 Closed 7m after filing by Opeyemi Ahmed (fastest Opeyemi-cluster cycle); TDSD-6572 FCMB RC91 Apr 16 backlog closure 8d stale; TDSD-6716 NIBSS PTSA status-touch; TDSD-6037 Yasir Syed Ali picking up DD logging work; TDSD-6566 INITIAL REVIEW status touch. Layer B 0.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick (preserved summary)

13:09 WAT Apr 24 tick: Layer A returned 3 deltas — TDSD-6717 Paystack balance adjustment Resolved; TDSD-6718 NEW 13:30 WAT refund-status-update ticket by Samson Anaele, Opeyemi Ahmed direct-assigned (first Samson-filed ticket bypassing Dominic routing); TDSD-6037 status touch. Layer B returned 6 routine closures.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim-elevated-to-full tick (preserved summary)

12:09 WAT Apr 24 tick: Layer A returned 3 NEW deltas — TDSD-6713 Keystone INITIAL REVIEW → Work in progress 11:59 WAT (Daniel Armstrong, David Oseji assignee); TDSD-6645 Blessing 3rd-chase 11:20 WAT; TDSD-6684 Blessing 11:19 WAT first-cross-ticket-CC-to-Opeyemi-Ahmed on refund ticket.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Layer A returned 8 deltas — TDSD-6268 SETTLEMENT PROCESSING Done 11:02 WAT; TDSD-6716 NEW Incident Medium 10:18 WAT NIBSS response-not-sent; TDSD-6717 Paystack ₦1.07B balance adjustment; TDSD-6714 routine; TDSD-6715 NEW cron change; TDSD-6618 Stanbic 6-day-old RC91 backlog closure.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23, 0 Layer B deltas. Dominic resolution burst 23:25–23:32 WAT Apr 23 closed TDSD-6553/TDSD-6612 (Highest)/TDSD-6688/TDSD-6706. TDSD-6711 Ecobank DCIR portal inaccessibility filed 22:32 WAT Apr 23 by Qazim — folded into briefing-2026-04-24 D1 + Ecobank situation.
