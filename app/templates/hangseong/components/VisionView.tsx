'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Target, Trophy } from 'lucide-react'

export default function VisionView() {
    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                    >
                        Vision & Mission
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        First thoughts create new worlds. We challenge the standard to build a better future.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Lightbulb, title: 'Vision', desc: 'Global Leading Partner in Automotive Industry' },
                        { icon: Target, title: 'Mission', desc: 'Customer Satisfaction through Highest Quality' },
                        { icon: Trophy, title: 'Core Value', desc: 'Innovation, Integrity, Excellence' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg text-center aspect-[4/5] flex flex-col items-center justify-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black dark:text-white text-slate-900 mb-4">{item.title}</h3>
                            <p className="md:text-lg dark:text-slate-400 text-slate-600 leading-relaxed max-w-xs">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
