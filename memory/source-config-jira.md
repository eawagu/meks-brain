---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T06:10:00Z (07:10 WAT). 07:10 WAT Apr 24 zero-delta tick: Layer A TDSD + Layer B software both returned 0. Post-Dominic-resolution-burst quiet. TDSD-6645 unchanged at 04:08 WAT Apr 23 attribution-transfer; TDSD-6711 unchanged at 22:32 WAT Apr 23 Work In Progress."
updated: "2026-04-24T06:17:59Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T06:10:00Z"
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

### Tick 2026-04-23 16:11 WAT (preserved from prior note)

Full tick: Agent-delegated payload (49 items, 214KB oversize). 2 Immediate candidates reclassified to Briefing (TDSD-6702 NIBSS DD DOWNTIME self-closed in 49min silent-no-RCA, Medium → pattern-compound on [[NIBSS]] entity; TDSD-6703 3DS HTTP 422 fresh-filing, Medium → first observation under second-cycle gate). 4 Briefing-tier: TDSD-6694 Paystack Balance Resolved, AS-4995 Juliana Back office Done, TDSD-6699 Firewall HA Awaiting implementation gate-pass, TDSD-6701 TACCS DB Awaiting Scheme Update. 43 Awareness routine dev deltas (MDRS epic continuation). Cross-source asymmetry tracker codification gate CROSSED (see source-config-slack).
