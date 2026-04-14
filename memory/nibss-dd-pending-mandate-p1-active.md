---
title: NIBSS DD — Pending Mandate P1 Active
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-14T06:12:52Z"
updated: "2026-04-14T06:12:52Z"
summary: "NIBSS Direct Debit P1 — high count of pending mandate creation requests returning Null errors. Started 03:00 WAT Apr 14, filed 07:05 WAT, escalated to NIBSS. Same root cause (NIBSS response latency) also caused disbursement delays overnight and likely contributed to the DCIR/Wema 100% failure episode 01:00–04:06 WAT."
---

[[NIBSS]] Direct Debit service experiencing a high count of pending mandate creation requests returning Null errors. P1 formally filed by Frances Omelu in #teamapt-tech-operations at 07:05 WAT Apr 14. Incident start time 03:00 WAT. Escalated to NIBSS for review; no resolution signal.

**Counterparty-side root cause.** NIBSS is the named cause — "From NIBSS" per the incident filing. Moniepoint has no unilateral fix path; this is a named-escalation and monitoring posture, not a deploy-level intervention.

**Broader blast radius than the P1 title suggests.** At 03:15 WAT — well before the formal P1 filing — Frances posted in #monieworld-monnify that NIBSS high response time was delaying wallet-to-bank disbursements. Same upstream, different surface. The DCIR/Wema 100% transaction failure episode overnight (01:05 → 03:50 → 04:06 WAT, escalating from 33% to 100% — see [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]) temporally aligns with NIBSS degradation and is plausibly the same root. Investigation at the NIBSS-rails level would confirm or rule out.

**Escalation gap repeats.** The pattern flagged in briefing-2026-04-14 B1 — monitoring alerts escalating silently to 100% without human pickup — repeated here: NIBSS DD degraded at 03:00 WAT, formal Slack P1 didn't land until 07:05 WAT, a 4h gap between the symptom appearing in monitoring and it being escalated where operators could see it. Second instance of the same structural defect in one night.

**Tied investigations.** [[Oladapo Onayemi]]'s Stanbic RC91 commitment (due Apr 15) is investigating Moniepoint processing latency to NIBSS node. That investigation surface overlaps with this incident's root cause diagnosis — findings likely inform both.

## Sources
- Slack, #teamapt-tech-operations, 2026-04-14 07:05 WAT, Frances Omelu, P1 filing
- Slack, #monieworld-monnify, 2026-04-14 03:15 WAT, Frances Omelu, NIBSS response time disbursement delay notice
- Email, aptpaytechnicalsupport, 2026-04-14 06:44 WAT, Daily Report #20260414 (contextual — confirms 16/17 PTSAs operational, Sterling off)
- Related: Email thread, DCIR TEAMAPT, 2026-04-14 01:05–04:06 WAT, Wema 100% failure escalation

## Deltas
- [2026-04-14 07:09 WAT] — Situation opened. P1 filed 07:05 WAT. Active ~4h10min. NIBSS escalation ongoing, no resolution signal.