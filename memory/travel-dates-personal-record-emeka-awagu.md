---
title: Travel Dates — Personal Record (Emeka Awagu)
type:
  - "source"
cssclasses:
  - "source"
source_path: review/Travel Dates.xlsx
retention_label: postgres
retention_rationale: Structured personal travel record with long-term cross-reference value for the travel history ledger; kept in Postgres raw_content for durable retrieval.
related:
  - "Travel History — Emeka Awagu"
  - "Passport Visa Pages — Emeka Awagu"
  - "Emeka Obiorah Awagu"
created: "2026-04-17T18:59:40Z"
updated: "2026-04-17T18:59:40Z"
summary: "User's personal travel log covering 2017–2025 (12 trips); ingested session 60b; corrects multiple brain ledger assumptions and adds reason + company data."
---

## Provenance

- **Origin:** User-authored Excel workbook (`Travel Dates.xlsx`), dropped into `mek-brain-ingress/review/` and ingested conversationally during session 60b.
- **Original path at ingest:** `review/Travel Dates.xlsx` (moved to `raw/Travel Dates.xlsx` post-ingest per `retention_label: postgres` — raw bytes also persisted in Postgres `pages.raw_content`).
- **Ingested by:** Emeka Awagu (user is the subject; this is self-reported ground truth).
- **Sheet:** Sheet1 (single sheet, 7 columns including a leading blank).

## Content — Verbatim Table

Columns: `Country | Arrival | Departure | Duration | Reason | Company`. Blank rows in the source separate year-groupings and are preserved here as section breaks.

| Country | Arrival | Departure | Duration | Reason | Company |
|---|---|---|---|---|---|
| Germany & Belgium | 27th March 2017 | 6th April 2017 | 11 days | Business Trip | Interswitch |
| SA | 13th March 2018 | 17th March 2018 | 4 days | Conference | Interswitch |
| Kenya | 23rd April 2018 | 27th April 2018 | 4 days | Business Trip | Interswitch |
| UK | 23rd August 2019 | 27th August 2019 | 4 days | Company Sponsored Event | Interswitch |
| UK | 26th September 2019 | 1st October 2019 | 5 days | Personal — Brother's Wedding | Personal |
| UAE | 14th Nov 2019 | 18th Nov 2019 | 4 days | Company Sponsored Event | Interswitch |
| Kenya | 31st Jan 2023 | 4th Feb 2023 | 4 days | Business Trip | Hydrogen |
| UK | 3rd Nov 2024 | 10th Nov 2024 | 7 days | Business Trip | TeamApt |
| UK | 9th March 2025 | March 18th 2025 | 10 days | Business Trip | TeamApt |
| Spain | 15th June 2025 | 19th June 2025 | 4 days | Conference | TeamApt |
| China | 15th Sept 2025 | 21st Sept 2025 | 6 days | Conference | TeamApt |
| UK | 16th November 2025 | 21st November 2025 | 6 days | Business Trip | TeamApt |

12 rows. Coverage: 2017, 2018, 2019, 2023, 2024, 2025. No entries for 2020–2022 (COVID-era) or 2001/2003/2026 — user will fill these directly.

## User-Provided Clarifications (captured session 60b)

- **2017 Germany & Belgium:** Flew into Germany, visited Belgium overland from Germany (intra-Schengen), returned to Germany, then flew Germany→Nigeria. Belgium has no separate entry/exit stamps or dates.
- **2025 Spain:** Destination was Spain. Transited via Amsterdam (AMS, KLM) inbound; flew Spain→Nigeria via Paris (CDG, KLM) outbound. Spain is the trip country, AMS/CDG are transit only.

## Corrections Applied to Brain Ledger

Cross-referenced against [[Travel History — Emeka Awagu]] and [[Passport Visa Pages — Emeka Awagu]]:

1. **2019 UK was two distinct trips** — not one 5-week stay as the composite stamps alone suggested. Aug 23–27 Interswitch event + Sep 26–Oct 1 brother's wedding. Added missing UK→Nigeria return leg (~27 Aug 2019) to Legs ledger as row #32 (USER-LOG, medium confidence, no stamp evidence in composite).
2. **2024 UK was a 7-day trip, not a 4-month stay** — brain previously modeled 03 Nov 2024 → 09 Mar 2025 as a single continuous stay based on stamp sparsity. User record confirms 7-day return Nov 2024. Added UK→Nigeria return leg (~10 Nov 2024) as row #33.
3. **2025 UK March trip surfaced** — brain had only the 09 Mar 2025 Nigeria stamp (DTD 0679) originally labeled as arrival. Record shows it was a UK business trip 9–18 Mar 2025; DTD 0679 is the Nigeria departure on outbound. Flipped Leg #19 direction (UK-arrival, not Nigeria-arrival) and added UK→Nigeria return leg (~18 Mar 2025) as row #34.
4. **2023 Kenya start date** — brain had 2023-01-31 as Leg #16 assumption; user record confirms it (arrival). Confidence elevated to high.
5. **DTD/SOD/SOA stamp code re-classification** — three web searches found no authoritative public source for these 3-letter codes. Combined with internal evidence (SOD appears on both departures AND arrivals) and user's ground-truth direction for 09 Mar 2025, re-classified these as officer/desk identifiers, not direction codes. Captured in Stamp Code Note on page 733.
6. **Reason + company fields populated** on the Trips rollup for every 2017–2025 trip covered by this record.

## Evidence Category

This source introduces **USER-LOG** as an evidence tier for the Legs ledger — user-recorded personal travel log. Confidence classification: medium-high. Higher than VISA-W (visa issuance is intent, not travel); roughly equal to BOOKING (booking is pre-travel evidence); below STAMP (physical stamp = verified border crossing). USER-LOG + STAMP on same leg = high confidence.

## Cross-Links

- [[Travel History — Emeka Awagu]] — ledger this source feeds into. See "Session 60b — Personal Record Ingest" section there for the full leg-by-leg reconciliation.
- [[Passport Visa Pages — Emeka Awagu]] — stamp composite this record corrects/supplements.
- [[Emeka Obiorah Awagu]] — entity page for the traveller.

## Notes

- Entries are user-reported; no corroborating border stamp exists for return legs in 2019 UK-Aug, 2024 UK-Nov, 2025 UK-Mar (composite coverage gaps). These legs carry USER-LOG evidence only.
- User explicitly confirmed `retention_label: postgres` so raw XLSX bytes remain recoverable alongside this structured extraction.
- Three-column Excel formatting quirks preserved verbatim: "March 18th 2025" (vs. "18th March 2025"), "15th Sept 2025" (vs. full month), "SA" shorthand for South Africa, "Germany & Belgium" as a combined cell.
