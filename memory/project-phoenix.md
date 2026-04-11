---
title: Project Phoenix
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: "Project Phoenix is Moniepoint's platform rebuild initiative delivering a new Card Issuance & Processing platform using a Spine-and-Module architecture that enables multi-market expansion without core platform changes."
---

## Overview

Project Phoenix is a major [[Moniepoint]] platform initiative to build the [[Card Issuance & Processing Platform]] from the ground up. The platform is designed around a [[Spine and Module Architecture]] — a market-agnostic shared Spine plus independently deployable market-specific Modules — enabling new market launches without Spine changes.

## Scope

Project Phoenix encompasses the full [[Card Issuance & Processing Platform]], which owns:
- [[Card Management System]] — card lifecycle engine and program configuration
- [[Authorization Engine]] — real-time approve/decline decisions
- [[3DS/SCA Service]] — cardholder authentication for card-not-present transactions
- [[Card Dispute Service]] — end-to-end dispute lifecycle management
- [[EMV Data Preparation Platform]] — EMV profile management and personalisation vendor data flows

## Delivery Phases

1. **Phase 1** — Nigeria Platform Build: Spine + Nigeria Module (Verve and Visa adapters, personalisation vendor, BIN/config)
2. **Phase 2** — Nigeria Incremental Cutover: feature-flagged traffic migration with rollback capability
3. **Phase 3** — UK Launch: add UK Module (Visa/Mastercard adapters, PSD2-compliant SCA adapter)
4. **Phase 4** — Kenya Launch: add Kenya Module (Visa adapter, config)
5. **Phase 5** — Additional Markets: same pattern, Spine unchanged

## Architecture Principle

"Adding a new market means adding a Module; the Spine requires no changes." Market-specific differences (card scheme connectors, EMV data prep, personalisation vendor adapters, 3DS/SCA implementations, BIN configuration) live in Modules.

## Team Structure

Two teams under [[Digital Banking Platforms]]:
- [[Team 1 Card Processing]] — owns Authorization Engine, 3DS/SCA, Card Dispute Service
- [[Team 2 Card Issuance]] — owns Card Management System, Card Controls Service, EMV Data Prep

Platform leadership reports to Head of Digital Banking Platforms → Head of CI&P Product + Head of CI&P Engineering.

## Success Targets

- Card authorization latency: <500ms
- Auth reversal: <500ms
- Platform API availability: 99.99%
- New market capability delivered via config vs. code: >80%
- Change failure rate: <5%
- Zero money-loss incidents

## Sources

- [[001-CI_P-exec-overview_v1.1]] — executive overview
- [[002-CI_P_Platform_Team_Structure_v1_6]] — team structure
- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS core features
