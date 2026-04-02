'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Globe, Zap, Shield, ChevronRight, Menu, X,
    Moon, Sun, ChevronLeft, ArrowRight, ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * EMT Premium Catalog Engine
 * A highly customizable, feature-rich electronic catalog template.
 * Supports: Dark/Light modes, i18n, Section Navigation (Pagination style), Responsive Design.
 */

export interface Product {
    id: string
    name: string
    category: string
    description: string
    specs: {
        label: string
        value: string
    }[]
    imageUrl?: string
}

export interface EmtTemplateProps {
    companyName?: string
    tagline?: string
    products?: Product[]
    defaultLanguage?: 'ko' | 'en'
    defaultThemeMode?: 'dark' | 'light'
    brandColor?: 'blue' | 'rose' | 'amber' | 'emerald' | 'violet'
}

export function EmtOriginalTemplate({
    companyName = 'EMT Global Tech',
    tagline = 'Leading the Future Mobility Industry',
    products = [],
    defaultLanguage = 'ko',
    defaultThemeMode = 'dark',
    brandColor = 'blue'
}: EmtTemplateProps) {
    // --- State ---
    const [lang, setLang] = useState<'ko' | 'en'>(defaultLanguage)
    const [isDark, setIsDark] = useState(defaultThemeMode === 'dark')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<string>('all')
    const [currentSection, setCurrentSection] = useState(0)

    // Sections for Navigation
    const sections = ['home', 'features', 'products', 'contact']

    // --- Content Dictionary ---
    const content = {
        ko: {
            nav: { home: '홈', features: '특징', products: '제품', contact: '문의' },
            hero: { cta: '제품 살펴보기' },
            features: { title: '핵심 가치', desc: '우리가 제공하는 최고의 솔루션' },
            products: { title: '제품 라인업', desc: '혁신적인 기술로 완성된 제품을 만나보세요.', all: '전체' },
            contact: { title: '문의하기', desc: '비즈니스 파트너가 되어주세요.', button: '견적 요청하기' },
            common: { next: '다음', prev: '이전', details: '상세 보기', dark: '다크모드', light: '라이트모드' },
            values: {
                global: { label: '글로벌 표준', desc: '세계 시장이 인정하는 품질' },
                innovation: { label: '기술 혁신', desc: '끊임없는 R&D 투자' },
                reliability: { label: '신뢰성', desc: '엄격한 품질 관리 시스템' }
            }
        },
        en: {
            nav: { home: 'Home', features: 'Features', products: 'Products', contact: 'Contact' },
            hero: { cta: 'Explore Products' },
            features: { title: 'Core Values', desc: 'Best solutions we provide' },
            products: { title: 'Product Lineup', desc: 'Discover our innovative products.', all: 'All' },
            contact: { title: 'Contact Us', desc: 'Become our business partner.', button: 'Request Quote' },
            common: { next: 'Next', prev: 'Prev', details: 'View Details', dark: 'Dark', light: 'Light' },
            values: {
                global: { label: 'Global Standard', desc: 'Quality recognized worldwide' },
                innovation: { label: 'Innovation', desc: 'Constant R&D investment' },
                reliability: { label: 'Reliability', desc: 'Strict QC system' }
            }
        }
    }
    const t = content[lang]

    // --- Theme Config ---
    const colors = {
        blue: { primary: 'blue', gradient: 'from-blue-600 to-indigo-600', lightAcc: 'bg-blue-50 text-blue-600' },
        rose: { primary: 'rose', gradient: 'from-rose-500 to-pink-500', lightAcc: 'bg-rose-50 text-rose-600' },
        amber: { primary: 'amber', gradient: 'from-amber-500 to-orange-500', lightAcc: 'bg-amber-50 text-amber-600' },
        emerald: { primary: 'emerald', gradient: 'from-emerald-500 to-teal-500', lightAcc: 'bg-emerald-50 text-emerald-600' },
        violet: { primary: 'violet', gradient: 'from-violet-600 to-purple-600', lightAcc: 'bg-violet-50 text-violet-600' },
    }[brandColor]

    // --- Derived Styles based on Dark/Light ---
    const bgMain = isDark ? 'bg-[#050505]' : 'bg-white'
    const textMain = isDark ? 'text-white' : 'text-gray-900'
    const textMuted = isDark ? 'text-gray-400' : 'text-gray-500'
    const borderMain = isDark ? 'border-white/10' : 'border-gray-200'
    const cardBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white'
    const navBg = isDark ? 'bg-black/80' : 'bg-white/80'

    // --- Helpers ---
    const scrollToSection = (index: number) => {
        if (index < 0 || index >= sections.length) return
        setCurrentSection(index)
        const element = document.getElementById(sections[index])
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Default Products Fallback
    const finalProducts = products.length > 0 ? products : [
        { id: '1', name: 'Sample Product 1', category: 'Category A', description: 'Sample Description', specs: [{ label: 'Spec', value: 'Value' }] }
    ]

    // Categories for Tabs
    const categories = ['all', ...Array.from(new Set(finalProducts.map(p => p.category)))]

    return (
        <div className={`min-h-screen transition-colors duration-500 ${bgMain} ${textMain} font-sans selection:bg-${colors.primary}-500/30`}>

            {/* 1. Global Navigation Bar */}
            <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-500 ${navBg} ${borderMain}`}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection(0)}>
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-bold`}>
                            {companyName?.charAt(0)}
                        </div>
                        <span className="text-lg font-bold tracking-tight hidden sm:block">{companyName}</span>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        {sections.map((sec, idx) => (
                            <button
                                key={sec}
                                onClick={() => scrollToSection(idx)}
                                className={`capitalize transition-colors ${currentSection === idx ? `text-${colors.primary}-500 font-bold` : textMuted} hover:${textMain}`}
                            >
                                {t.nav[sec as keyof typeof t.nav]}
                            </button>
                        ))}
                    </nav>

                    {/* Utilities (Theme, Lang, Mobile) */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full" onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
                            <Globe className="w-4 h-4" />
                            <span className="absolute -bottom-1 -right-1 text-[8px] font-bold uppercase">{lang}</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full" onClick={() => setIsDark(!isDark)}>
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={`md:hidden border-t ${borderMain} ${bgMain} overflow-hidden`}
                        >
                            <nav className="flex flex-col p-4 gap-2">
                                {sections.map((sec, idx) => (
                                    <button
                                        key={sec}
                                        onClick={() => { scrollToSection(idx); setMobileMenuOpen(false); }}
                                        className={`p-3 text-left rounded-lg ${currentSection === idx ? colors.lightAcc : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
                                    >
                                        <span className="font-bold">{t.nav[sec as keyof typeof t.nav]}</span>
                                    </button>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* 2. Page Content - Pagination Style Sections */}
            <main>

                {/* Section 0: Home / Hero */}
                <section id="home" className="min-h-screen flex items-center justify-center relative px-4 pt-16">
                    {/* Background Ambience */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className={`absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-${colors.primary}-500/20 rounded-full blur-[120px] animate-pulse`} />
                        <div className={`absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-${colors.primary}-400/10 rounded-full blur-[100px]`} />
                    </div>

                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 border ${colors.lightAcc} border-${colors.primary}-200 dark:border-${colors.primary}-800`}>
                                Welcome to {companyName}
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                                {tagline?.split(' ').map((word, i) => (
                                    <span key={i} className="inline-block mr-2 md:mr-4">{word}</span>
                                ))}
                            </h1>
                            <p className={`text-xl md:text-2xl ${textMuted} max-w-2xl mx-auto mb-12 font-light`}>
                                We define the new standard of the industry through innovation and passion.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg" className={`h-14 px-8 rounded-full text-lg gap-2 bg-gradient-to-r ${colors.gradient} hover:opacity-90 border-none shadow-lg shadow-${colors.primary}-500/20`} onClick={() => scrollToSection(2)}>
                                    {t.hero.cta} <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 1: Features / Values */}
                <section id="features" className={`py-32 px-4 relative ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <h2 className="text-4xl font-black mb-4">{t.features.title}</h2>
                                <p className={`text-lg ${textMuted}`}>{t.features.desc}</p>
                            </div>
                            <div className={`h-1 flex-1 max-w-sm ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full`} />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Globe, k: 'global' },
                                { icon: Zap, k: 'innovation' },
                                { icon: Shield, k: 'reliability' }
                            ].map((item, idx) => {
                                const val = t.values[item.k as keyof typeof t.values]
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-8 rounded-3xl ${cardBg} border ${borderMain} group hover:border-${colors.primary}-500 transition-all duration-300`}
                                    >
                                        <div className={`w-14 h-14 rounded-2xl ${colors.lightAcc} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{val.label}</h3>
                                        <p className={textMuted}>{val.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Section 2: Products */}
                <section id="products" className="py-32 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">{t.products.title}</h2>
                            <p className={`text-xl ${textMuted}`}>{t.products.desc}</p>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex justify-center flex-wrap gap-2 mb-12">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${activeTab === cat
                                            ? `bg-${colors.primary}-600 text-white border-transparent`
                                            : `bg-transparent ${textMuted} ${borderMain} hover:${textMain}`
                                        }`}
                                >
                                    {cat === 'all' ? t.products.all : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Product Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {finalProducts
                                .filter(p => activeTab === 'all' || p.category === activeTab)
                                .map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`group rounded-3xl overflow-hidden border ${borderMain} ${cardBg} hover:shadow-2xl transition-all duration-300`}
                                    >
                                        {/* Image Area */}
                                        <div className={`aspect-[4/3] bg-gradient-to-br ${isDark ? 'from-gray-800 to-black' : 'from-gray-100 to-white'} relative p-6 flex items-center justify-center`}>
                                            {product.imageUrl ? (
                                                <img src={product.imageUrl} alt={product.name} className="object-contain w-full h-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className={`text-4xl font-bold opacity-20 uppercase tracking-widest ${textMain}`}>
                                                    {product.name.substring(0, 2)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-8">
                                            <div className="mb-4">
                                                <span className={`text-xs font-bold uppercase tracking-wider text-${colors.primary}-500 mb-2 block`}>
                                                    {product.category}
                                                </span>
                                                <h3 className="text-2xl font-bold leading-tight group-hover:text-${colors.primary}-500 transition-colors">
                                                    {product.name}
                                                </h3>
                                            </div>
                                            <p className={`text-sm ${textMuted} mb-6 line-clamp-2`}>{product.description}</p>

                                            <div className="space-y-3 pt-6 border-t border-dashed border-gray-700/30">
                                                {product.specs.slice(0, 3).map((spec, i) => (
                                                    <div key={i} className="flex justify-between text-sm items-center">
                                                        <span className={`${textMuted} font-medium`}>{spec.label}</span>
                                                        <span className="font-bold tabular-nums">{spec.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </section>

                {/* Section 3: Contact / Footer */}
                <section id="contact" className={`py-32 px-4 relative overflow-hidden ${isDark ? 'bg-[#000]' : 'bg-gray-50'}`}>
                    <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${colors.primary}-500 to-transparent opacity-30`} />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-5xl md:text-6xl font-black mb-8">{t.contact.title}</h2>
                        <p className={`text-xl ${textMuted} mb-12`}>{t.contact.desc}</p>

                        <Button
                            className={`h-16 px-12 rounded-full text-xl font-bold bg-gradient-to-r ${colors.gradient} hover:scale-105 transition-transform shadow-xl`}
                        >
                            {t.contact.button}
                        </Button>
                    </div>
                </section>

            </main>

            {/* 3. Floating Navigation Controls (Pagination style) */}
            <div className="fixed bottom-8 right-8 z-40 hidden lg:flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full w-12 h-12 ${bgMain} ${borderMain} shadow-lg`}
                    onClick={() => scrollToSection(currentSection - 1)}
                    disabled={currentSection === 0}
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className={`flex items-center px-4 rounded-full ${bgMain} ${borderMain} border font-mono font-bold shadow-lg`}>
                    {currentSection + 1} / {sections.length}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full w-12 h-12 ${bgMain} ${borderMain} shadow-lg`}
                    onClick={() => scrollToSection(currentSection + 1)}
                    disabled={currentSection === sections.length - 1}
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
