---
title: "source — TSP Business Case: Why Centralised Fund Movement"
type:
  - "source"
cssclasses:
  - "source"
source_path: Project Phoenix\tsp-business-case.pdf
created: "2026-04-14T16:19:59Z"
updated: "2026-04-14T16:19:59Z"
summary: "CEO-audience business case for TSP as a centralised fund-movement kernel vs each platform team managing its own. Part 1: CEO Brief (5 min) with four reasons. Part 2: structured comparison table across 15 dimensions, bottleneck rebuttal, industry precedent (Stripe/Adyen/Square/Wise/Revolut), CBA analogy."
---

Draft business case dated 2026-02-26, audience: Group CEO ([[Tosin Eniolorunda]]). 7-page PDF. Argues that a single fund-movement kernel is the only architecture that scales internationally without compounding regulatory, operational, and financial risk.

## Summary

The central question: should each platform team (Account Payments, Cross-Border, Card Issuance, Credit, etc.) build its own transaction processing, or should [[TSP]] handle all fund movement? The answer: centralised TSP is a business-risk decision, not a technology preference. The distributed alternative leads to multiple fee engines, multiple reconciliation processes, multiple screening integrations, and compliance gaps that compound with each new market.

## Key Points

### Four Reasons for Centralised TSP

1. **"One way to move money means one way to lose money."** Every fund movement requires five things to happen correctly: debit account, calculate fee, post ledger entry, dispatch to rail, reconcile outcome. Seven independent implementations = seven places for bugs/edge cases/rounding errors. Centralised = tested once, audited once, reconciled in one place.
2. **International expansion is multiplicative without TSP.** Each market has own rails (NIP Nigeria, FPS UK, M-Pesa Kenya), compliance rules, fee structures. With TSP, adding a market = build one set of rail adapters (linear). Without TSP, adding a market = every team individually integrates = teams × markets (multiplicative). Example: 7 teams × 5 markets = 35 adapters distributed vs. 5 centralised.
3. **Regulators see one audit trail, not seven.** Each market's regulator examines money movement: screening, transaction records, fee transparency, reconciliation, dispute handling. Single auditable fund movement path is dramatically easier to explain, certify, and defend.
4. **Teams actually move faster, not slower.** Without TSP, each team must first build (or copy/modify) fee calc, posting, rail integration, reconciliation, error handling before shipping any feature. With TSP, they call one API. Domain teams focus on their domain, not plumbing.

### Distributed Alternative Within 12-18 Months
- Multiple fee engines (no single Finance view of revenue per transaction type)
- Multiple reconciliation processes (no central "did all money arrive?" answer)
- Multiple [[Loom]] screening integrations (compliance gaps)
- Multiple posting patterns (CBA debugging becomes cross-team forensic exercise)
- No single transaction record (Operations + Support must know which team processed a payment)

### 15-Dimension Comparison (Centralised vs Distributed)
Fund movement impl, adding a market, fee calc, ledger posting, reconciliation, compliance & screening, regulatory exam, operational visibility, error handling & compensation, team velocity, engineering headcount, incident response, testing, time to first payment in new market, data consistency — centralised wins on every dimension.

### Bottleneck Rebuttal
- **TSP is an API, not a review board.** Domain teams call TSP API same as CBA API — versioned endpoint, payload, result. No human bottleneck.
- **Interface is stable by design.** TSP accepts 16 transaction types. New domain features do not require TSP API changes.
- **New market capacity is additive, not blocking.** Market module work parallels domain feature work.
- True bottleneck is in distributed model: market launch gated by slowest team.

### Industry Precedent
Every scaled payment company uses centralised payment kernels:
- Stripe: PaymentIntents (single API for all payment types, methods, markets)
- Adyen: Unified payment engine (30+ markets)
- Square: Payments Core (in-person, online, invoices, lending)
- Wise: Single routing engine (all corridors, rails, currencies)
- Revolut: Core payment processor (cards, transfers, crypto, business)

None at scale have adopted "each team manages own transaction journeys."

### CBA Analogy
Moniepoint already made this exact decision with [[CBA]]. No one suggests each team should build its own ledger. CBA handles the ledger; TSP handles orchestration above it (fee calc, posting, rail dispatch, reconciliation). Together they form the financial backbone. Asking each team to manage own transaction journeys = asking each to manage own ledger.

### Summary Table
| Dimension | Centralised TSP | Distributed Per-Team |
|---|---|---|
| Build cost | 1× | N× |
| Per-market cost | 1 module | N integrations |
| Compliance surface | 1 audit trail | N audit trails |
| Reconciliation | 1 process | N processes |
| Operational visibility | 1 system | N systems |
| Incident ownership | 1 team | Shared / unclear |
| Time to new market | Weeks | Months |
| Industry precedent | Every scaled payment company | None at scale |

### Strategic Frame
The question is not whether to build TSP; it is whether Moniepoint can afford not to, given expansion into new regulated markets where consistent, auditable, reconcilable fund movement is not optional.

## Entities Mentioned

[[TSP]], [[Moniepoint]], [[CBA]], [[Loom]], [[Tosin Eniolorunda]], [[Frank Atashili]]

## Concepts

[[Project Phoenix]], [[Platform Strategy]], [[Centralised Fund Movement]], [[International Expansion]], [[Regulatory Compliance]], [[Payment Orchestration]]