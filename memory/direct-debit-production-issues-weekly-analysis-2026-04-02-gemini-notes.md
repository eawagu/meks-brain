---
title: Direct Debit Production Issues Weekly Analysis 2026-04-02 Gemini Notes
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: Direct Debit Production Issues _ Weekly Analysis - 2026_04_02 17_25 IST - Notes by Gemini.docx
summary: Gemini notes from the April 2, 2026 TeamApt Direct Debit weekly production issues analysis meeting, covering transaction reversal logic, auto-reversal architecture, and OTP delivery options.
---

## Summary
Meeting notes from [[TeamApt Limited]]'s Direct Debit weekly production issues analysis on April 2, 2026. The session addressed pending transaction resolution via cron job + bank requery, the design of an auto-reversal system for transit account funds, and options for OTP delivery via email as an alternative to SMS.

## Key Points
- Pending transactions: cron job on consolidated side will requery bank after a threshold (e.g. 10 minutes); if no success response, transaction is marked failed.
- Auto-reversal: two paths — automatic (from transit account if debit confirmed but transaction failed) vs. manual (chargeback from operating account post-reconciliation). Full auto-reversal estimated ~3 months to build.
- Chargebacks currently drawn from operating account, not transit account; auto-reversal would reverse from transit back to customer.
- OTP via email: technically feasible for banks where TeamApt generates the OTP (via SMTP or email API); dependent on bank agreement due to security concerns. Phone numbers stored hashed (last 4 digits visible).
- Response code harmonization: mandate harmonization done; transaction harmonization not yet started. Jira list to be shared with Yasir for prioritization.
- Dispute initiation: bank needs unique transaction identifier to initiate dispute from portal.

## Entities Mentioned
- [[TeamApt Limited]]
- [[Daniel Ojinaka]]
- [[Bukola Taiwo]]
- [[Yasir Syed Ali]]
- [[Babajide Ojoboorun]]
- [[Abiodun Famoye]]
- [[Chiamaka Ofomata]]
- [[Emeka Awagu]]
- [[Dennis Ajalie]]
- Fidelity Bank
- Access Bank
- Ecobank

## Concepts
- [[Direct Debit]]
- [[Transaction Reversal]]
- [[Auto-Reversal]]
- [[OTP Delivery]]
- [[Reconciliation]]
- [[Response Code Harmonization]]
