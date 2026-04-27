---
type:
  - "entity"
title: Taiwo Baptista
created: 2026-04-11
summary: TeamApt Direct to Bank team member — Money Point Direct Debit owner; chairs the Project Delivery & Optimization Realignment standups; running FCMB account transfer, Apar Pay DD, Money Point DD scheme work, Payzone account/card switch, GT Bank SLA and Smart Kash/NIBSS authorization tracks.
updated: "2026-04-27T17:43:51Z"
cssclasses:
  - "entity"
---

TeamApt [[Direct to Bank program]] team member — owner of the [[Money Point]] Direct Debit track. Chairs the Project Delivery & Optimization Realignment standup series.

## 2026-04-21 — D2B Standup (08:10 WAT)

- Reported issues with the account provided for the insufficient-funds test — a global limit that transactions can span beyond. Bank initially raised the global limit but reverted; bank expected to revert with an update today. Production API held back due to internal deployment issues on bank's end.
- Confirmed Money Point Direct Debits account-validation issue resolved (accounts configured); a new network-related issue has arisen and is currently being worked on.
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## 2026-04-22 — D2B Standup (08:21 WAT)

- **Money Point Direct Debit war room** — to shift and organize the Money Point Direct Debit war room meeting to take place today. Initial network issue resolved; new problems: undelivered OTPs and inability to proceed with transaction processing after OTP validation.
- **Abar Pay** — reported Fun is updating the logo for Abar Pay direct debit.
- **GT Bank** — reported blocked yesterday due to service facilitator being down; update expected later today.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## 2026-04-27 — Project Delivery & Optimization Realignment

Chaired the standup. Personal updates given on:
- **FCMB account transfer (switch)** — APIs (name inquiry + transfer) delivered to bank; awaiting bank's inbound/outbound APIs. Bank gave two profiling users; team can only profile one as institution admin and asked bank to confirm which. SLA reviewed by [[Nora]] and sent to bank's legal team today.
- **Fidelity Bank NSS** — no movement; update expected tomorrow from [[Kevin]] / engineering.
- **Fidelity Bank account transfer** — SLA approved by legal and uploaded; pending signatures from [[Dennis]] and [[Felix]] (Felix flagged as the harder signature, must be routed through legal).
- **FCMB Direct Debit** — paused per [[Ella]] due to resource constraints; account transfer first.
- **Fidelity Bank dev environment** — PM committed UAT by 30 April max; e-banking divisional head pushed for this week.
- **Fidelity Bank Direct Debit training** — tentatively 4 May, awaiting bank confirmation.
- **FCMBNSS** — bank requires account-switch SLA signed first (sent today) before NSS consent letter discussion.
- **[[Apar Pay|Access Pay]] direct debit** — endpoint and base URL modifications underway by [[Osborne]] and [[Victor]] (status by close of business). Base URL changed because production limits caused insufficient-account issues. Production APIs still pending after 3 days.
- **[[Money Point]] direct debit** — needs scheme configuration on their environment (unique scheme ID, parallel to card/transfer/v-stamp-duty). Cross-functional engineering + finance work; PM and head of engineering on it; feedback expected tomorrow.
- **OTP service** — email OTP fixed Friday after credential issue; SMS OTP still pending; Money Point engineering team owns fix, feedback tomorrow.
- **GT Bank interbank API** — legal rejected the [[Access Bank]]-style template Nora sent because they couldn't track changes. GT Bank provided a slightly modified SLA with fewer clauses to change; Nora reviewing this week. **Only active escalation: GT Bank not providing production APIs.**
- **Payzone account switch** — Payzone completed integration test and UAT Friday; passed all UAT items; on production setup today. Existing VPN connection has issues per network team; secondary VPN connection required. Form to be filled by Zoom; meeting tomorrow morning after form completion. Owner: Taiwo to share VPN form post-call and schedule tomorrow's call.
- **Payzone card switch** — connectivity in progress; IPs/ports shared this afternoon. Delay attributed to NetCloud's "Monday" engineer being on his first integration and pulled into [[Postbridge Bank]] cash-out implementation.
- **[[Smart Kash]] virtual account modification** — still blocked on URL whitelisting.
- **NIBSS authorization modification** — mandate mapping done; only remaining item is settlement flow between [[NIBSS]] and Money Point.
- **[[Standard Chartered]]** — nothing happened. **[[First Bank]]** — another reminder sent, no response.
- Confirmed Paystack DD is the same project [[Aqua]] was previously reporting (in response to Kemi).
- Source: [[Project delivery and optimization realignment - 2026-04-27 - Transcript]].

## Sources
- [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]