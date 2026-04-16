---
role: cto-teamapt
type:
  - "situation"
title: NIBSS DD — Pending Mandate P1 Active
status: retired
created: "2026-04-14T06:12:52Z"
summary: "RETIRED. NIBSS Direct Debit P1 — implicit-resolved after 47h+ silence. Filed 07:05 WAT Apr 14, last update 12:09 WAT Apr 14. Same structural defect as DCIR/Wema pattern: silent recovery without human closure."
updated: "2026-04-16T05:31:51Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] Direct Debit service experiencing a high count of pending mandate creation requests returning Null errors. P1 formally filed by Frances Omelu in #teamapt-tech-operations at 07:05 WAT Apr 14. Incident start time 03:00 WAT. Escalated to NIBSS for review; no resolution signal.

**Silence threshold crossed.** At 12:09 WAT (11:09 UTC tick), the last Slack update on this P1 was Frances Omelu's filing at 07:05 WAT — 5h04min ago. config-salience absence-of-signal rule "Active P1 (unresolved) | 1 hour no update → Immediate" is exceeded by >4x. Incident duration now 9h09min. No acknowledgement, no status update, no retro note. An Immediate-tier Slack DM was drafted to the user at 12:09 WAT.

**Counterparty-side root cause.** NIBSS is the named cause — "From NIBSS" per the incident filing. Moniepoint has no unilateral fix path; this is a named-escalation and monitoring posture, not a deploy-level intervention.

**Broader blast radius than the P1 title suggests.** At 03:15 WAT — well before the formal P1 filing — Frances posted in #monieworld-monnify that NIBSS high response time was delaying wallet-to-bank disbursements. Same upstream, different surface. The DCIR/Wema 100% transaction failure episode overnight (01:05 → 03:50 → 04:06 WAT, escalating from 33% to 100% — see [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]) temporally aligns with NIBSS degradation and is plausibly the same root.

**RETIRED 2026-04-16.** 47h+ silent since last update (12:09 WAT Apr 14 Immediate-tier draft). Status was downgraded to `stable` at 21:09 WAT Apr 15 with retire-candidate threshold: >40h silent → implicit-resolved. Threshold met at 06:23 WAT Apr 16. No new NIBSS DD signals overnight. Same structural pattern (silent recovery without human closure) as DCIR/Wema Apr 14 episode — structural retro ask remains open (briefing-2026-04-15 B3).

## Sources
- Slack, #teamapt-tech-operations, 2026-04-14 07:05 WAT, Frances Omelu, P1 filing
- Slack, #monieworld-monnify, 2026-04-14 03:15 WAT, Frances Omelu, NIBSS response time disbursement delay notice
- Slack DM draft, 2026-04-14 12:09 WAT, heartbeat to user, Immediate-tier alert

## Deltas
- [2026-04-14 07:09 WAT] — Situation opened. P1 filed 07:05 WAT.
- [2026-04-14 12:09 WAT] — Silence rule crossed. Immediate-tier Slack DM drafted.
- [2026-04-15 21:09 WAT] — 33h+ silent. Status changed `developing` → `stable`. Retire-candidate flagged.
- [2026-04-16 06:23 WAT] — **RETIRED.** 47h+ silent, retire-candidate threshold met. Implicit-resolved. Structural retro ask (silent recovery without human closure) deferred to briefing-2026-04-15 B3 / briefing-2026-04-16 B9.