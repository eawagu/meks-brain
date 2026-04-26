---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "Ecobank compound failure Apr 23 — 3 RC91 cycles + DCIR portal inaccessibility ([[TDSD-6711]]) + 3-week user-creation escalation. **2026-04-24 16:09 WAT: Ecobank route back to operational** per Afeez→Olamide duty handover 16:07 WAT — Ecobank absent from \"turned off\" list (only First Bank, Providus, Sterling off). Transaction-routing RC91 layer implicit recovery; **admin-portal layers (TDSD-6711 + 3-week user-creation) remain open and distinct** — compound CTO-escalation case in briefing-2026-04-24 D1 shifts from cycle-handling to admin-platform destabilization."
updated: "2026-04-26T15:18:09Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Ecobank]] RC91 failures on NUS nodes had been marked resolved at 22:01 WAT Apr 16. The issue reopened 12:01 WAT Apr 17 when [[Afeez Kazeem]] escalated via email with a CSV sample of failed transactions. [[Adewuyi Mayowa]] pushed back in thread at 12:15 WAT ("Everything looks fine from this end") — attribution contested, no resolution action. The contested-attribution standoff held through the Apr 17 afternoon and evening briefings (surfaced as B3 on briefing-2026-04-17) and went silent overnight — no thread activity from 22:14 WAT Apr 17 through 16:09 WAT Apr 18, roughly 18 hours of quiet.

At 16:09:27 WAT Apr 18, Afeez escalated direct to Ecobank-side technical contacts (madewuyi@, ologunsanya@, cumechikelu@, dchukwuji@ecobank.com; CC aptpaytechnicalsupport) with subject "Ecobank | RC91 | 20260418" — body: "transactions failing intermittently with RC91." Gmail thread id 19da12452e0edb2e. This escalation goes around the internal Adewuyi "looks fine" posture by engaging the bank directly. At 16:36:41 WAT Afeez followed up on the same thread: "Dear Team, The intermittent RC91 persists. Kindly review." — 27 minutes after the initial message, reinforcing the escalation while the bank-side remains silent.

**Apr 18 20:17 WAT — third escalation step: Jira ticket filing.** [[Afeez Kazeem]] filed [[TDSD-6619]] "Re: Ecobank | RC91 | 20260418" (Medium priority, [System] Incident type) at 20:17:00 WAT.

**Apr 19 cycle and bank-side-next-mover state.** Daniel Armstrong filed fresh thread "Ecobank | RC91 | 20260419" at 15:01 WAT (id 19da60c7ea537e24) with OSOGA@ecobank.com added and Oladapo Onayemi CC'd; followed up at 15:56 WAT ("An update will be appreciated"). Adewuyi Mayowa replied at 16:29 WAT requesting samples — broke 24h+ silence with deferred-but-open posture. Afeez delivered samples at 17:24 WAT to Mayowa direct. The cycle entered a bank-side-next-mover wait-state at that point.

**Apr 20-22 wait-state and silent gap.** Bank-side stayed silent on thread 19da60c7ea537e24 across Apr 20 / Apr 21 / Apr 22 ticks. Gmail MCP went dark at the Apr 20 17:09 WAT tick and remained dark through Apr 22.

**Apr 23 — compound failure day: three RC91 cycles + DCIR portal inaccessibility.**

**Cycle A (morning — bank claim resolution, not Slack-closed).** At 06:35 WAT [[Daniel Armstrong]] filed fresh thread 19db8d64f00a406d "Ecobank | RC91 | 20260423". At 08:52 WAT [[Olamide Ajibulu]] chased on same thread: "Please note that this failure has persisted for over 2 hours." At 09:11 WAT the post-Gmail-MCP-recovery heartbeat detected the signal and dispatched Immediate DM draft. Slack formal P1 filing at 09:38 WAT. At 10:19 WAT Adewuyi Mayowa broke bank-side silence: "Transactions are processing successfully now." Cycle-A Slack P1 (message_ts 1776934715) left End Time: Ongoing — no TeamApt-side closure post.

**Cycle B (afternoon — resurfaced in-cycle).** At 14:38 WAT [[Olamide Ajibulu]] filed fresh email thread 19dbac740631c4f9. At 15:50 WAT Mayowa "Please help reconfirm status now." 16:01 WAT Qazim "We will route and revert." 16:37 WAT Qazim "Transactions are processing fine now." **17:36 WAT Qazim "Please note that the issue has resurfaced. Kindly assist review."** Cycle B resolution interval (16:37 → 17:36 WAT = 59min) did not hold.

