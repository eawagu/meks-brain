---
title: Parallex Bank
type:
  - "entity"
cssclasses:
  - "entity"
aliases:
  - "Parallax Bank"
  - "Parallex"
tags:
  - "nigerian-bank"
  - "ats-issuer"
created: "2026-05-08T13:15:32Z"
updated: "2026-05-08T13:15:32Z"
summary: "Nigerian bank — first observed RC91 cycle May 8 2026 09:11 WAT (intermittent), bank-resolved 11:18 WAT (DCIR interchange restored); fast-cycle 2h7m. New issuer not previously tracked."
---

## Overview

Parallex Bank is a Nigerian bank surfaced as an ATS issuer on 2026-05-08 — first observed RC91 cycle on the [[ATS]] route. No prior brain entity; this page captures initial observations.

Note: spelling appears as both "Parallex" (email subject, Slack ops post by Olamide Ajibulu) and "Parallax" (Slack P1 incident summary, also by Olamide). Treating "Parallex" as canonical per the bank's own contact email domain `@parallexbank.com`.

## ATS Issuer Profile

- **Channel switching contact:** channelsswitching@parallexbank.com
- **Named contacts (cc'd 2026-05-08 cycle):**
  - [[Segun Ogunsola]] — Team Member, Channels Switching, Parallex Bank Limited (Plot 1261, Adeola Hopewell Street, Victoria Island, Lagos) — segun.ogunsola@parallexbank.com — primary cycle responder
  - Chiatoka Okeke — chiatoka.okeke@parallexbank.com
  - Olufemi Ojo — olufemi.ojo@parallexbank.com
  - Emmanuel Onyeke — emmanuel.onyeke@parallexbank.com

## Activity

### 2026-05-08 — First observed RC91 cycle (intermittent)

- **09:11 WAT** — [[Olamide Ajibulu]] email "Parallex | Intermittent RC91 | 20260508" to channelsswitching@parallexbank.com (cc aptpaytechnicalsupport): "transactions are failing with RC91. Kindly assist with the review." Thread `19e06db2f3a07299`.
- **09:43 WAT** — Olamide follow-up: "Please share an update as the failure still persists." cc chain expanded to include named Parallex contacts (Chiatoka, Olufemi, Emmanuel, Segun).
- **09:51 WAT** — Segun Ogunsola (Parallex Channels Switching) acknowledged: "We are currently checking and shall revert shortly."
- **10:10 WAT** — Olamide P1 structured Slack post #teamapt-tech-operations: "Parallax Bank RC 91 Failures across processor. Identified Cause: From the bank. Resolution Action: The issue was escalated to the bank for investigation and resolution. Start Time 10:10 AM, Ongoing." (Posted 10:23 WAT.)
- **10:30 WAT** — TDSD-6889 "PARALLEX BANK SETTLEMENT 20260508" created at 07:39:53 WAT (different surface; settlement-track filing, distinct from route-track email).
- **10:52 WAT** — Olamide chase: "Kindly share update."
- **11:18 WAT** — Segun Ogunsola: **"We can confirm that the DCIR interchange is up now and transactions are processing successfully. Kindly reconfirm and update."**
- **Outcome:** Bank-resolved fast-cycle, ~2h07m wall-clock from first email to bank confirmation. DCIR interchange recovery on bank side. No TeamApt-side action beyond escalation and chase.

## Pattern Notes

- **First-observation status:** No prior cycles, no situation page yet. Single fast-cycle resolution does not warrant a tracked situation. If a second cycle recurs within 7 days, escalate to situation page (e.g., "Parallex Bank — Recurring RC91 Pattern").
- **Failure mode:** "Intermittent RC91" + "DCIR interchange" — points to bank-side card switching infrastructure (DCIR = direct card issuer routing), not generic RC91 from authorization layer. Compare with [[FCMB ATS — Route Turned Off May 5]] (where RC06 specifically was discriminating signal) — Parallex's "DCIR interchange" recovery matches the same routing-infrastructure failure class.
- **Multi-bank cluster context:** This cycle is the first of 3 P1 RC91 cycles dispatched on 2026-05-08 within a ~4h window: Parallex (10:10 WAT start, 11:18 WAT resolved) + Union Bank (10:40 WAT start, 10:51 WAT resolved 17m fast-cycle 6th cycle since May 5) + UBA (12:24 WAT start, 12:39 WAT resolved 15m fast-cycle distinct from yesterday's P2 migration). All 3 fast-cycle bank-resolved without Tier 1 escalation needed. Cluster timing suggests common upstream — possibly NIBSS or interchange — but no NIBSS DOWNTIME ticket filed in the window. [[NIBSS]] DOWNTIME pattern (TDSD-6882 May 7) is the recent precedent for cluster-causing upstream failures.

## Related

- [[ATS]]
- [[Olamide Ajibulu]]
- [[NIBSS]]
- [[Union Bank]]
- [[UBA Bank]]
- [[FCMB ATS — Route Turned Off May 5]]
