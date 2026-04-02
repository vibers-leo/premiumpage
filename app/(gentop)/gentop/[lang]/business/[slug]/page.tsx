import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import parse, { DOMNode, Element } from 'html-react-parser';
import { BackgroundBeams } from '@gentop/components/ui/background-beams';
import { Spotlight } from "@gentop/components/ui/spotlight";
import { getMenuItems } from '@gentop/lib/nav-data';
import { ConstructionElectric } from '@gentop/components/business/construction-electric';
import { ConstructionMachine } from '@gentop/components/business/construction-machine';
import { ConstructionInfo } from '@gentop/components/business/construction-info';
import { ConstructionTabs } from '@gentop/components/business/construction-tabs';
import { EcoFriendlyTabs } from '@gentop/components/business/eco-friendly-tabs';
import { EcoFriendlySolar } from '@gentop/components/business/eco-friendly-solar';
import { EcoFriendlyGeothermal } from '@gentop/components/business/eco-friendly-geothermal';
import { EcoFriendlyWind } from '@gentop/components/business/eco-friendly-wind';
import { EcoFriendlyWater } from '@gentop/components/business/eco-friendly-water';
import { AccessTabs } from '@gentop/components/business/access-parking/access-tabs';
import { AccessControl } from '@gentop/components/business/access-parking/access-control';
import { ParkingControl } from '@gentop/components/business/access-parking/parking-control';
import { CCTVTabs } from '@gentop/components/business/cctv/cctv-tabs';
import { CCTVBidirectional } from '@gentop/components/business/cctv/cctv-bidirectional';
import { CCTVUnmanned } from '@gentop/components/business/cctv/cctv-unmanned';
import { ComponentType } from "react";
import { GlobalCatalogNavigator } from '@gentop/components/global-catalog-navigator';
import { getPrevNextPages } from '@gentop/lib/catalog-pages';
import { HeroSub } from '@gentop/components/hero-sub';

export async function generateStaticParams() {
    const langs = ['en', 'ko'];
    return langs.flatMap(lang => [
        { lang, slug: 'construction' },
        { lang, slug: 'construction.html_1' },
        { lang, slug: 'construction.html_2' },
        { lang, slug: 'facilities' },
        { lang, slug: 'public_address' },
        { lang, slug: 'access_parking' },
        { lang, slug: 'access_parking.html_1' },
        { lang, slug: 'cctv' },
        { lang, slug: 'cctv.html_1' },
        { lang, slug: 'led_display' },
        { lang, slug: 'eco_friendly' },
        { lang, slug: 'eco_friendly.html_1' },
        { lang, slug: 'eco_friendly.html_2' },
        { lang, slug: 'eco_friendly.html_3' },
    ]);
}

