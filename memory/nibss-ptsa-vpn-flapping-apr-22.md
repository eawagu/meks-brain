---
title: NIBSS PTSA — VPN Flapping Apr 22
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: infrastructure-stability
role: cto-teamapt
created: "2026-04-22T19:19:25Z"
updated: "2026-04-22T19:19:25Z"
summary: "NIBSS PTSA VPN link flapped 3x on Apr 22 (11:33, 16:35, 16:51 WAT); at 19:17 WAT all 4 NIBSS PTSA nodes architecturally transitioned from VPN to dedicated leased-line — structural response to recurrent instability."
---

[[NIBSS]] PTSA (Payment Terminal Service Aggregator) VPN link exhibited three distinct flap cycles on Apr 22:
- **Cycle 1** — 11:33 WAT (brief, first observed)
- **Cycle 2** — 16:35–16:41 WAT (6 min, fast-resolved)
- **Cycle 3** — 16:51–16:55 WAT (4 min resurface, 10min gap after cycle 2)

At **19:17 WAT**, all 4 NIBSS PTSA nodes were moved from the shared VPN path to **dedicated leased-line connectivity** — a structural architectural response rather than a tactical restart. This converts the situation from "recurrent VPN instability" to "new connectivity mode under observation."

**Why this is a distinct situation.** Three flap cycles in a single day constitutes frequency-compounding on connectivity mode (prior baseline: occasional isolated flaps). The leased-line transition is today's novel structural signal — previous NIBSS PTSA situations ([[NIBSS PTSA — Route Failure Apr 16]], [[NIBSS PTSA — RC91 Apr 19]]) tracked RC91 decline-response patterns, not connectivity-mode changes.

**Intersection with active situations.** The [[NIBSS DD — Downtime P1 Apr 20]] situation (TDSD-6630) is connectivity-adjacent — NIBSS DD traffic routes through the same NIBSS edge. The leased-line transition is structurally relevant to whether DD recovery path depends on shared VPN or dedicated leased-line. Monitor for correlated DD recovery signals over the next 24–48h.

**What to watch next tick.**
- Any NIBSS PTSA RC91 or timeout signals on the leased-line path (confirms/refutes whether VPN was the root cause)
- Any latency / throughput deltas on leased-line vs prior VPN baseline
- Whether leased-line is interim or permanent — confirmation from [[Oladapo Onayemi]] / NIBSS edge team
- Correlation with NIBSS DD recovery trajectory

## Sources
slack #teamapt-tech-operations Apr 22 11:33 WAT (cycle 1); slack #teamapt-tech-operations Apr 22 16:35–16:55 WAT (cycles 2–3); slack #teamapt-tech-operations Apr 22 19:17 WAT (leased-line transition — 4 nodes migrated)

## Deltas
- [2026-04-22 20:00 WAT] — Situation created. 3 flap cycles today (11:33, 16:35, 16:51 WAT) plus architectural transition of all 4 PTSA nodes to leased-line at 19:17 WAT captured.
