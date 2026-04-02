'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, GitGraph } from 'lucide-react'

export default function OrganizationView() {
    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                    >
                        Organization
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        Optimized structure for efficient decision making and quality management.
                    </motion.p>
                </div>

                {/* Organization Chart Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] overflow-hidden bg-white shadow-2xl px-4 pb-4 pt-16 md:px-8 md:pb-8 md:pt-32 flex justify-center"
                >
                    <div className="relative max-w-5xl w-full">
                        <img
                            src="/templates/hangseong/images/organization_chart.png"
                            alt="Organization Chart"
                            className="w-full h-auto rounded-xl transition-all duration-500"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
