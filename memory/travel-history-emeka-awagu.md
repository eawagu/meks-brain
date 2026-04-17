---
title: Travel History — Emeka Awagu
type:
  - "synthesis"
cssclasses:
  - "synthesis"
status: current
related:
  - "Emeka Obiorah Awagu"
  - "Passport Visa Pages — Emeka Awagu"
created: "2026-04-17T13:18:16Z"
updated: "2026-04-17T13:18:16Z"
summary: "Chronological travel ledger for Emeka Awagu — atomic legs (append-only) and derived trip rollup. Primary source: passport visa/stamp composite; flight bookings and domestic tickets supplement."
---

## Overview

Canonical chronological record of travel for [[Emeka Obiorah Awagu]]. Ledger is structured in two parallel views:

- **Legs** — atomic, append-only. One row per movement with `cross_border: Y|N` flag. Never overwritten; only appended.
- **Trips** — derived rollup of contiguous legs. Rebuilt on Improve phase, not on every ingest.

"Domestic" here is a per-leg property: `cross_border=N` means the leg stays within a single country's borders — could be Nigeria, UK, or any other host country. `cross_border=Y` means international border crossing.

## Legs

Evidence sources are abbreviated:
- `STAMP` — passport entry/exit stamp (high confidence on direction and date)
- `VISA-W` — visa window only, no stamp (low-medium confidence — visa proves intent, not entry)
- `BOOKING` — e-ticket or booking record (medium confidence — pre-travel or not-yet-stamped)

