---
title: "Direct to Bank Daily standup - 2026-04-22 08:21 WAT"
type:
  - "source"
cssclasses:
  - "source"
source_path: Direct to Bank _ Daily stand up – 2026_04_22 08_21 WAT – Notes by Gemini.md
retention_label: postgres
retention_rationale: Multi-bank D2B standup transcript with named SLA blockers, pentest deliverables, war-room scheduling, and detailed per-bank status (Zenith, Ecobank, UBA, WHMA, Steel, Coral Pay/Access, Union Bank, Polaris, Keystone, FCMB, GT Bank, Money Point, Karry MFB). Future retrieval likely — referenced by SLA tracking, pentest remediation, route status, and integration program reviews.
created: "2026-04-25T11:40:37Z"
updated: "2026-04-25T11:40:37Z"
summary: "2026-04-22 08:21 WAT Direct to Bank daily standup — Zenith user-disable workaround via standby role; bank integration blockers across SLA sign-offs (UBA, WHMA, Steel, Coral Pay/Access Bank, Polaris); Union Bank 10-digit account number wait; Polaris Name-Inquiry/Transfer API instability; Keystone Bank to deploy latest JAR to test environment; FCMB BVN dropped from API responses; Money Point Direct Debit war room scheduled for OTP/transaction-processing issues."
---

## Summary

[[Direct to Bank program]] daily standup at 2026-04-22 08:21 WAT. Reviewed bank integration statuses across many institutions and addressed critical security and SLA blockers via technical updates. Aligned decisions taken on Keystone test-environment deployment and removal of [[BVN]] from FCMB integration.

Highlights: Zenith user-disable concern resolved via a "standby role" implementation (a role that strips authorities, leaving only a change-password prompt — adapted from Ecobank); broad SLA-signoff blockers across UBA, WHMA, Steel Bank, [[Coral Pay]]/Access Bank, and Polaris; multiple API-instability fires at Polaris and Union Bank; Keystone Bank stalled by their mobile-app authentication build; Money Point Direct Debit OTP/transaction issues escalated to a war room.

## Key Points

- **Zenith Bank user disable** — [[Ugochukwu Ebirika]] confirmed the implementation pattern from [[Ecobank]]: a user role that removes all authorities, leaving only a "change password" prompt at login (not full disablement, but functionally restricts portal access while preserving LDAP for other applications). Role creation must complete before 12:00 today.
- **Zenith pentest remediation** — still awaiting resolution past yesterday's commitment from internal team. Matrix creation and user training scheduled today and tomorrow. [[Isaac Arinze]] uploading integration jobs to staging environment for testing; once tested they go to [[Solomon]].
- **Ecobank** — requested until end of week for the account-name change from previous entity to ATS. Foreign settlement agent: initial request was for Money Point; new process requires form fill, account details, signature, resubmission for [[Himma]]. Doesn't affect ongoing test integration but required for live.
- **UBA Fund Settlements integration** — began last quarter; SLA pending review and sign-off by bank's legal team. Legal clause clarified yesterday; updated document shared with UBA for final review.
- **WHMA Bank** — waiting for signed SLA copy for ATS integration.
- **Steel Bank** — Direct Debit project approval sign-off not received; [[Oluwakemi Oni]] following up by call today.
- **Coral Pay × Access Bank** — blocked by SLA pricing dispute between bank and Coral Pay; preventing pilot/production progress. Oluwakemi to call [[Daniel]] today for SLA progress.
- **Interbank Transfer SLA × Access Bank** — bank needs to sign off; Oluwakemi to reach [[Chama]] today.
- **Karry MFB** ("Kari MFB" in transcript) — [[Abdulgafar Obeitor]] to share server requirements and API documentation with Oluwakemi (primary bank communicator).
- **Union Bank Direct Debit testing** — server access resolved; waiting on bank to provide a 10-digit account number (the previous 9-digit number caused API failure). Oluwakemi following up.
- **Polaris** — fund-settlement sign-off remains a blocker. Name-Inquiry API and Transfer API are failing — repeated escalations, persistent instability. Oluwakemi to visit the bank today/tomorrow. The group to hold a dedicated session to resolve the API failures.
- **Keystone Bank** — no update; team eyeing end-of-April for major progress. Authentication is the blocker — bank is building a new mobile app with mobile-app + OTP-based auth. End-to-end test done but bank not ready to go live with OTP. Plan: obtain a test environment and deploy the latest JAR; conduct production testing in parallel. [[Yasir Syed Ali]] flagged risk that delays mask other broken functions until late.
- **FCMB** — permissions issue not corrected; escalated to DH ([[Abraham Isinguzoro]]). FCMB plans to drop [[BVN]] from API responses entirely; team confirmed BVN is not used in current implementation — "good to have" per [[Abiodun Famoye]] but not enforceable.
- **C A B** ([[CAB]]) — [[Glory Alioha]] following up with bank today on committed feedback.
- **Abar Pay Direct Debit** — Fun updating the logo.
- **GT Bank** — blocked yesterday due to service facilitator down; update expected today.
- **Money Point Direct Debit** — initial network issue resolved, but new problems: undelivered OTPs and inability to proceed with transaction processing after OTP validation. War-room session scheduled today. [[Taiwo Baptista]] to shift and organize the war room.

