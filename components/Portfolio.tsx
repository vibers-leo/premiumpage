'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Sparkles } from 'lucide-react'

const portfolioItems = [
    {
        id: 1,
        title: 'EMT Global Masterpiece',
        category: 'Masterpiece 3D',
        description: '산업용 제품군을 위한 압도적 비주얼의 3D 인터랙티브 전자 카탈로그 (EMT Global 본사 적용 모델)',
        image: '/portfolio/emt-masterpiece.jpg',
        tags: ['Three.js', 'High-end', 'Global Standard'],
        links: [
            { label: '국문 한글 버전', url: 'https://emt-ko.premiumpage.kr' },
            { label: 'Global English Version', url: 'https://emt-en.premiumpage.kr' }
        ],
    }
]

const categories = ['All', 'Basic Viewer', 'Standard Interactive', 'Masterpiece 3D']

export function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null)

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
                        <Sparkles className="w-10 h-10 text-neutral-400" />
                        <h2 className="text-5xl md:text-7xl font-black gradient-text">포트폴리오</h2>
                    </div>
                    <p className="text-xl text-neutral-500 font-light max-w-3xl mx-auto">
                        프리미엄페이지가 구축한 하이엔드 전자 카탈로그 사례입니다.
                    </p>
                </motion.div>

                {/* 카테고리 필터 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === category
                                ? 'bg-neutral-900 text-white shadow-sm'
                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* 포트폴리오 그리드 */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => setSelectedItem(item)}
                                className="group bg-white border border-neutral-200 hover:border-neutral-400 hover:-translate-y-1 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
                            >
                                {/* 이미지 섹션 */}
                                <div className="aspect-video relative overflow-hidden bg-neutral-100">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-900/80 text-white backdrop-blur-sm">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* 콘텐츠 */}
                                <div className="p-6">
                                    <h3 className="text-lg font-black text-neutral-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
                                        {item.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* 모달 */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
                        >
                            {/* 모달 헤더 */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-600 mb-3 inline-block">
                                        {selectedItem.category}
                                    </span>
                                    <h3 className="text-2xl font-black text-neutral-900">{selectedItem.title}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* 이미지 */}
                            <div className="aspect-video relative overflow-hidden rounded-2xl bg-neutral-100 mb-6">
                                <Image
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* 설명 */}
                            <p className="text-neutral-600 leading-relaxed mb-5">
                                {selectedItem.description}
                            </p>

                            {/* 태그 */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedItem.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* 링크 버튼 */}
                            {selectedItem.links && (
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedItem.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl text-sm font-bold border border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {link.label.includes('한글') || link.label.includes('국문') ? '한글 버전' : 'English'}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
