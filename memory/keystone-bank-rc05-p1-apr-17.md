---
title: Keystone Bank — RC05 P1 Apr 17
type:
  - "situation"
cssclasses:
  - "situation"
role: cto-teamapt
status: developing
accountability: Technology Reliability and Security
created: "2026-04-18T09:40:53Z"
updated: "2026-04-18T09:40:53Z"
summary: "Keystone Bank RC05 P1 filed 21:38 WAT Apr 17 by Olamide Ajibulu, start time 21:00 WAT, ongoing. First RC05 (unreadable card/chip) on the tracked wave — different failure mode from the dominant RC91 (Issuer or Switch Inoperative) pattern."
---

[[Keystone Bank]] RC05 P1 filed by [[Olamide Ajibulu]] in #teamapt-tech-operations at 21:38 WAT Apr 17 — start time 21:00 WAT, ongoing at filing. P1 was 13h29m active at the 10:29 WAT Apr 18 tick observation; silence on the thread held through the overnight window.

**Failure mode — distinction from the RC91 wave:**
- RC05 = "Do not honor" / unreadable card or chip — the bank is reachable and responding, but declining the transaction for a card-level reason.
- RC91 = "Issuer or Switch Inoperative" — the bank's switch is unreachable or returning no response.

These are structurally different failure modes. A Keystone RC05 P1 is NOT a continuation of the RC91 multi-bank wave ([[Stanbic Bank ATS — Persistent RC91 Pattern]], [[Access Bank — Multi-Track Failures]], [[Sterling + Polaris — Routes Degraded]], [[UBA Bank — RC91 P1 Apr 17]], [[Wema Bank — RC91 P1 Apr 17]], [[NIBSS PTSA — RC91 Apr 17]]). It is the first RC05 P1 in the current watch window on Keystone specifically, and a distinct pattern warrant — card-layer fault, not switch-layer fault.

Keystone does not have a dedicated situation page prior to this — tracked only via the [[Keystone Bank]] entity page. This P1 is the first Keystone cycle to warrant situation-level tracking.

**CTO posture:** No direct action — bank-side card-reader / ATS issue. Watch for resolution signal and compare duration against other RC05 cycles if any emerge. If RC05 spreads to additional banks, that is a distinct wave from RC91 and warrants separate framing.

## Sources
- Slack #teamapt-tech-operations, [[Olamide Ajibulu]] 21:38 WAT Apr 17 — P1 filing, start 21:00 WAT

## Deltas
- [2026-04-18 10:29 WAT] — Situation opened at next tick after the Slack P1 filing. 13h29m active at observation, no resolution signal overnight. First RC05 P1 on the tracked wave; distinct failure mode from the dominant RC91 pattern.