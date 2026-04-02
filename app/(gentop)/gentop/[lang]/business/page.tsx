
import React from 'react';
import { BackgroundBeams } from '@gentop/components/ui/background-beams';
import { HeroSub } from '@gentop/components/hero-sub';
import { BusinessScopeSection } from '@gentop/components/business-scope-section';
import { GlobalCatalogNavigator } from '@gentop/components/global-catalog-navigator';
import { getPrevNextPages } from '@gentop/lib/catalog-pages';
import { getTranslation } from '@gentop/lib/translations';

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ko" }];
}

export default async function BusinessSummaryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getTranslation(lang);

    return (
        <div className="h-screen bg-background relative transition-colors duration-300 overflow-hidden flex flex-col">
            <BackgroundBeams className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-50 dark:opacity-100" />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
                <HeroSub
                    badge={lang === 'ko' ? '사업분야' : 'Business Scope'}
                    title={lang === 'ko' ? '주요 사업 영역' : 'Our Business Areas'}
                />

                <article className="max-w-[1440px] mx-auto px-2 md:px-12 lg:px-20 py-4 pb-16">
                    <BusinessScopeSection lang={lang} />
                </article>
            </div>

            {/* Global Catalog Navigator (Fixed) */}
            {(() => {
                const navigation = getPrevNextPages('business', undefined, lang);
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
