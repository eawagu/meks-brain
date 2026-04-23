---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives. last_processed 2026-04-23T15:11:00Z. 16:11 WAT Apr 23 Full tick: 4 of 5 Tier 1 channels empty; #teamapt-tech-operations ONE new message (Olamide Ajibulu 15:54 WAT **Ecobank RC91 P1 cycle #2** Start 15:47 WAT — Immediate-tier dispatched, DM draft already exists in self-DM so cycle-B was folded into that draft's narrative). **Cross-source asymmetry tracker CROSSES codification threshold at 3 data points within 24h** (TDSD-6692 UBA 06:44 WAT + TDSD-6702 NIBSS DD DOWNTIME 15:23 WAT Jira-only + TDSD-6703 3DS HTTP 422 16:07 WAT Jira-only). Directive to be drafted at briefing-2026-04-24 Decision. All other signals Awareness-tier accumulating for briefing-2026-04-24."
updated: "2026-04-23T15:24:51Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T15:11:00Z"
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

### slack_read_channel anomaly (observed 2026-04-22 14:15 WAT; non-reproducible across 16+ subsequent ticks)
Observed 14:15 WAT tick: `slack_read_channel` for channel C0ABU8GMW75 with `oldest=<valid Unix epoch>` returned empty result set despite `slack_search_public` with same Unix epoch returning in-window messages from the same channel. All retests across 16:15, 17:09, 18:09, 20:00, 22:10, 06:10, 07:10, 08:10, 09:11, 10:09, 11:09, 12:09, 13:09, 14:09, 15:11, 16:11 WAT ticks returned normally. **Stand down on codification** — keep the observation note in case it recurs.

### Thread-continuation vigilance (added 2026-04-22 18:09 WAT)
Self-closed thread parents can receive new status updates hours later that re-open the incident characterization. **Rule:** when a thread parent has an active-situation entity match (e.g., NIBSS) and has received ≥2 updates within the tick window, include thread reads in Step 1 processing even if search-all and channel-read show no new parent messages — the action may be on existing threads. For skim ticks, this applies only when the delta scan has surfaced a thread update (the signal itself triggers the read); full ticks can be more liberal.

### Block-formatted bot content — content-blind observation (STAND DOWN 2026-04-23 12:09 WAT after 4th-tick non-recurrence)
`#account-switch-alerts` (C098VUQCVRA) bot B098VURV46Q and `#teamapt-x-paystack-transfer-support` (C096LCNP26P) bot B0AQ9MDE0BZ both post block-formatted messages with empty top-level `text` field. Three consecutive ticks observed the pattern (08:10, 09:11, 11:09 WAT Apr 23). **4th-tick gate test (12:09 WAT Apr 23) + 5 subsequent ticks (13:09 / 14:09 / 15:11 / 16:11 WAT): zero bot messages in either channel in-window.** Codification gate dissolved. Observation retained as known blind spot; revive the codification discussion if 3+ consecutive ticks of the pattern recur.

### Cross-source asymmetry tracker — CODIFICATION GATE CROSSED (2026-04-23 16:11 WAT)

**Observation window opened 2026-04-23 06:44 WAT (TDSD-6692 UBA Jira-only fast-cycle). 3rd data point arrived at 16:11 WAT — codification threshold met (3+ heterogeneous observations within 24h).**

**Three data points:**
1. **TDSD-6692 UBA database-connectivity fast-cycle (06:44 WAT Apr 23)** — 6-min bank-resolved Incident; never mirrored to #teamapt-tech-operations Slack ops channel. Pure Jira-only signal path.
2. **TDSD-6702 NIBSS DD DOWNTIME (15:23 WAT Apr 23)** — Frances Omelu Medium Incident, self-closed 49min later at 16:12 WAT. Standard NIBSS-downtime customer-facing template. No Slack #teamapt-tech-operations P1 filing in the tick window; no email counterpart observed (Gmail sweep covers the window). Jira-only signal path.
3. **TDSD-6703 3DS HTTP 422 (16:07 WAT Apr 23)** — Olamide Ajibulu Medium Incident, INITIAL REVIEW at 16:11 WAT tick (4m active). No Slack #teamapt-tech-operations P1 filing in the tick window. Jira-only signal path.

