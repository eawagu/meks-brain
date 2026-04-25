---
type:
  - "entity"
title: FCMB
created: 2026-04-11
summary: "First City Monument Bank — ATS and Direct Debit routing. Fresh RC91 P1 active 3h36m+ at briefing-2026-04-25. D2B Apr 21–22: server access escalated to DH; FCMB plans to drop BVN from API responses entirely."
updated: "2026-04-25T11:47:32Z"
cssclasses:
  - "entity"
---

## Overview

[[FCMB]] (First City Monument Bank) is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] and [[Direct Debit]] routing. Multiple concurrent failure modes tracked in Apr 2026.

## ATS RC91

### Cycle — Apr 16, 2026 (recurred after initial resolution)

**2026-04-16 08:19 WAT:** [[Afeez Kazeem]] filed RC91 failure to FCMB Switch Application Support (Erica Akhibi). Initial resolution claimed at 09:02 WAT (~43min); recurrence reported 09:26 WAT — underlying ATS issue persisted. TDSD-6572 created (visible via email).

### Cycle — Apr 17–19, 2026 (day-3 multi-surface)

Tracked in [[FCMB — RC91 P1 Apr 17]] situation page. Day-3 trajectory with two-surface convergence (ATS + DCIR portal both day-3 continuing post-Apr 19 16:09 WAT tick).

### Cycle — Apr 25, 2026 (active overnight P1, 3h36m+ at briefing tick)

**2026-04-25 02:33 WAT — fresh P1 filed by [[Qazim Adedigba]] in #teamapt-tech-operations:** Product ATS, "P1: FCMB RC 91 Failures Across Processors", identified cause "From the bank", no FCMB Jira ticket created. Active duration at briefing-2026-04-25 06:09 WAT tick: 3h36m+ — exceeds 2h Immediate-tier silence threshold. First FCMB RC91 P1 since the Apr 17 day-3 multi-surface event (8 days). Briefing-2026-04-25 D1 captures user disposition.

## Direct to Bank — D2B Apr 21 standup

[[Abraham Isinguzoro]] reported the FCMB server access request has been escalated to the DH (department head). No update yet. Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## Direct to Bank — D2B Apr 22 standup

- **Permissions issue still not corrected** — escalated to DH; team awaiting resolution. Owner reporting: [[Abraham Isinguzoro]].
- **BVN dropped from API responses** — [[Glory Alioha]] reported FCMB plans to **totally drop the [[BVN]]** from the API responses. Team confirmed BVN is not used in current implementation. [[Abiodun Famoye]] explained BVN is a "good to have" feature that cannot be enforced if the bank chooses not to provide it.
- **Aligned decision** — BVN requirement removed from integration; exclusion confirmed not to impact functionality.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## MFA/VPN

FCMB MFA enrollment for VPN access confirmed as part of ACS connector replacement (Apr 10).

## Key Contacts
- Erica Akhibi — Switch Application Support (Erica.Akhibi@fcmb.com)
- Switch Application Support (SwitchApplicationSupport@fcmb.com)
- Bashir Adeyemi, Ogundairo Tobiloba, Gabriel Oluwagbemiga — switch app support escalation chain

## Related
- [[RC91 Multi-Bank Failure Pattern]]
- [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]]
- [[FCMB — RC91 P1 Apr 17]]
- [[ATS]]
- [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]
- [[Afeez Kazeem]]
- [[Qazim Adedigba]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
