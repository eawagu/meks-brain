---
title: Direct Debit
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T16:15:33Z"
updated: "2026-04-19T16:15:33Z"
summary: Mandate-based bank debit payment rail at TeamApt — three products (MADD, GoSubscribe, SAFE), NIBSS-integrated, multi-bank deployment via AptPay, led by the DD/CDD department under Daniel Ojinaka.
---

## Overview

Direct Debit (DD) is Moniepoint/[[TeamApt Limited]]'s mandate-based bank debit capability. Merchants and billers create standing mandates against customer accounts; debits execute on scheduled cycles without requiring per-transaction customer action. The rail runs over NIBSS and is operated by the DD/CDD department — one of TeamApt's two Revenue Driver departments, led by [[Daniel Ojinaka]].

## Products

- **MADD** — Moniepoint Automated Direct Debit. Core mandate-based debit product.
- **[[GoSubscribe]]** — Subscription billing product built on DD rails. POS and Web channels. Launched 2026 as the primary commercial growth vehicle for DD.
- **SAFE** — Secure Automated Fund Extraction. Subscription and auto-payment framework.

## Architecture

Three-tier system (see [[Direct Debit Architecture Specification]], [[TeamApt DirectDebit Architecture]]):

1. **TeamApt Cloud** — Consolidated Direct Debit routing layer. Central orchestration, mandate management, reconciliation engine.
2. **Bank-Deployed (AptPay Direct Debit)** — Per-bank deployed components running in bank environments. Communicates with bank core systems directly.
3. **Bank Systems** — Core Banking, Email, SMS gateways at each issuing bank.

The consolidated layer sits in TeamApt Cloud and fans out to bank-specific deployments. 25 C4 diagram tabs cover the full system scope (system, container, component, sequence views).

Key subsystems: ACS (mandate authentication / OTP), [[GoSubscribe]], SAFE, [[TACHA]] (clearing house platform).

## Bank Network

Active integration partners include [[Fidelity Bank]], [[Access Bank]], [[Polaris Bank]] (suspended — recorded exposure), [[GTBank]] (via [[Habari Pay]], deployed Apr 2026). Ongoing onboarding activity tracked in Direct to Bank standup cadence.

Settlement model: T+1 onward. Funds stage through [[Transit Account]]s at each bank before final settlement or reversal (Fidelity: 9020033048, Access: 1942066093, Polaris: 1790324517).

## Operations & Reconciliation

Ops doctrine owned by Tolulope Obianwu (see [[Direct Debit Operations Readiness Doctrine]]). Covers:
- Per-bank settlement flows and transit account structures
- TACHA platform behavior and T+1 settlement logic
- Reconciliation procedures and exception handling (48-hour SLA)
- Polaris Bank reconciliation currently suspended

Weekly production issues cadence led by [[Yasir Syed Ali]]. Weekly progress updates coordinated by [[Idris Aliyu]] / [[Nancy Muorah]] (moved to Mondays, combined with ATS meeting — 2026-03-31).

## Revenue & Performance

- Revenue model: ₦17.50/transaction
- 2025 revenue exceeded 200% of KR (Access Bank driven)
- Auth success rate: 95.19%
- Key lesson from biller onboarding: 20 billers onboarded, 0% transacting — onboarding completion ≠ activation

## Active Issues (as of Apr 2026)

- Pending transaction resolution: cron job on consolidated side requeries bank after 10-minute threshold; marks failed if no success response.
- Auto-reversal: mechanism designed to return funds from transit account to customer on transaction failure.
- OTP delivery: evaluating email OTP as primary channel with SMS fallback for customers without registered email.
- Response code harmonization: in progress across bank integrations.
- Synchronization deadlock fix: awaiting deployment (Apr 9 standup).
- Security vulnerability remediation: ongoing for bank-deployed components.
- Latency: external bank connectivity is primary driver; caching solutions proposed.

## Q2 2026 Roadmap (AptPay OKR Planning)

Key focus areas: mandate creation improvements, ACS enhancements, GoSubscribe Web launch, bank network expansion, deployment maturity. [[Project Phoenix]] deployed in CDD with retry mechanisms — reduced mandate failures. 100% unit test coverage achieved Q1.

## Key People

- [[Daniel Ojinaka]] — DD/CDD Department Lead
- [[Yasir Syed Ali]] — Engineering lead, weekly production issues owner
- [[Idris Aliyu]] — Weekly progress update owner
- [[Dennis Ajalie]] — CEO, TeamApt
- [[Emeka Awagu]] — CTO, attends weekly production issues meetings
- [[Bukola Taiwo]], [[Babajide Ojoboorun]], [[Abiodun Famoye]] — Engineering team
- Tolulope Obianwu — Operations, reconciliation doctrine author

## Related Pages

- [[Direct Debit Program]] — existing concept page (older, narrower scope — this page supersedes)
- [[Direct Debit Architecture Specification]]
- [[TeamApt DirectDebit Architecture]]
- [[Direct Debit Operations Readiness Doctrine]]
- [[GoSubscribe]]
- [[AptPay]]
- [[TACHA]]
- [[Transit Account]]
- [[RC91 Multi-Bank Failure Pattern]] — ATS failures affecting bank integrations
