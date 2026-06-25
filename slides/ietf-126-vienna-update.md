---
marp: true
theme: default
size: 16:9
paginate: true
title: JOSE HPKE PQ & PQ/T Algorithm Registrations - IETF 126 Vienna Update
description: IETF 126 Vienna update for draft-ietf-jose-hpke-pq-pqt
footer: draft-ietf-jose-hpke-pq-pqt - JOSE WG
style: |
  :root {
    font-family: "Aptos", "Inter", "Helvetica Neue", Arial, sans-serif;
    --accent: #005ea8;
    --accent-2: #b44d12;
    --ink: #152033;
    --muted: #556070;
    --panel: #edf3f8;
  }

  section {
    color: var(--ink);
    background: #fbfcfe;
    letter-spacing: 0;
    padding: 52px 64px;
  }

  section.lead {
    background: #f4f8fb;
  }

  section.lead h1 {
    color: var(--accent);
    font-size: 54px;
    line-height: 1.04;
    max-width: 980px;
  }

  h1 {
    color: var(--accent);
    font-size: 44px;
    margin-bottom: 24px;
  }

  h2 {
    color: var(--accent-2);
    font-size: 30px;
    margin-top: 0;
  }

  p, li {
    font-size: 28px;
    line-height: 1.26;
  }

  ul {
    padding-left: 1.05em;
  }

  li + li {
    margin-top: 0.32em;
  }

  strong {
    color: var(--accent-2);
  }

  code {
    color: var(--accent);
    background: #e9f2f8;
    border-radius: 4px;
    padding: 0 0.18em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 22px;
  }

  th {
    color: #ffffff;
    background: var(--accent);
    font-weight: 700;
  }

  th, td {
    border: 1px solid #c9d6e2;
    padding: 9px 12px;
  }

  td {
    background: #ffffff;
  }

  .note {
    color: var(--muted);
    font-size: 21px;
    margin-top: 18px;
  }

  section.compact li {
    font-size: 25px;
  }

---

<!-- _class: lead -->

# JOSE HPKE PQ & PQ/T Algorithm Registrations

## IETF 126 Vienna Update

`draft-ietf-jose-hpke-pq-pqt`

Filip Skokan, Brian Campbell, Hannes Tschofenig, Tirumaleswar Reddy

JOSE WG - IETF 126 Vienna - 18-24 July 2026

---

# Since IETF 125

The requested adoption call happened.

- WG consensus to adopt was confirmed on **8 June 2026**
- `draft-ietf-jose-hpke-pq-pqt-00` is now a JOSE WG draft
- The previous overlap with COSE/JOSE hybrid work has been resolved
- Hannes and Tiru joined as authors
- The algorithm set was simplified before adoption

---

# Scope

This is a narrow JOSE document.

- Register PQ and PQ/T hybrid HPKE `alg` identifiers for JWE
- Reuse `draft-ietf-jose-hpke-encrypt` key management modes
- Reuse KEMs from `draft-ietf-hpke-pq`
- Reuse KDF from `draft-ietf-hpke-pq`
- Reuse AEAD from `draft-ietf-hpke-hpke`
- Define AKP JWK representation
- Provide generated JWK and JWE test vectors

---

# Current Proposal

| Category | Integrated encryption | Key encryption | HPKE KEM | Security level |
| --- | --- | --- | --- | --- |
| PQ/T hybrid | `HPKE-8` | `HPKE-8-KE` | MLKEM768-P256 | PQ L3 + T ~128-bit |
| PQ/T hybrid | `HPKE-9` | `HPKE-9-KE` | MLKEM768-X25519 | PQ L3 + T ~128-bit |
| PQ/T hybrid | `HPKE-10` | `HPKE-10-KE` | MLKEM1024-P384 | PQ L5 + T ~192-bit |
| Pure PQ | `HPKE-12` | `HPKE-12-KE` | ML-KEM-768 | PQ L3 |
| Pure PQ | `HPKE-13` | `HPKE-13-KE` | ML-KEM-1024 | PQ L5 |

<p class="note">All use SHAKE256 KDF and AES-256-GCM AEAD.*<sup>1</sup> Numbering gaps are intentional for COSE alignment.*<sup>2</sup></p>

---

# AEAD Choice*<sup>1</sup>

- This draft now uses AES-256-GCM as the sole AEAD
- ChaCha20Poly1305 variants were removed from this draft based on feedback
- Result: 5 ciphersuites, each with integrated encryption and key encryption variants

**`(╯°□°）╯︵ ┻━┻` But `draft-ietf-jose-hpke-encrypt` still registers ChaCha20Poly1305 HPKE algorithms. Shouldn't the JOSE HPKE documents have a coherent AEAD policy?**

---

# COSE Alignment*<sup>2</sup>

COSE does not need JOSE-style `HPKE-n` names.

- It uses COSE algorithm code points, not descriptive JWE `alg` strings
- The current JOSE numbering leaves a gap for COSE's use of ML-KEM-512 (`HPKE-11`)
- `¯\_(ツ)_/¯`

---

<!-- _class: compact -->

# Browser WebCrypto Compatibility

- Modern WebCrypto algorithms are being incubated in WICG: https://wicg.github.io/webcrypto-modern-algos/
- Behind a Chromium flag*: ML-KEM-{768, 1024} and MLKEM768-X25519; ML-KEM-512 and further hybrids will not ship
- No Chromium commitment yet for SHAKE256, which this draft uses as the HPKE KDF
- ChaCha20-Poly1305 is also behind the Chromium flag if needed
- Browser-native HPKE can be tested at https://panva.github.io/hpke/?native
- Safari and Firefox have signaled intent to do something, but algorithm choices and timelines are still unknown

<p class="note">* Flag: <a href="chrome://flags/#webcrypto-pqc"><code>chrome://flags/#webcrypto-pqc</code></a></p>

---

<!-- _class: compact -->

# Security Considerations

- PQ/T hybrid confidentiality rationale
- Rationale for registering pure PQ ciphersuites
- ML-KEM-512 omission rationale
- Security strength discussion for ML-KEM-768 and ML-KEM-1024
- Multi-recipient JWE guidance: all recipients **MUST** use quantum-resistant key management

---

# Automation

- Tooling generates tables, IANA text, and vectors for both JOSE and COSE drafts
- Test vectors exist for every registered JOSE algorithm
- Long vectors use the RFC 8792 single backslash strategy
- The new RFC Editor website has a copy button that unfolds examples when RFC 8792 syntax is detected
- kramdown-rfc can smart-indent folded JSON vectors

Changing the algorithm set is mechanically cheap; choosing the right set is the WG decision.

---

# What We Need Today

Reviews, d'oh.

- Confirm the algorithm set
- Decide what to do about JOSE's incoherent HPKE ChaCha20Poly1305 AEAD position
- Validate the JWK/JWE examples and test vectors against implementations
- Identify security or registry issues for the next revision
- Start converging toward WGLC
