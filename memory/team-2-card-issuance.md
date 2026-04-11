---
title: Team 2 Card Issuance
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: Team 2 Card Issuance is one of two engineering teams in the Card Issuance & Processing Platform under Project Phoenix, owning the Card Management System, Card Controls Service, EMV Data Preparation Platform, and personalisation vendor interface.
---

## Overview

Team 2 Card Issuance is one of two platform engineering teams within [[Project Phoenix]] / [[Card Issuance & Processing Platform]], under [[Digital Banking Platforms]]. Team 2 owns "all card issuance activities — from card production and lifecycle management through to EMV data preparation and personalisation."

## Services Owned

| Service | SLA |
|---|---|
| [[Card Management System]] | Lifecycle ops SLA |
| [[Card Controls Service]] | Controls eval latency SLA |
| [[EMV Data Preparation Platform]] | Card issuance SLA |
| Personalisation vendor interface | Card issuance SLA |

Market modules also owned by Team 2: Card program config + Perso adapter (Nigeria), Card program config + Perso adapter (UK), Card program config + Perso adapter (Kenya).

## Team Structure

Each team is anchored by a triad:
- **Product Lead** — owns feature roadmap, user stories, stakeholder communication at team level
- **Engineering Manager (EM)** — owns technical execution, sprint delivery, architecture at team level; manages mid-to-senior developers
- **Product Designer** — owns UX and design consistency across all team surfaces

## Rationale for Card Controls Ownership

Card Controls Service is owned by Team 2 (not Team 1) because "controls are fundamentally card configuration, not real-time decision logic." The [[Authorization Engine]] (Team 1) consumes controls at runtime via an API contract owned by Team 2.

## Intra-Team Interface

Team 2 has one internal Kafka event contract: Card Management publishes `card_issued` event; EMV Data Prep consumes it. Event schema is jointly owned within Team 2.

## Cross-Team Dependencies (Consumed by Team 1)

Team 2 **provides** two API contracts to [[Team 1 Card Processing]]:
1. **Controls evaluation** — card controls schema; Team 2 cannot change without Team 1 sign-off + migration window.
2. **Mobile app surfaces** — Card Management endpoints for Block/Unblock/Activate/Limit/Tap-to-pay; breaking changes require joint sign-off.

## Sources

- [[002-CI_P_Platform_Team_Structure_v1_6]] — primary team structure definition
- [[001-CI_P-exec-overview_v1.1]] — platform overview
- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD (Team 2 scope)
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS features (Team 2 scope)
