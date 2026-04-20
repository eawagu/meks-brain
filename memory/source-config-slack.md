---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T16:09:00Z. 17:09 WAT Full tick: Union Bank RC91 cycle 2 Apr 20 filed 16:22 WAT in #teamapt-tech-operations by Qazim Adedigba — 12m fast-cycle (16:22→16:34 WAT), bank auto-recovered, TDSD-6643 Resolved 16:41 WAT. 7th Union Bank cycle in 9 days (2nd today). All other Tier 1 channels minimal activity (go-subscribe routine chatter). Timestamp-error MISS on earlier Slack sweep (used 1745161740 2025 epoch instead of 1776697740 2026 epoch) — corrected this tick."
updated: "2026-04-20T16:22:06Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T16:09:00Z"
---

## Connection

Slack MCP (workspace-scoped). User ID for DM dispatch: U080PEXEZ0E. Tier 1 channels: #teamapt-tech-operations (C0ABU8GMW75), #account-switch-alerts (C098VUQCVRA), #teamapt-x-paystack-transfer-support (C096LCNP26P), #notifications-support-dev (C08PH35PLPK), #go-subscribe-by-teamapt (C090UHR9VDE).

## Directives

### Priority model
- Tier 1: listed channels above — read every tick.
- Tier 2: DMs mentioning the user — read every tick.
- Tier 3: keyword matches across public + private channels — apply per-message salience factors (channel identity, keyword floor, active-situation entity match, @mention, DM, sender weighting).

### Sweep order (Tier 1 read-by-default → search-all → pre-filter pipeline → per-message salience reasoning → cost cap)
1. Read Tier 1 channels and DMs every tick (fastest-path delta via channel read).
2. Search-all: keyword scan for Immediate-tier triggers per config-salience (P1, outage, RC91, RC05, breach, compromised, NIBSS).
3. Pre-filter: apply skip list and suspected-bot rules.
4. Per-message salience reasoning: apply factors to rank signals.
5. Cost cap: stop after N messages processed per tick.

### Skip list (confirmed-noise channels)
[Maintained via monthly skip-list regression review + weekly suspected-bot bulk-confirm per config-salience Periodic Reviews.]

### Timestamp-computation discipline (added 2026-04-20 17:09 WAT after MISS)
When computing Slack `oldest` parameter for channel reads, use the current year's epoch. **Correct formula for tick-window-start:** `tick-window-start` in Unix epoch seconds = current UTC timestamp minus window-length seconds. **Sanity check:** Unix epoch for 2026-04-20 is ~1776699600 (mid-day). If the computed value is below 1750000000 (= mid-2025), the computation has errored to a prior year — redo. Pattern observed: hand-derived epoch values silently used 2025 offsets when year wasn't explicitly anchored.

## Notes

Tick 2026-04-20 17:09 WAT Full-level.

**#teamapt-tech-operations — Union Bank RC91 cycle 2 Apr 20:**
- Cycle 2 opened 16:22 WAT, resolved 16:34 WAT (12m fast-cycle, bank auto-recovered) — within Union Bank fast-cycle envelope (14m prior floor; cycle 2 is new tightest at 12m).
- [[Qazim Adedigba]] filed P1 declaration in channel at 16:26:13 WAT; TDSD-6643 filed 16:28 WAT, Resolved 16:41 WAT with auto-recovery comment.
- **7th Union Bank cycle in 9 days** (Apr 12, 15, 16×2, 19, 20×2). 2nd cycle today after cycle 1 (6h39m, bank-resolved 07:56 WAT).
- **No Immediate dispatch** — B6 calibration precedent holds; fast-cycle within envelope, already-resolved at tick discovery. [[Union Bank — RC91 P1 Apr 20]] situation updated with cycle 2 delta (page remains retired).
- Factors: source=slack+jira, channel=teamapt-tech-operations, keyword=P1+RC91+Union, situation_delta, same_tick_open_and_close, within_envelope, pattern_compounding, 7_cycles_9_days.

**#go-subscribe-by-teamapt — routine operational chatter:**
- 4 messages in window: [[Nancy Muorah]] pinging [[Daniel Ojinaka]] about a call Dennis is on; Daniel acknowledging. Internal coordination, no operational incident. Awareness-tier.

**All other Tier 1 channels silent** — #account-switch-alerts (zero), #teamapt-x-paystack-transfer-support (zero), #notifications-support-dev (zero). Zero DMs to user. Tier 3 keyword sweep was impaired by earlier timestamp error; corrected reads show no additional Tier 1 signals.

**Calibration MISS captured — Slack timestamp error.** Earlier in this tick, initial Slack channel reads used epoch 1745161740 (2025-04-20 15:09 UTC) instead of the intended 1776697740 (2026-04-20 15:09 UTC). This caused the first-pass reads to return irrelevant 2025/early-2026 messages rather than the 16:09→17:09 WAT current-window content. Corrected on re-run; Union Bank cycle 2 was discovered in corrected sweep. Timestamp-computation discipline added to Directives as forcing function for future ticks. MISS: factor captured for tuning log under reliability/verification.

**Calibration pattern — multi-channel RC91 cycle density.** Three cycles in ~2h today via Slack (Union 14:27–14:33, Stanbic 15:04–16:00, Union 16:22–16:34 WAT). All bank-auto-recovered within envelope. B6 calibration holds across all three.
