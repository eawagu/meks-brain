---
title: source — Platform Strategy and Vision
type:
  - "source"
cssclasses:
  - "source"
source_path: Platform_Strategy_and_Vision.md
created: "2026-04-13T22:17:52Z"
updated: "2026-04-13T22:17:52Z"
summary: "Platform Strategy & Vision document defining Phoenix's \"One Platform Many Markets\" philosophy, capability-based composition architecture, technical architecture rules (microservices, API-first, event-driven, config-driven), global expansion strategy (Nigeria/UK/Kenya), migration strategy (Strangler Fig with dual-running), governance framework (ARB), compliance framework, and KPIs."
---

Platform Strategy & Vision document for [[Project Phoenix]]. Version 1.0, March 2026. Owner: Chief Architect, [[Moniepoint]]. Classification: Internal — Strategic.

## Key Points

### Strategic Vision: "One Platform, Many Markets"
- Unified platform architecture as common backbone
- Market-specific products built by configuring/composing platform capabilities
- No code duplication across markets
- Configuration-driven adaptation, not code-based market forks
- Key tenets: capabilities as unit of reuse, platform teams own capabilities with SLAs, market teams consume, architecture-first, global-first/market-adapted

### Capability-Based Composition Architecture
Four-level hierarchy: Platform Cluster → Platform → Capability → Feature. Each capability is the smallest deployable, reusable unit with defined owner, API contracts, SLAs, docs, dependencies, config points, versioning, observability, and testing.

**Capability Maturity Levels**: Experimental → Beta → Production → Deprecated

### Identified Core Platforms
1. **Merchant Acquiring** — terminal onboarding, transaction processing, settlement, reporting
2. **Digital Banking** — account opening, transactions, transfers (Nigeria, UK, Kenya)
3. **Business Banking** — business accounts, invoicing, virtual accounts, liquidity (all markets)
4. **Card Issuance** — production, personalization, activation, lifecycle (Nigeria, UK)
5. **Payment Processing** — routing, clearing, settlement, reconciliation (all markets)

### Platform Clustering
- Digital Banking Cluster (Wallet, Savings, Lending)
- Merchant & Payments Cluster (Acquiring, Processing, Settlement)
- Business Banking Cluster (Accounts, Payments, Treasury)
- Cards & Instruments Cluster (Issuance, Prepaid)

### Technical Architecture Rules (Immutable)
1. **Microservices-Based** — independently deployable, database per service, async by default
2. **API-First** — all integration via APIs, OpenAPI/Swagger mandatory, REST for sync, gRPC for high-perf
3. **Event-Driven** — Kafka event bus, versioned schemas, dead letter queues
4. **Shared Infrastructure** — observability (Jaeger/Datadog/Prometheus/Grafana), security (OAuth 2.0/OIDC, zero-trust), deployment (K8s, IaC, CI/CD), polyglot persistence
5. **Configuration-Driven Market Adaptation** — no country-specific code branches, feature flags, environment-based config, no redeployment for config changes
6. **Feature Flags** — default OFF, 3-month max lifecycle, documented owner/purpose/removal date
7. **Backward Compatibility Mandate** — additive only, 12-month deprecation minimum, version via headers
8. **No Breaking Changes Without Governance** — 6+ month deprecation, migration path, cross-team impact analysis

### Change Specification Model
Every capability change requires a Change Spec: overview, business context, technical design, backward compatibility assessment, channels affected, feature flag strategy, API changes, testing & validation, monitoring, rollback plan, dependencies & risk. ARB approval required before development.

### Global Expansion Strategy
**Strategic markets** (prioritized): Nigeria (base), UK (diaspora/business banking), Kenya (mobile money/SME acquiring).

**Market Entry Framework**: Phase 1 (capability selection, 1–2 months) → Phase 2 (market adaptation, 2–4 months) → Phase 3 (launch & scale, 4–12 months).

**Decision framework**: Default is build for platform. Market-specific only when: regulatory requirement unique to one market, no reuse potential, or time-critical opportunity. Market-specific features must have sunset date or 12-month upstream migration plan.

### Migration Strategy (Monoliths to Platform)
Capability-first migration with dual-running. Phases: Preparation (2 weeks) → Dual Running (4 weeks) → Shadow Mode (4 weeks) → Gradual Cutover (6 weeks, 1%→100%) → Cleanup (12+ months).

**Success metrics**: <0.01% data discrepancies, p99 latency comparable or better, error rates below old system, zero customer-impacting incidents.

**Nigeria migration roadmap**: Q2 2026 (Merchant Account Mgmt, Terminal Onboarding), Q3 (Transaction Processing, Settlement), Q4 (Digital Wallet, Business Banking), 2027 (Lending, Insurance).

### Governance Framework
**Architecture Review Board (ARB)**: Chief Architect (chair), platform leads, security/compliance lead, infra lead, product rep. Weekly meetings. Unanimous approval for platform capabilities, 80% majority for market-specific exceptions.

**Capability lifecycle**: Proposal → ARB review → technical design → security/compliance review → prototype → ARB sign-off → implementation → load test → docs → sandbox → ARB production readiness → staged rollout → production ready.

### KPIs
- Capability Reuse Rate: 20% (Q2 2026) → 70% (Q2 2027) → 85%+
- Time-to-Market for new country: 120 days (first) → 60 days (subsequent)
- API Uptime: Tier-1 99.95%, Tier-2 99.5%
- Time-to-integrate: <2 hours for straightforward integration
- Code duplication: <10% (down from ~40%)
- MTTR: <1 hour for critical incidents

### Success Criteria
3+ markets operational, 70%+ capability reuse, <90 day new market launch, 99.5%+ uptime, 10x transaction volume capacity, 100+ third-party developers integrated, 50% development velocity increase, incremental revenue exceeds infrastructure investment.

### Compliance Framework
Multi-jurisdiction: Nigeria (CBN, NAICOM, NCC, EFCC), UK (FCA, PRA, ICO, HMRC), Kenya (CBK, CMA, Data Protection Commissioner). Every capability must address regulatory requirements, data protection (GDPR/PDPA), AML/CFT, consumer protection, and financial reporting.

## Observations
- This document presents a more generic/aspirational view compared to the operational detail in [[source — Project Phoenix Initiative]]. The cluster architecture here (4 clusters) differs from Tosin's official 6-cluster architecture in Project_Phoenix_v3 — the official structure is more granular
- The migration timeline here (Q2–Q4 2026 capability-by-capability) is more conservative than Ravi's official 6-month Strangler Fig timeline, which targets full production by September 2026
- No mention of [[TeamApt]]'s existing systems or the MFB blindspot — this appears written from a greenfield perspective

## Sources
Platform Strategy & Vision v1.0, March 2026. Owner: Chief Architect, Moniepoint.