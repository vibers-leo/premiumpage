import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import parse, { DOMNode, Element } from 'html-react-parser';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { getMenuItems } from '@/lib/nav-data';
import { CompanyIntroduction } from '@/components/company/introduction';
import { CompanyGreeting } from '@/components/company/greeting';
import { CompanyOrganization } from '@/components/company/organization';
import { CompanyBusinessScope } from '@/components/company/business-scope';
import { CompanyCertification } from '@/components/company/certification';
import { CompanyCiBi } from '@/components/company/ci-bi';
import { CompanyLocation } from '@/components/company/location';
import { HeroSub } from '@/components/hero-sub';
import { CompanyGlobalNetwork } from '@/components/company/global-network';
import { CompanyView } from '@/components/company/company-view';
import { GlobalCatalogNavigator } from '@/components/global-catalog-navigator';
import { getPrevNextPages } from '@/lib/catalog-pages';

export async function generateStaticParams() {
    const langs = ['en', 'ko'];
    return langs.flatMap(lang => [
        { lang, slug: 'introduction' },
        { lang, slug: 'global_network' },
        { lang, slug: 'company_view' },
        { lang, slug: 'greeting' },
        { lang, slug: 'history' },
        { lang, slug: 'philosophy' },
        { lang, slug: 'organization' },
        { lang, slug: 'business_scope' },
        { lang, slug: 'certification' },
        { lang, slug: 'location' },
        { lang, slug: 'ci_bi' },
    ]);
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;

    // Dynamically load language specific data
    let data;
    try {
        data = (await import(`@/lib/data/content_${lang}.json`)).default;
    } catch {
        data = (await import(`@/lib/data/content_en.json`)).default;
    }

    const pageData = data[slug];

    // Page data might be missing for our new custom pages (global_network, company_view)
    // We should handle that.
    const isCustomPage = ['global_network', 'company_view'].includes(slug);

    if (!pageData && !isCustomPage) {
        notFound();
    }

    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element) {
                // Focus strictly on image quality and styling
                if (domNode.tagName === 'img') {
                    const { src, alt } = domNode.attribs;
                    const imageSrc = src.startsWith('/') ? src : `/${src}`;

                    return (
                        <div className="relative my-8 flex justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageSrc}
                                alt={alt || "GENTOP Image"}
                                className="max-w-full h-auto object-contain shadow-2xl rounded-2xl border border-black/5 dark:border-white/5"
                            />
                        </div>
                    );
                }
            }
        },
    };

    const menuItems = getMenuItems(lang);
    const companyMenu = menuItems.find(item => item.title === (lang === 'ko' ? '회사소개' : 'COMPANY'));

    // Determine the content to render
    let content;
    if (slug === 'introduction') {
        content = <CompanyIntroduction lang={lang} />;
    } else if (slug === 'global_network') {
        content = <CompanyGlobalNetwork lang={lang} />;
    } else if (slug === 'company_view') {
        content = <CompanyView lang={lang} />;
    } else if (slug === 'greeting') {
        content = <CompanyGreeting />;
    } else if (slug === 'organization') {
        content = <CompanyOrganization />;
    } else if (slug === 'business_scope') {
        content = <CompanyBusinessScope lang={lang} />;
    } else if (slug === 'certification') {
        content = <CompanyCertification />;
    } else if (slug === 'ci_bi') {
        content = <CompanyCiBi />;
    } else if (slug === 'location') {
        content = <CompanyLocation />;
    } else {
        content = parse(pageData.content, options);
    }

    // Assuming NAV_DATA is imported or defined elsewhere, for the instruction's sub-navigation
    // For now, let's use the existing companyMenu structure for the sub-navigation if NAV_DATA is not available.
    // If NAV_DATA is intended to be a global constant, it should be imported.
    // For the purpose of this edit, I will adapt the instruction's sub-navigation to use `companyMenu` if `NAV_DATA` is not defined.
    // If NAV_DATA is meant to be a new import, please provide it.
    // For now, I'll assume `NAV_DATA` is not globally available and use `companyMenu` for the sub-nav.
    const NAV_DATA = {
        en: { company: { items: companyMenu?.items.map(item => ({ title: item.name, href: item.link })) || [] } },
        ko: { company: { items: companyMenu?.items.map(item => ({ title: item.name, href: item.link })) || [] } },
    };


    return (
        <div className="h-screen bg-background relative transition-colors duration-300 overflow-hidden flex flex-col">
            <BackgroundBeams className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-50 dark:opacity-100" />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
                <HeroSub
                    badge={lang === 'ko' ? '회사소개' : 'Company'}
                    title={pageData?.title || (
                        slug === 'global_network' ? 'Global Network' :
                            slug === 'company_view' ? 'Company View' : ''
                    )}
                />

                {/* Main Content Area */}
                <article className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-6 pb-20 legacy-content">

                    {/* Sub Navigation */}
                    <div className="mb-8">
                        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {(NAV_DATA as any)[lang]?.company.items.map((item: any) => {
                                const isActive = item.href.endsWith(slug);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'bg-gentop-green text-white shadow-lg shadow-gentop-green/30 scale-105'
                                            : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-black/5 dark:border-white/10'
                                            }`}
                                    >
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="bg-card/30 backdrop-blur-md rounded-3xl p-4 md:p-8 border border-black/5 dark:border-white/5 shadow-xl">
                        {content}
                    </div>

                    {/* Global Catalog Navigator Moved Outside */}
                </article>
            </div>
            {(() => {
                const navigation = getPrevNextPages('company', slug, lang);
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
