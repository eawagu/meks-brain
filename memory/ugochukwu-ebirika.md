---
type:
  - "entity"
title: Ugochukwu Ebirika
created: 2026-04-11
summary: "TeamApt Direct to Bank team member — owner of refund-investigation track and Ecobank LDAP user-disable workaround discovery. D2B Apr 21–22: refund root-cause investigation; surfaced Ecobank standby-role pattern for Zenith."
updated: "2026-04-25T11:51:59Z"
cssclasses:
  - "entity"
---

TeamApt [[Direct to Bank program]] team member — participant in daily standups.

## 2026-04-21 — D2B Standup (08:10 WAT)

- Owner of the **refund root-cause investigation** for unprocessed refunds this morning. Confirmed still looking into the issue; will provide an update by the evening. Issue has surpassed the 48-hour mark across multiple banks.
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## 2026-04-22 — D2B Standup (08:21 WAT)

- **Ecobank LDAP user-disable workaround discovery** — confirmed an existing implementation pattern at [[Ecobank]]: a user role that removes all authorities, leaving only a "change password" prompt at login (not full disablement, but functionally restricts portal access while preserving LDAP for other apps). Surfaced for adoption at Zenith Bank.
- **Action: reconfirm Ecobank** — reconfirm the presence of the disabled-user functionality within the Ecobank environment.
- **Action: review Zenith workflow** — review documentation sent regarding Zenith workflow configurations.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## Sources
- [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
