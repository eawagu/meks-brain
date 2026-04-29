---
type:
  - "concept"
title: ATPP
created: "2026-04-25T12:07:39Z"
summary: "Acquiring, Transaction Processing & Issuing — TeamApt vertical covering acquirer processing, issuer processing, settlement, EMV data prep, and license-agreement chains for Visa/Mastercard. Cadence: daily standup at ~15:52–16:00 WAT, owner Ruth Adetunji."
updated: "2026-04-29T11:44:38Z"
cssclasses:
  - "concept"
---

## Definition

**ATPP** (Acquiring, Transaction Processing & Issuing) is the [[TeamApt]] vertical covering:

- Acquirer processing
- Issuer processing
- Settlement (USD settlement flow, fund-settlement accounts)
- EMV data preparation
- License-agreement chains for [[Visa]] and [[Mastercard]]

## Operational cadence

- **Daily standup** at ~15:52–16:00 WAT, owned/chaired by [[Ruth Adetunji]] (ruth.adetunji@teamapt.com is the Drive owner).
- Gemini auto-notes are the canonical record.

## Phoenix scope

Under [[Project Phoenix]], ATPP folds into the platformization streams:
- Acquirer Processing absorbs into [[Card Issuance & Processing Platform|CI&P]] later phases
- Issuer Processing similarly absorbs in later phases
- The Apr 22 [[TeamApt-Platformization-Org-Movements (1)|Org Movements brief]] formalises [[Tracy Ojaigho]]'s transition to Head of CI&P Product, taking platform-level ownership of CMS, EMV prep, card dispute, 3DS, and Authorization Engine across markets.

## Recurring topics observed

### Apr 20 standup

- Acquiring + settlement
- SLA standardization (legal team)
- Visa Cardinal President training
- Mastercard license agreement
- Issuer processing keys / [[HSM]] data prep
- Bank-specific tracks: [[Fidelity Bank|Fidelity]] (Fidencia) ACT adoption, [[Access Bank]] pay-clearing, AC ACT onboarding
- Acquirer-processing customer pursuit (Q2 conversion target)
- Dashboard search-filter delivery

### Apr 27 standup

- Issuer processing: issuer public key cert generated + [[Visa]] test keys loaded on [[HSM]]
- Card data: 2 generated, awaiting [[EMV Data Prep]] output for [[White Plastic Production]]
- Visa global testing: form completion with [[Money Point]]; cards dispatched to Singapore
- CMS security/UI: documentation still unavailable; revised partner timeline end of May
- [[Mastercard e-commerce]]: documentation review pending; onboarding draft underway
- [[Visa 3DS]]: pilot transaction simulation needed; internal compliance review completed
- [[Dispute Management]]: sprint officially kickstarted
- [[ACT (Acquirer/Card Tech)|ACT]] enhancements: deployed including currency conversion + user room management
- [[Bureau Integration]]: UAT progressing; production move expected end of day
- [[Account Migration]]: two-batch approach decided; account deactivation underway

Source: [[ATPP Daily Standup 20260427 Gemini Notes]].

## Related

- [[Project Phoenix]]
- [[Card Issuance & Processing Platform]]
- [[ACT (Acquirer/Card Tech)]]
- [[ATPP Daily Standup - 2026-04-20 15:52 WAT]]
- [[ATPP Daily Standup 20260427 Gemini Notes]]
