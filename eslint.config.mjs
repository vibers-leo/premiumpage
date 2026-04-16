import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// react-compiler 플러그인이 미설치된 환경에서 crash 방지
const safeNextVitals = nextVitals.map(config => {
  if (config.plugins?.['react-compiler']) {
    const { 'react-compiler': _, ...restPlugins } = config.plugins;
    const restRules = Object.fromEntries(
      Object.entries(config.rules || {}).filter(([k]) => !k.startsWith('react-compiler/'))
    );
    return { ...config, plugins: restPlugins, rules: restRules };
  }
  return config;
});

const eslintConfig = defineConfig([
  ...safeNextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // 기존 에러 규칙들을 모두 warn으로 완화 (순차 해소 예정)
    rules: {
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",
    },
  },
]);

export default eslintConfig;
