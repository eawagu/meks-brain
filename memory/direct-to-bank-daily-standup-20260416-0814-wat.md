---
title: Direct to Bank Daily standup - 2026_04_16 08_14 WAT
type:
  - "source"
cssclasses:
  - "source"
source_path: _Direct to Bank _ Daily stand up – 2026_04_16 08_14 WAT – Notes by Gemini.docx
retention_label: postgres
retention_rationale: D2B standup with concrete progress markers — Zenith ATS vulnerability resolved + bank approval, Union Bank DD access granted, Interswitch DD test progress, 4 agreements pending Felix signature (incl. bank-transfer blocker). Future retrieval likely for blocker tracking.
meeting_date: 2026-04-16
created: "2026-05-12T11:03:50Z"
updated: "2026-05-12T11:03:50Z"
summary: D2B Daily Standup 2026-04-16 — Zenith ATS vulnerability resolved + bank approval; role matrix re-edit due; Union Bank DD access granted; Cosmos blocker on Union DD; Polaris extension until next week; Interswitch DD 3 issues remaining; 4 agreements pending Felix signature (bank-transfer agreement blocks white-account ability).
---

## Summary

D2B Daily Standup 2026-04-16 08:14 WAT — Zenith ATS vulnerability resolved + final bank approval; user-based risk assessment pending. Role matrix re-edit assigned. Union Bank DD access granted (post Emanuel's Jira feedback) — mandate creation + transaction simulation today; [[Cosmos library|Cosmos]] blocker raised by Abiodun. Polaris requesting next-week extension. MoneyPoint DD account provided but settlement account technical issue with Finance. Interswitch DD: 3 issues remaining; in-house e2e test tomorrow. GT Bank API deployment pending Zach's infra fix. 4 agreements pending Felix signature (bank-transfer agreement critical — blocks ability to "white accounts").

## Key Points

- **Zenith ATS vulnerability**: tested + resolved + final approval from bank; user-based risk assessment pending bank feedback (ideally today); distinct from DD assessment ([[Abiodun Famoye]] clarification)
- **Zenith ATS role matrix**: bank's matrix incomplete; Gaffa committed to re-editing team's role matrix doc to better explain + accommodate bank requirements; training tentatively Tuesday/Wednesday next week
- **Security scan**: bank completed scan + returned results; team's scanning report promised yesterday; [[Yasir Syed Ali]] needs ~1 hour to sync with Isaac for deliverable timing
- **Union Bank DD access**: granted (post Emanuel's Jira feedback); mandate creation + transaction simulation today; blocker on [[Cosmos library|Cosmos]] — [[Abiodun Famoye]] to engage Cosmos after call
- **Polaris Bank**: no feedback yet on fund settlement + DD; bank prioritizing internal issues; promised email not received; [[Glory Alioha]] clarified bank requested next-week extension re Polaris SLA
- **MoneyPoint DD**: account provided yesterday; team's settlement account still pending (Finance technical issue) — hope to resolve today; portal work in production environment
- **Interswitch DD**: fixes applied to raised bugs; Ghanaian-team testing validated many fixes; 3 issues remaining (review + test today); in-house e2e test scheduled tomorrow
- **GT Bank API**: account funded + tested through barrier yesterday; deployment pending — Zach facing infrastructure challenge, fix this morning
- **V2 Jazz regression testing**: documentation not ready; [[Khadijat Musa]] to check with [[Jamiu Ahmed|Jamiu]] and Wally; [[Olawale Olapetan]] confirmed team almost done with V2 regression report
- **Quarterly priorities**: Oluwakemi requested clarity to avoid mixed scenarios; [[Abdulgafar Obeitor]] to do review tomorrow (2 tasks to close out today first); final list expected tomorrow
- **Branch settlement API**: Ifeoluwa urgently requested update; Abdulgafar to forward mail to enable ticket creation
- **4 agreements pending Felix signature** — bank-transfer agreement is critical, blocks white-accounts ability; Nora (lead legal) following up
- **Access Bank**: no update from bank; [[Opeyemi Animashaun]] to call in 30 min

## Next Steps

- [[Abdulgafar Obeitor]] — re-edit Zenith ATS role matrix doc; explain client-spec accommodation
- [[Yasir Syed Ali]] — sync with Isaac on bank scanning results; update in 1 hour
- [[Abiodun Famoye]] — engage Cosmos after call; remove DD service blocker
- [[Oluwakemi Oni]] — reach Polaris Bank contacts re missing expected feedback email
- [[Khadijat Musa]] — check with Jamiu + Wally on V2 regression conclusion date
- [[Abdulgafar Obeitor]] — schedule quarterly review for tomorrow (2 pending tasks today)
- [[Abdulgafar Obeitor]] — forward branch settlement API mail to [[Ifeoluwa Oguntona]] for ticket creation
- [[Abdulgafar Obeitor]] — follow up + intervene re 4 agreements pending Felix
- [[Opeyemi Animashaun]] — call Access Bank contacts immediately post-meeting for status update

## Entities Mentioned

People: [[Abdulgafar Obeitor]], [[Abiodun Famoye]], [[Ifeoluwa Oguntona]], [[Oluwakemi Oni]], [[Khadijat Musa]], [[Yasir Syed Ali]], [[Opeyemi Animashaun]], [[Mariam Davies]], [[Glory Alioha]], [[Jamiu Ahmed]], [[Olawale Olapetan]], Gaffa, Isaac, Nora, Felix, Wally, Zach, Emanuel

Banks: [[Zenith Bank]], [[Union Bank]], [[Polaris Bank]], [[Moniepoint|MoneyPoint]], [[Interswitch]], [[GT Bank]], [[Access Bank]]

Systems: [[ATS]], [[Direct Debit]], [[Cosmos library]], V2 Jazz

## Concepts

- [[Direct to Bank Daily standup]]
- [[SLA sign-off blocker]]
- [[Role matrix]]
- [[Vulnerability management]]