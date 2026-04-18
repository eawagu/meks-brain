---
title: Monnify Disbursements — Stuck IN PROGRESS Apr 17+
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-18T17:17:32Z"
updated: "2026-04-18T17:17:32Z"
summary: "New TDSD-6617 (filed 2026-04-18 18:06 WAT by Temitope Ojo, assigned Emmanuel Eke, Medium, INITIAL REVIEW): several Monnify disbursement transactions initiated from Apr 17 onward are stuck in \"IN PROGRESS\" status — a distinct failure mode from the active duplicate-debit recurrence on the same product surface. Scope and linkage to Atlas pathway not yet specified; ticket tracks affected transactions via linked Google Sheet."
---

[[TDSD-6617]] filed 2026-04-18 18:06 WAT (Medium priority, INITIAL REVIEW) — reporter [[Temitope Ojo]], assignee [[Emmanuel Eke]]. Summary: "PENDING DISBURSEMENTS". Description: "Several disbursement transactions initiated between April 17 to date are currently stuck in 'IN PROGRESS' status." A Google Sheet linked on the ticket tracks the affected transactions.

**Failure mode distinct from the active duplicate-debit situation.** [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]] covers the pathway where transactions complete successfully but are debited twice (₦32.66M / 381 txn scope as of 2026-04-18 08:54 WAT). This situation covers transactions that **never complete** — they enter the disbursement flow, status transitions to IN PROGRESS, and then hang. Per Behavioral Principle 1 (competing interpretations), these are tracked as separate situations pending evidence of common root cause; the [[Monnify]] disbursement surface is shared but the symptoms are opposite (successful-with-double-debit vs. inoperative).

**Entity touched:** [[Atlas Transfer Service Specification]] — Atlas is the internal integration switch processing ~500M transactions/month. A disbursement-pathway stuck-state failure mode is a high-impact defect surface for the same switch already under scrutiny for the duplicate-debit pathway; whether the two share a common upstream defect (e.g., transaction-state machine, Kafka monnify database lag) is an open engineering question. [[TDSD-6614]] (Kafka monnify database 2h lag, cloud-engineer fast-resolve Apr 18 15:09–15:12 WAT) provides a nearby proximate candidate worth probing in RCA.

**CTO posture:** Awareness at file. Medium priority and INITIAL REVIEW status do not meet Immediate-tier triggers. Pending Layer C signals: count of affected transactions (Google Sheet quantification), Atlas-vs-non-Atlas pathway attribution, whether IN PROGRESS hangs correlate temporally with the duplicate-debit window or with [[TDSD-6614]] Kafka lag. If affected transaction count or aggregate value crosses mid-seven-figures, or if pathway attribution points to Atlas double-entry layer, escalate to Briefing Decision tier and probe convergence with the duplicate-debit situation.

**Open questions:**
- How many transactions are affected? What is the aggregate pending value?
- What pathway is involved — NIP outwards (shared with duplicate-debit), card, account, or multiple?
- Do the IN PROGRESS hangs correlate temporally with the Apr 17+ duplicate-debit window, or with TDSD-6614 Kafka lag?
- Is there an existing engineering task on disbursement-state-machine reliability, or does each occurrence get worked reactively?
- If reconciled alongside the duplicate-debit pathway, does one underlying defect (e.g., incomplete state transition + compensating double-debit retry) explain both?

## Sources

- Jira, TDSD-6617 "PENDING DISBURSEMENTS", filed 2026-04-18 18:06:54 WAT, reporter Temitope Ojo, assignee Emmanuel Eke, Medium priority, INITIAL REVIEW, linked Google Sheet of affected transactions

## Deltas

- [2026-04-18 18:09 WAT] — Situation opened on TDSD-6617 file. Described as "several" transactions initiated Apr 17 onward stuck in IN PROGRESS. Affected-count and pathway attribution not yet on the ticket. Tracked separately from [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]] per competing-interpretations principle — distinct failure mode (inoperative vs. successful-with-double-debit) on shared product surface. Proximate candidate correlations flagged for future RCA: [[TDSD-6614]] Kafka monnify database 2h lag (cloud-engineer fast-resolve earlier same day), Apr 17+ duplicate-debit window on Atlas NIP Outwards Transit.
