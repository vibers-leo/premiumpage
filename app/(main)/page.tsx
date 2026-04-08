'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  ArrowRight, Globe, Layers, MousePointer2, TrendingUp, Sparkles, MessageSquare,
  Check, Star, ChevronDown, Search, HelpCircle, Mail, Phone, MapPin,
  Building2, Zap, Shield, BarChart3, Users, FileText, Clock, Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

import { AuroraBackground } from '@/components/ui/aurora-background'
import { SparklesCore } from '@/components/ui/sparkles'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { developmentPlans } from '@/lib/data'
import { formatPrice } from '@/lib/data-utils'

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
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-border rounded-2xl overflow-hidden transition-all hover:border-primary/30">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 flex items-center justify-between text-left group">
        <span className="text-lg font-bold group-hover:text-primary transition-colors pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
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
    color: 'cyan',
    bg: 'bg-black',
    image: '/emt/assets/19.png',
    links: [
      { label: '영문 버전', href: 'https://emt.premiumpage.kr', primary: true },
      { label: '한글 버전', href: 'https://emt-ko.premiumpage.kr', primary: false },
    ],
  },
  {
    id: 'hstech',
    title: 'HS-TECH',
    category: 'Industrial Sensor / Product Hierarchy',
    color: 'emerald',
    bg: 'bg-[#0a1628]',
    image: '/templates/hs-tech/images/vaisala/HMT330_v1.png',
    links: [
      { label: '영문 버전', href: 'https://hstech.premiumpage.kr', primary: true },
      { label: '한글 버전', href: 'https://hstech-kr.premiumpage.kr', primary: false },
    ],
  },
  {
    id: 'gentop',
    title: 'GENTOP IND.',
    category: 'Security Solution / Grid System',
    color: 'blue',
    bg: 'bg-[#0f172a]',
    image: '/templates/hangseong/images/logo.png',
    links: [
      { label: '브랜드 쇼케이스', href: 'https://gentop.premiumpage.kr', primary: true },
    ],
  },
  {
    id: 'genwish',
    title: 'GENWISH',
    category: 'DC Engine-Off Air Conditioning',
    color: 'orange',
    bg: 'bg-[#1a1006]',
    image: '',
    links: [
      { label: '브랜드 쇼케이스', href: 'https://hstechco.premiumpage.kr', primary: true },
    ],
  },
]

