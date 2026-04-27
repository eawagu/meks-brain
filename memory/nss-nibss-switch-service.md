---
title: NSS (NIBSS Switch Service)
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-27T17:49:44Z"
updated: "2026-04-27T17:49:44Z"
summary: NIBSS Switch Service integration tracked across multiple banks (Zenith, Fidelity, Union, FCMB) — each bank requires its own configuration, admin user provisioning, and (per-bank) SLA prerequisites. As of 2026-04-27, Zenith NSS testing pivoted to Money Point transactions due to ATS endpoint unreadiness; Union NSS configuring; Fidelity and FCMB NSS blocked on prerequisite SLA sign-offs.
---

## Overview

NSS — NIBSS Switch Service — is a per-bank integration that the [[Direct to Bank program]] team rolls out as part of bank onboarding. Each NSS instance requires bank-specific configuration: per-bank-user daily reports, admin-user provisioning, and (per-bank) SLA / consent-letter prerequisites.

## Status by bank — as of 2026-04-27

### [[Zenith Bank]]

- Switch team has configured the **per-bank-user daily reports**.
- Original plan was to use [[ATS]] for testing; ATS endpoint not ready and is far away.
- **Decision (per [[Kevin]]):** use [[Money Point|Moniepoint]] transactions for the NSS test instead. Internal-work timeline 15 May.
- Pilot date target: **29 April**.
- Meeting expected this week to confirm direction.

### [[Union Bank]]

- Bank shared **admin user details**; team is configuring those into the portal.

### [[Fidelity Bank]]

- **No movement.** Update from [[Kevin]] / engineering expected 28 April.
- Bank's position: account-switch SLA must be signed first before NSS consent letter discussion.

### [[FCMB]] (FCMBNSS)

- **On hold by the bank.** Bank's position: account-switch SLA must be signed (sent today, 27 April) before NSS consent letter discussion can proceed.

## Pattern

NSS engagements consistently sit downstream of an account-switch / interbank SLA prerequisite (Fidelity, FCMB). For Zenith, the prerequisite is technical (ATS readiness), not contractual.

## Related

- [[NIBSS]]
- [[Account Transfer Integration]]
- [[Direct Debit Integration]]
- [[Service Level Agreement (SLA) Negotiation]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]