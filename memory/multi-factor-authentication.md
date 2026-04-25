---
title: Multi-Factor Authentication
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:52:00Z"
updated: "2026-04-25T11:52:00Z"
summary: "MFA / 2FA — supplementary authentication layer pending bank-side credential provisioning at Zenith Bank. D2B Apr 21: aligned to communicate MFA absence with the bank; implementation requires Zenith to share OTP/2FA credentials."
---

## Definition

**Multi-Factor Authentication (MFA / 2FA)** is the supplementary authentication layer TeamApt's [[Direct to Bank program]] integration sits on top of [[LDAP authentication]]. Implementation depends on the bank sharing OTP or 2FA credentials with TeamApt.

## D2B Apr 21 aligned decision

- Rely on LDAP for security; address MFA/2FA absence in bank communications.
- [[Fortunate Nwachukwu]]: "MFA implementation requires Zenith Bank to share their OTP or two-factor authentication credentials."
- The group will raise the lack of MFA against LDAP with the [[Zenith Bank]] team.
- [[Abdulgafar Obeitor]] suggested reverting to the bank early on the inability to provide MFA against LDAP while fixing existing issues.
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## D2B Apr 22 — Keystone Bank OTP block

Keystone Bank is **not ready to go live with OTP** — their new mobile application incorporates mobile-app + OTP-based authentication, but end-to-end is done bank-side and the bank is not ready. This is a classic case of MFA being a bank-side dependency that delays Direct Debit go-live. Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## Sources

- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
