---
title: MasterCard Connection and Network Management
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\02-connection-and-network-management.md
summary: Technical specification for MIP connection management — sign-on/sign-off protocols, PEK exchange, session management, store-and-forward (SAF), connection requirements (dual-port mandatory), and error handling/recovery procedures.
---

## Summary

Second in the [[MasterCard]] technical specification series. Covers the foundational protocols for CPS-to-MIP connections: sign-on/sign-off (08xx messages), PIN Encryption Key (PEK) exchange procedures, session management, mandatory dual-port redundancy, Store-and-Forward (SAF) mechanism for handling connectivity failures, administrative messages (06xx), and error handling/recovery procedures.

## Key Points

- All connections require explicit sign-on before transaction processing; network management uses 08xx message series
- PEK exchange mandatory before any PIN-based transactions
- Dual-port (primary/backup) connections mandatory for resilience
- Store-and-Forward (SAF) queues financial messages during connectivity loss and replays when connection restores
- Administrative messages (06xx) for file transfers, configuration updates, and operational notifications
- Error handling covers timeout management, duplicate detection, and connection recovery

## Entities Mentioned

- [[MasterCard]]

## Concepts

- [[Transaction Switching]] — MIP connection lifecycle and network management protocols