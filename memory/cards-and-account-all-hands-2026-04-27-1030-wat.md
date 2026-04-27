---
title: "Cards and Account: All Hands – 2026-04-27 10:30 WAT"
type:
  - "source"
cssclasses:
  - "source"
created: "2026-04-27T11:20:00Z"
updated: "2026-04-27T11:20:00Z"
source_path: "Cards and Account: All Hands – 2026/04/27 10:30 WAT – Notes by Gemini"
drive_file_id: 16XP1Z1tmRVpk7wGVxYbSzc8oT2pxHR3XedmFvEnjPn4
drive_view_url: "https://docs.google.com/document/d/16XP1Z1tmRVpk7wGVxYbSzc8oT2pxHR3XedmFvEnjPn4/edit"
summary: "Cards and Account All Hands daily meeting Mon Apr 27 10:30 WAT — Express Checkout temporarily deprioritized to accelerate iCard + Pay with Moniepoint; Pay with Moniepoint integration concluded with TMAP DD blocker resolved (TDSD-6742 deployment ticket filed by Muhammad Abid 11:35 WAT); MPJS/Visa international payments end-to-end production testing targeted to close by Thursday; AEL Smart Cache callback IP unblocked; Damilare requested week-on-week product dashboard."
---

## Summary

Daily-cadence "Cards and Account: All Hands" meeting (Mon Apr 27 10:30–11:15 WAT, organizer [[David Redemi]]). Cross-team sync between TeamApt cards/accounts engineering and Moniepoint Inc. counterparts ([[Ankit Kushwaha]], [[Damilare Ogunnaike]], Muhammad Abid, others). Three converging tracks today: international payments (MPJS + Visa) end-to-end production testing nearing close; [[Moniepoint Group Pay with Moneypoint]] integration concluded with TMAP DD blocker resolved; Express Checkout temporarily deprioritized to accelerate iCard + Pay with Moniepoint deployment.

## Key Points

### International Payment Status
- **MPJS** end-to-end production testing in progress; blocked on receiving correct internal accounts. Bulaji shared three accounts identified as 10-digit; team needs "net accounts" first to run on CBA before configuring 10-digit accounts. [[David Redemi]] flagged the format mismatch.
- **Visa** deployed to production; deprioritized vs MPJS pending refund-flow integration.
- **Refund flow:** Juliana refund path now resolved bank-side; team has implemented refund flow on staging; planned production deploy this week.
- **Settlement/compliance:** USD settlement for Visa transactions pending compliance confirmation (Tracy thread). Second-leg posting entry issues raised by SR team in focus.
- **Target:** conclude end-to-end MPJS + Visa testing including settlement by Thursday (Pascal on leave thereafter).

### Mastercard Walkthrough
- Two-hour walkthrough completed; team awaiting deck before extracting and sharing pointers.
- Most prominent compliance topic: Point of Sale (POS).
- MPJS success rates and approval panels actively monitored; refund/chargeback/settlement aligned with TPP team awaiting actual transactions.

### AEL Smart Cache Integration
- Callback IP whitelisting issue resolved (correct IP shared and whitelisted); testing in progress.
- Next: SLA + settlement-account finalization; integration document handover to AEL.

### iCard
- MR approved by [[Ravi Veluguleti]] last week; deploying to playground today.
- Asan testing; Smart starts second-leg work (was first-stage-dependency-blocked).
- Today's 9:45 recurring meeting cancelled; new meeting scheduled tomorrow.

### Pay with Moniepoint and Direct Debit
- Pay with Moniepoint integration concluded last week.
- Team faced TMAP direct-debit blocker on payment initialization; bank-side fix confirmed received.
- Pay with Moniepoint testing now in progress; aim to close both AEL Smart Cash + Pay with Moniepoint testing today if no further issues.
- TMAP direct-debit enhancement track: error-code mapping work to improve transparency from bank side.
- **Filed today:** [[TDSD-6742]] "Direct Debit Enhancements and Pay with Moniepoint implementation" ([System] Change, Status: Review, Reporter Muhammad Abid, 11:35 WAT). Description covers (a) merchant auto-registration on TeamApt, (b) new Get Mandates API with filters, (c) TeamApt create-mandate response-code mapping on monnify side, plus Pay with Moniepoint implementation. Deployment note linked from ticket.

