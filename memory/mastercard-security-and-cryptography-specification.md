---
title: MasterCard Security and Cryptography Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\10-security-and-cryptography.md
summary: MasterCard security mechanisms — PIN encryption (3DES, ISO 9564), CVC/CVV validation, EMV chip tags, 3D Secure/Identity Check, MDES tokenization, AVS, TLS 1.2+ transport, and MAC integrity.
---

## Summary

All MasterCard security mechanisms: PIN encryption (Triple-DES 192-bit, ISO 9564 Format 0, DE 52), PEK exchange via 0800 messages, CVC1/CVC2/dCVV/iCVV validation, EMV chip tags (9F26 cryptogram, 9F27 CID, 9F36 ATC), 3D Secure/Identity Check (AAV in UCAF DE 48), MDES tokenization (DSRP cryptogram, PAR), AVS, TLS 1.2+/mTLS transport, MAC integrity (DE 64/128).

## Key Points

- PIN: 3DES 192-bit, ISO 9564 Format 0, DE 52; PEK exchanged quarterly via 0800
- Card validation: CVC1 (stripe), CVC2 (CNP), dCVV (contactless), iCVV (chip 8-byte tag 9F26)
- 3D Secure: cardholder redirected to issuer; AAV token in UCAF (DE 48 subelement 43)
- MDES tokenization: token replaces PAN; DSRP cryptogram for digital wallets; PAR for cross-reference
- Transport: TLS 1.2+, mTLS for component auth, certificate rotation

## Concepts

- [[MasterCard Integration]]
- [[Cybersecurity]]