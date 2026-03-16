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

// Each suite is [KEM, KDF, AEAD] or [KEM, KDF, AEAD, options].
// By default both an integrated encryption and a -KE (Key Encryption)
// variant are emitted for each suite. To skip an algorithm entirely for
// JOSE pass { jose: false }, for COSE pass { cose: false }. To suppress
// only the -KE variant pass { joseKe: false } or { coseKe: false }.
const suites = [
  // PQ/T Hybrid
  [KEM_MLKEM768_P256, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_MLKEM768_P256, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false }],
  [KEM_MLKEM768_X25519, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_MLKEM768_X25519, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false }],
  [KEM_MLKEM1024_P384, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_MLKEM1024_P384, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false }],
  // Pure PQ
  [KEM_ML_KEM_512, KDF_SHAKE256, AEAD_AES_128_GCM, { jose: false }],
  [KEM_ML_KEM_768, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_ML_KEM_768, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false }],
  [KEM_ML_KEM_1024, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_ML_KEM_1024, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { jose: false }],
];

// COSE algorithm values continue from where I-D.ietf-cose-hpke ends (value 53).
const coseStartValue = 54;

export const algorithms = (() => {
  let algIdx = startIndex;
  let coseIdx = 0;
  return suites.flatMap(([kem, kdf, aead, options]) => {
    const alg = `HPKE-${algIdx++}`;
    const jose = options?.jose !== false;
    const cose = options?.cose !== false;
    const base = { alg, kem, kdf, aead, coseValue: coseStartValue + coseIdx++, jose, cose };
    const result = [base];
    const joseKe = jose && options?.joseKe !== false;
    const coseKe = cose && options?.coseKe !== false;
    if (joseKe || coseKe) {
      result.push({ alg: `${alg}-KE`, kem, kdf, aead, coseValue: coseStartValue + coseIdx++, jose: joseKe, cose: coseKe });
    }
    return result;
  });
})();
