/**
 * Data Transformer
 *
 * ScrapedData(원시 추출 데이터)를 카탈로그 구성 파일로 변환합니다.
 * scraper-agent → data-transformer → layout-agent 파이프라인의 중간 단계.
 */

import type {
    ScrapedData,
    CompanyProfile,
    CompanySection,
    CompanyContact,
    BrandColorScheme,
    SectionType,
    CatalogNavigation,
    MenuItem,
    CatalogTranslations,
    TranslationSet,
    ScrapedImage,
} from './types';

// ─── Section Classification ─────────────────────────────────────

/** 텍스트 콘텐츠에서 섹션 타입을 자동 감지 */
const SECTION_KEYWORDS: Record<SectionType, string[]> = {
    intro: ['home', 'main', 'welcome', 'index', '메인', '홈'],
    company: ['company', 'about', 'overview', 'introduction', '회사', '소개', '기업'],
    business: ['business', 'service', 'solution', '사업', '서비스', '솔루션'],
    product: ['product', 'catalog', 'item', '제품', '카탈로그', '상품'],
    portfolio: ['portfolio', 'project', 'reference', 'work', '실적', '프로젝트', '포트폴리오'],
    certification: ['certification', 'certificate', 'award', 'iso', '인증', '수상'],
    history: ['history', 'milestone', 'timeline', '연혁', '역사'],
    location: ['location', 'map', 'direction', 'contact', '오시는', '위치', '지도'],
    contact: ['contact', 'inquiry', 'support', '문의', '연락', '상담'],
};

export function classifySection(text: string): SectionType {
    const lower = text.toLowerCase();
    for (const [type, keywords] of Object.entries(SECTION_KEYWORDS)) {
        if (keywords.some(kw => lower.includes(kw))) {
            return type as SectionType;
        }
    }
    return 'company'; // default
}

// ─── Company Profile Builder ─────────────────────────────────────

interface BuildProfileOptions {
    scraped: ScrapedData;
    name?: string;
    nameKo?: string;
    colors?: Partial<BrandColorScheme>;
}

/** ScrapedData에서 CompanyProfile 구조를 자동 생성 */
export function buildCompanyProfile(options: BuildProfileOptions): CompanyProfile {
    const { scraped, name, nameKo, colors } = options;

    // 회사명 추출 (title 태그에서)
    const companyName = name || extractCompanyName(scraped);
    const companyNameKo = nameKo || extractCompanyNameKo(scraped);

    // 연락처 추출
    const contact = extractContact(scraped);

    // 섹션 분류
    const sections = classifySections(scraped);

    // 로고 추출
    const logo = findLogo(scraped.images);

    // 색상 추출 (제공되지 않은 경우 기본값)
    const brandColors = mergeColors(colors);

    // 설명 추출
    const description = extractDescription(scraped, 'en');
    const descriptionKo = extractDescription(scraped, 'ko');

    return {
        name: companyName,
        nameKo: companyNameKo,
        domain: scraped.url,
        logo: logo?.localPath || logo?.src || '/images/logo.png',
        description,
        descriptionKo,
        colors: brandColors,
        contact,
        sections,
    };
}

function extractCompanyName(scraped: ScrapedData): string {
    // 1. title 태그에서 추출
    if (scraped.title) {
        // "GENTOP | Total Solution Provider" → "GENTOP"
        const parts = scraped.title.split(/[|\-–—]/);
        return parts[0].trim();
    }

    // 2. h1에서 추출
    const h1 = scraped.texts.find(t => t.tag === 'h1');
    if (h1) return h1.content.trim();

    // 3. metadata에서 추출
    if (scraped.metadata['og:site_name']) {
        return scraped.metadata['og:site_name'];
    }

    // 4. 도메인에서 추출
    try {
        const url = new URL(scraped.url);
        const parts = url.hostname.replace('www.', '').split('.');
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    } catch {
        return 'Company';
    }
}

function extractCompanyNameKo(scraped: ScrapedData): string | undefined {
    // 한글이 포함된 title이나 h1에서 추출
    const koreanTexts = scraped.texts.filter(
        t => /[\uAC00-\uD7AF]/.test(t.content) && ['h1', 'h2', 'title'].includes(t.tag)
    );
    if (koreanTexts.length > 0) {
        return koreanTexts[0].content.trim();
    }
    return undefined;
}

