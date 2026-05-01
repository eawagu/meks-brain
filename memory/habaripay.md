---
type:
  - "entity"
title: HabariPay
aliases:
  - "Habari Pay"
  - "HABARIPAY"
  - "Habari"
created: 2026-04-11
summary: "Nigerian payment processor — GTBank's acquiring arm. **3rd RC91 P1 cycle in 5 days now active 4h28m+ at 09:09 WAT Apr 29** (Afeez 04:41 WAT start, single-track Slack-only — no Jira, no email bilateral, zero Slack messages since initial post — record-duration outlier vs prior 25m/7m envelope). Trigger #2 (>2h) crossed; absence-of-signal Immediate firing; re-dispatched combined Slack DM with Ecobank fresh P1. Situation-creation threshold firmly crossed."
updated: "2026-05-01T05:43:52Z"
cssclasses:
  - "entity"
---

## Overview

[[HabariPay]] is a Nigerian payment processor. It operates in two roles relevant to TeamApt/Moniepoint:
1. Integrated with Moniepoint for DCIR chargebacks and payout automation.
2. Serves as [[GTBank]]'s acquiring arm for Direct Debit and switch routing — TeamApt/Moniepoint transactions routed to GTB flow through Habari infrastructure.

## Card Failure Rate — week of Apr 24, 2026 (per [[CEO Gazette - 24th April 26]])

HabariPay's card failure rate held steady at **0.72%** (slight improvement WoW). Insulated from the [[JULS Card Crisis]] that hit JULS ACCESS (68.18%) and JULS FCMB (25%) on Apr 23 — confirms the fault line is JULS-specific, not industry-wide. Note: this card-rail performance signal sits adjacent to the RC91 P1 cycles tracked below — the two surfaces fail independently.

## Switch-Route RC91 Pattern

**2026-04-24 18:30–18:55 WAT — first RC91 P1 cycle on Habari (GTB) switch route.** [[Olamide Ajibulu]] filed a structured P1 post in #teamapt-tech-operations at 18:36:58 WAT:
- Product: Switch
- Incident Summary: \"P1: Habari (GTB) RC 91 Failures\"
- Start Time: 18:30 WAT
- End Time: 18:55 WAT
- Duration: 25 min
- Identified Cause: \"From Habari\"
- Resolution Action: Escalated to the Habari team for resolution.

**This was the first RC91 observation on HabariPay in the brain.** RC91 wave (cycling across Access, Stanbic, Wema, FCMB, UBA, Fidelity, Union, NIBSS PTSA, Keystone, Ecobank, Polaris, and Sterling/CoralPay since Apr 8–10) extends to Habari as a distinct processor-layer surface — not an issuer ATS failure but a processor-layer failure that affects GTB-routed traffic. Fast-cycle 25min bank-resolved pattern consistent with other RC91 cycles on the tracked issuer set. Apr 24 entity directive: \"If a 2nd Habari RC91 cycle fires within ~48h, spin up a situation page.\"

