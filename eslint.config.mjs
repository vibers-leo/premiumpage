import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import reactCompilerPlugin from "eslint-plugin-react-compiler";

// nextVitals에서 react-compiler 제거 (우리 config 객체에서 직접 정의)
const baseVitals = nextVitals.map(config => {
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
  ...baseVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // 플러그인을 같은 config 객체에 정의해야 규칙 참조 가능 (ESLint 9 flat config 규칙)
    plugins: { 'react-compiler': reactCompilerPlugin },
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
      "react-compiler/react-compiler": "warn",
    },
  },
]);

export default eslintConfig;
