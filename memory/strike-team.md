---
type:
  - "concept"
title: Strike Team
created: 2026-04-11
summary: Lean dedicated engineering team assembled to lead Phase One delivery on Phoenix platforms (TSP and CI&P) — composition balances technical expertise with domain knowledge across operations, infrastructure, and product management. Per 2026-04-27 CI&P kick-off, Nadeem Abbas owns finalizing CI&P strike team composition and stakeholder alignment.
updated: "2026-04-28T16:43:51Z"
cssclasses:
  - "concept"
---

## Definition

A **strike team** is a small, dedicated engineering team assembled to lead the initial delivery of a new platform under [[Project Phoenix]]. The strike team builds the new system in parallel ([[Strangler Pattern]]) while the existing teams maintain the legacy systems on a continuity basis ([[Strike Team + Continuity Operating Model]]).

## Why

- Concentrated, focused capacity for net-new build without competing BAU obligations.
- Mixed seniority and cross-functional composition (engineering + product + design + operations) so the team can spec-and-build end-to-end.
- Phase 1 strike teams are explicitly time-boxed on Phase 1 scope; later phases absorb additional capabilities as the platform matures.

## Phase 1 Strike Teams

- **TSP Phase 1 (~15 people):** Team Spine ([[Sulaiman Adeeyo]] EM) and Team Adapters ([[Sunday Ayodele]] EM); strike-team members include [[Abeeb Ahmad]] (Juliana Switch), [[Muhammad Siddiqui]] (Principal SE), [[Christopher Ogbosuka]] (built TACHA) plus 2–3 UK engineers and supplements from MonieWorld and Cards (MFB). PM: [[Bunmi Oyefisayo]].
- **CI&P Phase 1:** Two strike teams under [[Tracy Ojaigho]] + [[Emeka Awagu]] — Team 1 Card Processing (Authorization Engine, 3DS/SCA, Card Dispute) and Team 2 Card Issuance (CMS, Card Controls, EMV Data Prep, Perso interface). [[Ketan Dhamasana]] joins Team 2 as EM (transferred from [[AptPay Suite]]).

## 2026-04-27 — CI&P Kick Off ALIGNED decision

The CI&P kick-off meeting on 2026-04-27 ALIGNED that **Phase One will be led by a dedicated strike team whose composition and accountability will be finalized this week**. [[Nadeem Abbas]] owns finalizing the strike team composition and obtaining stakeholder alignment on deployment.

Source: [[Project Phoenix - CI&P kick off meeting - 2026-04-27]].

## Success criteria pattern

- Phase One typically targets a percentage cutover of production volume with zero tolerance for data loss or transaction discrepancy. CI&P's stated target: **10% of production volume**.

## Related

- [[Project Phoenix]]
- [[Strike Team + Continuity Operating Model]]
- [[Strangler Pattern]]
- [[TSP]]
- [[Card Issuance & Processing Platform]]
- [[Project Phoenix Actions]]
- [[Project Phoenix - CI&P kick off meeting - 2026-04-27]]
