---
role: cto-teamapt
type:
  - "situation"
title: FCMB ATS — Route Turned Off May 5
status: developing
created: "2026-05-05T17:19:51Z"
summary: "FCMB ATS route turned off 14:17 WAT May 5 — Trigger #7 fires; bank concentration risk now 4 banks turned off (FCMB joins First Bank, Providus, Sterling). Origin: 12-day persistent transaction-failure trend on the previously escalated network layer; Tofunmi 08:06 WAT email \"FCMB: Increased Transaction Failure Rate\" → Ugochukwu Ebirika 14:17 WAT halt declaration → 14:31/14:37/14:51 WAT bank escalation cascade (\"Moniepoint has stopped processing transactions\") → 15:54 WAT Teams meeting link sent. Single-track-email escalation; no Slack post in Tier 1 channels. CTO Immediate DM dispatched 18:11 WAT."
updated: "2026-05-12T08:13:52Z"
cssclasses:
  - "situation"
accountability: ats-operations
---

[[FCMB]] ATS route turned off 14:17 WAT 2026-05-05 — Trigger #7 (route turned off) fires. Bank concentration risk increases — FCMB joins [[First Bank]], [[Providus]], and [[Sterling Bank]] in the turned-off-route set, taking the count to 4 banks turned off out of 17 PTSAs (per Daniel Armstrong's 15:04 WAT handover note: "13 of 17 PTSAs are currently operational. First bank, providus and sterling are turned off due to RC91 - MP decision. Fcmb transactions are turned off due to recent failures").

Distinct from the existing [[FCMB — RC06 P1 May 4]] (resolved May 4 14:24 WAT, RC06 card-decline cycle) and [[FCMB — RC91 P1 Apr 17]] (cycling RC91 pattern tracker). This route-off is the structural escalation: rather than one-cycle-at-a-time RC91/RC06 handling, ATS processing was paused at the network-layer infrastructure root.

## Filing chain (May 5 escalation cascade)

- **08:06 WAT** — [[Oluwatofunmi Obafemi]] (TeamApt SRE) email "FCMB: Increased Transaction Failure Rate" to [[Bashir Adeyemi]] / SwitchApplicationSupport@fcmb.com (CC: aptpaytechnicalsupport@teamapt.com, networkmanagement@teamapt.com, oladapo.onayemi@teamapt.com, Boluwatife.Agunbiade@fcmb.com): "We are observing and tracking a persistent transaction failure trend on the network layer that significantly impacts service delivery. Find attached 12 days' worth of failure data..." Gmail thread `19df72d768ca962d`.
- **14:17 WAT** — [[Ugochukwu Ebirika]] response: "Hello Bashir, Transaction processing via ATS has been temporarily halted following the increased intermittent failures on the previously escalated network layer. As discussed, we require a session with your team..." (CC: SwitchApplicationSupport, aptpaytechnicalsupport, networkmanagement, Oladapo, Abdulgafar Obeitor, Boluwatife Agunbiade, Adeluyi Olajide, ITNetworksecuritymanagement, Fumbi Lawrence). **First explicit declaration of route-off.**
- **14:31 WAT** — Aptpay support escalation to [[Oluwaseun Sonaike]] (FCMB): "Kindly advise on a suitable time to schedule a session with the TeamApt team to troubleshoot the recent increase in transaction failures observed at the network layer."
- **14:37 WAT** — Aptpay support escalation: "We kindly request your assistance on this matter as Moniepoint has stopped processing transactions." (CC: Bashir Adeyemi, Ugochukwu Ebirika, Rosemary Eniola, Oluwafemi Toyo, Daramola Babajide, Joel Olowo)
- **14:51 WAT** — Aptpay support last-call escalation: "Please we need your urgent assistance on this matter. Moniepoint is a high value customer for the Division and have now shut down transactions to FCMB due to recent..." (CC fan-out adds Olawale Fagbemi, chinyere.sanusi, Chukwuma Anokwuru)
- **15:04 WAT** — Daniel Armstrong shift handover to Afeez Kazeem (Gmail thread `19df6f0dbd148d14`) confirms FCMB route-off in operational status report: "Fcmb transactions are turned off due to recent failures."
- **15:54 WAT** — Aptpay support sent Microsoft Teams meeting link to FCMB (Oluwaseun Sonaike, Ugochukwu Ebirika, SwitchApplicationSupport, Oladapo, networkmanagement) — escalation transitions to live troubleshooting session.
- **18:11 WAT** — 18:00 pre-overnight heartbeat tick discovers this in 4h-window Gmail keyword sweep. **No Slack post in any Tier 1 channel** — single-track-email escalation. CTO Immediate DM dispatched.

## Triage classification

**Tier 1 (Immediate) — Trigger #7 fires.** Route turned off = direct revenue impact + capacity-planning consideration. CTO-DM dispatched 18:11 WAT.

