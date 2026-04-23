---
type:
  - "entity"
title: Union Bank
created: 2026-04-11
summary: "Nigerian bank on Moniepoint's ATS and Direct Debit routing — DD access granted Apr 16; Apr 23 DD progress continuing (mandate creation + transaction simulation) with Cosmos blocker still active. ATS RC91 7 cycles in 9 days (Apr 12–20)."
updated: "2026-04-23T14:43:36Z"
cssclasses:
  - "entity"
---

## Overview

[[Union Bank]] is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing. Also serves as Monnify's MPGS settlement bank (ICA: 34150).

## Direct Debit Integration

**2026-04-16:** Access granted for the [[Union Bank]] [[Direct Debit]] project following [[Emanuel]]'s feedback on [[Jira]]. Team expects to make progress on mandate creation and transaction simulation today. [[Abiodun Famoye]] raised a blocker related to [[Cosmos]], which he plans to engage with after the D2B standup call to resolve. Source: [[Direct to Bank Daily Stand Up 2026-04-16]].

**2026-04-23:** DD progress still advancing on mandate creation and transaction simulation; [[Cosmos]] blocker remains active — [[Abiodun Famoye]] to engage after this call. No other Union Bank DD update at the standup. Source: [[note_2026-04-23T13-53-37-857Z]].

## ATS RC91 — Accumulating Pattern (7 cycles in 9 days)

### Cycle 7 — Apr 20, 2026 afternoon (14:27–14:33 WAT, 6m, bank-auto-recovered)

**2026-04-20 14:36 WAT:** [[Qazim Adedigba]] filed post-recovery P1 alert in #teamapt-tech-operations. Start 14:27 WAT, end 14:33 WAT, duration 6 minutes. Resolution: "Transactions auto recovered." Identified cause: "From the bank." No Jira ticket created — brief bank-auto-recovered cycle pattern (consistent with Stanbic fast-cycle signature, not Union's prior slow-response signature). **Same-day dual-cycle** — second Union Bank cycle within 7 hours of Cycle 6 closure (07:56 WAT). This is new pattern behavior for Union Bank — prior cycles were 24h+ apart. Factors: source=slack, channel=teamapt-tech-operations, post_recovery_filing, bank_auto_recovery_brief_cycle, same_day_dual_cycle, pattern_significance.

### Cycle 6 — Apr 20, 2026 overnight (01:17–07:56 WAT, 6h39m bank-side, longest on record)

**2026-04-20 overnight:** [[Olamide Ajibulu]] filed RC91 cycle at 01:17 WAT via email to itechannels@unionbankng.com. Bank first response at 07:33 WAT from Iyama Victor (reconfirm-status prompt) — 6h16m silent before engagement. Olamide confirmed resolution at 07:56 WAT. TDSD-6632 filed 07:21 WAT, Completed 07:57 WAT. End-to-end **6h39m — 3x prior longest (Apr 19 cycle 2h10m)**, crossing the config-salience Immediate-tier trigger #2 envelope (>2h anomalous) by 4h+. Bank-silent-6h-before-response pattern contrasts with [[Stanbic Bank ATS — Persistent RC91 Pattern]] (6m engagement latency). Bank-owned resolution path held despite duration; CTO-direct engagement was NOT required. Dedicated situation page: [[Union Bank — RC91 P1 Apr 20]] (retired 10:09 WAT).

### Cycle 5 — Apr 19, 2026 (02:40–04:50 WAT, 2h10m, bank-resolved)

**2026-04-19 overnight:** First-time participant on the active RC91 multi-bank wave. Cycle filed during overnight-delegation window (23:00–06:00 WAT Immediate-dispatch suppression). Start 02:40 WAT, resolved ~04:50 WAT, duration 2h10m. Part of the 5-bank wave Apr 19 (Stanbic cycle 31 7h3m, Access cycle 8 7h50m, NIBSS PTSA 15m, Fidelity 14m, Union 2h10m). Union Bank's 2h10m is intermediate between the Stanbic/Access 7h+ regime-change cycles and the 14m/15m fast resolutions on Fidelity/NIBSS PTSA — suggests Union's routing path sits mid-spectrum on the common-mode driver. Dedicated situation page: [[Union Bank — RC91 P1 Apr 19]].

