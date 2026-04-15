---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "Fidelity ATS Cycle 4 (TDSD-6552) RESOLVED 20:35 WAT — Qazim confirmed processing fine after John Uguru-Okorie (Fidelity) reconfirm request. Both Apr 14 RC91 cycles now closed (AM implicit, PM explicit). 'Failing generally' still silent 25h10min+. B2 still untriaged — pattern intact (2 cycles in one day)."
updated: "2026-04-15T09:14:41Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS — escalated beyond RC91 to "failing generally" on Apr 13, with two RC91 P1s filed on Apr 14 (morning 09:08 WAT and evening 19:05 WAT TDSD-6552). Both Apr 14 cycles closed. Apr 15 morning: new routing-level issue surfaced — Afrigo card transactions on Fidelity BINs routing to Interswitch instead of Fidelity FEP. MEMORY RESOURCE INCREASE (18:05 WAT Apr 14 ask) still outstanding with Fidelity non-response now 15h26min+.

**Apr 15 10:09 WAT tick — three Fidelity-track signals:**
1. **Afrigo card routing error (NEW):** [[Victoria Ogaga-Omokri]] (Fidelity) 09:46 WAT asked [[Emeka Joseph]] to confirm why Afrigo card transactions are routing to [[Interswitch]] — impacting service to their customers. [[Emeka Joseph]] 09:58 WAT asked Victoria to "test the bin again and reconfirm." This is on the same BIN-routing thread surface as yesterday's 56400206 issue (which was closed 18:44 WAT Apr 14). If this pattern recurs (BINs get re-misrouted after fix), it's a config drift signal, not a one-off. Briefing tier.
2. **MEMORY RESOURCE INCREASE chaser 2:** [[Emeka Joseph]] 09:30 WAT added [[Abraham Isinguzoro]] to the thread ("++"). Second chaser. Fidelity FEP Support (John Uguru-Okorie, Collins Abuya, Christian Okeke) non-response now 15h26min since original ask 18:05 WAT Apr 14. Infrastructure capacity signal remains open.
3. **Fidelity NSS Meeting admin credentials reminder:** [[Abraham Isinguzoro]] 10:01 WAT reminded Olusegun Jeje (Fidelity Team Lead, Collections & POS) that Jeje was created as admin user on the switch — asked for receipt confirmation. Follow-through on Apr 14 NSS meeting. Awareness — routine.

**Current (Apr 15, 10:09 WAT):** All Apr 14 RC91 cycles resolved. "Failing generally" thread now 38h+ silent. Fidelity actively engaging on Apr 15 new surfaces (Afrigo routing, NSS admin) but NOT on MEMORY RESOURCE — selective response pattern.

1. **RC91 Cycle 4 — TDSD-6552 RESOLVED 20:35 WAT Apr 14:** John Uguru-Okorie requested reconfirm; [[Qazim Adedigba]] confirmed "Transactions are processing fine now" at 20:35 WAT. ~1h30min cycle.
2. **Cards routing BIN 56400206 — CLOSED 18:44 WAT Apr 14.**
3. **Afrigo card routing (NEW Apr 15):** [[Victoria Ogaga-Omokri]] 09:46 WAT → [[Emeka Joseph]] 09:58 WAT retest request. In flight.
4. **MEMORY RESOURCE INCREASE (pending Fidelity, chased 09:30 WAT Apr 15 with Abraham added):** Original 18:05 WAT Apr 14; chaser 1 at 08:42 WAT Apr 15; chaser 2 at 09:30 WAT Apr 15 (++Abraham). No Fidelity response in 15h26min.
5. **DCIR Settlement Report 12-13 Apr — fresh report regen triggered 17:57 WAT Apr 14.**
6. **NSS admin credentials for Jeje:** Abraham reminder 10:01 WAT Apr 15 — awaiting Jeje confirmation.

**"Failing generally" track (Apr 13 19:25 WAT):** Still no explicit resolution — 38h+ silent. Implicit resolution inferred via absence + Apr 14 cycle closures.

**Cycles log:**
- **Cycle 1 (Apr 11):** Filed 03:33 WAT by Olamide.
- **Cycle 2 (Apr 12):** Filed 00:17 WAT.
- **Cycle 3 (Apr 14 morning):** Filed 09:08 WAT — implicitly resolved by afternoon Handover.
- **Cycle 4 (Apr 14 evening):** TDSD-6552. Filed 19:05 WAT. RESOLVED 20:35 WAT (~1h30min cycle).

