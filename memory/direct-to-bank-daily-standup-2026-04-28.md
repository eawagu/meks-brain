---
title: Direct to Bank Daily Standup — 2026-04-28
type:
  - "source"
cssclasses:
  - "source"
source_path: " Direct to Bank : Daily stand up – 2026/04/28 08:27 WAT – Notes by Gemini"
drive_file_id: 1a48cCfuwfrVgkF7RVHfq1EO6ddKXV1z29Hrv3vxfmko
drive_view_url: "https://docs.google.com/document/d/1a48cCfuwfrVgkF7RVHfq1EO6ddKXV1z29Hrv3vxfmko/edit"
drive_modified: "2026-04-28T08:14:02Z"
drive_owner: khadijat.musa@teamapt.com
retention_label: fs
retention_rationale: Drive Notes-by-Gemini source page captures decision/next-steps + operational details; raw transcript not inline. Filesystem-only retention sufficient for traceability.
created: "2026-04-28T14:20:34Z"
updated: "2026-04-28T14:20:34Z"
summary: Direct-to-Bank Daily Standup Apr 28 2026 — service status updates confirmed, integration testing and ticket-ownership policy. Polaris fund settlement QA today (Wally) + Polaris bank 8 PM–6 AM maintenance window "until tomorrow" (Feyisayo). UBA SQL 2022 server-upgrade plan (this week internal upgrades, deployment next week). Keystone DD E2E test today; Union Bank DD JAR retry with 2024-era integration history dependency. FCMBB mixed accounts sprint starts today (2 weeks).
---

**Source:** Drive Notes-by-Gemini — " Direct to Bank : Daily stand up – 2026/04/28 08:27 WAT" (Drive id `1a48cCfuwfrVgkF7RVHfq1EO6ddKXV1z29Hrv3vxfmko`, [[Khadijat Musa]] owner, modifiedTime 2026-04-28T08:14:02Z).

**Handling:** Normal-tick chain per source-config-google-drive — downloaded inline, no inline transcript heading present (transcript is in separate Drive doc tab not retrieved by `read_file_content`). All content treated as non-transcript layer; this source page is the full representation. No `capture_note` dispatch (no transcript layer to drop).

## Summary (Gemini-extracted)

Service status updates were confirmed and integration testing issues were addressed alongside task ownership accountability improvements.

- **Service Status and Integrations:** System services successfully initiated; pending vulnerabilities identified. Bar Pay direct debits and transaction manager services are now active.
- **Bank Testing and Deployments:** Teams prioritizing [[Polaris Bank]] settlement testing and [[Keystone Bank]] direct debit validations. Internal upgrades must be completed before proceeding with server migrations.
- **Task Ownership and Accountability:** Management mandated daily status updates for all assigned tickets. All team members must proactively manage overdue tasks and project blockers.

## Decisions (ALIGNED)

- **Ticket update ownership policy established** — Ticket status updates must be performed by the assigned owner of the ticket rather than the project delivery lead, to ensure accountability.
- **UBA deployment schedule and upgrade plan** — [[UBA Bank]] server deployment scheduled to commence next week, with internal service upgrades prioritized for the current week.

## Next steps (action items)

- [[Ifeoluwa Oguntona]] — Schedule Review: Follow up with bank security team; get time to review security report.
- [[Taiwo Baptista]] — Test Fix: Coordinate Bar Pay direct debits testing.
- [[Taiwo Baptista]] — Review Warnings: Check warnings associated with Bar Pay projects.
- [[Taiwo Baptista]] — Update Date: Update estimated date for blocked Bar Pay production items to this week.
- [[Taiwo Baptista]] — Check SMB: Check the SMB status related to Abraham.
- [Ganu Abdanu, Abdanu Isaac, group] — Update Tasks: Update assigned tasks, specifically Zen DD tickets.
- [[Oluwakemi Oni]] — Obtain Account Numbers: Coordinate with bank; receive required account numbers for Keystone DD testing.
- [[Oluwakemi Oni]] — Update Ticket: Update Keystone DD ticket status.
- [[Babajide Ojoboorun]] — Update Mandate Test: Update Union Bank mandate test status.
- [[Oluwakemi Oni]] — Send Mandate Question: Drop mandate question into chat for Babajide.
- [Wally] — Perform QA Test: Conduct QA testing for Polaris Bank fund settlement on staging today (J unavailable, Wally standing in).
- [[Abiodun Famoye]] — Find Deployment Owner: Engage team members; identify resource to deploy latest remediation JAR for Keystone DD.
- [[Oluwakemi Oni]] — Confirm Portal Users: Ask bank to confirm list of users to include on Keystone DD portal.
- [[Khadijat Musa]] — Append Version Name: Append confirmed version name to release note doc.
- [[Fortunate Nwachukwu]] — Confirm SQL Compatibility: Internally confirm if current setup functions with SQL 2022.
- [[Abdulgafar Obeitor]] — Communicate Upgrade Timeline: Communicate to UBA; request this week for internal service upgrades before next week deployment commencement.

## Operational details (per-track signals)

**Service Status & Transaction Manager:** Emeka Joseph and Fortunate Nwachukwu confirmed services started successfully after a required value was added; transaction manager service confirmed started. Fortunate Nwachukwu working on a vulnerability shared internally by security team — appears similar to [[Zenith Bank]] report. (Connects to [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] vulnerability remediation theme.)

