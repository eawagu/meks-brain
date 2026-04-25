---
title: LDAP authentication
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:52:00Z"
updated: "2026-04-25T11:52:00Z"
summary: "Lightweight Directory Access Protocol — used for user authentication in TeamApt's bank-portal integrations. Apr 21 D2B aligned: rely on current LDAP for Zenith Bank security; address absence of MFA/2FA in bank communications."
---

## Definition

**LDAP authentication** (Lightweight Directory Access Protocol) is the protocol TeamApt uses for user authentication on bank-portal integrations. In the [[Direct to Bank program]] context, LDAP is the primary identity layer; [[Multi-Factor Authentication|MFA]] is a supplementary layer pending bank-side credential provisioning.

## D2B Apr 21 aligned decision

- Rely on the current LDAP implementation for security at [[Zenith Bank]].
- Address the absence of MFA/2FA when communicating with the bank.
- LDAP confirmed working at Zenith ([[Emeka Joseph]] and [[Abdulgafar Obeitor]]).
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## D2B Apr 22 — user-disable workaround at Ecobank

A pattern around LDAP-aware user disable: at [[Ecobank]], a user role exists that strips authorities, leaving only a change-password prompt at login. This is **not** full disablement — LDAP still works for other apps — but functionally restricts portal access. Surfaced by [[Ugochukwu Ebirika]] for adoption at Zenith. Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## Sources

- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
