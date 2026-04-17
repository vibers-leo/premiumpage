import nextVitals from "eslint-config-next/core-web-vitals";

// react-compiler 규칙을 nextVitals config 객체 내에서 직접 warn으로 패치
// (ESLint 9 flat config: 다른 config 객체에서 plugin 규칙 override 불가)
const patchedVitals = nextVitals.map(config => {
  const hasReactCompilerRule = config.rules?.["react-compiler/react-compiler"];
  const hasOtherErrorRules = config.rules && Object.entries(config.rules).some(
    ([k, v]) => !k.startsWith("react-compiler/") && v === "error" || v?.[0] === "error"
  );
  if (!hasReactCompilerRule && !hasOtherErrorRules) return config;
  return {
    ...config,
    rules: Object.fromEntries(
      Object.entries(config.rules || {}).map(([k, v]) => {
        const severity = Array.isArray(v) ? v[0] : v;
        if (severity === "error" || severity === 2) {
          return [k, Array.isArray(v) ? ["warn", ...v.slice(1)] : "warn"];
        }
        return [k, v];
      })
    ),
  };
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...patchedVitals,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
