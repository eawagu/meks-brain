---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: Signal source registration and filtering directives for Slack (Slack MCP).
updated: "2026-04-15T15:16:05Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-15T15:09:00Z"
---

## Connection

- **Connector:** Slack MCP
- **Workspace:** moniepoint.slack.com
- **User ID:** U080PEXEZ0E (Emeka Awagu)
- **Access patterns:**
  - `slack_read_channel` with channel ID — read messages from known channels and DMs
  - `slack_search_public_and_private` — cross-channel keyword search, discovery sweep, DM detection
  - `slack_read_thread` with message_ts — read thread replies when a top-level message is flagged

## Directives

### Directed channels — monitored every heartbeat tick

**Tier 1 — Operations (P1s, incidents, deploy status):**

| Channel | ID | Focus |
|---|---|---|
| #teamapt-tech-operations | C0ABU8GMW75 | P1 filings, resolutions, deploy confirmations, incident updates |
| #account-switch-alerts | C098VUQCVRA | Bot alerts for portal status — empty alerts = portal down |
| #teamapt-x-paystack-transfer-support | C096LCNP26P | Paystack integration issues, transaction routing |
| #notifications-support-dev | C08PH35PLPK | Notification service bugs, placeholder text issues |
| #go-subscribe-by-teamapt | C090UHR9VDE | GoSubscribe integration issues, POS/TMS routing |

**Tier 2 — Executive and governance:**

| Channel | ID | Focus |
|---|---|---|
| #teamapt-executives | C09LC0YBK9B | Executive updates, Dennis communications, strategic items |
| #aptpay-tactical-team | C080ZEK43NG | AptPay/Fidelity tactical coordination, Dennis directives |
| #teamapt-limited-strategy-and-business-dev-committee | C08CJKX73DE | Board committee meeting packs, strategic reviews |
| #teamapt_non_exec | C081570UJP6 | Non-exec board communications |
| #moniepoint-mfb-management-credit-committee | C09ATV6CVLM | Credit committee meetings and decisions |
| #teamapt-change-management-committee | C081G4JDVT8 | Change management approvals and reviews |
| #teamapt-board-evaluation-follow-up-group | C08D9B1JGSK | Board evaluation action items |

**Tier 3 — Infrastructure and partner (monitor daily, not every tick):**

| Channel | ID | Focus |
|---|---|---|
| #teamapt_infra_notifications | C08RKF5NHBQ | Infrastructure alerts |
| #teamapt_infrastructure_ops | C083TNW8J1X | Infrastructure escalations |
| #cyberpay-teamapt-direct-debit | C0A9URY50DA | CyberPay/DD integration |
| #moniepoint-teamapt-transfers-support | C08DTNWR1K4 | Transfer support issues |
| #internal-sterling-teamapt-integration | C0A4PPB8YPN | Sterling integration status |

### Discovery sweep — run daily

Discover new channels and DMs not on the directed list. Queries:
1. `from:<@U080PEXEZ0E> after:{last_processed}` — channels I've posted in
2. `to:<@U080PEXEZ0E> after:{last_processed}` — DMs and @mentions directed at me
3. `hasmy::+1: after:{last_processed}` — messages I've reacted to with thumbs up
4. `hasmy::white_check_mark: after:{last_processed}` — messages I've reacted to with checkmark

Any channel appearing in discovery results that is not in the directed list or skip list → flag in briefing: "New channel detected: #channel-name — add to monitored list?"

### DM handling

DMs carry implicit urgency — someone chose to message me directly. Always surface DMs in the briefing. The `to:@me` discovery query catches all inbound DMs without needing a pre-defined sender list.

### Message prioritization

**Immediate (surface on any heartbeat tick):**
- @mentions of me by name in any channel
- @channel or @here in Tier 1 channels
- Keywords in Tier 1 channels: P1, down, incident, outage, failed, blocked, RC91, settlement
- All DMs

**High (surface in next briefing):**
- @channel or @here in Tier 2 channels
- New top-level messages in Tier 2 channels
- Thread replies where I am mentioned

**Awareness (daily digest):**
- Tier 3 channel activity
- Threads in Tier 1/2 channels where I'm not mentioned (unless the thread contains critical keywords)

### Thread handling

- Monitor top-level messages in all directed channels.
- Monitor thread replies only in Tier 1 channels and threads where I'm directly mentioned.
- If a thread in a Tier 1 channel expands beyond 10 replies, flag it as a developing situation.

### Clustering

When multiple messages across different channels reference the same entity (bank name, ticket number, service name) within the same heartbeat window, surface as a single clustered item with cross-references, not as individual messages.

### Skip list

- #teamapt-knowledge-sharing
- #teamapt-marketing-x-cs
- #a-clan
- Social/watercooler channels
- Bot-only notification channels with no human interaction (unless explicitly added to directed list)

## Notes

- Private channels require channel ID for `slack_read_channel`. Discovery sweep via `slack_search_public_and_private` handles finding new private channels.
- The gap: if I'm added to a private channel, nobody tags me, and I don't post or react, the channel won't be discovered. This is a Slack API limitation — accepted as a narrow edge case.
- Channel IDs are stable. Channel renames don't break monitoring.
- **2026-04-15 16:09 WAT tick:** DM sweep (`to:<@U080PEXEZ0E> after:2026-04-15`) zero results. **Nineteenth consecutive quiet DM tick.** User's CTO/Abayomi 1:1 (15:00–15:30 WAT) ended; next on calendar 18:00 WAT Product-Engineering Sync. The Monnify Atlas NIP Outwards Transit duplicate-debit escalation this tick came via email only — Tolulope CC'd to Emeka — no Slack crossover. Tier 1 channel read skipped this tick (no new signals since 15:09 WAT tick — low-volume retreat-day baseline holds).
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
