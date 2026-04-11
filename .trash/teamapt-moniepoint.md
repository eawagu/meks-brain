---
title: TeamApt / Moniepoint
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: "Nigerian fintech company (TeamApt Inc., operating as Moniepoint) — Emeka Awagu's employer; builds payment infrastructure including Monnify, Direct Debit, and acquirer card transaction platforms."
---

## Overview

TeamApt Inc. (operating brand: Moniepoint) is a Nigerian fintech company building payment and banking infrastructure. Emeka Awagu serves as CTO.

## Products & Platforms

- **Monnify** — payment gateway; supports card (MPGS/Mastercard), direct debit, chargeback management
- **Direct Debit (DD)** — mandate-based bank debit; NIBSS-integrated; multi-bank (Fidelity, Access, Polaris, Stanbic, others)
- **ACT (Acquirer Card Transaction)** — acquiring platform; KYC-gated; merchant onboarding; manual fee collection
- **GoSubscribe** — subscription product; RC91 routing dependency; CEO-level visibility
- **AptPay** — payment routing layer; Fidelity UAT dependency (blocked as of Apr 2026)

## Infrastructure

- **TMS (Transaction Management System)** — HTTP migration committed Apr 2026 (root cause of routing + Kafka issues)
- **NIBSS integration** — direct debit rails; VPN dependency (root cause of Apr 2026 outages); RC91/RC96 routing
- **Harness** — CI/CD tooling; migration pending CTO approval (MANCo 100%); CBN AML flag
- **GitLab** — source control; MFA enforcement decision Apr 2026

## Key Relationships

- [[Emeka Awagu]] — CTO
- [[Monnify]] — payment gateway brand
- [[NIBSS]] — national payment rails partner
- [[CoralPay]] — acquirer/processor; DCIR integration; ZIB
- [[Stanbic Bank]] — RC91 routing bank; persistent SLA failures
- [[Paystack]] — competitor; direct debit product outreach Apr 2026

## Active Issues (as of Apr 2026)

- RC91 multi-bank failure — 13+ banks, structural routing gap identified; see [[RC91 Multi-Bank Failure Pattern]]
- NIBSS DD compound failures — TDSD-6437 formalised
- Settlement integrity — TDSD-6424, TDSD-6431, TDSD-6276 active
- DCIR security vulnerabilities — 5 CRITICAL Access Bank findings; see [[DCIR Security Vulnerabilities]]
- GoSubscribe CEO demo risk — war room activated Apr 8; structurally reverting Apr 9
- Project Phoenix — Phase 1 kick-off Apr 7; architecture in progress
- CBN POS recertification — 9 days overdue as of Apr 2026
- Lattice performance review deadline — Apr 10