'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, FolderOpen, Trash2, ExternalLink, Sparkles, ArrowLeft } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

/* ── 포트폴리오 데이터 ── */
const portfolioItems = [
    {
        id: 'portfolio-1',
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
        id: 'portfolio-2',
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
        id: 'portfolio-3',
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
        id: 'portfolio-4',
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
        id: 'portfolio-5',
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

/* ── 내 프로젝트 타입 ── */
interface Project {
    id: string
    name: string
    description?: string
    updatedAt: string
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('All')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects')
            if (res.ok) {
                const data = await res.json()
                setProjects(data)
            }
        } catch (error) {
            console.error('Failed to fetch projects', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return
        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
            if (res.ok) fetchProjects()
        } catch (error) {
            alert('삭제 실패')
        }
    }

    const filteredPortfolio = selectedCategory === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory)

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* 헤더 */}
            <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                            PP
                        </div>
                        <span className="font-bold text-lg text-white">Premium Page</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="text-white/40 text-sm hidden sm:block">프로젝트 & 포트폴리오</span>
                        <Link href="/builder">
                            <Button className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white font-bold text-sm h-9 px-5 active:scale-95 transition-all">
                                <Plus className="w-4 h-4 mr-1.5" />
                                새 프로젝트
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* 포트폴리오 섹션 */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Sparkles className="w-10 h-10 text-violet-400" />
                            <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent break-keep">포트폴리오</h2>
                        </div>
                        <p className="text-lg text-white/40 font-light max-w-2xl mx-auto break-keep">
                            프리미엄페이지가 구축한 하이엔드 전자카탈로그 사례입니다.
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
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* 포트폴리오 그리드 */}
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredPortfolio.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                                >
                                    <Card className="group bg-white/5 backdrop-blur-xl border-2 border-white/10 hover:border-violet-500/50 transition-all overflow-hidden flex flex-col h-full">
                                        {/* 이미지 */}
                                        <div className="aspect-video relative overflow-hidden bg-white/5">
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

                                        {/* 콘텐츠 */}
                                        <div className="p-7 flex flex-col flex-1">
                                            <h3 className="text-xl font-black tracking-tight text-white mb-2">{item.title}</h3>
                                            <p className="text-white/40 mb-5 line-clamp-2 text-sm leading-relaxed break-keep">
                                                {item.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {item.tags.map((tag, i) => (
                                                    <Badge key={i} variant="secondary" className="bg-white/5 text-white/40 text-xs border border-white/5">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>

                                            {/* 링크 버튼 */}
                                            <div className="mt-auto flex gap-2">
                                                {item.links.map((link, i) => (
                                                    <Button
                                                        key={i}
                                                        asChild
                                                        variant="outline"
                                                        className="flex-1 h-10 text-sm font-bold rounded-full bg-white/5 hover:bg-violet-500/20 border-white/10 hover:border-violet-500/50 text-white/60 hover:text-white transition-all active:scale-95"
                                                    >
                                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="w-3 h-3 mr-1.5" />
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

            {/* 내 프로젝트 섹션 */}
            <section className="py-24 md:py-32 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-black tracking-tight mb-8 break-keep">내 프로젝트</h2>

                    {isLoading ? (
                        <div className="text-center py-20 text-white/40">로딩 중...</div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2 break-keep">프로젝트가 없습니다</h3>
                            <p className="text-white/40 mb-6 break-keep">새로운 웹사이트를 만들어보세요</p>
                            <Link href="/builder">
                                <Button className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white font-bold active:scale-95 transition-all">
                                    <Plus className="w-4 h-4 mr-1.5" />
                                    새 프로젝트 시작하기
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                >
                                    <Link href={`/builder?id=${project.id}`} className="block p-6">
                                        <div className="aspect-video bg-white/5 rounded-xl mb-4 flex items-center justify-center text-white/20">
                                            <FolderOpen className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 text-white group-hover:text-violet-400 transition-colors tracking-tight">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm text-white/40">
                                            {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true, locale: ko })}
                                        </p>
                                    </Link>

                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleDelete(project.id)
                                            }}
                                            className="p-2 bg-red-500/20 backdrop-blur rounded-lg hover:bg-red-500/30 text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
