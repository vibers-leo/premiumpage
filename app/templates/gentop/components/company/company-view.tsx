"use client";

import React from "react";
import Image from "next/image";

export const CompanyView = ({ lang }: { lang: string }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 space-y-12 relative">
            {/* Background Map Watermark */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none -z-10 bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url(/images/company/introduction/global_pic.jpg)' }}
            />


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
                {/* Head Office View Group */}
                <div className="flex flex-col items-center gap-6">
                    <div className="flex gap-4 w-full justify-center">
                        <ViewImage src="/images/company/introduction/office_view01.jpg" alt="Head Office 1" />
                        <ViewImage src="/images/company/introduction/office_view02.jpg" alt="Head Office 2" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-2">Head Office View</h3>
                </div>

                {/* Cambodia Corporation View Group */}
                <div className="flex flex-col items-center gap-6">
                    <div className="flex gap-4 w-full justify-center">
                        <ViewImage src="/images/company/introduction/office_view03.jpg" alt="Cambodia Office 1" />
                        <ViewImage src="/images/company/introduction/office_view04.jpg" alt="Cambodia Office 2" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-2">Cambodia Corporation View</h3>
                </div>
            </div>
        </div>
    );
};

const ViewImage = ({ src, alt }: { src: string, alt: string }) => (
    <div className="relative w-full aspect-[4/3] max-w-[300px] group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gentop-green/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative w-full h-full overflow-hidden rounded-lg bg-white dark:bg-neutral-800 p-1 border border-black/5 dark:border-white/5 shadow-lg group-hover:shadow-2xl transition-all duration-500">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
        </div>
    </div>
);
