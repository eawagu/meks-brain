---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "Ecobank compound failure Apr 23 — 3 RC91 cycles same day + DCIR portal inaccessibility ([[TDSD-6711]]). Cycle A 06:35-10:19 WAT (bank-claim-unverified), Cycle B 14:38 WAT (re-surfaced 17:36 WAT), Cycle C 17:36 WAT onward merging into portal-inaccessibility discovery 21:33 WAT → TDSD-6711 22:32 WAT Qazim self-assigned. Route explicitly listed as failing RC 91 in Qazim's 21:36 + 23:03 WAT hourly reports; Qazim→Daniel 23:06 WAT duty handover confirms route off going into Friday. Mayowa attribution-mismatch pattern now 3-for-3 week-to-date: Apr 17 \"looks fine from this end\" + Apr 23 morning \"processing successfully now\" + Apr 23 afternoon \"fine now\" — all three followed by continued TeamApt-observed failures. Surfaced as briefing-2026-04-24 D1 (CTO-direct escalation option pending)."
updated: "2026-04-24T05:24:50Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Ecobank]] RC91 failures on NUS nodes had been marked resolved at 22:01 WAT Apr 16. The issue reopened 12:01 WAT Apr 17 when [[Afeez Kazeem]] escalated via email with a CSV sample of failed transactions. [[Adewuyi Mayowa]] pushed back in thread at 12:15 WAT ("Everything looks fine from this end") — attribution contested, no resolution action. The contested-attribution standoff held through the Apr 17 afternoon and evening briefings (surfaced as B3 on briefing-2026-04-17) and went silent overnight — no thread activity from 22:14 WAT Apr 17 through 16:09 WAT Apr 18, roughly 18 hours of quiet.

At 16:09:27 WAT Apr 18, Afeez escalated direct to Ecobank-side technical contacts (madewuyi@, ologunsanya@, cumechikelu@, dchukwuji@ecobank.com; CC aptpaytechnicalsupport) with subject "Ecobank | RC91 | 20260418" — body: "transactions failing intermittently with RC91." Gmail thread id 19da12452e0edb2e. This escalation goes around the internal Adewuyi "looks fine" posture by engaging the bank directly. At 16:36:41 WAT Afeez followed up on the same thread: "Dear Team, The intermittent RC91 persists. Kindly review." — 27 minutes after the initial message, reinforcing the escalation while the bank-side remains silent.

**Apr 18 20:17 WAT — third escalation step: Jira ticket filing.** [[Afeez Kazeem]] filed [[TDSD-6619]] "Re: Ecobank | RC91 | 20260418" (Medium priority, [System] Incident type) at 20:17:00 WAT.

**Apr 19 cycle and bank-side-next-mover state.** Daniel Armstrong filed fresh thread "Ecobank | RC91 | 20260419" at 15:01 WAT (id 19da60c7ea537e24) with OSOGA@ecobank.com added and Oladapo Onayemi CC'd; followed up at 15:56 WAT ("An update will be appreciated"). Adewuyi Mayowa replied at 16:29 WAT requesting samples — broke 24h+ silence with deferred-but-open posture (vs. the Apr 17 "looks fine" rejection). Afeez delivered samples at 17:24 WAT to Mayowa direct. The cycle entered a bank-side-next-mover wait-state at that point.

**Apr 20-22 wait-state and silent gap.** Bank-side stayed silent on thread 19da60c7ea537e24 across Apr 20 / Apr 21 / Apr 22 ticks. Gmail MCP went dark at the Apr 20 17:09 WAT tick and remained dark through Apr 22 — direct-verification of Mayowa-thread state was blocked. Surfaced as briefing-2026-04-22 B6 ("sample-response window 42h+ past, blocked on Gmail recovery") and briefing-2026-04-23 D5 ("B6 Ecobank unverified"). No new escalation cycle filed in this period (per Slack-side coverage).

