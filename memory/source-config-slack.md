---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives. last_processed 2026-04-23T05:10:00Z. 06:10 WAT Apr 23 briefing-tick Full sweep: overnight window (21:00 Apr 22 → 05:10 UTC Apr 23 = 8h10min) zero Tier 1 new messages, zero Immediate-tier keyword hits, zero DMs. 3 B1 batch items (Polaris/UBA/CoralPay) plus TDSD-6630/TDSD-6645 carryforward state — all surfaced into briefing-2026-04-23 D1/D2/D5. B1 batch CTO-DM draft still unsent 17h+ (carryforward via D5). Gmail/Calendar/Drive MCPs still dark (~61h)."
updated: "2026-04-23T07:17:48Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T07:10:00Z"
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

### Epoch-filter post-check (reinforced 2026-04-22 22:10 WAT)
Even explicit Unix epoch `after=<stamp>` on `slack_search_public` returns some messages timestamped BEFORE the cutoff in practice (observed: cutoff 1776884400 = 19:00 UTC, returned results going back to 1776872974 = 15:49 UTC). **Rule:** after calling `slack_search_public` with `after=<epoch>`, post-filter the result set on message_ts > epoch on the assistant side. Do not trust the API filter alone.

### slack_read_channel anomaly (observed 2026-04-22 14:15 WAT; non-reproducible across 5 subsequent ticks)
Observed 14:15 WAT tick: `slack_read_channel` for channel C0ABU8GMW75 with `oldest=<valid Unix epoch>` returned empty result set despite `slack_search_public` with same Unix epoch returning in-window messages from the same channel. All retests across 16:15, 17:09, 18:09, 20:00, 22:10 WAT ticks returned normally. **Stand down on codification** — keep the observation note in case it recurs.

### Thread-continuation vigilance (added 2026-04-22 18:09 WAT)
Self-closed thread parents can receive new status updates hours later that re-open the incident characterization. **Rule:** when a thread parent has an active-situation entity match (e.g., NIBSS) and has received ≥2 updates within the tick window, include thread reads in Step 1 processing even if search-all and channel-read show no new parent messages — the action may be on existing threads. For skim ticks, this applies only when the delta scan has surfaced a thread update (the signal itself triggers the read); full ticks can be more liberal.

