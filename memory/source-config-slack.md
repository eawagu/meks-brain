---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives. last_processed 2026-04-23T08:10:00Z. 09:11 WAT Apr 23 Full tick (weekday-working-hours): Tier 1 sweep — 4 of 5 channels clean; #go-subscribe-by-teamapt has Fatai Ibrahim + Oluwadayo Osborne filing ATS STAGING environment POS transaction failure (RC91/processing code 09, Lewis/Ketan/Yasir tagged) at 08:35-08:37 BST (09:35-09:37 WAT) — staging, awareness-tier. #account-switch-alerts + #teamapt-x-paystack carry bot messages with empty text (content-blind per directive). DM scan zero. Keyword scan zero. Cross-source asymmetry 2nd observation: Ecobank RC91 P1 surfaced via email only, zero Slack mirror."
updated: 2026-04-23
cssclasses:
  - "source-config"
last_processed: "2026-04-23T09:10:00Z"
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

### Block-formatted bot content — content-blind observation (2026-04-23 08:10 WAT; 2nd bot 09:11 WAT)
`#account-switch-alerts` (C098VUQCVRA) bot B098VURV46Q and `#teamapt-x-paystack-transfer-support` (C096LCNP26P) bot B0AQ9MDE0BZ both post block-formatted messages with empty top-level `text` field — content lives in attachments/blocks not exposed by current MCP retrieval (`slack_read_channel` detailed mode + `slack_search_public_and_private` both return empty text). Cannot classify these messages as Immediate-tier (e.g., route-turned-off alert per config-salience trigger #7) without block-content access. **Current posture:** treat as known blind spot; absence of alarm cannot be verified. Second bot observation (different channel, different bot, same empty-text pattern) compounds the signal but both are still single-tick-of-each — **stand down on codification pending 3+ ticks of recurrence** on either bot before escalating to source-config directive requiring `slack_read_thread` on each bot-ts + attempted permalink fetch as content-recovery path.

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Seven ticks across the day (12:45 Full catch-up, 14:15 Full, 16:15 Full, 17:09 Full, 18:09 Skim, 20:00 Skim, 22:10 Skim early-exit). briefing-2026-04-22 composed at ~12:45 WAT (catch-up Full) covering 43.5h back to 2026-04-20T16:09:00Z. 3 Immediate-tier silent-unresolved items batched into B1 CTO-DM draft to Oladapo (Polaris/UBA RC96/CoralPay FBN). NIBSS PTSA VPN flap pattern crystallized into architectural transition to leased-line at 19:17 WAT Apr 22 (new situation [[NIBSS PTSA — VPN Flapping Apr 22]]). B1 batch CTO-DM draft remained unsent by user throughout the day — 10h+ dispatch-authorization gap at end-of-day. Email + Calendar + Google Drive MCPs dark all day.

### Tick 2026-04-23 (condensed for 06:10 WAT briefing + 07:10 skim + 08:10 full)

**06:10 WAT briefing-tick Full** — 8h10min overnight window 21:00 UTC Apr 22 → 05:10 UTC Apr 23 clean. 4 of 5 Tier 1 channels fully silent; Jira-side critical delta (TDSD-6645 Dominic broke 59h15m silence, attribution-transfer to inwards payments team). briefing-2026-04-23 composed with 5 Decision + 5 Awareness. Gmail/Calendar/Drive still dark. Carry into D4.

**07:10 WAT Skim (post-briefing, pre-work-hours)** — 1h window clean on Slack; Jira-side TDSD-6692 UBA fast-cycle (6-min lifetime, bank-resolved). Cross-source asymmetry 1st observation (Jira-only).

**08:10 WAT Full (weekday work-hours opener)** — 1h window; Tier 1: 4 of 5 clean, #account-switch-alerts bot content-blind (first observation codified). TDSD-6675/TDSD-6592 closures + AS-* bulk grooming on Zone Switching Partnership. All Awareness-tier.

### Tick 2026-04-23 ~09:11 WAT — Full (weekday working-hours; 10+ active situations; Gmail recovery)

Window: 07:10 UTC → 08:11 UTC Apr 23 (~1h; `oldest=1776928200` for Slack channel reads; `after=1776928200` for search-all). Step 0 declared `level=full, rationale=weekday-working-hours-active-situations`.

**Tier 1 read (5 channels):**
- **#teamapt-tech-operations (C0ABU8GMW75):** zero new messages. 16h+ since last activity at 22:10 WAT Apr 22. Operational silence on canonical ops channel — relevant to cross-source asymmetry pattern (see below).
- **#account-switch-alerts (C098VUQCVRA):** 1 bot message 09:03:50 BST (08:03 UTC) — bot B098VURV46Q (same as yesterday's observation), empty text payload (content-blind per codified directive). No thread children.
- **#teamapt-x-paystack-transfer-support (C096LCNP26P):** 2 bot messages 08:58:25 + 09:03:18 BST — bot B0AQ9MDE0BZ (NEW bot; different from the account-switch-alerts bot), both with empty text payload. Content-blind — directive updated above to cover this second bot observation.
- **#notifications-support-dev (C08PH35PLPK):** zero new messages.
- **#go-subscribe-by-teamapt (C090UHR9VDE):** 2 messages — [[Fatai Ibrahim]] + [[Oluwadayo Osborne]] filed ATS STAGING environment POS transaction failure (response code 91 / processing code 09, terminalId=3CDD0001 CDD direct-debit context, timestamp 2026-04-22 17:40:28 WAT). Tagged Chukwuemeka Nnaji / Fatai Ibrahim / Yasir. **Classification:** staging-environment only — Awareness-tier.

**Search-all Immediate-tier keyword scan** `(P1 OR outage OR RC91 OR RC96 OR RC05 OR RC06 OR breach OR compromised OR NIBSS OR down OR failure)` with `after=1776928200`: zero results (post-filtered).

**Tier 2 DM scan** (`to:me after=1776928200`): zero results.

**Critical cross-source signal — Ecobank RC91 P1 surfaced via Gmail recovery this tick (NOT via Slack).** Email thread 19db8d64f00a406d filed Apr 23 06:35 WAT by Daniel Armstrong + 08:52 WAT chase by Olamide Ajibulu ("persisted for over 2 hours"). Zero Slack #teamapt-tech-operations mirror at observation time — 2nd observation in 3h of operational signals bypassing canonical Slack ops channel (after TDSD-6692 UBA fast-cycle Jira-only at 06:44 WAT). Dispatched Immediate-tier via `slack_send_message_draft` to user self-DM D081JT4AD0Q. Situation page [[Ecobank — RC91 on NUS Nodes]] updated with Apr 23 fresh-cycle delta.

**Cross-source asymmetry pattern — stand-down on codification.** 2 data points in 3h across 2 heterogeneous mechanisms (Jira-only fast-cycle, Email-only escalation). Not yet enough to codify a source-config directive change. Watch for 3rd observation within 24h. [NOTE: see 10:09 WAT tick below — Ecobank asymmetry reclassified as 27-min sequencing lag after Olamide's 09:38 WAT Slack P1 filing; TDSD-6692 UBA fast-cycle remains the standing 2nd data point.]

**Active-situation thread vigilance:**
- TDSD-6645 — Dominic silent 5h03m post-04:08 WAT attribution-transfer comment. Within expected morning-hours quiet; no flag.
- TDSD-6630 — NIBSS DD silent ~76h from 05:27 WAT Apr 20; retirement decision still held in briefing-2026-04-23 D2.
- NIBSS PTSA leased-line stable ~13h54m post-19:17 WAT Apr 22 transition; under 24h threshold for `stable` status transition.

**Dispatch decisions:**
- Immediate-tier Slack DM draft created for Ecobank RC91 P1 (covered above + see source-config-email).
- [[Ecobank — RC91 on NUS Nodes]] situation page updated.
- #go-subscribe ATS staging message — Awareness-tier, accumulated for briefing-2026-04-24.
- Bot content-blind directive extended to cover B0AQ9MDE0BZ second-bot observation.
- No other Slack signals warrant dispatch.

**Advanced `last_processed` to 2026-04-23T08:10:00Z.**

### Tick 2026-04-23 ~10:09 WAT — Full (weekday working-hours; active situations)

Window: 08:10 UTC → 09:10 UTC Apr 23 (~1h; `oldest=1776931800` for Slack channel reads; `after=1776931800` for search-all). Step 0 declared `level=full, rationale=weekday-working-hours + active-P1-situations + recent-dense-signals`. briefing-2026-04-23 already exists (composed 06:28 WAT) — not a briefing tick.

**Tier 1 read (5 channels):**
- **#teamapt-tech-operations (C0ABU8GMW75):** 1 message — [[Olamide Ajibulu]] **formal P1 filing for Ecobank RC91** at 09:38:35 local (message_ts 1776934715). Standard incident-report template: `Product: Switch / Incident Summary: P1: ECO Bank RC 91 Failures / Identified Cause: From the bank / Resolution Action: escalated to the bank for resolution / Start Time: 8:00 AM / End Time: Ongoing`. **This is the Slack mirror for the Ecobank email thread detected in 09:11 tick** — arrives 27 minutes after the 09:11 observation. Asymmetry reclassified as sequencing lag (email-to-bank → internal Slack P1), not structural signal-routing gap for this cycle. [[Ecobank — RC91 on NUS Nodes]] updated with 09:38 WAT delta.
- **#account-switch-alerts (C098VUQCVRA):** zero new messages.
- **#teamapt-x-paystack-transfer-support (C096LCNP26P):** 2 messages — unknown sender (likely bot/app with content exposed this time) 09:29 WAT with inflow schedule: "kindly see new inflows that are yet to be applied shaded in yellow. Bank statement and balance screenshot attached. Kindly apply # 1,550,465,282.14" — tagged [[Mustapha Ajibade]] + [[Christine Ogude]]. Then [[Christine Ogude]] at 09:55 WAT "Hi Chiamaka, acknowledged". **Correlates with TDSD-6694 "Paystack Balance Adjustment April 23rd" filed 10:10 WAT** — treasury operational workflow. Awareness-tier. (Note: content visible here — not all C096LCNP26P bot messages are content-blind; the empty-text pattern seen in 09:11 tick was for a different bot template.)
- **#notifications-support-dev (C08PH35PLPK):** zero new messages.
- **#go-subscribe-by-teamapt (C090UHR9VDE):** zero new messages (ATS staging thread from 09:11 tick silent).

**Search-all Immediate-tier keyword scan** `(P1 OR RC91 OR RC96 OR RC05 OR outage OR breach OR down OR failure OR incident)` with `after=1776931800`: 20 results (cost-capped). Post-filter findings:
- #teamapt-tech-operations Olamide Ecobank P1 (covered above).
- **#tech-operations (C09SMABE0F8, MONIEPOINT channel, NOT Tier 1) — Akinola Akintayo at 09:41 WAT (message_ts 1776933659):** "We currently managing an incident where there is a rising backlog on the `moniepoint-cba-transaction-service-batching-consumer-low` service. This has also caused the async high priority backlog to hover around the 1,000 mark. Kindly join the resolution call [meet.google.com/usp-eaxv-niq](https://meet.google.com/usp-eaxv-niq)". Live Moniepoint infra incident, resolution call running. Thread has no replies (fresh parent). **Classification:** Moniepoint ops-team incident on cross-org infra (CBA = Core Banking Application; Monnify depends on it), no CTO tag, no TeamApt-team tag, no P1 marker in message. Awareness-tier for briefing-2026-04-24 — not Immediate (no CTO-specificity marker; ops team running resolution call).
- #monnify-infra-support / #monieworld-monnify / #moniepoint-monnify-trx-confirmation / #tech-operations (other): mixed routine ops signals — pending/failed transaction follow-ups, NIN verification slowness (YouVerify), CS incident updates (NIN service). No CTO-specificity, no active-situation match. Awareness-tier.
- Misc non-operational: mp-product-and-engineering meeting cancellation, savings-dashboard UI discussion, sterling-teamapt-integration Kevin Ng'Eno TSQ-clause-5.5 discussion, direct-pull-api call reminder, everyone-in-moniepoint birthday greetings. Skip.

**Tier 2 DM scan** (`to:<@U080PEXEZ0E> after=1776931800`): 1 message — [[Ravi Veluguleti]] in DM: "are we meeting today Emeka?". Calendar confirms 10:00-10:30 WAT "Ravi / Emeka" meeting (recurring, accepted). Routine pre-meeting ping. No action.

**Active-situation thread vigilance:**
- TDSD-6645 — Dominic silent 6h01m post-04:08 WAT attribution-transfer comment. Within morning-hours expected quiet.
- TDSD-6630 — NIBSS DD silent ~77h+ from 05:27 WAT Apr 20; retirement still held in briefing-2026-04-23 D2.
- NIBSS PTSA leased-line stable ~14h52m post-19:17 WAT Apr 22 transition; still under 24h `stable` threshold.
- Ecobank RC91 — fresh cycle active, last bank-contact signal was Olamide 08:52 WAT email chase + 09:38 WAT Slack formal P1. Bank-side silent. Under 1h absence-of-signal threshold.

**Dispatch decisions:**
- No Immediate-tier dispatch this tick (Ecobank already dispatched at 09:11 WAT; CBA Moniepoint backlog is cross-org Awareness-tier).
- [[Ecobank — RC91 on NUS Nodes]] situation page updated with 09:38 WAT Slack delta + asymmetry-reclassification note.
- CBA Moniepoint backlog, Paystack balance adjustment (TDSD-6694), settlement-reliability closures batch, MDRS sprint planning continuation, BambooHR time-off approvals, TDSD-6695 CloudFront public-access stopgap (MEDIUM security, Waiting for Approval) — all accumulated as Awareness for briefing-2026-04-24.

**Cross-source asymmetry status update.** Ecobank 27-min sequencing lag reclassifies that observation out of the asymmetry pattern. Current asymmetry count: 1 (TDSD-6692 UBA Jira-only, 2026-04-23 06:44 WAT). Stand-down-pending-3rd-observation directive still holds. Tracking window: 3rd observation must arrive within 24h of 1st (by 06:44 WAT Apr 24) to trigger directive codification; otherwise single-data-point dissolves into noise.

**Advanced `last_processed` to 2026-04-23T09:10:00Z.**
