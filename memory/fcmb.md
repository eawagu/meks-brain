---
type:
  - "entity"
title: FCMB
created: 2026-04-11
summary: "First City Monument Bank — ATS and Direct Debit routing. RC91 cycle Apr 16 (08:19–09:02 WAT, ~43min, resolved). Portal inaccessibility, BIN intermittent failures via NIBSS PTSA, ACS connector replacement in progress."
updated: "2026-04-16T08:18:57Z"
cssclasses:
  - "entity"
---

## Overview

[[FCMB]] (First City Monument Bank) is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] and [[Direct Debit]] routing. Multiple concurrent failure modes tracked in Apr 2026: portal inaccessibility attributed to "low balance," BIN intermittent failures via NIBSS PTSA, and ACS connector replacement in progress.

## ATS RC91

### Cycle — Apr 16, 2026 (resolved ~43min)

**2026-04-16 08:19 WAT:** [[Afeez Kazeem]] (Application Monitoring Engineer) filed RC91 failure. Subject: "FCMB | RC 91 | 20260416". Message: "transactions are failing intermittently with RC 91." Sent to FCMB Switch Application Support (Erica Akhibi). Erica requested reconfirmation at 08:35 WAT. Afeez confirmed resolved at 09:02 WAT: "Transactions are now processing successfully." Duration: ~43 min. TDSD-6572 created (visible via email notification, unverifiable via Jira — connector blind Day 5).

## MFA/VPN

FCMB MFA enrollment for VPN access confirmed as part of ACS connector replacement (Apr 10).

## Key Contacts
- Erica Akhibi — Switch Application Support (Erica.Akhibi@fcmb.com)
- Switch Application Support (SwitchApplicationSupport@fcmb.com)

## Related
- [[RC91 Multi-Bank Failure Pattern]]
- [[ATS]]
- [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]
- [[Afeez Kazeem]]