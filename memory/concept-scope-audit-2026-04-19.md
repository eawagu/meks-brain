---
title: Concept Scope Audit - 2026-04-19
type:
  - "config"
cssclasses:
  - "config"
audit_date: 2026-04-19
convention_ref: Concept Scope and Disambiguation Convention
created: "2026-04-19T15:54:54Z"
updated: "2026-04-19T15:54:54Z"
summary: Retroactive Phase 1 audit record — ~50 concept pages processed under Concept Scope and Disambiguation Convention Rules 1, 2, 7, 12 on 2026-04-19.
---

## Overview

Retroactive audit run against the [[Concept Scope and Disambiguation Convention]] on 2026-04-19 during a single session. Applied Rules 1, 2, 7, and 12 across ~50 concept pages that predated the convention.

## Scope

Phase 1 targeted-search audit, executed across 5 search batches covering:
- Moniepoint-scoped concept pages missing `Moniepoint Group` prefix (Rule 1/Rule 2)
- TeamApt-scoped concept pages missing `TeamApt` prefix (Rule 1)
- Hybrid pages with mixed generic + entity content (Rule 12 split)
- Rule 7 alias violations on entity-prefixed pages

## Execution Approach

Hybrid auto-approval — mechanical Rule 1/Rule 2 renames auto-executed, Rule 12 hybrid splits auto-executed under user authorization, ambiguous-scope calls flagged inline.

## Outcomes

### Rule 1/Rule 2 Pure Renames (Moniepoint → Moniepoint Group)

Originals preserved as stubs per Rule 12 stub pattern. New entity-prefixed page is the canonical target:

- [[Moniepoint OKR Process]] → [[Moniepoint Group OKR Process]]
- [[Organizational Framework]] → [[Moniepoint Group Organizational Framework]]
- [[Seven Management Principles]] → [[Moniepoint Group Seven Management Principles]]
- [[OKR Presentation Standard]] → [[Moniepoint Group OKR Presentation Standard]]
- [[Project Mapo]] → [[Moniepoint Group Project Mapo]]
- [[Project Moose]] → [[Moniepoint Group Project Moose]]
- [[Monthly Performance Reviews]] → [[Moniepoint Group Monthly Performance Reviews]]
- [[Moniepoint Hiring Process]] → [[Moniepoint Group Hiring Process]]
- [[Personalization Studio]] → [[Moniepoint Group Personalization Studio]]
- [[MPR Minus Framework]] → [[Moniepoint Group MPR Minus Framework]]
- [[Capacity-Based Allocation Model]] → [[Moniepoint Group Capacity-Based Allocation Model]]
- [[Employer Employee Banking]] → [[Moniepoint Group Employer Employee Banking]]
- [[Competitor Demarketing]] → [[Moniepoint Group Competitor Demarketing]]
- [[Customer Risk Rating System]] → [[Moniepoint Group Customer Risk Rating System]]
- [[Non-Performing Loan Management]] → [[Moniepoint Group Non-Performing Loan Management]]
- [[Field Credit Officer Model]] → [[Moniepoint Group Field Credit Officer Model]]
- [[Consumer Lending Strategy]] → [[Moniepoint Group Consumer Lending Strategy]]
- [[Big-Ticket Lending Strategy]] → [[Moniepoint Group Big-Ticket Lending Strategy]]
- [[Analyst Games]] → [[Moniepoint Group Analyst Games]]
- [[Platformization]] → [[Moniepoint Group Platformization]]
- [[ESG Risk Management]] → [[Moniepoint Group ESG Risk Management]]
- [[Affordability Model]] → [[Moniepoint Group Affordability Model]]
- [[Device Cannibalization Risk]] → [[Moniepoint Group Device Cannibalization Risk]]
- [[Moniepoint 2024 Fraud Reduction]] → [[Moniepoint Group 2024 Fraud Reduction]]
- [[National Microfinance License]] → [[Moniepoint Group National Microfinance License]]
- [[Money Bonds]] → [[Moniepoint Group Money Bonds]]
- [[CEO Gazette]] → [[Moniepoint Group CEO Gazette]]
- [[Transaction Switching Platform]] → [[Moniepoint Group Transaction Switching Platform]]
- [[MoneyBot]] → [[Moniepoint Group MoneyBot]]
- [[Pay with Moneypoint]] → [[Moniepoint Group Pay with Moneypoint]]

### Rule 1 Pure Renames (generic → TeamApt)

