---
title: TeamApt-Platformization-Org-Movements (1)
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt-Platformization-Org-Movements (1).pptx
retention_label: postgres
retention_rationale: Structured 15-slide org-movements brief with named people, role changes, team compositions, phase plans, and timelines; future retrieval likely for specifics (who moves when, platform leadership triads, what OpCo retains). Source summary necessarily compresses the dense leader-conversion and PM-moves tables.
created: "2026-04-24T11:38:14Z"
updated: "2026-04-24T11:38:14Z"
summary: "Frank Atashili's 22-Apr-2026 brief to Dennis Ajalie and Pawel Swiatek on how Project Phoenix lands on TeamApt people: OpCo consolidates 4 businesses to 2, three leaders convert from business leads to platform heads (Frank→TSPP Product, Tracy→CI&P, Damilare→Payment Gateway), Phase 1 is strike-team-only (~15 of ~200 P&E staff move now), with phased absorption of CDD, Switching Solutions, AptPay Suite, and Monnify into platforms across 2026–2027."
---

## Summary

[[Frank Atashili]]'s 22-Apr-2026 brief prepared for [[Dennis Ajalie]] (CEO, [[TeamApt]]) and [[Pawel Swiatek]] ([[MP Technologies UK|Group COO]]) on how [[Project Phoenix]]'s IPCo/OpCo split lands on TeamApt's people. Covers the shift from product-centric to platform-centric org, three movements into [[TSPP]] / [[CI&P]] / [[Payment Gateway Platform]], leader conversions from business to platform heads, PM moves, and what the OpCo retains. Phase 1 is strike-team-only: approximately 15 of ~200 product/engineering staff move now; everyone else stays, with phased absorption in later phases.

## Key Points

### The shift (platformization model)
- [[MP Technologies UK]] is the Platform Organization ([[IPCo/OpCo|IPCo]]): owns IP, product management, engineering (incl. SREs), design, platform roadmap and SLAs; charges OpCos for services.
- [[TeamApt]] Ltd (Nigeria; + Kenya, UK) is the Operating Company (OpCo): holds CBN licences (Switching, Processing, PSSP, PTSP), customers, sales & BD, operations, reconciliation, settlement, compliance, risk, entity P&L; consumes platform services.
- Before Phoenix: TeamApt operated four businesses under one P&L — Direct Debit (CDD), Monnify Gateway, Third Party Processing, and Domestic Switching — with fragmented engineering rebuilding the same capabilities.

### TeamApt OpCo consolidates to two businesses (after)
- **Switching & Processing** (Enabler): merger of [[Third Party Processing|TPP]] + [[Domestic Switching|DS]]. Lead: [[Babatunde Okufi]] (CBDO double-hat). Scope: Acquirer & Issuer processing customers, PTSP/PTAD, ATS client relationships, [[Juliana Switch]] commercial, ACT.
- **Monnify + Direct Debit** (Revenue Driver): Lead: [[Daniel Ojinaka]]. Scope: Monnify commercial (merchant book, PayFac pipeline, collections, VAS, disbursements) plus CDD (MADD, GoSubscribe, SAFE).
- Shared OpCo functions unchanged: licences, operations (reconciliation, settlement, ops), compliance & risk, customers & BD, finance / legal / people ops, entity P&L.

