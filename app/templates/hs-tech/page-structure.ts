/**
 * HS-TECH Catalog Page Structure
 * 24-page navigation system with hierarchical organization
 */

export interface PageMeta {
    id: string;
    title: string;
    level: 1 | 2 | 3; // 1: Brand, 2: Category, 3: SubCategory
    showInNavigator: boolean;
    parentId?: string;
    order: number;
    path: string;
    description?: string;
}

/**
 * 24-Page Structure:
 * - Level 1 (Brands): 4 pages
 * - Level 2 (Categories): 10 pages
 * - Level 3 (SubCategories): 10 pages
 * Total: 24 pages in main navigator
 */
export const PAGE_STRUCTURE: PageMeta[] = [
    // ========================================
    // LEVEL 1: BRANDS (4 pages)
    // ========================================
    {
        id: 'vaisala',
        title: 'VAISALA',
        level: 1,
        showInNavigator: true,
        order: 1,
        path: '/templates/hs-tech/brand/vaisala',
        description: 'World leader in environmental and industrial measurement'
    },
    {
        id: 'setra',
        title: 'SETRA',
        level: 1,
        showInNavigator: true,
        order: 2,
        path: '/templates/hs-tech/brand/setra',
        description: 'Premium pressure transducers and current switches'
    },
    {
        id: 'jumo',
        title: 'JUMO',
        level: 1,
        showInNavigator: true,
        order: 3,
        path: '/templates/hs-tech/brand/jumo',
        description: 'Innovative sensors and automation solutions'
    },
    {
        id: 'knick',
        title: 'KNICK',
        level: 1,
        showInNavigator: true,
        order: 4,
        path: '/templates/hs-tech/brand/knick',
        description: 'High-quality interface and process analysis'
    },

    // ========================================
    // LEVEL 2: CATEGORIES (10 pages)
    // ========================================
    // VAISALA Categories (7)
    {
        id: 'humidity',
        title: 'Humidity',
        level: 2,
        showInNavigator: true,
        parentId: 'vaisala',
        order: 5,
        path: '/templates/hs-tech/category/humidity',
        description: 'Best-in-class humidity instruments'
    },
    {
        id: 'dewpoint',
        title: 'Dewpoint',
        level: 2,
        showInNavigator: true,
        parentId: 'vaisala',
        order: 6,
        path: '/templates/hs-tech/category/dewpoint',
        description: 'Reliable dewpoint measurement'
    },
    {
        id: 'co2',
        title: 'Carbon Dioxide',
        level: 2,
        showInNavigator: true,
        parentId: 'vaisala',
        order: 7,
        path: '/templates/hs-tech/category/co2',
        description: 'Accurate CO2 monitoring'
    },
    {
        id: 'oil',
        title: 'Moisture in Oil',
        level: 2,
        showInNavigator: true,
        parentId: 'vaisala',
        order: 8,
        path: '/templates/hs-tech/category/oil',
        description: 'Transformer oil monitoring'
    },
    {
        id: 'barometer',
        title: 'Barometric Pressure',
        level: 2,
        showInNavigator: true,
        parentId: 'vaisala',
        order: 9,
        path: '/templates/hs-tech/category/barometer',
        description: 'Digital barometers'
    },
    {
        id: 'weather',
        title: 'Weather',
        level: 2,
        showInNavigator: true,
        parentId: 'vaisala',
        order: 10,
        path: '/templates/hs-tech/category/weather',
        description: 'Meteorological sensors'
    },
    {
        id: 'h2o2',
        title: 'H2O2',
        level: 2,
        showInNavigator: true,
        parentId: 'vaisala',
        order: 11,
        path: '/templates/hs-tech/category/h2o2',
        description: 'Bio-decontamination monitoring'
    },

    // Other Brand Categories (3)
    {
        id: 'setra_products',
        title: 'SETRA Products',
        level: 2,
        showInNavigator: true,
        parentId: 'setra',
        order: 12,
        path: '/templates/hs-tech/category/setra',
        description: 'Differential & Industrial Pressure'
    },
    {
        id: 'jumo_products',
        title: 'JUMO Products',
        level: 2,
        showInNavigator: true,
        parentId: 'jumo',
        order: 13,
        path: '/templates/hs-tech/category/jumo',
        description: 'Liquid Analysis & Control'
    },
    {
        id: 'knick_products',
        title: 'KNICK Products',
        level: 2,
        showInNavigator: true,
        parentId: 'knick',
        order: 14,
        path: '/templates/hs-tech/category/knick',
        description: 'Process Analysis'
    },

    // ========================================
    // LEVEL 3: SUBCATEGORIES (10 pages)
    // ========================================
    // Humidity SubCategories (4)
    {
        id: 'humidity_handheld',
        title: 'Handheld Instruments',
        level: 3,
        showInNavigator: true,
        parentId: 'humidity',
        order: 15,
        path: '/templates/hs-tech/subcategory/humidity/handheld',
        description: 'Portable humidity meters (HM70, Indigo80)'
    },
    {
        id: 'humidity_industrial',
        title: 'Industrial Transmitters',
        level: 3,
        showInNavigator: true,
        parentId: 'humidity',
        order: 16,
        path: '/templates/hs-tech/subcategory/humidity/industrial',
        description: 'Industrial humidity transmitters (HMT330, HMT310)'
    },
    {
        id: 'humidity_hvac',
        title: 'HVAC Transmitters',
        level: 3,
        showInNavigator: true,
        parentId: 'humidity',
        order: 17,
        path: '/templates/hs-tech/subcategory/humidity/hvac',
        description: 'HVAC humidity solutions (HMD60, HMW90)'
    },
    {
        id: 'humidity_module',
        title: 'Modules & OEM',
        level: 3,
        showInNavigator: true,
        parentId: 'humidity',
        order: 18,
        path: '/templates/hs-tech/subcategory/humidity/probe',
        description: 'OEM humidity modules (HMP series)'
    },

    // Dewpoint SubCategories (3)
    {
        id: 'dewpoint_portable',
        title: 'Portable Instruments',
        level: 3,
        showInNavigator: true,
        parentId: 'dewpoint',
        order: 19,
        path: '/templates/hs-tech/subcategory/dewpoint/portable',
        description: 'Portable dewpoint meters (DM70, Indigo80)'
    },
    {
        id: 'dewpoint_fixed',
        title: 'Fixed Transmitters',
        level: 3,
        showInNavigator: true,
        parentId: 'dewpoint',
        order: 20,
        path: '/templates/hs-tech/subcategory/dewpoint/fixed',
        description: 'Fixed dewpoint transmitters (DMT340, DMT345)'
    },
    {
        id: 'dewpoint_module',
        title: 'Modules & OEM',
        level: 3,
        showInNavigator: true,
        parentId: 'dewpoint',
        order: 21,
        path: '/templates/hs-tech/subcategory/dewpoint/module',
        description: 'OEM dewpoint modules (DMT143, DMT152)'
    },

    // CO2 SubCategories (3)
    {
        id: 'co2_transmitter',
        title: 'CO2 Transmitters',
        level: 3,
        showInNavigator: true,
        parentId: 'co2',
        order: 22,
        path: '/templates/hs-tech/subcategory/co2/transmitter',
        description: 'Wall-mounted CO2 transmitters (GMW90, GMD110)'
    },
    {
        id: 'co2_probe',
        title: 'CO2 Probes',
        level: 3,
        showInNavigator: true,
        parentId: 'co2',
        order: 23,
        path: '/templates/hs-tech/subcategory/co2/probe',
        description: 'CO2 sensor probes (GMP343, GMP251)'
    },
    {
        id: 'co2_handheld',
        title: 'Handheld CO2 Meters',
        level: 3,
        showInNavigator: true,
        parentId: 'co2',
        order: 24,
        path: '/templates/hs-tech/subcategory/co2/handheld',
        description: 'Portable CO2 measurement (Indigo80+GMP252)'
    },
];