**Apr 23 — compound failure day: three RC91 cycles + DCIR portal inaccessibility.**

**Cycle A (morning — bank claim resolution, not Slack-closed).** At 06:35 WAT [[Daniel Armstrong]] filed fresh thread 19db8d64f00a406d "Ecobank | RC91 | 20260423"; recipients CUMECHIKELU/DCHUKWUJI/ologunsanya/MADEWUYI/OSOGA@ecobank.com, CC aptpaytechnicalsupport + Oladapo Onayemi. Fresh thread, not a reply. At 08:52 WAT [[Olamide Ajibulu]] chased on same thread: "Please note that this failure has persisted for over 2 hours." — duration-marker crosses config-salience #2 Immediate threshold; reporter handoff Daniel→Olamide. At 09:11 WAT the post-Gmail-MCP-recovery heartbeat detected the signal and dispatched Immediate DM draft to self-DM D081JT4AD0Q with three-option recommendation. Slack formal P1 filing at 09:38 WAT arrived 27min after the 09:11 tick observation — asymmetry reclassified to sequencing lag, Ecobank dropped from the cross-source tracker. At 10:19 WAT Adewuyi Mayowa broke bank-side silence: "Please help reconfirm status now. Transactions are processing successfully now." 10:33 WAT follow-up attached status evidence. Cycle-A Slack P1 (message_ts 1776934715) left End Time: Ongoing — no TeamApt-side closure post across 09:38 WAT → 15:47 WAT (~6h9m).

**Cycle B (afternoon — resurfaced in-cycle).** At 14:38 WAT [[Olamide Ajibulu]] filed fresh email thread 19dbac740631c4f9 "Ecobank | RC91 | 20260423" to Ecobank recipients: "Please be informed that transactions are failing with RC91." At 15:50 WAT Mayowa replied "Please help reconfirm status now." 16:01 WAT Qazim "We will route and revert." 16:37 WAT Qazim "Transactions are processing fine now." **17:36 WAT Qazim "Please note that the issue has resurfaced. Kindly assist review."** Cycle B resolution interval (16:37 → 17:36 WAT = 59min) did not hold — resurfaced within 1h of bank-claim-confirmed.

**Cycle C — merges into portal-inaccessibility discovery.** At 17:36 WAT RC91 resurface announced (per cycle B thread). Qazim's **17:29 WAT hourly report** had listed only FBN/PVB/SBP as turned off (no Ecobank mention). Qazim's **21:36 WAT hourly report** "Ecobank transactions are failing with RC 91" — route now explicitly listed as off. At 21:33 WAT Qazim filed fresh email thread 19dbc43766215aeb: "We are having issue accessing the Ecobank DCIR portal." At 22:32 WAT Qazim self-filed [[TDSD-6711]] (Medium priority, [System] Incident type, "Ecobank | ATS | Portal Inaccessibility | 20260423") — Work in Progress status at tick time. **23:03 WAT hourly report** "Ecobank transactions are failing with RC 91" reaffirmed.

**Overnight duty handover 23:06 WAT Apr 23.** Qazim → Daniel Armstrong email thread 19dbc98466cdafc5: "Current System Status: 12 of 17 routes are operational. Coralpay banks (FBN, PVB, and SBP) were turned off due to business decisions. Ecobank transactions..." (body continues but explicitly listing Ecobank as failing per the paired hourly reports). Daniel acknowledged 23:21 WAT.

**Mayowa attribution-mismatch pattern — 3-for-3 week-to-date.**
1. **Apr 17 12:15 WAT:** "Everything looks fine from this end" → continued TeamApt-observed failures.
2. **Apr 23 10:19 WAT:** "Transactions are processing successfully now" → re-surfaced in cycle B ~5.5h later.
3. **Apr 23 16:37 WAT:** "Transactions are processing fine now" → resurfaced 59min later (17:36 WAT).

