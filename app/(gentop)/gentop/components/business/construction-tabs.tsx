"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ConstructionTabs = ({ lang }: { lang: string }) => {
    const pathname = usePathname();

    // Define tabs with their corresponding paths
    const tabs = [
        {
            name: "Information and Communications Constructions",
            path: `/${lang}/business/construction`,
            isActive: (path: string) => path === `/${lang}/business/construction`
        },
        {
            name: "Electric Work",
            path: `/${lang}/business/construction.html_1`,
            isActive: (path: string) => path.endsWith("construction.html_1")
        },
        {
            name: "Machine Equipment Construction",
            path: `/${lang}/business/construction.html_2`,
            isActive: (path: string) => path.endsWith("construction.html_2")
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
