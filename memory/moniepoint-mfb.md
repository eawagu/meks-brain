---
type:
  - "entity"
title: Moniepoint MFB
aliases:
  - "MoniePoint MFB"
  - "MFB"
  - "Moniepoint Microfinance Bank"
created: 2026-04-11
summary: "Moniepoint's Nigeria microfinance bank operating company (OpCo) \u2014 consumes central Phoenix platforms as a tenant; supplies Cards engineers to CI&P strike teams and card domain expertise (Femi Davies co-leading cards with Tracy Ojaigho). Regulatory boundary for agency banking (BRM) employees."
updated: "2026-04-24T11:51:41Z"
cssclasses:
  - "entity"
---

## Overview

Moniepoint MFB (Microfinance Bank) is Moniepoint's **Nigeria microfinance bank operating company (OpCo)** within the Moniepoint group. It is the regulatory boundary for agency banking (BRM) employees \u2014 and a principal tenant of the central Phoenix platforms.

## Regulatory Exposure

Regulatory boundary for agency banking (BRM) employees. Offline BRM staff still on [[TeamApt]] payroll without transfer to this entity creates CBN regulatory exposure. Mentioned in [[review-queue]].

## Role in Project Phoenix

Under [[Project Phoenix]] Moniepoint MFB consumes central platforms as a tenant \u2014 including [[CI&P]], [[TSPP]], [[Payment Gateway Platform]], and the broader platform cluster architecture.

### Phase 1 contribution (per Apr 22, 2026 Org Movements brief)

- **Supplies Cards engineers** into CI&P strike teams (both Team 1 Card Processing and Team 2 Card Issuance pull Cards (MFB) engineers).
- Supplies supplements to the [[TSPP]] strike team as well.
- The **existing MFB Cards Team** remains operational during Phase 1 (continuity); a strike team builds the new [[Card Management System]].

### Cards Domain Co-Leadership

- [[Tracy Ojaigho]] \u2014 Head, CI&P Product (central platform)
- [[Olufemi Davies]] \u2014 leads MFB Cards Business (commercial + operational outcomes)

Co-lead split: Tracy owns Product (central); Femi owns Business (MFB). Not a succession \u2014 split is by function.

## MFB Parallel Systems (Phoenix absorbs)

Moniepoint MFB operates parallel infrastructure that Phoenix platforms progressively absorb:

- **Cards stack:** [[Postillion]]/PostCard (ACI/Interswitch), Smart Card Process, Safe Token, [[Card Manager Service|CMS Manager]] (~12-person team under Femi Davies), Aptent (authorization routing).
- **Reconciliation:** [[Iris]] \u2014 group reconciliation, 15\u201327B+ txn/month.
- **Transfers:** [[Atlas]] \u2014 transfer orchestration, ~500M txn/month, 12+ downstream providers.

## Sources

- [[Project Phoenix]]
- [[Source \u2014 Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[TeamApt-Platformization-Org-Movements (1)]] \u2014 Apr 22, 2026 brief naming MFB as Cards engineer source for strike teams