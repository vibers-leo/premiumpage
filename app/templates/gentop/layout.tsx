'use client'

import React, { useState, useEffect, useCallback, useRef, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Globe, Grid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GENTOP_MENU } from './data'

function GentopLayoutContent({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Generate SLIDES dynamically to ensure fresh data on every render (or memoized)
    const SLIDES = useMemo(() => {
        const slides: { catId: string; id: string; label: string; href: string }[] = []
        // Cover Slide
        slides.push({ catId: 'cover', id: 'cover', label: 'HOME', href: '/templates/gentop?tab=cover' })

        GENTOP_MENU.forEach(brand => {
            brand.items.forEach(item => {
                if (item.subs && item.subs.length > 0) {
                    item.subs.forEach(sub => {
                        slides.push({
                            catId: item.id,
                            id: sub.id,
                            label: sub.label,
                            href: `/templates/gentop?category=${item.id}&tab=${sub.id}`
                        })
                    })
                } else {
                    slides.push({
                        catId: item.id,
                        id: item.id,
                        label: item.label,
                        href: item.href
                    })
                }
            })
        })
        return slides
    }, [])

    const lastScrollTime = useRef(0)

    // Current State
    const activeCate = searchParams.get('category')
    const activeTab = searchParams.get('tab')

    // Find Index
    const activeSlideIndex = useMemo(() => {
        if (!activeTab) return 0
        const idx = SLIDES.findIndex(s => s.id === activeTab)
        return idx === -1 ? 0 : idx
    }, [activeTab, SLIDES])

    const currentSlide = SLIDES[activeSlideIndex]
    const totalSlides = SLIDES.length

    const navigateTo = useCallback((index: number) => {
        if (index < 0 || index >= totalSlides) return
        const target = SLIDES[index]
        router.push(target.href)
    }, [router, totalSlides, SLIDES])

    const handleWheel = useCallback((e: WheelEvent) => {
        const now = Date.now()
        if (now - lastScrollTime.current < 500) return
        if (Math.abs(e.deltaY) < 30) return

        lastScrollTime.current = now

        if (e.deltaY > 0) {
            navigateTo(activeSlideIndex + 1)
        } else if (e.deltaY < 0) {
            navigateTo(activeSlideIndex - 1)
        }
    }, [activeSlideIndex, navigateTo])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault()
            navigateTo(activeSlideIndex + 1)
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault()
            navigateTo(activeSlideIndex - 1)
        }
    }, [activeSlideIndex, navigateTo])

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false })
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleWheel, handleKeyDown])

    // Prevent rendering if SLIDES is empty (should not happen)
    if (SLIDES.length === 0) return null

    return (
        <div className="h-screen w-screen overflow-hidden bg-slate-900 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white relative flex">

            {/* 1. Permanent Left Sidebar (Navigation) */}
            <aside className="w-[260px] h-full bg-slate-900/95 backdrop-blur-md border-r border-slate-800 flex flex-col z-[100] flex-shrink-0 relative shadow-2xl">
                {/* Logo */}
                <div className="p-8 pb-8 pt-10 flex-shrink-0">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-black">G</div>
                        <span className="text-xl font-black text-white tracking-tight">GENTOP</span>
                    </Link>
                </div>

                {/* Nav List */}
                <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-8 scrollbar-hide pb-20">
                    {/* Home Link */}
                    <div>
                        <Link
                            href="/"
                            className={cn(
                                "text-sm font-bold uppercase tracking-wider block transition-colors py-2",
                                activeTab === 'cover' ? "text-indigo-400" : "text-slate-500 hover:text-white"
                            )}
                        >
                            HOME
                        </Link>
                    </div>

                    {/* Brand Menu */}
                    {GENTOP_MENU.map(brand => brand.items.map(item => (
                        <div key={item.id}>
                            {/* Main Category Label */}
                            <Link
                                href={item.subs && item.subs.length > 0 ? `/templates/gentop?category=${item.id}&tab=${item.subs[0].id}` : item.href}
                                className={cn(
                                    "block text-xs font-black uppercase tracking-[0.2em] mb-3 hover:text-indigo-400 transition-colors cursor-pointer",
                                    activeCate === item.id ? "text-indigo-500" : "text-slate-600"
                                )}
                            >
                                {item.label}
                            </Link>

                            <div className="space-y-1 pl-1 border-l border-slate-800">
                                {item.subs ? item.subs.map(sub => (
                                    <Link
                                        key={sub.id}
                                        href={`/templates/gentop?category=${item.id}&tab=${sub.id}`}
                                        className={cn(
                                            "block text-sm py-1.5 pl-4 border-l-2 transition-all",
                                            activeTab === sub.id
                                                ? "border-indigo-500 text-white font-bold bg-white/5 rounded-r"
                                                : "border-transparent text-slate-400 hover:text-white"
                                        )}
                                        scroll={false}
                                    >
                                        {sub.label}
                                    </Link>
                                )) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block text-sm py-1.5 pl-4 border-l-2 transition-all",
                                            activeTab === item.id
                                                ? "border-indigo-500 text-white font-bold bg-white/5 rounded-r"
                                                : "border-transparent text-slate-400 hover:text-white"
                                        )}
                                        scroll={false}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        </div>
                    )))}
                </nav>

                {/* Footer Info */}
                <div className="p-6 border-t border-slate-800 text-[10px] text-slate-600 flex-shrink-0 bg-slate-900">
                    © 2026 GENTOP Corp.<br />All rights reserved.
                </div>
            </aside>

            {/* 2. Main Content Area */}
            <main className="flex-1 h-full relative bg-white overflow-hidden z-10">

                {/* Top Controls */}
                <div className="absolute top-6 right-6 z-50 flex gap-3 pointer-events-auto">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur shadow-sm border border-slate-200 text-xs font-bold hover:bg-slate-900 hover:text-white transition-all">
                        <Globe className="w-3.5 h-3.5" /> KR
                    </button>
                </div>

                {/* Content Render (Children) */}
                {children}

                {/* Bottom Bar (Progress) */}
                <div className="absolute bottom-0 left-0 right-0 z-40 p-8 flex items-end justify-between pointer-events-none bg-gradient-to-t from-white/90 via-white/50 to-transparent h-32">
                    <div className="flex flex-col gap-1">
                        <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                            {currentSlide?.label}
                        </div>
                        <div className="text-3xl font-black text-slate-900 leading-none">
                            {(activeSlideIndex + 1).toString().padStart(2, '0')}
                            <span className="text-sm text-slate-400 ml-1 font-medium">/ {totalSlides.toString().padStart(2, '0')}</span>
                        </div>
                    </div>

                    <div className="w-1/3 h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                            style={{ width: `${((activeSlideIndex + 1) / totalSlides) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Arrow Controls */}
                <button
                    onClick={() => navigateTo(activeSlideIndex - 1)}
                    disabled={activeSlideIndex === 0}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 shadow-xl border border-slate-100 text-slate-800 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all z-40"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => navigateTo(activeSlideIndex + 1)}
                    disabled={activeSlideIndex === totalSlides - 1}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 shadow-xl border border-slate-100 text-slate-800 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all z-40"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

            </main>

        </div>
    )
}

export default function GentopViewerLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-slate-900 flex items-center justify-center text-white">Loading Layout...</div>}>
            <GentopLayoutContent>{children}</GentopLayoutContent>
        </Suspense>
    )
}
