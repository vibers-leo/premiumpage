'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Star, Check, Globe, Layers, Zap, Target } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

// ─── Data ───
const portfolioItems = [
  { id: 'emt', title: 'EMT GLOBAL', category: 'Smart Sensor · 3D HUD', image: '/og/emt.png', href: 'https://emt.premiumpage.kr' },
  { id: 'hstech', title: 'HS-TECH', category: 'Industrial Sensor · 80+ Pages', image: '/og/hstech.png', href: 'https://hstech.premiumpage.kr' },
  { id: 'gentop', title: 'GENTOP IND.', category: 'Construction · Facility', image: '/og/gentop.png', href: 'https://gentop.premiumpage.kr' },
  { id: 'genwish', title: 'GENWISH', category: 'DC Engine-Off A/C', image: '/og/genwish.png', href: 'https://hstechco.premiumpage.kr' },
]

const services = [
  { icon: Globe, title: '전자카탈로그', desc: '기업 홈페이지를 인터랙티브 디지털 카탈로그로 변환합니다. 다국어 지원, 반응형 최적화.', tags: ['Next.js', 'Multilingual', 'SEO'] },
  { icon: Layers, title: 'PPT 제안서', desc: 'IR 덱, 회사소개서, 입찰제안서를 전략적 콘텐츠와 프리미엄 디자인으로 제작합니다.', tags: ['Branding', 'Strategy', 'Design'] },
  { icon: Zap, title: '3D 쇼케이스', desc: 'Three.js 기반 인터랙티브 3D 모델링으로 글로벌 시장을 선도할 경험을 만듭니다.', tags: ['Three.js', 'WebGL', 'Motion'] },
  { icon: Target, title: '전략 컨설팅', desc: '해외 시장 분석, 브랜드 스토리텔링, 디지털 마케팅 전략을 함께 설계합니다.', tags: ['Market', 'Brand', 'Global'] },
]

const testimonials = [
  { name: 'K사 수출팀장', company: '산업용 센서 제조', content: '해외 바이어 미팅에서 전자카탈로그를 보여주니 반응이 완전히 달랐습니다. 기존 PDF 대비 상담 전환율이 3배 이상 높아졌습니다.' },
  { name: 'P사 마케팅 이사', company: '보안 솔루션 기업', content: '3D 인터랙티브 카탈로그 덕분에 글로벌 전시회에서 큰 주목을 받았습니다. 투자 대비 효과가 탁월합니다.' },
  { name: 'L사 해외영업 팀장', company: '전장부품 제조', content: '영문/한글 동시 지원이 정말 편리합니다. URL만 바꾸면 언어가 전환되니 각국 바이어에게 맞춤 대응이 가능해졌습니다.' },
]

const faqData = [
  { q: '전자카탈로그 제작 기간은 얼마나 걸리나요?', a: 'Basic은 약 1주일, Pro는 2~4주, Master 3D는 4~8주 정도 소요됩니다.' },
  { q: '기존 PDF를 웹으로 변환할 수 있나요?', a: '네, Basic 플랜으로 페이지 넘김 효과가 있는 웹 뷰어로 빠르게 변환 가능합니다.' },
  { q: '다국어 지원은 어떻게 되나요?', a: 'Pro 플랜은 최대 3개 국어, Master 플랜은 무제한 다국어를 지원합니다.' },
  { q: '제작 후 수정은 가능한가요?', a: '유지보수 플랜 가입 시 월 1~5회 수정이 가능합니다. 대규모 수정은 별도 견적입니다.' },
  { q: '환불 정책은 어떻게 되나요?', a: '개발 시작 전 100% 환불, 시작 후에는 진행 단계에 따라 부분 환불이 적용됩니다.' },
]

const clientLogos = ['EMT', 'HS-TECH', 'GENTOP', 'GENWISH', '항성산업사']

// ─── FAQ Component ───
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full py-5 flex items-center justify-between text-left group">
        <div className="flex items-center gap-5">
          <span className="text-xs font-bold text-neutral-300 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-sm font-bold group-hover:text-neutral-900 transition-colors">{q}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </motion.div>
      </button>
      {open && <div className="pl-10 pb-5"><p className="text-neutral-500 text-sm leading-relaxed">{a}</p></div>}
    </div>
  )
}

