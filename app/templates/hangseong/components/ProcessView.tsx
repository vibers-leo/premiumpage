'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Factory } from 'lucide-react'

export default function ProcessView() {
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
                        Manufacturing Process
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        Our optimized production system ensures high performance and zero-defect quality through rigorous multi-stage processing and automated testing.
                    </motion.p>
                </div>

                <div className="space-y-32">
                    {/* 1. Process Chart 01 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 lg:p-16 rounded-[4rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center"
                    >
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-black dark:text-white text-slate-900 tracking-tight">Manufacturing Process Chart</h2>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em] mt-1">Core component processing workflow</p>
                        </div>
                        <div className="relative max-w-6xl w-full bg-white rounded-3xl p-6 lg:p-10 shadow-inner">
                            <img
                                src="/templates/hangseong/images/process_chart_1.png"
                                alt="Manufacturing Process Chart"
                                className="w-full h-auto transition-all duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* 2. Process Chart 02 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 lg:p-16 rounded-[4rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center"
                    >
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-black dark:text-white text-slate-900 tracking-tight">Assembly Process Flow</h2>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em] mt-1">Final assembly & precise inspection stages</p>
                        </div>
                        <div className="relative max-w-6xl w-full bg-white rounded-3xl p-6 lg:p-10 shadow-inner overflow-hidden">
                            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
                            <img
                                src="/templates/hangseong/images/process_chart_2.png"
                                alt="Assembly Process Flow"
                                className="w-full h-auto relative z-10 transition-all duration-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
