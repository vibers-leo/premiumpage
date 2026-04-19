'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  ArrowRight, Globe, Layers, MousePointer2, TrendingUp, Sparkles, MessageSquare,
  Check, Star, ChevronDown, Mail, Phone,
  Building2, Shield, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

import { developmentPlans } from '@/lib/data'

// ─── Counter Animation Hook ───
function useCountUp(end: number, duration: number = 2) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      animate(motionValue, end, { duration, ease: 'easeOut' })
    }
  }, [isInView, end, duration, motionValue])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v.toString()
    })
    return unsubscribe
  }, [rounded])

  return ref
}

// ─── FAQ Item Component ───
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <div className="flex items-center gap-6">
          <span className="text-xs font-bold text-neutral-300 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-base font-bold group-hover:text-neutral-900 transition-colors">{question}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 ml-4">
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </motion.div>
      </button>
      {isOpen && (
        <div className="pl-12 pb-6">
          <p className="text-neutral-500 leading-relaxed text-sm">{answer}</p>
        </div>
      )}
    </div>
  )
}

// ─── Portfolio Data ───
const portfolioItems = [
  {
    id: 'emt',
    title: 'EMT GLOBAL',
    category: 'Smart Sensor / 3D HUD Interface',
    image: '/og/emt.png',
    links: [
      { label: '영문 버전', href: 'https://emt.premiumpage.kr', primary: true },
      { label: '한글 버전', href: 'https://emt-ko.premiumpage.kr', primary: false },
    ],
  },
  {
    id: 'hstech',
    title: 'HS-TECH',
    category: 'Industrial Sensor / Product Hierarchy',
    image: '/og/hstech.png',
    links: [
      { label: '영문 버전', href: 'https://hstech.premiumpage.kr', primary: true },
    ],
  },
  {
    id: 'gentop',
    title: 'GENTOP IND.',
    category: 'Construction & Facilities Management',
    image: '/og/gentop.png',
    links: [
      { label: '브랜드 쇼케이스', href: 'https://gentop.premiumpage.kr', primary: true },
    ],
  },
  {
    id: 'genwish',
    title: 'HSTECH',
    category: 'DC Engine-Off Air Conditioning',
    image: '/og/genwish.png',
    links: [
      { label: '브랜드 쇼케이스', href: 'https://hstechco.premiumpage.kr', primary: true },
    ],
  },
]

// ─── FAQ Data ───
const faqData = [
  { q: '전자카탈로그 제작 기간은 얼마나 걸리나요?', a: 'PDF 변환은 약 1주일, Standard 커스텀 제작은 2~4주, Master 3D 하이엔드는 4~8주 정도 소요됩니다. 프로젝트 복잡도에 따라 조정될 수 있습니다.' },
  { q: '기존 PDF 파일을 그대로 웹으로 변환할 수 있나요?', a: '네, Lite 플랜을 통해 기존 PDF를 페이지 넘김 효과가 있는 웹 뷰어로 빠르게 변환할 수 있습니다. 모바일 최적화와 QR 코드도 기본 제공됩니다.' },
  { q: '다국어 지원은 어떻게 되나요?', a: 'Standard 플랜은 최대 3개 국어, Master 플랜은 무제한 다국어를 지원합니다. URL 경로 기반으로 언어를 자동 분기하여 각국 바이어에게 최적의 경험을 제공합니다.' },
  { q: '제작 후 수정은 가능한가요?', a: '유지보수 플랜 가입 시 Basic은 월 1회, Premium은 월 5회 스펙 정보 수정이 가능합니다. 대규모 수정이나 추가 기능 개발은 별도 견적으로 진행됩니다.' },
  { q: '호스팅과 도메인은 어떻게 관리되나요?', a: '전용 서브도메인(예: yourcompany.premiumpage.kr)을 제공하며, 글로벌 CDN을 통해 전 세계 어디서든 빠른 로딩 속도를 보장합니다. 커스텀 도메인 연결도 가능합니다.' },
  { q: '환불 정책은 어떻게 되나요?', a: '개발 시작 전까지 100% 환불 가능합니다. 개발 시작 후에는 진행 단계에 따라 부분 환불이 적용됩니다. 자세한 사항은 컨설팅 시 안내드립니다.' },
]

