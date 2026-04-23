---
role: cto-teamapt
type:
  - "situation"
title: NIBSS PTSA — VPN Flapping Apr 22
status: developing
created: "2026-04-22T19:19:25Z"
summary: "NIBSS PTSA VPN link flapped 3x on Apr 22 (11:33, 16:35, 16:51 WAT); at 19:17 WAT all 4 NIBSS PTSA nodes architecturally transitioned from VPN to dedicated leased-line. 2026-04-23 06:10 WAT briefing tick: leased-line held stable 10h47m overnight with zero operational signals. Status remains `developing` pending 24h stable threshold (would transition at 19:17 WAT Apr 23 tick if quiet continues)."
updated: "2026-04-23T05:34:29Z"
cssclasses:
  - "situation"
accountability: infrastructure-stability
---

[[NIBSS]] PTSA (Payment Terminal Service Aggregator) VPN link exhibited three distinct flap cycles on Apr 22:
- **Cycle 1** — 11:33 WAT (brief, first observed)
- **Cycle 2** — 16:35–16:41 WAT (6 min, fast-resolved)
- **Cycle 3** — 16:51–16:55 WAT (4 min resurface, 10min gap after cycle 2)

At **19:17 WAT Apr 22**, all 4 NIBSS PTSA nodes were moved from the shared VPN path to **dedicated leased-line connectivity** — a structural architectural response rather than a tactical restart. This converted the situation from "recurrent VPN instability" to "new connectivity mode under observation."

**Overnight Apr 22–23 stable window (first observation post-transition).** 22:00 WAT Apr 22 → 06:10 WAT Apr 23: full Tier 1 Slack sweep returned zero operational signals; zero PTSA-related flap signals; zero Jira deltas on NIBSS PTSA tickets. **Cumulative stable window at 06:10 WAT Apr 23 tick: 10h47m.** Not yet sufficient to transition status from `developing` to `stable` (24h stable is the lower bound; current window ~45% of that). If 19:17 WAT Apr 23 tick confirms 24h stable, status transitions to `stable`.

**Why this is a distinct situation.** Three flap cycles in a single day constitutes frequency-compounding on connectivity mode (prior baseline: occasional isolated flaps). The leased-line transition is today's novel structural signal — previous NIBSS PTSA situations ([[NIBSS PTSA — Route Failure Apr 16]], [[NIBSS PTSA — RC91 Apr 19]]) tracked RC91 decline-response patterns, not connectivity-mode changes.

**Intersection with active situations — Apr 23 update.** The [[NIBSS DD — Downtime P1 Apr 20]] situation (TDSD-6630) is connectivity-adjacent — NIBSS DD traffic routes through the same NIBSS edge. The leased-line transition tested the hypothesis that DD recovery path depends on shared VPN vs. leased-line. **Result: TDSD-6630 did not move in response to the leased-line transition through the overnight window** — confirms ticket-specific behavioral silence on TDSD-6630 rather than connectivity-layer-blocked silence. This rules out shared-VPN contention as a contributor to the DD silence.

**What to watch next tick.**
- Any NIBSS PTSA RC91 or timeout signals on the leased-line path (confirms/refutes whether VPN was the root cause of Apr 22 flaps)
- Any latency / throughput deltas on leased-line vs prior VPN baseline
- Whether leased-line is interim or permanent — confirmation from [[Oladapo Onayemi]] / NIBSS edge team
- 24h stable threshold check at 19:17 WAT Apr 23 tick (if continuing quiet, transition status to `stable`)

## Sources
slack #teamapt-tech-operations Apr 22 11:33 WAT (cycle 1); slack #teamapt-tech-operations Apr 22 16:35–16:55 WAT (cycles 2–3); slack #teamapt-tech-operations Apr 22 19:17 WAT (leased-line transition — 4 nodes migrated); overnight Slack sweep 22:00 WAT Apr 22 → 06:10 WAT Apr 23 (zero operational signals across 5 Tier 1 channels)

## Deltas
- [2026-04-22 20:00 WAT] — Situation created. 3 flap cycles today (11:33, 16:35, 16:51 WAT) plus architectural transition of all 4 PTSA nodes to leased-line at 19:17 WAT captured.
- [2026-04-23 06:10 WAT] — **Overnight stable window confirmed: 10h47m leased-line stable post-transition.** Full Tier 1 Slack sweep 22:00 WAT Apr 22 → 06:10 WAT Apr 23 returned zero operational signals; zero PTSA flap signals; zero Jira deltas. Surfaced as briefing-2026-04-23 A5 (positive signal, early observation). **Secondary finding: leased-line transition did NOT propagate to TDSD-6630 ticket-level activity** — NIBSS DD silence unchanged through overnight, ruling out shared-VPN contention hypothesis and confirming TDSD-6630 silence is ticket-specific behavioral (see [[NIBSS DD — Downtime P1 Apr 20]] Apr 23 delta). Status remains `developing` pending 24h stable threshold (checkpoint: 19:17 WAT Apr 23 tick). Factors: source=slack+brain-internal, leased_line_10h47m_stable, under_24h_threshold, connectivity_hypothesis_ruled_out_for_tdsd6630, watch_19_17_WAT_apr_23_for_24h_transition.
