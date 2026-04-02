'use client'

import React, { Suspense } from 'react'
import { Settings, Headphones, Gauge, GraduationCap, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'

const SERVICES = [
    {
        title: "Product Customization",
        desc: "Customized products that can be used in specialized environments. We tailor sensor configurations and housings to match your exact process requirements.",
        icon: Settings,
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "Technical Support",
        desc: "Expert technical consultations for correct operation, installation and maintenance of all measurement instruments.",
        icon: Headphones,
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "Calibration & Repair",
        desc: "Traceable calibration services and professional repair with genuine parts, ensuring measurement accuracy and instrument longevity.",
        icon: Gauge,
        color: "from-teal-500 to-cyan-600"
    },
    {
        title: "Customer Training",
        desc: "Comprehensive training programs designed for customers who need specialized knowledge in sensor operation and data analysis.",
        icon: GraduationCap,
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "Spare Parts",
        desc: "Genuine original spare parts and accessories for all products we supply. Fast delivery and guaranteed compatibility.",
        icon: Wrench,
        color: "from-slate-500 to-slate-700"
    }
]

function SupportContent() {
    return (
        <div className="w-full pb-20">
            {/* Header */}
            <div className="pt-20 pb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight uppercase"
                >
                    Support & Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                >
                    Comprehensive after-sales service and technical support for all our measurement solutions.
                </motion.p>
            </div>

            {/* Services Grid */}
            <div className="w-full px-4 md:px-8 py-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {SERVICES.map((s, idx) => {
                            const Icon = s.icon
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="group relative rounded-2xl overflow-hidden flex flex-col h-[380px] md:h-[420px] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10 bg-neutral-900"
                                >
                                    {/* Icon Area */}
                                    <div className={`p-8 flex flex-col items-center justify-center h-[180px] bg-gradient-to-br ${s.color}`}>
                                        <Icon className="w-14 h-14 text-white mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                        <h3 className="text-white text-lg font-bold leading-tight text-center">
                                            {s.title}
                                        </h3>
                                    </div>

                                    {/* Description Area */}
                                    <div className="flex-1 p-6 flex items-start">
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {s.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SupportPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Support...</div>}>
            <SupportContent />
        </Suspense>
    )
}
