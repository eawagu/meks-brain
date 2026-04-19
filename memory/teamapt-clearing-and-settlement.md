---
title: TeamApt Clearing and Settlement
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T15:52:38Z"
updated: "2026-04-19T15:52:38Z"
summary: "TeamApt Limited's clearing and settlement implementation centralized through TACHA with 4 daily settlement windows and 9 settlement agents."
---

## Definition

[[TeamApt|TeamApt Limited]]'s clearing and settlement implementation centralized through [[TACHA]] — the clearing and settlement backbone serving all domestic switching platforms.

See parent concept: [[Clearing and Settlement]] (generic banking/payments concept).

## Pipeline

Platform → Kafka `taccs_transactions_approved` → Control Plane (7-step validation) → Fee Service (3-second cron, priority-based rules) → Clearing Service (Spring Batch netting + ledger posting) → Settlement Workflow (disbursement orchestration) → Settlement Agents (bank-specific APIs or NSS).

## Settlement Windows

4 daily windows at [[TACHA]]: 05:00, 09:00, 12:00, 15:00 WAT. Batch lifecycle: OPEN → CLEARING → NETTING → SETTLEMENT_READY → EXECUTING → COMPLETED.

## Settlement Types

Categorized by acquirer/issuer NSS readiness:
- **Primary (NSS):** Both parties NSS-ready — settled via [[NIBSS]] interbank
- **Secondary (API mix):** At least one party not NSS-ready — settled via bank-specific disbursement APIs

## Fee Computation

Priority-based rule evaluation with conditions: transaction type, card brand, channel, MCC, region, amount, third-party ID. Fee types: Flat or Percentage (with cap/min). Fee lookup v2.0.0 prioritizes thirdPartyID over merchantIdentifier.

## Netting

Direction-aware netting per settlement window. Negative net positions handled differently based on acquirer prefunding status: prefunded acquirers settled from collateral; non-prefunded capped at zero with shortfall to suspense account + treasury notification.

## Adjustments

Reversals (pre-settlement), refunds (post-settlement, partial/full), and disputes (chargebacks) flow through `clearing.adjustments.v1` Kafka topic and re-enter the standard clearing pipeline. See [[TACHA]] for full specification.

## Platform Consumers

5 platforms feed into TACHA: JULIANA_SWITCH ([[Juliana]]), DIRECT_DEBIT, ACCOUNT_SWITCH, APTPAY_PTSP, MONNIFY ([[Monnify]]). Each platform owns its own dispute lifecycle.

## Related

- [[Clearing and Settlement]] — parent generic concept
- [[T+1 Settlement]]
- [[NSS Smart Det]]
- [[Settlement Integrity]]
- [[Revenue Leakage]]

## Sources

[[TACHA_Architecture_and_Scheduled_Jobs]], [[TACHA_Clearing_Engine_and_Settlement_Logic]], [[TACHA_Reversal_Refund_Dispute_Management]]

## Notes

- Derived from [[Clearing and Settlement]], moved 2026-04-19 per Rule 12 split.