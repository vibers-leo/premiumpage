import React from 'react';
import { BackgroundBeams } from '@gentop/components/ui/background-beams';
import { CompanyContact } from '@gentop/components/company/contact';
import { HeroSub } from '@gentop/components/hero-sub';
import { GlobalCatalogNavigator } from '@gentop/components/global-catalog-navigator';
import { getPrevNextPages } from '@gentop/lib/catalog-pages';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ko' }];
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    return (
        <div className="h-screen bg-background relative transition-colors duration-300 overflow-hidden flex flex-col">
            <BackgroundBeams className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-50 dark:opacity-100" />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
                <HeroSub
                    badge={lang === 'ko' ? '문의하기' : 'Contact'}
                    title={lang === 'ko' ? '문의하기' : 'Contact'}
                />

                {/* Main Content Area */}
                <article className="max-w-[1400px] mx-auto px-2 md:px-8 lg:px-12 py-3 pb-16 legacy-content">
                    {/* Main Content */}
                    <div className="bg-card/30 backdrop-blur-md rounded-3xl p-3 md:p-8 border border-black/5 dark:border-white/5 shadow-xl">
                        <CompanyContact />
                    </div>
                </article>
            </div>
            {(() => {
                const navigation = getPrevNextPages('contact', undefined, lang);
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
