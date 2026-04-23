---
title: Card Transaction Service
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-23T05:24:49Z"
updated: "2026-04-23T05:24:49Z"
summary: Manages the actual card transaction processing flow within Moniepoint MFB — functionally a second middleware layer alongside Card Manager Service between the card system and the Core Banking Application.
---

## Overview

Card Transaction Service manages the actual transaction processing flow within the [[Moniepoint MFB]] card stack. Sits under Card Infrastructure ([[Damilola Oyediran]]).

## Architectural Position

- Functionally a closely-related module to [[Card Manager Service]]
- Acts as a **second middleware layer** between the card system and core banking
- Note: the [[Card Manager Service CMS Specification]] documents an active extraction effort to spin out a CMS Transaction Service (Java 21) — likely the same or related service.

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Card Manager Service CMS Specification]]