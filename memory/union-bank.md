---
type:
  - "entity"
title: Union Bank
created: 2026-04-11
summary: "Nigerian bank on Moniepoint's ATS and Direct Debit routing — DD access granted Apr 16 (Cosmos blocker pending), recurring settlement batch failures (TDSD-6276). RC91 cycle 3 Apr 16 11:04 WAT (ongoing, Union Bank reconfirm requested). Three RC91 cycles in 5 days (Apr 12, 15, 16). TDSD-6576 new ticket (Jira blind). MPGS settlement bank (ICA 34150)."
updated: "2026-04-16T10:15:14Z"
cssclasses:
  - "entity"
---

## Overview

[[Union Bank]] is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing. Also serves as Monnify's MPGS settlement bank (ICA: 34150).

## Direct Debit Integration

**2026-04-16:** Access granted for the [[Union Bank]] [[Direct Debit]] project following Emanuel's feedback on Jira. Team expects to make progress on mandate creation and transaction simulation today. [[Abiodun Famoye]] raised a blocker related to Cosmos, which he plans to engage with after the D2B standup call to resolve. Source: [[Direct to Bank Daily Stand Up 2026-04-16]].

## ATS RC91

### Cycle 3 — Apr 16, 2026 (active)

**2026-04-16 11:04 WAT:** [[Afeez Kazeem]] (Application Monitoring Engineer) filed RC91 failure. Subject: "Union Bank | ATS | RC 91 Failure | 20260416". Message: "Union Bank transactions are failing with RC 91 and high processing time. Kindly assist to investigate." Sent to Union Bank FEP Administration (ITeChannels), Babajide Aloba, Victor Iyama, Toluwalogo Oladipo, Omoye Okobiemen. CC: aptpaytechnicalsupport. Victor Iyama (Union Bank Card Infrastructure) responded at 10:09 UTC requesting reconfirmation from Afeez. TDSD-6576 new Jira ticket created (visible via email only — Jira blind Day 5). P1 also posted in #teamapt-tech-operations at 11:07 BST. Part of 4-bank simultaneous RC91 pattern Apr 16 (FCMB, Stanbic, [[UBA]], Union Bank).

### Cycle 2 — Apr 15, 2026 (active)

**2026-04-15 15:07 WAT:** [[Olamide Ajibulu]] (Application Monitoring Engineer) filed new RC91 failure. Subject: "Union Bank | RC91 | 20260415". Message: "Union Bank transactions are failing with RC 91 and high processing time. Kindly assist to investigate." Recipient: `fepsupport@fidelitybank.ng` — **routing oddity** (addressed to Fidelity's FEP support, not Union Bank's FEP Administration). Template error likely; CC `aptpaytechnicalsupport@teamapt.com` is standard. Jira blind (89+ ticks) — no TDSD ticket verification possible. Part of the [[RC91 Multi-Bank Failure Pattern]].

### Cycle 1 — Apr 12, 2026 (resolved ~16min)

**TDSD-6519** (Apr 12, 2026): [[Qazim Adedigba]] filed RC91 failure at 13:58 WAT. Email to Union Bank FEP Administration (ITeChannels), Babajide Aloba, Toluwalogo Oladipo, Omoye Okobiemen. CC: aptpaytechnicalsupport. Victor Iyama (Union Bank Card Infrastructure) responded at 14:02 WAT requesting status reconfirmation. [[Qazim Adedigba]] confirmed resolution at 14:14 WAT: "Transactions are processing fine now." Duration: ~16 min.

Part of the broader multi-bank RC91 pattern on Apr 12 ([[Stanbic Bank]], [[Access Bank]], [[Wema Bank]], Union Bank — four banks in one day). NIBSS attribution of RC91 to Moniepoint timeout (08:56 WAT Apr 12, Moses Ajani) applies to all NIBSS-routed banks including Union Bank.

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