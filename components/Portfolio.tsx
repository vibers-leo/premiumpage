'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Sparkles } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const portfolioItems = [
    {
        id: 1,
        title: 'EMT Global Masterpiece',
        category: 'Masterpiece 3D',
        description: '산업용 제품군을 위한 압도적 비주얼의 3D 인터랙티브 전자 카탈로그 (EMT Global 본사 적용 모델)',
        image: '/portfolio/emt-masterpiece.jpg',
        tags: ['Three.js', 'High-end', 'Global Standard'],
        links: [
            { label: '국문 한글 버전', url: 'https://emt-ko.vercel.app' },
            { label: 'Global English Version', url: 'https://emt-en.vercel.app' }
        ],
        link: '#'
    }
]

const categories = ['All', 'Basic Viewer', 'Standard Interactive', 'Masterpiece 3D']

export function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedItem, setSelectedItem] = useState<any | null>(null)

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
                        프리미엄페이지가 구축한 하이엔드 전자 카탈로그 사례입니다.
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
                            >
                                <Card
                                    className="group bg-card/30 backdrop-blur-xl border-2 border-white/10 hover:border-purple-500/50 transition-all overflow-hidden flex flex-col h-full"
                                >
                                    {/* 이미지 섹션 */}
                                    <div className="aspect-video relative overflow-hidden">
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

                                    {/* 콘텐츠 섹션 */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-black text-white mb-3 transition-all">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 mb-6 line-clamp-2 text-base leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {item.tags.map((tag: string, i: number) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                    className="bg-gray-800/50 text-gray-400 text-xs border border-white/5"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* 🔗 링크 버튼 (카드 하단 고정) */}
                                        <div className="mt-auto flex flex-col gap-3">
                                            {item.links ? (
                                                <div className="grid grid-cols-2 gap-3">
                                                    {item.links.map((link: any, i: number) => (
                                                        <Button
                                                            key={i}
                                                            asChild
                                                            variant="outline"
                                                            className="h-12 text-sm font-bold bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-500/50 transition-all"
                                                        >
                                                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                                {link.label.includes('한글') ? '한글 버전' : 'English'}
                                                            </a>
                                                        </Button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Button
                                                    asChild
                                                    className="h-12 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-lg shadow-purple-500/20"
                                                >
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        프로젝트 보기
                                                    </a>
                                                </Button>
                                            )}
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