**Candidates evaluated-and-excluded (maintained for provenance):**
- Ecobank cycle-A 09:11 WAT — reclassified as 27-minute sequencing lag when Slack P1 arrived at 09:38 WAT; does NOT count.
- TDSD-6696 Verve TTP RC06 (11:09 WAT) — Slack P2 followed at 11:48 WAT (39min sequencing lag); does NOT count.
- TDSD-6698 Juliana Switch Downtime (12:32 WAT) — retrospective self-filed+self-closed; does NOT count.
- AS-4404 Juliana CNP Refund (13:47 WAT) — Task-type P1/Highest routine dev, no Slack ops event to mirror; does NOT count.
- TDSD-6699 Firewall HA (13:44 WAT) — has Gmail thread 19dba77670436f02 email counterpart; cross-source consistency, not asymmetry; does NOT count.

**What this means.** Jira `[System] Incident` Medium-priority filings are sometimes the only source-of-truth signal for operational incidents — some incidents never get a Slack #teamapt-tech-operations P1 template filing. This is a coverage-redundancy gap: a heartbeat that relied solely on Slack Tier 1 sweeps would have missed all 3 signals above. Jira sweeps every tick (currently in source-config-jira directives) already cover this gap, so no *functional* coverage loss. The signal is about **routing heterogeneity** — operational incidents surface across Slack, Jira, and Email asymmetrically, and no single channel is canonical.

**Proposed directive (draft for briefing-2026-04-24 Decision):**
1. Formally recognize Jira `[System] Incident` tickets with Medium-or-higher priority as first-class operational signals equivalent to Slack P1 filings. Heartbeat salience treats both equivalently at Perceive time.
2. Keep the cross-source asymmetry tracker as a **persistent** observation substrate (not time-bounded) — accumulating data lets the next recalc tune per-factor weights on Jira-only-vs-Slack-present signal classes.
3. When Jira ticket + Slack P1 mirror both exist within the same tick window, prefer the Slack P1 for Start Time attribution (carrier of user-declared start time); use Jira for ticket-id / RCA-thread reference. When only one exists, that one is the primary source.

Window-close behavior superseded: the original 24h tracker window (opened 06:44 WAT Apr 23, set to close 06:44 WAT Apr 24) is no longer relevant — threshold crossed, surface the Decision item for briefing-2026-04-24 compose.

### Thread-continuation vigilance on active-situations (carried)
See above — unchanged this tick (no ≥2-update thread triggers in-window).

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Seven ticks across the day (12:45 Full catch-up, 14:15 Full, 16:15 Full, 17:09 Full, 18:09 Skim, 20:00 Skim, 22:10 Skim early-exit). briefing-2026-04-22 composed at ~12:45 WAT covering 43.5h back to 2026-04-20T16:09:00Z. 3 Immediate-tier silent-unresolved items batched into B1 CTO-DM draft to Oladapo (Polaris/UBA RC96/CoralPay FBN). NIBSS PTSA VPN flap pattern crystallized into architectural transition to leased-line at 19:17 WAT Apr 22 ([[NIBSS PTSA — VPN Flapping Apr 22]]). B1 batch CTO-DM draft remained unsent by user throughout the day. Email + Calendar + Google Drive MCPs dark all day.

### Tick 2026-04-23 06:10 / 07:10 / 08:10 / 09:11 / 10:09 / 11:09 / 12:09 / 13:09 / 14:09 / 15:11 WAT (condensed — see git history)

