---
title: TACHA_Clearing_Engine_and_Settlement_Logic
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt\Systems\TACHA\TACHA_Clearing_Engine_and_Settlement_Logic.md
created: "2026-04-13T23:15:22Z"
updated: "2026-04-13T23:15:22Z"
summary: "Detailed technical reference for TACHA's clearing data flow, fee computation, settlement categorization, settlement windows, NSS Smart Det generation, and disbursement execution."
---

## Summary

Technical specification for [[TACHA]]'s end-to-end clearing pipeline — from Kafka/REST ingestion through Control Plane validation, fee computation, netting, ledger posting, NSS Smart Det file generation, and disbursement execution via 9 settlement agents.

## Key Points

- Clearing pipeline: Platform → Kafka `taccs_transactions_approved` → Control Plane → Fee Service → Clearing Service → Settlement Workflow → Settlement Agents
- 5 supported platforms: JULIANA_SWITCH, DIRECT_DEBIT, ACCOUNT_SWITCH, APTPAY_PTSP, MONNIFY
- Control Plane: 7-step validation (platform ID, schema, merchant, issuer, idempotency, dispute, classification)
- Fee computation: 3-second cron, priority-based rule evaluation, conditions include transaction type/card brand/channel/MCC/region/amount/third-party ID
- Fee types: Flat or Percentage (with cap/min); fee lookup v2.0.0 prioritizes thirdPartyID over merchantIdentifier
- Settlement categorization: 4 types based on acquirer/issuer NSS readiness (Primary=NSS, Secondary=API mix)
- Settlement windows: 4 per day (05:00, 09:00, 12:00, 15:00 WAT)
- Settlement batch lifecycle: OPEN → CLEARING → NETTING → SETTLEMENT_READY → EXECUTING → COMPLETED
- NSS Smart Det: unified file aggregating all TeamApt platform clearing data for NIBSS interbank settlement
- NSS Centralization planned: Account Switch to submit DR/CR entries to TACHA, decommissioning separate Smart Det generation
- 9 settlement agents: NIBSS NSS, Polaris API, Keystone API, Union Bank API, Access Bank API (planned), Fidelity API (planned), Atlas/Moniepoint MFB (planned), HabariPay (in progress for GTB), NIP
- Traffic projections: Year 1 ~5,000 daily API hits, Year 2 ~24,240
- Collections-Only mode: records stored and reported but no settlement triggered
- Disbursement-Only mode: standalone payout requests without clearing data, batch posting supported
- Merchant ID format: 15-char structured (e.g., `3TPTLAMFD000001` — transaction type + constant + state code + PayFac ID + serial)

## Entities Mentioned

[[TACHA]], [[TeamApt]], [[NIBSS]], [[Polaris Bank]], [[Keystone Bank]], [[Union Bank]], [[Access Bank]], [[Fidelity Bank]], [[HabariPay]], [[Moniepoint MFB]], [[Monnify]]

## Concepts

[[Clearing and Settlement]], [[NSS Smart Det]], [[Fee Computation]], [[Settlement Windows]]