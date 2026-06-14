/**
 * Calculates reading time from raw Markdown/MDX text.
 * Strips imports and exports to provide an accurate estimate.
 *
 * @param text The raw Markdown/MDX text content.
 * @returns The estimated reading time text (e.g., "3 min read").
 */
export function calculateReadingTime(text: string): string {
  if (!text) return "0 min read";

  let words = 0;

  // ⚡ Bolt: Optimized reading time calculation
  // Strip MDX imports and exports (simple line-based approach)
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("import ") || line.startsWith("export ")) {
      continue;
    }

    // ⚡ Bolt: Count words in the line without regex or splitting to avoid creating arrays and excessive string allocations
    let inWord = false;
    for (let j = 0; j < line.length; j++) {
      const charCode = line.charCodeAt(j);
      if (
        charCode === 32 ||
        charCode === 9 ||
        charCode === 10 ||
        charCode === 13
      ) {
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
