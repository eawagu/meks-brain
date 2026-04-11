---
title: Monnify_operations_process_documentation
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: Monnify_operations_process_documentation.md
summary: Comprehensive Monnify operations process documentation compiling chargeback management, MPGS settlement/reconciliation, dispute handling on IDRS and Mastercom portals, refund processing, and incident reporting for TPP transactions.
---

## Summary
This is a consolidated operations documentation file for [[Monnify]] covering chargeback handling (see also [[MONNIFY_CHARGEBACK_PROCESS_FLOW]]), MPGS settlement flows (see also [[MPGS_sop]]), domestic and international dispute handling via IDRS and Mastercom portals, refund transaction processing, and a standardized incident reporting procedure for TPP (Third-Party Processor) transactions. Content substantially overlaps with the standalone SOP files.

## Key Points
- Chargeback process mirrors [[MONNIFY_CHARGEBACK_PROCESS_FLOW]] — covers Interswitch (Arbiter 2.0), Habaripay, CoralPay, IDRS, Aptpay (DCIR)
- MPGS settlement mirrors [[MPGS_sop]] — domestic and international flows, DCF→IPM conversion, Mastercard File Express submission
- Domestic dispute (IDRS): 48h treatment window (business days only); system-accepted if missed; chargeback amount debited from partner
- International dispute (Mastercom): 45 calendar days treatment window; ₦30 fee for issuers to initiate cross-border chargebacks
- Refund transactions identified by processing code 200000 in global settlement report; flow mirrors settlement but reverses direction (debit from partner, credit to TeamApt)
- Incident reporting for TPP: creates Jira ticket in TeamApt Service Desk (TDSD) as "System Incident" (Internal or External); assign to support personnel; escalate to Line Manager immediately; document in Incident log register
- Incident types requiring tickets: IPM file threshold failures (MPGS/MIP), VISA "Batch Run Failed," settlement delays from partner banks
- Clearing cycle: Mastercard settles Monday–Friday after 6th cycle; Saturday/Sunday included in Monday totals

## Entities Mentioned
- [[Monnify]] — acquirer
- [[TeamApt]] — operator
- [[Interswitch]] — dispute platform
- [[Union Bank]] — TeamApt settlement bank for MPGS
- [[Mastercard]] — card scheme
- [[NIBSS]] — indirect (dispute routing)

## Concepts
- [[TPP Incident Reporting]] — standardized procedure for technical errors or SLA breaches in Third-Party Processor transactions
- [[Chargeback Management]] — see [[MONNIFY_CHARGEBACK_PROCESS_FLOW]]
- [[MPGS Settlement]] — see [[MPGS_sop]]
- [[Domestic vs International Dispute Treatment]] — different timelines and cost structures for domestic (IDRS, 48h) vs international (Mastercom, 45 days)
