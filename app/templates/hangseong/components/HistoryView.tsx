'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { HISTORY_DATA } from '../data'

export default function HistoryView() {
    // Group history data by decade
    const groupedHistory = HISTORY_DATA.reduce((acc, item) => {
        const decade = Math.floor(parseInt(item.year) / 10) * 10
        const decadeKey = `${decade}s`
        if (!acc[decadeKey]) {
            acc[decadeKey] = []
        }
        acc[decadeKey].push(item)
        return acc
    }, {} as Record<string, typeof HISTORY_DATA>)

    // Sort decades in descending order
    const sortedDecades = Object.keys(groupedHistory).sort((a, b) => {
        const yearA = parseInt(a)
        const yearB = parseInt(b)
        return yearB - yearA
    })

    const [expandedDecade, setExpandedDecade] = useState<string>(sortedDecades[0])

    return (
        <div className="min-h-screen py-4 px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                    >
                        Our History
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        Over {new Date().getFullYear() - 1979} years of excellence in automotive manufacturing
                    </motion.p>
                </div>

                {/* Decade Accordion */}
                <div className="space-y-3">
                    {sortedDecades.map((decade) => {
                        const isExpanded = expandedDecade === decade
                        const events = groupedHistory[decade]
                        const decadeStart = parseInt(decade)
                        const decadeEnd = decadeStart + 9

                        return (
                            <motion.div
                                key={decade}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg"
                            >
                                {/* Decade Header (Clickable) */}
                                <button
                                    onClick={() => setExpandedDecade(isExpanded ? '' : decade)}
                                    className="w-full px-6 md:px-8 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 flex items-center justify-center text-white font-black text-lg md:text-xl">
                                            {decadeStart.toString().slice(2)}
                                        </div>
                                        <div className="text-left">
                                            <h2 className="text-2xl md:text-3xl font-black dark:text-white text-slate-900">
                                                {decadeStart} - {decadeEnd}
                                            </h2>
                                            <p className="text-sm md:text-base dark:text-slate-400 text-slate-600">
                                                {events.length} milestone{events.length > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronRight className="w-6 h-6 dark:text-slate-400 text-slate-600" />
                                    </motion.div>
                                </button>

                                {/* Decade Content (Expandable) */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 md:px-8 pb-4 pt-2 space-y-3">
                                                {events.map((item, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="flex gap-4 group"
                                                    >
                                                        {/* Year Badge */}
                                                        <div className="flex-shrink-0">
                                                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg px-3 py-2 min-w-[80px] text-center">
                                                                <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                                                                    {item.year}
                                                                </div>
                                                                <div className="text-xs font-semibold text-blue-500 dark:text-blue-300">
                                                                    {item.month}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Event Content */}
                                                        <div className="flex-1 bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 group-hover:bg-slate-100 dark:group-hover:bg-slate-700/50 transition-colors">
                                                            <p className="text-sm md:text-base dark:text-slate-300 text-slate-700 leading-relaxed">
                                                                {item.event}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Footer Stats */}
                <div className="mt-6 text-center">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-4 md:p-6 text-white shadow-xl">
                        <p className="text-2xl md:text-3xl font-black mb-1">
                            {new Date().getFullYear() - 1979}+ Years
                        </p>
                        <p className="text-sm md:text-base">
                            of Innovation and Excellence
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