/**
 * Helper functions
 */
export const getNavigatorPages = () => {
    return PAGE_STRUCTURE.filter(page => page.showInNavigator).sort((a, b) => a.order - b.order);
};

export const getPageById = (id: string) => {
    return PAGE_STRUCTURE.find(page => page.id === id);
};

export const getChildPages = (parentId: string) => {
    return PAGE_STRUCTURE.filter(page => page.parentId === parentId && page.showInNavigator);
};

export const getBreadcrumb = (pageId: string): PageMeta[] => {
    const breadcrumb: PageMeta[] = [];
    let currentPage = getPageById(pageId);

    while (currentPage) {
        breadcrumb.unshift(currentPage);
        if (currentPage.parentId) {
            currentPage = getPageById(currentPage.parentId);
        } else {
            break;
        }
    }

    return breadcrumb;
};

export const getNavigationContext = (currentPageId: string) => {
    const navigatorPages = getNavigatorPages();
    const currentIndex = navigatorPages.findIndex(p => p.id === currentPageId);

    return {
        currentPage: navigatorPages[currentIndex],
        prevPage: currentIndex > 0 ? navigatorPages[currentIndex - 1] : null,
        nextPage: currentIndex < navigatorPages.length - 1 ? navigatorPages[currentIndex + 1] : null,
        totalPages: navigatorPages.length,
        currentPosition: currentIndex + 1
    };
};
