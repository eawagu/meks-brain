---
title: Merchant Settlement — Systemic Reconciliation Disparity
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-11T16:42:42Z"
updated: "2026-04-11T16:42:42Z"
summary: Merchant account 0000228201 settlement debits and CBA credits consistently mismatched. TDSD-6431 three escalation comments, no engineering response in 6+ days.
---

Merchant account 0000228201 settlement debits and CBA credits consistently mismatched from inception. Root cause: MNFY transactions credited to wrong account (0000221670 Monnify GTB VA VAT Payable instead of 0000228201 merchant settlement). [[TDSD-6431]] (Awaiting Scheme Update): three escalation comments from [[Romoke Ojo]], last Apr 9 19:14 WAT, no substantive response from [[Chinonyerem Alozie]] or engineering in 6+ days. [[TDSD-6444]] (same merchant). Scope and fix timeline unstated. No new signals Apr 11.

## Sources
jira TDSD-6431, TDSD-6444; TDSD-6444 comment 16:26 WAT Apr 6 ([[Oladimeji Alabi]])

## Deltas
- 2026-04-09 21:00 WAT — [[Romoke Ojo]] added third escalation comment on TDSD-6431: "@Chinonyerem Alozie Please can we have an update? This ticket was logged since last week." No substantive response. Six days since last meaningful activity.