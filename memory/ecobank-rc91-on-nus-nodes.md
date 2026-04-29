---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "09:09 WAT Apr 29 post-briefing tick: NEW transaction-routing layer P1 reopens — Qazim Slack P1 08:49 WAT (start 08:45 WAT), 24m active at tick. Single-track Slack-only — no Jira, no email bilateral. Compound failure stack rises 1 → 2 open layers (this fresh cycle + 3-week user-creation thread silent 116h+). Apr 28 stabilizing-signal-if-1-layer-holds-48h broken at ~17h. Mayowa attribution-mismatch (3-for-3) unaddressed. Immediate dispatched combined with Habari silent-cycle alert."
updated: "2026-04-29T10:23:18Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Ecobank]] RC91 failures on NUS nodes had been marked resolved at 22:01 WAT Apr 16. The issue reopened 12:01 WAT Apr 17 when [[Afeez Kazeem]] escalated via email with a CSV sample of failed transactions. [[Adewuyi Mayowa]] pushed back in thread at 12:15 WAT (\"Everything looks fine from this end\") — attribution contested, no resolution action. The contested-attribution standoff held through the Apr 17 afternoon and evening briefings (surfaced as B3 on briefing-2026-04-17) and went silent overnight — no thread activity from 22:14 WAT Apr 17 through 16:09 WAT Apr 18, roughly 18 hours of quiet.

At 16:09:27 WAT Apr 18, Afeez escalated direct to Ecobank-side technical contacts (madewuyi@, ologunsanya@, cumechikelu@, dchukwuji@ecobank.com; CC aptpaytechnicalsupport) with subject "Ecobank | RC91 | 20260418" — body: "transactions failing intermittently with RC91." Gmail thread id 19da12452e0edb2e. This escalation goes around the internal Adewuyi "looks fine" posture by engaging the bank directly. At 16:36:41 WAT Afeez followed up on the same thread: "Dear Team, The intermittent RC91 persists. Kindly review." — 27 minutes after the initial message, reinforcing the escalation while the bank-side remains silent.

**Apr 18 20:17 WAT — third escalation step: Jira ticket filing.** [[Afeez Kazeem]] filed [[TDSD-6619]] "Re: Ecobank | RC91 | 20260418" (Medium priority, [System] Incident type) at 20:17:00 WAT.

**Apr 19 cycle and bank-side-next-mover state.** Daniel Armstrong filed fresh thread "Ecobank | RC91 | 20260419" at 15:01 WAT (id 19da60c7ea537e24) with OSOGA@ecobank.com added and Oladapo Onayemi CC'd; followed up at 15:56 WAT ("An update will be appreciated"). Adewuyi Mayowa replied at 16:29 WAT requesting samples — broke 24h+ silence with deferred-but-open posture. Afeez delivered samples at 17:24 WAT to Mayowa direct. The cycle entered a bank-side-next-mover wait-state at that point.

**Apr 20-22 wait-state and silent gap.** Bank-side stayed silent on thread 19da60c7ea537e24 across Apr 20 / Apr 21 / Apr 22 ticks. Gmail MCP went dark at the Apr 20 17:09 WAT tick and remained dark through Apr 22.

**Apr 23 — compound failure day: three RC91 cycles + DCIR portal inaccessibility.** (Cycle A morning bank-claim resolution; Cycle B afternoon resurfaced in-cycle; Cycle C merges into portal-inaccessibility discovery.) [[TDSD-6704]] ("ECO BANK|RC 91|20260423") filed during this compound-failure day; the ticket entered Work in Progress status. Qazim filed [[TDSD-6711]] for the DCIR portal layer at 22:32 WAT.

**Apr 24 14:09 WAT — THIRD DCIR-portal failure mode layer: user-creation.** TeamApt's shared support address (aptpaytechnicalsupport@teamapt.com) forwarded a formal escalation email at 13:21:32 WAT Apr 24 (Gmail thread 19dbf704dc7edb8a, subject "USER CREATION ISSUE ON DCIR PORTAL - REQUEST FOR REVIEW") stating the issue has *"persisted for approximately three weeks now"* with cross-team joint reviews (TeamApt + Wintel + User Access) without resolution, suspecting a recent web-server patch/upgrade. Distinct from TDSD-6711 portal-access layer — user-creation is admin-layer onboarding. DCIR portal had three concurrent failure modes: (1) Transaction-routing layer (RC91 cycles), (2) Portal-access layer (TDSD-6711, Apr 23 22:32 WAT), (3) Portal-user-creation layer (3-week persistent, Apr 24 13:21 WAT surfaced).

