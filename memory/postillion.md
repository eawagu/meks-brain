---
title: Postillion
type:
  - "entity"
cssclasses:
  - "entity"
aliases:
  - "Postilion"
  - "PostCard"
created: "2026-04-23T05:24:48Z"
updated: "2026-04-23T05:24:48Z"
summary: External payment switch (owned by Interswitch) used by Moniepoint MFB for card production and authorisation — the dependency that the new Card Management System under Project Phoenix is explicitly designed to eliminate.
---

## Overview

Postillion is an external payment processing switch owned by [[Interswitch]], used by [[Moniepoint MFB]] for card production and authorisation. It is one of the foundational legacy components in the MFB card stack.

Note: also written as **Postilion** elsewhere in the brain (e.g. in [[Card Manager Service CMS Specification]] which references the ACI Postilion switch). Source documents alternate between "Postillion" and "Postilion"; treated as the same system.

## Strategic Position

- A deliberate Moniepoint MFB strategy has been in place to **reduce dependency on Interswitch**, with Postillion as the primary entry point of that dependency.
- Eliminating the Postillion dependency is the **primary strategic objective** of the new [[Card Management System]] being built by the strike team under [[Project Phoenix]] (per 2026-04-21 KT).

## Known Limitations

- The legacy [[Card Manager Service]] uses a **dummy account number** on Postillion rather than the real account number, which prevents [[Interswitch]] from processing direct refunds by transfer.

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Card Manager Service CMS Specification]]