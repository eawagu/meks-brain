---
title: Direct to Bank Daily Stand Up 2026-04-02
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: direct-to-bank-daily-stand-up-20260402.md
summary: Direct to Bank daily standup Apr 2 2026 — Zenith API IP whitelisting issue after VLAN move, UBA declined additional VPN (recommending internet-based), Ecobank SLA pending, Union Bank VPN blocker escalated, Access Bank testing jar adapter issues.
---

## Summary

Zenith API and direct debit troubleshooting dominated discussions. A test transaction failure was traced to an IP address not whitelisted after a VLAN move. UBA declined additional VPN connections, recommending internet-based connectivity instead. Ecobank account name change SLA remains pending. Union Bank mandate creation blocked by incomplete VPN setup. Access Bank testing issues tied to deployed jar adapter.

## Key Points

- Zenith Bank API: IP not whitelisted after VLAN move caused "no response" error; management approval obtained but system still failing; escalated to API team
- Zenith DD: Invalid OTP API error escalated to bank's dev team; not a showstopper; team working on other functional APIs in parallel; jar vulnerability remediation required before bank allows server deployment
- UBA: Declined additional VPN; suggested internet-based connection; David Oseji still working on existing VPN connectivity
- Ecobank: Change of account name SLA waiting on Felix's response since previous week; Abdulgafar Obeitor to retry contact
- Stanbic Fund Settlement: SLA shared, awaiting bank review and executable copy
- Union Bank: Mandate creation and test transactions blocked by VPN setup; escalated to SIS admin team with no response in 24+ hours
- Polaris: Legal feedback addendum on fund settlement to be shared with bank
- Union Bank dispute resolution: NSS resolution time is configurable, standard ~48 hours
- Access Bank: Testing issues on test environment possibly due to deployed jar adapter; Emmanuel Francis and Fatai Ibrahim to session together; push to complete test env this week; VPN switch being drafted to resolve connector service vulnerability
- Access Bank interbank transfer: Internal alignment on outstanding clauses achieved; obtaining clear copy from bank for signing
- GTB: Still working on providing interbank API accounts
- MoneyPoint DD: UI fix demo successful but exposed another issue; awaiting infrastructure deployment
- Abar Pay: Still waiting for APIs (some under development); mandate limit configuration fix pending
- Fidelity Bank: DD training prep meeting today; Abraham Isinguzoro creating training plan/schedule

## Entities Mentioned

[[Khadijat Musa]], [[Abiodun Famoye]], [[Nancy Muorah]], [[Babajide Ojoboorun]], [[Abdulgafar Obeitor]], [[Abdulganiu Yusuff]], [[Glory Alioha]], [[Oluwakemi Oni]], [[Opeyemi Animashaun]], [[Fatai Ibrahim]], [[Emmanuel Francis]], [[Taiwo Baptista]], [[Abraham Isinguzoro]], [[David Oseji]], [[Victor Madu]], [[Emeka Awagu]], [[Zenith Bank]], [[UBA]], [[Ecobank]], [[Stanbic Bank]], [[Union Bank]], [[Polaris Bank]], [[Access Bank]], [[GTB]], [[Fidelity Bank]]

## Concepts

[[Bank Integration]], [[OTP Authentication]]