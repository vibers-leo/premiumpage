'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Globe, Layers, MessageSquare, ShieldCheck,
  Zap, Clock, CheckCircle2, Rocket, Languages, BookOpen,
  ExternalLink, X, ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// ─── Portfolio Data ────────────────────────────────────────────────────────
const portfolios = [
  {
    id: 'emt',
    title: 'EMT GLOBAL',
    subtitle: 'Smart Sensor · Automotive',
    accent: '#22d3ee',
    bg: '#030711',
    image: '/emt/assets/19.png',
    imageMode: 'contain' as const,
    tags: ['3D HUD Interface', '31개 제품', '한/영 이중언어', '모달 상세보기'],
    description: '자동차용 스마트 센서·액추에이터 전문 기업의 31개 제품을 3D HUD 인터페이스로 구현했습니다. 한국어·영어 이중언어를 완벽 지원하며, 각 제품별 상세 스펙 모달을 통해 바이어가 필요한 정보를 즉시 확인할 수 있습니다.',
    links: [
      { label: 'EN 버전 열기', url: 'https://emt.premiumpage.kr', primary: true },
      { label: 'KR 버전 열기', url: 'https://emt-ko.premiumpage.kr', primary: false },
    ],
    featured: true,
  },
  {
    id: 'hstech',
    title: 'HS-TECH',
    subtitle: 'Industrial Sensor · Multi-brand',
    accent: '#60a5fa',
    bg: '#0a0f1e',
    image: '/templates/hs-tech/images/hmt330_6models_grid.jpg',
    imageMode: 'cover' as const,
    tags: ['80+ 제품', '4개 브랜드', '한/영 이중언어', 'VAISALA · SETRA'],
    description: 'VAISALA, SETRA, JUMO, KNICK 등 4개 글로벌 브랜드의 80개 이상 산업용 센서를 계층 구조로 정리했습니다. 브랜드별 제품 탐색과 상세 스펙 확인이 가능하며 한국어·영어 이중언어를 지원합니다.',
    links: [
      { label: 'EN 버전 열기', url: 'https://hstech.premiumpage.kr', primary: true },
      { label: 'KR 버전 열기', url: 'https://hstech-kr.premiumpage.kr', primary: false },
    ],
    featured: true,
  },
  {
    id: 'genwish',
    title: 'GENWISH',
    subtitle: 'DC Air-Con · Light Mode',
    accent: '#34d399',
    bg: '#e8f0f8',
    image: '/templates/air-hstech/images/HSD-180D.jpg',
    imageMode: 'cover' as const,
    tags: ['25페이지', '라이트 테마', '크레인·캠핑카·선박', '영문'],
    description: '크레인, 캠핑카, 선박 등 특수 산업 환경용 DC 에어컨 전문 브랜드. 25페이지 라이트 테마로 제작되어 밝고 직관적인 제품 탐색을 지원합니다.',
    links: [
      { label: 'EN 버전 열기', url: 'https://hstechco.premiumpage.kr', primary: true },
    ],
    featured: false,
  },
  {
    id: 'gentop',
    title: 'GENTOP IND.',
    subtitle: 'Security Solution · Dark Mode',
    accent: '#818cf8',
    bg: '#0f172a',
    image: null,
    imageMode: 'contain' as const,
    tags: ['다크 테마', 'CCTV·출입통제', '주차관제', '영문'],
    description: '보안 솔루션 전문 기업의 전자카탈로그. CCTV 시스템, 출입통제, 주차관제를 딥 블루 다크 테마로 고급스럽게 구현했습니다.',
    links: [
      { label: 'EN 버전 열기', url: 'https://gentop.premiumpage.kr', primary: true },
    ],
    featured: false,
  },
  {
    id: 'hangseong',
    title: '항성산업사',
    subtitle: 'Industrial Equipment · B2B',
    accent: '#fbbf24',
    bg: '#111',
    image: '/templates/hangseong/images/background_01.png',
    imageMode: 'cover' as const,
    tags: ['B2B 산업기계', '영문 카탈로그', '수출용'],
    description: '산업용 B2B 기업의 영문 전자카탈로그. 해외 수출을 위한 영문 최적화와 제품 라인업을 깔끔하게 정리했습니다.',
    links: [
      { label: 'EN 버전 열기', url: 'https://hangseong.premiumpage.kr', primary: true },
    ],
    featured: false,
  },
]

// ─── Counter Hook ──────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return { count, ref }
}

