---
title: Phase One Migration
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-28T16:43:52Z"
updated: "2026-04-28T16:43:52Z"
summary: "First phase of Project Phoenix CI&P migration — focused on core transaction processing, settlement mechanisms, and reporting infrastructure; success measured by processing 10% of production volume with zero tolerance for data loss; led by a dedicated strike team. Quarterly target: Phase One complete by Q2 2026."
---

## Definition

**Phase One Migration** is the first phase of the [[Project Phoenix]] [[Card Issuance and Processing]] (CI&P) migration. Phase One focuses on establishing the core operational backbone of the centralized card platform.

## Scope

- Core transaction processing
- Settlement mechanisms
- Reporting infrastructure

Delivered via [[Strangler Pattern]] — parallel build alongside existing [[Postillion]] processor, with feature-flagged traffic cutover.

## Team

Led by a dedicated [[Strike Team]]. Composition balances technical expertise with domain knowledge across operations, infrastructure, and product management. [[Nadeem Abbas]] owns finalizing strike team composition and stakeholder alignment.

Under Project Phoenix's TeamApt org movements (Apr 22, 2026): Phase 1 of CI&P specifically transfers [[Ketan Dhamasana]] as EM into Team 2 Card Issuance from [[AptPay Suite]]. Team 1 Card Processing strike team spec-and-builds; TeamApt Acquirer Processing stays in TeamApt on BAU; Issuer Processing and CMS teams stay in TeamApt for now.

## Success Criteria

- Process **10% of production volume**
- **Zero tolerance** for data loss or transaction discrepancies
- Card authorization latency <500ms
- Auth reversal <500ms
- Platform API availability 99.99%

## Timeline

- **Phase One** — complete by end of Q2 2026.
- Phase Two — expansion through Q3 2026.
- Production cutover — Q3 end (target end of Q3 2026 for full migration).

Note: [[Project Phoenix]] entity logs the broader Phoenix Phase 1 kick-off date as 2026-04-07. The CI&P-specific team kick-off occurred on 2026-04-27.

## 2026-04-27 — formal kick-off

The Phase One Migration scope, success criteria, and team model were formally aligned at the 2026-04-27 CI&P kick-off meeting hosted by [[Tracy Ojaigho]].

Source: [[Project Phoenix - CI&P kick off meeting - 2026-04-27]].

## Related

- [[Project Phoenix]]
- [[Card Issuance and Processing]]
- [[Card Issuance & Processing Platform]]
- [[Strike Team]]
- [[Strangler Pattern]]
- [[Postillion]]
- [[Phoenix Stage 1 Consolidated Project Plan]]
- [[Project Phoenix - CI&P kick off meeting - 2026-04-27]]
