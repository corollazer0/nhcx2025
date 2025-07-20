// packages/tokens/build-tokens.js

const StyleDictionary = require("style-dictionary").default;
const {
  getStyleDictionaryConfig,
  deepMerge,
} = require("./style-dictionary.config.js");
const tokens = require("./input/tokens.json");

console.log("Build started...");

const mergeTokensForTheme = (modeTokens, responsiveTokens) => {
  let merged = deepMerge(
    tokens["primitive/value-set"],
    tokens["semantic/value-set"]
  );
  merged = deepMerge(merged, tokens["styles"]);
  merged = deepMerge(merged, modeTokens);
  merged = deepMerge(merged, responsiveTokens);
  return merged;
};

const themes = {
  "light-pc": mergeTokensForTheme(
    tokens["mode/light"],
    tokens["responsive/pc"]
  ),
  "light-mobile": mergeTokensForTheme(
    tokens["mode/light"],
    tokens["responsive/mobile"]
  ),
  "high-contrast-pc": mergeTokensForTheme(
    tokens["mode/high-contrast"],
    tokens["responsive/pc"]
  ),
  "high-contrast-mobile": mergeTokensForTheme(
    tokens["mode/high-contrast"],
    tokens["responsive/mobile"]
  ),
};

for (const [themeName, themeTokens] of Object.entries(themes)) {
  console.log(`\nProcessing: ${themeName}`);

  const config = getStyleDictionaryConfig(themeName, themeTokens);

  // 👇 여기가 최종 수정된 부분입니다. 'new' 키워드를 사용합니다.
  const sd = new StyleDictionary(config);

  if (themeName.endsWith("-pc")) {
    sd.buildPlatform("compose");
  }
  sd.buildPlatform("css");
}

console.log("\nBuild completed! ✅");