// ─── Sub Components ────────────────────────────────────────────────────────
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value)
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black tracking-tighter mb-1 text-slate-900">
        {count}<span className="text-violet-600">{suffix}</span>
      </div>
      <div className="text-slate-500 font-semibold text-xs uppercase tracking-widest">{label}</div>
    </div>
  )
}

function WhyCard({ number, icon, title, highlight, desc }: {
  number: string; icon: React.ReactNode; title: string; highlight: string; desc: string
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
          {icon}
        </div>
        <span className="text-3xl font-black text-slate-100 group-hover:text-violet-100 transition-colors">{number}</span>
      </div>
      <h3 className="text-lg font-black text-slate-900 mb-1">{title}</h3>
      <div className="text-violet-600 font-semibold text-sm mb-3">{highlight}</div>
      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </motion.div>
  )
}

function ProcessStep({ number, icon, title, items }: {
  number: string; icon: React.ReactNode; title: string; items: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-violet-200">
        {icon}
      </div>
      <div className="text-violet-600 font-black text-xs tracking-widest uppercase mb-2">{number}</div>
      <h3 className="text-xl font-black text-slate-900 mb-5">{title}</h3>
      <ul className="space-y-2.5 text-left w-full">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-slate-500 text-sm">
            <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ─── Portfolio Card ────────────────────────────────────────────────────────
function PortfolioCard({
  p, size, onClick
}: {
  p: typeof portfolios[0]
  size: 'large' | 'small'
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${size === 'large' ? 'h-64 md:h-72' : 'h-48'}`}
        style={{ backgroundColor: p.bg }}
      >
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title}
            fill
            className={`transition-transform duration-500 group-hover:scale-105 ${
              p.imageMode === 'contain' ? 'object-contain p-8 opacity-80' : 'object-cover opacity-70 group-hover:opacity-85'
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-slate-800/40 to-slate-900 flex items-center justify-center">
            <ShieldCheck className="w-16 h-16 text-indigo-400 opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-violet-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center">
            <ArrowUpRight className="w-8 h-8 mx-auto mb-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span className="font-bold text-sm">자세히 보기</span>
          </div>
        </div>

        {/* Accent tag */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{ backgroundColor: `${p.accent}22`, color: p.accent, border: `1px solid ${p.accent}44` }}
          >
            {p.tags[0]}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-1">{p.subtitle}</div>
        <h3 className={`font-black text-slate-900 mb-3 ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>{p.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.slice(1, 3).map(tag => (
            <span key={tag} className="text-xs bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Portfolio Modal ────────────────────────────────────────────────────────
function PortfolioModal({ p, onClose }: { p: typeof portfolios[0]; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        />

        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed z-50 inset-x-4 top-[4vh] bottom-[4vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Image header */}
          <div className="relative h-56 md:h-64 shrink-0" style={{ backgroundColor: p.bg }}>
            {p.image ? (
              <Image
                src={p.image}
                alt={p.title}
                fill
                className={`${p.imageMode === 'contain' ? 'object-contain p-10 opacity-80' : 'object-cover opacity-70'}`}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-slate-800 to-slate-900 flex items-center justify-center">
                <ShieldCheck className="w-20 h-20 text-indigo-400 opacity-30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title */}
            <div className="absolute bottom-5 left-6 right-16">
              <div
                className="text-[10px] font-black uppercase tracking-widest mb-1"
                style={{ color: p.accent }}
              >
                {p.subtitle}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">{p.title}</h3>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {p.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-8">{p.description}</p>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-3">
              {p.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 h-12 px-7 rounded-full font-bold text-sm transition-all ${
                    link.primary
                      ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200 hover:-translate-y-0.5'
                      : 'border-2 border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-600 bg-white'
                  }`}
                >
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function PremiumLandingPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<typeof portfolios[0] | null>(null)

  return (
    <div className="flex flex-col w-full bg-white text-slate-900 selection:bg-violet-200">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 · HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-white">
        {/* Soft background blobs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-violet-50 rounded-full blur-[120px] opacity-80 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24 md:py-32">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-8">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs font-black tracking-widest uppercase text-violet-700">전자카탈로그 전문 에이전시</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-slate-900 mb-6">
              CATALOG<br />
              <span className="text-violet-600">THAT SELLS</span><br />
              GLOBALLY
            </h1>

            <p className="text-lg text-slate-500 max-w-lg mb-3 leading-relaxed">
              종이 브로슈어는 그만. 해외 바이어가 직접 체험하는
              <strong className="text-slate-700"> 인터랙티브 전자카탈로그</strong>를
              <strong className="text-violet-600"> 빠르게</strong> 제작해 드립니다.
            </p>
            <p className="text-sm text-slate-400 mb-10">
              한/영 이중언어 · 3D 인터랙티브 · 글로벌 CDN 배포 포함
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button
                asChild
                className="h-13 px-8 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-base gap-2 shadow-lg shadow-violet-200 hover:-translate-y-0.5 transition-all"
              >
                <Link href="#portfolio">
                  납품 사례 보기 <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Link
                href="/quote"
                className="flex items-center gap-2 h-13 px-7 rounded-full border-2 border-slate-200 text-slate-700 font-bold text-base hover:border-violet-300 hover:text-violet-600 transition-all"
              >
                무료 상담 신청 <MessageSquare className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Catalog card stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[500px] h-[420px]">
              {/* Card 1 — back */}
              <div className="absolute top-0 left-0 w-[75%] rounded-2xl overflow-hidden shadow-xl rotate-[-7deg] origin-bottom-left opacity-50">
                <div className="relative aspect-[4/3]" style={{ backgroundColor: '#0a0f1e' }}>
                  <Image src="/templates/hs-tech/images/hmt330_6models_grid.jpg" alt="HS-TECH" fill className="object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-[9px] font-black text-blue-300 tracking-widest uppercase">HS-TECH</div>
                </div>
              </div>

              {/* Card 2 — mid */}
              <div className="absolute top-6 right-0 w-[75%] rounded-2xl overflow-hidden shadow-xl rotate-[5deg] origin-bottom-right opacity-70">
                <div className="relative aspect-[4/3]" style={{ backgroundColor: '#e8f0f8' }}>
                  <Image src="/templates/air-hstech/images/HSD-180D.jpg" alt="GENWISH" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-[9px] font-black text-emerald-300 tracking-widest uppercase">GENWISH</div>
                </div>
              </div>

              {/* Card 3 — front */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] rounded-2xl overflow-hidden shadow-2xl z-10 ring-1 ring-slate-200">
                <div className="relative aspect-[4/3]" style={{ backgroundColor: '#030711' }}>
                  <Image src="/emt/assets/19.png" alt="EMT" fill className="object-contain p-8 opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="text-[9px] font-black text-cyan-300 tracking-widest uppercase mb-0.5">EMT GLOBAL</div>
                    <div className="text-[10px] text-white/50">3D HUD · 31 Products · EN/KR</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-violet-400" />
          <span className="text-[9px] font-black tracking-widest uppercase text-slate-400">Scroll</span>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 · STATS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StatItem value={5} suffix="+" label="납품 기업" />
            <StatItem value={130} suffix="+" label="제작 페이지" />
            <StatItem value={2} suffix="개" label="지원 언어 (KO/EN)" />
            <StatItem value={30} suffix="일" label="평균 납기" />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 · WHY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="why" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-black uppercase tracking-widest mb-5">
              <ShieldCheck className="w-3.5 h-3.5" /> Why Premium Page
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4">
              왜 여기서<br />
              <span className="text-violet-600">의뢰해야 할까요?</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              일반 웹개발사, 디자인 에이전시와는 다릅니다.<br />
              전자카탈로그 하나에만 집중하기 때문에 수준이 다릅니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <WhyCard
              number="01"
              icon={<BookOpen className="w-5 h-5" />}
              title="전자카탈로그 전문 에이전시"
              highlight="기획부터 배포까지 원스톱"
              desc="제품 스펙 정리, 다국어 번역, 인터랙티브 구현, 글로벌 CDN 배포까지 한 팀이 처리합니다. 여러 곳을 돌아다닐 필요 없습니다."
            />
            <WhyCard
              number="02"
              icon={<Zap className="w-5 h-5" />}
              title="인터랙티브 3D 기술"
              highlight="종이 브로슈어 대비 체류시간 3배"
              desc="Framer Motion과 3D HUD 인터페이스로 해외 바이어가 직접 제품을 탐색하는 경험을 설계합니다. 단순 PDF가 아닌 살아있는 카탈로그입니다."
            />
            <WhyCard
              number="03"
              icon={<Languages className="w-5 h-5" />}
              title="한/영 이중언어 완성"
              highlight="해외 바이어가 직접 사용 가능한 수준"
              desc="원본 홈페이지 텍스트를 기반으로 영문화 작업을 진행합니다. SEO까지 고려한 구조로 구글 검색에서도 노출됩니다."
            />
            <WhyCard
              number="04"
              icon={<Rocket className="w-5 h-5" />}
              title="30일 납기 + 글로벌 CDN"
              highlight="전용 도메인 세팅 포함"
              desc="제작 완료 후 xxx.premiumpage.kr 전용 서브도메인으로 즉시 배포합니다. Vercel CDN으로 미국·유럽·아시아 어디서나 빠른 로딩을 보장합니다."
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 · PORTFOLIO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="portfolio" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-14 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-black uppercase tracking-widest mb-5">
                <Layers className="w-3.5 h-3.5" /> Live Catalogs
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-3">
                실제 납품된 <span className="text-violet-600">카탈로그 사례</span>
              </h2>
              <p className="text-slate-500">카드를 클릭하면 상세 정보와 라이브 링크를 확인할 수 있습니다.</p>
            </motion.div>
            <Button asChild variant="outline" className="rounded-full border-2 border-slate-200 h-11 px-8 font-bold text-sm hover:border-violet-300 hover:text-violet-600 transition-all shrink-0">
              <Link href="/templates">전체 보기 <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
            </Button>
          </div>

          {/* Featured: 2 large */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {portfolios.filter(p => p.featured).map(p => (
              <PortfolioCard key={p.id} p={p} size="large" onClick={() => setSelectedPortfolio(p)} />
            ))}
          </div>

          {/* Rest: 3 small */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portfolios.filter(p => !p.featured).map(p => (
              <PortfolioCard key={p.id} p={p} size="small" onClick={() => setSelectedPortfolio(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 · PROCESS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4">
              의뢰에서 납품까지 <span className="text-violet-600">딱 3단계</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              자료만 주시면 나머지는 저희가 합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-violet-200 via-violet-400 to-violet-200" />
            <ProcessStep
              number="STEP 01"
              icon={<MessageSquare className="w-6 h-6" />}
              title="무료 상담"
              items={['보유 자료(홈페이지, PDF) 공유', '제품 종류 및 페이지 수 파악', '맞춤 견적 및 일정 안내']}
            />
            <ProcessStep
              number="STEP 02"
              icon={<Layers className="w-6 h-6" />}
              title="제작 & 중간 리뷰"
              items={['데이터 추출 및 영문화 작업', '디자인 + 인터랙션 개발', '중간 리뷰 후 수정 반영']}
            />
            <ProcessStep
              number="STEP 03"
              icon={<Globe className="w-6 h-6" />}
              title="납품 & 배포"
              items={['전용 서브도메인 세팅 포함', '글로벌 CDN 배포 (즉시 접속)', 'PDF 버전 생성 후 전달']}
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 · CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-32 relative overflow-hidden bg-violet-600">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-800/40 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-black uppercase tracking-widest mb-8">
              <Clock className="w-3.5 h-3.5" /> 30일 납기 보장
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-none">
              귀사의 카탈로그,<br />30일 후 전 세계에
            </h2>
            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              영업일 기준 1일 이내 연락드립니다.<br />
              견적은 무료이며, 부담 없이 문의하셔도 됩니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-12 rounded-full bg-white text-violet-700 font-black text-lg hover:bg-violet-50 hover:-translate-y-0.5 transition-all shadow-xl shadow-violet-900/30">
                <Link href="/quote">무료 상담 신청하기</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-12 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all">
                <Link href="#portfolio">포트폴리오 먼저 보기</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="py-16 bg-slate-900 text-slate-400">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="text-xl font-black text-white mb-3 tracking-tight">Premium Page</div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              수출 기업을 위한 인터랙티브 전자카탈로그 전문 에이전시.<br />
              한/영 · 3D · 글로벌 CDN
            </p>
          </div>
          <div>
            <div className="font-black text-xs uppercase tracking-widest text-slate-500 mb-4">Services</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/templates" className="hover:text-violet-400 transition-colors">전자카탈로그 제작</Link></li>
              <li><Link href="/templates" className="hover:text-violet-400 transition-colors">3D 인터랙티브 쇼케이스</Link></li>
              <li><Link href="/quote" className="hover:text-violet-400 transition-colors">무료 상담 신청</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-black text-xs uppercase tracking-widest text-slate-500 mb-4">Quick Links</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#why" className="hover:text-violet-400 transition-colors">Why Us</Link></li>
              <li><Link href="/#portfolio" className="hover:text-violet-400 transition-colors">포트폴리오</Link></li>
              <li><Link href="/quote" className="hover:text-violet-400 transition-colors">의뢰 문의</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-slate-600 text-xs">© 2026 Premium Page. All rights reserved.</p>
          <div className="flex gap-6 text-slate-600 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PORTFOLIO MODAL
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {selectedPortfolio && (
          <PortfolioModal p={selectedPortfolio} onClose={() => setSelectedPortfolio(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
