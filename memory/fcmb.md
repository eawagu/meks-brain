---
type:
  - "entity"
title: FCMB
created: 2026-04-11
summary: "First City Monument Bank — ATS and Direct Debit routing. **2026-04-25 02:33 WAT — fresh RC91 P1 active 3h36m+ at briefing-2026-04-25 tick (no Jira ticket, Slack-only filing). Immediate-tier dispatched.** First P1 since [[FCMB — RC91 P1 Apr 17]] day-3 multi-surface event (8 days). Apr 16 cycle recurred after initial resolution. Portal inaccessibility, BIN intermittent failures via NIBSS PTSA, ACS connector replacement in progress."
updated: "2026-04-25T05:26:59Z"
cssclasses:
  - "entity"
---

## Overview

[[FCMB]] (First City Monument Bank) is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] and [[Direct Debit]] routing. Multiple concurrent failure modes tracked in Apr 2026: portal inaccessibility attributed to "low balance," BIN intermittent failures via NIBSS PTSA, and ACS connector replacement in progress.

## ATS RC91

### Cycle — Apr 16, 2026 (recurred after initial resolution)

**2026-04-16 08:19 WAT:** [[Afeez Kazeem]] (Application Monitoring Engineer) filed RC91 failure. Subject: "FCMB | RC 91 | 20260416". Message: "transactions are failing intermittently with RC 91." Sent to FCMB Switch Application Support (Erica Akhibi). Erica requested reconfirmation at 08:35 WAT. Afeez confirmed resolved at 09:02 WAT: "Transactions are now processing successfully." Duration: ~43 min. TDSD-6572 created (visible via email notification, unverifiable via Jira — connector blind Day 5).

**2026-04-16 09:26 WAT:** Afeez reported **recurrence** — "still experiencing intermittent RC91 failures." Sent to Erica Akhibi / FCMB Switch Application Support. Initial resolution was premature; the underlying ATS issue persists. No further resolution signal received as of 10:20 WAT.

### Cycle — Apr 17–19, 2026 (day-3 multi-surface)

Tracked in [[FCMB — RC91 P1 Apr 17]] situation page. Day-3 trajectory with two-surface convergence (ATS + DCIR portal both day-3 continuing post-Apr 19 16:09 WAT tick, after DCIR fast-cycle was prematurely closed at 13:32 WAT and re-failed 14:59 WAT). Bank-side silence uniform across both surfaces.

### Cycle — Apr 25, 2026 (active overnight P1, 3h36m+ at briefing tick)

**2026-04-25 02:33 WAT — fresh P1 filed by [[Qazim Adedigba]] in #teamapt-tech-operations:**
- Product: ATS
- Incident Summary: "P1: FCMB RC 91 Failures Across Processors"
- Identified Cause: "From the bank"
- Resolution Action: "The issue will be escalated to the bank for resolution"
- Incident Duration: "Ongoing" at 02:37 WAT post-time
- Filed during overnight delegation window (23:00–06:00 WAT)

**No FCMB Jira ticket created in window.** TDSD-6727 is Union Bank RC96 (filed 02:12 WAT, resolved 02:52 WAT bank-side). TDSD-6726 is a Habari Problem ticket (post-incident documentation of the Apr 24 18:30–18:55 WAT cycle, not the current Apr 25 Habari context). FCMB Apr 25 cycle is Slack-only — process gap relative to other overnight P1s.

**Active duration at briefing-2026-04-25 06:09 WAT tick: 3h36m+** — exceeds 2h Immediate-tier silence threshold (config-salience trigger #2) by 1h36m. No resolution post in #teamapt-tech-operations between 02:33 and 06:09 WAT. No closure signal in Slack/email overnight. 02:20 WAT hourly report (Qazim, thread 19dc23924c6ed10a) lists 10/17 routes operational — **FCMB not yet in 02:20 failure list**, became P1 in 13min between hourly report and Slack post.

First FCMB RC91 P1 since the Apr 17 day-3 multi-surface event (8 days). Briefing-2026-04-25 D1 captures user disposition (CTO-direct DM / hold for ops / push for formal route-off). Immediate-tier Slack DM dispatched to user D081JT4AD0Q at briefing tick.

## MFA/VPN

FCMB MFA enrollment for VPN access confirmed as part of ACS connector replacement (Apr 10).

## Key Contacts
- Erica Akhibi — Switch Application Support (Erica.Akhibi@fcmb.com)
- Switch Application Support (SwitchApplicationSupport@fcmb.com)
- Bashir Adeyemi, Ogundairo Tobiloba, Gabriel Oluwagbemiga — switch app support escalation chain (per Apr 17–19 P1)

## Related
- [[RC91 Multi-Bank Failure Pattern]]
- [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]]
- [[FCMB — RC91 P1 Apr 17]]
- [[ATS]]
- [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]
- [[Afeez Kazeem]]
- [[Qazim Adedigba]]