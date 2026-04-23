---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "Ecobank NUS-node RC91. **2026-04-23 09:11 WAT — fresh cycle active.** Daniel Armstrong filed Apr 23 06:35 WAT to Ecobank ops (CUMECHIKELU/DCHUKWUJI/ologunsanya/MADEWUYI/OSOGA); Olamide chased at 08:52 WAT (\"persisted for over 2 hours\"). Bank-side silent. Status returns to developing — fresh thread 19db8d64f00a406d distinct from Apr 19 wait-state thread 19da60c7ea537e24. Immediate-tier dispatch sent to user self-DM (Gmail MCP recovery this tick is what enabled detection)."
updated: "2026-04-23T08:20:42Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Ecobank]] RC91 failures on NUS nodes had been marked resolved at 22:01 WAT Apr 16. The issue reopened 12:01 WAT Apr 17 when [[Afeez Kazeem]] escalated via email with a CSV sample of failed transactions. [[Adewuyi Mayowa]] pushed back in thread at 12:15 WAT ("Everything looks fine from this end") — attribution contested, no resolution action. The contested-attribution standoff held through the Apr 17 afternoon and evening briefings (surfaced as B3 on briefing-2026-04-17) and went silent overnight — no thread activity from 22:14 WAT Apr 17 through 16:09 WAT Apr 18, roughly 18 hours of quiet.

At 16:09:27 WAT Apr 18, Afeez escalated direct to Ecobank-side technical contacts (madewuyi@, ologunsanya@, cumechikelu@, dchukwuji@ecobank.com; CC aptpaytechnicalsupport) with subject "Ecobank | RC91 | 20260418" — body: "transactions failing intermittently with RC91." Gmail thread id 19da12452e0edb2e. This escalation goes around the internal Adewuyi "looks fine" posture by engaging the bank directly. At 16:36:41 WAT Afeez followed up on the same thread: "Dear Team, The intermittent RC91 persists. Kindly review." — 27 minutes after the initial message, reinforcing the escalation while the bank-side remains silent.

**Apr 18 20:17 WAT — third escalation step: Jira ticket filing.** [[Afeez Kazeem]] filed [[TDSD-6619]] "Re: Ecobank | RC91 | 20260418" (Medium priority, [System] Incident type) at 20:17:00 WAT.

**Apr 19 cycle and bank-side-next-mover state.** Daniel Armstrong filed fresh thread "Ecobank | RC91 | 20260419" at 15:01 WAT (id 19da60c7ea537e24) with OSOGA@ecobank.com added and Oladapo Onayemi CC'd; followed up at 15:56 WAT ("An update will be appreciated"). Adewuyi Mayowa replied at 16:29 WAT requesting samples — broke 24h+ silence with deferred-but-open posture (vs. the Apr 17 "looks fine" rejection). Afeez delivered samples at 17:24 WAT to Mayowa direct. The cycle entered a bank-side-next-mover wait-state at that point.

**Apr 20-22 wait-state and silent gap.** Bank-side stayed silent on thread 19da60c7ea537e24 across Apr 20 / Apr 21 / Apr 22 ticks. Gmail MCP went dark at the Apr 20 17:09 WAT tick and remained dark through Apr 22 — direct-verification of Mayowa-thread state was blocked. Surfaced as briefing-2026-04-22 B6 ("sample-response window 42h+ past, blocked on Gmail recovery") and briefing-2026-04-23 D5 ("B6 Ecobank unverified"). No new escalation cycle filed in this period (per Slack-side coverage).

**Apr 23 06:35 WAT — fresh cycle filed.** [[Daniel Armstrong]] filed new email thread 19db8d64f00a406d "Ecobank | RC91 | 20260423" at 05:35:30 UTC (06:35 WAT) — subject date advances to today, body is the standard escalation template ("Please be informed that transactions are failing with RC91. Kindly assist to review."). Recipients: CUMECHIKELU@, DCHUKWUJI@, ologunsanya@, MADEWUYI@, OSOGA@ecobank.com. CC: aptpaytechnicalsupport@teamapt.com, oladapo.onayemi@moniepoint.com. Distinct from the Apr 18 (19da12452e0edb2e) and Apr 19 (19da60c7ea537e24) threads — fresh thread, not a reply. Bank-side: no response from any Ecobank recipient.

**Apr 23 08:52 WAT — Olamide chase signals 2h+ duration.** [[Olamide Ajibulu]] replied on thread 19db8d64f00a406d at 07:52:58 UTC (08:52 WAT): "Please note that this failure has persisted for over 2 hours. Kindly assist to review." — 2h17m after the initial filing, reporter handoff from Daniel to Olamide, and the explicit duration-marker ("over 2 hours") is a config-salience trigger #2 condition ("P1 duration exceeds threshold — Active P1 with no resolution signal for >2 hours"). This produces an Immediate-tier event independent of the Apr 19 wait-state.

**Apr 23 09:11 WAT — Immediate dispatched.** Heartbeat at 09:11 WAT detected the email signal during the post-Gmail-MCP-recovery sweep. Slack #teamapt-tech-operations carries zero mirror — this is an EMAIL-ONLY signal (cross-source asymmetry, second observation in 24h after the Apr 23 06:44 WAT TDSD-6692 UBA fast-cycle Jira-only signal). Slack DM draft created in user self-DM (D081JT4AD0Q) with Immediate-tier framing and three-option recommendation (chase Mayowa direct / escalate via Oladapo / pre-empt with executive contact).

