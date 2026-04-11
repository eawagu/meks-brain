---
title: Mastercard MPGS Implementation Meeting 2026-04-01
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Meetings\2026-04-01-Mastercard-MPGS-Implementation.md
summary: Frank educated Mastercard counterparts on MoniePoint terminal economics — collections-only (data visibility without routing) preferred over MPGS domestic POS due to hop count and cost penalties.
---

## Summary

MoniePoint routes traffic algorithmically by cost/reliability; ~10% flows through TeamApt. MPGS domestic route (6+ hops) cannot beat NIP route (3 hops). Collections-only path recommended for Mastercard data visibility without disrupting routing. Acquiring license obtained, holding public announcement.

## Key Points

- MPGS domestic POS inefficient: 6+ hops vs NIP 3 hops
- Collections-only recommended for Mastercard data visibility
- Processing code 00→01 cryptographic issue needs ecosystem negotiation
- Verve must be enabled on MPGS; TRL/TRM subscription needed
- Acquiring license obtained, announcement timing TBD

## Entities Mentioned

- [[Frank Atashili]]

## Concepts

- [[MasterCard Integration]]
- [[Transaction Switching Platform]]