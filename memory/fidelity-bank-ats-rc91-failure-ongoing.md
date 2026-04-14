---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "Fidelity ATS Cycle 4 (TDSD-6552) RESOLVED 20:35 WAT — Qazim confirmed processing fine after John Uguru-Okorie (Fidelity) reconfirm request. Both Apr 14 RC91 cycles now closed (AM implicit, PM explicit). 'Failing generally' still silent 25h10min+. B2 still untriaged — pattern intact (2 cycles in one day)."
updated: "2026-04-14T20:12:34Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS — escalated beyond RC91 to "failing generally" on Apr 13, with two RC91 P1s filed on Apr 14 (morning 09:08 WAT and evening 19:05 WAT TDSD-6552). Cycle 4 (TDSD-6552) resolved 20:35 WAT per [[Qazim Adedigba]] confirmation. Afternoon Apr 14: Fidelity pushing for update on concurrent Cards/Moniepoint routing thread with customer-impact pressure language (closed 18:44 WAT). Evening Apr 14: infrastructure capacity signal — Fidelity Back office server (10.10.9.110) memory maxed, [[Emeka Joseph]] requesting 64GB.

**Current (Apr 14, 21:09 WAT):** All RC91 cycles for today resolved; structural pattern unchanged.

1. **RC91 Cycle 4 — TDSD-6552 RESOLVED:** [[Qazim Adedigba]] emailed 19:05 WAT filing, then John Uguru-Okorie (Fidelity FEP Support Team Lead) replied 20:14 WAT asking "Please reconfirm." [[Qazim Adedigba]] confirmed 20:35 WAT: "Transactions are processing fine now. Thank you." ~1h30min cycle. Pattern matches standard Fidelity reconfirmation loop.

2. **Cards routing RC92 (BIN 56400206) — CLOSED:** [[Samuel Adewole]] 18:44 WAT: "This has been configured already." Moniepoint-side BIN 56400206 routing enabled.

3. **MEMORY RESOURCE INCREASE (pending Fidelity):** [[Emeka Joseph]] 18:05 WAT requested Fidelity increase Back office server (10.10.9.110) memory to 64GB. No Fidelity response in 3h+ since. Tier 2 briefing.

4. **DCIR Settlement Report 12-13 Apr — RESOLVING:** Fresh report regen triggered 17:57 WAT.

**"Failing generally" track (Apr 13 19:25 WAT):** Still no explicit resolution signal — now **25h44min+ silent** from Fidelity. Bank engaging on other threads without acknowledging the ATS general failure. Both Apr 14 RC91 cycles resolved — suggests the "generally" framing may have been an overstatement, with underlying pattern being the recurring RC91 cycles.

**Cycles log:**
- **Cycle 1 (Apr 11):** Filed 03:33 WAT by Olamide. No explicit resolution signal.
- **Cycle 2 (Apr 12):** Filed 00:17 WAT by Olamide. Fidelity acknowledged emergency maintenance 00:24 WAT.
- **Cycle 3 (Apr 14 morning):** Filed 09:08 WAT by Olamide. Implicitly resolved by afternoon Handover.
- **Cycle 4 (Apr 14 evening):** TDSD-6552. Filed 19:05 WAT. **RESOLVED 20:35 WAT (~1h30min cycle).**

**Multi-front exposure on Apr 13–14 (updated):**
1. "Failing generally" — 25h44min+ post-escalation, no explicit resolution
2. RC91 Cycles 3 + 4 — both resolved
3. Card routing (closed 18:44 WAT)
4. ACT platform go-live targeted Apr 13–14
5. DD null mandate errors ([[TDSD-6504]] at [[NIBSS]])
6. AptPay UAT window Apr 14–15 — Day 1 completed with RC91 cycle active and resolved
7. DCIR Settlement reconciliation — fresh report regen triggered
8. Back office server (10.10.9.110) memory saturation — pending Fidelity

B2 in briefing-2026-04-14 (confidence: high) recommended: escalate to Fidelity CTO/Head of Channels; pause UAT via [[Olawale Adegboyega]]. With Cycle 4 now resolved (~1h30min, standard reconfirmation pattern), urgency on UAT pause reduces but does not evaporate — two RC91 cycles in one day confirms the pattern is active. B2 still untriaged.

No Jira tickets verifiable — Jira connector still blind (69+ ticks).

