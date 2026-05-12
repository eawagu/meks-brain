---
title: Direct to Bank Daily standup - 2026_04_21 08_10 WAT
type:
  - "source"
cssclasses:
  - "source"
source_path: _Direct to Bank _ Daily stand up – 2026_04_21 08_10 WAT – Notes by Gemini.docx
retention_label: postgres
retention_rationale: D2B standup with 4 ALIGNED decisions (JAR standardization, Zenith LDAP+MFA gap, Tap+MoneyPoint whitelisting, Finance/Kevin gate). Specific operational detail (insufficient-funds test limit 100k too small; refunds exceed 48h). Future retrieval likely.
meeting_date: 2026-04-21
created: "2026-05-12T11:04:58Z"
updated: "2026-05-12T11:04:58Z"
summary: "D2B Daily Standup 2026-04-21 08:10 WAT — 4 ALIGNED: standardized JAR deployment, Zenith LDAP-only (raise MFA gap), submit Tap+MoneyPoint for whitelisting, Kevin+Finance gate for new settlement accounts. Insufficient-funds test limit 100k too small for prod (need millions); refunds exceed 48h."
---

## Summary

D2B Daily Standup 2026-04-21 08:10 WAT — bank integration delays, security implementation strategies (LDAP vs MFA for Zenith), insufficient-funds testing limits, fund-settlement account whitelisting, outstanding refunds. 4 ALIGNED decisions covering JAR standardization, Zenith security posture, account whitelisting, and Finance/Kevin gate.

## ALIGNED Decisions

1. **Standardized JAR files deployment** — single uniform set of JARs across all banks
2. **Zenith Bank security protocol** — rely on current [[LDAP]] implementation for security; address MFA/2FA absence in bank communication
3. **Account whitelisting procedure** — submit both Tap and Money Point accounts for whitelisting
4. **Finance involvement in account requests** — all new bank settlement account requests must involve [[Kevin Ng'Eno|Kevin]] and Finance team

## Key Points

- **Bank response pending**: bank requested until tomorrow (Wednesday) to provide update; awaiting real-time DB migration + insufficient-funds error code confirmation; [[Oluwadayo Osborne]] couldn't connect with John yesterday — will retry today
- **Pay DD insufficient-funds test**: bank temporarily increased global limit then reverted; production API held by bank's internal deployment issues
- **Test limit 100k too small**: production transactions span to millions; setting limits on team side already tested for other numbers
- **Updated features in JARs**: [[Abiodun Famoye]] confirmed updated features included in JARs sent to all banks
- **JAR rollout discipline**: new vulnerabilities raised by one bank (e.g., Union) only deployed to others (e.g., Zenith) after confirmed + deployed there
- **MoneyPoint DD**: account validation issue resolved; accounts configured; new network-related issue being worked on
- **Zenith pentest resolution**: ready today for rescanning; training tentatively tomorrow
- **MFA at Zenith**: requires bank to share OTP/2FA credentials; team currently has LDAP-only; Abdulgafar to revert to bank on inability to provide MFA against LDAP while fixing existing issues; specific bypass vulnerability still being simulated
- **Fund settlement whitelisting**: submit all accounts to be moved from — both switch and MoneyPoint accounts; signatures same so push both; case-by-case bank-specific issues
- **Fund settlement account source**: Finance provides list; Kevin selects account; always involve Kevin when reaching out to Finance for accounts
- **Union Bank**: expected to provide API
- **FCMB**: server access request escalated to DH
- **Opay**: no current updates
- **Outstanding refunds**: several banks involved; >48h; [[Ugochukwu Ebirika]] + [[Babajide Ojoboorun]] investigating; update by evening; Khadijat asked them to review all outstanding issues to prioritize

## Next Steps

- [[Oluwadayo Osborne]] — reconnect with John today
- The group — raise MFA gap (against [[LDAP]]) with Zenith team
- [[Ifeoluwa Oguntona]] — revert fix status + expected fix availability time to Zenith Bank today
- [[Abdulgafar Obeitor]] — confirm if Tund is reachable
- [[Ifeoluwa Oguntona]] — follow up with [[Kevin Ng'Eno|Kevin]] on account number, Client ID, API key
- [[Ifeoluwa Oguntona]] — visit bank branch today re bank name-change problem
- The group — send request to Finance for fund settlement account (include Kevin)
- [[Ugochukwu Ebirika]] — investigate unprocessed refunds this morning

## Entities Mentioned

People: [[Abdulgafar Obeitor]], [[Ifeoluwa Oguntona]], [[Abiodun Famoye]], [[Taiwo Baptista]], [[Oluwadayo Osborne]], [[Yasir Syed Ali]], [[Glory Alioha]], [[Fortunate Nwachukwu]], [[Emeka Joseph]], [[Khadijat Musa]], [[Kevin Ng'Eno]], [[Abraham Isinguzoro]], [[Babajide Ojoboorun]], [[Ugochukwu Ebirika]], Tund, John

Banks: [[Zenith Bank]], [[Union Bank]], [[Moniepoint|MoneyPoint]], [[FCMB]], [[Opay]]

Systems: [[LDAP]], [[MFA]], [[Tap]] (account), JARs

## Concepts

- [[Direct to Bank Daily standup]]
- [[JAR standardization]]
- [[Account whitelisting]]
- [[Insufficient-funds testing]]
- [[Refund management]]