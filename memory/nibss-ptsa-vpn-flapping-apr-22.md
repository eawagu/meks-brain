---
role: cto-teamapt
type:
  - "situation"
title: NIBSS PTSA — VPN Flapping Apr 22
status: retired
created: "2026-04-22T19:19:25Z"
summary: "NIBSS PTSA VPN → leased-line architectural transition Apr 22 19:17 WAT. **2026-04-25 17:10 WAT skim-tick — TDSD-6716 Completed at 16:20 WAT Apr 25 by Afeez Kazeem with closure RCA: \"Transaction are now been routed on Nibss lease line. The intermittent error has reduced.\" Resolution=Done, formal closure with RCA. Filing-to-close 29h02m. Confirms leased-line architectural transition (Apr 22 19:17 WAT) as root-cause-fix for the \"successful response not sent\" persistent error pattern. Bilateral-attribution-contested standoff bypassed by operational route change — re-escalation criterion (c) no longer needed (would have fired 20:10 WAT Apr 26). Status `stable` → `resolving`. Retirement candidate at next briefing tick if no new signals.** 1 post-transition response-not-sent instance per directive — directive moot given operational closure."
updated: "2026-04-26T05:32:22Z"
cssclasses:
  - "situation"
accountability: infrastructure-stability
---

**RETIRED 2026-04-26 06:10 WAT briefing tick.** Leased-line architectural transition (Apr 22 19:17 WAT) held stable through TDSD-6716 closure-with-RCA (Apr 25 16:20 WAT, "Transaction are now been routed on Nibss lease line. The intermittent error has reduced.") and through the planned firewall HA exercise window (TDSD-6699, opened 18:00 WAT Apr 25 with NIBSS card traffic temporarily reverted leased-line → VPN). Briefing-2026-04-26 06:10 WAT sweep covering 12h+ post-firewall-HA-window-open returned **zero PTSA-related signals across Slack/Jira/email** — no RC91 cycles, no response-not-sent observations, no NIBSS-side activity. Bilateral-attribution-contested standoff (peak 19:05 WAT Apr 24 NIBSS counter-reply on thread 19dc0ab7bafe02e0) bypassed unilaterally by operational route change. Re-escalation criteria (a) 2nd post-transition response-not-sent event, (b) TDSD-6716 elevation to P1, (c) standoff persists past 48h without RCA, (d) CTO-direct engagement — all moot or not triggered.

[[NIBSS]] PTSA (Payment Terminal Service Aggregator) VPN link exhibited three distinct flap cycles on Apr 22:
- **Cycle 1** — 11:33 WAT (brief, first observed)
- **Cycle 2** — 16:35–16:41 WAT (6 min, fast-resolved)
- **Cycle 3** — 16:51–16:55 WAT (4 min resurface, 10min gap after cycle 2)

At **19:17 WAT Apr 22**, all 4 NIBSS PTSA nodes were moved from the shared VPN path to **dedicated leased-line connectivity** — a structural architectural response rather than a tactical restart. This converted the failure mode from flap-prone shared-VPN to dedicated-circuit isolation.

**RESOLUTION CONFIRMED 2026-04-25 16:20 WAT.** [[TDSD-6716]] ("NIBSS|SUCCESSFUL RESPONSE NOT SENT|20260424") transitioned to **Completed / Resolution=Done** at 16:20:42 WAT Apr 25 by [[Afeez Kazeem]] (assignee + reporter) with closure RCA comment: *"Transaction are now been routed on Nibss lease line. The intermittent error has reduced."* Filing-to-close: 29h02m.

**Pattern observation captured for synthesis:** When bilateral attribution stalls, TeamApt-side operational fixes can close the situation independent of counterparty acknowledgment — adds to the recurring "silent-recovery-without-RCA" precedent (NIBSS DD Apr 14, NIBSS DD TDSD-6630 Apr 23) but inverted: this is TeamApt-side closure-with-RCA-of-route-change rather than counterparty silent recovery. CTO Oladapo never engaged the bilateral thread directly; resolution achieved without CTO intervention.

