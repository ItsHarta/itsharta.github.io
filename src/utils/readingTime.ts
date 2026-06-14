/**
 * Calculates reading time from raw Markdown/MDX text.
 * Strips imports and exports to provide an accurate estimate.
 *
 * @param text The raw Markdown/MDX text content.
 * @returns The estimated reading time text (e.g., "3 min read").
 */
function isWhitespace(charCode: number): boolean {
  // Fast path for common ASCII whitespace (space, tab, newline, carriage return, vertical tab, form feed)
  if (charCode <= 32) {
    return (
      charCode === 32 ||
      charCode === 9 ||
      charCode === 10 ||
      charCode === 13 ||
      charCode === 11 ||
      charCode === 12
    );
  }
  // Fallback for Unicode spaces matching \s (e.g., non-breaking space 160)
  return (
    charCode === 160 ||
    charCode === 5760 ||
    (charCode >= 8192 && charCode <= 8202) ||
    charCode === 8232 ||
    charCode === 8233 ||
    charCode === 8239 ||
    charCode === 8287 ||
    charCode === 12288 ||
    charCode === 65279
  );
}

export function calculateReadingTime(text: string): string {
  if (!text) return "0 min read";

  let words = 0;

  // ⚡ Bolt: Optimized reading time calculation
  // Strip MDX imports and exports (simple line-based approach)
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Find the first non-whitespace character to check for imports/exports without allocating a trimmed string
    let start = 0;
    while (start < line.length && isWhitespace(line.charCodeAt(start))) {
      start++;
    }

    if (
      line.startsWith("import ", start) ||
      line.startsWith("export ", start)
    ) {
      continue;
    }

    // ⚡ Bolt: Count words in the line without regex or splitting to avoid creating arrays and excessive string allocations
    let inWord = false;
    for (let j = start; j < line.length; j++) {
      if (isWhitespace(line.charCodeAt(j))) {
        inWord = false;
      } else if (!inWord) {
        words++;
        inWord = true;
      }
    }
  }

  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
