---
type:
  - "entity"
title: UBA
aliases:
  - "United Bank for Africa"
created: 2026-04-11
summary: "United Bank for Africa on Moniepoint's ATS routing and Direct to Bank integration pipeline. D2B Apr 22: SLA pending bank legal sign-off. D2B Apr 28: SLA signed 13 days ago; legal team follow-up underway; server deployment pushed to next week (internal upgrades first)."
updated: "2026-04-29T11:50:39Z"
cssclasses:
  - "entity"
---

## Overview

[[UBA]] (United Bank for Africa) is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing and on the Direct to Bank integration pipeline. Direct to Bank VPN setup delayed as of Apr 2026; settlement agent SLA signed; server deployment pending internal upgrades.

## ATS RC91 Pattern

UBA appears recurrently in the multi-bank RC91 cycle. Bank-side resolution is typical; Moniepoint–UBA monitoring views do not always match, producing reconfirmation exchanges.

**Apr 16, 2026 (new cycle):** [[Afeez Kazeem]] filed RC 91 at 10:35 WAT (09:35 UTC) via email to UBA Channel Switching Services. Subject: "UBA | RC 91 | 20260416". Part of 4-bank simultaneous RC91 pattern Apr 16 (FCMB, Stanbic, Union Bank, UBA).

**Apr 14, 2026 (4 cycles in 4.5h + sustained degradation):** [[Olamide Ajibulu]] reported UBA experiencing intermittent failures over the past 36 hours. Four distinct cycles. Concurrent with Stanbic, Polaris, NIBSS DD active.

**Apr 13, 2026 (evening):** [[Daniel Armstrong]] + UBA (Rasheed Olanrewaju, Olufemi Ogunyinka) thread 16:25–21:59 WAT. TDSD-6492. Multi-hour evening P1.

## DCIR 2FA Deployment

**Apr 16, 2026:** Christian Uchegbu (UBA) confirmed production deployment approved for DCIR 2FA. Weekend implementation planned (Apr 18–19). Part of the broader [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] situation.

## Direct to Bank Integration

- **VPN setup:** delayed as of Apr 2026.
- **Settlement agent SLA:** still under bank review per Direct to Bank Daily Standup 2026-04-14 — no movement. CoralPay integration to ATS in parallel test is ongoing.
- **D2B Apr 22:** [[Ifeoluwa Oguntona]] confirmed UBA fund settlements integration began last quarter; **SLA pending review and sign-off by bank's legal team**. Legal clause clarified yesterday; updated document shared with UBA for final review. Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].
- **D2B Apr 28:** SLA was **signed 13 days ago** (i.e., ~Apr 15); legal team **follow-up underway**. **UBA server deployment** decided to commence **next week**, with internal service upgrades prioritized for the current week. Source: [[Direct to Bank Daily standup - 2026-04-28 08:27 WAT]].
- **Validation for Apr 2 sent** per Duty Handover #20260414.

## Sources
- [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
- Email: UBA | RC 91 | 20260416 ([[Afeez Kazeem]], 10:35 WAT Apr 16) — new cycle
- Email: UBA | RC 91 | 20260414 ([[Olamide Ajibulu]], 08:43 WAT Apr 14) — cycle 1
- Email: UBA | RC 91 | 20260414 ([[Afeez Kazeem]], 10:24 WAT Apr 14) — cycle 2
- Slack #teamapt-tech-operations P1 logs Apr 14 (cycles 3–4)
- Email: RE: FW: PENTEST_ 2FA on DCIR portal (Christian Uchegbu, 08:58 UTC Apr 16) — production deployment approved
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[Direct to Bank Daily standup - 2026-04-28 08:27 WAT]]
