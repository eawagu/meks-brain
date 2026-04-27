---
title: Project delivery and optimization realignment - 2026-04-27 - Transcript
type:
  - "source"
cssclasses:
  - "source"
source_path: Project delivery and optimization realignment - 2026_04_27 14_59 WAT - Notes by Gemini - TRANSCRIPT.md
retention_label: postgres
retention_rationale: Multi-stakeholder project realignment transcript with named bank-by-bank status, decisions, and verbatim commitments; future semantic retrieval likely when drilling into specific bank/integration history.
meeting_date: 2026-04-27
drive_file_id: 1Acl0acd1TWzfb_qATTi7jOvFNXi7NQS_yhVVNhZvg30
drive_url: "https://docs.google.com/document/d/1Acl0acd1TWzfb_qATTi7jOvFNXi7NQS_yhVVNhZvg30/edit"
source_owner: eedeh@teamapt.com
created: "2026-04-27T17:34:31Z"
updated: "2026-04-27T17:34:31Z"
summary: Verbatim transcript of the 2026-04-27 Project Delivery and Optimization Realignment meeting covering bank integration status across Zenith, FCMB, Fidelity, Union, Sterling, GT Bank, Ecobank, Paystack, Payzone, Keystone, and Mastercard.
---

## Summary

Verbatim Gemini-generated transcript of the Project Delivery and Optimization Realignment standup held 2026-04-27 14:59 WAT. Attendees walked through bank-by-bank integration status, blockers, escalations, and commitments. Heavy focus on switch APIs, NSS (NIBSS), direct debit, account transfer, and SLA negotiations across Nigerian banks.

## Key Points

