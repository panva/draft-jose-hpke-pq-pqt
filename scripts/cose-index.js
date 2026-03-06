import { CipherSuite } from "hpke";
import { algorithms } from "./algorithms.js";
import buildCoseTable from "./cose-table.js";
import coseIanaEntry from "./cose-iana-entry.js";
import coseTestVectorSection from "./cose-test-vector-section.js";

import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const draftPath = join(
  __dirname,
  "..",
  "draft-skokan-cose-hpke-pq-pqt.md",
);

// Hash algorithms.js to detect any change in suite definitions
const algorithmsPath = join(__dirname, "algorithms.js");
const algorithmsHash = createHash("sha256")
  .update(readFileSync(algorithmsPath))
  .digest("hex");
const hashPath = join(__dirname, ".cose-algorithms-hash");
const previousHash = existsSync(hashPath)
  ? readFileSync(hashPath, "utf8").trim()
  : null;

const force = process.argv.includes("--force");

const coseKeysDir = join(__dirname, "..", "examples", "cose-keys");
const coseDir = join(__dirname, "..", "examples", "cose");

if (
  !force &&
  previousHash === algorithmsHash &&
  existsSync(coseKeysDir) &&
  existsSync(coseDir)
) {
  console.log("COSE examples up to date, skipping regeneration.");
} else {
  // Clean and regenerate COSE example outputs
  rmSync(coseKeysDir, { recursive: true, force: true });
  rmSync(coseDir, { recursive: true, force: true });
  execFileSync(
    process.execPath,
    ["--no-warnings", join(__dirname, "cose-keys.js")],
    { stdio: "inherit" },
  );
  execFileSync(
    process.execPath,
    ["--no-warnings", join(__dirname, "cose-encrypt.js")],
    { stdio: "inherit" },
  );
  writeFileSync(hashPath, algorithmsHash + "\n");
}

// Build enriched algorithm entries with CipherSuite metadata
const entries = algorithms.filter(a => a.cose).map(({ alg, kem, kdf, aead, coseValue }) => {
  const suite = new CipherSuite(kem, kdf, aead);
  const isKE = alg.endsWith("-KE");
  const baseAlg = isKE ? alg.slice(0, -3) : alg;
  const isPQT = !suite.KEM.name.startsWith("ML-KEM-");
  const tableId = `cose-${isPQT ? "pqt-hybrid" : "pure-pq"}-${isKE ? "key-encryption" : "integrated"}-table`;
  return { alg, baseAlg, isKE, tableId, suite, coseValue };
});

const base = entries.filter((e) => !e.isKE);
const ke = entries.filter((e) => e.isKE);

// --- Apply to draft ---

let draft = readFileSync(draftPath, "utf8");

function replaceSection(name, content) {
  const beginMarker = `<!-- begin:${name} ; see README for regeneration instructions, do not edit -->`;
  const endMarker = `<!-- end:${name} -->`;
  const beginIdx = draft.indexOf(beginMarker);
  const endIdx = draft.indexOf(endMarker);
  if (beginIdx === -1 || endIdx === -1) {
    throw new Error(`Could not find ${name} section markers in draft`);
  }
  draft =
    draft.slice(0, beginIdx + beginMarker.length) +
    "\n\n" +
    content +
    "\n\n" +
    draft.slice(endIdx);
}

// Find all table markers, replace their content, and tag entries with their
// spec table id parsed from the marker so that IANA entries can reference it.
const tableMarkerRe =
  /<!-- begin:table (\S+) "([^"]+)" ; see README for regeneration instructions, do not edit -->/g;
for (const match of draft.matchAll(tableMarkerRe)) {
  const [beginMarker, id, title] = match;
  const endMarker = "<!-- end:table -->";
  const beginIdx = draft.indexOf(beginMarker);
  const endIdx = draft.indexOf(endMarker, beginIdx);
  if (endIdx === -1) {
    throw new Error(`Could not find end:table marker for ${id}`);
  }
  const rows = entries.filter((e) => e.tableId === id);
  for (const entry of rows) {
    entry.specTable = id;
  }
  const table = buildCoseTable(rows);
  const content = `${table}\n{: #${id} title="${title}" }`;
  draft =
    draft.slice(0, beginIdx + beginMarker.length) +
    "\n\n" +
    content +
    "\n\n" +
    draft.slice(endIdx);
}

// --- Generate IANA section ---
// Interleave: base alg, then its -KE variant (if present)
const ianaEntries = [];
for (const b of base) {
  ianaEntries.push(coseIanaEntry(b));
  const keVariant = ke.find((k) => k.baseAlg === b.baseAlg);
  if (keVariant) {
    ianaEntries.push(coseIanaEntry(keVariant));
  }
}
replaceSection("cose-iana-registrations", ianaEntries.join("\n\n"));

// --- Generate test vectors ---
// Same interleaved order: base alg, then -KE (if present)
const testVectorSections = [];
for (const b of base) {
  testVectorSections.push(coseTestVectorSection(b));
  const keVariant = ke.find((k) => k.baseAlg === b.baseAlg);
  if (keVariant) {
    testVectorSections.push(coseTestVectorSection(keVariant));
  }
}
replaceSection("cose-test-vectors", testVectorSections.join("\n\n"));

writeFileSync(draftPath, draft);
console.log("COSE draft updated successfully.");
