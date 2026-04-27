---
title: Cloudflare
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-27T05:49:55Z"
updated: "2026-04-27T05:49:55Z"
summary: Cloudflare — edge layer in TeamApt infrastructure; current visibility limited; full real-time edge monitoring prioritized at Mar 31 MANCo (access constraints + cost barriers flagged).
---

## Overview

Cloudflare is part of [[TeamApt Limited]]'s edge infrastructure layer (alongside [[Nginx]]). Full real-time edge visibility is currently lacking — addressed under the [[Edge Monitoring]] initiative.

## Status (per [[TeamApt MANCo Meeting - 31 March 2026]])

- [[Damilare Ogunnaike]] flagged the visibility gap (most reports based on DB data, not real-time edge).
- [[Tolu Aina]] flagged Cloudflare access constraints; can ship Cloudflare metrics to environment with cost.
- Mitigation proposed: read-only access for SRE team.
- Cloud serves as DR site for [[Outpost]] account-switch infrastructure (per [[Outpost Migration]]).

## Related

- [[Edge Monitoring]]
- [[Nginx]]
- [[Outpost Migration]]
- [[TeamApt MANCo Meeting - 31 March 2026]]