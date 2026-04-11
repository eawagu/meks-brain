---
title: Direct to Bank Daily Standup 2026-04-01 0824
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: direct-to-bank-daily-stand-up-20260401-0824.md
summary: Direct to Bank daily standup on April 1, 2026 — Zenith Bank API issues and UBA VPN delays block transaction completion; Access Bank testing blocked by unfunded test account; Ecobank SLA signature pending; urgent call for Jira documentation discipline.
---

## Summary

Large cross-team standup for [[TeamApt]] Direct to Bank, owned by [[Khadijat Musa]]. Multiple bank integration blockers: [[Zenith Bank]] settlement API returning null (blocking bulk transactions) and returning "expired OTP" instead of "invalid OTP" on negative test scenarios; [[UBA]] VPN provisioning delayed; [[Ecobank]] SLA addendum awaiting Felix's signature since last week; [[Access Bank]] test account unfunded. Team called out for poor collaboration and urged to document everything in Jira.

## Key Points

- **Zenith Bank:** Settlement API null response blocks bulk transactions; positive test scenarios pass but negative scenarios fail (invalid OTP → expired OTP). Glory Alioha to follow up with Zenith technical team.
- **UBA:** Second VPN connection not provisioned; Dapo unresponsive to emails. SLA clarification needed for Nora's review.
- **Ecobank:** Account name change SLA addendum blocked on Felix/Dennis signature since prior week. Abiodun Famoye to nudge.
- **Access Bank:** Testing blocked — test account unfunded, back-office admin access missing, Interbank Transfer API clause needs CTO sign-off (source code/certificate requirement).
- **Stanbic:** Fund settlement agent SLA shared; bank conducting internal review.
- **Polaris:** Test environment access approved but environment down; name inquiry payload changes unsuccessful. Deployment note with security upgrades prepared as session justification.
- **GTB:** Account creation for Interbank API in progress.
- **BarterPay:** Development ongoing; bank to provide test account and production API.
- **Fidelity:** Server access issue resolved; testing session to continue.
- **MoneyPoint DD:** UI fixes finalizing; no stamp duty for current rollout (configurable for future). Production infrastructure setup ongoing.
- **Collaboration gap:** [[Ugochukwu Ebirika]] flagged pattern of basic issues recurring in meetings; urged all teams to capture updates in Jira before standup.

## Entities Mentioned

- [[Khadijat Musa]], [[Glory Alioha]], [[Abiodun Famoye]], [[Emmanuel Francis]], [[Opeyemi Animashaun]], [[Oluwakemi Oni]], [[Taiwo Baptista]], [[Feyisayo Oyeniran]], [[Ugochukwu Ebirika]], [[Emeka Joseph]], [[Fatai Ibrahim]], [[Abdulgafar Obeitor]]
- [[Zenith Bank]], [[UBA]], [[Ecobank]], [[Access Bank]], [[Stanbic Bank]], [[Polaris Bank]], [[GTB]], [[Fidelity Bank]]
- [[TeamApt]]

## Concepts

- [[Direct Debit Program]]
- [[Bank Integration]]
- [[OTP Authentication]]