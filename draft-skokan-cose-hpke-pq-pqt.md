---
title: "COSE HPKE PQ & PQ/T Algorithm Registrations"
abbrev: "COSE HPKE PQ"
category: std

docname: draft-skokan-cose-hpke-pq-pqt-latest
submissiontype: IETF
number:
date:
consensus: true
v: 3
area: "Security"
workgroup: "CBOR Object Signing and Encryption"
keyword:
 - COSE
 - HPKE
 - post-quantum
 - hybrid
 - ML-KEM
 - PQ
 - PQ/T
 - CRQC
venue:
  group: "CBOR Object Signing and Encryption"
  type: "Working Group"
  mail: "cose@ietf.org"
  arch: "https://mailarchive.ietf.org/arch/browse/cose/"
  github: "panva/draft-jose-hpke-pq-pqt"
  latest: "https://panva.github.io/draft-jose-hpke-pq-pqt/draft-skokan-cose-hpke-pq-pqt.html"

author:
 -
    fullname: Filip Skokan
    organization: Okta
    email: panva.ip@gmail.com
 -
    fullname: Brian Campbell
    organization: Ping Identity
    email: bcampbell@pingidentity.com

normative:
  I-D.ietf-cose-hpke:
  I-D.ietf-hpke-pq:
  I-D.ietf-cose-dilithium:
  RFC9052:
  RFC9053:

informative:


...

--- abstract

This document registers Post-Quantum (PQ) and Post-Quantum/Traditional (PQ/T)
hybrid algorithm identifiers for use with CBOR Object Signing and Encryption
(COSE), building on the Hybrid Public Key Encryption (HPKE) framework.


--- middle

# Introduction

{{I-D.ietf-cose-hpke}} defines how to use Hybrid Public Key Encryption
(HPKE) with COSE using traditional Key Encapsulation Mechanisms (KEM)
based on Elliptic-curve Diffie-Hellman (ECDH).

This document extends the set of registered HPKE algorithms to include Post-Quantum
(PQ) and Post-Quantum/Traditional (PQ/T) hybrid KEMs, as defined in
{{I-D.ietf-hpke-pq}}. These algorithms provide protection against attacks by
cryptographically relevant quantum computers.

The term "PQ/T hybrid" is used here consistent with {{I-D.ietf-hpke-pq}} to denote a
combination of post-quantum and traditional algorithms, and should not be confused
with HPKE's use of "hybrid" to describe the combination of asymmetric and symmetric
encryption.

# Conventions and Definitions

{::boilerplate bcp14-tagged}


# Algorithm Identifiers {#algorithm-identifiers}

This section defines the COSE algorithm identifiers for PQ and PQ/T HPKE-based
encryption. Each algorithm is defined by a combination of an HPKE KEM,
a Key Derivation Function (KDF), and an Authenticated Encryption with
Associated Data (AEAD) algorithm.

All algorithms defined in this section follow the same operational model as
those in {{I-D.ietf-cose-hpke}}, supporting both integrated encryption
as defined in {{Section 3.2 of I-D.ietf-cose-hpke}} and key encryption
as defined in {{Section 3.3 of I-D.ietf-cose-hpke}}.

Test vectors for all algorithms defined in this section are provided in
{{test-vectors}}.

## PQ/T Hybrid Integrated Encryption Algorithms

The following table lists the algorithm identifiers for PQ/T hybrid integrated
encryption, where HPKE directly encrypts the plaintext using COSE_Encrypt0
without a separate Content Encryption Key:

<!-- begin:table cose-pqt-hybrid-integrated-table "PQ/T Hybrid Integrated Encryption Algorithms" ; see README for regeneration instructions, do not edit -->

