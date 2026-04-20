---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T05:09:34Z. 06:09 WAT Monday briefing tick: Stanbic cycle 31 closed overnight (inferred from TDSD-6629 Completed); Ecobank wait-state held (no overnight activity); DCIR portal carryforward; Nicolaas RCA 5d overdue. RECOVERY HOLDING — 60h post-recovery, 20+ clean ticks."
updated: "2026-04-20T05:37:22Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T05:09:34Z"
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

**RECOVERY HOLDING** — 60h post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` and `get_thread` operational; 20+ consecutive ticks clean since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open (5d elapsed since commitment).

## Notes

Tick 2026-04-20 06:09 WAT **full-level (06:00 briefing floor)**. Window: 20:09 WAT Apr 19 → 06:09 WAT Apr 20 (~10h, includes overnight delegation window 23:00–06:00 WAT).

Four signals/watches in-window:

1. **Stanbic cycle 31 closed overnight (inferred).** Email thread 19da2fa4960db78b — no visible TeamApt closure confirmation email in the tick window. Closure inferred from [[TDSD-6629]] Jira transition to Completed at ~00:08 WAT Apr 20 (~4h43m end-to-end from Apr 19 19:25 WAT cycle-open). Above fast-cycle envelope (typical 4m–64m active) but well below regime-change 7h+ windows. [[Stanbic Bank ATS — Persistent RC91 Pattern]] updated with cycle 31 closure delta. No Immediate dispatch (within-pattern bank-owned recurring cycle, B6 calibration precedent holds). Accumulated to briefing-2026-04-20 as Awareness A1. Factors: urgency 0.3 · impact_scope 0.5 · cto_specificity 0.4 · pattern_significance 0.9 · accountability_alignment 1.0.

2. **Ecobank thread 19da60c7ea537e24 — wait-state holds overnight.** Zero new activity since Apr 19 17:24 WAT [[Afeez Kazeem]] sample delivery to [[Adewuyi Mayowa]]. Elapsed ~12h45m at tick, within 24h bank-response heuristic — threshold 17:24 WAT today for CTO-direct-action case reactivation. [[Ecobank — RC91 on NUS Nodes]] delta appended noting wait-state. Dispatched to briefing-2026-04-20 as Decision item B4 with explicit watch-framing. Factors: urgency 0.45 · impact_scope 0.6 · cto_specificity 0.6 · pattern_significance 0.9 · accountability_alignment 0.9.

3. **DCIR portal failure signal (carryforward from Apr 19 evening, Layer 2 keyword-match).** Low-signal wait-state — no new escalation step observed overnight. Carries to briefing-2026-04-20 as Awareness A5 — awareness-level only pending next support-hour development.

4. **[[Nicolaas Taljaard]] RCA commitment 5d overdue.** No incoming email from Nicolaas in-window. Commitment-timer surfaces as Awareness A4 on briefing-2026-04-20. Commitment remains open; no new silence-escalation action this tick — surfacing-only.

No Layer 1 (To:user) operational threads in-window beyond routine notifications. No other Layer 2 keyword matches (UBA, Wema, Fidelity, Access, NIBSS outside DCIR context, PTSA, CoralPay, CBN, Keystone, Polaris, Sterling, FCMB).

No Immediate-tier dispatch this tick — Stanbic cycle 31 closed within-pattern; Ecobank is wait-state; DCIR awareness; Nicolaas commitment surfacing. Connector health confirmed via thread reads + keyword sweep.
