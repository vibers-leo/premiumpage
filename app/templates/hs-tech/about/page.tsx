'use client'

import React, { Suspense } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const SECTORS = [
    { title: 'HIGH TECH FACTORY', img: '/downloads/hs-tech/images/dce9649f81d7a.png' }, // Placeholder mappings
    { title: 'BATTERY', img: '/downloads/hs-tech/images/33a1535c2c0e7.png' },
    { title: 'POWER PLANT', img: '/downloads/hs-tech/images/0b98ec3d71c52.png' },
    { title: 'WATER / AIR ANALYSIS', img: '/downloads/hs-tech/images/dce9649f81d7a.png' },
    { title: 'DATA CENTER', img: '/downloads/hs-tech/images/33a1535c2c0e7.png' },
    { title: 'FUEL CELL', img: '/downloads/hs-tech/images/0b98ec3d71c52.png' },
    { title: 'PHARMACEUTICAL', img: '/downloads/hs-tech/images/dce9649f81d7a.png' },
    { title: 'MACHINERY', img: '/downloads/hs-tech/images/33a1535c2c0e7.png' },
]

function AboutContent() {
    return (
        <div className="w-full pb-20">
            {/* Standardized Header */}
            <div className="pt-20 pb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight uppercase"
                >
                    ABOUT US
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                >
                    A leading manufacturer and distributor of high-precision industrial sensors since 2005.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 space-y-20">
                {/* 2. CEO Message / Intro Text */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Decorative / Label */}
                    <div className="lg:col-span-3 hidden lg:block">
                        <div className="w-12 h-1 bg-teal-500 mb-6"></div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">CEO Message</h2>
                        <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                            Smart Sensing<br />Technology
                        </span>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:col-span-9 space-y-8">
                        <div className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span className="text-teal-600 font-bold">HS TECH Co., Ltd.</span> is a specialized environmental sensor company <br className="hidden md:block" />
                            providing sales, technical support, calibration, installation and after-sales service for temperature, humidity, pressure, and air &amp; water quality measurement instruments.
                        </div>

                        <div className="text-base text-slate-600 dark:text-slate-400 leading-8 tracking-wide space-y-6">
                            <p>
                                HS TECH is committed to becoming a leading sensor-based specialist that plays a pivotal role in shaping a progressive future.
                            </p>
                            <p>
                                With the sincere feedback and encouragement of our valued customers, we promise to be an <span className="text-slate-900 dark:text-white font-bold">HS TECH</span> that delivers excellence and inspires trust.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                            <div className="text-right">
                                <p className="text-sm text-slate-400 mb-1">The HS TECH Team</p>
                                <div className="text-xl font-black text-slate-900 dark:text-white font-serif italic">
                                    HS TECH Corp.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Business Areas Grid */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                            Business Areas
                        </h2>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {SECTORS.map((sector, index) => (
                            <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                                {/* Image Layer */}
                                <Image
                                    src={sector.img}
                                    alt={sector.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 group-hover:to-teal-900/80 transition-colors duration-300"></div>

                                {/* Text Label */}
                                <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider text-center border-t border-white/20 pt-3">
                                        {sector.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default function AboutPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading About...</div>}>
            <AboutContent />
        </Suspense>
    )
}
