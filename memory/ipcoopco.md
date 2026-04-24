---
title: IPCo/OpCo
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-24T11:50:57Z"
updated: "2026-04-24T11:50:57Z"
summary: Platform-vs-operating-company separation pattern under Project Phoenix. IPCo (MP Technologies UK) owns IP, product, engineering, design, platform roadmap, and SLAs — charges OpCos for services. OpCos (TeamApt, MoniePoint MFB, MonieWorld, Sumac MFB) hold licences, customers, operations, compliance, and entity P&L — consume platform services.
---

## Definition

IPCo/OpCo is the **platform-vs-operating-company separation pattern** implemented by [[Project Phoenix]]. The group splits functions that are "build once, use everywhere" (IPCo) from functions that are entity-specific, licence-bound, or customer-facing (OpCo).

## IPCo — [[MP Technologies UK]]

The central Platform Organization. Owns:
- Intellectual property
- Product management
- Engineering (including SREs)
- Design
- Platform roadmap and SLAs
- Charges OpCos for services

Hosts all group platforms: [[TSPP]], [[CI&P]], [[Payment Gateway Platform]], and the broader Business Banking / Digital Banking / Credit clusters plus cross-cutting CoEs.

## OpCos

Operating companies that hold entity-specific assets and consume IPCo services:
- [[TeamApt]] Ltd — Nigeria (+ Kenya, UK)
- [[MoniePoint MFB]] — Nigeria microfinance bank
- [[MonieWorld]] — UK (fka Moniepoint GB)
- [[Sumac MFB]] — Kenya
- Future markets

### OpCo scope
- CBN licences (Switching, Processing, PSSP, PTSP)
- Customers, sales, and BD
- Operations, reconciliation, settlement
- Compliance and risk
- Entity P&L and audit
- Consumes platform services

## Why It Matters

- **Multi-country expansion without code duplication** — a new country = a new configuration profile, not a new build.
- **Consistent platform SLAs** across all OpCos.
- **Separation of regulatory exposure** — licences stay where they must (OpCo), capabilities stay where they scale (IPCo).

## Org Movements Under Phoenix (Apr 22, 2026 brief for TeamApt)

Three TeamApt leaders cross from OpCo commercial to IPCo platform heads:
- [[Frank Atashili]] → Head, TSPP (Product)
- [[Tracy Ojaigho]] → Head, CI&P
- [[Damilare Ogunnaike]] → Head, Payment Gateway Platform

Two TeamApt leaders stay in OpCo with broader scope:
- [[Babatunde Okufi]] — CBDO + Business Lead, Switching & Processing (merged TPP + DS)
- [[Daniel Ojinaka]] — Business Lead, Monnify + Direct Debit

OpCo retains: licences & regulation, customers & BD, operations ([[Oladapo Onayemi]]), compliance & risk ([[Ibukun Atoyebi]], [[Olufemi Agbaje]]), finance, legal.

## Sources

- [[Project Phoenix]]
- [[source — Project Phoenix Org Structure Changes (March 2026)]]
- [[TeamApt-Platformization-Org-Movements (1)]] — Apr 22, 2026 brief on TeamApt-side movements