---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-17T19:09:00Z."
updated: "2026-04-17T20:05:08Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T19:09:00Z"
---

## Connection

Slack MCP (workspace-scoped). User ID for DM dispatch: U080PEXEZ0E. Tier 1 channels: #teamapt-tech-operations (C0ABU8GMW75), #account-switch-alerts (C098VUQCVRA), #teamapt-x-paystack-transfer-support (C096LCNP26P), #notifications-support-dev (C08PH35PLPK), #go-subscribe-by-teamapt (C090UHR9VDE).

## Directives

### Priority model
- Tier 1: listed channels above — read every tick.
- Tier 2: DMs mentioning the user — read every tick.
- Tier 3: keyword matches across public + private via `slack_search_public_and_private`.

### Keyword rules
- Primary: RC91, P1, outage, degraded, intermittent, failing, failure, down.
- Issuer names (always): Stanbic, Ecobank, Sterling, Polaris, Wema, NIBSS, PTSA, NUS, CoralPay.

### Skip rules
- Ignore bot-only status pings that produce no delta vs. the last recorded state.
- Ignore messages in channels not listed above unless surfaced via keyword search.

### Sweep order (MUST execute in this order each tick)
1. **Read** all Tier 1 channel parent messages since last_processed — enumerate every new P1 filing, not only threads linked to existing situation pages. (Structural guard against the 2026-04-17 Wema miss, where the midday ticks focused on tracked situations and missed a new P1 that was filed as a parent message in the same channel.)
2. **Cross-check** any P1 filings from step 1 against existing situation pages — if untracked, create a new situation page.
3. **Read** DMs to user.
4. **Search** keyword matches (Tier 3) for the window.
5. **Per-message** salience reasoning + brain-wide similarity search.

### Known limitations
- `slack_search_public_and_private` with space-separated terms is AND-only (no boolean). Use channel reads for authoritative coverage; use search only to confirm specific keyword presence. Boolean OR syntax fails silently (zero results) — confirmed again at 18:09 WAT 2026-04-17 tick.
- Rate-limiting observed on parallelized channel reads + searches. Retry once when encountered; continue the tick if persistent.
- Search index lag: recent messages (same-day filings) often return zero even when surfaced via channel-read. Channel-read is authoritative; search is confirmation-only for recent windows.

## Notes

Tick 2026-04-17 20:09 WAT window (18:09 → 20:09 WAT, spans the 19:00 WAT wind-down gap): **C0ABU8GMW75 rate-limit from the 18:09 tick cleared** — single-tick rate-limit confirmed (not a persistent pattern). This tick successfully read 50 messages from #teamapt-tech-operations, picking up three new P1 filings that landed in the evening window:

- **Stanbic RC91 P1** filed 18:05 WAT by Olamide Ajibulu (cycle 27 — tracked on [[Stanbic Bank ATS — Persistent RC91 Pattern]]).
- **Polaris RC91/06 P1** filed 18:16 WAT by Olamide Ajibulu (second cycle of day — tracked on [[Sterling + Polaris — Routes Degraded]] as delta).
- **UBA RC91 P1** filed 18:45 WAT by Olamide Ajibulu (first UBA cycle of day — new situation page [[UBA Bank — RC91 P1 Apr 17]] created).

All three new P1s cross into the evening wind-down window and have been noted rather than Immediate-dispatched — calibration precedent from briefing-2026-04-17 16:30 triage (recurring RC91 P1s are expected pattern, re-dispatch = noise). Carries into briefing-2026-04-18.

Morning-active P1s (Wema 11h17m silent since 08:52 filing, NIBSS 9h06m silent since Moses 11:03 dispute, Polaris morning-cycle 8h30m silent since 11:39 filing) remain silent across all Tier 1 channels in this window — 15:09 WAT consolidated dispatch remains the authoritative alert, no fresh Immediate.

DM channel empty. Keyword searches (P1, RC91, outage/down/failure) continued to return zero for today (search index lag is now well-documented — compensating via Tier 1 channel-read). Structural guard from the Wema miss is working as designed: the parent-message sweep caught all three evening P1 filings this tick.
