---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives. last_processed 2026-04-22T14:15:00Z. 14:15 WAT Full tick: NIBSS DD P2 cycle (10:40→13:05 WAT, 2h25m resolved); 15:11 WAT NIBSS customer-facing comms retraction (carryforward signal); 3 Immediate items (Polaris/UBA/CoralPay) remain silent-unresolved with zero thread replies since briefing-2026-04-22 B1 dispatch was drafted but not sent (awaits user action). Tool anomaly: slack_read_channel for C0ABU8GMW75 with Unix oldest returned empty despite slack_search_public showing in-window messages — worked around via search path, not root-caused."
updated: "2026-04-22T14:24:22Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-22T14:15:00Z"
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
When computing Slack `oldest` parameter for channel reads, use the current year's epoch. **Correct formula for tick-window-start:** `tick-window-start` in Unix epoch seconds = current UTC timestamp minus window-length seconds. **Sanity check:** Unix epoch for 2026-04-22 is ~1776870000 (mid-day). If the computed value is below 1750000000 (= mid-2025), the computation has errored to a prior year — redo. Pattern observed: hand-derived epoch values silently used 2025 offsets when year wasn't explicitly anchored.

### Date-modifier avoidance (added 2026-04-22 14:15 WAT)
Do not use `after:YYYY-MM-DD` Slack search modifiers for same-day windows — observed to exclude same-day messages in at least one sweep. **Preferred path:** explicit Unix epoch `after` parameter via `slack_search_public`. Verified working at 1776858300 (2026-04-22 ~14:05 WAT).

### slack_read_channel anomaly (added 2026-04-22 14:15 WAT, not yet root-caused)
Observed this tick: `slack_read_channel` for channel C0ABU8GMW75 with `oldest=<valid Unix epoch>` returned empty result set despite `slack_search_public` with same Unix epoch returning in-window messages from the same channel. Workaround: route through search path when channel read returns empty-but-contradicted-by-search. **Not generalized yet** — single data point. If reproducible on next tick, codify as Tier 1 sweep-order amendment (search-first for C0ABU8GMW75) and open an investigation note.

## Notes

### Tick 2026-04-22 ~12:45 WAT — catch-up Full briefing

Covering 43.5h window since last_processed=2026-04-20T16:09:00Z. briefing-2026-04-21 never fired (see briefing-2026-04-22 B5).

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

### Tick 2026-04-22 ~14:15 WAT — post-briefing Full sweep

Window: 11:45 → 14:15 WAT (2.5h delta since prior tick).

**NIBSS DD P2 cycle closed.** The 10:40 WAT Apr 22 signal that surfaced as briefing-2026-04-22 B4 reached thread-level resolution at 13:05 WAT — duration 2h25m. Updated [[NIBSS DD — Downtime P1 Apr 20]] situation with delta. Pattern confirmation: 3-in-9-days NIBSS DD cycles, with Apr 22 cycle reaching explicit close while Apr 20 TDSD-6630 remains silent 53h+. Retirement of TDSD-6630 situation deferred to briefing-2026-04-23 pending next-tick resolution of 15:11 WAT carryforward signal.

**15:11 WAT NIBSS customer-facing comms retraction** observed in-channel. Ambiguous signal — could be housekeeping retraction of stale Apr 20 comms, or fresh NIBSS-side disruption starting. Next-tick watch determines. No situation spawned pre-emptively; tracked as carryforward in NIBSS DD situation Deltas.

**3 Immediate items unchanged.** Read threads for the 3 active Immediate items (Polaris RC91, UBA RC96, CoralPay RC91) — zero replies since briefing compose time. `absence_of_in_channel_resolution` calibration remains valid. Items stay open; B1 batch DM to Oladapo still awaits user dispatch authorization — no re-dispatch from brain side per triage-pending-user-action state.

**Other Tier 1 channels (this tick's reassessment):** #account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev, #go-subscribe-by-teamapt were attempted but `slack_read_channel` behavior anomaly (see Directives — slack_read_channel anomaly) limited coverage. Fell back to search-path keyword scans with no Immediate-tier hits. **Partial coverage** acknowledged — if anomaly reproduces next tick, the fallback becomes codified as the default.

**TDSD-6645 signal (Jira-originated, not Slack)** — see source-config-jira Notes for detail. Not tracked here.