**2026-04-25 00:49–00:50 WAT — TDSD-6726 Habari RC 91 Problem ticket created and Completed by [[Olamide Ajibulu]]** documenting the Apr 24 25min cycle as post-incident closure (description: \"This were failures that lasted for 25minutes\"). Standard end-of-shift Jira hygiene; not a fresh failure.

**2026-04-25 02:06–02:13 WAT — Apr 25 cycle layer 1: VPN-flap with RC91 persists.** [[Qazim Adedigba]] structured Slack post in #teamapt-tech-operations: \"Status: Habari VPN tunnel was briefly disconnected, RC 91 issue persists. Resolution Action: VPN autoreconnected. Start Time 02:06 AM End Time 02:13 AM Duration 7 Minutes.\" VPN-tunnel-flap layer auto-recovered in 7min, but **RC91 issue persisted independently of the VPN flap** — important fault-domain signal: the flap was an embedded sub-event in an already-active failure, not the cause.

**2026-04-25 02:20 WAT hourly report — Habari + Zenith failing RC91 escalated to partners.** Qazim hourly report (thread 19dc23924c6ed10a): \"10 of 17 routes are operational. Coralpay banks (FBN, PVB, and SBP) were turned off due to business decisions. **Habari and Zenith transactions are failing with RC 91, escalated to the partners for resolution.**\" Continues into Saturday morning. No closure signal observed at briefing-2026-04-25 06:09 WAT tick.

**Apr 24 → Apr 25 cycle progression (~7h45m gap closure-to-recurrence):**
- Apr 24 18:55 WAT — first cycle bank-resolved.
- Apr 25 02:06 WAT — VPN flap layer (sub-event in active failure window, ~7h11m after Apr 24 closure).
- Apr 25 02:20 WAT — hourly report confirms RC91 ongoing, escalated to partners.

**2nd cycle within 48h crosses the situation-creation threshold per the Apr 24 directive above.** Briefing-2026-04-25 D2 captures the systemic frame (multi-bank degradation overnight). Situation page spin-up deferred to user triage — preferred framing depends on whether the user wants Habari-specific tracking or broader Apr 25 multi-bank wave tracking.

## Fault-domain localization

From Apr 24 cycle: Olamide's Identified Cause \"From Habari\" indicates TeamApt ops localized the fault upstream of GTB issuer core — meaning the failure was in Habari infrastructure (processor/routing layer), not GTB's own ATS nodes. Apr 25 VPN-flap-with-RC91-persistence layer reinforces this: RC91 was active before the VPN-tunnel sub-event and continued after VPN auto-recovery, so the underlying failure is not VPN-tunnel-stability but processor-layer something else. This is a meaningful distinction for pattern taxonomy:
- Issuer ATS RC91 (e.g., Stanbic, Access, Wema) — failures in bank's own switch nodes.
- Processor-layer RC91 (e.g., Habari, NIBSS PTSA) — failures in intermediary routing infrastructure.
- Both failure modes manifest as RC91 (Issuer or Switch Inoperative) to downstream acquirers, but RCAs and escalation paths differ.

**2026-04-29 — third RC91 P1 cycle in 5 days, record-duration outlier still active at 09:09 WAT.** [[Afeez Kazeem]] structured P1 post in #teamapt-tech-operations at 05:39 WAT Apr 29 — Slack `slack_send_message` actual filing time slightly after the start: \"Product: Switch, Incident Summary: P1: Habari RC 91 Failures, Identified Cause: From the bank, Resolution Action: Escalated to Habari for review, Start Time 04:41 AM, Ongoing.\" Briefing-2026-04-29 B1 dispatched Immediate at 06:10 WAT (1h29m active at briefing tick). **At 09:09 WAT post-briefing tick the cycle is still active 4h28m+ with zero subsequent Slack messages on Habari since the original 04:41 WAT post — single-track Slack-only filing pattern continues (no Jira ticket, no email bilateral with Habari/GTBank).** Trigger #2 (>2h) crossed 2h28m ago; absence-of-signal Immediate rule (1h no update) firing. Re-dispatched as combined Immediate Slack DM at 09:09 WAT alongside Ecobank fresh P1.

This cycle's duration is a record outlier on Habari: prior cycles were Apr 24 25min bank-resolved, Apr 25 7min VPN-flap (RC91 persisted independently). 4h28m+ is ~10× the prior worst-case envelope. Two interpretations remain plausible: (a) silently bank-resolved without Slack closure post — consistent with Wema/UBA implicit-resolve historical pattern on tracked banks, where P1s self-resolve bank-side without human closure; (b) actually stuck in record-duration cycle pending Habari/GTBank engagement. Briefing B1 already framed both paths; the new 09:09 WAT data point is the additional 3h of silence since briefing dispatch. Per briefing-2026-04-30 B6 18:10 WAT update, Habari was 37h28m silent (no Slack/email/Jira signal across overnight) — silence dominant, consistent with implicit silent-resolved interpretation.

**3rd Habari/GTB-route RC91 cycle in 5 days** (Apr 24 / Apr 25 / Apr 29) — situation-creation threshold from Apr 24 directive is now firmly crossed.

## 2026-04-30 — Fourth RC91 P1 cycle in 7 days, silent-resolved overnight

**2026-04-30 18:11 WAT — fourth Habari RC91 P1 cycle filed by Qazim, posted 5 minutes AFTER briefing-2026-04-30 18:09 WAT pre-overnight tick was finalized — narrowly missed yesterday's briefing capture.** [[Qazim Adedigba]] structured Slack post in #teamapt-tech-operations: "Product: Switch, Incident Summary: P1: Habari RC 91 Failures, Identified Cause: From the partner, Resolution Action: The issue was escalated to the partner for investigation and resolution, Start Time 6:11 PM, Ongoing." Single-track Slack-only filing pattern continues — no Jira ticket, no email bilateral with Habari/GTBank.

**Implicit silent-resolved overnight per Hourly Report 22:49 WAT Apr 30** — Qazim hourly report `19ddf84ce7d7422b`: "13 of 17 routes are operational. Coralpay banks (FBN, PVB, and SBP) were turned off due to business decisions. Ecobank transactions are failing with RC 91" — only 4 routes off (Coralpay 3 + Ecobank); **Habari NOT in turned-off list**, implicit operational again. End-time inferred between 18:11 WAT (start) and ≤22:49 WAT (operational by overnight handover) — duration ≤4h38m, **consistent with Apr 29 4h28m+ silent-resolve precedent** (silent-resolve pattern strengthens to 3 consecutive cycles).

**4-cycle pattern across 7 days:**
- Apr 24: 25 min bank-resolved (explicit closure)
- Apr 25: 7 min VPN flap with RC91 persistence (explicit closure on VPN, RC91 silent-resolved)
- Apr 29: 4h28m+ silent-resolved (no closure post)
- Apr 30: ≤4h38m silent-resolved (no closure post)

Single-track Slack-only filing pattern (no Jira, no email bilateral) is now stable across all 4 cycles. Bank/partner-side resolution without human closure post is the established disposition. **Situation-page creation directive ("if 2nd RC91 cycle within 48h spin up situation page") long since crossed.** Briefing-2026-05-01 B3 surfaces situation-page creation as Decision item with high confidence — recommended title `[[HabariPay — RC91 Recurring]]` or analogous to capture 4-cycle pattern, single-track-Slack-only filing trend, and silent-resolve bank-side dispositioning.

## Other References

Mentioned in [[TeamApt Operations and Support Annual OKR 2026]], [[AptPay Direct Debit - OKR Planning Q2 2026]]. Per [[TeamApt MANCo Meeting - 31 March 2026]]: banks not on TeamApt's ATS can integrate via Coral Pay / HabariPay partnerships (DD Payment Facilitator role).

## Related
- [[GTBank]]
- [[Habari Pay]]
- [[Direct Debit]]
- [[Olamide Ajibulu]]
- [[Qazim Adedigba]]
- [[RC91 Multi-Bank Failure Pattern]]
- [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]]
- [[JULS Card Crisis]]
- [[CEO Gazette - 24th April 26]]
- [[TeamApt MANCo Meeting - 31 March 2026]]
