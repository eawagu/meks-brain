---
title: Visa Collections-Only Implementation Status
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Action Items\Visa Collections-Only Implementation Status.md
summary: "Visa collections-only implementation is ~20% complete with a critical coverage gap: domestic Visa POS transactions via Interswitch/UPSL bypass TACHA entirely, meaning the majority of Visa volume is invisible to the reporting system."
---

## Summary

[[Visa]] (Funmi) requested collections-only reporting ASAP. Implementation lives in [[TACHA]] (Juliana Backoffice) with two modes: collections-only (reporting, no funds movement) and collections + disbursement (clearing and automated payouts). Engineering is ~20% done (Jira epic AS-4588, 23 tickets). Critical gap: domestic Visa POS transactions routed via [[Interswitch]]/UPSL never touch [[Juliana]] or TACHA — and Moniepoint terminals handle ~42-50% of Nigeria's POS volume.

## Key Points

- TACHA ingests via Kafka (`taccs.clearing.requests`) or REST fallback; `collectionOnly=true` flag skips ledger/netting/settlement
- Target platforms: ATS (collections-only), [[Monnify]] (collections-only), TPP (collections + disbursement), Juliana Account Switch (collections + disbursement)
- ~80% of tickets still in Todo; critical path items (Kafka consumer, REST endpoint, DTO) not started
- **Coverage gap**: Domestic Visa POS via [[Interswitch]] and UPSL → never touches TACHA. Only DCIR and international cards (via MPGS) currently flow through Juliana
- Moniepoint POS / Aptent is NOT listed as a TACHA integration target
- Architecture decision needed: (a) Aptent integrates directly with TACHA, (b) ISW/UPSL settlement files batch-ingested, or (c) new adapter at Aptent routing layer
- Scope clarification needed with Funmi: all Visa-branded transactions across group, or only TeamApt acquirer-processed?
- [[Romulo Braga]] (Moniepoint Card Payments team) operates independently and needs to be part of conversation
- Visa transaction lifecycle on Juliana incomplete: Authorize, Capture, Void, Refund all in Todo
- 3DS/ACS testing active but UI timing issues remain
- TeamApt has Visa and MasterCard Acquirer Processor certifications (Tracy confirmed)
- Realistic target for Mode 1 on TACHA (Juliana-flowing transactions only): mid-May 2026
- Full group coverage requires architecture decision + Moniepoint Card Payments integration — additional weeks

## Entities Mentioned

- [[Visa]], [[TACHA]], [[Juliana]], [[Interswitch]], [[Monnify]], [[NIBSS]], [[CoralPay]], [[MasterCard]]
- [[Funmi]], [[Tracy Ojaigho]], [[Christopher Ogbosuka]], [[Wycliffe Ochieng]], [[Kevin NgEno]], [[Romulo Braga]], [[Ruth Adetunji]]
- [[TeamApt]], [[Moniepoint]]

## Concepts

- [[Collections-Only Processing]] — two modes within TACHA (reporting vs clearing + disbursement)
- [[Transaction Switching]] — coverage gap where domestic routes bypass TACHA