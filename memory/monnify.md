---
type:
  - "entity"
title: Monnify
created: 2026-04-11
summary: "Moniepoint's payment gateway brand — collections (VA, web card, DD), disbursements, VAS, international (MPGS); FY2025 actual ₦8.29B (72% of ₦11.1B target), VTU crash lost >50% volume; FY2026 target ₦7.61B, Q1 at 130% of budget; VA commoditization acknowledged — pivoting to international payments, product expansion, developer marketing; ₦52.3B daily avg deposit (Mar 2026); led by Damilare Ogunnaike."
updated: "2026-04-16T05:44:07Z"
cssclasses:
  - "entity"
---

## Overview

Monnify is the payment gateway brand operated by [[TeamApt Limited]]. It serves merchants with card payment acceptance, direct debit, and chargeback dispute management. One of the two Revenue Driver departments (alongside DD/CDD), led by [[Damilare Ogunnaike]].

## Products

- **Collections:** Virtual Accounts (VA), web card payments, direct debit
- **Disbursements:** payout processing (99.99% success rate in 2025)
- **VAS:** value-added services
- **International:** MPGS (Mastercard Payment Gateway Service), Cybersource

## Key Systems

Monnify Gateway, Loom, Limit Engine, MPGS integration.

## Core Capabilities

### Card Acquiring — MPGS
- Mastercard Payment Gateway Service integration
- DCF → IPM → Mastercard flow
- Domestic + international settlement paths
- Settlement bank: Union Bank; ICA: 34150
- See [[Source: MPGS_sop]]

### Direct Debit
- NIBSS-integrated mandate debit
- Multi-bank: Fidelity, Access, Polaris, Stanbic, FCMB, others
- See [[Direct Debit Program]]

### Chargeback Management
- 4 dispute platforms: Interswitch, Habaripay, CoralPay, IDRS/DCIR
- 3-stage arbitration process
- See [[Source: MONNIFY_CHARGEBACK_PROCESS_FLOW]]

### TPP Incident Reporting
- Third-party processor incident reporting process
- See [[Source: Monnify_operations_process_documentation]]

## Financial Performance

### FY2025 (CEO Deck data — supersedes earlier estimates)
- Target: ₦11.1B
- Actual: ₦8.29B (72% attainment)
- Volume: 599.4M (+37.4% YoY)
- Value: ₦27T (+42.4% YoY)
- Transacting merchants: 9,542 (-20.3% YoY)
- Gross margin: 91.18%
- Contribution margin: 79.60%
- Primary driver of decline: VTU business crash — volume share dropped from 63.9% (Jan '25) to 24.5% (Mar '26)
- 4 Ponzi incidents
- Card success rate improved: 35% → 84.42%
- Payout success: 99.99%

**Note:** Earlier brain data showed ₦9.05B (79% of ₦13B). The CEO deck shows ₦8.29B (72% of ₦11.1B). The CEO deck data is from [[Dennis Ajalie]]'s board-level presentation and likely reflects a different revenue recognition boundary or target revision. Both frames retained.

### FY2026 Targets (CEO Deck)
- Revenue: ₦7.61B (lower than FY2025 — reflects VA commoditization reality)
- Volume: 604M
- Value: ₦38.2T
- Transacting merchants: 6,276
- OKRs: Payin 99.99%, Payout 99.99%, P99 3s, Checkout 75%, CSAT 99%, zero Ponzi incidents

### Q1 2026 Performance
- Revenue: ₦1.77B (130% of budget)
- Value: ₦7.86T (106%)
- Volume: 115.6M (95%)
- Transacting merchants: 4,650 (130%)
- Gross margin: 81.19% (down from 91.18%)
- Contribution margin: 65.07% (down from 79.60%)

## Strategic Position

### Deposit Mobilization
- ₦52.3B daily average deposit (Mar 2026, up from ₦33B+ in 2025)
- Top 5 merchants by year-end 2025 deposits: Kora Payments (₦7.04B), NALA Payments (₦3.59B), Fincra Technologies (₦2.86B), Sporty Internet (₦2.66B), GlobalWire NG (₦1.82B)
- Strategic value as API integration channel for Moniepoint's services

### VA Commoditization & Pivot
- Every competitor now offers VAs at aggressive prices; some merchants (BuyPower, PiggyVest) issuing their own
- Constrained product breadth: missing international payments, overdraft, FX conversion, IoD
- Growth almost 100% sales-led; self-serve segment underinvested
- Product performance gaps: Payout at 97% vs 99.99% target; VA rejected payments and Moniepoint VA issues

### Strategic Pivot
- **Product expansion:** International payments, overdraft, IoD
- **Performance:** Fix VA rejected payments and payout reliability
- **Lifecycle optimization:** Embed product growth function to track onboarding → activation → integration → usage → retention
- **Marketing:** Shift from purely sales-led to developer-focused campaigns and startup acquisition

### Business Needs
1. Product Growth Partner — own full merchant lifecycle
2. Product Managers — international payments, performance, new product expansion
3. Engineering Lead — API reliability, international payments buildout

### International Payments (Validated)
- 5 merchants target, $615K revenue, $38.9M txn value, 135K volume, 15K POS terminals
- Q1: Visa 3DS completed, MPGS live, $20K+ first txns
- Q2: MVP launch, Visa integration
- Q3: scheme integrations, auto routing, dispute portal
- Q4: scale to $1M+

## Customers

- VA provider banks
- Merchants
- Payment Facilitators
- See [[TeamApt_Customer_Registry]] for full relationship map

## TACHA Integration

Monnify is a platform consumer of [[TACHA]] (consumer group: MONNIFY). Monnify gateway disputes flow through TACHA's dispute management pipeline.

## Active Issues (Apr 2026)

- [[RC91 Multi-Bank Failure Pattern]] — routing failures affecting DD
- [[DCIR Security Vulnerabilities]] — 5 CRITICAL findings in Access Bank DCIR
- [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]] — ₦5.87M exposure, disablement decision pending from [[Damilare Ogunnaike]]
- Engineering manager resigned (noted at MANCo)

## Relationships

- [[TeamApt Limited]] — parent entity
- [[Damilare Ogunnaike]] — department lead
- [[CoralPay]] — chargeback platform
- [[Direct Debit Program]] — product
- [[NIBSS]] — rails
- [[Paystack]] — competitor
- [[TACHA]] — clearing/settlement backbone

## Sources

- [[Source: MPGS_sop]]
- [[Source: MONNIFY_CHARGEBACK_PROCESS_FLOW]]
- [[Source: Monnify_operations_process_documentation]]
- [[TeamApt_2025_Business]]
- [[TeamApt_Businesses]]
- [[source — TeamApt Strategy Retreat 2026 CEO Deck (Dennis Ajalie, Apr 15)]]
- [[source — Strategy Retreat Day 2: Customer Rewards, Sales OKRs, Growth Strategy (Apr 15)]]