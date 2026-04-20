---
role: cto-teamapt
type:
  - "situation"
title: Merchant Settlement — Systemic Reconciliation Disparity
status: developing
created: "2026-04-11T16:42:42Z"
summary: Merchant account 0000228201 settlement debits and CBA credits consistently mismatched. TDSD-6431 three escalation comments, no engineering response in 6+ days.
updated: "2026-04-20T13:15:29Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Merchant account 0000228201 settlement debits and CBA credits consistently mismatched from inception. Root cause: MNFY transactions credited to wrong account (0000221670 Monnify GTB VA VAT Payable instead of 0000228201 merchant settlement). [[TDSD-6431]] (Awaiting Scheme Update): three escalation comments from [[Romoke Ojo]], last Apr 9 19:14 WAT, no substantive response from [[Chinonyerem Alozie]] or engineering in 6+ days. [[TDSD-6444]] (same merchant).

**Scope expansion 2026-04-20 13:56 WAT.** [[TDSD-6638]] filed by [[Romoke Ojo]] (same reporter as TDSD-6431), assignee [[Dominic Usiabulu]]: "IRIS SETTLEMENT DEBIT WITHOUT CORRESPONDING CBA CREDITS- 0000221603". Description: Providus statement report shows transactions settled to merchants and debited to us, but no corresponding CBA credits to null the debits. NIBSS settlement report confirms transactions were all successful per response codes. Request: review why CBA credits not posted, treat accordingly. Medium priority, Awaiting Scheme Update, no comments yet. Spreadsheet linked on ticket.

**Failure mode identical; account differs.** Account 0000221603 (new) and account 0000228201 (primary tracked merchant) both exhibit IRIS settlement debit without corresponding CBA credit. Previously framed as merchant-specific wrong-account-credit issue (MNFY → 0000221670 VAT Payable); the second account surfacing expands scope. Open questions: is 0000221603 another MNFY routing mis-credit, or a distinct pathway? Does TDSD-6431's engineering-silent pattern (6+ days no substantive response) repeat here? Three escalation comments on TDSD-6431 remain unanswered — a second ticket with the same reporter points at a systemic rather than merchant-specific defect.

## Sources
jira TDSD-6431, TDSD-6444, TDSD-6638; TDSD-6444 comment 16:26 WAT Apr 6 ([[Oladimeji Alabi]]); TDSD-6638 created 13:56 WAT Apr 20

## Deltas
- 2026-04-09 21:00 WAT — [[Romoke Ojo]] added third escalation comment on TDSD-6431: "@Chinonyerem Alozie Please can we have an update? This ticket was logged since last week." No substantive response. Six days since last meaningful activity.
- 2026-04-20 13:56 WAT — [[TDSD-6638]] created: "IRIS SETTLEMENT DEBIT WITHOUT CORRESPONDING CBA CREDITS- 0000221603" — [[Romoke Ojo]] (reporter), [[Dominic Usiabulu]] (assignee), Medium, Awaiting Scheme Update. Second account exhibiting identical failure mode to 0000228201 after TDSD-6431 has sat 6+ days engineering-silent. Scope expansion signal — no longer a single-merchant framing.