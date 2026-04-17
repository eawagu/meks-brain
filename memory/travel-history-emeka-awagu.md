---
type:
  - "synthesis"
title: Travel History — Emeka Awagu
status: current
created: "2026-04-17T13:18:16Z"
related:
  - "Emeka Obiorah Awagu"
  - "Passport Visa Pages — Emeka Awagu"
  - "Travel Dates — Personal Record (Emeka Awagu)"
summary: "Chronological travel ledger for Emeka Awagu — atomic legs (append-only) and derived trip rollup. Primary source: passport visa/stamp composite; flight bookings and domestic tickets supplement."
updated: "2026-04-17T20:37:47Z"
cssclasses:
  - "synthesis"
---

## Overview

Canonical chronological record of travel for [[Emeka Obiorah Awagu]]. Ledger is structured in two parallel views:

- **Legs** — atomic, append-only. One row per movement with `cross_border: Y|N` flag. Row identity immutable (new discoveries append at end, retaining chronological order only within the initial extraction); evidence/date cells refined in place as new stamps or records confirm.
- **Trips** — derived rollup of contiguous legs. Rebuilt on Improve phase, not on every ingest. Country cell = user's destination; Schengen transit and intra-Schengen side-stays live in the Summary cell, not as their own Trips rows.

"Domestic" here is a per-leg property: `cross_border=N` means the leg stays within a single country's borders — could be Nigeria, UK, or any other host country. `cross_border=Y` means international border crossing.

## Legs

Evidence sources are abbreviated:
- `STAMP` — passport entry/exit stamp (high confidence on direction and date)
- `VISA-W` — visa window only, no stamp (low-medium confidence — visa proves intent, not entry)
- `BOOKING` — e-ticket or booking record (medium confidence — pre-travel or not-yet-stamped)
- `FEE` — fee / revenue / cashier stamp (medium — proves presence but not port-of-entry)
- `USER-LOG` — user's personal travel record (e.g., [[Travel Dates — Personal Record (Emeka Awagu)]]) — medium confidence (date-precise recall but not stamp-verified)
- `INVITATION` — formal invitation / visa-application supporting letter with explicit dates (low-medium — proves intent and planned window, does not prove entry)

