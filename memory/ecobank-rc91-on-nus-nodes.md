---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "Ecobank NUS-node RC91 — **cycle #2 opened 15:47 WAT Apr 23, 24min active at tick**. Fresh Slack P1 by Olamide Ajibulu in #teamapt-tech-operations at 15:54 WAT + paired email at 15:38 WAT. Morning cycle claimed resolved 10:19 WAT by Adewuyi Mayowa (\"processing successfully now\"); re-failed ~5.5h later — bank's recovery claim was transient or incomplete. Immediate-tier DM draft dispatched. Total same-day cycle count: 2. Situation status `developing`."
updated: "2026-04-23T15:24:51Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Ecobank]] RC91 failures on NUS nodes had been marked resolved at 22:01 WAT Apr 16. The issue reopened 12:01 WAT Apr 17 when [[Afeez Kazeem]] escalated via email with a CSV sample of failed transactions. [[Adewuyi Mayowa]] pushed back in thread at 12:15 WAT ("Everything looks fine from this end") — attribution contested, no resolution action. The contested-attribution standoff held through the Apr 17 afternoon and evening briefings (surfaced as B3 on briefing-2026-04-17) and went silent overnight — no thread activity from 22:14 WAT Apr 17 through 16:09 WAT Apr 18, roughly 18 hours of quiet.

At 16:09:27 WAT Apr 18, Afeez escalated direct to Ecobank-side technical contacts (madewuyi@, ologunsanya@, cumechikelu@, dchukwuji@ecobank.com; CC aptpaytechnicalsupport) with subject "Ecobank | RC91 | 20260418" — body: "transactions failing intermittently with RC91." Gmail thread id 19da12452e0edb2e. This escalation goes around the internal Adewuyi "looks fine" posture by engaging the bank directly. At 16:36:41 WAT Afeez followed up on the same thread: "Dear Team, The intermittent RC91 persists. Kindly review." — 27 minutes after the initial message, reinforcing the escalation while the bank-side remains silent.

**Apr 18 20:17 WAT — third escalation step: Jira ticket filing.** [[Afeez Kazeem]] filed [[TDSD-6619]] "Re: Ecobank | RC91 | 20260418" (Medium priority, [System] Incident type) at 20:17:00 WAT.

**Apr 19 cycle and bank-side-next-mover state.** Daniel Armstrong filed fresh thread "Ecobank | RC91 | 20260419" at 15:01 WAT (id 19da60c7ea537e24) with OSOGA@ecobank.com added and Oladapo Onayemi CC'd; followed up at 15:56 WAT ("An update will be appreciated"). Adewuyi Mayowa replied at 16:29 WAT requesting samples — broke 24h+ silence with deferred-but-open posture (vs. the Apr 17 "looks fine" rejection). Afeez delivered samples at 17:24 WAT to Mayowa direct. The cycle entered a bank-side-next-mover wait-state at that point.

**Apr 20-22 wait-state and silent gap.** Bank-side stayed silent on thread 19da60c7ea537e24 across Apr 20 / Apr 21 / Apr 22 ticks. Gmail MCP went dark at the Apr 20 17:09 WAT tick and remained dark through Apr 22 — direct-verification of Mayowa-thread state was blocked. Surfaced as briefing-2026-04-22 B6 ("sample-response window 42h+ past, blocked on Gmail recovery") and briefing-2026-04-23 D5 ("B6 Ecobank unverified"). No new escalation cycle filed in this period (per Slack-side coverage).

**Apr 23 — two fresh cycles same day.**

**Cycle A (morning — resolution-adjacent then re-opened).** At 06:35 WAT [[Daniel Armstrong]] filed fresh thread 19db8d64f00a406d "Ecobank | RC91 | 20260423"; recipients CUMECHIKELU/DCHUKWUJI/ologunsanya/MADEWUYI/OSOGA@ecobank.com, CC aptpaytechnicalsupport + Oladapo Onayemi. Fresh thread, not a reply. At 08:52 WAT [[Olamide Ajibulu]] chased on same thread: "Please note that this failure has persisted for over 2 hours." — duration-marker crosses config-salience #2 Immediate threshold; reporter handoff Daniel→Olamide. At 09:11 WAT the post-Gmail-MCP-recovery heartbeat detected the signal and dispatched Immediate DM draft to self-DM D081JT4AD0Q with three-option recommendation. Slack formal P1 filing at 09:38 WAT arrived 27min after the 09:11 tick observation — asymmetry reclassified to sequencing lag, Ecobank dropped from the cross-source tracker. At 10:19 WAT Adewuyi Mayowa broke bank-side silence: "Please help reconfirm status now. Transactions are processing successfully now." 10:33 WAT follow-up attached status evidence. Total cycle-A active: ~3h44m (06:35 WAT → 10:19 WAT). Shifted to TeamApt-next-mover posture awaiting reconfirm. Slack P1 (message_ts 1776934715) left End Time: Ongoing — no TeamApt-side closure post across 09:38 WAT → 15:47 WAT (~6h9m).

