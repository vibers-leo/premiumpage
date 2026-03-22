'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, Globe, Layers, MousePointer2, ShieldCheck,
  TrendingUp, Sparkles, MessageSquare, Zap, Clock,
  CheckCircle2, BookOpen, Rocket, Languages
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { AuroraBackground } from '@/components/ui/aurora-background'
import { SparklesCore } from '@/components/ui/sparkles'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

// ─── Counter Animation Hook ────────────────────────────────────────────────
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
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

// ─── Reusable Components ───────────────────────────────────────────────────
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value)
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
        <span ref={ref}>{count}</span>
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="text-muted-foreground font-semibold text-sm uppercase tracking-widest">{label}</div>
    </div>
  )
}

function WhyCard({ number, icon, title, highlight, desc }: {
  number: string; icon: React.ReactNode; title: string; highlight: string; desc: string
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative p-10 rounded-[2.5rem] bg-card/60 border border-border hover:border-primary/40 transition-all group overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <div className="text-5xl font-black text-primary/8 group-hover:text-primary/15 transition-colors">{number}</div>
        </div>
        <h3 className="text-xl font-black mb-2 tracking-tight">{title}</h3>
        <div className="text-primary font-bold text-sm mb-4">{highlight}</div>
        <p className="text-muted-foreground leading-relaxed font-medium">{desc}</p>
      </div>
    </motion.div>
  )
}

