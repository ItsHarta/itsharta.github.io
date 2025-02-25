import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";
import mdx from '@astrojs/mdx';
import compressor from "astro-compressor";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon(), compressor()],
  site: "https://profile.asthene.com",
  vite: {
    plugins: [rawFonts([".ttf", ".woff"]), tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}