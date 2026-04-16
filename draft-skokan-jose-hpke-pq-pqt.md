---
title: "JOSE HPKE PQ & PQ/T Algorithm Registrations"
abbrev: "JOSE HPKE PQ"
category: std

docname: draft-skokan-jose-hpke-pq-pqt-latest
submissiontype: IETF
number:
date:
consensus: true
v: 3
area: "Security"
workgroup: "Javascript Object Signing and Encryption"
keyword:
 - JOSE
 - HPKE
 - post-quantum
 - hybrid
 - ML-KEM
 - PQ
 - PQ/T
 - JWE
 - CRQC
venue:
  group: "Javascript Object Signing and Encryption"
  type: "Working Group"
  mail: "jose@ietf.org"
  arch: "https://mailarchive.ietf.org/arch/browse/jose/"
  github: "panva/jose-hpke-pq-pqt"
  latest: "https://panva.github.io/jose-hpke-pq-pqt/draft-skokan-jose-hpke-pq-pqt.html"

author:
 -
    fullname: Filip Skokan
    organization: Okta
    email: panva.ip@gmail.com
 -
    fullname: Brian Campbell
    organization: Ping Identity
    email: bcampbell@pingidentity.com
 -
    fullname: Hannes Tschofenig
    email: hannes.tschofenig@gmx.net
 -
    fullname: Tirumaleswar Reddy
    organization: Nokia
    email: k.tirumaleswar_reddy@nokia.com

normative:
  I-D.ietf-jose-hpke-encrypt:
  I-D.ietf-hpke-pq:
  I-D.ietf-cose-dilithium:

informative:
  RFC7518:
  NIST-PQC-CFP:
    title: "Submission Requirements and Evaluation Criteria for the Post-Quantum Cryptography Standardization Process"
    author:
      org: National Institute of Standards and Technology
    date: 2016-12
    target: https://csrc.nist.gov/CSRC/media/Projects/Post-Quantum-Cryptography/documents/call-for-proposals-final-dec-2016.pdf

...

--- abstract

This document registers Post-Quantum (PQ) and Post-Quantum/Traditional (PQ/T)
hybrid algorithm identifiers for use with JSON Object Signing and Encryption
(JOSE), building on the Hybrid Public Key Encryption (HPKE) framework.


--- middle

# Introduction

{{I-D.ietf-jose-hpke-encrypt}} defines how to use Hybrid Public Key Encryption
(HPKE) with JSON Web Encryption (JWE) using traditional Key Encapsulation Mechanisms
(KEM) based on Elliptic-curve Diffie-Hellman (ECDH).

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

This section defines the algorithm identifiers for PQ and PQ/T HPKE-based
encryption in JOSE. Each algorithm is defined by a combination of an HPKE KEM,
a Key Derivation Function (KDF), and an Authenticated Encryption with
Associated Data (AEAD) algorithm.

All algorithms defined in this section follow the same operational model as
those in {{I-D.ietf-jose-hpke-encrypt}}, supporting both integrated encryption
as defined in {{Section 5 of I-D.ietf-jose-hpke-encrypt}} and key encryption
as defined in {{Section 6 of I-D.ietf-jose-hpke-encrypt}}.

Test vectors for all algorithms defined in this section are provided in
{{test-vectors}}.

## PQ/T Hybrid Integrated Encryption Algorithms

The following table lists the algorithm identifiers for PQ/T hybrid integrated
encryption, where HPKE directly encrypts the plaintext without a separate
Content Encryption Key:

<!-- begin:table pqt-hybrid-integrated-table "PQ/T Hybrid Integrated Encryption Algorithms" ; see README for regeneration instructions, do not edit -->

