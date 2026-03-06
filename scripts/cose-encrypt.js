import { CipherSuite, AEAD_ChaCha20Poly1305 } from "hpke";
import { encode, decode, Tag } from "cbor2";
import { algorithms } from "./algorithms.js";

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createCipheriv, randomBytes } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const coseKeysDir = join(__dirname, "..", "examples", "cose-keys");
const outDir = join(__dirname, "..", "examples", "cose");
mkdirSync(outDir, { recursive: true });

const plaintext = new TextEncoder().encode(
  "You can trust us to stick with you through thick and thin–to the bitter end. And you can trust us to keep any secret of yours–closer than you keep it yourself. But you cannot trust us to let you face trouble alone, and go off without a word. We are your friends, Frodo.",
);

const externalAad = new TextEncoder().encode("The Fellowship of the Ring");

const EK_LABEL = -4; // COSE header label for encapsulated key

// COSE content encryption algorithms
const CONTENT_ALG_A256GCM = 3;
const CONTENT_ALG_CHACHA20POLY1305 = 24;

// Build Enc_structure for COSE_Encrypt0 (RFC 9052 Section 5.3)
// Enc_structure = ["Encrypt0", protected, external_aad]
function encrypt0EncStructure(protectedHeader, externalAad) {
  return encode(["Encrypt0", protectedHeader, externalAad]);
}

// Build Enc_structure for COSE_Encrypt Layer 0 (RFC 9052 Section 5.3)
// Enc_structure = ["Encrypt", protected, external_aad]
function encryptEncStructure(protectedHeader, externalAad) {
  return encode(["Encrypt", protectedHeader, externalAad]);
}

// Build HPKE Recipient_structure for Key Encryption mode
// (draft-ietf-cose-hpke Section 3.3)
// ["HPKE Recipient", content_alg, recipient_protected, recipient_extra_info]
function hpkeRecipientStructure(
  contentAlg,
  recipientProtected,
  recipientExtraInfo,
) {
  return encode([
    "HPKE Recipient",
    contentAlg,
    recipientProtected,
    recipientExtraInfo,
  ]);
}

