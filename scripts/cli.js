#!/usr/bin/env node

const mdFile = process.argv.find((a, i) => i > 1 && !a.startsWith("--"));

if (!mdFile) {
  console.error("Usage: draft-jose-hpke-pq-pqt <draft.md> [--force]");
  process.exit(1);
}

process.env.COSE_DRAFT_MD = mdFile;

await import("./cose-index.js");
