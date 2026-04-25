---
title: "Disbursement-CBA Integration Architecture Review - 2026-04-22 19:30 IST"
type:
  - "source"
cssclasses:
  - "source"
source_path: Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST - Notes by Gemini.md
retention_label: postgres
retention_rationale: Deep architectural review of TeamApt Disbursement↔CBA integration via the Modify Atlas Integration Service (MIS). Includes the rationale for removing the requery API in favor of direct retry on idempotent CBA, outbox-pattern proposal, Kafka partitioning trade-offs (merchant-key sequential vs null-key concurrent), Rate Finance curve adoption, and configurable response-code framework. Future retrieval likely — referenced by post-implementation reviews, CBA SLA negotiations, similar architecture patterns in adjacent integrations.
created: "2026-04-25T12:17:27Z"
updated: "2026-04-25T12:17:27Z"
summary: "2026-04-22 19:30 IST Disbursement\u2194CBA integration architecture review (owner Prateek Gupta). Aligned: requery API removed (CBA idempotency makes direct retry safe); Rate Finance adopted over Week for the curve; existing references reused for retries; configurable response-code framework; deployment timeline deferred for engineering brainstorm. Open: error-code business sign-off; Kafka partitioning (merchant-key vs null-key) trade-off pending impact metrics."
---

## Summary

Architectural review of the [[Disbursement service]] \u2194 [[CBA]] (Core Banking Application) integration on 2026-04-22 19:30 IST. Owner: [[Prateek Gupta]]. Attendees: [[Muhammad Toqeer]], [[Temitayo Akinmola]], [[Muhammad Samu]], [[Emeka Awagu]], [[Prateek Gupta]], [[Damilare Ogunnaike]], [[Ravi Veluguleti]], [[Benjamin Ononogbu]].

The session walked through current disbursement transaction flow (debit-source \u2192 transfer \u2192 async settlement), failure modes, and architectural simplifications. Five **aligned** decisions were taken on requery elimination, Rate Finance adoption, retry-reference strategy, configurable framework, and deferred timeline. Two open items: error-code business sign-off and Kafka partitioning data collection.

## Architecture Walkthrough

### Disbursement Transaction Flow

The disbursement transaction is managed by the [[Modify Atlas Integration Service]] (MIS) and involves three steps:

1. **Debit source** \u2014 money moves from merchant source account to transit account.
2. **Transfer** \u2014 funds move to the destination account.
3. **Async settlement** \u2014 funds move for fees and related items (asynchronous, separate thread).

Response is sent to the disbursement service after the transfer step completes; settlement and reversals happen asynchronously.

### Successful Flow

- Disbursement service \u2192 MIS.
- MIS publishes debit-source message and **blocks the thread**, simulating synchronous behaviour over async Kafka, waiting for response.
- CBA consumes message, performs the transaction, pushes success response code (00).
- MIS unblocks, proceeds to transfer step.
- After transfer completes, thread is released and MIS asynchronously publishes settlement message in a separate thread.

### Failure modes

- **Kafka post failure** (MIS unable to post debit-source message) \u2192 transaction enters pending state; "in progress" returned to merchant. Originally designed with 10-min timeout; **currently configured to 24h** (planned reduction).
- **Debit source failure** (e.g., 05 from CBA \u2014 account restriction, insufficient balance) \u2192 no reversal needed (merchant not debited); failed response immediately returned; merchant retries.
- **Transfer step failure** (after successful debit source, e.g., 05 from CBA on transfer leg) \u2192 failed response to merchant + asynchronous reversal flow triggered.
- **Reversal API failure** \u2014 currently retried via requery flow; CBA returns "duplicate transaction" if reversal attempted twice (idempotency).

### Idempotency Insight (key)

CBA has an idempotency check \u2014 same transaction message posted twice returns "duplicate transaction" code on the second attempt. This means **requery (status check before retry) is unnecessary** \u2014 we can repost directly because CBA's idempotency prevents double-execution.

## Decisions (ALIGNED)

- **Requery API removed** \u2014 architecture changes to remove the 'requery' API call entirely; shift to **direct retry** approach leveraging CBA idempotency. Replace requery with **outbox-pattern** message reposting.
- **Adoption of Rate Finance** \u2014 abandon 'Week' and adopt Rate Finance for the curve implementation (only successful transactions matter on the CBS side).
- **Retry references** \u2014 do **not regenerate** references for retries; **reuse existing references** (Damilare Ogunnaike clarification, Muhammad Toqeer confirmation).
- **Configurable architecture** \u2014 retry system built as a configurable framework rather than hard-coded business logic. Response codes read from external list, not hardcoded \u2014 future CBA-side response-code communications should not necessitate code changes.
- **Deferred timeline commitment** \u2014 defer setting deployment timeline to allow internal engineering brainstorm and develop a realistic implementation schedule. Friday-night deployment was concerning; rigorous testing required (feature, load, response-mapping/retry confirmation; sign-off due to dangerous approach).

## Decisions (NEEDS FURTHER DISCUSSION)

- **Error code handling approval** \u2014 transaction error handling and reversal logic require further definition and formal **business leadership approval** before implementation. Currently identified by dev team in CBA discussions; business approval required to define which codes mandate success / retry (pending) / failure / reversal.
- **Kafka partitioning strategy maintenance** \u2014 current strategy maintained pending **impact-metric collection**; future evaluation of switch to null-key distribution dependent on metrics.

## Kafka Partitioning Trade-off (Detail)

**Current strategy** (debit source): merchant account number as partition key \u2014 all transactions for a single merchant go to one partition. Ensures sequential execution; reduces 06 errors. Drawback: causes consumer lag and processing delays for high-volume merchants (one merchant processing 117 tx/min has all processing serialized through a single consumer).

**Alternative strategy** (proposed by CBA team): null key for both debit-source and transfer steps \u2014 distributes transactions across all available partitions; faster processing. Drawback: increased concurrency \u2192 higher 06 failure rates necessitating immediate retries.

**Trade-off**: transaction completion time vs success rate. Data on affected merchants must be collected before considering implementation; long-term alternative.

## Reversal Flow Subtlety

For reversal API call failures, CBA returns "duplicate transaction" if reversal attempted twice (per staging tests) \u2014 prevents double reversal. Therefore **skip requery for reversal failures**; directly attempt to retry the API call. This realisation triggered the broader question of whether requery is necessary for actual transfers either, leading to the requery-removal decision above.

## Next Steps (action owners)

- [[Muhammad Toqeer]] \u2014 obtain confirmation regarding CBA policy for handling duplicate reversal transactions.
- [[Prateek Gupta]] \u2014 collect numbers detailing effects of current Kafka partitioning strategy on high-volume merchants and SLAs.
- The group \u2014 implement code making response codes configurable; read response codes as an external list (no hardcoding).
- [[Muhammad Toqeer]], [[Prateek Gupta]] \u2014 think about implementation; propose a realistic timeline.

## Entities Mentioned

People: [[Muhammad Toqeer]], [[Temitayo Akinmola]], [[Muhammad Samu]], [[Emeka Awagu]], [[Prateek Gupta]], [[Damilare Ogunnaike]], [[Ravi Veluguleti]], [[Benjamin Ononogbu]]

Systems: [[Modify Atlas Integration Service]] (MIS), [[Disbursement service]], [[CBA]] (Core Banking Application), [[Kafka]]

System: [[Gemini]]

## Concepts

- [[Idempotency]]
- [[Outbox pattern]]
- [[Kafka partitioning]]
- [[Requery elimination]]
- [[Configurable response codes]]
- [[Rate Finance curve]]
