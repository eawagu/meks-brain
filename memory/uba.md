---
type:
  - "entity"
title: UBA
aliases:
  - "United Bank for Africa"
created: 2026-04-11
summary: "UBA on Moniepoint's ATS — recurring RC91 cycles (Apr 13 multi-hour evening cycle; Apr 14 morning 12-min cycle). Bank-resolved. Direct to Bank VPN setup delayed, settlement SLA still with bank."
updated: "2026-04-14T08:12:34Z"
cssclasses:
  - "entity"
---

## Overview

[[UBA]] (United Bank for Africa) is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing and on the Direct to Bank integration pipeline. Direct to Bank VPN setup delayed as of Apr 2026; settlement agent SLA under bank review.

## ATS RC91 Pattern

UBA appears recurrently in the multi-bank RC91 cycle. Bank-side resolution is typical; Moniepoint–UBA monitoring views do not always match, producing reconfirmation exchanges.

**Apr 13, 2026 (evening):** [[Daniel Armstrong]] + UBA (Rasheed Olanrewaju, Olufemi Ogunyinka) thread 16:25–21:59 WAT. TDSD-6492. Multiple "still failing" → "reconfirm" exchanges before bank-side recovery. Multi-hour evening P1. Resolved 21:51 WAT.

**Apr 14, 2026 (morning):** [[Olamide Ajibulu]] filed new RC 91 P1 via email to UBA Channel Switching Services at 08:43 WAT (subject: "UBA | RC 91 | 20260414"). Olubayo Akintola (UBA CSS) replied at 08:49 WAT confirming "transactions are processing fine." Olamide reconfirmed "Transactions are now processing successfully" at 08:54 WAT. Bank-side resolution. In-Slack P1 log (#teamapt-tech-operations, Olamide 08:44 WAT) recorded full cycle Start 08:38 → End 08:50 WAT, **12-minute duration**. Short cycle consistent with UBA monitoring-lag communication pattern, not a capacity incident.

## Direct to Bank Integration

- **VPN setup:** delayed as of Apr 2026.
- **Settlement agent SLA:** still under bank review per Direct to Bank Daily Standup 2026-04-14 — no movement. CoralPay integration to ATS in parallel test is ongoing.
- **Validation for Apr 2 sent** per Duty Handover #20260414.

## Sources
- [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
- [[briefing-2026-04-14]] B6 (UBA evening reconfirmation cycles Apr 13)
- Email: UBA | RC 91 | 20260414 ([[Olamide Ajibulu]], 08:43 WAT Apr 14)
- Slack #teamapt-tech-operations P1 log 08:44 WAT Apr 14
- Email Duty Handover Note #20260414 ([[Innocent Nwaokorie]], 08:01 WAT Apr 14)
- Google Drive Direct to Bank Daily Standup Notes by Gemini 2026-04-14 (08:22 WAT)
