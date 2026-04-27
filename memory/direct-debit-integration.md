---
title: Direct Debit Integration
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-27T17:49:44Z"
updated: "2026-04-27T17:49:44Z"
summary: "Mandate-based bank-debit integration via NIBSS rails — multi-bank rollout. As of 2026-04-27 status by bank: FCMB DD paused (resource-constraint, account transfer first); Union Bank DD blocked on bank's name-inquiry API returning 'unauthorized'; Paystack DD bank-side integrating; Money Point DD pending scheme configuration; Apar Pay DD endpoint mods underway; OTP service email fixed, SMS pending."
---

## Overview

Direct Debit (DD) integration is a mandate-based bank-debit product on NIBSS rails. The [[Direct to Bank program]] team integrates each bank individually — mandate creation, transaction simulation, OTP service wiring, account validation, and SLA / consent-letter sign-off.

## Cross-bank status — as of 2026-04-27

### [[FCMB Direct Debit]] — paused

- [[Ella]] decided FCMB account transfer takes priority due to resource constraints. DD work resumes after account transfer completes.
- Reframed as resource prioritization, not an escalation.

### [[Union Bank]] DD — blocked

- Bank's **name-inquiry API returns an unauthorized error** against the 10-digit account they delivered (the previously-given 9-digit account also failed). Token not authenticating.
- Team investigating internally. Owner: [[Oluwakemi Oni]].

### [[Paystack]] DD — bank-side integration in progress

- Paystack is the one currently integrating; team's job is API testing.
- Internal alignment underway on activity tracking; replicating the [[Global Pay]] implementation plan template that [[Glory Alioha]] used.
- Same project [[Aqua]] was previously reporting (now under Kemi).

### [[Keystone Bank]] DD — re-test in flight

- End-to-end re-test using the initial mobile-app auth (bank's new app not done).
- Awaiting bank-supplied test account numbers (expected Tue/Wed).
- Awaiting official email confirmation that OTP authentication remains in scope.

### [[Money Point]] DD — needs scheme config

- Money Point environment needs a unique scheme ID for direct-debit transactions (parallel to card / transfer / v-stamp-duty schemes).
- Cross-functional engineering + finance work; PM and head of engineering on it; feedback expected tomorrow.
- **OTP service** — email OTP fixed Friday after credential issue; SMS OTP still pending; Money Point engineering owns fix; feedback tomorrow.

### [[Access Pay|Apar Pay]] DD — endpoint modifications

- Modifications on new endpoint and base URL underway by [[Osborne]] and [[Victor]] (status by close of business). Base URL changed because production limits caused insufficient-account issues during transactions.
- Production APIs still pending after 3 days.

### [[Coral Pay]] DD — no response

### [[Fidelity Bank]] DD — training scheduling

- Tentative training date 4 May; awaiting bank confirmation. Team will check tomorrow.

## Cross-cutting blockers

- **OTP service reliability** — email path remediated; SMS path still credential-blocked.
- **API authorization tokens** — several banks delivering APIs that fail authorization checks against test accounts (Union Bank pattern).
- **SLA dependencies** — NSS consent letters often gated by separate account-switch SLA sign-off (FCMB, Fidelity).

## Related

- [[NIBSS]]
- [[Direct to Bank program]]
- [[NSS (NIBSS Switch Service)]]
- [[Service Level Agreement (SLA) Negotiation]]
- [[OTP Authentication]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]