'use client'

import React, { Suspense } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

function SetraContent() {
    return (
        <div className="max-w-5xl mx-auto">
            {/* Standardized Header */}
            <div className="mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                >
                    SETRA SYSTEMS
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                >
                    Sensing Solutions for a Changing World. Setra Systems designs and manufactures a broad line of premium sensing devices.
                </motion.p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <Image
                        src="/hstech/HS-TECH_files/b2209059580dc.jpg"
                        alt="Setra Tech"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <span className="text-white font-bold text-lg">Pressure Measurement</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Setra Systems</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Setra Systems, Inc. was founded in 1967 and designs and manufactures a broad line of sensing devices, including humidity, current, vacuum, and pressure sensors.
                        </p>
                    </div>

                    <ul className="space-y-4">
                        {['Differential Pressure', 'Room Pressure Monitor', 'Power Meter', 'Vacuum Sensing'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <Link href="/templates/hs-tech?tab=setra&category=setra">
                        <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all mt-4">
                            View Products <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default function SetraPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Setra...</div>}>
            <SetraContent />
        </Suspense>
    )
}
