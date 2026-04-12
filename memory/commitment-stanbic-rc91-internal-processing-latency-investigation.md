---
title: Commitment — Stanbic RC91 Internal Processing Latency Investigation
type:
  - "commitment"
cssclasses:
  - "commitment"
status: open
owner: Emeka Awagu
counterparty: Oladapo Onayemi
due: 2026-04-15
accountability: Technology Reliability and Security
created: "2026-04-12T16:28:31Z"
updated: "2026-04-12T16:28:31Z"
summary: Oladapo Onayemi to investigate whether Moniepoint processing latency to NIBSS node is anomalous, per NIBSS attribution of RC91 to Moniepoint timeout. Due Wed Apr 15.
---

## Ask

Investigate whether Moniepoint processing latency to NIBSS node is anomalous. NIBSS (Moses Ajani, 08:56 WAT Apr 12) attributed RC91 failures to "no response from your end within the timeout period" — responses received after timeout. Multi-bank RC91 overnight (Access, Wema, Stanbic, NIBSS node) is consistent with Moniepoint-side hypothesis.

Specific deliverables:
1. Measure Moniepoint processing time to NIBSS node over the past 11 days (Apr 3–12) — identify whether latency spikes correlate with RC91 cycles
2. Compare against baseline processing time from a stable period (e.g., Mar 15–31)
3. If latency is anomalous: identify root cause (infrastructure, code path, upstream dependency)
4. If latency is normal: document evidence that contradicts the NIBSS attribution

## Context

- 20 P1 RC91 cycles in 11 days across Stanbic, all bank-resolved, same root cause unfixed
- ATS JAR deployment to Stanbic pending bank action (Babajide → Oluwatobi Meshioye, Apr 11)
- Formal Stanbic escalation letter on hold pending this investigation's findings
- CTO at Strategy Retreat Tue–Thu Apr 14–16 — findings needed by Wed Apr 15 so decision can be made during a retreat break or on Fri Apr 17

## References

- [[Stanbic Bank ATS — Persistent RC91 Pattern]]
- [[Stanbic Bank]]
- [[Oladapo Onayemi]]
- [[NIBSS]]