| Name    | Value             | HPKE KEM                   | HPKE KDF            | HPKE AEAD                   |
| ------- | ----------------- | -------------------------- | ------------------- | --------------------------- |
| HPKE-8  | TBD (Assumed: 54) | MLKEM768-P256 (`0x0050`)   | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-9  | TBD (Assumed: 56) | MLKEM768-P256 (`0x0050`)   | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
| HPKE-10 | TBD (Assumed: 58) | MLKEM768-X25519 (`0x647a`) | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-11 | TBD (Assumed: 60) | MLKEM768-X25519 (`0x647a`) | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
| HPKE-12 | TBD (Assumed: 62) | MLKEM1024-P384 (`0x0051`)  | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-13 | TBD (Assumed: 64) | MLKEM1024-P384 (`0x0051`)  | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
{: #cose-pqt-hybrid-integrated-table title="PQ/T Hybrid Integrated Encryption Algorithms" }

<!-- end:table -->

These algorithms combine ML-KEM with a traditional elliptic curve algorithm in a PQ/T
hybrid KEM construction, with the goal that compromise of either the post-quantum or
the traditional component alone does not undermine the security of the resulting encryption.

## Pure PQ Integrated Encryption Algorithms

The following table lists the algorithm identifiers for pure post-quantum
integrated encryption:

<!-- begin:table cose-pure-pq-integrated-table "Pure PQ Integrated Encryption Algorithms" ; see README for regeneration instructions, do not edit -->

| Name    | Value             | HPKE KEM               | HPKE KDF            | HPKE AEAD                   |
| ------- | ----------------- | ---------------------- | ------------------- | --------------------------- |
| HPKE-14 | TBD (Assumed: 66) | ML-KEM-768 (`0x0041`)  | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-15 | TBD (Assumed: 68) | ML-KEM-768 (`0x0041`)  | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
| HPKE-16 | TBD (Assumed: 70) | ML-KEM-1024 (`0x0042`) | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-17 | TBD (Assumed: 72) | ML-KEM-1024 (`0x0042`) | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
{: #cose-pure-pq-integrated-table title="Pure PQ Integrated Encryption Algorithms" }

<!-- end:table -->

These algorithms provide pure post-quantum security using ML-KEM without a
traditional algorithm component.

## PQ/T Hybrid Key Encryption Algorithms

The following table lists the algorithm identifiers for PQ/T hybrid key
encryption, where HPKE encrypts the Content Encryption Key using COSE_Encrypt
with COSE_Recipient:

<!-- begin:table cose-pqt-hybrid-key-encryption-table "PQ/T Hybrid Key Encryption Algorithms" ; see README for regeneration instructions, do not edit -->

| Name       | Value             | HPKE KEM                   | HPKE KDF            | HPKE AEAD                   |
| ---------- | ----------------- | -------------------------- | ------------------- | --------------------------- |
| HPKE-8-KE  | TBD (Assumed: 55) | MLKEM768-P256 (`0x0050`)   | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-9-KE  | TBD (Assumed: 57) | MLKEM768-P256 (`0x0050`)   | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
| HPKE-10-KE | TBD (Assumed: 59) | MLKEM768-X25519 (`0x647a`) | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-11-KE | TBD (Assumed: 61) | MLKEM768-X25519 (`0x647a`) | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
| HPKE-12-KE | TBD (Assumed: 63) | MLKEM1024-P384 (`0x0051`)  | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-13-KE | TBD (Assumed: 65) | MLKEM1024-P384 (`0x0051`)  | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
{: #cose-pqt-hybrid-key-encryption-table title="PQ/T Hybrid Key Encryption Algorithms" }

<!-- end:table -->

These are the key encryption counterparts of the PQ/T hybrid integrated
encryption algorithms defined in {{cose-pqt-hybrid-integrated-table}}.

## Pure PQ Key Encryption Algorithms

The following table lists the algorithm identifiers for pure post-quantum key
encryption:

<!-- begin:table cose-pure-pq-key-encryption-table "Pure PQ Key Encryption Algorithms" ; see README for regeneration instructions, do not edit -->

| Name       | Value             | HPKE KEM               | HPKE KDF            | HPKE AEAD                   |
| ---------- | ----------------- | ---------------------- | ------------------- | --------------------------- |
| HPKE-14-KE | TBD (Assumed: 67) | ML-KEM-768 (`0x0041`)  | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-15-KE | TBD (Assumed: 69) | ML-KEM-768 (`0x0041`)  | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
| HPKE-16-KE | TBD (Assumed: 71) | ML-KEM-1024 (`0x0042`) | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`)      |
| HPKE-17-KE | TBD (Assumed: 73) | ML-KEM-1024 (`0x0042`) | SHAKE256 (`0x0011`) | ChaCha20Poly1305 (`0x0003`) |
{: #cose-pure-pq-key-encryption-table title="Pure PQ Key Encryption Algorithms" }

<!-- end:table -->

These are the key encryption counterparts of the pure PQ integrated
encryption algorithms defined in {{cose-pure-pq-integrated-table}}.


# COSE Key Representation

Keys for the algorithms defined in this document use the "AKP" (Algorithm
Key Pair) key type defined in {{I-D.ietf-cose-dilithium}}.

In COSE_Key representation, the AKP key type uses kty value 7. The "pub"
parameter (label: -1) contains the raw HPKE SerializePublicKey() output for the
corresponding KEM as a byte string. The "priv" parameter (label: -2) contains
the raw HPKE SerializePrivateKey() output as a byte string.

The "alg" parameter (label: 3) is REQUIRED for all AKP keys and MUST be set
to the COSE algorithm value corresponding to the intended algorithm.

Examples of COSE keys for each algorithm are provided in {{test-vectors}}.


# Security Considerations

The security considerations of {{I-D.ietf-cose-hpke}} and
{{I-D.ietf-hpke-pq}} apply to this document.

This document does not register algorithms using ML-KEM-512. As noted
in {{Section 3 of I-D.ietf-hpke-pq}}, given the relative novelty of
ML-KEM, there is concern that new cryptanalysis might reduce the
security level of ML-KEM-512. Use of ML-KEM-768 or ML-KEM-1024 acts
as a hedge against such cryptanalysis at a modest performance penalty.


# IANA Considerations

## COSE Algorithms Registry

This document requests registration of the following values in the
IANA "COSE Algorithms" registry established by {{RFC9053}}:

<!-- begin:cose-iana-registrations ; see README for regeneration instructions, do not edit -->

### HPKE-8
{: toc="exclude"}

- Name: HPKE-8
- Value: TBD (Assumed: 54)
- Description: Integrated Encryption with HPKE using MLKEM768-P256 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-integrated-table}} of this document
- Recommended: Yes

### HPKE-8-KE
{: toc="exclude"}

- Name: HPKE-8-KE
- Value: TBD (Assumed: 55)
- Description: Key Encryption with HPKE using MLKEM768-P256 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-9
{: toc="exclude"}

- Name: HPKE-9
- Value: TBD (Assumed: 56)
- Description: Integrated Encryption with HPKE using MLKEM768-P256 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-integrated-table}} of this document
- Recommended: Yes

### HPKE-9-KE
{: toc="exclude"}

- Name: HPKE-9-KE
- Value: TBD (Assumed: 57)
- Description: Key Encryption with HPKE using MLKEM768-P256 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-10
{: toc="exclude"}

- Name: HPKE-10
- Value: TBD (Assumed: 58)
- Description: Integrated Encryption with HPKE using MLKEM768-X25519 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-integrated-table}} of this document
- Recommended: Yes

### HPKE-10-KE
{: toc="exclude"}

- Name: HPKE-10-KE
- Value: TBD (Assumed: 59)
- Description: Key Encryption with HPKE using MLKEM768-X25519 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-11
{: toc="exclude"}

- Name: HPKE-11
- Value: TBD (Assumed: 60)
- Description: Integrated Encryption with HPKE using MLKEM768-X25519 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-integrated-table}} of this document
- Recommended: Yes

### HPKE-11-KE
{: toc="exclude"}

- Name: HPKE-11-KE
- Value: TBD (Assumed: 61)
- Description: Key Encryption with HPKE using MLKEM768-X25519 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-12
{: toc="exclude"}

- Name: HPKE-12
- Value: TBD (Assumed: 62)
- Description: Integrated Encryption with HPKE using MLKEM1024-P384 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-integrated-table}} of this document
- Recommended: Yes

### HPKE-12-KE
{: toc="exclude"}

- Name: HPKE-12-KE
- Value: TBD (Assumed: 63)
- Description: Key Encryption with HPKE using MLKEM1024-P384 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-13
{: toc="exclude"}

- Name: HPKE-13
- Value: TBD (Assumed: 64)
- Description: Integrated Encryption with HPKE using MLKEM1024-P384 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-integrated-table}} of this document
- Recommended: Yes

### HPKE-13-KE
{: toc="exclude"}

- Name: HPKE-13-KE
- Value: TBD (Assumed: 65)
- Description: Key Encryption with HPKE using MLKEM1024-P384 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pqt-hybrid-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-14
{: toc="exclude"}

- Name: HPKE-14
- Value: TBD (Assumed: 66)
- Description: Integrated Encryption with HPKE using ML-KEM-768 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pure-pq-integrated-table}} of this document
- Recommended: Yes

### HPKE-14-KE
{: toc="exclude"}

- Name: HPKE-14-KE
- Value: TBD (Assumed: 67)
- Description: Key Encryption with HPKE using ML-KEM-768 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pure-pq-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-15
{: toc="exclude"}

- Name: HPKE-15
- Value: TBD (Assumed: 68)
- Description: Integrated Encryption with HPKE using ML-KEM-768 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pure-pq-integrated-table}} of this document
- Recommended: Yes

### HPKE-15-KE
{: toc="exclude"}

- Name: HPKE-15-KE
- Value: TBD (Assumed: 69)
- Description: Key Encryption with HPKE using ML-KEM-768 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pure-pq-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-16
{: toc="exclude"}

- Name: HPKE-16
- Value: TBD (Assumed: 70)
- Description: Integrated Encryption with HPKE using ML-KEM-1024 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pure-pq-integrated-table}} of this document
- Recommended: Yes

### HPKE-16-KE
{: toc="exclude"}

- Name: HPKE-16-KE
- Value: TBD (Assumed: 71)
- Description: Key Encryption with HPKE using ML-KEM-1024 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pure-pq-key-encryption-table}} of this document
- Recommended: Yes

### HPKE-17
{: toc="exclude"}

- Name: HPKE-17
- Value: TBD (Assumed: 72)
- Description: Integrated Encryption with HPKE using ML-KEM-1024 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pure-pq-integrated-table}} of this document
- Recommended: Yes

### HPKE-17-KE
{: toc="exclude"}

- Name: HPKE-17-KE
- Value: TBD (Assumed: 73)
- Description: Key Encryption with HPKE using ML-KEM-1024 KEM, SHAKE256 KDF, and ChaCha20Poly1305 AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{cose-pure-pq-key-encryption-table}} of this document
- Recommended: Yes

<!-- end:cose-iana-registrations -->

--- back

# Test Vectors {#test-vectors}

This appendix provides test vectors for each algorithm defined in this document.
For each algorithm, a COSE_Key in both CBOR diagnostic notation and hex-encoded
CBOR is provided, along with a COSE_Encrypt0 (for integrated encryption) or
COSE_Encrypt (for key encryption) example with Additional Authenticated Data.

<!-- begin:cose-test-vectors ; see README for regeneration instructions, do not edit -->

## HPKE-8
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-8-diag.txt}
~~~
{: title="HPKE-8 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-8-hex.txt}
~~~
{: title="HPKE-8 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-8-diag.txt}
~~~
{: title="HPKE-8 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-8-hex.txt}
~~~
{: title="HPKE-8 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-8-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-8-KE-diag.txt}
~~~
{: title="HPKE-8-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-8-KE-hex.txt}
~~~
{: title="HPKE-8-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-8-KE-diag.txt}
~~~
{: title="HPKE-8-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-8-KE-hex.txt}
~~~
{: title="HPKE-8-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-9
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-9-diag.txt}
~~~
{: title="HPKE-9 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-9-hex.txt}
~~~
{: title="HPKE-9 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-9-diag.txt}
~~~
{: title="HPKE-9 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-9-hex.txt}
~~~
{: title="HPKE-9 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-9-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-9-KE-diag.txt}
~~~
{: title="HPKE-9-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-9-KE-hex.txt}
~~~
{: title="HPKE-9-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-9-KE-diag.txt}
~~~
{: title="HPKE-9-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-9-KE-hex.txt}
~~~
{: title="HPKE-9-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-10
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-10-diag.txt}
~~~
{: title="HPKE-10 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-10-hex.txt}
~~~
{: title="HPKE-10 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-10-diag.txt}
~~~
{: title="HPKE-10 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-10-hex.txt}
~~~
{: title="HPKE-10 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-10-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-10-KE-diag.txt}
~~~
{: title="HPKE-10-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-10-KE-hex.txt}
~~~
{: title="HPKE-10-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-10-KE-diag.txt}
~~~
{: title="HPKE-10-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-10-KE-hex.txt}
~~~
{: title="HPKE-10-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-11
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-11-diag.txt}
~~~
{: title="HPKE-11 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-11-hex.txt}
~~~
{: title="HPKE-11 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-11-diag.txt}
~~~
{: title="HPKE-11 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-11-hex.txt}
~~~
{: title="HPKE-11 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-11-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-11-KE-diag.txt}
~~~
{: title="HPKE-11-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-11-KE-hex.txt}
~~~
{: title="HPKE-11-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-11-KE-diag.txt}
~~~
{: title="HPKE-11-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-11-KE-hex.txt}
~~~
{: title="HPKE-11-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-12
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-12-diag.txt}
~~~
{: title="HPKE-12 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-12-hex.txt}
~~~
{: title="HPKE-12 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-12-diag.txt}
~~~
{: title="HPKE-12 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-12-hex.txt}
~~~
{: title="HPKE-12 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-12-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-12-KE-diag.txt}
~~~
{: title="HPKE-12-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-12-KE-hex.txt}
~~~
{: title="HPKE-12-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-12-KE-diag.txt}
~~~
{: title="HPKE-12-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-12-KE-hex.txt}
~~~
{: title="HPKE-12-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-13
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-13-diag.txt}
~~~
{: title="HPKE-13 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-13-hex.txt}
~~~
{: title="HPKE-13 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-13-diag.txt}
~~~
{: title="HPKE-13 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-13-hex.txt}
~~~
{: title="HPKE-13 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-13-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-13-KE-diag.txt}
~~~
{: title="HPKE-13-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-13-KE-hex.txt}
~~~
{: title="HPKE-13-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-13-KE-diag.txt}
~~~
{: title="HPKE-13-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-13-KE-hex.txt}
~~~
{: title="HPKE-13-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-14
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-14-diag.txt}
~~~
{: title="HPKE-14 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-14-hex.txt}
~~~
{: title="HPKE-14 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-14-diag.txt}
~~~
{: title="HPKE-14 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-14-hex.txt}
~~~
{: title="HPKE-14 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-14-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-14-KE-diag.txt}
~~~
{: title="HPKE-14-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-14-KE-hex.txt}
~~~
{: title="HPKE-14-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-14-KE-diag.txt}
~~~
{: title="HPKE-14-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-14-KE-hex.txt}
~~~
{: title="HPKE-14-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-15
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-15-diag.txt}
~~~
{: title="HPKE-15 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-15-hex.txt}
~~~
{: title="HPKE-15 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-15-diag.txt}
~~~
{: title="HPKE-15 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-15-hex.txt}
~~~
{: title="HPKE-15 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-15-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-15-KE-diag.txt}
~~~
{: title="HPKE-15-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-15-KE-hex.txt}
~~~
{: title="HPKE-15-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-15-KE-diag.txt}
~~~
{: title="HPKE-15-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-15-KE-hex.txt}
~~~
{: title="HPKE-15-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-16
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-16-diag.txt}
~~~
{: title="HPKE-16 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-16-hex.txt}
~~~
{: title="HPKE-16 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-16-diag.txt}
~~~
{: title="HPKE-16 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-16-hex.txt}
~~~
{: title="HPKE-16 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-16-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-16-KE-diag.txt}
~~~
{: title="HPKE-16-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-16-KE-hex.txt}
~~~
{: title="HPKE-16-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-16-KE-diag.txt}
~~~
{: title="HPKE-16-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-16-KE-hex.txt}
~~~
{: title="HPKE-16-KE COSE_Encrypt (Hex-Encoded CBOR)"}

## HPKE-17
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-17-diag.txt}
~~~
{: title="HPKE-17 COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-17-hex.txt}
~~~
{: title="HPKE-17 COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-17-diag.txt}
~~~
{: title="HPKE-17 COSE_Encrypt0 (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-17-hex.txt}
~~~
{: title="HPKE-17 COSE_Encrypt0 (Hex-Encoded CBOR)"}

## HPKE-17-KE
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/HPKE-17-KE-diag.txt}
~~~
{: title="HPKE-17-KE COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/HPKE-17-KE-hex.txt}
~~~
{: title="HPKE-17-KE COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/HPKE-17-KE-diag.txt}
~~~
{: title="HPKE-17-KE COSE_Encrypt (Diagnostic Notation)"}

~~~
{::include examples/cose/HPKE-17-KE-hex.txt}
~~~
{: title="HPKE-17-KE COSE_Encrypt (Hex-Encoded CBOR)"}

<!-- end:cose-test-vectors -->

# Acknowledgments
{:numbered="false"}

TODO acknowledge.

# Document History
{:numbered="false"}

draft-skokan-cose-hpke-pq-pqt-00

- Initial draft
