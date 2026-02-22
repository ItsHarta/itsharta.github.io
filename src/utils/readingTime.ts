import getReadingTime from 'reading-time';

/**
 * Calculates reading time for a given text.
 * Strips common MDX constructs (imports, exports, HTML/JSX tags) for more accurate results.
 * This implementation avoids naive regex replacements for HTML tags to prevent security warnings,
 * instead focusing on removing lines that are clearly code/markup.
 *
 * @param text The raw MDX/Markdown content
 * @returns reading-time object
 */
export function calculateReadingTime(text: string) {
    if (!text) return getReadingTime("");

    // Remove frontmatter (between --- and ---)
    let clean = text.replace(/^---[\s\S]+?---/, '');

    // Remove lines that start with import or export
    // The previous regex was /^(import|export)\s.*$/gm
    // We update it to handle multiple lines (basic) or just be more specific
    // For now, removing lines starting with import/export is safe enough for reading time
    clean = clean.replace(/^(import|export)\s.*$/gm, '');

    // Remove lines that look like HTML/JSX tags (e.g. <Component ...>)
    // We update this to avoid matching lines starting with "< 5"
    // New regex: Start of line, optional whitespace, < followed by a letter (tag name) or / (closing tag)
    clean = clean.replace(/^\s*<[a-zA-Z\/][^>]*>.*$/gm, '');

    return getReadingTime(clean.trim());
}
