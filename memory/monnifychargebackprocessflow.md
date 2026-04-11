---
title: MONNIFY_CHARGEBACK_PROCESS_FLOW
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: MONNIFY_CHARGEBACK_PROCESS_FLOW.md
summary: "Monnify's chargeback process documentation covering dispute handling across Interswitch (Arbiter 2.0), Habaripay (Sparkpay), CoralPay (Cgate), IDRS, Aptpay (DCIR), including recall, revalidation, and arbitration procedures."
---

## Summary
This document outlines the complete chargeback management process for [[Monnify]], handling disputes routed through multiple third-party platforms. It defines spooling procedures, merchant notification workflows, decline/accept processes, acquirer-initiated refunds, and a three-stage arbitration path (Pre-Arbitration I, II, Arbitration).

## Key Points
- Chargeback: formal refund request from customer via issuing bank, forwarded to Monnify through Interswitch, Habaripay, CoralPay, etc.
- Dispute timelines by platform: VISA CO/Bill payments 24h (Arbiter 2.0); Non-VISA/CoralPay/Habaripay/IDRS/Aptpay all 48h
- Applications used: Metabase (Pluto), Backoffice (backoffice.monnify.com), Chargeback Spreadsheet, Moniedesk (Zendesk)
- Spooling process: login to platform → download dispute list → query Metabase → populate masterlist → notify merchants via email
- Merchant response required: transaction amount, date/time, Monnify reference, customer email/name, transaction status
- Acquirer Initiated Refund (AIR): for confirmed failed transactions where reconciliation officers confirmed settlement
- Revalidation: issuer sends dispute back to acquirer for review and response
- Arbitration stages: Pre-Arbitration I (48h) → Pre-Arbitration II (48h) → Arbitration (24h, ₦5,000 fine); Interswitch makes final binding decision
- Recall process: locate in Recall Masterlist → query Metabase → login to Back Office → create recall entry → submit (requires Business Operation Manager approval)
- DCIR/AptPay covers FCMB, Wema, and Access Bank dispute flows

## Entities Mentioned
- [[Monnify]] — acquirer
- [[Interswitch]] — dispute platform (Arbiter 2.0)
- [[Habaripay]] — dispute platform (Sparkpay)
- [[CoralPay]] — dispute platform (Cgate)
- [[IDRS]] — Industry Dispute Resolution System
- [[Access Bank]] — covered by DCIR/AptPay
- [[FCMB]] — covered by DCIR/AptPay
- [[Wema Bank]] — covered by DCIR/AptPay
- [[Metabase]] — internal query tool (Pluto instance)

## Concepts
- [[Chargeback Management]] — dispute resolution process for failed/fraudulent transactions
- [[Acquirer Initiated Refund]] — refund processed via dispute system to issuer for confirmed failed transactions
- [[Arbitration Process]] — three-stage escalation to card scheme binding decision
- [[Dispute Revalidation]] — issuer re-submitting dispute to acquirer for review
