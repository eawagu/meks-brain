---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives. last_processed 2026-04-22T16:09:00Z. 17:09 WAT Full tick: fresh customer-facing NIBSS signal at #monieworld-monnify 16:44 WAT (Opeyemi Ahmed — disbursement announcement with active mitigation via alternative routing) reverses the 16:15 WAT retraction-as-housekeeping interpretation — NIBSS DD situation retirement posture reverted to hold. 2 NIBSS PTSA VPN fast-cycles in #teamapt-tech-operations this tick (16:35-16:41 + 16:51-16:55 WAT, both self-closed) add frequency-compounding on NIBSS connectivity mode. Tier 1 otherwise quiet outside the VPN flaps. B1 batch CTO-DM draft still unsent (no user action). Gmail/Calendar/Drive MCPs remain dark."
updated: "2026-04-22T16:23:11Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-22T16:09:00Z"
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

### slack_read_channel anomaly (observed 2026-04-22 14:15 WAT; 16:15 WAT + 17:09 WAT ticks found it working again)
Observed 14:15 WAT tick: `slack_read_channel` for channel C0ABU8GMW75 with `oldest=<valid Unix epoch>` returned empty result set despite `slack_search_public` with same Unix epoch returning in-window messages from the same channel. **16:15 WAT tick retest:** `slack_read_channel` for C0ABU8GMW75 with `oldest=1776867300` returned correctly. **17:09 WAT tick retest:** `slack_read_channel` across all 5 Tier 1 channels with fresh `oldest` worked normally — anomaly non-reproducible across two subsequent ticks. **Stand down on codification** — no Tier 1 sweep-order amendment needed. Keep the observation note in case it recurs.

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

### Tick 2026-04-22 ~16:15 WAT — Full sweep (5/5 Tier 1 channels silent)

Window: 14:15 → 16:15 WAT (2h delta since prior tick). Current local time 16:10 WAT = 15:10 UTC.

**All 5 Tier 1 channels quiet since 15:15 WAT.** `slack_read_channel` for C0ABU8GMW75, C098VUQCVRA, C096LCNP26P, C08PH35PLPK, C090UHR9VDE with `oldest=1776867300` (2026-04-22 14:15 UTC = 15:15 WAT) returned zero messages each. **The 14:15 WAT slack_read_channel anomaly did not reproduce this tick** — call-shape working normally across all 5 channels. Single-data-point status remains — no codification of search-path fallback.

**Search-all Immediate-tier keyword scan:** `slack_search_public` with `after:1776867300 sort:timestamp` for `P1 OR outage OR RC91 OR RC96 OR RC05 OR RC06 OR down OR failure` returned zero results. No Immediate-tier keyword matches in the 1h delta window.

**DM scan:** `to:me OR from:@Oladapo after:2026-04-22` returned zero results. The briefing-2026-04-22 B1 batch CTO-DM draft to Oladapo is still unsent by the user — no indication the user has acted on it, and no Oladapo inbound to user.

**3 Immediate items status (Polaris / UBA RC96 / CoralPay):** Slack-side silent since 15:15 WAT (no new thread replies, no resolution posts). Jira-side: **TDSD-6671 "UBA Transactions failure RC 96" Completed at 15:03 WAT Apr 22** (Olamide Ajibulu) — may or may not correspond to the briefing-B1 UBA RC96 Slack thread (msg ts 1776765124.841669); can't assert identity from names alone without Slack-to-Jira cross-link. Flag for next briefing: B1's UBA RC96 framing is potentially stale, surface to user at triage. Polaris + CoralPay remain silent-unresolved in both Slack and Jira.

**NIBSS customer-facing retraction follow-up (from 15:11 WAT Apr 22):** One hour of Tier 1 silence since the retraction; no fresh NIBSS customer-facing signal arrived. Nudges toward housekeeping-only interpretation; too early to close the ambiguity. Next tick clarifies further. NIBSS DD situation page updated accordingly — retirement bar rising.

**Coverage caveats:**
- Email + Calendar + Google Drive MCPs remain dark (auth-failure state carried from briefing-2026-04-22 B2 — deferred tool list for this session does not include Gmail/Calendar/Drive connectors, confirming continued blackout).
- Partial-coverage qualifier from 14:15 WAT tick (other Tier 1 channels) does not apply this tick — all 5 channels read successfully.