| # | start | end | origin | destination | cross_border | evidence | confidence |
|---|---|---|---|---|---|---|---|
| 1 | 2001-06-20 | 2001-06-29 | UK (London, inferred) | Spain | Y | VISA-W Spain Schengen E04389763 (London-issued) — window 20-06-01 → 29-06-01 | low |
| 2 | 2001-06-13 (approx) | 2001-06-19 (inferred) | UK (London, inferred) | Mexico | Y | STAMP Mexico ENTRADA (Visa Ordinaria B2229908, London 14 May 2001, 45 days) + FEE CAJA receipt 13/06/01 $6.20 (serial TO 522935 01) + Spain visa window 20-29 Jun 2001 constrains end | medium — fee stamp confirms presence 13 Jun 2001; end inferred from pre-Spain requirement |
| 3 | — | 2001-10-30 (approx) | (origin unknown) | UK | Y | UK Home Office "Leave to Remain" granted 30 Oct 2001; HO stamp 24 Nov 2001 (legible) | low — 24 Nov stamp confirms presence, not arrival |
| 4 | — | 2003-01-05 | (origin unknown) | Nigeria (Lagos MM Ikeja) | Y | STAMP "SEEN ON ARRIVAL" 05 JAN 2003 | high |
| 5 | 2017-03-25 | 2017-03-27 | Nigeria (Lagos MMIA) | Germany (Frankfurt/Main) | Y | STAMP MMIA dep 25 Mar 2017 (SOD 01430) + Frankfurt entry 27.03.17 (F 991) | high |
| 6 | 2017-04-06 | — | Germany (Frankfurt/Main) | Nigeria (implied) | Y | STAMP Frankfurt exit 06.04.17 (F 378 27) | high |
| 7 | 2018-03-12 | 2018-03-13 | Nigeria (Lagos MMIA) | South Africa (OR Tambo) | Y | STAMP MMIA 12 Mar 2018 + OR Tambo entry 2018-03-13 (853) | high |
| 8 | 2018-03-17 | — | South Africa (OR Tambo) | Nigeria (implied) | Y | STAMP OR Tambo dep 2018-03-17 (1087) | high |
| 9 | 2018-04-23 | 2018-04-23 | Nigeria (Lagos MMIA) | Kenya (Nairobi JKIA) | Y | STAMP MMIA dep 23 Apr 2018 (SOD 01444) + JKIA entry 23.4.2018 | high |
| 10 | 2018-04-27 | 2018-04-27 | Kenya (Nairobi JKIA) | Nigeria (Lagos MMIA) | Y | STAMP JKIA exit 27.4.2018 (1336) + MMIA arr 27 Apr 2018 (SOA 01446) | high |
| 11 | 2019-08-23 | 2019-08-23 | Nigeria (Lagos MMIA1) | UK (Heathrow) | Y | STAMP MMIA1 dep 23 Aug 2019 + Heathrow entry 23 Aug 2019 (IO 4580, T4) | high |
| 12 | 2019-09-26 | 2019-09-26 | Nigeria | UK (Heathrow) | Y | STAMP Heathrow entry 26 Sep 2019 (IO 7140) + USER-LOG Travel Dates.xlsx (26 Sep 2019 UK arrival, Personal — Brother's Wedding) — origin re-classified from "intra-Europe?" to Nigeria per user record | high |
| 13 | — | 2019-10-01 | UK (implied) | Nigeria (Lagos MMIA1) | Y | STAMP MMIA1 arrival 01 Oct 2019 (SOA 07411) | high |
| 14 | 2019-11-14 | 2019-11-14 | Nigeria | UAE | Y | STAMP UAE ENTRY 18159 — date smudged at day level + USER-LOG Travel Dates.xlsx (14 Nov 2019 UAE arrival, Interswitch company-sponsored event) corroborates session 59 physical-logic inference | high — corroborated by user personal record |
| 15 | 2019-11-18 | 2019-11-18 | UAE | Nigeria (implied) | Y | STAMP UAE EXIT 28196 on 18 Nov 2019 | high |
| 16 | 2023-01-31 | 2023-01-31 | Nigeria | Kenya (Nairobi JKIA) | Y | VISA-W Kenya visa window 17-31 Jan 2023 + USER-LOG Travel Dates.xlsx (31 Jan 2023 Kenya arrival, Hydrogen business trip) — visa used on final valid day | high — corroborated by user personal record |
| 17 | 2023-02-04 | 2023-02-04 | Kenya (Nairobi JKIA) | Nigeria (Lagos MMIA) | Y | STAMP JKIA exit 04 Feb 2023 (clear) + MMIA arrival 04 Feb 2023 (clear) | high |
| 18 | 2024-11-03 | 2024-11-03 | Nigeria (Lagos MMIA1) | UK (Heathrow T3) | Y | STAMP Nigeria MMIA1 SOD dep 03 Nov 2024 + Heathrow entry 03 Nov 2024 (IO 3531, T3) + USER-LOG Travel Dates.xlsx | high |
| 19 | 2025-03-09 | 2025-03-09 | Nigeria (Lagos MMIA1) | UK (implied) | Y | STAMP MMIA1 departure 09 Mar 2025 (DTD 0679) — direction re-classified from arrival to departure per user record (DTD code treated as officer/desk identifier, not direction indicator) + USER-LOG Travel Dates.xlsx (9 Mar 2025 UK arrival, TeamApt business trip) | high — corroborated by user personal record |
| 20 | 2025-06-15 | 2025-06-15 | Nigeria | Netherlands (Amsterdam Schiphol) | Y | STAMP AMS entry 15.06.25 63 (G 126) — Schengen port-of-entry; actual destination was Spain per user record | high |
| 21 | 2025-06-19 | 2025-06-19 | France (Roissy-CDG) | Nigeria (implied) | Y | STAMP CDG exit 19.06.25 12 (B 482) — Schengen port-of-exit (KLM); actual origin was Spain per user record | high |
| 22 | 2025-09-15 | 2025-09-15 | Nigeria | China | Y | STAMP China entry 2025-09-15 (中国边检) + China Visa AF996964 (Lagos) + USER-LOG Travel Dates.xlsx | high |
| 23 | 2025-09-20 | 2025-09-21 | China | Nigeria (Lagos MMIA1) | Y | STAMP China exit 2025-09-20 + MMIA1 arrival 21 Sep 2025 (SOD 0037) + USER-LOG Travel Dates.xlsx | high |
| 24 | 2025-11-16 | 2025-11-16 | Nigeria | UK (Heathrow T3) | Y | STAMP Heathrow entry 16 Nov 2025 (IO 3754) + USER-LOG Travel Dates.xlsx | high |
| 25 | — | 2025-11-22 | UK (implied) | Nigeria (Lagos MMIA) | Y | STAMP MMIA arrival 22 Nov 2025 (VP) | high — UK exit inferred |
| 26 | 2026-03-08 | 2026-03-08 | Nigeria (Lagos MMIA2) | UK (Heathrow T5) | Y | STAMP MMIA2 dep 08 Mar 2026 (DPD 0710) + Heathrow entry 08 Mar 2026 (IO 3588) | high |
| 27 | — | 2026-03-14 | UK (implied) | Nigeria (Lagos MMIA) | Y | STAMP MMIA arrival 14 Mar 2026 (ARD 4292) | high — UK exit inferred |
| 28 | 2026-04-13 | 2026-04-13 | Nigeria (Lagos) | UK (Heathrow) | Y | BOOKING Virgin Atlantic LOS→LHR, PNR D3LU9W (ref [[AWAGU - EMEKA OBIORAH]]) | medium — booking, stamp pending |
| 29 | 2026-04-22 | 2026-04-22 | UK (Heathrow) | Nigeria (Lagos) | Y | BOOKING Virgin Atlantic LHR→LOS, PNR D3LU9W | medium — booking, stamp pending |
| 30 | 2026-05-26 | 2026-05-26 | Nigeria (Lagos) | Nigeria (Port Harcourt) | N | BOOKING Ibom Air LOS→PHC, Ernest wedding (ref [[Ibom Air Flight Ticket — Ernest Wedding May 2026]]) | medium — booking |
| 31 | 2026-05-29 | 2026-05-29 | Nigeria (Port Harcourt) | Nigeria (Lagos) | N | BOOKING Ibom Air PHC→LOS | medium — booking |
| 32 | 2019-08-27 (approx) | — | UK (Heathrow, implied) | Nigeria (Lagos, implied) | Y | USER-LOG Travel Dates.xlsx (UK trip 23-27 Aug 2019, Interswitch company-sponsored event); no Nigeria arrival stamp found on composite | medium — user-record only |
| 33 | 2024-11-10 (approx) | — | UK (Heathrow, implied) | Nigeria (Lagos, implied) | Y | USER-LOG Travel Dates.xlsx (UK trip 3-10 Nov 2024, TeamApt business, 7 days); no Nigeria arrival stamp found on composite | medium — user-record only |
| 34 | 2025-03-18 (approx) | — | UK (Heathrow, implied) | Nigeria (Lagos, implied) | Y | USER-LOG Travel Dates.xlsx (UK trip 9-18 Mar 2025, TeamApt business, 10 days); no Nigeria arrival stamp found on composite | medium — user-record only |
| 35 | 2026-06-30 (planned) | — | Nigeria (implied) | France (Paris, CDG/ORY implied) | Y | INVITATION [[Visa Europe Limited]] letter for [[Visa Payments Forum Paris]] 30 Jun – 2 Jul 2026 (ref [[invitation letter - VISA Payments Forum Paris 2026 - Emeka Awagu]]); [[French Schengen visa application]] in progress; no flights booked yet | low — invitation only, visa + booking pending |
| 36 | — | 2026-07-02 (planned) | France (Paris, implied) | Nigeria (implied) | Y | INVITATION — conference end date; return leg inferred from event window | low — invitation only, visa + booking pending |

## Trips (derived rollup)

Country cell carries user's destination (primary stay). Schengen transit stops and intra-Schengen side-stays are captured in Summary, not as separate Trips rows. Reason format: `{tag} — {detail}` where tag ∈ {business, personal, education, transit} and detail is free text (optional).

| Year | Country | Arrival | Departure | Reason | Company | Summary |
|---|---|---|---|---|---|---|
| 2001 | UK | (pre-Mexico, unknown) | (end unknown — spans the year) | ? | ? | London base throughout 2001; Leave to Remain granted 30 Oct 2001; Home Office stamp 24 Nov 2001 |
| 2001 | Mexico | 2001-06-13 | 2001-06-19 (inferred) | ? | ? | Sub-trip from London base; CAJA fee stamp confirms presence 13 Jun; end inferred from Spain visa start 20 Jun |
| 2001 | Spain | 2001-06-20 | 2001-06-29 | ? | ? | Sub-trip from London base; Schengen window (London-issued visa); no entry/exit stamps on composite |
| 2003 | Nigeria (base re-established) | 2003-01-05 | (ongoing from here) | ? | ? | Return to Lagos after unlogged prior travel |
| 2017 | Germany & Belgium | 2017-03-27 | 2017-04-06 | business | Interswitch | Frankfurt stamps entry/exit; Belgium visited overland from Germany (intra-Schengen, no separate stamps or dates). Belgian-issued Schengen visa (Abuja) |
| 2018 | South Africa | 2018-03-13 | 2018-03-17 | business — conference | Interswitch | OR Tambo entry/exit; 7-day visitor visa DHA-1635A |
| 2018 | Kenya | 2018-04-23 | 2018-04-27 | business | Interswitch | JKIA entry/exit; single-journey visa SAA 0657465 |
| 2019 | UK | 2019-08-23 | ~2019-08-27 | business — company-sponsored event | Interswitch | 4 days; Heathrow entry stamped; Nigeria-return stamp missing from composite (date from user personal record) |
| 2019 | UK | 2019-09-26 | 2019-10-01 | personal — brother's wedding | Personal | ~6 days; both stamps present (Heathrow entry + MMIA1 arrival) |
| 2019 | UAE | 2019-11-14 | 2019-11-18 | business — company-sponsored event | Interswitch | ~5 days; UAE entry stamp smudged, exit stamp clear |
| 2023 | Kenya | 2023-01-31 | 2023-02-04 | business | Hydrogen | ~5 days; visa used on final valid day (17-31 Jan window) |
| 2024 | UK | 2024-11-03 | ~2024-11-10 | business | TeamApt | 7 days; Heathrow entry stamped; Nigeria-return stamp missing from composite. UKVI 180-day visa, valid 28/10/24–28/04/25 |
| 2025 | UK | 2025-03-09 | ~2025-03-18 | business | TeamApt | ~10 days; Nigeria-departure stamp DTD 0679 re-classified per user personal record (code is officer/desk identifier, not direction indicator); Nigeria-return stamp missing |
| 2025 | Spain | 2025-06-15 | 2025-06-19 | business — conference | TeamApt | 5 days; Schengen transit in via AMS, out via CDG (KLM). Spain was the actual destination — Netherlands and France were airport transit only |
| 2025 | China | 2025-09-15 | 2025-09-21 | business — conference | TeamApt | 7 days; M-visa single entry (Lagos embassy) |
| 2025 | UK | 2025-11-16 | 2025-11-22 | business | TeamApt | ~7 days; UKVI 180-day visa valid 01/08/25–01/08/27 |
| 2026 | UK | 2026-03-08 | 2026-03-14 | ? | ? | 7 days |
| 2026 | UK (current) | 2026-04-13 | 2026-04-22 (planned) | ? | ? | Current trip; booking-only evidence. Today: 17 Apr 2026 |
| 2026 | Nigeria (Port Harcourt) | 2026-05-26 | 2026-05-29 | personal — Ernest wedding | Personal | Upcoming domestic trip |
| 2026 | France (Paris) | 2026-06-30 (planned) | 2026-07-02 (planned) | business — conference | Visa (self-funded travel; [[TeamApt]] context) | Planned attendance at [[Visa Payments Forum Paris]] at [[Paris Convention Centre]]; invitation letter from [[Visa Europe Limited]] supports [[French Schengen visa application]] (see [[invitation letter - VISA Payments Forum Paris 2026 - Emeka Awagu]]). No flights booked yet. Travel + accommodation self-funded per invitation terms |

## Lifetime Patterns

- **Most-visited foreign country:** UK (9 distinct entries recorded across the record): 2001-11 (1), 2019-08 + 2019-09 (2), 2024-11 (1), 2025-03 + 2025-11 (2), 2026-03 + 2026-04 current (2). (Note: 2025-06 was Spain via Schengen transit, not UK.)
- **First-visit countries by year:** 2001 (Mexico, Spain, UK), 2017 (Germany, Belgium), 2018 (South Africa, Kenya), 2019 (UAE), 2025 (Spain as destination; Netherlands + France as Schengen transit; China), 2026 (France as destination — planned, Jun–Jul)
- **Travel frequency has accelerated** — 2024 onwards shows ≥5 international trips per year vs. 1-3 per year earlier
- **Schengen access:** Visa issuance has rotated — Spain 2001 (London post), Belgium 2017 (Abuja post), France 2025 (Lagos post), France 2026 (planned — Lagos post, in application). Consistent with Lagos becoming primary base of issuance
- **Employer timeline of business trips (from user personal record):**
  - Interswitch era: 2017 Germany/Belgium, 2018 SA, 2018 Kenya, 2019 UK (Aug), 2019 UAE
  - Personal (non-employer): 2019 UK Sep–Oct (brother's wedding)
  - Hydrogen era: 2023 Kenya
  - TeamApt era: 2024 UK, 2025 UK (Mar), 2025 Spain, 2025 China, 2025 UK (Nov), 2026 France (planned — Visa-hosted industry forum, self-funded)
  - Pre-2017 and other 2026 employer mapping not yet populated

## Coverage Gaps and Confidence Notes

- **Pre-November 2000:** First passport (issued 18 Jul 1994) was reported lost. Any travel 1994–Nov 2000 is structurally unrecoverable from stamps.
- **Mexico 2001 entry date:** Previously illegible. Session 60 re-pass found Mexican CAJA fee stamp dated 13/06/01 ($6.20, serial TO 522935 01, rotated 180° on the visa page) — upgrades Leg #2 start to 2001-06-13 (medium confidence; fee stamp proves presence, exact port-of-entry date may be slightly earlier).
- **Mexico 2001 exit date:** Not found on composite. Inferred 19 Jun 2001 from requirement to be back in London before Spain visa window starts 20 Jun 2001.
- **UK 2001 arrival date:** Still inferred. 24 NOV 2001 Home Office stamp is clearly legible (session 60 confirms) but is a post-arrival stamp, not an entry stamp. Leg #3 `end` remains ~30 Oct 2001 (Leave to Remain grant date) at low confidence.
- **UAE Nov 2019 entry date (stamp evidence):** Stamp 18159 remains smudged at day level even at 3x zoom. Session 59 inferred **14 Nov 2019** via physical logic (Nigeria SOD 0019 dep 13 Nov + ~8hr LOS→DXB flight = next-calendar-day arrival). Session 60b: user personal record corroborates 14 Nov 2019 → confidence upgraded to high.
- **UK exits:** UK does not stamp departures. UK exit dates are always inferred from subsequent Nigeria arrival stamps — or from user personal record when no Nigeria stamp is found.
- **Spain 2001 stamps:** Entry/exit stamps not legible on composite. Dates recorded from visa window only — proves intent, not confirmed movement.
- **Kenya Jan 2023 entry date:** Previously inferred ~17 Jan from visa window start. Session 60b: user personal record shows entry was **31 Jan 2023** — visa was used on the final valid day of the 17–31 Jan window. Leg #16 start revised; confidence upgraded to high.
- **9 Mar 2025 stamp direction:** Session 60 read MMIA1 DTD 0679 09 MAR 2025 as Nigeria arrival. Session 60b: user personal record shows 9 Mar 2025 was UK arrival (so Nigeria departure). Leg #19 direction flipped; the DTD 3-letter code is now treated as an officer/desk identifier, not a direction indicator. Research gap — no authoritative public source found for Nigerian immigration 3-letter codes (DTD/SOD/SOA/DPD/ARD); direction is derived from stamp text + corroborating records.
- **Missing Nigeria-arrival stamps (user record only):** Three UK-return legs have no Nigeria arrival stamp on the composite despite zoom re-pass — legs #32 (~27 Aug 2019), #33 (~10 Nov 2024), #34 (~18 Mar 2025). Dates from user personal record; confidence medium (USER-LOG only).
- **2017 Nigeria return from Germany:** No Nigeria arrival stamp for Apr 2017 found on composite. Leg #6 `end` unrecoverable from this source.
- **Belgium 2017:** Visited overland from Germany (intra-Schengen); no dates, no stamps. Captured in Trips row narrative only — not added as separate Legs (would encode fabricated temporal precision).
- **Paris 2026 (planned):** Only evidence on file is the Visa Europe invitation letter (dates 30 Jun – 2 Jul 2026) — no flights booked, visa not yet issued. Legs #35/#36 entered as `INVITATION` evidence, low confidence; to be refined when flight bookings land and the French Schengen visa is granted.

## Session 60 Re-Pass Log

Full fine-granularity re-pass of passport composite `Long Image 12-04-2026 16.33.11.jpg` (1000×18457) performed 2026-04-17. Sliced into 41 tiles at 600px height × 150px overlap; each tile read with enumerate-every-date-stamp discipline; ambiguous regions re-cropped at 3x zoom for day-level resolution.

**Changes applied:**
- Leg #2 (Mexico): start `2001 illegible` → `2001-06-13`; end `—` → `2001-06-19 (inferred)`; confidence low → medium; evidence includes CAJA fee stamp
- Leg #14 (UAE): start/end `2019-11-13 smudged` → `2019-11-14` (session 59 inference-based correction applied; stamp remains smudged at re-pass)
- Leg #18 (UK Nov 2024): evidence now includes Nigeria MMIA1 SOD departure 03 Nov 2024 (discovered at zoom)

**Not found at re-pass (despite targeted zoom):**
- 2017 Nigeria return arrival stamp
- UAE 2019 entry day-level legibility (remains inference-based)
- Any unlogged trips in the 2017-2019 window (no October stamps; prior low-res misreads rejected)

**Base rate update:** Session 59 rescan found 2 missed legs in 6 spot-check regions. Session 60 full re-pass (41 tiles covering the entire composite) found 0 additional missed legs from stamp sources and 1 resolved date (Mexico). Systematic-undercount hypothesis not confirmed at stamp level — the composite appears fully extracted.

## Session 60b — Personal Record Ingest

User's personal travel log `Travel Dates.xlsx` ingested via review folder 2026-04-17. 12 rows covering 2017–2025. Discoveries exceed stamp-only extraction: the personal record reveals two UK 2019 stays were separate trips (not one continuous stay with intra-Europe out-and-back), the UK 2024-2025 "4-month stay" was actually two distinct trips with a Nigeria stay in between, and the 9 Mar 2025 DTD stamp direction was mis-read.

**Changes applied:**
- Leg #12: origin `(origin unknown — intra-Europe?)` → `Nigeria`; confidence medium → high; evidence adds USER-LOG
- Leg #14: confidence medium → high (UAE 14 Nov 2019 corroborated)
- Leg #16: start `2023-01-17 (approx)` → `2023-01-31`; confidence medium → high
- Leg #19: **direction flip** — was UK→Nigeria end 2025-03-09; now Nigeria→UK start 2025-03-09; evidence notes DTD code re-interpretation and user-record corroboration
- Legs #32, #33, #34 appended: three UK→Nigeria return legs with USER-LOG-only evidence
- Trips rollup rebuilt: new schema Year | Country | Arrival | Departure | Reason | Company | Summary; split 2019 UK into two rows; split 2024 UK + 2025 UK-Mar into two rows; 2025 Spain row (replaces Netherlands/France country label); 2017 row = "Germany & Belgium"; Reason + Company populated from personal record for 2017–2025; 2001/2003/2026 left as `?` (hybrid fill strategy — user populates rows outside record coverage)

**Evidence added:**
- New `USER-LOG` category in legend — user's personal travel record; medium confidence baseline, can upgrade to high when corroborated by stamps

**Research gap logged:** Nigerian immigration stamp codes (DTD/SOD/SOA/DPD/ARD) have no authoritative public documentation; directions derived from stamp text + corroborating records rather than the codes themselves.

## Session 60c — Paris 2026 Invitation Ingest (2026-04-17)

Visa Europe invitation letter for [[Visa Payments Forum Paris]] ingested 17 April 2026. Introduced new `INVITATION` evidence category in the Legs legend to represent planned-but-unbooked trips whose only evidence is a formal invitation / visa-application support letter with explicit dates.

**Changes applied:**
- Legs #35 (LOS → Paris, 30 Jun 2026 planned) and #36 (Paris → LOS, 2 Jul 2026 planned) appended with `INVITATION` evidence, low confidence
- Trips rollup: new row `2026 | France (Paris) | 2026-06-30 (planned) | 2026-07-02 (planned) | business — conference | Visa (self-funded)`
- Lifetime Patterns: Schengen issuance line extended with France 2026 (Lagos post, in application); TeamApt-era employer timeline extended with 2026 France (Visa-hosted, self-funded)
- Coverage gap note added: Paris 2026 is invitation-only evidence; refine when flights book and visa issues

## Sources

- [[Passport Visa Pages — Emeka Awagu]] — primary stamp/visa extraction (tiles 00–40 of composite `Long Image 12-04-2026 16.33.11.jpg`; session 60 re-pass applied)
- [[Travel Dates — Personal Record (Emeka Awagu)]] — user's personal travel log (XLSX, 2017–2025); session 60b ingest
- [[Emeka Obiorah Awagu]] — identity entity
- [[AWAGU - EMEKA OBIORAH]] — Virgin Atlantic booking for current UK trip (13–22 Apr 2026)
- [[Ibom Air Flight Ticket — Ernest Wedding May 2026]] — domestic PHC booking (May 2026)
- [[invitation letter - VISA Payments Forum Paris 2026 - Emeka Awagu]] — Visa Europe invitation for Paris 2026 (session 60c ingest)