**Cycle C — merges into portal-inaccessibility discovery.** At 17:36 WAT RC91 resurface. Qazim's **21:36 WAT hourly report** "Ecobank transactions are failing with RC 91." At 21:33 WAT Qazim filed fresh email thread 19dbc43766215aeb: "We are having issue accessing the Ecobank DCIR portal." At 22:32 WAT Qazim self-filed [[TDSD-6711]] — Work in Progress status. **23:03 WAT hourly report** reaffirmed "Ecobank transactions are failing with RC 91."

**Overnight duty handover 23:06 WAT Apr 23.** Qazim → Daniel Armstrong email thread 19dbc98466cdafc5: "12 of 17 routes operational. Coralpay banks (FBN, PVB, and SBP) turned off due to business decisions. Ecobank..." (listed as failing per paired hourly reports).

**Apr 24 14:09 WAT — THIRD DCIR-portal failure mode layer: user-creation.** TeamApt's shared support address (aptpaytechnicalsupport@teamapt.com) forwarded a formal escalation email at 13:21:32 WAT Apr 24 (Gmail thread 19dbf704dc7edb8a, subject **"USER CREATION ISSUE ON DCIR PORTAL - REQUEST FOR REVIEW"**) stating the issue has *"persisted for approximately three weeks now"* with cross-team joint reviews (TeamApt + Wintel + User Access) without resolution, suspecting a recent web-server patch/upgrade. Distinct from TDSD-6711 portal-access layer — user-creation is admin-layer onboarding. DCIR portal had three concurrent failure modes:
1. **Transaction-routing layer (RC91 cycles).**
2. **Portal-access layer (TDSD-6711, Apr 23 22:32 WAT).**
3. **Portal-user-creation layer (3-week persistent, Apr 24 13:21 WAT surfaced).**

**Apr 24 16:09 WAT — transaction-routing layer implicit recovery per duty handover.** Afeez → Olamide intraday Duty Handover Note 16:07 WAT Apr 24 (Gmail thread 19dc0083cbfa1990) lists *"14 of 17 PTSAs operational. First bank, providus and sterling are turned off due to RC91 - MP decision."* **Ecobank is NOT in the turned-off list** — route re-enabled between the 23:06 WAT Apr 23 handover (which had listed Ecobank as off going into overnight) and this 16:07 WAT Apr 24 handover. No TeamApt-side validation post observed in the sweep window. Cycle-B/C Slack P1 closure still absent, but route now operational. Lifecycle implication: transaction-routing layer effectively resolved (bank-side operational, route enabled); admin-portal layers (TDSD-6711 + 3-week user-creation) remain open and distinct failure modes at that point.

**Apr 25 09:10 WAT — TDSD-6711 portal-access layer CLOSED.** [[Qazim Adedigba]] closure comment on TDSD-6711 at 08:13 WAT Apr 25: *"Portal is accessible now."* Status transitioned **Work in Progress → Completed** at 08:13 WAT, resolution **Done**. Total ticket lifetime ~33h41m from 22:32 WAT Apr 23 filing to 08:13 WAT Apr 25 closure — silent across overnight Apr 24/25 (no comment activity between Qazim's 22:33 WAT Apr 23 "Escalating to the bank with the SRE in the know" and the 08:13 WAT closure). No bank-side acknowledgement comment recorded on the ticket; portal recovery appears bank-side autonomous (or recovered via SRE escalation thread that didn't surface in Jira). **Compound failure stack reduces from three layers to one open layer:** transaction-routing layer recovered Apr 24 16:07 WAT; portal-access layer recovered Apr 25 08:13 WAT; **3-week user-creation layer remains open** — no email follow-up observed on thread 19dbf704dc7edb8a in the Apr 24 18:09 WAT → Apr 25 09:10 WAT window.

**Apr 26 16:10 WAT — FOURTH operational layer: settlements.** [[Daniel Armstrong]] (Sunday duty officer, on rotation since 08:01 WAT handover from Qazim) filed [[TDSD-6735]] "Eco | Settlements issue | 20260426" at 15:59:43 WAT (~10min before this skim tick). [System] Incident type, Medium priority, **Severity "Significant / Large"**, Customer "Ecobank", Component "ATS", assignee [[Feyisayo Oyeniran]]. Description: *"Eco settlements 20260426 awaiting requery"* + screenshot attachment (image-20260426-145918.png, 109KB). Status: INITIAL REVIEW (freshly filed, ticket workflow at intake). SLA timers: Time to first response 8h goal (breach Mon Apr 27 17:00 WAT), Time to resolution 24h goal (breach Wed Apr 29 17:00 WAT). No comments yet; no Slack P1 thread observed in same window (filed straight to Jira via portal). 

