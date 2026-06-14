## 2024-03-24 - Avoid `await render(post)` in Astro Content Loops
**Learning:** Calling `await render(post)` inside `.map()` loops for Astro Content Collections (e.g., to extract reading time from `remarkPluginFrontmatter` on blog index pages) is a severe performance bottleneck. It forces Astro to execute the full MDX/remark pipeline for every single post at build/render time.
**Action:** Extract simple properties like reading time using a custom utility that parses the raw `post.body` string directly, bypassing the heavy `render()` pipeline during list rendering.
## 2024-03-24 - Avoid Splitting Strings When Counting Words
**Learning:** Calculating reading time by creating intermediate arrays (`split`, `filter`, `join`, `split`) introduces heavy garbage collection overhead, particularly when parsing large MDX strings across multiple files.
**Action:** Replace map/filter/split operations on massive strings with an allocation-free character loop using `charCodeAt` to manually count words.