### Three movements into platforms
- **Movement 1 — TSPP Phase 1 (strike team only now)**: [[TSPP]] leadership triad — Product Head [[Frank Atashili]] (Canada), Engineering Head [[Alex Adeyemo]] (UK), Design Head TBD, Lead Technical PM [[Oluwabunmi Oyefisayo]] (Australia). Strike team (build) draws TeamApt ICs [[Abeeb Ahmad]] (Juliana Switch), [[Muhammad Siddiqui]] (Principal SE), [[Christopher Ogbosuka]] (built TACHA), plus 2-3 UK engineers (Alex's network), supplements from MonieWorld and Cards ([[MoniePoint MFB]]). Hold-the-fort (stays in TeamApt): [[Wycliffe Ochieng']] — EM double-hat Switch + ATS; [[Abdulgafar Obeitor|Gafar]] + AptPay BAU engineers. Juliana / ATS / App Centre stay up; Strangler Fig cutover, not big-bang. Future phases absorb CDD, Switching Solutions + AptPay Suite, and Switch Engineering.
- **Movement 2 — CI&P Phase 1 (strike team only)**: [[CI&P]] reports to Head of Digital Banking Platforms. Team 1 Card Processing (Authorization Engine, 3DS/SCA, Card Dispute) — Phase 1 strike team spec-and-builds; TeamApt Acquirer Processing team stays in TeamApt on BAU, absorbed later. Team 2 Card Issuance (CMS, Card Controls, EMV Data Prep, Perso interface) — Phase 1: [[Ketan Dhamasana]] transfers as EM; Issuer Processing and CMS teams stay in TeamApt for now, absorbed in later phases. Strike teams draw a handful of TeamApt EMs/ICs plus Cards (MoniePoint MFB) engineers.
- **Movement 3 — Monnify system seeds Payment Gateway Platform**: [[Damilare Ogunnaike]] converts to Platform Head ([[Payment Gateway Platform]]). Monnify codebase becomes PG Platform v0 (collections, disbursements, VAS capabilities). Platform consumes TSPP for switching/processing, CI&P for 3DS/SCA. Monnify business stays in TeamApt under Daniel (merchant book, PayFac pipeline, commercial KPIs). Onboarding, customer ops, front/back office remain OpCo. Phased: core team stays in TeamApt now, phased hand-off as platform matures.

### Leader conversions (business → platform)
- [[Frank Atashili]]: CPO/COO, TeamApt → Head of Platform TSPP (Product). Drops commercial responsibility for CDD and TPP revenue; picks up platform roadmap for switching and processing across NG, UK, KE; peer accountability with Alex (Eng) and Design TBD.
- [[Tracy Ojaigho]]: Business Lead, Third Party Processing → Head, [[CI&P]]. Leaves TPP commercial/P&L; takes platform-level ownership of CMS, EMV prep, card dispute, 3DS, Authorization Engine across markets. Ketan joins her engineering team from AptPay Suite.
- [[Damilare Ogunnaike]]: Business Lead, Monnify → Head, [[Payment Gateway Platform]]. Monnify commercial layer stays with TeamApt OpCo under Daniel; platform build (collections, disbursements, VAS) now a group platform under MP Technologies UK. Engineering Head TBD.

### Business leads staying in TeamApt (scope broadens)
- [[Babatunde Okufi]]: CBDO + Business Lead, Switching & Processing (double-hat). TPP and Domestic Switching merge into one OpCo business. Retains BD dotted-line across all OpCo business leads (commercial alignment across CDD, Monnify, S&P). PTSP/PTAD, ATS client relationships, and Acquirer/Issuer processing customers roll up under him; platform build side moves to TSPP and CI&P.
- [[Daniel Ojinaka]]: Business Lead, Monnify + Direct Debit (dual business). Picks up Monnify commercial (merchant book, payment facilitator pipeline) in addition to CDD — Damilare's commercial layer rolls to Daniel as Damilare moves to IPCo. CDD engineering (full team, 6 engineers) moves to TSPP; Monnify core team moves to Payment Gateway Platform. Daniel retains commercial ownership for both in OpCo. Direct Debit 2026 OKRs (>10% MoM revenue growth, 50 merchants, 5 new PayFacs) continue; adds Monnify growth/retention targets.

### PM moves (TSPP Phase 1)
EM note: [[Ketan Dhamasana]] transfers to CMS/Card Issuance under [[Emeka Awagu]] & Tracy (Phase 1); [[Ravi Kiran Veluguleti]] remains with TSPP as functional engineering manager.

