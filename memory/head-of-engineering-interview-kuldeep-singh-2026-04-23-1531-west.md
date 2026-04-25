---
title: "Head of Engineering Interview - Kuldeep Singh - 2026-04-23 15:31 WEST"
type:
  - "source"
cssclasses:
  - "source"
source_path: Interview for Head of Engineering (VP+ level) Position at Moniepoint - 2026_04_23 15_31 WEST - Notes by Gemini.md
retention_label: postgres
retention_rationale: "Hiring interview transcript with detailed candidate technical depth evaluation — Kuldeep Singh's career trajectory (RBS, Deutsche Bank, Gojek, MediBuddy), specific technical war stories (RBS ODC over-engineering, Gojek stale-data incident), architectural philosophy (PostgreSQL-only, TDD, distributed DevOps three-rules), and 90-day plan for underperforming team. Future retrieval likely — referenced by hiring deliberation, comparison across candidates, and downstream onboarding if hired."
created: "2026-04-25T12:10:09Z"
updated: "2026-04-25T12:10:09Z"
summary: "2026-04-23 15:31 WEST first-round Head of Engineering (VP+) interview at Moniepoint with candidate Kuldeep Singh (SVP at MediBuddy; 22 years experience: RBS \u2192 Deutsche Bank \u2192 Gojek \u2192 MediBuddy). Interviewers: Adegoke Obasa, Emeka Awagu, Chris Purkis. Topics: career trajectory, system design (RBS ODC over-engineering retrospective), Gojek stale-data production incident, distributed DevOps three-rules from Deutsche Bank PeopleSoft\u2192Workday migration, cross-border payment design framework, 90-day plan for underperforming engineering team."
---

## Summary

First-round Head of Engineering (VP+ level) interview at [[Moniepoint]] with candidate **[[Kuldeep Singh]]** on 2026-04-23 15:31 WEST. Interviewers: [[Adegoke Obasa]] (Engineering Lead, Onboarding/Identity/Access at Moniepoint), [[Emeka Awagu]] (TeamApt CTO), [[Chris Purkis]] (recruiting). The candidate is currently SVP at MediBuddy, with 22 years of experience across RBS, Deutsche Bank, Gojek, and MediBuddy.

## Candidate Background

- **22 years** technical experience; strongly hands-on preference.
- Early career: service-based organizations.
- Unsuccessful 3D-design startup \u2014 lesson: difficulty of completing 100% vs 85%.
- **RBS (2007 onwards)** \u2014 strong proponent of [[Test-Driven Development]]; learned to design software meaningfully.
- **Deutsche Bank (5 years)** \u2014 architect on PeopleSoft\u2192Workday migration; managed distributed dev team across 20+ countries.
- **Gojek** \u2014 led 4 platforms including the central marketplace matching driver supply with demand.
- **MediBuddy (current)** \u2014 SVP, ~150 reports (100 pure tech, 20 infra/networking, 12 TPMs, rest in product). 2,000-person company, ~$20M revenue.

## Technical Discussion

### System Design \u2014 RBS Operational Data Cache (ODC) (2007\u20132014)

- **Problem**: 2008 subprime crisis \u2014 CEO could not get a consistent answer on RBS's financial exposure across risk/finance/operations.
- **Solution**: Centralized in-memory data store using **Oracle Coherence** (data grid). 3 TB of RAM in 2007.
- **Vision**: Move logic, not data \u2014 centralize all data; applications submit requirements via SQL-like syntax.
- **Domain modeling + query optimizer** were Kuldeep's main work.
- **Adoption challenge**: getting 100+ systems to migrate.
- **Cross-dimension query problem** (e.g., trades-by-counterparty when modeled trade-first): solved via collocated fields.
- **Major learning**: After European crisis, business shrunk 90% \u2014 ODC became a "white elephant" over-engineered for new scale. **Self-aware retrospective**: would not build it the same way today.
- **Discipline established**: 56,000 test cases run before deployment; database changes treated as code.
- **Production failure**: accidental prod deployment during working day (instead of UAT) due to over-permissive privileges \u2014 2 months of compliance work to prevent recurrence.

### Database Philosophy

- **PostgreSQL-only** at MediBuddy \u2014 explicit preference to avoid fragmentation and complexity.
- "Modern RDBMS with JSON support and inherent schema handling is superior to NoSQL."
- 700-GB index issue at RBS strengthened aversion to NoSQL.

