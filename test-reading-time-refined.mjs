import getReadingTime from 'reading-time';

const text = `
import { something } from 'somewhere';
import Other from './other';

<Component prop="value">
  This is the content that should be read.
</Component>

The quick brown fox jumps over the lazy dog.
`;

const clean = text
    .replace(/^import\s.*$/gm, '') // Remove imports
    .replace(/<[^>]+>/g, '')       // Remove HTML/JSX tags
    .trim();

console.log('Cleaned text:\n', clean);
console.log(getReadingTime(clean));