**Bank Security Vulnerability Scan:** Ifeoluwa Oguntona reported a session with bank security team about a vulnerability fix; agreed to perform separate scan to compare reports. Scan completed and report shared with bank; Ifeoluwa following up to schedule review meeting. (Connects to [[Access Bank — Multi-Track Failures]] vulnerability remediation track + [[Zenith Bank]] vuln work.)

**Premium Trust:** Glory Alioha — no major updates from Premium Trust except that current maintenance operation is causing post transactions to return errors. Developer trying to fix; Glory continuing follow-up for close-out.

**Bar Pay Direct Debits & API Status:** Taiwo Baptista — base URL fix for Bar Pay DD and debits transfer point issue resolved. Testing expected to begin soon (Abigu can now test). Did not receive promised APIs due to deployment calls over weekend that may not have been successful; looking for update today.

**SLA & Money Point/FCMBB Updates:** Bank API Bar Pay SLA — service owner did not agree with shared SLA, sent new one; pricing for Money Point unchanged. Anticipating feedback today from Money Point on direct debit service mapping (involves their finance + engineering teams) and update on OTP fix for SMS. **FCMBB direct debits currently constrained — bank prioritizing Account Switch project before resuming direct debits.** (Active prioritization; aligns with prior Project Delivery Realignment Apr 27 alignment "FCMB project prioritization strategy" — Account Transfer before DD.)

**Bar Pay Debit Warnings & Ticket Updates:** Khadijat Musa noted warnings on Taiwo Baptista's Bar Pay debit tickets, some expired in April. Taiwo: expired items are blocked, will be validated on production; will update estimated completion date to this week.

**ATS Test Environment Ticket Ownership:** Khadijat Musa addressed warning on Ifeoluwa Oguntona's ATS test environment ticket reserved for pilot testing. Ifeoluwa clarified: ticket cannot be completed until platform owner ensures pilot environment is stable and pilot testing begins. Discussion on ticket ownership and the need for assignee to update tasks even when blocked.

**General Task Ownership & Status Updates:** Abdulgafar Obeitor emphasized that the assigned person should take ownership and update daily, even if blocked. Khadijat noted several Zen DD tickets overdue and unupdated — specifically Ganu Abdanu, Abdanu Isaac, others — urging immediate updates.

**[[Keystone Bank]] Direct Debits Test Plan:** Movement on Keystone DD — bank wants to test using initial mobile app authentication. Oluwakemi coordinating with internal team to acquire account numbers from bank today for E2E test. Need to confirm if OTP authentication will be part of test.

**[[Union Bank]] Direct Debit Deployment Issues:** Bank requested to close out testing today. Babajide deployed a new JAR file yesterday that did not work; received another JAR this morning. Babajide suggested an engineer review the history of the bank integration (last worked on in 2024) to correct existing errors.

**[[Polaris Bank]] Fund Settlement Testing:** Engineering tested the transfer APIs; awaiting QA team to test. Since J unavailable, Wally will stand in; prioritizing testing to be completed today on staging. (Connects to [[Sterling + Polaris — Routes Degraded]] — likely the engineering motion that enabled morning re-enable test.)

**Polaris Bank Post-Implementation Issues & Maintenance:** [[Feyisayo Oyeniran]] reported no success resolving post-implementation issues with Polaris Bank; informed via email that **services will only function properly between 8:00 PM and 6:00 AM daily until tomorrow** (Apr 29). Maintenance activity likely affecting mobile application and preventing transaction processing/settlement. (Connects to [[Sterling + Polaris — Routes Degraded]] — bank-side mechanism context for cycle-recurrence dynamic; explains daytime cycle 4 of Apr 28.)

**[[Keystone Bank]] DD Transaction Report Deployment:** Oluwakemi raised need for confirmation on deployment status of Keystone DD transaction report on portal — necessary for pilot test. Abiodun Famoye indicated need to confirm access to test environment to deploy latest JAR file (which includes fixes for vulnerabilities in [[Zenith Bank]] and [[Access Bank]]). (Implies Keystone DD JAR carries cross-bank vulnerability fixes — single-deploy multi-impact.)

**[[UBA Bank]] Server Upgrade Roadblocks:** Oluwatofunmi Obafemi raised UBA question on potential roadblocks upgrading server to SQL 2022 due to vulnerability flags. Abdulgafar confirmed UBA upgrade requires upgrading internal services to be SQL 2022 compatible.

**Internal Service Upgrades & Deployment Schedule:** Abdulgafar proposed team needs current week to complete necessary internal upgrades, deployment commencing next week. Need to confirm internally if current system functions with SQL 2022 before proceeding with UBA deployment.

**FCMBB Mixed Accounts Sprint & Pending Refunds:** Sprint for FCMBB mixed accounts scheduled to start today, lasting two weeks. Oluwatofunmi confirmed pending refunds for FCMBB cleared (those related to customer accounts being frozen).

## Cross-references

- [[Sterling + Polaris — Routes Degraded]] — Polaris fund settlement QA + bank-side maintenance window context
- [[Access Bank — Multi-Track Failures]] — Keystone DD JAR carries Access vuln fixes
- [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] — vulnerability remediation theme + Zenith parallel
- [[UBA Bank]] — SQL 2022 server upgrade plan introduced
- [[Keystone Bank]] — DD E2E test today + portal deployment dependency
- [[Union Bank]] — DD JAR retry + 2024-era integration history dependency
- [[Polaris Bank]] — bank-side 8 PM–6 AM maintenance window "until tomorrow" Apr 29
