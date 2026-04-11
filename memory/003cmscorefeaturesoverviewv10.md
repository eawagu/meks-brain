---
title: 003_CMS_Core_Features_Overview_v1.0
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: 003_CMS_Core_Features_Overview_v1.0.docx.md
summary: "Foundational reference overview of the Card Management System's core features organized into a configuration ring (issuer setup, card programs, PAN generation, PIN management, card production) and a runtime ring (card controls, authorization support) for two deployment models."
---

## Summary

This document provides a foundational reference overview of the [[Card Management System]]'s core features for [[Project Phoenix]], organized into a configuration ring (pre-service setup: issuer management, card programs, PAN generation, PIN management, card production) and a runtime ring (live operations: card controls evaluation, authorization support). The [[Card Management System]] serves both Processor Model (multi-tenant) and Bank/Issuer Model (single-tenant) deployments and integrates with the [[Authorization Engine]], [[TSP]], [[EMV Data Preparation Platform]], and card personalisation vendors. Authored by Tracy Ojaigho of [[Moniepoint]].

## Key Points

- **Configuration Ring**: All setup required before cards enter service — issuer setup, card programs, PAN generation, PIN management, card production.
- **Runtime Ring**: Live, in-service operations — card controls evaluated on every transaction, authorization data supplied to [[Authorization Engine]].
- **Data Hierarchy**: CMS organizes data as Issuer → Card Program → Card → Account, with strict hierarchical governance for configuration inheritance and card assignment.
- Five authorization types govern how [[Authorization Engine]] handles transactions when issuer host is unavailable: Full Authorization, Full Authorization with Advices, Balance Stand-in Authorization, Velocity Stand-in Authorization, No Stand-in Authorization.
- Five core cryptographic keys managed via HSM: KVP (PIN verification), CVK (CVV generation), IK (Issuer Key for EMV), CAK (card authentication), ECK/EMK (encryption).
- Three card types: Personalised Cards (linked to cardholder at production), Anonymous/Batch Cards (personalized later), Virtual Cards (credentials only, no physical card).
- Three PAN generation methods: Sequential with Wraparound (reuses expired PANs), Random Unique (random within range), Pre-allocated (selects from pool). All PANs include Luhn check digit.
- Two PIN verification schemes: IBM PIN Verification Scheme (produces PIN Offset matching PIN length) and Visa PVV Scheme (fixed 4-digit verification value); configured at card program level.
- Card status states: New/Pending, Active, Blocked (Temporary), Blocked (Permanent), Expired, Replaced, Cancelled — full audit trail on all transitions.
- Four card control types: Spending Limits (per-transaction/daily/weekly), MCC Restrictions (merchant category blocking), Geographic Controls (country/region restrictions), Channel Controls (online/contactless/ATM/POS enable/disable). Controls configured at program level (defaults) or card level (overrides); changes take effect immediately on next transaction.
- [[Authorization Engine]] integration governed by versioned API contract requiring joint sign-off on schema changes and defined migration windows.
- Five Portal role types: Platform Administrator (full access), Platform Operator (day-to-day operations), Issuer Administrator (issuer-scoped), Issuer Operator (card operations only), Read-Only/Auditor (view-only).
- Card Production is a two-stage process: Stage 1 (Staging) scans database to identify cards needing production; Stage 2 (File Generation) assembles personalisation file; failed runs retain staging results for retry.
- PIN lifecycle: Generation (HSM during production), Distribution (PIN mailer), Storage (PIN code only, not PIN itself), Cardholder-Initiated Change, PIN Unlock (for lockouts after failed attempts).
- Every action generates immutable audit record capturing event type, timestamp, operator/system, affected card/account, and state before/after.

## Entities Mentioned

- [[Moniepoint]] — parent organization; author Tracy Ojaigho is employee
- [[Project Phoenix]] — program/initiative context
- [[Card Management System]] — primary subject of this document
- [[Card Issuance & Processing Platform]] — full platform name
- [[Authorization Engine]] — runtime service reading CMS card status and controls for approve/decline decisions
- [[TSP]] — Transaction Switching & Processing; handles fund movement (holds, reversals, clearing)
- [[EMV Data Preparation Platform]] — receives card production files containing EMV profile data and cryptographic material
- [[Thales HSM]] — Hardware Security Module managing cryptographic keys for PIN generation and card production
- [[Core Banking Application]] — source of account linkage and available balance data for Authorization Engine
- [[Financial Institution]] — generic term for issuer receiving CMS services from processor

## Concepts

- [[Configuration Ring]] — all setup required before cards enter service: issuer setup, card programs, PAN generation, PIN management, card production.
- [[Runtime Ring]] — live, in-service operations: card controls evaluated on every transaction, authorization data supplied to Authorization Engine.
- [[Data Isolation]] — Portal users under issuer scope cannot access configuration, cards, or reports of other issuers.
- [[Stand-in Processing]] — CMS decisions when issuer host unavailable: balance-based, velocity-based, or decline-all.
- [[Cryptographic Key Management]] — HSM-based management of KVP, CVK, IK keys; keys distributed only to trusted parties.
- [[PIN Offset]] — output of IBM PIN Verification Scheme; length matches PIN itself (4-12 digits).
- [[Luhn Check Digit]] — integrity check digit calculated and appended to all generated PANs.
- [[Card Controls]] — four types (spending limits, MCC, geographic, channel); program-level defaults and card-level overrides; effective immediately on next transaction.
- [[Authorization Type]] — issuer-level setting (five types) determining CMS transaction handling when host unavailable.
- [[Audit Trail]] — immutable records on all operational actions: event type, timestamp, actor, affected card/account, before/after state.
- [[Card Lifecycle]] — seven-state machine: New/Pending → Active → Blocked (Temporary/Permanent) → Expired → Replaced → Cancelled.
- [[PAN Generation]] — three strategies: Sequential with Wraparound, Random Unique, Pre-allocated.
- [[Card Production]] — two-stage process: Staging (identify cards needing production) + File Generation (assemble personalisation file for perso vendor).
- [[Deployment Model]] — Processor Model (multi-tenant) vs. Bank/Issuer Model (single-tenant); single codebase.
- [[Role-Based Access Control]] — five Portal roles governing access scope from Platform Administrator down to Read-Only/Auditor.
- [[Versioned API Contract]] — Authorization Engine integration requires joint sign-off on schema changes with defined migration windows.
