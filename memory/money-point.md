---
type:
  - "entity"
title: Money Point
created: "2026-04-23T14:45:01Z"
summary: "Bank/financial partner referenced in Moniepoint's Direct Debit onboarding queue AND in ATPP/Visa global testing context (form completion Apr 27). D2B Apr 21 account-validation issue resolved; Apr 22 OTP undelivered + transaction processing failure post-OTP — war-room scheduled for resolution."
updated: "2026-04-29T11:44:37Z"
cssclasses:
  - "entity"
---

## Stub

Referenced in the [[Direct to Bank program]] standups as a partner in the Direct Debit onboarding queue, with the team's settlement account configuration pending. Also referenced in the [[ATPP]] standup track in [[Visa]] global testing context.

> **Naming note:** Gemini transcripts render the name as "Money Point" (two words). This may be a distinct bank/partner, or a transcription artifact for [[Moniepoint]] itself (the enclosing group). Insufficient context in the source to disambiguate; treat as a distinct entity until a follow-up source clarifies. Note that the ATPP standup context (Visa testing form completion + Singapore card dispatch) is more consistent with [[Moniepoint]] (the parent group running the Visa programme) than a third-party Direct Debit partner — which strengthens the transcription-artifact hypothesis for at least the ATPP-context references, though the D2B-context references may still be a distinct partner.

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

### 2026-04-27 15:51 ATPP standup (Visa testing context)

Form completion for [[Visa]] global testing **underway with Money Point**; cards dispatched to Singapore for testing. This is the first observed reference to Money Point in the ATPP/Visa-testing track — distinct from the D2B Direct Debit context above. Source: [[ATPP Daily Standup 20260427 Gemini Notes]].

## Related

- [[Direct Debit]]
- [[Direct Debit integration]]
- [[War room]]
- [[Visa]]
- [[ATPP]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[ATPP Daily Standup 20260427 Gemini Notes]]
