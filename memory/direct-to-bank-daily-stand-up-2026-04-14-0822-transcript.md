---
title: Direct to Bank Daily Stand Up 2026-04-14 0822 — transcript
type:
  - "source"
cssclasses:
  - "source"
source_path: ingress/note_2026-04-14T08-14-43-184Z.md
created: "2026-04-14T08:18:58Z"
updated: "2026-04-14T08:18:58Z"
summary: Transcript of Direct to Bank Daily Standup Apr 14 2026 — captured via ingress from Gemini meeting notes; pairs with the Phase-1 summary source page.
---

## Summary

Transcript/details content from the [[Direct to Bank]] daily standup meeting on Apr 14, 2026 (08:22 WAT), captured from the Gemini-generated Google Doc and routed through the ingress pipeline. The Phase-1 source page for the same meeting is [[Direct to Bank Daily Stand Up 2026-04-14 0822]] — this page preserves the per-topic discussion detail that feeds entity/concept extraction.

## Key Points

### Zenith Bank ("Zenit")
- **API documentation follow-up:** [[Ifeoluwa Oguntona]] asked for the Distribution settlement distribution API / free distribution API email to be forwarded for ticket attachment.
- **Security and vulnerability testing:** scans/pentest/vuln testing on [[Zenith Bank]] portal; previous week's vulnerability completed; full environment testing planned today; fix deploys to live if successful.
- **User creation block + DD vulnerability:** bank still doing internal follow-up for control team to provide role matrix. Team plans on-site visit next day if no headway. Rescanned DD vulnerability fix surfaced new vulnerabilities — 2 PM clarification meeting scheduled.
- **API status and integration:** OTP API issue resolved; all agreed APIs available. [[Babajide Ojoboorun]] confirmed API tests complete. Integration started per Abiodun Famoye; verify-API retest requested of Babajide.

### Settlement agent track
- **Ambi (foreign settlement agent):** SLA with bank for last-amendment review before possible signing and live API deployment.
- **Echo Bank settlement agent:** engineering issue resumed; Daniel moved task to 'in progress'; timeline requested.
- **[[UBA]] settlement agent:** SLA still with bank for review/signing before next steps.
- **[[CoralPay]] integration to [[ATS]]:** parallel test ongoing; 24/7 technical support provided.

### Direct Debit tracks
- **Echo Bank SLA for name change:** pending Felix's signature despite [[Dennis Ajalie]] escalation. "Approaching from a spiritual angle" quip.
- **Union Bank DD server access:** Emanuel still cannot access server despite credentials shared; [[Oluwakemi Oni]] to follow up with Samuel.
- **Keystone Bank mobile app:** development due in April not complete; team awaiting update.
- **Union NSS / fund settlement agent:** Union leaned toward NSS on DD side rather than account-to-account; Oluwakemi to reach out to Abdulgafar Obeitor. Fund-settlement-agent onboarding: no feedback; name inquiry still failing and transfer failing again.
- **Premium Trust:** Glory Alioha not marking as blocked yet — Tundday still following up.
- **MoneyPoint (Moniepoint) DD:** 661 error (insufficient-account test) fixed; working with global limits; mandate-limit configuration pending for demo this week; production bank-API creds sent — confirming IP address.
- **FCNB ([[FCMB]]) DD:** server access issue — can connect to VPN but not the server; bank working on fix.
- **[[Access Bank]] + [[Wema Bank]] DD:** PayOn production approval ongoing at MyBank security team. CoralPay/Access still blocked on pending Access-CoralPay agreement. Wema DD still in internal approval.

### Delivery hygiene
- **Project timelines:** [[Khadijat Musa]] — all timelines need updating for new quarter, especially carry-over items (many still dated Mar 19).
- **[[GoSubscribe]] deployment** for Echo Bank and [[Stanbic Bank]]: inclusion confirmed by Khadijat for next week's deployments per Ifeoluwa's request.

## Entities Mentioned

[[Zenith Bank]], [[UBA]], [[Access Bank]], [[Wema Bank]], [[Stanbic Bank]], [[FCMB]], Union Bank, Keystone Bank, Echo Bank, Premium Trust, Ambi, [[CoralPay]], [[GoSubscribe]], [[ATS]], [[Direct to Bank]], [[Dennis Ajalie]], [[Ifeoluwa Oguntona]], [[Babajide Ojoboorun]], [[Khadijat Musa]], [[Oluwakemi Oni]], Abdulgafar Obeitor, Abraham Isinguzoro, Opeyemi Animashaun, Glory Alioha, Taiwo Baptista, Abiodun Famoye, Daniel, Felix, Samuel, Emanuel, Tundday.

## Concepts

- Bank settlement integration lifecycle (API + SLA + credential provisioning + server access)
- Security/vulnerability remediation cycles on bank portals
- Direct Debit mandate-limit configuration and global-limits testing
- Q2 timeline carry-over hygiene
- Inter-vendor agreement dependency (CoralPay/Access Bank blocker as a pattern)

## Cross-reference

- Phase-1 summary: [[Direct to Bank Daily Stand Up 2026-04-14 0822]]
- Prior day transcript: [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
