---
type:
  - "entity"
title: Card Management System
created: 2026-04-11
summary: "The Phoenix CMS — Layer 2 Spine platform for the complete card lifecycle (issuer onboarding through authorization support) owned by Team 2 Card Issuance; primary strategic objective is to replace Moniepoint MFB's legacy Card Manager Service and eliminate Postillion dependency; Visa programme launches as validation workload. Apr 27 status: enhanced UI deployed to staging; security API/system docs unavailable, partner timeline revised to end of May."
updated: "2026-04-29T11:44:38Z"
cssclasses:
  - "entity"
---

## Overview

The Card Management System (CMS) is the authoritative Spine platform for managing payment cards within [[Project Phoenix]] / [[Card Issuance & Processing Platform]], owned by [[Team 2 Card Issuance]]. It operates in two rings: a configuration ring (all setup before cards enter service) and a runtime ring (live controls and authorization support on every transaction).

Under Phoenix's [[Spine and Module Architecture]], the CMS sits at **Layer 2 (Spine)** — market-agnostic shared platform — with per-market modules (Nigeria, UK, Kenya) handling scheme adapters, perso, BIN/config.

## Replacement of Legacy MFB CMS

A **primary strategic objective** of the Phoenix CMS is to **replace [[Moniepoint MFB]]'s legacy [[Card Manager Service]]** — eliminating the dependency on [[Postillion]] (the ACI/Interswitch switch) and its operational limitations (dummy account numbers blocking direct refunds, tight coupling to a vendor-managed switch).

See [[Postillion Elimination]] for the migration strategy:
- [[Visa]] programme serves as the launch workload on the new CMS
- Core functions (card blocking, account-to-card linking, etc.) migrated progressively from the legacy [[Card Manager Service]]
- Card file generation may also move from the MFB production team onto the new CMS (distribution logistics workflows recommended to stay separate)
- Phased cut-over planned later in 2026 once stability is confirmed

A prior working session between [[Tracy Ojaigho]], [[Damilola Oyediran]], and [[Mish]] concluded that most functions currently handled outside the legacy CMS (by Card Manager Service) logically belong inside the new Phoenix CMS.

## Data Hierarchy

Issuer → Card Program → Card → Account. All configuration and card assignment flows through this hierarchy. No card can exist without a fully provisioned issuer.

## Core Capabilities

### Configuration Ring (Pre-Service)
- **[[Issuer Management]]** — top-level entity management; FI association; auth type config; key pool; BIN registry
- **Card Program Management** — card program definition; BIN-to-program assignment; stand-in parameters; velocity/risk profiles
- **PAN Generation** — three strategies: Sequential with Wraparound, Random Unique, Pre-allocated; all PANs include Luhn check digit
- **PIN Management** — PIN generation (HSM), distribution (mailer), PIN code storage, change, and unlock; two verification schemes (IBM and Visa PVV)
- **Card Production** — two-stage: Staging (identify cards needing production) + File Generation (assemble personalisation file for perso vendor)

### Runtime Ring (Live Operations)
- **[[Card Controls]]** — four types: Spending Limits (per-tx/daily/weekly), MCC Restrictions, Geographic Controls, Channel Controls; effective immediately on next transaction
- **Authorization Support** — supplies card status and controls to [[Authorization Engine]] via versioned API contract

## Card Status States

New/Pending → Active → Blocked (Temporary/Permanent) → Expired → Replaced → Cancelled. Full audit trail on all transitions.

## Deployment Models

- **Processor Model** — multi-tenant; single CMS instance serving multiple FIs/issuers with full data isolation (this is the model that will host MFB as tenant, TeamApt as tenant, Sumac MFB as tenant, etc.)
- **Bank/Issuer Model** — single-tenant; deploying institution is itself the issuer; FI/issuer separation maintained for future expansion

## Portal Access Roles

Five roles: Platform Administrator (full), Platform Operator (day-to-day ops), Issuer Administrator (issuer-scoped), Issuer Operator (card ops only), Read-Only/Auditor (view-only).

## Key Integration

- [[Authorization Engine]] — versioned API contract for card status and controls evaluation; joint sign-off on schema changes required
- [[TSP]] — fund movement; holds, reversals, clearing
- [[EMV Data Preparation Platform]] — receives card production files
- [[HSM|Thales HSM]] — cryptographic key management (KVP, CVK, IK, CAK, ECK, EMK, KWP)

## Recent ATPP track status

- **2026-04-27 standup**: CMS **enhanced UI deployed to staging** (user guide and system document still pending, end-of-May target). CMS **security API/system documentation still unavailable** — revised partner timeline now end of May. Source: [[ATPP Daily Standup 20260427 Gemini Notes]].

## Author

Tracy Ojaigho, [[Moniepoint]]

## Sources

- [[003_CMS_Core_Features_Overview_v1.0]] — core features overview
- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]] — Postillion elimination objective and Visa-launch migration strategy
- [[ATPP Daily Standup 20260427 Gemini Notes]]
