
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Portfolio Data matched with official website
const portfolioItems = [
    {
        src: "/images/portfolio/cambodia-vattanac.jpg",
        title: "Cambodia Vattanac Industrial Park CCTV System Installation"
    },
    {
        src: "/images/portfolio/geothermal-yangpyeong.jpg",
        title: "Geothermal System Installation Yangpyeong-eup"
    },
    {
        src: "/images/portfolio/geothermal-rural.jpg",
        title: "Geothermal Heat Pump Installation Korea Rural Community Corporation"
    },
    {
        src: "/images/portfolio/changwon-geothermal.jpg",
        title: "Changwon-si Geothermal System Installtation"
    },
    {
        src: "/images/portfolio/instrumentation-control-water-2.jpg",
        title: "Instrumentation Control System Installation Korea Water Resource Corporation"
    },
    {
        src: "/images/portfolio/kangwon-cctv.jpg",
        title: "Kangwon Security CCTV System Installation"
    },
    {
        src: "/images/portfolio/korea-gas-solar.jpg",
        title: "Korea Gas Corporation Grid-Connected Solar Power Plant"
    },
    {
        src: "/images/portfolio/automatic-control-water.jpg",
        title: "Automatic Control System Installation Korea Water Resource Corporation"
    },
    {
        src: "/images/portfolio/instrumentation-control.jpg",
        title: "Instrumentation Control System Installation"
    },
    {
        src: "/images/portfolio/tongyeong-automatic.jpg",
        title: "Tongyeong-Si Automatic Control System Installation"
    }
];

export const PortfolioSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) { // xl
                setItemsPerPage(4);
            } else if (window.innerWidth >= 1024) { // lg
                setItemsPerPage(3);
            } else if (window.innerWidth >= 768) { // md
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalGroups = Math.ceil(portfolioItems.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalGroups);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
    };

    // Reset index on resize to avoid out of bounds
    useEffect(() => {
        setCurrentIndex(0);
    }, [itemsPerPage]);

    return (
        <section className="relative w-full py-20 bg-white dark:bg-black transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tight">
                        PORTFOLIO
                    </h2>
                    <div className="w-12 h-1 bg-black dark:bg-white mx-auto hidden md:block" />
                    <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 dark:text-gray-400">
                        Going forward, and benefiting society as well. <br className="hidden md:block" />
                        The philosophy of our company is to respect human dignity.
                    </p>
                </div>

                {/* Slider Container */}
                <div className="relative flex items-center">
                    {/* Prev Button */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:flex absolute -left-4 xl:-left-12 z-20 w-12 h-12 border border-[#F47920] hover:bg-[#F47920] text-[#F47920] hover:text-white items-center justify-center transition-all duration-300"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={32} strokeWidth={1} />
                    </button>

                    <div className="w-full overflow-hidden px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence mode="wait">
                                {portfolioItems.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((item, idx) => (
                                    <motion.div
                                        key={`${currentIndex}-${idx}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    >
                                        <PortfolioCard item={item} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="hidden md:flex absolute -right-4 xl:-right-12 z-20 w-12 h-12 border border-[#F47920] hover:bg-[#F47920] text-[#F47920] hover:text-white items-center justify-center transition-all duration-300"
                        aria-label="Next"
                    >
                        <ChevronRight size={32} strokeWidth={1} />
                    </button>

                    {/* Mobile Nav */}
                    <div className="flex md:hidden justify-center gap-4 mt-8 w-full">
                        <button onClick={prevSlide} className="p-2 border border-[#F47920] text-[#F47920]"><ChevronLeft /></button>
                        <button onClick={nextSlide} className="p-2 border border-[#F47920] text-[#F47920]"><ChevronRight /></button>
                    </div>
                </div>

                {/* More View Button */}
                <div className="mt-16 text-center">
                    <a
                        href="http://www.gentop.co.kr/eng/bbs/page_password.php?url=%2Feng%2Fbbs%2Fboard.php%3Fbo_table%3Dexample"
                        className="inline-block px-10 py-3 bg-[#F47920] text-white font-bold text-lg hover:bg-[#d66518] transition-colors shadow-lg"
                    >
                        More View
                    </a>
                </div>
            </div>
        </section>
    );
};

const PortfolioCard = ({ item }: { item: typeof portfolioItems[0] }) => {
    return (
        <a
            href="http://www.gentop.co.kr/eng/bbs/page_password.php?url=%2Feng%2Fbbs%2Fboard.php%3Fbo_table%3Dexample"
            className="group block bg-white dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
        >
            {/* Image Area */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-700">
                <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Area */}
            <div className="p-6 flex-grow flex items-start">
                <h3 className="text-base font-bold text-black dark:text-gray-100 leading-snug group-hover:text-[#F47920] transition-colors line-clamp-3">
                    {item.title}
                </h3>
            </div>
        </a>
    );
};
