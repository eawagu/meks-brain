---
type:
  - "entity"
title: UBA
aliases:
  - "United Bank for Africa"
created: 2026-04-11
summary: "UBA on Moniepoint's ATS — recurring RC91 cycles. Apr 16: new RC91 cycle filed 10:35 WAT by Afeez Kazeem (part of 4-bank simultaneous pattern). Apr 14: 4 cycles in 4.5h, 36h intermittent degradation per Olamide Ajibulu. Bank-resolved pattern. Direct to Bank VPN setup delayed, settlement SLA still with bank. DCIR 2FA production deployment approved for weekend Apr 18–19."
updated: "2026-04-16T10:15:31Z"
cssclasses:
  - "entity"
---

## Overview

[[UBA]] (United Bank for Africa) is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing and on the Direct to Bank integration pipeline. Direct to Bank VPN setup delayed as of Apr 2026; settlement agent SLA under bank review.

## ATS RC91 Pattern

UBA appears recurrently in the multi-bank RC91 cycle. Bank-side resolution is typical; Moniepoint–UBA monitoring views do not always match, producing reconfirmation exchanges.

**Apr 16, 2026 (new cycle):** [[Afeez Kazeem]] filed RC 91 at 10:35 WAT (09:35 UTC) via email to UBA Channel Switching Services. Subject: "UBA | RC 91 | 20260416". Message: "transactions are failing with RC 91." CC: aptpaytechnicalsupport. No resolution signal yet. Part of 4-bank simultaneous RC91 pattern Apr 16 (FCMB, Stanbic, Union Bank, UBA).

**Apr 14, 2026 (4 cycles in 4.5h + sustained degradation):** [[Olamide Ajibulu]] stated at 11:17 BST Apr 14 that UBA has been "experiencing intermittent failures on the UBA card service over the past 36 hours, resulting in a below-par success rate" (attached success-rate data). Four distinct cycles: cycle 1 (08:38–08:50 WAT, 12 min), cycle 2 ([[Afeez Kazeem]] filed 10:24 WAT, [[Adewale Lawal]]/UBA CSS confirmed "processing fine" 10:29 WAT, ~5 min), cycle 3 (Slack P1 09:22 BST, unresolved → intermittent regime), cycle 4 (Slack P1 11:19 BST, "intermittent" label new). Concurrent with Stanbic, Polaris, NIBSS DD active — multi-bank pattern.

**Apr 13, 2026 (evening):** [[Daniel Armstrong]] + UBA (Rasheed Olanrewaju, Olufemi Ogunyinka) thread 16:25–21:59 WAT. TDSD-6492. Multiple "still failing" → "reconfirm" exchanges before bank-side recovery. Multi-hour evening P1. Resolved 21:51 WAT.

## DCIR 2FA Deployment

**Apr 16, 2026:** Christian Uchegbu (UBA) confirmed production deployment approved for DCIR 2FA. Weekend implementation planned (Apr 18–19). This is part of the broader [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] situation.

## Direct to Bank Integration

- **VPN setup:** delayed as of Apr 2026.
- **Settlement agent SLA:** still under bank review per Direct to Bank Daily Standup 2026-04-14 — no movement. CoralPay integration to ATS in parallel test is ongoing.
- **Validation for Apr 2 sent** per Duty Handover #20260414.

## Sources
- [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
- Email: UBA | RC 91 | 20260416 ([[Afeez Kazeem]], 10:35 WAT Apr 16) — new cycle
- Email: UBA | RC 91 | 20260414 ([[Olamide Ajibulu]], 08:43 WAT Apr 14) — cycle 1
- Email: UBA | RC 91 | 20260414 ([[Afeez Kazeem]], 10:24 WAT Apr 14) — cycle 2
- Slack #teamapt-tech-operations P1 logs Apr 14 (cycles 3–4)
- Email: RE: FW: PENTEST_ 2FA on DCIR portal (Christian Uchegbu, 08:58 UTC Apr 16) — production deployment approved