'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Facebook, Instagram, Youtube, ChevronRight, Phone, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

function HSTechLayoutContent({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [searchParams])

    const activeTab = searchParams.get('tab') || 'cover'

    const MAIN_MENU = [
        { label: 'Home', href: '/templates/hs-tech?tab=cover', tab: 'cover', desc: 'Main Page' },
        { label: 'About', href: '/templates/hs-tech?tab=about', tab: 'about', desc: 'Company Overview' },
        { label: 'Business', href: '/templates/hs-tech?tab=business', tab: 'business', desc: 'Solutions' },
        { label: 'Products', href: '/templates/hs-tech?tab=products', tab: 'products', desc: 'Product Lines' },
        { label: 'Contact', href: '/templates/hs-tech?tab=contact', tab: 'contact', desc: 'Get in Touch' },
    ]

    const BRAND_MENU = [
        { label: 'VAISALA', href: '/templates/hs-tech?tab=vaisala', desc: 'Humidity, Dewpoint, CO2, Oil' },
        { label: 'SETRA', href: '/templates/hs-tech?tab=setra', desc: 'Differential & Industrial Pressure' },
        { label: 'JUMO', href: '/templates/hs-tech?tab=jumo', desc: 'Liquid Analysis & Control' },
    ]

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-500 selection:text-white relative">

            {/* 1. Header (Fixed, Light) - Z-Index 100 */}
            <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 h-20 bg-white border-b border-neutral-200 transition-all">
                {/* Logo */}
                <Link href="/templates/hs-tech?tab=cover" className="flex items-center group shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/templates/hs-tech/images/products/f038c293907b8.png" alt="HS TECH" width={150} className="h-auto object-contain group-hover:opacity-70 transition-opacity" />
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-10">
                    {MAIN_MENU.map((item) => {
                        const isActive = activeTab === item.tab ||
                            (item.tab === 'products' && ['vaisala', 'setra', 'jumo', 'humidity', 'dewpoint', 'co2', 'oil', 'barometer', 'weather', 'h2o2', 'cms'].includes(activeTab))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-xs font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-cyan-600' : 'text-neutral-400 hover:text-neutral-900'}`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </header>

            {/* 2. Hamburger Button - Z-Index 200 */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="fixed top-4 right-6 md:right-12 z-[200] p-2 mt-2 hover:bg-neutral-100 rounded-md transition-colors group md:hidden"
                aria-label="Toggle Menu"
            >
                <div className="relative w-8 h-8">
                    <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-300", isMenuOpen ? "rotate-90 opacity-0" : "opacity-100 rotate-0")}>
                        <Menu className="w-8 h-8 text-neutral-900 group-hover:text-cyan-600 transition-colors" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300" style={{ opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                        <X className="w-8 h-8 text-neutral-900 group-hover:text-cyan-600 transition-colors" />
                    </div>
                </div>
            </button>

            {/* 3. Full Screen Overlay Menu - Z-Index 101 */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[101] bg-white flex flex-col md:flex-row text-neutral-900"
                    >
                        {/* Left: Info Area (Desktop Only) */}
                        <div className="hidden md:flex w-1/3 bg-neutral-50 border-r border-neutral-200 p-16 flex-col justify-between">
                            <div>
                                <h3 className="text-cyan-600 font-bold tracking-widest uppercase text-sm mb-4">HS TECH Corp.</h3>
                                <p className="text-4xl font-black leading-tight tracking-tight text-neutral-900">
                                    Smart Sensing<br />
                                    Solution Provider
                                </p>
                            </div>
                            <div className="space-y-8 text-sm text-neutral-500">
                                <div>
                                    <strong className="text-neutral-900 block mb-2 font-bold uppercase tracking-wider text-xs flex items-center gap-2"><MapPin className="w-3 h-3" /> Address</strong>
                                    D-410, 670 Daewangpangyo-ro,<br />Bundang-gu, Seongnam-si, Korea
                                </div>
                                <div>
                                    <strong className="text-neutral-900 block mb-2 font-bold uppercase tracking-wider text-xs flex items-center gap-2"><Phone className="w-3 h-3" /> Contact</strong>
                                    070-4346-1844
                                </div>
                                <div className="flex gap-6 pt-4 border-t border-neutral-200">
                                    <Facebook className="w-5 h-5 hover:text-cyan-600 cursor-pointer transition-colors" />
                                    <Instagram className="w-5 h-5 hover:text-cyan-600 cursor-pointer transition-colors" />
                                    <Youtube className="w-5 h-5 hover:text-cyan-600 cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Right: Menu Links */}
                        <div className="flex-1 p-8 md:p-24 bg-white overflow-y-auto w-full">
                            <div className="max-w-5xl mx-auto h-full flex flex-col justify-center">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                                    {/* Column 1: Main Menu */}
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8 border-b border-neutral-200 pb-4">Menu</h3>
                                        <nav className="space-y-4 md:space-y-6">
                                            {MAIN_MENU.map((item, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ x: 16, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.05 * idx, duration: 0.25 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="group block"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-neutral-200 group-hover:text-neutral-900 transition-colors">
                                                            {item.label}
                                                        </h2>
                                                        <p className="text-sm text-neutral-400 font-light group-hover:text-cyan-600 transition-colors pl-1">
                                                            {item.desc}
                                                        </p>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Column 2: Brands */}
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8 border-b border-neutral-200 pb-4">Official Partners</h3>
                                        <nav className="space-y-3">
                                            {BRAND_MENU.map((brand, idx) => (
                                                <motion.div
                                                    key={brand.label}
                                                    initial={{ x: 16, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.25 + (0.05 * idx), duration: 0.25 }}
                                                >
                                                    <Link
                                                        href={brand.href}
                                                        className="group flex items-center justify-between p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-all border border-neutral-200 hover:border-cyan-500/40"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <div className="flex flex-col">
                                                            <h4 className="text-lg font-bold text-neutral-900 group-hover:text-cyan-600 transition-colors tracking-tight">{brand.label}</h4>
                                                            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{brand.desc}</span>
                                                        </div>
                                                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-cyan-600 transition-colors" />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </nav>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 4. Main Content */}
            <main className="relative pt-20">
                {children}
            </main>

        </div>
    )
}

export default function HSTechViewerLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-white flex items-center justify-center text-neutral-900">Loading...</div>}>
            <HSTechLayoutContent>{children}</HSTechLayoutContent>
        </Suspense>
    )
}
