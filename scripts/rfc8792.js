const header = "NOTE: '\\' line wrapping per RFC 8792";

function foldLine(line, maxLength, continuationIndent = "") {
  const lines = [];
  let remaining = line;
  const indent = remaining.match(/^\s*/)[0];

  while (true) {
    const prefix = lines.length === 0 ? "" : indent + continuationIndent;
    if (prefix.length + remaining.length <= maxLength) {
      lines.push(`${prefix}${remaining}`);
      return lines;
    }

    let foldAt = maxLength - prefix.length - 1;
    if (foldAt <= 0) {
      throw new Error(`Cannot fold line using max length ${maxLength}`);
    }

    while (foldAt > 0 && remaining[foldAt] === " ") {
      foldAt--;
    }
    if (foldAt <= 0) {
      throw new Error("Cannot fold line before a non-space character");
    }

    lines.push(`${prefix}${remaining.slice(0, foldAt)}\\`);
    remaining = remaining.slice(foldAt);
  }
}

export function foldRfc8792(input, maxLength = 69, continuationIndent = "") {
  const normalized = input.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  const hasTrailingNewline = normalized.endsWith("\n");
  const lines = (hasTrailingNewline ? normalized.slice(0, -1) : normalized)
    .split("\n");

  if (!lines.some((line) => line.length > maxLength)) {
    return normalized;
  }

  const folded = [
    header,
    "",
    ...lines.flatMap((line) => foldLine(line, maxLength, continuationIndent)),
  ].join("\n");

  return hasTrailingNewline ? `${folded}\n` : folded;
}

export function unfoldRfc8792(input) {
  const normalized = input.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  const hasTrailingNewline = normalized.endsWith("\n");
  const lines = (hasTrailingNewline ? normalized.slice(0, -1) : normalized)
    .split("\n");

  if (lines[0] !== header) {
    return normalized;
  }
  if (lines[1] !== "") {
    throw new Error("Invalid RFC 8792 header separator");
  }

  const unfolded = [];
  for (let i = 2; i < lines.length; i++) {
    let line = lines[i];
    while (line.endsWith("\\")) {
      i++;
      if (i >= lines.length) {
        throw new Error("Invalid RFC 8792 folded line");
      }
      line = line.slice(0, -1) + lines[i].replace(/^\s+/, "");
    }
    unfolded.push(line);
  }

  const result = unfolded.join("\n");
  return hasTrailingNewline ? `${result}\n` : result;
}