## Decisions (ALIGNED)

- **Keystone Bank testing strategy** — deploy latest JAR to test environment to perform testing while awaiting bank's mobile-app completion.
- **BVN requirement removed from integration** — proceed without BVN data; exclusion confirmed not to impact functionality.

## Next Steps (action owners)

- The group — fix Zenith outstanding security issues; complete role-creation process before 12:00 today.
- [[Ifeoluwa Oguntona]] — submit settlement form for foreign settlement agent at Ecobank.
- [[Abdulgafar Obeitor]] — log in to confirm Ecobank LDAP user-disable implementation is live.
- [[Ugochukwu Ebirika]] — reconfirm presence of disabled-user functionality within Ecobank environment.
- [[Oluwakemi Oni]] — follow up Steel Bank on project approval status and necessary sign-offs.
- [[Oluwakemi Oni]] — call Daniel today re: SLA progress; determine pilot-production timeline for Coral Pay × Access Bank.
- [[Oluwakemi Oni]] — reach Chama today on Interbank Transfer SLA sign-off by Access Bank.
- [[Abdulgafar Obeitor]] — share Karry MFB API/server requirements with Oluwakemi.
- [[Oluwakemi Oni]] — follow up Union Bank on failing API status (10-digit account number wait).
- [[Oluwakemi Oni]] — visit Polaris Bank today/tomorrow on outstanding issues and API instability.
- The group — check stability of Polaris transfer and inquiry APIs.
- The group — schedule dedicated Polaris session today.
- [[Glory Alioha]] — follow up with the bank today for CAB approval feedback.
- [[Taiwo Baptista]] — shift and organize Money Point Direct Debit war room today.
- [[Abdulgafar Obeitor]] — send DM item previously dropped to Taiwo Baptista.
- [[Ugochukwu Ebirika]] — review documentation on Zenith workflow configurations.

## Entities Mentioned

People: [[Khadijat Musa]], [[Ifeoluwa Oguntona]], [[Ugochukwu Ebirika]], [[Isaac Arinze]], [[Oluwakemi Oni]], [[Abdulgafar Obeitor]], [[Abiodun Famoye]], [[Yasir Syed Ali]], [[Glory Alioha]], [[Taiwo Baptista]], [[Abraham Isinguzoro]]

Banks / external entities: [[Zenith Bank]], [[Ecobank]], [[UBA]], [[WHMA Bank]], [[Steel Bank]], [[Coral Pay]], [[Access Bank]], [[Karry MFB]], [[Union Bank]], [[Polaris Bank]], [[Keystone Bank]], [[FCMB]], [[CAB]], [[Abar Pay]], [[GT Bank]], [[Money Point]]

Internal: [[Direct to Bank program]]

System: [[Gemini]]

## Concepts

- [[Direct to Bank program]]
- [[SLA sign-off blocker]]
- [[Penetration test remediation]]
- [[LDAP authentication]]
- [[BVN]]
- [[Direct Debit integration]]
- [[War room]]
- [[JAR deployment standardization]]
