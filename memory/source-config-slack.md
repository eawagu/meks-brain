---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives. last_processed 2026-04-23T10:09:00Z. 11:09 WAT Apr 23 Full tick (weekday-working-hours; active Ecobank situation): Tier 1 sweep — 4 of 5 channels quiet (#teamapt-tech-operations/notifications-support-dev/go-subscribe empty; #account-switch-alerts 3 content-blind bot messages B098VURV46Q; #teamapt-x-paystack-transfer-support 6 messages Christine Ogude dispute-chase to Chioma Enwerem + empty-text bot message). Search-all operational-keyword sweep zero. DM scan zero. No Immediate-tier dispatch; Awareness accumulation for briefing-2026-04-24. Cross-source asymmetry tracker holds single data point (TDSD-6692 UBA Jira-only 06:44 WAT); Ecobank 09:38 WAT formal P1 remains sequencing-lag-not-asymmetry."
updated: "2026-04-23T10:20:47Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T10:09:00Z"
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

### Block-formatted bot content — content-blind observation (2026-04-23 08:10 WAT; 2nd bot 09:11 WAT; 3rd tick 11:09 WAT)
`#account-switch-alerts` (C098VUQCVRA) bot B098VURV46Q and `#teamapt-x-paystack-transfer-support` (C096LCNP26P) bot B0AQ9MDE0BZ both post block-formatted messages with empty top-level `text` field — content lives in attachments/blocks not exposed by current MCP retrieval (`slack_read_channel` detailed mode + `slack_search_public_and_private` both return empty text). Cannot classify these messages as Immediate-tier (e.g., route-turned-off alert per config-salience trigger #7) without block-content access. **Current posture:** treat as known blind spot; absence of alarm cannot be verified. 11:09 WAT tick continues the pattern: 3 bot messages in #account-switch-alerts (B098VURV46Q) all empty-text — 3rd tick of recurrence on this bot. **Directive action — escalate to codification if 4th consecutive tick shows same pattern (at next tick ~12:09 WAT)**: require `slack_read_thread` on each bot-ts + attempted permalink fetch as content-recovery path. One-tick-more observation gate before structural change.

### Cross-source asymmetry tracker (opened 2026-04-23 06:44 WAT)
Operational signals bypassing the canonical Slack #teamapt-tech-operations channel should be counted for pattern-significance. First observation: TDSD-6692 UBA fast-cycle Jira-only (06:44 WAT Apr 23 — 6-min bank-resolved, never mirrored to Slack ops channel). Ecobank 09:11 WAT observation was reclassified to 27-minute sequencing lag (09:38 WAT Olamide Slack P1 filed) — does NOT count against the tracker. **Stand-down on directive codification** pending 3rd heterogeneous observation within 24h of 1st (by 06:44 WAT Apr 24). If 3rd observation arrives, escalate to source-config coverage-redundancy concern; if not, pattern dissolves.

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Seven ticks across the day (12:45 Full catch-up, 14:15 Full, 16:15 Full, 17:09 Full, 18:09 Skim, 20:00 Skim, 22:10 Skim early-exit). briefing-2026-04-22 composed at ~12:45 WAT (catch-up Full) covering 43.5h back to 2026-04-20T16:09:00Z. 3 Immediate-tier silent-unresolved items batched into B1 CTO-DM draft to Oladapo (Polaris/UBA RC96/CoralPay FBN). NIBSS PTSA VPN flap pattern crystallized into architectural transition to leased-line at 19:17 WAT Apr 22 (new situation [[NIBSS PTSA — VPN Flapping Apr 22]]). B1 batch CTO-DM draft remained unsent by user throughout the day — 10h+ dispatch-authorization gap at end-of-day. Email + Calendar + Google Drive MCPs dark all day.

### Tick 2026-04-23 (condensed for 06:10 briefing + 07:10 skim + 08:10 full)

**06:10 WAT briefing-tick Full** — 8h10min overnight window 21:00 UTC Apr 22 → 05:10 UTC Apr 23 clean. 4 of 5 Tier 1 channels fully silent; Jira-side critical delta (TDSD-6645 Dominic broke 59h15m silence, attribution-transfer to inwards payments team). briefing-2026-04-23 composed with 5 Decision + 5 Awareness. Gmail/Calendar/Drive still dark. Carry into D4.

**07:10 WAT Skim (post-briefing, pre-work-hours)** — 1h window clean on Slack; Jira-side TDSD-6692 UBA fast-cycle (6-min lifetime, bank-resolved). Cross-source asymmetry 1st observation (Jira-only).

**08:10 WAT Full (weekday work-hours opener)** — 1h window; Tier 1: 4 of 5 clean, #account-switch-alerts bot content-blind (first observation codified). TDSD-6675/TDSD-6592 closures + AS-* bulk grooming on Zone Switching Partnership. All Awareness-tier.

### Tick 2026-04-23 ~09:11 WAT — Full (condensed)

Gmail/Calendar/Drive RECOVERY tick. Ecobank RC91 P1 detected via email first (06:35/08:52 WAT), Immediate-tier Slack DM drafted to user self-DM. Cross-source asymmetry 2nd observation opened (later reclassified to sequencing lag after 09:38 WAT formal P1 filing). #go-subscribe ATS staging POS failure (Awareness). #account-switch-alerts + #teamapt-x-paystack bots empty-text (content-blind codified). Advanced last_processed to 2026-04-23T08:10:00Z.

### Tick 2026-04-23 ~10:09 WAT — Full (condensed)

Olamide 09:38 WAT formal Ecobank P1 filing in #teamapt-tech-operations (asymmetry reclassified to sequencing lag). Moniepoint CBA incident surface (#tech-operations Akinola Akintayo 09:41 WAT, cross-org Awareness). TDSD-6694 Paystack Balance Adjustment NEW + TDSD-6695 CloudFront stopgap Waiting-for-Approval (approver unnamed). Ravi DM pre-meeting check. Advanced last_processed to 2026-04-23T09:10:00Z.

### Tick 2026-04-23 ~11:09 WAT — Full (weekday work-hours; active Ecobank situation)

Window: 09:10 UTC → 10:09 UTC Apr 23 (~59 min; `oldest=1776935400`). Step 0 declared `level=full, rationale=weekday-working-hours-active-ops`. briefing-2026-04-23 already exists — not a briefing tick.

**Tier 1 read (5 channels):**
- **#teamapt-tech-operations (C0ABU8GMW75):** **zero new messages.** Full quiet post-09:38 WAT Ecobank P1 filing. No resolution post to the Ecobank P1 thread yet (see Ecobank email delta this tick — bank responded via email 10:19 WAT with "processing successfully"; Slack closure not yet propagated). Propagation latency starting.
- **#account-switch-alerts (C098VUQCVRA):** 3 bot messages 10:13, 10:16, 10:17 WAT (bot B098VURV46Q, all empty text — 3rd tick of content-blind pattern; directive updated with "4th-tick codification gate").
- **#teamapt-x-paystack-transfer-support (C096LCNP26P):** 6 messages:
  - [[Christine Ogude]] at 10:11 WAT "Done," (chat follow-up, trivial).
  - 2 empty-text bot messages 10:13 WAT (bot B0AQ9MDE0BZ — content-blind).
  - [[Christine Ogude]] at 10:15 WAT chasing [[Chioma]] (U0259CDFBHA) — 8 pending dispute IDs (APT000042604... prefix) mentioning [[Peace Emmanuel]] (U0A7X8EBCJX). Operational workflow — disputes pending on Chioma's end. Awareness-tier.
  - [[Christine Ogude]] at 10:36 WAT follow-up to Chioma: "yes Peace Emmanuel is on top of that" — disposition of one dispute.
- **#notifications-support-dev (C08PH35PLPK):** zero new messages.
- **#go-subscribe-by-teamapt (C090UHR9VDE):** zero new messages.

**Search-all Immediate-tier keyword scan** `(P1 OR outage OR RC91 OR RC96 OR RC05 OR RC06 OR breach OR compromised OR NIBSS OR down OR failure OR incident)` with `after=1776935400`: zero results.

**Tier 2 DM scan** (`to:<@U080PEXEZ0E> after=1776935400`): zero results.

**Active-situation thread vigilance:**
- Ecobank RC91 — **bank responded via email at 10:19 WAT** (see source-config-email tick note). Slack P1 (09:38 WAT message_ts 1776934715) **still End Time: Ongoing** — no resolution post; TeamApt-side needs to validate bank's claim then close Slack P1. Email-to-Slack closure propagation not yet started. Watchpoint.
- TDSD-6645 — Dominic silent ~7h post-04:08 WAT attribution-transfer comment. Within morning-hours expected quiet (most TDSD-6645 comment activity observed in 11:00 WAT+ windows historically).
- TDSD-6630 — NIBSS DD silent ~78h from 05:27 WAT Apr 20; retirement still held in briefing-2026-04-23 D2.
- NIBSS PTSA leased-line stable ~15h50m post-19:17 WAT Apr 22 transition; under 24h threshold for `stable` status transition (projected at 19:17 WAT today).

**Dispatch decisions:**
- No Immediate-tier Slack dispatch. Ecobank bank response is resolution-adjacent (not escalation); no need to pre-empt the user's 06:10 WAT briefing D1/D5 triage with a mid-day re-dispatch.
- Christine↔Chioma dispute-chase — treasury workflow Awareness, not CTO-specificity.
- Bot content-blind pattern now 3rd tick on B098VURV46Q — directive updated with codification-gate at next tick.
- Accumulated for briefing-2026-04-24: (a) Christine-Chioma dispute workflow, (b) bot content-blind 3rd-tick, (c) Ecobank Slack-closure propagation watchpoint, (d) TDSD-6684/TDSD-6695 Jira deltas this tick (see source-config-jira).

**Advanced `last_processed` to 2026-04-23T10:09:00Z.**
