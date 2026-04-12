---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "Fidelity Bank ATS RC91 — 2nd cycle filed 00:17 WAT Apr 12. Bank acknowledged emergency maintenance at 00:24 WAT. Reconfirmation pending. Previous cycle was 21h+ with no resolution signal. No Jira ticket for either cycle."
updated: "2026-04-12T00:12:35Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS RC91 P1 — two cycles in the current pattern:

**Cycle 1:** Filed by [[Olamide Ajibulu]] at 03:33 WAT Apr 11. Start: 03:30 WAT. Escalated to FEP Support (email). No resolution signal received for 21h+. No Jira ticket. Slack thread had 1 reply at 07:51 WAT — no further updates. DCIR Stanbic server memory at 94.97% (threshold 90%) monitoring alert fired 19:46 WAT.

**Cycle 2 (current):** Filed by [[Olamide Ajibulu]] at 00:17 WAT Apr 12 (email to FEP Support). Slack P1 posted at 00:23 WAT. Fidelity ([[Oluwafunsho Oyefeso]]) responded at 00:24 WAT: "currently carrying out an emergency system maintenance. Services will be restored shortly." Olamide requested update on completion at 00:36 WAT. Fidelity asked to "reconfirm" at 00:47 WAT — ambiguous whether this means resolved or requesting confirmation of the issue. Status: ONGOING pending reconfirmation.

Whether cycle 1 ever resolved is unknown — no resolution signal was captured. Cycle 2 may be a continuation or a new failure after brief recovery. Either interpretation confirms persistent instability on the Fidelity ATS route.

Fidelity multi-front exposure: RC91 P1 (ongoing), DD null mandate errors ([[TDSD-6504]] at [[NIBSS]]), AptPay UAT rescheduled to Apr 14–15, resolved DD P1 (TDSD-6499). First Fidelity Bank RC91 cycle in the current multi-bank pattern — makes Fidelity the 5th distinct bank affected.

No Jira tickets filed for either RC91 cycle.

## Sources
slack #teamapt-tech-operations 03:33 WAT Apr 11, 00:23 WAT Apr 12 ([[Olamide Ajibulu]]); email [[Olamide Ajibulu]] → fepsupport@fidelitybank.ng 03:32 WAT Apr 11, 00:17 WAT Apr 12; email [[Oluwafunsho Oyefeso]] emergency maintenance 00:24 WAT Apr 12; email dcir-stanbic monitoring alert 19:46 WAT Apr 11

## Deltas
- 2026-04-11 07:51 WAT — Single thread reply in Slack. No resolution details.
- 2026-04-11 19:47 WAT — P1 now 16h17min active. Zero resolution signals. Zero Jira documentation. Absence-of-signal: 16+ hours without update on active P1 (threshold: 1 hour).
- 2026-04-12 00:47 WAT — 2nd RC91 cycle filed at 00:17 WAT. Fidelity acknowledged emergency maintenance at 00:24 WAT. Reconfirmation exchange at 00:36–00:47 WAT. Resolution not confirmed. Two concurrent bank RC91 P1s (Fidelity + Wema).