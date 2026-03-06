function hexId(id) {
  return `\`0x${id.toString(16).padStart(4, "0")}\``;
}

function cellValues(entry) {
  const { alg, suite, coseValue } = entry;
  return {
    name: alg,
    value: `TBD (Assumed: ${coseValue})`,
    kem: `${suite.KEM.name} (${hexId(suite.KEM.id)})`,
    kdf: `${suite.KDF.name} (${hexId(suite.KDF.id)})`,
    aead: `${suite.AEAD.name} (${hexId(suite.AEAD.id)})`,
  };
}

export default function buildCoseTable(rows) {
  const headers = ["Name", "Value", "HPKE KEM", "HPKE KDF", "HPKE AEAD"];
  const keys = ["name", "value", "kem", "kdf", "aead"];
  const data = rows.map(cellValues);

  // Compute column widths from headers and all data rows
  const widths = headers.map((h, i) => {
    const key = keys[i];
    return Math.max(h.length, ...data.map((d) => d[key].length));
  });

  const line = (cells) =>
    "| " + cells.map((c, i) => c.padEnd(widths[i])).join(" | ") + " |";
  const sep = "| " + widths.map((w) => "-".repeat(w)).join(" | ") + " |";

  return [
    line(headers),
    sep,
    ...data.map((d) => line(keys.map((k) => d[k]))),
  ].join("\n");
}