### Cycle 4 — Apr 16, 2026 (17:23 WAT, likely resolved)

**2026-04-16 17:23 WAT:** [[Olamide Ajibulu]] filed RC91 failure. Subject: "Union Bank| RC91 | 20260416". Message: "Union Bank transactions are failing with RC 91 and high processing time. Kindly assist to investigate." Sent to Union Bank FEP Administration (ITeChannels). CC: aptpaytechnicalsupport. [[Victor Iyama]] (Union Bank Card Infrastructure) responded at 17:52 WAT: "Please check now." Timing aligns with [[NIBSS PTSA — Route Failure Apr 16]] resolution (17:50 WAT) — likely resolved by NIBSS PTSA restoration rather than independent bank fix.

### Cycle 3 — Apr 16, 2026 (11:04 WAT, resolved 12:00 WAT)

**2026-04-16 11:04 WAT:** [[Afeez Kazeem]] (Application Monitoring Engineer) filed RC91 failure. Subject: "Union Bank | ATS | RC 91 Failure | 20260416". Sent to Union Bank FEP Administration (ITeChannels), Babajide Aloba, Victor Iyama, Toluwalogo Oladipo, Omoye Okobiemen. CC: aptpaytechnicalsupport. Victor Iyama responded at 10:09 UTC requesting reconfirmation from Afeez. TDSD-6576 new Jira ticket created (visible via email only — Jira blind Day 5). P1 also posted in #teamapt-tech-operations at 11:07 BST. Part of 4-bank simultaneous RC91 pattern Apr 16 (FCMB, Stanbic, [[UBA]], Union Bank).

### Cycle 2 — Apr 15, 2026 (active)

**2026-04-15 15:07 WAT:** [[Olamide Ajibulu]] filed RC91 failure. Subject: "Union Bank | RC91 | 20260415". **Routing oddity** — addressed to `fepsupport@fidelitybank.ng` (Fidelity's FEP support, not Union Bank's FEP Administration). Template error likely. Jira blind — no TDSD ticket verification possible. Part of the [[RC91 Multi-Bank Failure Pattern]].

### Cycle 1 — Apr 12, 2026 (resolved ~16min)

**TDSD-6519** (Apr 12, 2026): [[Qazim Adedigba]] filed RC91 failure at 13:58 WAT. Victor Iyama requested reconfirmation at 14:02 WAT. Qazim confirmed resolution at 14:14 WAT. Duration: ~16 min. Part of broader multi-bank pattern on Apr 12.

### Pattern-significance summary

Trajectory 7 cycles / 9 days:
- Apr 12 — isolated (16m)
- Apr 15 — isolated (active, routing error)
- Apr 16 — two cycles in one day (pattern established)
- Apr 19 — overnight wave participant (2h10m)
- Apr 20 — dual-cycle day: 6h39m morning (longest on record) + 6m afternoon (brief auto-recover)

The 9-day trajectory shows: escalating frequency, a new longest-duration ceiling (6h39m), and now same-day dual-cycle (new behavior). Bank-response-latency signature is mixed — Cycle 6 had 6h+ silence before first response, Cycle 7 was bank-auto-recovered without any email thread. Contrast with [[Stanbic Bank ATS — Persistent RC91 Pattern]] where bank auto-responder fires in 6m consistently. Pattern-significance retained for downstream synthesis.

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
- [[Access Bank — Multi-Track Failures]]
- [[RC91 Multi-Bank Failure Pattern]]
- [[Union Bank — RC91 P1 Apr 19]]
- [[Union Bank — RC91 P1 Apr 20]]
- [[ATS]]
- [[NIBSS]]
- [[Monnify]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[NIBSS PTSA — Route Failure Apr 16]]