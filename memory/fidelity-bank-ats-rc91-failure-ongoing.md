---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "Fidelity Bank ATS — \"failing generally\" since 19:25 WAT Apr 13. 12h44min+ silent as of 08:09 WAT Apr 14. Duty Handover 20260414 lists 16/17 PTSAs operational (only Sterling off); Fidelity not explicitly degraded — ambiguous recovery signal. No explicit resolution email. Surfaced in briefing-2026-04-14 B2."
updated: "2026-04-14T07:14:50Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS — escalated beyond RC91 to "failing generally" on Apr 13.

**Current (Apr 14, 08:09 WAT):** No resolution signal received since [[Daniel Armstrong]] escalated at 19:25 WAT Apr 13. Now **12h44min+ open** with zero bank response. Duty Handover Note #20260414 ([[Innocent Nwaokorie]], 08:01 WAT) lists "16 of 17 PTSAs operational" with Sterling named as the 1 off — Fidelity not explicitly listed as off. Ambiguous signal: Fidelity may have self-recovered into the operational set, or the "failing generally" condition is not tracked at PTSA-route granularity. No explicit resolution email. AptPay UAT window (Apr 14–15) begins today.

**Previous (Apr 13):** [[Daniel Armstrong]] emailed Fidelity FEP Support at 19:25 WAT: "transactions are failing generally. Kindly assist to review." Sent to Christian Okeke, Ikenna Shonowo, John Uguru-Okorie (FEP & POS Support). CC: aptpaytechnicalsupport, [[Oladapo Onayemi]]. This is a broader failure than RC91 — "failing generally" indicates multiple transaction types affected.

**Previous RC91 cycles:**
**Cycle 1:** Filed by [[Olamide Ajibulu]] at 03:33 WAT Apr 11. No resolution signal received for 21h+. No Jira ticket.

**Cycle 2:** Filed by [[Olamide Ajibulu]] at 00:17 WAT Apr 12. Fidelity ([[Oluwafunsho Oyefeso]]) responded at 00:24 WAT: "currently carrying out an emergency system maintenance." Reconfirmation exchange at 00:36–00:47 WAT. Resolution not confirmed.

**Multi-front exposure on Apr 13–14:**
1. "Failing generally" — status ambiguous 12h44min+ post-escalation (this page)
2. RC91 pattern (2 previous cycles, unclear if resolved)
3. ACT platform go-live targeted Apr 13 per ATPP standup (Olawale Adegboyega: "testing should be completed today, deployments targeted for same day")
4. DD null mandate errors ([[TDSD-6504]] at [[NIBSS]])
5. AptPay UAT rescheduled to Apr 14–15 — first day is TODAY

Whether the "failing generally" is a new failure mode, an intensification of the RC91 pattern, or self-resolved overnight is unknown. The concurrent ACT deployment creates risk — deploying to a bank that was experiencing general transaction failures. The UAT window starting today (Apr 14) may need reassessment if the failure persists.

No Jira tickets filed for any Fidelity ATS failure cycle.

## Sources
email [[Daniel Armstrong]] → fepsupport@fidelitybank.ng 19:25 WAT Apr 13; email [[Olamide Ajibulu]] → fepsupport 03:32 WAT Apr 11, 00:17 WAT Apr 12; email [[Oluwafunsho Oyefeso]] emergency maintenance 00:24 WAT Apr 12; Google Drive ATPP Daily Standup Notes 15:35 UTC Apr 13; email Duty Handover Note #20260414 ([[Innocent Nwaokorie]] 08:01 WAT Apr 14)

## Deltas
- 2026-04-11 07:51 WAT — Single thread reply in Slack. No resolution details.
- 2026-04-11 19:47 WAT — P1 now 16h17min active. Zero resolution signals.
- 2026-04-12 00:47 WAT — 2nd RC91 cycle filed. Fidelity acknowledged emergency maintenance.
- 2026-04-13 19:25 WAT — Escalated to "failing generally" — [[Daniel Armstrong]] reported broader failure beyond RC91. No resolution signal 3h+. Concurrent ACT go-live targeted same day.
- 2026-04-14 01:09 WAT — No resolution signal. 5h44min+ open. Overnight low-volume period — morning traffic will test whether issue persists.
- 2026-04-14 04:11 WAT — No resolution signal. 8h46min+ open. Zero bank response since escalation. AptPay UAT window (Apr 14–15) starts today — Fidelity testing may be impacted.
- 2026-04-14 06:17 WAT — Briefing-2026-04-14 B2 (confidence: high) surfaced this as Immediate-tier decision: escalate to Fidelity CTO/Head of Channels before UAT kicks off; pause UAT via Olawale Adegboyega if bank remains degraded.
- 2026-04-14 08:09 WAT — 12h44min+ silent. Duty Handover #20260414 (08:01 WAT) says "16 of 17 PTSAs operational" with only Sterling listed off — Fidelity not explicitly marked degraded. Ambiguous: possible implicit recovery OR handover granularity miss. No explicit resolution email from Fidelity FEP Support. Absence-of-signal rule (Active P1, 1h no update → Immediate) still technically qualifies but suppressed to avoid duplicate with B2 briefing item still in triage.