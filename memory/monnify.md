---
title: Monnify
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: "Moniepoint's payment gateway brand — handles card acquiring (MPGS/Mastercard), direct debit, TPP incident reporting, and chargeback management across Interswitch, Habaripay, CoralPay, and IDRS/DCIR platforms."
---

## Overview

Monnify is the payment gateway brand operated by [[TeamApt / Moniepoint]]. It serves merchants with card payment acceptance, direct debit, and chargeback dispute management.

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

## Active Issues (Apr 2026)

- [[RC91 Multi-Bank Failure Pattern]] — routing failures affecting DD
- [[DCIR Security Vulnerabilities]] — 5 CRITICAL findings in Access Bank DCIR
- Paystack DD halt (Easter Apr 5): ₦4.4B halted; Monnify operated through this
- Easter P1s: 3 concurrent incidents Apr 5

## Relationships

- [[TeamApt / Moniepoint]] — parent brand
- [[CoralPay]] — chargeback platform
- [[Direct Debit Program]] — product
- [[NIBSS]] — rails
- [[Paystack]] — competitor