const colorMap: Record<string, { text: string; btn: string; btnHover: string }> = {
  cyan: { text: 'text-cyan-400', btn: 'bg-white text-black', btnHover: 'bg-white/10 border-white/20 text-white' },
  emerald: { text: 'text-emerald-400', btn: 'bg-emerald-500 text-white', btnHover: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-300' },
  blue: { text: 'text-blue-400', btn: 'bg-blue-600 text-white', btnHover: 'bg-blue-500/10 border-blue-400/20 text-blue-300' },
  orange: { text: 'text-orange-400', btn: 'bg-orange-500 text-white', btnHover: 'bg-orange-500/10 border-orange-400/20 text-orange-300' },
}

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
    <div className="flex flex-col w-full bg-background text-foreground selection:bg-purple-500/30">

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative w-full h-screen min-h-[900px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AuroraBackground className="h-full w-full opacity-40 dark:opacity-100">
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                id="hero-particles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={70}
                className="w-full h-full"
                particleColor="#a855f7"
              />
            </div>
          </AuroraBackground>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-[1]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-black tracking-widest uppercase text-primary">Global Growth Partner</span>
            </div>

            <div className="mb-8">
              <TextGenerateEffect
                words="GLOBAL SUCCESS BEYOND DISCOVERY"
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white"
              />
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-12 font-medium leading-relaxed">
              수출 유망 기업의 가치를 세계 시장에 각인시키는 <br />
              하이엔드 인터랙티브 전자 카탈로그 에이전시, <br />
              <span className="text-foreground font-bold">Premium Page</span>입니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button asChild size="lg" className="h-16 px-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg gap-3 shadow-[0_20px_40px_rgba(168,85,247,0.3)] transition-all hover:-translate-y-1">
                <Link href="/templates">
                  포트폴리오 보기 <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
              <Link href="/quote" className="group text-muted-foreground hover:text-foreground transition-all flex items-center gap-3 font-bold px-8 py-4 rounded-full border border-border hover:bg-secondary/50 backdrop-blur-sm">
                글로벌 컨설팅 요청 <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-square w-full max-w-[600px] ml-auto">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse" />
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl glass-card p-2">
                <Image
                  src="/premium_agency_hero_1770798018285.png"
                  alt="Premium Agency Concept"
                  fill
                  className="object-cover rounded-[2.5rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                    <div className="text-white font-bold text-lg mb-1">Modern Luxury Display</div>
                    <div className="text-white/60 text-sm">Interactive 3D Masterpiece Preview</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-muted-foreground flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-black tracking-widest uppercase">Discover More</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* ═══════════════ CLIENT LOGOS (Infinite Scroll) ═══════════════ */}
      <section className="py-16 border-b border-border bg-muted/10 overflow-hidden">
        <div className="container mx-auto px-6 mb-8">
          <p className="text-center text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">
            Trusted by Industry Leaders
          </p>
        </div>
        <div className="relative">
          <div className="flex animate-[scroll_20s_linear_infinite] gap-16 w-max">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="flex items-center justify-center min-w-[180px] h-16 text-2xl font-black text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors tracking-tight">
                {logo}
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-180px * 5 - 64px * 5)); }
          }
        `}</style>
      </section>

      {/* ═══════════════ STATS SECTION ═══════════════ */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatItem end={50} suffix="+" label="글로벌 기업 파트너" icon={<Building2 className="w-6 h-6" />} />
            <StatItem end={200} suffix="+" label="제작된 카탈로그 페이지" icon={<FileText className="w-6 h-6" />} />
            <StatItem end={15} suffix="+" label="서비스 국가" icon={<Globe className="w-6 h-6" />} />
            <StatItem end={99} suffix=".9%" label="서비스 가동률" icon={<Shield className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO SHOWCASE ═══════════════ */}
      <section className="py-40 relative bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-3xl">
              <div className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-3">
                <Layers className="w-5 h-5" /> Curated Masterpieces
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
                우리는 단순한 웹사이트를 <br />
                만들지 않습니다. <span className="gradient-text">경험을 설계합니다.</span>
              </h2>
              <p className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed">
                글로벌 챔피언을 위한 가장 진보된 3D 엔진과 인터랙티브 스토리텔링. <br />
                해외 바이어를 매료시키는 압도적인 퀄리티를 확인해요해봐요.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-2 h-16 px-10 text-lg font-bold hover:bg-primary hover:text-white transition-all">
              <Link href="/templates">전체 포트폴리오 <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {portfolioItems.map((item) => {
              const colors = colorMap[item.color] || colorMap.cyan
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -10 }}
                  className={`group relative h-[600px] rounded-[3rem] overflow-hidden border border-border ${item.bg}`}
                >
                  {item.image && (
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-all group-hover:scale-105">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-20" />
                    </div>
                  )}
                  {!item.image && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-[200px] font-black tracking-tighter">{item.title[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className={`${colors.text} font-black tracking-widest text-xs mb-4 uppercase`}>{item.category}</div>
                    <h3 className="text-4xl font-bold text-white mb-6">{item.title}</h3>
                    <div className="flex gap-4 flex-wrap">
                      {item.links.map((link, i) => (
                        <Button
                          key={i}
                          asChild
                          className={`rounded-full font-bold h-12 px-8 ${i === 0 ? colors.btn : `backdrop-blur-md border ${colors.btnHover}`}`}
                        >
                          <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ STRATEGIC PROCESS ═══════════════ */}
      <section className="py-40 bg-muted/20 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">THE STRATEGIC <span className="gradient-text">PROCESS</span></h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium">단순 변환을 넘어선 가치 창출, 글로벌 1등 사를 위한 프리미엄 페이지의 여정.</p>
          </div>

          {/* Timeline-style Process */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            {[
              { number: '01', title: 'Strategy', desc: '해외 시장 살펴보기 및 기업의 핵심 경쟁력을 도출하여 맞춤형 스토리텔링 전략을 수립합니다.', icon: <TrendingUp className="w-6 h-6" /> },
              { number: '02', title: 'Creative', desc: '브랜드 아이덴티티를 극대화하는 하이엔드 UI/UX 디자인과 독보적인 그래픽을 설계합니다.', icon: <Layers className="w-6 h-6" /> },
              { number: '03', title: 'Interaction', desc: 'Three.js와 스크롤 애니메이션 등 최신 기술을 활용해 바이어의 몰입감을 극대화합니다.', icon: <MousePointer2 className="w-6 h-6" /> },
              { number: '04', title: 'Global', desc: '초고속 글로벌 CDN과 다국어 최적화를 통해 전 세계 어디서든 완벽한 경험을 제공합니다.', icon: <Globe className="w-6 h-6" /> },
            ].map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 mb-20 last:mb-0 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot on timeline */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary items-center justify-center text-primary z-10">
                  {step.icon}
                </div>

                {/* Content Card */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-20' : 'md:pl-20'}`}>
                  <div className="p-10 rounded-[2.5rem] bg-card/50 border border-border hover:border-primary/30 transition-all group">
                    <div className="text-4xl font-black text-primary/15 mb-4">{step.number}</div>
                    <div className="md:hidden w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>

                {/* Spacer for other side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-bold">Transparent Pricing</Badge>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              합리적인 <span className="gradient-text">가격 정책</span>
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium">
              기업 규모와 니즈에 맞는 최적의 플랜을 선택하세요. 모든 플랜에 전문 컨설팅이 포함됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {developmentPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className={`relative h-full transition-all hover:-translate-y-2 ${plan.popular ? 'border-primary shadow-[0_0_40px_rgba(168,85,247,0.15)]' : 'border-border hover:border-primary/30'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 font-bold">MOST POPULAR</Badge>
                    </div>
                  )}
                  <CardContent className="p-8 pt-10">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-4xl font-black">
                        {formatPrice(plan.price)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">일회성 제작비</p>
                    </div>

                    <div className="border-t border-border pt-6 mb-8">
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      asChild
                      className={`w-full h-12 rounded-full font-bold ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
                    >
                      <Link href={`/quote?plan=${plan.id}`}>견적 요청하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
              상세 플랜 비교 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-40 bg-muted/10 border-y border-border relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              고객이 증명하는 <span className="gradient-text">성과</span>
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium">
              프리미엄 페이지와 함께 글로벌 시장을 개척한 기업들의 이야기
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-border hover:border-primary/30 transition-all">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-foreground text-lg leading-relaxed mb-8 italic">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t border-border">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold">{t.name}</h4>
                        <p className="text-sm text-muted-foreground">{t.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            {[
              { number: '4.9/5', label: '평균 만족도' },
              { number: '98%', label: '재계약률' },
              { number: '3배', label: '평균 전환율 향상' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className="py-40 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              자주 묻는 <span className="gradient-text">질문</span>
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium">
              궁금한 점이 있으시면 먼저 확인해요해보세요
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">찾으시는 답변이 없으신가요?</p>
            <Button asChild variant="outline" className="rounded-full h-12 px-8 font-bold">
              <Link href="/quote">1:1 상담 요청하기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="py-40 bg-background relative flex flex-col items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter leading-none">
            READY TO <br />
            <span className="gradient-text">GO GLOBAL?</span>
          </h2>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-4xl mx-auto font-medium">
            귀사의 제품이 세계 시장에서 가장 빛나는 순간을 만듭니다. <br />
            프리미엄 페이지와 함께 수출의 새로운 역사를 쓰세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button asChild size="lg" className="h-20 px-16 rounded-full bg-foreground text-background font-black text-2xl hover:scale-105 transition-all shadow-2xl">
              <Link href="/quote">무료 컨설팅 신청하기</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/20 blur-[150px] rounded-full opacity-50" />
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="py-20 border-t border-border bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="text-3xl font-black mb-4 gradient-text tracking-tighter uppercase">Premium Page</div>
              <p className="text-muted-foreground font-medium max-w-sm mb-6">
                Global Interactive Digital Catalog Agency for Export-Champion Companies.
              </p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <a href="mailto:info@premiumpage.kr" className="hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="tel:+82-10-0000-0000" className="hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <div className="font-black text-sm uppercase tracking-widest mb-6">Services</div>
              <ul className="space-y-3 text-muted-foreground font-medium">
                <li><Link href="/templates" className="hover:text-primary transition-colors">Digital Catalog</Link></li>
                <li><Link href="/templates" className="hover:text-primary transition-colors">3D Showcase</Link></li>
                <li><Link href="/quote" className="hover:text-primary transition-colors">Strategy Consulting</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-black text-sm uppercase tracking-widest mb-6">Company</div>
              <ul className="space-y-3 text-muted-foreground font-medium">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/quote" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-black text-sm uppercase tracking-widest mb-6">Resources</div>
              <ul className="space-y-3 text-muted-foreground font-medium">
                <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                <li><Link href="/login" className="hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 text-center md:text-left flex flex-col md:flex-row justify-between gap-6">
            <p className="text-muted-foreground text-sm font-medium">&copy; 2026 Premium Page Inc. All rights reserved.</p>
            <div className="flex justify-center gap-8 text-muted-foreground text-xs font-bold uppercase tracking-widest">
              <Link href="/about" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/about" className="hover:text-foreground transition-colors">Privacy</Link>
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
    <div className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-black mb-2">
        <span ref={countRef}>0</span>{suffix}
      </div>
      <div className="text-muted-foreground font-medium text-sm">{label}</div>
    </div>
  )
}
