---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "Fidelity Bank ATS — escalated to \"failing generally\" on Apr 13 (19:25 WAT). Beyond RC91 — multiple transaction types affected. No resolution signal 3h+. ACT platform go-live targeted same day. Three concurrent failure tracks."
updated: "2026-04-13T21:56:21Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS — escalated beyond RC91 to "failing generally" on Apr 13.

**Current (Apr 13):** [[Daniel Armstrong]] emailed Fidelity FEP Support at 19:25 WAT: "transactions are failing generally. Kindly assist to review." Sent to Christian Okeke, Ikenna Shonowo, John Uguru-Okorie (FEP & POS Support). CC: aptpaytechnicalsupport, [[Oladapo Onayemi]]. **No resolution signal as of 22:29 WAT (3h+ open).** This is a broader failure than RC91 — "failing generally" indicates multiple transaction types affected.

**Previous RC91 cycles:**
**Cycle 1:** Filed by [[Olamide Ajibulu]] at 03:33 WAT Apr 11. No resolution signal received for 21h+. No Jira ticket.

**Cycle 2:** Filed by [[Olamide Ajibulu]] at 00:17 WAT Apr 12. Fidelity ([[Oluwafunsho Oyefeso]]) responded at 00:24 WAT: "currently carrying out an emergency system maintenance." Reconfirmation exchange at 00:36–00:47 WAT. Resolution not confirmed.

**Multi-front exposure on Apr 13:**
1. "Failing generally" — active, no resolution (this page)
2. RC91 pattern (2 previous cycles, unclear if resolved)
3. ACT platform go-live targeted today per ATPP standup (Olawale Adegboyega: "testing should be completed today, deployments targeted for same day")
4. DD null mandate errors ([[TDSD-6504]] at [[NIBSS]])
5. AptPay UAT rescheduled to Apr 14–15

Whether the "failing generally" is a new failure mode or an intensification of the RC91 pattern is unknown. The concurrent ACT deployment creates risk — deploying to a bank experiencing general transaction failures.

No Jira tickets filed for any Fidelity ATS failure cycle.

## Sources
email [[Daniel Armstrong]] → fepsupport@fidelitybank.ng 19:25 WAT Apr 13; email [[Olamide Ajibulu]] → fepsupport 03:32 WAT Apr 11, 00:17 WAT Apr 12; email [[Oluwafunsho Oyefeso]] emergency maintenance 00:24 WAT Apr 12; Google Drive ATPP Daily Standup Notes 15:35 UTC Apr 13

## Deltas
- 2026-04-11 07:51 WAT — Single thread reply in Slack. No resolution details.
- 2026-04-11 19:47 WAT — P1 now 16h17min active. Zero resolution signals.
- 2026-04-12 00:47 WAT — 2nd RC91 cycle filed. Fidelity acknowledged emergency maintenance.
- 2026-04-13 19:25 WAT — Escalated to "failing generally" — [[Daniel Armstrong]] reported broader failure beyond RC91. No resolution signal 3h+. Concurrent ACT go-live targeted same day.