"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BusinessField {
    titleEn: string;
    titleKo: string;
    img: string;
}

const businessFields: BusinessField[] = [
    { titleEn: "Parking Control System", titleKo: "주차 관제 시스템", img: "/images/company/business_scope/business001.jpg" },
    { titleEn: "Renewable Energy", titleKo: "신재생 에너지", img: "/images/company/business_scope/business002.jpg" },
    { titleEn: "CCTV System", titleKo: "CCTV 시스템", img: "/images/company/business_scope/business003.jpg" },
    { titleEn: "Access Control System", titleKo: "출입 통제 시스템", img: "/images/company/business_scope/business004.jpg" },
    { titleEn: "Electronic Display Board System", titleKo: "전자 전광판 시스템", img: "/images/company/business_scope/business005.jpg" },
    { titleEn: "Communication (Inside)", titleKo: "정보통신 (구내)", img: "/images/company/business_scope/business006.jpg" },
    { titleEn: "PLC", titleKo: "PLC", img: "/images/company/business_scope/business007.jpg" },
    { titleEn: "Instrumentation Control", titleKo: "계측 제어", img: "/images/company/business_scope/business008.jpg" },
    { titleEn: "Sound & Video Solution", titleKo: "음향 및 영상 솔루션", img: "/images/company/business_scope/business009.jpg" },
];

const partners = [
    { nameEn: "Changwon City", nameKo: "창원시", img: "/images/company/business_scope/partner001.jpg" },
    { nameEn: "LH", nameKo: "LH 한국토지주택공사", img: "/images/company/business_scope/partner002.jpg" },
    { nameEn: "Ministry of National Defense", nameKo: "대한민국 국방부", img: "/images/company/business_scope/partner003.jpg" },
    { nameEn: "KR", nameKo: "KR 깨끗하고 푸른", img: "/images/company/business_scope/partner004.jpg" },
    { nameEn: "K-water", nameKo: "K Water 한국수자원공사", img: "/images/company/business_scope/partner005.jpg" },
    { nameEn: "Public Procurement Service", nameKo: "조달청", img: "/images/company/business_scope/partner006.jpg" },
];

export const CompanyBusinessScope = ({ lang = "en" }: { lang?: string }) => {
    const isEn = lang === "en";

    return (
        <div className="w-full space-y-32">
            {/* Header Section with World Map Inspiration */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="400" cy="200" r="1" fill="currentColor" />
                        <path d="M100 200C100 200 250 100 400 200C550 300 700 200 700 200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                        <path d="M150 150C300 100 500 300 650 250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                    </svg>
                </div>

                <div className="relative z-10 text-center space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
                    >
                        {isEn ? "Business Overview" : "사업 영역"}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-light"
                    >
                        {isEn
                            ? "Global technology leader providing integrated smart solutions for a sustainable future."
                            : "지속 가능한 미래를 위한 통합 스마트 솔루션을 제공하는 글로벌 기술 리더입니다."}
                    </motion.p>
                </div>

                {/* Diagram Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl mx-auto mt-20 px-6"
                >
                    <div className="absolute -inset-10 bg-gentop-green/5 blur-3xl rounded-full" />
                    <div className="relative bg-white p-8 md:p-12 rounded-[3rem] border border-neutral-100 shadow-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-white backdrop-blur-md -z-10" />
                        <div className="relative w-full aspect-square md:aspect-[4/3] max-h-[600px]">
                            <Image
                                src="/images/company/business_scope/business_area_img.jpg"
                                alt="Business Area Diagram"
                                fill
                                className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Business Fields Grid - Modern & Premium Cards */}
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="relative mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-1.5 bg-gentop-green rounded-full" />
                        <h3 className="text-2xl md:text-4xl font-bold">
                            {isEn ? "Business Fields" : "주요 사업 분야"}
                        </h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {businessFields.map((field, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white dark:bg-neutral-900/50 rounded-3xl overflow-hidden border border-neutral-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50 dark:bg-black">
                                <Image
                                    src={field.img}
                                    alt={isEn ? field.titleEn : field.titleKo}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-bold text-foreground group-hover:text-gentop-green transition-colors">
                                        {isEn ? field.titleEn : field.titleKo}
                                    </h4>
                                    <div className="w-8 h-8 rounded-full bg-gentop-green/10 flex items-center justify-center text-gentop-green opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-12 h-1 bg-neutral-100 dark:bg-white/10 group-hover:w-full group-hover:bg-gentop-green transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Major Partners Section - Refined & Professional */}
            <div className="max-w-[1400px] mx-auto px-6 pb-24">
                <div className="relative text-center mb-20">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        {isEn ? "Major Partners" : "주요 파트너사"}
                    </h3>
                    <div className="w-20 h-1 bg-gentop-green mx-auto mb-6" />
                    <p className="text-gray-400 font-light italic">
                        {isEn ? "Trusted by national and private organizations" : "국가 지자체 및 유수의 기업들이 함께하고 있습니다"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map((partner, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-2xl border border-neutral-100 dark:border-white/5 flex flex-col items-center justify-center shadow-sm hover:shadow-2xl hover:border-gentop-green/50 transition-all h-[220px]"
                        >
                            <div className="relative w-full h-20 md:h-24 grayscale hover:grayscale-0 transition-all duration-500 opacity-90 hover:opacity-100 mb-8">
                                <Image
                                    src={partner.img}
                                    alt={isEn ? partner.nameEn : partner.nameKo}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="text-center pt-2">
                                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] leading-tight block mb-2">
                                    {isEn ? partner.nameEn : partner.nameKo}
                                </span>
                                {!isEn && (
                                    <span className="text-[10px] text-gray-300 block font-light">
                                        {partner.nameKo}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
