'use client'

import { Suspense, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Printer, Clock, X, Check } from 'lucide-react'
import CoverView from './components/CoverView'
import {
    COMPANY, BRAND, GREETING, HISTORY, CERTIFICATIONS,
    DC_TECHNOLOGY, PRODUCTS, APPLICATIONS, PRODUCT_CATEGORIES
} from './data'
import { BROCHURE_FLOW, ALL_TABS, getNavContext } from './page-structure'

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getProduct = (id: string) => PRODUCTS.find(p => p.id === id)

const PRODUCT_DETAIL_TABS = ['hsd-180d', 'hsh-260d', 'hsp-180d', 'hsv-260d', 'hss-065s', 'hs-024h', 'hs-220h']

// ─── Shared Section Header ────────────────────────────────────────────────────
function SectionHeader({ eng, title, subtitle }: { eng: string; title?: string; subtitle?: string }) {
    return (
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-[#00d4ff]" />
                <span className="text-[#00d4ff] text-xs font-mono tracking-[0.3em] uppercase">{eng}</span>
            </div>
            {title && <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>}
            {subtitle && <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
    )
}

// ─── Spec Row ─────────────────────────────────────────────────────────────────
function SpecRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center border-b border-white/5 py-2.5">
            <span className="text-gray-400 text-xs font-mono w-40 flex-shrink-0 uppercase tracking-wider">{label}</span>
            <span className="text-white text-sm font-mono">{value}</span>
        </div>
    )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onClick }: { product: ReturnType<typeof getProduct>; onClick?: () => void }) {
    if (!product) return null
    return (
        <div
            className="group bg-white/5 border border-white/10 hover:border-[#00d4ff]/40 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden bg-black/20">
                <Image src={product.image} alt={product.model} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                    <span className="text-[#00d4ff] text-xs font-mono tracking-wider bg-black/40 px-2 py-1">{product.type}</span>
                </div>
            </div>
            <div className="p-4">
                <div className="text-[#00d4ff] font-mono text-lg font-bold mb-1">{product.model}</div>
                <div className="text-gray-300 text-xs leading-relaxed">{product.desc.slice(0, 80)}...</div>
            </div>
        </div>
    )
}

// ─── Page Views ───────────────────────────────────────────────────────────────

// Page 01: COVER
function CoverPage({ onStart }: { onStart: () => void }) {
    return <CoverView onStart={onStart} />
}