06:10 briefing tick composed briefing-2026-04-23. 07:10 TDSD-6692 UBA Jira-only fast-cycle opened cross-source asymmetry tracker. 08:10 bulk Jira grooming + first content-blind bot observation. 09:11 Gmail/Calendar/Drive MCPs RECOVERED after ~64h dark — fresh Ecobank RC91 P1 cycle-A detected via email first, Immediate DM dispatched. 10:09 Ecobank Slack P1 09:38 WAT reclassified asymmetry to sequencing lag. 11:09 Tier 1 sweep + Jira 48-item payload (3rd oversize tick → Agent delegation default for weekday work-hours). 12:09 TDSD-6630 Completed by Kabir Yusuf 11:30 WAT with zero RCA (situation retired, exact Apr 14 precedent match at 78h silent-recovery). 13:09 Tier 1 all empty + Muhammad Samu Shopify DM. 14:09 Samu DM loop closed + Ketan live DM. 15:11 Tier 1 all empty (5th consecutive non-recurrence tick on content-blind bots); source-config last_processed advanced 14:11Z.

### Tick 2026-04-23 ~16:11 WAT — Full (weekday work-hours; **Ecobank RC91 cycle #2 Immediate-tier**)

Window: 14:11 UTC → 15:11 UTC Apr 23 (~60min; `oldest=1776953460`). Step 0 declared `level=full, rationale=weekday-work-hours+multiple-active-situations+Gmail/Calendar-recovery-backlog+untriaged-briefing-compounding`. briefing-2026-04-23 already exists — not a briefing tick.

**Tier 1 read (5 channels):** 4 of 5 channels FULLY EMPTY. **#teamapt-tech-operations ONE new message:** Olamide Ajibulu formal P1 template at 15:54:42 WAT — **"P1: ECO Bank RC 91 Failures" Start Time 15:47 WAT End Time Ongoing** — 24min active at tick. Paired email at 15:38 WAT (thread 19dbac740631c4f9). Immediate-tier trigger #1 met (new P1 + RC91 keyword).

**Search-all Immediate-tier keyword scan** `(P1 OR outage OR RC91 OR RC96 OR RC05 OR RC06 OR breach OR compromised OR NIBSS OR down OR failure) after:1776953460`: zero results. Note: search index lagged behind channel-read (Ecobank P1 was in Tier 1 read but not in search sweep). Channel-read primacy held.

**Tier 2 DM scan** (`to:me after:1776953460`): zero in-window messages.

**Active-situation thread vigilance (per directive):** No ≥2-update thread triggers this window.

**Immediate-trigger evaluation:**
- **Ecobank RC91 cycle #2** — TRIGGER MET. Slack DM draft created in self-DM D081JT4AD0Q with cycle-B narrative + cycle-A recovery-claim-under-validation frame + Oladapo-side evidence question. Ecobank situation [[Ecobank — RC91 on NUS Nodes]] updated with cycle A + cycle B narrative and deltas.

**Cross-source asymmetry tracker — codification gate crossed (see Directives).** TDSD-6702 NIBSS DD DOWNTIME (15:23 WAT filed, 16:12 WAT self-closed, 49min, Jira-only) + TDSD-6703 3DS HTTP 422 (16:07 WAT, Jira-only, INITIAL REVIEW) = 2nd and 3rd data points on the 24h tracker window. 3-data-point codification threshold met. Directive draft prepared for briefing-2026-04-24 Decision.

**Classification and dispatch:**
- Immediate-tier: Ecobank RC91 cycle #2 (Slack DM draft dispatched).
- Briefing-tier candidates for briefing-2026-04-24: TDSD-6703 3DS HTTP 422 (first observation), asymmetry-tracker directive proposal (codification gate).
- Awareness-tier for briefing-2026-04-24: TDSD-6702 silent-close-pattern compound (4th NIBSS DD cycle in 9 days — recorded on [[NIBSS]] entity), TDSD-6694 PAYSTACK BALANCE Resolved, AS-4995 Juliana Back office Done, TDSD-6699 Firewall HA Awaiting implementation, TDSD-6701 TACCS DB Awaiting Scheme Update, TDSD-6700 International payment Change, TDSD-6680 Palmpay sustained Initial Review 31h+, DDO project moved to trash (governance), TeamApt Org Changes user-accepted (triple-overlap partially resolved).
- Reminder: dad's birthday — no re-surfacing this non-briefing tick (already surfaced briefing-2026-04-23 D3 this morning; next surfacing at briefing-2026-04-24 06:00 WAT).

**Advanced `last_processed` to 2026-04-23T15:11:00Z.**