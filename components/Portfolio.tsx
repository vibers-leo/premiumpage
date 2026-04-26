'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/SectionHeader'
import { X, ExternalLink } from 'lucide-react'

const portfolioItems = [
    {
        id: 1,
        title: 'EMT Global',
        category: 'Masterpiece 3D',
        description: '스마트 센서 & 미래 모빌리티 산업을 위한 3D HUD 인터페이스 기반 인터랙티브 전자 카탈로그. 영문/한글 이중 지원.',
        image: '/og/emt.png',
        tags: ['Three.js', '3D HUD', 'Bilingual', 'Dark Mode'],
        links: [
            { label: '영문 버전', url: 'https://emt.premiumpage.kr' },
            { label: '한글 버전', url: 'https://emt-ko.premiumpage.kr' }
        ],
    },
    {
        id: 2,
        title: 'HS-TECH',
        category: 'Standard Interactive',
        description: 'VAISALA, SETRA, JUMO, KNICK 등 산업용 센서 브랜드를 4단계 계층 구조로 정리한 80+ 페이지 전자 카탈로그.',
        image: '/og/hstech.png',
        tags: ['Product Hierarchy', 'Multi-brand', '80+ Pages', 'Sensor'],
        links: [
            { label: '영문 버전', url: 'https://hstech.premiumpage.kr' },
        ],
    },
    {
        id: 3,
        title: 'GENTOP IND.',
        category: 'Standard Interactive',
        description: '건설 & 시설관리 종합 기업의 사업 영역, 시공 실적, 연혁을 인터랙티브 스토리텔링으로 구성한 브랜드 쇼케이스.',
        image: '/og/gentop.png',
        tags: ['Brand Showcase', 'Construction', 'Dark Mode', 'KR/EN'],
        links: [
            { label: '브랜드 쇼케이스', url: 'https://gentop.premiumpage.kr' },
        ],
    },
    {
        id: 4,
        title: 'GENWISH (에어 HS-TECH)',
        category: 'Standard Interactive',
        description: 'DC 엔진오프 에어컨 전문 기업. 크레인, 캠핑카, 선박용 에어컨 제품 라인업을 25페이지 라이트모드 카탈로그로 구성.',
        image: '/og/genwish.png',
        tags: ['Light Mode', '25 Pages', 'DC Air Conditioning', 'Product Spec'],
        links: [
            { label: '브랜드 쇼케이스', url: 'https://hstechco.premiumpage.kr' },
        ],
    },
    {
        id: 5,
        title: '항성산업사',
        category: 'Basic Viewer',
        description: '한국 시장 중심 기업 특화 전자 카탈로그. 깔끔한 탭 기반 구성으로 제품과 기업 정보를 효율적으로 전달.',
        image: '/portfolio/standard-case.jpg',
        tags: ['Single Page', 'Tab Navigation', 'Korean Market'],
        links: [
            { label: '카탈로그 보기', url: 'https://hangseong.premiumpage.kr' },
        ],
    },
    {
        id: 6,
        title: 'IR Deck — 투자유치 제안서',
        category: 'IR & Proposal',
        description: '시리즈 A 투자 유치를 위한 전문 IR 덱. 시장 분석, 재무 전망, 팀 소개를 전략적 스토리텔링으로 구성합니다.',
        image: '/portfolio/luxury-3d.jpg',
        tags: ['IR Deck', 'Investment', 'Data Visualization'],
        links: [],
    },
    {
        id: 7,
        title: '입찰제안서 — 공공조달',
        category: 'IR & Proposal',
        description: '공공입찰 평가 기준에 최적화된 제안서. 기술점수 극대화를 위한 구조적 설계와 전문 디자인을 제공합니다.',
        image: '/portfolio/medical-catalog.jpg',
        tags: ['RFP Analysis', 'Public Procurement', 'Strategy'],
        links: [],
    },
]

const categories = ['All', 'Basic Viewer', 'Standard Interactive', 'Masterpiece 3D', 'IR & Proposal']

export function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null)

    const filteredItems = selectedCategory === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory)

    return (
        <section className="pt-12 pb-16 md:pt-16 md:pb-20 relative">
            <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
                <SectionHeader
                    label="작업 사례"
                    title="포트폴리오"
                    description="프리미엄페이지가 구축한 하이엔드 전자 카탈로그와 제안서 사례입니다."
                />

                {/* 카테고리 필터 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 text-sm font-bold transition-all border ${selectedCategory === category
                                ? 'bg-neutral-900 text-white border-neutral-900'
                                : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* 포트폴리오 그리드 */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                                className="group bg-white border border-neutral-200 hover:border-neutral-900 transition-all duration-300 cursor-pointer overflow-hidden"
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
                                        <span className="px-3 py-1 text-[10px] font-bold bg-neutral-900 text-white tracking-wider uppercase">
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
                                                className="px-2.5 py-1 text-[11px] font-bold border border-neutral-200 text-neutral-500"
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
                            className="bg-white p-8 max-w-2xl w-full border border-neutral-200"
                        >
                            {/* 모달 헤더 */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <span className="px-3 py-1 text-[10px] font-bold border border-neutral-200 text-neutral-500 mb-3 inline-block tracking-wider uppercase">
                                        {selectedItem.category}
                                    </span>
                                    <h3 className="text-2xl font-black text-neutral-900">{selectedItem.title}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* 이미지 */}
                            <div className="aspect-video relative overflow-hidden bg-neutral-100 mb-6">
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
                            {selectedItem.links && selectedItem.links.length > 0 && (
                                <div className={`grid gap-3 ${selectedItem.links.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                    {selectedItem.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 h-12 px-4 text-sm font-bold border border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                            {selectedItem.links && selectedItem.links.length === 0 && (
                                <div className="text-center py-4 border border-neutral-200 text-neutral-400 text-sm">
                                    준비 중인 포트폴리오입니다
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
