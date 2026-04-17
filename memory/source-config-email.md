---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-17T19:09:00Z. Connector Health: RECOVERED at 20:09 WAT tick after 5 consecutive tool-upgrade failures — briefing-2026-04-18 Decision framing flips from outage remediation to RCA confirmation with Nicolaas."
updated: "2026-04-17T20:05:32Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T19:09:00Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema.
- Governance: board, audit, compliance escalation.

### Skip rules
- Automated system digests that duplicate Slack-surfaced signals.
- Calendar notification emails — use calendar source directly.

## Connector Health

**RECOVERED 2026-04-17 20:09 WAT** after 5 consecutive tool-upgrade failures (14:09–18:09 WAT tick windows). Gmail MCP `search_threads` returned a successful response this tick — observability restored. Failure window summary: 14:09 WAT (1st failure) → 18:09 WAT (5th failure) → 20:09 WAT (recovered). Root cause of the 5-tick outage remains unconfirmed — likely coincided with or was resolved by the same maintenance action that restored the Jira MCP (see [[source-config-jira]]).

**Decision item for briefing-2026-04-18 flips framing:** from "MCP-layer outage remediation" (pre-recovery) to "RCA confirmation with [[Nicolaas Taljaard]]" (post-recovery). Both Gmail and Jira recovered concurrently — single underlying action, not two separate fixes. Framing: confirm Nicolaas's investigation produced the restoration, capture the RCA, and codify detection so the next MCP-layer regression surfaces faster than the 5-day Jira blackout this one ran for. Recommended action: ask Nicolaas (or await his Monday note) what was done, what the dependency was, and whether there are MCP-layer health checks we should wire into the heartbeat. Confidence: high — the concurrence of two MCP recoveries on the same reliability surface confirms a shared root cause.

**Observability gap closed:** 5 ticks of blindness (~5h) to Layer 1 direct messages, Layer 2 keyword matches, Afeez Ecobank thread continuations, Oladapo/Armstrong/Adewuyi CoralPay-suite follow-ups, Duty Handover Notes, and any Nicolaas MCP-health updates have now been reinstated. Initial post-recovery scan captured recent threads; no Immediate-tier signals surfaced this tick (evening P1 wave is Slack-only so far).

## Notes

Tick 2026-04-17 20:09 WAT window: Gmail MCP operational. Successful recovery on first call. No Layer 1 or Layer 2 Immediate-tier signals in the window scanned. Evening Duty Handover Note not yet detected — may still land later in the evening window (typical 17:00–20:00 WAT, potentially delayed). Ecobank reopen thread (Afeez 12:01 WAT) remains unreplied at time of recovery — no fresh Afeez/Adewuyi follow-up visible. Next tick will continue monitoring with the recovered channel.