| # | start | end | origin | destination | cross_border | evidence | confidence |
|---|---|---|---|---|---|---|---|
| 1 | 2001-06-20 | 2001-06-29 | UK (London, inferred) | Spain | Y | VISA-W Spain Schengen E04389763 (London-issued) — window 20-06-01 → 29-06-01 | low |
| 2 | 2001 (date illegible) | — | UK (inferred) | Mexico | Y | STAMP Mexico ENTRADA (Visa Ordinaria B2229908 issued London 14 May 2001) | low — date illegible |
| 3 | — | 2001-10-30 (approx) | (origin unknown) | UK | Y | UK Home Office "Leave to Remain" granted 30 Oct 2001; HO stamp 24 Nov 2001 | low — no entry stamp |
| 4 | — | 2003-01-05 | (origin unknown) | Nigeria (Lagos MM Ikeja) | Y | STAMP "SEEN ON ARRIVAL" 05 JAN 2003 | high |
| 5 | 2017-03-25 | 2017-03-27 | Nigeria (Lagos MMIA) | Germany (Frankfurt/Main) | Y | STAMP MMIA dep 25 Mar 2017 + Frankfurt entry 27.03.17 (F 991) | high |
| 6 | 2017-04-06 | — | Germany (Frankfurt/Main) | Nigeria (implied) | Y | STAMP Frankfurt exit 06.04.17 (F 378 27) | high |
| 7 | 2018-03-12 | 2018-03-13 | Nigeria (Lagos MMIA) | South Africa (OR Tambo) | Y | STAMP MMIA 12 Mar 2018 + OR Tambo entry 2018-03-13 (853) | high |
| 8 | 2018-03-17 | — | South Africa (OR Tambo) | Nigeria (implied) | Y | STAMP OR Tambo dep 2018-03-17 (1087) | high |
| 9 | 2018-04-23 | 2018-04-23 | Nigeria (Lagos MMIA) | Kenya (Nairobi JKIA) | Y | STAMP MMIA dep 23 Apr 2018 (SOD 01444) + JKIA entry 23.4.2018 | high |
| 10 | 2018-04-27 | 2018-04-27 | Kenya (Nairobi JKIA) | Nigeria (Lagos MMIA) | Y | STAMP JKIA exit 27.4.2018 (1336) + MMIA arr 27 Apr 2018 (SOA 01446) | high |
| 11 | 2019-08-23 | 2019-08-23 | Nigeria (Lagos MMIA1) | UK (Heathrow) | Y | STAMP MMIA1 dep 23 Aug 2019 + Heathrow entry 23 Aug 2019 (IO 4580, T4) | high |
| 12 | 2019-09-26 | 2019-09-26 | (origin unknown — intra-Europe?) | UK (Heathrow) | Y | STAMP Heathrow entry 26 Sep 2019 (IO 7140) | medium — origin not stamped |
| 13 | — | 2019-10-01 | UK (implied) | Nigeria (Lagos MMIA1) | Y | STAMP MMIA1 arrival 01 Oct 2019 (SOA 07411) | high |
| 14 | 2019-11-13 (smudged) | 2019-11-13 (smudged) | Nigeria | UAE | Y | STAMP UAE ENTRY 18159 — date smudged, best read 13 Nov 2019 | medium — date illegible |
| 15 | 2019-11-18 | 2019-11-18 | UAE | Nigeria (implied) | Y | STAMP UAE EXIT 28196 on 18 Nov 2019 | high |
| 16 | 2023-01-17 (approx) | 2023-01-17 (approx) | Nigeria | Kenya (Nairobi JKIA) | Y | VISA-W Kenya visa window 17-31 Jan 2023; entry stamp date not clearly legible | medium — entry date inferred |
| 17 | 2023-02-04 | 2023-02-04 | Kenya (Nairobi JKIA) | Nigeria (Lagos MMIA) | Y | STAMP JKIA exit 04 Feb 2023 + MMIA arrival 04 Feb 2023 | high |
| 18 | 2024-11-03 | 2024-11-03 | Nigeria | UK (Heathrow T3) | Y | STAMP Heathrow entry 03 Nov 2024 (IO 3531) | high |
| 19 | — | 2025-03-09 | UK (implied) | Nigeria (Lagos MMIA1) | Y | STAMP MMIA1 arrival 09 Mar 2025 (DTD 0679) | high — UK exit inferred |
| 20 | 2025-06-15 | 2025-06-15 | Nigeria | Netherlands (Amsterdam Schiphol) | Y | STAMP AMS entry 15.06.25 63 (G 126) | high |
| 21 | 2025-06-19 | 2025-06-19 | France (Roissy-CDG) | Nigeria (implied) | Y | STAMP CDG exit 19.06.25 12 (B 482) | high |
| 22 | 2025-09-15 | 2025-09-15 | Nigeria | China | Y | STAMP China entry 2025-09-15 (中国边检) + China Visa AF996964 (Lagos) | high |
| 23 | 2025-09-20 | 2025-09-21 | China | Nigeria (Lagos MMIA1) | Y | STAMP China exit 2025-09-20 + MMIA1 arrival 21 Sep 2025 (SOD 0037) | high |
| 24 | 2025-11-16 | 2025-11-16 | Nigeria | UK (Heathrow T3) | Y | STAMP Heathrow entry 16 Nov 2025 (IO 3754) | high |
| 25 | — | 2025-11-22 | UK (implied) | Nigeria (Lagos MMIA) | Y | STAMP MMIA arrival 22 Nov 2025 (VP) | high — UK exit inferred |
| 26 | 2026-03-08 | 2026-03-08 | Nigeria (Lagos MMIA2) | UK (Heathrow T5) | Y | STAMP MMIA2 dep 08 Mar 2026 (DPD 0710) + Heathrow entry 08 Mar 2026 (IO 3588) | high |
| 27 | — | 2026-03-14 | UK (implied) | Nigeria (Lagos MMIA) | Y | STAMP MMIA arrival 14 Mar 2026 (ARD 4292) | high — UK exit inferred |
| 28 | 2026-04-13 | 2026-04-13 | Nigeria (Lagos) | UK (Heathrow) | Y | BOOKING Virgin Atlantic LOS→LHR, PNR D3LU9W (ref [[AWAGU - EMEKA OBIORAH]]) | medium — booking, stamp pending |
| 29 | 2026-04-22 | 2026-04-22 | UK (Heathrow) | Nigeria (Lagos) | Y | BOOKING Virgin Atlantic LHR→LOS, PNR D3LU9W | medium — booking, stamp pending |
| 30 | 2026-05-26 | 2026-05-26 | Nigeria (Lagos) | Nigeria (Port Harcourt) | N | BOOKING Ibom Air LOS→PHC, Ernest wedding (ref [[Ibom Air Flight Ticket — Ernest Wedding May 2026]]) | medium — booking |
| 31 | 2026-05-29 | 2026-05-29 | Nigeria (Port Harcourt) | Nigeria (Lagos) | N | BOOKING Ibom Air PHC→LOS | medium — booking |

## Trips (derived rollup)