| "alg" value | HPKE KEM                   | HPKE KDF            | HPKE AEAD              |
| ----------- | -------------------------- | ------------------- | ---------------------- |
| HPKE-8      | MLKEM768-P256 (`0x0050`)   | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
| HPKE-10     | MLKEM768-X25519 (`0x647a`) | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
| HPKE-12     | MLKEM1024-P384 (`0x0051`)  | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
{: #pqt-hybrid-integrated-table title="PQ/T Hybrid Integrated Encryption Algorithms" }

<!-- end:table -->

These algorithms combine ML-KEM with a traditional elliptic curve algorithm in a PQ/T
hybrid KEM construction, with the goal that compromise of either the post-quantum or
the traditional component alone does not undermine the security of the resulting encryption.

## Pure PQ Integrated Encryption Algorithms

The following table lists the algorithm identifiers for pure post-quantum
integrated encryption:

<!-- begin:table pure-pq-integrated-table "Pure PQ Integrated Encryption Algorithms" ; see README for regeneration instructions, do not edit -->

| "alg" value | HPKE KEM               | HPKE KDF            | HPKE AEAD              |
| ----------- | ---------------------- | ------------------- | ---------------------- |
| HPKE-15     | ML-KEM-768 (`0x0041`)  | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
| HPKE-17     | ML-KEM-1024 (`0x0042`) | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
{: #pure-pq-integrated-table title="Pure PQ Integrated Encryption Algorithms" }

<!-- end:table -->

These algorithms provide pure post-quantum security using ML-KEM without a
traditional algorithm component.

## PQ/T Hybrid Key Encryption Algorithms

The following table lists the algorithm identifiers for PQ/T hybrid key
encryption, where HPKE encrypts the Content Encryption Key:

<!-- begin:table pqt-hybrid-key-encryption-table "PQ/T Hybrid Key Encryption Algorithms" ; see README for regeneration instructions, do not edit -->

| "alg" value | HPKE KEM                   | HPKE KDF            | HPKE AEAD              |
| ----------- | -------------------------- | ------------------- | ---------------------- |
| HPKE-8-KE   | MLKEM768-P256 (`0x0050`)   | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
| HPKE-10-KE  | MLKEM768-X25519 (`0x647a`) | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
| HPKE-12-KE  | MLKEM1024-P384 (`0x0051`)  | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
{: #pqt-hybrid-key-encryption-table title="PQ/T Hybrid Key Encryption Algorithms" }

<!-- end:table -->

These are the key encryption counterparts of the PQ/T hybrid integrated
encryption algorithms defined in {{pqt-hybrid-integrated-table}}.

## Pure PQ Key Encryption Algorithms

The following table lists the algorithm identifiers for pure post-quantum key
encryption:

<!-- begin:table pure-pq-key-encryption-table "Pure PQ Key Encryption Algorithms" ; see README for regeneration instructions, do not edit -->

| "alg" value | HPKE KEM               | HPKE KDF            | HPKE AEAD              |
| ----------- | ---------------------- | ------------------- | ---------------------- |
| HPKE-15-KE  | ML-KEM-768 (`0x0041`)  | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
| HPKE-17-KE  | ML-KEM-1024 (`0x0042`) | SHAKE256 (`0x0011`) | AES-256-GCM (`0x0002`) |
{: #pure-pq-key-encryption-table title="Pure PQ Key Encryption Algorithms" }

<!-- end:table -->

These are the key encryption counterparts of the pure PQ integrated
encryption algorithms defined in {{pure-pq-integrated-table}}.


# JSON Web Key Representation

Keys for the algorithms defined in this document use the "AKP" (Algorithm
Key Pair) key type defined in {{I-D.ietf-cose-dilithium}}.

For the algorithms in this document, the "pub" parameter contains the
base64url encoding of HPKE's SerializePublicKey() output for the
corresponding KEM, and the "priv" parameter contains the base64url encoding
of HPKE's SerializePrivateKey() output.

Examples of JWKs for each algorithm are provided in {{test-vectors}}.


# Security Considerations

The security considerations of {{I-D.ietf-jose-hpke-encrypt}} and
{{I-D.ietf-hpke-pq}} apply to this document.

This document does not register algorithms using ML-KEM-512. As noted
in {{Section 3 of I-D.ietf-hpke-pq}}, given the relative novelty of
ML-KEM, there is concern that new cryptanalysis might reduce the
security level of ML-KEM-512. Use of ML-KEM-768 or ML-KEM-1024 acts
as a hedge against such cryptanalysis at a modest performance penalty.

When the Key Encryption algorithms defined in
{{pqt-hybrid-key-encryption-table}} or {{pure-pq-key-encryption-table}}
are used in a General JWE JSON Serialization with multiple recipients,
all recipients MUST use a quantum-resistant Key Management algorithm.
Including a recipient that uses a quantum-susceptible algorithm would
allow an adversary performing a Harvest Now, Decrypt Later (HNDL)
attack to recover the Content Encryption Key once a cryptographically
relevant quantum computer becomes available.

## Security Strength

Ciphersuites based on ML-KEM-768 target NIST post-quantum security
Category 3; those based on ML-KEM-1024 target Category 5 (see Section
4.A.5 of {{NIST-PQC-CFP}}). In the PQ/T hybrid ciphersuites,
the traditional component provides an additional classical security floor:
P-256 and X25519 offer approximately 128-bit classical security, while P-384
offers approximately 192-bit classical security. The -KE variants share the
same cryptographic properties as their integrated encryption counterparts.

All ciphersuites use SHAKE256 as the KDF, aligning with the hash family used
internally by ML-KEM, and AES-256-GCM as the AEAD.


# IANA Considerations

## JSON Web Signature and Encryption Algorithms Registry

This document requests registration of the following values in the
IANA "JSON Web Signature and Encryption Algorithms" registry
established by {{RFC7518}}:

Note: The Algorithm Name numbering has intentional gaps so that a
given identifier (e.g. HPKE-10) always denotes the same HPKE KEM,
KDF, and AEAD combination regardless of whether it is used in JOSE
or COSE. The gaps correspond to algorithms registered only in COSE
for COSE-specific needs that do not apply to JOSE.

<!-- begin:iana-registrations ; see README for regeneration instructions, do not edit -->

### HPKE-8
{: toc="exclude"}

- Algorithm Name: HPKE-8
- Algorithm Description: Integrated Encryption with HPKE using MLKEM768-P256 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pqt-hybrid-integrated-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-8-KE
{: toc="exclude"}

- Algorithm Name: HPKE-8-KE
- Algorithm Description: Key Encryption with HPKE using MLKEM768-P256 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pqt-hybrid-key-encryption-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-10
{: toc="exclude"}

- Algorithm Name: HPKE-10
- Algorithm Description: Integrated Encryption with HPKE using MLKEM768-X25519 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pqt-hybrid-integrated-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-10-KE
{: toc="exclude"}

- Algorithm Name: HPKE-10-KE
- Algorithm Description: Key Encryption with HPKE using MLKEM768-X25519 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pqt-hybrid-key-encryption-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-12
{: toc="exclude"}

- Algorithm Name: HPKE-12
- Algorithm Description: Integrated Encryption with HPKE using MLKEM1024-P384 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pqt-hybrid-integrated-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-12-KE
{: toc="exclude"}

- Algorithm Name: HPKE-12-KE
- Algorithm Description: Key Encryption with HPKE using MLKEM1024-P384 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pqt-hybrid-key-encryption-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-15
{: toc="exclude"}

- Algorithm Name: HPKE-15
- Algorithm Description: Integrated Encryption with HPKE using ML-KEM-768 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pure-pq-integrated-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-15-KE
{: toc="exclude"}

- Algorithm Name: HPKE-15-KE
- Algorithm Description: Key Encryption with HPKE using ML-KEM-768 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pure-pq-key-encryption-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-17
{: toc="exclude"}

- Algorithm Name: HPKE-17
- Algorithm Description: Integrated Encryption with HPKE using ML-KEM-1024 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pure-pq-integrated-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

### HPKE-17-KE
{: toc="exclude"}

- Algorithm Name: HPKE-17-KE
- Algorithm Description: Key Encryption with HPKE using ML-KEM-1024 KEM, SHAKE256 KDF, and AES-256-GCM AEAD
- Algorithm Usage Location(s): "alg"
- JOSE Implementation Requirements: Optional
- Change Controller: IETF
- Specification Document(s): {{pure-pq-key-encryption-table}} of this document
- Algorithm Analysis Document(s): {{I-D.ietf-hpke-pq}}

<!-- end:iana-registrations -->

--- back

# Test Vectors {#test-vectors}

This appendix provides test vectors for each algorithm defined in this document.
For each algorithm, a private JWK, a Flattened JWE JSON Serialization example with
Additional Authenticated Data, and a JWE Compact Serialization example are provided.

<!-- begin:test-vectors ; see README for regeneration instructions, do not edit -->

## HPKE-8
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-8.json}
~~~
{: title="HPKE-8 Private JWK"}

~~~ json
{::include examples/jwe/HPKE-8-flattened.json}
~~~
{: title="HPKE-8 Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-8-compact.txt}
~~~
{: title="HPKE-8 JWE Compact Serialization"}

## HPKE-8-KE
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-8-KE.json}
~~~
{: title="HPKE-8-KE Private JWK"}

~~~ json
{::include examples/jwe/HPKE-8-KE-flattened.json}
~~~
{: title="HPKE-8-KE Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-8-KE-compact.txt}
~~~
{: title="HPKE-8-KE JWE Compact Serialization"}

## HPKE-10
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-10.json}
~~~
{: title="HPKE-10 Private JWK"}

~~~ json
{::include examples/jwe/HPKE-10-flattened.json}
~~~
{: title="HPKE-10 Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-10-compact.txt}
~~~
{: title="HPKE-10 JWE Compact Serialization"}

## HPKE-10-KE
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-10-KE.json}
~~~
{: title="HPKE-10-KE Private JWK"}

~~~ json
{::include examples/jwe/HPKE-10-KE-flattened.json}
~~~
{: title="HPKE-10-KE Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-10-KE-compact.txt}
~~~
{: title="HPKE-10-KE JWE Compact Serialization"}

## HPKE-12
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-12.json}
~~~
{: title="HPKE-12 Private JWK"}

~~~ json
{::include examples/jwe/HPKE-12-flattened.json}
~~~
{: title="HPKE-12 Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-12-compact.txt}
~~~
{: title="HPKE-12 JWE Compact Serialization"}

## HPKE-12-KE
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-12-KE.json}
~~~
{: title="HPKE-12-KE Private JWK"}

~~~ json
{::include examples/jwe/HPKE-12-KE-flattened.json}
~~~
{: title="HPKE-12-KE Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-12-KE-compact.txt}
~~~
{: title="HPKE-12-KE JWE Compact Serialization"}

## HPKE-15
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-15.json}
~~~
{: title="HPKE-15 Private JWK"}

~~~ json
{::include examples/jwe/HPKE-15-flattened.json}
~~~
{: title="HPKE-15 Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-15-compact.txt}
~~~
{: title="HPKE-15 JWE Compact Serialization"}

## HPKE-15-KE
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-15-KE.json}
~~~
{: title="HPKE-15-KE Private JWK"}

~~~ json
{::include examples/jwe/HPKE-15-KE-flattened.json}
~~~
{: title="HPKE-15-KE Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-15-KE-compact.txt}
~~~
{: title="HPKE-15-KE JWE Compact Serialization"}

## HPKE-17
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-17.json}
~~~
{: title="HPKE-17 Private JWK"}

~~~ json
{::include examples/jwe/HPKE-17-flattened.json}
~~~
{: title="HPKE-17 Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-17-compact.txt}
~~~
{: title="HPKE-17 JWE Compact Serialization"}

## HPKE-17-KE
{: toc="exclude"}

~~~ json
{::include examples/jwks/HPKE-17-KE.json}
~~~
{: title="HPKE-17-KE Private JWK"}

~~~ json
{::include examples/jwe/HPKE-17-KE-flattened.json}
~~~
{: title="HPKE-17-KE Flattened JWE JSON Serialization"}

~~~
{::include examples/jwe/HPKE-17-KE-compact.txt}
~~~
{: title="HPKE-17-KE JWE Compact Serialization"}

<!-- end:test-vectors -->

# Acknowledgments
{:numbered="false"}

TODO acknowledge.

# Document History
{:numbered="false"}

draft-skokan-jose-hpke-pq-pqt-04

- Add Security Strength section to Security Considerations
- Removed ChaCha20Poly1305 HPKE AEAD algorithms
- Re-numbered the algorithms to leave gaps in place for
  core algorithm name alignment with COSE algorithms
- Added Hannes and Tiru as authors

draft-skokan-jose-hpke-pq-pqt-03

- Clarified "hybrid" terminology disambiguation in the Introduction
- Added descriptive text to Key Encryption algorithm sections
- Expanded Security Considerations with ML-KEM-512 omission rationale

draft-skokan-jose-hpke-pq-pqt-02

- Added Test Vectors appendix

draft-skokan-jose-hpke-pq-pqt-01

- Added example JWK representations

draft-skokan-jose-hpke-pq-pqt-00

- Initial draft
