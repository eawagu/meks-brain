---
role: cto-teamapt
type:
  - "situation"
title: NIBSS PTSA — Route Failure Apr 16
status: resolving
created: "2026-04-16T13:12:50Z"
summary: "NIBSS PTSA route failure filed 13:12 WAT Apr 16. RESOLVED after 5+ hours — Abayomi Fagbayi confirmed full service restored 17:50 WAT, Olamide confirmed transactions processing 18:09 WAT. TDSD-6578. Systemic hypothesis partially disproven: Stanbic RC91 cycle 25 filed AFTER PTSA restoration, confirming independent CBA instability cause."
updated: "2026-04-16T17:13:52Z"
cssclasses:
  - "situation"
accountability: infrastructure-reliability
---

[[NIBSS]] PTSA (Payment Terminal Service Aggregator) route failure reported by [[Afeez Kazeem]] at 13:12 WAT Apr 16. Subject: "NIBSS PTSA | Switch | Nibss Transactions failure | 20260416." Transactions routed via the PTSA route were failing. [[NIBSS]] acknowledged via [[Mary Orajaka]] (Team Lead, PTSA Operations) and [[Abayomi Fagbayi]] (Ag. Head, PTSA Operations). TDSD-6578 filed at 13:14 WAT.

**RESOLVED 17:50 WAT.** [[Abayomi Fagbayi]] confirmed full service restored at 16:50 UTC (17:50 WAT): "We can confirm that full service has been restored. Please reconfirm." [[Olamide Ajibulu]] confirmed at 18:09 WAT that transactions are processing successfully and requested root cause from NIBSS. Total outage duration: ~4h38m (13:12–17:50 WAT). NIBSS has not yet provided root cause.

**Systemic hypothesis — partially disproven.** The PTSA-level failure was hypothesized as root cause of three simultaneous RC91 P1s (Stanbic, UBA, Union Bank). Test result: [[Stanbic Bank]] filed a NEW RC91 cycle (cycle 25) at 17:48 WAT — minutes BEFORE NIBSS confirmed restoration but well after NIBSS likely began restoring. More significantly, Stanbic's Peace Ikhuenbor asked for reconfirmation at 17:55 WAT, indicating Stanbic RC91 persists independently of PTSA restoration. This confirms [[Oladapo Onayemi]]'s finding: Stanbic CBA instability is the independent root cause, not NIBSS PTSA. Union Bank cycle 4 (filed 17:23 WAT, bank responded 17:52 WAT) likely resolved by PTSA restoration — timing aligns.

**Prior PTSA context:** [[FCMB]] entity page notes BIN intermittent failures via NIBSS PTSA. [[NIBSS]] entity page records Apr 15 PTSA RC91 window (09:49–09:53 WAT) where Moses Ajani explicitly denied NIBSS-side degradation. Today's explicit acknowledgment from NIBSS PTSA Operations was a shift — they confirmed the issue was on their side.

## Sources
Email, 2026-04-16 13:12 WAT, Afeez Kazeem → NIBSS PTSA. Email, 2026-04-16 13:16 WAT, NIBSS acknowledgments. Email, 2026-04-16 13:25 WAT, Mary Orajaka reconfirmation request. Jira TDSD-6578 (visible via email only). Email, 2026-04-16 15:50 WAT, Daily Report #20260416. Email, 2026-04-16 16:21 WAT, Daniel Fetuga confirms persists. Email, 2026-04-16 17:50 WAT, Abayomi Fagbayi confirms resolution. Email, 2026-04-16 18:09 WAT, Olamide confirms transactions processing + requests RCA.

## Deltas
- [2026-04-16 14:09 WAT] — Situation created. NIBSS PTSA route failure filed 13:12 WAT. NIBSS acknowledged. TDSD-6578. Hypothesized as root cause of 3 simultaneous RC91s.
- [2026-04-16 15:15 WAT] — Daily Report confirms NIBSS PTSA still active (~3h). UBA RC91 ongoing. FCMB RC91 intermittent. Union Bank resolved. Account switch portal unreachable (TDSD-6586, separate). No resolution signal for PTSA.
- [2026-04-16 17:09 WAT] — Daniel Fetuga confirms to NIBSS that issue persists (16:21 WAT email). 4+ hours unresolved since filing. NIBSS has not provided resolution timeline or root cause.
- [2026-04-16 18:09 WAT] — RESOLVED. Abayomi Fagbayi confirmed full service restored 17:50 WAT. Olamide confirmed transactions processing 18:09 WAT. Root cause not yet provided by NIBSS. Stanbic RC91 cycle 25 filed after restoration — confirms independent cause (CBA instability). Systemic hypothesis partially disproven.