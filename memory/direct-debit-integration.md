---
type:
  - "concept"
title: Direct Debit integration
created: "2026-04-25T11:52:00Z"
summary: "TeamApt Direct to Bank integration track for mandate creation, transaction processing, and OTP-based authentication. As of 2026-04-27 cross-bank state: FCMB DD paused (resource priority), Union name-inquiry returns 'unauthorized' on 10-digit account, Paystack bank-side integrating, Money Point needs scheme config + SMS OTP fix, Apar Pay endpoint mods underway, Keystone re-test gated on bank account numbers."
updated: "2026-04-27T17:51:16Z"
cssclasses:
  - "concept"
---

## Definition

**Direct Debit integration** is the [[Direct to Bank program]] track that onboards Nigerian banks for direct-debit mandate creation and transaction processing through TeamApt's [[CDD]] (Consolidated Direct Debit) platform.

## Common building blocks

- **Mandate creation** flow — customer authorizes recurring debit at the bank.
- **Transaction simulation** — end-to-end testing with bank's sandbox/staging.
- **OTP-based authentication** — bank issues OTP for transaction authorization.
- **Account validation** — confirm account number formats (some banks require 10-digit, some 9-digit).
- **JAR deployment** — see [[JAR deployment standardization]].

## Active fronts (Apr 22 D2B)

- **[[Money Point]]** — OTP delivery failing; transaction processing fails after OTP validation. War room scheduled.
- **[[Union Bank]]** — server access resolved; waiting on bank to provide a 10-digit account number (9-digit caused API failure).
- **[[Polaris Bank]]** — Name-Inquiry and Transfer APIs unstable/failing; visit + dedicated session scheduled.
- **[[Keystone Bank]]** — bank's mobile-app build with OTP not ready; team to deploy latest JAR to test environment to test in parallel.
- **[[Steel Bank]]** — awaiting project approval sign-off.
- **[[Karry MFB]]** — API/server requirements doc handoff in progress.
- **[[Abar Pay]]** — logo update underway.
- **[[GT Bank]]** — service facilitator down (transient).

## Cross-bank status — 2026-04-27 Project Delivery & Optimization Realignment

- **[[FCMB Direct Debit]]** — **paused** per [[Ella]]: resource constraints force focus on FCMB account transfer first; DD resumes after. Reframed as resource prioritization, not an escalation.
- **[[Union Bank]] DD** — still blocked. Bank delivered the requested 10-digit account, but team is unable to validate because the bank's name-inquiry API returns an **unauthorized error** (token not authenticating). Team investigating internally. Owner: [[Oluwakemi Oni]].
- **[[Paystack]] DD** — effectively at integration phase: Paystack is the one currently integrating; team's job is API testing. Internal alignment underway on activity tracking; replicating [[Glory Alioha]]'s [[Global Pay]] implementation plan template. Continuity: same project [[Aqua]] was previously reporting (now under Kemi).
- **[[Keystone Bank]] DD** — re-running an end-to-end test using the initial mobile-app authentication (bank's new app not done). Awaiting bank-supplied test account numbers (Tue/Wed). Awaiting official email confirmation that OTP authentication remains in scope.
- **[[Money Point]] DD** — needs unique-scheme-ID configuration on their environment (parallel to card / transfer / v-stamp-duty schemes); cross-functional engineering + finance work; PM and head of engineering on it; feedback expected 28 April.
- **OTP service** — email OTP fixed Friday after credential issue; SMS OTP still pending; Money Point engineering owns fix; feedback 28 April.
- **[[Access Pay|Apar Pay]] DD** — endpoint and base URL modifications underway by [[Osborne]] and [[Victor]] (status by close of business 27 April). Base URL changed because production limits caused insufficient-account issues during transactions. Production APIs still pending after 3 days.
- **[[Coral Pay]] DD** — no responses from the pay.
- **[[Fidelity Bank]] DD training** — tentatively 4 May; awaiting bank confirmation. Team will check tomorrow.

## Cross-cutting blockers

- **OTP service reliability** — email path remediated; SMS path still credential-blocked.
- **API authorization tokens** — several banks delivering APIs that fail authorization checks against test accounts (Union Bank pattern).
- **SLA dependencies** — NSS consent letters often gated by separate account-switch SLA sign-off (FCMB, Fidelity).

## Sources

- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]