// Content encryption for Layer 0
function contentEncrypt(cipherName, key, iv, plaintext, aad) {
  const options = cipherName === "chacha20-poly1305" ? { authTagLength: 16 } : undefined;
  const cipher = createCipheriv(cipherName, key, iv, options);
  cipher.setAAD(aad, options);
  const encrypted = Buffer.concat([
    cipher.update(plaintext),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return new Uint8Array(Buffer.concat([encrypted, tag]));
}

function hexStr(bytes) {
  return `h'${Buffer.from(bytes).toString("hex")}'`;
}

function formatEncrypt0Diag(protectedHeader, kid, ek, ciphertext) {
  const lines = [
    "/ COSE_Encrypt0 / 16([",
    `  / protected / ${hexStr(protectedHeader)},`,
    "  / unprotected / {",
    `    / kid / 4: ${hexStr(kid)},`,
    `    / ek / -4: ${hexStr(ek)}`,
    "  },",
    `  / ciphertext / ${hexStr(ciphertext)}`,
    "])",
  ];
  return lines.join("\n");
}

function formatEncryptDiag(
  layer0Protected, iv, contentCiphertext,
  recipientProtected, ek, wrappedCek,
) {
  const lines = [
    "/ COSE_Encrypt / 96([",
    `  / protected / ${hexStr(layer0Protected)},`,
    "  / unprotected / {",
    `    / iv / 5: ${hexStr(iv)}`,
    "  },",
    `  / ciphertext / ${hexStr(contentCiphertext)},`,
    "  / recipients / [",
    "    [",
    `      / protected / ${hexStr(recipientProtected)},`,
    "      / unprotected / {",
    `        / ek / -4: ${hexStr(ek)}`,
    "      },",
    `      / ciphertext / ${hexStr(wrappedCek)}`,
    "    ]",
    "  ]",
    "])",
  ];
  return lines.join("\n");
}

for (const { alg, kem, kdf, aead, coseValue } of algorithms.filter(a => a.cose)) {
  const isKE = alg.endsWith("-KE");

  const suite = new CipherSuite(kem, kdf, aead);

  // Read the COSE_Key hex to get the key material
  const keyHex = readFileSync(join(coseKeysDir, `${alg}-hex.txt`), "utf8").replace(/\s/g, "");
  const keyBytes = Buffer.from(keyHex, "hex");

  // Decode the COSE_Key to extract pub and kid
  const coseKey = decode(keyBytes);
  const pub = new Uint8Array(coseKey.get(-1));
  const kid = new Uint8Array(coseKey.get(2));

  const publicKey = await suite.DeserializePublicKey(pub);

  if (isKE) {
    // === Key Encryption Mode: COSE_Encrypt (Tag 96) ===

    // Determine content encryption algorithm based on HPKE AEAD
    const isChaCha = aead === AEAD_ChaCha20Poly1305;
    const contentAlg = isChaCha ? CONTENT_ALG_CHACHA20POLY1305 : CONTENT_ALG_A256GCM;
    const contentCipher = isChaCha ? "chacha20-poly1305" : "aes-256-gcm";

    // Layer 0: content encryption
    const cek = new Uint8Array(randomBytes(32));
    const iv = new Uint8Array(randomBytes(12));

    // Layer 0 protected header: {1: contentAlg}
    const layer0Protected = encode(new Map([[1, contentAlg]]));

    // Layer 0 unprotected header: {5: iv}
    const layer0Unprotected = new Map([[5, iv]]);

    // Recipient protected header: {1: alg, 4: kid}
    const recipientProtectedMap = new Map([
      [1, coseValue],
      [4, kid],
    ]);
    const recipientProtected = encode(recipientProtectedMap);

    // HPKE info = Recipient_structure
    const info = hpkeRecipientStructure(
      contentAlg,
      recipientProtected,
      new Uint8Array(0),
    );

    // HPKE Seal encrypts the CEK
    const { encapsulatedSecret, ciphertext: wrappedCek } = await suite.Seal(
      publicKey,
      cek,
      { info },
    );

    // Recipient unprotected header: {-4: ek}
    const recipientUnprotected = new Map([[EK_LABEL, encapsulatedSecret]]);

    // Compute Layer 0 AAD from Enc_structure
    const layer0Aad = encryptEncStructure(layer0Protected, externalAad);

    // Encrypt content
    const contentCiphertext = contentEncrypt(contentCipher, cek, iv, plaintext, layer0Aad);

    // Build the COSE_Encrypt structure
    const coseEncrypt = new Tag(96, [
      layer0Protected,
      layer0Unprotected,
      contentCiphertext,
      [
        [
          recipientProtected,
          recipientUnprotected,
          wrappedCek,
        ],
      ],
    ]);

    const encoded = encode(coseEncrypt);
    const hex = Buffer.from(encoded).toString("hex");
    const diag = formatEncryptDiag(
      layer0Protected, iv, contentCiphertext,
      recipientProtected, encapsulatedSecret, wrappedCek,
    );

    writeFileSync(join(outDir, `${alg}-hex.txt`), hex);
    writeFileSync(join(outDir, `${alg}-diag.txt`), diag + "\n");
  } else {
    // === Integrated Encryption Mode: COSE_Encrypt0 (Tag 16) ===

    // Protected header: {1: alg}
    const protectedMap = new Map([[1, coseValue]]);
    const protectedHeader = encode(protectedMap);

    // Compute AAD from Enc_structure
    const aad = encrypt0EncStructure(protectedHeader, externalAad);

    // HPKE Seal encrypts the plaintext directly
    const { encapsulatedSecret, ciphertext } = await suite.Seal(
      publicKey,
      plaintext,
      { aad },
    );

    // Unprotected header: {4: kid, -4: ek}
    const unprotectedHeader = new Map([
      [4, kid],
      [EK_LABEL, encapsulatedSecret],
    ]);

    // Build the COSE_Encrypt0 structure
    const coseEncrypt0 = new Tag(16, [
      protectedHeader,
      unprotectedHeader,
      ciphertext,
    ]);

    const encoded = encode(coseEncrypt0);
    const hex = Buffer.from(encoded).toString("hex");
    const diag = formatEncrypt0Diag(
      protectedHeader, kid, encapsulatedSecret, ciphertext,
    );

    writeFileSync(join(outDir, `${alg}-hex.txt`), hex);
    writeFileSync(join(outDir, `${alg}-diag.txt`), diag + "\n");
  }
}
