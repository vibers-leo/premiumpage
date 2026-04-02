"use client";

import React from "react";
import Image from "next/image";

export const CompanyGreeting = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-start">
                {/* Left: Text Content - 7 columns */}
                <div className="lg:col-span-7 space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    <p className="text-base md:text-lg font-medium">
                        Hello everyone. This is GENTOP Corporation.
                    </p>

                    <p>
                        As a company that creates value, it is widely spread that in order for a company to continue to develop in a business environment where technology is developing and changing day by day, it must fulfill not only economic interests but also social and environmental responsibilities.
                    </p>

                    <p>
                        In line with these changes, our GENTOP is developing various activities to raise corporate value.
                    </p>

                    <p>
                        GENTOP, a system development company, started with automatic control, management section control, and integrated remote surveillance measurement automatic control system, and has focused on supplying the best system and thorough follow-up management, such as parking control and access control system, and has done its best with a customer-first corporate spirit.
                    </p>

                    <p>
                        In addition, since its establishment in 2004, it has been striving to expand the core national business system, and is currently promoting new overseas business expansion based on a solid financial structure and accumulated technology and experience.
                    </p>

                    <p>
                        Internally, we have strengthened ethical management and renewed ourselves as an innovative organization with youth and spirit, and we are striving to realize customer satisfaction by providing sincere construction and the best service.
                    </p>

                    <p className="font-medium">
                        In the future, GENTOP will continue to develop sustainable management, abundant technology and experience, fulfill social missions and responsibilities, and become a company that presents a better future with advanced technology and experience.
                    </p>

                    <p className="text-base md:text-lg font-semibold pt-4">
                        Thank you.
                    </p>

                    <p className="text-right font-medium text-[#F47920] pt-2">
                        GENTOP Co., Ltd. Executives and Staff
                    </p>
                </div>

                {/* Right: Image - 3 columns (30% of 10) */}
                <div className="lg:col-span-3 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <Image
                        src="/images/company/greeting/greeting_bg.jpg"
                        alt="GENTOP Vision"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F47920]/5 to-transparent" />
                </div>
            </div>
        </div>
    );
};
