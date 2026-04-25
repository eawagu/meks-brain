---
title: "Direct to Bank Daily standup - 2026-04-21 08:10 WAT"
type:
  - "source"
cssclasses:
  - "source"
source_path: Direct to Bank _ Daily stand up – 2026_04_21 08_10 WAT – Notes by Gemini.md
retention_label: postgres
retention_rationale: Multi-stakeholder D2B standup transcript with named decisions across multiple banks (Zenith LDAP/MFA, Money Point Direct Debit, Union Bank API, fund settlement account whitelisting, refund investigation). Future retrieval likely — specific bank-by-bank progress and decisions are referenced by RC91 cycles, settlement projects, and pentest remediation tracking.
created: "2026-04-25T11:39:46Z"
updated: "2026-04-25T11:39:46Z"
summary: "2026-04-21 08:10 WAT Direct to Bank daily standup — covered Zenith Bank security (LDAP vs MFA), Money Point Direct Debit network issue, Pay Direct Debit insufficient-funds testing limits, JAR-deployment standardization across all banks, fund settlement account whitelisting (Money Point + Tap), Union Bank API wait, and unresolved 48h+ refund issues."
---

## Summary

Substantive [[Direct to Bank program]] daily standup at 2026-04-21 08:10 WAT. The team reviewed bank integration delays (real-time database migration, insufficient-funds testing limits), security implementation strategies (LDAP vs MFA for [[Zenith Bank]]), and unresolved refund issues (>48 hours, multiple banks). Aligned decisions were taken on standardized [[JAR deployment]] across all banks, Zenith's reliance on [[LDAP authentication]] until [[Multi-Factor Authentication|MFA]] can be sourced from the bank, account whitelisting for fund settlement, and Finance involvement in account requests via [[Kevin]].

## Key Points

- **Standardized JAR deployment decision (aligned)** — single uniform set of JAR files across all banks. New vulnerabilities raised by one bank (e.g., [[Union Bank]]) deployed to other banks (e.g., [[Zenith Bank]]) only after confirmation and deployment there.
- **Zenith Bank security stance (aligned)** — rely on current LDAP implementation; absence of MFA/2FA addressed by communicating with the bank to share OTP/2FA credentials. [[Fortunate Nwachukwu]] noted MFA implementation requires Zenith to share their credentials.
- **Account whitelisting (aligned)** — both Tap (switch) and Money Point accounts will be submitted to the bank for whitelisting. Strategy is to "push both accounts forward" since signatures are the same; bank-specific issues handled case-by-case.
- **Finance involvement (aligned)** — all requests for new bank settlement accounts must include [[Kevin]] and the [[Finance team]]. Selecting the actual settlement account is Kevin's call.
- **Pay Direct Debit insufficient-funds testing blocked** — bank initially raised the global limit, then reverted; production API held back due to bank-side internal deployment issues. Bank's temporary 100,000 ceiling is too small for production scale ("transactions should span to millions" — [[Abiodun Famoye]]).
- **Money Point Direct Debit** — the account-validation issue was resolved (accounts configured), but a new network-related issue is now active.
- **Zenith Bank pentest remediation** — engineering expects fixes ready today for rescanning. Training tentatively planned for tomorrow.
- **Fund Settlement Account source confirmation** — Kevin should select the account from Finance's list. Always include Kevin when reaching out to Finance for accounts.
- **Union Bank** — expected to provide the API; no current update.
- **Opay projects** — no current updates.
- **FCMB** — server access request escalated to the DH ([[Abraham Isinguzoro]] reporting).
- **Outstanding refunds** — multiple banks involved, surpassed the 48-hour mark. [[Ugochukwu Ebirika]] to find root cause and update by evening; [[Khadijat Musa]] reminded the group to prioritize across all outstanding issues.

## Decisions (ALIGNED)

- Standardized JAR-files deployment principle: single uniform set across all banks.
- Zenith Bank security: rely on current LDAP; address MFA/2FA absence in communication with the bank.
- Account whitelisting: submit both [[Tap]] and [[Money Point]] accounts to the bank.
- Finance involvement: all new bank settlement account requests must include Kevin and Finance.

## Next Steps (action owners)

- [[Oluwadayo Osborne]] — reconnect with [[John]] today to resolve pending bank issues.
- The group — raise the lack of MFA against LDAP with the Zenith team.
- [[Ifeoluwa Oguntona]] — revert status updates and expected fix availability time to Zenith Bank today.
- [[Abdulgafar Obeitor]] — confirm if Tund is reachable.
- [[Ifeoluwa Oguntona]] — follow up with Kevin re: account number, Client ID, and API key.
- [[Ifeoluwa Oguntona]] — visit the bank branch today to understand the bank's name-change problem.
- The group — request fund settlement accounts from Finance, including Kevin.
- [[Ugochukwu Ebirika]] — investigate exact cause of unprocessed refunds this morning; update by evening.

## Entities Mentioned

People: [[Khadijat Musa]], [[Glory Alioha]], [[Yasir Syed Ali]], [[Oluwadayo Osborne]], [[Taiwo Baptista]], [[Abdulgafar Obeitor]], [[Abiodun Famoye]], [[Ifeoluwa Oguntona]], [[Fortunate Nwachukwu]], [[Emeka Joseph]], [[Abraham Isinguzoro]], [[Ugochukwu Ebirika]], [[Babajide Ojoboorun]]

Banks / external entities: [[Zenith Bank]], [[Union Bank]], [[Money Point]], [[Tap]], [[FCMB]], [[Opay]]

Internal teams: [[Finance team]], [[Direct to Bank program]]

System: [[Gemini]]

## Concepts

- [[Direct to Bank program]]
- [[JAR deployment standardization]]
- [[LDAP authentication]]
- [[Multi-Factor Authentication]]
- [[Penetration test remediation]]
- [[Fund Settlement Account]]
- [[Refund processing failure]]
