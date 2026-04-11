---
title: Direct Debit Production Issues Weekly Analysis 2026-04-02
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: direct-debit-production-issues-weekly-analysis-20260402.md
summary: Weekly analysis of Direct Debit production issues on April 2, 2026 — resolved pending transaction logic, planned auto-reversal from transit accounts, and discussed OTP email delivery and response code harmonization.
---

## Summary

Weekly production issues meeting for [[TeamApt]] Direct Debit, led by [[Yasir Syed Ali]]. Key decisions: implement threshold check in core service cron to fail pending transactions after 10 minutes, plan auto-reversal mechanism for customer debits on failed transactions (transit account → customer), and push banks to accept email OTP delivery alongside SMS.

## Key Points

- **Pending transaction fix:** Core service cron will check bank status via requery API; if no success response after 10 minutes, transaction is failed. Assigned to Victor. [[Bukola Taiwo]] confirmed cron already exists on consolidated side — the missing piece is the bank-side threshold logic.
- **Auto-reversal mechanism:** Two paths identified: (1) automatic — if debit in transit but transaction failed, reverse from transit to customer; (2) manual — post-reconciliation chargeback from operating account. Currently chargebacks come from operating account, not transit. Full auto-reversal system estimated at ~3 months. [[Babajide Ojoboorun]] to draft all observed reversal scenarios for 2pm meeting.
- **OTP email delivery:** [[Chiamaka Ofomata]] confirmed Fidelity, Access, and Ecobank already send OTP via email+SMS. [[Daniel Ojinaka]] noted email is bank-dependent due to security concerns (email less secure than SMS). Team to push banks to add email option. For banks where TeamApt generates OTP, email can be toggled on/off via config.
- **Phone numbers hashed:** Notification table stores only last 4 digits of phone number — makes bank-side OTP delivery tracing difficult.
- **Response code harmonization:** Mandate harmonization going live mid-April; transaction harmonization not started. [[Babajide Ojoboorun]] to share Jira list with Nancy for prioritization.
- **Dispute flow gap:** Banks need ability to initiate disputes from portal using unique transaction identifier — scheduled for 2pm discussion.

## Entities Mentioned

- [[Yasir Syed Ali]], [[Daniel Ojinaka]], [[Bukola Taiwo]], [[Babajide Ojoboorun]], [[Chiamaka Ofomata]], [[Abiodun Famoye]], [[Opeyemi Animashaun]], [[Emmanuel Eke]], [[Nancy Muorah]], [[Victor Madu]]
- [[TeamApt]], [[Access Bank]], [[Fidelity Bank]], [[Ecobank]]

## Concepts

- [[Direct Debit Operations]]
- [[Transaction Reversal]]
- [[OTP Authentication]]
- [[Settlement and Reconciliation]]