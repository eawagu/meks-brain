---
title: NIBSS DD — Downtime P1 Apr 20
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
role: cto-teamapt
accountability: Technology Reliability and Security
created: "2026-04-20T05:23:14Z"
updated: "2026-04-20T05:23:14Z"
summary: "New NIBSS Direct Debit downtime P1 filed 2026-04-20 05:18 WAT via TDSD-6630 by Frances Omelu during the overnight delegation window. Medium priority, Work in progress at tick time. Same structural class as retired Apr 14 NIBSS DD Pending Mandate P1 (silent-recovery pattern). Surfaced as briefing-2026-04-20 B1."
---

[[NIBSS]] Direct Debit downtime P1 raised via [[TDSD-6630]] at 2026-04-20 05:18 WAT by [[Frances Omelu]], updated 05:59 WAT, Medium priority, Work in progress at the 06:09 WAT briefing tick. Filing occurred during the overnight delegation window (23:00–06:00 WAT), so surfacing is deferred to this briefing tick per config-heartbeat rule.

**Structural parallel to retired Apr 14 NIBSS DD P1.** The prior [[NIBSS DD — Pending Mandate P1 Active]] situation (filed 07:05 WAT Apr 14, retired 06:23 WAT Apr 16) followed the "silent recovery without human closure" pattern documented as a structural defect in [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] and flagged for retro at briefing-2026-04-15 B3 / briefing-2026-04-16 B9. Whether TDSD-6630 reproduces the same failure mode or a distinct NIBSS DD fault pending ticket-detail read next tick.

**Priority classification.** Medium priority excludes Immediate-tier dispatch per config-salience trigger #1 ("New P1 incident" interprets P1 as High/Critical priority, not Medium). Absence-of-signal rule applies: Active P1 (unresolved) with no update for >1 hour promotes to Immediate. TDSD-6630 last-update 05:59 WAT; the 1h silence threshold fires at 06:59 WAT Apr 20 if no Slack or Jira update arrives in the interim.

**Counterparty.** NIBSS is the named upstream. Moniepoint has no unilateral fix path; standard posture is named-escalation + monitoring, not deploy-level intervention. DD/CDD department ([[Daniel Ojinaka]]) is the internal accountability vector if escalation is needed.

## Sources
Jira TDSD-6630 2026-04-20 05:18 WAT (created by [[Frances Omelu]], Medium priority, Work in progress, summary: NIBSS DD DOWNTIME); Jira TDSD-6630 2026-04-20 05:59 WAT update.

## Deltas
- [2026-04-20 06:09 WAT] — Situation opened. TDSD-6630 filed 05:18 WAT, updated 05:59 WAT during delegation window. Medium priority; not Immediate per config-salience. Surfaced as briefing-2026-04-20 B1. Absence-of-signal 1h silence threshold from 05:59 WAT = 06:59 WAT Apr 20. Factors: urgency 0.7 · impact_scope 0.6 · cto_specificity 0.5 · pattern_significance 0.85 · accountability_alignment 0.9.