**Recovery context: Gmail MCP recovery is the gating factor.** Without the recovery this tick, the fresh Apr 23 cycle would have been invisible until the next briefing tick (06:00 WAT Apr 24). The Gmail dark-window (Apr 20 17:09 WAT → Apr 23 09:11 WAT, ~64h) overlapped both the Apr 18 thread silent-gap and the Apr 23 fresh filing. Gmail catch-up sweep is deferred to the next briefing tick per source-config-email policy — but this Immediate-tier item was prioritized for in-tick dispatch.

Whether each filing reflects a fresh RC91 cycle or re-escalation of the prior contested attribution cannot be determined from the email content — subject dates advance with the calendar (20260417 → 20260418 → 20260419 → 20260423) but the template body is identical. The Apr 23 cycle is treated as a fresh cycle for tracking purposes given the 96h+ gap since the last in-thread activity (Mayowa silence through Apr 19 sample-delivery).

## Sources
Gmail Afeez 2026-04-17 12:01 WAT (email with CSV sample); Slack Adewuyi Mayowa 2026-04-17 12:15 WAT (internal pushback); Gmail Afeez → Ecobank 2026-04-18 16:09 WAT (direct-to-bank escalation, thread 19da12452e0edb2e); Gmail Afeez 2026-04-18 16:36 WAT ("intermittent RC91 persists" follow-up, same thread); Jira TDSD-6619 2026-04-18 20:17 WAT (ticket filed) + 20:32 WAT (comment "escalated to the bank"); Gmail Daniel Armstrong 2026-04-19 15:01 WAT (fresh thread "Ecobank | RC91 | 20260419", thread id 19da60c7ea537e24, Oladapo CC'd for first time, OSOGA@ added as new Ecobank recipient); Gmail Daniel Armstrong 2026-04-19 15:56 WAT (same thread, 55m silence-follow-up "An update will be appreciated"); Gmail Adewuyi Mayowa 2026-04-19 16:29 WAT (same thread, reply "Please help reconfirm status. Also, please assist with samples to enable us check further" — breaks 24h silence); Gmail Afeez Kazeem 2026-04-19 17:24 WAT (same thread, reply "intermittent RC91 still persist. Attached are samples for your reference" — TeamApt-side sample delivery, message id 19da68f3ce758be7); **Gmail Daniel Armstrong 2026-04-23 06:35 WAT (fresh thread 19db8d64f00a406d "Ecobank | RC91 | 20260423")**; **Gmail Olamide Ajibulu 2026-04-23 08:52 WAT (same thread, 2h17m chase "persisted for over 2 hours")**; prior closure signal Slack #teamapt-tech-operations 2026-04-16 22:01 WAT

## Deltas
- [2026-04-17 12:01 WAT] — Reopened. Afeez email: "still getting intermittent RC91 for transaction" + CSV sample attached. Yesterday's 22:01 WAT resolution was premature.
- [2026-04-17 12:15 WAT] — Adewuyi Mayowa pushback in thread: "Everything looks fine from this end." Attribution contested; no resolution action.
- [2026-04-18 16:09 WAT] — 18h standoff silence broken by Afeez direct-to-bank escalation thread 19da12452e0edb2e.
- [2026-04-18 20:17 WAT] — TDSD-6619 ticket filing (third escalation step).
- [2026-04-19 15:01 WAT] — Daniel Armstrong fresh thread 19da60c7ea537e24, OSOGA@ added, Oladapo CC'd.
- [2026-04-19 15:56 WAT] — Daniel 55m silence-follow-up.
- [2026-04-19 16:29 WAT] — Mayowa replies requesting samples (24h+ silence broken with deferred-but-open posture).
- [2026-04-19 17:24 WAT] — Afeez delivers samples to Mayowa direct (bank-side-next-mover state begins).
- [2026-04-20 06:09 WAT] — Wait-state holds; reactivation threshold 17:24 WAT today.
- [2026-04-20 17:09 WAT → 2026-04-22 22:10 WAT] — Gmail MCP dark; thread state unverifiable. Surfaced as briefing-2026-04-22 B6 + briefing-2026-04-23 D5.
- [2026-04-23 06:35 WAT] — **Fresh cycle filed by Daniel Armstrong** — new thread 19db8d64f00a406d, standard escalation template, OSOGA@ already in recipient set, Oladapo CC'd. Bank-side silent at filing.
- [2026-04-23 08:52 WAT] — **Reporter handoff to Olamide Ajibulu** with explicit 2h+ duration-marker ("persisted for over 2 hours") on same fresh thread. Bank-side still silent — no Ecobank recipient has acknowledged either message.
- [2026-04-23 09:11 WAT] — Heartbeat full-tick: Gmail MCP recovered; fresh cycle detected. **Immediate-tier dispatch** triggered per config-salience #2 — Slack DM draft created in user self-DM (D081JT4AD0Q) with three-option recommendation. Cross-source asymmetry observed: zero Slack #teamapt-tech-operations mirror (2nd email-only/Jira-only signal in last 3h, after TDSD-6692 UBA fast-cycle at 06:44 WAT). No Apr 19-thread Mayowa response observed in the recovered Gmail window — original wait-state remains unanswered separately. Factors: source=email, keyword=RC91+Ecobank, sender=Daniel Armstrong+Olamide Ajibulu, situation_delta, fresh_cycle, p1_duration_exceeds_2h_threshold, bank_side_silent, cross_source_asymmetry_email_only.
