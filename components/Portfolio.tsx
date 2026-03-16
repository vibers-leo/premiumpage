'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Sparkles } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const portfolioItems = [
    {
        id: 1,
        title: 'EMT Global',
        category: 'Masterpiece 3D',
        description: '스마트 센서·액추에이터 전문기업 EMT의 3D HUD 인터랙티브 전자카탈로그. 영문·한글 이중 버전 운영.',
        image: '/portfolio/emt-masterpiece.jpg',
        tags: ['3D HUD', 'Bilingual', 'Automotive Tech'],
        links: [
            { label: 'EN', url: 'https://emt-en.premiumpage.kr' },
            { label: 'KR', url: 'https://emt-ko.premiumpage.kr' },
        ],
    },
    {
        id: 2,
        title: 'HS-TECH',
        category: 'Standard Interactive',
        description: 'VAISALA·SETRA·JUMO·KNICK 등 글로벌 산업용 센서 브랜드 80+ 제품 슬라이드 카탈로그. 영문·한글 이중 버전.',
        image: '/templates/hs-tech/images/hmt330_6models_grid.jpg',
        tags: ['Multi-brand', '80+ Products', 'Bilingual'],
        links: [
            { label: 'EN', url: 'https://hstech.premiumpage.kr' },
            { label: 'KR', url: 'https://hstech-kr.premiumpage.kr' },
        ],
    },
    {
        id: 3,
        title: 'GENWISH (에어 HS-TECH)',
        category: 'Standard Interactive',
        description: '크레인·캠핑카·선박용 DC 엔진오프 에어컨 브랜드 GENWISH 영문 전자카탈로그. 25페이지 라이트모드.',
        image: '/templates/air-hstech/images/HSD-180D.jpg',
        tags: ['Light Mode', '25 Pages', 'English'],
        links: [
            { label: 'EN', url: 'https://hstechco.premiumpage.kr' },
        ],
    },
    {
        id: 4,
        title: 'GENTOP',
        category: 'Standard Interactive',
        description: '보안 솔루션 전문기업 GENTOP의 다크모드 영문 전자카탈로그. 제품군·사업영역 계층 구조 구현.',
        image: '/portfolio/standard-case.jpg',
        tags: ['Dark Mode', 'Security', 'English'],
        links: [
            { label: 'EN', url: 'https://gentop.premiumpage.kr' },
        ],
    },
    {
        id: 5,
        title: '항성산업사',
        category: 'Standard Interactive',
        description: '기업 맞춤형 영문 전자카탈로그. 제품 소개·회사 개요·인증서 등 핵심 콘텐츠 구성.',
        image: '/templates/hangseong/images/background_01.png',
        tags: ['English', 'B2B', 'Industrial'],
        links: [
            { label: 'EN', url: 'https://hangseong.premiumpage.kr' },
        ],
    },
]

const categories = ['All', 'Standard Interactive', 'Masterpiece 3D']

export function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredItems = selectedCategory === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory)

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
                        <Sparkles className="w-12 h-12 text-purple-400" />
                        <h2 className="text-6xl md:text-8xl font-black gradient-text">포트폴리오</h2>
                    </div>
                    <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
                        프리미엄페이지가 구축한 하이엔드 전자카탈로그 사례입니다.
                    </p>
                </motion.div>

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
                            className={`px-6 py-3 rounded-full font-bold transition-all ${selectedCategory === category
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* 포트폴리오 그리드 */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="group bg-card/30 backdrop-blur-xl border-2 border-white/10 hover:border-purple-500/50 transition-all overflow-hidden flex flex-col h-full">
                                    {/* 이미지 */}
                                    <div className="aspect-video relative overflow-hidden bg-gray-900">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4 z-10">
                                            <Badge className="bg-purple-500/80 text-white border-0 font-bold backdrop-blur-sm">
                                                {item.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* 콘텐츠 */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
                                        <p className="text-gray-400 mb-6 line-clamp-2 text-base leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {item.tags.map((tag, i) => (
                                                <Badge key={i} variant="secondary" className="bg-gray-800/50 text-gray-400 text-xs border border-white/5">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* 링크 버튼 */}
                                        <div className="mt-auto flex gap-3">
                                            {item.links.map((link, i) => (
                                                <Button
                                                    key={i}
                                                    asChild
                                                    variant="outline"
                                                    className="flex-1 h-12 text-sm font-bold bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-500/50 transition-all"
                                                >
                                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-3 h-3 mr-2" />
                                                        {link.label}
                                                    </a>
                                                </Button>
                                            ))}
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
