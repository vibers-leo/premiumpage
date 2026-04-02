import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HS TECH — GENWISH DC Engine-Off Air Conditioner Catalog',
    description: 'HS TECH is a leader of engine-off DC air conditioner manufacturers. Explore the GENWISH product lineup for cranes, camping cars, and ships.',
    openGraph: {
        title: 'HS TECH — GENWISH DC Air Conditioner Catalog',
        description: 'Engine-off DC air conditioners for industrial vehicles, RVs, and marine applications.',
        images: ['/templates/air-hstech/images/hero-1.jpg'],
    },
}

export default function AirHSTechLayout({ children }: { children: React.ReactNode }) {
    return children
}
