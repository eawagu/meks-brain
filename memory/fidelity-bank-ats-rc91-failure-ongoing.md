---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "Fidelity Bank ATS RC91 P1 filed 03:33 WAT Apr 11 — now 16h+ with no resolution signal. No Jira ticket. Concurrent DCIR memory threshold breach at 94.97%."
updated: "2026-04-11T18:51:32Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS RC91 P1 filed by [[Olamide Ajibulu]] at 03:33 WAT Apr 11. Start: 03:30 WAT, bank-side cause, escalated to FEP Support at 03:32 WAT (email). No resolution signal as of 19:47 WAT (16h17min active). No Jira ticket. Slack thread had 1 reply at 07:51 WAT — no further updates. First Fidelity Bank RC91 cycle in the current multi-bank pattern — makes Fidelity the 5th distinct bank affected. Concurrent with CoralPay FBN (turned off, unresolved). Fidelity multi-front exposure: RC91 P1, DD null mandate errors (TDSD-6504 at [[NIBSS]]), AptPay UAT rescheduled to Apr 14–15, resolved DD P1 (TDSD-6499, RCA: network connection loss). NEW: DCIR Stanbic server memory at 94.97% (threshold 90%) — monitoring alert fired at 19:46 WAT. While this is the Stanbic DCIR server, it signals infrastructure stress across the DCIR ecosystem.

## Sources
slack #teamapt-tech-operations 03:33 WAT Apr 11 ([[Olamide Ajibulu]]); email [[Olamide Ajibulu]] → fepsupport@fidelitybank.ng 03:32 WAT Apr 11; email dcir-stanbic monitoring alert 19:46 WAT Apr 11

## Deltas
- 2026-04-11 07:51 WAT — Single thread reply in Slack. No resolution details.
- 2026-04-11 19:47 WAT — P1 now 16h17min active. Zero resolution signals. Zero Jira documentation. Absence-of-signal: 16+ hours without update on active P1 (threshold: 1 hour).