function extractContact(scraped: ScrapedData): CompanyContact {
    const allText = scraped.texts.map(t => t.content).join(' ');

    // 전화번호 패턴
    const phoneMatch = allText.match(/(?:TEL|Tel|전화|☎|📞)[\s:]*([0-9\-+() ]{8,20})/i)
        || allText.match(/(0\d{1,2}[\-)]?\d{3,4}[\-]?\d{4})/);
    const faxMatch = allText.match(/(?:FAX|Fax|팩스)[\s:]*([0-9\-+() ]{8,20})/i);
    const emailMatch = allText.match(/[\w.+-]+@[\w-]+\.[\w.]+/);

    // 주소 추출 (한글 주소 우선)
    const addressMatch = allText.match(
        /(?:주소|Address|위치)[\s:]*([^\n]{10,100})/i
    );

    return {
        phone: phoneMatch?.[1]?.trim(),
        fax: faxMatch?.[1]?.trim(),
        email: emailMatch?.[0],
        address: addressMatch?.[1]?.trim(),
        website: scraped.url,
    };
}

function classifySections(scraped: ScrapedData): CompanySection[] {
    // 내부 링크를 섹션으로 분류
    const internalLinks = scraped.links.filter(l => l.isInternal);

    // 중복 제거 및 주요 섹션만 추출
    const sectionMap = new Map<string, CompanySection>();
    let order = 0;

    for (const link of internalLinks) {
        const type = classifySection(link.text + ' ' + link.href);
        const key = type;

        if (!sectionMap.has(key)) {
            sectionMap.set(key, {
                id: type,
                title: link.text.trim() || type,
                type,
                order: order++,
            });
        }
    }

    // 최소한 intro, company, contact 섹션은 보장
    if (!sectionMap.has('intro')) {
        sectionMap.set('intro', { id: 'intro', title: 'Home', type: 'intro', order: -1 });
    }

    return Array.from(sectionMap.values()).sort((a, b) => a.order - b.order);
}

function findLogo(images: ScrapedImage[]): ScrapedImage | undefined {
    // 1. alt 텍스트에 'logo' 포함
    const byAlt = images.find(img =>
        img.alt.toLowerCase().includes('logo')
    );
    if (byAlt) return byAlt;

    // 2. 파일명에 'logo' 포함
    const bySrc = images.find(img =>
        img.src.toLowerCase().includes('logo')
    );
    if (bySrc) return bySrc;

    // 3. 첫 번째 작은 이미지 (로고일 가능성)
    const small = images.find(img =>
        img.width && img.height && img.width < 300 && img.height < 300
    );
    return small;
}

function mergeColors(partial?: Partial<BrandColorScheme>): BrandColorScheme {
    const defaults: BrandColorScheme = {
        primary: '#00C853',
        primaryLight: '#69F0AE',
        primaryDark: '#00953B',
        accent: '#2979FF',
        background: { dark: '#0A0A0A', light: '#FFFFFF' },
        text: { dark: '#E5E7EB', light: '#1F2937' },
    };

    if (!partial) return defaults;

    return {
        primary: partial.primary || defaults.primary,
        primaryLight: partial.primaryLight || defaults.primaryLight,
        primaryDark: partial.primaryDark || defaults.primaryDark,
        accent: partial.accent || defaults.accent,
        background: { ...defaults.background, ...partial.background },
        text: { ...defaults.text, ...partial.text },
    };
}

function extractDescription(scraped: ScrapedData, lang: 'en' | 'ko'): string {
    // meta description
    if (scraped.metadata['description']) {
        return scraped.metadata['description'];
    }
    if (scraped.metadata['og:description']) {
        return scraped.metadata['og:description'];
    }

    // 첫 번째 단락에서 추출
    const isKorean = lang === 'ko';
    const paragraphs = scraped.texts.filter(t => t.tag === 'p' && t.content.length > 30);
    const matched = paragraphs.find(p =>
        isKorean ? /[\uAC00-\uD7AF]/.test(p.content) : /[a-zA-Z]/.test(p.content)
    );

    return matched?.content || '';
}

// ─── Translation Generator ───────────────────────────────────────

/** ScrapedData에서 번역 파일 데이터를 생성 */
export function buildTranslations(
    scraped: ScrapedData,
    profile: CompanyProfile
): CatalogTranslations {
    const en: TranslationSet = {
        hero: {
            title: profile.name,
            subtitle: profile.description,
            description: profile.description,
        },
        footer: {
            address: profile.contact.address || '',
            tel: profile.contact.phone || '',
            email: profile.contact.email || '',
            copy: `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`,
        },
    };

    const ko: TranslationSet = {
        hero: {
            title: profile.nameKo || profile.name,
            subtitle: profile.descriptionKo || profile.description,
            description: profile.descriptionKo || profile.description,
        },
        footer: {
            address: profile.contact.addressKo || profile.contact.address || '',
            tel: profile.contact.phone || '',
            email: profile.contact.email || '',
            copy: `© ${new Date().getFullYear()} ${profile.name}. 모든 권리 보유.`,
        },
    };

    return { en, ko };
}

