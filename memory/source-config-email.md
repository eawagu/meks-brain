---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed remains 2026-04-20T16:09:00Z (~64h backlog deferred to next briefing tick catch-up). 2026-04-23 09:11 WAT tick: Gmail MCP RECOVERED after ~64h dark window. Probe-sweep detected fresh Ecobank RC91 P1 cycle (thread 19db8d64f00a406d) filed 06:35 WAT + chased 08:52 WAT — Immediate-tier dispatch triggered via Slack draft. ATPP Daily Standup canceled today (calendar conflict relief). UBA DCIR portal pentest message recall observed. Marketing/cold outreach skipped per directive. Backlog catch-up sweep deferred to briefing-2026-04-24 06:00 WAT."
updated: "2026-04-23T08:20:42Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T16:09:00Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity, Union.
- Governance: board, audit, PCI, compliance, regulator.
- Process: duty handover, weekly status report, RCA.

### Skip rules
- Marketing/newsletter senders — skip.
- Automated status emails without operational keywords — discard unless matches active-situation entity.

### Query execution pattern (post 10:09 limitation note)
Use narrow per-keyword buckets with `newer_than:Nh` to stay inside Gmail MCP token budget:
- Layer 1 pass: `to:me newer_than:Nh`.
- Operational keywords pass: `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:Nh`.
- Governance/process pass: group tight synonyms only.
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR "Adewuyi Mayowa") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated through 17:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

## Notes

### Tick 2026-04-20 17:09 WAT Full-level (condensed — pre-dark)

Layer 1 `to:me newer_than:1h` returned NIBSS TSA Integration meeting confirmation thread Apr 21 14:00 WAT (calendar-overlap signal already captured). Layer 2 operational sweep zero in-window operational escalations. Three CTO-approval-gate candidates accumulating for Apr 21 briefing: TISD-480, TDSD-6203, Lattice Downward Reviews.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure)

Gmail MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 06:10 WAT briefing tick / Apr 23 07:10 + 08:10 WAT skim-and-full ticks. Surfaced as briefing-2026-04-22 B2 (Decision item — "reconnect now before next tick") and carried into briefing-2026-04-23 D4 ("B2 carryforward — 61h+ dark"). All operational coverage on email-routed signals was blind for the window; Slack + Jira sweeps continued normally.

### Tick 2026-04-23 ~09:11 WAT — RECOVERY (Full-level promotion on state change)

Window probe scope: `to:me newer_than:1h` (Layer 1) + `(RC91 OR RC05 OR RC96 OR RC06 OR P1 OR outage OR NIBSS OR compromised OR breach) newer_than:3d` (operational keyword Layer 2 widened to 3-day catch-up given the prior dark window). Both queries returned successfully — Gmail MCP fully recovered.

**Operational-priority finding — Ecobank RC91 P1 fresh cycle.** Thread 19db8d64f00a406d filed by [[Daniel Armstrong]] at 06:35 WAT Apr 23 (subject "Ecobank | RC91 | 20260423"), with [[Olamide Ajibulu]] chase at 08:52 WAT ("this failure has persisted for over 2 hours"). Bank-side silent on both messages. Distinct from the Apr 18-19 wait-state thread 19da60c7ea537e24. Triggered config-salience #2 Immediate-tier (P1 duration > 2h, no bank resolution signal). Dispatched Immediate alert via `slack_send_message_draft` to user self-DM D081JT4AD0Q with three-option recommendation. [[Ecobank — RC91 on NUS Nodes]] situation page updated with Apr 23 cycle delta. Without Gmail recovery this tick, the signal would have been invisible until next briefing tick (~21h delay).

**Layer 1 to:me probe — secondary signals.**
- 08:56 WAT — Ruth Adetunji: ATPP Daily Standup CANCELED today ("because of Dispute Management Sprint Planning") — calendar-overlap relief at 14:00 WAT Apr 23.
- 08:29 WAT — Camilla Rimdans (UBA): RECALL message on "Re: PENTEST_ 2FA on DCIR portal" thread 19db93e7083bdbb3 — recall is itself a soft signal but no actionable content (recall reason unknown). Relates to active situation [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] (UBA DCIR 2FA production deployment was approved for Apr 18-19 weekend per the situation summary). No immediate action; awareness-tier.
- 08:15 WAT — Patrick Okonkwo (Revent Technologies / Flowmono): cold-outreach E-Signature pitch — skipped per Skip rules.
- Older Fidelity/Paystack balance-confirmation thread (Apr 7-13 era) — pre-cutoff, awareness only.

**Operational keyword sweep findings (3-day window).** Captured for catch-up at next briefing tick — high-volume backlog includes:
- **Ecobank RC91 thread (above) — already actioned this tick.**
- FCMB RC91 cycle Apr 22 02:12 WAT filed by Afeez — bank thread (no follow-on observed in probe).
- UBA RC91 + DCIR portal down Apr 21 17:04 WAT (Daniel Armstrong) — multi-message thread with Christian Uchegbu, status uncertain.
- NIBSS PTSA "SUCCESSFUL RESPONSE NOT SENT" Apr 22 11:10 WAT (Olamide / Moses Ajani) — already covered via briefing-2026-04-22 / 23 NIBSS PTSA situation page.
- NIBSS Helpdesk Ticket 7245499 RC91 Apr 21 / Apr 22 thread — Fumbi Lawrence diagnosis (network timeout from NIBSS → VPN failure) routed to networkmanagement.
- Multiple duty handover notes Apr 21-23 (Olamide ↔ Qazim ↔ Daniel) — operational-continuity awareness only.
- Zone <> TeamApt POS Integration scope (Taiwo Baptista Apr 21) — relates to AS bulk-grooming observed in Jira (Zone Switching Partnership project).

**Backlog catch-up policy.** `last_processed` deliberately NOT advanced this tick — left at 2026-04-20T16:09:00Z. The next briefing tick (2026-04-24 06:00 WAT) will sweep the full ~64h backlog through the standard Layer 1 + Layer 2 query pipeline. This tick's probe was scope-limited (Layer 1 newer_than:1h + Layer 2 newer_than:3d operational-only). Three CTO-approval-gate candidates from 2026-04-20 17:09 WAT (TISD-480, TDSD-6203, Lattice Downward Reviews) remain unverified — also deferred to briefing-2026-04-24 catch-up.

**Cross-source asymmetry observation (2nd data point in 3h).** Ecobank RC91 surfaced via EMAIL ONLY — zero Slack #teamapt-tech-operations mirror. This is the second consecutive observation of operational signals routing through Jira/Email but not the canonical Slack ops channel: TDSD-6692 UBA fast-cycle Jira-only at 06:44 WAT Apr 23, Ecobank Email-only at 06:35-08:52 WAT Apr 23. Stand-down on directive codification — 2 data points across heterogeneous mechanisms. Note for pattern tracking; if 3rd email-only or Jira-only signal observed within 24h, escalate to source-config-slack as a coverage-redundancy concern (Slack ops channel becoming a less-canonical signal source).

**Dispatch decisions:**
- Immediate-tier Slack DM draft created in user self-DM (D081JT4AD0Q) with Ecobank framing.
- [[Ecobank — RC91 on NUS Nodes]] situation page updated with Apr 23 fresh-cycle delta.
- No other in-window items required Immediate dispatch.
- Backlog catch-up emails not source-paged this tick (cost-cap; deferred to next briefing).

**`last_processed` unchanged at 2026-04-20T16:09:00Z** — see backlog catch-up policy above.
