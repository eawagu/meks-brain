---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "MEMORY RESOURCE INCREASE COMPLETED 14:02 WAT Apr 15 — Christian Okeke confirmed server memory now at 48GB; Emeka Joseph acked. Multi-day escalation closed. Afrigo and NSS admin credential tracks still open. All Apr 14 RC91 cycles resolved; 'Failing generally' 42h+ silent (implicit resolved)."
updated: "2026-04-15T13:13:14Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS — escalated beyond RC91 to "failing generally" on Apr 13, with two RC91 P1s filed on Apr 14 (morning 09:08 WAT and evening 19:05 WAT TDSD-6552). Both Apr 14 cycles closed. Apr 15 opened with three Fidelity-track surfaces: Afrigo card routing error, MEMORY RESOURCE INCREASE chase, and NSS admin credential friction from Jeje. MEMORY track closed 14:02 WAT.

**Apr 15 14:09 WAT tick — MEMORY RESOURCE INCREASE COMPLETED:**

**Christian Okeke (Fidelity FEP Support) 14:02 WAT → [[Emeka Joseph]]:** "The ESS Team has completed this request. The server memory has now been increased to 48GB." [[Emeka Joseph]] ack at 14:04 WAT: "Thank you so much for the timely response. This is noted."

Resolution metrics: originally asked 18:05 WAT Apr 14 → Fidelity acked 10:54 WAT Apr 15 (16h49min response time) → fulfilled 14:02 WAT Apr 15 (~20h end-to-end). After Fidelity engaged, execution was fast (~3h08min from ack to completion). Back office server (10.10.9.110) memory saturation cleared — exposure item #9 closed.

**Apr 15 11:09 WAT tick — three Fidelity-track signals:**

1. **MEMORY RESOURCE INCREASE — FIDELITY ACKNOWLEDGED 10:54 WAT:** Christian Okeke (Fidelity FEP Support) → [[Emeka Joseph]]: review internally, will revert. Response time: 16h49min from original 18:05 WAT Apr 14 ask — non-response pattern broken. Fidelity's response arrived immediately after the second chaser (09:30 WAT) added [[Abraham Isinguzoro]]. **Closed 14:02 WAT (this tick).**

2. **NSS admin credentials — Jeje pushback 10:45 WAT:** Olusegun Jeje (Fidelity Team Lead, Collections & POS) → [[Abraham Isinguzoro]]: "I don't have the mail. Kindly readvise and share the link to access. However, is this advice not supposed to be for a technical team? I am in operation." Two issues: (a) Jeje claims the credential email never reached him; (b) Jeje questions whether admin access should be assigned to operations rather than a Fidelity technical team. Briefing-tier — delivery/ownership friction, not a credential issue. Still open.

3. **Afrigo retest acknowledged 10:41 WAT:** [[Victoria Ogaga-Omokri]] (Fidelity) → [[Emeka Joseph]]: "Mail acknowledged." Thread moving — Fidelity to retest BIN routing. Awareness. Still open.

**Current (Apr 15, 14:09 WAT):** All Apr 14 RC91 cycles resolved. "Failing generally" thread 42h+ silent (implicit resolution). MEMORY RESOURCE INCREASE CLOSED. Two open Apr 15 surfaces: Afrigo retest pending Fidelity, NSS admin credential ownership questioned by Jeje.

1. **RC91 Cycle 4 — TDSD-6552 RESOLVED 20:35 WAT Apr 14:** John Uguru-Okorie requested reconfirm; [[Qazim Adedigba]] confirmed "Transactions are processing fine now" at 20:35 WAT. ~1h30min cycle.
2. **Cards routing BIN 56400206 — CLOSED 18:44 WAT Apr 14.**
3. **Afrigo card routing (Apr 15):** [[Victoria Ogaga-Omokri]] 09:46 WAT → [[Emeka Joseph]] 09:58 WAT retest request → Victoria ack 10:41 WAT. Pending Fidelity retest result.
4. **MEMORY RESOURCE INCREASE (Apr 14–15):** Original 18:05 WAT Apr 14; chaser 1 at 08:42 WAT Apr 15; chaser 2 at 09:30 WAT Apr 15 (++Abraham); Fidelity acked 10:54 WAT Apr 15 (Christian Okeke) — review internally; **COMPLETED 14:02 WAT Apr 15 — server memory increased to 48GB.**
5. **DCIR Settlement Report 12-13 Apr — fresh report regen triggered 17:57 WAT Apr 14.**
6. **NSS admin credentials for Jeje (Apr 14–15):** Abraham reminder 10:01 WAT Apr 15 → Jeje pushback 10:45 WAT Apr 15 — claims no mail received, questions whether admin access belongs on operations side.

