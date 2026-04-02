// Global catalog page order for the electronic catalog navigation
export const CATALOG_PAGES = [
    // Intro / Home Page (Page 1)
    '.', // Represents the root/index page

    // Company Section
    'company/introduction',
    'company/global_network',
    'company/company_view',
    'company/greeting',
    'company/history',
    'company/philosophy',
    'company/organization',
    'company/business_scope',
    'company/certification',
    'company/ci_bi',
    'company/location',

    // Business Scope Section Summary
    'business',

    // Business Scope Details
    'business/construction',
    'business/construction.html_1', // Electric Work
    'business/construction.html_2', // Machine Equipment

    'business/facilities',

    'business/public_address',

    'business/access_parking',
    'business/access_parking.html_1', // Parking Control

    'business/cctv',
    'business/cctv.html_1', // Unmanned Surveillance

    'business/led_display',

    'business/eco_friendly',
    'business/eco_friendly.html_1', // Geothermal
    'business/eco_friendly.html_2', // Wind
    'business/eco_friendly.html_3', // Water

    // Contact (Last Page)
    'contact',

] as const;

export type CatalogPage = typeof CATALOG_PAGES[number];

export function getCatalogPageIndex(section: string, slug?: string): number {
    // Handle the special case for the root/home page
    if (section === '.' || section === 'home' || (section === '' && !slug)) {
        return 0;
    }
    const path = slug ? `${section}/${slug}` : section;
    return CATALOG_PAGES.indexOf(path as CatalogPage);
}

export function getCatalogPageByIndex(index: number, lang: string): string | null {
    const page = CATALOG_PAGES[index];
    if (!page) return null;

    // Handle root page
    if (page === '.') {
        return `/${lang}`;
    }

    return `/${lang}/${page}`;
}

export function getPrevNextPages(section: string, slug: string | undefined, lang: string) {
    const currentIndex = getCatalogPageIndex(section, slug);

    if (currentIndex === -1) {
        return { prev: null, next: null, current: -1, total: CATALOG_PAGES.length };
    }

    const prevPage = currentIndex > 0 ? getCatalogPageByIndex(currentIndex - 1, lang) : null;
    const nextPage = currentIndex < CATALOG_PAGES.length - 1 ? getCatalogPageByIndex(currentIndex + 1, lang) : null;

    return {
        prev: prevPage,
        next: nextPage,
        current: currentIndex + 1,
        total: CATALOG_PAGES.length
    };
}
