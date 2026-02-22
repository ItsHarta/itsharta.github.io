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
    clean = clean.replace(/^(import|export)\s.*$/gm, '');

    // Remove lines that look like HTML/JSX tags (e.g. <Component ...>)
    // This is safer than a global <...> replacement which can be flagged as unsafe by CodeQL
    clean = clean.replace(/^\s*<.*$/gm, '');

    return getReadingTime(clean.trim());
}
