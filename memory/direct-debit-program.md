---
type:
  - "concept"
title: Direct Debit Program
aliases:
  - "Direct Debit"
  - "DD"
created: 2026-04-11
summary: "Moniepoint's mandate-based bank debit capability — NIBSS-integrated, multi-bank; DD/CDD department led by Daniel Ojinaka; 2025 revenue exceeded 200% of KR (Access Bank driven); auth success 95.19%; revenue model ₦17.50/txn; key lesson: 20 billers onboarded, 0% transacting."
updated: "2026-04-13T23:25:57Z"
cssclasses:
  - "concept"
---

## Overview

Moniepoint's Direct Debit (DD) program enables mandate-based bank debits via NIBSS rails. Merchants create mandates against customer accounts; debits run on scheduled cycles. Part of the DD/CDD department led by [[Daniel Ojinaka]], one of TeamApt's two Revenue Driver departments.

## Products

- **MADD** — mandate-based direct debit (core)
- **[[GoSubscribe]]** — subscription product built on DD rails
- **SAFE** — secure automated fund extraction

Key systems: ACS, GoSubscribe, SAFE, [[TACHA]].

## Bank Coverage

Active banks: Fidelity, Access, Polaris, Stanbic, FCMB (RC91 5th bank as of Mar 2026), and expanding.

AptPay/Fidelity UAT blocked as of Apr 9, 2026.

## Revenue Model

₦17.50/transaction (₦25 merchant fee − ₦7.50 issuer fee). 10% MoM growth target.

## Financial Performance

### 2024
- 0→1 bank live by mid-year (target was 7) — extremely slow progress
- Sprint velocity: 50.5% (vs 100% target)
- Revenue largely from DCIR; DD was in early deployment

### 2025
- Revenue exceeded 200% of KR, driven by [[Access Bank]]
- Auth success rate: 95.19%
- 20 billers onboarded but 0% actively transacting
- Key lesson: Integration ≠ Activation — onboarding does not equal revenue

## Settlement & Reconciliation

- **Settlement window**: T+1
- **Exception SLA**: 48 hours
- **Fee splits**: Fidelity, Access, and Polaris each have distinct split structures (per reconciliation SOP)
- **Reconciliation process**: End-to-end DD reconciliation SOP governs fee split, exception handling, and T+1 settlement
- **TACHA integration**: Direct Debit is a platform consumer (consumer group: DIRECT_DEBIT); CDD owns DD dispute lifecycle
- **Source**: [[Source: Direct_Debit_End_To_End_Reconciliation_Process_Flow]]

## Production Decisions (Apr 2026)

- Threshold logic defined for debit execution
- Auto-reversal: 3-month window
- Response codes: defined for failure categorisation

## Active Issues

- **NIBSS compound failures** — DD-specific NIBSS failures; TDSD-6437 formalised Apr 2026
- **Stanbic Bank Cycle 15 (7 days)** — both SLAs breached as of Apr 9; persistent across 15 cycles
- **NIBSS RC96 P1** — 64%+ failure rate Apr 9; affecting DD production
- **GoSubscribe mandate** — activated Apr 8; RC91 structurally reverting Apr 9

## Payment Facilitator Pipeline

Live: [[CowryWise]] (first DD merchant, bullish on DD as future payment rail). Pipeline: GlobalPay, LendSqr, Paystack, Cyberpay, KoraPay, Quidax, Mono.

## Competitive Context

- [[Paystack]] engaged Moniepoint product team on DD product Apr 2026 — competitive signal; Paystack halted ₦4.4B during Apr 5 Easter P1

## Relationships

- [[TeamApt / Moniepoint]] — operator
- [[Daniel Ojinaka]] — department lead
- [[NIBSS]] — rails provider
- [[TACHA]] — clearing/settlement backbone
- [[Stanbic Bank]] — high-failure bank; persistent SLA breach
- [[GoSubscribe]] — key mandate customer
- [[RC91 Multi-Bank Failure Pattern]] — overlapping routing failure
- [[Paystack]] — competitor with DD product
- [[Clearing and Settlement]] — settlement via TACHA

## Sources

[[Source: Direct_Debit_End_To_End_Reconciliation_Process_Flow]], [[TeamApt_2024_Business]], [[TeamApt_2025_Business]], [[TeamApt_Businesses]], [[TeamApt_Customer_Registry]]