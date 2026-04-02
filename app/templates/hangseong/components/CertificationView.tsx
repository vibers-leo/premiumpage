'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function CertificationView() {
    return (
        <div className="py-20 px-6 lg:px-12 bg-white dark:bg-slate-950 min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                {/* Standardized Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                    >
                        Quality Credentials
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        Hangseong Industrial's excellence is proven through top-tier global certifications and recognized manufacturing standards.
                    </motion.p>
                </div>

                {/* Certifications Grid - Original Image with Labels */}
                <div className="pb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-10 lg:p-16"
                    >
                        <div className="relative max-w-6xl mx-auto">
                            <img
                                src="/templates/hangseong/images/certifications_grid.png"
                                alt="Hangseong Industrial Certifications"
                                className="w-full h-auto dark:brightness-95 hover:brightness-100 transition-all duration-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
