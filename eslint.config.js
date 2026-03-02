import typescriptEslint from "@typescript-eslint/eslint-plugin";
import astro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import parser from "astro-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default [
  {
    ignores: ["**/.eslint.config.js", "**/tailwind.config.cjs", "dist/**", ".astro/**", "remark-reading-time.mjs", "scripts/validate-data.mjs", ".eslintrc.cjs", "eslint.config.js"],
  },
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      astro,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["**/*.astro"],

    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  }
];