- [[Bank Integration]] → [[TeamApt Bank Integration]]
- [[SLA Management]] → [[TeamApt SLA Management]]
- [[Incident Remediation]] → [[TeamApt Incident Remediation]]
- [[Digital Payment Infrastructure]] → [[TeamApt Digital Payment Infrastructure]]
- [[Process Automation]] → [[TeamApt Process Automation]]
- [[T-Switch]] → [[TeamApt T-Switch]]
- [[Banking Partnerships]] → [[TeamApt Banking Partnerships Concept]] *("Concept" suffix to avoid collision with existing source page [[TeamApt Banking Partnerships]] — naming refinement pending)*
- [[Resource Allocation]] → [[TeamApt Resource Allocation]]

### Rule 12 Hybrid Splits (generic retained + entity-prefixed created)

Each row: generic page preserved as the industry concept; new entity-prefixed page holds the entity-specific content. Both canonical.

- [[MECE Framework]] (generic) + [[Moniepoint Group MECE Adoption]]
- [[ICOFA]] (generic) + [[Moniepoint Group ICOFA Adoption]]
- [[UBO Register]] (generic) + [[Moniepoint Group UBO Register]]
- [[Performance Management]] (generic) + [[Moniepoint Group Performance Management]]
- [[Collections-Only Processing]] (generic) + [[TeamApt Collections-Only Processing]]
- [[AI-Driven Development]] (generic) + [[TeamApt AI-Driven Development]]
- [[Cloud Cost Optimization]] (generic) + [[TeamApt Cloud Cost Optimization]]
- [[AWS Outposts]] (generic) + [[TeamApt AWS Outposts]]
- [[Data Centre Colocation]] (generic) + [[TeamApt Data Centre Colocation]]
- [[ITSM]] (generic) + [[TeamApt ITSM Adoption]]
- [[Clearing and Settlement]] (generic) + [[TeamApt Clearing and Settlement]]
- [[Organizational Restructuring]] (generic) + [[TeamApt Organizational Restructuring]]
- [[CTO Role Scope]] (generic) + [[TeamApt CTO Role Scope]]
- [[Third Party Processing]] (generic) + [[TeamApt Third Party Processing]]
- [[Cybersecurity]] (generic) + [[TeamApt Cybersecurity]]
- [[Regulatory Compliance]] (generic) + [[TeamApt Regulatory Compliance]]
- [[OKR Planning]] (generic) + [[Moniepoint Group OKR Process]] *(existing entity page; alias `OKR Process` removed from it per Rule 7)*
- [[Issuer Processing]] (generic) + [[Moniepoint Group Issuer Processing]]

### Rule 7 Alias Violations Fixed

- [[Moniepoint Group OKR Process]] — `OKR Process` alias removed (violated Rule 7 for entity-prefixed page).

### Intentionally Unchanged (Rule 4 Legitimate Generics)

Generic concept pages with legitimate bare-generic usage, often with example cross-references:

- [[Job Leveling]], [[Career Ladder]]
- [[Card Issuance]], [[Card Scheme Integration]]
- [[Platform Engineering]], [[Agentic Systems]]
- [[Tokenisation]], [[Issuer Hierarchy]], [[Stand-in Processing]], [[Deployment Model]]

## Known Follow-ups

### Pending refinements
- **[[TeamApt Banking Partnerships Concept]]** naming — "Concept" suffix is awkward. Options: rename source page with `source` prefix, or rename concept page. Decide at next brain-maintenance session.
- **[[Moniepoint Group CEO Gazette]] scope interpretation** — interpreted as Group-level because Tosin is Group CEO. If the gazette is actually TeamApt-scoped (i.e., Tosin authoring from TeamApt CEO capacity, which he also holds), re-scope to [[TeamApt CEO Gazette]].
- **Orphan pages** — many new entity-prefixed pages report `orphan: true` because incoming wikilinks still point to stubs. Lint Signal C will surface these for cleanup as triage progresses.

### Not addressed in this audit
- **Lint implementation for Rules 8/9/10** — heartbeat lint code changes required to operationalize convention enforcement. Engineering work pending.
- **30-day scheduled cleanup forcing function** — not set up. Rationale: once Rule 8 lint is implemented, violations surface automatically; periodic review becomes redundant.

## Meta

- Audit completed in a single Phase A session under hybrid auto-approval (user approval #1 on the choice to auto-approve; batched execution with summary reporting).
- Rule 12 forced the key judgment call: when is body content entity-scoped vs. generic? Decision rule applied: if content references a specific named entity's adoption, implementation, people, or deadlines → entity-scoped; if content defines the concept in industry-standard terms → generic. Borderline cases resolved in favor of splitting (preserving generic) because reversing a split is easier than reversing a rename.