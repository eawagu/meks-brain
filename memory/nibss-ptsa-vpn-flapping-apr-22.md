---
role: cto-teamapt
type:
  - "situation"
title: NIBSS PTSA — VPN Flapping Apr 22
status: stable
created: "2026-04-22T19:19:25Z"
summary: "NIBSS PTSA VPN link flapped 3x on Apr 22 (11:33, 16:35, 16:51 WAT); at 19:17 WAT all 4 NIBSS PTSA nodes architecturally transitioned from VPN to dedicated leased-line. **2026-04-24 06:10 WAT briefing tick: stable for 34h52m post-transition — crosses 24h threshold. Status `developing` → `stable`.** Zero PTSA-related signals since transition across Jira/Slack/email coverage."
updated: "2026-04-24T09:20:33Z"
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

**Status transition applied 2026-04-24 05:10 WAT.** `developing` → `stable`. Stable threshold (24h) crossed at 19:17 WAT Apr 23.

**Watchpoint signal — 2026-04-24 10:10 WAT — first post-leased-line non-flap signal on PTSA path.** [[Afeez Kazeem]] email thread 19dbec21731fddeb, 10:10 WAT, to `ptsa@nibss-plc.com.ng` (CC aptpaytechnicalsupport, mustapha.ajibade, oladapo.onayemi, ademola.adefemi@moniepoint, networkmanagement, oladipupo.sholotan@moniepoint). Subject: `NIBSS|SUCCESSFUL RESPONSE NOT SENT| 20260424`. Body excerpt: *"we observed that transactions with successful response to you between 09:34AM to 09:36AM were not being sent to Moniepoint. Kindly confirm why the responses for the..."* (truncated in index).

Mechanism: a 2-minute window (09:34–09:36 WAT Apr 24) in which NIBSS returned successful responses to TeamApt but those responses were not being propagated onward to Moniepoint. Self-resolved before filing — Afeez's email is an after-the-fact ask to NIBSS to confirm why the downstream propagation did not happen. **Distinct failure mode from VPN flap**: this is a response-routing / downstream-delivery signal, not a connectivity-layer flap. Consistent with the watchpoint noted in the situation body ("monitor for any NIBSS PTSA-related signal emerging that doesn't match the flap pattern — could indicate a new failure mode on the leased-line itself"), but the mechanism observed here is routing/forwarding rather than physical connectivity — so the leased-line itself is not obviously implicated.

**Status decision.** Held `stable`. A single 2-minute self-resolved event with ~post-event ask-to-confirm does not meet any re-escalation criterion — would need either repeat pattern (another response-not-sent window), duration threshold (unresolved >30min), or confirmed causality at leased-line layer (which this email does not establish). If a second response-not-sent signal fires in the next 48h, spin up a fresh situation page distinct from this one — the failure mode doesn't cleanly fit the VPN-flap frame.

**Next lifecycle considerations:**
- Stable is not terminal — leased-line could still exhibit new failure modes (latency spike, throughput degradation, circuit-side outage) distinct from the shared-VPN flap pattern.
- Retirement gate: either (a) a formal post-mortem + commissioning document confirming leased-line is the operational state going forward, or (b) sustained stable window sufficient to declare monitoring-add-no-value. No fixed duration — per-tick judgment.
- Watchpoint: monitor for any NIBSS PTSA-related signal emerging that doesn't match the flap pattern — could indicate a new failure mode on the leased-line itself.

## Sources
Slack #teamapt-tech-operations 2026-04-22 11:33 WAT (Cycle 1); 2026-04-22 16:35 WAT (Cycle 2); 2026-04-22 16:51 WAT (Cycle 3); Oladapo Onayemi Slack post 2026-04-22 19:17 WAT (leased-line transition confirmed); briefing-2026-04-22 A2 (multi-mode NIBSS PTSA pattern context); briefing-2026-04-23 A5 (10h47m stable observation); briefing-2026-04-24 A5 (34h52m stable → status transition to stable); Gmail thread 19dbec21731fddeb 10:10 WAT 2026-04-24 (Afeez Kazeem → ptsa@nibss-plc.com.ng, response-not-sent watchpoint signal).

## Deltas
- [2026-04-22 11:33 WAT] — Cycle 1 observed (brief).
- [2026-04-22 16:35–16:41 WAT] — Cycle 2 (6min, fast-resolved).
- [2026-04-22 16:51–16:55 WAT] — Cycle 3 (4min resurface after 10min gap).
- [2026-04-22 19:17 WAT] — **Architectural transition** — all 4 nodes moved VPN → dedicated leased-line.
- [2026-04-23 06:10 WAT — observation] — 10h47m stable post-transition; `developing` held pending 24h threshold; briefing-2026-04-23 A5.
- [2026-04-23 19:17 WAT — implicit] — 24h stable threshold crossed (no active-observer tick at this exact time).
- [2026-04-24 05:10 WAT — observation] — 34h52m stable; briefing-2026-04-24 A5. **Status transitioned `developing` → `stable`.**
- [2026-04-24 10:09 WAT — watchpoint signal] — Afeez Kazeem email to NIBSS PTSA (thread 19dbec21731fddeb) reporting 2-minute "successful response not sent to Moniepoint" discrepancy window 09:34–09:36 WAT Apr 24. Self-resolved event, ask-to-confirm framing. Distinct failure mode from VPN flap (response-routing / downstream-delivery rather than connectivity). Single occurrence below re-escalation threshold; status held `stable`. If a second response-not-sent signal fires within 48h, spin up a fresh situation page for the non-flap failure mode. Factors: source=email, active_situation_entity_match=nibss_ptsa, distinct_failure_mode_from_flap, self_resolved_2min_window, watchpoint_match, no_status_change, single_occurrence_below_reescalation, monitoring_for_pattern_formation.