Bank-side monitoring is not matching TeamApt-observed failures. This is the structural question surfaced in briefing-2026-04-24 D1 — not cycle handling, but whether bank-side visibility into the RC91 failures is reliable.

**Compound framing — cycles + portal layer.** The three RC91 cycles on Apr 23 + the DCIR portal inaccessibility are distinct failure modes on the same bank integration:
- **Transaction-routing layer (RC91):** live traffic failing with "Issuer or Switch Inoperative" — bank's production switching environment.
- **Admin-portal layer (TDSD-6711):** TeamApt-side cannot access Ecobank DCIR portal to investigate, reconcile, or coordinate dispute-resolution work.

Both layers down simultaneously reduces TeamApt's operational-visibility and mitigation-coordination capacity on Ecobank.

**Situation lifecycle:** remains `developing` — cycle B/C did not cleanly close, portal layer open, bank-side attribution pattern suggests bank-side monitoring gap. Route turned off as ops-lead mitigation is the current TeamApt posture. `resolving` requires either (a) both layers validated recovery with Slack closure post or (b) route re-enabled with TeamApt-validated stability.

**Next-check gate:** briefing-2026-04-24 D1 option 1 (CTO-direct Slack DM to [[Oladapo Onayemi]] framing compound pattern) vs option 2 (trust ops-lead handling) vs option 3 (hold to briefing-2026-04-25) — user disposition pending.

## Sources
Gmail Afeez 2026-04-17 12:01 WAT (email with CSV sample); Slack Adewuyi Mayowa 2026-04-17 12:15 WAT (internal pushback); Gmail Afeez → Ecobank 2026-04-18 16:09 WAT (direct-to-bank escalation, thread 19da12452e0edb2e); Gmail Afeez 2026-04-18 16:36 WAT ("intermittent RC91 persists" follow-up); Jira TDSD-6619 2026-04-18 20:17 WAT; Gmail Daniel Armstrong 2026-04-19 15:01 WAT (thread 19da60c7ea537e24); Gmail Daniel 2026-04-19 15:56 WAT; Gmail Adewuyi Mayowa 2026-04-19 16:29 WAT; Gmail Afeez 2026-04-19 17:24 WAT (samples delivered); Gmail Daniel 2026-04-23 06:35 WAT (cycle-A thread 19db8d64f00a406d); Gmail Olamide 2026-04-23 08:52 WAT (2h chase); Slack #teamapt-tech-operations 2026-04-23 09:38 WAT (Olamide cycle-A Slack P1, message_ts 1776934715); Gmail Olamide 2026-04-23 10:18 WAT (Mayowa direct chase); Gmail Adewuyi Mayowa 2026-04-23 10:19 WAT (bank-side silence broken, resolution claim); Gmail Adewuyi Mayowa 2026-04-23 10:33 WAT (attached status evidence); Gmail Olamide Ajibulu 2026-04-23 14:38 WAT (cycle-B email thread 19dbac740631c4f9); Slack #teamapt-tech-operations 2026-04-23 15:54 WAT (Olamide cycle-B formal P1); Gmail Mayowa 2026-04-23 15:50 WAT (reconfirm prompt); Gmail Qazim 2026-04-23 16:37 WAT (cycle-B fine-now); **Gmail Qazim 2026-04-23 17:36 WAT (cycle-B resurface)**; **Gmail Qazim 2026-04-23 17:29 WAT hourly report**; **Gmail Qazim 2026-04-23 21:33 WAT (portal inaccessibility email thread 19dbc43766215aeb)**; **Jira TDSD-6711 2026-04-23 22:32 WAT filing (Qazim self-assigned)**; **Gmail Qazim 2026-04-23 21:36 WAT + 23:03 WAT hourly reports (Ecobank explicitly RC 91 failing)**; **Gmail Qazim → Daniel 2026-04-23 23:06 WAT duty handover (route off)**

