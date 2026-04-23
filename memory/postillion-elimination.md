---
title: Postillion Elimination
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-23T05:38:06Z"
updated: "2026-04-23T05:38:06Z"
summary: "Primary strategic objective of the new Phoenix CMS — remove Moniepoint MFB's Postillion (Interswitch) dependency from the card stack; Visa programme launches on new CMS as validation workload; progressive migration, full cut-over planned for 2026."
---

## Definition

**Postillion Elimination** is the primary strategic objective of the new [[Card Management System]] being built under [[Project Phoenix]]. The goal is to remove [[Moniepoint MFB]]'s dependency on [[Postillion]] (the ACI card switch owned by [[Interswitch]]) from the Moniepoint card stack entirely.

## Why This Matters

The long-standing Moniepoint MFB strategy has been to reduce Interswitch dependency in order to:
- **Improve uptime** — Postillion outages translate directly into MFB card transaction failures
- **Speed up feature rollouts** — feature velocity is constrained by a vendor-managed platform
- **Unlock direct refunds by transfer** — the legacy [[Card Manager Service]] uses dummy account numbers on Postillion, blocking Interswitch direct refunds today

## Execution

1. **Launch vehicle:** [[Visa]] programme on the new CMS. Visa card management will be the first workload on the new platform — validating the architecture in production on a clean, scheme-native workload.
2. **Progressive migration:** core card management functions (blocking, account-to-card linking, etc.) migrated over time from the legacy [[Card Manager Service]].
3. **Full cut-over:** planned for later in 2026 once stability is confirmed. Phased to minimise disruption.
4. **Production capability consolidation:** card file generation (currently in Sales & Distribution) may also move onto the new CMS. Distribution logistics workflows recommended to stay separate to avoid overloading the CMS.

## Dependencies

- New CMS capability parity with [[Card Manager Service]] core functions
- TeamApt (TMSS) settlement switch production-ready with [[Zenith Bank]] — final commercial stages as of Apr 21 2026 ([[Kevin]] driving)
- Visa programme commercial payment (the primary dependency for Priority 1: Visa Launch)

## Related

- [[Card Management System]] — the new platform
- [[Postillion]] — the dependency being eliminated
- [[Card Manager Service]] — the legacy bridge
- [[Interswitch]] — Postillion's owner
- [[Project Phoenix]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]