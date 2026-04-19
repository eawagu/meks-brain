---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T06:11:27Z. Overnight window included TDSD-6624 (Stanbic cycle 31) and TDSD-6625 (Access cycle 8) filing emails via Jira-notification path at 07:18–07:21 WAT. RECOVERY HOLDING — 35h02m post-recovery, 10 consecutive clean ticks."
updated: "2026-04-19T07:40:12Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T06:11:27Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity.
- Governance: board, audit, compliance escalation.

### Skip rules
- Automated system digests that duplicate Slack-surfaced signals.
- Calendar notification emails — use calendar source directly.

## Connector Health

**RECOVERY HOLDING** — 35h02m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 10 consecutive ticks clean since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 07:11 WAT briefing-tick window (22:09 WAT Apr 18 → 07:11 WAT Apr 19, Full work level per briefing-tick override): **Overnight RC91 wave correspondence plus morning Jira-notification filings.**

Key email deltas in-window:
1. **TDSD-6624 filing notification** (07:18 WAT Apr 19, via Jira email path) — Stanbic cycle 31 record. [[Stanbic Bank ATS — Persistent RC91 Pattern]] updated.
2. **TDSD-6625 filing notification** (07:21 WAT Apr 19, via Jira email path) — Access cycle 8 record. [[Access Bank — Multi-Track Failures]] updated.
3. Email tracks accompanying the overnight wave for NIBSS PTSA, Fidelity, and Union Bank cycles have not been enumerated exhaustively at tick time — Slack channel-read was the authoritative path for onset times; email verification pending.

No Layer 1 (To:me) catches this window confirmed at tick time. Layer 2 keyword hits aggregated via overnight-wave correspondence — all five participating bank threads tie back to the same briefing Decision item (B1 overnight-wave concentration). Not re-dispatched Immediate (overnight-delegation window suppression applied 23:00 Apr 18 → 06:00 Apr 19). Wave carries into briefing-2026-04-19 as Decision tier — upgrade from prior calibration precedent because the 7h+ resolution-latency regime change breaks the fast-cycle pattern assumption underlying B6/B1-hold.
