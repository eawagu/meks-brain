---
role: cto-teamapt
type:
  - "situation"
title: AptPay/Fidelity Bank — UAT Window at Risk
status: developing
created: "2026-04-11T16:44:35Z"
summary: "UAT window Apr 14–15 is tomorrow. ATPP standup confirms Fidelity ACT go-live is week's top priority — testing completing today, deployment today/tomorrow. But Fidelity \"failing generally\" since 19:25 WAT creates tension between go-live push and bank operational instability."
updated: "2026-04-13T22:09:50Z"
cssclasses:
  - "situation"
accountability: Technology Scales Ahead of the Business
---

UAT rescheduled to Apr 14–15 after [[Fidelity Bank]] confirmed bank-wide network security protocol rollout caused 4 days lost progress. Fidelity now under multi-front operational stress: "failing generally" since 19:25 WAT Apr 13 (3h+ unresolved), DD null mandate errors (TDSD-6504, [[NIBSS]]), resolved DD P1 (TDSD-6499, 11h7min).

**Current (Apr 13):** ATPP Daily Standup (15:54 WAT) confirms Fidelity ACT go-live is the **top priority for the week** ([[Adeyinka Babalola]]). [[Olawale Adegboyega]] confirmed ACT testing should complete today and deployment is planned for today or tomorrow morning. ACT enhancement (file name + reporting) deployed to staging for QA testing.

**Tension:** The go-live push is on a collision course with Fidelity's operational instability. [[Daniel Armstrong]] reported Fidelity "failing generally" at 19:25 WAT — 3.5 hours after the standup where the team committed to today's testing completion. Whether Fidelity's broader ATS failures affect the ACT platform specifically is unclear, but bank-side attention may be diverted to firefighting.

[[Abraham Isinguzoro]] and [[Wycliffe Ochieng]] are TeamApt-side owners. CTO engagement not required unless window slips.

## Sources
email [[Faustina Ekechukwu]] → [[Abraham Isinguzoro]] 17:02 WAT Apr 10; slack/jira Fidelity RC91 and DD tracks Apr 11; ATPP Daily Standup 2026-04-13 (15:54 WAT); email [[Daniel Armstrong]] 19:25 WAT Apr 13

## Deltas
- 2026-04-10 17:05 WAT — [[Fidelity Bank]] responded with root cause: bank-wide network security protocol rollout caused ~4 days disruption. New UAT window: April 14–15, 2026.
- 2026-04-13 15:54 WAT — ATPP standup: Fidelity ACT go-live is week's top priority. Testing completing today, deployment today/tomorrow. ACT enhancement deployed to staging.
- 2026-04-13 19:25 WAT — Fidelity "failing generally" reported by Daniel Armstrong. Go-live push and bank operational instability now in tension.