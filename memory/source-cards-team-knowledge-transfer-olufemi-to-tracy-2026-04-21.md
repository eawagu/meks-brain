---
type:
  - "source"
title: Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21
created: "2026-04-23T05:20:54Z"
summary: Structured knowledge-transfer meeting (Apr 21 2026, 1pm WAT) from Olufemi Davies (Cards Business Leader) to Tracy Ojaigho (Head of CI&P Product) covering MFB Cards Team structure, platforms architecture, external integrations, 2026 roadmap, and strike-team / new CMS plan.
updated: "2026-04-23T06:08:29Z"
cssclasses:
  - "source"
source_path: review\Cards_Team_Meeting_Report.docx
meeting_date: 2026-04-21
meeting_time: "13:00 WAT"
participants:
  - "Olufemi Davies"
  - "Tracy Ojaigho"
  - "Emeka Awagu"
documented_by: Gemini AI (auto-notes) + Transcript
retention_label: postgres
retention_rationale: Multi-stakeholder knowledge-transfer document with named people, complete MFB cards systems inventory, external integration map, decisions table, and action items — future retrieval likely for any MFB cards question.
name_corrections_applied: "Source uses 'Nadin' → resolved to Nadeem Abbas; 'Damola' → resolved to Damilola Oyediran; 'Taps / TMSS' → resolved to TeamApt (the settlement switch reference)"
---

## Summary

Structured knowledge-transfer meeting on April 21 2026 (1pm WAT) between [[Olufemi Davies]] (continuing Cards Business Leader at [[Moniepoint MFB]]) and [[Tracy Ojaigho]] (Head of CI&P Product, incoming Product Leader for the central [[Card Issuance & Processing Platform]]). Covered the MFB Cards Team structure, the full MFB-side cards systems inventory, external integrations, 2026 roadmap priorities, and the strike-team / new CMS plan under [[Project Phoenix]].

This is **not a succession** \u2014 Olufemi continues as Business Leader owning commercial/operational outcomes at the MFB; Tracy owns the central CI&P platform build that the MFB (and future markets) will consume as tenant. The session frames how the existing MFB cards infrastructure feeds the platform build.

## Key Points

