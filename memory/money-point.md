---
type:
  - "entity"
title: Money Point
created: "2026-04-23T14:45:01Z"
summary: "Bank/financial partner in Moniepoint's Direct Debit onboarding queue. D2B Apr 21 account-validation issue resolved; Apr 22 OTP undelivered + transaction processing failure post-OTP — war-room scheduled for resolution."
updated: "2026-04-25T11:47:32Z"
cssclasses:
  - "entity"
---

## Stub

Referenced in the [[Direct to Bank program]] standups as a partner in the Direct Debit onboarding queue, with the team's settlement account configuration pending.

> **Naming note:** Gemini transcripts render the name as "Money Point" (two words). This may be a distinct bank/partner, or a transcription artifact for [[Moniepoint]] itself (the enclosing group). Insufficient context in the source to disambiguate; treat as a distinct entity until a follow-up source clarifies.

## Activity

### 2026-04-21 08:10 D2B standup

[[Taiwo Baptista]] confirmed the issue regarding inability to validate accounts for Money Point Direct Debits has been **resolved** — accounts configured. However a new **network-related issue** has arisen and is currently being worked on. Aligned decision: account whitelisting will submit both [[Tap]] and Money Point accounts to the bank. Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

### 2026-04-22 08:21 D2B standup

Team spent significant time on Money Point Direct Debit integration yesterday. Initial network issue resolved, but new problems surfaced:
- **Undelivered OTPs**
- **Inability to proceed with transaction processing after OTP validation**

A **war-room session** is scheduled today to address and resolve these major issues. [[Taiwo Baptista]] to shift and organize the war room. [[Abdulgafar Obeitor]] to send DM item previously dropped to Taiwo. Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

### 2026-04-22 / Apr 23 D2B standup

Money Point provided their account for direct debit yesterday, but the team's settlement account is still pending due to a technical issue with Finance — team hoped to resolve today (Apr 23). The team is also working on Money Point on the portal within the production environment. Source: [[note_2026-04-23T13-53-37-857Z]].

## Related

- [[Direct Debit]]
- [[Direct Debit integration]]
- [[War room]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