- [[Ifeoluwa Oguntona]]: [[Zenith Bank]] vulnerabilities flagged by the bank's appsec scan have been fixed; team agreed in today's bank meeting to run their own internal scan and bring results back so claims of false positives can be evidence-backed; security team committed to feedback before end-of-day.
- Zenith user training day 2 (where users would exercise the system and ask role-based questions) did not happen last week; team requested a new date, awaiting bank confirmation.
- Zenith NSS: switch team configured the required per-bank-user daily reports. Because [[ATS]] endpoint is not ready, [[Kevin]] proposed using [[Moniepoint|Money Point]] transactions for NSS testing with internal-work deadline of May 15.
- [[Ecobank]] Fund Settlement Agent: all tests done, sandbox issues resolved, integration commenced today; engineering committed to two-week timeline → test-environment completion ~May 12.
- Zenith pilot commitments: resolve everything by 30 April to start DD pilot. NSS expected 29 April. Stanbic Phone Settlement Agent 30 April. Ecobank Fund Settlement Agent 15 May.
- [[Taiwo Baptista]]: [[FCMB]] account transfer via switch — APIs delivered to bank (name inquiry + transfer); waiting on bank's inbound/outbound APIs. Bank gave two profiling users; team can only profile one as institution admin and asked bank to confirm which.
- FCMB account transfer SLA reviewed by [[Nora]] and sent to bank's legal team today.
- [[Fidelity Bank]] NSS: no movement; update expected tomorrow from [[Kevin]] / engineering. Account transfer SLA approved by legal and uploaded; pending signatures from [[Dennis]] and [[Felix]] — Felix flagged as the harder signature, must be routed through legal per his instruction.
- [[FCMB Direct Debit]] paused: per [[Ella]], resource constraints force focus on FCMB account transfer first; direct debit resumes after.
- Fidelity Bank dev environment issues "lingering" with queueing/flagging; PM says progress made and intends UAT by 30 April max; e-banking divisional head pushed for this week, PM hasn't responded.
- Fidelity Bank Direct Debit training tentatively 4 May, awaiting bank confirmation.
- FCMBNSS: bank's position is they need account-switch SLA signed first (sent today) before NSS consent letter discussion. Project on hold by bank.
- Escalations: [[FCMB Direct Debit]] reframed as resource-prioritization, not escalation. [[Providus Bank]] no approval. [[Coral Pay]] direct debit no response.
- [[Oluwakemi Oni]]: [[Union Bank Direct Debit]] in mandation/test-simulation phase, blocked because account-inquiry API returns "unauthorized" — bank gave 9-digit then 10-digit account but tokens not authenticating. Internal investigation underway.
- Union Bank NSS: bank shared admin user details; team configuring portal.
- [[Polaris Bank|Polar]] Fund Settlement: minimal progress on transfer APIs; name-inquiry API still failing; onboarding form remains the blocker.
- Union Bank account transfer: bank wants only inbound transfer testing right now; team shared all needed info, awaiting feedback. SLA also under bank review.
- [[Paystack]] Direct Debit: bank is integrating; team aligning internally on activity list (replicating [[Glory Alioha]]'s [[Global Pay]] implementation plan template) so internal team commits to a tracker.
- [[Keystone Bank]]: kicked off slightly. Re-running an end-to-end test with bank using initial mobile app authentication (since their new app isn't done). Asked bank for test account numbers, awaiting reply (expected by Tue/Wed). Kemi will get official email confirmation on whether OTP authentication pattern is still in scope alongside mobile-app auth.
- Taiwo confirmed Paystack DD is the same project [[Aqua]] was previously reporting.
- [[Glory Alioha]]: [[Sterling Bank]] account switch — product team reviewing SLA against Nora's comments; working on "plus 5.5"; awaiting Nora's final review before sharing with bank. Waiting on signature for board resolution letter to obtain Sterling income account, which is required to proceed with settlements.
- [[Premium Trust Bank]]: bank still working on fixes; no significant updates.
- Glory waiting on [[Ella]] for outcome of [[Dary]]–[[Dennis]] discussion on bonafide TSA collection.
- Taiwo on [[Access Pay|Apar Pay]] direct debit: endpoint and base URL modifications underway by [[Osborne]] and [[Victor]] (status by close of business). Base URL changed because production limits caused insufficient-account issues during transactions. Production APIs still pending after 3 days.
- [[Moniepoint|Money Point]] direct debit: needs scheme configuration on their environment (unique scheme ID for direct-debit transactions, parallel to card/transfer/v-stamp-duty schemes). Cross-functional engineering + finance work; PM and head of engineering on it; feedback expected tomorrow.
- OTP service: email OTP fixed Friday after credential issue; SMS OTP still pending; Money Point engineering team owns fix, feedback tomorrow.
- [[GT Bank]] interbank API: legal rejected the [[Access Bank]]-style template Nora sent because they couldn't track changes. GT Bank provided a slightly modified SLA with fewer clauses to change; Nora reviewing this week.
- [[Payzone]] account switch: completed integration test and UAT Friday and passed all UAT script items. On production setup today. Existing VPN connection from prior year flagged by network team as having issues; required fix plus a new secondary VPN connection per process. Payzone shared the form Zoom needs to fill; meeting tomorrow morning after form is completed.
- Payzone card switch: connectivity in progress; IPs/ports shared this afternoon. Delay attributed to NetCloud's "Monday" (engineer name) being on his first integration and being pulled into [[Postbridge Bank]] cash-out implementation.
- [[Smart Kash|Smart Cache]] virtual account modification: still blocked on URL whitelisting.
- NIBSS authorization modification: mandate mapping done; only remaining item is settlement flow between [[NIBSS|Nibbs]] and Money Point.
- [[Standard Chartered]]: nothing happened. [[First Bank]]: another reminder sent, no response.
- Only active escalation: GT Bank not providing production APIs.
- [[Adeyinka Babalola]]: Fidelity card processing — pricing tussle escalated to Dennis and bank leadership; nearing resolution. [[Pureshops|PureShops PS]] integration: switch flagged a specific test case, [[Mustafa]] revalidating.
- [[Mastercard]]: licensing-agreement discussion (pending since February) scheduled for 29 April; compliance walkthrough completed last week to prep for [[Mastercard MPGS]] card-not-present kickoff.
- Fidelity Bank acquirer processing service: bank interested; commercials and scheme nomination templates to be shared so bank can officially initiate.

## Entities Mentioned

- [[Taiwo Baptista]]
- [[Ifeoluwa Oguntona]]
- [[Oluwakemi Oni]]
- [[Glory Alioha]]
- [[Adeyinka Babalola]]
- [[Emmanuella Edeh]]
- [[Abraham Isinguzoro]]
- [[Opeyemi Animashaun]]
- [[Tunde Okufi]]
- [[Nora]]
- [[Kevin]]
- [[Dennis]]
- [[Felix]]
- [[Ella]]
- [[Dary]]
- [[Osborne]]
- [[Victor]]
- [[Mustafa]]
- [[TeamApt]]
- [[Moniepoint]]
- [[Zenith Bank]]
- [[FCMB]]
- [[Fidelity Bank]]
- [[Union Bank]]
- [[Sterling Bank]]
- [[Premium Trust Bank]]
- [[GT Bank]]
- [[Ecobank]]
- [[First Bank]]
- [[Standard Chartered]]
- [[Stanbic Bank]]
- [[Keystone Bank]]
- [[Polaris Bank]]
- [[Providus Bank]]
- [[Postbridge Bank]]
- [[Access Bank]]
- [[Access Pay]]
- [[Paystack]]
- [[Payzone]]
- [[Mastercard]]
- [[Coral Pay]]
- [[Global Pay]]
- [[Pureshops]]
- [[NIBSS]]
- [[NetCloud]]
- [[Smart Kash]]

## Concepts

- [[NSS (NIBSS Switch Service)]]
- [[Account Transfer Integration]]
- [[Direct Debit Integration]]
- [[Fund Settlement Agent]]
- [[Service Level Agreement (SLA) Negotiation]]
- [[Vulnerability Scanning and Remediation]]
- [[VPN Connectivity Setup]]
- [[OTP Authentication]]
- [[User Acceptance Testing (UAT)]]
- [[Card Switch Integration]]
- [[Acquirer Processing Service]]
- [[Project Delivery and Optimization Realignment Meeting]]
- [[Bank Integration Pipeline]]
