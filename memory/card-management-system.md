---
title: Card Management System
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: The Card Management System (CMS) is the core platform module within Project Phoenix that manages the complete card lifecycle — from issuer onboarding and card program definition through production, PIN management, activation, controls, and authorization support.
---

## Overview

The Card Management System (CMS) is the authoritative platform for managing payment cards within [[Project Phoenix]] / [[Card Issuance & Processing Platform]], owned by [[Team 2 Card Issuance]]. It operates in two rings: a configuration ring (all setup before cards enter service) and a runtime ring (live controls and authorization support on every transaction).

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

- **Processor Model** — multi-tenant; single CMS instance serving multiple FIs/issuers with full data isolation
- **Bank/Issuer Model** — single-tenant; deploying institution is itself the issuer; FI/issuer separation maintained for future expansion

## Portal Access Roles

Five roles: Platform Administrator (full), Platform Operator (day-to-day ops), Issuer Administrator (issuer-scoped), Issuer Operator (card ops only), Read-Only/Auditor (view-only).

## Key Integration

- [[Authorization Engine]] — versioned API contract for card status and controls evaluation; joint sign-off on schema changes required
- [[TSP]] — fund movement; holds, reversals, clearing
- [[EMV Data Preparation Platform]] — receives card production files
- [[Thales HSM]] — cryptographic key management (KVP, CVK, IK, CAK, ECK, EMK, KWP)

## Author

Tracy Ojaigho, [[Moniepoint]]

## Sources

- [[003_CMS_Core_Features_Overview_v1.0]] — core features overview
- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD
