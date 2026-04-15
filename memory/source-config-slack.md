---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: Signal source registration and filtering directives for Slack (Slack MCP).
updated: "2026-04-15T18:11:00Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-15T17:09:00Z"
---

## Connection

- **Connector:** Slack MCP
- **Workspace:** moniepoint.slack.com
- **User ID:** U080PEXEZ0E (Emeka Awagu)
- **Access patterns:**
  - `slack_read_channel` with channel ID — explicit reads for Tier 1 ops channels (absence-of-signal monitoring)
  - `slack_search_public_and_private` — primary sweep across DMs, private channels, and public channels (everything not on Tier 1)
  - `slack_read_thread` with message_ts — read thread replies when a top-level message is flagged

### Date format rule

Slack's `after:` search modifier accepts `YYYY-MM-DD` only. Substituting an ISO-8601 timestamp (`2026-04-15T16:09:00Z`) returns 0 results silently — this caused the 19-tick Oladapo DM miss in Session 54. When building search queries from `last_processed`:

1. Convert `last_processed` to `YYYY-MM-DD` in the workspace's local day.
2. Subtract 1 day. Slack's `after:` is day-exclusive — without the `-1d` offset, messages from the boundary day are lost.
3. After results return, dedupe by comparing `message_ts * 1000` (Slack returns `ts` as seconds with millisecond precision) against `last_processed_ms` (millisecond epoch of `last_processed`). Drop any message whose `ts * 1000 <= last_processed_ms`.

The `-1d` offset plus epoch dedupe eliminates boundary loss without reprocessing previously seen messages.

## Directives

The Slack sweep runs in this fixed order every heartbeat tick. Each step's output feeds the next.

1. **Tier 1 read-by-default** — `slack_read_channel` on each of the 5 ops channels below. Reads messages since `last_processed_ms` explicitly — search cannot observe absence.
2. **Search-all sweep** — `slack_search_public_and_private` with `channel_types=public_channel,private_channel,mpim,im` and `query=after:YYYY-MM-DD` (computed per Date format rule). Paginate until exhausted. Primary coverage for DMs, discovery, and everything not on Tier 1.
3. **Channel-first skip-list filter** — Drop every message whose channel ID is on the skip list. No LLM spend on these.
4. **Cheap-heuristic filter** — Drop bot-user messages, stereotyped pipeline/deploy/CI formats with no human interaction, messages matching known noise shapes. Record the dropped count for the tick summary.
5. **Per-message salience reasoning** — For each survivor, compute triggering factors (below) and classify per config-salience (Immediate / Briefing / Awareness).
6. **Per-tick cost cap** — If survivors after pre-filter exceed the cap (initial N = 40; tune as observed volume reveals the right ceiling), cluster by channel, reason top-N-by-recency per channel, and surface the remainder as a single volume-aware Awareness item (`"N additional messages in <channel> not individually reasoned; click through to review"`). Overflow clustering preserves signal visibility without unbounded LLM cost.

### Tier 1 — Ops channels (read-by-default)

Tier 1 channels are polled explicitly every tick because search-all cannot observe absence of signal. An empty `#account-switch-alerts` stream = portal down; a quiet P1 channel during an active incident window is itself the signal. Search returns messages only — an absent message is not a returned result.

| Channel | ID | Absence-of-signal meaning |
|---|---|---|
| #teamapt-tech-operations | C0ABU8GMW75 | P1 silence during known incident window |
| #account-switch-alerts | C098VUQCVRA | Empty alerts stream = portal down |
| #teamapt-x-paystack-transfer-support | C096LCNP26P | Silence during Paystack incident window |
| #notifications-support-dev | C08PH35PLPK | Silence during notification-service issue |
| #go-subscribe-by-teamapt | C090UHR9VDE | Silence during GoSubscribe/POS issue |

Tier 1 set review is trigger-based only — new ops channel created, or one archived. No cadenced sweep.

### Skip list

Seeded at deploy with observed noise. Grows via weekly bulk-confirm Decision item (below).

**Seeded channels (confirmed noise — drop by channel ID):**
- #teamapt-knowledge-sharing
- #teamapt-marketing-x-cs
- #a-clan

**Seeded bot-user drops (drop by sender regardless of channel):**
- Harness
- POS-Distribution
- Robusta

**Seeded as suspected-bot awaiting first weekly bulk confirm (drop provisionally; surface samples in weekly review):**
- Channels matching name patterns `-alerts`, `-notifications`, `-bot`, `-ci`, `-pipeline` — except the 5 Tier 1 ops channels listed above.

### Suspected-bot accumulation — weekly bulk-confirm

On each tick, if a non-Tier-1, non-skip-list channel's observed messages are 100% bot-user origin and >= 3 messages have been seen, add the channel to the pending suspected-bot candidate set. Once per week (Monday 07:00 WAT briefing tick), emit one briefing Decision item listing all pending candidates with each channel's last-traffic-signature. User disposition per channel: approve (move to skip list) / reject (remove from candidate set). Per-briefing per-channel surfacing is explicitly disallowed — decision fatigue defeats the mechanism during warmup when many candidates exist.

### Monthly skip-list regression review

On the first briefing tick of each calendar month, emit one Decision item per skip-list channel. Each row shows: added-date, confirmed-by-user-date, last-traffic-signature (bot-only % over the trailing 30 days). User action per channel: keep / reconsider / surface sample. "Surface sample" surfaces the next 5 non-bot messages from that channel on the next tick for user inspection.

Rationale: this is the only cadenced review mechanism in the Slack sweep. A false-positive skip-list addition drops real signal silently — the Improve phase's surfaced-vs-acted comparison is blind to messages never surfaced. Regression review is the structural guard.

### Salience factors (per-message)

Replaces the previous tier-1/2/3 priority scheme. Each surfaced item's briefing References section MUST include a `Factors:` line listing the triggering factors by name — this is the calibration substrate for the Improve phase.

1. **Channel identity**
   - Tier 1 ops channels → high weight toward Immediate
   - Priority-channel set (below) → medium weight
   - Other channels → no channel-identity contribution
2. **Keyword floor** — Message body contains any of `P1`, `down`, `outage`, `incident`, `RC91`, `settlement`, `blocked`, `failed` → Immediate regardless of channel.
3. **Active-situation entity match** — Message names an entity wiki-linked from a page where `type=situation AND status != retired` → elevate.
4. **@mention of me** — Message body contains `<@U080PEXEZ0E>` → Immediate.
5. **DM** — Channel type `im` or `mpim` → always surface.
6. **Sender weighting** — Sender is a committee member, Dennis, or a direct report → elevated.

**Priority-channel set (medium channel-identity weight):**

| Channel | ID |
|---|---|
| #teamapt-executives | C09LC0YBK9B |
| #aptpay-tactical-team | C080ZEK43NG |
| #teamapt-limited-strategy-and-business-dev-committee | C08CJKX73DE |
| #teamapt_non_exec | C081570UJP6 |
| #moniepoint-mfb-management-credit-committee | C09ATV6CVLM |
| #teamapt-change-management-committee | C081G4JDVT8 |
| #teamapt-board-evaluation-follow-up-group | C08D9B1JGSK |
| #teamapt_infra_notifications | C08RKF5NHBQ |
| #teamapt_infrastructure_ops | C083TNW8J1X |
| #cyberpay-teamapt-direct-debit | C0A9URY50DA |
| #moniepoint-teamapt-transfers-support | C08DTNWR1K4 |
| #internal-sterling-teamapt-integration | C0A4PPB8YPN |

### Thread handling

- Monitor top-level messages in Tier 1 channels every tick.
- Monitor thread replies in Tier 1 channels and in any thread where `<@U080PEXEZ0E>` appears in the parent or a reply.
- If a thread in a Tier 1 channel expands beyond 10 replies, flag as a developing situation.

### Clustering

When multiple surfaced messages reference the same entity (bank, ticket, service) within the same heartbeat window, surface as a single clustered item with cross-references — not as individual messages. The cluster counts as one briefing item; its factor trace is the union of contributing messages.

## Notes

- Private channels require channel ID for `slack_read_channel`. The search-all sweep covers private channels via `channel_types=private_channel`.
- **Accepted gap:** if I'm added to a private channel, nobody tags me, and I don't post or react, search-all still surfaces messages from it — but only after the first message appears. Silent private channels remain undiscoverable until they aren't silent.
- **Accepted gap:** the cheap-heuristic filter may drop a bot-user message carrying real signal (e.g., a genuinely actionable alert masquerading as routine noise). First-occurrence failures of this kind surface at weekly/monthly review when the channel's bot-only % is audited.
- **Introspection weakness:** "am I watching X?" requires checking skip list intersection with workspace membership — no single query answers it directly.
- Channel IDs are stable; channel renames don't break monitoring.
- **2026-04-15 18:09 WAT tick:** DM sweep zero results. **Twenty-first consecutive quiet DM tick.** Tier 1 P1-keyword search in #teamapt-tech-operations zero hits for this hour. User in Product-Engineering Sync 18:00–19:00 WAT during this tick. Union Bank RC91 P1 (filed via email 15:07 WAT to wrong address) still no Slack crossover — the P1 appears to have never reached #teamapt-tech-operations, compounding the routing-error gap. Low-volume retreat-day baseline continues.
- **2026-04-15 17:09 WAT tick:** DM sweep (`to:<@U080PEXEZ0E> after:2026-04-15`) zero results. Twentieth consecutive quiet DM tick. Tier 1 P1-keyword search in #teamapt-tech-operations also zero hits for this hour. User heading into Product-Engineering Sync 18:00–19:00 WAT. Low-volume retreat-day baseline continues; no Slack activity of note this hour.
- 2026-04-15 16:09 WAT tick: DM sweep zero results. Nineteenth consecutive quiet DM tick. User's CTO/Abayomi 1:1 (15:00–15:30 WAT) ended; next on calendar 18:00 WAT Product-Engineering Sync. The Monnify Atlas NIP Outwards Transit duplicate-debit escalation this tick came via email only — Tolulope CC'd to Emeka — no Slack crossover. Tier 1 channel read skipped this tick (no new signals since 15:09 WAT tick — low-volume retreat-day baseline holds).
- 2026-04-15 15:09 WAT tick: DM sweep zero results. Eighteenth consecutive quiet DM tick. Retreat Day 2 continuing; user in CTO/Abayomi 1:1 15:00–15:30 WAT. Union Bank RC91 P1 filing came in via email exclusively — no Slack crossover. Tier 1 channel read with oldest filter returned old join-messages only (filter may not be honoring `oldest`); relying on prior-tick baseline (channel active but low volume). Slack DM draft queued to self for the Immediate alert.
- 2026-04-15 14:09 WAT tick: DM sweep zero results. Seventeenth consecutive quiet DM tick.
- 2026-04-15 13:09 WAT tick: DM sweep zero results. Olamide Ajibulu P1 posting at 10:03 WAT Apr 15 NIBSS PTSA brief downtime (4 min, 09:49–09:53 WAT). Channel re-tiered from "channel-stale" to "active but low volume."
- 2026-04-15 12:09 WAT tick: DM sweep zero results. Fifteenth consecutive quiet Slack tick.
- 2026-04-15 11:09 WAT tick: Tier 1 no new messages. Slack search MCP rate-limited; DM/discovery sweep skipped.
- 2026-04-15 10:09 WAT tick: DM sweep zero results. Thirteenth consecutive quiet tick.
- 2026-04-15 09:09 WAT tick: DM sweep zero results.
- 2026-04-15 08:10 WAT tick: DM sweep zero results.
- 2026-04-15 07:10 WAT briefing tick: DM sweep zero results.
- 2026-04-14 23:09 WAT tick: Ninth consecutive quiet tick.
- 2026-04-14 21:09 WAT tick: Eighth consecutive quiet tick. Fidelity RC91 Cycle 4 filed AND resolved via email without any #teamapt-tech-operations entry.
- **Sweep redesign deployed 2026-04-15** — Session 55 hybrid design replaced directed-channel Tier 1/2/3 scheme with: Tier 1 read-by-default (absence-of-signal) + search-all primary sweep + seeded skip list + 3-layer pre-filter + salience factors replacing tier priority + weekly suspected-bot bulk-confirm + monthly skip-list regression review + per-tick cost cap with overflow clustering. Fixes Session 54 date-format bug (`last_processed` → `YYYY-MM-DD - 1d` + epoch dedupe).
