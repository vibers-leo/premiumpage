'use client'

import React, { Suspense } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

function VaisalaContent() {
    return (
        <div className="max-w-5xl mx-auto">
            {/* Standardized Header */}
            <div className="mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                >
                    VAISALA
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                >
                    Global leader in weather, environmental, and industrial measurements. Vaisala provides a comprehensive range of innovative observation and measurement products.
                </motion.p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-8 flex items-center justify-center"
                >
                    <div className="relative w-full h-full">
                        <Image
                            src="/hstech/HS TECH_files/af2c3e1c0d3d0.png" // The '5 Years' Warranty Image
                            alt="Vaisala Industrial Measurements"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Optional Overlay if needed, currently clean for logo visibility */}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-8 pl-4"
                >
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Precision that matters.</h2>
                        <p className="text-slate-600 leading-relaxed text-lg font-light">
                            Vaisala provides a comprehensive range of innovative observation and measurement products and services for chosen weather-related and industrial applications.
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6">
                        <ul className="space-y-3">
                            {['Humidity & Temperature', 'Dew Point', 'Moisture in Oil', 'Carbon Dioxide', 'Pressure'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link href="/templates/hs-tech?tab=vaisala">
                        <button className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
                            Explore Products <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default function VaisalaPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Vaisala...</div>}>
            <VaisalaContent />
        </Suspense>
    )
}