## Sources
email [[Qazim Adedigba]] → John Uguru-Okorie 20:35 WAT Apr 14 (Re: Fidelity Bank | ATS | RC 91 Failures | 20260414 | TDSD-6552 — "processing fine now"); email John Uguru-Okorie → Qazim Adedigba 20:14 WAT Apr 14 (Please reconfirm); email [[Qazim Adedigba]] → Fidelity FEP Support 19:05 WAT Apr 14 (Fidelity Bank | ATS | RC 91 Failures | 20260414 | TDSD-6552); email [[Samuel Adewole]] → Emeka Joseph 18:44 WAT Apr 14 (Re: ROUTING ERROR FOR FIDELITY BANK CARDS MONIEPOINT TERMINALS — "configured already"); email [[Emeka Joseph]] → Fidelity FEP Support 18:05 WAT Apr 14 (MEMORY RESOURCE INCREASE, 10.10.9.110 → 64GB); email [[Emeka Joseph]] → Collins Abuya / [[Oluwafunmike Ariyibi]] 17:57 WAT Apr 14 (Re: DCIR SETTLEMENT REPORT, fresh report generation); email [[Victoria Ogaga-Omokri]] → [[Emeka Joseph]] 16:06 WAT Apr 14 (Cards routing escalation); email [[Emeka Joseph]] → [[Oladipupo Sholotan]] 16:15 WAT Apr 14 (BIN 56400206 ATS routing request); email [[Olamide Ajibulu]] 09:08 WAT Apr 14 (FIDELITY BANK RC 91|20260414, Cycle 3); email [[Daniel Armstrong]] → fepsupport@fidelitybank.ng 19:25 WAT Apr 13 (Failing generally); email [[Olamide Ajibulu]] → fepsupport 03:32 WAT Apr 11 (Cycle 1), 00:17 WAT Apr 12 (Cycle 2); email [[Oluwafunsho Oyefeso]] emergency maintenance 00:24 WAT Apr 12; Google Drive ATPP Daily Standup Notes 15:35 UTC Apr 13; email Duty Handover Note #20260414 morning ([[Innocent Nwaokorie]] 08:01 WAT Apr 14); email Duty Handover Note #20260414 afternoon ([[Olamide Ajibulu]] → [[Qazim Adedigba]] 16:04 WAT Apr 14)

## Deltas
- 2026-04-11 07:51 WAT — Single thread reply in Slack. No resolution details.
- 2026-04-11 19:47 WAT — P1 now 16h17min active. Zero resolution signals.
- 2026-04-12 00:47 WAT — 2nd RC91 cycle filed. Fidelity acknowledged emergency maintenance.
- 2026-04-13 19:25 WAT — Escalated to "failing generally" — [[Daniel Armstrong]] reported broader failure beyond RC91. No resolution signal 3h+. Concurrent ACT go-live targeted same day.
- 2026-04-14 01:09 WAT — No resolution signal. 5h44min+ open.
- 2026-04-14 04:11 WAT — No resolution signal. 8h46min+ open.
- 2026-04-14 06:17 WAT — Briefing-2026-04-14 B2 (confidence: high) surfaced as Immediate-tier decision.
- 2026-04-14 08:09 WAT — 12h44min+ silent. Duty Handover says "16 of 17 PTSAs operational."
- 2026-04-14 10:09 WAT — New Fidelity RC91 P1 09:08 WAT ([[Olamide Ajibulu]]). Cycle 3.
- 2026-04-14 16:20 WAT — Cards routing thread escalation; DCIR Settlement Report thread active; 16/17 PTSAs.
- 2026-04-14 18:09 WAT — Evening: MEMORY RESOURCE INCREASE ask; DCIR Settlement resolution signal.
- 2026-04-14 19:09 WAT — NEW P1 FILED: TDSD-6552 (Qazim Adedigba, 19:05 WAT) — Cycle 4.
- 2026-04-14 21:09 WAT — **Cycle 4 RESOLVED 20:35 WAT.** John Uguru-Okorie (Fidelity) asked reconfirm 20:14 WAT; [[Qazim Adedigba]] confirmed "processing fine now" 20:35 WAT. ~1h30min cycle. Both Apr 14 cycles now closed. "Failing generally" still silent 25h44min+. No new Immediate alert — resolution signal. B2 still untriaged; pattern empirically intact (2 cycles in 12 hours).