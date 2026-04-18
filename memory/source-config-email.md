---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T21:09:27Z. One Ecobank email delta this tick (20:16 WAT follow-up from Olamide Ajibulu to Ecobank Card Switching Team — attribution-standoff escalation continues). RECOVERY HOLDING — 25h00m post-recovery, 8 consecutive clean ticks."
updated: "2026-04-18T21:21:51Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T21:09:27Z"
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

**RECOVERY HOLDING** — 25h00m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 8 consecutive ticks clean since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 22:09 WAT window (20:09 WAT → 22:09 WAT, Skim upgraded to Full for Email on keyword-hit): **One email delta — Ecobank RC91 follow-up (attribution-standoff escalation continues).**

**Ecobank 20:16 WAT follow-up email** (Layer 2 keyword match on RC91 + Ecobank). [[Olamide Ajibulu]] to Ecobank Card Switching Team (with [[Innocent Nwaokorie]]), second message in the Ecobank NUS-nodes attribution thread: 16:09 WAT initial email from Innocent ("RC91 persists on NUS nodes") → 16:36 WAT Olamide follow-up ("intermittent RC91 persists") → 20:16 WAT Olamide third escalation step reinforcing the persistence claim. Builds the attribution-standoff-escalation pattern. In parallel, Olamide filed [[TDSD-6619]] (Ecobank NUS-node RC91) at 20:17 WAT with a 20:32 WAT comment tying the Jira record to the email thread. Three-step escalation cascade now spans email + email + Jira on this track. [[Ecobank — RC91 on NUS Nodes]] updated with the 22:09 WAT delta and the third-escalation-step framing. Factors: urgency 0.65 · impact_scope 0.6 · cto_specificity 0.75 · pattern_significance 0.9 · accountability_alignment 0.9.

No Layer 1 (To:me) catches this window. No other Layer 2 keyword hits in-window — Stanbic (cycle 30 email already in prior tick), FCMB, Wema, UBA, Access all silent on email this tick. Not re-dispatched Immediate (calibration precedent briefing-2026-04-17 B1 held / briefing-2026-04-18 B6). Ecobank track accumulates for briefing-2026-04-19 as Decision item candidate.
