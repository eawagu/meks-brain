---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "Fidelity Bank ATS — \"failing generally\" since 19:25 WAT Apr 13 (14h44min+ silent). New Fidelity RC91 P1 filed 09:08 WAT Apr 14 confirms Fidelity remains degraded. Concurrent: Fidelity card routing errors via ISW PTSA (BIN 56400206 needs ISW-side profiling). AptPay UAT window starts today. Surfaced in briefing-2026-04-14 B2."
updated: "2026-04-14T09:12:59Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS — escalated beyond RC91 to "failing generally" on Apr 13, with a new RC91 P1 filed morning Apr 14 confirming continued degradation.

**Current (Apr 14, 10:09 WAT):** Fresh [[Fidelity Bank]] RC91 P1 filed by [[Olamide Ajibulu]] at 09:08 WAT Apr 14 (to FEP Support, cc aptpaytechnicalsupport). No resolution signal yet (~1h00min open). This is materially new: the morning traffic spike is now producing a full RC91 cycle, confirming that the overnight "failing generally" condition did NOT self-resolve as the Duty Handover ambiguity had suggested. Concurrent working-level thread: [[Emeka Joseph]] chasing Moniepoint Card Payment SRE ([[Oladipupo Sholotan]]) on ROUTING ERROR for Fidelity cards on Moniepoint terminals; Oladipupo attributes to Interswitch PTSA route and requests Fidelity profile/permit BIN 56400206 on Moniepoint ISW side. Fidelity routing errors are an independent failure track from ATS RC91 but concurrent on the same counterparty.

**Prior state (Apr 14, 08:09 WAT):** No resolution signal received since [[Daniel Armstrong]] escalated at 19:25 WAT Apr 13. 12h44min+ silent. Duty Handover Note #20260414 ([[Innocent Nwaokorie]], 08:01 WAT) listed "16 of 17 PTSAs operational" with only Sterling off — Fidelity not explicitly degraded. Ambiguous signal: possible implicit recovery OR handover granularity miss. 10:09 WAT update resolves the ambiguity — Fidelity has not recovered; morning RC91 cycle is the tell.

**Previous (Apr 13):** [[Daniel Armstrong]] emailed Fidelity FEP Support at 19:25 WAT: "transactions are failing generally. Kindly assist to review." CC: aptpaytechnicalsupport, [[Oladapo Onayemi]]. "Failing generally" indicates multiple transaction types affected.

**Previous RC91 cycles:**
**Cycle 1:** Filed by [[Olamide Ajibulu]] at 03:33 WAT Apr 11. No resolution signal received for 21h+. No Jira ticket.

**Cycle 2:** Filed by [[Olamide Ajibulu]] at 00:17 WAT Apr 12. Fidelity ([[Oluwafunsho Oyefeso]]) responded at 00:24 WAT: "currently carrying out an emergency system maintenance." Reconfirmation exchange at 00:36–00:47 WAT. Resolution not confirmed.

**Cycle 3 (current):** Filed by [[Olamide Ajibulu]] at 09:08 WAT Apr 14. Subject: "FIDELITY BANK RC 91|20260414." To FEP Support, cc aptpaytechnicalsupport. No bank response yet.

**Multi-front exposure on Apr 13–14:**
1. "Failing generally" — 14h44min+ post-escalation, unresolved
2. New RC91 cycle morning Apr 14 — ~1h open, confirms degradation persists
3. Card routing errors via ISW PTSA — BIN profiling pending Moniepoint-side
4. ACT platform go-live targeted Apr 13–14 per ATPP standup
5. DD null mandate errors ([[TDSD-6504]] at [[NIBSS]])
6. AptPay UAT window Apr 14–15 — first day is TODAY

B2 in briefing-2026-04-14 (confidence: high) recommended: escalate to Fidelity CTO/Head of Channels before UAT kicks off; pause UAT via [[Olawale Adegboyega]]. The morning RC91 strengthens that recommendation — UAT against a degraded counterparty produces invalid results.

No Jira tickets filed for any Fidelity ATS failure cycle. Jira connector still blind (59+ ticks).

## Sources
email [[Olamide Ajibulu]] → fepsupport@fidelitybank.ng 09:08 WAT Apr 14 (FIDELITY BANK RC 91|20260414); email [[Emeka Joseph]] ↔ [[Oladipupo Sholotan]] 09:17–10:03 WAT Apr 14 (ROUTING ERROR FOR FIDELITY BANK CARDS MONIEPOINT TERMINALS); email [[Daniel Armstrong]] → fepsupport@fidelitybank.ng 19:25 WAT Apr 13; email [[Olamide Ajibulu]] → fepsupport 03:32 WAT Apr 11, 00:17 WAT Apr 12; email [[Oluwafunsho Oyefeso]] emergency maintenance 00:24 WAT Apr 12; Google Drive ATPP Daily Standup Notes 15:35 UTC Apr 13; email Duty Handover Note #20260414 ([[Innocent Nwaokorie]] 08:01 WAT Apr 14)

## Deltas
- 2026-04-11 07:51 WAT — Single thread reply in Slack. No resolution details.
- 2026-04-11 19:47 WAT — P1 now 16h17min active. Zero resolution signals.
- 2026-04-12 00:47 WAT — 2nd RC91 cycle filed. Fidelity acknowledged emergency maintenance.
- 2026-04-13 19:25 WAT — Escalated to "failing generally" — [[Daniel Armstrong]] reported broader failure beyond RC91. No resolution signal 3h+. Concurrent ACT go-live targeted same day.
- 2026-04-14 01:09 WAT — No resolution signal. 5h44min+ open. Overnight low-volume period — morning traffic will test whether issue persists.
- 2026-04-14 04:11 WAT — No resolution signal. 8h46min+ open. Zero bank response since escalation. AptPay UAT window (Apr 14–15) starts today — Fidelity testing may be impacted.
- 2026-04-14 06:17 WAT — Briefing-2026-04-14 B2 (confidence: high) surfaced this as Immediate-tier decision: escalate to Fidelity CTO/Head of Channels before UAT kicks off; pause UAT via Olawale Adegboyega if bank remains degraded.
- 2026-04-14 08:09 WAT — 12h44min+ silent. Duty Handover #20260414 (08:01 WAT) says "16 of 17 PTSAs operational" with only Sterling listed off — Fidelity not explicitly marked degraded. Ambiguous: possible implicit recovery OR handover granularity miss. Absence-of-signal rule suppressed to avoid duplicate with B2 briefing item still in triage.
- 2026-04-14 10:09 WAT — Morning traffic resolves the ambiguity: new Fidelity RC91 P1 filed 09:08 WAT ([[Olamide Ajibulu]]). Bank has not recovered. Concurrent routing error thread on Fidelity cards via Moniepoint terminals (ISW PTSA) — separate track. B2 recommendation now has empirical confirmation: UAT against degraded bank is not advisable. No new Immediate alert issued (briefing B2 already active with confidence: high).