export default async function BusinessDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;

    // Dynamically load language specific data
    let data;
    try {
        data = (await import(`@gentop/lib/data/content_${lang}.json`)).default;
    } catch {
        data = (await import(`@gentop/lib/data/content_en.json`)).default;
    }

    const pageData = data[slug];
    const isCustomPage = slug.includes('.html_');

    if (!pageData && !isCustomPage) {
        notFound();
    }

    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element) {
                // Remove legacy tab menu as we implemented a new one
                if (domNode.attribs.class && domNode.attribs.class.includes('tabmenu-section')) {
                    return <></>;
                }

                // Handle specifically the construction main page where table and image should be side-by-side
                if (domNode.tagName === 'table') {
                    return (
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-16">
                            <div className="flex-1 w-full overflow-x-auto">
                                <table className="w-full border-collapse border border-black/5 dark:border-white/10 text-sm md:text-base bg-black/[0.02] dark:bg-white/5 rounded-xl overflow-hidden shadow-2xl">
                                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                                        {(domNode.children[0] as Element)?.children?.map((row, rIdx) => {
                                            if (row.type === 'tag' && row.tagName === 'tr') {
                                                return (
                                                    <tr key={rIdx} className="hover:bg-black/[0.02] dark:hover:bg-white/5 transition-colors">
                                                        {row.children.map((cell, cIdx) => {
                                                            if (cell.type === 'tag' && (cell.tagName === 'th' || cell.tagName === 'td')) {
                                                                const isHeader = cell.tagName === 'th';
                                                                return (
                                                                    <React.Fragment key={cIdx}>
                                                                        {isHeader ? (
                                                                            <th className="p-4 md:p-6 text-left font-bold text-gentop-green bg-black/[0.02] dark:bg-white/5 w-1/3 border-r border-black/5 dark:border-white/5 uppercase tracking-wider text-[10px] md:text-xs">
                                                                                {parse((cell.children[0] as any)?.data || '')}
                                                                            </th>
                                                                        ) : (
                                                                            <td className="p-4 md:p-6 text-foreground/80">
                                                                                {parse((cell.children[0] as any)?.data || '')}
                                                                            </td>
                                                                        )}
                                                                    </React.Fragment>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* We detect the specific image after this table in construction slug */}
                            {(slug === 'construction' || slug === 'construction.html_1' || slug === 'construction.html_2') && (
                                <div className="lg:w-[320px] shrink-0">
                                    <div className="relative aspect-[3/4] bg-white rounded-2xl border border-white/10 overflow-hidden shadow-2xl group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gentop-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={
                                                slug === 'construction' ? "/images/business/construction/business_img000.jpg" :
                                                    slug === 'construction.html_1' ? "/images/business/construction/electric_license.jpg" :
                                                        "/images/business/construction/machine_license.jpg"
                                            }
                                            alt="Registration Certificate"
                                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <p className="mt-3 text-center text-xs text-gray-500 font-medium">Registration Certificate</p>
                                </div>
                            )}
                        </div>
                    );
                }

                // Skip individual image rendering only for the license images we handled above to avoid duplication
                if (domNode.tagName === 'div' && domNode.attribs.class === 'oimg' && (slug.startsWith('construction'))) {
                    const imgChild = domNode.children.find(c => (c as any).tagName === 'img') as any;
                    const src = imgChild?.attribs?.src || "";
                    if (src.includes('business_img000') || src.includes('license')) {
                        return <></>;
                    }
                }

                if (domNode.tagName === 'img') {
                    const { src, alt } = domNode.attribs;
                    const imageSrc = src.startsWith('/') ? src : `/${src}`;

                    return (
                        <div className="relative my-12 group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gentop-green/50 to-blue-500/50 rounded-2xl blur opacity-10 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageSrc}
                                alt={alt || "GENTOP Image"}
                                className="relative max-w-full h-auto object-contain rounded-2xl border border-black/5 dark:border-white/10 shadow-2xl transition-all duration-500"
                            />
                        </div>
                    );
                }
            }
        },
    };

    const menuItems = getMenuItems(lang);
    const businessMenu = menuItems.find(item => item.title === (lang === 'ko' ? '사업분야' : 'BUSINESS SCOPE'));

    return (
        <div className="h-screen bg-background relative transition-colors duration-300 overflow-hidden flex flex-col">
            <BackgroundBeams className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-50 dark:opacity-100" />
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
                <HeroSub
                    badge={lang === 'ko' ? '사업분야' : 'Business Scope'}
                    title={pageData?.title}
                />

                <article className="max-w-[1440px] mx-auto px-2 md:px-12 lg:px-20 py-3 pb-16 legacy-content">

                    {/* Sub Navigation */}
                    <div className="mb-3">
                        <nav className="flex flex-wrap justify-center gap-1 md:gap-3">
                            {businessMenu?.items.map((item) => {
                                // Logic to highlight parent menu items for sub-pages
                                const isActive = item.link.endsWith(slug) ||
                                    (slug.startsWith('eco_friendly') && item.link.endsWith('eco_friendly')) ||
                                    (slug.startsWith('construction') && item.link.endsWith('construction')) ||
                                    (slug.startsWith('access_parking') && item.link.endsWith('access_parking')) ||
                                    (slug.startsWith('cctv') && item.link.endsWith('cctv'));
                                return (
                                    <Link
                                        key={item.link}
                                        href={item.link}
                                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'bg-gentop-green text-white shadow-lg shadow-gentop-green/30 scale-105'
                                            : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-black/5 dark:border-white/10'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Content Logic */}
                    {slug.startsWith('construction') ? (
                        <div className="space-y-12">
                            <ConstructionTabs lang={lang} />
                            {slug === 'construction' && <ConstructionInfo />}
                            {slug === 'construction.html_1' && <ConstructionElectric />}
                            {slug === 'construction.html_2' && <ConstructionMachine />}
                        </div>
                    ) : slug.startsWith('access_parking') ? (
                        <div className="space-y-12">
                            <AccessTabs lang={lang} />
                            {slug === 'access_parking' && <AccessControl />}
                            {slug === 'access_parking.html_1' && <ParkingControl />}
                        </div>
                    ) : slug.startsWith('cctv') ? (
                        <div className="space-y-12">
                            <CCTVTabs lang={lang} />
                            {slug === 'cctv' && <CCTVBidirectional />}
                            {slug === 'cctv.html_1' && <CCTVUnmanned />}
                        </div>
                    ) : slug.startsWith('eco_friendly') ? (
                        <div className="space-y-12">
                            <EcoFriendlyTabs lang={lang} />
                            {slug === 'eco_friendly' && <EcoFriendlySolar />}
                            {slug === 'eco_friendly.html_1' && <EcoFriendlyGeothermal />}
                            {slug === 'eco_friendly.html_2' && <EcoFriendlyWind />}
                            {slug === 'eco_friendly.html_3' && <EcoFriendlyWater />}
                        </div>
                    ) : (
                        <div className="bg-card/30 backdrop-blur-md rounded-3xl p-3 md:p-12 border border-black/5 dark:border-white/5 shadow-xl">
                            {parse(pageData.content, options)}
                        </div>
                    )}

                </article>
            </div>
            {(() => {
                const navigation = getPrevNextPages('business', slug, lang);
                return (
                    <GlobalCatalogNavigator
                        prevPage={navigation.prev}
                        nextPage={navigation.next}
                        currentPage={navigation.current}
                        totalPages={navigation.total}
                    />
                );
            })()}
        </div>
    );
}