This is a **fourth distinct operational layer on Ecobank in 9 days** — distinct from the resolved RC91 transaction-routing layer (cycle-handling), the resolved TDSD-6711 DCIR portal-access layer (admin/login), and the still-open 3-week user-creation layer (admin/onboarding). Settlements layer is back-office reconciliation — likely a payable-posting or netting mismatch given the "awaiting requery" framing (requery is the standard action for failed/uncertain settlement entries). Currently Daniel-and-Feyisayo only; no CTO or external escalation. **Compound failure stack now at two open layers:** user-creation (3-week, no engagement) + settlements (fresh, INITIAL REVIEW). Pattern observation: Ecobank concurrent operational-failure mode count went from 1 → 3 (Apr 23 compound day) → 1 (Apr 25 portal closure) → 2 (Apr 26 settlements). The integration is structurally generating new failure modes faster than existing ones close.

**Mayowa attribution-mismatch pattern — 3-for-3 week-to-date.**
1. **Apr 17 12:15 WAT:** "Everything looks fine from this end" → continued failures.
2. **Apr 23 10:19 WAT:** "Transactions are processing successfully now" → re-surfaced ~5.5h later.
3. **Apr 23 16:37 WAT:** "Transactions are processing fine now" → resurfaced 59min later.

The Mayowa attribution-mismatch pattern is unaddressed by the portal closures — those resolved bank-side without re-engaging Mayowa's prior claims. Pattern remains structural concern even as the operational-cycle stack clears.

**Situation lifecycle:** held `developing`. Open layers: user-creation (Apr 24 escalation, no engagement observed in 49h+ at this tick) and settlements (TDSD-6735, fresh INITIAL REVIEW). The Apr 25 `resolving` candidate transition is **rescinded** by the Apr 26 settlements layer emergence — situation is producing new operational failures, not winding down. CTO-escalation case (briefing-2026-04-24 D1) re-strengthens with the settlements layer providing fresh evidence of structural integration weakness. Watchpoint: TDSD-6735 SLA breach Mon Apr 27 17:00 WAT (Time to first response, 8h goal) — if Feyisayo does not engage by then, escalation candidate.

**Next-check gate:** briefing-2026-04-27 06:10 WAT Decision-item candidate combining (a) TDSD-6735 settlements layer status, (b) user-creation layer follow-up (Apr 24 thread 19dbf704dc7edb8a, no engagement), (c) compound-failure-frequency pattern trend assessment.

## Sources
Gmail Afeez 2026-04-17 12:01 WAT; Slack Adewuyi Mayowa 2026-04-17 12:15 WAT; Gmail Afeez → Ecobank 2026-04-18 16:09 WAT (thread 19da12452e0edb2e); Gmail Afeez 2026-04-18 16:36 WAT; Jira TDSD-6619 2026-04-18 20:17 WAT; Gmail Daniel Armstrong 2026-04-19 15:01 WAT (thread 19da60c7ea537e24); Gmail Adewuyi Mayowa 2026-04-19 16:29 WAT; Gmail Afeez 2026-04-19 17:24 WAT; Gmail Daniel 2026-04-23 06:35 WAT (cycle-A thread 19db8d64f00a406d); Gmail Olamide 2026-04-23 08:52 WAT; Slack #teamapt-tech-operations 2026-04-23 09:38 WAT (cycle-A P1, message_ts 1776934715); Gmail Adewuyi Mayowa 2026-04-23 10:19 WAT (resolution claim); Gmail Olamide Ajibulu 2026-04-23 14:38 WAT (cycle-B thread 19dbac740631c4f9); Gmail Qazim 2026-04-23 16:37 WAT (cycle-B fine-now); Gmail Qazim 2026-04-23 17:36 WAT (cycle-B resurface); Gmail Qazim 2026-04-23 21:33 WAT (portal inaccessibility thread 19dbc43766215aeb); Jira TDSD-6711 filed 2026-04-23 22:32 WAT, Completed 2026-04-25 08:13 WAT; Gmail Qazim 2026-04-23 21:36 + 23:03 WAT hourly reports; Gmail Qazim → Daniel 2026-04-23 23:06 WAT duty handover; Gmail 2026-04-24 13:21 WAT thread 19dbf704dc7edb8a (3-week user-creation escalation); Gmail 2026-04-24 16:07 WAT thread 19dc0083cbfa1990 (Afeez → Olamide intraday duty handover — Ecobank absent from turned-off list, transaction-routing layer implicit recovery); Jira TDSD-6711 closure comment 2026-04-25 08:13 WAT (Qazim "Portal is accessible now."); **Jira TDSD-6735 filed 2026-04-26 15:59:43 WAT (Daniel Armstrong reporter, Feyisayo Oyeniran assignee, INITIAL REVIEW, Severity Significant/Large, "Eco settlements 20260426 awaiting requery")**

