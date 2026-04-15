---
role: cto-teamapt
type:
  - "situation"
title: DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked
status: resolving
created: "2026-04-11T16:42:32Z"
summary: "Five CRITICAL vulnerabilities. TDSD-6479 Harness migration CTO-approved Apr 12. DCIR transaction failure rate 100% overnight Apr 14 (03:50–04:06 WAT), 5h+ silent since. New concurrent signal Apr 14 09:09 WAT: Stanbic-reported DCIR portal data integrity discrepancy (RRN 260408258334). Surfaced in briefing-2026-04-14 B1."
updated: "2026-04-15T10:13:56Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Five CRITICAL vulnerabilities across [[ACS (Access Control Server)]], DCIR, [[DirectDebit]]. ACS connector replacement progressing: [[CoralPay]] service deployed to production ([[TDSD-6047]] Done, 18:45 WAT Apr 10, [[Ekene Udodi]]); [[FCMB]] MFA enrollment for VPN access confirmed. [[Fidelity Bank]] DD P1 ([[TDSD-6499]]) RESOLVED 13:07 WAT Apr 10 (11h7min, root cause: network connection loss to bank transfer API — independent of DCIR chain). TDSD-6504 (DD null mandate errors) escalated to [[NIBSS]] at 15:37 WAT Apr 10 — no resolution. [[TDSD-6479]] (Harness P1 migration) — **CTO approved Apr 12.** Bank Cashout Service and Card transaction routing can now migrate off legacy CI/CD. DCIR Stanbic server memory at 94.97% (threshold 90%) — monitoring alert at 19:46 WAT Apr 11. ATS JAR deployment to [[Stanbic Bank]] requested by [[Babajide Ojoboorun]] at 17:01 WAT.

**Apr 14 overnight — DCIR COMPLETE FAILURE:** Transaction failure rate escalated through the night: 80% (00:48 WAT) → declined to 33% (01:06) → re-elevated to 50–57% (01:22–01:54) → **100% (03:50 WAT) → 100% (04:06 WAT)**. All alerts from [[Wema Bank]] DCIR monitoring (Reply-To: wemaalert@wemabank.com) via aptpaytechnicalsupport distribution list. No human escalation filed at any point. The 100% rate means zero DCIR transactions succeeding through Wema. Whether connected to Stanbic server memory stress (94.97%) or a separate Wema-side failure is unconfirmed.

**Apr 15 11:09 WAT — silence since 04:06 WAT Apr 14 holds:** No new DCIR monitoring alerts received in the 29h+ since the 04:06 WAT 100% alert. Monitoring fires when failure rate exceeds 20% threshold — silence strongly implies implicit recovery (rate now below threshold). Tactical incident effectively closed by silence. **Structural gap remains live:** briefing-2026-04-15 B3 carries forward the retro ask — written playbook closing the email-alert-to-Slack-P1 escalation gap, owner Oladapo Onayemi or Head of SRE, deliverable by Fri Apr 17.

**Apr 15 11:09 WAT tick — four new DCIR-chain signals:**

1. **Parallex Bank DCIR DB INDEX JOB FAILURE (NEW, 11:09 WAT):** Segun Ogunsola (Parallex Bank, Channels Switching) → [[Babajide Ojoboorun]] + aptpaytechnicalsupport: "We observed the Index job as regards the DCIR database is failing as seen in the screenshot below. Kindly assist review with the team and advise." Distinct from previous Parallex DCIR signals (Authentication Error Message Exposure). Database index failure can degrade DCIR portal query performance and downstream reconciliation. Briefing-tier — new Parallex DCIR issue pending Babajide triage.

2. **Parallex DCIR portal Authentication Error Message Exposure — Babajide remediation in flight (11:07 WAT):** [[Babajide Ojoboorun]] → Segun Ogunsola + Channels Switching + Information Security + Yusuf Mudashiru: "We are already working on the remediation which we will deploy to the Test environment and then production, Kindly note that we will share updates soon." Responds to Segun's 11:04 WAT chaser ("Kindly assist provide update"). Ongoing Parallex vulnerability remediation chain — progression continues. Awareness.

3. **Ecobank DCIR CLAIMS IN PROGRESS (NEW, 11:03 WAT):** AllENG-POSDisputeMgm via aptpaytechnicalsupport → ADEWUYI Mayowa (Ecobank): "The attached file contains transactions that are accepted but in progress on DCIR platform and funds are yet to reflect in the customers' accounts." Structured claims batch — dispute workflow surface. Ecobank customers impacted; Ecobank team tagged for resolution. Awareness — routine dispute-handling, no CTO action required unless Ecobank non-response escalates.

4. **FCMB User Credentials retrieval chaser (10:12 WAT):** [[Olamide Ajibulu]] → Bashir Adeyemi + SwitchApplicationSupport + Ogundairo Tobiloba + Erica Akhibi (FCMB): "Please assist" chaser on "FCMB | ATS | Retrieval of User Credentials | 20260414" thread. 18h+ FCMB non-response on credential retrieval request. Awareness — chaser pattern active, no escalation yet.

**Apr 15 09:07 WAT — Access Bank vulnerabilities remediation jar shared with bank security team:** [[Babajide Ojoboorun]] forwarded the Bank Integration jar to Abdulbaki Salawu (Access Bank) and other Access Bank recipients. Ongoing progression of Access Bank DCIR remediation chain — jar packaging + bank-side scan feedback loop continues. Awareness-tier.

