---
title: Edge Monitoring
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-27T05:49:52Z"
updated: "2026-04-27T05:49:52Z"
summary: Real-time edge monitoring initiative for TeamApt — prioritizing visibility into Cloudflare/Nginx layer; current reports based on database data, not real-time edge; access constraints + cost barriers; assigned to Damilare Ogunnaike with urgency from Ibukun Atoyebi.
---

## Overview

Edge Monitoring is the initiative to give [[TeamApt Limited]] full real-time visibility into the network edge layer ([[Cloudflare]], [[Nginx]]) rather than relying on database-derived after-the-fact reports.

## Status (per [[TeamApt MANCo Meeting - 31 March 2026]])

- **Gap identified by [[Damilare Ogunnaike]]:** "Most reports based on database data; full real-time edge visibility (Cloudflare, Nginx) lacking."
- **Cost / access constraint flagged by [[Tolu Aina]]:** Cloudflare access constraints; can ship Cloudflare metrics to environment with cost.
- **Proposed mitigation:** read-only access to SRE team.
- **Direction:** [[Ibukun Atoyebi]] said "drive with urgency."

## Action items from MANCo

- [[Oladapo Onayemi]]: schedule sync call on tools needed for edge monitoring implementation.
- [[Damilare Ogunnaike]]: drive edge monitoring with the group (Makers end, [[Project Phoenix]]).

## Related

- [[Cloudflare]]
- [[Nginx]]
- [[Project Phoenix]]
- [[TeamApt MANCo Meeting - 31 March 2026]]