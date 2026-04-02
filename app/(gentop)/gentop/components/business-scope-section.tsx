
import React from 'react';
import Link from 'next/link';
import { Cpu, Megaphone, CircleParking, IdCard, Camera, Monitor, ArrowRight } from 'lucide-react';
import { getTranslation } from "@gentop/lib/translations";

export const BusinessScopeSection = ({ lang }: { lang: string }) => {
    const t = getTranslation(lang);

    const businessItems = [
        {
            icon: <Cpu className="w-12 h-12 mb-6" />,
            title: lang === 'ko' ? "시스템 구축" : "System Introduction",
            link: `/${lang}/business/construction`,
            desc: lang === 'ko' ? "최첨단 시스템 통합 솔루션" : "High-tech Integration Solutions"
        },
        {
            icon: <Megaphone className="w-12 h-12 mb-6" />,
            title: lang === 'ko' ? "전관방송" : "Public Address System",
            link: `/${lang}/business/public_address`,
            desc: lang === 'ko' ? "명료한 오디오 방송 시스템" : "Clear Audio Broadcasting"
        },
        {
            icon: <CircleParking className="w-12 h-12 mb-6" />,
            title: lang === 'ko' ? "주차관제" : "Parking Control System",
            link: `/${lang}/business/access_parking`,
            desc: lang === 'ko' ? "스마트 주차 관리" : "Smart Parking Management"
        },
        {
            icon: <IdCard className="w-12 h-12 mb-6" />,
            title: lang === 'ko' ? "출입통제" : "Access Control System",
            link: `/${lang}/business/access_parking`,
            desc: lang === 'ko' ? "안전한 보안 출입 시스템" : "Secure Access Management"
        },
        {
            icon: <Camera className="w-12 h-12 mb-6" />,
            title: lang === 'ko' ? "CCTV 시스템" : "CCTV System",
            link: `/${lang}/business/cctv`,
            desc: lang === 'ko' ? "지능형 영상 감시" : "Intelligent Video Surveillance"
        },
        {
            icon: <Monitor className="w-12 h-12 mb-6" />,
            title: lang === 'ko' ? "LED 전광판" : "LED Display Solution",
            link: `/${lang}/business/led_display`,
            desc: lang === 'ko' ? "고화질 디스플레이 솔루션" : "High-definition Display Solutions"
        }
    ];

    return (
        <section className="w-full bg-muted/10 py-20 border-t border-border">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessItems.map((item, idx) => (
                        <Link
                            href={item.link}
                            key={idx}
                            className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 p-10 hover:border-gentop-green transition-all duration-500 hover:shadow-2xl hover:shadow-gentop-green/10 hover:-translate-y-2 flex flex-col items-center justify-between min-h-[320px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gentop-green/0 via-transparent to-transparent group-hover:from-gentop-green/5 transition-all duration-500" />

                            <div className="relative z-10 flex flex-col items-center w-full flex-grow justify-center">
                                <div className="text-muted-foreground group-hover:text-gentop-green group-hover:scale-110 transition-all duration-500 p-4 rounded-full bg-muted/50 group-hover:bg-gentop-green/10 mb-8">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-gentop-green transition-colors">{item.title}</h3>
                                <p className="text-muted-foreground text-sm font-medium mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <span className="inline-flex items-center text-sm font-bold text-foreground/50 group-hover:text-gentop-green transition-all duration-300 group-hover:translate-x-1 uppercase tracking-wider">
                                    {lang === 'ko' ? '자세히 보기' : 'View Details'} <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