**Dispatch decisions this tick:**
- No new Immediate items → no new Slack DM drafts.
- No changes to existing briefing-2026-04-22 body (per config-briefing, briefings are immutable after creation except for Triage Results).
- Situation pages updated for TDSD-6630 (comment silence update, Apr 22 cycle Jira closure, retirement-bar-rising framing) and TDSD-6645 (TDSD-6688 workflow-discipline reframing).

### Tick 2026-04-22 ~17:09 WAT — Full sweep (Tier 1 + Tier 3 keyword hits)

Window: 16:15 → 17:09 WAT (~54min delta since prior tick). Current local time 17:09 WAT = 16:09 UTC.

**Tier 1 read (all 5 channels via `slack_read_channel` with fresh `oldest=1776870300` = 2026-04-22 15:05 UTC = 16:05 WAT).** Anomaly from 14:15 WAT did not reproduce — all 5 channels returned normally.

**#teamapt-tech-operations deltas:**
- NIBSS PTSA VPN fast-cycle 1: 16:35-16:41 WAT (6min, self-closed in-channel).
- NIBSS PTSA VPN fast-cycle 2 (resurface): 16:51-16:55 WAT (4min, self-closed in-channel).
- Both within fast-cycle envelope. Together they echo the Apr 21 13:20 WAT NIBSS PTSA VPN flap (1min) and TDSD-6673 closure this morning. **3 VPN flaps in 24h on NIBSS connectivity mode** — frequency-compounding signal. Not individually Immediate, but tracked as adjacent-evidence for NIBSS-side disruption.
- No other deltas.

**Other Tier 1 channels (#account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev, #go-subscribe-by-teamapt):** Zero new messages since 16:05 WAT.

**Tier 3 keyword / active-situation entity-match scan** via `slack_search_public`:
- **#monieworld-monnify 16:44 WAT Apr 22 — Opeyemi Ahmed customer-facing NIBSS disbursement announcement with active mitigation via alternative routing.** Tier 3 match on NIBSS + disbursement + active-situation (NIBSS DD) entity overlap. **This signal reverses the 16:15 WAT "retraction-as-housekeeping" interpretation** — fresh NIBSS customer-facing disruption signal exists, and Moniepoint has engaged an alternative routing mitigation path. Updated [[NIBSS DD — Downtime P1 Apr 20]] situation with 17:09 WAT delta: retirement posture reverted to hold; decision deferred beyond briefing-2026-04-23 until mitigation trajectory clarifies.
- No other Tier 3 keyword hits.

**DM scan:** No DMs mentioning user. B1 batch CTO-DM draft to Oladapo still unsent — no user action on it, no Oladapo inbound.

**3 Immediate items status (Polaris / UBA RC96 / CoralPay):** Slack-side silent since prior tick (no new thread replies, no resolution posts). Jira-side status tracked via source-config-jira. UBA RC96 framing still potentially stale (TDSD-6671 Completed prior tick); Polaris + CoralPay remain silent-unresolved in both Slack and Jira.

**Coverage caveats:**
- Email + Calendar + Google Drive MCPs remain dark (auth-failure state carried from briefing-2026-04-22 B2 — deferred tool list for this session does not include Gmail/Calendar/Drive connectors, confirming continued blackout).
- All 5 Tier 1 channels read cleanly this tick.

**Dispatch decisions this tick:**
- No new Immediate items → no new Slack DM drafts (the 16:44 WAT #monieworld-monnify signal is a mitigation communication, not an unmitigated outage — Moniepoint is already engaged).
- No changes to existing briefing-2026-04-22 body.
- Situation pages updated: [[NIBSS DD — Downtime P1 Apr 20]] (retirement posture reverted to hold, VPN frequency-compounding, #monieworld-monnify signal), [[Keystone Bank — Settlement Requery Apr 20]] (TDSD-6615 closure + backfilled TDSD-6633 closure — retirement candidate), [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] (TDSD-6662 third Opeyemi-same-day-close strengthens assignee-variable evidence).
