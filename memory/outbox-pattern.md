---
title: Outbox pattern
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:20:42Z"
updated: "2026-04-25T12:20:42Z"
summary: "Distributed-systems pattern — first store message in a database, then poll it to Kafka. Apr 22: proposed as the replacement for the existing requery mechanism on the Disbursement↔CBA integration; reduces reliance on long-waiting requery status checks."
---

## Definition

The **outbox pattern** is a distributed-systems pattern: first store a message in a database (the "outbox" table), then poll it to a downstream channel like [[Kafka]]. This decouples the database transaction from the message-publish step.

## Why proposed for Disbursement↔CBA (Apr 22)

Replaces the requery mechanism. Instead of:

1. Push message to Kafka
2. Wait for response
3. If "unable to locate record," requery (status check) before retrying

The new flow uses:

1. Store message in outbox
2. Poll outbox to Kafka
3. On no-response, **directly repost** (CBA [[Idempotency]] makes this safe)

This reduces reliance on potentially long waiting times associated with requery status checks.

## Sources

- [[Disbursement-CBA Integration Architecture Review - 2026-04-22 19:30 IST]]