### MFB Cards Team Structure
- Two product teams (a planned third \u2014 VAS \u2014 was shelved pending platformisation):
  - **Team 1 \u2014 Card Sales & Distribution** (smaller): PM [[Nadeem Abbas]] (source doc transcribed \"Nadin\"). Scope: card pricing and sharing formulas (agent/PRM/BO splits), ordering and production request process, distribution chain (HO \u2192 RO \u2192 SRO \u2192 BO), customer sales experience for Visa and Africa card programmes.
  - **Team 2 \u2014 Card Infrastructure** (larger): PM [[Damilola Oyediran]] (source doc transcribed \"Damola\"). Scope: all transaction processing, security modules, system integrations, plus the deferred VAS functions (tokenization, ACS).
- Two embedded operations sub-teams inside Cards:
  - **Card Production & Logistics** \u2014 led by [[Philip]], team of 4 \u2014 physical card stock, card file generation, warehouse intake from perso vendor, distribution to ROs.
  - **Chargeback & Issue Resolution** \u2014 led by [[Aima]] / [[Precious]] \u2014 chargeback processing and L2 customer-support escalation for card issues.

### MFB Cards Platform Inventory

**Card Sales & Distribution platforms:**
- **[[Card Service]]** \u2014 commercial config (sharing formulas, pricing tiers, agent/PRM/BO commissions). Decisions jointly made with Growth Team before implementation.
- **[[Logistics Service]] + Logistics UI** \u2014 card inventory and physical distribution. QR/barcode scan registers delivery at each level; dashboard shows stock by RO; prevents false shortage claims.
- **[[Card Integration Service]]** \u2014 integration layer to internal platforms, notably [[Money Desk]] (MFB helpdesk/support tool) for support-ticket logging against customer records.

**Card Infrastructure platforms:**
- **[[Postillion]] + [[HSM]]** \u2014 external ACI/Interswitch switch used for card production and authorisation. Deliberate strategy to reduce Interswitch dependency for uptime and feature-rollout speed.
- **[[Card Manager Service]] (the legacy internal CMS)** \u2014 critical middleware between cards and [[CBA|Core Banking Application]]. Handles card blocking/unblocking, account-to-card linking, transaction routing. Known limitation: uses dummy account numbers on Postillion rather than real account numbers \u2014 currently blocks [[Interswitch]] from processing direct refunds by transfer.
- **[[Card Transaction Service]]** \u2014 transaction processing flow; functionally paired with Card Manager Service as a second middleware layer to core banking.
- **[[Card OTP Service]]** \u2014 OTPs for secure card operations (Safe Token today). Designed to extend to Visa Token and 3DS/ACS. Dispatched via MoniePoint's pre-whitelisted gateway.
- **[[Dispute Management Service]]** \u2014 end-to-end customer-logged disputes from mobile app; checks against [[IDS]]/[[AITA]]; routes to resolution; communicates status back. Roadmap: integrate Verve Online and Mastercard Chargeback international dispute rails.
- **[[Digitisation Service]] (internal) + [[Sudo Africa]] (external)** \u2014 tap-to-pay. MoniePoint's approach is **pseudo-digitisation**: actual PAN stored securely on customer's Android device, transmitted via EMV NFC at POS, bypassing Visa Token Service (VTS) tokenisation. Live for Android internally; wider rollout pending NFC readiness on POS estate (OP and PE terminals ~100% ready).
- **[[Apps Pay UI]]** \u2014 internal UI for backend card operations (production requests, service management). Each domain (e.g., logistics) also has its own dedicated UI.

### External Switches & Providers

| Provider | Purpose / Notes |
|---|---|
| [[Verve]] | Primary switch \u2014 ~99% of transactions are on Verve (on-us and remote) |
| [[Interswitch]] | Processes routed transactions; also Mastercard (legacy, <300K cards outstanding, issuance halted) |
| **[[TeamApt]] (TMSS)** | Settlement connection \u2014 technical integration complete; business/settlement arrangement with [[Zenith Bank]] in final stages ([[Kevin]] driving). Source document transcribed this as \"Taps\" but the referenced settlement switch is TeamApt (TMSS = TeamApt's settlement switch offering). |
| [[Sudo Africa]] | External provider for tap-to-pay pseudo-digitisation (subscription) |
| [[IDS]] / [[AITA]] / [[GoZone]] | Dispute management and auxiliary integrations |

Deliberate decision **not** to connect additional switches (e.g., UP) unless clear commercial benefit. Long-term strategy: route Visa acquiring through [[TeamApt]]'s TMSS, gradually negotiating with major banks ([[UBA]], [[Access Bank]]) to route MoniePoint Visa card transactions via TeamApt rather than UP.

### 2026 Roadmap \u2014 MFB Cards Priorities

1. **Visa Launch & Tap-to-Pay Rollout** \u2014 primary 2026 deliverable. Commercial payment for the Visa programme is the primary dependency. Post-launch: broad NFC tap-to-pay deployment across Android users using OP and PE terminals.
2. **Visa Tokenization & VAS** \u2014 full Visa tokenization (via a VTS provider, potentially replacing pseudo-digitisation), likely Q4 2026. Includes ACS provider discussions (previous provider [[Vicas]] discontinued due to cost).
3. **CX/App Experience Revamp** \u2014 card request flows (physical + virtual), dispute logging, card management interactions. Detailed scope with Nadeem / Damilola.
4. **Reduce Customer Failure Rates & Operational Excellence** \u2014 continuous focus on reducing failure rates, BRM/channel-partner satisfaction, avoiding operational firefighting diverting engineering capacity.

### Strike Team & Platformisation

- **Context:** [[Project Phoenix]] Phase 1 is underway. [[TSP]] is a peer product line (under Business Banking Platforms) that most other products depend on \u2014 hence its Phase 1 priority. Cards, as a separate product line under [[Digital Banking Platforms]], consumes TSP but is not absorbed into it.
- **Strike team formation:** Ahead of the full team transition, a strike team (one maker, one EM, at least one other member) will be drawn from the teams that will feed into the central Cards platform. Two mandates:
  1. Build the new [[Card Management System]] \u2014 the Phoenix Spine service that replaces Postillion dependency and the legacy [[Card Manager Service]].
  2. Drive AI automation initiatives within card operations (see below).
- **New CMS migration strategy:**
  - [[Visa]] programme serves as launch vehicle \u2014 Visa card management will be the first workload on the new CMS, validating the platform before broader migration.
  - Core card management functions (blocking, account-to-card linking, etc.) migrated progressively.
  - Production capabilities (card file generation) under Sales & Distribution may also move onto the new CMS. Distribution logistics workflows recommended to remain separate to avoid overloading the CMS.
  - Full cut-over planned later in the year once stability confirmed; phased migration to minimise disruption.
  - **Primary strategic objective: eliminate Postillion dependency.**
  - Tracy noted a prior session with Damilola and [[Mish]] confirmed that most functions currently handled outside the CMS (by [[Card Manager Service]]) logically belong inside the new CMS.
- **AI & automation priorities:**
  - **Chargeback & Issue Resolution** ([[Aima]] / [[Precious]]) \u2014 automating dispute intake, routing, status communication. Highest priority AI use case.
  - **Logistics & Production** ([[Philip]]) \u2014 automating card file generation, inventory requests, regional dispatch.
  - **General workflow automation** \u2014 replacing manual Jira request logging with AI-driven ticketing. Tool to be evaluated with [[Rumulo]] later in the week.
- **Change management:** Olufemi will brief the current Cards Team on the incoming strike team \u2014 current operations not immediately affected. Tracy flagged importance of reassurance \u2014 drawing on the people-management approach that grew MoniePoint MFB's card issuance market share from 7th to 3rd nationally (target: 2nd by end of 2026).

### Decisions

| Decision | Rationale |
|---|---|
| Strike team to be formed immediately | Start CMS development without waiting for full team transition |
| Visa programme launches on new CMS | Validates new CMS in production via a clean, high-priority workload |
| Primary CMS objective: eliminate Postillion dependency | Reduces Interswitch dependency; improves uptime + deployment agility |
| AI priority order: Chargeback & Issue Resolution, then Logistics | Aima's and Philip's teams are the highest-value automation opportunities |
| No new switch connections without clear commercial ROI | Long-term: route acquiring through TeamApt (TMSS) |

### Action Items

| Owner | Action |
|---|---|
| [[Tracy Ojaigho]] | Meet with [[Nadeem Abbas]] and [[Damilola Oyediran]] to obtain detailed roadmap breakdown per team |
| [[Tracy Ojaigho]] | Schedule meeting with [[Rumulo]] to review AI initiative tooling (Jira automation / AI workflow tool) |
| [[Tracy Ojaigho]] | Meet with current MFB Cards Team members (target Friday) to introduce herself, brief on platformisation, begin relationship-building |
| [[Olufemi Davies]] | Heads-up to current Cards Team on strike team formation; reassure current operations are not immediately disrupted |
| [[Tracy Ojaigho]] | Finalise strike team composition (maker, EM, additional member); initiate CMS development scoping |
| [[Kevin]] (via Olufemi) | Complete [[TeamApt]] (TMSS) settlement setup with [[Zenith Bank]] for live transaction processing |

## Entities Mentioned

[[Olufemi Davies]], [[Tracy Ojaigho]], [[Emeka Awagu]], [[Nadeem Abbas]], [[Damilola Oyediran]], [[Philip]], [[Aima]], [[Precious]], [[Kevin]], [[Rumulo]], [[Mish]], [[Moniepoint MFB]], [[MFB Cards Team]], [[Card Sales and Distribution Team]], [[Card Infrastructure Team]], [[Card Production and Logistics]], [[Chargeback and Issue Resolution]], [[Card Service]], [[Logistics Service]], [[Card Integration Service]], [[Card Manager Service]], [[Card Transaction Service]], [[Card OTP Service]], [[Dispute Management Service]], [[Digitisation Service]], [[Apps Pay UI]], [[Money Desk]], [[Postillion]], [[HSM]], [[Sudo Africa]], [[IDS]], [[AITA]], [[GoZone]], [[Interswitch]], [[Verve]], [[TeamApt]], [[Zenith Bank]], [[UBA]], [[Access Bank]], [[Visa]], [[Mastercard]], [[Vicas]], [[Project Phoenix]], [[TSP]], [[Card Issuance & Processing Platform]], [[Card Management System]], [[Digital Banking Platforms]]

## Concepts

[[Moniepoint Group Platformization]], [[Strike Team + Continuity Operating Model]], [[Pseudo-Digitisation Tap-to-Pay]], [[Postillion Elimination]], [[AI-Native Operations]]

## Glossary (from source)

ACS \u00b7 3D Secure Access Control Server; CBA \u00b7 Core Banking Application; CMS \u00b7 Card Management System (legacy internal one and the new Phoenix one); EM \u00b7 Engineering Manager; EMV \u00b7 chip card standard; HSM \u00b7 Hardware Security Module; IDS \u00b7 Internal Dispute System; NFC \u00b7 Near-Field Communication; PAN \u00b7 Primary Account Number; PM \u00b7 Product Manager; PRM \u00b7 Partner Relationship Manager; RO \u00b7 Regional Office; SRO \u00b7 Sectoral Regional Office; BO \u00b7 Branch Office; TMSS \u00b7 TeamApt settlement switch (source doc transcribed as \"Taps\"); TSP \u00b7 Transaction Switching & Processing; VAS \u00b7 Value Added Services; VTS \u00b7 Visa Token Service.