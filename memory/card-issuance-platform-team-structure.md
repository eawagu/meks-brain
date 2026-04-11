---
title: Card Issuance Platform Team Structure
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Card Issuance Platform\002-CI_P_Platform_Team_Structure_v1_6.docx.md
summary: Team structure and service ownership model for Card Issuance & Processing platform — two teams (Card Processing and Card Issuance) in triad leadership model, with defined API contracts for cross-team dependencies.
---

## Summary

Defines organizational structure for the Card Issuance & Processing platform under Project Phoenix. Two teams: Team 1 (Card Processing) owns Authorization Engine, 3DS/SCA, Card Dispute; Team 2 (Card Issuance) owns CMS, Card Controls, EMV Data Prep, Perso vendor interface. Triad leadership model (Product Lead, EM, Product Designer) at platform and team levels.

## Key Points

- Team 1 Card Processing: Authorization Engine, 3DS/SCA Service, Card Dispute Service
- Team 2 Card Issuance: CMS, Card Controls, EMV Data Prep, Perso vendor interface
- No team modifies another team's Spine service; cross-team via versioned API contracts
- Critical API contract: Auth Engine consumes Card Controls (no breaking changes without joint sign-off)
- Kafka event contract: CMS publishes card_issued → EMV Data Prep consumes
- Reports to Head of Digital Banking Platforms

## Concepts

- [[Card Issuance Platform]]
- [[Project Phoenix]]