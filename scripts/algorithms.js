import {
  KEM_MLKEM768_P256,
  KEM_MLKEM768_X25519,
  KEM_MLKEM1024_P384,
  KEM_ML_KEM_768,
  KEM_ML_KEM_1024,
  KDF_SHAKE256,
  AEAD_AES_256_GCM,
  AEAD_ChaCha20Poly1305,
} from "hpke";

// HPKE-1 through HPKE-7 are registered by I-D.ietf-jose-hpke-encrypt.
// startIndex sets the first "alg" number so that algorithms defined here
// are named HPKE-8, HPKE-9, ... continuing from where that document ends.
const startIndex = 8;

// Each suite is [KEM, KDF, AEAD] or [KEM, KDF, AEAD, options].
// By default both an integrated encryption and a -KE (Key Encryption)
// variant are emitted for each suite. To suppress the -KE variant for
// JOSE pass { joseKe: false }, for COSE pass { coseKe: false }.
const suites = [
  // PQ/T Hybrid
  [KEM_MLKEM768_P256, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_MLKEM768_P256, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { joseKe: false }],
  [KEM_MLKEM768_X25519, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_MLKEM768_X25519, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { joseKe: false }],
  [KEM_MLKEM1024_P384, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_MLKEM1024_P384, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { joseKe: false }],
  // Pure PQ
  [KEM_ML_KEM_768, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_ML_KEM_768, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { joseKe: false }],
  [KEM_ML_KEM_1024, KDF_SHAKE256, AEAD_AES_256_GCM],
  [KEM_ML_KEM_1024, KDF_SHAKE256, AEAD_ChaCha20Poly1305, { joseKe: false }],
];

// COSE algorithm values continue from where I-D.ietf-cose-hpke ends (value 53).
const coseStartValue = 54;

export const algorithms = (() => {
  let coseIdx = 0;
  return suites.flatMap(([kem, kdf, aead, options], i) => {
    const alg = `HPKE-${startIndex + i}`;
    const base = { alg, kem, kdf, aead, coseValue: coseStartValue + coseIdx++, jose: true, cose: true };
    const result = [base];
    const joseKe = options?.joseKe !== false;
    const coseKe = options?.coseKe !== false;
    if (joseKe || coseKe) {
      result.push({ alg: `${alg}-KE`, kem, kdf, aead, coseValue: coseStartValue + coseIdx++, jose: joseKe, cose: coseKe });
    }
    return result;
  });
})();
