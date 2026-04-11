---
title: Direct Debit Program
type:
  - "concept"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "concept"
summary: "Moniepoint's mandate-based bank debit capability — NIBSS-integrated, multi-bank, with a complex reconciliation and exception-handling process across Fidelity, Access, Polaris, and other banks."
---

## Overview

Moniepoint's Direct Debit (DD) program enables mandate-based bank debits via NIBSS rails. Merchants create mandates against customer accounts; debits run on scheduled cycles.

## Bank Coverage

Active banks: Fidelity, Access, Polaris, Stanbic, FCMB (RC91 5th bank as of Mar 2026), and expanding.

AptPay/Fidelity UAT blocked as of Apr 9, 2026.

## Settlement & Reconciliation

- **Settlement window**: T+1
- **Exception SLA**: 48 hours
- **Fee splits**: Fidelity, Access, and Polaris each have distinct split structures (per reconciliation SOP)
- **Reconciliation process**: End-to-end DD reconciliation SOP governs fee split, exception handling, and T+1 settlement
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

## Competitive Context

- [[Paystack]] engaged Moniepoint product team on DD product Apr 2026 — competitive signal; Paystack halted ₦4.4B during Apr 5 Easter P1

## Relationships

- [[TeamApt / Moniepoint]] — operator
- [[NIBSS]] — rails provider
- [[Stanbic Bank]] — high-failure bank; persistent SLA breach
- [[GoSubscribe]] — key mandate customer
- [[RC91 Multi-Bank Failure Pattern]] — overlapping routing failure
- [[Paystack]] — competitor with DD product