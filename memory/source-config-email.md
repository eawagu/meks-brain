---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed remains 2026-04-20T16:09:00Z (~64h backlog deferred to next briefing tick catch-up). 2026-04-23 09:11 WAT tick: Gmail MCP RECOVERED after ~64h dark window. Probe-sweep detected fresh Ecobank RC91 P1 cycle (thread 19db8d64f00a406d) filed 06:35 WAT + chased 08:52 WAT — Immediate-tier dispatch triggered via Slack draft. ATPP Daily Standup canceled today (calendar conflict relief). UBA DCIR portal pentest message recall observed. Marketing/cold outreach skipped per directive. Backlog catch-up sweep deferred to briefing-2026-04-24 06:00 WAT."
updated: "2026-04-23T13:21:15Z"
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

Gmail MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 06:10 WAT briefing tick / Apr 23 07:10 + 08:10 WAT skim-and-full ticks. Surfaced as briefing-2026-04-22 B2 (Decision item) and briefing-2026-04-23 D4 (B2 carryforward — 61h+ dark).

### Tick 2026-04-23 ~09:11 WAT — RECOVERY (condensed — see git history)

Layer 1 `to:me newer_than:1h` + Layer 2 operational keyword `newer_than:3d` — Gmail MCP fully recovered. **Operational-priority finding:** Ecobank RC91 fresh cycle thread 19db8d64f00a406d filed 06:35 WAT + chased 08:52 WAT → Immediate-tier Slack DM dispatched, [[Ecobank — RC91 on NUS Nodes]] situation updated. Layer 1 secondary: ATPP Daily Standup canceled today (conflict relief), UBA DCIR pentest message recall, cold outreach skipped. `last_processed` held at 2026-04-20T16:09:00Z pending briefing-2026-04-24 catch-up.

### Tick 2026-04-23 ~14:09 WAT — Full (weekday work-hours; 2 in-window signals)

Probe scope: `(RC91 OR RC96 OR RC05 OR RC06 OR P1 OR outage OR NIBSS OR breach OR approval) newer_than:2h` + `to:me newer_than:2h`. **Gmail MCP operational.**

**In-window signals — 2 threads:**

1. **Thread 19dba77670436f02 — "Approval for HA Setup on TeamApt Prod Firewalls 02 and 03"** (14:11 WAT Apr 23)
   - From: [[Fumbi Lawrence]] (fumbi.lawrence@teamapt.com)
   - To: [[Tolu Aina]] (tolu.aina@teamapt.com) — **PRIMARY APPROVER**
   - CC: emeka.awagu@teamapt.com + networkmanagement@teamapt.com
   - Snippet: "Hi Tolu, As part of our initiative to build a more resilient infrastructure, we are requesting approval to deploy a High Availability (HA) setup to TeamApt Firewalls 02 and 03 at Rackcenter."
   - **Emeka is CC-only — Layer 1 (To:me) does NOT apply.** Layer 2 keyword match: "approval" (process keyword).
   - **Cross-source pairing:** [[TDSD-6699]] "CONFIGURATION OF HIGH AVAILABILITY ON TeamApt FIREWALL 02 and 03" Review status 13:44 WAT (see source-config-jira).
   - **Classification:** Briefing-tier **Awareness** — CTO awareness informational, not a CTO-specific approval gate (Tolu Aina is the named approver). Factors: source=email, layer2_keyword_approval, cc_only_not_to_me, primary_approver_tolu_aina, infrastructure_change_tdsd6699, briefing_tier_awareness.

2. **Thread 19dba55e567fab81 — "Invitation: TeamApt Org Changes @ Fri Apr 24, 2026 4pm - 6pm (WAT) (Emeka Awagu)"** (13:34 WAT Apr 23, 12:34 UTC)
   - From: [[Pawel Swiatek]] (pawel.swiatek@moniepoint.com)
   - CC: dajalie@teamapt.com (optional attendee)
   - To: emeka.awagu@teamapt.com + frank.atashili@teamapt.com + tracy.ojaigho@teamapt.com
   - **Emeka in To: — Layer 1 trigger.** Subject keyword "Org Changes" — material/strategic.
   - **Paired with calendar event 5ia9mtsqmjbgt1gvp82b7m1lul** (see source-config-calendar). 
   - **Classification:** Briefing-tier Decision candidate (strategic topic + triple-overlap with Lattice + Tech support at 16:00 WAT Apr 24). Factors: source=email+calendar, layer1_to_me, moniepoint_leadership_sender, strategic_keyword_org_changes, agenda_less, triple_overlap_apr24_16wat, briefing_tier_decision.

**Operational keyword sweep (newer_than:2h):** Zero operational incident threads in-window. Ecobank thread 19db8d64f00a406d static (bank-responded 10:19/10:33 WAT, awaiting TeamApt reconfirmation). No new RC91/RC96/RC05/RC06/NIBSS/outage threads.

**Backlog catch-up policy.** `last_processed` STILL deliberately NOT advanced — held at 2026-04-20T16:09:00Z. Full 64h+ Layer 1 + Layer 2 sweep queued for briefing-2026-04-24 06:00 WAT.

**Cross-source asymmetry tracker status:** TDSD-6699 Firewall HA has an email counterpart (thread 19dba77670436f02) paired in the same hour window — **does NOT count against the tracker** (cross-source consistency, not asymmetry). Tracker remains at 1 data point (TDSD-6692 UBA). Tracker window closes 06:44 WAT Apr 24.

**Dispatch decisions:**
- TeamApt Org Changes invite → queued as **Decision candidate for briefing-2026-04-24** (strategic + triple-overlap).
- Firewall HA approval email → Awareness (CTO CC'd, not primary approver).
- No Immediate-tier email dispatch (no operational P1/outage/breach in-window).

**`last_processed` unchanged at 2026-04-20T16:09:00Z** — see backlog catch-up policy above.
