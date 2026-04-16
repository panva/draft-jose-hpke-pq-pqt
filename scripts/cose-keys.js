import { CipherSuite } from "hpke";
import { encode } from "cbor2";
import { algorithms } from "./algorithms.js";

import { createHash } from "node:crypto";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "examples", "cose-keys");
mkdirSync(outDir, { recursive: true });

const AKP_KTY = 7; // COSE Key Type for AKP

function hexStr(bytes) {
  return `h'${Buffer.from(bytes).toString("hex")}'`;
}

function formatCoseKeyDiag(kid, kty, coseValue, alg, pub, priv) {
  const lines = [
    "{",
    `  / kty / 1: ${kty},`,
    `  / kid / 2: ${hexStr(kid)},`,
    `  / alg / 3: ${coseValue} / ${alg} /,`,
    `  / pub / -1: ${hexStr(pub)},`,
    `  / priv / -2: ${hexStr(priv)}`,
    "}",
  ];
  return lines.join("\n");
}

for (const { alg, kem, kdf, aead, coseValue } of algorithms.filter(a => a.cose)) {
  const suite = new CipherSuite(kem, kdf, aead);

  // Use the same deterministic key derivation as jwks.js
  const ikm = new Uint8Array(suite.KEM.Nsk);
  const algBytes = new TextEncoder().encode(alg);
  const ids = new Uint8Array(6);
  new DataView(ids.buffer).setUint16(0, suite.KEM.id);
  new DataView(ids.buffer).setUint16(2, suite.KDF.id);
  new DataView(ids.buffer).setUint16(4, suite.AEAD.id);
  const suffix = new Uint8Array(algBytes.length + ids.length);
  suffix.set(ids, 0);
  suffix.set(algBytes, ids.length);
  ikm.set(suffix, ikm.length - suffix.length);
  const keyPair = await suite.DeriveKeyPair(ikm, true);
  const pub = new Uint8Array(await suite.SerializePublicKey(keyPair.publicKey));
  const priv = new Uint8Array(
    await suite.SerializePrivateKey(keyPair.privateKey),
  );

  // Compute kid as SHA-256 thumbprint of the required COSE_Key members
  const thumbprintInput = new Map([
    [1, AKP_KTY],
    [3, coseValue],
    [-1, pub],
  ]);
  const kid = new Uint8Array(createHash("sha256").update(encode(thumbprintInput)).digest());

  // Build the COSE_Key as a Map with integer labels
  // Insertion order follows RFC 8949 §4.2.1 Core Deterministic Encoding
  const coseKey = new Map([
    [1, AKP_KTY], // kty = AKP (7)
    [2, kid], // kid
    [3, coseValue], // alg
    [-1, pub], // pub
    [-2, priv], // priv
  ]);

  const encoded = encode(coseKey);
  const hex = Buffer.from(encoded).toString("hex");
  const diag = formatCoseKeyDiag(kid, AKP_KTY, coseValue, alg, pub, priv);

  writeFileSync(join(outDir, `${alg}-hex.txt`), hex);
  writeFileSync(join(outDir, `${alg}-diag.txt`), diag + "\n");
}