// ─── Navigation Generator ────────────────────────────────────────

/** CompanyProfile에서 카탈로그 네비게이션 데이터 생성 */
export function buildNavigation(
    profile: CompanyProfile,
    lang: string
): CatalogNavigation {
    const mainMenu: MenuItem[] = profile.sections.map(section => ({
        id: section.id,
        label: lang === 'ko' ? (section.titleKo || section.title) : section.title,
        href: `/${lang}/${section.type === 'intro' ? '' : section.id}`,
        subs: section.children?.map(child => ({
            id: child.id,
            label: lang === 'ko' ? (child.titleKo || child.title) : child.title,
            href: `/${lang}/${section.id}/${child.id}`,
        })),
    }));

    const catalogPages: string[] = [
        '.', // root/home
        ...profile.sections
            .filter(s => s.type !== 'intro')
            .flatMap(s => {
                const paths = [s.id];
                if (s.children) {
                    paths.push(...s.children.map(c => `${s.id}/${c.id}`));
                }
                return paths;
            }),
    ];

    return { mainMenu, catalogPages };
}

// ─── File Content Generators ─────────────────────────────────────

/** catalog-pages.ts 파일 콘텐츠 생성 */
export function generateCatalogPagesFile(navigation: CatalogNavigation): string {
    const pages = navigation.catalogPages
        .map(p => `    '${p}',`)
        .join('\n');

    return `// Auto-generated by catalog-factory pipeline
export const CATALOG_PAGES = [
${pages}
] as const;

export type CatalogPage = typeof CATALOG_PAGES[number];

export function getCatalogPageIndex(section: string, slug?: string): number {
    if (section === '.' || section === 'home' || (section === '' && !slug)) {
        return 0;
    }
    const path = slug ? \`\${section}/\${slug}\` : section;
    return CATALOG_PAGES.indexOf(path as CatalogPage);
}

export function getCatalogPageByIndex(index: number, lang: string): string | null {
    const page = CATALOG_PAGES[index];
    if (!page) return null;
    if (page === '.') return \`/\${lang}\`;
    return \`/\${lang}/\${page}\`;
}

export function getPrevNextPages(section: string, slug: string | undefined, lang: string) {
    const currentIndex = getCatalogPageIndex(section, slug);
    if (currentIndex === -1) {
        return { prev: null, next: null, current: -1, total: CATALOG_PAGES.length };
    }
    const prevPage = currentIndex > 0 ? getCatalogPageByIndex(currentIndex - 1, lang) : null;
    const nextPage = currentIndex < CATALOG_PAGES.length - 1 ? getCatalogPageByIndex(currentIndex + 1, lang) : null;
    return { prev: prevPage, next: nextPage, current: currentIndex + 1, total: CATALOG_PAGES.length };
}
`;
}

/** translations.ts 파일 콘텐츠 생성 */
export function generateTranslationsFile(translations: CatalogTranslations): string {
    const enJSON = JSON.stringify(translations.en, null, 4);
    const koJSON = JSON.stringify(translations.ko, null, 4);

    return `// Auto-generated by catalog-factory pipeline
export const translations = {
    en: ${enJSON},
    ko: ${koJSON}
};

export type Lang = keyof typeof translations;

export const getTranslation = (lang: string) => {
    return translations[lang as Lang] || translations.en;
};
`;
}

/** data.ts 파일 콘텐츠 생성 */
export function generateDataFile(
    profile: CompanyProfile,
    navigation: CatalogNavigation
): string {
    const menuJSON = JSON.stringify(navigation.mainMenu, null, 4);

    return `// Auto-generated by catalog-factory pipeline
// Last Updated: ${new Date().toISOString()}

export interface MenuItem {
    id: string;
    label: string;
    href: string;
    subs?: MenuItem[];
}

export interface BrandItem {
    brand: string;
    href: string;
    items: MenuItem[];
}

export const MENU: BrandItem[] = [
    {
        brand: '${profile.name}',
        href: '/',
        items: ${menuJSON}
    }
];

export const DB: Record<string, { title: string; image: string; desc: string }> = {};
`;
}