Moves to TSPP now (Phase 1 strike team):
- [[Oluwabunmi Oyefisayo]] — Product Lead, Switch & TPP → TSPP Lead Technical PM; spec-owner for Phase 1 strike team.
- [[Idris Aliyu]] — Group Head, APM org → Functional manager, TSPP APMs; coaches APMs supporting Phase 1.
- [[Ruth Adetunji]] — APM, TPP → APM support, TSPP Phase 1; Change Spec authoring; Claude access coordination.

Stays in TeamApt for now (joins TSPP in later phases):
- [[Kevin Ng'Eno]] — Lead, Switching Solutions → stays with S&P business; joins TSPP when Switching Solutions absorbs.
- [[Abdulgafar Obeitor]] — Lead, AptPay Suite → stays with S&P business; AptPay BAU now; TSPP ATS PM later.
- Taiwo — Svc Mgr, Acquirer Processing → stays as Svc Mgr (TeamApt); TSPP Acquirer / TPP Eng PM scope later.
- [[Abiodun Famoye]] — APM, CDD → stays with Monnify + CDD; moves to TSPP when CDD is absorbed.

### What TeamApt OpCo retains (scope continuity)
- **Licences & Regulation**: CBN Switching Licence, CBN Processing Licence, PSSP, PTSP licences, sponsored-member relationships.
- **Customers & BD**: Bank partnerships (CDD, ATS, Juliana), merchant book (Monnify commercial), payment facilitator pipeline, Babatunde's BD coordination role.
- **Operations**: Core Operations pillar ([[Oladapo Onayemi]]), reconciliation, disputes, settlement ops; PTSP/PTAD terminal services ([[Unwana Enang]]); TPP Service Managers (Issuer / Acquirer).
- **Compliance & Risk**: Chief Compliance Officer ([[Ibukun Atoyebi]]); Audit function ([[Olufemi Agbaje]]); People Ops (Constance, reporting to move to Frank); finance and legal remain OpCo.

### By the numbers (Phase 1)
- 3 leaders crossing to platforms (Heads of TSPP-Product, CI&P, Payment Gateway — all from OpCo).
- ~10 strike-team seats in Phase 1 (TSPP: 1 Eng Head + 1 Lead Tech PM + APM mgr + ~3 ICs + 1 APM; CI&P: 1 EM transfer + small strike team; plus non-TeamApt UK engineers, MonieWorld, Cards (MFB)).
- 2 TeamApt leaders with added scope (CBDO double-hats as S&P lead; CDD lead adds Monnify commercial).
- Net TeamApt staff moving in Phase 1: approximately 15, out of ~200+ product/engineering headcount. Everyone else stays.
- All other product & engineering staff stay with their businesses; all licences, customer ops, compliance, finance, legal unchanged; moves in Phase 2+ as each platform scopes up.

### Timeline
- **Now — Q2 2026**: Platform boundaries and TSPP Phase 1 strike team stood up. Leaders confirmed. Comms land.
- **+2 months — Mid-2026**: Capability specs authored in Phoenix format. Legacy BAU held by existing teams (Gafar, etc.).
- **+6 months — Late 2026**: First alpha capabilities ship via [[Strangler Fig]] on separate app. Legacy routes cut over selectively.
- **2027 — steady state**: Dispute extracted first, then Operator platform, then Authentication / Authorization big split.

## Entities Mentioned

### Leadership audience
- [[Dennis Ajalie]] — CEO, TeamApt (brief audience)
- [[Pawel Swiatek]] — Group COO (brief audience)

### Platform Heads (converting to IPCo)
- [[Frank Atashili]] — CPO/COO → Head of Platform TSPP (Product), Canada
- [[Tracy Ojaigho]] — Business Lead TPP → Head, CI&P
- [[Damilare Ogunnaike]] — Business Lead Monnify → Head, Payment Gateway Platform

### Platform leadership (TSPP triad)
- [[Alex Adeyemo]] — TSPP Engineering Head (UK)
- [[Oluwabunmi Oyefisayo]] — TSPP Lead Technical PM (Australia)
- [[Ravi Kiran Veluguleti]] — TSPP functional engineering manager

### CI&P leadership
- [[Tracy Ojaigho]] — Head
- [[Emeka Awagu]] — Engineering side
- [[Ketan Dhamasana]] — EM transfer (Card Issuance)

### OpCo business leads (stay in TeamApt, broader scope)
- [[Babatunde Okufi]] — CBDO + Business Lead Switching & Processing
- [[Daniel Ojinaka]] — Business Lead Monnify + Direct Debit

### TSPP Strike Team ICs (TeamApt)
- [[Abeeb Ahmad]] — Juliana Switch IC
- [[Muhammad Siddiqui]] — Principal SE
- [[Christopher Ogbosuka]] — built TACHA

### TSPP Hold-the-fort (TeamApt)
- [[Wycliffe Ochieng']] — EM double-hat: Switch + ATS
- [[Abdulgafar Obeitor|Gafar]] — AptPay BAU engineers

### TSPP APM org
- [[Idris Aliyu]] — Group Head APM org → Functional manager TSPP APMs
- [[Ruth Adetunji]] — APM support TSPP Phase 1

### Stays in TeamApt (phase-absorbed later)
- [[Kevin Ng'Eno]] — Lead, Switching Solutions
- Taiwo — Svc Mgr, Acquirer Processing
- [[Abiodun Famoye]] — APM, CDD

### OpCo scope continuity (functions retained)
- [[Oladapo Onayemi]] — Core Operations pillar
- [[Unwana Enang]] — PTSP/PTAD terminal services
- [[Ibukun Atoyebi]] — Chief Compliance Officer
- [[Olufemi Agbaje]] — Audit function
- Constance — People Ops (reporting to move to Frank)

### Organizations
- [[TeamApt]] — OpCo (Nigeria, Kenya, UK)
- [[MP Technologies UK]] — Platform Organization (IPCo)
- [[MoniePoint MFB]] — supplies Cards engineers to strike teams
- MonieWorld — supplies supplements to strike teams
- [[CBN]] — regulator; TeamApt retains Switching / Processing / PSSP / PTSP licences

## Concepts

- [[Project Phoenix]] — the group-wide platformization programme that this brief operationalizes on the TeamApt side
- [[IPCo/OpCo]] — platform-vs-operating-company separation pattern
- [[TSPP]] — Transaction Switching & Processing Platform
- [[CI&P]] — Card Issuance & Processing Platform
- [[Payment Gateway Platform]] — seeded from the [[Monnify]] system
- [[TSP]] — foundational Layer 1 payment kernel referenced as "TSP" in slide 6 (same platform as TSPP)
- [[Monnify]] — gateway brand; business stays in TeamApt; system becomes PG Platform v0
- [[CDD]] / [[Direct Debit]] — products: MADD, GoSubscribe, SAFE
- [[Third Party Processing]] — TPP business line merging into S&P
- [[Domestic Switching]] — DS business line merging into S&P
- [[Juliana Switch]] — Juliana Card/Account — stays up, hold-the-fort via Wycliffe
- [[AptPay Suite]] — stays in TeamApt under Gafar; TSPP ATS PM scope later
- [[Strangler Fig]] — migration pattern for platform cutover (Phase 1 on separate app, legacy routes cut selectively)
- [[PayFac]] — payment facilitator pipeline; under Daniel's Monnify commercial scope
- Strike team model — lean build team pulling ICs/EMs from TeamApt + Cards (MFB) + UK + MonieWorld; existing teams stay in place until later phases
- Spine-and-Module pattern — underlying CI&P build model (spine services: Auth Engine, 3DS/SCA, Card Dispute on processing side; CMS, Card Controls, EMV Data Prep, Perso on issuance side)
