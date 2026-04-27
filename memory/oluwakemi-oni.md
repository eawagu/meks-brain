---
type:
  - "entity"
title: Oluwakemi Oni
created: 2026-04-11
summary: "TeamApt Direct to Bank team member — primary bank communicator for Union Bank, Polaris, Paystack, Keystone and other DD-pipeline banks; replicating Glory's Global Pay implementation plan for Paystack tracking."
updated: "2026-04-27T17:43:51Z"
cssclasses:
  - "entity"
---

TeamApt [[Direct to Bank program]] team member. Primary bank communicator for many DD-pipeline banks (Steel Bank, Coral Pay, Access Bank, Polaris Bank, Union Bank, Karry MFB, Keystone Bank, Paystack).

## 2026-04-22 — D2B Standup (08:21 WAT)

Owns the day's action list:
- **Steel Bank** — follow up to determine project approval status and necessary sign-offs.
- **Coral Pay × Access Bank** — call [[Daniel]] today to inquire about SLA progress; determine pilot-production timeline.
- **Interbank Transfer SLA** — reach out to [[Chama]] today to follow up on Access Bank sign-off.
- **Karry MFB** — receive API/server requirements documentation from [[Abdulgafar Obeitor]].
- **Union Bank** — follow up with bank regarding the failing API status to enable test continuation.
- **Polaris Bank** — visit bank today/tomorrow; address outstanding issues and resolve API instability.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## 2026-04-23 — D2B Standup

- **Quarterly priorities** — requested clarity on team's expectations and priorities for the current quarter so the project team can align activities and avoid mixed scenarios from the previous quarter. [[Abdulgafar Obeitor]] proposed a review meeting for tomorrow.
- **Polaris Bank follow-up** — reach out to Polaris contacts to ascertain reason for the missing expected feedback email.
- Source: [[note_2026-04-23T13-53-37-857Z]].

## 2026-04-27 — Project Delivery & Optimization Realignment

Updates given (after a slide-sharing fumble on the wrong sheet):
- **[[Union Bank]] Direct Debit** — in mandation/test-simulation phase. Blocked: bank gave a 9-digit account, then a 10-digit account; team unable to validate as bank's name-inquiry API returns an unauthorized error (token not authenticating). Internal investigation underway.
- **Union Bank NSS** — bank shared admin user details; team configuring the portal.
- **[[Polaris Bank|Polar]] Fund Settlement** — minimal progress on transfer APIs. Name-inquiry API still failing. Onboarding form remains the blocker.
- **Union Bank account transfer** — bank wants only inbound transfer testing right now. Team shared all needed info; awaiting feedback. SLA also under bank review.
- **[[Paystack]] Direct Debit** — bank is integrating; team aligning internally on activity list. Replicating [[Glory Alioha]]'s [[Global Pay]] implementation plan template so the internal team commits to a tracker (avoid silos / ad-hoc activity). Same project [[Aqua]] was previously reporting (confirmed by Taiwo).
- **[[Keystone Bank]]** (low light) — kicked off slightly. Re-running an end-to-end test using the initial mobile-app authentication (since the bank's new app isn't done). Asked bank for test account numbers; expected by Tue/Wed. **Owns:** request official email confirmation from Keystone on whether OTP authentication pattern is in scope alongside mobile-app auth.
- Held a side question for [[Taiwo Baptista]] on NSS implementation to avoid taking meeting time.
- Source: [[Project delivery and optimization realignment - 2026-04-27 - Transcript]].

## Sources
- [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]