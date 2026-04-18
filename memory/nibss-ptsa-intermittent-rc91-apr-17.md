---
role: cto-teamapt
type:
  - "situation"
title: NIBSS PTSA — Intermittent RC91 Apr 17
status: retired
created: "2026-04-17T11:19:19Z"
summary: "RETIRED 2026-04-18 17:09 WAT. TDSD-6597 closed 16:47 WAT by Afeez Kazeem with RCA: NIBSS + Moniepoint end-to-end review, pos-tms log level increased to identify dropped transactions, fix applied, route processing successfully. Active incident (31h18m) resolved with RCA content."
updated: "2026-04-18T16:14:58Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

**Retired 2026-04-18 17:09 WAT.** [[TDSD-6597]] (the Jira cross-track of this incident) was transitioned to Completed / Resolution: Done at 16:47 WAT Apr 18 by [[Afeez Kazeem]] with the following RCA comment: "Transactions was reviewed end-to-end by Nibss and Moniepoint team and log level was increased on pos-tms to confirmed were transaction were drop. Fixed was applied and subsequent transactions started processing successfully on the route." Total active duration: 31h18m from 09:29 WAT Apr 17 start to 16:47 WAT Apr 18 resolution. Slack-side confirmation not yet posted in #teamapt-tech-operations, but the ticket's RCA is definitive enough to retire per the bias-toward-retiring rule — monitoring this page adds no further signal. The broader [[RC91 Multi-Bank Failure Pattern]] continues under other situation pages (Stanbic, Wema, UBA, FCMB, Ecobank) but this specific Apr 17 NIBSS cycle is closed.

Retiring per the heartbeat bias-toward-retiring rule. Historical content preserved below for pattern compounding.

---

Intermittent RC91 ("Issuer or Switch Inoperative") failures on the [[NIBSS]] PTSA route began 09:29 WAT today and remained active as of 20:09 WAT — 10h40m total, well past the 2-hour salience-trigger threshold. P1 was filed in #teamapt-tech-operations at 11:25 WAT by the monitoring team. At 11:03 WAT, Moses Ajani disputed the partial-match attribution line of the initial diagnosis, so root-cause ownership between switch-side and issuer-side is still contested — no thread activity since. Silence is now 9h06m.

This cycle is distinct from the [[NIBSS PTSA — Route Failure Apr 16]] cycle that resolved 17:50 WAT yesterday, but occupies the same root-cause territory (PTSA-routed authorization failures). Cross-pattern context: [[Wema Bank — RC91 P1 Apr 17]] (11h20m active, silent 11h17m), [[Polaris Bank]] double-cycle on [[Sterling + Polaris — Routes Degraded]] (morning 8h30m silent, second cycle 1h53m active), cycle 27 on [[Stanbic Bank ATS — Persistent RC91 Pattern]] (18:05 WAT filing, 2h04m active), new [[UBA Bank — RC91 P1 Apr 17]] (18:45 WAT filing), and reopened [[Ecobank — RC91 on NUS Nodes]]. Five concurrent RC91 situations with attribution ambiguity as a cross-cutting pattern, not isolated to NIBSS.

A separate set of P1s on [[Polaris Bank]] RC91 are tracked on [[Sterling + Polaris — Routes Degraded]] (same entity as an existing stable situation, though distinct failure mode from the Sterling-OFF Day 7+ settlement issue).

## Sources
Slack #teamapt-tech-operations 2026-04-17 11:25 WAT (P1 filing); Slack #teamapt-tech-operations 2026-04-17 11:03 WAT (Moses Ajani attribution dispute); Gmail Afeez 2026-04-17 12:01 WAT (Ecobank cross-context); Slack Adewuyi Mayowa 2026-04-17 12:15 WAT (Ecobank attribution pushback); Jira [[TDSD-6597]] 2026-04-18 16:47 WAT (closure with RCA comment by [[Afeez Kazeem]])

