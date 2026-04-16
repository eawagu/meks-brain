---
type:
  - "entity"
title: Union Bank
created: 2026-04-11
summary: "Nigerian bank on Moniepoint's ATS and Direct Debit routing — DD access granted Apr 16 (Cosmos blocker pending). RC91 cycle 4 filed 17:23 WAT Apr 16, Victor Iyama responded 'check now' 17:52 WAT — likely resolved by NIBSS PTSA restoration. Four RC91 cycles in 5 days (Apr 12, 15, 16×2). MPGS settlement bank (ICA 34150)."
updated: "2026-04-16T17:14:46Z"
cssclasses:
  - "entity"
---

## Overview

[[Union Bank]] is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing. Also serves as Monnify's MPGS settlement bank (ICA: 34150).

## Direct Debit Integration

**2026-04-16:** Access granted for the [[Union Bank]] [[Direct Debit]] project following Emanuel's feedback on Jira. Team expects to make progress on mandate creation and transaction simulation today. [[Abiodun Famoye]] raised a blocker related to Cosmos, which he plans to engage with after the D2B standup call to resolve. Source: [[Direct to Bank Daily Stand Up 2026-04-16]].

## ATS RC91

### Cycle 4 — Apr 16, 2026 (17:23 WAT, likely resolved)

**2026-04-16 17:23 WAT:** [[Olamide Ajibulu]] filed RC91 failure. Subject: "Union Bank| RC91 | 20260416". Message: "Union Bank transactions are failing with RC 91 and high processing time. Kindly assist to investigate." Sent to Union Bank FEP Administration (ITeChannels). CC: aptpaytechnicalsupport. [[Victor Iyama]] (Union Bank Card Infrastructure) responded at 17:52 WAT: "Please check now." Timing aligns with [[NIBSS PTSA — Route Failure Apr 16]] resolution (17:50 WAT) — likely resolved by NIBSS PTSA restoration rather than independent bank fix.

### Cycle 3 — Apr 16, 2026 (11:04 WAT, resolved 12:00 WAT)

**2026-04-16 11:04 WAT:** [[Afeez Kazeem]] (Application Monitoring Engineer) filed RC91 failure. Subject: "Union Bank | ATS | RC 91 Failure | 20260416". Sent to Union Bank FEP Administration (ITeChannels), Babajide Aloba, Victor Iyama, Toluwalogo Oladipo, Omoye Okobiemen. CC: aptpaytechnicalsupport. Victor Iyama responded at 10:09 UTC requesting reconfirmation from Afeez. TDSD-6576 new Jira ticket created (visible via email only — Jira blind Day 5). P1 also posted in #teamapt-tech-operations at 11:07 BST. Part of 4-bank simultaneous RC91 pattern Apr 16 (FCMB, Stanbic, [[UBA]], Union Bank).

### Cycle 2 — Apr 15, 2026 (active)

**2026-04-15 15:07 WAT:** [[Olamide Ajibulu]] filed RC91 failure. Subject: "Union Bank | RC91 | 20260415". **Routing oddity** — addressed to `fepsupport@fidelitybank.ng` (Fidelity's FEP support, not Union Bank's FEP Administration). Template error likely. Jira blind — no TDSD ticket verification possible. Part of the [[RC91 Multi-Bank Failure Pattern]].

### Cycle 1 — Apr 12, 2026 (resolved ~16min)

**TDSD-6519** (Apr 12, 2026): [[Qazim Adedigba]] filed RC91 failure at 13:58 WAT. Victor Iyama requested reconfirmation at 14:02 WAT. Qazim confirmed resolution at 14:14 WAT. Duration: ~16 min. Part of broader multi-bank pattern on Apr 12.

## Settlement

Recurring settlement batch failures caused by weekend/holiday ₦20M limit ([[TDSD-6276]]). NIBSS-flagged ATS timeout outstanding as of Apr 2026. Stanbic settlement account reconciliation thread active Apr 16 (Emeka Joseph / Stanbic reconciliation unit).

## Key Contacts
- Victor Iyama — Card Infrastructure, IT (vniyama@unionbankng.com)
- Babajide Aloba (BAOALOBA@unionbankng.com)
- Toluwalogo Oladipo (tioladipo@unionbankng.com)
- Omoye Okobiemen (oookobiemen@unionbankng.com)
- FEP Administration (ITeChannels@unionbankng.com)

## Related
- [[Stanbic Bank ATS — Persistent RC91 Pattern]]
- [[RC91 Multi-Bank Failure Pattern]]
- [[ATS]]
- [[NIBSS]]
- [[Monnify]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[NIBSS PTSA — Route Failure Apr 16]]