**Apr 24 16:09 WAT — transaction-routing layer implicit recovery per duty handover.** Afeez → Olamide intraday Duty Handover Note 16:07 WAT Apr 24 (Gmail thread 19dc0083cbfa1990) lists *"14 of 17 PTSAs operational. First bank, providus and sterling are turned off due to RC91 - MP decision."* **Ecobank is NOT in the turned-off list** — route re-enabled between the 23:06 WAT Apr 23 handover and this 16:07 WAT Apr 24 handover. Cycle-B/C Slack P1 closure still absent, but route now operational. Lifecycle implication: transaction-routing layer effectively resolved.

**Apr 25 09:10 WAT — TDSD-6711 portal-access layer CLOSED.** [[Qazim Adedigba]] closure comment on TDSD-6711 at 08:13 WAT Apr 25: *"Portal is accessible now."* Status transitioned **Work in Progress → Completed** at 08:13 WAT, resolution **Done**. Total ticket lifetime ~33h41m. Compound failure stack reduces from three layers to one open layer at that point: only the 3-week user-creation layer remains.

**Apr 26 16:10 WAT — FOURTH operational layer: settlements.** [[Daniel Armstrong]] (Sunday duty officer) filed [[TDSD-6735]] "Eco | Settlements issue | 20260426" at 15:59:43 WAT, assignee [[Feyisayo Oyeniran]], INITIAL REVIEW, Severity Significant/Large. Description: *"Eco settlements 20260426 awaiting requery"* + screenshot attachment. Compound failure stack rose to 2 open layers: user-creation (3-week, no engagement) + settlements (fresh, INITIAL REVIEW).

**Apr 28 17:09 WAT full-tick:** TWO ticket closures reduce compound failure stack from 2 → 1 open layer. (a) **TDSD-6735 settlements layer CLOSED** Status transitioned **INITIAL REVIEW → Completed at 16:13:48 WAT Apr 28** by [[Feyisayo Oyeniran]] (assignee). Total ticket lifetime ~47h54m. SLA Time-to-resolution 24h was breached at 15:59 WAT Apr 27 — closure landed ~24h post-SLA-breach. (b) **TDSD-6704 ECO BANK|RC 91|20260423 belated Completion** at 17:42:56 WAT Apr 28 by [[Qazim Adedigba]] (assignee). ~5d total ticket lifetime — workflow-discipline cleanup of long-tail open ticket; not a fresh cycle. Pattern note: Qazim closing 5-day-old workflow tail items today aligns with the broader Jira backfill momentum visible since auth recovery this morning (briefing-2026-04-28 B17).

**Apr 28 23:49 WAT — TDSD-6767 settlements re-cycle filed.** Daniel Armstrong late-evening duty officer filed [[TDSD-6767]] "Eco | Settlements issue | 20260428" at 23:49 WAT Apr 28, assignee [[Feyisayo Oyeniran]] (consistent with TDSD-6735 owner pattern), INITIAL REVIEW, Medium. Compound stack rose 1 → 2 again at that point (user-creation + settlements re-cycle).

**Mayowa attribution-mismatch pattern — 3-for-3 week-to-date (historical, NOT extended on Apr 29 cycle).**
1. **Apr 17 12:15 WAT:** "Everything looks fine from this end" → continued failures.
2. **Apr 23 10:19 WAT:** "Transactions are processing successfully now" → re-surfaced ~5.5h later.
3. **Apr 23 16:37 WAT:** "Transactions are processing fine now" → resurfaced 59min later.

**Apr 29 cycle — Mayowa posture distinct (NOT attribution-mismatch).** On thread 19dd85938244db0e Apr 29, Mayowa replied at 10:12 WAT (09:12:56Z) with: *"Hello Qazim, Kindly reconfirm now."* — this is a request-for-recheck posture, NOT a "transactions are processing fine" claim. Qazim responded 10:48 WAT (09:48:45Z): *"Hello ADEWUYI, Transactions are still failing intermittently."* — explicit non-resolution confirmation. Mayowa silent on thread since 10:12 WAT request. Pattern observation: Mayowa did NOT make a 4th attribution-mismatch claim despite the structural setup (route re-engagement, P1 active) — possible behavioral shift after 3 prior cycles' contested-then-collapsed pattern. Watch for whether Mayowa engages further or remains silent past tonight.

