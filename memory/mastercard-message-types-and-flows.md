---
title: MasterCard Message Types and Flows
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\04-message-types-and-flows.md
summary: "Comprehensive specification of MasterCard's dual message system (DMS) and single message system (SMS) message types, flows, sequencing rules, and exception handling including Stand-In, SAF, and reversal processing."
---

## Summary

Defines all [[MasterCard]] message types across both Dual Message System (DMS) and Single Message System (SMS) architectures, with detailed flows for authorization, reversals, administrative operations, and network management. Covers 13 DMS message types, 4 SMS types, and 6 administrative types with 11 end-to-end flow scenarios.

## Key Points

- **DMS Authorization Flow**: 0100 (request) → 0110 (response) → 0180/0190 (ack/nack) → 0120 (advice) → 0130 (advice response). Cardholder posting happens immediately at 0110 receipt, not at settlement.
- **SMS Financial Flow**: 0200 (combined auth+financial) → 0210 (response). Single message encompasses full transaction lifecycle — used for debit/Maestro/Cirrus networks.
- **Reversal Processing**: 0400 uses a NEW STAN (not original), references original via DE 90. Supports both full and partial reversals. Partial reversals use DE 95 (Replacement Amounts) with original amount, reversal amount, reason code, and remaining balance.
- **Stand-In Authorization**: When issuer is unavailable, MasterCard's Stand-In system evaluates against per-processor parameters (max amount, daily count, cumulative limit) and generates 0110 approval or decline.
- **SAF (Store-and-Forward)**: Guarantees delivery of 0120 and 0420 advice messages within 48 hours. Provides non-repudiation, idempotent processing, and survives network outages.
- **Acknowledgement Pattern**: Every valid 0110 requires 0180 (positive ack) within 30 seconds. 0190 (negative ack) sent when 0110 cannot be processed — prevents settlement and triggers issuer investigation.
- **Maximum Response Times**: Auth (0100→0110) 20-30s total; reversal (0400→0410) 20-45s; network management (0800→0810) 25-30s. Regional variations: EMEA fastest (15-20s), APAC slowest (25-30s).
- **Exception Handling**: Late 0110 responses after timeout are handled by sending 0190 reject. Format errors detected by network may be rejected or auto-corrected. Timeout triggers Stand-In → X-Code routing cascade.
- **DE 60 Advice Reason Codes**: 25 defined codes covering approval variants (00-03), issuer declines (10-15), message rejects (20-25), timeouts/errors (30-32), acquirer issues (40-41), Stand-In decisions (50-51), and network errors (60).
- **Implementation Priorities**: STAN generation/validation, DE 90 formatting for reversals, DE 60 population in advice messages, 0180/0190 logic, SAF queue management, timeout handling with Stand-In/X-Code routing.

## Entities Mentioned

[[MasterCard]], [[TSP]], [[TACHA]]

## Concepts

[[Transaction Switching]], [[Card Issuance]]