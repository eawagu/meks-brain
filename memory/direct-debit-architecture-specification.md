---
title: Direct Debit Architecture Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\TeamApt\TeamApt_DirectDebit_Architecture.md
summary: Comprehensive Direct Debit system architecture reference covering three-tier design (TeamApt Cloud → Bank-Deployed → Bank Systems), 25 C4 diagram tabs, three product lines (MADD, GoSubscribe, SAFE), and bank network status.
---

## Summary

Comprehensive [[Direct Debit]] system architecture reference. Three-tier design: TeamApt Cloud (Consolidated DD routing) → Bank-Deployed (AptPay Direct Debit) → Bank Systems (Core Banking, Email, SMS). Covers 25 C4 diagram tabs, three product lines (MADD, GoSubscribe, SAFE), mandate/transaction/authentication flows, partner integrations.

## Key Points

- Three-tier architecture: TeamApt Cloud → Bank-Deployed → Bank Systems
- 25 C4 diagram tabs covering full system scope
- Three product lines: MADD (multi-account direct debit), GoSubscribe (POS/Web subscription), SAFE (contactless)
- Bank network status: live (Access, Polaris, Wema), pilot-ready (Fidelity), pipeline (FCMB, Union, GTBank, Zenith, Moniepoint)
- Partner integrations: HabariPay, GlobalPay, GTBank
- Technology stack: Java/Spring Boot, React, MySQL/MSSQL, Kafka, Metamap
- Card scheme integrations: Mastercard MDES, Visa VTS, Verve
- Settlement via TACHA and NSS

## Entities Mentioned

[[AptPay]], [[Direct Debit]], [[Monnify]], [[TACHA]], [[Access Bank]], [[Polaris Bank]], [[Wema Bank]], [[Fidelity Bank]], [[FCMB]], [[Union Bank]], [[GTBank]], [[Zenith Bank]], [[MoniePoint]], [[HabariPay]], [[GlobalPay]], [[Mastercard]], [[Visa]], [[Verve]]

## Concepts

[[C4 Architecture Model]], [[Direct Debit]], [[Mandate Management]], [[GoSubscribe]], [[SAFE Contactless]], [[Bank-Deployed Services]]