'use client'

import React, { Suspense } from 'react'
import { ArrowRight, FileText, Download, ChevronRight, Globe, CheckCircle2, Phone, Mail, MapPin, Factory, ShieldCheck, Cog } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { DB, CATEGORY_INFO, SUB_CATEGORIES, HANGSEONG_MENU, HISTORY_DATA } from './data'
import { cn } from '@/lib/utils'
import ProductDetailModal from './components/ProductDetailModal'
import ProductSpecs from './components/ProductSpecs'
import CoverView from './components/CoverView'
import HistoryView from './components/HistoryView'
import OverviewView from './components/OverviewView'
import LocationView from './components/LocationView'
import OrganizationView from './components/OrganizationView'
import VisionView from './components/VisionView'
import QualityView from './components/QualityView'
import EquipmentView from './components/EquipmentView'
import ProcessView from './components/ProcessView'
import CertificationView from './components/CertificationView'
import MainMenuGrid from './components/MainMenuGrid'
import ProductIntro from './components/ProductIntro'

// Premium UI Components
import { Spotlight } from './components/ui/Spotlight'
import { BentoGrid, BentoGridItem } from './components/ui/BentoGrid'
import { BackgroundGradient } from './components/ui/background-gradient'
import { TracingBeam } from './components/ui/TracingBeam'
import { HoverEffect } from './components/ui/card-hover-effect'
import { CardContainer, CardBody, CardItem } from './components/ui/3d-card'

const PAGE_FLOW = [
    { id: 'cover', label: 'Home' },
    { id: 'company', label: 'Company' },
    { id: 'process', label: 'Process' },
    { id: 'products', label: 'Products' },
    { id: 'quality', label: 'Quality' },
    { id: 'contact', label: 'Contact' }
]

// Helper to find product in DB
const findProduct = (id: string, category: string) => {
    // Try to find in specific category first
    if (DB[category]) {
        const found = DB[category].find(p => p.id === id)
        if (found) return found
    }
    // Fallback: search all
    for (const cat in DB) {
        const found = DB[cat].find(p => p.id === id)
        if (found) return found
    }
    return null
}

// Catalog Page Wrapper
const CatalogPage = ({
    title,
    children,
    currentTab,
    breadcrumb,
    hideUI
}: {
    title: string,
    children: React.ReactNode,
    currentTab: string,
    breadcrumb?: { label: string, href: string },
    hideUI?: boolean
}) => {
    // Find index in main flow
    const currentIndex = PAGE_FLOW.findIndex(p => p.id === currentTab)
    const isMainTab = currentIndex !== -1

    const safeIndex = isMainTab ? currentIndex : 0
    const prevPage = isMainTab && safeIndex > 0 ? PAGE_FLOW[safeIndex - 1] : null
    const nextPage = isMainTab && safeIndex < PAGE_FLOW.length - 1 ? PAGE_FLOW[safeIndex + 1] : null

    // Scroll to top on mount/change
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentTab])

    return (
        <div className="min-h-screen w-full dark:bg-slate-950 bg-white antialiased dark:bg-grid-white/[0.02] bg-grid-black/[0.02] relative overflow-hidden dark:text-slate-300 text-slate-700 pt-0 pb-12 transition-colors duration-300">
            {/* Sub Visual / Breadcrumb Area */}
            <div className={cn(
                "fixed top-4 left-0 right-0 z-40 px-4 md:px-12 py-4 pointer-events-none transition-opacity duration-300",
                hideUI ? "opacity-0" : "opacity-100"
            )}>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase dark:text-slate-500 text-slate-400 pointer-events-auto">
                    <Link href="/templates/hangseong?tab=cover" className="hover:text-blue-400 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    {breadcrumb && (
                        <>
                            <Link href={breadcrumb.href} className="hover:text-blue-400 transition-colors">{breadcrumb.label}</Link>
                            <ChevronRight className="w-3 h-3" />
                        </>
                    )}
                    <span className="text-blue-500 font-bold">{title}</span>
                </div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 w-full min-h-screen">
                {children}
            </main>


            {/* Premium Global Footer — Contact 페이지에만 표시 */}
            {!hideUI && currentTab === 'contact' && (
                <footer className="relative z-10 w-full pt-16 pb-24 px-6 border-t dark:border-white/5 border-slate-200 bg-slate-50 dark:bg-slate-950/50 mt-12">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-2xl font-black dark:text-white text-slate-900 tracking-tighter">HANG SEONG</h3>
                            <p className="text-sm dark:text-slate-400 text-slate-600 max-w-sm leading-relaxed mx-auto md:mx-0">
                                HANGSEONG INDUSTRIAL CO., LTD. is a precision press manufacturer with over 40 years of accumulated technology, leading the automotive motor components industry.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500">Contact</h4>
                            <div className="space-y-2 text-sm dark:text-slate-300 text-slate-700 font-medium">
                                <p className="flex items-center justify-center md:justify-start gap-2"><Phone className="w-4 h-4 text-blue-500" /> +82 51-972-9935~6</p>
                                <p className="flex items-center justify-center md:justify-start gap-2"><Mail className="w-4 h-4 text-blue-500" /> hs@hangseong.co.kr</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500">Address</h4>
                            <p className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed font-medium">
                                <MapPin className="w-4 h-4 text-blue-500 inline mr-2" />
                                1200-1 Jisa-dong, Gangseo-gu, Busan, South Korea
                            </p>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t dark:border-white/5 border-slate-200 text-center">
                        <p className="text-[10px] dark:text-slate-600 text-slate-400 uppercase tracking-widest font-bold">
                            &copy; {new Date().getFullYear()} HANG SEONG INDUSTRIAL CO., LTD. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </footer>
            )}
        </div>
    )
}

function HangseongContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const activeTab = searchParams.get('tab') || 'cover'
    const activeCategory = searchParams.get('category')

    // Data Logic
    const categoryInfo = CATEGORY_INFO[activeTab] || CATEGORY_INFO[activeCategory || '']

    // Check if we are viewing a specific list of products (SubCategory view)
    // In Hangseong data, 'products' tab has subcategories 'motor_parts', etc.
    // Use SUB_CATEGORIES to determine if current tab is a container of lists.
    const subCategories = SUB_CATEGORIES[activeTab]

    const productId = searchParams.get('product')
    const selectedProduct = productId ? findProduct(productId, activeCategory || activeTab) : null

    const [activeImg, setActiveImg] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (selectedProduct) {
            setActiveImg(selectedProduct.image)
        }
    }, [selectedProduct])

    // --- VIEW: SINGLE PRODUCT DETAIL PAGE ---
    if (selectedProduct) {
        return (
            <CatalogPage
                title={selectedProduct.title}
                currentTab={activeTab} // Keep the category tab active
                breadcrumb={{ label: 'List', href: `/templates/hangseong?category=${activeCategory || activeTab}&tab=${activeTab}` }}
            >
                <div className="py-8 px-4 md:px-12 max-w-[1400px] mx-auto min-h-[80vh] flex flex-col justify-start pt-20">
                    <ProductIntro
                        title={selectedProduct.title}
                        subtitle={selectedProduct.subtitle}
                        image={activeImg || selectedProduct.image}
                        specs={selectedProduct.specs}
                    />
                </div>
            </CatalogPage>
        )
    }

    // --- VIEW 1: COVER ---
    if (activeTab === 'cover') {
        return <CoverView />
    }

    // --- VIEW 1.5: MENU OVERVIEW ---
    if (activeTab === 'menu') {
        return <MainMenuGrid />
    }

    // --- VIEW 2: ABOUT US (Company) ---
    if (activeCategory === 'about' && activeTab === 'greeting') {
        return (
            <CatalogPage title="CEO Greeting" currentTab="about">
                <div className="py-2 px-6 lg:px-12">
                    <div className="max-w-[1200px] mx-auto">
                        {/* Standardized Header */}
                        <div className="mb-10 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                            >
                                HANG SEONG INDUSTRIAL
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-1"
                            >
                                <p className="text-base md:text-lg dark:text-blue-400 text-blue-600 font-bold">
                                    A star industry company specialized in manufacturing press products.
                                </p>
                                <p className="text-sm md:text-base dark:text-slate-400 text-slate-600">
                                    STS will become a reliable partner with faith in customers.
                                </p>
                            </motion.div>
                        </div>

                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            <div className="relative z-10 space-y-5">
                                <p className="text-sm md:text-base leading-relaxed dark:text-slate-300 text-slate-700">
                                    <strong className="dark:text-white text-slate-900">HANGSEONG INDUSTRIAL CO., LTD</strong> was established in June, 1979. We have been contributing to the development of the domestic automobile industry with technology and high-quality products accumulated for over 40 years. We have become a professional press manufacturer with industry-leading technology.
                                </p>

                                <p className="text-sm md:text-base leading-relaxed dark:text-slate-300 text-slate-700">
                                    STS is a company that produces motor parts for automobiles such as case, cover, core, and other parts. In order to meet customer needs with advanced technology and progressive efforts, we have developed cost-innovation type new technology molds. We are committed to continuous quality improvement.
                                </p>

                                <p className="text-sm md:text-base leading-relaxed dark:text-slate-300 text-slate-700">
                                    As a leading company in the 21st century based on excellent human resources and accumulated experience, we will do our best to grow. I promise to give you the opportunity and I ask for your continuous support and guidance.
                                </p>

                                {/* Refined Quote (No Box) */}
                                <div className="mt-10 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-600 before:rounded-full">
                                    <blockquote className="text-xl md:text-2xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
                                        "We promise to deliver industry-leading service, superior quality, and the most competitive prices."
                                    </blockquote>
                                    <div>
                                        <p className="text-base font-bold text-slate-900 dark:text-white">
                                            Myung-gyu Park
                                        </p>
                                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">
                                            CEO
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* High-Impact Stats Bar */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            {[
                                { val: '1979', label: 'Established' },
                                { val: '40+', label: 'Years' },
                                { val: '#1', label: 'Tech Leader' }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="text-center p-4 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-200 dark:border-white/5"
                                >
                                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{s.val}</div>
                                    <div className="text-[10px] dark:text-slate-500 text-slate-500 font-bold uppercase tracking-widest">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </CatalogPage>
        )
    }

    if (activeCategory === 'about' && activeTab === 'history') {
        return <CatalogPage title="History" currentTab="about"><HistoryView /></CatalogPage>
    }

    if (activeCategory === 'about' && activeTab === 'summary') {
        return <CatalogPage title="Summary" currentTab="about"><OverviewView /></CatalogPage>
    }

    if (activeCategory === 'about' && activeTab === 'organization') {
        return <CatalogPage title="Organization" currentTab="about"><OrganizationView /></CatalogPage>
    }

    if (activeCategory === 'about' && activeTab === 'vision') {
        return <CatalogPage title="Vision" currentTab="about"><VisionView /></CatalogPage>
    }

    if (activeCategory === 'about' && activeTab === 'location') {
        return <CatalogPage title="Directions" currentTab="about"><LocationView /></CatalogPage>
    }

    // --- QM (Quality Management) ---
    if (activeTab === 'qm' || activeTab === 'quality_mgmt') {
        return <CatalogPage title="Quality Management" currentTab="qm"><QualityView /></CatalogPage>
    }

    // --- Equipment Status ---
    if (activeTab === 'equipment' || activeTab === 'equipment_status') {
        return <CatalogPage title="Equipment Status" currentTab="equipment"><EquipmentView /></CatalogPage>
    }

    // --- Process Chart ---
    if (activeTab === 'process_chart') {
        return <CatalogPage title="Process Chart" currentTab="reliability"><ProcessView /></CatalogPage>
    }

    // --- Certification ---
    if (activeTab === 'certification') {
        return <CatalogPage title="Certification" currentTab="reliability"><CertificationView /></CatalogPage>
    }

    // --- VIEW 7: CONTACT ---
    if (activeTab === 'contact') {
        return (
            <CatalogPage title="Contact" currentTab="contact">
                <div className="py-20 px-6">
                    <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black dark:text-white text-slate-900 mb-6 tracking-tight"
                        >
                            Partner With Us
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl dark:text-slate-400 text-slate-600 mb-12 max-w-2xl"
                        >
                            We welcome inquiries for quotes, factory visits, and partnership consultations.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                            <div className="dark:bg-slate-900/50 bg-slate-50 p-8 rounded-3xl border dark:border-white/5 border-slate-200 hover:border-blue-500/50 transition-all group shadow-xl">
                                <Phone className="w-8 h-8 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2">Telephone</h3>
                                <p className="dark:text-slate-400 text-slate-600 font-medium">+82 51-972-9935~6</p>
                            </div>
                            <div className="dark:bg-slate-900/50 bg-slate-50 p-8 rounded-3xl border dark:border-white/5 border-slate-200 hover:border-blue-500/50 transition-all group shadow-xl">
                                <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2">Email</h3>
                                <p className="dark:text-slate-400 text-slate-600 font-medium">hs@hangseong.co.kr</p>
                            </div>
                            <div className="dark:bg-slate-900/50 bg-slate-50 p-8 rounded-3xl border dark:border-white/5 border-slate-200 hover:border-blue-500/50 transition-all group shadow-xl">
                                <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2">Location</h3>
                                <p className="dark:text-slate-400 text-slate-600 font-medium text-sm leading-relaxed">1200-1 Jisa-dong, Gangseo-gu, Busan, South Korea</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CatalogPage>
        )
    }

    // --- VIEW 3: GENERIC CATEGORIES (QM, Equipment, Reliability, Support) ---
    // Shows a list of sub-items (cards) if a main category is selected
    if (['qm', 'equipment', 'reliability', 'support'].includes(activeTab || '') || ['qm', 'equipment', 'reliability', 'support'].includes(activeCategory || '')) {
        // If we are at a Leaf Node (e.g. activeTab is 'quality_mgmt'), we should NOT showing the overview list.
        // But activeCategory would be 'qm'. 
        // We need to distinguish between "User clicked QM" vs "User clicked Quality Management".
        // If activeTab is equal to one of the main category IDs, show list.
        // OR if activeCategory is set but no specific sub-tab is deeper? 
        // Actually, navigation sets activeTab to the leaf ID usually.
        // Let's rely on: if activeTab is in the list of main categories, SHOW OVERVIEW.

        if (['qm', 'equipment', 'reliability', 'support'].includes(activeTab || '')) {
            const menuItem = HANGSEONG_MENU[0].items.find(i => i.id === activeTab)
            const subs = menuItem?.subs || []

            if (!subs.length) return null

            return (
                <CatalogPage title={menuItem?.label || activeTab} currentTab={activeTab}>
                    <div className="py-8 px-6">
                        <div className="max-w-[1500px] mx-auto">
                            <div className="mb-12 text-center">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                                >
                                    {menuItem?.label}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                                >
                                    Explore the key sections and detailed information about our {menuItem?.label.toLowerCase()}.
                                </motion.p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subs.map((sub, idx) => {
                                    const info = CATEGORY_INFO[sub.id] || { desc: sub.label }
                                    return (
                                        <Link key={idx} href={sub.href}>
                                            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-slate-900 h-full cursor-pointer hover:shadow-xl hover:shadow-blue-500/20 transition-all">
                                                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-slate-200 font-bold">
                                                    {sub.label}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {info.desc}
                                                </p>
                                                <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-slate-800">
                                                    <span>View Details</span>
                                                    <span className="bg-slate-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                                        &rarr;
                                                    </span>
                                                </button>
                                            </BackgroundGradient>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </CatalogPage>
            )
        }
    }

    // --- VIEW 4: PRODUCTS MAIN (List of Product Categories) ---
    if (activeTab === 'products' && !activeCategory) {
        // Similar to above but for products
        const menuItem = HANGSEONG_MENU[0].items.find(i => i.id === 'products')
        const subs = menuItem?.subs || []

        return (
            <CatalogPage title="Products" currentTab="products">
                <div className="py-8 px-6">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="mb-12 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                            >
                                Product Lineup
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                            >
                                Precision components for DC motors, HVAC systems, and high-performance automotive applications.
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {subs.map((sub, idx) => {
                                const info = CATEGORY_INFO[sub.id] || { desc: sub.label, image: 'https://images.unsplash.com/photo-1565514020176-6c2235c887c0?auto=format&fit=crop&w=800&q=80' }
                                return (
                                    <Link key={idx} href={sub.href}>
                                        <BackgroundGradient className="rounded-[22px] w-full max-w-sm bg-white dark:bg-zinc-900 h-full cursor-pointer hover:shadow-2xl transition-all overflow-hidden flex flex-col">
                                            {/* Card Image */}
                                            <div className="relative w-full h-48 overflow-hidden rounded-t-[22px]">
                                                <Image
                                                    src={info.image}
                                                    alt={sub.label}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                                                    {sub.label}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow line-clamp-2 leading-relaxed">
                                                    {info.desc}
                                                </p>

                                                <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 mt-auto group">
                                                    <span>View Products</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </BackgroundGradient>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </CatalogPage>
        )
    }

    // --- VIEW 5: SUB-CATEGORY / LIST VIEW (When a category is selected) ---
    // If activeCategory is present, or activeTab maps to something with sub-items (like 'hvac')
    // We check SUB_CATEGORIES[activeTab] first for specific category pages, then activeCategory for general ones.
    const targetCat = (activeTab && SUB_CATEGORIES[activeTab]) ? activeTab : (activeCategory || activeTab)
    const currentSubCats = SUB_CATEGORIES[targetCat]

    if (currentSubCats) {
        // Correct tab for sidebar highlighting
        const displayTab = ['hvac', 'all_in_one', 'other_press'].includes(activeTab) ? 'products' : activeTab

        // Dedicated Image Views for specific categories
        if (['hvac', 'all_in_one', 'other_press'].includes(activeTab)) {
            let heroImage = ''
            if (activeTab === 'hvac') heroImage = '/templates/hangseong/images/hvac_products.png'
            if (activeTab === 'all_in_one') heroImage = '/templates/hangseong/images/cooling_products.png'
            if (activeTab === 'other_press') heroImage = '/templates/hangseong/images/other_products.png'

            return (
                <CatalogPage
                    title={CATEGORY_INFO[targetCat]?.title || targetCat}
                    currentTab={displayTab}
                    breadcrumb={{ label: 'Back to List', href: '/templates/hangseong?tab=products' }}
                >
                    <div className="py-8 px-6 max-w-[1400px] mx-auto">
                        <div className="mb-12 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                            >
                                {CATEGORY_INFO[targetCat]?.title || targetCat}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                            >
                                {CATEGORY_INFO[targetCat]?.desc}
                            </motion.p>
                        </div>

                        {/* Full Width Product Info Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-white rounded-[2rem] p-4 md:p-8 shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden"
                        >
                            <img
                                src={heroImage}
                                alt={CATEGORY_INFO[targetCat]?.title}
                                className="w-full h-auto rounded-xl"
                            />
                        </motion.div>
                    </div>
                </CatalogPage>
            )
        }

        // Default Grid View for other categories (if any)
        return (
            <CatalogPage
                title={CATEGORY_INFO[targetCat]?.title || targetCat}
                currentTab={displayTab}
                breadcrumb={{ label: 'Back to List', href: '/templates/hangseong?tab=products' }}
            >
                <div className="py-8 px-6 max-w-7xl mx-auto">
                    <div className="mb-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                        >
                            {CATEGORY_INFO[targetCat]?.title || targetCat}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                        >
                            {CATEGORY_INFO[targetCat]?.desc}
                        </motion.p>
                    </div>

                    {currentSubCats.length > 0 ? (
                        <div className="space-y-16">
                            {currentSubCats.map((sub: any) => (
                                <div key={sub.id} className="relative">
                                    <div className="flex items-end gap-4 mb-6 pb-2 border-b border-white/10">
                                        <h3 className="text-2xl font-bold dark:text-white text-slate-900">{sub.title}</h3>
                                        <span className="text-sm text-slate-500 mb-1 hidden sm:block">{sub.desc}</span>
                                    </div>

                                    {/* Product Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                                        {sub.items?.map((item: any) => {
                                            // Resolve Product Data
                                            const pData = findProduct(item.id, targetCat)
                                            // Fallback image
                                            const imgSrc = pData?.image || 'https://images.unsplash.com/photo-1536413218968-07d0d0f52d91?auto=format&fit=crop&w=800&q=80'
                                            const subtitle = pData?.subtitle || item.label

                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={`/templates/hangseong?category=${targetCat}&tab=${activeTab}&product=${item.id}`}
                                                    scroll={false}
                                                    className="group block relative bg-slate-900 border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                                                >
                                                    {/* Image Container */}
                                                    <div className="aspect-square w-full bg-white/5 relative flex items-center justify-center overflow-hidden">
                                                        <Image
                                                            src={imgSrc}
                                                            alt={item.label}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        {/* Hover Overlay */}
                                                        <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="bg-black/50 p-2 rounded-full backdrop-blur-sm">
                                                                <ArrowRight className="w-5 h-5 text-white" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Info Container */}
                                                    <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 space-y-3">
                                                        <div>
                                                            <h4 className="text-lg font-bold dark:text-white text-slate-900 group-hover:text-blue-500 transition-colors mb-1 truncate">{pData?.title || item.label}</h4>
                                                            <p className="text-xs dark:text-slate-500 text-slate-500 truncate group-hover:text-slate-400 font-medium">{subtitle}</p>
                                                        </div>

                                                        {/* Key Specs Preview */}
                                                        {pData?.specs && pData.specs.length > 0 && (
                                                            <div className="grid grid-cols-2 gap-2 pt-3 border-t dark:border-white/5 border-slate-100">
                                                                {pData.specs.slice(0, 2).map((s: any, i: number) => (
                                                                    <div key={i} className="flex flex-col">
                                                                        <span className="text-[10px] uppercase text-slate-400 dark:text-slate-600 font-bold tracking-wider">{s.label}</span>
                                                                        <span className="text-xs font-semibold dark:text-slate-300 text-slate-700 truncate">{s.value}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 text-center text-slate-500">
                            Select specific product category above.
                        </div>
                    )}


                </div>
            </CatalogPage>
        )
    }

    // --- VIEW 6: Detail Content Page (For things like 'greeting', 'overview', 'cert', etc.) ---
    // If we land here, it means we selected a tab like 'greeting' directly.
    const detailInfo = CATEGORY_INFO[activeTab]
    if (detailInfo && activeTab !== 'contact') {
        // Determine parent category for breadcrumb
        let parentLabel = 'Company'
        let parentHref = '/templates/hangseong?tab=about'
        let parentTabId = 'about'

        if (activeCategory === 'products') {
            parentLabel = 'Products'
            parentHref = '/templates/hangseong?tab=products'
            parentTabId = 'products'
        } else if (activeCategory === 'qm') {
            parentLabel = 'QM'
            parentHref = '/templates/hangseong?tab=qm'
            parentTabId = 'qm'
        } else if (activeCategory === 'reliability') {
            parentLabel = 'Reliability Evaluation'
            parentHref = '/templates/hangseong?tab=reliability'
            parentTabId = 'reliability'
        } else if (activeCategory === 'equipment') {
            parentLabel = 'Equipment'
            parentHref = '/templates/hangseong?tab=equipment'
            parentTabId = 'equipment'
        } else if (activeCategory === 'support') {
            parentLabel = 'Support'
            parentHref = '/templates/hangseong?tab=support'
            parentTabId = 'support'
        } else if (activeCategory === 'about') {
            parentLabel = 'About Us'
            parentHref = '/templates/hangseong?tab=about'
            parentTabId = 'about'
        }

        return (
            <CatalogPage title={detailInfo.title} currentTab={parentTabId} breadcrumb={{ label: parentLabel, href: parentHref }}>
                <TracingBeam className="px-6">
                    <div className="max-w-[1200px] mx-auto antialiased pt-4 pb-20 relative">
                        {/* Standardized Header */}
                        <div className="mb-12 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                            >
                                {detailInfo.title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                            >
                                {detailInfo.desc}
                            </motion.p>
                        </div>

                        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 border dark:border-white/10 border-slate-200">
                            <Image src={detailInfo.image || detailInfo.images?.[0] || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1600&q=80'} alt={detailInfo.title} fill className="object-cover" />
                        </div>

                        <div className="prose prose-slate dark:prose-invert max-w-none">

                            <h3 className="text-2xl font-bold mb-4">Commitment to Excellence</h3>
                            <p className="mb-6">
                                At Hangseong Industrial, we are committed to excellence. Our state-of-the-art facilities and dedicated team ensure that every product meets the highest standards of quality and reliability.
                                Since our establishment, we have been at the forefront of automotive innovation, consistently delivering precision components that drive the industry forward.
                            </p>

                            <h3 className="text-2xl font-bold mb-4">Core Values</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-8">
                                <li><strong>Precision:</strong> Achieving micron-level accuracy in every part.</li>
                                <li><strong>Reliability:</strong> Products that perform under the most demanding conditions.</li>
                                <li><strong>Innovation:</strong> Continuously adopting new technologies and methods.</li>
                                <li><strong>Sustainability:</strong> Eco-friendly manufacturing processes.</li>
                            </ul>
                        </div>
                    </div>
                </TracingBeam>
            </CatalogPage>
        )
    }




    return (
        <CatalogPage title="Page Not Found" currentTab="cover">
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-white">Page Not Found</h1>
            </div>
        </CatalogPage>
    )
}

export default function HangseongPage() {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-slate-900 flex items-center justify-center text-white">Loading Hangseong Catalog...</div>}>
            <HangseongContent />
        </Suspense>
    )
}
