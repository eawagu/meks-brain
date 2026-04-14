---
title: Direct to Bank Daily Stand Up 2026-04-14 0822
type:
  - "source"
cssclasses:
  - "source"
source_path: "gdrive://1yDo44G87oWRcK9HkFUTC6Qr6w72ZR1uCZOirE0ODTT4"
created: "2026-04-14T08:14:12Z"
updated: "2026-04-14T08:14:12Z"
summary: Direct to Bank Daily Standup Apr 14 2026 — Zenit integration proceeds, Go Subscribe included in upcoming deployments, project timelines require update for new quarter.
---

## Summary

[[Direct to Bank]] daily standup Apr 14, 2026 (08:22 WAT). Technical project status updates and security testing progress were reviewed for multiple banking settlement integrations.

- **Zenit Security and APIs:** Security scans and vulnerability testing on the [[Zenith Bank]] portal completed; environment testing planned today. Integration for agreed APIs commenced after successful testing of the verify API.
- **Settlement Agent Blockers:** Multiple bank settlement projects remain stalled by pending SLA reviews and signatures. Development teams continue providing technical support for ongoing integrations and direct debit configurations.
- **Project Timeline Management:** Project delivery timelines require immediate updates to reflect current progress for the new quarter. Deployment plans finalized to include [[GoSubscribe]] upgrades for identified banking partners.

## Aligned Decisions

- **Zenit integration proceeds despite issues** — team aligned to proceed with Zenith Bank API integration while the bank resolves outstanding negative test errors.
- **Go Subscribe included in deployments** — [[GoSubscribe]] service will be included in all upcoming upgrade and remediation deployments, starting next week.

## Key Points

- [[GoSubscribe]] deployment for Echo Bank and [[Stanbic Bank]] — [[Ifeoluwa Oguntona]] requested inclusion in upcoming Jira movements; [[Khadijat Musa]] confirmed for next week.
- **Union Bank Direct Debit server access continues to fail** — Emanuel still cannot access server despite login details shared. [[Oluwakemi Oni]] to follow up with Samuel at Union Bank.
- **FCMB (FCNB) Direct Debit access blocked** — team can only connect to VPN but not the server. Bank working on fix.
- **Access Bank + Wema Direct Debit** — PayOn approval ongoing at MyBank (security team examining); CoralPay/Access still blocked on pending agreement between Access and Coral; [[Wema Bank]] DD still in internal approval.
- **Echo Bank SLA name change** — awaiting Felix's signature despite escalation to [[Dennis Ajalie]].
- **Keystone Bank mobile app development** overdue — due April, not completed.
- **MoneyPoint Direct Debit** — 661 error fixed; working with global limits; mandate limit configuration pending for demo later this week. Production credentials for bank API sent; confirming IP address.
- **Foreign settlement agent (Ambi) + Echo Bank** — Ambi SLA last-amendment with bank; Echo Bank engineering issue moved to 'in progress' by Daniel — timeline requested.
- **UBA settlement agent SLA** — still with bank for review/signing. [[CoralPay]] integration to ATS in parallel test ongoing.
- **Premium Trust** — status not yet confirmed blocked; Tundday still following up for feedback.
- **Project timelines** — [[Khadijat Musa]] emphasized need to update carry-over items for new quarter (many still show March 19 dates).

## Next Steps (action items)

- [Abdulgafar Obeitor] Forward Zenit API document email; update ticket with document details
- [Ifeoluwa Oguntona] Share 2 PM Zenit DD meeting link to group
- [Daniel] Provide timeline for Echo Bank engineering issue resolution
- [Babajide Ojoboorun] Retest Zenit Bank verify API
- [Oluwakemi Oni] Follow up with Samuel (Union) on DD server access; discuss Union NSS DD strategy with Abdulgafar; address failing name inquiry / transfer; engage banks on ongoing downtime
- [The group] Retest direct debit using global limits; obtain MoneyPoint settlement account details from finance manager
- [Project Delivery] Update all current project timelines for new quarter — focus on carry-over items

## Entities Mentioned

- [[Zenith Bank]], [[Stanbic Bank]], [[Wema Bank]], [[Access Bank]], [[UBA]], Keystone Bank, Echo Bank, [[FCMB]], Union Bank, Premium Trust, Ambi (foreign settlement agent)
- [[CoralPay]], [[GoSubscribe]], [[Direct to Bank]], [[ATS]]
- [[Ifeoluwa Oguntona]], [[Khadijat Musa]], [[Babajide Ojoboorun]], [[Oluwakemi Oni]], [[Dennis Ajalie]], Daniel, Felix, Samuel, Tundday, Abdulgafar Obeitor, Abraham Isinguzoro, Opeyemi Animashaun, Glory Alioha, Taiwo Baptista, Emanuel

## Concepts

- Bank settlement integration blockers (SLA reviews, credential/access provisioning, server access failures)
- Security/vulnerability testing lifecycle ([[Zenith Bank]] portal)
- Direct Debit configuration and mandate limits
- Q2 carry-over project timeline hygiene
