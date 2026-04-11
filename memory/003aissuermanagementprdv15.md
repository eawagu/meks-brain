---
title: 003A_Issuer_Management_PRD_v1_5
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: 003A_Issuer_Management_PRD_v1_5.docx.md
summary: PRD defining the complete Issuer Management configuration layer for the Card Management Service — covering issuer data model, FI association, authorization types, cryptographic key pools, BIN registry, and user access control with three peer-level roles.
---

## Summary

This PRD defines the [[Issuer Management]] module, the foundational configuration layer of the [[Card Management System]] for [[Project Phoenix]]. It establishes requirements for creating and managing issuer records (the top-level entity scoping all cards and programs), associating them with Financial Institutions, configuring authorization types, managing cryptographic key pools, registering BIN ranges, and provisioning user accounts with role-based access. Two deployment models are supported from day one: Processor and Bank/Issuer.

## Key Points

- The [[Issuer]] is the top-level entity in CMS data hierarchy — every card program, BIN range, card, account, velocity profile, risk profile, and key set is scoped to an issuer. No card can be issued without a fully provisioned issuer.
- A [[Financial Institution]] (FI) represents the bank/fintech that owns the card portfolio. One issuer is linked to exactly one FI (1:1), but one FI can have multiple issuers (e.g., separate issuers per market). Every issuer must be linked to an FI.
- Five authorization types at issuer level determine how transactions are handled: Full Authorisation (CMS-native), Full Authorisation with Advices (CMS + advisory), Balance Stand-in (CMS fallback on balance), Velocity Stand-in (CMS fallback on velocity), No Stand-in (CMS declines all when host unavailable).
- All five DES key types (CAK, ECK, EMK, KVP, KWP) must be registered at issuer level before any card program can be created. Keys are pre-provisioned in the [[Thales HSM]]; the CMS registers the encrypted DES value and KCV.
- A BIN range is a contiguous range of PANs defined by prefix (6-8 digits), length, start, and end. The [[BIN Registry]] holds all BIN ranges registered against an issuer and is the source of truth for BIN-to-issuer and BIN-to-program mappings.
- Three peer-level roles: Platform Admin (super admin, manages FIs/issuers/keys/users, all FIs), Issuer Admin (operations staff, manages card programs/cards, exactly one FI), Audit (compliance/risk, read-only, all FIs by default or optionally one FI).
- FI mapping is set at account creation and cannot be changed after activation. Account must be deactivated and a new account created if mapping change is required.
- Platform Admin accounts are always mapped to ALL FIs on the instance with no mechanism to restrict scope.
- Issuer status lifecycle: INACTIVE → ACTIVE → SUSPENDED → INACTIVE with full audit trail. All status changes logged with actor, timestamp, and field values.
- All user accounts provisioned by Platform Admin via console (no self-registration). Accounts activated via secure email invitation with single-use token valid for 72 hours.
- Two deployment models: Processor Model (single CMS instance serving multiple FIs, each as distinct isolated issuer) and Bank/Issuer Model (deploying institution is itself the issuer, FI/issuer separation maintained for future expansion).
- Scope boundaries: Issuer Management owns issuer records, FI definition, auth type config, currency, status, key pool, BIN registry. Out of scope: stand-in parameters (Card Program), card program config, BIN-to-program assignment, card production, auth engine runtime, HSM hardware.
- 35 user stories organized by area: FI Management (2), Issuer Onboarding (4), Authorization Type Config (5), Key Pool Management (4), BIN Registry (7), User Management (13).

## Entities Mentioned

- [[Project Phoenix]] — program/initiative context
- [[Card Management System]] — platform this module belongs to
- [[Card Issuance & Processing Platform]] — full platform name
- [[Issuer]] — top-level entity scoping all cards, programs, and configuration
- [[Financial Institution]] — bank, fintech, or licensed institution owning card portfolio
- [[Authorization Engine]] — runtime service reading issuer config for transaction authorization
- [[Thales HSM]] — Hardware Security Module for key generation and pre-provisioning
- [[BIN Registry]] — source of truth for BIN-to-issuer and BIN-to-program mappings
- [[Identity Provider]] (IdP) — external system for SSO/OAuth2 integration
- [[Card Issuance Platform Team]] — authors of this PRD
- [[Team 1 Card Processing]] — owns 3DS/SCA configuration; out of scope for this module
- [[Infrastructure]] — owns Thales HSM hardware provisioning and physical administration
- Platform Admin — super administrator role managing CMS instance
- Issuer Admin — operations staff role managing card portfolio for one FI
- Audit — compliance/risk read-only role

## Concepts

- [[Issuer Hierarchy]] — CMS data model: Issuer → Card Program → Card → Account; all configuration and card assignment flows through this hierarchy.
- [[Financial Institution]] — entity owning card portfolio; controls Portal access scope for users via FI mapping.
- [[Authorization Type]] — issuer-level setting (five types) determining how CMS handles transactions when host is unavailable.
- [[Stand-in Processing]] — fallback authorization logic when host unavailable; balance-based or velocity-based; parameters at card program level.
- [[DES Key Pool]] — five cryptographic DES key types (CAK, ECK, EMK, KVP, KWP) registered at issuer level; all five required before card program creation.
- [[KCV]] — Key Check Value; cryptographic checksum for DES keys; visible to authorized users while encrypted key is HSM-only.
- [[BIN Registry]] — registry of Bank Identification Number ranges registered against an issuer; PAN assignment source of truth.
- [[Role-Based Access Control]] — three peer-level roles (Platform Admin, Issuer Admin, Audit) with FI-based mapping controlling which issuers each user can access.
- [[User Provisioning]] — all accounts created by Platform Admin only; no self-registration; activated via single-use email invitation token (72 hours).
- [[Audit Trail]] — immutable log of all changes to issuer records, status transitions, and user account changes.
- [[Issuer Lifecycle]] — four-state machine: INACTIVE → ACTIVE → SUSPENDED → INACTIVE.
- [[FI Mapping]] — assignment of user account to one or more FIs, immutable after activation.
- [[Deployment Model]] — Processor Model (multi-tenant, multiple FIs/issuers) vs. Bank/Issuer Model (single institution, FI/issuer separation maintained).
- [[Data Isolation]] — multi-issuer separation: Issuer Admin can only access data under issuers linked to their FI.
