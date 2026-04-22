export default function coseIanaEntry(entry) {
  const { alg, isKE, specTable, suite, coseValue } = entry;
  const mode = isKE ? "Key Encryption" : "Integrated Encryption";

  return `### ${alg}
{: toc="exclude"}

- Name: ${alg}
- Value: TBD (Assumed: ${coseValue})
- Description: ${mode} with HPKE using ${suite.KEM.name} KEM, ${suite.KDF.name} KDF, and ${suite.AEAD.name} AEAD
- Capabilities: [kty]
- Change Controller: IETF
- Reference: {{${specTable}}} of this document
- Recommended: Yes`;
}
