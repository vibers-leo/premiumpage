'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const templateItems = [
    {
        id: 0,
        title: 'EMT Masterpiece (Global)',
        category: 'Masterpiece 3D',
        slug: 'emt',
        description: '하이엔드 모빌리티 테크 기업을 위한 최상위 3D HUD 인터페이스. Three.js 기반의 몰입형 경험을 선사합니다.',
        image: '/emt/assets/19.png',
        tags: ['3D Engine', 'HUD Interface', 'Global Standard'],
        link: 'https://emt.premiumpage.kr'
    },
    {
        id: 1,
        title: 'HS TECH Premium',
        category: 'Standard Interactive',
        slug: 'hs-tech',
        description: '센서 기술 전문 기업을 위한 프리미엄 블루 테마. 탭 기반의 직관적인 SPA 구조와 깊이 있는 제품 소개를 제공합니다.',
        image: '/assets/hs-tech/93bb9f158cd59.png',
        tags: ['Sensor Tech', 'Blue Theme', 'Tab Navigation'],
        link: '/templates/hs-tech'
    },
    {
        id: 2,
        title: 'HANGSEONG Industrial',
        category: 'Masterpiece 3D',
        slug: 'hangseong',
        description: '자동차 부품 제조사를 위한 대시보드형 카탈로그. 좌측 사이드바와 블랙&레드 테마로 강렬한 인상을 남깁니다.',
        image: '/assets/hangseong/vision_en.PNG',
        tags: ['Automotive', 'Dashboard UI', 'Red & Black'],
        link: '/templates/hangseong'
    },
    {
        id: 3,
        title: 'GENTOP Systems',
        category: 'Standard Interactive',
        slug: 'gentop',
        description: 'ICT/SI 솔루션 기업을 위한 스마트 시스템 테마. 상단 라인 탭과 와이드 비주얼로 기술력을 강조합니다.',
        image: '/assets/gentop/cctv_01.jpg',
        tags: ['ICT Solution', 'Smart System', 'Wide Layout'],
        link: '/templates/gentop'
    }
]


const categories = ['All', 'Standard Interactive', 'Masterpiece 3D']

export function TemplatesList() {
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredItems = selectedCategory === 'All'
        ? templateItems
        : templateItems.filter(item => item.category === selectedCategory)

    return (
        <section className="relative">
            <div className="container mx-auto">

                {/* 카테고리 필터 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-full font-bold transition-all active:scale-95 ${selectedCategory === category
                                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* 템플릿 그리드 */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                            >
                                <Card
                                    className="group bg-white/5 backdrop-blur-xl border-2 border-white/10 hover:border-violet-500/50 transition-all overflow-hidden flex flex-col h-full"
                                >
                                    {/* 이미지 섹션 */}
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                                        <div className="aspect-video relative overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 right-4 z-10">
                                                <Badge className="bg-violet-500/80 text-white border-0 font-bold backdrop-blur-sm">
                                                    {item.category}
                                                </Badge>
                                            </div>
                                        </div>
                                    </a>


                                    {/* 콘텐츠 섹션 */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-black tracking-tight text-white mb-3 transition-all">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/50 mb-6 line-clamp-2 text-base leading-relaxed break-keep">
                                            {item.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {item.tags.map((tag: string, i: number) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                    className="bg-white/5 text-white/40 text-xs border border-white/5"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* 버튼 (카드 하단 고정) */}
                                        <div className="mt-auto">
                                            <Button
                                                asChild
                                                className="w-full h-12 text-sm font-bold rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-all"
                                            >
                                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    템플릿 상세보기
                                                </a>
                                            </Button>

                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
