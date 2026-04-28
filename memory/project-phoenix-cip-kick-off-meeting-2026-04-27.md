---
title: Project Phoenix - CI&P kick off meeting - 2026-04-27
type:
  - "source"
cssclasses:
  - "source"
source_path: Project Phoenix_ CI&P kick off meeting - 2026_04_27 14_59 WAT - Notes by Gemini.md
retention_label: postgres
retention_rationale: Strategic initiative kick-off establishing scope, named workstream owners, decision dates, target completion (Q3 2026), and migration approach (strangler pattern from Postillion); future retrieval likely as the canonical reference for Project Phoenix charter and Phase One scope.
meeting_date: 2026-04-27
meeting_owner: tracy.ojaigho@teamapt.com
drive_file_id: 1PBflLd_AIlfnYturnka3oBpRjZmHa69XtxJTBJH2hfk
drive_url: "https://docs.google.com/document/d/1PBflLd_AIlfnYturnka3oBpRjZmHa69XtxJTBJH2hfk/edit"
created: "2026-04-28T16:35:33Z"
updated: "2026-04-28T16:35:33Z"
summary: Kickoff meeting for Project Phoenix — a centralized Card Issuance and Processing (CI&P) platform initiative consolidating existing distributed card capabilities (Postillion + in-house + partner integrations) into Operations / IP / Development domains via a strangler-pattern migration, targeted for Q3 2026 completion, with a dedicated strike team leading Phase One.
---

## Summary

Kick-off meeting for [[Project Phoenix]] — a strategic initiative to centralize [[TeamApt]]'s/[[Moniepoint]]'s card capabilities into a single unified [[Card Issuance and Processing]] platform. The current distributed architecture (external [[Postillion]] processor + in-house systems + partner integrations) is being consolidated into three domains: Operations, Intellectual Property, and Development. Migration uses a [[Strangler Pattern]] approach with a dedicated [[Strike Team]] leading Phase One. Target completion is **end of Q3 2026**. Three ALIGNED decisions: hiring plan to prioritize AI/automation adoption; platform-migration target end-of-Q3 2026 with quarterly milestones; strike team to lead Phase One with composition finalized this week. Hosted by [[Tracy Ojaigho]].

## Key Points

### ALIGNED decisions

- **Hiring strategy balanced with AI adoption** — the hiring plan for the new platform expansion will prioritize adoption of AI and automation capabilities in line with strategic goals.
- **Platform migration target — end of Q3 2026** — quarterly milestone deliverables defined: Phase One completion (Q2), Phase Two expansion (Q3), production cutover at Q3 end.
- **Strike team deployment for Phase One** — Phase One led by a dedicated strike team; composition and accountability to be finalized this week.

### Project scope and architecture

- **Project Phoenix overview** — centralizes card platform capabilities currently distributed across multiple infrastructure entities; reduces operational overhead while establishing a unified card issuance and processing architecture.
- **Current state** — multiple independent card-processing environments via [[Postillion]] (external processor), in-house developed systems, and partner integrations. Distributed architecture leads to redundancy, increased operational complexity, and limited scalability.
- **Target state** — three primary domains:
  - **Operations** — transaction processing, settlement, reporting.
  - **Intellectual Property** — product definitions, pricing, scheme rules.
  - **Development** — platform engineering, infrastructure, deployment automation.
- **Market expansion context** — platform serves multiple global markets including emerging markets in Africa; supports debit, credit, and prepaid card products across diverse regulatory environments.
- **[[Strangler Pattern]] approach** — build parallel capabilities in the new platform while keeping existing Postillion in production; gradually route external traffic to the new platform; legacy decommissioned at the end.

### Phase One

- **Objectives** — establish core transaction processing, settlement mechanisms, and reporting infrastructure.
- **Success criteria** — process **10% of production volume** with **zero tolerance** for data loss or transaction discrepancies.
- **Strike team composition** — balances technical expertise with domain knowledge across operations, infrastructure, and product management.

### Cross-cutting workstreams

- **AI and automation integration** — hiring roadmap integrates AI/automation into platform engineering and operations teams; new roles in MLOps, data engineering, and automation testing.
- **Regulatory and compliance** — must comply with regulations across multiple jurisdictions: African banking regulations, [[PCI-DSS]], local payment scheme rules.
- **Governance structure** — owned by [[Tracy Ojaigho]]: steering committee for strategic decisions, working groups by domain (operations, infrastructure, product), and escalation protocols.
- **Change management** — owned by [[Olufemi Davies]]: organizational restructuring, team transitions, and stakeholder communication strategies.
- **Stakeholder coordination** — weekly sync meetings going forward across functional heads on governance, timelines, and resource allocation.

## Next Steps (Action Items)

- [[[Nadeem Abbas]]] **Define strike team** — finalize composition and obtain stakeholder alignment on deployment.
- [[[Tracy Ojaigho]]] **Project governance** — set up steering committee, working groups, and escalation protocols.
- [[[Damilola Oyediran]]] **Hiring roadmap** — develop detailed hiring roadmap aligned with platform expansion phasing (and AI/automation priority).
- [[[Elishma Nwobodo]]] **Technology roadmap** — develop comprehensive technology roadmap with prioritized capability buildout (in-house vs. partnership).
- [[[Emeka Awagu]]] **Infrastructure assessment** — assess current infrastructure and requirements for platform consolidation.
- [[[Ketan Dhamasana]]] **Regulatory alignment** — ensure regulatory compliance across applicable jurisdictions.
- [[[Olufemi Davies]]] **Change management** — develop and execute change management plan for organizational restructuring.

## Entities Mentioned

- People: [[Elishma Nwobodo]], [[Nadeem Abbas]], [[Emeka Awagu]], [[Damilola Oyediran]], [[Tracy Ojaigho]], [[Nitish Chand]], [[Ketan Dhamasana]], [[Olufemi Davies]]
- Initiative: [[Project Phoenix]]
- Legacy system: [[Postillion]]
- Org context: [[TeamApt]], [[Moniepoint]]

## Concepts

- [[Card Issuance and Processing]]
- [[Strangler Pattern]]
- [[Strike Team]]
- [[Centralized Card Platform]]
- [[AI and Automation Adoption]]
- [[PCI-DSS]]
- [[Phase One Migration]]
- [[Governance Structure]]
- [[Change Management]]