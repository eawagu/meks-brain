---
type:
  - "entity"
title: Monnify
created: 2026-04-11
summary: "Moniepoint's payment gateway brand — card acquiring (MPGS/Mastercard), direct debit, TPP incident reporting, chargeback management; 2025 revenue ₦9.05B (79% of ₦13B target); VTU exits drove decline; card success rate improved 35%→84.42%; led by Damilare Ogunnaike."
updated: "2026-04-13T23:23:39Z"
cssclasses:
  - "entity"
---

## Overview

Monnify is the payment gateway brand operated by [[TeamApt / Moniepoint]]. It serves merchants with card payment acceptance, direct debit, and chargeback dispute management. One of the two Revenue Driver departments (alongside DD/CDD), led by [[Damilare Ogunnaike]].

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
- Documented in Monnify operations process documentation
- See [[Source: Monnify_operations_process_documentation]]

## Financial Performance

### 2025
- Target: ₦11B (later revised to ₦13B including stretch)
- Actual: ₦9.05B (79% attainment)
- Primary driver of decline: VTU merchant exits (MTN/Airtel)
- Card success rate improved: 35% → 84.42%
- Payout success: 99.99%
- Concentration risk identified: >50% volume in VTU segment caused outsized impact when disrupted

### 2024
- Monnify did NOT appear as a separate TeamApt OKR track in 2024 — was embedded within broader product lines

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
- Paystack DD halt (Easter Apr 5): ₦4.4B halted; Monnify operated through this
- Easter P1s: 3 concurrent incidents Apr 5
- Engineering manager resigned (noted at MANCo)

## Relationships

- [[TeamApt / Moniepoint]] — parent brand
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