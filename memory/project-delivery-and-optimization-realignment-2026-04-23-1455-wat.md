---
type:
  - "source"
title: "Project Delivery and Optimization Realignment - 2026-04-23 14:55 WAT"
created: "2026-04-25T12:18:29Z"
summary: "2026-04-23 14:55 WAT Project delivery and optimization realignment meeting (owner Emmanuella Edeh). Aligned: Union Bank NSS+account-transfer streams consolidated; Sterling Bank SLA Clause 5.5 (liability for duplicate payments) rejected with insistence on TSQ integration; escalation reporting standardized as single consolidated Slack message. Comprehensive bank-status updates across Union, Sterling, Fidelity, Premium Trust, Access, WEMA, Keystone, Moneyify TSA, Clean/FCNB, Global Pay, FCNB DD, CORP, First Bank, Post DD."
updated: "2026-04-27T17:52:58Z"
cssclasses:
  - "source"
source_path: Project delivery and optimization realignment - 2026_04_23 14_55 WAT - Notes by Gemini.md
retention_label: postgres
retention_rationale: Comprehensive D2B project realignment with 12+ bank-specific status updates, three aligned decisions (Union Bank consolidation, Sterling Bank SLA Clause 5.5 rejection + TSQ integration, escalation reporting format), and a 30+ action items distributed across 8+ owners. Future retrieval likely — referenced by ongoing per-bank tracking, SLA negotiations, escalation routing, and quarterly delivery reviews.
---

## Summary

[[Direct to Bank program]] project realignment meeting at 2026-04-23 14:55 WAT. Owner: [[Emmanuella Edeh]]. Attendees: [[Oluwakemi Oni]], [[Ifeoluwa Oguntona]], [[Emmanuella Edeh]], [[Abraham Isinguzoro]], [[Opeyemi Animashaun]], [[Taiwo Baptista]], [[Glory Alioha]], [[Adeyinka Babalola]], [[Babatunde Okufi|Tunde Okufi]].

Three aligned strategic decisions: Union Bank NSS+account-transfer stream consolidation; Sterling Bank SLA Clause 5.5 rejection + TSQ integration insistence; escalation reporting format standardized as single consolidated Slack message.

> **Next session in this series:** [[Project delivery and optimization realignment - 2026-04-27 - Transcript]] / [[Project delivery and optimization realignment - 2026-04-27 - Notes]]. See also the recurring concept page: [[Project Delivery and Optimization Realignment Meeting]].

## Decisions (ALIGNED)

- **Union Bank project streams consolidated** — NSS and account-transfer project streams merged into a single workflow for streamlined execution.
- **Sterling Bank SLA pushback strategy** — reject Sterling Bank SLA **Clause 5.5** (liability for duplicate payments post-reversal); insist on **TSQ integration** to enable real-time transaction confirmation.
- **Escalation reporting format standardized** — escalations submitted as a **single consolidated message** in the Slack group; communication remains cohesive (not fragmented by intervening messages).

## Per-Bank Status

### Zenith Bank (high priority)

- Pen-test security fixes in testing; **deployment target EOB or tomorrow**.
- User training **postponed** due to customized role-configuration malfunction.
- **Vulnerability report strategy**: wait for Monday to deliver Checkmarx application (same tool the bank uses) to identify/fix internally.
- Legal team uploading fund settlement agent document for counter-signing; pending UBA settlement agent SLA reviews from [[Kevin]].
- **Pilot phase target**: Monday or Tuesday start.

### Union Bank

- NSS + account-transfer streams **consolidating** (per aligned decision).
- **Direct debit stalled**: bank provided 9-digit account; API requires 10-digit — engagement needed.
- Back-office config ongoing; awaiting admin user details from bank.
- Account-transfer SLA received feedback; integration document shared.
- Deployment request: latest production direct-debit JARs to Union Bank servers.

### Sterling Bank

- **Critical blocker**: SLA Clause 5.5 (liability for duplicate payments post-reversal) — team will reject; push for **TSQ integration**.
- Dedicated GL accounts confirmed; Finance team drafting board resolution for team income account.
- Awaiting consent letter issuance after SLA sign-off.

### Fidelity Bank

- **Primary blocker**: pricing concerns ("purely unreasonable" per Fidelity team).
- **Account transfer**: API docs requested by Fidelity; legal review uploaded for approval/execution.
- **NSS**: pilot preparation underway (80% technical integration); production user-creation issues being resolved.
- Pricing discussion scheduled with [[Dennis Ajalie|Dennis]] / [[Ephy]]; [[Tracy Ojaigho|Tracy]] to share revised structure tomorrow post-Praise meeting.

### Premium Trust Bank

- CBN approval not a blocker.
- Technical fixes needed: insufficient-funds error handling.
- Back-office migration and production server provisioning in progress; follow-up for next-week start.
- Action: cultivate additional relationships at multiple levels ([[Babatunde Okufi|Tunde Okufi]], [[Glory Alioha]], [[Emmanuella Edeh]]).

### Access Bank

- Interbank transfer SLA **signed**; awaiting API credentials confirmation.
- Account-number white-listing request pending; API sharing status not confirmed.

### WEMA Bank

- Direct-debit architectural diagram shared with [[Michael]]; approval update expected EOW.

### Keystone Bank

- Direct-debit end-to-end test requested using **previous mobile app** (current implementation experiencing issues).
- Session scheduling needed for initial app testing.

### Moneyify TSA Collection

- Letter of intent drafted and shared.
- **Stalled**: missing contact person at Uni Lorin; NIBSS requires award letter and acknowledgment copies.

