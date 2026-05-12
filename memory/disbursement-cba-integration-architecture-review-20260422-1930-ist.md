---
title: Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST
type:
  - "source"
cssclasses:
  - "source"
source_path: Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST - Notes by Gemini.docx
retention_label: postgres
retention_rationale: Architecture-level engineering review with 5 ALIGNED decisions reshaping disbursement-CBA integration (requery API removal, configurable response codes, Rate Finance adoption); structural design context with Kafka partitioning trade-offs, idempotency analysis, and outbox-pattern proposal that future retrieval will need.
meeting_date: 2026-04-22
created: "2026-05-12T10:56:38Z"
updated: "2026-05-12T10:56:38Z"
summary: "Disbursement-CBA architecture review 2026-04-22 19:30 IST — removed requery API in favor of direct retry leveraging CBA idempotency; configurable response-code framework; adopt Rate Finance for curve; Kafka partitioning trade-off (merchant-key vs null-key) deferred pending metrics."
---

## Summary

Disbursement-CBA architecture review on 2026-04-22 19:30 IST — follow-up to the morning [[Disbursement Issues & Next steps - 2026_04_22 11_25 WAT|disbursement issues meeting]]. [[Muhammad Toqeer]] walked through MIS (Modify Atlas Integration Service) flow: sync-over-async orchestration where MIS publishes debit-source to Kafka and blocks thread on Redis key awaiting CBA response. Architecture simplified by eliminating requery API in favor of direct reposting (outbox pattern), leveraging existing [[CBA]] idempotency (duplicate-transaction response code). Kafka partitioning trade-off (merchant-key sequential vs null-key parallel) preserved pending impact metrics. Configurable response-code framework adopted. Rate Finance curve adopted (abandons 'Week'). Timeline deferred pending engineering brainstorm.

## Key Points

- **Disbursement transaction = 3 steps**: debit source (merchant source → transit account), transfer (transit → destination), async settlement (fees etc.)
- **Sync-over-async orchestration**: MIS publishes debit-source message to Kafka and blocks thread; CBA consumes, returns 00, MIS unblocks via Redis key, executes transfer leg
- **CBA returns "duplicate transaction"** on second post — idempotency at CBA is the foundation for retry simplification
- **Original 10-min timeout was extended to 24h** for requery — planned for reduction; depends on CBA SLA
- **Failed debit source (e.g., 05)** = no reversal needed (merchant never debited); merchant retries
- **Reversal flow** = only when debit-source succeeded but transfer leg failed
- **Current partitioning** = merchant account number as key on debit source → sequential per merchant; reduces 06 errors; consumer lag on high-volume merchants (e.g., one at 117 txn/min)
- **CBA team's alternative** = null key on both legs for parallelism; higher 06 failure rate; needs impact metrics first
- **Error-code categorization** (retry vs reversal vs fail) needs business/leadership approval before reversal goes live
- **Configurable response codes** so future CB communications about new codes don't require code changes
- **Reference reuse** on retries (no regeneration) — using existing team references
- **Deployment caution**: Muhammad Toqeer insisted on rigorous multi-day staging testing (feature + load + response-mapping confirmation); ASAP/1-2 day timelines rejected

## ALIGNED Decisions

1. **Requery API removal** — architecture changes to remove requery API entirely; direct retry leverages CBA idempotency
2. **Adoption of Rate Finance** — abandon 'Week'; adopt Rate Finance for curve implementation (only successful txns matter on CBS side)
3. **Strategy for retry references** — do not regenerate references; use existing references
4. **Configurable architecture approach** — retry system built as configurable framework, not hard-coded business logic
5. **Deferral of timeline commitment** — internal engineering brainstorm to produce realistic implementation schedule

## NEEDS FURTHER DISCUSSION

- **Error code handling approval** — transaction error handling and reversal logic require further definition and formal business leadership approval before implementation
- **Kafka partitioning strategy maintenance** — current merchant-key strategy maintained pending impact metrics that will inform potential switch to null-key distribution

## Next Steps

- [[Muhammad Toqeer]] — confirm CBA policy for duplicate reversal transactions
- [[Prateek Gupta]] — collect Kafka partitioning impact metrics on high-volume merchants and SLAs
- The group — implement configurable response-code list (read from external config, not hardcoded)
- [[Muhammad Toqeer]] + [[Prateek Gupta]] — propose realistic implementation timeline

## Entities Mentioned

People: [[Muhammad Toqeer]], [[Prateek Gupta]], [[Ravi Veluguleti]], [[Damilare Ogunnaike]], [[Temitayo Akinmola]], [[Muhammad Samu]], [[Emeka Awagu]], [[Benjamin Ononogbu]]

Systems: [[CBA]], [[CBS]], [[MIS]] (Modify Atlas Integration Service), [[Kafka]], [[Redis]], [[Disbursement service]]

Organizations: [[TeamApt]], [[Moniepoint]]

## Concepts

- [[Disbursement reliability]]
- [[Outbox pattern]]
- [[CBA idempotency]]
- [[Requery API removal]]
- [[Configurable response codes]]
- [[Kafka partitioning strategy]]
- [[Rate Finance curve]]
- [[Sync-over-async orchestration]]
- [[Retry mechanism design]]