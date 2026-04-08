'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Zap, Crown, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { developmentPlans, maintenancePlans } from '@/lib/data'
import { formatPrice } from '@/lib/data-utils'

const planIcons = [
  <Zap key="zap" className="w-8 h-8" />,
  <Rocket key="rocket" className="w-8 h-8" />,
  <Crown key="crown" className="w-8 h-8" />,
]

const planDescriptions = [
  '기존 PDF를 빠르게 웹 뷰어로 변환하고 싶은 기업',
  '맞춤형 디자인과 다국어를 지원하는 전문 카탈로그가 필요한 기업',
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
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-bold">Transparent Pricing</Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            합리적인 <span className="gradient-text">가격 정책</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium">
            기업 규모와 니즈에 맞는 최적의 플랜을 선택하세요.<br />
            모든 플랜에 전문 컨설팅이 포함됩니다.
          </p>
        </div>
      </section>

      {/* Development Plans */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {developmentPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className={`relative h-full transition-all hover:-translate-y-2 ${plan.popular ? 'border-primary shadow-[0_0_40px_rgba(168,85,247,0.15)]' : 'border-border hover:border-primary/30'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 font-bold">MOST POPULAR</Badge>
                    </div>
                  )}
                  <CardContent className="p-8 pt-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      {planIcons[i]}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{planDescriptions[i]}</p>

                    <div className="mb-2">
                      <span className="text-4xl font-black">{formatPrice(plan.price)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">납기: {planDelivery[i]}</p>

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
                      <Link href={`/quote?plan=${plan.id}`}>
                        견적 요청하기 <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-32 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">상세 기능 비교</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              각 플랜에 포함된 기능을 한눈에 비교해보세요.
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-bold text-sm min-w-[200px]">기능</th>
                  <th className="text-center py-4 px-4 font-bold text-sm min-w-[120px]">Lite</th>
                  <th className="text-center py-4 px-4 font-bold text-sm min-w-[120px]">
                    <span className="text-primary">Standard</span>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-sm min-w-[120px]">Master</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      <FeatureCell value={row.lite} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <FeatureCell value={row.standard} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <FeatureCell value={row.master} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
              유지보수 <span className="gradient-text">플랜</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              안정적인 서비스 운영과 지속적인 콘텐츠 관리를 위한 월간 플랜입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {maintenancePlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className={`h-full transition-all hover:-translate-y-2 ${plan.popular ? 'border-primary' : 'border-border hover:border-primary/30'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 font-bold">BEST VALUE</Badge>
                    </div>
                  )}
                  <CardContent className="p-8 pt-10">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-black">{formatPrice(plan.price)}</span>
                      <span className="text-muted-foreground ml-1">/월</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant={plan.popular ? 'default' : 'outline'}
                      className="w-full h-12 rounded-full font-bold"
                    >
                      <Link href="/quote">선택하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-muted/10 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
            맞춤 견적이 필요하신가요?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            프로젝트 규모와 요구사항에 맞는 최적의 견적을 무료로 받아보세요.
          </p>
          <Button asChild size="lg" className="h-16 px-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg">
            <Link href="/quote">무료 견적 받기 <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-5 h-5 text-primary mx-auto" />
  if (value === false) return <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
  return <span className="text-sm font-medium text-primary">{value}</span>
}
