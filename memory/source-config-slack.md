---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives. last_processed 2026-04-23T11:09:00Z. 12:09 WAT Apr 23 Full tick: Tier 1 — 4 of 5 channels fully empty; #teamapt-tech-operations ONE new message (Olamide Ajibulu 11:48 WAT VERVE TTP/Moniepointrest RC06 P2, start 10:45 WAT — 1h24m active at tick, under 2h Immediate threshold). Bot content-blind pattern did NOT recur (0 bot messages in #account-switch-alerts or #teamapt-x-paystack-transfer-support in-window) — 4th-tick codification gate does NOT fire; directive stood down. Search-all keyword sweep: zero in-window (RC06 P2 above was channel-read, not search surfaced). DM scan zero. TDSD-6630 closed by Kabir Yusuf on Jira side at 11:30 WAT — cross-source check via TDSD-6645 situation retained. No Immediate dispatch. All signals Awareness-tier, accumulating for briefing-2026-04-24."
updated: "2026-04-23T13:17:27Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T13:09:00Z"
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

### slack_read_channel anomaly (observed 2026-04-22 14:15 WAT; non-reproducible across 14+ subsequent ticks)
Observed 14:15 WAT tick: `slack_read_channel` for channel C0ABU8GMW75 with `oldest=<valid Unix epoch>` returned empty result set despite `slack_search_public` with same Unix epoch returning in-window messages from the same channel. All retests across 16:15, 17:09, 18:09, 20:00, 22:10, 06:10, 07:10, 08:10, 09:11, 10:09, 11:09, 12:09, 13:09, 14:09 WAT ticks returned normally. **Stand down on codification** — keep the observation note in case it recurs.

### Thread-continuation vigilance (added 2026-04-22 18:09 WAT)
Self-closed thread parents can receive new status updates hours later that re-open the incident characterization. **Rule:** when a thread parent has an active-situation entity match (e.g., NIBSS) and has received ≥2 updates within the tick window, include thread reads in Step 1 processing even if search-all and channel-read show no new parent messages — the action may be on existing threads. For skim ticks, this applies only when the delta scan has surfaced a thread update (the signal itself triggers the read); full ticks can be more liberal.

### Block-formatted bot content — content-blind observation (STAND DOWN 2026-04-23 12:09 WAT after 4th-tick non-recurrence)
`#account-switch-alerts` (C098VUQCVRA) bot B098VURV46Q and `#teamapt-x-paystack-transfer-support` (C096LCNP26P) bot B0AQ9MDE0BZ both post block-formatted messages with empty top-level `text` field — content lives in attachments/blocks not exposed by current MCP retrieval (`slack_read_channel` detailed mode + `slack_search_public_and_private` both return empty text). Three consecutive ticks observed the pattern (08:10, 09:11, 11:09 WAT Apr 23). **4th-tick gate test (12:09 WAT Apr 23): zero bot messages in either channel in-window — pattern did not recur.** Codification gate dissolves. Observation retained as known blind spot; absence of alarm cannot be verified when bots do fire, but bots did not fire this tick. Revive the codification discussion if 3+ consecutive ticks of the pattern are seen again.

### Cross-source asymmetry tracker (opened 2026-04-23 06:44 WAT — tracker window closes 06:44 WAT Apr 24)
Operational signals bypassing the canonical Slack #teamapt-tech-operations channel should be counted for pattern-significance. First observation: TDSD-6692 UBA fast-cycle Jira-only (06:44 WAT Apr 23 — 6-min bank-resolved, never mirrored to Slack ops channel). Ecobank 09:11 WAT observation was reclassified to 27-minute sequencing lag (09:38 WAT Olamide Slack P1 filed) — does NOT count against the tracker. TDSD-6696 Verve TTP RC06 at 11:09 WAT Jira tick → Slack P2 filed 11:48 WAT (39min sequencing lag) — also does NOT count (cross-source consistency). TDSD-6698 Juliana Switch Downtime at 12:32 WAT Jira tick is retrospective self-documentation (no event-time component to check for Slack mirror) — does NOT count. AS-4404 Juliana CNP Refund 13:47 WAT is Task-type P1/Highest progressing In Progress — also no Slack ops event to mirror (routine dev task, not incident). **Tracker still at 1 data point.** Stand-down on directive codification pending 3rd heterogeneous observation within 24h of 1st (by 06:44 WAT Apr 24). If 3rd observation arrives, escalate to source-config coverage-redundancy concern; if not, pattern dissolves.

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Seven ticks across the day (12:45 Full catch-up, 14:15 Full, 16:15 Full, 17:09 Full, 18:09 Skim, 20:00 Skim, 22:10 Skim early-exit). briefing-2026-04-22 composed at ~12:45 WAT (catch-up Full) covering 43.5h back to 2026-04-20T16:09:00Z. 3 Immediate-tier silent-unresolved items batched into B1 CTO-DM draft to Oladapo (Polaris/UBA RC96/CoralPay FBN). NIBSS PTSA VPN flap pattern crystallized into architectural transition to leased-line at 19:17 WAT Apr 22 (new situation [[NIBSS PTSA — VPN Flapping Apr 22]]). B1 batch CTO-DM draft remained unsent by user throughout the day — 10h+ dispatch-authorization gap at end-of-day. Email + Calendar + Google Drive MCPs dark all day.

