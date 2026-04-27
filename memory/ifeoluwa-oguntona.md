---
type:
  - "entity"
title: Ifeoluwa Oguntona
created: 2026-04-11
summary: TeamApt Direct to Bank team member — owns Zenith Bank, Stanbic, and Ecobank Fund Settlement tracks; resumed Apr 9 with Zenith DD JARs scanning, OTP API and Ecobank SLA follow-ups.
updated: "2026-04-27T17:43:51Z"
cssclasses:
  - "entity"
---

TeamApt [[Direct to Bank program]] team member — resumed Apr 9, tasked with following up on Zenith DD JARs scanning feedback, OTP API error, and Ecobank SLA with Felix.

## 2026-04-21 — D2B Standup (08:10 WAT)

- Inquired whether the recent necessary upgrade to resolve existing issues has been included in the JARs being prepared for the new banks; [[Abiodun Famoye]] confirmed yes.
- **Zenith Bank security stance** — stated that LDAP was intended to suffice for additional security.
- **Fund Settlement Account whitelist strategy** — raised the issue of handling the account whitelist for interbank API access (both [[Money Point]] and [[Tap]] accounts). Stressed the importance of being proactive and pushing both accounts forward; bank-specific issues handled case by case.
- Action items: revert Zenith Bank with status updates and expected fix availability time today; follow up with [[Kevin]] re: account number, Client ID, API key; visit the bank branch today to understand the bank's name-change problem.
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## 2026-04-22 — D2B Standup (08:21 WAT)

- **UBA Fund Settlements SLA** — confirmed integration began last quarter; SLA pending review and sign-off by bank's legal team. Legal clause clarified yesterday; updated document shared with UBA for final review.
- **Zenith deadline** — requested team check resolution availability and ensure role creation is completed before 12:00 today.
- **Submit Settlement Form** — to complete and submit the account configuration form for the foreign settlement agent at [[Ecobank]].
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## 2026-04-23 — D2B Standup

- Met with Gaffa and the [[Zenith Bank]] team where the bank explained their needs and knowledge gaps on the [[Role Matrix]]; emphasized the need for an update on the matrix from Gaffa.
- Urgently requested an update on the branch [[Settlement API]] and asked [[Abdulgafar Obeitor]] to forward the relevant mail to enable follow-up ticket creation.
- Noted no changes have occurred on the security side of things for the DD project.
- Source: [[note_2026-04-23T13-53-37-857Z]].

## 2026-04-27 — Project Delivery & Optimization Realignment

Led the first set of updates. Highlights:
- **[[Zenith Bank]] vulnerabilities** — bank-flagged appsec vulnerabilities have been fixed. In today's bank meeting, team agreed to run their own internal scan and bring results back so claims of false positives can be evidence-backed (rather than asserted verbally). Internal security team committed to feedback before end-of-day.
- **Zenith user training** — Day 2 (where users would exercise the system and ask role-based questions) did not happen last week. Requested a new date; awaiting bank confirmation.
- **Zenith NSS** — switch team configured the required per-bank-user daily reports. Because the [[ATS]] endpoint is not ready, [[Kevin]] proposed using [[Money Point|Moniepoint]] transactions for the NSS test; internal-work deadline of 15 May. Meeting expected this week to confirm direction.
- **[[Ecobank]] Fund Settlement Agent** — all tests done, sandbox issues resolved, integration commenced today; engineering committed to two-week timeline → test environment completion ~12 May. Production API engagement after.
- **Pilot commitments**: Resolve Zenith items by 30 April to start DD pilot. NSS expected 29 April. Stanbic Phone Settlement Agent 30 April. Ecobank Fund Settlement Agent 15 May.
- **Owns**: scheduling NSS Money Point meeting this week; following up on Zenith user-training reschedule.
- Source: [[Project delivery and optimization realignment - 2026-04-27 - Transcript]].

## Sources
- [[Direct to Bank Daily Stand Up 2026-04-09]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]