---
title: Team 1 Card Processing
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: Team 1 Card Processing is one of two engineering teams in the Card Issuance & Processing Platform under Project Phoenix, owning the Authorization Engine, 3DS/SCA Service, and Card Dispute Service — the full transaction trust surface.
---

## Overview

Team 1 Card Processing is one of two platform engineering teams within [[Project Phoenix]] / [[Card Issuance & Processing Platform]], under [[Digital Banking Platforms]]. Team 1 owns "the full transaction trust surface — from cardholder authentication through to authorization decision and dispute resolution."

## Services Owned

| Service | SLA |
|---|---|
| [[Authorization Engine]] | Card Processing SLA |
| [[3DS/SCA Service]] | Card Processing SLA |
| [[Card Dispute Service]] | Per card scheme SLA |

## Team Structure

Each team is anchored by a triad:
- **Product Lead** — owns feature roadmap, user stories, stakeholder communication at team level
- **Engineering Manager (EM)** — owns technical execution, sprint delivery, architecture at team level; manages mid-to-senior developers
- **Product Designer** — owns UX and design consistency across all team surfaces

## Cross-Team Dependencies

Team 1 **consumes** two API contracts from [[Team 2 Card Issuance]]:
1. **Controls evaluation** — Auth Engine reads card controls from Card Controls Service; Team 2 cannot change controls eval schema without Team 1 sign-off + migration window.
2. **Mobile app surfaces** — Team 1's mobile surfaces consume Card Management endpoints (Block, Unblock, Activate, Limit, Enable tap-to-pay); breaking changes require joint sign-off.

Team 1 **does not modify** Team 2's Spine services. All cross-team dependencies are mediated through versioned API contracts.

## Sources

- [[002-CI_P_Platform_Team_Structure_v1_6]] — primary team structure definition
- [[001-CI_P-exec-overview_v1.1]] — platform overview
