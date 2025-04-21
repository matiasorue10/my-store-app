import { defineConfig } from "eslint/config";
import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import reactNative from "eslint-plugin-react-native";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      ".expo/**",
      ".commitlintrc.js",
      "tailwind.config.js",
      "metro.config.js",
      "index.js",
      "babel.config.js",
    ],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react,
      "react-hooks": reactHooks,
      "react-native": reactNative,
      prettier,
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Native
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "off",

      // Prettier
      "prettier/prettier": "warn",
    },
  },
]);
