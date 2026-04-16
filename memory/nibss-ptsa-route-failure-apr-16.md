---
title: NIBSS PTSA — Route Failure Apr 16
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: infrastructure-reliability
role: cto-teamapt
created: "2026-04-16T13:12:50Z"
updated: "2026-04-16T13:12:50Z"
summary: "NIBSS PTSA route failure filed 13:12 WAT Apr 16. NIBSS acknowledged, working to restore. TDSD-6578. Potential root cause of simultaneous Stanbic/UBA/Union Bank RC91s."
---

[[NIBSS]] PTSA (Payment Terminal Service Aggregator) route failure reported by [[Afeez Kazeem]] at 13:12 WAT Apr 16. Subject: "NIBSS PTSA | Switch | Nibss Transactions failure | 20260416." Transactions routed via the PTSA route are failing. [[NIBSS]] acknowledged via [[Mary Orajaka]] (Team Lead, PTSA Operations) and [[Abayomi Fagbayi]] (Ag. Head, PTSA Operations) — both confirmed awareness and active restoration work. TDSD-6578 filed at 13:14 WAT.

**Systemic hypothesis:** This PTSA-level failure may be the common root cause of three simultaneous RC91 P1s filed earlier today — [[Stanbic Bank]] (10:11 WAT, cycle 24), [[UBA]] (10:35 WAT), and [[Union Bank]] (11:04 WAT, resolved 12:00 WAT). Three banks failing via RC91 concurrently + PTSA route failure = likely NIBSS infrastructure issue rather than independent bank problems. If PTSA resolution fixes Stanbic and UBA RC91s, that confirms the root-cause link.

**Prior PTSA context:** [[FCMB]] entity page notes BIN intermittent failures via NIBSS PTSA. [[NIBSS]] entity page records Apr 15 PTSA RC91 window (09:49–09:53 WAT) where Moses Ajani explicitly denied NIBSS-side degradation. Today's explicit acknowledgment from NIBSS PTSA Operations is a shift — they now confirm the issue is on their side.

## Sources
Email, 2026-04-16 13:12 WAT, Afeez Kazeem → NIBSS PTSA (ptsa@nibss-plc.com.ng). Email, 2026-04-16 13:16 WAT, NIBSS acknowledgments. Email, 2026-04-16 13:25 WAT, Mary Orajaka reconfirmation request. Jira TDSD-6578 (visible via email only — Jira connector still in auth failure).

## Deltas
- [2026-04-16 14:09 WAT] — Situation created. NIBSS PTSA route failure filed 13:12 WAT. NIBSS acknowledged. TDSD-6578. Hypothesized as root cause of 3 simultaneous RC91s.