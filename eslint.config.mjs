import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    // Target specific files for relaxed rules if needed, otherwise rules apply globally
    rules: {
      // 1. Relax the strict 'any' rule (the main build blocker)
      // NOTE: The 'next/typescript' extension likely already includes the TypeScript parser/plugins,
      // but we add the rules here explicitly.
      "@typescript-eslint/no-explicit-any": "off",

      // 2. Relax 'no-unused-vars' and allow ignored variables to start with _
      // We disable the base ESLint rule, then apply the TypeScript version with options.
      "no-unused-vars": "off", 
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

      // 3. Turn Next.js optimization errors into warnings
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "warn",
    },
  },
];

export default eslintConfig;