## Deltas
- [2026-04-17 12:01 WAT] — Reopened via Afeez email with CSV sample.
- [2026-04-17 12:15 WAT] — Mayowa pushback: "Everything looks fine." Attribution contested.
- [2026-04-18 16:09 WAT] — Direct-to-bank escalation thread 19da12452e0edb2e.
- [2026-04-18 20:17 WAT] — TDSD-6619 ticket filing.
- [2026-04-19 15:01 WAT] — Daniel Armstrong fresh thread 19da60c7ea537e24.
- [2026-04-19 16:29 WAT] — Mayowa requesting samples.
- [2026-04-19 17:24 WAT] — Afeez delivers samples.
- [2026-04-20 → 2026-04-22] — Wait-state; Gmail MCP dark.
- [2026-04-23 06:35 WAT] — **Cycle A filed** (Daniel, thread 19db8d64f00a406d).
- [2026-04-23 09:38 WAT] — Slack cycle-A P1.
- [2026-04-23 10:19 WAT] — **Cycle-A bank-claim resolution** (Mayowa).
- [2026-04-23 14:38 WAT] — **Cycle B filed** (Olamide, thread 19dbac740631c4f9).
- [2026-04-23 16:37 WAT] — Cycle-B bank-claim-fine (Qazim).
- [2026-04-23 17:36 WAT] — **Cycle-B resurface** (Qazim).
- [2026-04-23 21:33 WAT] — **Portal-layer issue surfaced** (Qazim, thread 19dbc43766215aeb).
- [2026-04-23 22:32 WAT] — **[[TDSD-6711]] filed** (Qazim self-assigned, Work In Progress).
- [2026-04-23 23:03 WAT] — Qazim hourly report reaffirms Ecobank RC 91.
- [2026-04-23 23:06 WAT] — Qazim → Daniel overnight duty handover: route off.
- [2026-04-24 05:10 WAT — observation] — briefing-2026-04-24 D1 compose; route still off.
- [2026-04-24 14:09 WAT — observation] — **Third DCIR-portal failure mode layer: user-creation 3-week persistent escalation** (thread 19dbf704dc7edb8a).
- [2026-04-24 16:09 WAT — route back to operational per intraday duty handover] — **Transaction-routing layer implicit recovery.** Ecobank absent from off-list per Afeez → Olamide intraday Duty Handover Note (Gmail thread 19dc0083cbfa1990).
- [2026-04-25 09:10 WAT] — **Portal-access layer CLOSED.** [[TDSD-6711]] transitioned Work In Progress → Completed at 08:13 WAT Apr 25 with closure comment by Qazim Adedigba: "Portal is accessible now." Total ticket lifetime ~33h41m. Compound failure stack reduces from three layers to one open layer: only the 3-week user-creation layer remains.
- [2026-04-26 16:10 WAT] — **FOURTH operational layer surfaced: settlements.** [[TDSD-6735]] "Eco | Settlements issue | 20260426" filed at 15:59:43 WAT by Daniel Armstrong (Sunday duty officer), assignee Feyisayo Oyeniran, INITIAL REVIEW, Severity Significant/Large, Customer Ecobank, Component ATS. Description: "Eco settlements 20260426 awaiting requery" + screenshot attachment. SLA Time-to-first-response 8h (breach Mon Apr 27 17:00 WAT). No Slack P1; no CTO/external escalation; portal-only filing. Compound failure stack now at two open layers (user-creation 49h+ silent + settlements fresh). Apr 25 `resolving` candidate transition rescinded — situation is producing new operational failures, not winding down. CTO-escalation case (briefing-2026-04-24 D1) re-strengthens. briefing-2026-04-27 Decision-item candidate combining settlements + user-creation + compound-frequency pattern. No CTO action this tick. Factors: source=jira, archetype=service_desk, active_situation_entity_match=ecobank-rc91-on-nus-nodes, layer_classification=settlements_back_office, distinct_from_prior_three_layers, severity_significant_large, customer_ecobank, component_ats, sunday_duty_officer_filing, no_slack_propagation, sla_first_response_8h_breach_apr_27_17_00_wat, compound_failure_frequency_pattern_2_open_layers, resolving_candidate_rescinded, briefing_2026_04_24_d1_case_re_strengthens.