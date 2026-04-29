---
due: 2026-05-15
type:
  - "commitment"
owner: Mek
title: Moniepoint Q2 2026 Action Items
status: open
created: "2026-04-29T16:28:11Z"
summary: "Four open action items for Moniepoint engineering: Cosmos access, Vault query, CI/CD tool replacement (Theo Makola), Card Issuance Slack channel."
updated: "2026-04-29T17:20:25Z"
cssclasses:
  - "commitment"
---

## Status: Open

## Items

### 1. Cosmos Access Coordination
**Owner:** Mek  
**Target:** [[Michael Afolabi]]  
**Action:** Speak to Michael Afolabi about obtaining Cosmos access.

**Context:** Cosmos is a blocker owner on Union Bank direct debit service (per [[Abiodun Famoye]] on 2026-04-23). Access coordination flows through Michael as part of [[Project Phoenix]]'s AI-native directive.

**Progress 2026-04-29 evening:**
- 17:43 WAT — Mek DM'd Michael Afolabi requesting cosmos profiling, referencing Felix's pointer.
- 17:50–17:51 WAT — Michael clarified scope (cosmos.console.teamapt.com vs. moniepoint cosmos); Mek confirmed need for moniepoint cosmos as immediate need + teamapt cosmos access as secondary need.
- 17:55 WAT — Michael requested formal service desk request "for audit reference."
- 18:05 WAT — Mek raised TDSD service desk ticket [[ISSD-2530]] (auto-acknowledged 18:05 WAT, auto-assigned to Michael Afolabi 18:05 WAT). Per Mek's DM at 18:11 WAT, request covers both moniepoint cosmos (immediate) and aptpay cosmos (secondary) — confirm coverage in ISSD-2530 description or raise sibling ticket if not.

---

### 2. Vault Usage Check – Card Issuance
**Owner:** Mek  
**Target:** Nitish  
**Action:** Ask Nitish if the card issuance team uses [[Vault]].

**Conditional Next Step:** If Vault is in use, [[Michael Afolabi]] has a key rotation script available; determine applicability.

**Context:** Related to [[Card Issuance]] engineering operations and compliance automation.

**Progress 2026-04-29 evening:**
- 17:23 WAT — Mek asked Nitish "Are we using Vault for our secrets?"
- 17:43 WAT — Nitish confirmed: "Yes hashicorp vault."
- 17:45–17:48 WAT — Nitish flagged that the vault was restricted to VPs; Michael Afolabi has the cosmos key rotation script but does NOT have access to the cards vault to update the new secret value post-rotation. Someone else with cards-vault access (likely a cloud engineer on the cards team) is needed to apply the rotated secret in vault.
- 17:49 WAT — Mek clarified that vault-update should sit with the cloud engineer; asked Nitish to map cards SRE/cloud engineer coverage and whether it's shared with the card distribution team.
- 18:03 WAT — Nitish committed to reconfirm with Michael on access/permission boundary and circle back.
- **Open thread:** Nitish to confirm Michael's permission boundary on cards vault; Mek to assess whether cards team needs dedicated SRE/cloud engineer coverage (current state implies coverage gap where rotation scripts exist but vault-write actor is undefined).
- **Note from 14:38–14:40 WAT exchange (separate from vault thread but Nitish-side):** Card Issuance has 1 mobile engineer in Infra team + 1 in Sales distribution; mobile engineering work covers virtual card flow, limit/blocking flow, dispute flow, tap-to-pay, etc. Captured for staffing context.

---

### 3. CI/CD Tool Replacement: Theo Makola
**Owner:** Mek  
**Status:** New tool named **Theo Makola** replaces the AI process Alex has built.  
**Scope:** CI/CD, AI coding, and related automation workflows.

**Context:** Transition from Alex's AI process to Theo Makola. Requires communication plan and runbook updates.

**Progress 2026-04-29 evening:**
- 18:16 WAT — Felix Ike DM'd Mek with `<@U0A0PN1QEJW|Theo Makola>` (Slack handle pointer). User pointer is now resolvable; next step is direct outreach to Theo to align on scope, transition plan, and runbook ownership.

---

### 4. Create Slack Channel: Card Issuance Engineering Leads
**Owner:** Mek  
**Action:** Create a Slack channel for the card issuance engineering leads team.

**Scope:** Internal coordination channel for [[Card Issuance]] engineering leadership.

---

## Other Surfaced Items (2026-04-29 evening — adjacent to commitment)

- **[[ISSD-2531]] / [[ISSD-2532]] awaiting Mek's approval** — both filed by Spandan Mishra to Information Security Service Desk, 18:08–18:10 WAT (just minutes before the 18:09 WAT heartbeat tick). Email threads `19dda36f91016a39` + `19dda38cfe504b91`. No deadline visible in the snippet; not Immediate-tier. Briefing-2026-04-30 candidate Awareness item (or Decision if approval gate ages without action). Tracked here because Spandan is the Card Issuance security counterparty — these likely relate to the same vault/rotation thread above.
- **Visa / Mastercard issuer-processor certification status** — Ravi Jakhodia (Moniepoint) raised this in group DM C0B0G5PF8DR at 16:56 WAT; Tracy Ojaigho responded: Visa certification commenced via Moniepoint as issuer, ETA 2–3 months; Mastercard certification has not started, requires Mastercard-licensed issuing-bank partnership. Awareness signal — not a Mek-action item but informs Card Issuance roadmap.

---

## Dependencies
- Item 1 (Cosmos) may unblock [[Union Bank]] [[Direct Debit]] service work
- Item 2 (Vault) informs follow-up with Michael Afolabi
- Item 3 (Theo Makola) requires stakeholder communication and transition planning
- Item 4 (Slack channel) is independent