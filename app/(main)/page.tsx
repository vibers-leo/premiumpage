'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Layers, MousePointer2, ShieldCheck, TrendingUp, Sparkles, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { AuroraBackground } from '@/components/ui/aurora-background'
import { SparklesCore } from '@/components/ui/sparkles'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { cn } from '@/lib/utils'

export default function PremiumLandingPage() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground selection:bg-purple-500/30">

      {/* 🚀 Hero Section: Premium Agency Identity */}
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
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-[1]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
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
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-square w-full max-w-[600px] ml-auto">
              {/* Decorative Elements */}
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-muted-foreground flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-black tracking-widest uppercase">Discover More</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* 💎 Masterpiece Exhibition: Real Case Studies */}
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
                해외 바이어를 매료시키는 압도적인 퀄리티를 확인하세요.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-2 h-16 px-10 text-lg font-bold hover:bg-primary hover:text-white transition-all">
              <Link href="/templates">전체 포트폴리오 <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </div>

          {/* Top row: 2 featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            <motion.div whileHover={{ y: -10 }} className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-border bg-black">
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                <Image src="/emt/assets/19.png" alt="EMT Global" fill className="object-contain p-20" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="text-cyan-400 font-black tracking-widest text-xs mb-3 uppercase">Smart Sensor / 3D HUD Interface</div>
                <h3 className="text-3xl font-bold text-white mb-5">EMT GLOBAL</h3>
                <div className="flex gap-3">
                  <Button asChild className="rounded-full bg-white text-black font-bold h-11 px-7 text-sm">
                    <a href="https://emt-en.premiumpage.kr" target="_blank">EN</a>
                  </Button>
                  <Button asChild className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold h-11 px-7 text-sm">
                    <a href="https://emt-ko.premiumpage.kr" target="_blank">KR</a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-border bg-[#0a0f1e]">
              <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-all group-hover:scale-105">
                <Image src="/templates/hs-tech/images/hmt330_6models_grid.jpg" alt="HS-TECH" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/30 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="text-blue-400 font-black tracking-widest text-xs mb-3 uppercase">Industrial Sensor / 80+ Products</div>
                <h3 className="text-3xl font-bold text-white mb-5">HS-TECH</h3>
                <div className="flex gap-3">
                  <Button asChild className="rounded-full bg-white text-black font-bold h-11 px-7 text-sm">
                    <a href="https://hstech.premiumpage.kr" target="_blank">EN</a>
                  </Button>
                  <Button asChild className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold h-11 px-7 text-sm">
                    <a href="https://hstech-kr.premiumpage.kr" target="_blank">KR</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom row: 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -8 }} className="group relative h-[340px] rounded-[2.5rem] overflow-hidden border border-border bg-[#f0f4f8]">
              <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-all group-hover:scale-105">
                <Image src="/templates/air-hstech/images/HSD-180D.jpg" alt="GENWISH" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-green-400 font-black tracking-widest text-xs mb-2 uppercase">DC Air-Con / Light Mode</div>
                <h3 className="text-xl font-bold text-white mb-4">GENWISH</h3>
                <Button asChild className="rounded-full bg-white text-black font-bold h-10 px-6 text-sm">
                  <a href="https://hstechco.premiumpage.kr" target="_blank">EN</a>
                </Button>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="group relative h-[340px] rounded-[2.5rem] overflow-hidden border border-border bg-[#0f172a]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-slate-900" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-blue-400 font-black tracking-widest text-xs mb-2 uppercase">Security Solution / Dark Mode</div>
                <h3 className="text-xl font-bold text-white mb-4">GENTOP IND.</h3>
                <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-10 px-6 text-sm">
                  <a href="https://gentop.premiumpage.kr" target="_blank">EN</a>
                </Button>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="group relative h-[340px] rounded-[2.5rem] overflow-hidden border border-border bg-[#111]">
              <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-all group-hover:scale-105">
                <Image src="/templates/hangseong/images/background_01.png" alt="항성산업사" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-orange-400 font-black tracking-widest text-xs mb-2 uppercase">Industrial / B2B</div>
                <h3 className="text-xl font-bold text-white mb-4">항성산업사</h3>
                <Button asChild className="rounded-full bg-white text-black font-bold h-10 px-6 text-sm">
                  <a href="https://hangseong.premiumpage.kr" target="_blank">EN</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ✨ Strategic Process: The Agency Way */}
      <section className="py-40 bg-muted/20 border-y border-border relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">THE STRATEGIC <span className="gradient-text">PROCESS</span></h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium">단순 변환을 넘어선 가치 창출, 글로벌 1등 사를 위한 프리미엄 페이지의 여정.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessCard
              number="01"
              title="Strategy"
              desc="해외 시장 분석 및 기업의 핵심 경쟁력을 도출하여 맞춤형 스토리텔링 전략을 수립합니다."
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <ProcessCard
              number="02"
              title="Creative"
              desc="브랜드 아이덴티티를 극대화하는 하이엔드 UI/UX 디자인과 독보적인 그래픽을 설계합니다."
              icon={<Layers className="w-6 h-6" />}
            />
            <ProcessCard
              number="03"
              title="Interaction"
              desc="Three.js와 스크롤 애니메이션 등 최신 기술을 활용해 바이어의 몰입감을 극대화합니다."
              icon={<MousePointer2 className="w-6 h-6" />}
            />
            <ProcessCard
              number="04"
              title="Global"
              desc="초고속 글로벌 CDN과 다국어 최적화를 통해 전 세계 어디서든 완벽한 경험을 제공합니다."
              icon={<Globe className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* 🚀 Bottom CTA */}
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
        {/* Glow */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/20 blur-[150px] rounded-full opacity-50" />
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-background relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-3xl font-black mb-4 gradient-text tracking-tighter uppercase">Premium Page</div>
            <p className="text-muted-foreground font-medium max-w-sm">
              Global Interactive Digital Catalog Agency for Export-Champion Companies.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-end gap-12 mb-8">
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
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-12 mt-12 border-t border-border/50 text-center md:text-left flex flex-col md:flex-row justify-between gap-6">
          <p className="text-muted-foreground text-sm font-medium">© 2026 Premium Page Inc. All rights reserved.</p>
          <div className="flex justify-center gap-8 text-muted-foreground text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProcessCard({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="relative p-10 rounded-[2.5rem] bg-card/50 border border-border transition-all hover:border-primary/30 group">
      <div className="text-4xl font-black text-primary/10 mb-8 group-hover:text-primary/20 transition-colors">{number}</div>
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed font-medium">{desc}</p>
    </div>
  )
}