## Deltas
- [2026-04-17 11:25 WAT] — P1 filed in #teamapt-tech-operations: "P1: Intermittent 91 failures from NIBSS. Start Time 9:29 AM. End Time: Ongoing."
- [2026-04-17 11:03 WAT] — Moses Ajani disputed partial-match attribution in thread; ownership contested.
- [2026-04-17 12:09 WAT] — Heartbeat tick observed P1 still active at 2h40m, exceeding the 2h Immediate salience trigger. Dispatch sent to user DM.
- [2026-04-17 13:09 WAT] — Heartbeat tick: P1 still active at 3h40m, 2h06m of silence since Moses's 11:03 WAT message. No resolution signal in this window. Triggers: Immediate #2 (P1 >2h unresolved) + absence-of-signal. Fresh dispatch to user DM. Factors: urgency 1.0 · impact_scope 0.8 · cto_specificity 0.9 · pattern_significance 0.9 · accountability_alignment 1.0.
- [2026-04-17 14:09 WAT] — Heartbeat tick: P1 still active at 4h41m, 3h07m of silence since Moses's 11:03 WAT message. Third consecutive silent tick. Slack/email/keyword sweeps all zero results this window. Triggers: Immediate #2 (P1 >2h unresolved) + absence-of-signal. Dispatch consolidated with Polaris in one user DM. Factors: urgency 1.0 · impact_scope 0.8 · cto_specificity 0.9 · pattern_significance 0.95 · accountability_alignment 1.0.
- [2026-04-17 15:09 WAT] — Heartbeat tick: P1 still active at 5h40m, 4h06m of silence since Moses's 11:03 WAT. Fourth consecutive silent tick. Broader sweep surfaced a previously-untracked [[Wema Bank — RC91 P1 Apr 17]] (8:49 WAT start — not caught by prior 3 ticks); consolidated Immediate dispatch now covers Wema + NIBSS + Polaris. Gmail MCP 2nd consecutive tick failure. Factors: urgency 1.0 · impact_scope 0.8 · cto_specificity 0.9 · pattern_significance 0.95 · accountability_alignment 1.0.
- [2026-04-17 16:09 WAT] — Heartbeat tick: P1 still active at 6h40m, 5h06m silent since Moses's 11:03 WAT message. 5th consecutive silent tick. Tier 1 channel-read sweep: zero new parent messages in window. Keyword search RC91 and P1: zero in-scope results (only bot noise from #teamapt_infra_notifications and an out-of-scope gamification PagerDuty resolution). Gmail MCP: 3rd consecutive tool-upgrade failure (promotes Gmail health to a Briefing Decision item for briefing-2026-04-18). No Immediate re-dispatched — 15:09 WAT consolidated dispatch is still the authoritative alert for this trio; no new signal to justify a fresh ping. Aging will be folded into briefing-2026-04-18. Factors: urgency 1.0 · impact_scope 0.8 · cto_specificity 0.9 · pattern_significance 0.95 · accountability_alignment 1.0.
- [2026-04-17 20:09 WAT] — Heartbeat tick: P1 still active at 10h40m, 9h06m silent since Moses's 11:03 WAT. 7th consecutive silent tick. Tier 1 channel-read sweep zero new messages on NIBSS thread. Gmail MCP **RECOVERED** after 5-tick outage — no new NIBSS-relevant email. Jira MCP **RECOVERED** after 139h blackout — no NIBSS-tagged tickets in initial recovery query. No Immediate re-dispatched — 15:09 WAT consolidated dispatch remains authoritative. Briefing-2026-04-18 will carry this as overnight-silent P1 Decision item. Factors: urgency 1.0 · impact_scope 0.8 · cto_specificity 0.9 · pattern_significance 0.95 · accountability_alignment 1.0.
- [2026-04-18 17:09 WAT] — **RESOLUTION + RCA.** Heartbeat tick observed [[TDSD-6597]] transitioned to Completed / Resolution: Done at 16:47 WAT by [[Afeez Kazeem]]. Comment: "Transactions was reviewed end-to-end by Nibss and Moniepoint team and log level was increased on pos-tms to confirmed were transaction were drop. Fixed was applied and subsequent transactions started processing successfully on the route." Total active duration 31h18m. Pattern break: explicit resolution with RCA content breaks the 25h+ silence observed in briefing-2026-04-18 B6. Page retired this tick per bias-toward-retiring — active condition closed, monitoring adds no further signal. Briefing-2026-04-19 will carry this as pattern-break closure awareness item. Factors: urgency 0.3 (closure, not open) · impact_scope 0.6 · cto_specificity 0.5 · pattern_significance 0.9 (RC91 wave tracked closure with RCA) · accountability_alignment 0.9.
