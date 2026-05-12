---
title: Direct to Bank Daily standup - 2026_04_15 11_02 WAT
type:
  - "source"
cssclasses:
  - "source"
source_path: _Direct to Bank _ Daily stand up – 2026_04_15 11_02 WAT – Notes by Gemini.docx
retention_label: postgres
retention_rationale: Second D2B standup of Apr 15 — 5 ALIGNED status decisions, bank-count reconciliation (14 active, 12 POS ATS), specific percentage completion figures (Stanbic 47%, Echo Bank 19% on interbank transfer), project status taxonomy. Future retrieval likely for bank-pipeline tracking.
meeting_date: 2026-04-15
created: "2026-05-12T11:03:05Z"
updated: "2026-05-12T11:03:05Z"
summary: "D2B follow-up standup 2026-04-15 11:02 WAT — status doc review; reconciled bank count to 14 active / 12 POS ATS; Zenith transfer API deprioritized; Keystone DD status confirmed 'active integration'; Echo Bank replaces MFB on slide; Remita marked inactive; Stanbic 47% / Echo Bank 19% on interbank transfer."
---

## Summary

Second D2B standup on 2026-04-15 11:02 WAT — status document review session. [[Emmanuella Edeh]] and [[Abdulgafar Obeitor]] reconciled bank counts: 14 banks active across product lines (17 engaged minus 3 with no traction); 12 banks on POS ATS list. AI-generated slide content found confusing; multiple slide tables removed. Multiple project statuses formalized: Zenith transfer API deprioritized, Keystone DD = active integration, Remita inactive, Global Accelerate skipped.

## ALIGNED Decisions

1. **Unnecessary slide table removed** — bottom table on slide removed for settlement-agent info space
2. **Zenith transfer API deprioritized** — will not pursued as current focus
3. **Keystone direct debit status confirmed** — active integration (project still open pending mobile app integration)
4. **Slide content updated with Echo Bank** — MFB replaced with Echo Bank to represent current engagement
5. **Remita project status set inactive** — not interested

## Key Points

### Bank Counts

- **17 banks engaged total** — listed by Emmanuella
- **14 active** if Providoros, Globus, and First Bank (no traction) removed
- **12 POS ATS** — Access Bank, Keystone, Fidelity, FCMB, Union Bank, Wema, Zenith, Parallex, Stanbic, UBA, Echo Bank, Pampe (12th was added later — Pampe wasn't on initial list per [[Kevin Ng'Eno]])
- **13 in ATS list** including Money Point (per Abdulgafar)

### Web ATS / Direct Debit

- 1 bank active for [[WTS]] (Web ATS)
- DD active conversations: Stanbic, Zenith — but Emmanuella requested removing "active" tag because no deployment yet
- "Active" defined as "something is moving and is not blocked"

### Account Switching

- Echo Bank to replace MFB on account-switching slide
- Echo Bank account switching status = inactive due to Modify integration issues
- Zone integration for account switching = in progress (responsiveness fine)

### Fund Settlement / Interbank Transfer

- Transfer API for Zenith: deprioritized
- UBA + Stanbic: in progress
- **Stanbic 47% achieved** on interbank transfer
- **Echo Bank 19% achieved** on interbank transfer
- UBA in progress (% not specified)

### NSS

- Echo Bank, Stanbic, Parallex NSS: not kicked off, need initiation
- Emmanuella tried calling Abraham re NSS updates — didn't pick up
- [[Kevin Ng'Eno]] to drop reminder message re Echo Bank NSS progress

### Other

- Global Accelerate: skipped (never started integration)
- Remita: on hold ("not interested")
- "Settlement readiness" defined: integration concluded but project subsequently put on hold
- Color coding: green = live, red = blocked (more visible than written status)
- Status doc: AI-generated from PD master sheet — caused confusion; team frustrated

## Next Steps

- [[Kevin Ng'Eno]] — drop message re Echo Bank NSS progress
- [[Emmanuella Edeh]] — follow up with team members via WhatsApp

## Entities Mentioned

People: [[Emmanuella Edeh]], [[Abdulgafar Obeitor]], [[Kevin Ng'Eno]], Abraham

Banks: [[Access Bank]], [[Keystone Bank]], [[Fidelity Bank]], [[FCMB]], [[Union Bank]], [[Wema Bank]], [[Zenith Bank]], [[Parallex]], [[Stanbic]], [[UBA]], [[Echo Bank]], [[Pampe]], [[First Bank]], [[Globus]], [[Providoros]], [[Sterling Bank]], [[Moniepoint|Money Point]]

Inactive: [[Remita]], [[Global Accelerate]]

Other: [[Zone]], [[Modify]] (integration)

## Concepts

- [[Direct to Bank Daily standup]]
- [[Bank pipeline status]]
- [[Project status taxonomy]]
- [[Settlement readiness]]