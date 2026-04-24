---
role: cto-teamapt
type:
  - "situation"
title: Monnify Disbursements — Stuck IN PROGRESS Apr 17+
status: retired
created: "2026-04-18T17:17:32Z"
summary: "New TDSD-6617 (filed 2026-04-18 18:06 WAT by Temitope Ojo, assigned Emmanuel Eke, Medium, INITIAL REVIEW): several Monnify disbursement transactions initiated from Apr 17 onward are stuck in \"IN PROGRESS\" status — a distinct failure mode from the active duplicate-debit recurrence on the same product surface. Scope and linkage to Atlas pathway not yet specified; ticket tracks affected transactions via linked Google Sheet."
updated: "2026-04-24T09:17:34Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

**Retired 2026-04-24 10:09 WAT.** [[TDSD-6617]] "PENDING DISBURSEMENTS" transitioned Work in progress → Completed at 10:09 WAT Apr 24 by assignee [[Chinonyerem Alozie]] (original assignee [[Emmanuel Eke]] was reassigned at some point in the lifecycle). 5d15h57m active from filing (18:06 WAT Apr 18) to closure. No closure RCA comment observed on the ticket at tick time — the `Completed` status transition is the only resolution signal. Historical scope + pathway questions preserved below for pattern-synthesis; the disbursement-state-machine open questions did not receive formal answers inside this ticket.

Retiring per the heartbeat bias-toward-retiring rule: the developing condition is closed, and monitoring this page adds no further signal. If a fresh disbursement-IN-PROGRESS pattern emerges on a new ticket, a new situation page will be created.

---

[[TDSD-6617]] filed 2026-04-18 18:06 WAT (Medium priority, INITIAL REVIEW) — reporter [[Temitope Ojo]], assignee [[Emmanuel Eke]] at file. Summary: "PENDING DISBURSEMENTS". Description: "Several disbursement transactions initiated between April 17 to date are currently stuck in 'IN PROGRESS' status." A Google Sheet linked on the ticket tracks the affected transactions.

**Failure mode distinct from the active duplicate-debit situation.** [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]] covers the pathway where transactions complete successfully but are debited twice (₦32.66M / 381 txn scope as of 2026-04-18 08:54 WAT). This situation covers transactions that **never complete** — they enter the disbursement flow, status transitions to IN PROGRESS, and then hang. Per Behavioral Principle 1 (competing interpretations), these are tracked as separate situations pending evidence of common root cause; the [[Monnify]] disbursement surface is shared but the symptoms are opposite (successful-with-double-debit vs. inoperative).

**Entity touched:** [[Atlas Transfer Service Specification]] — Atlas is the internal integration switch processing ~500M transactions/month. A disbursement-pathway stuck-state failure mode is a high-impact defect surface for the same switch already under scrutiny for the duplicate-debit pathway; whether the two share a common upstream defect (e.g., transaction-state machine, Kafka monnify database lag) is an open engineering question. [[TDSD-6614]] (Kafka monnify database 2h lag, cloud-engineer fast-resolve Apr 18 15:09–15:12 WAT) provides a nearby proximate candidate worth probing in RCA.

**CTO posture:** Awareness at file. Medium priority and INITIAL REVIEW status did not meet Immediate-tier triggers across the lifecycle.

**Open questions (unresolved at closure):**
- How many transactions were affected? What was the aggregate pending value?
- What pathway was involved — NIP outwards (shared with duplicate-debit), card, account, or multiple?
- Did the IN PROGRESS hangs correlate temporally with the Apr 17+ duplicate-debit window, or with TDSD-6614 Kafka lag?
- Was an engineering task filed on disbursement-state-machine reliability, or did each occurrence get worked reactively?
- If reconciled alongside the duplicate-debit pathway, does one underlying defect (e.g., incomplete state transition + compensating double-debit retry) explain both?

The no-closure-RCA pattern repeats the NIBSS DD silent-recovery shape at the product level (Chinonyerem Alozie closing without a comment) — not a clean fit to the Kabir Yusuf NIBSS pattern (different team, different product family), but worth watching for repeats on the Monnify disbursement surface.

## Sources

- Jira, TDSD-6617 "PENDING DISBURSEMENTS", filed 2026-04-18 18:06:54 WAT, reporter Temitope Ojo, assignee at file Emmanuel Eke → reassigned to Chinonyerem Alozie by closure, Medium priority, INITIAL REVIEW → Work in progress → Completed 10:09 WAT Apr 24, linked Google Sheet of affected transactions

## Deltas

- [2026-04-18 18:09 WAT] — Situation opened on TDSD-6617 file. Described as "several" transactions initiated Apr 17 onward stuck in IN PROGRESS. Affected-count and pathway attribution not yet on the ticket. Tracked separately from [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]] per competing-interpretations principle — distinct failure mode (inoperative vs. successful-with-double-debit) on shared product surface. Proximate candidate correlations flagged for future RCA: [[TDSD-6614]] Kafka monnify database 2h lag (cloud-engineer fast-resolve earlier same day), Apr 17+ duplicate-debit window on Atlas NIP Outwards Transit.
- [2026-04-24 10:09 WAT] — **RETIRED.** TDSD-6617 transitioned to Completed at 10:09 WAT by Chinonyerem Alozie (reassignment from Emmanuel Eke occurred during the lifecycle, exact timing not captured on this tick). 5d15h57m active. No closure RCA comment observed. Open questions about scope/pathway/correlation with duplicate-debit pathway remain structurally unanswered; folded into [[Monnify]] entity pattern-notes for future synthesis. Factors: source=jira, archetype=service_desk, priority=medium, status_transition_completed, no_closure_rca_observed, assignee_reassigned_during_lifecycle, lifecycle_transition=developing→retired.
