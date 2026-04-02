'use client'

import React, { useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation'
import { CATEGORY_INFO, SUB_CATEGORIES, DB } from '../../data'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChevronRight, ExternalLink } from 'lucide-react'

function CategoryContent() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const category = params.category as string

    // Get active tab from URL or default to 'information'
    const activeTab = searchParams.get('tab') || 'information'

    // Helper to change tab
    // We scroll to top smoothly when changing tabs for better UX
    const setActiveTab = (tab: string) => {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('tab', tab)
        router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
    }

    // Find current active category info
    const info = CATEGORY_INFO[category] || {
        title: category.toUpperCase(),
        desc: "Product descriptions coming soon.",
        images: []
    }

    // Get products and sub-categories
    const categoryProducts = DB[category] || []
    const subCategories = SUB_CATEGORIES[category] || []

    // Determine which accordion should be expanded (for logic compatibility, though UI is changed)
    const expandedCategory = useMemo(() => {
        if (subCategories.some(sub => sub.id === activeTab)) {
            return activeTab
        }
        const activeProduct = categoryProducts.find(p => p.id === activeTab)
        if (activeProduct && activeProduct.category) {
            return activeProduct.category
        }
        return null
    }, [activeTab, subCategories, categoryProducts])

    // VAISALA Sub-menu items (Static for Vaisala view)
    const VAISALA_SUBS = [
        { id: 'humidity', label: 'HUMIDITY' },
        { id: 'dewpoint', label: 'DEWPOINT' },
        { id: 'oil', label: 'MOISTURE IN OIL' },
        { id: 'co2', label: 'CARBON DIOXIDE' },
        { id: 'h2o2', label: 'H2O2' },
        { id: 'weather', label: 'WEATHER' },
        { id: 'pressure', label: 'PRESSURE' },
        { id: 'cms', label: 'CMS' },
    ]

    return (
        <div className="w-full bg-white font-sans text-slate-900">


            {/* 2. Navigation Tabs (Blue Bar - Products & Services) */}
            <div className="w-full bg-[#3b6db0] border-b border-[#2c5282]">
                <div className="max-w-[1920px] mx-auto flex px-6 md:px-12">
                    <div className="flex-1">
                        <button className="w-full py-4 text-center font-bold text-sm md:text-lg bg-[#eef4fb] text-[#2c5282] border-t-4 border-[#2c5282]">
                            Products & Services
                        </button>
                    </div>
                    <div className="flex-1 border-l border-white/20">
                        <Link href="/templates/hs-tech/products/semicon" className="block w-full h-full">
                            <button className="w-full h-full py-4 text-center text-white font-bold text-sm md:text-lg hover:bg-white/10 transition-colors">
                                Applications & Solution
                            </button>
                        </Link>
                    </div>
                    <div className="flex-1 border-l border-white/20">
                        <Link href="https://blog.naver.com/hs-tech-vaisala" target="_blank" className="block w-full h-full">
                            <button className="w-full h-full py-4 text-center text-white font-bold text-sm md:text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                HS TECH Blog <ExternalLink className="w-4 h-4 opacity-70" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 3. Sub-Category Menu (Teal Bar - Sibling Categories) */}
            <div className="w-full bg-[#4abebc] shadow-md relative z-10">
                <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                    <div className="flex flex-wrap items-center justify-start gap-1">
                        {VAISALA_SUBS.map((item) => (
                            <Link
                                key={item.id}
                                href={`/templates/hs-tech/products/${item.id}`}
                                className={cn(
                                    "px-4 md:px-6 py-3 text-xs md:text-sm font-bold text-white uppercase transition-colors relative",
                                    category === item.id
                                        ? "bg-white text-[#4abebc]"
                                        : "hover:bg-white/20"
                                )}
                            >
                                {item.label}
                                {category === item.id && (
                                    <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Main Content Area */}
            <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">

                {/* Clean Layout: Full Width Content */}
                <div className="w-full space-y-10">

                    {/* Header Area: Title & Chip Tabs */}
                    <div className="space-y-6 border-b border-slate-100 pb-8">
                        {activeTab === 'information' ? (
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
                                {info.title}
                            </h2>
                        ) : subCategories.find(s => s.id === activeTab) ? (
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
                                {subCategories.find(s => s.id === activeTab)?.title}
                            </h2>
                        ) : (
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
                                {categoryProducts.find(p => p.id === activeTab)?.title || info.title}
                            </h2>
                        )}

                        {/* NEW CHIP TABS - Replaces the old box tabs */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => setActiveTab('information')}
                                className={cn(
                                    "px-5 py-2 rounded-full text-sm font-bold transition-all border shadow-sm",
                                    activeTab === 'information'
                                        ? "bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900 ring-offset-2"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-[#4abebc] hover:text-[#4abebc]"
                                )}
                            >
                                Information
                            </button>

                            {/* Divider */}
                            <div className="w-px h-6 bg-slate-200 mx-2" />

                            {subCategories.map((sub) => {
                                const isExpanded = expandedCategory === sub.id
                                const isActive = activeTab === sub.id || isExpanded
                                return (
                                    <button
                                        key={sub.id}
                                        onClick={() => setActiveTab(sub.id)}
                                        className={cn(
                                            "px-5 py-2 rounded-full text-sm font-bold transition-all border shadow-sm",
                                            isActive
                                                ? "bg-[#4abebc] text-white border-[#4abebc] ring-2 ring-[#4abebc] ring-offset-2"
                                                : "bg-white text-slate-600 border-slate-200 hover:border-[#4abebc] hover:text-[#4abebc]"
                                        )}
                                    >
                                        {sub.title}
                                    </button>
                                )
                            })}
                        </div>
                    </div>


                    {/* CONTENT DISPLAY */}
                    {activeTab === 'information' ? (
                        /* --- Information View --- */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                {/* Left: Image (Larger now) */}
                                <div className="w-full md:w-1/2 flex justify-center bg-slate-50 p-8 items-center border border-slate-100 rounded-2xl shadow-inner">
                                    {info.images && info.images[0] ? (
                                        <div className="relative w-full aspect-[4/3]">
                                            <Image
                                                src={info.images[0]}
                                                alt={info.title}
                                                fill
                                                className="object-contain drop-shadow-xl"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-64 flex items-center justify-center text-slate-400">No Image</div>
                                    )}
                                </div>

                                {/* Right: Description */}
                                <div className="w-full md:w-1/2 space-y-8">
                                    <div className="p-8 rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50">
                                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-6 bg-[#4abebc] rounded-full" />
                                            제품 개요
                                        </h3>
                                        <div className="text-slate-600 leading-8 text-base md:text-lg break-keep font-medium">
                                            <p>{info.desc}</p>
                                        </div>
                                    </div>

                                    {/* Additional info grid? */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                            <div className="text-[#4abebc] font-black text-2xl mb-1">100%</div>
                                            <div className="text-xs font-bold text-slate-500 uppercase">Original Parts</div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                            <div className="text-[#4abebc] font-black text-2xl mb-1">24/7</div>
                                            <div className="text-xs font-bold text-slate-500 uppercase">Technical Support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : categoryProducts.find(p => p.id === activeTab) ? (
                        /* --- Single Product Detail View --- */
                        (() => {
                            const product = categoryProducts.find(p => p.id === activeTab);
                            return (
                                <div className="animate-in fade-in zoom-in-95 duration-500">
                                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                                        {/* Product Image Stage */}
                                        <div className="w-full lg:w-5/12">
                                            <div className="bg-white border border-slate-100 p-8 flex items-center justify-center rounded-2xl shadow-xl shadow-slate-200/50 sticky top-24">
                                                <div className="relative w-full aspect-square">
                                                    <Image
                                                        src={product?.image || '/placeholder.png'}
                                                        alt={product?.title || ''}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="w-full lg:w-7/12 space-y-10">
                                            <div>
                                                <div className="text-sm font-bold text-[#4abebc] mb-2 uppercase tracking-widest">
                                                    {subCategories.find(s => s.items?.some((i: any) => i.id === activeTab))?.title || 'Product'}
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                                                    {product?.title}
                                                </h2>
                                                <p className="text-lg text-slate-500 font-medium">{product?.subtitle}</p>
                                            </div>

                                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base md:text-lg break-keep bg-slate-50 p-6 rounded-xl border border-slate-100">
                                                {product?.desc}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-4 pt-4">
                                                <button className="flex-1 min-w-[200px] px-8 py-4 bg-[#3b6db0] text-white font-bold rounded-xl hover:bg-[#2c5282] transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group">
                                                    견적 문의하기
                                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                                <button className="min-w-[160px] px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                                                    카탈로그 다운로드
                                                </button>
                                            </div>

                                            {product?.specs && (
                                                <div className="pt-8">
                                                    <h3 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-3 mb-6 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-slate-900 rounded-full" />
                                                        Technical Specification
                                                    </h3>
                                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                                        <table className="w-full text-sm text-left">
                                                            <tbody>
                                                                {product.specs.map((spec: any, idx: number) => (
                                                                    <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                                                        <th className="py-4 px-6 font-semibold text-slate-700 w-1/3 bg-slate-50/50 border-r border-slate-100">{spec.label}</th>
                                                                        <td className="py-4 px-6 text-slate-600">{spec.value}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    ) : (
                        /* --- Product Grid View (Sub-Category List) --- */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-10 text-center max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                                    {subCategories.find(s => s.id === activeTab)?.title || 'Products'}
                                </h2>
                                <p className="text-slate-500 leading-relaxed">
                                    {subCategories.find(s => s.id === activeTab)?.desc}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {categoryProducts
                                    .filter(p => !p.category || p.category === activeTab || activeTab === 'all')
                                    .map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => setActiveTab(product.id)}
                                            className="group cursor-pointer flex flex-col h-full bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-100 transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="aspect-square bg-slate-50 p-6 flex items-center justify-center relative overflow-hidden">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    width={200}
                                                    height={200}
                                                    className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#4abebc] transition-colors">{product.title}</h3>
                                                <p className="text-xs font-medium text-slate-400 mb-3">{product.subtitle}</p>
                                                <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#4abebc]">
                                                    View Details <ChevronRight className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {categoryProducts.filter(p => !p.category || p.category === activeTab).length === 0 && (
                                <div className="py-24 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                    <p>해당 카테고리에 등록된 제품이 없습니다.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function CategoryPage() {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-white flex items-center justify-center text-slate-900">Loading Product Category...</div>}>
            <CategoryContent />
        </Suspense>
    )
}
