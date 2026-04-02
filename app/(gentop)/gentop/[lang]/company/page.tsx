
import React from "react";
import { TracingBeam } from "@gentop/components/ui/tracing-beam";
import { getTranslation } from "@gentop/lib/translations";

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ko" }];
}

export default async function CompanyPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getTranslation(lang);

    return (
        <div className="w-full min-h-screen bg-background pt-24 md:pt-40 pb-20 px-2 md:px-6 transition-colors duration-300">
            <TracingBeam className="px-2 md:px-6">
                <div className="max-w-3xl mx-auto antialiased pt-4 relative">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass text-xs font-bold tracking-widest text-gentop-green uppercase">
                        {lang === 'ko' ? '회사소개' : 'About Us'}
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter mb-10">
                        {lang === 'ko' ? '글로벌 네트워크' : 'Global Network'} &<br />
                        <span className="text-gentop-green">Business</span>
                    </h1>

                    <div className="mb-20 text-muted-foreground space-y-6 text-lg md:text-xl leading-relaxed font-medium">
                        <h2 className="text-3xl font-black text-foreground mb-4">
                            {t.hero.title}<br />
                            <span className="text-gentop-green">GENTOP</span>
                        </h2>
                        <p>{t.hero.description}</p>
                    </div>

                    <div className="mb-20">
                        <div className="relative rounded-3xl overflow-hidden mb-10 group">
                            <img
                                src="/images/global_pic.jpg"
                                alt="Global Network"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <h2 className="text-3xl font-bold text-white">Global Network</h2>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {lang === 'ko'
                                ? '우리는 한국, 캄보디아, 미얀마에서 강력한 입지를 바탕으로 글로벌 사업을 운영하고 있습니다. 우리의 국제적인 네트워크는 글로벌 표준을 준수하면서도 현지에 최적화된 솔루션을 제공합니다.'
                                : 'We operate globally with a strong presence in Korea, Cambodia, and Myanmar. Our international network allows us to provide localized solutions with global standards.'
                            }
                        </p>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-3xl font-black text-foreground mb-8">
                            {lang === 'ko' ? 'CEO 인사말' : 'CEO Greeting'}
                        </h2>
                        <div className="bg-muted p-10 rounded-3xl border border-border shadow-2xl">
                            <p className="text-foreground text-2xl font-bold italic leading-tight mb-8">
                                {lang === 'ko'
                                    ? '"언제나 여러분과 함께하는 젠탑. 가장 신뢰할 수 있는 파트너가 될 것을 약속드립니다."'
                                    : '"Always with you, GENTOP. We promise to be your most reliable partner."'
                                }
                            </p>
                            <div className="h-[1px] w-full bg-border mb-6"></div>
                            <p className="text-right text-foreground font-black text-lg">- CEO Hong Dae, Park</p>
                        </div>
                    </div>
                </div>
            </TracingBeam>
        </div>
    );
}
