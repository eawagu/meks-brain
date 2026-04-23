---
title: Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21
type:
  - "source"
cssclasses:
  - "source"
source_path: review\Cards_Team_Meeting_Report.docx
retention_label: postgres
retention_rationale: Multi-stakeholder transition briefing with named systems, BIN-level technical detail, switch routing decisions, named action items, and a roadmap. Future retrieval likely when scoping CMS migration, Visa launch, or AI automation work.
meeting_date: 2026-04-21
meeting_time: "13:00 WAT"
participants:
  - "Olufemi Davies"
  - "Tracy Ojaigho"
  - "Emeka Awagu"
documented_by: Gemini AI (auto-notes) + Transcript
name_corrections_applied: "Source uses 'Nadin' → resolved to Nadeem Abbas; 'Damola' → resolved to Damilola Oyediran; 'Taps / TMSS' → resolved to TeamApt (the settlement switch reference)"
created: "2026-04-23T05:20:54Z"
updated: "2026-04-23T05:20:54Z"
summary: Knowledge transfer meeting (Apr 21, 2026) — Olufemi Davies to Tracy Ojaigho on Moniepoint MFB Cards Team structure, platforms, integrations, 2026 roadmap, and strike team formation under the CI&P Platform / Project Phoenix transition.
---

## Summary

Knowledge-transfer meeting on 2026-04-21 between [[Olufemi Davies]] (Head, Moniepoint MFB Cards Team) and [[Tracy Ojaigho]] (incoming CI&P Platform lead), with [[Emeka Awagu]]. Covers the current MFB Cards Team org structure, the platforms that comprise its card stack today, external switch and provider connections, the 2026 roadmap (Visa launch, tap-to-pay, VTS/VAS, CX revamp, ops excellence), and the formation of a strike team to build the new [[Card Management System]] and drive AI automation under [[Project Phoenix]] platformisation.

This is the next chapter in the [[Note — Existing Cards Team Moniepoint MFB Transition 2026-04-14]] transition: that note documented who is on the MFB Cards teams; this source documents what they own, how it works, and what they will deliver next.

