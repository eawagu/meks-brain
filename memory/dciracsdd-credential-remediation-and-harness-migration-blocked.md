---
role: cto-teamapt
type:
  - "situation"
title: DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked
status: resolving
created: "2026-04-11T16:42:32Z"
summary: "Five CRITICAL vulnerabilities. TDSD-6479 Harness migration CTO-approved Apr 12. DCIR transaction failure rate 100% overnight Apr 14 (03:50–04:06 WAT), 5h+ silent since. New concurrent signal Apr 14 09:09 WAT: Stanbic-reported DCIR portal data integrity discrepancy (RRN 260408258334). Surfaced in briefing-2026-04-14 B1."
updated: "2026-04-15T06:20:51Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Five CRITICAL vulnerabilities across [[ACS (Access Control Server)]], DCIR, [[DirectDebit]]. ACS connector replacement progressing: [[CoralPay]] service deployed to production ([[TDSD-6047]] Done, 18:45 WAT Apr 10, [[Ekene Udodi]]); [[FCMB]] MFA enrollment for VPN access confirmed. [[Fidelity Bank]] DD P1 ([[TDSD-6499]]) RESOLVED 13:07 WAT Apr 10 (11h7min, root cause: network connection loss to bank transfer API — independent of DCIR chain). TDSD-6504 (DD null mandate errors) escalated to [[NIBSS]] at 15:37 WAT Apr 10 — no resolution. [[TDSD-6479]] (Harness P1 migration) — **CTO approved Apr 12.** Bank Cashout Service and Card transaction routing can now migrate off legacy CI/CD. DCIR Stanbic server memory at 94.97% (threshold 90%) — monitoring alert at 19:46 WAT Apr 11. ATS JAR deployment to [[Stanbic Bank]] requested by [[Babajide Ojoboorun]] at 17:01 WAT.

**Apr 14 overnight — DCIR COMPLETE FAILURE:** Transaction failure rate escalated through the night: 80% (00:48 WAT) → declined to 33% (01:06) → re-elevated to 50–57% (01:22–01:54) → **100% (03:50 WAT) → 100% (04:06 WAT)**. All alerts from [[Wema Bank]] DCIR monitoring (Reply-To: wemaalert@wemabank.com) via aptpaytechnicalsupport distribution list. No human escalation filed at any point. The 100% rate means zero DCIR transactions succeeding through Wema. Whether connected to Stanbic server memory stress (94.97%) or a separate Wema-side failure is unconfirmed.

**Apr 14 + overnight Apr 15 — silence since 04:06 WAT Apr 14:** No new DCIR monitoring alerts received in the 27h+ since the 04:06 WAT 100% alert. Monitoring fires when failure rate exceeds 20% threshold — silence strongly implies implicit recovery (rate now below threshold). Tactical incident effectively closed by silence. **Structural gap remains live:** briefing-2026-04-15 B3 carries forward the retro ask — written playbook closing the email-alert-to-Slack-P1 escalation gap, owner Oladapo Onayemi or Head of SRE, deliverable by Fri Apr 17. B1 yesterday's recommendation to page on-call SRE is moot (incident resolved); retro is not.

**Apr 14 09:09 WAT — Stanbic DCIR portal data integrity concern:** Umechiedo, Ekene E (Stanbic Bank) reported at 08:25 WAT that the account number on DCIR portal for RRN 260408258334 (dated 08-Apr-2026, reference CO0000001477965) differs from Stanbic's internal system and the customer's account. [[Emeka Joseph]] acknowledged at 09:40 WAT, flagging review with Bank's technical team. Distinct failure mode from transaction-rate alerts — data consistency thread.

## Sources
email [[Babajide Ojoboorun]] 17:55 WAT Apr 8; email [[Yasir Syed Ali]] 01:44 WAT Apr 10; email Fidelity restart 00:30 WAT Apr 10; slack #teamapt-tech-operations; jira TDSD-6439, TDSD-6477, TDSD-6479, TDSD-6497, TDSD-6499; email [[Ezinne Okoro]] 09:45 WAT Apr 10; email dcir-stanbic monitoring 19:46 WAT Apr 11; CTO confirmation Apr 12; email DCIR monitoring alerts 00:48–04:06 WAT Apr 14; email "WRONG ACCOUNT NUMBER ON DCIR PORTAL 260408258334 CO0000001477965" (Umechiedo, Ekene E → teamapt, 08:25 WAT Apr 14); email reply [[Emeka Joseph]] 09:40 WAT Apr 14; briefing-2026-04-15 B3