**Cycle B (afternoon — re-opened / new cycle).** At 15:47 WAT RC91 failures **re-surfaced**. At 15:38 WAT [[Olamide Ajibulu]] filed fresh email to Ecobank (CUMECHIKELU/DCHUKWUJI/ologunsanya/MADEWUYI/OSOGA@ecobank.com, CC aptpaytechnicalsupport) subject "Ecobank | RC91 | 20260423" (thread id 19dbac740631c4f9): "Please be informed that transactions are failing with RC91. Kindly assist to review." At 15:54 WAT Olamide filed **fresh Slack P1** in #teamapt-tech-operations: Start Time 15:47 WAT, Identified Cause "From the bank", End Time Ongoing. Observation at 16:11 WAT heartbeat tick: cycle-B active 24min; cycle-A Slack P1 still not closed. **Interpretation:** the 10:19 WAT bank-side "processing successfully now" claim either never validated cleanly on TeamApt live monitoring or held only transiently — failures re-emerged within ~5.5h. This matches the Apr 17 precedent where Adewuyi's "looks fine from this end" claim preceded continued TeamApt-observed failures.

**Cycle-A / Cycle-B relationship — competing interpretations (per Behavioral Principle 1).**
- **Frame 1: Morning cycle never fully resolved; afternoon is continuation.** Bank claimed recovery at 10:19 WAT but TeamApt never posted Slack closure — the implicit signal is that monitoring never validated the claim. Cycle B is the same incident re-surfacing on live traffic.
- **Frame 2: Morning cycle resolved (bank did fix something); afternoon is distinct re-degradation.** Cycle B is a new cycle per standard tracking convention — fresh email thread, fresh Slack P1 filing, different start time.
- Evidence available to decide: TeamApt-side monitoring data from the 10:33 WAT → 15:47 WAT window is not yet visible to brain. Under the 24h operational window, these two cycles count as same-day cluster regardless of internal relationship — the practical posture is the same (escalate to bank for day-level recurrence pattern).

**Dispatch (16:11 WAT tick).** Immediate-tier DM draft created in user self-DM D081JT4AD0Q framing (a) cycle-B urgency — bank response needed within 1h before 2h Immediate-duration threshold at 17:47 WAT, (b) cycle-A resolution claim under-validation — 10:33 WAT bank claim needs to be withdrawn or qualified given re-emergence, (c) Oladapo-side evidence question — did cycle A ever cleanly close on TeamApt processors or were failures continuing quietly. 

**Situation lifecycle:** remains `developing` — re-opened from the resolution-adjacent posture morning cycle had reached. Cycle B must resolve (bank response + TeamApt monitoring validation + Slack closure post) before `resolving` becomes plausible. The Apr 17 contested-attribution precedent remains in play: bank may claim resolution while TeamApt continues to observe failures.

## Sources
Gmail Afeez 2026-04-17 12:01 WAT (email with CSV sample); Slack Adewuyi Mayowa 2026-04-17 12:15 WAT (internal pushback); Gmail Afeez → Ecobank 2026-04-18 16:09 WAT (direct-to-bank escalation, thread 19da12452e0edb2e); Gmail Afeez 2026-04-18 16:36 WAT ("intermittent RC91 persists" follow-up); Jira TDSD-6619 2026-04-18 20:17 WAT; Gmail Daniel Armstrong 2026-04-19 15:01 WAT (thread 19da60c7ea537e24); Gmail Daniel 2026-04-19 15:56 WAT; Gmail Adewuyi Mayowa 2026-04-19 16:29 WAT; Gmail Afeez 2026-04-19 17:24 WAT (samples delivered); Gmail Daniel 2026-04-23 06:35 WAT (cycle-A thread 19db8d64f00a406d); Gmail Olamide 2026-04-23 08:52 WAT (2h chase); Slack #teamapt-tech-operations 2026-04-23 09:38 WAT (Olamide cycle-A Slack P1, message_ts 1776934715); Gmail Olamide 2026-04-23 10:18 WAT (Mayowa direct chase); Gmail Adewuyi Mayowa 2026-04-23 10:19 WAT (bank-side silence broken, resolution claim); Gmail Adewuyi Mayowa 2026-04-23 10:33 WAT (attached status evidence); **Gmail Olamide Ajibulu 2026-04-23 15:38 WAT (cycle-B email thread 19dbac740631c4f9 "Ecobank | RC91 | 20260423")**; **Slack #teamapt-tech-operations 2026-04-23 15:54 WAT (Olamide cycle-B formal P1, Start Time 15:47 WAT, End Time Ongoing)**; prior closure signal Slack #teamapt-tech-operations 2026-04-16 22:01 WAT

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
- [2026-04-23 09:38 WAT → 15:47 WAT] — **Cycle-A Slack P1 never closed by TeamApt-side** (6h9m of open P1 with no validation post).
- [2026-04-23 15:38 WAT] — **Cycle B filed** — Olamide Ajibulu new email thread 19dbac740631c4f9 "Ecobank | RC91 | 20260423" (standard escalation template to same Ecobank recipients). Morning cycle's "recovery" claim effectively voided by re-emergence.
- [2026-04-23 15:47 WAT] — **Cycle B Start Time declared.**
- [2026-04-23 15:54 WAT] — **Cycle B Slack P1 filing** by Olamide Ajibulu in #teamapt-tech-operations (Start Time 15:47 WAT, End Time Ongoing, "escalated to the bank for resolution").
- [2026-04-23 16:11 WAT — observation] — Heartbeat 16:11 WAT tick: cycle B 24min active. Immediate-tier dispatch: DM draft created in self-DM D081JT4AD0Q. Frame: bank's morning claim needs qualification + cycle-B response needed within 1h before 2h threshold at 17:47 WAT + Oladapo-side evidence question about cycle-A live-monitoring. Factors: source=slack+email, fresh_cycle_same_day, bank_recovery_claim_under_validation, cycle_a_never_closed, apr17_contested_attribution_precedent, immediate_dispatch.