**Name resolution notes** (source uses informal/transcribed names — corrected here):
- "Nadin" → [[Nadeem Abbas]] (PM, Card Sales & Distribution / MFB Cards Team 1)
- "Damola" → [[Damilola Oyediran]] (PM, Card Infrastructure / MFB Cards Team 2)
- "Taps / TMSS" → [[TeamApt]] (the settlement switch under TeamApt's Domestic Switching license, not a third party)

## Key Points

### Org Structure (MFB Cards Team)
- Two product teams under Olufemi Davies; a third team (VAS — tokenization, ACS) was planned but is shelved pending platformisation. VAS scope currently sits under Card Infrastructure.
- **Card Sales & Distribution** (PM: [[Nadeem Abbas]]) — owns card pricing/sharing formulas (agent / PRM / BO splits), card ordering and production requests, distribution chain (Head Office → RO → SRO → BO), customer sales experience for Visa and Africa card programmes.
- **Card Infrastructure** (PM: [[Damilola Oyediran]]) — larger team. Owns transaction processing, security modules, system integrations. Holds the deferred VAS scope (tokenization, ACS).
- **Operations sub-teams** embedded in Cards Team:
  - Card Production & Logistics (lead: [[Philip]], team of 4) — physical card stock, card-file generation, warehouse intake from perso vendor, distribution to ROs.
  - Chargeback & Issue Resolution (lead: [[Aima]] / [[Precious]]) — chargeback processing, L2 customer support escalation for card issues.

### Platforms — Card Sales & Distribution
- **[[Card Service]]** — core selling platform; manages sharing formulas, pricing tiers, agent/PRM/BO commissions. Decisions made jointly with Growth Team before implementation.
- **[[Logistics Service]] + [[Logistics UI]]** — inventory and physical movement; QR/barcode scan registers delivery at each chain level; dashboard provides RO-level stock visibility (prevents false shortage claims).
- **[[Card Integration Service]]** (under Infrastructure) — integrates the card stack with internal platforms, notably [[Money Desk]] (MoniePoint helpdesk/customer support tool).

### Platforms — Card Infrastructure
- **[[Postillion]] + [[HSM]]** — external payment switch (owned by [[Interswitch]]) used for card production and authorisation. Deliberate strategy underway to **reduce dependency on Interswitch** (improves uptime, speeds up feature rollout). This is the strategic motivation for the new CMS — see Strike Team section.
- **[[Card Manager Service]]** (the legacy internal CMS — see [[Card Manager Service CMS Specification]]) — critical middleware between the card stack and the [[Core Banking Application]]. Functions: card blocking/unblocking, account-to-card linking, transaction routing. **Known limitation:** uses a dummy account number on Postillion rather than the real account number, which currently prevents Interswitch from processing direct refunds by transfer.
- **[[Card Transaction Service]]** — actual transaction processing flow; functionally a second middleware layer alongside Card Manager Service.
- **[[Card OTP Service]]** — One-Time Passwords for secure card operations (Safe Token). Designed to be extensible to Visa Token and 3D Secure / ACS. OTPs dispatched via MoniePoint's pre-whitelisted gateway.
- **[[Dispute Management Service]]** — handles customer-logged disputes end-to-end: receives from mobile app, checks against IDS/AIT, routes to resolution path, communicates status. Future expansion: international dispute rails ([[Verve]] Online, [[Mastercard]] Chargeback).
- **[[Digitisation Service]] + [[Sudo Africa]]** — enables tap-to-pay. MoniePoint uses [[Pseudo-Digitisation]]: actual PAN is securely stored on the customer's Android device and transmitted via EMV NFC at POS, **bypassing the need for VTS tokenisation**. External provider: Sudo Africa (subscription). Live for Android users internally; broader rollout pending NFC readiness on POS estate (OP and PE terminals are ~100% ready).
- **[[Apps Pay UI]]** — internal UI for background card operations (production requests, backend service management). Each domain (e.g. logistics) also has its own dedicated UI.

### External Integrations
| Switch / Provider | Purpose / Notes |
|---|---|
| [[Verve]] | Primary switch for on-us and remote transactions; ~99% of transactions are Verve. |
| [[Interswitch]] | Processes transactions routed through its network; also used for [[Mastercard]] (legacy, <300K cards outstanding, issuance halted). |
| [[TeamApt]] (TMSS) | Settlement connection. Technical integration complete; business/settlement arrangement with [[Zenith Bank]] in final stages ([[Kevin]] driving). |
| [[Sudo Africa]] | Tap-to-pay pseudo-digitisation (subscription). |
| IDS / AITA / GoZone | Dispute management and auxiliary integrations. |

**Switch strategy:** No new switches added unless clear commercial benefit. Long-term play is to route Visa acquiring through [[TeamApt]] — gradually negotiating with major banks (UBA, Access) to route MoniePoint Visa card transactions through TeamApt rather than UP/Interswitch.

### 2026 Roadmap (MFB Cards)
1. **Visa Launch & Tap-to-Pay Rollout** — most critical 2026 deliverable. Commercial payment for Visa programme is the primary dependency. Once live, NFC tap-to-pay (via Sudo Africa) deploys across Android base on OP/PE terminals.
2. **Visa Tokenization & VAS** — full VTS-based tokenization (potentially replacing pseudo-digitisation) planned post-Visa launch, likely Q4 2026. Includes ACS provider exploration. Discussions with an ACS provider in progress (previous provider [[Vicas]] discontinued due to cost).
3. **CX/App Experience Revamp** — card request flows (physical + virtual), dispute logging, card management. Scope owned by Nadeem and Damilola.
4. **Reduce Customer Failure Rates & Operational Excellence** — keep BRMs / channel partners supported to avoid diverting eng capacity to firefighting.

### Strike Team & Platformisation
- The MFB Cards team transitions into the [[Project Phoenix]] platform structure; Phase 2 (TSP, led by [[Frank Atashili]] and [[Alex Adeyemo]]) is currently underway.
- A **strike team** is formed ahead of the full team transition: at least one maker, one EM, plus another member, drawn from the teams that will eventually join the Cards platform. Two mandates:
  1. Build the new [[Card Management System]] — proprietary, configurable platform to replace dependency on Postillion and the legacy [[Card Manager Service]].
  2. Drive AI automation in card operations.
- **New CMS — architecture & migration:**
  - Visa project is the launch vehicle; Visa card management is the first workload on the new CMS.
  - Core card management functions in the legacy CMS migrate progressively.
  - Production capabilities (card-file generation) under Sales & Distribution may move to the new CMS; distribution logistics workflows recommended to remain separate.
  - Full cut-over later in the year once stability is confirmed; phased migration to minimise disruption.
  - **Primary strategic objective: eliminate Postillion dependency.**
  - Tracy noted a prior session with Damilola and [[Mish]] confirmed that most functions currently outside the CMS (in Card Manager Service) logically belong inside the new CMS.
- **AI & Automation priorities** (strike team scope):
  1. Chargeback & Issue Resolution (Aima/Precious) — automate dispute intake, routing, status communication. **Highest priority.**
  2. Logistics & Production (Philip) — automate card file generation, inventory requests, regional dispatch.
  3. General workflow automation: replace manual Jira request logging with AI-driven ticketing. Tool to be evaluated with [[Rumulo]] later in the week.
- **Change management:** Olufemi will give the current MFB Cards Team a heads-up about the incoming strike team, with messaging that current operations are not immediately affected. Tracy flagged the importance of reassuring team members — drawing on the people-management approach that helped grow MoniePoint's market share from 7th to 3rd in card issuance (target: 2nd by end of 2026).

### Decisions
| Decision | Rationale |
|---|---|
| Strike team formed immediately | Start CMS development without waiting for full team transition |
| Visa project launches on new CMS | Use Visa as the platform launch workload; validates new CMS in production |
| Primary CMS objective: eliminate [[Postillion]] dependency | Reduces Interswitch dependency; improves uptime and deployment agility |
| AI priority order: Chargeback first, then Logistics | Aima's and Philip's teams are highest-value AI automation opportunities |
| No new switch connections without clear commercial ROI | Limit switch exposure; long-term route acquiring through [[TeamApt]] |

### Action Items
| Owner | Action |
|---|---|
| [[Tracy Ojaigho]] | Meet with [[Nadeem Abbas]] (Card Sales PM) and [[Damilola Oyediran]] (Infrastructure PM) for detailed roadmap breakdown per team. |
| [[Tracy Ojaigho]] | Schedule meeting with [[Rumulo]] to review Jira automation / AI workflow tool. |
| [[Tracy Ojaigho]] | Meet with current Cards Team members (target: Friday) — introduce, brief on platformisation, begin relationship-building. |
| [[Olufemi Davies]] | Heads-up to current Cards Team on strike team formation; reassure on continuity. |
| [[Tracy Ojaigho]] | Finalise strike team composition (maker, EM, additional member); initiate CMS development scoping. |
| [[Kevin]] (via Olufemi) | Complete TeamApt/TMSS settlement setup with [[Zenith Bank]] for live transaction processing. |

## Entities Mentioned

[[Olufemi Davies]], [[Tracy Ojaigho]], [[Emeka Awagu]], [[Nadeem Abbas]], [[Damilola Oyediran]], [[Philip]], [[Aima]], [[Precious]], [[Kevin]], [[Rumulo]], [[Mish]], [[Frank Atashili]], [[Alex Adeyemo]], [[Card Service]], [[Logistics Service]], [[Card Integration Service]], [[Card Manager Service]], [[Card Transaction Service]], [[Card OTP Service]], [[Dispute Management Service]], [[Digitisation Service]], [[Apps Pay UI]], [[Money Desk]], [[Postillion]], [[HSM]], [[Interswitch]], [[Verve]], [[TeamApt]], [[Sudo Africa]], [[Zenith Bank]], [[Visa]], [[Mastercard]], [[Vicas]], [[Card Management System]], [[Card Issuance & Processing Platform]], [[Project Phoenix]], [[Moniepoint MFB]], [[Core Banking Application]]

## Concepts

[[Pseudo-Digitisation]], [[Strike Team Model]], [[NFC Tap-to-Pay]], [[Postillion Dependency Elimination]], [[Card Distribution Chain]]

## Glossary (from source)

| Term | Definition |
|---|---|
| ACS | Access Control Server — 3D Secure authentication for online card transactions |
| CBA | Core Banking Application |
| CMS | Card Management System (legacy internal + new platform-built) |
| EM | Engineering Manager |
| EMV | Europay/Mastercard/Visa — global chip card standard |
| HSM | Hardware Security Module |
| IDS | Internal Dispute System |
| NFC | Near-Field Communication |
| PAN | Primary Account Number |
| PRM | Partner Relationship Manager (agent network intermediary) |
| RO / SRO / BO | Regional Office / Sectoral Regional Office / Branch Office |
| TMSS | TeamApt settlement switch (per name correction — source originally wrote "Taps") |
| TSP | Transaction Switching & Processing (Phase 2 of platformisation) |
| VAS | Value Added Services (planned third team; currently under Infrastructure) |
| VTS | Visa Token Service |