function ProcessStep({ number, icon, title, items }: {
  number: string; icon: React.ReactNode; title: string; items: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <div className="text-primary font-black text-xs tracking-widest uppercase mb-2">{number}</div>
      <h3 className="text-2xl font-black mb-6">{title}</h3>
      <ul className="space-y-3 text-left w-full">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground font-medium">
            <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function PremiumLandingPage() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground selection:bg-purple-500/30">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 · HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <AuroraBackground className="h-full w-full opacity-40 dark:opacity-100">
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                id="hero-particles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={60}
                className="w-full h-full"
                particleColor="#a855f7"
              />
            </div>
          </AuroraBackground>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-[1]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-black tracking-widest uppercase text-primary">Digital Catalog Agency</span>
            </div>

            <div className="mb-6">
              <TextGenerateEffect
                words="CATALOG THAT SELLS GLOBALLY"
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white"
              />
            </div>

            <p className="text-xl text-muted-foreground max-w-xl mb-4 font-medium leading-relaxed">
              종이 브로슈어는 그만. 해외 바이어가 직접 체험하는<br />
              <span className="text-foreground font-bold">인터랙티브 전자 카탈로그</span>를 30일 안에 제작해 드립니다.
            </p>
            <p className="text-base text-muted-foreground mb-10 font-medium">
              한/영 이중언어 · 3D 인터랙티브 · 글로벌 CDN 배포 포함
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button asChild size="lg" className="h-14 px-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base gap-3 shadow-[0_20px_40px_rgba(168,85,247,0.3)] transition-all hover:-translate-y-1">
                <Link href="/templates">
                  납품 사례 보기 <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Link href="/quote" className="group text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 font-bold px-6 py-3 rounded-full border border-border hover:bg-secondary/50 backdrop-blur-sm text-sm">
                무료 상담 신청 <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Catalog Card Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px] h-[440px]">
              {/* Glow effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/10 blur-[80px] rounded-full" />

              {/* Card 1 — back, tilted left */}
              <div className="absolute top-0 left-0 w-[78%] rounded-2xl overflow-hidden border border-white/10 shadow-xl rotate-[-8deg] origin-bottom-left opacity-60">
                <div className="relative aspect-[4/3] bg-[#0a0f1e]">
                  <Image src="/templates/hs-tech/images/hmt330_6models_grid.jpg" alt="HS-TECH catalog" fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-[10px] font-black text-blue-300 tracking-widest uppercase">HS-TECH · Industrial Sensor</div>
                </div>
              </div>

              {/* Card 2 — mid, slightly tilted */}
              <div className="absolute top-8 right-0 w-[78%] rounded-2xl overflow-hidden border border-white/10 shadow-xl rotate-[5deg] origin-bottom-right opacity-75">
                <div className="relative aspect-[4/3] bg-[#f0f4f8]">
                  <Image src="/templates/air-hstech/images/HSD-180D.jpg" alt="GENWISH catalog" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-[10px] font-black text-green-300 tracking-widest uppercase">GENWISH · DC Air-Con</div>
                </div>
              </div>

              {/* Card 3 — front, center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[82%] rounded-2xl overflow-hidden border border-white/20 shadow-2xl z-10">
                <div className="relative aspect-[4/3] bg-black">
                  <Image src="/emt/assets/19.png" alt="EMT catalog" fill className="object-contain p-8 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="text-[10px] font-black text-cyan-300 tracking-widest uppercase mb-1">EMT GLOBAL · Smart Sensor</div>
                    <div className="text-xs text-white/60">3D HUD Interface · Bilingual</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-black tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 · STATS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 border-y border-border bg-muted/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
            <StatItem value={5} suffix="+" label="납품 기업" />
            <StatItem value={130} suffix="+" label="제작 페이지" />
            <StatItem value={2} suffix="" label="지원 언어 (KO/EN)" />
            <StatItem value={30} suffix="일" label="평균 납기" />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 · WHY PREMIUM PAGE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="why" className="py-40 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-24 max-w-3xl mx-auto"
          >
            <div className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-6 flex items-center justify-center gap-3">
              <ShieldCheck className="w-5 h-5" /> Why Premium Page
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
              왜 여기서 <br />
              <span className="gradient-text">의뢰해야 할까요?</span>
            </h2>
            <p className="text-muted-foreground text-xl font-medium leading-relaxed">
              일반 웹개발사, 디자인 에이전시와는 다릅니다.<br />
              전자카탈로그 하나에만 집중하기 때문에 수준이 다릅니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WhyCard
              number="01"
              icon={<BookOpen className="w-6 h-6" />}
              title="전자카탈로그 전문 에이전시"
              highlight="원스톱 납품 — 기획부터 배포까지"
              desc="제품 스펙 정리, 다국어 번역, 인터랙티브 구현, 글로벌 CDN 배포까지 한 팀이 처리합니다. 여러 곳을 돌아다닐 필요 없습니다."
            />
            <WhyCard
              number="02"
              icon={<Zap className="w-6 h-6" />}
              title="인터랙티브 3D 기술"
              highlight="종이 브로슈어 대비 체류시간 3배"
              desc="Framer Motion과 3D HUD 인터페이스로 해외 바이어가 직접 제품을 탐색하는 경험을 설계합니다. 단순 PDF가 아닌 살아있는 카탈로그입니다."
            />
            <WhyCard
              number="03"
              icon={<Languages className="w-6 h-6" />}
              title="한/영 이중언어 완성"
              highlight="해외 바이어가 직접 사용 가능한 수준"
              desc="원본 홈페이지 텍스트를 기반으로 영문화 작업을 진행합니다. SEO까지 고려한 구조로 구글 검색에서도 노출됩니다."
            />
            <WhyCard
              number="04"
              icon={<Rocket className="w-6 h-6" />}
              title="30일 납기 + 글로벌 CDN"
              highlight="전용 도메인 세팅 포함, 세계 어디서나 빠름"
              desc="제작 완료 후 xxx.premiumpage.kr 전용 서브도메인으로 즉시 배포합니다. Vercel CDN으로 미국, 유럽, 아시아 어디서나 빠른 로딩을 보장합니다."
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 · PORTFOLIO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="portfolio" className="py-40 relative bg-muted/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-3">
                <Layers className="w-5 h-5" /> Live Catalogs
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
                실제 납품된<br />
                <span className="gradient-text">카탈로그 사례</span>
              </h2>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                지금 바로 링크를 클릭해 직접 체험해 보세요.<br />이게 귀사 카탈로그의 미래입니다.
              </p>
            </motion.div>
            <Button asChild variant="outline" className="rounded-full border-2 h-14 px-10 text-base font-bold hover:bg-primary hover:text-white transition-all shrink-0">
              <Link href="/templates">전체 포트폴리오 <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </div>

          {/* Top row: 2 featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            {/* EMT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative h-[480px] rounded-[3rem] overflow-hidden border border-border bg-black"
            >
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <Image src="/emt/assets/19.png" alt="EMT Global" fill className="object-contain p-16" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute top-6 right-6">
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">3D HUD Interface</span>
              </div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="text-cyan-400 font-black tracking-widest text-xs mb-3 uppercase">Smart Sensor · Automotive</div>
                <h3 className="text-3xl font-bold text-white mb-2">EMT GLOBAL</h3>
                <p className="text-white/50 text-sm mb-5">31개 제품 · 한/영 이중언어 · 3D 인터랙티브</p>
                <div className="flex gap-3">
                  <Button asChild className="rounded-full bg-white text-black font-bold h-10 px-6 text-sm">
                    <a href="https://emt.premiumpage.kr" target="_blank">EN 보기</a>
                  </Button>
                  <Button asChild className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold h-10 px-6 text-sm">
                    <a href="https://emt-ko.premiumpage.kr" target="_blank">KR 보기</a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* HS-TECH */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-[480px] rounded-[3rem] overflow-hidden border border-border bg-[#0a0f1e]"
            >
              <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-all duration-500 group-hover:scale-105">
                <Image src="/templates/hs-tech/images/hmt330_6models_grid.jpg" alt="HS-TECH" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/30 to-transparent" />
              <div className="absolute top-6 right-6">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">80+ Products</span>
              </div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="text-blue-400 font-black tracking-widest text-xs mb-3 uppercase">Industrial Sensor · VAISALA · SETRA</div>
                <h3 className="text-3xl font-bold text-white mb-2">HS-TECH</h3>
                <p className="text-white/50 text-sm mb-5">4개 브랜드 · 80+ 제품 · 한/영 이중언어</p>
                <div className="flex gap-3">
                  <Button asChild className="rounded-full bg-white text-black font-bold h-10 px-6 text-sm">
                    <a href="https://hstech.premiumpage.kr" target="_blank">EN 보기</a>
                  </Button>
                  <Button asChild className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold h-10 px-6 text-sm">
                    <a href="https://hstech-kr.premiumpage.kr" target="_blank">KR 보기</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom row: 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* GENWISH */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.0 }}
              whileHover={{ y: -8 }}
              className="group relative h-[320px] rounded-[2.5rem] overflow-hidden border border-border bg-[#f0f4f8]"
            >
              <div className="absolute inset-0 opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105">
                <Image src="/templates/air-hstech/images/HSD-180D.jpg" alt="GENWISH" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <div className="text-green-400 font-black tracking-widest text-xs mb-2 uppercase">DC Air-Con · Light Mode</div>
                <h3 className="text-xl font-bold text-white mb-1">GENWISH</h3>
                <p className="text-white/50 text-xs mb-4">25페이지 · 크레인/캠핑카/선박</p>
                <Button asChild className="rounded-full bg-white text-black font-bold h-9 px-5 text-xs">
                  <a href="https://hstechco.premiumpage.kr" target="_blank">보러가기</a>
                </Button>
              </div>
            </motion.div>

            {/* GENTOP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-[320px] rounded-[2.5rem] overflow-hidden border border-border bg-[#0f172a]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-800/30 to-slate-900" />
              {/* Grid texture overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-blue-400 opacity-80" />
              </div>
              <div className="absolute bottom-7 left-7 right-7">
                <div className="text-blue-400 font-black tracking-widest text-xs mb-2 uppercase">Security Solution · Dark Mode</div>
                <h3 className="text-xl font-bold text-white mb-1">GENTOP IND.</h3>
                <p className="text-white/50 text-xs mb-4">CCTV · 출입통제 · 주차관제</p>
                <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-9 px-5 text-xs">
                  <a href="https://gentop.premiumpage.kr" target="_blank">보러가기</a>
                </Button>
              </div>
            </motion.div>

            {/* 항성산업사 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative h-[320px] rounded-[2.5rem] overflow-hidden border border-border bg-[#111]"
            >
              <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-all duration-500 group-hover:scale-105">
                <Image src="/templates/hangseong/images/background_01.png" alt="항성산업사" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <div className="text-orange-400 font-black tracking-widest text-xs mb-2 uppercase">Industrial · B2B</div>
                <h3 className="text-xl font-bold text-white mb-1">항성산업사</h3>
                <p className="text-white/50 text-xs mb-4">산업용 B2B · 영문 카탈로그</p>
                <Button asChild className="rounded-full bg-white text-black font-bold h-9 px-5 text-xs">
                  <a href="https://hangseong.premiumpage.kr" target="_blank">보러가기</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 · PROCESS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-40 bg-muted/10 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/4" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              의뢰에서 납품까지<br />
              <span className="gradient-text">딱 3단계</span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
              복잡하게 생각하지 마세요. 자료만 주시면 나머지는 저희가 합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-[2px] bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />

            <ProcessStep
              number="STEP 01"
              icon={<MessageSquare className="w-8 h-8" />}
              title="무료 상담"
              items={[
                '보유 자료(홈페이지, PDF) 공유',
                '제품 종류 및 페이지 수 파악',
                '맞춤 견적 및 일정 안내',
              ]}
            />
            <ProcessStep
              number="STEP 02"
              icon={<Layers className="w-8 h-8" />}
              title="제작 & 중간 리뷰"
              items={[
                '데이터 추출 및 영문화 작업',
                '디자인 + 인터랙션 개발',
                '중간 리뷰 후 수정 반영',
              ]}
            />
            <ProcessStep
              number="STEP 03"
              icon={<Globe className="w-8 h-8" />}
              title="납품 & 배포"
              items={[
                '전용 서브도메인 세팅 포함',
                '글로벌 CDN 배포 (즉시 접속)',
                'PDF 버전 생성 후 전달',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 · CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-40 bg-background relative flex flex-col items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-10">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs font-black tracking-widest uppercase text-primary">30일 납기 보장</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
              귀사의 카탈로그,<br />
              <span className="gradient-text">30일 후 전 세계에</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
              지금 상담 신청을 하시면 영업일 기준 1일 이내에 연락드립니다.<br />
              견적은 무료이며, 부담없이 문의하셔도 됩니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" className="h-16 px-14 rounded-full bg-foreground text-background font-black text-xl hover:scale-105 transition-all shadow-2xl">
                <Link href="/quote">무료 상담 신청하기</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-14 rounded-full font-black text-xl hover:bg-secondary/50 transition-all">
                <Link href="/templates">포트폴리오 먼저 보기</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/20 blur-[150px] rounded-full opacity-40" />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="py-20 border-t border-border bg-background relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div>
            <div className="text-2xl font-black mb-4 gradient-text tracking-tighter uppercase">Premium Page</div>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-xs">
              수출 기업을 위한 인터랙티브 전자카탈로그 전문 에이전시.<br />
              한/영 이중언어 · 3D 기술 · 글로벌 CDN
            </p>
          </div>
          <div>
            <div className="font-black text-sm uppercase tracking-widest mb-6">Services</div>
            <ul className="space-y-3 text-muted-foreground font-medium text-sm">
              <li><Link href="/templates" className="hover:text-primary transition-colors">전자카탈로그 제작</Link></li>
              <li><Link href="/templates" className="hover:text-primary transition-colors">3D 인터랙티브 쇼케이스</Link></li>
              <li><Link href="/quote" className="hover:text-primary transition-colors">글로벌 배포 & CDN 세팅</Link></li>
              <li><Link href="/quote" className="hover:text-primary transition-colors">무료 상담 신청</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-black text-sm uppercase tracking-widest mb-6">Company</div>
            <ul className="space-y-3 text-muted-foreground font-medium text-sm">
              <li><Link href="#why" className="hover:text-primary transition-colors">프리미엄 페이지 소개</Link></li>
              <li><Link href="/templates" className="hover:text-primary transition-colors">납품 포트폴리오</Link></li>
              <li><Link href="/quote" className="hover:text-primary transition-colors">의뢰 문의</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-12 mt-12 border-t border-border/50 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-muted-foreground text-xs font-medium">© 2026 Premium Page. All rights reserved.</p>
          <div className="flex gap-8 text-muted-foreground text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
