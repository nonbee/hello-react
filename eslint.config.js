// eslint.config.js
import globals from "globals";
import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import vitestPlugin from "eslint-plugin-vitest";

export default [
  // 共通の環境設定
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    ignores: ["dist/**", ".eslintrc.cjs", "eslint.config.js"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // JavaScriptの推奨設定
  js.configs.recommended,
  // TypeScript向けの設定
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json", // 必要に応じてプロジェクトのパスを調整してください
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
  // React Hooks向けの設定
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
  // Storybook向けの設定
  {
    files: ["**/*.stories.*"],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },
  // React Refresh向けの設定
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-refresh": reactRefreshPlugin,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    // テストファイル向けの特定の設定
    files: ["**/*.test.tsx"], // テストファイルを対象に
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        vi: "readonly", // Vitestのモック用
      },
    },
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      "vitest/no-disabled-tests": "warn", // 無効化されたテストを警告
      "vitest/no-focused-tests": "error", // フォーカステストをエラーとして報告
      "vitest/no-identical-title": "error", // 同一タイトルのテストを禁止
      "vitest/prefer-to-have-length": "warn", // toHaveLengthを推奨
      "vitest/valid-expect": "error", // 有効なexpectを強制
      // その他のVitest関連ルールをここに追加
    },
  },
  {
    // Node.js環境で動作するファイルの設定
    files: ["tailwind.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
    // または `env` を使って Node 環境を設定する
    // env: {
    //   node: true,
    // },
    rules: {
      // Node.js用の特定のルールをここに追加できます
    },
  },
];
