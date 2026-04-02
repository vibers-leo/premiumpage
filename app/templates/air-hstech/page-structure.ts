/**
 * Air HS-TECH Catalog — 24-Page Structure
 * GENWISH DC Engine-Off Air Conditioner Brand
 */

export interface BrochurePage {
    tab: string
    label: string
    group?: string
}

export const BROCHURE_FLOW: BrochurePage[] = [
    // ── Cover ──────────────────────────────────────────────────────────────
    { tab: 'cover',         label: 'COVER',          group: 'intro' },

    // ── Company ────────────────────────────────────────────────────────────
    { tab: 'about',         label: 'ABOUT US',       group: 'company' },
    { tab: 'greeting',      label: 'CEO GREETING',   group: 'company' },
    { tab: 'history',       label: 'HISTORY',        group: 'company' },
    { tab: 'brand',         label: 'BRAND',          group: 'company' },
    { tab: 'certifications',label: 'CERTIFICATIONS', group: 'company' },
    { tab: 'process',       label: 'PROCESS',        group: 'company' },

    // ── Products ───────────────────────────────────────────────────────────
    { tab: 'products',      label: 'PRODUCTS',       group: 'products' },
    { tab: 'spec-compare',  label: 'SPEC COMPARISON',group: 'products' },
    { tab: 'hsd-180d',      label: 'HSD-180D',       group: 'products' },
    { tab: 'hsh-260d',      label: 'HSH-260D',       group: 'products' },
    { tab: 'hsp-180d',      label: 'HSP-180D',       group: 'products' },
    { tab: 'hsv-260d',      label: 'HSV-260D',       group: 'products' },
    { tab: 'hss-065s',      label: 'HSS-065S',       group: 'products' },
    { tab: 'hs-024h',       label: 'HS-024H',        group: 'products' },
    { tab: 'hs-220h',       label: 'HS-220H',        group: 'products' },
    { tab: 'controllers',   label: 'CONTROLLERS',    group: 'products' },
    { tab: 'outdoor-unit',  label: 'OUTDOOR UNIT',   group: 'products' },

    // ── Technology ─────────────────────────────────────────────────────────
    { tab: 'dc-tech',       label: 'DC TECHNOLOGY',  group: 'technology' },
    { tab: 'non-operating', label: 'NON-OPERATING',  group: 'technology' },

    // ── Applications ───────────────────────────────────────────────────────
    { tab: 'crane',         label: 'CRANE',          group: 'applications' },
    { tab: 'campingcar',    label: 'CAMPING CAR',    group: 'applications' },
    { tab: 'ship',          label: 'SHIP',           group: 'applications' },

    // ── Contact ────────────────────────────────────────────────────────────
    { tab: 'location',      label: 'LOCATION',       group: 'contact' },
    { tab: 'contact',       label: 'CONTACT',        group: 'contact' },
]

export const ALL_TABS = BROCHURE_FLOW.map(p => p.tab)

export const getNavContext = (currentTab: string) => {
    const idx = BROCHURE_FLOW.findIndex(p => p.tab === currentTab)
    return {
        current: BROCHURE_FLOW[idx],
        prev: idx > 0 ? BROCHURE_FLOW[idx - 1] : null,
        next: idx < BROCHURE_FLOW.length - 1 ? BROCHURE_FLOW[idx + 1] : null,
        total: BROCHURE_FLOW.length,
        position: idx + 1,
    }
}
