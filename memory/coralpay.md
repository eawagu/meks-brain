---
title: CoralPay
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: Nigerian payment processor integrated with Moniepoint via DCIR and ZIB rails — subject of a Problem Investigation (CoralPay ZIB) and host of 5 CRITICAL security vulnerabilities in the Access Bank DCIR integration.
---

## Overview

CoralPay is a Nigerian payment processor. Moniepoint integrates with CoralPay via the DCIR (Direct Credit and Instant Routing) platform and ZIB (Zero Interest Billing) rails.

## Integration Points

- **DCIR** — dispute and chargeback platform; Moniepoint uses CoralPay as one of the DCIR connectors alongside Interswitch, Habaripay, and IDRS/DCIR
- **ZIB** — 4th bank added to CoralPay ZIB as of Apr 10, 2026
- **RC91 routing** — CoralPay implicated in multi-bank failure pattern

## Active Issues

### TDSD-6448 — CoralPay Problem Investigation
- Initiated Apr 7, 2026
- Root cause investigation into CoralPay-related routing failures
- Part of RC91 multi-bank failure pattern

### DCIR Security Vulnerabilities
- 5 CRITICAL vulnerabilities found in Access Bank DCIR integration (which CoralPay is part of)
- See [[DCIR Security Vulnerabilities]] for detail

## Chargeback Process Context

CoralPay is one of four dispute platforms used in Monnify chargeback operations:
- Interswitch, Habaripay, CoralPay, IDRS/DCIR
- 3-stage arbitration process applies across all platforms
- See [[Source: MONNIFY_CHARGEBACK_PROCESS_FLOW]]

## Relationships

- [[TeamApt / Moniepoint]] — integration counterparty
- [[RC91 Multi-Bank Failure Pattern]] — overlapping routing failure
- [[DCIR Security Vulnerabilities]] — security context
- [[Monnify]] — chargeback process consumer