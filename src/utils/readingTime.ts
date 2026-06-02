/**
 * Calculates reading time from raw Markdown/MDX text.
 * Strips imports, exports, and HTML/JSX tags to provide an accurate estimate.
 *
 * @param text The raw Markdown/MDX text content.
 * @returns The estimated reading time text (e.g., "3 min read").
 */
export function calculateReadingTime(text: string): string {
  if (!text) return "0 min read";

  // Strip MDX imports and exports (simple line-based approach)
  const lines = text.split("\n");
  const cleanLines = lines.filter((line) => {
    const trimmed = line.trim();
    return !trimmed.startsWith("import ") && !trimmed.startsWith("export ");
  });

  let cleanText = cleanLines.join("\n");

  // Strip HTML/JSX tags (e.g., <Component />, <div>...</div>)
  cleanText = cleanText.replace(/<[^>]*>/g, "");

  const words = cleanText.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
