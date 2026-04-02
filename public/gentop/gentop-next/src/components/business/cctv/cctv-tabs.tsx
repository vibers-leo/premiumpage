"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabProps {
    lang: string;
}

export const CCTVTabs = ({ lang }: TabProps) => {
    const pathname = usePathname();

    const tabs = [
        {
            name: lang === 'ko' ? "양방향 영상 감시시스템" : "Bidirectional Surveillance",
            path: `/${lang}/business/cctv`
        },
        {
            name: lang === 'ko' ? "무인 감시시스템" : "Unmanned Surveillance",
            path: `/${lang}/business/cctv.html_1`
        }
    ];

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => {
                const isActive = pathname === tab.path;

                return (
                    <Link
                        key={tab.path}
                        href={tab.path}
                        className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border ${isActive
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
