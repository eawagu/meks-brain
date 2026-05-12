---
title: Direct to Bank Daily standup - 2026_04_14 08_22 WAT
type:
  - "source"
cssclasses:
  - "source"
source_path: _Direct to Bank _ Daily stand up – 2026_04_14 08_22 WAT – Notes by Gemini.docx
retention_label: postgres
retention_rationale: D2B standup with 2 ALIGNED decisions (Zenith integration proceeds; Go-Subscribe in all deployments) plus rich bank-by-bank status across 9+ banks with named SLA blockers, server-access issues, and named action owners. Future retrieval likely.
meeting_date: 2026-04-14
created: "2026-05-12T11:01:24Z"
updated: "2026-05-12T11:01:24Z"
summary: "D2B Daily Standup 2026-04-14 — Zenith API integration proceeds despite open negative-test errors; Go-Subscribe to be included in all deployments. Bank-by-bank status: Echo Bank SLA blocked on Felix signature, UBA SLA in review, Coral Pay×Access blocked, Union Bank server access pending, MoneyPoint 661 error fixed, FCNB VPN-only access."
---

## Summary

Direct to Bank Daily Standup on 2026-04-14 08:22 WAT — bank-by-bank status across Zenith (security testing + API integration), foreign settlement agents (Ambi, Echo Bank, UBA), Coral Pay integration, Union Bank server access + NSS, MoneyPoint DD, FCNB VPN issue, Access Bank + Wema Bank DD, Keystone mobile app delay, and project timeline updates. Two ALIGNED decisions: proceed with Zenith integration despite open issues; include Go-Subscribe in all upcoming upgrade/remediation deployments.

## ALIGNED Decisions

- **Zenith integration proceeds despite issues** — proceed with Zenith API integration while bank resolves outstanding negative-test errors
- **Go-Subscribe included in deployments** — Go-Subscribe service to be in all upcoming upgrade + remediation deployments starting next week

## Key Points

- **Zenith security**: vulnerability raised previous week completed; environment testing today; fix to deploy to live server if successful
- **Zenith user creation**: blocked pending bank's internal follow-up for control team role matrix; if no progress by end of day, team to visit bank tomorrow
- **Zenith DD**: fixed vulnerability rescanned but new ones reported; 2 PM meeting with bank scheduled
- **Zenith API**: OTP API resolved; all agreed APIs now available; integration started; [[Babajide Ojoboorun]] to retest verify API; [[Ifeoluwa Oguntona]] following up with engineering
- **Foreign Settlement Agent (Ambi)**: blocker remains SLA last amendment, with bank for review before signing + live API deployment
- **Echo Bank settlement agent**: engineering work resumed (Daniel moved task to "in progress"); timeline for resolution requested
- **Echo Bank SLA for name change**: awaiting Felix's signature; escalated to Dennis; if not signed tomorrow, "spiritual angle" approach
- **UBA settlement agent**: SLA still with bank for review/signing
- **[[Coral Pay]] × [[ATS]] integration**: parallex test ongoing; 24/7 technical support being provided
- **[[Coral Pay]] × [[Access Bank]]**: blocked due to pending agreement between Access and Coral
- **Union Bank DD server access**: Emanuel still cannot access server despite shared login; [[Oluwakemi Oni]] to follow up with Samuel
- **Union NSS**: bank leaning toward NSS on DD side (vs A2A); Oluwakemi to discuss next steps with [[Abdulgafar Obeitor]]
- **Premium Trust**: not marked blocked yet; Tundday still following up with bank
- **[[Moniepoint|MoneyPoint]] DD**: insufficient-account 661 error fixed; working with global limits set by MoneyPoint; mandate limit config + other fixes for end-of-week demo; production credentials sent, confirming IP for access
- **FCNB DD access**: VPN connects but server itself unreachable; bank working on fix
- **[[Access Bank]] PayOn production approval**: ongoing at MyBank; security team examining solution
- **[[Wema Bank]] DD**: still undergoing internal approval
- **[[Keystone Bank]]**: mobile app development (due April) incomplete; awaiting update
- **Fund Settlement Agent onboarding**: no feedback; name inquiry still failing; transfer failing again
- **Project timelines**: [[Khadijat Musa]] emphasized need to update all timelines for new quarter — many show outdated dates like March 19
- **Go-Subscribe inclusion**: confirmed for Echo Bank + Stambic deployments next week

## Next Steps

- [[Abdulgafar Obeitor]] — forward original email with Zenith API document; update ticket with document details
- [[Ifeoluwa Oguntona]] — drop 2 PM Zenith DD meeting link to group
- Daniel — provide timeline for Echo Bank engineering issue
- [[Babajide Ojoboorun]] — retest Zenith verify API
- [[Oluwakemi Oni]] — follow up with Samuel on Union Bank DD server access; discuss Union NSS strategy with Abdulgafar; address failing name inquiry + transfers with Daniel; investigate ongoing system downtime
- The group — retest direct debit using global limits; obtain MoneyPoint settlement account details from finance manager
- Project Delivery — update all project timelines for new quarter; focus on carryover items

## Entities Mentioned

People: [[Abdulgafar Obeitor]], [[Abiodun Famoye]], [[Ifeoluwa Oguntona]], [[Babajide Ojoboorun]], [[Oluwakemi Oni]], [[Khadijat Musa]], [[Taiwo Baptista]], [[Abraham Isinguzoro]], [[Opeyemi Animashaun]], [[Glory Alioha]], Felix, Dennis, Daniel, Samuel, Tundday, Emanuel

Banks: [[Zenith Bank]], [[Echo Bank]], [[UBA]], [[Union Bank]], [[Premium Trust]], [[Access Bank]], [[Wema Bank]], [[Keystone Bank]], [[FCNB]], [[Stambic]] ([[Stanbic]])

Systems: [[ATS]], [[Coral Pay]], [[Moniepoint]], [[Go-Subscribe]], [[Ambi]], [[PayOn]]

## Concepts

- [[Direct to Bank Daily standup]]
- [[SLA sign-off blocker]]
- [[Vulnerability management]]
- [[Server access blockers]]