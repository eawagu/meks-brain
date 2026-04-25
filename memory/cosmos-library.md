---
title: Cosmos library
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-25T12:07:38Z"
updated: "2026-04-25T12:07:38Z"
summary: "Internal/shared Java library used across TeamApt services — dependency blocker for Java 21 migration on 50% of services. Two resolution paths: Moneyoint FX team's existing Java 21 flavor or wrapper-class strategy from Wycliffe's team."
---

## Definition

The **Cosmos library** is an internal/shared Java library used across [[TeamApt]] services. As of 2026-04-22, it is the **primary dependency blocker** for the [[Java 21 migration]] — 50% of services awaiting migration depend on Cosmos.

## 2026-04-22 weekly meeting — resolution paths surfaced

Two paths to unblock Java 21 migration on Cosmos-dependent services:

1. **Moneyoint FX team's Java 21 flavor** ([[Prateek Gupta]]) — a Java 21 flavor of Cosmos already exists; replacing the existing library should resolve the issue.
2. **Wrapper class** ([[Wycliffe Ochieng']]'s team) — his team built a wrapper around the library to handle the migration locally. Wycliffe offered to show [[Priya Chawla]] the implementation. Versioned libraries can continue to be used even if core libraries move.

Action: [[Priya Chawla]] to connect with both [[Wycliffe Ochieng']] and [[Prateek Gupta]] for further details on Cosmos library version + wrapper-class implementation.

Source: [[TeamApt Weekly Team Meeting - 2026-04-22 16:59 IST]].

## Related

- [[Java 21 migration]]
