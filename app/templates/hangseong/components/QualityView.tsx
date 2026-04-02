'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Award, Factory, Settings, ArrowRight, Cpu, Layers, Users, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function QualityView() {
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
                        Quality Management
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        Realizing the best quality with the best technology and optimal cost to achieve customer satisfaction.
                    </motion.p>
                </div>

                {/* Quality Management Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative rounded-[3rem] overflow-hidden bg-white shadow-2xl p-8 md:p-20 flex justify-center"
                >
                    <img
                        src="/templates/hangseong/images/quality_management.png"
                        alt="Quality Management System"
                        className="w-full h-auto rounded-xl transition-all duration-500"
                    />
                </motion.div>
            </div>
        </div>
    )
}
