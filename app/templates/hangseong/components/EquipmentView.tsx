'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ruler, Cpu, ShieldCheck, Factory, Zap, Box, Settings, ListChecks } from 'lucide-react'
import { cn } from '@/lib/utils'

const MANUFACTURING_TABLE = [
    { id: '1', name: 'MECHANICAL PRESS', spec: '500TON', qty: '1', maker: 'Standard' },
    { id: '2', name: 'MECHANICAL PRESS', spec: '250TON', qty: '2', maker: 'Standard' },
    { id: '3', name: 'MECHANICAL PRESS', spec: '200TON', qty: '4', maker: 'Standard' },
    { id: '4', name: 'MECHANICAL PRESS', spec: '160TON', qty: '2', maker: 'Standard' },
    { id: '5', name: 'MECHANICAL PRESS', spec: '110TON', qty: '2', maker: 'Standard' },
    { id: '6', name: 'MECHANICAL PRESS', spec: '80TON', qty: '1', maker: 'Standard' },
    { id: '7', name: 'POWER PRESS', spec: '60TON', qty: '2', maker: 'Standard' },
    { id: '8', name: 'POWER PRESS', spec: '45TON', qty: '1', maker: 'Standard' },
    { id: '9', name: 'Hydraulic PRESS', spec: '5TON', qty: '13', maker: 'Standard' },
    { id: '10', name: 'MUlTI FORMER', spec: 'ø50 ~ ø100', qty: '3', maker: 'Standard' },
    { id: '11', name: 'NC Feeder', spec: '650mm', qty: '3', maker: 'Standard' },
    { id: '12', name: 'NC Feeder', spec: '550mm', qty: '1', maker: 'Standard' },
    { id: '13', name: 'NC Feeder', spec: '450mm', qty: '2', maker: 'Standard' },
    { id: '14', name: 'AIR Feeder', spec: '150mm', qty: '1', maker: 'Standard' },
    { id: '15', name: 'LEVELER', spec: '650mm', qty: '2', maker: 'Standard' },
    { id: '16', name: 'LEVELER', spec: '450mm', qty: '2', maker: 'Standard' },
    { id: '17', name: 'LEVELER', spec: '200mm', qty: '1', maker: 'Standard' },
    { id: '18', name: 'Quick Shelf', spec: '2,121mm', qty: '1', maker: 'Standard' },
    { id: '19', name: 'Milling', spec: '909mm', qty: '1', maker: 'Standard' },
    { id: '20', name: 'CONDER M/C', spec: '-', qty: '1', maker: 'Standard' },
    { id: '21', name: 'Radial M/C', spec: '-', qty: '1', maker: 'Standard' },
    { id: '22', name: 'Table Drill M/C', spec: '-', qty: '1', maker: 'Standard' },
    { id: '23', name: 'Molded Polishing M/C', spec: '-', qty: '1', maker: 'Standard' },
    { id: '24', name: 'Spot Welder M/C', spec: '100K', qty: '1', maker: 'Standard' },
    { id: '25', name: 'Spot Welder M/C', spec: '150K', qty: '1', maker: 'Standard' },
    { id: '26', name: 'Caulking M/C', spec: 'YASKAWA Nx100', qty: '2', maker: 'YASKAWA' },
    { id: '27', name: 'Caulking M/C', spec: '-', qty: '1', maker: 'Standard' },
    { id: '28', name: 'ROBOT Welding M/C', spec: '-', qty: '3', maker: 'Standard' }
]

const TESTING_TABLE_DATA = [
    {
        id: '1',
        name: '3-D Coordinate Measuring Machine',
        model: 'Duckin HERO785S',
        spec: 'Area: 500*500*400mm | Res: 0.1μm | Tol: 1.9+L/300μm',
        qty: '1'
    },
    {
        id: '2',
        name: 'Universal Testing Machine',
        model: 'TM-UMS010T',
        spec: 'Area: 5~5000KN | Res: 1/20,000mm | Tol: within ±0.3%',
        qty: '1'
    }
]

export default function EquipmentView() {
    return (
        <div className="py-20 px-6 lg:px-12 bg-white dark:bg-slate-950">
            <div className="max-w-[1400px] mx-auto">
                {/* Standardized Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                    >
                        Equipment Status
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        State-of-the-art manufacturing facilities and precision testing equipment ensuring world-class production quality.
                    </motion.p>
                </div>

                {/* 2. Manufacturing Table Section */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-600">
                            <Settings className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black dark:text-white text-slate-900 tracking-tight">Manufacturing Facilities</h2>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-5 md:grid-cols-6 bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/5 px-8 py-6">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-1">ID</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-2">Equipment Name</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-1 hidden md:block">Specification</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-1 text-center">Qty</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-1 text-right">Manufacturer</div>
                        </div>

                        {/* Table Body */}
                        <div>
                            {MANUFACTURING_TABLE.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="grid grid-cols-5 md:grid-cols-6 px-8 py-6 border-b border-slate-100 dark:border-white/[0.02] hover:bg-blue-500/[0.02] transition-colors group"
                                >
                                    <div className="font-mono text-xs text-slate-400 col-span-1">{item.id}</div>
                                    <div className="text-sm font-black dark:text-white text-slate-900 col-span-2 flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.name}
                                    </div>
                                    <div className="text-xs font-bold text-slate-500 col-span-1 hidden md:block uppercase tracking-tight">{item.spec}</div>
                                    <div className="text-sm font-black text-blue-600 dark:text-blue-400 col-span-1 text-center font-mono">{item.qty}</div>
                                    <div className="text-xs font-black text-slate-400 col-span-1 text-right uppercase">{item.maker}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Testing Section - Structured Table */}
                <div className="pb-24">
                    <div className="flex items-center gap-4 mb-16 border-l-8 border-indigo-600 pl-8">
                        <div>
                            <h2 className="text-4xl font-black dark:text-white text-slate-900 tracking-tight">Precision QA</h2>
                            <p className="text-indigo-500 font-bold uppercase tracking-wider text-sm mt-1">Inspection & Verification Units</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 md:grid-cols-12 bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/5 px-8 py-6">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-1">#</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-3">Equipment Name</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-2">Model</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-5">Standard / Precision</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-1 text-center">Qty</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-slate-100 dark:divide-white/[0.02]">
                            {TESTING_TABLE_DATA.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-4 md:grid-cols-12 px-8 py-8 items-center hover:bg-indigo-500/[0.02] transition-colors group"
                                >
                                    <div className="font-mono text-xs text-slate-400 col-span-1">{item.id}</div>
                                    <div className="text-sm font-black dark:text-white text-slate-900 col-span-3">
                                        {item.name}
                                    </div>
                                    <div className="text-xs font-bold text-indigo-500 col-span-2">
                                        {item.model}
                                    </div>
                                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 col-span-5 leading-relaxed">
                                        {item.spec}
                                    </div>
                                    <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 col-span-1 text-center font-mono">
                                        {item.qty}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
