/**
 * Catalog Core
 *
 * 전자카탈로그 에이전시 파이프라인의 핵심 모듈.
 *
 * @example
 * import { buildCompanyProfile, validateCatalog } from "@catalog-core";
 * import type { CompanyProfile, CatalogConfig } from "@catalog-core/types";
 */

// Types
export type * from './types';
export { DEFAULT_FEATURES, DEFAULT_COLORS } from './types';

// Data Transformer
export {
    classifySection,
    buildCompanyProfile,
    buildTranslations,
    buildNavigation,
    generateCatalogPagesFile,
    generateTranslationsFile,
    generateDataFile,
} from './data-transformer';

// Validator
export {
    validateCatalog,
    formatValidationReport,
} from './validator';

// Scraper Utilities
export {
    parseMarkdownContent,
    mergeScrapedData,
    normalizeImageFilename,
} from './scraper';

// Color Extractor
export {
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    generateColorScheme,
    generateCSSVariables,
    generateTailwindColors,
    extractColorsFromCSS,
    pickBrandColor,
} from './color-extractor';

// Middleware Helper
export {
    generateMiddlewareBlock,
    insertRouteIntoMiddleware,
    extractCatalogName,
    updateMatcherExclusions,
} from './middleware-helper';
export type { CatalogRoute } from './middleware-helper';
