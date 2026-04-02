'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'

const faqs = [
    {
        category: '일반',
        questions: [
            {
                q: 'Premium Page는 어떤 서비스인가요?',
                a: 'Premium Page는 개인부터 중소기업까지 모든 비즈니스를 위한 프리미엄 웹사이트 제작 플랫폼입니다. 23개의 전문 템플릿과 맞춤형 개발 서비스를 제공합니다.'
            },
            {
                q: '제작 기간은 얼마나 걸리나요?',
                a: '선택하신 요금제에 따라 다르지만, 일반적으로 Basic 플랜은 1-2주, Standard 플랜은 2-4주, Premium 플랜은 4-8주 정도 소요됩니다.'
            },
            {
                q: '도메인과 호스팅도 포함되나요?',
                a: '네, 모든 요금제에 1년 무료 도메인과 안정적인 호스팅이 포함되어 있습니다. 이후에는 유지보수 요금제를 통해 계속 이용하실 수 있습니다.'
            }
        ]
    },
    {
        category: '요금제',
        questions: [
            {
                q: '요금제는 어떻게 선택하나요?',
                a: '비즈니스 규모와 필요한 기능에 따라 선택하시면 됩니다. Basic은 간단한 소개 페이지, Standard는 전자상거래 기능, Premium은 완전 맞춤형 개발에 적합합니다.'
            },
            {
                q: '유지보수 요금제는 필수인가요?',
                a: '필수는 아니지만 강력히 권장합니다. 유지보수 요금제를 통해 호스팅, 보안 업데이트, 콘텐츠 수정, 기술 지원을 받으실 수 있습니다.'
            },
            {
                q: '환불 정책은 어떻게 되나요?',
                a: '개발 시작 전까지는 100% 환불이 가능합니다. 개발 시작 후에는 진행 단계에 따라 부분 환불이 가능합니다.'
            }
        ]
    },
    {
        category: '기술',
        questions: [
            {
                q: '어떤 기술로 개발되나요?',
                a: 'Next.js, React, TypeScript 등 최신 웹 기술을 사용하여 빠르고 안정적인 웹사이트를 제작합니다.'
            },
            {
                q: '모바일에서도 잘 작동하나요?',
                a: '네, 모든 템플릿은 반응형으로 제작되어 데스크톱, 태블릿, 모바일 등 모든 기기에서 완벽하게 작동합니다.'
            },
            {
                q: 'SEO 최적화가 되어 있나요?',
                a: '네, 모든 웹사이트는 검색 엔진 최적화(SEO)가 기본으로 적용되어 있어 Google 등 검색 엔진에서 쉽게 찾을 수 있습니다.'
            }
        ]
    },
    {
        category: '지원',
        questions: [
            {
                q: '기술 지원은 어떻게 받나요?',
                a: '이메일, 전화, 채팅을 통해 기술 지원을 받으실 수 있습니다. 유지보수 요금제에 따라 응답 시간이 다릅니다.'
            },
            {
                q: '직접 콘텐츠를 수정할 수 있나요?',
                a: '네, 간단한 관리자 패널을 통해 텍스트, 이미지 등을 직접 수정하실 수 있습니다. 교육도 제공해드립니다.'
            },
            {
                q: '추가 기능을 나중에 추가할 수 있나요?',
                a: '네, 언제든지 추가 기능 개발을 요청하실 수 있습니다. 별도 견적을 제공해드립니다.'
            }
        ]
    }
]

export function FAQ() {
    const [searchQuery, setSearchQuery] = useState('')
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleItem = (id: string) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    // 검색 필터링
    const filteredFaqs = faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
            q =>
                q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.questions.length > 0)

    return (
        <section className="py-32 relative">
            <div className="container mx-auto px-4">
                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <HelpCircle className="w-12 h-12 text-purple-400" />
                        <h2 className="text-6xl md:text-8xl font-black gradient-text">자주 묻는 질문</h2>
                    </div>
                    <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-8">
                        궁금하신 점을 빠르게 찾아보세요
                    </p>

                    {/* 검색 */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="질문을 검색하세요..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 py-6 text-lg bg-gray-900/50 border-gray-700 focus:border-purple-500 text-white"
                        />
                    </div>
                </motion.div>

                {/* FAQ 아코디언 */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {filteredFaqs.map((category, catIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                                {category.category}
                            </h3>

                            <div className="space-y-4">
                                {category.questions.map((faq, index) => {
                                    const itemId = `${category.category}-${index}`
                                    const isOpen = openItems.includes(itemId)

                                    return (
                                        <Card
                                            key={index}
                                            className="bg-card/30 backdrop-blur-xl border-2 border-white/10 hover:border-purple-500/50 transition-all overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleItem(itemId)}
                                                className="w-full p-6 flex items-center justify-between text-left group"
                                            >
                                                <span className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all pr-4">
                                                    {faq.q}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-shrink-0"
                                                >
                                                    <ChevronDown className="w-6 h-6 text-purple-400" />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <CardContent className="px-6 pb-6 pt-0">
                                                            <div className="pl-4 border-l-2 border-purple-500/30">
                                                                <p className="text-gray-300 text-lg leading-relaxed">
                                                                    {faq.a}
                                                                </p>
                                                            </div>
                                                        </CardContent>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Card>
                                    )
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 추가 도움말 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <h4 className="text-2xl font-bold text-white mb-4">
                                찾으시는 답변이 없으신가요?
                            </h4>
                            <p className="text-gray-300 mb-6">
                                언제든지 문의해주세요. 전문 상담사가 도와드리겠습니다.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:info@premiumpage.com"
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
                                >
                                    이메일 문의
                                </a>
                                <a
                                    href="tel:02-1234-5678"
                                    className="px-6 py-3 border-2 border-purple-500/50 text-purple-300 rounded-lg font-bold hover:bg-purple-500/10 transition-colors"
                                >
                                    전화 문의
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
