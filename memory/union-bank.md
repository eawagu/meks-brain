---
type:
  - "entity"
title: Union Bank
created: 2026-04-11
summary: "Nigerian bank on Moniepoint's ATS and Direct Debit routing — 7 RC91 cycles in 9 days (Apr 12–20). On 2026-04-27: DD blocked by name-inquiry API returning 'unauthorized' against the 10-digit account; NSS admin user-details shared and being configured; Polaris fund settlement minimal progress; account transfer awaiting bank feedback on inbound-only test; SLA under bank review."
updated: "2026-04-27T17:49:43Z"
cssclasses:
  - "entity"
---

## Overview

[[Union Bank]] is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing. Also serves as Monnify's MPGS settlement bank (ICA: 34150).

## Direct Debit Integration

**2026-04-16:** Access granted for the [[Union Bank]] [[Direct Debit]] project following [[Emanuel]]'s feedback on [[Jira]]. Team expects to make progress on mandate creation and transaction simulation today. [[Abiodun Famoye]] raised a blocker related to [[Cosmos]], which he plans to engage with after the D2B standup call to resolve. Source: [[Direct to Bank Daily Stand Up 2026-04-16]].

**2026-04-21 08:10 D2B:** Union Bank expected to provide the API; no current update at standup. Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

**2026-04-22 08:21 D2B:** Server access for Union Bank Direct Debit testing has been **resolved**. Team now waiting for the bank to provide a **10-digit account number** for testing — the previously provided 9-digit number caused the API to fail. [[Oluwakemi Oni]] following up with the bank on API fix status. Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

**2026-04-23:** DD progress still advancing on mandate creation and transaction simulation; [[Cosmos]] blocker remains active — [[Abiodun Famoye]] to engage after this call. No other Union Bank DD update at the standup. Source: [[note_2026-04-23T13-53-37-857Z]].

## 2026-04-27 — Project Delivery & Optimization Realignment

- **Union Bank Direct Debit** — still in mandation/test-simulation phase. Bank delivered the requested 10-digit account, but team is **unable to validate** because bank's name-inquiry API is returning an **unauthorized error** (token not authenticating). The error is not a 'failing' API — it's an explicit "unauthorized" response. Team investigating internally. Owner: [[Oluwakemi Oni]].
- **Union Bank NSS** — bank shared the admin user details; team is configuring the portal.
- **Union Bank account transfer** — bank has indicated they only want to proceed with **inbound transfer** testing currently. Team has shared everything needed; awaiting feedback. Bank has shown interest. SLA under bank review.
- Source: [[Project delivery and optimization realignment - 2026-04-27 - Transcript]].

## ATS RC91 — Accumulating Pattern (7 cycles in 9 days)

### Cycle 7 — Apr 20, 2026 afternoon (14:27–14:33 WAT, 6m, bank-auto-recovered)

**2026-04-20 14:36 WAT:** [[Qazim Adedigba]] filed post-recovery P1 alert in #teamapt-tech-operations. Start 14:27 WAT, end 14:33 WAT, duration 6 minutes. Resolution: "Transactions auto recovered." Identified cause: "From the bank." No Jira ticket created — brief bank-auto-recovered cycle pattern (consistent with Stanbic fast-cycle signature, not Union's prior slow-response signature). **Same-day dual-cycle** — second Union Bank cycle within 7 hours of Cycle 6 closure (07:56 WAT). This is new pattern behavior for Union Bank — prior cycles were 24h+ apart.

### Cycle 6 — Apr 20, 2026 overnight (01:17–07:56 WAT, 6h39m bank-side, longest on record)

**2026-04-20 overnight:** [[Olamide Ajibulu]] filed RC91 cycle at 01:17 WAT via email to itechannels@unionbankng.com. Bank first response at 07:33 WAT from Iyama Victor (reconfirm-status prompt) — 6h16m silent before engagement. Olamide confirmed resolution at 07:56 WAT. TDSD-6632 filed 07:21 WAT, Completed 07:57 WAT. End-to-end **6h39m — 3x prior longest (Apr 19 cycle 2h10m)**, crossing the config-salience Immediate-tier trigger #2 envelope (>2h anomalous) by 4h+. Bank-silent-6h-before-response pattern contrasts with [[Stanbic Bank ATS — Persistent RC91 Pattern]] (6m engagement latency). Bank-owned resolution path held despite duration; CTO-direct engagement was NOT required. Dedicated situation page: [[Union Bank — RC91 P1 Apr 20]] (retired 10:09 WAT).

### Cycle 5 — Apr 19, 2026 (02:40–04:50 WAT, 2h10m, bank-resolved)

**2026-04-19 overnight:** First-time participant on the active RC91 multi-bank wave. Cycle filed during overnight-delegation window (23:00–06:00 WAT Immediate-dispatch suppression). Start 02:40 WAT, resolved ~04:50 WAT, duration 2h10m. Part of the 5-bank wave Apr 19 (Stanbic cycle 31 7h3m, Access cycle 8 7h50m, NIBSS PTSA 15m, Fidelity 14m, Union 2h10m). Dedicated situation page: [[Union Bank — RC91 P1 Apr 19]].

### Cycles 1–4 — see prior page revisions for full Apr 12, 15, 16 detail.

### Pattern-significance summary

Trajectory 7 cycles / 9 days: Apr 12 isolated (16m); Apr 15 isolated (active, routing error); Apr 16 two-in-day (pattern established); Apr 19 overnight wave participant (2h10m); Apr 20 dual-cycle day: 6h39m morning (longest on record) + 6m afternoon (brief auto-recover). Bank-response-latency signature is mixed.

## Settlement

Recurring settlement batch failures caused by weekend/holiday ₦20M limit ([[TDSD-6276]]). NIBSS-flagged ATS timeout outstanding as of Apr 2026.

## Key Contacts
- Victor Iyama — Card Infrastructure, IT (vniyama@unionbankng.com)
- Babajide Aloba (BAOALOBA@unionbankng.com)
- Toluwalogo Oladipo (tioladipo@unionbankng.com)
- Omoye Okobiemen (oookobiemen@unionbankng.com)
- FEP Administration (ITeChannels@unionbankng.com)

## Related
- [[Stanbic Bank ATS — Persistent RC91 Pattern]]
- [[Access Bank — Multi-Track Failures]]
- [[RC91 Multi-Bank Failure Pattern]]
- [[Union Bank — RC91 P1 Apr 19]]
- [[Union Bank — RC91 P1 Apr 20]]
- [[ATS]]
- [[NIBSS]]
- [[Monnify]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[NIBSS PTSA — Route Failure Apr 16]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]