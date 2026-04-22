---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T16:09:00Z. 17:09 WAT Full tick: Union Bank RC91 cycle 2 Apr 20 filed 16:22 WAT in #teamapt-tech-operations by Qazim Adedigba — 12m fast-cycle (16:22→16:34 WAT), bank auto-recovered, TDSD-6643 Resolved 16:41 WAT. 7th Union Bank cycle in 9 days (2nd today). All other Tier 1 channels minimal activity (go-subscribe routine chatter). Timestamp-error MISS on earlier Slack sweep (used 1745161740 2025 epoch instead of 1776697740 2026 epoch) — corrected this tick."
updated: "2026-04-22T12:06:27Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-22T11:45:00Z"
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

Tick 2026-04-22 ~12:45 WAT — catch-up Full briefing covering 43.5h window since last_processed=2026-04-20T16:09:00Z. briefing-2026-04-21 never fired (see briefing-2026-04-22 B5).

**#teamapt-tech-operations — heavy activity across window:**

Resolved in window (9 P1s, one P2→resolved):
- Union Bank RC91 Apr 20 16:22 WAT → 12m auto-recovery (thread resolved; 7th cycle, already captured pre-tick in prior source-config-slack notes)
- NIBSS PTSA RC96 Apr 20 17:42 WAT → 1h3m (thread-resolved)
- Stanbic Bank RC91 Apr 21 04:43 WAT → 3m auto (services restart worked)
- Fidelity Bank RC91 Apr 21 03:45 WAT → 4h27m (2h34m initial + resurface + final close)
- Keystone Bank RC91 Apr 21 08:45 WAT → 6m auto
- NIBSS PTSA RC91 Apr 21 09:30 WAT → 10m auto (self-closed in parent message)
- NIBSS PTSA VPN FLAP Apr 21 13:20 WAT → 1m (self-closed)
- Access Bank RC91 Apr 22 02:11 WAT → 39m bank-resolved
- NIBSS PTSA failure-to-send Apr 22 11:33 WAT → 3m auto (self-closed)

**Silent-unresolved at tick time (Immediate-tier):**
- Polaris Bank RC91 (Switch) Apr 21 08:44 WAT — 28h+ active, no thread-level resolution
- UBA Bank RC96 across board (Switch) Apr 21 10:45 WAT — 26h+ active, **NEW failure mode** (prior UBA was RC91)
- CoralPay Bank FBN RC91 (Switch) Apr 22 05:09 WAT — 7h+ active

Batch CTO-direct DM drafted to U080PEXEZ0E for Oladapo escalation. Captured in briefing-2026-04-22 B1.

**Silent-Briefing-tier:**
- NIBSS DD P2 pending mandates Apr 22 10:40 WAT — ~2h active at tick, P2 (not P1) so no Immediate dispatch. 3rd NIBSS DD mandate-failure in 8 days (Apr 14 retired, Apr 20 TDSD-6630 silent 53h+, Apr 22 new P2). Captured in briefing-2026-04-22 B4.

**Other Tier 1 channels:** No direct reads performed this tick beyond #teamapt-tech-operations — the incident density in Tier 1 primary channel absorbed the sweep budget. Cost cap holds. Next tick should reassess #account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev, #go-subscribe-by-teamapt.

**Deployment notification:** Aptent Services 11pm Apr 21 (rest-service, bank-cashout-service, card-transaction-routing-service), TDSD-6562. Reaction (white_check_mark) + 1 thread reply Apr 22 07:13 WAT → inferred successful deployment. MPG+Resync sink information propagation and dynamic log-level control features now live. Captured in briefing-2026-04-22 A5.

**Calibration pattern — silent-resolution vs truly-active.** Search for "Issue resolved" in channel returned exactly 5 matches mapping to the 5 explicitly-resolved P1 threads. The 3 Immediate-tier items (Polaris/UBA/CoralPay) have no such match — confirming they are factually still open, not merely silent-recovered. This calibrates the B1 Factors: `absence_of_in_channel_resolution` is a reliable signal when combined with `duration_exceeds_historical_envelope`.
