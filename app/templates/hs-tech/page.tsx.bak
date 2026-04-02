'use client'

import React, { Suspense, useState, useEffect, useMemo } from 'react'
import {
    ChevronRight, ChevronLeft, Phone, Mail, MapPin, Globe,
    X, ExternalLink, Cpu, Factory, Car, Ship,
    Leaf, Zap, Building2, FlaskConical
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { DB, CATEGORY_INFO, BRANDS, VAISALA_APPLICATIONS, SETRA_APPLICATIONS_SENSOR, SETRA_APPLICATIONS_SOLUTION, JUMO_CATEGORY_INTRO } from './data'
import { cn } from '@/lib/utils'
import CoverView from './components/CoverView'

// ─── Helper ──────────────────────────────────────────────────────────────────
const findProduct = (id: string): any => {
    for (const cat in DB) {
        const found = (DB[cat] as any[]).find((p: any) => p.id === id)
        if (found) return found
    }
    return null
}

// ─── 24-Page Brochure Flow ───────────────────────────────────────────────────
const BROCHURE_FLOW = [
    { tab: 'cover',         label: 'HOME' },
    { tab: 'about',         label: 'ABOUT US' },
    { tab: 'business',      label: 'BUSINESS' },
    { tab: 'products',      label: 'BRANDS' },
    // VAISALA
    { tab: 'vaisala',       label: 'VAISALA' },
    { tab: 'humidity',      label: 'HUMIDITY' },
    { tab: 'dewpoint',      label: 'DEWPOINT' },
    { tab: 'co2',           label: 'CO₂' },
    { tab: 'oil',           label: 'OIL MOISTURE' },
    { tab: 'barometer',     label: 'BAROMETER' },
    { tab: 'weather',       label: 'WEATHER' },
    { tab: 'h2o2',          label: 'H₂O₂' },
    { tab: 'cms',           label: 'DATA LOGGER' },
    { tab: 'cms_standalone', label: 'STANDALONE' },
    { tab: 'cms_network',    label: 'NETWORK / SW' },
    // SETRA
    { tab: 'setra',         label: 'SETRA' },
    { tab: 'setra_visual',  label: 'DP VISUAL' },
    { tab: 'setra_sensor',  label: 'DP SENSOR' },
    { tab: 'setra_ind',     label: 'IND. PRESSURE' },
    // JUMO
    { tab: 'jumo',          label: 'JUMO' },
    { tab: 'jumo_temp',     label: 'TEMPERATURE' },
    { tab: 'jumo_liquid',   label: 'LIQUID ANALYSIS' },
    { tab: 'jumo_control',  label: 'CTRL & REC' },
    // Contact
    { tab: 'contact',       label: 'CONTACT' },
]

const ALL_TABS = BROCHURE_FLOW.map(p => p.tab)

// ─── Product Modal ───────────────────────────────────────────────────────────
function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    // Parse description to extract PRODUCT section
    const descParts = product.desc?.split('■ PRODUCT') || ['', '']
    const mainDesc = descParts[0]?.trim() || ''
    const productSection = descParts[1]?.trim() || ''

    // Extract model list from PRODUCT section
    const modelLines = productSection.split('\n').filter((line: string) => line.includes('▶'))
    const models = modelLines.map((line: string) => {
        const match = line.match(/▶\s*(\w+)\s*:\s*(.+)/)
        if (match) {
            return {
                name: match[1].trim(),
                desc: match[2].trim(),
                image: `/templates/hs-tech/images/products/${match[1].trim()}_v1.png`
            }
        }
        return null
    }).filter(Boolean)

    // Check if product uses new 6-column spec structure
    const hasNewSpecStructure = product.specs?.[0]?.model !== undefined

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl w-full md:w-[85vw] max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-6 md:px-10 py-5 border-b border-neutral-100 shrink-0">
                    <div>
                        <p className="text-[10px] text-cyan-600 font-black uppercase tracking-[0.3em] mb-1">{product.subtitle}</p>
                        <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">{product.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors ml-6 shrink-0 mt-1">
                        <X className="w-6 h-6 text-neutral-400" />
                    </button>
                </div>

                {/* Body — imweb 스타일 레이아웃 */}
                <div className="px-6 md:px-10 py-8">

                    {/* Main Image */}
                    {product.image && (
                        <div className="bg-neutral-50 rounded-2xl p-6 md:p-10 flex items-center justify-center mb-8 border border-neutral-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt={product.title} className="max-h-72 md:max-h-96 w-full object-contain" />
                        </div>
                    )}

                    {/* Description */}
                    {mainDesc && (
                        <div className="mb-8">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed whitespace-pre-line">{mainDesc}</p>
                        </div>
                    )}

                    {/* PRODUCT Section - Only for HMT330 */}
                    {hasNewSpecStructure && product.id === 'hmt330' && (
                        <div className="mb-10">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-neutral-900 inline-block"></span>
                                PRODUCT
                            </h3>

                            {/* 6-Model Grid Image */}
                            <div className="w-full rounded-xl overflow-hidden border border-neutral-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/templates/hs-tech/images/hmt330_6models_grid.jpg"
                                    alt="HMT330 Series - 6 Models"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    )}

                    {/* Technical Data Table */}
                    {product.specs?.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-neutral-900 inline-block"></span>
                                Technical Data
                            </h3>
                            <div className="border-2 border-neutral-900 rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    {hasNewSpecStructure ? (
                                        // New 6-column structure for imweb layout
                                        <table className="w-full text-xs md:text-sm">
                                            <thead>
                                                <tr className="bg-neutral-100 border-b-2 border-neutral-900">
                                                    <th className="py-3 px-3 md:px-4 text-center font-black text-neutral-900 uppercase tracking-wide border-r border-neutral-300">CATEGORY</th>
                                                    <th className="py-3 px-3 md:px-4 text-center font-black text-neutral-900 uppercase tracking-wide border-r border-neutral-300">MODEL</th>
                                                    <th className="py-3 px-3 md:px-4 text-center font-black text-neutral-900 uppercase tracking-wide border-r border-neutral-300">APPLICATION</th>
                                                    <th className="py-3 px-3 md:px-4 text-center font-black text-neutral-900 uppercase tracking-wide border-r border-neutral-300">TYPICAL APPLICATION</th>
                                                    <th className="py-3 px-3 md:px-4 text-center font-black text-neutral-900 uppercase tracking-wide border-r border-neutral-300">MEASUREMENT RANGE</th>
                                                    <th className="py-3 px-3 md:px-4 text-center font-black text-neutral-900 uppercase tracking-wide">SPEC</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.specs.map((spec: any, i: number) => (
                                                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} border-b border-neutral-200`}>
                                                        {i === 0 && (
                                                            <td rowSpan={product.specs.length} className="py-3 px-3 md:px-4 font-black text-neutral-900 border-r border-neutral-300 align-middle text-center text-lg">
                                                                {product.title.split(' ')[0]}
                                                            </td>
                                                        )}
                                                        <td className="py-3 px-3 md:px-4 font-bold text-cyan-700 border-r border-neutral-200 align-top text-center whitespace-nowrap">{spec.model}</td>
                                                        <td className="py-3 px-3 md:px-4 text-neutral-700 border-r border-neutral-200 align-top text-center">{spec.application}</td>
                                                        <td className="py-3 px-3 md:px-4 text-neutral-700 border-r border-neutral-200 align-top">
                                                            <div className="whitespace-pre-line leading-relaxed text-sm">{spec.typicalApplication}</div>
                                                        </td>
                                                        <td className="py-3 px-3 md:px-4 text-neutral-700 border-r border-neutral-200 align-top">
                                                            <div className="whitespace-pre-line leading-relaxed text-sm">{spec.measurementRange}</div>
                                                        </td>
                                                        {i === 0 && (
                                                            <td rowSpan={product.specs.length} className="py-3 px-3 md:px-4 text-neutral-700 align-top">
                                                                <div className="whitespace-pre-line leading-relaxed text-sm">
                                                                    {product.specs.map((s: any, idx: number) => (
                                                                        s.spec && s.spec !== '-' ? (
                                                                            <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
                                                                                {s.spec}
                                                                            </div>
                                                                        ) : null
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        // Old 3-column structure for backward compatibility
                                        <table className="w-full text-xs md:text-sm">
                                            <thead>
                                                <tr className="bg-neutral-100 border-b-2 border-neutral-900">
                                                    <th className="py-3 px-3 md:px-4 text-left font-black text-neutral-900 uppercase tracking-wide border-r border-neutral-300">MODEL</th>
                                                    <th className="py-3 px-3 md:px-4 text-left font-black text-neutral-900 uppercase tracking-wide border-r border-neutral-300">APPLICATION</th>
                                                    <th className="py-3 px-3 md:px-4 text-left font-black text-neutral-900 uppercase tracking-wide">MEASUREMENT RANGE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.specs.map((spec: any, i: number) => (
                                                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} border-b border-neutral-200`}>
                                                        <td className="py-3 px-3 md:px-4 font-bold text-cyan-700 border-r border-neutral-200 align-top whitespace-nowrap">{spec.label}</td>
                                                        <td className="py-3 px-3 md:px-4 text-neutral-700 border-r border-neutral-200 align-top">
                                                            <div className="whitespace-pre-line leading-relaxed">
                                                                {spec.value?.split('Measurement Range:')[0]?.replace('Application:', '').trim()}
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-3 md:px-4 text-neutral-700 align-top">
                                                            <div className="whitespace-pre-line leading-relaxed">
                                                                {spec.value?.split('Measurement Range:')[1]?.trim() || '-'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gallery */}
                    {product.gallery?.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {product.gallery.map((img: string, i: number) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img key={i} src={img} alt="" className="h-20 w-20 object-contain rounded-xl border border-neutral-200 bg-neutral-50 p-2 shrink-0 hover:border-cyan-400 transition-colors cursor-pointer" />
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

// ─── Application Detail Modal ─────────────────────────────────────────────────
function ApplicationDetailModal({ appKey, onClose }: { appKey: string; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const appData = VAISALA_APPLICATIONS[appKey]
    if (!appData) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl w-full md:w-[90vw] max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-6 md:px-10 py-5 border-b border-neutral-100 shrink-0 bg-gradient-to-r from-cyan-50 to-white">
                    <div>
                        <p className="text-[10px] text-cyan-600 font-black uppercase tracking-[0.3em] mb-1">VAISALA Applications & Solutions</p>
                        <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight">{appData.title}</h2>
                        <p className="text-sm text-neutral-500 mt-2">{appData.shortDesc}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-lg transition-colors ml-6 shrink-0 mt-1">
                        <X className="w-6 h-6 text-neutral-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 md:px-10 py-8">

                    {/* Applications List */}
                    {appData.applications && appData.applications.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-600 inline-block"></span>
                                Application
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {appData.applications.map((app: any, i: number) => (
                                    <div key={i} className="p-4 border border-cyan-100 rounded-lg bg-cyan-50/50">
                                        <p className="text-sm font-bold text-neutral-900">{i + 1}. {app.title}</p>
                                        {app.items && app.items.length > 0 && (
                                            <ul className="mt-2 space-y-1">
                                                {app.items.map((item: string, j: number) => (
                                                    <li key={j} className="text-xs text-neutral-600">• {item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    {appData.content && (
                        <div className="mb-8">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                                {appData.content}
                            </p>
                        </div>
                    )}

                    {/* Systems */}
                    {appData.systems && appData.systems.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-600 inline-block"></span>
                                SYSTEM
                            </h3>
                            <div className="space-y-8">
                                {appData.systems.map((system: any, i: number) => (
                                    <div key={i} className="border-l-4 border-cyan-500 pl-6">
                                        <h4 className="text-base md:text-lg font-black text-neutral-900 mb-3">{system.title}</h4>
                                        <p className="text-sm text-neutral-700 leading-relaxed mb-4 whitespace-pre-line">{system.desc}</p>

                                        {/* Features */}
                                        {system.features && system.features.length > 0 && (
                                            <div className="mb-4">
                                                <ul className="space-y-2">
                                                    {system.features.map((feature: string, j: number) => (
                                                        <li key={j} className="text-sm text-neutral-600 flex items-start gap-2">
                                                            <span className="text-cyan-600 mt-1">■</span>
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Recommended Products */}
                                        {system.recommendedProducts && system.recommendedProducts.length > 0 && (
                                            <div className="mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                                                <p className="text-xs font-black text-cyan-600 uppercase tracking-wider mb-3">Recommended Products</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {system.recommendedProducts.map((productId: string, j: number) => {
                                                        const product = findProduct(productId)
                                                        return product ? (
                                                            <span key={j} className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs font-bold text-neutral-700 hover:border-cyan-400 hover:text-cyan-600 transition-colors cursor-pointer">
                                                                {product.title}
                                                            </span>
                                                        ) : null
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recommended Products (top-level) */}
                    {appData.recommendedProducts && appData.recommendedProducts.length > 0 && (
                        <div className="mt-6 p-6 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl border border-cyan-100">
                            <p className="text-sm font-black text-cyan-700 uppercase tracking-wider mb-4">Recommended Products</p>
                            <div className="flex flex-wrap gap-3">
                                {appData.recommendedProducts.map((productId: string, i: number) => {
                                    const product = findProduct(productId)
                                    return product ? (
                                        <span key={i} className="px-4 py-2 bg-white border-2 border-cyan-200 rounded-lg text-sm font-bold text-neutral-800 hover:border-cyan-400 hover:text-cyan-600 transition-colors cursor-pointer shadow-sm">
                                            {product.title}
                                        </span>
                                    ) : null
                                })}
                            </div>
                        </div>
                    )}

                    {/* External Link */}
                    {appData.externalLink && (
                        <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                            <a href={appData.externalLink} target="_blank" rel="noopener noreferrer"
                                className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                <span>View official Vaisala documentation →</span>
                            </a>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

// ─── SETRA Application Detail Modal ───────────────────────────────────────────
function SetraApplicationDetailModal({ appKey, onClose }: { appKey: string; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const appData = SETRA_APPLICATIONS_SENSOR[appKey]
    if (!appData) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl w-full md:w-[90vw] max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-6 md:px-10 py-5 border-b border-neutral-100 shrink-0 bg-gradient-to-r from-sky-50 to-white">
                    <div>
                        <p className="text-[10px] text-sky-600 font-black uppercase tracking-[0.3em] mb-1">SETRA Applications & Sensor</p>
                        <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight">{appData.title}</h2>
                        <p className="text-sm text-neutral-500 mt-2">{appData.shortDesc}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-lg transition-colors ml-6 shrink-0 mt-1">
                        <X className="w-6 h-6 text-neutral-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 md:px-10 py-8">

                    {/* Main Content */}
                    {appData.content && (
                        <div className="mb-8">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                                {appData.content}
                            </p>
                        </div>
                    )}

                    {/* Product Models with Images */}
                    {appData.models && appData.models.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-sky-600 inline-block"></span>
                                Models
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {appData.models.map((model: any, i: number) => (
                                    <div key={i} className="p-4 border border-sky-100 rounded-xl bg-sky-50/30 flex flex-col items-center">
                                        {/* Model Image */}
                                        {model.image && (
                                            <div className="w-full aspect-square bg-white rounded-lg border border-neutral-200 p-3 mb-3 flex items-center justify-center overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={model.image} alt={model.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                        )}
                                        {/* Model Name */}
                                        <p className="text-sm font-black text-neutral-900 text-center">{model.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Specification Table */}
                    {appData.tableData && appData.tableData.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-sky-600 inline-block"></span>
                                Specifications
                            </h3>
                            <div className="overflow-x-auto border border-neutral-200 rounded-xl">
                                <table className="w-full min-w-[600px]">
                                    <tbody>
                                        {appData.tableData.map((row: string[], rowIdx: number) => (
                                            <tr key={rowIdx} className={rowIdx === 0 ? 'bg-sky-50' : rowIdx % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                                                {row.map((cell: string, cellIdx: number) => (
                                                    cellIdx === 0 ? (
                                                        <th key={cellIdx} className="px-4 py-3 text-left text-xs font-black text-neutral-700 uppercase tracking-wider border-b border-r border-neutral-200 whitespace-nowrap">
                                                            {cell}
                                                        </th>
                                                    ) : (
                                                        <td key={cellIdx} className="px-4 py-3 text-xs text-neutral-600 border-b border-r border-neutral-200 last:border-r-0 whitespace-pre-line">
                                                            {cell}
                                                        </td>
                                                    )
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

// ─── SETRA Solution Modal ─────────────────────────────────────────────────────
function SetraSolutionModal({ solutionKey, onClose }: { solutionKey: string; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const solutionData = SETRA_APPLICATIONS_SOLUTION[solutionKey]
    if (!solutionData) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl w-full md:w-[90vw] max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-6 md:px-10 py-5 border-b border-neutral-100 shrink-0 bg-gradient-to-r from-sky-50 to-white">
                    <div>
                        <p className="text-[10px] text-sky-600 font-black uppercase tracking-[0.3em] mb-1">SETRA Applications & Solution</p>
                        <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight">{solutionData.title}</h2>
                        {solutionData.subtitle && (
                            <p className="text-sm text-neutral-500 mt-2">{solutionData.subtitle}</p>
                        )}
                        {solutionData.shortDesc && (
                            <p className="text-sm text-neutral-600 mt-2 font-medium">{solutionData.shortDesc}</p>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-lg transition-colors ml-6 shrink-0 mt-1">
                        <X className="w-6 h-6 text-neutral-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 md:px-10 py-8">

                    {/* Main Content */}
                    {solutionData.content && (
                        <div className="mb-8">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                                {solutionData.content}
                            </p>
                        </div>
                    )}

                    {/* CEMS Applications (Setra CEMS only) */}
                    {solutionData.cemsApplications && solutionData.cemsApplications.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-sky-600 inline-block"></span>
                                CEMS Applications
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {solutionData.cemsApplications.map((app: string, i: number) => (
                                    <div key={i} className="p-4 border border-sky-100 rounded-lg bg-sky-50/50 text-center">
                                        <p className="text-sm font-bold text-neutral-900">{app}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* How It Works (Setra CEMS only) */}
                    {solutionData.howItWorks && (
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-sky-600 inline-block"></span>
                                How It Works
                            </h3>

                            {/* Flow Diagram */}
                            {solutionData.howItWorks.flowImage && (
                                <div className="mb-6 rounded-xl overflow-hidden border border-neutral-200 bg-white p-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={solutionData.howItWorks.flowImage} alt="CEMS Flow" className="w-full h-auto" />
                                </div>
                            )}

                            {/* Sensor Icons */}
                            {solutionData.howItWorks.sensorsImage && (
                                <div className="rounded-xl overflow-hidden border border-neutral-200 bg-white p-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={solutionData.howItWorks.sensorsImage} alt="CEMS Sensors" className="w-full h-auto" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Features List */}
                    {solutionData.features && solutionData.features.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-sky-600 inline-block"></span>
                                {solutionKey === 'cleanroom' ? 'CEMS Cleanroom Application Features' : 'Features'}
                            </h3>
                            <div className="space-y-4">
                                {solutionData.features.map((feature: any, i: number) => (
                                    <div key={i} className="border-l-4 border-sky-500 pl-5 py-2">
                                        <h4 className="text-sm md:text-base font-black text-neutral-900 mb-1">{feature.title}</h4>
                                        <p className="text-sm text-neutral-600 leading-relaxed">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onOpen }: { product: any; onOpen: () => void }) {
    return (
        <button
            onClick={onOpen}
            className="group text-left border border-neutral-200 rounded-xl bg-white hover:border-cyan-500 hover:shadow-lg transition-all w-full overflow-hidden"
        >
            {/* Image area */}
            <div className="bg-neutral-50 p-4 aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-neutral-100 relative">
                {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image} alt={product.title} className="max-h-24 object-contain group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="text-neutral-200 text-[10px] font-black uppercase tracking-widest text-center leading-tight">{product.title}</div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <ExternalLink className="w-2.5 h-2.5" /> View Details
                    </span>
                </div>
            </div>
            {/* Info area */}
            <div className="p-3">
                <p className="text-[9px] text-cyan-600 font-black uppercase tracking-[0.25em] mb-0.5 line-clamp-1">{product.subtitle || ''}</p>
                <h3 className="text-sm font-black text-neutral-800 group-hover:text-cyan-600 transition-colors leading-tight line-clamp-2 mb-2">{product.title}</h3>
                <div className="flex items-center gap-1 text-[9px] text-neutral-400 font-bold uppercase tracking-widest group-hover:text-cyan-500 transition-colors">
                    <span>Specifications</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                </div>
            </div>
        </button>
    )
}

// ─── Catalog Page Wrapper ─────────────────────────────────────────────────────
function CatalogPage({ children, currentTab }: {
    children: React.ReactNode
    currentTab: string
}) {
    const idx = BROCHURE_FLOW.findIndex(p => p.tab === currentTab)
    const safeIdx = idx !== -1 ? idx : 0
    const total = BROCHURE_FLOW.length
    const prevTab = safeIdx > 0 ? BROCHURE_FLOW[safeIdx - 1].tab : null
    const nextTab = safeIdx < total - 1 ? BROCHURE_FLOW[safeIdx + 1].tab : null

    return (
        <div className="w-full bg-white antialiased relative overflow-x-hidden text-slate-800">
            {/* Ambient */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-cyan-100 opacity-50 blur-[90px] mix-blend-multiply" />
                <div className="absolute -top-10 -right-20 w-[400px] h-[300px] rounded-full bg-sky-100 opacity-40 blur-[70px] mix-blend-multiply" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-10" />

            <main className="relative z-10 w-full min-h-screen">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="w-full min-h-screen"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Navigator */}
            <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[150]">
                <div className="flex items-center bg-white border border-neutral-200 rounded-lg py-2 px-4 md:py-3 md:px-6 shadow-md gap-4 md:gap-6 font-mono">
                    <Link href={prevTab ? `/templates/hs-tech?tab=${prevTab}` : '#'}
                        className={cn("text-neutral-300 hover:text-cyan-600 transition-colors", !prevTab && "opacity-20 pointer-events-none")}>
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                    </Link>
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg md:text-2xl font-black text-cyan-600">{String(safeIdx + 1).padStart(2, '0')}</span>
                        <span className="text-neutral-300 text-sm">/</span>
                        <span className="text-sm md:text-base text-neutral-400 font-bold">{String(total).padStart(2, '0')}</span>
                    </div>
                    <Link href={nextTab ? `/templates/hs-tech?tab=${nextTab}` : '#'}
                        className={cn("text-neutral-300 hover:text-cyan-600 transition-colors", !nextTab && "opacity-20 pointer-events-none")}>
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

// ─── Category Products Layout ─────────────────────────────────────────────────
function CategoryPage({
    tab, title, desc, products, parentBrand, onOpen, subCategories, keyApps, introData
}: {
    tab: string; title: string; desc: string
    products: any[]; parentBrand?: string; onOpen: (p: any) => void
    subCategories?: Array<{ key: string; label: string }>
    keyApps?: string[]
    introData?: any
}) {
    const [activeSub, setActiveSub] = useState('all')

    const filtered = subCategories
        ? (activeSub === 'all' ? products : products.filter((p: any) => p.category === activeSub))
        : products

    const PARENT_LABEL_MAP: Record<string, string> = { cms: 'DATA LOGGER' }
    const parentLabel = parentBrand ? (BRANDS[parentBrand as keyof typeof BRANDS]?.label || PARENT_LABEL_MAP[parentBrand] || parentBrand.toUpperCase()) : null
    const heroImage = CATEGORY_INFO[tab]?.images?.[0] || null

    return (
        <CatalogPage currentTab={tab}>
            {/* Category Hero strip */}
            {heroImage && (
                <div className="w-full border-b border-neutral-100 bg-gradient-to-r from-neutral-50 to-white flex items-center justify-center overflow-hidden" style={{ height: 180 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroImage} alt={title} className="h-full max-h-44 w-auto object-contain px-6 py-4" />
                </div>
            )}

            <div className="pt-8 px-6 max-w-6xl mx-auto">
                {parentLabel && (
                    <Link href={`/templates/hs-tech?tab=${parentBrand}`}
                        className="text-[10px] text-cyan-600 font-black uppercase tracking-[0.3em] mb-3 block hover:text-cyan-700">
                        ← {parentLabel}
                    </Link>
                )}
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-2 tracking-tighter uppercase">{title}</h2>
                <p className="text-sm text-neutral-500 mb-4 max-w-2xl">{desc}</p>

                {/* Key application tags */}
                {keyApps && keyApps.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {keyApps.map(app => (
                            <span key={app} className="px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-full text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                                {app}
                            </span>
                        ))}
                    </div>
                )}

                {/* JUMO Category Introduction */}
                {introData && (
                    <div className="mb-10 border-t border-neutral-100 pt-8 mt-6">
                        <h3 className="text-2xl md:text-4xl font-black text-neutral-900 mb-3 tracking-tight uppercase">
                            {introData.title}
                        </h3>
                        {introData.subtitle && (
                            <p className="text-lg text-cyan-600 font-bold mb-6">{introData.subtitle}</p>
                        )}
                        {introData.description && (
                            <p className="text-sm text-neutral-600 mb-8 max-w-3xl leading-relaxed">{introData.description}</p>
                        )}

                        {/* For jumo_temp: products grid */}
                        {introData.products && !introData.sections && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {introData.products.map((product: any, idx: number) => (
                                    <div key={idx} className="border border-neutral-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow">
                                        {product.image && (
                                            <div className="mb-4 h-40 flex items-center justify-center bg-neutral-50 rounded-md overflow-hidden">
                                                <img src={product.image} alt={product.model} className="max-h-full object-contain p-2" />
                                            </div>
                                        )}
                                        <h4 className="text-lg font-bold text-neutral-900 mb-3 uppercase tracking-tight">{product.model}</h4>
                                        <ul className="text-xs text-neutral-600 space-y-2">
                                            {product.features?.map((feat: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-cyan-600 font-bold">•</span>
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* For jumo_liquid: sections with products */}
                        {introData.sections && (
                            <div className="space-y-12">
                                {introData.sections.map((section: any, sIdx: number) => (
                                    <div key={sIdx} className="border-l-4 border-cyan-500 pl-6">
                                        <h4 className="text-xl font-black text-neutral-900 mb-6 uppercase tracking-tight">{section.title}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {section.products.map((product: any, pIdx: number) => (
                                                <div key={pIdx} className="border border-neutral-200 rounded-lg p-5 bg-white">
                                                    <h5 className="text-base font-bold text-neutral-900 mb-3 uppercase">{product.model}</h5>
                                                    <div className="mb-4">
                                                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Features</p>
                                                        <ul className="text-xs text-neutral-600 space-y-1">
                                                            {product.features?.map((feat: string, i: number) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <span className="text-cyan-600 font-bold">•</span>
                                                                    <span>{feat}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    {product.applications && product.applications.length > 0 && (
                                                        <div>
                                                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Applications</p>
                                                            <ul className="text-xs text-neutral-600 space-y-1">
                                                                {product.applications.map((app: string, i: number) => (
                                                                    <li key={i} className="flex items-start gap-2">
                                                                        <span className="text-cyan-600 font-bold">•</span>
                                                                        <span>{app}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Sub-category filter tabs */}
                {subCategories && (
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-100 pb-6">
                        <button
                            onClick={() => setActiveSub('all')}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all",
                                activeSub === 'all'
                                    ? "bg-neutral-900 text-white border-neutral-900"
                                    : "border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800"
                            )}
                        >
                            All
                        </button>
                        {subCategories.map(sub => (
                            <button
                                key={sub.key}
                                onClick={() => setActiveSub(sub.key)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all",
                                    activeSub === sub.key
                                        ? "bg-cyan-600 text-white border-cyan-600"
                                        : "border-neutral-200 text-neutral-500 hover:border-cyan-400 hover:text-cyan-600"
                                )}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="px-6 pb-28 max-w-6xl mx-auto">
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {filtered.map((product: any) => (
                            <ProductCard key={product.id} product={product} onOpen={() => onOpen(product)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-neutral-300 font-bold uppercase tracking-widest text-sm">No products listed</div>
                )}
            </div>
        </CatalogPage>
    )
}

// ─── Brand Overview Layout ────────────────────────────────────────────────────
type AppSection = { label: string; items: { title: string; desc: string; image?: string }[] }

function BrandPage({
    tab, brandKey, headline, sub, desc, logo, categories, applicationSections, onOpen
}: {
    tab: string; brandKey: string; headline: string; sub: string; desc: string
    logo: string; categories: { tab: string; title: string; desc: string; count: number }[]
    applicationSections?: AppSection[]
    onOpen?: (p: any) => void
}) {
    const [sectionIdx, setSectionIdx] = useState<number>(-1) // -1 = products
    const [selectedAppKey, setSelectedAppKey] = useState<string | null>(null)
    const [selectedSetraKey, setSelectedSetraKey] = useState<string | null>(null)
    const [selectedSetraSolutionKey, setSelectedSetraSolutionKey] = useState<string | null>(null)

    // Map application titles to keys
    const appTitleToKey: Record<string, string> = {
        // VAISALA Applications & Solutions
        'Semiconductor': 'semiconductor',
        'Plant & Process': 'plant',
        'Automotive': 'automotive',
        'Marine & Offshore': 'marine',
        'Agriculture': 'agriculture',
        'Power Industry': 'power',
        'HVAC & Buildings': 'hvac',
        'Life Science': 'lifescience',
        // SETRA Applications & Sensor
        'Precise Measurement Differential Pressure': 'precise_diff_pressure',
        'Air Conditioning Differential Pressure': 'air_cond_diff_pressure',
        'Precision Measurement Pressure Sensor': 'precision_pressure',
        'Cooling and Air Conditioning Pressure': 'cooling_air_cond',
        'UHP Pressure Sensor': 'uhp_pressure',
        'Barometric Pressure Sensor': 'barometric',
        // SETRA Applications & Solution
        'Setra CEMS™': 'setra_cems',
        'Cleanroom Manufacturing': 'cleanroom',
        'Isolation & Treatment Rooms': 'isolation',
        'Compounding Pharmacies': 'compounding'
    }

    return (
        <CatalogPage currentTab={tab}>
            {/* Application Detail Modal (VAISALA) */}
            <AnimatePresence>
                {selectedAppKey && (
                    <ApplicationDetailModal
                        appKey={selectedAppKey}
                        onClose={() => setSelectedAppKey(null)}
                    />
                )}
            </AnimatePresence>

            {/* SETRA Sensor Application Modal */}
            <AnimatePresence>
                {selectedSetraKey && (
                    <SetraApplicationDetailModal
                        appKey={selectedSetraKey}
                        onClose={() => setSelectedSetraKey(null)}
                    />
                )}
            </AnimatePresence>

            {/* SETRA Solution Modal */}
            <AnimatePresence>
                {selectedSetraSolutionKey && (
                    <SetraSolutionModal
                        solutionKey={selectedSetraSolutionKey}
                        onClose={() => setSelectedSetraSolutionKey(null)}
                    />
                )}
            </AnimatePresence>
            <div className="pt-8 pb-28 px-6 max-w-6xl mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt={brandKey} className="h-10 object-contain mb-8" />
                <h2 className="text-4xl md:text-7xl font-black text-neutral-900 mb-4 tracking-tighter uppercase leading-none">
                    {headline}<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-400">{sub}</span>
                </h2>
                <p className="text-sm text-neutral-500 mb-8 max-w-2xl">{desc}</p>

                {/* Section tabs */}
                {applicationSections && (
                    <div className="flex flex-wrap gap-1 p-1 bg-neutral-100 rounded-xl w-fit mb-10">
                        <button
                            onClick={() => setSectionIdx(-1)}
                            className={cn("px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all",
                                sectionIdx === -1 ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-800")}
                        >
                            Products & Services
                        </button>
                        {applicationSections.map((sec, i) => (
                            <button key={i}
                                onClick={() => setSectionIdx(i)}
                                className={cn("px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all",
                                    sectionIdx === i ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-800")}
                            >
                                {sec.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Products & Services grid */}
                {sectionIdx === -1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map(cat => (
                            <Link key={cat.tab} href={`/templates/hs-tech?tab=${cat.tab}`}
                                className="group p-6 border border-neutral-200 rounded-xl bg-white hover:border-cyan-500 hover:shadow-sm transition-all">
                                <h3 className="text-sm font-black text-neutral-900 group-hover:text-cyan-600 transition-colors uppercase tracking-tight mb-2 leading-tight">{cat.title}</h3>
                                <p className="text-xs text-neutral-400 leading-relaxed mb-3">{cat.desc}</p>
                                <p className="text-[10px] text-neutral-300 font-bold uppercase tracking-widest">{cat.count} product{cat.count !== 1 ? 's' : ''}</p>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Application section grids */}
                {applicationSections && applicationSections.map((sec, i) => (
                    sectionIdx === i && (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {sec.items.map((item, j) => {
                                const appKey = appTitleToKey[item.title]
                                const isSetraSensor = SETRA_APPLICATIONS_SENSOR[appKey] !== undefined
                                const isSetraSolution = SETRA_APPLICATIONS_SOLUTION[appKey] !== undefined
                                const handleClick = () => {
                                    if (isSetraSensor) {
                                        setSelectedSetraKey(appKey)
                                    } else if (isSetraSolution) {
                                        setSelectedSetraSolutionKey(appKey)
                                    } else {
                                        setSelectedAppKey(appKey)
                                    }
                                }
                                return (
                                    <button
                                        key={j}
                                        onClick={handleClick}
                                        className="relative overflow-hidden border border-neutral-200 rounded-xl bg-white hover:border-cyan-400 hover:shadow-sm transition-all text-left w-full cursor-pointer group"
                                    >
                                        {/* Background Image */}
                                        {item.image && (
                                            <div className="relative w-full h-48 overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-4">
                                                <span className="text-cyan-600 text-xs font-black">{String(j + 1).padStart(2, '0')}</span>
                                            </div>
                                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight mb-2 leading-tight">{item.title}</h3>
                                            <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )
                ))}
            </div>
        </CatalogPage>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
function HSTechContent() {
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('tab') || 'cover'
    const [modalProduct, setModalProduct] = useState<any>(null)

    const open = (p: any) => setModalProduct(p)
    const close = () => setModalProduct(null)

    // Backward compat: if URL has ?product=xxx, auto-open modal
    const urlProductId = searchParams.get('product')
    useEffect(() => {
        if (urlProductId) {
            const found = findProduct(urlProductId)
            if (found) setModalProduct(found)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlProductId])

    // Category products helpers
    const setraVisual = useMemo(() => (DB.setra as any[] || []).filter((p: any) => p.category === 'diff_ind'), [])
    const setraSensor = useMemo(() => (DB.setra as any[] || []).filter((p: any) => p.category === 'diff_sen'), [])
    const setraInd    = useMemo(() => (DB.setra as any[] || []).filter((p: any) => p.category === 'industrial'), [])
    const jumoTemp    = useMemo(() => (DB.jumo  as any[] || []).filter((p: any) => p.category === 'temperature'), [])
    const jumoLiquid  = useMemo(() => (DB.jumo  as any[] || []).filter((p: any) => ['ph_electrode', 'ph_transmitter', 'conductivity'].includes(p.category)), [])
    const jumoControl = useMemo(() => (DB.jumo  as any[] || []).filter((p: any) => p.category === 'control'), [])

    return (
        <>
            {/* Modal */}
            <AnimatePresence>
                {modalProduct && <ProductModal product={modalProduct} onClose={close} />}
            </AnimatePresence>

            {/* ── 01. Cover ── */}
            {activeTab === 'cover' && (
                <CatalogPage currentTab="cover">
                    <CoverView />
                </CatalogPage>
            )}

            {/* ── 02. About ── */}
            {activeTab === 'about' && (
                <CatalogPage currentTab="about">
                    <div className="pt-8 pb-28 px-6 max-w-5xl mx-auto">
                        {/* Headline */}
                        <p className="text-[10px] font-black text-cyan-600 tracking-[0.4em] mb-4 uppercase">Established 2016 · Pangyo Techno Valley, Korea</p>
                        <h2 className="text-4xl md:text-7xl font-black text-neutral-900 mb-10 tracking-tighter uppercase leading-none">
                            About<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-400">HS TECH.</span>
                        </h2>

                        {/* Company Description — imweb 원문 */}
                        <div className="mb-10 space-y-5 border-l-2 border-cyan-500 pl-6">
                            <p className="text-base text-neutral-700 leading-relaxed">
                                HS TECH Co., Ltd. is an official distributor with rights to sell in <strong className="text-neutral-900">Korea and Vietnam</strong> by <strong className="text-neutral-900">VAISALA of Finland</strong>, which specializes in environmental sensors. We support sales, technical support, calibration, installation, and A/S for all VAISALA products.
                            </p>
                            <p className="text-base text-neutral-700 leading-relaxed">
                                We are also an agent of <strong className="text-neutral-900">JUMO</strong>, which provides stable measurement, control and monitoring systems for temperature and water quality and pressure. To efficiently manage simple tasks in the industry, <strong className="text-neutral-900">WECON</strong> provides effective management measures by supplying HMI and PLC of WECON.
                            </p>
                            <p className="text-base text-neutral-700 leading-relaxed italic">
                                "HS TECH is committed to becoming a sensor-based professional company that plays a central role in the future of development. Based on your sincere advice and encouragement, we promise to be HS TECH to impress everyone."
                            </p>
                        </div>

                        {/* Service Highlights */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                            {[
                                { label: 'Sales', desc: 'Authorized product sales for Korea & Vietnam' },
                                { label: 'Technical Support', desc: 'Expert consultation & application guidance' },
                                { label: 'Calibration', desc: 'On-site & lab calibration services' },
                                { label: 'Installation & A/S', desc: 'Full installation and after-sales support' },
                            ].map((s, i) => (
                                <div key={i} className="p-5 border border-neutral-200 rounded-xl bg-neutral-50">
                                    <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-1.5">{s.label}</p>
                                    <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="md:col-span-2 p-8 border border-neutral-200 rounded-xl bg-white">
                                <Globe className="w-5 h-5 text-cyan-600 mb-4" />
                                <h4 className="font-black text-neutral-900 mb-3 uppercase tracking-wide text-sm">Official Partner Brands</h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    {[
                                        { brand: 'VAISALA', region: 'Korea & Vietnam', type: 'Environmental Sensors' },
                                        { brand: 'SETRA', region: 'Korea', type: 'Pressure Transducers' },
                                        { brand: 'JUMO', region: 'Korea', type: 'Measurement & Control' },
                                    ].map((p, i) => (
                                        <div key={i} className="border border-neutral-100 rounded-lg p-3 bg-neutral-50">
                                            <p className="font-black text-neutral-900 text-xs tracking-wide">{p.brand}</p>
                                            <p className="text-[10px] text-cyan-600 mt-0.5">{p.type}</p>
                                            <p className="text-[10px] text-neutral-400 mt-0.5">{p.region}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="p-6 border border-neutral-200 rounded-xl bg-white flex-1">
                                    <MapPin className="w-4 h-4 text-cyan-600 mb-3" />
                                    <h4 className="font-black text-neutral-900 mb-2 uppercase tracking-wide text-xs">Address</h4>
                                    <p className="text-xs text-neutral-600 leading-relaxed">#410, U-Space2 B,<br />670 Daewangpangyo-ro,<br />Bundang-Gu, Seongnam-Si,<br />Gyeonggi-Do, Korea</p>
                                </div>
                                <div className="p-6 border border-neutral-200 rounded-xl bg-white flex-1">
                                    <Phone className="w-4 h-4 text-cyan-600 mb-3" />
                                    <h4 className="font-black text-neutral-900 mb-2 uppercase tracking-wide text-xs">Contact</h4>
                                    <div className="space-y-1 text-xs text-neutral-600">
                                        <p>Tel: 070-4346-1844</p>
                                        <p>Fax: 031-8016-3510</p>
                                        <p>hs-tech@hs-tech.co.kr</p>
                                        <p className="text-neutral-400 pt-1">Reg. No. 144-81-08640</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CatalogPage>
            )}

            {/* ── 03. Business (Support & Services) ── */}
            {activeTab === 'business' && (
                <CatalogPage currentTab="business">
                    <div className="pt-8 pb-28 px-6 max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-16 tracking-tighter uppercase leading-none text-center">
                            Support &<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-400">Services.</span>
                        </h2>

                        {/* Support & Services Image */}
                        <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/templates/hs-tech/images/business/Support & Services.jpg"
                                alt="Support & Services"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </CatalogPage>
            )}

            {/* ── 04. Brands ── */}
            {activeTab === 'products' && (
                <CatalogPage currentTab="products">
                    <div className="max-w-6xl mx-auto px-6 pt-8 pb-28">
                        <h2 className="text-4xl md:text-7xl font-black text-neutral-900 mb-4 tracking-tighter uppercase leading-none text-center">
                            Strategic<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-400">Partners.</span>
                        </h2>
                        <p className="text-sm text-neutral-500 text-center mb-16 max-w-xl mx-auto">Official authorized distributor of world-class precision measurement brands.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.entries(BRANDS).map(([key, data]: [string, any]) => {
                                const productCount = data.categories.reduce((acc: number, cat: string) => acc + ((DB[cat] as any[])?.length || 0), 0)
                                return (
                                    <Link key={key} href={`/templates/hs-tech?tab=${key}`}
                                        className="group relative flex flex-col p-8 border border-neutral-200 rounded-2xl bg-white hover:border-cyan-400 hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        {/* Background glow on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        {/* Logo */}
                                        <div className="relative mb-8 h-14 flex items-center">
                                            {data.logo && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={data.logo} alt={data.label} className="h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                                            )}
                                        </div>

                                        {/* Brand name & desc */}
                                        <div className="relative flex-1">
                                            <h3 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-tight group-hover:text-cyan-600 transition-colors">{data.label}</h3>
                                            <p className="text-sm text-neutral-500 leading-relaxed mb-6">{data.desc}</p>

                                            {/* Category tags */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {data.categories.map((cat: string) => (
                                                    <span key={cat} className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-500 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                                                        {CATEGORY_INFO[cat]?.title || cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Footer: product count + CTA */}
                                        <div className="relative flex items-center justify-between pt-5 border-t border-neutral-100 group-hover:border-cyan-100 transition-colors">
                                            <span className="text-xs text-neutral-400 font-medium">{productCount} products</span>
                                            <span className="flex items-center gap-1 text-xs font-bold text-neutral-400 group-hover:text-cyan-600 transition-colors uppercase tracking-wider">
                                                Explore <ChevronRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </CatalogPage>
            )}

            {/* ── 05. VAISALA Brand ── */}
            {activeTab === 'vaisala' && (
                <BrandPage
                    tab="vaisala" brandKey="VAISALA"
                    headline="World Leader in" sub="Measurement."
                    desc="Vaisala, founded in 1936 in Finland, is a global leader in environmental and industrial measurement with over 80 years of expertise. Trusted by scientists, engineers, and industries in 150+ countries, Vaisala delivers unmatched accuracy for humidity, dewpoint, CO₂, barometric pressure, and weather sensing. HS TECH is the exclusive authorized distributor of Vaisala instruments in Korea and Vietnam."
                    logo="/templates/hs-tech/images/brands/vaisala.svg"
                    categories={(BRANDS.vaisala.categories || []).map((catKey: string) => ({
                        tab: catKey,
                        title: CATEGORY_INFO[catKey]?.title || catKey,
                        desc: CATEGORY_INFO[catKey]?.desc || '',
                        count: (DB[catKey] as any[] || []).length,
                    }))}
                    applicationSections={[{
                        label: 'Applications & Solutions',
                        items: [
                            { title: 'Semiconductor', desc: 'Precise humidity and dewpoint control in cleanrooms and lithography processes.' },
                            { title: 'Plant & Process', desc: 'Reliable monitoring for industrial drying, coating, and chemical processes.' },
                            { title: 'Automotive', desc: 'Environmental testing in paint booths, engine test cells, and EV battery production.' },
                            { title: 'Marine & Offshore', desc: 'Weather observation and atmospheric measurement at sea.' },
                            { title: 'Agriculture', desc: 'Crop storage humidity control and greenhouse climate management.' },
                            { title: 'Power Industry', desc: 'Transformer oil moisture and hydrogen monitoring for grid asset protection.' },
                            { title: 'HVAC & Buildings', desc: 'Indoor air quality and energy-efficient building automation.' },
                            { title: 'Life Science', desc: 'Sterile environment monitoring, bio-decontamination, and incubator control.' },
                        ]
                    }]}
                    onOpen={open}
                />
            )}

            {/* ── 06-13. VAISALA Categories ── */}
            {activeTab === 'humidity' && (
                <CategoryPage tab="humidity" title="Humidity" parentBrand="vaisala" onOpen={open}
                    desc="Best-in-class humidity measurement instruments for industrial, HVAC, handheld, and OEM applications."
                    products={DB.humidity as any[] || []}
                    keyApps={['Cleanroom', 'Pharmaceutical', 'Semiconductor', 'HVAC', 'Food & Beverage', 'Greenhouse']}
                    subCategories={[
                        { key: 'industrial',      label: 'Industrial' },
                        { key: 'explosion_proof', label: 'Explosion Proof' },
                        { key: 'hvac',            label: 'HVAC' },
                        { key: 'handheld',        label: 'Handheld' },
                        { key: 'probe',           label: 'Module / Probe' },
                    ]} />
            )}
            {activeTab === 'dewpoint' && (
                <CategoryPage tab="dewpoint" title="Dewpoint" parentBrand="vaisala" onOpen={open}
                    desc="Reliable dewpoint measurement for compressed air dryers, cleanrooms, and industrial gas drying applications."
                    products={DB.dewpoint as any[] || []}
                    keyApps={['Compressed Air', 'Dry Gas', 'Lithium Battery', 'Semiconductor', 'Natural Gas']}
                    subCategories={[
                        { key: 'fixed',    label: 'Fixed Transmitter' },
                        { key: 'portable', label: 'Portable Instrument' },
                        { key: 'module',   label: 'Module / OEM' },
                    ]} />
            )}
            {activeTab === 'co2' && (
                <CategoryPage tab="co2" title="Carbon Dioxide" parentBrand="vaisala" onOpen={open}
                    desc="Accurate CO2 monitoring for indoor air quality, HVAC systems, incubators, and industrial processes."
                    products={DB.co2 as any[] || []}
                    keyApps={['IAQ / HVAC', 'Incubator', 'Greenhouse', 'Food Storage', 'Life Science']}
                    subCategories={[
                        { key: 'probe',       label: 'CO₂ Probe' },
                        { key: 'transmitter', label: 'Transmitter' },
                        { key: 'handheld',    label: 'Handheld' },
                    ]} />
            )}
            {activeTab === 'oil' && (
                <CategoryPage tab="oil" title="Moisture in Oil" parentBrand="vaisala" onOpen={open}
                    desc="Transformer oil moisture and hydrogen gas monitoring for power industry asset protection."
                    products={DB.oil as any[] || []}
                    keyApps={['Power Transformer', 'Grid Substation', 'Industrial Oil System']}
                    subCategories={[
                        { key: 'transformer', label: 'Transformer Monitor' },
                        { key: 'fixed',       label: 'Oil Transmitter' },
                        { key: 'handheld',    label: 'Handheld' },
                        { key: 'oil_module',  label: 'Module / OEM' },
                    ]} />
            )}
            {activeTab === 'barometer' && (
                <CategoryPage tab="barometer" title="Barometric Pressure" parentBrand="vaisala" onOpen={open}
                    desc="High-accuracy digital barometers for meteorological, aviation, and industrial pressure measurement."
                    products={DB.barometer as any[] || []}
                    keyApps={['Meteorology', 'Aviation', 'Calibration Lab', 'Research']} />
            )}
            {activeTab === 'weather' && (
                <CategoryPage tab="weather" title="Weather" parentBrand="vaisala" onOpen={open}
                    desc="All-in-one weather stations and individual meteorological sensors for outdoor environmental monitoring."
                    products={DB.weather as any[] || []}
                    keyApps={['Airport', 'Road / Highway', 'Agriculture', 'Marine', 'Smart City']}
                    subCategories={[
                        { key: 'trans',        label: 'Weather Transmitter' },
                        { key: 'hvac_weather', label: 'HVAC / Indoor Sensor' },
                    ]} />
            )}
            {activeTab === 'h2o2' && (
                <CategoryPage tab="h2o2" title="H₂O₂ Monitoring" parentBrand="vaisala" onOpen={open}
                    desc="Hydrogen peroxide vapor concentration measurement for bio-decontamination processes in pharmaceutical and healthcare."
                    products={DB.h2o2 as any[] || []}
                    keyApps={['Bio-decontamination', 'Pharmaceutical', 'Hospital', 'Isolator']} />
            )}
            {activeTab === 'cms' && (
                <BrandPage
                    tab="cms" brandKey="VAISALA"
                    headline="Continuous" sub="Monitoring."
                    desc="Vaisala's data logger and CMS portfolio delivers GxP-compliant environmental monitoring from standalone loggers to fully networked facility-wide systems."
                    logo="/templates/hs-tech/images/brands/vaisala.svg"
                    categories={[
                        { tab: 'cms_standalone', title: 'Standalone Data Loggers', desc: 'DL2000 / DL4000 / DL1700 — independent loggers with display.', count: (DB.cms as any[]).filter((p: any) => p.category === 'data_logger').length },
                        { tab: 'cms_network',    title: 'Network Loggers & Software', desc: 'DL1000/1400, vNET Wireless, POE Logger, CMS Software.', count: (DB.cms as any[]).filter((p: any) => p.category !== 'data_logger').length },
                    ]}
                    onOpen={open}
                />
            )}
            {activeTab === 'cms_standalone' && (
                <CategoryPage tab="cms_standalone" title="Standalone Data Loggers" parentBrand="cms" onOpen={open}
                    desc="Self-contained data loggers with built-in displays for independent environmental monitoring in cleanrooms, labs, and warehouses."
                    products={(DB.cms as any[]).filter((p: any) => p.category === 'data_logger')} />
            )}
            {activeTab === 'cms_network' && (
                <CategoryPage tab="cms_network" title="Network Loggers & Software" parentBrand="cms" onOpen={open}
                    desc="LAN/PoE/wireless networked loggers and centralized CMS software for facility-wide GMP/GxP-compliant continuous monitoring."
                    products={(DB.cms as any[]).filter((p: any) => p.category !== 'data_logger')} />
            )}

            {/* ── 14. SETRA Brand ── */}
            {activeTab === 'setra' && (
                <BrandPage
                    tab="setra" brandKey="SETRA"
                    headline="Premium" sub="Pressure."
                    desc="SETRA Systems delivers precision pressure transducers and room pressure monitoring solutions for cleanrooms, hospitals, and industrial facilities. Trusted worldwide for accuracy and reliability."
                    logo="/templates/hs-tech/images/brands/setra.svg"
                    categories={[
                        { tab: 'setra_visual', title: 'Differential Pressure Indicator', desc: 'LED and touchscreen room pressure monitors for real-time visual display.', count: setraVisual.length },
                        { tab: 'setra_sensor', title: 'Differential Pressure Sensor', desc: 'High-accuracy DP sensors for HVAC, cleanrooms, and filtration monitoring.', count: setraSensor.length },
                        { tab: 'setra_ind',    title: 'Industrial Pressure Transducer', desc: 'Rugged stainless steel transducers for harsh industrial process environments.', count: setraInd.length },
                    ]}
                    applicationSections={[
                        {
                            label: 'Applications & Sensor',
                            items: [
                                { title: 'Precise Measurement Differential Pressure', desc: 'High-accuracy differential pressure measurement for critical environments requiring ±0.25% FS precision or better, including reference laboratories and calibration facilities.' },
                                { title: 'Air Conditioning Differential Pressure', desc: 'Monitoring supply, return, and exhaust air pressure differentials in commercial HVAC systems and air handling units for energy optimization.' },
                                { title: 'Precision Measurement Pressure Sensor', desc: 'Absolute and gauge pressure measurement for industrial process control, leak testing, and quality assurance applications.' },
                                { title: 'Cooling and Air Conditioning Pressure', desc: 'Refrigerant pressure monitoring in cooling systems, chiller plants, and commercial HVAC installations for performance and safety.' },
                                { title: 'UHP Pressure Sensor', desc: 'Ultra-high purity pressure sensing for semiconductor process gas lines, cleanroom air systems, and pharmaceutical manufacturing with wetted stainless or PTFE materials.' },
                                { title: 'Barometric Pressure Sensor', desc: 'Atmospheric reference pressure measurement for altitude compensation, weather monitoring, and environmental control systems.' },
                            ]
                        },
                        {
                            label: 'Applications & Solution',
                            items: [
                                { title: 'Setra CEMS™', desc: 'Continuous Emissions Monitoring System solution using Setra\'s precision differential pressure sensors to monitor stack flow velocity, draft, and filter pressure drop in power plants and industrial stacks.' },
                                { title: 'Cleanroom Manufacturing', desc: 'Maintaining ISO-classified differential pressure cascades between cleanroom zones (e.g., ISO 5→ISO 7→corridor) to prevent particle ingress and ensure GMP compliance in semiconductor and pharmaceutical manufacturing.' },
                                { title: 'Isolation & Treatment Rooms', desc: 'Negative pressure isolation rooms (airborne infection) and positive pressure protective environments in hospitals, monitored in real-time with Setra\'s visual pressure indicators to prevent cross-contamination.' },
                                { title: 'Compounding Pharmacies', desc: 'USP <797> and <800> compliant pressure monitoring for sterile compounding suites, hazardous drug buffer rooms, and ante-rooms — ensuring proper pressure relationships at all times.' },
                            ]
                        }
                    ]}
                    onOpen={open}
                />
            )}

            {/* ── 15-17. SETRA Categories ── */}
            {activeTab === 'setra_visual' && (
                <CategoryPage tab="setra_visual" title="Differential Pressure (Visual)" parentBrand="setra" onOpen={open}
                    desc="LED-based and touchscreen room pressure monitors for cleanrooms, operating rooms, and isolation suites."
                    products={setraVisual} />
            )}
            {activeTab === 'setra_sensor' && (
                <CategoryPage tab="setra_sensor" title="Differential Pressure (Sensor)" parentBrand="setra" onOpen={open}
                    desc="Precision differential pressure sensors and transmitters for HVAC, filter monitoring, and building management systems."
                    products={setraSensor} />
            )}
            {activeTab === 'setra_ind' && (
                <CategoryPage tab="setra_ind" title="Industrial Pressure" parentBrand="setra" onOpen={open}
                    desc="High-performance stainless steel pressure transducers for harsh industrial and process environments."
                    products={setraInd} />
            )}

            {/* ── 18. JUMO Brand ── */}
            {activeTab === 'jumo' && (
                <BrandPage
                    tab="jumo" brandKey="JUMO"
                    headline="Precision" sub="Measurement."
                    desc="JUMO specializes in innovative sensors and automation solutions for temperature, pH, conductivity, and process control — trusted across chemical, water treatment, plastics, and food industries worldwide."
                    logo="/templates/hs-tech/images/brands/jumo.svg"
                    categories={[
                        { tab: 'jumo_temp',    title: 'Temperature', desc: 'PlastoSENS precision temperature sensors for plastics processing.', count: jumoTemp.length },
                        { tab: 'jumo_liquid',  title: 'Liquid Analysis', desc: 'pH electrodes, transmitters, and conductivity sensors.', count: jumoLiquid.length },
                        { tab: 'jumo_control', title: 'Control & Recording', desc: 'PID controllers and paperless recorders.', count: jumoControl.length },
                    ]}
                    applicationSections={[{
                        label: 'Applications & Solutions',
                        items: [
                            { title: 'Water & Wastewater', desc: 'pH, conductivity, and turbidity monitoring for drinking water treatment plants and effluent compliance.', image: '/templates/hs-tech/images/jumo/water_wastewater.jpg' },
                            { title: 'Shipbuilding', desc: 'Marine-grade sensors for seawater cooling systems, ballast water treatment, and shipboard process monitoring.', image: '/templates/hs-tech/images/jumo/shipbuilding.jpg' },
                            { title: 'Pharmaceutical & Biotechnology', desc: 'Precise liquid parameter control for sterile manufacturing, bioreactor processes, and purified water systems.', image: '/templates/hs-tech/images/jumo/pharmaceutical.jpg' },
                            { title: 'Semiconductor & Display', desc: 'Ultra-pure water quality monitoring with high-accuracy conductivity and pH measurement for wafer cleaning and etching.', image: '/templates/hs-tech/images/jumo/semiconductor.jpg' },
                            { title: 'Heating & Air Conditioning', desc: 'Water quality management in HVAC systems and cooling towers to prevent corrosion, scaling, and biological growth.', image: '/templates/hs-tech/images/jumo/heating.jpg' },
                            { title: 'Aquaculture', desc: 'Continuous pH, dissolved oxygen, and conductivity monitoring for fish farming and recirculating aquaculture systems.', image: '/templates/hs-tech/images/jumo/aquaculture.jpg' },
                        ]
                    }]}
                    onOpen={open}
                />
            )}

            {/* ── 18a-20. JUMO Categories ── */}
            {activeTab === 'jumo_temp' && (
                <CategoryPage tab="jumo_temp" title="Temperature" parentBrand="jumo" onOpen={open}
                    desc="PlastoSENS precision temperature sensors engineered for plastics processing — injection molding, extrusion, and hot runner systems."
                    products={jumoTemp}
                    keyApps={['Injection Molding', 'Extrusion', 'Hot Runner', 'Compounding', 'Plastics Processing']}
                    subCategories={[
                        { key: 'temperature', label: 'PlastoSENS' },
                    ]}
                    introData={JUMO_CATEGORY_INTRO.jumo_temp} />
            )}
            {activeTab === 'jumo_liquid' && (
                <CategoryPage tab="jumo_liquid" title="Liquid Analysis" parentBrand="jumo" onOpen={open}
                    desc="pH electrodes, transmitters, and conductivity sensors for water treatment, chemical, and food & beverage industries."
                    products={jumoLiquid}
                    keyApps={['Water Treatment', 'Chemical', 'Pharmaceutical', 'Food & Beverage', 'Semiconductor']}
                    subCategories={[
                        { key: 'ph_electrode',    label: 'pH Combination Electrodes' },
                        { key: 'ph_transmitter',  label: 'pH Transmitter' },
                        { key: 'conductivity',    label: 'Conductivity Transmitter' },
                    ]}
                    introData={JUMO_CATEGORY_INTRO.jumo_liquid} />
            )}
            {activeTab === 'jumo_control' && (
                <CategoryPage tab="jumo_control" title="Control & Recording" parentBrand="jumo" onOpen={open}
                    desc="PID temperature controllers and touchscreen paperless recorders for comprehensive industrial process automation."
                    products={jumoControl}
                    introData={JUMO_CATEGORY_INTRO.jumo_control} />
            )}

            {/* ── 22. Contact ── */}
            {activeTab === 'contact' && (
                <CatalogPage currentTab="contact">
                    <div className="pt-8 pb-28 px-6 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-7xl font-black text-neutral-900 mb-4 tracking-tighter uppercase leading-none text-center">
                            Reach<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-400">Out.</span>
                        </h2>
                        <p className="text-sm text-neutral-500 mb-12 max-w-sm mx-auto text-center">Get in touch for product inquiries, technical consultations, and pricing information.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-8 border border-neutral-200 rounded-xl bg-white">
                                <Phone className="w-6 h-6 text-cyan-600 mb-4" />
                                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Phone</p>
                                <p className="text-xl font-black text-neutral-900">070-4346-1844</p>
                            </div>
                            <div className="p-8 border border-neutral-200 rounded-xl bg-white">
                                <Phone className="w-6 h-6 text-cyan-600 mb-4" />
                                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Fax</p>
                                <p className="text-xl font-black text-neutral-900">031-8016-3510</p>
                            </div>
                            <div className="p-8 border border-neutral-200 rounded-xl bg-white">
                                <Mail className="w-6 h-6 text-cyan-600 mb-4" />
                                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Email</p>
                                <p className="text-base font-black text-neutral-900">hs-tech@hs-tech.co.kr</p>
                            </div>
                            <div className="p-8 border border-neutral-200 rounded-xl bg-white">
                                <MapPin className="w-6 h-6 text-cyan-600 mb-4" />
                                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Address</p>
                                <p className="text-sm font-bold text-neutral-900 leading-relaxed">D-410, 670 Daewangpangyo-ro,<br />Bundang-gu, Seongnam-si,<br />Gyeonggi-do, Korea 13494</p>
                            </div>
                        </div>
                        <div className="mt-8 p-6 border border-neutral-100 rounded-xl bg-neutral-50 text-center">
                            <p className="text-xs text-neutral-400 uppercase tracking-widest">HS TECH Co., Ltd. · Business Reg. 144-81-08640 · Pangyo Techno Valley</p>
                        </div>
                    </div>
                </CatalogPage>
            )}

            {/* Fallback */}
            {!ALL_TABS.includes(activeTab) && (
                <CatalogPage currentTab="cover">
                    <CoverView />
                </CatalogPage>
            )}
        </>
    )
}

export default function HSTechViewerPage() {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-white flex items-center justify-center text-neutral-900 font-black tracking-widest uppercase text-2xl">Loading...</div>}>
            <HSTechContent />
        </Suspense>
    )
}
