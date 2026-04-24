---
title: CI&P
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-24T11:50:57Z"
updated: "2026-04-24T11:50:57Z"
summary: "Card Issuance & Processing Platform — group platform under Project Phoenix within the Digital Banking Platforms cluster. Triad: Tracy Ojaigho (Head/Product), Emeka Awagu (Engineering), Design TBD. Phase 1 kicked off Apr 7, 2026; Phase 1 strike team spec-and-builds spine services while existing TeamApt / MFB teams hold BAU."
---

## Overview

CI&P (Card Issuance & Processing Platform) is the **group card platform** under [[Project Phoenix]], positioned within the [[Digital Banking Platforms]] cluster. It is the first fully-specified Phoenix platform and the proof point for the [[Spine and Module Architecture|Spine-and-Module pattern]].

## Leadership Triad

| Role | Person |
|---|---|
| Head / Product | [[Tracy Ojaigho]] |
| Engineering | [[Emeka Awagu]] |
| Design | TBD |

Reports to Head of Digital Banking Platforms (TBD).

## Scope (spine services)

### Team 1 — Card Processing
- [[Authorization Engine]] — real-time approve/decline decisions
- [[3DS/SCA Service]] — cardholder authentication for CNP transactions
- [[Card Dispute Service]] — end-to-end dispute lifecycle management

Phase 1: strike team spec-and-builds. TeamApt Acquirer Processing team stays in TeamApt and continues BAU; absorbed in later phases.

### Team 2 — Card Issuance
- [[Card Management System]] — card lifecycle engine and program configuration
- Card Controls Service
- [[EMV Data Preparation Platform]] — EMV profile management and personalisation vendor data flows
- Perso interface

Phase 1: [[Ketan Dhamasana]] transfers as EM (from AptPay Suite). Issuer Processing and CMS teams stay in TeamApt for now; absorbed in later phases.

## Phase 1 Status

- **Kicked off:** April 7, 2026
- **Strike Team + Continuity Operating Model (Apr 14, 2026):** platform leadership took operational ownership of the existing [[MFB Cards Team]] — existing engineers maintain legacy stack, strike team builds new CMS.
- **Strike teams** draw TeamApt EMs/ICs + Cards ([[MoniePoint MFB]]) engineers.

## Delivery Phases

1. Phase 1 — Nigeria Platform Build: Spine + Nigeria Module (Verve, Visa adapters, Perso vendor, BIN/config)
2. Phase 2 — Nigeria Incremental Cutover (feature-flagged, rollback capable)
3. Phase 3 — UK Launch (Visa/Mastercard adapters, PSD2 SCA adapter)
4. Phase 4 — Kenya Launch (Visa adapter, config)
5. Phase 5 — Additional Markets (Spine unchanged)

## Success Targets

- Card authorization latency: <500ms
- Auth reversal: <500ms
- Platform API availability: 99.99%
- Config vs code for new markets: >80%
- Change failure rate: <5%
- Zero money-loss incidents

## Consumption

- Consumes [[TSPP]] for fund movement (lien, reversal, clearing, dispute provisional credits)
- [[Payment Gateway Platform]] consumes CI&P for 3DS/SCA

## Sources

- [[Project Phoenix]]
- [[001-CI_P-exec-overview_v1.1]], [[002-CI_P_Platform_Team_Structure_v1_6]], [[003_CMS_Core_Features_Overview_v1.0]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[TeamApt-Platformization-Org-Movements (1)]] — Apr 22, 2026 brief confirming Phase 1 team structure and Ketan transfer