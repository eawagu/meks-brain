---
title: "Cards Team Structure Systems Roadmap - 2026-04-21 13:00 WAT"
type:
  - "source"
cssclasses:
  - "source"
source_path: Cards Team Str, Systems & Roadmap - 2026_04_21 13_00 WAT - Notes by Gemini.md
retention_label: postgres
retention_rationale: "Architectural deep-dive on Moniepoint Cards team structure, platforms, services, and roadmap (Visa, tokenization, CX revamp). Two aligned strategic decisions: strike-team formation for new CMS (Reync) and Visa-led platform rollout to eliminate Postilion dependency. Future retrieval likely — referenced by Phoenix Phase 2 platformization, Visa project, and Cards team org changes."
created: "2026-04-25T11:55:34Z"
updated: "2026-04-25T11:55:34Z"
summary: "2026-04-21 13:00 WAT Cards Team Structure, Systems & Roadmap KT meeting between Olufemi Davies (outgoing context-holder), Tracy Ojaigho (incoming), and Emeka Awagu. Maps the current Cards team structure (Card Sales/Distribution under Nadin, Card Infrastructure under Damola), enumerates all platforms/services, and aligns two strategic decisions: strike-team formation to build new CMS (Reync) + drive AI; Visa project is the platform-rollout vehicle to eliminate Postilion dependency."
---

## Summary

Cards Team Structure, Systems & Roadmap meeting at 2026-04-21 13:00 WAT. Attendees: [[Olufemi Davies]] (Moniepoint), [[Tracy Ojaigho]] (TeamApt; meeting owner), [[Emeka Awagu]] (TeamApt CTO). Olufemi walks Tracy and Emeka through the **current Cards team structure**, all platforms and services, and the **strategic roadmap** (Visa-led platform rollout, Postilion replacement, AI-driven operations support). Two aligned strategic decisions: (1) form a dedicated strike team to build the new Card Management System and drive AI; (2) Visa is the platform-rollout vehicle, with primary strategic focus on migrating off [[Postilion]] and improving operational support for chargeback and logistics teams.

## Current Cards Team Structure

Two product teams (originally planned to grow to three; the third was absorbed by a new team):

1. **Card Sales and Distribution** \u2014 Product manager: [[Nadin]]. EM: separate from infrastructure.
2. **Card Infrastructure** \u2014 Product manager: [[Damola]]. EM: [[Niche]].

A third team was originally planned for Value Added Services (VAS \u2014 tokenization, ACS) but those functions currently sit under Card Infrastructure.

## Platforms and Services

### Card Sales and Distribution

- **Card Service** \u2014 used for selling cards; defines sharing formula for agents and PRMs.
- **Logistics Service** (UI + core engine) \u2014 inventory management; handles movement of cards from head office to ROs (Regional Offices) \u2192 SROs (Sectoral Regional Offices) \u2192 BOs (Branch Offices). RO personnel scan a code on each box to accept delivery.
- **Operational team** under [[Philip]] \u2014 four people; collect cards from peso company and input quantities based on dashboard-driven regional need.

### Card Infrastructure

- **[[Postilion]]** \u2014 incumbent transaction switch (target for replacement).
- **Hardware Security Modules ([[HSM]])**.
- **Card Manager Service (CMS)** \u2014 connects system to core banking application ([[CBA]]); handles card blocking. Limitation: current CMS does not show real account number (uses dummy account number), making internal refunds via transfer difficult.
- **New CMS \u2014 [[Reync]]** \u2014 in development; intended to incorporate functionality currently external to CMS (card blocking, account-card linking) and reduce [[Interswitch]] dependency.
- **Card Transaction Service** \u2014 transaction processing middleware between system and core banking.
- **Card OTP Service** \u2014 manages OTPs for secure transactions (Safe Token; potential Visa Token); uses whitelisted gateway.
- **Dispute Management Service** \u2014 handles customer-logged disputes; checks existence on [[IDS]] and [[AITA]]; communicates resolution.
- **Pseudo digitization** via [[Sudo Africa]] \u2014 facilitates "tap to pay" with phone-as-card (alternative to tokenization; PAN stored securely on phone).

