import getReadingTime from 'reading-time';

/**
 * Calculates reading time for a given text.
 * Strips common MDX constructs (imports, exports, HTML/JSX tags) for more accurate results.
 *
 * @param text The raw MDX/Markdown content
 * @returns reading-time object
 */
export function calculateReadingTime(text: string) {
    if (!text) return getReadingTime("");

    const clean = text
        .replace(/^(import|export)\s.*$/gm, '') // Remove imports and exports
        .replace(/<[^>]+>/g, '')                 // Remove HTML/JSX tags
        .trim();

    return getReadingTime(clean);
}