**Current state (11:12 WAT Apr 29 full-tick):** **Apr 29 cycle 2h27m active — trigger #2 (>2h) crossed at 10:45 WAT, ~27min before tick observation.** Bilateral path is fully open: TDSD-6776 (Jira), email thread 19dd85938244db0e (bank), Slack P1 (ops). Cycle escalation timeline:
- 08:45 WAT — cycle start (per Qazim Slack P1 post 08:49 WAT)
- 09:19 WAT — TDSD-6776 filed by Qazim (single-track-Slack-only regression closed at +30min)
- 09:25 WAT — Email Qazim → CUMECHIKELU/DCHUKWUJI/OSOGA/ologunsanya/MADEWUYI@ecobank.com (subject "Ecobank | ATS | RC 91 Failures Across Processors | 20260429 | TDSD-6776")
- 10:12 WAT — Mayowa reply: "Kindly reconfirm now."
- 10:45 WAT — Trigger #2 (>2h) fires
- 10:48 WAT — Qazim reply: "Transactions are still failing intermittently."
- 11:12 WAT — heartbeat tick observation (cycle 2h27m active, 24min since Qazim non-resolution confirmation, 60min since Mayowa request, no further bank reply)

**Compound failure stack (current):** 2 open layers — (1) **transaction-routing this cycle** (active 2h27m, Jira+email+Slack tracked, Mayowa engaged-but-pending); (2) **user-creation 3-week thread** `19dbf704dc7edb8a` silent ~119h since 2026-04-24 13:21 WAT initial filing (no engagement signal across 5+ days of ticks).

**Apr 28-evening + Apr 29 settlements re-cycle status:** TDSD-6767 (Apr 28 23:49 WAT filing) — would expect closure by ~08:50 WAT Apr 29 per Keystone-pattern ~9h cadence. **Status not visible in this tick's Layer A delta sweep** — must verify next tick whether TDSD-6767 closed or remains INITIAL REVIEW. If still open at 12:09 WAT, escalation candidate.

**Trigger #2 Immediate dispatched (combined alert with [[HabariPay]] sustained-silence)** — Slack DM to U080PEXEZ0E at this tick covering both active P1s.

**Watchpoints (priority order):**
1. **Apr 29 cycle resolution by ~12:30 WAT** — historical Apr 19 cycle reached ~3h44m; longer than that crosses unprecedented territory for this entity.
2. **TDSD-6767 closure status** — not in this tick's Layer A delta; verify next tick.
3. **User-creation thread engagement** — at 119h+ silent; if no signal by Apr 30, briefing-tier escalation candidate.
4. **Mayowa posture continuation** — does the request-for-recheck posture hold (constructive engagement) or revert to attribution-mismatch (4th claim)?