**Multi-front exposure:**
1. "Failing generally" — 38h+ silent, implicit resolution.
2. RC91 Cycles 3 + 4 — both resolved.
3. Card routing BIN 56400206 — closed Apr 14.
4. **Afrigo card routing — OPEN Apr 15 morning.**
5. ACT platform go-live targeted Apr 13–14.
6. DD null mandate errors ([[TDSD-6504]] at [[NIBSS]]).
7. AptPay UAT window Apr 14–15.
8. DCIR Settlement reconciliation — regen triggered.
9. Back office server (10.10.9.110) memory saturation — 15h26min+ Fidelity non-response.
10. **NSS admin credentials for Jeje — reminder sent Apr 15.**

No Jira tickets verifiable — Jira connector still blind (82+ ticks, briefing-2026-04-15 B2 tracking).

## Sources
email [[Victoria Ogaga-Omokri]] → [[Emeka Joseph]] 09:46 WAT Apr 15 (Afrigo routing error); email [[Emeka Joseph]] → Victoria 09:58 WAT Apr 15 (retest request); email [[Emeka Joseph]] → Abraham + Fidelity FEP 09:30 WAT Apr 15 (MEMORY chaser 2); email [[Abraham Isinguzoro]] → Olusegun Jeje 10:01 WAT Apr 15 (NSS admin credentials reminder); email [[Emeka Joseph]] → Fidelity FEP Support 08:42 WAT Apr 15 (Re: MEMORY RESOURCE INCREASE chase); email [[Qazim Adedigba]] 23:57 WAT Apr 14 (Re: Hourly Reports 20260414 — 16/17 routes operational); email [[Qazim Adedigba]] → John Uguru-Okorie 20:35 WAT Apr 14 (Cycle 4 resolution); email John Uguru-Okorie → Qazim Adedigba 20:14 WAT Apr 14; email [[Qazim Adedigba]] → Fidelity FEP Support 19:05 WAT Apr 14 (TDSD-6552 filing); email [[Samuel Adewole]] → Emeka Joseph 18:44 WAT Apr 14 (BIN 56400206 configured); email [[Emeka Joseph]] → Fidelity FEP Support 18:05 WAT Apr 14 (MEMORY RESOURCE INCREASE); email [[Emeka Joseph]] → Collins Abuya 17:57 WAT Apr 14 (DCIR SETTLEMENT REPORT regen); email [[Olamide Ajibulu]] 09:08 WAT Apr 14 (Cycle 3); email [[Daniel Armstrong]] → fepsupport@fidelitybank.ng 19:25 WAT Apr 13 (Failing generally); email Duty Handover Note #20260414 morning + afternoon

## Deltas
- 2026-04-11 07:51 WAT — Single thread reply in Slack.
- 2026-04-11 19:47 WAT — P1 16h17min active.
- 2026-04-12 00:47 WAT — 2nd RC91 cycle.
- 2026-04-13 19:25 WAT — Escalated to "failing generally."
- 2026-04-14 06:17 WAT — Briefing-2026-04-14 B2 (high) surfaced.
- 2026-04-14 10:09 WAT — Fidelity RC91 Cycle 3 09:08 WAT.
- 2026-04-14 16:20 WAT — Cards routing + DCIR Settlement.
- 2026-04-14 18:09 WAT — MEMORY RESOURCE INCREASE ask; DCIR resolution.
- 2026-04-14 19:09 WAT — TDSD-6552 filed (Cycle 4).
- 2026-04-14 21:09 WAT — Cycle 4 RESOLVED 20:35 WAT.
- 2026-04-15 07:10 WAT — 16/17 routes operational; "Failing generally" 36h+ silent.
- 2026-04-15 09:08 WAT — MEMORY chase #1 at 08:42 WAT (14h37min non-response).
- 2026-04-15 10:09 WAT — **Three new Fidelity signals this tick:** (1) Afrigo card routing error (Victoria 09:46 WAT → Emeka Joseph 09:58 WAT retest); (2) MEMORY chaser #2 with Abraham added (09:30 WAT, Fidelity non-response 15h26min); (3) NSS admin credentials reminder (Abraham → Jeje 10:01 WAT). All Briefing/Awareness tier — no Immediate alert.