**Apr 14 09:09 WAT — Stanbic DCIR portal data integrity concern:** Umechiedo, Ekene E (Stanbic Bank) reported at 08:25 WAT that the account number on DCIR portal for RRN 260408258334 differs from Stanbic's internal system and the customer's account. [[Emeka Joseph]] acknowledged at 09:40 WAT. Distinct failure mode from transaction-rate alerts — data consistency thread.

## Sources
email Segun Ogunsola (Parallex) → [[Babajide Ojoboorun]] 11:09 WAT Apr 15 (DCIR DB INDEX JOB FAILURE); email [[Babajide Ojoboorun]] → Segun Ogunsola 11:07 WAT Apr 15 (Re: Authentication Error Message Exposure — remediation in flight); email AllENG-POSDisputeMgm → Ecobank 11:03 WAT Apr 15 (DCIR CLAIMS IN PROGRESS); email [[Olamide Ajibulu]] → FCMB 10:12 WAT Apr 15 (FCMB Retrieval of User Credentials chaser); email [[Babajide Ojoboorun]] → Abdulbaki Salawu (Access Bank) 09:07 WAT Apr 15 (Re: ACCESS BANK VULNERABILITIES REMEDIATION JAR FILE SCAN REPORT); email [[Babajide Ojoboorun]] 17:55 WAT Apr 8; email [[Yasir Syed Ali]] 01:44 WAT Apr 10; email Fidelity restart 00:30 WAT Apr 10; slack #teamapt-tech-operations; jira TDSD-6439, TDSD-6477, TDSD-6479, TDSD-6497, TDSD-6499; email [[Ezinne Okoro]] 09:45 WAT Apr 10; email dcir-stanbic monitoring 19:46 WAT Apr 11; CTO confirmation Apr 12; email DCIR monitoring alerts 00:48–04:06 WAT Apr 14; email "WRONG ACCOUNT NUMBER ON DCIR PORTAL" (Umechiedo → teamapt, 08:25 WAT Apr 14); email reply [[Emeka Joseph]] 09:40 WAT Apr 14; briefing-2026-04-15 B3

## Deltas
- 2026-04-09 17:02 WAT — [[Access Bank]] ACS P1: mandate creation failed 09:20–13:40 WAT. TDSD-6479: sync with Michael Oyedele pending.
- 2026-04-10 01:13 WAT — TDSD-6479 third consecutive deploy window missed. Fidelity DCIR REALTIME server restart 00:30 WAT.
- 2026-04-10 03:10 WAT — TDSD-6479 fourth consecutive missed window confirmed.
- 2026-04-10 09:09 WAT — NEW P1: Fidelity DD transactions stuck since 02:00 WAT (7h+).
- 2026-04-10 11:00 WAT — Fidelity DD P1 still ongoing (9h+). FCMB MFA enrollment confirmed.
- 2026-04-10 13:00 WAT — Fidelity DD P1 RESOLVED (11h7min).
- 2026-04-10 15:00 WAT — TDSD-6504 (DD null mandate errors) new failure mode emerging.
- 2026-04-10 17:05 WAT — TDSD-6497 RCA posted. TDSD-6504 escalated to NIBSS.
- 2026-04-10 21:12 WAT — TDSD-6504 at NIBSS.
- 2026-04-11 01:09 WAT — FIFTH CONSECUTIVE MISSED WINDOW CONFIRMED.
- 2026-04-11 19:46 WAT — DCIR Stanbic server memory 94.97%.
- 2026-04-12 16:36 WAT — CTO confirmed TDSD-6479 Harness migration approved.
- 2026-04-14 01:09 WAT — DCIR transaction failure rate spiked to 80%.
- 2026-04-14 02:09 WAT — Re-elevated 57%/50%/57%.
- 2026-04-14 04:11 WAT — 100% failure 03:50 and 04:06 WAT. Immediate alert dispatched.
- 2026-04-14 06:17 WAT — Briefing-2026-04-14 B1 surfaced as Immediate-tier.
- 2026-04-14 08:09 WAT — No new DCIR alerts in 4h+.
- 2026-04-14 09:09 WAT — Stanbic DCIR portal data integrity signal.
- 2026-04-15 07:10 WAT — DCIR monitoring 27h+ silent.
- 2026-04-15 09:08 WAT — 28h+ silence. Access Bank jar forwarded 09:07 WAT.
- 2026-04-15 11:09 WAT — **29h+ silence on DCIR monitoring holds. Four new DCIR-chain signals this tick:** (1) Parallex Bank DCIR DB INDEX JOB FAILURE (NEW, Segun Ogunsola 11:09 WAT — fresh Parallex DCIR issue, briefing-tier, awaiting Babajide triage); (2) Parallex DCIR Authentication Error remediation in flight (Babajide 11:07 WAT "will deploy to Test then Production"); (3) Ecobank DCIR CLAIMS IN PROGRESS 11:03 WAT — transactions accepted on DCIR platform but not reflecting in customer accounts, dispute workflow active; (4) FCMB User Credentials retrieval chaser 10:12 WAT — 18h+ FCMB non-response. No Immediate alerts. Pattern: DCIR chain activity broadening across Parallex + Ecobank + FCMB while tactical Wema DCIR failure remains silent-recovered.