## Sources
Gmail Afeez 2026-04-17 12:01 WAT; Slack Adewuyi Mayowa 2026-04-17 12:15 WAT; Gmail Afeez → Ecobank 2026-04-18 16:09 WAT (thread 19da12452e0edb2e); Gmail Afeez 2026-04-18 16:36 WAT; Jira TDSD-6619 2026-04-18 20:17 WAT; Gmail Daniel Armstrong 2026-04-19 15:01 WAT (thread 19da60c7ea537e24); Gmail Adewuyi Mayowa 2026-04-19 16:29 WAT; Gmail Afeez 2026-04-19 17:24 WAT; Gmail Daniel 2026-04-23 06:35 WAT (cycle-A thread 19db8d64f00a406d); Gmail Olamide 2026-04-23 08:52 WAT; Slack #teamapt-tech-operations 2026-04-23 09:38 WAT (cycle-A P1, message_ts 1776934715); Gmail Adewuyi Mayowa 2026-04-23 10:19 WAT (resolution claim); Gmail Olamide Ajibulu 2026-04-23 14:38 WAT (cycle-B thread 19dbac740631c4f9); Gmail Qazim 2026-04-23 16:37 WAT (cycle-B fine-now); Gmail Qazim 2026-04-23 17:36 WAT (cycle-B resurface); Gmail Qazim 2026-04-23 21:33 WAT (portal inaccessibility thread 19dbc43766215aeb); Jira TDSD-6711 filed 2026-04-23 22:32 WAT, Completed 2026-04-25 08:13 WAT; Gmail Qazim 2026-04-23 21:36 + 23:03 WAT hourly reports; Gmail Qazim → Daniel 2026-04-23 23:06 WAT duty handover; Gmail 2026-04-24 13:21 WAT thread 19dbf704dc7edb8a (3-week user-creation escalation); Gmail 2026-04-24 16:07 WAT thread 19dc0083cbfa1990 (Afeez → Olamide intraday duty handover — Ecobank absent from turned-off list, transaction-routing layer implicit recovery); Jira TDSD-6711 closure comment 2026-04-25 08:13 WAT (Qazim "Portal is accessible now."); Jira TDSD-6735 filed 2026-04-26 15:59:43 WAT (Daniel Armstrong reporter, Feyisayo Oyeniran assignee, INITIAL REVIEW, Severity Significant/Large, "Eco settlements 20260426 awaiting requery"); Jira [[TDSD-6735]] Eco Settlements transitioned INITIAL REVIEW → Completed at 16:13:48 WAT Apr 28 by [[Feyisayo Oyeniran]] (47h54m total ticket lifetime); Jira [[TDSD-6704]] ECO BANK|RC 91|20260423 transitioned to Completed at 17:42:56 WAT Apr 28 by [[Qazim Adedigba]] (~5d total ticket lifetime, belated workflow-discipline closure); Jira [[TDSD-6767]] "Eco | Settlements issue | 20260428" filed 23:49 WAT Apr 28 by [[Daniel Armstrong]] (assignee Feyisayo Oyeniran, INITIAL REVIEW, Medium); Slack #teamapt-tech-operations Qazim Adedigba structured P1 post 08:49 WAT Apr 29 (start 08:45 WAT) — "P1: Ecobank RC 91 Failures Across Processors, From the bank, Escalated to bank for resolution, Ongoing."; Jira [[TDSD-6776]] "Ecobank | ATS | RC 91 Failures Across Processors | 20260429" filed 09:19:01 WAT Apr 29 by [[Qazim Adedigba]] (reporter+assignee), INITIAL REVIEW, Medium priority, description "Kindly assist review as Ecobank transactions are failing with RC 91"; **Gmail thread 19dd85938244db0e Apr 29 — Qazim → CUMECHIKELU/DCHUKWUJI/OSOGA/ologunsanya/MADEWUYI@ecobank.com 09:25 WAT (subject "Ecobank | ATS | RC 91 Failures Across Processors | 20260429 | TDSD-6776"); Mayowa reply 10:12 WAT "Hello Qazim, Kindly reconfirm now"; Qazim reply 10:48 WAT "Hello ADEWUYI, Transactions are still failing intermittently."**

