---
role: cto-teamapt
type:
  - "situation"
title: NIBSS PTSA — VPN Flapping Apr 22
status: stable
created: "2026-04-22T19:19:25Z"
summary: "NIBSS PTSA VPN link flapped 3x on Apr 22 (11:33, 16:35, 16:51 WAT); at 19:17 WAT all 4 NIBSS PTSA nodes architecturally transitioned from VPN to dedicated leased-line. **2026-04-24 06:10 WAT briefing tick: stable for 34h52m post-transition — crosses 24h threshold. Status `developing` → `stable`.** Zero PTSA-related signals since transition across Jira/Slack/email coverage."
updated: "2026-04-24T05:25:15Z"
cssclasses:
  - "situation"
accountability: infrastructure-stability
---

[[NIBSS]] PTSA (Payment Terminal Service Aggregator) VPN link exhibited three distinct flap cycles on Apr 22:
- **Cycle 1** — 11:33 WAT (brief, first observed)
- **Cycle 2** — 16:35–16:41 WAT (6 min, fast-resolved)
- **Cycle 3** — 16:51–16:55 WAT (4 min resurface, 10min gap after cycle 2)

At **19:17 WAT Apr 22**, all 4 NIBSS PTSA nodes were moved from the shared VPN path to **dedicated leased-line connectivity** — a structural architectural response rather than a tactical restart. This converted the failure mode from flap-prone shared-VPN to dedicated-circuit isolation.

**Stability trajectory post-transition:**
- [2026-04-22 19:17 WAT → 2026-04-23 06:10 WAT] — 10h47m stable; briefing-2026-04-23 A5 observation. `developing` held pending 24h threshold.
- [2026-04-23 06:10 WAT → 2026-04-23 22:09 WAT] — full Jira sweep (TDSD 21 deltas) + Slack sweep: zero PTSA-related signals. 26h52m stable at that observation.
- [2026-04-23 22:09 WAT → 2026-04-24 06:10 WAT] — overnight delegation window: zero Slack/Jira/email deltas on NIBSS PTSA.
- **Cumulative stable window at briefing-2026-04-24 compose: 34h52m.**

**Status transition applied 2026-04-24 05:10 WAT.** `developing` → `stable`. Stable threshold (24h) crossed at 19:17 WAT Apr 23 — missed 06:10 WAT Apr 23 briefing tick (at 10h47m, below threshold) but now ~11h past the gate.

**Next lifecycle considerations:**
- Stable is not terminal — leased-line could still exhibit new failure modes (latency spike, throughput degradation, circuit-side outage) distinct from the shared-VPN flap pattern.
- Retirement gate: either (a) a formal post-mortem + commissioning document confirming leased-line is the operational state going forward, or (b) sustained stable window sufficient to declare monitoring-add-no-value. No fixed duration — per-tick judgment.
- Watchpoint: monitor for any NIBSS PTSA-related signal emerging that doesn't match the flap pattern — could indicate a new failure mode on the leased-line itself.

## Sources
Slack #teamapt-tech-operations 2026-04-22 11:33 WAT (Cycle 1); 2026-04-22 16:35 WAT (Cycle 2); 2026-04-22 16:51 WAT (Cycle 3); Oladapo Onayemi Slack post 2026-04-22 19:17 WAT (leased-line transition confirmed); briefing-2026-04-22 A2 (multi-mode NIBSS PTSA pattern context); briefing-2026-04-23 A5 (10h47m stable observation); briefing-2026-04-24 A5 (34h52m stable → status transition to stable).

## Deltas
- [2026-04-22 11:33 WAT] — Cycle 1 observed (brief).
- [2026-04-22 16:35–16:41 WAT] — Cycle 2 (6min, fast-resolved).
- [2026-04-22 16:51–16:55 WAT] — Cycle 3 (4min resurface after 10min gap).
- [2026-04-22 19:17 WAT] — **Architectural transition** — all 4 nodes moved VPN → dedicated leased-line.
- [2026-04-23 06:10 WAT — observation] — 10h47m stable post-transition; `developing` held pending 24h threshold; briefing-2026-04-23 A5.
- [2026-04-23 19:17 WAT — implicit] — 24h stable threshold crossed (no active-observer tick at this exact time).
- [2026-04-24 05:10 WAT — observation] — 34h52m stable; briefing-2026-04-24 A5. **Status transitioned `developing` → `stable`.**
