---
title: source — Project Phoenix Initiative
type:
  - "source"
cssclasses:
  - "source"
source_path: Project_Phoenix_Initiative.md
created: "2026-04-13T22:17:07Z"
updated: "2026-04-13T22:17:07Z"
summary: Comprehensive Project Phoenix planning document covering CEO communications, existing TeamApt systems, proposed platform architecture, 6-cluster Phoenix structure, ownership framework, Eywa AI layer, technical specifications (Transaction Switch, CMS), One Platform migration strategy (Strangler Fig, 6 months), talent density mandate, and MFB systems blindspot analysis.
---

Compiled from Project Phoenix planning sessions, March 2026. Owner: [[Frank Atashili]] (CPO, [[TeamApt]]). Classification: Internal/Confidential.

## Key Points

### CEO Communications Timeline
- **Feb 13, 2026**: [[Tosin Eniolorunda]] announced Phoenix as structural redesign — clearer Platform/Business separation, tighter governance, higher reliability standards, talent density increase
- **Feb 16–20**: AI-native mandate — all functional managers rebuild workflows using AI ([[Eywa]]). Claude access via [[Michael Afolabi]]
- **Mar 27**: Phase 1 start confirmed — build for Nigeria, UK, Kenya. Full production in **6 months (sacrosanct)**. [[Ravi Jakhodia]] leads program

### Existing TeamApt Systems (Phoenix Foundations)
**Revenue Drivers:**
- [[Direct Debit]] (MADD, [[GoSubscribe]], SAFE) — mandate management, subscription billing
- [[Monnify]] — payment gateway (collections, disbursements, VAS)

**Enablers:**
- [[TPP]] — issuer processing, acquirer processing, switch engineering, PTSP/PTAD. CMS and Transaction Switch specs developed
- [[Domestic Switching]] — card switch, account switch, [[AptPay Suite]], PTSP/PTAD

### MFB Systems Blindspot (Critical)
[[Moniepoint MFB]] operates parallel card infrastructure NOT in any Phoenix spec:
- **Postilion/PostCard** (ACI/Interswitch) — CMS for transaction processing
- **Smart Card Process** (Interswitch) — EMV chip data prep
- **Safe Token** (Interswitch) — 3DS/OTP authentication
- **[[CMS Manager]]** (~12-person team, Femi Davies BL) — full card lifecycle. Recommended: Absorb
- **Aptent** — authorization routing. Originally TeamApt, now MFB Payments Team

Beyond cards:
- **[[Iris]]** — group-wide reconciliation (15–27B+ txn/month). ~15-18 person team. Recommended: Absorb
- **[[Atlas]]** — multi-provider transfer orchestration (~500M txn/month). ~10-15 person team. Recommended: Evaluate (strong Absorb case)

**Critical dependency**: TeamApt's Monnify uses Iris and Atlas rather than TACHA and Juliana — cross-entity entanglement Phoenix was created to eliminate.

### Proposed Platform Architecture (Frank's View)
Three layers: Core Systems (Auth Host, Tokenisation, Mandate Management, EMV ACS/Merchant Plugin), Cloud Platforms (Account/Card Switch, Directory Server, TSP, Direct Debit, Clearing & Settlement), On-Prem Platforms (Card/Account/DD FEP, Bank Integration Services).

### Official Phoenix Cluster Architecture (Tosin's Project_Phoenix_v3)
Six clusters: Business Banking, Digital Banking, [[TSP]] (foundational — all processing routes through this), Credit, Customer Platforms, Banking Operations. Plus cross-cutting Design System & UI Frameworks.

**Accountability standards**: 99.99% minimum uptime, P99 latency targets, zero tolerance for unowned incidents.

### Ownership Framework
**Principle**: TeamApt owns any platform requiring CBN switching/processing license or serving multiple group companies as shared infrastructure. Group companies own product experience layers as tenants.

TeamApt proposed ownership: Card/Account/VAS Switching & Processing, Card Issuance & Processing, Card Acceptance & Processing, CBA, Loom, Clearing & Settlement, Tokenisation, Mandate Management, EMV Authentication stack, TSP.

### Eywa Framework
Organizational nervous system — connects every function's context and AI skills. Currently powered by Claude, model-agnostic. Artifact hierarchy: Platform → Team → Capability → Feature → User Story → Acceptance Criteria. Country/entity agnostic by design. HTML format with Moniepoint brand standards.

### Technical Specifications
- **Transaction Switch** (`transaction-switch-spec.html`): ISO 8583/20022, ETM canonical model, routing engine, authorization, stand-in, BIN tables, scheme profiles, fee engine, HSM, tenant isolation, country-as-configuration
- **CMS Capability** (`CI-CM-capability.html`): Card lifecycle, EMV data prep, card product config, PIN management, card controls, hot card management, reporting

### One Platform Migration Strategy (Mar 27)
Strangler Fig pattern, 3 stages over 6 months:
- **Stage 1** (Months 1–2): Core capabilities + Kenya discovery. CBA/Cosmos (Felix Ike), TSP (Frank + Alex), Kenya discovery (Ravi/Ope/Kaushal), PM process pilot, App shells, Design components
- **Stage 2** (Months 3–5): All platforms + alpha launch. Capability decomposition → merge & development → alpha to internal users. **4-month change freeze** begins
- **Stage 3** (Month 6): Beta (50 business + 50 personal users) → commercial roll-out with Go/No-Go gate

**Key risks**: Design components slip blocking Shell work (HIGH), informal freeze workarounds (HIGH), PM artefact format not finalized (MEDIUM), Kenya late-breaking requirements (MEDIUM).

### Active Integration Action Items (Apr 1, 2026)
Four problems from Frank–Ravi sync: People (deferred), Tools (budget issue), Systems Architecture + Overlapping Systems (combined — define TSP boundary). Frank + Alex developing TSP architecture proposal.

### Talent Density
Phoenix described as "calibration moment." Primary dimensions tested: Customer Obsession, Craft. Threshold dimensions (non-negotiable): No Ego, Candor, Integrity.

### Core Belief Statement
> "TeamApt builds switching and processing systems that connect banks, fintechs, and regulators. TeamApt is not limited to building systems for a single bank."

Risk to avoid: treating TeamApt as Moniepoint MFB's technology arm rather than network infrastructure business.

## Contradictions and Tensions
- Frank's original framing ("extend and formalize, not rebuild") vs. Alex's endorsed position (TSP as new build from scratch — composable FinOps platform)
- TeamApt's pre-existing platformized architecture vs. Phoenix treating it as group-wide transformation requiring new builds
- MFB parallel infrastructure creates duplication risk — Phoenix platforms could launch alongside rather than replacing existing MFB systems

## Sources
Project Phoenix planning sessions (Claude sessions), Ravi's One Platform Migration Plan, Tosin's Project_Phoenix_v3, Phoenix Stage 1 Kick-off (Mar 27), PM Catch-up prep (Mar 24). Last updated Mar 31, 2026.