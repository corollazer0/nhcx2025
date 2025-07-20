// packages/tokens/style-dictionary.config.js

function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * 특정 테마 조합에 대한 Style Dictionary 설정 객체를 생성하는 함수
 */
function getStyleDictionaryConfig(themeName, themeTokens) {
  const [theme, viewport] = themeName.split("-");

  return {
    // log: {
    //   verbosity: "verbose",
    // },
    tokens: themeTokens,
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "build/css/",
        prefix: "nhcx",
        files: [
          {
            destination: `${themeName}.css`,
            format: "css/variables",
            options: { selector: `.${theme}-theme-${viewport}` },
          },
        ],
      },
      compose: {
        transformGroup: "compose",
        buildPath: "build/kotlin/",
        files: [
          {
            destination: `${theme.charAt(0).toUpperCase() + theme.slice(1)}Colors.kt`,
            format: "compose/object",
            className: `${theme.charAt(0).toUpperCase() + theme.slice(1)}AppColors`,
            packageName: "com.example.nhcx2025.theme",
            filter: (token) => token.type === "color",
          },
        ],
      },
    },
  };
}

module.exports = { getStyleDictionaryConfig, deepMerge };
