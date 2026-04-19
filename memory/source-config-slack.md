---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-19T09:11:37Z. Post-briefing skim tick observed one new Tier 1 delta: Access RC06 fast-cycle closure notice (18m, bank-resolved) — first RC06 on Access, card-layer failure distinct from RC91."
updated: "2026-04-19T09:23:27Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T09:11:37Z"
---

## Connection

Slack MCP (workspace-scoped). User ID for DM dispatch: U080PEXEZ0E. Tier 1 channels: #teamapt-tech-operations (C0ABU8GMW75), #account-switch-alerts (C098VUQCVRA), #teamapt-x-paystack-transfer-support (C096LCNP26P), #notifications-support-dev (C08PH35PLPK), #go-subscribe-by-teamapt (C090UHR9VDE).

## Directives

### Priority model
- Tier 1: listed channels above — read every tick.
- Tier 2: DMs mentioning the user — read every tick.
- Tier 3: keyword matches across public + private via `slack_search_public_and_private`.

### Keyword rules
- Primary: RC91, RC05, P1, outage, degraded, intermittent, failing, failure, down.
- Issuer names (always): Stanbic, Ecobank, Sterling, Polaris, Wema, NIBSS, PTSA, NUS, CoralPay, FCMB, Keystone, Access, UBA, Fidelity, Habari.

### Skip rules
- Ignore bot-only status pings that produce no delta vs. the last recorded state.
- Ignore messages in channels not listed above unless surfaced via keyword search.

### Sweep order (MUST execute in this order each tick)
1. **Read** all Tier 1 channel parent messages since last_processed — enumerate every new P1 filing, not only threads linked to existing situation pages. (Structural guard against the 2026-04-17 Wema miss.)
2. **Cross-check** any P1 filings from step 1 against existing situation pages — if untracked, create a new situation page.
3. **Read** DMs to user.
4. **Search** keyword matches (Tier 3) for the window.
5. **Per-message** salience reasoning + brain-wide similarity search.

### Known limitations
- `slack_search_public_and_private` with space-separated terms is AND-only. Use channel reads for authoritative coverage; use search only to confirm specific keyword presence.
- Rate-limiting on parallelized channel reads + searches. Retry once; continue the tick if persistent.
- Search index lag: recent messages often return zero even when surfaced via channel-read. Channel-read is authoritative.

## Notes

Tick 2026-04-19 10:11 WAT **skim-level** (post-briefing Sunday; overnight wave triaged by user at 08:50 WAT). Fast-path Tier 1 channel reads since 07:11 WAT last_processed:

1. **#teamapt-tech-operations** — Daniel Armstrong filed P1 closure notice ~09:50 WAT (09:50:52 BST timestamp). **Access RC06**, Start 09:27 WAT, End 09:45 WAT, 18-minute bank-resolved fast-cycle, identified cause bank-side. This is a **new RC06 observation on Access** — card-layer failure mode distinct from RC91 (acquirer-layer). [[Access Bank — Multi-Track Failures]] updated with new track (9) and 2026-04-19 10:11 WAT delta.
2. #account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev, #go-subscribe-by-teamapt — zero new messages since 07:11 WAT last_processed.
3. DM sweep via `slack_search_public_and_private query="to:<@U080PEXEZ0E> after:2026-04-19"` — zero results. Consistent with Sunday morning cadence.

**No Immediate-tier dispatch.** The RC06 incident carried P1 keyword but was already bank-resolved 2h14m before tick execution (09:45 WAT → 10:11 WAT = 26m; filed at 09:50 WAT as closure). Resolved-already + 18m duration + user active & triaged broader wave 90m prior → accumulates to next briefing as Awareness.

Parent-message structural guard held (Wema-miss guard intact). Keyword sweep Tier 3 skipped at skim — channel-read authoritative and the RC06 was caught via Tier 1.
