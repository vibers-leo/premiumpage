'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Trophy, Target } from 'lucide-react'

export default function OverviewView() {
    return (
        <div className="w-full md:h-[calc(100vh-12rem)] md:flex md:flex-col md:justify-center px-6 md:px-12 lg:px-16">
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="mb-8 md:mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                    >
                        Overview
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        Leading the future of automotive motor components with precision technology and innovation.
                    </motion.p>
                </div>

                {/* Company Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start md:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold dark:text-white text-slate-900 leading-none">Company Profile</h2>
                                <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">Basic Information</p>
                            </div>
                        </div>

                        <div className="space-y-3 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            {[
                                { label: 'Company Name', value: 'HANG SEONG INDUSTRIAL CO., LTD.' },
                                { label: 'CEO', value: 'Park Myung-Gyu' },
                                { label: 'Established', value: 'June 1979' },
                                { label: 'Main Business', value: 'Automotive Motor Cases, Covers, Cores' },
                                { label: 'Address', value: '425, Gwahaksandan-ro, Gangseo-gu, Busan' },
                                { label: 'Certifications', value: 'IATF16949, ISO14001, INNO-BIZ' }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-dashed border-slate-200 dark:border-slate-700/50 pb-2 last:border-0 last:pb-0">
                                    <span className="text-sm font-semibold dark:text-slate-300 text-slate-700 shrink-0">{item.label}</span>
                                    <span className="text-sm dark:text-slate-400 text-slate-600 font-medium text-right mt-1 sm:mt-0">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold dark:text-white text-slate-900 leading-none">Our Vision</h2>
                                <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">Core Values & Mission</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 lg:p-8 space-y-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div>
                                <h3 className="text-xl lg:text-2xl font-black text-blue-600 dark:text-blue-400 mb-3 leading-snug">
                                    "First Thoughts Create New Worlds"
                                </h3>
                                <p className="text-sm lg:text-base dark:text-slate-300 text-slate-700 leading-relaxed">
                                    We strive to be a global leader in the automotive parts industry by continuously challenging the status quo.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { title: 'Innovation', desc: 'Continuous technological advancement' },
                                    { title: 'Quality', desc: 'Zero-defect manufacturing' },
                                    { title: 'Customer', desc: 'Customer satisfaction first' }
                                ].map((val, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                                            0{idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold dark:text-white text-slate-900">{val.title}</h4>
                                            <p className="text-xs dark:text-slate-400 text-slate-600">{val.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