**"Failing generally" track (Apr 13 19:25 WAT):** Still no explicit resolution — 42h+ silent. Implicit resolution inferred via absence + Apr 14 cycle closures.

**Cycles log:**
- **Cycle 1 (Apr 11):** Filed 03:33 WAT by Olamide.
- **Cycle 2 (Apr 12):** Filed 00:17 WAT.
- **Cycle 3 (Apr 14 morning):** Filed 09:08 WAT — implicitly resolved by afternoon Handover.
- **Cycle 4 (Apr 14 evening):** TDSD-6552. Filed 19:05 WAT. RESOLVED 20:35 WAT (~1h30min cycle).

**Multi-front exposure:**
1. "Failing generally" — 42h+ silent, implicit resolution.
2. RC91 Cycles 3 + 4 — both resolved.
3. Card routing BIN 56400206 — closed Apr 14.
4. Afrigo card routing — pending Fidelity retest.
5. ACT platform go-live targeted Apr 13–14.
6. DD null mandate errors ([[TDSD-6504]] at [[NIBSS]]).
7. AptPay UAT window Apr 14–15.
8. DCIR Settlement reconciliation — regen triggered.
9. **Back office server (10.10.9.110) memory saturation — RESOLVED 14:02 WAT Apr 15.** 48GB allocated.
10. **NSS admin credentials for Jeje — Jeje pushback 10:45 WAT Apr 15: ownership/delivery question.** Still open.

No Jira tickets verifiable — Jira connector still blind (88+ ticks, briefing-2026-04-15 B2 tracking).

## Sources
email Christian Okeke → [[Emeka Joseph]] 14:02 WAT Apr 15 (RE: MEMORY RESOURCE INCREASE — COMPLETED, 48GB); email [[Emeka Joseph]] → Christian Okeke 14:04 WAT Apr 15 (ack/thanks); email Christian Okeke → [[Emeka Joseph]] 10:54 WAT Apr 15 (Re: MEMORY RESOURCE INCREASE — acknowledged); email Olusegun Jeje → [[Abraham Isinguzoro]] 10:45 WAT Apr 15 (pushback); email [[Victoria Ogaga-Omokri]] → [[Emeka Joseph]] 10:41 WAT Apr 15 (Afrigo retest acked); email [[Victoria Ogaga-Omokri]] → [[Emeka Joseph]] 09:46 WAT Apr 15 (Afrigo routing error); email [[Emeka Joseph]] → Victoria 09:58 WAT Apr 15 (retest request); email [[Emeka Joseph]] → Abraham + Fidelity FEP 09:30 WAT Apr 15 (MEMORY chaser 2); email [[Abraham Isinguzoro]] → Olusegun Jeje 10:01 WAT Apr 15 (NSS admin credentials reminder); email [[Emeka Joseph]] → Fidelity FEP Support 08:42 WAT Apr 15 (Re: MEMORY RESOURCE INCREASE chase); email [[Qazim Adedigba]] 23:57 WAT Apr 14 (Re: Hourly Reports 20260414); email [[Qazim Adedigba]] → John Uguru-Okorie 20:35 WAT Apr 14 (Cycle 4 resolution); email John Uguru-Okorie → Qazim Adedigba 20:14 WAT Apr 14; email [[Qazim Adedigba]] → Fidelity FEP Support 19:05 WAT Apr 14 (TDSD-6552 filing); email [[Samuel Adewole]] → Emeka Joseph 18:44 WAT Apr 14 (BIN 56400206 configured); email [[Emeka Joseph]] → Fidelity FEP Support 18:05 WAT Apr 14 (MEMORY RESOURCE INCREASE); email [[Emeka Joseph]] → Collins Abuya 17:57 WAT Apr 14 (DCIR SETTLEMENT REPORT regen); email [[Olamide Ajibulu]] 09:08 WAT Apr 14 (Cycle 3); email [[Daniel Armstrong]] → fepsupport@fidelitybank.ng 19:25 WAT Apr 13 (Failing generally); email Duty Handover Note #20260414 morning + afternoon

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
- 2026-04-15 10:09 WAT — Three new Fidelity signals: Afrigo routing error; MEMORY chaser #2; NSS admin credentials reminder to Jeje.
- 2026-04-15 11:09 WAT — Three Fidelity-side responses: Christian MEMORY ack 10:54 WAT; Jeje NSS pushback 10:45 WAT; Victoria Afrigo ack 10:41 WAT.
- 2026-04-15 14:09 WAT — **MEMORY RESOURCE INCREASE COMPLETED 14:02 WAT.** Christian Okeke confirmed 48GB allocated; Emeka Joseph ack 14:04 WAT. 20h end-to-end, 3h08min from Fidelity ack to fulfillment. Exposure item #9 closed. Two open Apr 15 surfaces remain: Afrigo retest, NSS admin credentials ownership.