## Deltas
- [2026-04-17 12:01 WAT] — Reopened. Afeez email: "still getting intermittent RC91" + CSV sample.
- [2026-04-17 12:15 WAT] — Adewuyi Mayowa pushback: "Everything looks fine from this end." Attribution contested.
- [2026-04-18 16:09 WAT] — 18h standoff broken by Afeez direct-to-bank escalation thread 19da12452e0edb2e.
- [2026-04-18 20:17 WAT] — TDSD-6619 ticket filing.
- [2026-04-19 15:01 WAT] — Daniel Armstrong fresh thread 19da60c7ea537e24, OSOGA@ added, Oladapo CC'd.
- [2026-04-19 15:56 WAT] — Daniel 55m silence-follow-up.
- [2026-04-19 16:29 WAT] — Mayowa replies requesting samples (24h+ silence broken).
- [2026-04-19 17:24 WAT] — Afeez delivers samples.
- [2026-04-20 → 2026-04-22] — Wait-state; Gmail MCP dark; briefing-2026-04-22 B6 + briefing-2026-04-23 D5.
- [2026-04-23 06:35 WAT] — **Cycle A filed** (Daniel Armstrong, fresh thread 19db8d64f00a406d).
- [2026-04-23 08:52 WAT] — Reporter handoff to Olamide; 2h+ duration-marker.
- [2026-04-23 09:11 WAT] — Heartbeat Immediate dispatch cycle-A, Slack DM draft.
- [2026-04-23 09:38 WAT] — Slack formal P1 cycle-A arrives 27min post-tick; asymmetry reclassified.
- [2026-04-23 10:19 WAT] — **Cycle-A bank-side resolution claim** (Adewuyi Mayowa, "processing successfully now").
- [2026-04-23 10:33 WAT] — Mayowa follow-up with attached status evidence.
- [2026-04-23 09:38 WAT → 15:47 WAT] — Cycle-A Slack P1 never closed by TeamApt-side (6h9m of open P1 with no validation post).
- [2026-04-23 14:38 WAT] — **Cycle B filed** — Olamide email thread 19dbac740631c4f9.
- [2026-04-23 15:47 WAT] — Cycle B Start Time declared; Slack P1 15:54 WAT.
- [2026-04-23 16:11 WAT — observation] — Heartbeat 16:11 WAT tick: cycle B 24min active. Immediate-tier dispatch: DM draft in self-DM D081JT4AD0Q.
- [2026-04-23 16:37 WAT] — **Cycle B bank-claim-fine** (Qazim, "processing fine now") — 59min before resurface.
- [2026-04-23 17:36 WAT] — **Cycle B resurface** (Qazim, "issue has resurfaced").
- [2026-04-23 17:29 WAT] — Qazim hourly report: Ecobank not yet listed as turned off (only FBN/PVB/SBP).
- [2026-04-23 21:33 WAT] — **Portal-layer issue surfaced** — Qazim email thread 19dbc43766215aeb "issue accessing the Ecobank DCIR portal."
- [2026-04-23 21:36 WAT] — Qazim hourly report: Ecobank explicitly listed as failing RC 91.
- [2026-04-23 22:32 WAT] — **[[TDSD-6711]] filed** — Qazim self-assigned, Work In Progress. Distinct from RC91 cycles — DCIR portal access failure.
- [2026-04-23 23:03 WAT] — Qazim hourly report reaffirms Ecobank RC 91.
- [2026-04-23 23:06 WAT] — Qazim → Daniel duty handover: route off going into overnight delegation window.
- [2026-04-24 05:10 WAT — observation] — briefing-2026-04-24 compose. Overnight Slack clean; no TeamApt-side cycle-B/C closure; TDSD-6711 no updates since 22:32 WAT filing. Mayowa attribution-mismatch pattern now 3-for-3 week-to-date; compound-failure framing surfaced as D1. Situation remains `developing`; route still off.