## Deltas
- 2026-04-09 17:02 WAT — [[Access Bank]] ACS P1 (Direct Debit): mandate creation failed 09:20–13:40 WAT (4h 20min), resolved by bank. TDSD-6479: [[Tolu Aina]] directed [[Ekene Udodi]] to sync with Michael Oyedele — CTO and Tolu approvals still pending.
- 2026-04-10 01:13 WAT — TDSD-6479 third consecutive deploy window missed. Fidelity DCIR REALTIME server restart at 00:30 WAT.
- 2026-04-10 03:10 WAT — TDSD-6479 fourth consecutive missed window confirmed. Still at Authorize.
- 2026-04-10 09:09 WAT — NEW P1: Fidelity DD transactions stuck since 02:00 WAT (7h+). TDSD-6479 unchanged.
- 2026-04-10 11:00 WAT — Fidelity DD P1 still ongoing (9h+). FCMB MFA enrollment confirmed. Fifth missed window tonight if CTO does not approve.
- 2026-04-10 13:00 WAT — Fidelity DD P1 RESOLVED (11h7min). TDSD-6479 still at Authorize.
- 2026-04-10 15:00 WAT — TDSD-6479 confirmed still at Authorize. TDSD-6504 (DD null mandate errors) new failure mode emerging.
- 2026-04-10 17:05 WAT — TDSD-6497 RCA posted: network connection loss to bank transfer API. TDSD-6504 escalated to NIBSS.
- 2026-04-10 21:12 WAT — TDSD-6504 at NIBSS. TDSD-6479 still at Authorize — fifth window opens in ~4 hours.
- 2026-04-11 01:09 WAT — FIFTH CONSECUTIVE MISSED WINDOW CONFIRMED. Bank Cashout Service and Card transaction routing remain on legacy CI/CD.
- 2026-04-11 19:46 WAT — DCIR Stanbic server memory at 94.97% (threshold 90%). Infrastructure stress signal. ATS JAR deployment to Stanbic requested by [[Babajide Ojoboorun]] at 17:01 WAT.
- 2026-04-12 16:36 WAT — CTO confirmed TDSD-6479 Harness migration approved. Deploy can now proceed.
- 2026-04-14 01:09 WAT — DCIR transaction failure rate spiked to 80% (00:48 WAT), declined to 33.33% (01:06 WAT). Automated monitoring alerts. No human escalation. Possible overnight low-volume noise or early sign of degradation linked to Stanbic memory stress.
- 2026-04-14 02:09 WAT — DCIR failure rate re-elevated: 57% (01:22), 50% (01:38), 57% (01:54 WAT). Rates did not recover after initial decline — sustained elevated failure for 60+ minutes. No human escalation filed.
- 2026-04-14 04:11 WAT — DCIR failure rate escalated to 100% at 03:50 and 04:06 WAT. Complete DCIR transaction failure through [[Wema Bank]]. Escalation from 50–57% sustained range to total outage. 3+ hours active with no resolution signal and no human escalation. Immediate alert dispatched.
- 2026-04-14 06:17 WAT — Briefing-2026-04-14 B1 surfaced this as top Immediate-tier decision item (confidence: high). Recommendation: page on-call SRE + file retro on monitoring-to-human-pickup gap.
- 2026-04-14 08:09 WAT — No new DCIR monitoring alerts in 4h+ since 04:06 WAT 100% spike. Silence ambiguous. Duty Handover #20260414 suggests Wema implicitly in operational set.
- 2026-04-14 09:09 WAT — Stanbic DCIR portal data integrity signal: Umechiedo (Stanbic) reported DCIR portal account number for RRN 260408258334 differs from Stanbic internal system. [[Emeka Joseph]] acknowledged, routing to bank technical team. Concurrent failure mode distinct from transaction-rate alerts — data sync or posting logic issue. No new DCIR monitoring alerts this tick.
- 2026-04-15 07:10 WAT — **DCIR monitoring 27h+ silent since 04:06 WAT Apr 14 100% peak.** Implicit recovery inferred (threshold 20%, no alerts = below). Tactical incident closed by silence. **Briefing-2026-04-15 B3 carries the structural retro ask forward** — monitoring-to-human-pickup gap needs a written playbook, not a behavioral commitment. B1 yesterday untriaged. Situation status updated: tactical thread closing; process-gap thread remains open pending retro delivery.
