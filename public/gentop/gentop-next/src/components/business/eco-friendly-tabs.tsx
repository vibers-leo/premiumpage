"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const EcoFriendlyTabs = ({ lang }: { lang: string }) => {
    const pathname = usePathname();

    const tabs = [
        {
            name: lang === "ko" ? "태양광 발전" : "Solar Energy Generation System",
            path: `/${lang}/business/eco_friendly`,
            isActive: (path: string) => path === `/${lang}/business/eco_friendly`
        },
        {
            name: lang === "ko" ? "지열 발전" : "Geothermal Power Generation System",
            path: `/${lang}/business/eco_friendly.html_1`,
            isActive: (path: string) => path.endsWith("eco_friendly.html_1")
        },
        {
            name: lang === "ko" ? "풍력 발전" : "Wind Power Generation System",
            path: `/${lang}/business/eco_friendly.html_2`,
            isActive: (path: string) => path.endsWith("eco_friendly.html_2")
        },
        {
            name: lang === "ko" ? "수력 발전" : "Water Power Generation System",
            path: `/${lang}/business/eco_friendly.html_3`,
            isActive: (path: string) => path.endsWith("eco_friendly.html_3")
        }
    ];

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => {
                const active = tab.isActive(pathname);
                return (
                    <Link
                        key={tab.path}
                        href={tab.path}
                        className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border ${active
                            ? "bg-gentop-green text-black border-gentop-green shadow-lg shadow-gentop-green/20"
                            : "bg-transparent text-gray-400 border-white/10 hover:border-gentop-green hover:text-gentop-green"
                            }`}
                    >
                        {tab.name}
                    </Link>
                );
            })}
        </div>
    );
};
