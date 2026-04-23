---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T21:09:00Z (22:09 WAT). Skim-tick elevated to full: 21 TDSD deltas in 15:11→22:09 WAT window — Wema TDSD-6705 Completed 18:45 WAT, Access TDSD-6708 Resolved 18:51, NIBSS Dis TDSD-6710/6650 Completed 21:51/21:42, 4th Dominic Awaiting-Scheme-Update ticket (TDSD-6706). Zero P1/Highest filings despite 4 Slack P1 posts — Polaris + CoralPay ZIB Slack-only (5th data point on cross-source asymmetry tracker)."
updated: "2026-04-23T21:19:52Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T21:09:00Z"
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

### last_processed 2026-04-23T21:09:00Z (22:09 WAT) — skim-tick elevated to full on delta

22:09 WAT Apr 23 tick: **21 TDSD deltas in the 15:11→22:09 WAT window.** Oversize payload (82KB) — extracted compact summary via subagent-equivalent jq parse. Key movements:

- **TDSD-6705** Wema Bank ATS RC 91/22 20260423 — reporter/assignee Qazim Adedigba, Completed 18:45 WAT. Pairs with Slack 16:54 WAT Qazim Wema RC91/22 Ongoing post. ~2h cycle within-pattern.
- **TDSD-6708** Access Bank ATS USER CREATION ON DCIR PORTAL 20260422 — Resolved 18:51 WAT.
- **TDSD-6651** Fidelity Bank ATS RC 91 Failures 20260421 — Completed 18:45 WAT (~2d lag from file date).
- **TDSD-6710, TDSD-6650** NIBSS Disbursement downtime — both Completed 21:51/21:42 WAT by Dominic Usiabulu. Paired closures.
- **TDSD-6706** REJECTED REFUND STATUS UPDATE 23042026 — Awaiting Scheme Update, assignee Dominic. **4th Dominic-Awaiting-Scheme-Update ticket this week** (extends pattern from briefing-2026-04-23 D1 and A2). Compound data point on workflow-discipline observation.
- **TDSD-6709** UPDATE MONIEPOINT_INT INTERCHANGE CONFIG FOR F60 SINK INFO — Awaiting Scheme Update, assignee Oluwaseun Oladele (not Dominic).
- **TDSD-6707** INABILITY TO LOG INTO STAGING — INITIAL REVIEW, June Johnson, assignee Ekene Udodi. Low priority Awareness.
- **TDSD-6699** Firewall HA configuration — Awaiting implementation (carryforward from 16:11 tick).
- **TDSD-6506** EMERGENCY UPGRADE TEAMAPT FIREWALL2 — Completed 16:18 WAT.
- **TDSD-6680** PALMPAY PORTAL TRANSACTION NOT MIGRATING — Completed 16:18 WAT.
- **TDSD-6694** Paystack balance adjustment — Resolved 15:40 WAT.
- **TDSD-6562** Deploy RESYNC and MPGS Sink — Completed 15:58 WAT.
- **Zero P1/Highest priority tickets** filed in the 15:11→22:09 WAT window despite 4 Slack P1 posts — Polaris and CoralPay ZIB RC91s have NO corresponding Jira ticket at tick time (cross-source asymmetry compounds — 5th data point beyond the Apr 23 16:11 WAT codification threshold of 3).

**Cross-source asymmetry — codification tracker:** 5 data points within 24h (TDSD-6692 UBA 06:44 WAT + TDSD-6702 NIBSS DD DOWNTIME 15:23 WAT Jira-only; TDSD-6703 3DS HTTP 422 16:07 WAT Jira-only; Polaris 22:09 WAT Slack-only; CoralPay ZIB 22:09 WAT Slack-only). Directive draft deferred to briefing-2026-04-24 Decision item — the asymmetry runs in both directions (Slack-only and Jira-only).

### Tick 2026-04-23 16:11 WAT (preserved from prior note)

Full tick: Agent-delegated payload (49 items, 214KB oversize). 2 Immediate candidates reclassified to Briefing (TDSD-6702 NIBSS DD DOWNTIME self-closed in 49min silent-no-RCA, Medium → pattern-compound on [[NIBSS]] entity; TDSD-6703 3DS HTTP 422 fresh-filing, Medium → first observation under second-cycle gate). 4 Briefing-tier: TDSD-6694 Paystack Balance Resolved, AS-4995 Juliana Back office Done, TDSD-6699 Firewall HA Awaiting implementation gate-pass, TDSD-6701 TACCS DB Awaiting Scheme Update. 43 Awareness routine dev deltas (MDRS epic continuation). Cross-source asymmetry tracker codification gate CROSSED (see source-config-slack).
