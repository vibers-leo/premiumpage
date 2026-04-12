'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Zap, Crown, Rocket, Presentation, FileText, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { developmentPlans, maintenancePlans, proposalPlans } from '@/lib/data'
import { formatPrice } from '@/lib/data-utils'

const planIcons = [
  <Zap key="zap" className="w-8 h-8" />,
  <Rocket key="rocket" className="w-8 h-8" />,
  <Crown key="crown" className="w-8 h-8" />,
]

const planDescriptions = [
  '표준 디자인으로 빠르게 전자카탈로그를 만들고 싶은 기업',
  '브랜드 맞춤형 고급 디자인과 다국어를 지원하는 전문 카탈로그가 필요한 기업',
  '3D 모델링과 최고급 인터랙션으로 글로벌 시장을 선도할 기업',
]

const planDelivery = ['약 1주일', '2~4주', '4~8주']

// 기능 비교 매트릭스
const featureComparison = [
  { feature: '반응형 모바일 최적화', lite: true, standard: true, master: true },
  { feature: 'QR 코드 제공', lite: true, standard: true, master: true },
  { feature: '전용 서브도메인', lite: true, standard: true, master: true },
  { feature: 'SSL 보안 인증서', lite: true, standard: true, master: true },
  { feature: '페이지 넘김(Flip) 효과', lite: true, standard: true, master: true },
  { feature: '맞춤형 UI/UX 디자인', lite: false, standard: true, master: true },
  { feature: '인터랙티브 애니메이션', lite: false, standard: true, master: true },
  { feature: '다국어 지원', lite: false, standard: '최대 3개국어', master: '무제한' },
  { feature: '제품 찾기/필터링', lite: false, standard: true, master: true },
  { feature: '문의 폼 연동', lite: false, standard: true, master: true },
  { feature: 'SEO 최적화', lite: false, standard: true, master: true },
  { feature: '3D 모델링 지원', lite: false, standard: false, master: true },
  { feature: '스크롤 기반 인터랙티브 UX', lite: false, standard: false, master: true },
  { feature: '실시간 제품 시뮬레이션', lite: false, standard: false, master: true },
  { feature: '글로벌 CDN 배포', lite: false, standard: false, master: true },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">

      {/* Hero */}
      <section className="py-24 md:py-32 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              Transparent Pricing
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              합리적인 가격 정책
            </h1>
            <p className="text-neutral-500 text-base md:text-lg leading-relaxed">
              기업 규모와 니즈에 맞는 최적의 플랜을 선택하세요.
              모든 플랜에 전문 컨설팅이 포함됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Development Plans */}
      <section className="py-24 md:py-32 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              E-Catalog Plans
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">전자카탈로그 플랜</h2>
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
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-400 mb-6">
                  {planIcons[i]}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-extrabold">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-[10px] font-bold tracking-wider uppercase border border-neutral-900 px-2 py-0.5">POPULAR</span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mb-4">{planDescriptions[i]}</p>
                <div className="text-2xl font-extrabold tracking-tight mb-1">{plan.priceRange}</div>
                <p className="text-[11px] text-neutral-400 mb-1">견적 확정 후 결제 · 일회성</p>
                <p className="text-xs text-neutral-400 mb-6">납기: {planDelivery[i]}</p>

                <div className="border-t border-neutral-200 pt-6 mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-neutral-400 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-500 text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/quote?plan=${plan.id}`}
                  className={`w-full h-10 flex items-center justify-center font-bold text-sm transition-all ${plan.popular ? 'bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-700' : 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900'}`}
                >
                  무료 견적 받기
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PPT Proposal Plans */}
      <section className="py-32 border-t border-neutral-200">
        <div className="container mx-auto px-8 max-w-screen-xl">
          <div className="mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              Proposal & IR Deck
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              PPT 제안서 제작
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl leading-relaxed">
              IR 덱, 회사소개서, 입찰제안서까지. 전문 디자인과 전략적 콘텐츠로 설득력을 극대화합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 max-w-5xl">
            {proposalPlans.map((plan, i) => {
              const icons = [<FileText key="ft" className="w-5 h-5" />, <Presentation key="pr" className="w-5 h-5" />, <Target key="tg" className="w-5 h-5" />]
              return (
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
                  <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-400 mb-6">
                    {icons[i]}
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-base font-extrabold">{plan.name}</h3>
                      {plan.popular && (
                        <span className="text-[10px] font-bold tracking-wider uppercase border border-neutral-900 px-2 py-0.5">POPULAR</span>
                      )}
                    </div>
                    <div className="text-2xl font-extrabold tracking-tight">{plan.priceRange}</div>
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
                    <Link href={`/quote?service=proposal&plan=${plan.id}`}>견적 요청하기</Link>
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 md:py-32 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              Feature Comparison
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">상세 기능 비교</h2>
          </div>

          <div className="max-w-5xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-neutral-400 min-w-[200px]">기능</th>
                  <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-neutral-400 min-w-[100px]">Basic</th>
                  <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-neutral-900 min-w-[100px]">Pro</th>
                  <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-neutral-400 min-w-[100px]">Master</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, i) => (
                  <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-center"><FeatureCell value={row.lite} /></td>
                    <td className="py-3 px-4 text-center"><FeatureCell value={row.standard} /></td>
                    <td className="py-3 px-4 text-center"><FeatureCell value={row.master} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-24 md:py-32 border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-neutral-300" />
              Maintenance
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">유지보수 플랜</h2>
            <p className="text-neutral-500 text-sm mt-2">안정적인 서비스 운영과 지속적인 콘텐츠 관리를 위한 월간 플랜입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 max-w-3xl">
            {maintenancePlans.map((plan, i) => (
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
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-extrabold">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-[10px] font-bold tracking-wider uppercase border border-neutral-900 px-2 py-0.5">BEST</span>
                  )}
                </div>
                <div className="mb-6">
                  <span className="text-2xl font-extrabold tracking-tight">{formatPrice(plan.price)}</span>
                  <span className="text-neutral-400 text-xs ml-1">/월</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 text-neutral-400 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-500 text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/quote"
                  className={`w-full h-10 flex items-center justify-center font-bold text-sm transition-all ${plan.popular ? 'bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-700' : 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900'}`}
                >
                  선택하기
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            맞춤 견적이 필요하신가요?
          </h2>
          <p className="text-neutral-500 text-base mb-10 max-w-xl mx-auto">
            프로젝트 규모와 요구사항에 맞는 최적의 견적을 무료로 받아보세요.
          </p>
          <Link href="/quote" className="inline-flex items-center gap-2 h-12 px-8 bg-neutral-900 text-white font-bold text-sm border border-neutral-900 hover:bg-neutral-700 transition-all">
            무료 견적 받기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-neutral-900 mx-auto" />
  if (value === false) return <X className="w-4 h-4 text-neutral-200 mx-auto" />
  return <span className="text-xs font-bold text-neutral-900">{value}</span>
}
