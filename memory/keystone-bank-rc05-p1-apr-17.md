---
role: cto-teamapt
type:
  - "situation"
title: Keystone Bank — RC05 P1 Apr 17
status: developing
created: "2026-04-18T09:40:53Z"
summary: "Keystone Bank RC05 P1 filed 21:38 WAT Apr 17 by Olamide Ajibulu, start time 21:00 WAT, ongoing. First RC05 (unreadable card/chip) on the tracked wave — different failure mode from the dominant RC91 (Issuer or Switch Inoperative) pattern."
updated: "2026-04-18T15:21:49Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Keystone Bank]] RC05 P1 filed by [[Olamide Ajibulu]] in #teamapt-tech-operations at 21:38 WAT Apr 17 — start time 21:00 WAT, ongoing at filing. P1 was 13h29m active at the 10:29 WAT Apr 18 tick observation; silence on the thread held through the overnight window.

**Failure mode — distinction from the RC91 wave:**
- RC05 = "Do not honor" / unreadable card or chip — the bank is reachable and responding, but declining the transaction for a card-level reason.
- RC91 = "Issuer or Switch Inoperative" — the bank's switch is unreachable or returning no response.

These are structurally different failure modes. A Keystone RC05 P1 is NOT a continuation of the RC91 multi-bank wave ([[Stanbic Bank ATS — Persistent RC91 Pattern]], [[Access Bank — Multi-Track Failures]], [[Sterling + Polaris — Routes Degraded]], [[UBA Bank — RC91 P1 Apr 17]], [[Wema Bank — RC91 P1 Apr 17]], [[NIBSS PTSA — RC91 Apr 17]]). It is the first RC05 P1 in the current watch window on Keystone specifically, and a distinct pattern warrant — card-layer fault, not switch-layer fault.

Keystone does not have a dedicated situation page prior to this — tracked only via the [[Keystone Bank]] entity page. This P1 is the first Keystone cycle to warrant situation-level tracking.

**CTO posture:** No direct action — bank-side card-reader / ATS issue. Watch for resolution signal and compare duration against other RC05 cycles if any emerge. If RC05 spreads to additional banks, that is a distinct wave from RC91 and warrants separate framing.

**Downstream settlement signal (Apr 18):** TDSD-6615 "Keystone Settlement" filed 15:41 WAT Apr 18 by [[Olamide Ajibulu]] (Medium priority, INITIAL REVIEW, assigned [[Daniel Fetuga]]): "Keystone settlement for 17th april is awaiting requery." This is the expected reconciliation-layer consequence of the Apr 17 RC05 P1 — failed/disputed transactions need bank-side requery before settlement can close. The Jira signal is filed by the same person who filed the Slack P1, continuing ownership thread. Medium priority is consistent with the settlement being paperwork-resolvable rather than operationally blocking — no funds are at risk, just timing. If the requery drags into a second business day, priority may escalate.

## Sources
- Slack #teamapt-tech-operations, [[Olamide Ajibulu]] 21:38 WAT Apr 17 — P1 filing, start 21:00 WAT
- Jira TDSD-6615, [[Olamide Ajibulu]] → [[Daniel Fetuga]] 15:41 WAT Apr 18 — "Keystone settlement for 17th april is awaiting requery" (Medium, INITIAL REVIEW)

## Deltas
- [2026-04-18 10:29 WAT] — Situation opened at next tick after the Slack P1 filing. 13h29m active at observation, no resolution signal overnight. First RC05 P1 on the tracked wave; distinct failure mode from the dominant RC91 pattern.
- [2026-04-18 16:09 WAT] — TDSD-6615 Jira cross-track signal at 15:41 WAT: [[Olamide Ajibulu]] filed "Keystone Settlement" (Medium, INITIAL REVIEW, assigned [[Daniel Fetuga]]) with body "Keystone settlement for 17th april is awaiting requery." Interpreted as downstream reconciliation residue of Apr 17 RC05 P1 — failed-transaction requery is the expected settlement-layer consequence. Same-person ownership thread (Olamide filed both the Slack P1 and the Jira). Medium priority — settlement is paperwork-resolvable, not operationally blocking funds. Still no Slack-side resolution signal on the RC05 P1 itself — thread has been silent ~18h42m since filing at 21:38 WAT Apr 17. **No Immediate re-dispatch:** resolution-ambiguity on a known-tracked failure does not warrant Immediate; settlement requery is a known downstream process. Carries into briefing-2026-04-19 as pattern item — cross-track connection between operational P1 and settlement reconciliation is worth surfacing. Factors: urgency 0.3 · impact_scope 0.4 · cto_specificity 0.4 · pattern_significance 0.6 · accountability_alignment 0.7.