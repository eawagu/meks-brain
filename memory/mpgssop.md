---
title: MPGS_sop
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: MPGS_sop.md
summary: Standard operating procedure for the MPGS (Mastercard Payment Gateway Service) covering clearing file submission, settlement reconciliation for domestic and international transactions, dispute handling, and refund processing.
---

## Summary
[[TeamApt]] operates as a Mastercard acquirer through MPGS (ICA 34150), settling through Union Bank. This SOP covers the complete clearing and settlement cycle: downloading DCF files from Mastercard File Express, converting to IPM format via ACT, validating through Clearing Optimizer, submitting to Mastercard, and reconciling settlement acknowledgment (T140) files. Covers both NGN (domestic) and USD (international) settlement flows.

## Key Points
- Clearing file flow: Download DCF (TS10 from MFE) → Convert to IPM via AptPay ACT portal → Validate via Clearing Optimizer (server 35.179.136.35) → Submit to Mastercard via MFE upload path
- Settlement accounts: NGN — 0229891945 (Union Bank MC TPP Settlement NGN); USD — 0233477001 (Union Bank MC TPP Settlement USD)
- T140 file = Mastercard settlement acknowledgment; verified against IPM submission amounts before fund confirmation
- T057 file = daily currency conversion rate (needed for international settlements)
- Domestic settlement: Mastercard settles Monday–Friday after 6th clearing cycle (cutoff 2:00 PM WAT); Sat/Sun included in Monday net totals
- Interchange fees: N/A for domestic POS; 1.6–2.0% for domestic web (CNP); applicable for international
- Fee structure: POS (Moniepoint) 0.3% capped ₦15; eCommerce (Monnify) 0.3% capped ₦500; international 3–3.5%
- Duplicate File ID error (0362): edit IPM header/trailer PDS subfield 04 (5-digit File ID) using MCPS tool; re-validate before resubmission
- International settlement: Finance prefunds Naira account from USD settlement proceeds; gains/losses on exchange rates must be escalated immediately
- Incident types requiring Jira: IPM file fails threshold, full file reject, VISA Batch Run Failed, settlement delays
- Narration format: 3TEAMAPT0001_MPGS_{date}-{reference}

## Entities Mentioned
- [[TeamApt]] — acquirer (ICA 34150)
- [[Monnify]] — eCommerce partner
- [[Moniepoint]] — POS partner
- [[Union Bank]] — settlement bank
- [[Mastercard]] — card scheme
- [[NIBSS]] — domestic dispute routing (IDRS)

## Concepts
- [[MPGS Settlement]] — end-to-end clearing and settlement via Mastercard Payment Gateway Service
- [[IPM File Processing]] — DCF-to-IPM conversion, validation, and submission workflow
- [[Clearing Cycle]] — Mastercard's 6-cycle daily clearing schedule (6 cutoffs, settlement after cycle 6)
- [[Dispute Treatment — IDRS vs Mastercom]] — domestic (48h) vs international (45 days) dispute handling
- [[Exchange Rate Risk]] — losses on international settlement FX conversion must be escalated
