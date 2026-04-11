---
title: Direct_Debit_End_To_End_Reconciliation_Process_Flow
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: Direct_Debit_End_To_End_Reconciliation_Process_Flow.md
summary: End-to-end process documentation for Direct Debit reconciliation across Fidelity Bank, Access Bank, and Polaris Bank, including settlement flows, T+1 onward settlement rules, and exception handling.
---

## Summary
This document defines the complete Direct Debit reconciliation process for [[TeamApt]]'s operations across three banks: Fidelity Bank, Access Bank, and Polaris Bank (suspended). It covers transaction flow, fee splits, daily reconciliation procedures, exception handling with 48-hour SLA, and T+1 onward settlement rules. Polaris Bank reconciliation is currently suspended due to recorded exposure.

## Key Points
- Transaction reconciles to zero: sum of all debit entries (income, fees, settlements) must equal the single credit entry in transit/suspense account
- Fee split structure (per NGN 1,000 transaction):
  - Fidelity Bank: NGN 5 ATS Income, NGN 5 Bank Income, NGN 990 TeamApt Operating
  - Access Bank: NGN 3 ATS Income, NGN 7 Bank Income, NGN 990 TeamApt Operating
  - Polaris Bank: NGN 5 ATS Income, NGN 5 Bank Income, NGN 990 TeamApt Operating
- Second-level split from TeamApt Operating: NGN 970 - 2.25 VAT → Settlement Account, NGN 20 → CDD Account
- T+1 Settlement Rule: Operating Inflow = PayFac Entitlement + Consolidated DD Fee + VAT; Consolidated DD Fee = Transaction Count × ₦20 + VAT (2.25)
- Settlement must not roll to T+2 without escalation; no verbal approvals; no variance = do not proceed
- Narration format for settlements: CDD_IN_{TDate}_{BankCode}_{PayFac}_{TxnCount}
- Daily inputs received by 9:00 AM: Transaction Report (Excel) from SRE, Bank Statements
- Exception SLA: 48 hours for resolution; logged on Jira TeamApt-Operations
- Polaris Bank suspended due to exposure — recovery ongoing
- SRE team provides daily transaction reports; Reconciliation Officer performs reconciliation; Operations Lead reviews escalations

## Entities Mentioned
- [[TeamApt]] — operator
- [[Monnify]] — PayFac
- [[Fidelity Bank]] — partner bank
- [[Access Bank]] — partner bank
- [[Polaris Bank]] — partner bank (suspended)
- [[SRE Team]] — provides daily transaction reports

## Concepts
- [[Direct Debit Reconciliation]] — zero-balance reconciliation of debit entries against credit entries
- [[T+1 Settlement]] — next-day settlement cycle for PayFac entitlement and CDD income
- [[Transit Account Reconciliation]] — matching transit account credits to bank statements
- [[Exception Handling]] — identification, logging, and escalation of reconciliation breaks
- [[Fee Split Architecture]] — per-transaction income allocation across ATS, bank, and operating accounts
