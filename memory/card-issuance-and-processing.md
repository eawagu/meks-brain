---
title: Card Issuance and Processing
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-28T16:43:51Z"
updated: "2026-04-28T16:43:51Z"
summary: Phoenix platform domain that consolidates card lifecycle management (Card Management System, Card Controls, EMV Data Prep, Perso interface) and real-time card transaction handling (Authorization Engine, 3DS/SCA, Card Dispute) into a single unified platform serving Moniepoint OpCos as tenants.
---

## Definition

**Card Issuance and Processing (CI&P)** is the [[Project Phoenix]] platform domain that consolidates two halves of the card stack into a single unified platform:

- **Card Issuance** — card lifecycle, program configuration, cardholder data, controls, EMV personalisation. Owned by **Team 2 Card Issuance** (CMS, Card Controls, EMV Data Prep, Perso interface).
- **Card Processing** — real-time authorization, cardholder authentication, dispute lifecycle. Owned by **Team 1 Card Processing** (Authorization Engine, 3DS/SCA, Card Dispute Service).

CI&P is the formal name for what was previously discussed in the brain as the [[Card Issuance & Processing Platform]] — see that page for full architectural detail.

## Tenant Model

Multi-tenant central platform serving [[Moniepoint MFB]] (Nigeria), [[TeamApt]] (Nigeria), [[MonieWorld]] (UK), [[Sumac MFB]] (Kenya), and future markets. New countries are configuration profiles, not new builds.

## Architectural Pattern

- [[Spine and Module Architecture]] — market-agnostic shared Spine + independently deployable market-specific Modules. CI&P is the first fully-specified Phoenix platform and the proof point for the whole pattern.
- Migration approach: [[Strangler Pattern]] — parallel build, feature-flagged cutover, eventual decommissioning of legacy [[Postillion]].

## Triad Leadership

- **Product:** [[Tracy Ojaigho]] (Head of CI&P Product)
- **Engineering:** [[Emeka Awagu]] (Head of CI&P Engineering)
- **Design:** TBD

## 2026-04-27 — Formal CI&P Kick Off

Formal CI&P-specific team kick-off meeting hosted by [[Tracy Ojaigho]]. Attendees: [[Elishma Nwobodo]], [[Nadeem Abbas]], [[Emeka Awagu]], [[Damilola Oyediran]], [[Tracy Ojaigho]], [[Nitish Chand]], [[Ketan Dhamasana]], [[Olufemi Davies]]. Three ALIGNED decisions: hiring plan prioritizes [[AI and Automation Adoption]]; platform migration target end of Q3 2026 with quarterly milestones; Phase One led by a dedicated [[Strike Team]] (composition finalized this week).

**Date note:** The brain's [[Project Phoenix]] entity logs Phase 1 kick-off as 2026-04-07. This 2026-04-27 meeting appears to be the formal CI&P-team-specific kick-off (vs. the broader Phoenix Phase 1 mark from earlier in April), with the assembled CI&P leadership present.

Source: [[Project Phoenix - CI&P kick off meeting - 2026-04-27]].

## Phase One Success Criteria

- Process **10% of production volume**
- **Zero tolerance** for data loss or transaction discrepancies
- Card authorization latency: <500ms
- Auth reversal: <500ms
- Platform API availability: 99.99%

## Compliance Footprint

Must comply with regulations across multiple jurisdictions: African banking regulations, [[PCI-DSS]] requirements, and local payment scheme rules (Visa, Mastercard, Verve).

## Related

- [[Card Issuance & Processing Platform]] — full architecture detail
- [[Project Phoenix]]
- [[Card Management System]]
- [[Authorization Engine]]
- [[3DS/SCA Service]]
- [[Card Dispute Service]]
- [[EMV Data Preparation Platform]]
- [[Postillion]]
- [[Strangler Pattern]]
- [[Strike Team]]
- [[Project Phoenix - CI&P kick off meeting - 2026-04-27]]