**Trigger context:**
- Trigger #7 — route turned off (primary).
- Trigger #1 candidate — could be classified as new-P1 if Slack-side P1 post had been filed (none observed); the bilateral-email escalation pattern bypassed the structured P1 post entirely.
- 2h-since-halt threshold (Trigger #2) crossed at 16:17 WAT — ~4h elapsed at this tick observation since halt declaration.

**Bank concentration trajectory:**
- First Bank — turned off (CoralPay suite, briefing carryforward).
- Providus — turned off (CoralPay suite).
- Sterling — turned off (CoralPay suite, [[Sterling + Polaris — Routes Degraded]]).
- **FCMB — turned off May 5 14:17 WAT (this situation).**

4-bank concentration on turned-off routes is the structural-risk threshold. Engineering capacity to bring routes back depends on bank-side investigation (Bashir Adeyemi / Oluwaseun Sonaike for FCMB; Teams session 15:54 WAT is the open coordination thread).

## Pattern significance

**Single-track-email escalation pattern.** Like the May 4 FCMB RC06 cycle and the May 5 Union Bank "Failing generally" cycle, this halt declaration was filed via bilateral email only — no Slack post in Tier 1 channels. The single-track-Jira pattern from earlier weeks has now extended to single-track-email for structural decisions. Heartbeat coverage continues to be email-keyword-dependent for these signals; Slack-only sweep would have produced false-zero on the route-off declaration.

**12-day persistent network-layer trend** documented in Tofunmi's 08:06 WAT email. This is not a fast-cycle event — the failure pattern has been accumulating since ~April 23. The structural decision to halt at the network layer rather than continue cycle-by-cycle handling is the operational concession that pure bank-side coordination on individual cycles was not closing the loop.

**Connection to other May 5 signals:**
- [[Account Switch — Cloudflare Outage May 4]] — edge-layer concurrent disruption (resolved 15:30 WAT, partially overlapping the FCMB declaration window).
- Cisco ASA CVE-2020-3452 BISO email 09:09 WAT — infrastructure-tier vulnerability, possible converging edge-security signal.
- TDSD-6841 NIBSS DD redis cache failure 04:45-12:15 WAT (NIBSS DD recurring pattern, resolved).
- Union Bank Cycle 1+2 (13:47 WAT bank-resolved 16min; reopened 17:19 WAT TDSD-6856 active 52min at tick).

The May 5 day-of has produced an unusually dense cluster of bank-routing infrastructure failures across NIBSS DD + Cloudflare + FCMB + Union — without obvious common upstream signal but with cumulative impact on processing capacity.

## Sources

Gmail thread `19df72d768ca962d` (FCMB: Increased Transaction Failure Rate, 6 messages 08:06–15:54 WAT May 5); Gmail thread `19df6f0dbd148d14` (Duty Handover Note 20260505, Daniel Armstrong → Afeez Kazeem 15:04 WAT shift handover); briefing-2026-05-05 B1 (Cloudflare carryforward — separate but contemporaneous); related-bank entities: [[FCMB]], [[First City Monument Bank]], [[ATS]], [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]], [[Sterling + Polaris — Routes Degraded]].

## Deltas

- [2026-05-05 18:11 WAT] — Created. Route-off declaration 14:17 WAT (Ugochukwu Ebirika); 12-day persistent network-layer trend (Tofunmi 08:06 WAT). Bank concentration now 4 banks turned off out of 17 PTSAs. Single-track-email escalation; no Slack-side P1. CTO Immediate DM dispatched. Status: developing — pending bank-side investigation outcome and re-onboarding decision. Recommended next-tick observation: monitor Teams session outcome, watch for bank-side response from Oluwaseun Sonaike / Bashir Adeyemi, watch for Slack catch-up post or RCA narrative.

- [2026-05-10 06:10 WAT] — **B1 yesterday "Failing generally" trajectory resolved silently** between 02:44 WAT May 9 single-track-email filing and 23:11 WAT May 9 hourly report. FCMB not in 23:11 WAT off-list (CoralPay 4 + Access maint + Stanbic RC 91 = 6; FCMB operational). No Slack closure post, no formal bilateral resolution email observed in this tick's sweep — silent recovery typical of single-track-email "Failing generally" patterns when no route-off decision lands. Trajectory: returned to operation May 7 → fast-cycle RC91 May 8 02:08–02:35 WAT (27m) → "Failing generally" overnight May 9 02:44 WAT → silent recovery by 23:11 WAT (~20h cycle). FCMB stable as of May 10 06:10 WAT briefing tick. Within-pattern recurrence, no escalation needed.

- [2026-05-11 06:10 WAT] FCMB back operational — NOT in 3-off list per Olamide duty handover thread `19e14237833d5dfd` 23:05 WAT May 10 + Afeez Daily Report 15:18 WAT May 10 ("14 of 17 PTSAs operational. First bank, providus and sterling turned off"). Carryforward closure from briefing-2026-05-10 B8a (yesterday's resolution observation) operationally confirmed today via duty handover. Bank concentration normalization 5→3 off; FCMB transition from off-list (May 5 14:17 WAT halt declaration) → back operational (sometime between May 8 02:44 WAT "Failing generally" overnight email and May 9 23:11 WAT hourly report); persistent 3-off baseline = FBN/PVB/Sterling.

- [2026-05-12 09:04 WAT] — FCMB RC91 P1 overnight 01:36 WAT (Qazim Slack, Start 2:06 AM, "Services will be restarted" internal-cause). No TDSD ticket. Hourly Report 06:03 WAT shows FCMB NOT in off-list → restart implied performed, cycle silently resolved ~4h27m post-filing. New defect class hybrid: single-track-Slack + internal-cause + restart-completion-not-posted. briefing-2026-05-12 B2.