---
type:
  - "concept"
title: Java 21 migration
created: "2026-04-25T12:07:40Z"
summary: "TeamApt migration of services to Java 21 — Mar 31, 2026 baseline 16% (Q2 close-out target); by Apr 22, 2026 ~50% complete with remaining 50% blocked by Cosmos library dependency. Two unblock paths: Moneyoint FX team's Java 21 Cosmos flavor or Wycliffe's wrapper-class strategy."
updated: "2026-04-27T05:50:34Z"
cssclasses:
  - "concept"
---

## Progression

The **Java 21 migration** at [[TeamApt]] has progressed across two snapshots in the brain.

### Mar 31, 2026 baseline (per [[TeamApt MANCo Meeting - 31 March 2026]])

- **16% complete.**
- **Target:** Q2 2026 close-out.
- Reported by [[Ravi Veluguleti]].

### 2026-04-22 status (~3 weeks later)

The migration is partially complete:
- Services not dependent on Cosmos have already migrated.
- Remaining 50% of services blocked by [[Cosmos library]] dependency.

Velocity reading: **16% → ~50% in ~3 weeks** — significant progress on Cosmos-independent services; Cosmos dependency now isolated as the blocker for the remainder.

## Resolution paths (Cosmos blocker)

1. **Replace Cosmos with FX-team Java 21 flavor** ([[Prateek Gupta]]) — a Java 21 flavor of Cosmos already exists on the Moneyoint FX team's side; replacing the existing library should resolve the issue.
2. **Wrapper class** ([[Wycliffe Ochieng']]'s team) — wrapper around the library handles migration locally. Versioned libraries can continue to be used even if core libraries move.

## Action ownership

- [[Priya Chawla]] — connect with [[Wycliffe Ochieng']] and [[Prateek Gupta]] for further details.
- [[Ravi Veluguleti]] — follow up with [[Ken]] on Java 21 migration progress (offline).

## Sources

- [[TeamApt MANCo Meeting - 31 March 2026]] — baseline (16%)
- [[TeamApt Weekly Team Meeting - 2026-04-22 16:59 IST]] — progress update (~50%, Cosmos blocker isolated)

## Related

- [[Cosmos library]]
- [[CMS Transaction Service extraction]] — also targeting Java 21
- [[Ravi Veluguleti]]
