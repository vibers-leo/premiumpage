'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Printer, Clock, X, Check, ExternalLink } from 'lucide-react'
import CoverView from '../air-hstech/components/CoverView'
import {
    COMPANY, BRAND, GREETING, HISTORY, CERTIFICATIONS,
    DC_TECHNOLOGY, PRODUCTS, APPLICATIONS, PRODUCT_CATEGORIES
} from '../air-hstech/data'
import { BROCHURE_FLOW, ALL_TABS, getNavContext } from '../air-hstech/page-structure'

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getProduct = (id: string) => PRODUCTS.find(p => p.id === id)
const PRODUCT_DETAIL_TABS = ['hsd-180d', 'hsh-260d', 'hsp-180d', 'hsv-260d', 'hss-065s', 'hs-024h', 'hs-220h']

// ─── Design Tokens ────────────────────────────────────────────────────────────
// accent: cyan-600 (#0891b2)  bg: white  border: neutral-200  text: slate-800

// ─── Shared Section Header ────────────────────────────────────────────────────
function SectionHeader({ label, title, subtitle }: { label: string; title?: string; subtitle?: string }) {
    return (
        <div className="mb-10">
            <span className="inline-block text-[10px] font-black text-cyan-600 uppercase tracking-[0.35em] mb-3 border-l-2 border-cyan-500 pl-3">
                {label}
            </span>
            {title && <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3">{title}</h2>}
            {subtitle && <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
    )
}

// ─── Spec Row ─────────────────────────────────────────────────────────────────
function SpecRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center border-b border-neutral-100 py-2.5">
            <span className="text-slate-400 text-[11px] font-bold w-40 flex-shrink-0 uppercase tracking-wider">{label}</span>
            <span className="text-slate-800 text-sm font-medium">{value}</span>
        </div>
    )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onClick }: { product: ReturnType<typeof getProduct>; onClick?: () => void }) {
    if (!product) return null
    return (
        <button
            className="group text-left w-full border border-neutral-200 bg-white rounded-xl overflow-hidden hover:border-cyan-400 hover:shadow-lg transition-all duration-300"
            onClick={onClick}
        >
            <div className="relative bg-neutral-50 aspect-[4/3] overflow-hidden border-b border-neutral-100 flex items-center justify-center p-4">
                <Image src={product.image} alt={product.model} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <ExternalLink className="w-2.5 h-2.5" /> View Details
                    </span>
                </div>
                <div className="absolute bottom-2 left-3">
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded">{product.type}</span>
                </div>
            </div>
            <div className="p-4">
                <div className="text-cyan-600 font-black text-base mb-1 group-hover:text-cyan-700 transition-colors">{product.model}</div>
                <div className="text-slate-400 text-xs leading-relaxed line-clamp-2">{product.desc.slice(0, 80)}...</div>
            </div>
        </button>
    )
}

// ─── Page Views ───────────────────────────────────────────────────────────────

function CoverPage({ onStart }: { onStart: () => void }) {
    return <CoverView onStart={onStart} />
}

function AboutPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
                <SectionHeader label="COMPANY" title="About HS TECH" subtitle={COMPANY.subtagline} />
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="relative h-80 md:h-96 overflow-hidden rounded-xl border border-neutral-200">
                            <Image src="/templates/air-hstech/images/hero-2.jpg" alt="HS TECH" fill className="object-cover" />
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            {[
                                { label: 'Founded', value: '2017' },
                                { label: 'ISO Certified', value: '9001' },
                                { label: 'IATF', value: '16949' },
                                { label: 'Products', value: '10+' },
                            ].map(s => (
                                <div key={s.label} className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-center">
                                    <div className="text-cyan-600 font-black text-xl">{s.value}</div>
                                    <div className="text-slate-400 text-[10px] uppercase tracking-wider mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="border-l-2 border-cyan-400 pl-5">
                            <div className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-2">Mission</div>
                            <p className="text-slate-900 text-lg font-black leading-tight">{COMPANY.tagline}</p>
                        </div>
                        <div className="space-y-1">
                            {[
                                { label: 'Business No.', value: COMPANY.businessReg },
                                { label: 'Country', value: COMPANY.country },
                                { label: 'Address', value: COMPANY.address },
                                { label: 'Founded', value: COMPANY.founded },
                            ].map(item => (
                                <div key={item.label} className="flex gap-4 py-3 border-b border-neutral-100">
                                    <span className="text-slate-400 text-[11px] font-bold w-28 flex-shrink-0 uppercase tracking-wider pt-0.5">{item.label}</span>
                                    <span className="text-slate-700 text-sm">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function GreetingPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
                <SectionHeader label="CEO MESSAGE" title="CEO Greeting" subtitle="A message from our founder and CEO, Park JoonWoo." />
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-4">
                        {GREETING.paragraphs.map((p, i) => (
                            <p key={i} className="text-slate-600 text-sm leading-relaxed border-l-2 border-cyan-200 pl-4">
                                {p}
                            </p>
                        ))}
                        <div className="mt-8 pt-6 border-t border-neutral-100">
                            <div className="text-cyan-600 font-black text-sm">— {COMPANY.ceo}</div>
                            <div className="text-slate-400 text-xs mt-1">CEO, HS TECH</div>
                        </div>
                    </div>
                    <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-xl border border-neutral-200">
                        <Image src="/templates/air-hstech/images/ceo-photo.jpg" alt="HS TECH CEO" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function HistoryPage() {
    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <SectionHeader label="HISTORY" title="Company History" subtitle="From founding to becoming a leader in DC engine-off air conditioning." />

                {/* Timeline — one card per year, alternating left/right */}
                <div className="relative mt-12">
                    {/* Center vertical line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-neutral-200" />

                    <div className="space-y-8">
                        {HISTORY.map((yr, i) => {
                            const isRight = i % 2 === 0
                            const image = yr.events.find(ev => ev.img)

                            const card = (
                                <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm w-full">
                                    {/* Month·Event list */}
                                    <ul className="space-y-2 mb-0">
                                        {yr.events.map((ev, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <span className="text-cyan-500 font-black text-xs w-5 flex-shrink-0 mt-0.5">{ev.month}</span>
                                                <p className="text-slate-700 text-sm leading-snug">{ev.desc}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* Image — natural aspect ratio, no crop */}
                                    {image?.img && (
                                        <div className="mt-4 rounded-lg overflow-hidden border border-neutral-100 bg-neutral-50">
                                            <img src={image.img} alt={image.desc} className="w-full h-auto object-contain" />
                                        </div>
                                    )}
                                </div>
                            )

                            return (
                                <div key={yr.year} className="relative flex items-start">
                                    {/* Center dot */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-6 z-10 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white shadow-sm" />

                                    {/* Year badge — centered above the card row */}
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-10">
                                        <div className="bg-white border-2 border-cyan-500 rounded-full px-4 py-1 text-sm font-bold whitespace-nowrap">
                                            <span className="text-slate-400">20</span>
                                            <strong className="text-cyan-600">{yr.year.slice(2)}</strong>
                                        </div>
                                    </div>

                                    {/* Left half */}
                                    <div className="w-1/2 pr-8 flex justify-end">
                                        {!isRight && card}
                                    </div>

                                    {/* Right half */}
                                    <div className="w-1/2 pl-8 flex justify-start">
                                        {isRight && card}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Bottom GENWISH symbol */}
                    <div className="relative flex flex-col items-center pt-12 pb-4">
                        <div className="w-px h-8 bg-neutral-200 mb-4" />
                        <div className="relative w-16 h-16 opacity-25">
                            <Image src="/templates/air-hstech/images/logo-symbol.png" alt="GENWISH" fill className="object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BrandPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader label="BRAND" title="GENWISH Brand" subtitle={BRAND.origin} />
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="relative h-64 overflow-hidden rounded-xl mb-5 border border-neutral-200">
                            <Image src="/templates/air-hstech/images/brand-main.jpg" alt="GENWISH Brand" fill className="object-cover" />
                        </div>
                        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
                            <h3 className="text-cyan-600 font-black text-xs tracking-wider uppercase mb-3">Symbol Mark</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{BRAND.symbolMark}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
                            <h3 className="text-cyan-600 font-black text-xs tracking-wider uppercase mb-3">Brand Identity</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{BRAND.signature}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { src: '/templates/air-hstech/images/brand-symbol-1.jpg', label: 'Symbol A' },
                                { src: '/templates/air-hstech/images/brand-symbol-2.jpg', label: 'Symbol B' },
                            ].map(img => (
                                <div key={img.label} className="relative h-32 overflow-hidden rounded-lg border border-neutral-200">
                                    <Image src={img.src} alt={img.label} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                            <div className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-2">Brand Meaning</div>
                            <div className="flex gap-6 text-sm">
                                <div>
                                    <span className="text-slate-900 font-black">GEN</span>
                                    <span className="text-slate-500"> = Genius (special talent)</span>
                                </div>
                                <div>
                                    <span className="text-slate-900 font-black">WISH</span>
                                    <span className="text-slate-500"> = Wind (in Korean)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CertificationsPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader
                    label="CERTIFICATE"
                    title="Certifications"
                    subtitle="HS TECH maintains globally recognized quality management certifications ensuring the highest standards."
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {CERTIFICATIONS.map(cert => (
                        <div key={cert.id} className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50">
                                <Image src={cert.img} alt={cert.label} fill className="object-contain p-2" />
                            </div>
                            <div className="p-3 text-center border-t border-neutral-100">
                                <div className="text-slate-800 font-black text-sm">{cert.label}</div>
                                <div className="text-slate-400 text-[10px] mt-1">Since {cert.year}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                    <h3 className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-4">Quality Standards</h3>
                    <div className="space-y-0">
                        {[
                            { cert: 'IATF 16949', desc: 'Automotive quality management system standard', year: '2019' },
                            { cert: 'ISO 9001', desc: 'Quality management systems', year: '2018' },
                            { cert: 'Venture Company', desc: 'Korean government venture company certification', year: '2020' },
                            { cert: 'Excellent Technology', desc: 'Nice D&B Co., Ltd. — technology excellence', year: '2019' },
                        ].map((row, i) => (
                            <div key={i} className="flex items-center gap-4 py-3 border-b border-neutral-100 last:border-0">
                                <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                                <div className="w-32 text-slate-800 font-black text-sm flex-shrink-0">{row.cert}</div>
                                <div className="text-slate-500 text-sm flex-1">{row.desc}</div>
                                <div className="text-cyan-600 font-bold text-xs">{row.year}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProcessPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader label="PROCESS" title="Manufacturing Process" subtitle="HS TECH ensures quality at every step of the manufacturing process." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {[1, 2, 3].map(n => (
                        <div key={n} className="relative h-64 overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
                            <Image src={`/templates/air-hstech/images/process-${n}.jpg`} alt={`Process ${n}`} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-4">
                                <span className="text-white font-black text-xs uppercase tracking-widest">{`STEP ${String(n).padStart(2, '0')}`}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        {
                            title: 'Production Excellence',
                            items: [
                                'Strict quality control at all production stages',
                                'IATF 16949 compliant manufacturing processes',
                                'In-house R&D and affiliated research center',
                                'Advanced testing and validation protocols',
                            ]
                        },
                        {
                            title: 'R&D Capabilities',
                            items: [
                                'Company-affiliated research center established 2020',
                                'Digital AI compressor control technology',
                                'Patent-protected engine-off AC solutions',
                                'Ongoing product development for new markets',
                            ]
                        }
                    ].map(sec => (
                        <div key={sec.title} className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                            <h3 className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-4">{sec.title}</h3>
                            <ul className="space-y-3">
                                {sec.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                                        <span className="text-slate-600 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ProductsOverviewPage({ onSelectProduct }: { onSelectProduct: (tab: string) => void }) {
    const productTabs: Record<string, string> = {
        'hsd-180d': 'hsd-180d', 'hsh-260d': 'hsh-260d',
        'hsp-180d': 'hsp-180d', 'hsv-260d': 'hsv-260d',
        'hss-065s': 'hss-065s', 'hs-024h': 'hs-024h', 'hs-220h': 'hs-220h',
        'touch-display': 'controllers', 'btn-display': 'controllers', 'shared-room': 'outdoor-unit',
    }
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    label="PRODUCT"
                    title="Product Lineup"
                    subtitle="GENWISH offers a full range of engine-off DC air conditioning solutions for industrial vehicles, RVs, and marine applications."
                />
                {Object.entries(PRODUCT_CATEGORIES).map(([catId, cat]) => {
                    const catProducts = PRODUCTS.filter(p => p.category === catId)
                    if (catProducts.length === 0) return null
                    return (
                        <div key={catId} className="mb-10">
                            <div className="flex items-center gap-4 mb-5">
                                <h3 className="text-slate-800 font-black text-lg">{cat.label}</h3>
                                <div className="flex-1 h-px bg-neutral-200" />
                                <span className="text-slate-400 text-xs">{cat.desc}</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

function SpecComparisonPage() {
    const acProducts = PRODUCTS.filter(p => p.category === 'separate' || p.category === 'allinone')
    const specLabels = ['Power Supply', 'Refrigerant', 'Cooling Capacity', 'Type']
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
                <SectionHeader label="SPECIFICATIONS" title="Product Comparison" subtitle="Side-by-side specification overview of the GENWISH AC lineup." />
                <div className="overflow-x-auto mb-10">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b-2 border-cyan-500">
                                <th className="text-left py-3 pr-6 text-slate-400 font-bold text-[11px] uppercase tracking-wider w-36">Spec</th>
                                {acProducts.map(p => (
                                    <th key={p.id} className="text-center py-3 px-3 text-cyan-600 font-black text-xs uppercase tracking-wider">
                                        {p.model}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {specLabels.map(specLabel => (
                                <tr key={specLabel} className="border-b border-neutral-100">
                                    <td className="py-3 pr-6 text-slate-400 text-[11px] font-bold uppercase tracking-wider">{specLabel}</td>
                                    {acProducts.map(p => {
                                        const spec = p.specs.find(s => s.label === specLabel)
                                        return (
                                            <td key={p.id} className="py-3 px-3 text-center text-slate-700 text-xs font-medium">
                                                {spec?.value || '—'}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {acProducts.map(p => (
                        <div key={p.id} className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <div className="relative w-full aspect-square overflow-hidden bg-neutral-50">
                                <Image src={p.image} alt={p.model} fill className="object-cover" />
                            </div>
                            <div className="p-3">
                                <div className="text-cyan-600 font-black text-xs mb-1">{p.model}</div>
                                <div className="text-slate-400 text-[10px] leading-snug">{p.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ControllersPage() {
    const controllers = PRODUCTS.filter(p => p.category === 'controller')
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader label="CONTROLLER" title="Display Controllers" subtitle="Intuitive control interfaces designed for GENWISH DC air conditioner systems." />
                <div className="grid md:grid-cols-2 gap-8">
                    {controllers.map(ctrl => (
                        <div key={ctrl.id} className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <div className="relative h-64 overflow-hidden">
                                <Image src={ctrl.image} alt={ctrl.model} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="p-6">
                                <div className="text-cyan-600 font-black text-lg mb-1">{ctrl.model}</div>
                                <div className="text-slate-400 text-xs mb-4">{ctrl.type}</div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">{ctrl.desc}</p>
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

function OutdoorUnitPage() {
    const product = PRODUCTS.find(p => p.id === 'shared-room')!
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader label="ACCESSORY" title="Outdoor Unit Solutions" subtitle="Efficient enclosure systems for GENWISH outdoor units in multi-unit deployments." />
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-80 overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
                        <Image src={product.image} alt={product.model} fill className="object-cover" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-black text-2xl mb-3">{product.name}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 border-l-2 border-cyan-300 pl-4">
                            {product.desc}
                        </p>
                        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 mb-5">
                            <h4 className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-3">Specifications</h4>
                            {product.specs.map(s => <SpecRow key={s.label} label={s.label} value={s.value} />)}
                        </div>
                        {product.features && (
                            <ul className="space-y-2">
                                {product.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">{f}</span>
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

function DCTechPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader label="DC TECHNOLOGY" title="Digital AI Technology" subtitle={DC_TECHNOLOGY.desc} />
                <div className="mb-10">
                    <h3 className="text-slate-900 font-black text-xl mb-6">{DC_TECHNOLOGY.aiControl.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {DC_TECHNOLOGY.aiControl.steps.map((step, i) => (
                            <div key={i} className="border border-neutral-200 bg-white rounded-xl p-5 hover:border-cyan-300 hover:shadow-md transition-all">
                                <div className="text-cyan-500 font-black text-2xl mb-2">{`0${i + 1}`}</div>
                                <div className="text-slate-800 font-bold text-sm mb-2">{step.label}</div>
                                <div className="text-slate-500 text-xs leading-relaxed">{step.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-6">
                    <h3 className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-4">Advantages of Digital AI</h3>
                    <ul className="space-y-3">
                        {DC_TECHNOLOGY.advantages.map((adv, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-sm">{adv}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function NonOperatingPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader
                    label="NON-OPERATING"
                    title="Engine-Off Air Conditioning"
                    subtitle="HS TECH specializes in air conditioning solutions that operate without the vehicle engine running."
                />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {[
                            {
                                title: 'DC Non-Operating',
                                desc: "DC engine-off air conditioners operate on the vehicle's DC battery system, providing cooling and heating without engine operation.",
                                items: ['DC 24V / DC 12V operation', 'R-134A refrigerant system', 'Up to 2,600W cooling capacity', 'AI-controlled compressor'],
                            },
                            {
                                title: 'AC Non-Operating',
                                desc: 'AC engine-off heaters and purifiers work on shore power or generator output during stationary periods.',
                                items: ['AC 220V operation', 'High heating capacity', 'Integrated air purification', 'Commercial-grade performance'],
                            }
                        ].map(sec => (
                            <div key={sec.title} className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                                <h3 className="text-cyan-600 font-black text-xs tracking-wider uppercase mb-3">{sec.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">{sec.desc}</p>
                                <ul className="space-y-2">
                                    {sec.items.map(f => (
                                        <li key={f} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                                            <span className="text-slate-500 text-sm">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
                        <Image src="/templates/air-hstech/images/hero-2.jpg" alt="Engine-off technology" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="text-cyan-300 font-bold text-xs uppercase tracking-widest mb-1">Energy Saving</div>
                            <div className="text-white text-5xl font-black">40%</div>
                            <div className="text-white/60 text-xs mt-1">vs constant-speed operation</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ApplicationPage({ appId }: { appId: string }) {
    const app = APPLICATIONS.find(a => a.id === appId)
    if (!app) return null
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader label="APPLICATION" title={app.title} subtitle={app.desc} />
                {app.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {app.images.map((img, i) => (
                            <div key={i} className="relative h-56 overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
                                <Image src={img} alt={`${app.title} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative h-56 overflow-hidden rounded-xl border border-neutral-200 mb-8">
                        <Image src="/templates/air-hstech/images/hero-3.jpg" alt={app.title} fill className="object-cover" />
                    </div>
                )}
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                    <h3 className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-4">Benefits</h3>
                    <ul className="space-y-3">
                        {app.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-sm">{h}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function LocationPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader label="LOCATION" title="Find Us" />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                        <h3 className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-5">Headquarters</h3>
                        <div className="space-y-4">
                            {[
                                { Icon: MapPin, label: 'Address', value: COMPANY.address },
                                { Icon: Phone, label: 'Phone', value: COMPANY.tel },
                                { Icon: Printer, label: 'Fax', value: COMPANY.fax },
                                { Icon: Mail, label: 'Email', value: COMPANY.email },
                                { Icon: Clock, label: 'Hours', value: COMPANY.inquiryHours },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-cyan-50 border border-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Icon className="w-3.5 h-3.5 text-cyan-500" />
                                    </div>
                                    <div>
                                        <div className="text-slate-800 font-bold text-xs mb-0.5">{label}</div>
                                        <div className="text-slate-500 text-sm">{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-80 md:h-full overflow-hidden rounded-xl border border-neutral-200 shadow-sm min-h-[280px]">
                        <Image src="/templates/air-hstech/images/hero-3.jpg" alt="Busan, Korea" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-5 left-5">
                            <div className="text-cyan-300 font-bold text-[10px] uppercase tracking-widest mb-1">Location</div>
                            <div className="text-white font-black text-lg">Busan, Republic of Korea</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ContactPage() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-16 flex items-center">
            <div className="max-w-4xl mx-auto w-full">
                <SectionHeader label="CONTACT" title="Get In Touch" subtitle="Partnership inquiry and product inquiries welcome." />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                        {[
                            { Icon: Phone, label: 'Phone', value: COMPANY.tel },
                            { Icon: Printer, label: 'Fax', value: COMPANY.fax },
                            { Icon: Mail, label: 'Email', value: COMPANY.email },
                            { Icon: Clock, label: 'Hours', value: COMPANY.inquiryHours },
                        ].map(item => (
                            <div key={item.label} className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-cyan-50 border border-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <item.Icon className="w-4 h-4 text-cyan-500" />
                                </div>
                                <div>
                                    <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">{item.label}</div>
                                    <div className="text-slate-800 text-sm font-medium">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8">
                        <div className="text-center mb-6">
                            <Image
                                src="/templates/air-hstech/images/logo-top.png"
                                alt="HS TECH"
                                width={160}
                                height={41}
                                className="object-contain mx-auto mb-3"
                            />
                            <div className="text-slate-500 text-sm mt-2">{COMPANY.tagline}</div>
                        </div>
                        <div className="space-y-2 text-xs text-slate-400 border-t border-neutral-200 pt-4">
                            <div>Company: <span className="text-slate-600">{COMPANY.name}</span></div>
                            <div>Business Reg: <span className="text-slate-600">{COMPANY.businessReg}</span></div>
                            <div>CEO: <span className="text-slate-600">{COMPANY.ceo}</span></div>
                            <div>Country: <span className="text-slate-600">{COMPANY.country}</span></div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-6 border-t border-neutral-100 text-center text-slate-400 text-xs">
                    2019 Copyright all reserved. HS TECH.
                </div>
            </div>
        </div>
    )
}

// ─── Image Lightbox ───────────────────────────────────────────────────────────
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-4xl w-full mx-6"
                onClick={(e) => e.stopPropagation()}
            >
                <Image src={src} alt={alt} width={1200} height={900} className="object-contain w-full max-h-[85vh] rounded-xl" />
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                    <X className="w-4 h-4 text-slate-600" />
                </button>
            </motion.div>
        </motion.div>
    )
}

// ─── Product Detail Page ──────────────────────────────────────────────────────
function ProductDetailPage({ productId }: { productId: string }) {
    const product = getProduct(productId)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    if (!product) return null
    return (
        <div className="min-h-screen bg-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <SectionHeader label={product.type} title={product.model} subtitle={product.name} />
                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Image — click to enlarge */}
                    <div>
                        <div
                            className="relative h-64 md:h-80 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 cursor-zoom-in group"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <Image src={product.image} alt={product.model} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-mono tracking-wider bg-white/80 px-2 py-0.5 rounded">
                                CLICK TO ENLARGE
                            </div>
                        </div>
                        {product.features && product.features.length > 0 && (
                            <div className="mt-4 bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                                <h3 className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-3">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-600 text-sm">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Info */}
                    <div>
                        <div className="text-slate-500 text-sm mb-3">{product.name}</div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 border-l-2 border-cyan-200 pl-4">
                            {product.desc}
                        </p>
                        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5">
                            <h3 className="text-cyan-600 font-black text-[10px] tracking-wider uppercase mb-4">Specifications</h3>
                            {product.specs.map(spec => (
                                <SpecRow key={spec.label} label={spec.label} value={spec.value} />
                            ))}
                            <SpecRow label="Brand" value="GENWISH" />
                            <SpecRow label="Manufacturer" value="HS TECH" />
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {lightboxOpen && (
                    <ImageLightbox src={product.image} alt={product.model} onClose={() => setLightboxOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Bottom-Right Page Navigator (의료 HS-TECH 스타일) ────────────────────────
function PageNavigator({ currentTab, onNavigate }: { currentTab: string; onNavigate: (tab: string) => void }) {
    const ctx = getNavContext(currentTab)
    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
            <div className="flex items-center bg-white border border-neutral-200 rounded-xl py-2.5 px-5 shadow-lg gap-4 font-mono">
                <button
                    onClick={() => ctx.prev && onNavigate(ctx.prev.tab)}
                    disabled={!ctx.prev}
                    className="text-neutral-300 hover:text-cyan-500 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                </button>
                <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-2xl font-black text-cyan-600">{String(ctx.position).padStart(2, '0')}</span>
                    <span className="text-neutral-300 text-sm">/</span>
                    <span className="text-sm md:text-base text-neutral-400 font-bold">{String(ctx.total).padStart(2, '0')}</span>
                </div>
                <button
                    onClick={() => ctx.next && onNavigate(ctx.next.tab)}
                    disabled={!ctx.next}
                    className="text-neutral-300 hover:text-cyan-500 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                </button>
            </div>
        </div>
    )
}

// ─── Main Catalog Component ───────────────────────────────────────────────────
function AirHSTechLightCatalog() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const rawTab = searchParams.get('tab') || 'cover'
    const currentTab = ALL_TABS.includes(rawTab) ? rawTab : 'cover'

    const navigate = useCallback((tab: string) => {
        router.push(`?tab=${tab}`, { scroll: false })
    }, [router])

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
            case 'greeting':     return <GreetingPage />
            case 'history':      return <HistoryPage />
            case 'brand':        return <BrandPage />
            case 'certifications': return <CertificationsPage />
            case 'process':      return <ProcessPage />
            case 'products':     return <ProductsOverviewPage onSelectProduct={navigate} />
            case 'spec-compare': return <SpecComparisonPage />
            case 'hsd-180d':
            case 'hsh-260d':
            case 'hsp-180d':
            case 'hsv-260d':
            case 'hss-065s':
            case 'hs-024h':
            case 'hs-220h':      return <ProductDetailPage productId={currentTab} />
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
        <div className="min-h-screen bg-white text-slate-800 antialiased">
            {/* Header */}
            {currentTab !== 'cover' && (
                <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
                    <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
                        <button onClick={() => navigate('cover')} className="flex items-center">
                            <Image
                                src="/templates/air-hstech/images/logo-top.png"
                                alt="HS TECH"
                                width={120}
                                height={31}
                                className="object-contain hover:opacity-80 transition-opacity"
                            />
                        </button>
                        <nav className="hidden md:flex items-center gap-6">
                            {['about', 'products', 'dc-tech', 'crane', 'contact'].map(tab => {
                                const page = BROCHURE_FLOW.find(p => p.tab === tab)
                                const isActive = currentTab === tab || (tab === 'products' && PRODUCT_DETAIL_TABS.includes(currentTab))
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => navigate(tab)}
                                        className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                                            isActive ? 'text-cyan-600' : 'text-slate-400 hover:text-slate-700'
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

            {/* Page Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderPage()}
                </motion.div>
            </AnimatePresence>

            {/* Bottom-right navigator */}
            <PageNavigator currentTab={currentTab} onNavigate={navigate} />

        </div>
    )
}

export default function AirHSTechLightPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-cyan-500 font-black text-sm tracking-widest animate-pulse">LOADING...</div>
            </div>
        }>
            <AirHSTechLightCatalog />
        </Suspense>
    )
}
