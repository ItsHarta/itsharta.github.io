import typescriptEslint from "@typescript-eslint/eslint-plugin";
import astro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import parser from "astro-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/.eslint.config.js", "**/tailwind.config.cjs"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
), {
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
            tsconfigRootDir: "E:\\Git\\itsharta.github.io",
        },
    },
}, ...compat.extends("plugin:@typescript-eslint/strict").map(config => ({
    ...config,
    files: ["**/*.astro"],
})), {
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
}, ...compat.extends(
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
).map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
}))];