### External Integrations

- **[[Apps Pay UI]]** \u2014 UI for background operations.
- **[[IDS]]**, **[[AITA]]**.
- Switches connected: [[Verve]] (on-us + remote), [[Interswitch]] (transactions through them).
- **[[Tap]]** connected for settlement; arrangements with [[Zenith Bank]] complete to enable issuer debit / acquirer settlement.

## Roadmap

Crucial work for the year, in order:

1. **[[Visa project]]** \u2014 launch on the new platform (Reync).
2. **Tokenization** \u2014 [[Visa Tokenization]] + Africa details.
3. **CX Revamp** \u2014 customer experience for card requests and dispute logging.
4. Maintain focus on sales, operations, and reducing failure rates.

"Tap to pay" launches alongside Visa, then tokenization follows.

## Platformization (Phoenix Phase 2)

- Phase 2 focuses on **Transaction Switching and Processing (TSP)**, led by [[Frank]] and [[Alex]].
- A **strike team** will be formed from people across teams expected to join the card team, with the primary goal of building the new CMS (Reync). The new CMS is intended to absorb the functions of the current internal CMS and eventually production aspects from card distribution.
- Strike-team responsibilities also include **AI-driven solutions and operationalizing AI** \u2014 automating processes, reducing manual request logging.
- **Initial AI priority**: support operations teams \u2014 [[Aima]]'s Chargeback / Issue Resolution team and [[Philip]]'s Logistics & Production team.

## Decisions (ALIGNED)

- **Strike team formation for platform development** \u2014 a dedicated strike team will be established to build a new Card Management System (CMS) and drive upcoming card-issuing initiatives.
- **Strategic priorities for new platform rollout** \u2014 the platform rollout will launch using the [[Visa project]], with primary strategic focus on migrating services to eliminate dependency on [[Postilion]] and providing improved operational support for the chargeback and logistics teams.

## Next Steps

- [[Tracy Ojaigho]] \u2014 speak with [[Nadin]] and [[Damola]]; obtain in-depth roadmap details.
- [[Tracy Ojaigho]] \u2014 schedule a meeting with [[Romulo]] later this week (product + AI initiatives).
- [[Tracy Ojaigho]] \u2014 meet with the current card team (planned Friday) to brief them on the changes.
- [[Olufemi Davies]] \u2014 announce the strike team to the current team; introduce the team and reassure that current operations will not be immediately affected.

## Communication & Transition Strategy

Communicate to the team about the strike team and reassure them that current operations will not be affected to maintain comfort during transition. Note: company has shown significant growth in market share \u2014 from 7th to 3rd place \u2014 with goal of reaching 2nd place soon.

## Entities Mentioned

People: [[Olufemi Davies]], [[Tracy Ojaigho]], [[Emeka Awagu]], [[Nadin]], [[Damola]], [[Niche]], [[Philip]], [[Aima]], [[Romulo]], [[Frank]], [[Alex]]

External: [[Visa]], [[Mastercard]], [[Interswitch]], [[Postilion]], [[Sudo Africa]], [[Verve]], [[Zenith Bank]]

Internal systems / services: [[Reync]], [[Apps Pay UI]], [[IDS]], [[AITA]], [[Card Manager Service]], [[Card Transaction Service]], [[Card OTP Service]], [[Dispute Management Service]], [[Logistics Service]], [[Card Service]]

System: [[Gemini]]

## Concepts

- [[Cards team org]]
- [[Card Management System]]
- [[Strike team]]
- [[Visa project]]
- [[Visa Tokenization]]
- [[Tap to pay]]
- [[Postilion replacement]]
- [[Phoenix Phase 2 \u2014 Platformization TSP]]
- [[AI operations support]]
- [[Chargeback]]