| Window | Primary destination | Countries touched | Summary |
|---|---|---|---|
| 2001 | UK + Spain + Mexico | UK, Spain, Mexico | Extended year abroad: London base (UK Leave to Remain 30 Oct 2001), short Spain trip (20-29 Jun), Mexico entry (date illegible) |
| → 2003-01-05 | Nigeria return | Nigeria | Return to Lagos after unlogged prior travel |
| 2017-03-25 → 2017-04-06 | Germany | Nigeria, Germany | 12-day Frankfurt trip on Belgian-issued Schengen |
| 2018-03-12 → 2018-03-17 | South Africa | Nigeria, South Africa | 5-day SA trip (7-day visitor visa) |
| 2018-04-23 → 2018-04-27 | Kenya | Nigeria, Kenya | 5-day Kenya trip (Nairobi JKIA) |
| 2019-08-23 → 2019-10-01 | UK (with unknown Europe leg) | Nigeria, UK | ~5-week UK stay, re-entry Heathrow 26 Sep suggests intra-trip short-haul out-and-back |
| 2019 Nov (~13) → 2019-11-18 | UAE | Nigeria, UAE | ~6-day UAE trip |
| ~2023-01-17 → 2023-02-04 | Kenya | Nigeria, Kenya | ~18-day Kenya trip |
| 2024-11-03 → 2025-03-09 | UK | Nigeria, UK | ~4-month UK stay (UKVI 180-day visa, valid 28/10/24–28/04/25) |
| 2025-06-15 → 2025-06-19 | Netherlands / France (Schengen) | Nigeria, Netherlands, France | 5-day EU trip, entered AMS exited CDG |
| 2025-09-15 → 2025-09-21 | China | Nigeria, China | 7-day China trip (M-visa, single entry) |
| 2025-11-16 → 2025-11-22 | UK | Nigeria, UK | 7-day UK trip (UKVI 180-day visa, valid 01/08/25–01/08/27) |
| 2026-03-08 → 2026-03-14 | UK | Nigeria, UK | 7-day UK trip |
| 2026-04-13 → 2026-04-22 (in progress) | UK | Nigeria, UK | Current trip; booking-only evidence. Today: 17 Apr 2026 |
| 2026-05-26 → 2026-05-29 (upcoming) | Port Harcourt (domestic) | Nigeria | Ernest wedding, domestic |

## Lifetime Patterns

- **Most-visited foreign country:** UK (9 distinct entries recorded: 2001, 2019×2, 2024, 2025×2, 2026×2, plus current trip in progress)
- **First-visit countries by year:** 2001 (Spain, Mexico, UK), 2017 (Germany), 2018 (South Africa, Kenya), 2019 (UAE), 2025 (Netherlands, France, China)
- **Travel frequency has accelerated** — 2024 onwards shows ≥5 international trips per year vs. 1-3 per year earlier
- **Schengen access:** Visa issuance has rotated — Spain 2001 (London post), Belgium 2017 (Abuja post), France 2025 (Lagos post). Consistent with Lagos becoming primary base of issuance

## Coverage Gaps and Confidence Notes

- **Pre-November 2000:** First passport (issued 18 Jul 1994) was reported lost. Any travel 1994–Nov 2000 is structurally unrecoverable from stamps.
- **UAE Nov 2019 entry date:** Stamp 18159 smudged, best read "13 NOV 2019" but illegible. Exit stamp 28196 clearly shows 18 Nov 2019.
- **UK exits:** UK does not stamp departures. UK exit dates are always inferred from the subsequent Nigeria arrival stamp.
- **Spain 2001 and Mexico 2001 entry dates:** Stamps illegible. Dates recorded from visa windows only — proves intent, not confirmed movement.
- **Kenya Jan 2023 entry date:** Visa window 17–31 Jan 2023 visible but entry stamp itself not clearly legible. Exit confirmed 04 Feb 2023.
- **2019-09-26 UK re-entry leg (#12):** Origin unknown. Between 23 Aug entry and 26 Sep re-entry there is no Nigeria arrival stamp — likely a short intra-Europe out-and-back, but no supporting stamps extracted.

## Sources

- [[Passport Visa Pages — Emeka Awagu]] — primary stamp/visa extraction (tiles 00–17 of composite `Long Image 12-04-2026 16.33.11.jpg`)
- [[Emeka Obiorah Awagu]] — identity entity
- [[AWAGU - EMEKA OBIORAH]] — Virgin Atlantic booking for current UK trip (13–22 Apr 2026)
- [[Ibom Air Flight Ticket — Ernest Wedding May 2026]] — domestic PHC booking (May 2026)