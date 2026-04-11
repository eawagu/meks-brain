---
title: Direct Debit Production Issues Weekly Analysis 2026-04-02 MD
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: direct-debit-production-issues-weekly-analysis-20260402.md
summary: Markdown version of the April 2, 2026 Direct Debit production issues weekly analysis meeting, covering transaction reversal logic, auto-reversal architecture, OTP delivery via email, and response code harmonization, owned by Yasir Syed Ali.
---

## Summary

Markdown version of the April 2, 2026 Direct Debit production issues weekly analysis meeting. Owned by [[Yasir Syed Ali]]. Content mirrors the Gemini-notes docx version (see [[Direct Debit Production Issues Weekly Analysis 2026-04-02 Gemini Notes]]). Covers the cron job design for pending transactions, auto-reversal architecture, OTP delivery feasibility via email, and response code harmonization status.

## Key Points

- **Cron job for pending transactions**: a scheduled job requeues transactions stuck in pending status after a 10-minute threshold, then forces a fail state if no response is received. This replaces manual intervention.
- **Auto-reversal design**: when a transaction must be reversed, funds flow from the transit account back to the customer account. The transit account acts as the intermediary to maintain audit integrity.
- **OTP via email feasibility**: the team discussed replacing SMS OTP with email OTP for mandate authentication steps. Feasibility confirmed for flows where the customer has a registered email; SMS fallback retained for others.
- **Response code harmonization**: mandate-related harmonization is complete; transaction-level harmonization is still in progress and is a blocking item for integration consistency across banks.
- Owner: [[Yasir Syed Ali]]
- Near-duplicate of the .docx version ingested as [[Direct Debit Production Issues Weekly Analysis 2026-04-02 Gemini Notes]] (source page ID 225). Both are retained as separate source pages per the one-page-per-file rule.

## Entities Mentioned

- [[Yasir Syed Ali]] — meeting owner
- [[TeamApt Limited]] — operator

## Concepts

- [[Direct Debit]] — the payment rail being analyzed
- [[Transaction Reversal]] — the mechanism for returning funds on failed or disputed debits
- [[Auto-Reversal]] — automated reversal flow via transit account
- [[OTP Delivery]] — one-time password delivery for mandate authentication
- [[Response Code Harmonization]] — standardizing bank response codes across integrations
- [[Transit Account]] — staging account used in reversal flows