## Deltas
- [2026-04-17 12:01 WAT] — Reopened via Afeez email with CSV sample.
- [2026-04-17 12:15 WAT] — Mayowa pushback: "Everything looks fine." Attribution contested.
- [2026-04-18 16:09 WAT] — Direct-to-bank escalation thread 19da12452e0edb2e.
- [2026-04-18 20:17 WAT] — TDSD-6619 ticket filing.
- [2026-04-19 15:01 WAT] — Daniel Armstrong fresh thread 19da60c7ea537e24.
- [2026-04-19 16:29 WAT] — Mayowa requesting samples.
- [2026-04-19 17:24 WAT] — Afeez delivers samples.
- [2026-04-20 → 2026-04-22] — Wait-state; Gmail MCP dark.
- [2026-04-23 06:35 WAT] — Cycle A filed (Daniel, thread 19db8d64f00a406d).
- [2026-04-23 09:38 WAT] — Slack cycle-A P1.
- [2026-04-23 10:19 WAT] — Cycle-A bank-claim resolution (Mayowa).
- [2026-04-23 14:38 WAT] — Cycle B filed (Olamide, thread 19dbac740631c4f9).
- [2026-04-23 16:37 WAT] — Cycle-B bank-claim-fine (Qazim).
- [2026-04-23 17:36 WAT] — Cycle-B resurface (Qazim).
- [2026-04-23 21:33 WAT] — Portal-layer issue surfaced (Qazim, thread 19dbc43766215aeb).
- [2026-04-23 22:32 WAT] — TDSD-6711 filed (Qazim self-assigned, Work In Progress).
- [2026-04-23 23:03 WAT] — Qazim hourly report reaffirms Ecobank RC 91.
- [2026-04-23 23:06 WAT] — Qazim → Daniel overnight duty handover: route off.
- [2026-04-24 14:09 WAT] — Third DCIR-portal failure mode layer: user-creation 3-week persistent escalation (thread 19dbf704dc7edb8a).
- [2026-04-24 16:09 WAT] — Transaction-routing layer implicit recovery. Ecobank absent from off-list per Afeez → Olamide intraday Duty Handover Note.
- [2026-04-25 09:10 WAT] — Portal-access layer CLOSED. TDSD-6711 → Completed 08:13 WAT "Portal is accessible now." Compound stack 3 → 1 open layer.
- [2026-04-26 16:10 WAT] — FOURTH operational layer surfaced: settlements. TDSD-6735 "Eco | Settlements issue | 20260426" filed. Compound stack 1 → 2 open layers. Apr 25 `resolving` candidate rescinded.
- [2026-04-28 17:09 WAT] — TWO ticket closures (TDSD-6735 47h54m + TDSD-6704 ~5d belated). Compound stack 2 → 1 open layer (only 3-week user-creation thread remaining). Awareness-tier accumulation.
- [2026-04-28 23:49 WAT] — TDSD-6767 settlements re-cycle filed by Daniel Armstrong (assignee Feyisayo Oyeniran, INITIAL REVIEW, Medium). Compound stack 1 → 2 again.
- [2026-04-29 09:09 WAT post-briefing tick] — TRANSACTION-ROUTING LAYER REOPENS WITH NEW P1. Qazim Slack P1 08:49 WAT (start 08:45 WAT). Single-track Slack-only initially. Compound stack rises 2 → 3 open layers (settlements re-cycle pending, user-creation 3-week silent, plus this new). Apr 28 stabilizing signal broken at ~17h. Immediate dispatched.
- [2026-04-29 10:09 WAT full-tick] — TDSD-6776 NEW filed 09:19:01 WAT Apr 29 (Qazim Adedigba reporter+assignee, INITIAL REVIEW, Medium). 30min after 08:49 WAT Slack post. Single-track-Slack-only regression closed; bilateral path now Jira-tracked. Cycle 1h24m active at this tick. Trigger #2 (>2h) approaches at 10:45 WAT. Mayowa attribution-mismatch pattern still 3-for-3 unaddressed. Compound stack at 3 open layers.
- **[2026-04-29 11:12 WAT full-tick] — TRIGGER #2 CROSSED at 10:45 WAT (~27min pre-tick). Cycle 2h27m active. Bilateral fully open across Jira+email+Slack. Email thread 19dd85938244db0e: Qazim → bank 09:25 WAT, Mayowa reply 10:12 WAT "Kindly reconfirm now" (NOT attribution-mismatch posture this cycle), Qazim 10:48 WAT "Transactions are still failing intermittently" — explicit non-resolution 24min pre-tick. Mayowa request-for-recheck posture is structurally distinct from prior 3-for-3 attribution-mismatch claims; possible behavioral shift after contested-then-collapsed precedent. No 4th claim observed. Immediate re-dispatched (combined with Habari sustained-silence) via Slack DM at 11:14 WAT. Watchpoints: cycle resolution by ~12:30 WAT (Apr 19 envelope), TDSD-6767 closure status (not in this tick's Layer A — verify next tick), user-creation thread 119h+ silent. Factors: source=jira+email+slack, archetype=service_desk, active_situation_match=ecobank-rc91-on-nus-nodes, status=initial_review, priority=medium, immediate_trigger_2_crossed_2h27m_active, mayowa_distinct_posture_request_for_recheck_not_attribution_mismatch, qazim_explicit_non_resolution_24min, bilateral_path_fully_open_3_track, compound_stack_3_layers_user_creation_119h_silent_settlements_recycle_pending_route_active, immediate_redispatched_combined_habari, mayowa_4th_claim_absence_behavioral_shift_signal, urgency_high, impact_scope_medium_intermittent, cto_specificity_medium, pattern_significance_recurring, accountability_alignment_high.**