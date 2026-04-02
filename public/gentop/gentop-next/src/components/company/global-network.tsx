"use client";

import React from "react";
import Image from "next/image";

export const CompanyGlobalNetwork = ({ lang }: { lang: string }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 space-y-12 relative">
            {/* Subtle Dot Pattern */}
            <div className="absolute inset-0 bg-dot-black/[0.02] dark:bg-dot-white/[0.02] -z-10" />

            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl">
                <Image
                    src="/images/company/introduction/global_pic.jpg"
                    alt="Global Network Map"
                    fill
                    className="object-contain p-4 dark:invert-[0.05]"
                />
            </div>
        </div>
    );
};