// ─── Page ───
export default function PremiumLandingPage() {
  return (
    <div className="w-full">

      {/* ══ 1. HERO ══ */}
      <section className="relative bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl pt-16 pb-20 md:pt-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-neutral-300 mb-8">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500">글로벌 성장 파트너</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              수출 기업의 가치를<br />
              세계에 <span className="text-neutral-400">각인</span>시킵니다
            </h1>

            <p className="text-lg text-neutral-500 max-w-xl mb-10 leading-relaxed">
              구시대적 PDF 카탈로그를 넘어, 해외 바이어를 매료시키는 인터랙티브 디지털 경험을 설계합니다.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link href="/quote" className="h-[52px] px-8 bg-neutral-900 text-white font-bold text-sm flex items-center gap-2 hover:bg-neutral-700 transition-colors">
                무료 컨설팅 신청 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/portfolio" className="h-[52px] px-8 border border-neutral-300 text-neutral-700 font-bold text-sm flex items-center gap-2 hover:border-neutral-900 transition-colors">
                포트폴리오 보기
              </Link>
            </div>
          </motion.div>

          {/* 브라우저 목업 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-14 border border-neutral-200 bg-neutral-50 overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-neutral-100 border-b border-neutral-200">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <span className="ml-3 text-[11px] text-neutral-400 font-mono">emt.premiumpage.kr</span>
            </div>
            <div className="relative aspect-[16/8] md:aspect-[16/7]">
              <Image src="/og/emt.png" alt="EMT Global 전자카탈로그" fill className="object-cover object-top" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. CLIENT LOGOS ══ */}
      <section className="bg-neutral-950 py-6 overflow-hidden">
        <div className="flex items-center justify-center gap-12 md:gap-20">
          {clientLogos.map(name => (
            <span key={name} className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 whitespace-nowrap">{name}</span>
          ))}
        </div>
      </section>

      {/* ══ 3. PORTFOLIO ══ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
            <SectionHeader label="포트폴리오" title="실제 제작 사례" description="수출 기업들이 선택한 프리미엄 디지털 카탈로그" />
            <Link href="/portfolio" className="text-sm font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors flex-shrink-0">
              전체 보기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioItems.map((item, i) => (
              <motion.a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-video bg-neutral-100 overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-all"
              >
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white font-extrabold text-lg">{item.title}</div>
                  <div className="text-white/60 text-xs mt-0.5">{item.category}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 mt-12">
            {[
              { label: '파트너 기업', value: '50+' },
              { label: '제작 페이지', value: '200+' },
              { label: '서비스 국가', value: '15+' },
              { label: '서비스 가동률', value: '99.9%' },
            ].map(s => (
              <div key={s.label} className="bg-white py-8 text-center">
                <div className="text-2xl font-extrabold tracking-tight mb-1">{s.value}</div>
                <div className="text-xs font-bold text-neutral-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SERVICES ══ */}
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <SectionHeader label="서비스" title="무엇을 도와드릴까요" description="전자카탈로그부터 제안서, 3D 쇼케이스까지. 기업의 글로벌 경쟁력을 높이는 모든 서비스." />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 group hover:bg-neutral-50 transition-colors"
              >
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:border-neutral-900 group-hover:text-neutral-900 transition-all mb-5">
                  <svc.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold mb-2 tracking-tight">{svc.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold border border-neutral-200 px-2.5 py-0.5 text-neutral-400">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. SOCIAL PROOF ══ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <SectionHeader label="고객 후기" title="파트너 기업의 이야기" align="center" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />)}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-neutral-400">{t.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. FAQ ══ */}
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <SectionHeader label="자주 묻는 질문" title="궁금한 점이 있으신가요?" />
            <div>
              {faqData.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. BOTTOM CTA ══ */}
      <section className="bg-neutral-950 py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">
            함께 글로벌 시장을 개척하세요
          </h2>
          <p className="text-neutral-400 text-base mb-10 max-w-xl mx-auto">
            귀사의 기술력을 세계에 알릴 준비가 되셨나요? 무료 컨설팅으로 시작하세요.
          </p>
          <Link href="/quote" className="inline-flex items-center gap-2 h-[52px] px-10 bg-white text-neutral-900 font-bold text-sm hover:bg-neutral-100 transition-colors">
            무료 컨설팅 신청 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
