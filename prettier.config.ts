import type { Options } from "prettier";

const prettierConfig: Options = {
  printWidth: 90,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: true,
  useTabs: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: 'lf'
};

export default prettierConfig;
