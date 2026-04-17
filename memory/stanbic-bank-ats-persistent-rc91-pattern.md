---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: "25+ P1 RC91 cycles Apr 3–16. Cycle 25 filed 17:48 WAT — post-NIBSS PTSA restoration, confirming independent CBA instability root cause per Oladapo's finding. Apr 17 morning: TDSD-6518 reconfirmation requested by Stanbic SRE; processing confirmed fine. No new ticket. Investigation fulfilled. Structural fix not deployed."
updated: "2026-04-17T09:25:48Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Twenty-five+ confirmed P1 cycles Apr 3–16 (14 days), all bank-resolved, same root cause unfixed. [[TDSD-6425]] administratively closed Apr 10 — closure does NOT resolve the strategic escalation posture decision. "Decide [[Stanbic Bank]] ATS escalation posture" state item 11+ days overdue (due Apr 6).

**Investigation FULFILLED Apr 15:** [[Oladapo Onayemi]]'s finding (DM, Apr 14 15:07–15:27 WAT): root cause is Stanbic CBA instability (primary trigger) + Moniepoint routes requests to an inactive node during failure, then fails to restore routing config after Stanbic recovers (amplifier). NOT a processing-latency problem — contradicts NIBSS attribution. Moniepoint team escalated "severally" by Oladapo without result. Automation of routing-restoration is the structural fix and lives inside Moniepoint's Domestic Switching department ([[Babatunde Okufi]]).

**Cycle 25 (Apr 16, 17:48 WAT):** Filed by [[Olamide Ajibulu]]: "Stanbic bank card transactions are currently failing. This is occurring with RC 91 and high processing time." Sent to Stanbic IT Service Management Nigeria and Service Monitoring. Stanbic's [[Peace Ikhuenbor]] (SRE) asked for reconfirmation at 17:55 WAT — bank is aware and investigating. No resolution signal yet.

**Key finding this cycle:** Cycle 25 was filed AFTER [[NIBSS PTSA — Route Failure Apr 16]] was resolved (17:50 WAT). This confirms Stanbic RC91 is independent of the NIBSS PTSA outage that was hypothesized as the systemic root cause of today's simultaneous RC91s. [[Oladapo Onayemi]]'s CBA instability finding is the confirmed independent cause.

**Cycle 24 (Apr 16, 10:11 WAT):** Filed by [[Afeez Kazeem]]. Ran 5+ hours concurrent with UBA, Union Bank, FCMB RC91s and NIBSS PTSA route failure. No explicit resolution email found — may have resolved with or without PTSA restoration.

**Apr 17 morning window:** Stanbic SRE [[Samson Ibekwe]] requested reconfirmation on TDSD-6518 (Apr 12 ticket) at 08:06 WAT Apr 17; [[Qazim Adedigba]] confirmed processing fine at 08:31 WAT. Hourly Report 20260417 (08:02 WAT, Qazim) classifies Stanbic as experiencing intermittent RC91 failures — services restarted, bank engaged. No new Slack P1 filing, no new ticket. Pattern continues at low-grade intermittent intensity through the morning window.

**Daily Report #20260416** (Afeez Kazeem, 15:50 WAT) did NOT list Stanbic-specific ticket for cycle 24. This may indicate Stanbic resolved without explicit confirmation email, or the daily report omitted it.

## Sources
Email, Slack DM, Jira (TDSD-6425 closed; TDSD-6518 reconfirmation Apr 17), brain commitment page, email 2026-04-16 10:20 BST Afeez Kazeem, Daily Report 2026-04-16 15:50 WAT, email 2026-04-16 17:48 WAT Olamide Ajibulu, email 2026-04-16 17:55 WAT Peace Ikhuenbor reconfirmation request, email 2026-04-17 08:06 WAT Samson Ibekwe (reconfirmation), email 2026-04-17 08:31 WAT Qazim Adedigba (processing fine), email 2026-04-17 08:02 WAT Qazim Adedigba (Hourly Report 20260417)

## Deltas
- 2026-04-16 11:15 WAT — Cycle 24 filed. Stanbic RC91 start 10:11 WAT. Concurrent with UBA and Union Bank RC91s (4-bank systemic pattern with FCMB).
- 2026-04-16 12:09 WAT — Cycle 24 exceeded 2h silence threshold. Immediate alert dispatched.
- 2026-04-16 13:09 WAT — ~3h active. Continued silence. Immediate alert re-dispatched. NIBSS PTSA route failure identified as potential systemic root cause.
- 2026-04-16 14:09 WAT — ~4h active. NIBSS PTSA route failure filed 13:12 WAT. Systemic root-cause hypothesis: PTSA failure driving concurrent RC91s.
- 2026-04-16 15:15 WAT — ~5h active. Daily Report does not list Stanbic-specific ticket. No resolution signal. UBA confirmed ongoing. NIBSS PTSA confirmed ongoing.
- 2026-04-16 18:09 WAT — Cycle 25 filed 17:48 WAT by Olamide Ajibulu. Post-NIBSS PTSA resolution (17:50 WAT). Confirms Stanbic CBA instability is independent root cause. Peace Ikhuenbor requesting reconfirmation. No resolution yet.
- 2026-04-17 10:20 WAT — **TDSD-6518 re-engagement — no new cycle filed.** Stanbic SRE [[Samson Ibekwe]] requested reconfirmation on the Apr 12 ticket at 08:06 WAT; [[Qazim Adedigba]] confirmed processing fine at 08:31 WAT. Hourly Report 20260417 (08:02 WAT) classifies Stanbic as experiencing intermittent RC91 failures — services restarted, bank engaged. Pattern continues at low-grade intermittent intensity; no new Slack P1 or new ticket.