// Page 02: ABOUT US
function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
                <SectionHeader eng="GREETING" title="About HS TECH" subtitle={COMPANY.subtagline} />
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        {GREETING.paragraphs.map((p, i) => (
                            <p key={i} className="text-gray-300 text-sm leading-relaxed border-l-2 border-[#00d4ff]/20 pl-4">
                                {p}
                            </p>
                        ))}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="text-[#00d4ff] font-mono text-sm">— {COMPANY.ceo}</div>
                            <div className="text-gray-500 text-xs mt-1">CEO, HS TECH</div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative h-80 md:h-96 overflow-hidden">
                            <Image src="/templates/air-hstech/images/ceo-photo.jpg" alt="HS TECH CEO" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent opacity-60" />
                        </div>
                        {/* Company stats */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            {[
                                { label: 'Founded', value: '2017' },
                                { label: 'ISO Certified', value: '9001' },
                                { label: 'IATF', value: '16949' },
                                { label: 'Products', value: '10+' },
                            ].map(s => (
                                <div key={s.label} className="bg-white/5 border border-white/10 p-3 text-center">
                                    <div className="text-[#00d4ff] font-mono text-xl font-bold">{s.value}</div>
                                    <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Page 03: HISTORY
function HistoryPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
                <SectionHeader eng="HISTORY" title="Company History" subtitle="From founding to becoming a leader in DC engine-off air conditioning." />
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-16 top-0 bottom-0 w-px bg-[#00d4ff]/20" />
                    <div className="space-y-8">
                        {HISTORY.map(yr => (
                            <div key={yr.year}>
                                {/* Year badge */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-32 text-right">
                                        <span className="text-[#00d4ff] font-mono text-2xl font-bold">20<strong className="text-white">{yr.year.slice(2)}</strong></span>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-[#00d4ff] border-2 border-[#0a0f1e] relative z-10 flex-shrink-0" />
                                </div>
                                {/* Events */}
                                <div className="ml-36 space-y-3">
                                    {yr.events.map((ev, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <span className="text-[#00d4ff] font-mono text-xs w-6 flex-shrink-0 mt-0.5">{ev.month}</span>
                                            <div className="bg-white/5 border border-white/10 p-3 flex-1">
                                                <p className="text-gray-300 text-sm">{ev.desc}</p>
                                                {ev.img && (
                                                    <div className="mt-2 h-20 relative overflow-hidden">
                                                        <Image src={ev.img} alt={ev.desc} fill className="object-cover" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Page 04: BRAND
function BrandPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader eng="BRAND" title="GENWISH Brand" subtitle={BRAND.origin} />
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="relative h-64 overflow-hidden mb-6">
                            <Image src="/templates/air-hstech/images/brand-main.jpg" alt="GENWISH Brand" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 to-transparent" />
                        </div>
                        <div className="bg-white/5 border border-[#00d4ff]/20 p-6">
                            <h3 className="text-[#00d4ff] font-mono text-sm tracking-wider uppercase mb-3">Symbol Mark</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{BRAND.symbolMark}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 p-6">
                            <h3 className="text-[#00d4ff] font-mono text-sm tracking-wider uppercase mb-3">Brand Identity</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{BRAND.signature}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { src: '/templates/air-hstech/images/brand-symbol-1.jpg', label: 'Symbol A' },
                                { src: '/templates/air-hstech/images/brand-symbol-2.jpg', label: 'Symbol B' },
                            ].map(img => (
                                <div key={img.label} className="relative h-32 overflow-hidden border border-white/10">
                                    <Image src={img.src} alt={img.label} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="bg-[#00d4ff]/5 border border-[#00d4ff]/30 p-4">
                            <div className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-2">Brand Meaning</div>
                            <div className="flex gap-6 text-sm">
                                <div>
                                    <span className="text-white font-bold">GEN</span>
                                    <span className="text-gray-400"> = Genius (special talent)</span>
                                </div>
                                <div>
                                    <span className="text-white font-bold">WISH</span>
                                    <span className="text-gray-400"> = Wind (in Korean)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Page 05: CERTIFICATIONS
function CertificationsPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader
                    eng="CERTIFICATE"
                    title="Certifications"
                    subtitle="HS TECH maintains globally recognized quality management certifications ensuring the highest standards."
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {CERTIFICATIONS.map(cert => (
                        <div key={cert.id} className="bg-white/5 border border-white/10 overflow-hidden">
                            <div className="relative aspect-[3/4] overflow-hidden bg-white">
                                <Image src={cert.img} alt={cert.label} fill className="object-contain" />
                            </div>
                            <div className="p-3 text-center">
                                <div className="text-white font-bold text-sm">{cert.label}</div>
                                <div className="text-gray-500 text-xs mt-1">Since {cert.year}</div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Key certifications table */}
                <div className="bg-white/5 border border-white/10 p-6">
                    <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">Quality Standards</h3>
                    <div className="space-y-0">
                        {[
                            { cert: 'IATF 16949', desc: 'Automotive quality management system standard', year: '2019' },
                            { cert: 'ISO 9001', desc: 'Quality management systems', year: '2018' },
                            { cert: 'Venture Company', desc: 'Korean government venture company certification', year: '2020' },
                            { cert: 'Excellent Technology', desc: 'Nice D&B Co., Ltd. — technology excellence', year: '2019' },
                        ].map((row, i) => (
                            <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                                <Check className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
                                <div className="w-32 text-white font-mono text-sm font-bold flex-shrink-0">{row.cert}</div>
                                <div className="text-gray-400 text-sm flex-1">{row.desc}</div>
                                <div className="text-[#00d4ff] font-mono text-xs">{row.year}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Page 06: PROCESS
function ProcessPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader eng="PROCESS" title="Manufacturing Process" subtitle="HS TECH ensures quality at every step of the manufacturing process." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {[1, 2, 3].map(n => (
                        <div key={n} className="relative h-64 overflow-hidden border border-white/10">
                            <Image src={`/templates/air-hstech/images/process-${n}.jpg`} alt={`Process ${n}`} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 to-transparent" />
                            <div className="absolute bottom-3 left-3">
                                <span className="text-[#00d4ff] font-mono text-xs">{`STEP ${n.toString().padStart(2, '0')}`}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6">
                        <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">Production Excellence</h3>
                        <ul className="space-y-3">
                            {[
                                'Strict quality control at all production stages',
                                'IATF 16949 compliant manufacturing processes',
                                'In-house R&D and affiliated research center',
                                'Advanced testing and validation protocols',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6">
                        <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">R&D Capabilities</h3>
                        <ul className="space-y-3">
                            {[
                                'Company-affiliated research center established 2020',
                                'Digital AI compressor control technology',
                                'Patent-protected engine-off AC solutions',
                                'Ongoing product development for new markets',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Page 07: PRODUCTS OVERVIEW
function ProductsOverviewPage({ onSelectProduct }: { onSelectProduct: (tab: string) => void }) {
    const productTabs: Record<string, string> = {
        'hsd-180d': 'hsd-180d',
        'hsh-260d': 'hsh-260d',
        'hsp-180d': 'hsp-180d',
        'hsv-260d': 'hsv-260d',
        'hss-065s': 'hss-065s',
        'hs-024h': 'hs-024h',
        'hs-220h': 'hs-220h',
        'touch-display': 'controllers',
        'btn-display': 'controllers',
        'shared-room': 'outdoor-unit',
    }
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    eng="PRODUCT"
                    title="Product Lineup"
                    subtitle="GENWISH offers a full range of engine-off DC air conditioning solutions for industrial vehicles, RVs, and marine applications."
                />
                {Object.entries(PRODUCT_CATEGORIES).map(([catId, cat]) => {
                    const catProducts = PRODUCTS.filter(p => p.category === catId)
                    if (catProducts.length === 0) return null
                    return (
                        <div key={catId} className="mb-10">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-white font-bold text-lg">{cat.label}</h3>
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="text-gray-500 text-xs">{cat.desc}</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {catProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={() => onSelectProduct(productTabs[product.id] || 'products')}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Controllers page (combined)
function ControllersPage() {
    const controllers = PRODUCTS.filter(p => p.category === 'controller')
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader eng="CONTROLLER" title="Display Controllers" subtitle="Intuitive control interfaces designed for GENWISH DC air conditioner systems." />
                <div className="grid md:grid-cols-2 gap-8">
                    {controllers.map(ctrl => (
                        <div key={ctrl.id} className="bg-white/5 border border-white/10 overflow-hidden">
                            <div className="relative h-64 overflow-hidden">
                                <Image src={ctrl.image} alt={ctrl.model} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 to-transparent" />
                            </div>
                            <div className="p-6">
                                <div className="text-[#00d4ff] font-mono text-lg font-bold mb-1">{ctrl.model}</div>
                                <div className="text-gray-400 text-xs mb-4">{ctrl.type}</div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">{ctrl.desc}</p>
                                <div className="space-y-0">
                                    {ctrl.specs.map(s => <SpecRow key={s.label} label={s.label} value={s.value} />)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Outdoor unit page
function OutdoorUnitPage() {
    const product = PRODUCTS.find(p => p.id === 'shared-room')!
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader eng="ACCESSORY" title="Outdoor Unit Solutions" subtitle="Efficient enclosure systems for GENWISH outdoor units in multi-unit deployments." />
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-80 overflow-hidden border border-white/10">
                        <Image src={product.image} alt={product.model} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/50 to-transparent" />
                    </div>
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-2 border-[#00d4ff]/30 pl-4">
                            {product.desc}
                        </p>
                        <div className="bg-white/5 border border-white/10 p-6 mb-6">
                            <h4 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-3">Specifications</h4>
                            {product.specs.map(s => <SpecRow key={s.label} label={s.label} value={s.value} />)}
                        </div>
                        {product.features && (
                            <ul className="space-y-2">
                                {product.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300 text-sm">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Product Detail Modal ─────────────────────────────────────────────────────
function ProductDetailModal({ productId, onClose }: { productId: string; onClose: () => void }) {
    const product = getProduct(productId)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    if (!product) return null
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal panel */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 w-[80vw] max-h-[90vh] bg-[#0a0f1e] border border-white/20 flex flex-col"
            >
                {/* Corner brackets */}
                <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[#00d4ff]" />
                <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[#00d4ff]" />
                <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[#00d4ff]" />
                <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[#00d4ff]" />

                {/* Sticky header with close button */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-6 bg-[#00d4ff]" />
                        <span className="text-[#00d4ff] text-xs font-mono tracking-[0.3em] uppercase">{product.type.toUpperCase()}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors rounded-sm"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 p-8 md:p-10">
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        {/* Image */}
                        <div>
                            <div className="relative h-64 md:h-80 overflow-hidden border border-white/10">
                                <Image src={product.image} alt={product.model} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/50 to-transparent" />
                            </div>
                            {product.features && product.features.length > 0 && (
                                <div className="mt-4 bg-white/5 border border-white/10 p-4">
                                    <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-3">Key Features</h3>
                                    <ul className="space-y-2">
                                        {product.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-300 text-sm">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {/* Info */}
                        <div>
                            <div className="text-[#00d4ff] font-mono text-3xl font-bold mb-1">{product.model}</div>
                            <div className="text-gray-400 text-sm mb-4">{product.name}</div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-8 border-l-2 border-[#00d4ff]/30 pl-4">
                                {product.desc}
                            </p>
                            <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">Specifications</h3>
                                <div className="space-y-0">
                                    {product.specs.map(spec => (
                                        <SpecRow key={spec.label} label={spec.label} value={spec.value} />
                                    ))}
                                    <SpecRow label="Brand" value="GENWISH" />
                                    <SpecRow label="Manufacturer" value="HS TECH" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

// DC Technology page
function DCTechPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader eng="DC TECHNOLOGY" title="Digital AI Technology" subtitle={DC_TECHNOLOGY.desc} />
                <div className="mb-10">
                    <h3 className="text-white font-bold text-xl mb-6">{DC_TECHNOLOGY.aiControl.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {DC_TECHNOLOGY.aiControl.steps.map((step, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 hover:border-[#00d4ff]/30 transition-colors p-5">
                                <div className="text-[#00d4ff] font-mono text-2xl font-bold mb-2">{`0${i + 1}`}</div>
                                <div className="text-white font-bold text-sm mb-2">{step.label}</div>
                                <div className="text-gray-400 text-xs leading-relaxed">{step.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#00d4ff]/5 border border-[#00d4ff]/20 p-6">
                    <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">Advantages of Digital AI</h3>
                    <ul className="space-y-3">
                        {DC_TECHNOLOGY.advantages.map((adv, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">{adv}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

// Non-Operating page
function NonOperatingPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader
                    eng="NON-OPERATING"
                    title="Engine-Off Air Conditioning"
                    subtitle="HS TECH specializes in air conditioning solutions that operate without the vehicle engine running — maximizing efficiency and reducing fuel consumption."
                />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 p-6">
                            <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">DC Non-Operating</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                DC engine-off air conditioners operate on the vehicle&apos;s DC battery system, providing cooling and heating without engine operation.
                            </p>
                            <ul className="space-y-2">
                                {['DC 24V / DC 12V operation', 'R-134A refrigerant system', 'Up to 2,600W cooling capacity', 'AI-controlled compressor'].map(f => (
                                    <li key={f} className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0" />
                                        <span className="text-gray-400 text-sm">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6">
                            <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">AC Non-Operating</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                AC engine-off heaters and purifiers work on shore power or generator output during stationary periods.
                            </p>
                            <ul className="space-y-2">
                                {['AC 220V operation', 'High heating capacity', 'Integrated air purification', 'Commercial-grade performance'].map(f => (
                                    <li key={f} className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0" />
                                        <span className="text-gray-400 text-sm">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="relative h-80 md:h-full overflow-hidden border border-white/10">
                        <Image src="/templates/air-hstech/images/hero-2.jpg" alt="Engine-off technology" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-1">Energy Saving</div>
                            <div className="text-white text-4xl font-bold font-mono">40%</div>
                            <div className="text-gray-400 text-xs">vs constant-speed operation</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Application page
function ApplicationPage({ appId }: { appId: string }) {
    const app = APPLICATIONS.find(a => a.id === appId)
    if (!app) return null
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader eng="APPLICATION" title={app.title} subtitle={app.desc} />
                {app.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {app.images.map((img, i) => (
                            <div key={i} className="relative h-56 overflow-hidden border border-white/10">
                                <Image src={img} alt={`${app.title} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/50 to-transparent" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative h-56 overflow-hidden border border-white/10 mb-8">
                        <Image src="/templates/air-hstech/images/hero-3.jpg" alt={app.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 to-transparent" />
                    </div>
                )}
                <div className="bg-white/5 border border-white/10 p-6">
                    <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">Benefits</h3>
                    <ul className="space-y-3">
                        {app.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">{h}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

// Location page
function LocationPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader eng="LOCATION" title="Find Us" />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 p-6">
                            <h3 className="text-[#00d4ff] font-mono text-xs tracking-wider uppercase mb-4">Headquarters</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-white text-sm font-bold mb-1">Address</div>
                                        <div className="text-gray-300 text-sm">{COMPANY.address}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
                                    <div>
                                        <div className="text-white text-sm font-bold mb-1">Phone</div>
                                        <div className="text-gray-300 text-sm font-mono">{COMPANY.tel}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Printer className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
                                    <div>
                                        <div className="text-white text-sm font-bold mb-1">Fax</div>
                                        <div className="text-gray-300 text-sm font-mono">{COMPANY.fax}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
                                    <div>
                                        <div className="text-white text-sm font-bold mb-1">Email</div>
                                        <div className="text-gray-300 text-sm">{COMPANY.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-white text-sm font-bold mb-1">Office Hours</div>
                                        <div className="text-gray-300 text-sm">{COMPANY.inquiryHours}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-80 overflow-hidden border border-white/10">
                        <Image src="/templates/air-hstech/images/hero-3.jpg" alt="Busan, Korea" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <div className="text-[#00d4ff] font-mono text-xs uppercase tracking-wider mb-1">Location</div>
                            <div className="text-white font-bold">Busan, Republic of Korea</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Contact page
function ContactPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] p-8 md:p-16 flex items-center">
            <div className="max-w-4xl mx-auto w-full">
                <SectionHeader eng="CONTACT" title="Get In Touch" subtitle="Partnership inquiry and product inquiries welcome." />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        {[
                            { icon: Phone, label: 'Phone', value: COMPANY.tel },
                            { icon: Printer, label: 'Fax', value: COMPANY.fax },
                            { icon: Mail, label: 'Email', value: COMPANY.email },
                            { icon: Clock, label: 'Hours', value: COMPANY.inquiryHours },
                        ].map(item => (
                            <div key={item.label} className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-4 h-4 text-[#00d4ff]" />
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                                    <div className="text-white text-sm">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white/5 border border-[#00d4ff]/20 p-8">
                        <div className="text-center mb-6">
                            <div className="text-[#00d4ff] font-mono text-3xl font-bold mb-2">GENWISH</div>
                            <div className="text-white font-bold text-lg">HS TECH</div>
                            <div className="text-gray-400 text-sm mt-1">{COMPANY.tagline}</div>
                        </div>
                        <div className="space-y-2 text-xs text-gray-400 border-t border-white/10 pt-4">
                            <div>Company: {COMPANY.name}</div>
                            <div>Business Reg: {COMPANY.businessReg}</div>
                            <div>CEO: {COMPANY.ceo}</div>
                            <div>Country: {COMPANY.country}</div>
                        </div>
                    </div>
                </div>
                {/* Footer copyright */}
                <div className="mt-12 pt-6 border-t border-white/10 text-center text-gray-600 text-xs font-mono">
                    2019 Copyright all reserved. HS TECH.
                </div>
            </div>
        </div>
    )
}

// ─── Page Navigator ───────────────────────────────────────────────────────────
function PageNavigator({ currentTab, onNavigate }: { currentTab: string; onNavigate: (tab: string) => void }) {
    const ctx = getNavContext(currentTab)
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f1e]/95 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Prev */}
                <button
                    onClick={() => ctx.prev && onNavigate(ctx.prev.tab)}
                    disabled={!ctx.prev}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#00d4ff] transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm font-mono"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden md:block">{ctx.prev?.label || ''}</span>
                </button>

                {/* Page counter + mini map */}
                <div className="flex items-center gap-4">
                    <span className="text-[#00d4ff] font-mono text-sm font-bold">{String(ctx.position).padStart(2, '0')}</span>
                    <div className="flex gap-1">
                        {BROCHURE_FLOW.map((p, i) => (
                            <button
                                key={p.tab}
                                onClick={() => onNavigate(p.tab)}
                                title={p.label}
                                className={`h-2 transition-all duration-300 ${
                                    p.tab === currentTab
                                        ? 'w-8 bg-[#00d4ff]'
                                        : i < ctx.position - 1
                                        ? 'w-2 bg-[#00d4ff]/40'
                                        : 'w-2 bg-white/20'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-gray-500 font-mono text-sm">{String(ctx.total).padStart(2, '0')}</span>
                </div>

                {/* Next */}
                <button
                    onClick={() => ctx.next && onNavigate(ctx.next.tab)}
                    disabled={!ctx.next}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#00d4ff] transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm font-mono"
                >
                    <span className="hidden md:block">{ctx.next?.label || ''}</span>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

// ─── Main Catalog Component ───────────────────────────────────────────────────
function AirHSTechCatalog() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const rawTab = searchParams.get('tab') || 'cover'
    const currentTab = ALL_TABS.includes(rawTab) ? rawTab : 'cover'

    const navigate = useCallback((tab: string) => {
        router.push(`?tab=${tab}`, { scroll: false })
    }, [router])

    // Keyboard navigation
    useEffect(() => {
        const ctx = getNavContext(currentTab)
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                if (ctx.next) navigate(ctx.next.tab)
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (ctx.prev) navigate(ctx.prev.tab)
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [currentTab, navigate])

    const renderPage = () => {
        switch (currentTab) {
            case 'cover':        return <CoverPage onStart={() => navigate('about')} />
            case 'about':        return <AboutPage />
            case 'history':      return <HistoryPage />
            case 'brand':        return <BrandPage />
            case 'certifications': return <CertificationsPage />
            case 'process':      return <ProcessPage />
            case 'products':     return <ProductsOverviewPage onSelectProduct={navigate} />
            case 'hsd-180d':
            case 'hsh-260d':
            case 'hsp-180d':
            case 'hsv-260d':
            case 'hss-065s':
            case 'hs-024h':
            case 'hs-220h':      return <ProductsOverviewPage onSelectProduct={navigate} />
            case 'controllers':  return <ControllersPage />
            case 'outdoor-unit': return <OutdoorUnitPage />
            case 'dc-tech':      return <DCTechPage />
            case 'non-operating': return <NonOperatingPage />
            case 'crane':        return <ApplicationPage appId="crane" />
            case 'campingcar':   return <ApplicationPage appId="campingcar" />
            case 'ship':         return <ApplicationPage appId="ship" />
            case 'location':     return <LocationPage />
            case 'contact':      return <ContactPage />
            default:             return <CoverPage onStart={() => navigate('about')} />
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0f1e] text-white pb-20">
            {/* Header (hidden on cover page) */}
            {currentTab !== 'cover' && (
                <header className="sticky top-0 z-40 bg-[#0a0f1e]/90 backdrop-blur-sm border-b border-white/10">
                    <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
                        <button onClick={() => navigate('cover')} className="flex items-center">
                            <Image
                                src="/templates/air-hstech/images/logo-top.png"
                                alt="HS TECH"
                                width={120}
                                height={31}
                                className="object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </button>
                        {/* Top nav groups */}
                        <nav className="hidden md:flex items-center gap-6">
                            {['about', 'products', 'dc-tech', 'crane', 'contact'].map(tab => {
                                const page = BROCHURE_FLOW.find(p => p.tab === tab)
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => navigate(tab)}
                                        className={`text-xs font-mono tracking-wider uppercase transition-colors ${
                                            currentTab === tab || (tab === 'products' && PRODUCT_DETAIL_TABS.includes(currentTab))
                                                ? 'text-[#00d4ff]'
                                                : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        {page?.label || tab}
                                    </button>
                                )
                            })}
                        </nav>
                    </div>
                </header>
            )}

            {/* Page Content — product detail tabs reuse products-bg key to avoid re-animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={PRODUCT_DETAIL_TABS.includes(currentTab) ? 'products-bg' : currentTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderPage()}
                </motion.div>
            </AnimatePresence>

            {/* Page Navigator */}
            <PageNavigator currentTab={currentTab} onNavigate={navigate} />

            {/* Corner bracket overlay — visible on all non-cover pages */}
            {currentTab !== 'cover' && (
                <div className="pointer-events-none fixed inset-0 z-30">
                    <span className="absolute top-[52px] left-3 w-5 h-5 border-t border-l border-[#00d4ff]/20" />
                    <span className="absolute top-[52px] right-3 w-5 h-5 border-t border-r border-[#00d4ff]/20" />
                    <span className="absolute bottom-[56px] left-3 w-5 h-5 border-b border-l border-[#00d4ff]/20" />
                    <span className="absolute bottom-[56px] right-3 w-5 h-5 border-b border-r border-[#00d4ff]/20" />
                </div>
            )}

            {/* Product Detail Modal */}
            <AnimatePresence>
                {PRODUCT_DETAIL_TABS.includes(currentTab) && (
                    <ProductDetailModal
                        key="product-modal"
                        productId={currentTab}
                        onClose={() => navigate('products')}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function AirHSTechPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
                <div className="text-[#00d4ff] font-mono text-sm tracking-widest animate-pulse">LOADING...</div>
            </div>
        }>
            <AirHSTechCatalog />
        </Suspense>
    )
}
