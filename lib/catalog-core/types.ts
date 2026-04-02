/**
 * Catalog Core Types
 *
 * 모든 전자카탈로그 에이전트가 공유하는 표준 데이터 타입 시스템.
 * 새 카탈로그 생성 시 이 타입들을 기반으로 데이터를 구조화합니다.
 */

// ─── Catalog Identity ────────────────────────────────────────────

export type CatalogName = 'gentop' | 'hs-tech' | 'hangseong' | 'emt' | (string & {});

export type SupportedLanguage = 'en' | 'ko';

export type ThemeMode = 'dark' | 'light';

export type TemplatePattern =
    | 'company-multi-page'   // GENTOP: 10+ sections, company/business/contact
    | 'product-hierarchy'    // HS-TECH: brand/category hierarchy, 50+ products
    | 'single-page-tabs';   // Hangseong: small site, <10 pages

// ─── Brand & Color ───────────────────────────────────────────────

export interface BrandColorScheme {
    primary: string;         // Main brand color (e.g. "#00C853")
    primaryLight: string;    // Lighter variant
    primaryDark: string;     // Darker variant
    accent: string;          // Accent/highlight color
    background: {
        dark: string;        // Dark mode background
        light: string;       // Light mode background
    };
    text: {
        dark: string;        // Text on dark background
        light: string;       // Text on light background
    };
}

// ─── Company Profile ─────────────────────────────────────────────

export interface CompanyProfile {
    name: string;
    nameKo?: string;
    domain: string;          // Source website URL
    logo: string;            // Logo image path
    logoLight?: string;      // Logo for light mode
    description: string;
    descriptionKo?: string;
    colors: BrandColorScheme;
    contact: CompanyContact;
    sections: CompanySection[];
}

export interface CompanyContact {
    address?: string;
    addressKo?: string;
    phone?: string;
    fax?: string;
    email?: string;
    website?: string;
}

export interface CompanySection {
    id: string;
    title: string;
    titleKo?: string;
    type: SectionType;
    order: number;
    children?: CompanySection[];
}

export type SectionType =
    | 'intro'
    | 'company'
    | 'business'
    | 'product'
    | 'portfolio'
    | 'certification'
    | 'history'
    | 'location'
    | 'contact';

// ─── Navigation ──────────────────────────────────────────────────

export interface MenuItemBase {
    id: string;
    label: string;
    labelKo?: string;
    href: string;
}

export interface MenuItem extends MenuItemBase {
    icon?: string;
    subs?: MenuItem[];
}

export interface BrandItem {
    brand: string;
    brandKo?: string;
    href: string;
    logo?: string;
    items: MenuItem[];
}

export interface CatalogNavigation {
    mainMenu: MenuItem[] | BrandItem[];
    catalogPages: string[];  // Ordered page paths for prev/next navigation
}

// ─── Product ─────────────────────────────────────────────────────

export interface Product {
    id: string;
    title: string;
    titleKo?: string;
    subtitle?: string;
    subtitleKo?: string;
    category: string;
    subcategory?: string;
    brand?: string;
    image: string;
    gallery?: string[];
    description?: string;
    descriptionKo?: string;
    specs: Specification[];
    tags?: string[];
    datasheet?: string;
    relatedProducts?: string[];  // Product IDs
}

export interface Specification {
    label: string;
    labelKo?: string;
    value: string;
    unit?: string;  // °C, %RH, bar, ppm etc.
}

export interface CategoryInfo {
    id: string;
    title: string;
    titleKo?: string;
    description?: string;
    descriptionKo?: string;
    image?: string;
    parentId?: string;
    order: number;
}

// ─── Catalog Config ──────────────────────────────────────────────

export interface CatalogConfig {
    name: CatalogName;
    displayName: string;
    displayNameKo?: string;
    template: TemplatePattern;
    languages: SupportedLanguage[];
    defaultLanguage: SupportedLanguage;
    defaultTheme: ThemeMode;
    domain?: string;          // Deployment domain (e.g. "gentop.premiumpage.kr")
    basePath: string;         // App directory path (e.g. "app/(gentop)/gentop")
    publicPath: string;       // Public assets path (e.g. "public/gentop")
    features: CatalogFeatures;
}

