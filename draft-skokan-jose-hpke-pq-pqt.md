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
  github: "panva/draft-jose-hpke-pq-pqt"
  latest: "https://panva.github.io/draft-jose-hpke-pq-pqt/draft-skokan-jose-hpke-pq-pqt.html"

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
    organization: University of the Bundeswehr Munich
    abbrev: UniBw M.
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
  I-D.ietf-pquip-pqc-engineers:
  CNSA2.0:
    title: "Announcing the Commercial National Security Algorithm Suite 2.0"
    author:
      org: National Security Agency
    date: 2025-05
    target: https://media.defense.gov/2025/May/30/2003728741/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS.PDF

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
Key Pair) key type defined in {{Section 3 of I-D.ietf-cose-dilithium}}.
The required "alg" parameter identifies the HPKE ciphersuite as well as
whether the key is used for Integrated Encryption or Key Encryption.

The required "pub" parameter contains the SerializePublicKey() output
for the corresponding KEM, and for private keys the "priv" parameter
contains the SerializePrivateKey() output, both as defined in
{{Section 4 of !I-D.ietf-hpke-hpke}}. Both values are base64url-encoded
({{Section 5 of !RFC4648}}) without padding.

Examples of JWKs for each algorithm are provided in {{test-vectors}}.


# Security Considerations

The security considerations of {{I-D.ietf-jose-hpke-encrypt}} and
{{I-D.ietf-hpke-pq}} apply to this document.
{{I-D.ietf-pquip-pqc-engineers}} provides general background on the
threat posed by cryptographically relevant quantum computers (CRQCs),
the properties of KEMs, and considerations for PQ/T hybrid schemes.

This document does not register algorithms using ML-KEM-512. As noted
in {{Section 3 of I-D.ietf-hpke-pq}}, given the relative novelty of
ML-KEM, there is concern that new cryptanalysis might reduce the
security level of ML-KEM-512. Use of ML-KEM-768 or ML-KEM-1024 acts
as a hedge against such cryptanalysis at a modest performance penalty.

The PQ/T hybrid ciphersuites registered by this document are motivated
by the PQ/T Hybrid Confidentiality property described in
{{Section 13.1 of I-D.ietf-pquip-pqc-engineers}}: confidentiality is
preserved as long as at least one of the component algorithms remains
secure. The traditional component protects against unforeseen
cryptanalysis of ML-KEM, while the post-quantum component protects
against Harvest Now, Decrypt Later (HNDL) attacks
({{Section 7 of I-D.ietf-pquip-pqc-engineers}}) by a future CRQC.
PQ/T hybrid ciphersuites are generally preferred for this reason during
the transition to post-quantum cryptography.

The pure PQ ciphersuites are registered to accommodate deployments with
regulatory or compliance mandates that require the exclusive use of
post-quantum algorithms, such as those governed by the Commercial
National Security Algorithm Suite 2.0 {{CNSA2.0}}, as well as
deployments where the size or performance overhead of a traditional
component is undesirable.

When the Key Encryption algorithms defined in
{{pqt-hybrid-key-encryption-table}} or {{pure-pq-key-encryption-table}}
are used in a General JWE JSON Serialization with multiple recipients,
all recipients MUST use a quantum-resistant Key Management algorithm.
Including a recipient that uses a quantum-susceptible algorithm would
allow an adversary performing an HNDL attack to recover the Content
Encryption Key once a CRQC becomes available; see
{{Section 15.4 of I-D.ietf-pquip-pqc-engineers}}.

## Security Strength

Ciphersuites based on ML-KEM-768 target NIST post-quantum security
level 3; those based on ML-KEM-1024 target security level 5 (see
{{Section 11 of I-D.ietf-pquip-pqc-engineers}}).
In the PQ/T hybrid ciphersuites, the traditional component provides an
additional classical security floor: P-256 and X25519 offer approximately
128-bit classical security, while P-384 offers approximately 192-bit
classical security. The -KE variants share the same cryptographic
properties as their integrated encryption counterparts.

All ciphersuites use SHAKE256 as the KDF, aligning with the hash family
used internally by ML-KEM, and AES-256-GCM as the AEAD. As discussed in
{{Section 3.1 of I-D.ietf-pquip-pqc-engineers}}, symmetric primitives are
only modestly affected by quantum attacks and doubling key sizes is not
strictly required; AES-256-GCM is nonetheless selected to provide a
comfortable margin consistent with security level 5 parameter sets and
with contemporary guidance such as {{CNSA2.0}}.


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

- Removed ChaCha20Poly1305 AEAD ciphersuites
- Renumbered algorithms with intentional gaps to align identifiers with
  COSE; added an explanatory note in IANA Considerations
- Added a Security Strength subsection and HNDL/multi-recipient
  guidance to Security Considerations
- Refactored the JSON Web Key Representation section
- Added informative references to I-D.ietf-pquip-pqc-engineers and
  CNSA 2.0
- Added Hannes Tschofenig and Tirumaleswar Reddy as authors

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
