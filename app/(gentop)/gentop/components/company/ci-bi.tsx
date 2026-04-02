
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CI_IMAGES = {
    symbol: "/images/company/ci_bi/ci_gentop01.jpg",
    signature: "/images/company/ci_bi/ci_gentop02.jpg",
    grid: "/images/company/ci_bi/ci_gentop03.jpg",
    colors: [
        { img: "/images/company/ci_bi/ci01.jpg", name: "MAIN COLOR", code: "PANTONE 144C", sub: "C:0 M:50 Y:100 K:0 / F7941E" },
        { img: "/images/company/ci_bi/ci02.jpg", name: "", code: "PANTONE WARM GRAY", sub: "C:0 M:5 Y:10 K:70 / 6D6863" },
        { img: "/images/company/ci_bi/ci03.jpg", name: "SUB COLOR", code: "PANTONE BLACK 6C", sub: "C:0 M:0 Y:0 K:100 / 231F20" },
        { img: "/images/company/ci_bi/ci04.jpg", name: "", code: "PANTONE 877C", sub: "C:46 M:38 Y:36 K:4 / 8E8E91" },
        { img: "/images/company/ci_bi/ci05.jpg", name: "", code: "PANTONE 875C", sub: "C:0 M:35 Y:80 K:30 / BA8437" },
    ]
};

export const CompanyCiBi = () => {
    const [activeTab, setActiveTab] = useState<"CI" | "BI">("CI");

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 min-h-[50vh]">

            {/* Tabs */}
            <div className="flex justify-center mb-12 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab("CI")}
                    className={`px-12 py-3 text-lg font-bold border-b-2 transition-colors ${activeTab === "CI"
                        ? "border-[#F47920] text-[#F47920]"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                >
                    CI
                </button>
                <button
                    onClick={() => setActiveTab("BI")}
                    className={`px-12 py-3 text-lg font-bold border-b-2 transition-colors ${activeTab === "BI"
                        ? "border-[#F47920] text-[#F47920]"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                >
                    BI
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "CI" ? (
                    <motion.div
                        key="CI"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-12"
                    >
                        {/* Logos */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                            {/* Symbol */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-full aspect-[2/1] ">
                                    <Image src={CI_IMAGES.symbol} alt="Symbol" fill className="object-contain" />
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-500">Symbol Mark</span>
                            </div>
                            {/* Signature */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-full aspect-[2/1] ">
                                    <Image src={CI_IMAGES.signature} alt="Signature" fill className="object-contain" />
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-500">Signature</span>
                            </div>
                            {/* Grid */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-full aspect-[2/1] ">
                                    <Image src={CI_IMAGES.grid} alt="Grid System" fill className="object-contain" />
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-500">Grid System</span>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="text-center max-w-4xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <p>
                                By visualizing the English initial of GENTOP, ‘G’ into a symbol mark shaped like a shield, the company ‘Gentop’,
                                which provides a more powerful security solution, was expressed in an intuitive way.
                                With smart and innovative technical skills differentiated from the existing security system, this means that Gentop
                                provides a safer place, and it is designed so that consumers can easily and quickly recognize this aspect.
                            </p>
                            <p className="mt-4">
                                The color orange signifies innovative thinking and adventurous mind; the color wall-gray signifies the value of effort and
                                sweat of ‘Gentop’, which grows and advances towards a bigger stage called a global market based on the trust of the customers.
                            </p>
                        </div>

                        {/* Colors */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {CI_IMAGES.colors.map((color, idx) => (
                                <div key={idx} className="flex flex-col">
                                    {color.name && <span className="text-xs font-bold mb-1 uppercase text-gray-400 h-4 block">{color.name}</span>}
                                    {!color.name && <span className="h-4 block md:h-5"></span>}
                                    <div className="relative w-full aspect-square mb-2">
                                        <Image src={color.img} alt={color.code} fill className="object-cover" />
                                    </div>
                                    <div className="text-xs text-center">
                                        <p className="font-bold text-gray-800 dark:text-gray-200">{color.code}</p>
                                        <p className="text-gray-500 scale-90 origin-top">{color.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="BI"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-16"
                    >
                        {/* Description Text */}
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center leading-relaxed text-sm md:text-base text-gray-600 dark:text-gray-400 font-light space-y-2">
                                <p>Our symbol mark is combination of a lion, the king of beasts, and a hawk with sharp and</p>
                                <p>exact eyes and visualization of 'LISCON' as a leader of the industry and as a smart system with advanced technology.</p>
                                <p>This mark expresses a correct and reliable system using the deep blue color.</p>
                                <p>The mark also describes an honest and strong automatic control system brand using the dark gray color</p>
                                <p>and a Gothic type word mark stressing round.</p>
                            </div>
                        </div>

                        {/* Logos */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end pt-8">
                            {/* Symbol */}
                            <div className="flex flex-col items-center group">
                                <div className="relative w-full aspect-square md:aspect-[4/3]  rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
                                    <Image
                                        src="/images/company/ci_bi/bi_logo01.jpg"
                                        alt="LISCON Symbol"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Symbol</span>
                            </div>
                            {/* Signature */}
                            <div className="flex flex-col items-center group">
                                <div className="relative w-full aspect-square md:aspect-[4/3]  rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
                                    <Image
                                        src="/images/company/ci_bi/bi_logo02.jpg"
                                        alt="LISCON Signature"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Signature</span>
                            </div>
                            {/* Grid */}
                            <div className="flex flex-col items-center group">
                                <div className="relative w-full aspect-square md:aspect-[4/3]  rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
                                    <Image
                                        src="/images/company/ci_bi/bi_logo03.jpg"
                                        alt="LISCON Grid System"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Grid System</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
