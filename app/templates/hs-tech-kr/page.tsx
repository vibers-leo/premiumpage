'use client'

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { ArrowRight, FileText, Download, ChevronRight, ChevronLeft, Phone, Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { DB, CATEGORY_INFO, SUB_CATEGORIES, BRANDS } from './data'
import { cn } from '@/lib/utils'
import ProductSpecs from './components/ProductSpecs'
import CoverView from './components/CoverView'
import ProductIntro from './components/ProductIntro'

// Premium UI Components
import { BentoGrid, BentoGridItem } from './components/ui/BentoGrid'
import { BackgroundGradient } from './components/ui/background-gradient'
import { TracingBeam } from './components/ui/TracingBeam'
import { HoverEffect } from './components/ui/card-hover-effect'

const PAGE_FLOW = [
    { id: 'cover', label: '홈' },
    { id: 'about', label: '회사소개' },
    { id: 'business', label: '사업영역' },
    { id: 'products', label: '제품정보' },
    { id: 'contact', label: '고객지원' }
]

const findProduct = (id: string, category: string) => {
    if (DB[category]) {
        const found = DB[category].find(p => p.id === id)
        if (found) return found
    }
    for (const cat in DB) {
        const found = DB[cat].find(p => p.id === id)
        if (found) return found
    }
    return null
}

const CatalogPage = ({ title, children, currentTab, breadcrumb, hideUI }: {
    title: string,
    children: React.ReactNode,
    currentTab: string,
    breadcrumb?: { label: string, href: string },
    hideUI?: boolean
}) => {
    const currentIndex = PAGE_FLOW.findIndex(p => p.id === currentTab)
    const isMainTab = currentIndex !== -1
    const safeIndex = isMainTab ? currentIndex : 0
    const prevPage = isMainTab && safeIndex > 0 ? PAGE_FLOW[safeIndex - 1] : null
    const nextPage = isMainTab && safeIndex < PAGE_FLOW.length - 1 ? PAGE_FLOW[safeIndex + 1] : null

    const [direction, setDirection] = useState(0)
    const prevIndexRef = useRef(safeIndex)

    useEffect(() => {
        if (safeIndex > prevIndexRef.current) setDirection(1)
        else if (safeIndex < prevIndexRef.current) setDirection(-1)
        prevIndexRef.current = safeIndex
    }, [safeIndex])

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.98
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.98
        })
    }

    return (
        <div className="min-h-screen w-full dark:bg-neutral-950 bg-white antialiased relative overflow-hidden dark:text-slate-300 text-slate-700 transition-colors duration-300">
            {!hideUI && (
                <div className="fixed top-8 left-8 z-[50] mix-blend-difference">
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
                        <Link href="/templates/hs-tech-kr?tab=cover" className="hover:text-cyan-400 transition-colors">Home</Link>
                        {breadcrumb && (
                            <>
                                <ChevronRight className="w-3 h-3" />
                                <Link href={breadcrumb.href} className="hover:text-cyan-400 transition-colors">{breadcrumb.label}</Link>
                            </>
                        )}
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-cyan-500 font-bold">{title}</span>
                    </div>
                </div>
            )}

            <main className="relative z-10 w-full min-h-screen">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentTab}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 35 },
                            opacity: { duration: 0.3 }
                        }}
                        className="w-full min-h-screen"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {!hideUI && (
                <div className="fixed bottom-8 right-8 z-[50] flex items-center gap-4">
                    <div className="hidden md:flex bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-slate-400 shadow-2xl">
                        <span className="text-cyan-400 mr-2">{String(safeIndex + 1).padStart(2, '0')}</span>
                        <span className="opacity-30">/</span>
                        <span className="ml-2">{String(PAGE_FLOW.length).padStart(2, '0')}</span>
                    </div>

                    <div className="flex bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl gap-1">
                        <Link
                            href={prevPage ? `/templates/hs-tech-kr?tab=${prevPage.id}` : '#'}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-400 border border-transparent hover:border-cyan-500/50",
                                !prevPage && "opacity-20 pointer-events-none"
                            )}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <Link
                            href={nextPage ? `/templates/hs-tech-kr?tab=${nextPage.id}` : '#'}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-400 border border-transparent hover:border-cyan-500/50",
                                !nextPage && "opacity-20 pointer-events-none"
                            )}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            )}

            {!hideUI && (
                <footer className="relative z-10 w-full pt-16 pb-24 px-6 border-t dark:border-white/5 border-neutral-100 bg-neutral-50 dark:bg-neutral-950/50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-2xl font-black dark:text-white text-neutral-900 tracking-tighter uppercase italic">HS TECH</h3>
                            <p className="text-sm dark:text-slate-400 text-slate-600 max-w-sm leading-relaxed mx-auto md:mx-0">
                                환경 및 산업용 정밀 측정 솔루션의 글로벌 리더. 최상의 품질과 정확도를 제공합니다.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-500">문의하기</h4>
                            <div className="space-y-2 text-sm font-mono">
                                <p>T. 070-4346-1844</p>
                                <p>E. hs-tech@hs-tech.co.kr</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-500">Address</h4>
                            <p className="text-sm leading-relaxed">
                                경기도 성남시 분당구 대왕판교로 670 유스페이스2 D동 410호
                            </p>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t dark:border-white/5 border-neutral-200 text-center">
                        <p className="text-[10px] dark:text-slate-600 text-slate-400 uppercase tracking-widest font-black">
                            &copy; {new Date().getFullYear()} HS TECH INDUSTRIAL. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </footer>
            )}
        </div>
    )
}

function HSTechKRContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const activeTab = searchParams.get('tab') || 'cover'
    const productId = searchParams.get('product')
    const categoryId = searchParams.get('category') || activeTab

    const categoryInfo = CATEGORY_INFO[activeTab]
    const brandData = BRANDS[activeTab as keyof typeof BRANDS]
    const selectedProduct = productId ? findProduct(productId, categoryId) : null

    if (productId && selectedProduct) {
        return (
            <CatalogPage title={selectedProduct.title} currentTab={activeTab} breadcrumb={{ label: 'Back', href: `/templates/hs-tech-kr?tab=${categoryId}` }}>
                <div className="pt-12 pb-20">
                    <ProductIntro title={selectedProduct.title} subtitle={selectedProduct.subtitle || ''} image={selectedProduct.image} specs={selectedProduct.specs || []} />
                    <div className="max-w-6xl mx-auto px-6 mt-12">
                        <ProductSpecs product={selectedProduct} />
                    </div>
                </div>
            </CatalogPage>
        )
    }

    if (activeTab === 'cover') {
        return (
            <CatalogPage title="Home" currentTab="cover" hideUI>
                <CoverView />
            </CatalogPage>
        )
    }

    if (activeTab === 'about') {
        return (
            <CatalogPage title="회사소개" currentTab="about">
                <div className="py-20 px-6 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic">Company Profile</h2>
                    <p className="text-lg text-slate-400 mb-12 leading-relaxed">압포적인 기술력으로 산업용 정밀 계측 시장을 선도합니다.</p>
                    <BentoGrid>
                        <BentoGridItem title="글로벌 파트너쉽" description="VAISALA, KNICK 등 세계 최고 브랜드의 공식 한국 대리점" header={<div className="h-40 bg-neutral-900 rounded-xl" />} icon={<Globe className="w-4 h-4" />} className="md:col-span-2" />
                        <BentoGridItem title="정밀 보정 서비스" description="사후 관리 및 정밀 교정 서비스 제공" header={<div className="h-40 bg-neutral-800 rounded-xl" />} icon={<CheckCircle2 className="w-4 h-4" />} className="md:col-span-1" />
                    </BentoGrid>
                </div>
            </CatalogPage>
        )
    }

    if (activeTab === 'business') {
        return (
            <CatalogPage title="사업영역" currentTab="business">
                <div className="py-20 px-6 max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter uppercase italic italic">Business Scope</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['반도체', '이차전지', '초정밀 HVAC'].map((b, i) => (
                            <BackgroundGradient key={i} className="p-10 rounded-[22px] bg-neutral-900">
                                <h3 className="text-xl font-bold mb-4">{b}</h3>
                                <p className="text-sm text-slate-400">최첨단 솔루션으로 공정 효율을 극대화합니다.</p>
                            </BackgroundGradient>
                        ))}
                    </div>
                </div>
            </CatalogPage>
        )
    }

    if (activeTab === 'products') {
        const portfolioItems = Object.entries(BRANDS).map(([key, data]: [string, any]) => ({
            title: data.label,
            description: data.desc,
            link: `/templates/hs-tech-kr?tab=${key}`,
            image: data.logo
        }))
        return (
            <CatalogPage title="제품정보" currentTab="products">
                <div className="max-w-6xl mx-auto px-8 py-20">
                    <h2 className="text-4xl md:text-6xl font-black text-center mb-12 tracking-tighter uppercase italic">Our Brands</h2>
                    <HoverEffect items={portfolioItems} />
                </div>
            </CatalogPage>
        )
    }

    if (brandData || categoryInfo) {
        const title = brandData?.label || categoryInfo?.title
        const items = categoryInfo ? (SUB_CATEGORIES[activeTab] || []) : (brandData?.categories || [])
        return (
            <CatalogPage title={title} currentTab={activeTab} breadcrumb={{ label: '전체제품', href: '/templates/hs-tech-kr?tab=products' }}>
                <div className="py-20 px-6 max-w-6xl mx-auto">
                    <h1 className="text-4xl font-black mb-12 border-l-4 border-cyan-500 pl-6 uppercase italic tracking-tighter">{title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {items.map((item: any) => {
                            const id = typeof item === 'string' ? item : item.id
                            const cat = CATEGORY_INFO[id] || item
                            return (
                                <Link key={id} href={`/templates/hs-tech-kr?category=${id}&tab=${id}`}>
                                    <BackgroundGradient className="p-8 rounded-[22px] bg-neutral-900 group">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors uppercase italic">{cat.title || cat.label}</h3>
                                        <p className="text-sm text-slate-500 truncate">{cat.desc}</p>
                                    </BackgroundGradient>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </CatalogPage>
        )
    }

    if (activeTab === 'contact') {
        return (
            <CatalogPage title="고객지원" currentTab="contact">
                <div className="py-20 px-6 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic">Contact Us</h2>
                    <p className="text-xl text-slate-400 mb-16">기술 문의 및 견적 요청을 위해 연락주세요.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-10 border border-white/5 bg-neutral-900/50 rounded-2xl hover:border-cyan-500 transition-all">
                            <Phone className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
                            <p className="font-mono">070-4346-1844</p>
                        </div>
                        {/* ... Other Contact Items ... */}
                    </div>
                </div>
            </CatalogPage>
        )
    }

    return (
        <CatalogPage title="홈" currentTab="cover" hideUI>
            <CoverView />
        </CatalogPage>
    )
}

export default function HSTechKRViewerPage() {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-neutral-950 flex items-center justify-center text-white font-black uppercase italic">Loading...</div>}>
            <HSTechKRContent />
        </Suspense>
    )
}
