---
title: TACHA Clearing Engine and Settlement Logic
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\TeamApt\Systems\TACHA\TACHA_Clearing_Engine_and_Settlement_Logic.md
summary: Clearing data flow, payload schemas (25+ fields), fee computation (flat/percentage with caps), settlement categorization based on NSS readiness, NSS Smart Det generation, reversal/refund/dispute processing, idempotency via composite key.
---

## Summary

Detailed clearing data flow, payload schemas, fee computation, settlement categorization, and adjustment processing for TACHA.

## Key Points

- Clearing payload: 25+ mandatory/conditional fields
- Fee evaluation by priority; flat and percentage models with caps/minimums
- Settlement categorization: Primary (NSS), Secondary (API), Merchant — based on acquirer/issuer NSS readiness
- Reversal (pre-settlement), Refund (post-settlement), Dispute (post-settlement challenge)
- Idempotency via composite key: platformIdentifier + transactionReference + transactionType
- NSS centralization feature flag consolidates clearing from all platforms into single Smart Det file

## Concepts

- [[Regulatory Compliance]]