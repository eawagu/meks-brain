---
type:
  - "entity"
title: UBA
aliases:
  - "United Bank for Africa"
created: 2026-04-11
summary: "UBA on Moniepoint's ATS — recurring RC91 cycles. Apr 14 morning: cycle 1 (08:38–08:50 WAT Olamide, 12 min bank-resolved) and cycle 2 (Afeez filed 10:24 WAT, Adewale Lawal/UBA CSS confirmed \"processing fine\" 10:29 WAT, ~5 min). Apr 13 evening multi-hour cycle. Bank-resolved pattern. Direct to Bank VPN setup delayed, settlement SLA still with bank."
updated: "2026-04-14T11:16:17Z"
cssclasses:
  - "entity"
---

## Overview

[[UBA]] (United Bank for Africa) is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing and on the Direct to Bank integration pipeline. Direct to Bank VPN setup delayed as of Apr 2026; settlement agent SLA under bank review.

## ATS RC91 Pattern

UBA appears recurrently in the multi-bank RC91 cycle. Bank-side resolution is typical; Moniepoint–UBA monitoring views do not always match, producing reconfirmation exchanges. As of Apr 14 morning, the pattern has elevated from isolated cycles to sustained intermittent degradation: [[Olamide Ajibulu]] stated at 11:17 BST Apr 14 that UBA has been "experiencing intermittent failures on the UBA card service over the past 36 hours, resulting in a below-par success rate" (attached success-rate data). This reframes the two short morning cycles (cycles 1 and 2) as surface indicators of a longer-running degradation rather than discrete events.

**Apr 13, 2026 (evening):** [[Daniel Armstrong]] + UBA (Rasheed Olanrewaju, Olufemi Ogunyinka) thread 16:25–21:59 WAT. TDSD-6492. Multiple "still failing" → "reconfirm" exchanges before bank-side recovery. Multi-hour evening P1. Resolved 21:51 WAT.

**Apr 14, 2026 (morning — cycle 1):** [[Olamide Ajibulu]] filed new RC 91 P1 via email to UBA Channel Switching Services at 08:43 WAT (subject: "UBA | RC 91 | 20260414"). Olubayo Akintola (UBA CSS) replied at 08:49 WAT confirming "transactions are processing fine." Olamide reconfirmed "Transactions are now processing successfully" at 08:54 WAT. Bank-side resolution. In-Slack P1 log (#teamapt-tech-operations, Olamide 08:44 WAT) recorded full cycle Start 08:38 → End 08:50 WAT, **12-minute duration**.

**Apr 14, 2026 (morning — cycle 2):** [[Afeez Kazeem]] filed a second RC 91 P1 at 10:24 WAT (09:24 UTC) via email to UBA Channel Switching Services. [[Adewale Lawal]] (UBA Channel Switching Service) replied at 10:29 WAT (09:29 UTC): "Transactions are processing fine now, please confirm and revert." ~5 min resolution from UBA side.

**Apr 14, 2026 (morning — cycle 3, Slack P1 Start 09:16 BST / 10:16 WAT):** [[Olamide Ajibulu]] posted P1 in #teamapt-tech-operations at 09:22 BST: "UBA RC 91 failures across processors. Cause: From the bank. Ongoing. Escalated to bank." As of 12:09 WAT the Slack log entry was still marked Ongoing — the top-level P1 card has not been updated with a resolution timestamp. At 11:02 BST (10:02 UTC) [[Olamide Ajibulu]] emailed UBA CSS "Please provide an update on this as transactions are still failing intermittently." Cycle 3 is not resolved; it has transitioned to the intermittent regime captured in Olamide's 11:17 BST statement.

**Apr 14, 2026 (morning — cycle 4, Slack P1 Start 11:00 BST / 12:00 WAT):** [[Olamide Ajibulu]] posted a fresh P1 in #teamapt-tech-operations at 11:19 BST: "UBA intermittent RC 91 failures across processors. Ongoing." Ran concurrently with cycle 3's unresolved state. The explicit "intermittent" label in the incident title is new — prior cycles were declared as outright failures. This aligns with the 36-hour stated pattern.

**Pattern elevation.** Four distinct cycles inside 4.5 hours (08:38, 10:24, 10:16 Slack P1, 12:00 Slack P1), plus the bank's own admission of 36h of intermittent degradation, promote UBA from "recurrent short cycles" to "sustained degradation with no named root cause." Concurrent with fresh [[Stanbic Bank]] RC91 cycle same morning (09:46–09:58 WAT, 12-min), morning Polaris RC91 P1 Slack-filed 10:50 BST, and active [[NIBSS DD — Pending Mandate P1 Active]] — multi-bank morning pattern continues and the NIBSS-side root cause explanation (processing latency, per NIBSS attribution) continues to fit better than per-bank explanations.

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
- Email: Re: UBA | RC 91 | 20260414 ([[Olamide Ajibulu]], 11:02 BST Apr 14) — cycle 3 "still failing intermittently"
- Email: Re: UBA | RC 91 | 20260414 ([[Olamide Ajibulu]], 11:17 BST Apr 14) — 36h intermittent pattern statement with attached success rate
- Slack #teamapt-tech-operations P1 log 08:44 BST Apr 14 (cycle 1), 09:22 BST Apr 14 (cycle 3), 11:19 BST Apr 14 (cycle 4)
- Email Duty Handover Note #20260414 ([[Innocent Nwaokorie]], 08:01 WAT Apr 14)
- Google Drive Direct to Bank Daily Standup Notes by Gemini 2026-04-14 (08:22 WAT)
