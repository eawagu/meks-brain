---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T16:09:28Z. RECOVERY HOLDING — 21h00m post-recovery. FCMB recovery-then-recurrence sequence (14:14 WAT recovery → 16:17 WAT re-failure → 16:49 WAT persistence); Ecobank 16:36 WAT follow-up \"intermittent RC91 persists\"."
updated: "2026-04-18T19:19:54Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T19:09:27Z"
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

**RECOVERY HOLDING** — 24h00m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 7 consecutive ticks clean since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 20:09 WAT window (17:09 WAT → 20:09 WAT, Skim upgraded to Full for Email on keyword-hit): **One email delta group — Stanbic cycle 30 email track.**

**Stanbic cycle 30** (Layer 2 keyword match on RC91 + Stanbic). Email filing 2026-04-18 18:40 WAT from [[Afeez Kazeem]] to operations distribution — second track within 1 minute of Slack filing 18:39 WAT. Resolution email 19:37 WAT closed the thread (~57 minutes from email filing, ~64 minutes end-to-end from first signal). Behavioral-signature shift vs. cycles 28/29 (both 4–7m email-only, no multi-channel amplification); this cycle's triple-track visibility (Slack + email + Jira [[TDSD-6618]]) itself is a defect-profile change worth flagging. [[Stanbic Bank ATS — Persistent RC91 Pattern]] updated with the cycle-30 delta, incorporating the email-track observations.

No Layer 1 (To:me) catches this window. No other Layer 2 keyword hits in-window — FCMB (recovery-then-recurrence from prior tick) and Ecobank (attribution-standoff from prior tick) both silent on email this tick. Not re-dispatched Immediate (calibration precedent briefing-2026-04-17 B1 held / briefing-2026-04-18 B6). Stanbic cycle 30 accumulates for briefing-2026-04-19 as pattern item.
