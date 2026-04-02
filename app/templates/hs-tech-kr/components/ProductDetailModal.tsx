'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { X, Download, FileText, ChevronRight } from 'lucide-react'
import Image from 'next/image'

import ProductSpecs from './ProductSpecs'

export default function ProductDetailModal({ product, onClose }: { product: any, onClose: () => void }) {
    const [activeImage, setActiveImage] = React.useState(product.image)

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8">
            <div className="absolute inset-0 dark:bg-neutral-950/90 bg-neutral-900/60 backdrop-blur-md" onClick={onClose}></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 w-full max-w-7xl h-full md:h-[90vh] md:rounded-3xl overflow-hidden relative shadow-2xl flex flex-col transition-colors duration-300"
            >

                {/* Header / Toolbar */}
                <div className="flex justify-between items-center p-6 border-b dark:border-neutral-800 border-neutral-200 dark:bg-neutral-900/95 bg-white/95 backdrop-blur z-20 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="md:hidden p-2 -ml-2 text-neutral-400"><ChevronRight className="rotate-180" /></button>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold dark:text-white text-neutral-900">{product.title}</h2>
                            <p className="text-sm md:text-base text-cyan-500 font-medium">{product.subtitle}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-full text-neutral-400 dark:hover:text-white hover:text-neutral-900 transition-colors">
                        <X size={28} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 relative scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">

                    {/* 1. Main Info & Gallery */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                        {/* Gallery Section (Left - 7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Main Image */}
                            <div className="aspect-video w-full relative dark:bg-white/5 bg-neutral-50 rounded-2xl overflow-hidden border dark:border-white/5 border-neutral-200 flex items-center justify-center">
                                <Image
                                    src={activeImage}
                                    fill
                                    className="object-contain p-8 md:p-12 transition-all duration-500"
                                    alt={product.title}
                                    priority
                                />
                            </div>
                            {/* Gallery Grid */}
                            {product.gallery && product.gallery.length > 0 && (
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                    {/* Include main image in gallery if not already there */}
                                    {[product.image, ...product.gallery.filter((img: string) => img !== product.image)].map((img: string, idx: number) => (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`aspect-square relative dark:bg-white/5 bg-neutral-50 rounded-xl border overflow-hidden cursor-pointer transition-all group ${activeImage === img ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'dark:border-white/5 border-neutral-200 dark:hover:border-white/20 hover:border-neutral-300'}`}
                                        >
                                            <Image
                                                src={img}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 transition-transform"
                                                alt=""
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Specs & Description (Right - 5 cols) */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-3">제품 개요</h3>
                                <p className="dark:text-neutral-300 text-neutral-600 leading-relaxed text-lg border-l-2 dark:border-neutral-700 border-neutral-200 pl-4">
                                    {product.desc}
                                </p>
                            </div>

                            <div className="dark:bg-neutral-800/30 bg-neutral-50 rounded-2xl p-6 border dark:border-white/5 border-neutral-200">
                                <h4 className="dark:text-white text-neutral-900 font-semibold mb-6 flex items-center gap-2 pb-4 border-b dark:border-white/5 border-neutral-200">
                                    <FileText size={18} className="text-cyan-500" /> 기술적 특징
                                </h4>
                                <div className="space-y-4">
                                    {product.specs?.map((s: any, i: number) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 group">
                                            <span className="text-neutral-500 text-sm font-medium uppercase">{s.label}</span>
                                            <span className="dark:text-neutral-200 text-neutral-800 font-mono text-base dark:group-hover:text-cyan-300 group-hover:text-cyan-600 transition-colors">{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all flex items-center justify-center gap-3 group">
                                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                데이터시트 다운로드
                            </button>
                        </div>
                    </div>

                    {/* 2. DETAILED CONTENT (Using ProductSpecs) */}
                    <div className="border-t dark:border-white/5 border-neutral-200 pt-16 animation-fade-in">
                        <div className="mb-10 flex items-center gap-4">
                            <div className="h-8 w-1 bg-cyan-500 rounded-full"></div>
                            <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-neutral-900">상세 사양</h3>
                        </div>
                        <ProductSpecs product={product} />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
