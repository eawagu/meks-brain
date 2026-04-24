---
title: TSPP
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-24T11:50:57Z"
updated: "2026-04-24T11:50:57Z"
summary: "Transaction Switching & Processing Platform — the central group payment-kernel platform under Project Phoenix. Leadership triad: Frank Atashili (Product Head, Canada), Alex Adeyemo (Eng Head, UK), Design Head TBD, Oluwabunmi Oyefisayo (Lead Technical PM, Australia). Phase 1 is strike-team-only; future phases absorb CDD, Switching Solutions + AptPay Suite, and Switch Engineering from TeamApt."
---

## Overview

TSPP (Transaction Switching & Processing Platform) is the **central group payment-kernel platform** under [[Project Phoenix]] — the foundational Layer 1 through which all fund movement flows. Other platforms in the Phoenix architecture consume TSPP (Authorization Engine calls TSPP synchronously; CI&P fund movement delegates to TSPP; Payment Gateway Platform consumes TSPP for switching/processing).

TSPP is referred to interchangeably as TSP in some documents; see [[TSP]] for the technical-kernel view.

## Leadership Triad (per Apr 22, 2026 Org Movements brief)

| Role | Person | Location |
|---|---|---|
| Product Head | [[Frank Atashili]] | Canada |
| Engineering Head | [[Alex Adeyemo]] | UK |
| Design Head | TBD | — |
| Lead Technical PM | [[Oluwabunmi Oyefisayo]] | Australia |

Functional engineering manager: [[Ravi Kiran Veluguleti]] (remains with TSPP).
APM org: [[Idris Aliyu]] (functional mgr, TSPP APMs); [[Ruth Adetunji]] (APM support).

## Phase 1 (strike team only)

Strike team ICs from TeamApt:
- [[Abeeb Ahmad]] — Juliana Switch
- [[Muhammad Siddiqui]] — Principal SE
- [[Christopher Ogbosuka]] — built TACHA
- Plus 2–3 UK engineers (from Alex's network)
- Supplements from [[MonieWorld]] and Cards ([[MoniePoint MFB]])

Hold-the-fort (stays in TeamApt):
- [[Wycliffe Ochieng']] — EM double-hat Switch + ATS
- [[Abdulgafar Obeitor|Gafar]] + AptPay BAU engineers
- Juliana / ATS / App Centre stay up; no code freeze
- Strangler Fig cutover, not big-bang

## Future Phases (phased absorption from TeamApt)

- CDD engineering (full team, 6 engineers)
- Switching Solutions + [[AptPay Suite]]
- Switch Engineering

## Phase 1 Technical Scope (per TSP Phase 1 Project Plan, Apr 10)

- All 19 transaction types, both NG+GB markets, 12 weeks continuous delivery
- 2 strike teams (15 people): Team Spine ([[Sulaiman Adeeyo]] EM) + Team Adapters ([[Sunday Ayodele]] EM)
- Milestones: M1 (Apr 24) First Live PAY_OUT NG via NIP; M2 (May 15) Two Markets Six Products; M3 (Jun 5) Full Catalogue & Ops-Ready; M4 (Jun 26) Cutover Begun
- Foundation: 15-module Maven monorepo, 9-part LLD (21k+ lines), workflow engine, state machine, ISO 8583 stack, 6 step executors, 493 passing tests (85% line/80% branch)
- 23+ external integrations across 6 protocols

## Sources

- [[TSP]]
- [[TSP Phase 1 Project Plan DRAFT (Apr 10)]]
- [[Project Phoenix]]
- [[TeamApt-Platformization-Org-Movements (1)]] — Apr 22, 2026 brief confirming TSPP triad and Phase 1 strike team composition