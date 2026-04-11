---
title: 002-CI_P_Platform_Team_Structure_v1_6
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: 002-CI_P_Platform_Team_Structure_v1_6.docx.md
summary: Team structure definition for the Card Issuance & Processing platform under Project Phoenix, describing two teams (Card Processing and Card Issuance) with their Spine service ownership, market module responsibilities, interface contracts, and role descriptions.
---

## Summary

This document defines the team structure for the [[Card Issuance & Processing Platform]] under [[Project Phoenix]]. It describes how two teams — [[Team 1 Card Processing]] and [[Team 2 Card Issuance]] — own Spine services and market module adapters across Nigeria, UK, and Kenya, and establishes the versioned API contracts governing cross-team dependencies.

## Key Points

- Three governing structural principles: (1) Each team owns a coherent capability domain including both Spine services and market module adapters for that domain. (2) No team modifies another team's Spine service — all cross-team dependencies are mediated through versioned API contracts. (3) Each team is anchored by a triad: Product Lead, Engineering Manager, and Product Designer.
- Team 1 (Card Processing) owns: [[Authorization Engine]], [[3DS/SCA Service]], [[Card Dispute Service]]. SLA: Card Processing SLA.
- Team 2 (Card Issuance) owns: [[Card Management System]], [[Card Controls Service]], [[EMV Data Preparation Platform]], personalisation vendor interface. SLA: Card Issuance SLA.
- Card Controls Service rationale: "Controls are fundamentally card configuration, not real-time decision logic; the Authorization Engine consumes controls at runtime via an API contract owned by Team 2."
- Three explicit interface contracts required before Phase 1 build: (1) Auth Engine ← Card Controls (Team 1 consumes Team 2); versioned API, Team 2 cannot change controls eval schema without Team 1 sign-off. (2) Mobile app ← Card Mgmt (Team 1 consumes Team 2); versioned API for Block/Unblock/Activate/Limit/Tap-to-pay. (3) EMV Data Prep ← Card Mgmt (intra-Team 2 Kafka event contract; card_issued event schema jointly owned within Team 2).
- Platform leadership hierarchy: Head of Digital Banking Platforms → Head of CI&P Product + Head of CI&P Engineering → Team 1 and Team 2 triads.
- Each team has one Engineering Manager managing mid-to-senior developers.
- Markets covered: Nigeria, UK, Kenya.
- Document is Draft v0.1, dated 2026-03-24, authored by Card Issuance Platform Team, audience: CI&P Team Leadership.

## Entities Mentioned

- [[Project Phoenix]] — program/initiative
- [[Card Issuance & Processing Platform]] — platform being structured
- [[Team 1 Card Processing]] — owns Authorization Engine, 3DS/SCA, Card Dispute Service
- [[Team 2 Card Issuance]] — owns Card Management System, Card Controls Service, EMV Data Prep, perso vendor interface
- [[Authorization Engine]] — real-time transaction approval engine (Team 1)
- [[3DS/SCA Service]] — cardholder authentication for CNP transactions (Team 1)
- [[Card Dispute Service]] — end-to-end dispute lifecycle (Team 1)
- [[Card Management System]] — card program config and lifecycle engine (Team 2)
- [[Card Controls Service]] — runtime enforcement of customer-defined controls (Team 2)
- [[EMV Data Preparation Platform]] — EMV profile management and perso vendor data flow (Team 2)
- [[TSP]] — Transaction Switching & Processing; key dependency for Authorization Engine and Card Dispute Service
- [[Head of Digital Banking Platforms]] — platform leadership role, accountable for delivery across both teams
- [[Head of CI&P Product]] — product vision and stakeholder communication across platform; reports to Head of Digital Banking Platforms
- [[Head of CI&P Engineering]] — technical health, architecture, engineering standards; reports to Head of Digital Banking Platforms

## Concepts

- [[Team Ownership Model]] — each team owns a coherent capability domain end-to-end: both Spine services and market module adapters across all markets.
- [[Versioned API Contract]] — no team modifies another's Spine service; all cross-team dependencies use explicit versioned contracts requiring joint sign-off for breaking changes.
- [[Team Triad]] — three-role leadership anchor per team: Product Lead (vision/roadmap), Engineering Manager (technical execution), Product Designer (UX consistency).
- [[Spine and Module Architecture]] — shared platform layer (Spine) + market-specific adapters (Modules); each team owns modules for their domain across all markets.
- [[Cross-Team Dependency Management]] — runtime dependencies between teams enforced through versioned APIs and Kafka event contracts, not direct service modification.
- [[Kafka Event Contract]] — async intra-team dependency: card_issued event from Card Management consumed by EMV Data Prep; schema jointly owned within Team 2.