export interface CatalogFeatures {
    showFooter: boolean;
    showLanguageToggle: boolean;
    showPageNavigator: boolean;
    wheelNavigation: boolean;
    swipeNavigation: boolean;
    keyboardNavigation: boolean;
    darkMode: boolean;
    lightMode: boolean;
}

// ─── Translation ─────────────────────────────────────────────────

export interface TranslationSet {
    [key: string]: string | TranslationSet;
}

export interface CatalogTranslations {
    en: TranslationSet;
    ko: TranslationSet;
}

// ─── Page Layout ─────────────────────────────────────────────────

export type HeroVariant =
    | 'fullscreen-image'     // Full-screen image + overlay text
    | 'split-layout'         // Left text / Right image
    | 'video-background'     // Video bg + text overlay
    | 'minimal';             // Text-centered, gradient bg

export interface PageLayout {
    slug: string;
    title: string;
    titleKo?: string;
    hero?: {
        variant: HeroVariant;
        image?: string;
        video?: string;
        overlayOpacity?: number;
    };
    sections: PageSection[];
}

export interface PageSection {
    type: PageSectionType;
    order: number;
    content: Record<string, unknown>;
}

export type PageSectionType =
    | 'hero'
    | 'text-block'
    | 'image-gallery'
    | 'product-grid'
    | 'product-detail'
    | 'specs-table'
    | 'timeline'
    | 'team-grid'
    | 'contact-form'
    | 'map'
    | 'cta-banner'
    | 'bento-grid'
    | 'statistics';

// ─── Pipeline Types ──────────────────────────────────────────────

export type PipelinePhase =
    | 'scraping'
    | 'structuring'
    | 'layout'
    | 'design'
    | 'validation';

export interface PipelineStatus {
    phase: PipelinePhase;
    progress: number;        // 0-100
    message: string;
    errors: PipelineError[];
}

export interface PipelineError {
    phase: PipelinePhase;
    code: string;
    message: string;
    file?: string;
    recoverable: boolean;
}

export interface ScrapedData {
    url: string;
    title: string;
    texts: ScrapedText[];
    images: ScrapedImage[];
    tables: ScrapedTable[];
    links: ScrapedLink[];
    metadata: Record<string, string>;
}

export interface ScrapedText {
    tag: string;             // h1, h2, p, span, etc.
    content: string;
    section?: string;
    order: number;
}

export interface ScrapedImage {
    src: string;
    alt: string;
    localPath?: string;      // Downloaded local path
    width?: number;
    height?: number;
    section?: string;
    order?: number;
}

export interface ScrapedTable {
    headers: string[];
    rows: string[][];
    section?: string;
}

export interface ScrapedLink {
    href: string;
    text: string;
    isInternal: boolean;
}

// ─── Validation ──────────────────────────────────────────────────

export interface ValidationResult {
    passed: boolean;
    checks: ValidationCheck[];
    score: number;           // 0-100
}

export interface ValidationCheck {
    name: string;
    passed: boolean;
    message: string;
    severity: 'error' | 'warning' | 'info';
}

// ─── Default Values ──────────────────────────────────────────────

export const DEFAULT_FEATURES: CatalogFeatures = {
    showFooter: true,
    showLanguageToggle: false,
    showPageNavigator: true,
    wheelNavigation: true,
    swipeNavigation: true,
    keyboardNavigation: true,
    darkMode: true,
    lightMode: true,
};

export const DEFAULT_COLORS: BrandColorScheme = {
    primary: '#00C853',
    primaryLight: '#69F0AE',
    primaryDark: '#00953B',
    accent: '#2979FF',
    background: {
        dark: '#0A0A0A',
        light: '#FFFFFF',
    },
    text: {
        dark: '#E5E7EB',
        light: '#1F2937',
    },
};
