---
title: Centralized Card Platform
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-28T16:43:51Z"
updated: "2026-04-28T16:43:51Z"
summary: "The strategic intent behind Project Phoenix's CI&P platform — collapsing distributed card processing environments (Postillion + in-house systems + partner integrations) into a single unified platform organized around Operations, Intellectual Property, and Development domains."
---

## Definition

**Centralized Card Platform** is the strategic intent behind [[Project Phoenix]]'s [[Card Issuance and Processing]] (CI&P) platform — collapsing the currently distributed card processing environments operated by [[Moniepoint MFB]], [[TeamApt]], and partner integrations into a single unified platform consumed by all OpCos as tenants.

## Current state (pre-Phoenix)

The bank currently operates multiple independent card processing environments through:
- [[Postillion]] (external ACI processor via [[Interswitch]])
- In-house developed systems
- Partner integrations

This distributed architecture leads to **redundancy, increased operational complexity, and limited scalability**.

## Target state (under Phoenix)

All card capabilities consolidated into **three primary domains**:

- **Operations** — transaction processing, settlement, reporting.
- **Intellectual Property** — product definitions, pricing, scheme rules.
- **Development** — platform engineering, infrastructure, deployment automation.

This maps to the [[Card Issuance & Processing Platform]] team structure of Team 1 Card Processing + Team 2 Card Issuance, with cross-cutting Operations functions and shared IP (e.g., scheme rules, pricing) governed centrally.

## Multi-market reach

The centralized platform serves multiple global markets including emerging markets in Africa. The unified platform supports debit, credit, and prepaid card products across diverse regulatory environments (African banking regulations, [[PCI-DSS]], local payment scheme rules).

New markets are added as configuration profiles (Module), not as new builds (Spine unchanged) — see [[Spine and Module Architecture]].

## 2026-04-27 — formal kick-off

The Centralized Card Platform strategy was the framing concept of the 2026-04-27 [[Project Phoenix]] CI&P kick-off meeting. Source: [[Project Phoenix - CI&P kick off meeting - 2026-04-27]].

## Related

- [[Card Issuance and Processing]]
- [[Card Issuance & Processing Platform]]
- [[Project Phoenix]]
- [[Spine and Module Architecture]]
- [[Postillion]]
- [[Strangler Pattern]]
- [[Project Phoenix - CI&P kick off meeting - 2026-04-27]]
