---
title: Java 21 migration
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:07:40Z"
updated: "2026-04-25T12:07:40Z"
summary: "TeamApt migration of services to Java 21 — 50% complete; remaining 50% blocked by Cosmos library dependency. Two unblock paths: Moneyoint FX team's Java 21 Cosmos flavor or Wycliffe's wrapper-class strategy."
---

## Status (2026-04-22)

The **Java 21 migration** at [[TeamApt]] is partially complete:
- Services not dependent on Cosmos have already migrated.
- Remaining 50% of services blocked by [[Cosmos library]] dependency.

## Resolution paths

1. **Replace Cosmos with FX-team Java 21 flavor** ([[Prateek Gupta]]) — a Java 21 flavor of Cosmos already exists on the Moneyoint FX team's side; replacing the existing library should resolve the issue.
2. **Wrapper class** ([[Wycliffe Ochieng']]'s team) — wrapper around the library handles migration locally. Versioned libraries can continue to be used even if core libraries move.

## Action ownership

- [[Priya Chawla]] — connect with [[Wycliffe Ochieng']] and [[Prateek Gupta]] for further details.
- [[Ravi Veluguleti]] — follow up with [[Ken]] on Java 21 migration progress (offline).

Source: [[TeamApt Weekly Team Meeting - 2026-04-22 16:59 IST]].

## Related

- [[Cosmos library]]
- [[CMS Transaction Service extraction]] — also targeting Java 21