### Tick 2026-04-23 06:10 / 07:10 / 08:10 / 09:11 / 10:09 / 11:09 / 12:09 / 13:09 WAT (condensed — see git history for details)

06:10 briefing tick composed briefing-2026-04-23 (5 Decision + 5 Awareness). Critical overnight delta: TDSD-6645 Dominic broke 59h15m silence at 04:08 WAT with attribution-transfer to inwards payments team (D1). TDSD-6630 retire-or-hold decision surfaced as D2. 07:10 TDSD-6692 UBA Jira-only fast-cycle opened cross-source asymmetry tracker. 08:10 bulk Jira grooming + first content-blind bot observation. 09:11 Gmail/Calendar/Drive MCPs RECOVERED after ~64h dark — fresh Ecobank RC91 P1 cycle detected via email first. 10:09 Ecobank Slack P1 filing at 09:38 WAT (asymmetry reclassified to sequencing lag). 11:09 Tier 1 sweep + Jira 48-item payload (3rd oversize tick → Agent delegation promoted to default for weekday work-hours extraction path per source-config-jira directive). 12:09 Tier 1 1 new message (Olamide RC06 P2 Verve TTP 11:48 WAT 1h24m active under 2h threshold); TDSD-6630 Completed by Kabir Yusuf 11:30 WAT with zero RCA (situation [[NIBSS DD — Downtime P1 Apr 20]] retired this tick). 13:09 Tier 1 all empty; new Muhammad Samu DM 12:37 WAT Shopify status-ask queued for briefing-2026-04-24.

### Tick 2026-04-23 ~14:09 WAT — Full (weekday work-hours; Samu loop closed; Ketan live DM)

Window: 12:09 UTC → 13:09 UTC Apr 23 (~60min; `oldest=1776946140`). Step 0 declared `level=full, rationale=weekday-work-hours-d1-d5-untriaged-active-situations-one-hour-window`. briefing-2026-04-23 already exists — not a briefing tick.

**Tier 1 read (5 channels):** All 5 channels FULLY EMPTY in-window. Zero new messages anywhere. Block-formatted bot content remained non-firing (post-stand-down observation held).

**Search-all Immediate-tier keyword scan** `(P1 OR outage OR RC91 OR RC96 OR RC05 OR RC06 OR breach OR compromised OR NIBSS OR incident)` with `after=1776946140`: zero results.

**Tier 2 DM scan** (`to:<@U080PEXEZ0E> after=1776946140`): **4 in-window messages across 2 DMs**:

1. DM D08R7M53NH2 with [[Muhammad Samu]] (U0818VD0XL3):
   - 13:50 WAT Emeka replied "My bro. Mehn no update yet." (message_ts=1776946232.532229)
   - 14:47 WAT Samu acknowledged "Okay sir." (message_ts=1776948436.177539)
   - **Loop status: CLOSED.** briefing-2026-04-24 candidate flag REMOVED — user responded directly with a no-update disposition; no heartbeat surfacing warranted.

2. DM D082T2XT2NT with [[Ketan Dhamasana]] (U0818PKFKQR):
   - 14:31 WAT Emeka initiated "u able to talk now?" (message_ts=1776947485.371509)
   - 14:38 WAT Ketan "Hi" / "Yes" / "Shall I call?" (three quick messages, message_ts 1776947902-1776947919)
   - **Live interactive DM, user-initiated.** Not a heartbeat-surface item — user is already in direct conversation.

**Immediate-trigger evaluation:** None met. Samu loop closure is user-to-user directly; Ketan DM is user-initiated real-time conversation.

**Classification:** All signals Awareness-tier (no Briefing-tier candidates this tick). Factors for each below:
- Samu DM loop-close: `source=slack, tier2_dm, user_replied_directly, no_residual_surfacing, factors=loop_closed, briefing_candidate_removed`
- Ketan live DM: `source=slack, tier2_dm, user_initiated_outbound, real_time_conversation, no_heartbeat_action`

**Active-situation thread vigilance (per directive):**
- **Ecobank RC91 NUS Nodes** — zero new signals in-window. Slack P1 thread closure propagation still pending (09:38 WAT Olamide filing still End Time: Ongoing). Status remains `developing` pending TeamApt reconfirmation. Watchpoint continues.
- **TDSD-6645 Monnify** — zero Jira delta in-window (see source-config-jira). [[Dominic Usiabulu]] comment silence ~9h47m post-04:08 WAT attribution-transfer. D1 three-option ask remains open at briefing-2026-04-23. No heartbeat action.
- **NIBSS PTSA leased-line** — cumulative stable ~18h52m post-19:17 WAT Apr 22 transition. Under 24h threshold. Next tick (≥19:17 WAT Apr 23) projected to cross threshold for `developing` → `stable` transition if quiet continues.

**Dispatch decisions:**
- No Immediate-tier Slack dispatch.
- No new briefing-2026-04-24 Decision candidates from Slack this tick (Samu loop closed; Ketan live).
- No situation page updates (no operational deltas on active situations).

**Advanced `last_processed` to 2026-04-23T13:09:00Z.**
