---
title: Project delivery and optimization realignment - 2026-04-27
type:
  - "source"
cssclasses:
  - "source"
source_path: Project delivery and optimization realignment - 2026_04_27 14_59 WAT - Notes by Gemini.md
retention_label: postgres
retention_rationale: Multi-bank integration status meeting with named owners, deadlines, and per-bank technical detail; future retrieval likely when chasing specific items (e.g., FCMB SLA status, Zenith vulnerability scan, Union Bank API errors).
meeting_date: 2026-04-27
meeting_owner: eedeh@teamapt.com
created: "2026-04-28T08:32:53Z"
updated: "2026-04-28T08:32:53Z"
summary: Weekly project delivery review covering integration status across Zenith, FCMB, Fidelity, Union, Ecobank, Sterling, GT Bank, Keystone, Payzone, Paystack, Money Point, Smart Kash, Nibbs, and Mastercard, with SLA reviews, OTP/NSS/UAT progress, and aligned decision to prioritize FCMB Account Transfer over Direct Debit.
---

## Summary

Weekly project delivery and optimization realignment meeting on 2026-04-27 covering bank integration status, SLA reviews, and pending technical issues. Attendees included [[Oluwakemi Oni]], [[Ifeoluwa Oguntona]], [[Emmanuella Edeh]], [[Abraham Isinguzoro]], [[Opeyemi Animashaun]], [[Taiwo Baptista]], [[Glory Alioha]], [[Adeyinka Babalola]], and [[Tunde Okufi]]. The team aligned on prioritizing FCMB Account Transfer over Direct Debit due to resource constraints, while progressing vulnerability scans, training schedules, SLA legal reviews, and integration testing across multiple banks.

## Key Points

- **FCMB project prioritization (ALIGNED decision)**: Resources prioritized to complete [[FCMB]] [[Account Transfer]] before resuming [[Direct Debit]] activities due to resource constraints.
- **Zenith deadlines**: All [[Zenith Bank]]-related issues to resolve by April 30 to start Direct Debit pilot. NSS expected April 29; [[Stanbic Bank]] Phone Settlement Agent April 30; [[Ecobank]] Fund Settlement Agent May 15.
- **Zenith vulnerability scan**: Team fixed bank-identified vulnerabilities; bank requested team's own internal scan results for comparison, with feedback expected end-of-day.
- **Zenith NSS**: Switch team configured daily/user-specific reports; ATS environment not ready, so will use [[Money Point]] transactions; internal completion target May 15.
- **FCMB Account Transfer**: Switch APIs (name inquiry, transfer) provided; awaiting bank's inbound/outbound APIs. SLA reviewed by [[Nora]] and sent to FCMB legal team.
- **FCMB Admin Profiling**: Bank provided two users; team can only profile one as institutional admin — confirmation requested.
- **Fidelity Bank**: Account Transfer SLA approved by legal, signing pending from [[Dennis]] and [[Felix]]. Dev environment issues progressing toward UAT by April 30. Direct Debit training tentatively May 4, pending bank confirmation. NSS blocked on account switch SLA signature.
- **Union Bank**: Direct Debit testing hindered by 10-digit account number validation failures and unauthorized name-inquiry API responses. NSS admin user details received; configuring portal. Polar fund settlement minimal progress on transfer APIs.
- **Paystack Direct Debit**: Bank handling integration; team aligning internally on activity tracking to avoid silos.
- **Keystone Bank**: Preparing end-to-end test using initial mobile app for authentication (new app still being built); awaiting bank's email confirmation on OTP authentication pattern.
- **Sterling Bank**: SLA under product team review per Nora's comments (plus 5.5 component); board resolution letter signature pending — needed for income account to proceed with settlement.
- **Access Pay**: Endpoint and base URL modifications underway by [[Osborne]] and [[Victor]] due to account-limit issues during transactions; status expected EOD.
- **Money Point**: Direct Debit unique scheme configuration pending; engineering + finance feedback expected next day. OTP email fix complete; SMS still pending due to credential issue.
- **GT Bank**: Bank's legal rejected generic SLA template; provided modified version with fewer changes; [[Nora]] reviewing this week.
- **Payzone**: Account Switch UAT/integration test complete (Friday); production setup in progress; secondary VPN setup meeting scheduled tomorrow morning post-form completion. Card Switch IP/port shared this afternoon; delay caused by NetCloud resource on [[Postbridge]] cash-out implementation.
- **Smart Kash**: URL whitelisting issue for virtual account modification unresolved.
- **[[Nibbs]] authorization**: Mandate mapping complete; remaining item is Nibbs/Money Point fund settlement handling.
- **[[Mastercard]]**: Licensing meeting scheduled April 29 (pending since February). Compliance walkthrough completed last week ahead of card-not-present kickoff.
- **Fidelity Acquirer Processing Service**: Bank interested; commercials and scheme nomination templates to be shared by [[Adeyinka Babalola]].
- **[[Pureshops]] PS Integration**: All test cases run; switch team flagged a recurring case; [[Mustafa]] and team revalidating.

## Next Steps (Action Items)

- [The group] Internal security scan, deliver results to bank today
- [Ifeoluwa Oguntona] Follow up on Zenith training reschedule date
- [Ifeoluwa Oguntona] Schedule meeting this week to discuss NSS process via Money Point transactions
- [Legal team] Review FCMB Account Transfer SLA, send feedback
- [The group] Check tomorrow for positive response on Fidelity Bank Direct Debit training date
- [The group] Confirm internal team activities required for Paystack Direct Debit implementation
- [Oluwakemi Oni] Email Keystone Bank requesting OTP authentication pattern confirmation
- [Nora] Finalize Sterling Bank SLA review based on comments; revert to Glory for sharing with bank
- [Glory Alioha] Follow up with Ella on Dary/Dennis discussion on bonafide TSA collection
- [Nora] Review GT Bank modified SLA; revert this week
- [Taiwo Baptista] Share VPN connection form with Payzone immediately after call
- [Taiwo Baptista] Schedule Payzone call tomorrow morning after form completion
- [Adeyinka Babalola] Share commercials and scheme nomination templates with Fidelity Bank

## Entities Mentioned

- People: [[Oluwakemi Oni]], [[Ifeoluwa Oguntona]], [[Emmanuella Edeh]], [[Abraham Isinguzoro]], [[Opeyemi Animashaun]], [[Taiwo Baptista]], [[Glory Alioha]], [[Adeyinka Babalola]], [[Tunde Okufi]], [[Nora]], [[Kevin]], [[Dennis]], [[Felix]], [[Ella]], [[Dary]], [[Osborne]], [[Victor]], [[Mustafa]]
- Banks: [[Zenith Bank]], [[FCMB]], [[Fidelity Bank]], [[Union Bank]], [[Ecobank]], [[Sterling Bank]], [[GT Bank]], [[Keystone Bank]], [[Stanbic Bank]]
- Payment platforms / counterparties: [[Mastercard]], [[Payzone]], [[Paystack]], [[Money Point]], [[Smart Kash]], [[Nibbs]], [[Pureshops]], [[Postbridge]], [[Access Pay]]

## Concepts

- [[Direct Debit]]
- [[Account Transfer]]
- [[Service Level Agreement]]
- [[Network Settlement Service]]
- [[Fund Settlement Agent]]
- [[Phone Settlement Agent]]
- [[OTP Authentication]]
- [[User Acceptance Testing]]
- [[Vulnerability Scan]]
- [[VPN Connection]]
- [[Card Processing]]
- [[Acquirer Processing Service]]
- [[Bank Integration]]
- [[Card Switch]]
- [[Account Switch]]