// ─── Testimonials Data ───
const testimonials = [
  {
    name: 'K사 수출팀장',
    company: '산업용 센서 제조',
    content: '해외 바이어 미팅에서 전자카탈로그를 보여주니 반응이 완전히 달랐습니다. 기존 PDF 대비 상담 전환율이 3배 이상 높아졌습니다.',
    rating: 5,
  },
  {
    name: 'P사 마케팅 이사',
    company: '보안 솔루션 기업',
    content: '3D 인터랙티브 카탈로그 덕분에 글로벌 전시회에서 큰 주목을 받았습니다. 투자 대비 효과가 탁월합니다.',
    rating: 5,
  },
  {
    name: 'L사 해외영업 팀장',
    company: '전장부품 제조',
    content: '영문/한글 동시 지원이 정말 편리합니다. URL만 바꾸면 언어가 전환되니 각국 바이어에게 맞춤 대응이 가능해졌습니다.',
    rating: 5,
  },
]

// ─── Client Logos ───
const clientLogos = ['EMT', 'HS-TECH', 'GENTOP', 'GENWISH', '항성산업사']

export default function PremiumLandingPage() {
  return (
    <div className="flex flex-col w-full bg-white text-neutral-900">

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative w-full border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-4 pb-16 md:pt-8 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-neutral-300 mb-8">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500">글로벌 성장 파트너</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.05] mb-8">
              GLOBAL SUCCESS<br />
              BEYOND<br />
              <span className="text-neutral-400">DISCOVERY</span>
            </h1>

            <p className="text-lg text-neutral-500 max-w-lg mb-12 leading-relaxed">
              수출 유망 기업의 가치를 세계 시장에 각인시키는
              하이엔드 인터랙티브 전자 카탈로그 에이전시,
              <span className="text-neutral-900 font-bold"> Premium Page</span>입니다.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button asChild className="h-12 px-8 rounded-none bg-neutral-900 text-white font-bold text-sm border border-neutral-900 hover:bg-neutral-700 transition-all">
                <Link href="/templates">
                  포트폴리오 보기 <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Link href="/quote" className="group text-neutral-500 hover:text-neutral-900 transition-all flex items-center gap-2 font-bold px-8 py-3 border border-neutral-300 hover:border-neutral-900 text-sm h-12">
                글로벌 컨설팅 요청 <MessageSquare className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-[480px] ml-auto border border-neutral-200 bg-neutral-50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-12">
                  <div className="w-px h-16 bg-neutral-300 mx-auto mb-8" />
                  <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-4">Interactive Experience</div>
                  <div className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-4">Modern Luxury<br />Display</div>
                  <div className="text-xs text-neutral-400">3D Masterpiece Preview</div>
                  <div className="w-px h-16 bg-neutral-300 mx-auto mt-8" />
                </div>
              </div>
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-neutral-300" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-neutral-300" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-neutral-300" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-neutral-300" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CLIENT LOGOS ═══════════════ */}
      <section className="py-10 border-b border-neutral-200 overflow-hidden">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="flex items-center justify-between gap-12">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 whitespace-nowrap">
              파트너사
            </p>
            <div className="flex items-center gap-12 overflow-hidden">
              {clientLogos.map((logo, i) => (
                <div key={i} className="text-sm font-bold text-neutral-300 whitespace-nowrap tracking-tight">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS SECTION ═══════════════ */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200">
            <StatItem end={50} suffix="+" label="글로벌 기업 파트너" icon={<Building2 className="w-5 h-5" />} />
            <StatItem end={200} suffix="+" label="제작된 카탈로그 페이지" icon={<FileText className="w-5 h-5" />} />
            <StatItem end={15} suffix="+" label="서비스 국가" icon={<Globe className="w-5 h-5" />} />
            <StatItem end={99} suffix=".9%" label="서비스 가동률" icon={<Shield className="w-5 h-5" />} />
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO SHOWCASE ═══════════════ */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
                <div className="w-8 h-px bg-neutral-300" />
                주요 작품
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                우리는 단순한 웹사이트를<br />
                만들지 않습니다.
              </h2>
              <p className="text-neutral-500 text-lg leading-relaxed">
                글로벌 챔피언을 위한 가장 진보된 3D 엔진과 인터랙티브 스토리텔링.
                해외 바이어를 매료시키는 압도적인 퀄리티를 확인해보세요.
              </p>
            </div>
            <Button asChild className="rounded-none border border-neutral-900 bg-transparent text-neutral-900 h-12 px-8 text-sm font-bold hover:bg-neutral-900 hover:text-white transition-all">
              <Link href="/templates">전체 포트폴리오 <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] bg-neutral-900 overflow-hidden"
              >
                {item.image && (
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-all duration-500 group-hover:scale-105">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3">{item.category}</div>
                  <h3 className="text-2xl font-extrabold text-white mb-5 tracking-tight">{item.title}</h3>
                  <div className="flex gap-3 flex-wrap">
                    {item.links.map((link, j) => (
                      <a
                        key={j}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-bold px-5 py-2.5 transition-all ${j === 0 ? 'bg-white text-neutral-900 hover:bg-neutral-200' : 'border border-white/30 text-white hover:border-white'}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ STRATEGIC PROCESS ═══════════════ */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="mb-20">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              제작 과정
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">전략적 제작 프로세스</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-neutral-200">
            {[
              { number: '01', title: 'Strategy', desc: '해외 시장 분석 및 기업의 핵심 경쟁력을 도출하여 맞춤형 스토리텔링 전략을 수립합니다.', icon: <TrendingUp className="w-5 h-5" /> },
              { number: '02', title: 'Creative', desc: '브랜드 아이덴티티를 극대화하는 하이엔드 UI/UX 디자인과 독보적인 그래픽을 설계합니다.', icon: <Layers className="w-5 h-5" /> },
              { number: '03', title: 'Interaction', desc: 'Three.js와 스크롤 애니메이션 등 최신 기술을 활용해 바이어의 몰입감을 극대화합니다.', icon: <MousePointer2 className="w-5 h-5" /> },
              { number: '04', title: 'Global', desc: '초고속 글로벌 CDN과 다국어 최적화를 통해 전 세계 어디서든 완벽한 경험을 제공합니다.', icon: <Globe className="w-5 h-5" /> },
            ].map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 group hover:bg-neutral-50 transition-colors"
              >
                <div className="text-[11px] font-bold text-neutral-300 mb-6">{step.number}</div>
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:border-neutral-900 group-hover:text-neutral-900 transition-all mb-6">
                  {step.icon}
                </div>
                <h3 className="text-lg font-extrabold mb-3 tracking-tight">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICE LINEUP ═══════════════ */}
      <section className="py-16 md:py-20 border-b border-neutral-200 bg-neutral-50">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="mb-20">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              서비스
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              두 가지 전문 서비스
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl">
              인터랙티브 전자카탈로그부터 PPT 제안서까지, 기업의 핵심 콘텐츠를 전문가가 설계합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
            {/* 전자카탈로그 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10"
            >
              <div className="text-[11px] font-bold text-neutral-300 mb-6">01</div>
              <h3 className="text-2xl font-extrabold mb-4 tracking-tight">전자카탈로그</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                PDF를 넘어선 인터랙티브 디지털 경험. 3D 모델링, 다국어, 스크롤 애니메이션으로
                해외 바이어의 몰입감을 극대화합니다.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Basic', 'Pro', 'Master'].map(t => (
                  <span key={t} className="text-[11px] font-bold border border-neutral-200 px-3 py-1">{t}</span>
                ))}
              </div>
              <Link href="/pricing" className="text-sm font-bold text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-neutral-500 transition-colors inline-flex items-center gap-1">
                요금제 보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* PPT 제안서 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-[11px] font-bold text-neutral-300">02</div>
                <span className="text-[10px] font-bold tracking-wider uppercase border border-neutral-900 px-2 py-0.5">NEW</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-4 tracking-tight">PPT 제안서</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                IR 덱, 회사소개서, 입찰제안서를 전문 디자이너와 전략 컨설턴트가 함께 제작합니다.
                RFP 분석부터 평가 기준 최적화까지.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['회사소개서', 'IR Deck', '입찰제안서'].map(t => (
                  <span key={t} className="text-[11px] font-bold border border-neutral-200 px-3 py-1">{t}</span>
                ))}
              </div>
              <Link href="/pricing" className="text-sm font-bold text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-neutral-500 transition-colors inline-flex items-center gap-1">
                요금제 보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="mb-20">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              요금 안내
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              합리적인 가격 정책
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl leading-relaxed">
              기업 규모와 니즈에 맞는 최적의 플랜을 선택하세요. 모든 플랜에 전문 컨설팅이 포함됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 max-w-5xl">
            {developmentPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white p-8 ${plan.popular ? 'ring-1 ring-neutral-900' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-px left-0 right-0 h-0.5 bg-neutral-900" />
                )}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-base font-extrabold">{plan.name}</h3>
                    {plan.popular && (
                      <span className="text-[10px] font-bold tracking-wider uppercase border border-neutral-900 px-2 py-0.5">POPULAR</span>
                    )}
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight">
                    {plan.priceRange}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">견적 후 확정 · 일회성 제작비</p>
                </div>

                <div className="border-t border-neutral-200 pt-6 mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="w-3.5 h-3.5 text-neutral-400 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-500 text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  className={`w-full h-10 rounded-none font-bold text-sm ${plan.popular ? 'bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-700' : 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900'}`}
                >
                  <Link href={`/quote?plan=${plan.id}`}>견적 요청하기</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/pricing" className="text-sm font-bold text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-2 border-b border-neutral-300 pb-1 hover:border-neutral-900 transition-all">
              상세 플랜 비교 보기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="mb-20">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              고객 후기
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              고객이 증명하는 성과
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8"
              >
                <div className="flex gap-0.5 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
                  ))}
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed mb-8">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-200">
                  <div className="w-9 h-9 border border-neutral-300 flex items-center justify-center text-neutral-500 font-bold text-xs flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-neutral-400">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-3 gap-px bg-neutral-200 mt-px max-w-3xl">
            {[
              { number: '4.9/5', label: '평균 만족도' },
              { number: '98%', label: '재계약률' },
              { number: '3배', label: '평균 전환율 향상' },
            ].map((stat, i) => (
              <div key={i} className="bg-white py-8 text-center">
                <div className="text-2xl font-extrabold mb-1 tracking-tight">{stat.number}</div>
                <div className="text-neutral-400 text-xs font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
            <div>
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
                <div className="w-8 h-px bg-neutral-300" />
                FAQ
              </div>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
                자주 묻는 질문
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                궁금한 점이 있으시면 먼저 확인해보세요.
              </p>
              <Button asChild className="rounded-none h-10 px-6 font-bold text-sm border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900 transition-all">
                <Link href="/quote">1:1 상담 요청하기</Link>
              </Button>
            </div>
            <div className="border-t border-neutral-200">
              {faqData.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-8 max-w-screen-xl text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-none">
            READY TO<br />
            GO GLOBAL?
          </h2>
          <p className="text-lg text-neutral-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            귀사의 제품이 세계 시장에서 가장 빛나는 순간을 만듭니다.
            프리미엄 페이지와 함께 수출의 새로운 역사를 쓰세요.
          </p>
          <Button asChild className="h-14 px-12 rounded-none bg-neutral-900 text-white font-extrabold text-base border border-neutral-900 hover:bg-neutral-700 transition-all">
            <Link href="/quote">무료 컨설팅 신청하기</Link>
          </Button>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="py-16 bg-white">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="text-lg font-extrabold mb-4 tracking-tight uppercase">Premium Page</div>
              <p className="text-neutral-500 text-sm max-w-sm mb-6 leading-relaxed">
                Global Interactive Digital Catalog Agency for Export-Champion Companies.
              </p>
              <div className="flex items-center gap-3">
                <a href="mailto:vibers.leo@gmail.com" className="w-9 h-9 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-neutral-900 hover:text-neutral-900 transition-all">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="tel:+82-10-4866-5805" className="w-9 h-9 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-neutral-900 hover:text-neutral-900 transition-all">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-neutral-400">Services</div>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><Link href="/templates" className="hover:text-neutral-900 transition-colors">Digital Catalog</Link></li>
                <li><Link href="/templates" className="hover:text-neutral-900 transition-colors">3D Showcase</Link></li>
                <li><Link href="/quote" className="hover:text-neutral-900 transition-colors">Strategy Consulting</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-neutral-400">Company</div>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><Link href="/about" className="hover:text-neutral-900 transition-colors">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-neutral-900 transition-colors">Pricing</Link></li>
                <li><Link href="/quote" className="hover:text-neutral-900 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-neutral-400">Resources</div>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><Link href="/portfolio" className="hover:text-neutral-900 transition-colors">Portfolio</Link></li>
                <li><Link href="/login" className="hover:text-neutral-900 transition-colors">Dashboard</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-200 flex flex-col gap-3">
            <div className="text-neutral-400 text-xs leading-relaxed">
              상호명: 위로 &nbsp;|&nbsp; 대표: 김성원 &nbsp;|&nbsp; 사업자등록번호: 545-16-01046 &nbsp;|&nbsp; 주소: 경남 양산시 고향의봄12길 10, 뉴그린빌 301호
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-3">
              <p className="text-neutral-400 text-xs">&copy; 2026 Premium Page by 위로. All rights reserved.</p>
              <div className="flex gap-6 text-neutral-400 text-[11px] font-bold uppercase tracking-[0.15em]">
                <Link href="/terms" className="hover:text-neutral-900 transition-colors">이용약관</Link>
                <Link href="/privacy" className="hover:text-neutral-900 transition-colors">개인정보처리방침</Link>
                <Link href="/refund" className="hover:text-neutral-900 transition-colors">환불정책</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Stat Item Component ───
function StatItem({ end, suffix, label, icon }: { end: number; suffix: string; label: string; icon: React.ReactNode }) {
  const countRef = useCountUp(end)
  return (
    <div className="bg-white py-10 text-center">
      <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-400 mx-auto mb-4">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight">
        <span ref={countRef}>0</span>{suffix}
      </div>
      <div className="text-neutral-400 text-xs font-bold">{label}</div>
    </div>
  )
}
