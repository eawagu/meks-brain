---
title: source — Phoenix Gap Analysis Complete
type:
  - "source"
cssclasses:
  - "source"
source_path: phoenix-gap-analysis-complete.md
created: "2026-04-13T22:21:03Z"
updated: "2026-04-13T22:21:03Z"
summary: "Comprehensive gap analysis of Phoenix Platform Reference Architecture from a switching business vs. bank-led perspective, identifying 4 major gaps (external tenant support, scheme integration depth, settlement architecture, switching-specific capabilities), 3 partial gaps, and rating TeamApt's 14 products/services against Phoenix coverage (only 2 fully covered, 6 at risk)."
---

Prepared for [[Frank Atashili]], CPO [[TeamApt]]. March 2026. Comparison of Phoenix Platform Reference Architecture (v2026-02-27) against TeamApt Transaction Switch spec, CMS Capability spec, and knowledge base.

## Executive Summary

The central question: does Phoenix reflect a switching-business perspective (bank-agnostic, multi-entity, regulated network infrastructure) or a single-bank perspective treating TeamApt as [[Moniepoint MFB]]'s technology arm?

**Verdict: Concerns warranted but nuanced.** Phoenix correctly places TSP at Core and adopts config-over-code principles. But it consistently frames processing infrastructure from one bank's consumption perspective, creating real gaps in multi-entity support, external client capability, scheme integration depth, and regulatory architecture.

## Where Phoenix Gets It Right
- **TSP at Core Layer 1** — all fund movement flows through TSP. Mirrors TeamApt's Transaction Switch spec
- **Spine + Module Architecture** — equivalent to TeamApt's codec adapter approach. "Adding a market = adding a Module, not changing the Spine"
- **[[Loom]] as Shared Core** — correctly placed at Core, not embedded in business platforms
- **Event-Driven Architecture** — Kafka Event Bus aligns with Transaction Switch spec telemetry design

## The Bank-Led Perspective Problem (Core Issue)

### External Tenant Architecture (MAJOR GAP)
Phoenix TSP lists only internal Moniepoint platforms as callers. No concept of external financial institutions connecting as tenants. TeamApt's switching license means it processes for entities outside the group. Without external tenant onboarding (own routing rules, fee profiles, scheme connections), TSP cannot serve TeamApt's actual business.

### Scheme Integration Architecture (MAJOR GAP)
Card scheme connections treated as module adapters (like REST API integrations). In reality: persistent TCP connections, HSM-backed crypto, message authentication, network management messages, scheme-specific certification. Fundamentally different from REST API patterns.

### TSP Conflates Switching with Orchestration (CRITICAL DISTINCTION)
Phoenix TSP = payment orchestrator (lifecycle management, state machine, eventual consistency). TeamApt needs a transaction switch (real-time inter-institutional message routing, sub-500ms auth, ISO 8583, HSM, scheme mandates). **Phoenix has the orchestrator but is missing the switch.** Both are needed.

## Specific Capability Gaps

| Capability | Status | Why It Matters |
|---|---|---|
| Stand-In Processing | ABSENT | Regulatory/commercial SLA requirement for connected institutions |
| Hot Lists | ABSENT | Mandatory per card scheme rules; must execute within auth latency budget |
| HSM Integration | ABSENT | Every card transaction requires HSM ops — PIN translation, MAC, PAN tokenization |
| Message Format Translation | UNDERSPECIFIED | ISO 8583 binary protocols ≠ REST API integrations |
| BIN Table Architecture | UNDERSPECIFIED | Core routing data structure, not just card issuance concern |
| Canonical Response Codes | UNDERSPECIFIED | Essential for multi-scheme, multi-institution consistency |
| Clearing & Settlement Engine | ABSENT | Multi-party net position calculation, not just merchant payouts |
| Network Management Messages | ABSENT | Scheme-mandated connectivity maintenance (echo, sign-on, key exchange) |

## Ownership & Strategic Framing Risks

1. **"Evaluate and Extract" vs "Extend"** — TeamApt's work positioned as raw material to be harvested, not as the platform to extend. Budget and timeline implications are significant
2. **TSP Team Ownership Unnamed** — CBN license holder (TeamApt) must be explicitly connected to platform operator
3. **Card Switching Split Across 3 Platforms** — Card Issuance + Card Acceptance + TSP. In practice, a single switch handles both sides
4. **MFB Parallel Infrastructure Blindspot** — 7 MFB systems (Postilion/PostCard, Smart Card Process, Safe Token, [[CMS Manager]], Aptent, [[Iris]], [[Atlas]]) not in any Phoenix spec. Risk of creating MORE duplication
5. **Missing Platforms from Frank's Taxonomy** — Card Authorization Host, Tokenization, Mandate Management, EMV Authentication stack, Token Service Provider, Account/DD FEPs, Bank Integration Services

## Business Line Impact Assessment

| Business Line | Rating | Key Risk |
|---|---|---|
| [[Direct Debit]] | AT RISK | No mandate management platform; GoSubscribe has no home; tokenization unaddressed |
| [[Monnify]] | SUPPORTED | Best-covered; named platform (Monnify+), clear multi-market path |
| [[TPP]] | PARTIAL | Surface coverage for issuer/acquirer processing; no multi-institution model; switching capabilities missing |
| [[Domestic Switching]] | AT RISK | Card Switch, Account Switch ([[Juliana]]), [[AptPay Suite]] have no architectural home; interbank settlement unaddressed |

**Product-level breakdown**: Only 2 of 14 products fully covered (Monnify Collections, Disbursements). 6 partially covered. 6 underserved or missing.

## The Fundamental Question

Phoenix answers: "How does a banking group build shared infrastructure so entities don't duplicate work?" TeamApt's question: "How does a switching business build infrastructure connecting multiple independent financial institutions?"

**The architecture answering the second question automatically answers the first** (group entities are just tenants on a switching platform). The reverse is not true.

## Recommendations for the Meeting
1. Validate what Phoenix gets right (show alignment, not criticism)
2. Introduce the switching layer underneath Phoenix's TSP orchestrator
3. Reframe "evaluate and extract" as "extend"
4. Make TSP ownership explicitly TeamApt
5. Propose missing platforms from Frank's Core/Cloud/On-Prem taxonomy
6. Establish the external client principle as foundational

## Sources
Phoenix Platform Reference Architecture (v2026-02-27), TeamApt Transaction Switch Specification, CMS Capability Specification, TeamApt knowledge base. March 2026.