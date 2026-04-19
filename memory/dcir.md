---
title: DCIR
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T17:03:05Z"
updated: "2026-04-19T17:03:05Z"
summary: "TeamApt's Dynamic Currency Intelligence Routing platform — bundled with ACS and DirectDebit in the DCIR/ACS/DD security remediation program; Access Bank pen-test exposed 5 CRITICAL vulnerabilities requiring Harness CI/CD migration."
---

## Overview

DCIR is one of [[TeamApt]]'s core payment platforms, bundled with [[ACS (Access Control Server)]] and [[Direct Debit]] in TeamApt's integrated bank-facing services. Referenced as the **DCIR/ACS/DD** platform cluster in security audit and remediation contexts.

## Security Remediation (2026)

Following an [[Access Bank]] pen-test, 5 CRITICAL vulnerabilities were identified across DCIR/ACS/DirectDebit — see [[DCIR Security Vulnerabilities]]:

1. Default OAuth secrets
2. JWT tokens valid to 2037
3. DsMockController auto-approving all 3DS in production
4. (additional findings)
5. (additional findings)

[[Abdulgafar Obeitor]] committed to closing all vulnerabilities by April 8, 2026. Partial remediation was completed; residual items remained outstanding as of April 10.

## Harness Migration

DCIR is part of the TeamApt services migration to the [[Harness]] CI/CD platform — TDSD-6479, CTO-approved Apr 12. Migration aims to standardize deployment governance and enable faster security patching across DCIR/ACS/DD services.

## Operational Signals

- **Apr 15–17 DCIR failure rate (Wema route):** 40.65% → 20.4% → 66.0% → stabilized in 25–27% band (25.26% → 26.68% → 25.98%).
- **UBA DCIR 2FA production deployment:** Approved for the Apr 18–19 weekend.
- **FCMB DCIR portal track (Apr 19):** RE-FAILED after 1h27m apparent recovery; no bank-side resolution.

## Related

- [[DCIR Security Vulnerabilities]]
- [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]
- [[ACS (Access Control Server)]]
- [[Direct Debit]]
- [[Harness]]
- [[Access Bank]]