**Watchpoint persisted into entity pages:** any future NIBSS PTSA route signal (RC91 / response-not-sent / circuit-side outage) creates a fresh situation, not re-opens this one. The leased-line is the operational target state.

## Sources
Slack #teamapt-tech-operations 2026-04-22 11:33 WAT (Cycle 1); 2026-04-22 16:35 WAT (Cycle 2); 2026-04-22 16:51 WAT (Cycle 3); Oladapo Onayemi Slack post 2026-04-22 19:17 WAT (leased-line transition confirmed); Mustapha Ajibade Slack post 2026-04-25 17:26 WAT (firewall HA exercise notification); briefing-2026-04-22 A2; briefing-2026-04-23 A5 (10h47m stable); briefing-2026-04-24 A5 (34h52m stable → status `stable`); briefing-2026-04-25 A5; briefing-2026-04-26 A5 (retirement); Gmail thread 19db4e3461c204ea (Olamide pre-transition response-not-sent); Gmail thread 19dbec21731fddeb (Afeez post-transition watchpoint instance + NIBSS contested-attribution reply); Gmail thread 19dbf59f056a7ee0 (Afeez formal pattern-escalation Apr 24 11:56 WAT, CCing CTO Oladapo); Gmail thread 19dc0ab7bafe02e0 (NIBSS contested-attribution counter-reply 19:05 WAT Apr 24); jira [[TDSD-6716]] filed 10:18 WAT Apr 24 → **Completed/Done 16:20 WAT Apr 25 with leased-line RCA**; jira [[TDSD-6699]] firewall HA configuration deploying 18:00 WAT Apr 25 — no PTSA-side incidents observed in 12h+ post-window-open.

## Deltas
- [2026-04-22 11:33 WAT] — Cycle 1 observed (brief).
- [2026-04-22 16:35–16:41 WAT] — Cycle 2 (6min, fast-resolved).
- [2026-04-22 16:51–16:55 WAT] — Cycle 3 (4min resurface after 10min gap).
- [2026-04-22 19:17 WAT] — Architectural transition: all 4 nodes VPN → dedicated leased-line.
- [2026-04-23 06:10 WAT] — 10h47m stable post-transition.
- [2026-04-24 05:10 WAT] — 34h52m stable; status `developing` → `stable`.
- [2026-04-24 10:09–20:10 WAT] — Watchpoint signals: TDSD-6716 NEW; NIBSS attribution-contested reply; Mustapha pre-transition thread revival; Afeez formal pattern-escalation; NIBSS counter-reply 19:05 WAT (bilateral standoff explicit-on-record).
- [2026-04-25 17:10 WAT] — TDSD-6716 Completed/Done at 16:20:42 WAT Apr 25 with closure RCA. Status `stable` → `resolving`.
- [2026-04-25 18:10 WAT] — Firewall HA exercise window opened 18:00 WAT (TDSD-6699) — NIBSS card traffic temporarily reverted leased-line → VPN. Retirement candidacy deferred.
- **[2026-04-26 06:10 WAT — RETIREMENT]** — Briefing-2026-04-26 sweep covering 12h+ post-firewall-HA-window-open returned zero PTSA-related signals (Slack 0, Jira 0, email 0). VPN-flap-era failure modes (RC91 intermittent, response-not-sent) did NOT re-surface during the temporary VPN window — confirms leased-line was the necessary fix, not the only viable path. No new failure modes observed. Bilateral-attribution-contested standoff with NIBSS effectively closed (TeamApt resolved unilaterally; no further bilateral negotiation required for situation closure). **Status `resolving` → `retired`.** Per CLAUDE.md retirement-bias rule: when uncertain, retire — the active set is only as valuable as the signal it carries; this situation no longer carries forward signal beyond what's archived in entity pages and synthesis. Future NIBSS PTSA route signals create a fresh situation. Factors: source=brain-internal, retirement_criteria_met, leased_line_held_through_firewall_ha_window, zero_pta_signals_12h+_post_window_open, bilateral_standoff_unilaterally_bypassed, no_new_failure_modes, retirement_bias_apply.
