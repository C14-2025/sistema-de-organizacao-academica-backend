const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true }],
      "indent": ["error", 2],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1, maxBOF: 0 }],
    },
  },
];
