'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Zap, Users, Target, Award, Code2, Palette, BarChart3 } from 'lucide-react'

const values = [
  { icon: <Target className="w-5 h-5" />, title: '글로벌 시장 집중', desc: '수출 기업의 해외 시장 진출을 가속화하는 것이 우리의 핵심 미션입니다.' },
  { icon: <Award className="w-5 h-5" />, title: '프리미엄 퀄리티', desc: '타협 없는 디자인과 기술로 업계 최고 수준의 결과물을 제공합니다.' },
  { icon: <Zap className="w-5 h-5" />, title: '기술 혁신', desc: 'Three.js, Next.js 등 최신 기술을 적극 활용하여 차별화된 경험을 창조합니다.' },
  { icon: <Users className="w-5 h-5" />, title: '파트너십', desc: '단순 외주가 아닌, 기업의 글로벌 성장을 함께하는 전략적 파트너가 됩니다.' },
]

const capabilities = [
  { icon: <Code2 className="w-5 h-5" />, title: 'Frontend Engineering', desc: 'Next.js, React, TypeScript, Three.js' },
  { icon: <Palette className="w-5 h-5" />, title: 'UI/UX Design', desc: '하이엔드 인터랙티브 디자인, 모션 그래픽' },
  { icon: <Globe className="w-5 h-5" />, title: 'Global Optimization', desc: '다국어 지원, CDN 배포, SEO 최적화' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Strategy Consulting', desc: '해외 시장 분석, 브랜드 스토리텔링' },
]

const milestones = [
  { year: '2024', event: 'Premium Page 서비스 론칭' },
  { year: '2024', event: '첫 글로벌 기업 카탈로그 제작 (HS-TECH)' },
  { year: '2025', event: 'AI 에이전트 기반 자동화 파이프라인 구축' },
  { year: '2025', event: '50+ 글로벌 기업 파트너 달성' },
  { year: '2026', event: 'SaaS 플랫폼으로 확장' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">

      {/* Hero */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="max-w-3xl">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              회사 소개
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              수출 기업의 가치를<br />
              세계에 각인시킵니다
            </h1>
            <p className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-2xl">
              Premium Page는 대한민국 수출 기업을 위한 하이엔드 인터랙티브 전자 카탈로그 에이전시입니다.
              단순한 PDF 변환을 넘어, 해외 바이어를 매료시키는 몰입형 디지털 경험을 설계합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
                <div className="w-8 h-px bg-neutral-300" />
                미션
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">우리의 미션</h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                대한민국의 우수한 기술력을 가진 기업들이 해외 시장에서 제대로 된 가치를 인정받지 못하는 현실을 바꾸고 싶었습니다.
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                구시대적인 PDF 카탈로그 대신, 글로벌 바이어의 눈높이에 맞는 인터랙티브 디지털 카탈로그를 제공하여
                수출 기업의 글로벌 경쟁력을 한 단계 끌어올립니다.
              </p>
              <p className="text-neutral-900 text-sm font-bold border-l-2 border-neutral-900 pl-4">
                &ldquo;Beyond PDF, The Art of Interactive Digital Experience.&rdquo;
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-neutral-200">
              {[
                { number: '50+', label: '글로벌 파트너' },
                { number: '15+', label: '서비스 국가' },
                { number: '200+', label: '제작 페이지' },
                { number: '99.9%', label: '가동률' },
              ].map((stat, i) => (
                <div key={i} className="bg-white py-8 text-center">
                  <div className="text-2xl font-extrabold tracking-tight mb-1">{stat.number}</div>
                  <div className="text-xs font-bold text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              핵심 가치
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">핵심 가치</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 group hover:bg-neutral-50 transition-colors"
              >
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:border-neutral-900 group-hover:text-neutral-900 transition-all mb-6">
                  {value.icon}
                </div>
                <h3 className="text-base font-extrabold mb-2 tracking-tight">{value.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              역량
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">역량</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 max-w-4xl">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 flex items-start gap-5"
              >
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-400 flex-shrink-0">
                  {cap.icon}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold mb-1">{cap.title}</h3>
                  <p className="text-neutral-400 text-xs">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              연혁
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">연혁</h2>
          </div>

          <div className="max-w-2xl">
            {milestones.map((ms, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 py-6 border-b border-neutral-200 last:border-b-0"
              >
                <span className="text-sm font-extrabold text-neutral-300 w-12 flex-shrink-0 tabular-nums">{ms.year}</span>
                <span className="text-sm font-bold">{ms.event}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            함께 글로벌 시장을 개척하세요
          </h2>
          <p className="text-neutral-500 text-base mb-10 max-w-xl mx-auto">
            귀사의 기술력을 세계에 알릴 준비가 되셨나요?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="h-12 px-8 bg-neutral-900 text-white font-bold text-sm border border-neutral-900 hover:bg-neutral-700 transition-all flex items-center gap-2">
              무료 컨설팅 신청하기 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="h-12 px-8 bg-white text-neutral-900 font-bold text-sm border border-neutral-300 hover:border-neutral-900 transition-all flex items-center">
              포트폴리오 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
