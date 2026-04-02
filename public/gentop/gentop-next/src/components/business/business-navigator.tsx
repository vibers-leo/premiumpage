"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BusinessNavigatorProps {
    currentSlug: string;
    lang: string;
}

const CATEGORIES: Record<string, string[]> = {
    construction: ['construction', 'construction.html_1', 'construction.html_2'],
    access_parking: ['access_parking', 'access_parking.html_1'],
    cctv: ['cctv', 'cctv.html_1'],
    eco_friendly: ['eco_friendly', 'eco_friendly.html_1', 'eco_friendly.html_2', 'eco_friendly.html_3'],
    facilities: ['facilities'],
    public_address: ['public_address'],
    led_display: ['led_display']
};

export const BusinessNavigator = ({ currentSlug, lang }: BusinessNavigatorProps) => {
    // Find which category the current slug belongs to
    const categoryKey = Object.keys(CATEGORIES).find(key =>
        CATEGORIES[key].includes(currentSlug)
    );

    if (!categoryKey) return null;

    const pages = CATEGORIES[categoryKey];
    const currentIndex = pages.indexOf(currentSlug);
    const totalPages = pages.length;

    // If it's a single page category, we might not want to show navigation
    // But the user requested "0/0" style globally, so maybe 1/1?
    // Let's show it even for 1/1 but disable buttons.

    const prevSlug = currentIndex > 0 ? pages[currentIndex - 1] : null;
    const nextSlug = currentIndex < totalPages - 1 ? pages[currentIndex + 1] : null;

    const prevLink = prevSlug ? `/${lang}/business/${prevSlug}` : "#";
    const nextLink = nextSlug ? `/${lang}/business/${nextSlug}` : "#";

    return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-20 md:mt-32 pb-10">
            {/* Divider */}
            <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent mb-8" />

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-8 md:gap-16 bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10 px-8 py-4 rounded-full shadow-2xl">
                {/* Prev Button */}
                <Link
                    href={prevLink}
                    className={`group flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300 ${prevSlug
                            ? "text-gray-600 dark:text-gray-400 hover:text-gentop-green"
                            : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                        }`}
                    aria-disabled={!prevSlug}
                    onClick={(e) => !prevSlug && e.preventDefault()}
                >
                    <div className={`p-2 rounded-full border transition-all duration-300 ${prevSlug
                            ? "border-gray-200 dark:border-white/10 group-hover:border-gentop-green group-hover:bg-gentop-green/10"
                            : "border-gray-100 dark:border-white/5"
                        }`}>
                        <ChevronLeft size={20} />
                    </div>
                    <span className="hidden md:inline">Prev</span>
                </Link>

                {/* Page Indicator */}
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold font-mono text-black dark:text-white">
                        {currentIndex + 1} <span className="text-gray-400 text-lg">/ {totalPages}</span>
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-gray-400 mt-1">
                        Page
                    </span>
                </div>

                {/* Next Button */}
                <Link
                    href={nextLink}
                    className={`group flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300 ${nextSlug
                            ? "text-gray-600 dark:text-gray-400 hover:text-gentop-green"
                            : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                        }`}
                    aria-disabled={!nextSlug}
                    onClick={(e) => !nextSlug && e.preventDefault()}
                >
                    <span className="hidden md:inline">Next</span>
                    <div className={`p-2 rounded-full border transition-all duration-300 ${nextSlug
                            ? "border-gray-200 dark:border-white/10 group-hover:border-gentop-green group-hover:bg-gentop-green/10"
                            : "border-gray-100 dark:border-white/5"
                        }`}>
                        <ChevronRight size={20} />
                    </div>
                </Link>
            </div>
        </div>
    );
};