### SR Team Manual Queries
- Commitment: resolve all SR-raised manual queries this month.
- One ticket assigned to cards team, "a couple" assigned to accounts team.
- Decim handling 2; David Oparanti handling 1.
- Goal: close 3 of remaining 5–6 tickets this month.
- Key tickets named: pending TSQ handler, direct-debits UI completion of pending mandates, back-office refunds/limit configuration.

### Money Point NIPS Authorization Account
- Required for Express Checkout AND mandate activation.
- [[Ankit Kushwaha]] shared account details with [[Damilare Ogunnaike]].
- First account tested did not debit mandate; subsequent accounts worked.
- Rollout conversation proposed for next Tuesday.

### Express Checkout Project
- **Temporarily deprioritized** to focus on iCard + Pay with Moniepoint quick rollout.
- Last status: staging testing fine; blocked on Money Point authorization account.
- Resume after current two high-priority initiatives complete.

### PNC/PND Feature
- Stagnated due to needing CBA-team support to add a parameter on their side.
- DevOps change confirmed complete by [[David Redemi]]; team unblocked on CBA side.
- [[Charles Onuorah]] bandwidth-blocked due to international-payments focus.
- [[Ankit Kushwaha]] committed to providing timeline on Slack after sync with Charles.

### Product Dashboard
- [[Damilare Ogunnaike]] requested product team build dashboard surfacing key metrics (virtual accounts performance, cards performance) on week-on-week basis.
- Should be the first thing reviewed during these calls.
- Damilare also reminded team to structure update presentation per Jira board, tying initiatives to objectives.

## Decisions

- **Express Checkout temporarily deprioritized** to enable iCard + Pay with Moniepoint completion.

## Next Steps (action items)

- [[David Redemi]] — Contact Bulaji regarding correct 10-digit internal accounts.
- [[Ankit Kushwaha]] — Set up specific merchants on sandbox; begin merchant integration process.
- [[Damilare Ogunnaike]] — Confirm USD settlement process with Tracy and Ty.
- [[Ankit Kushwaha]] — Extract key pointers from Mastercard presentation; share findings with group.
- [[Ankit Kushwaha]] — Schedule meeting with Kelvin to discuss front-office dashboard changes.
- [[Ankit Kushwaha]] — Determine product success metrics; build week-on-week product performance dashboard.
- [[Ankit Kushwaha]] — Send NIPS authorization account details to [[Damilare Ogunnaike]].
- [[Damilare Ogunnaike]] — Schedule Money Point NIPS authorization account rollout conversation for next Tuesday.
- [[Ankit Kushwaha]] — Sync with [[Charles Onuorah]] on PNC feature timeline; share on Slack.

## Cross-references

- Concept: [[Moniepoint Group Pay with Moneypoint]] — Apr 27 substantial progress: integration concluded last week, TMAP DD blocker resolved, deployment-track ticket filed (TDSD-6742).
- Concept: [[Direct Debit Program]] — TMAP direct-debit enhancements on monnify side filed via TDSD-6742.
- Entity: [[CBA]] — PNC/PND feature unblocked on DevOps side; awaiting [[Charles Onuorah]] capacity.
- Ticket: [[TDSD-6742]] — change ticket covering DD enhancements + Pay with Moniepoint implementation, Reporter Muhammad Abid 11:35 WAT, Status Review.

## Source

- Drive file: "Cards and Account: All Hands – 2026/04/27 10:30 WAT – Notes by Gemini"
- Drive ID: 16XP1Z1tmRVpk7wGVxYbSzc8oT2pxHR3XedmFvEnjPn4
- Drive URL: https://docs.google.com/document/d/16XP1Z1tmRVpk7wGVxYbSzc8oT2pxHR3XedmFvEnjPn4/edit
- Calendar event: [Cards and Account: All Hands](https://calendar.google.com/calendar/event?eid=MXZiNXZhMjBraDNyOWh2aGk3dHBoOHR2ZDZfMjAyNjA0MjdUMDkzMDAwWiBkYXZpZC5yZWRlbWlAdGVhbWFwdC5jb20)
- Meeting time: 2026-04-27 10:30–11:15 WAT
- Organizer: [[David Redemi]]
- No transcript layer present (no `## Transcript` heading); non-transcript layer is the full document — no `capture_note` ingress dispatch per source-config-google-drive split rule.
