import {
  KEM_MLKEM768_P256,
  KEM_MLKEM768_X25519,
  KEM_MLKEM1024_P384,
  KEM_ML_KEM_512,
  KEM_ML_KEM_768,
  KEM_ML_KEM_1024,
  KDF_SHAKE256,
  AEAD_AES_128_GCM,
  AEAD_AES_256_GCM,
  AEAD_ChaCha20Poly1305,
} from "hpke";

// HPKE-1 through HPKE-7 names are registered by I-D.ietf-jose-hpke-encrypt
// and I-D.ietf-cose-hpke.
// startIndex sets the first "alg" number so that algorithms defined here
// are named HPKE-8, HPKE-9, ... continuing from where those documents end.
const startIndex = 8;

// Each suite is [KEM, KDF, AEAD, { jose, cose, joseKe?, coseKe? }].
// One integrated encryption algorithm and one -KE (Key Encryption) variant
// are emitted per suite. joseKe/coseKe default to jose/cose; pass them
// explicitly only to suppress the -KE variant for that format.
const suites = [
  // PQ/T Hybrid
  [KEM_MLKEM768_P256,   KDF_SHAKE256, AEAD_AES_256_GCM,      { jose: true,  cose: true }],
  [KEM_MLKEM768_X25519, KDF_SHAKE256, AEAD_AES_256_GCM,      { jose: true,  cose: true }],
  [KEM_MLKEM1024_P384,  KDF_SHAKE256, AEAD_AES_256_GCM,      { jose: true,  cose: true }],
  // Pure PQ
  [KEM_ML_KEM_512,      KDF_SHAKE256, AEAD_AES_128_GCM,      { jose: false, cose: true }],
  [KEM_ML_KEM_768,      KDF_SHAKE256, AEAD_AES_256_GCM,      { jose: true,  cose: true }],
  [KEM_ML_KEM_1024,     KDF_SHAKE256, AEAD_AES_256_GCM,      { jose: true,  cose: true }],

  // ChaCha-Variants backup
  // PQ/T Hybrid
  [KEM_MLKEM768_P256,   KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false, cose: false }],
  [KEM_MLKEM768_X25519, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false, cose: false }],
  [KEM_MLKEM1024_P384,  KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false, cose: false }],
  // Pure PQ
  [KEM_ML_KEM_768,      KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false, cose: false }],
  [KEM_ML_KEM_1024,     KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false, cose: false }],
];

// COSE algorithm values continue from where I-D.ietf-cose-hpke ends (value 53).
const coseStartValue = 54;

export const algorithms = (() => {
  let algIdx = startIndex;
  let coseIdx = 0;
  return suites.flatMap(([kem, kdf, aead, { jose, cose, joseKe = jose, coseKe = cose }]) => {
    const alg = `HPKE-${algIdx++}`;
    const base = { alg, kem, kdf, aead, coseValue: coseStartValue + coseIdx++, jose, cose };
    const ke = { alg: `${alg}-KE`, kem, kdf, aead, coseValue: coseStartValue + coseIdx++, jose: joseKe, cose: coseKe };
    return [base, ke];
  });
})();
