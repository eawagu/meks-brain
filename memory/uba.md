---
type:
  - "entity"
title: UBA
aliases:
  - "United Bank for Africa"
created: 2026-04-11
summary: "UBA on Moniepoint's ATS — recurring RC91 cycles. Apr 14 morning: cycle 1 (08:38–08:50 WAT Olamide, 12 min bank-resolved) and cycle 2 (Afeez filed 10:24 WAT, Adewale Lawal/UBA CSS confirmed \"processing fine\" 10:29 WAT, ~5 min). Apr 13 evening multi-hour cycle. Bank-resolved pattern. Direct to Bank VPN setup delayed, settlement SLA still with bank."
updated: "2026-04-14T10:13:27Z"
cssclasses:
  - "entity"
---

## Overview

[[UBA]] (United Bank for Africa) is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing and on the Direct to Bank integration pipeline. Direct to Bank VPN setup delayed as of Apr 2026; settlement agent SLA under bank review.

## ATS RC91 Pattern

UBA appears recurrently in the multi-bank RC91 cycle. Bank-side resolution is typical; Moniepoint–UBA monitoring views do not always match, producing reconfirmation exchanges.

**Apr 13, 2026 (evening):** [[Daniel Armstrong]] + UBA (Rasheed Olanrewaju, Olufemi Ogunyinka) thread 16:25–21:59 WAT. TDSD-6492. Multiple "still failing" → "reconfirm" exchanges before bank-side recovery. Multi-hour evening P1. Resolved 21:51 WAT.

**Apr 14, 2026 (morning — cycle 1):** [[Olamide Ajibulu]] filed new RC 91 P1 via email to UBA Channel Switching Services at 08:43 WAT (subject: "UBA | RC 91 | 20260414"). Olubayo Akintola (UBA CSS) replied at 08:49 WAT confirming "transactions are processing fine." Olamide reconfirmed "Transactions are now processing successfully" at 08:54 WAT. Bank-side resolution. In-Slack P1 log (#teamapt-tech-operations, Olamide 08:44 WAT) recorded full cycle Start 08:38 → End 08:50 WAT, **12-minute duration**. Short cycle consistent with UBA monitoring-lag communication pattern, not a capacity incident.

**Apr 14, 2026 (morning — cycle 2):** [[Afeez Kazeem]] filed a second RC 91 P1 at 10:24 WAT (09:24 UTC) via email to UBA Channel Switching Services (subject: "UBA | RC 91 | 20260414"). Content: "transactions are with RC 91 and high processing time." [[Adewale Lawal]] (UBA Channel Switching Service) replied at 10:29 WAT (09:29 UTC): "Transactions are processing fine now, please confirm and revert." ~5 min resolution from UBA side. Short cycle, consistent with UBA's monitoring-lag communication pattern rather than a capacity incident. Filing from a different engineer (Afeez vs Olamide) within ~30 min of cycle 1 resolution indicates either a rapid reoccurrence or a monitoring-view lag carried from bank-side recovery. Concurrent with fresh Stanbic RC91 cycle same morning — multi-bank morning pattern continues. Follow-on: [[Olamide Ajibulu]] sent a validation-report request to UBA CSS at 11:01 WAT (standard end-of-cycle validation handoff), no action needed.

## Direct to Bank Integration

- **VPN setup:** delayed as of Apr 2026.
- **Settlement agent SLA:** still under bank review per Direct to Bank Daily Standup 2026-04-14 — no movement. CoralPay integration to ATS in parallel test is ongoing.
- **Validation for Apr 2 sent** per Duty Handover #20260414.

## Sources
- [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
- [[briefing-2026-04-14]] B6 (UBA evening reconfirmation cycles Apr 13)
- Email: UBA | RC 91 | 20260414 ([[Olamide Ajibulu]], 08:43 WAT Apr 14) — cycle 1
- Email: UBA | RC 91 | 20260414 ([[Afeez Kazeem]], 10:24 WAT Apr 14) — cycle 2; resolution by [[Adewale Lawal]] 10:29 WAT Apr 14
- Email: Request to Spool UBA Validation Report ([[Olamide Ajibulu]], 11:01 WAT Apr 14)
- Slack #teamapt-tech-operations P1 log 08:44 WAT Apr 14
- Email Duty Handover Note #20260414 ([[Innocent Nwaokorie]], 08:01 WAT Apr 14)
- Google Drive Direct to Bank Daily Standup Notes by Gemini 2026-04-14 (08:22 WAT)
