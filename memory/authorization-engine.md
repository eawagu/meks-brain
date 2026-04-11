---
title: Authorization Engine
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: The Authorization Engine is the real-time approve/decline decision engine within the Card Issuance & Processing Platform, owned by Team 1 Card Processing, that evaluates card status, balance, and controls and calls TSP to place a lien on approval within a 500ms SLA.
---

## Overview

The Authorization Engine is the real-time transaction decision service within [[Project Phoenix]] / [[Card Issuance & Processing Platform]], owned by [[Team 1 Card Processing]]. It is the issuer-side decision point for every card transaction — producing APPROVE or DECLINE within a strict <500ms SLA.

## Decision Sequence

On every transaction, the Authorization Engine evaluates in order:
1. Card status (active / blocked / expired)
2. Account status
3. Available balance (via [[CBA]])
4. Active [[Card Controls]] (spending limits, MCC restrictions, geographic, channel)

Outcome: **APPROVE** → calls [[TSP]] to place a lien on the account balance. **DECLINE** → no lien placed, decline reason returned.

## SLA

- Authorization: <500ms (synchronous, blocking card scheme response)
- Auth reversal: <500ms (synchronous)
- Availability: 99.99%

## Card-Not-Present Flow

Card-not-present transactions require a mandatory [[3DS/SCA Service]] authentication gate before authorization proceeds. The 3DS/SCA Service passes auth result to authorization before the authorization decision is made.

## Integration Contracts

- **[[Card Management System]]** — reads card status and controls via versioned API contract. Team 2 cannot change the controls evaluation schema without Team 1 sign-off and a migration window.
- **[[TSP]]** — tight coupling; calls TSP to place lien on approval; all fund movement goes through TSP
- **[[CBA]]** — reads available balance (read-only, medium coupling)

## Authorization Types (Issuer-Level Config)

Five modes configured per issuer in CMS:
1. Full Authorisation — CMS-native decision
2. Full Authorisation with Advices — CMS + advisory
3. Balance Stand-in — CMS fallback on available balance when host unavailable
4. Velocity Stand-in — CMS fallback on velocity limits when host unavailable
5. No Stand-in — CMS declines all when host unavailable

## Sources

- [[001-CI_P-exec-overview_v1.1]] — executive overview
- [[002-CI_P_Platform_Team_Structure_v1_6]] — team structure (Team 1 ownership)
- [[003A_Issuer_Management_PRD_v1_5]] — authorization type configuration
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS integration contract
