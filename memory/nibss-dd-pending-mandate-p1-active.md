---
role: cto-teamapt
type:
  - "situation"
title: NIBSS DD — Pending Mandate P1 Active
status: stable
created: "2026-04-14T06:12:52Z"
summary: "NIBSS Direct Debit P1 — high count of pending mandate creation requests returning Null errors. Started 03:00 WAT Apr 14, filed 07:05 WAT, escalated to NIBSS. Same root cause (NIBSS response latency) also caused disbursement delays overnight and likely contributed to the DCIR/Wema 100% failure episode 01:00–04:06 WAT."
updated: "2026-04-15T20:19:19Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] Direct Debit service experiencing a high count of pending mandate creation requests returning Null errors. P1 formally filed by Frances Omelu in #teamapt-tech-operations at 07:05 WAT Apr 14. Incident start time 03:00 WAT. Escalated to NIBSS for review; no resolution signal.

**Silence threshold crossed.** At 12:09 WAT (11:09 UTC tick), the last Slack update on this P1 was Frances Omelu's filing at 07:05 WAT — 5h04min ago. config-salience absence-of-signal rule "Active P1 (unresolved) | 1 hour no update → Immediate" is exceeded by >4x. Incident duration now 9h09min. No acknowledgement, no status update, no retro note. An Immediate-tier Slack DM was drafted to the user at 12:09 WAT.

**Counterparty-side root cause.** NIBSS is the named cause — "From NIBSS" per the incident filing. Moniepoint has no unilateral fix path; this is a named-escalation and monitoring posture, not a deploy-level intervention.

**Broader blast radius than the P1 title suggests.** At 03:15 WAT — well before the formal P1 filing — Frances posted in #monieworld-monnify that NIBSS high response time was delaying wallet-to-bank disbursements. Same upstream, different surface. The DCIR/Wema 100% transaction failure episode overnight (01:05 → 03:50 → 04:06 WAT, escalating from 33% to 100% — see [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]) temporally aligns with NIBSS degradation and is plausibly the same root. Investigation at the NIBSS-rails level would confirm or rule out.

**Escalation gap repeats.** The pattern flagged in briefing-2026-04-14 B1 — monitoring alerts escalating silently to 100% without human pickup — repeated here: NIBSS DD degraded at 03:00 WAT, formal Slack P1 didn't land until 07:05 WAT, a 4h gap between the symptom appearing in monitoring and it being escalated where operators could see it. And the 5h04min post-filing silence is now a third instance of the same class — incident declared but not actively managed in the open channel. Three instances of the same structural defect inside 12 hours.

**Tied investigations.** [[Oladapo Onayemi]]'s Stanbic RC91 commitment (due Apr 15) is investigating Moniepoint processing latency to NIBSS node. That investigation surface overlaps with this incident's root cause diagnosis — findings likely inform both.

**Apr 15 21:09 WAT — Silence pattern extended.** No delta in 33h+ since the 12:09 WAT Apr 14 Immediate-tier draft. Status downgraded from `developing` to `stable` to reflect accumulated silence. No explicit resolution email received. The silence trajectory mirrors the DCIR/Wema implicit-resolved pattern (Apr 14 04:06 WAT → 27h silent → treated as implicit-recovered in briefing-2026-04-15 B8). Retire candidacy assessment at next briefing tick: (a) if >40h silent by 06:00 WAT Apr 16, classify as implicit-resolved and transition to `retired`; (b) if any new signal lands between now and briefing, reassess status. Retire-candidate framing feeds B3-style retro ask into tomorrow's briefing — second structural instance of the same "silent recovery without human closure" pattern this week.

## Sources
- Slack, #teamapt-tech-operations, 2026-04-14 07:05 WAT, Frances Omelu, P1 filing
- Slack, #monieworld-monnify, 2026-04-14 03:15 WAT, Frances Omelu, NIBSS response time disbursement delay notice
- Email, aptpaytechnicalsupport, 2026-04-14 06:44 WAT, Daily Report #20260414 (contextual — confirms 16/17 PTSAs operational, Sterling off)
- Related: Email thread, DCIR TEAMAPT, 2026-04-14 01:05–04:06 WAT, Wema 100% failure escalation
- Slack DM draft, 2026-04-14 12:09 WAT, heartbeat to user, Immediate-tier alert

## Deltas
- [2026-04-14 07:09 WAT] — Situation opened. P1 filed 07:05 WAT. Active ~4h10min. NIBSS escalation ongoing, no resolution signal.
- [2026-04-14 12:09 WAT] — Silence rule crossed. No Slack update in 5h04min on a P1 now 9h09min old. Immediate-tier Slack DM drafted to user. Third instance of the escalation-gap structural defect within 12h (overnight DCIR/Wema monitoring→escalation gap, the 4h filing-gap on this P1, now the 5h post-filing management silence).
- [2026-04-15 21:09 WAT] — 33h+ silent. Status changed `developing` → `stable`. Implicit-recovery inference consistent with DCIR/Wema Apr 14 pattern. Retire-candidate at next briefing tick.