### Clean Project (FCNB Settlement)

- [[Clean]] interested in [[Juliana switch]] onboarding using [[FCNB]] as settlement bank.
- FCNB still in **initiation phase**; requires consent letter, GL accounts, account-transfer blocker resolution.

### Global Pay

- Internal bank issues pending resolution before project start.
- Scheduled visit canceled.
- **Consent letter progress hindered by lack of senior management leverage**.

### FCNB Direct Debit

- Server access issues despite VPN connectivity established; being pursued internally.

### CORP Direct Debit

- **No response via Slack or WhatsApp** (escalation point).

### First Bank Account Transfer

- **Handover to [[Taiwo Baptista|Taiwo]]**; minimal progress (pitch + meeting scheduling only).
- Bank prerequisites: internal approval and team account opening.

### Fund Settlement API Issues

- Name-inquiry and transfer APIs fluctuating.
- Technical session revealed **host mapping mismatch** with bank.
- Internal feedback group to provide update on Fund Settlement transfer API. Action: [[Daniel]] map bank host for name-inquiry API fix.

### Post Direct Debit

- Bank requested SLA; [[Nora Chukwurah-Adeyinka|Nora]] engaged but currently **on leave**.

### GT Bank Direct Debit

- Action ([[Kevin]]'s team): perform production test for GT Bank Direct Debit to destination banks.

## Action Items by Owner

### [[Ifeoluwa Oguntona]]
- Confirm account-name change status with bank tomorrow.
- Schedule Pride/Stig project kickoff meeting with bank.
- Hand over First Bank account-transfer project to Taiwo with outstanding tasks.

### [[Oluwakemi Oni]]
- Verify API credentials receipt for Access Bank SLA.
- Deploy latest direct-debit JARs to Union Bank servers.
- Request 10-digit bank account number from Union Bank for direct debit.
- Follow up on Fund Settlement transfer API feedback.
- Schedule end-to-end test for Keystone Bank Direct Debit.

### [[Abraham Isinguzoro]]
- Send API documentation and technical requirements to Fidelity Bank FTMBB.
- Follow up on Fidelity Bank Account Transfer SLA approval/execution status.
- Send leave notification email to clients and internal stakeholders (starting next Monday).

### [[Kevin]]
- Provide clarity on UBA settlement-agent SLA issue.
- Send SLA comments to Sterling Bank with rejection of Clause 5.5 + TSQ integration insistence.

### [[Taiwo Baptista]]
- Table modified SLA tomorrow and ensure irrelevant clauses removed.

### [[Glory Alioha]]
- Follow up with Legal on board-resolution letter drafting status for Sterling Bank income account.
- Schedule meeting with Clean after response received.
- Follow up on technical fixes Premium Trust Bank is working on.
- **Compile all team escalations into single consolidated message for Slack** (per aligned decision).

### [[Emmanuella Edeh]]
- Call [[Damar]] re: missing contact person at Uni Lorin for Moneyify TSA Collection.
- Reach out 1:1 to individuals for missing appraisal review project information.
- Schedule time to connect with Tunde.

### [[Adeyinka Babalola]]
- Follow up with [[Tracy Ojaigho|Tracy]] regarding Dennis/Ephy pricing discussion.
- Add international context to POS documentation.
- Send reminder to Access Bank stakeholders about Mastercard session (tomorrow).
- Share acquirer-processing pricing with Fidelity tomorrow (after meeting with Praise).

### [[Daniel]]
- Map bank host for Fund Settlement name-inquiry API fix.

### [[Kevin]]'s team
- Perform production test for GT Bank Direct Debit to destination banks.

### [[Babatunde Okufi|Tunde Okufi]], [[Glory Alioha]], [[Emmanuella Edeh]]
- Cultivate additional relationships within Premium Trust Bank at multiple levels.

### All team members
- Submit personal escalations list to [[Glory Alioha]] for compilation.

## Closing

Next meeting scheduled for Monday. Team to follow up on action items and maintain escalation tracking via consolidated Slack messages.

## Entities Mentioned

People: [[Oluwakemi Oni]], [[Ifeoluwa Oguntona]], [[Emmanuella Edeh]], [[Abraham Isinguzoro]], [[Opeyemi Animashaun]], [[Taiwo Baptista]], [[Glory Alioha]], [[Adeyinka Babalola]], [[Babatunde Okufi]], [[Kevin]], [[Tracy Ojaigho]], [[Daniel]], [[Michael]], [[Dennis Ajalie]], [[Ephy]], [[Damar]], [[Nora Chukwurah-Adeyinka]]

Banks / external: [[Zenith Bank]], [[Union Bank]], [[Sterling Bank]], [[Fidelity Bank]], [[Premium Trust Bank]], [[Access Bank]], [[WEMA Bank]], [[Keystone Bank]], [[Moneyify TSA Collection]], [[Clean]], [[FCNB]], [[Global Pay]], [[CORP]], [[First Bank]], [[Post Direct Debit]], [[GT Bank]]

Internal: [[Direct to Bank program]], [[Juliana switch]], [[Checkmarx]]

System: [[Gemini]]

## Concepts

- [[Sterling Bank SLA Clause 5.5]]
- [[TSQ integration]]
- [[Union Bank stream consolidation]]
- [[Escalation reporting format]]
- [[Fidelity Bank pricing blocker]]
- [[Direct to Bank program]]
- [[Direct Debit integration]]
- [[Project Delivery and Optimization Realignment Meeting]]