### Production Incident \u2014 Gojek Stale Data

- CEO's ride orders not being accepted by drivers.
- Standard dashboards (driver availability, system funnel) all looked fine.
- **Root cause**: Spark pipeline degradation \u2192 ML pricing system ingesting features 2 hours late. System thought it was 2:00 PM (sunny) when actually 5:00 PM (raining) \u2192 prices too low for drivers to accept.
- **Fix**: feature staleness metrics + temporal fallback \u2014 if data >10\u201315 min stale, short-circuit to a reliable fallback mechanism.
- **Compute capacity** beefed up + guardrails for spiky retry-traffic during anomalies.
- **Aftermath**: started writing on **"economies of software"** for developing ecosystems \u2014 cost economics require different engineering practices than developed-world default.

### Distributed DevOps \u2014 Three Rules (Deutsche Bank PeopleSoft\u2192Workday)

1. All changes committed to master + deployed to dev environment **daily** (manual or automated).
2. Promotion between environments must be a **single-click action** \u2014 forced Infrastructure-as-Code adoption (including DB scripts).
3. **All integration testing happens only in UAT** \u2014 fed core employee data from PeopleSoft.
- Big-bang rollout date set 2 years in advance by board; required freezing the entire Deutsche Bank employee ecosystem for 3 months to stabilize UAT.

### Cross-Border Payment Design (Hypothetical)

Candidate's framework when [[Adegoke Obasa]] posed a hypothetical:

1. **Domain understanding** \u2014 deeply explore boundaries; direct currency conversion rarely happens \u2014 typically intermediate currency.
2. **Manual stitching** \u2014 hand-build a payment flow with existing APIs to fully understand the use case.
3. **Functional + non-functional requirements** \u2014 NFRs heavily on regulatory compliance, evidence, audit trails.
4. **System skeleton** \u2014 layers, intermediate currencies, integrations, dependencies (rate sources).
5. **Engineering metrics**:
   - Completion Rate (correctness): 99.9% / 99.99% SLOs
   - Availability: API SLOs
   - Latency: end-to-end (e.g., 1s) + subsystem (99th percentile within 100ms)
   - Throughput: monitor 85th, 95th, 99th percentiles to detect degradation

### 90-Day Plan for Underperforming Team

Scenario: 80-engineer dept, 30 microservices, slow delivery, 98% availability.

- **First 90 days = understanding only**. Simple fixes are rare in large orgs.
- Listening sessions with key people; uncover influential individuals not on the contact list.
- Ask "how can I help" rather than offering solutions.
- Build a mental map of technical operations like a gated delivery pipeline.
- Bring **stakeholder management** as an engineering skill set.
- Establish "principles of engineering" \u2014 shared ethical floor; openly discussed.
- Core principle example: **"unplanned work is the enemy of planned work"** \u2014 housekeeping and automation must be factored into estimates.

### Strategies for Improving Availability (98% \u2192 higher)

- Make availability number **highly visible and trustworthy** to whole team.
- Layer visibility \u2014 break aggregate into 10 underlying-system components; identify problematic flows.
- **Diagnostic questions over directives** \u2014 e.g., "why is the cache not highly available?" "is DB slow due to poor indexes?"
- **Hold back the solution** so the idea (e.g., Redis cluster vs. single node) comes from the team \u2014 strengthens ownership.
- **RCA on every SLO breach**; leader actively participates to signal reliability priority.

## Decisions / Next Steps

- [[Adegoke Obasa]] to write post-meeting report; share with the team.
- [[Chris Purkis]] to update Kuldeep on next steps.

## Entities Mentioned

People: [[Kuldeep Singh]] (candidate), [[Adegoke Obasa]], [[Emeka Awagu]], [[Chris Purkis]]

External companies: [[Royal Bank of Scotland]], [[Deutsche Bank]], [[Gojek]], [[MediBuddy]], [[Oracle Coherence]], [[PeopleSoft]], [[Workday]]

System: [[Gemini]]

## Concepts

- [[Head of Engineering hiring]]
- [[Test-Driven Development]]
- [[Feature staleness metrics]]
- [[Economies of software for developing ecosystems]]
- [[Distributed DevOps three-rules]]
- [[90-day plan for underperforming team]]
- [[Diagnostic-questions-over-directives leadership]]
- [[Availability visibility layering]]
