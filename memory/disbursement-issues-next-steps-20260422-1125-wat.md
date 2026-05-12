---
title: Disbursement Issues & Next steps - 2026_04_22 11_25 WAT
type:
  - "source"
cssclasses:
  - "source"
source_path: Disbursement Issues & Next steps – 2026_04_22 11_25 WAT – Notes by Gemini.docx
retention_label: postgres
retention_rationale: High-stakes operational meeting on Moniepoint disbursement reliability — 16 ALIGNED decisions, 26 next-step actions with named owners, root-cause analysis of CBA 06 error, retry mechanism design, batch-processing strategy for 12k records, dashboard requirements. Many small numeric details (record counts, batch sizes, sleep durations, error codes) that the summary necessarily compresses; future retrieval likely.
meeting_date: 2026-04-22
created: "2026-05-12T10:53:32Z"
updated: "2026-05-12T10:53:32Z"
summary: Apr 22 Disbursement Issues meeting — 17 ALIGNED decisions on dashboards, retry mechanism, batch reprocessing of 12k records; CBA 06 error root cause investigation; reversal correctness gaps; CS messaging protocol on erroneous debits.
---

## Summary

Disbursement Issues & Next Steps meeting on 2026-04-22 11:25 WAT — cross-functional (Engineering, Operations, Customer Support, Integrations) addressing widespread transaction failures and pending queues on the [[Moniepoint]] disbursement stack. Disbursement success rate reportedly >98%; primary issues are failed transactions not reversed and long-pending transactions. Engineering implementing a retry mechanism with mapped CBA response codes (replacing trial-and-error) and pausing further reversals until CBA 06 error root cause is identified. Team adopted batch-processing strategy for 12,000 failed records (3,000 → 1,500 → 500 → 100-record batches with time gaps). 17,000+ records reversed (Apr 10–20); ~464 await Head-of-Engineering DB-update approval.

## Key Points

- Disbursement success rate reportedly >98%; failures concentrated in long-pending + unreversed-failed
- 17,000+ failed records reversed (Apr 10–20); ~464 await direct DB-update approval from Head of Engineering
- 12,000 records to be reprocessed; debit-source reversal references the focus; <500 MFD-only-reference reversals deferred
- CBA 06 / CD06 error blocks reversals; risk of zero-sum error if 12k reposted before root cause identified
- System misinterprets reversal status by querying original-transaction endpoint, not reversal-specific endpoint — "reversal" tag in reference is the only differentiator
- Loki confirmed as accurate dashboard data source (correct Grafana source identified as "click house"; provider code 999)
- Journal-entry table is source of truth but experiences lag
- Status page (April 16 stale message) was still displaying on Apr 22 — [[Emmanuel Eke]] acknowledged oversight
- Customer Support had been incorrectly asking merchants for transaction references; protocol now: explain auto-reversal from system glitches; merchants can dispute with evidence
- Retry mechanism: configurable retry for consumer lag; maps all CBA states + exponential retry on "unable to find report"; review session at 3 PM same day
- Engineering review discipline: sequence diagram MUST be reviewed before implementation — no trial-and-error

## ALIGNED Decisions

1. Customer support response protocol: explain erroneous debits as auto-reversals from specific system glitches; merchants can provide evidence for review
2. Disbursement dashboard requirements: daily counts of failed-non-reversed + pending, plus lookup-by-reference
3. Dashboard implementation review breakout session required
4. Retry mechanism design review policy: sequence-diagram review before implementation
5. Loki confirmed as dashboard data source
6. Reversal + pending dashboards: two sections each (transaction status; merchant account journal entries)
7. Reversal retry process paused until root cause identified
8. Transaction posting of remaining 12k deferred until CBA 06 error resolved
9. CBA reversal status update strategy: update 12k failed records to 'pending' using debit source reference
10. Batch processing strategy: 12k in batches of 3,000
11. Script execution delay mechanism: sleep commands between blocks for CBA processing time
12. Grafana panels reverted to hourly + daily (historical visibility)
13. Batch processing adopted for reversal transactions
14. Dashboard refresh interval: 5 minutes
15. Batch execution strategy updated to eliminate sleep commands
16. Reversal update processing: split large batches into multiple smaller update statements to bypass concurrency locks
17. Non-debit source record handling deferred (NEEDS DISCUSSION) until primary debit-source batch completes

## Next Steps (owners)

- [[Ayorinde Odunlami]] — relay current disbursement status to Customer Support team
- [[Emmanuel Eke]], [[Benjamin Ononogbu]], [[Emmanuel Olatunbosun]] — build dashboard (daily failed-non-reversed + pending counts, lookup tool)
- [[Muhammad Samu]] — confirm 4-day-old transaction merchant inquiry status
- [[Muhammad Toqeer]] — integrate retry mechanism into disbursement service using mapped CBA response codes
- [[Prateek Gupta]], [[Muhammad Toqeer]] — sequence diagram for 2 retry flow designs
- [[Prateek Gupta]], [[Muhammad Toqeer]], [[Ravi Veluguleti]], [[Muhammad Samu]], [[Temitayo Akinmola]] — 3 PM review meeting
- [[Emmanuel Olatunbosun]] — obtain log access permissions
- [[Benjamin Ononogbu]] — investigate reversal API root cause; report findings in 30 min; query [[PCB]] for unsuccessful reversal reasons; change posting logic for code 06 duplicates; send transaction filter query
- [[Emmanuel Eke]] — build reversal + pending dashboards (MoneyBuy txn status, merchant account status, journal entries)
- [[Dominic Usiabulu]] — split 3000-record file into 1500 blocks; get Ravi/duty approval for new reprocessing ticket; find Grafana log source; develop stored procedure for auto-reversal via Loki refs; create new support ticket; share 700 updated CBA reversal request records with Benjamin
- [[Opeyemi Ahmed]] — monitor processing until pending=0; split 3,000-record update into 2–3 smaller statements
- The group — correct dashboard view (hourly + daily); optimize reversals with reduced batch counts; implement retry mechanism

## Key Numbers

- 17,000+ records reversed (Apr 10–20)
- ~464 pending Head-of-Engineering DB approval
- 12,000 records to reprocess (target debit-source references)
- <500 MFD-only reversals deferred
- Batches: 3,000 → 1,500 → 500 → 100 records, with 30s/5min sleep gaps initially (later eliminated)
- 6,200 → 7,000 → 9,275 running unreversed counts during call
- 700 updated CBA reversal request records shared
- Dashboard refresh: 5 min
- Provider code: 999
- Error code: CBA 06 / CD06

## Entities Mentioned

People: [[Damilare Ogunnaike]], [[Emmanuel Eke]], [[Benjamin Ononogbu]], [[Emmanuel Olatunbosun]], [[Muhammad Toqeer]], [[Prateek Gupta]], [[Ravi Veluguleti]], [[Muhammad Samu]], [[Ayorinde Odunlami]], [[Temitayo Akinmola]], [[Dominic Usiabulu]], [[Opeyemi Ahmed]], [[Raphael Agbojo]], [[Chinonyerem Alozie]]

Systems: [[CBA]], [[Loki]], [[Grafana]], [[MoneyBuy]], [[Atlas]], [[Rico]], [[Disbursement service]]

Organizations: [[Moniepoint]], [[TeamApt]], [[PCB]]

## Concepts

- [[Disbursement reliability]]
- [[CBA 06 error]]
- [[Reversal status correctness]]
- [[Retry mechanism design]]
- [[Batch reprocessing strategy]]
- [[Customer support messaging protocol]]
- [[Dashboard data source accuracy]]
- [[Sequence diagram review discipline]]