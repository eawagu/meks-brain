---
title: source — Project Phoenix PM Briefing Deck
type:
  - "source"
cssclasses:
  - "source"
source_path: Project_Phoenix_PM_Briefing_Deck.md
created: "2026-04-13T22:21:52Z"
updated: "2026-04-13T22:21:52Z"
summary: "Frank Atashili's PM briefing deck on Project Phoenix — covers TSP scope (19 transaction types, 6 domain callers, 14 modules), impact assessment per team (Account Payments/Card Issuance/VAS high impact), platform modernisation sequence, team realignment into TSP/Card Issuance/Card Acceptance/Payment Gateway platforms, critical risks and open decisions, and PM action items."
---

Presenter: [[Frank Atashili]] (CPO/COO, [[TeamApt]]). March 2026. Internal — Confidential. Purpose: walk PMs through what is changing under [[Project Phoenix]].

## Key Points

### Group Structure Under Phoenix
- **OpCos** (Moniepoint MFB, TeamApt, MonieWorld, Sumac MFB) — hold licenses & business relationships
- **IPCo** (Moniepoint Technologies UK) — owns all platform IP; TSP lives here
- **DevCos** (Nigeria, India, Spain) — employ engineering teams

### TSP Definition
- **19 transaction types**, **6 domain callers**, **14 code modules**
- Domain platforms decide WHAT (customer, amount, beneficiary); TSP decides HOW (routing, fees, compliance screening, posting, rail dispatch)
- Callers never build postings — TSP owns the ledger contract
- Key capabilities already built: ISO 8583 switching (jPOS 3.0 + Netty 4.2), direct Visa & Mastercard connections, HSM integration, 21-step workflow engine, config-driven Fee Engine, 493 passing tests

### TSP Scope — Five Products Becoming Platform Capabilities
| Current Product | TSP Capability | Status |
|---|---|---|
| Juliana (Account) | Account Switching & Processing | Strategy paper complete; C4 current |
| Juliana (Card) | Card Switching & Processing | ~42-50% POS market share — highest risk asset |
| AptPay ATS | Integrations (Country-Agnostic) | Adapter model defined, not built |
| VAS | VAS Switching & Processing | 44 provider integrations moving to TSP |
| AptPay Direct Debit | **Decision Required** | Placement unresolved — blocks team formation |
| [[TACHA]] / Juliana Backoffice | Settlement & Clearing | In production — needs formal governance |

### Team Impact Assessment

**HIGH Impact:**
- **Account Payments** — 5 of 19 transaction types; PAY_OUT is Phase 1 critical path. Loses fund movement, fee calc, posting, rail dispatch. Retains KYC, beneficiary mgmt, payment initiation UX
- **Card Issuance** — 6 of 19 types (CARD_AUTHORIZATION, CARD_FINANCIAL, etc.). TSP takes card switching layer (PTSA, FEP routing, 3DS). Retains CMS, card programs, BIN mgmt, auth decision engine
- **VAS Platform** — 44 provider integrations moving to TSP NgVasRailAdapter (Phase 3)

**MEDIUM Impact:**
- **Cross-Border** — 2 types (Phase 5). UK adapter readiness critical for market launch
- **Card Acceptance** — Settlement via TSP; terminal management stays
- **Payment Gateway ([[Monnify]])** — Best-covered business line; merchant settlement moves to TSP

### Critical Risks & Open Decisions
| Risk | Status |
|---|---|
| Direct Debit placement unresolved | CRITICAL — blocks team formation |
| TACS unrecognised as cross-cutting auth service | CRITICAL — auth logic will fragment |
| Three-way tokenisation conflict (ATS, DD Issuer Module, Card Switch) | CRITICAL |
| External tenant model absent | CRITICAL — B2B switching business architecturally homeless |
| Card fee ownership (TSP Fee Engine or FEP?) | PENDING |
| Juliana "~60% of ATS" claim — which 60%? | HIGH |
| Sub-platform senior roles all TBH | HIGH — Layer 1 program unstaffed |
| PTSP running parallel transition with no TSP coordination | CRITICAL |

### Platform Modernisation Sequence (Proposed)
1. Account Switching & Processing (PoC — de-risks all others)
2. Centralized Clearing & Settlement (TACHA) — cross-cutting foundation
3. Centralized Dispute Resolution — consolidate fragmented logic
4. Card Switching & Processing — highest commercial risk, sequenced after playbook proven
5. Direct Debit — last among core, allows tokenisation conflict resolution
6. Remaining (Integrations/ATS, VAS Switching)

### Team Realignment

**Into TSP:**
- [[Kevin Ng'Eno]] (Switching Solutions) → Card/Account Switching & Processing
- [[Abdulgafar Obeitor]] (AptPay Suite) → Integrations / Settlement & Clearing
- [[Oluwabunmi Oyefisayo]] (Switch Engineering) → Core switch platform engineering
- [[Abiodun Famoye]] (CDD) → Direct Debit (within TSP)
- [[Idris Aliyu]] (PMO) → TSP-wide product operations

**To Other Platforms:**
- [[Tracy Ojaigho]] (TPP Issuer Processing) → **Card Issuance Platform**
- [[Unwana Enang]] (PTSP/PTAD) → **Card Acceptance Platform**
- [[Damilare Ogunnaike]] (Monnify) → **Payment Gateway Platform**

**Stays with TeamApt (OpCo):** All non-engineering functions — switching business ([[Babatunde Okufi]]), operations, compliance, infosec, finance, legal, audit, people ops, marketing, project delivery, design.

### Roadmap
- **Phase 0** (by 28 Mar): Platform alignment session, name TSP ownership triad, create Jira + Git repo
- **Phase 1** (28 Mar – 28 Apr): AI reverse engineering on codebases, TSP OKRs, capability map, API catalogue, Juliana/PTSP boundary definition
- **Phase 2** (28 Apr – 30 May): SLOs, operations runbooks, design audit, Claude/Eywa skills, decommission plan

**Fastest lever:** Run AI reverse engineering pipeline on all 5 codebases (~4 hours machine time, unlocks everything else). Not yet started.

### Non-Negotiable Constraint
Juliana Card Switch holds ~42–50% of Nigeria's POS market. Zero disruption during transition — parallel-run validation, SRE sign-off, maintained scheme certifications, same-day settlement commitments.

## Sources
Project Phoenix PM Briefing Deck, Frank Atashili, March 2026.