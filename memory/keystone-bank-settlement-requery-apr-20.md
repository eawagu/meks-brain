---
title: Keystone Bank — Settlement Requery Apr 20
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
role: cto-teamapt
accountability: operational-reliability
created: "2026-04-20T07:16:53Z"
updated: "2026-04-20T07:16:53Z"
summary: "Keystone Bank settlement requery issue filed 08:09 WAT Apr 20 via TDSD-6633 by Olamide Ajibulu. 12AM and 5AM settlement batches awaiting requery — different failure class from the multi-bank ATS RC91 pattern. Medium priority, Initial Review. First Keystone settlement issue tracked."
---

[[Keystone Bank]] settlement requery issue raised via [[TDSD-6633]] at 2026-04-20 08:09 WAT by [[Olamide Ajibulu]], Medium priority, Initial Review.

**Nature of issue — distinct from ATS RC91.** Per TDSD-6633 description: *"Settlement for keystone for 12AM is awaiting requery, and 5AM"* — the 12AM and 5AM scheduled settlement batches are both awaiting requery. This is a settlement-batch processing failure, not a real-time transaction failure (RC91 = "Issuer or Switch Inoperative" on live transactions).

**Distinction from Keystone RC05 P1 Apr 17.** Prior [[Keystone Bank — RC05 P1 Apr 17]] was a card-layer RC05 (Do not honor) failure — bank reachable, declining transactions. This new issue is at the **settlement layer** — batches awaiting requery means the post-transaction reconciliation pipeline is stalled. Three distinct Keystone failure tracks now:
1. Card-layer RC05 (Apr 17) — live transaction declines
2. ATS-layer (not yet observed) — real-time transaction routing failures
3. Settlement-layer (Apr 20) — batch reconciliation requery

**Ticket title quirk.** Jira summary reads "KEYSTONE BANK Settlement 91" — the "91" here appears to be either an internal code or artifact of copy-paste from RC91 filing templates. Description body does not reference RC91. Treat as settlement-layer issue, not RC91.

**Briefing-tier classification.** Medium priority, no outage language, no regulatory deadline, settlement layer (not revenue-time-critical). Accumulates for next briefing tick. If requery does not clear within config-salience settlement-silence threshold (not currently defined for this failure class — flag for future directive), escalate.

## Sources
Jira [[TDSD-6633]] filed 2026-04-20 08:09 WAT by [[Olamide Ajibulu]]; heartbeat Skim tick 08:09 WAT Apr 20

## Deltas
- [2026-04-20 08:09 WAT] — Situation created from Skim tick Jira sweep. New Keystone settlement requery issue — distinct failure class from ATS RC91 wave. Briefing-tier accumulation. First settlement-layer issue tracked on Keystone. Factors: source=jira, ticket_priority=medium, new_failure_class, entity_match=keystone_bank, distinct_from_rc91_rc05.