### Block-formatted bot content — content-blind observation (2026-04-23 08:10 WAT)
`#account-switch-alerts` (C098VUQCVRA) bot B098VURV46Q posts block-formatted messages with empty top-level `text` field — content lives in attachments/blocks not exposed by current MCP retrieval (`slack_read_channel` detailed mode + `slack_search_public_and_private` both return empty text). Cannot classify these messages as Immediate-tier (e.g., route-turned-off alert per config-salience trigger #7) without block-content access. **Current posture:** treat as known blind spot; absence of alarm cannot be verified. **Stand down on codification until recurrence pattern stabilizes** — single observation, may be session-specific MCP behavior. If pattern holds across 3+ ticks, escalate to source-config directive requiring `slack_read_thread` on each bot-ts + attempted permalink fetch as content-recovery path.

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Seven ticks across the day (12:45 Full catch-up, 14:15 Full, 16:15 Full, 17:09 Full, 18:09 Skim, 20:00 Skim, 22:10 Skim early-exit). Key accumulations and decisions:

**briefing-2026-04-22 composed at ~12:45 WAT (catch-up Full).** Covered 43.5h window back to last_processed=2026-04-20T16:09:00Z (briefing-2026-04-21 never fired per B5 structural gap). 9 resolved P1s + 1 P2 captured. 3 Immediate-tier silent-unresolved items batched into B1 CTO-DM draft to Oladapo (Polaris RC91 28h+, UBA RC96 NEW failure mode 26h+, CoralPay FBN RC91 7h+). NIBSS DD P2 pending mandates captured in B4.

**Silent-resolution calibration confirmed (12:45 WAT):** "Issue resolved" keyword search returned exactly 5 matches mapping to the 5 explicitly-resolved P1 threads. Polaris/UBA/CoralPay had no such match — factually still open. `absence_of_in_channel_resolution + duration_exceeds_historical_envelope` validated as reliable silent-unresolved signal.

**NIBSS DD P2 cycle closure (14:15 WAT):** 10:40 WAT signal reached thread-level resolution at 13:05 WAT (2h25m). 3-in-9-days NIBSS DD cycles with the Apr 22 cycle reaching explicit close while Apr 20 TDSD-6630 remained silent 53h+.

**NIBSS customer-facing retraction (15:11 WAT):** Ambiguous signal; initial housekeeping-interpretation tracked.

**NIBSS PTSA VPN flap pattern emerges (17:09 WAT):** 2 fast-cycles observed (16:35-16:41 + 16:51-16:55 WAT), echoing earlier Apr 21 + Apr 22 VPN flaps. 3 VPN flaps in 24h surfaced as frequency-compounding signal. 16:44 WAT #monieworld-monnify Opeyemi Ahmed customer-facing NIBSS disbursement announcement reversed the 16:15 WAT "retraction-as-housekeeping" interpretation — fresh NIBSS-side disruption with Moniepoint active mitigation.

**NIBSS PTSA thread third-event (18:07 WAT / surfaced 18:09 WAT Skim):** Qazim's "Moniepoint having issues sending traffic to NIBSS and DTS route is prioritized" update arrived on a thread carrying 2 prior self-closed cycles. Cumulative 1h32m active, under 2h Immediate dispatch threshold + DTS mitigation engaged = Briefing-tier accumulating. Thread-continuation vigilance rule codified.

**NIBSS PTSA architectural transition (19:17 WAT / surfaced 20:00 WAT Skim):** All 4 NIBSS PTSA nodes moved from VPN to dedicated leased-line. 18:40 WAT "Issue resolved" (Qazim) closed the ~56min incident envelope. New situation [[NIBSS PTSA — VPN Flapping Apr 22]] spawned; [[NIBSS DD — Downtime P1 Apr 20]] received cross-link. DCIR/Zenith DD war room + Union Bank DD credentials-issue surfaced as Awareness engineering signals.

**22:10 WAT Skim early-exit:** Zero Tier 1 deltas + zero DMs + zero Immediate-tier keyword hits (post-filtered). Combined with Jira zero-deltas triggered early-exit. Advanced last_processed to 2026-04-22T21:00:00Z.

**B1 batch CTO-DM draft remained unsent by user throughout the day** — 10h+ dispatch-authorization gap at end-of-day.

**Coverage carryforward:** Email + Calendar + Google Drive MCPs dark all day (auth-failure state — deferred tool list for this session does not include Gmail/Calendar/Drive connectors). ~54h since last_processed 2026-04-20T16:09:00Z at 22:10 WAT tick, below 7-day absence-of-signal threshold.

### Tick 2026-04-23 ~06:10 WAT — Full briefing-tick sweep (overnight window)

Window: 22:10 WAT Apr 22 → 06:10 WAT Apr 23 (~8h; 21:00 UTC Apr 22 → 05:10 UTC Apr 23). Step 0 declared `level=full, rationale=briefing-tick` — first tick after 06:00 WAT with no existing briefing-2026-04-23 page. Full processing across all phases required.

**Tier 1 read (all 5 channels via `slack_read_channel` with `oldest=1776891000` = 22:00 WAT):** Zero new messages across all 5. Complete overnight silence. Consistent with overnight-delegation window.

**Search-all Immediate-tier keyword scan** via `slack_search_public` with `after=1776891000` for `(P1 OR outage OR RC91 OR RC96 OR RC05 OR RC06 OR breach OR compromised OR NIBSS OR down OR failure)`: 20 results returned; post-filtering on `message_ts > 1776891000` shrinks to Awareness-tier only. No Tier 1 channel hits, no active-situation entity matches (no new Polaris / UBA / CoralPay / NIBSS DD / NIBSS PTSA / Monnify / Keystone signals).

**Tier 2 DM scan** via `to:me after=1776891000`: zero results. No Oladapo-to-user inbound. **B1 batch CTO-DM draft still unsent — 17h15m+ since briefing-2026-04-22 compose.** Carryforward to briefing-2026-04-23 D5.

**Active-situation thread vigilance:**
- **NIBSS PTSA thread 1776872974.244299** — no new replies since 18:40 WAT Apr 22 "Issue resolved". Leased-line stable 10h47m. Surfaced A5.
- **TDSD-6645 Monnify Settlements** — Dominic broke 59h15m silence at 04:08 WAT Apr 23 with attribution-transfer comment (see source-config-jira). Surfaced D1.
- **TDSD-6630 NIBSS DD** — zero updates overnight. Comment silence ~72h43m. Surfaced D2 (retire-or-hold three-option ask).
- **Polaris / UBA RC96 / CoralPay B1 batch** — Slack-side silent overnight.

**Coverage caveats:**
- Email + Calendar + Google Drive MCPs still dark. Gmail/Calendar silence ~61h since last_processed 2026-04-20T16:09:00Z — below 7-day absence-of-signal threshold but 3rd consecutive briefing-blocker day (B2 carryforward via briefing-2026-04-23 D4).
- All 5 Tier 1 channels read cleanly. Epoch-filter post-check applied per directive.

**Dispatch decisions this tick:**
- No new Immediate items → no new Slack DM drafts overnight. Overnight-delegation held.
- Briefing-2026-04-23 composed and created via MCP with 5 Decision + 5 Awareness items.
- briefing-2026-04-22 superseded via MCP.
- Situation pages updated: TDSD-6645 (critical Apr 23 04:08 WAT Dominic attribution-transfer delta + status transition Awaiting Scheme Update → Escalated + TDSD-6684 3rd data point), TDSD-6630 (overnight-silence + connectivity-layer hypothesis ruled out via leased-line stability), NIBSS PTSA (10h47m stable confirmation), Keystone (retired per pre-committed criterion — zero overnight signals).

**Reminder evaluation (Step 2):** One open reminder ("Call the event planner for dad's birthday"). Briefing tick — re-emitted in briefing-2026-04-23 D3 as 5th consecutive commitment-day-or-later surfacing. Surfacing history page updated.

**Advanced `last_processed` to 2026-04-23T05:10:00Z** for audit trail continuity.

### Tick 2026-04-23 ~07:10 WAT — Skim (post-briefing window)

Window: 05:10 UTC → 06:10 UTC Apr 23 (~1h; `oldest=1776921000`). Step 0 declared `level=skim, rationale=post-briefing-42m-window-pre-work-hours`.

**Zero deltas across full sweep:**
- Tier 1 read (all 5 channels C0ABU8GMW75 / C098VUQCVRA / C096LCNP26P / C08PH35PLPK / C090UHR9VDE with `oldest=1776921000`): zero new messages across all five. Pre-work-hours window (07:10 WAT) consistent with overnight→morning quiet-window profile.
- Search-all Immediate-tier keyword scan `(P1 OR outage OR RC91 OR RC96 OR RC05 OR RC06 OR breach OR compromised OR NIBSS OR down OR failure)` with `after=1776921000` via `slack_search_public_and_private`: zero results.
- Tier 2 DM scan (`to:me after:2026-04-23` with `after=1776921000`): zero results. **B1 batch CTO-DM draft still unsent — 18h+ since briefing-2026-04-22 compose** (carryforward via briefing-2026-04-23 D5).

**Cross-source asymmetry observed.** Jira-side sweep surfaced TDSD-6692 UBA "failing generally" (6-min bank-resolved fast-cycle; see source-config-jira notes) this tick. Slack Tier 1 and keyword sweeps show zero matching signal — Daniel Armstrong filed and closed the ticket without mirroring to #teamapt-tech-operations. **Single-instance observation; no codification yet.** Flag for pattern tracking — if this recurs 3+ times (fast-cycle Jira-only incidents on Tier 1 entities), consider a directive addition noting that fast-cycle self-filed-and-closed tickets may not surface in Slack and Jira sweep coverage is required to catch them.

**Coverage caveats:**
- Email + Calendar + Google Drive MCPs still dark. Deferred tool list for this session does not include Gmail/Calendar/Drive connectors. Silence now ~63h since last_processed 2026-04-20T16:09:00Z. Below 7-day absence-of-signal threshold; B2 carryforward via briefing-2026-04-23 D4 holds.

**Dispatch decisions:**
- No Immediate items → no new DM drafts.
- Overnight-delegation window already closed (06:00 WAT per config-heartbeat); pre-work-hours window (06:00–08:00 WAT) is expected low-signal. Confirmed.
- Non-briefing tick — reminder Step 2 skipped per skim rules (source-triggered Step 2 ran via Jira delta; reminder eval concluded no new surfacing needed — sole open reminder "Call the event planner for dad's birthday" already surfaced today in briefing-2026-04-23 D3 awaiting user triage).

**Advanced `last_processed` to 2026-04-23T06:10:00Z** (07:10 WAT).

### Tick 2026-04-23 ~08:10 WAT — Full (weekday work-hours opener)

Window: 06:10 UTC → 07:10 UTC Apr 23 (~1h; `oldest=1776924600` = 06:10 UTC). Step 0 declared `level=full, rationale=weekday-active-p1-density` — work-hours opening tick with 10+ active situations (NIBSS DD TDSD-6630 silent 73h, Monnify TDSD-6645 post-attribution-transfer, multi-bank RC91/RC96 carryforward, NIBSS PTSA leased-line developing).

**Tier 1 read (all 5 channels):** 4 of 5 fully empty. **#account-switch-alerts (C098VUQCVRA)** produced 2 bot messages at 07:31 and 07:37 WAT (ts 1776925915.331699 / 1776926241.777909) from bot B098VURV46Q with **empty text payload** (block-formatted content not exposed by MCP retrieval). No threads, no keyword hits. Verified via `slack_read_thread` (no thread children) and `slack_search_public_and_private` with `in:#account-switch-alerts` (confirmed empty text). Codified as content-blind-observation directive above; non-escalable without block-content access.

**Search-all Immediate-tier keyword scan** `(P1 OR outage OR RC91 OR RC96 OR RC05 OR RC06 OR breach OR compromised OR NIBSS OR down OR failure)` with `after=1776924600`: zero results.

**Tier 2 DM scan** (`to:me after=1776924600`): zero results. **B1 batch CTO-DM draft still unsent — 19h+ since briefing-2026-04-22 compose** (carryforward via briefing-2026-04-23 D5). Work-hours opening — dispatch-authorization gap entering its 20th hour.

**Active-situation thread vigilance:**
- TDSD-6645 post-attribution-transfer — 4h02m Dominic-silent post-04:08 WAT comment. Not alarming at morning-hours observation (expected quiet until Moniepoint work-hours ramp).
- TDSD-6630 — no Slack-side signal; Jira-side also zero (see source-config-jira). Silence compounds toward D2 retirement decision.
- NIBSS PTSA leased-line stable (now ~12h53m post-19:17 WAT Apr 22 transition).

**Coverage caveats:** Gmail + Calendar + Google Drive MCPs still dark. Silence now ~64h since last_processed 2026-04-20T16:09:00Z. Still below 7-day absence-of-signal threshold; B2/D4 carryforward holds.

**Dispatch decisions:**
- No Immediate-tier triggers → no new DM drafts.
- Non-briefing tick — Awareness-tier Jira deltas (TDSD-6675/TDSD-6592 closures + AS-* bulk; see source-config-jira) accumulate for briefing-2026-04-24.
- Reminder Step 2 eval: zero new surfacings (sole open reminder already in briefing-2026-04-23 D3 awaiting triage; no new brain content or context-match triggering re-surface within same-day window).

**Advanced `last_processed` to 2026-04-23T07:10:00Z.**
