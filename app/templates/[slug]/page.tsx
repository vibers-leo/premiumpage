import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { templates } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Check, ExternalLink, Eye, GitCompare, Sparkles } from 'lucide-react'
import { TemplatePreview } from '@/components/TemplatePreview'
import { TemplateComparison } from '@/components/TemplateComparison'
import { RelatedTemplates } from '@/components/RelatedTemplates'
import { TemplateActionButtons } from '@/components/TemplateActionButtons'

export async function generateStaticParams() {
    return templates.map((template) => ({
        slug: template.slug,
    }))
}

interface TemplateDetailPageProps {
    params: Promise<{ slug: string }>
}

import { Metadata } from 'next'

export async function generateMetadata({ params }: TemplateDetailPageProps): Promise<Metadata> {
    const { slug } = await params
    const template = templates.find((t) => t.slug === slug)

    if (!template) {
        return {
            title: '템플릿을 찾을 수 없습니다',
        }
    }

    return {
        title: `${template.name} - Premium Page Template`,
        description: template.description,
        openGraph: {
            title: `${template.name} - Premium Website Template`,
            description: template.description,
            images: [template.imageUrl],
        },
    }
}

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
    const { slug } = await params
    const template = templates.find((t) => t.slug === slug)

    if (!template) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white">
            {/* 헤더 */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
                <div className="imweb-container">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <span className="font-bold text-xl">Premium Page</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/#features" className="imweb-body hover:text-blue-600 transition">기능</Link>
                            <Link href="/#templates" className="imweb-body hover:text-blue-600 transition">템플릿</Link>
                            <Link href="/#pricing" className="imweb-body hover:text-blue-600 transition">요금제</Link>
                            <Link href="/quote" className="imweb-btn imweb-btn-primary">
                                시작하기
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* 뒤로 가기 */}
            <div className="imweb-container py-8">
                <Link href="/#templates" className="imweb-btn imweb-btn-secondary inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    템플릿 목록으로
                </Link>
            </div>

            {/* 템플릿 상세 */}
            <section className="imweb-section">
                <div className="imweb-container">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* 왼쪽: 정보 */}
                        <div>
                            <Badge className="imweb-badge imweb-badge-primary mb-4">
                                {template.category}
                            </Badge>
                            <h1 className="imweb-heading-1 mb-4">{template.name}</h1>
                            <p className="imweb-body-lg mb-8">{template.description}</p>

                            {/* 기능 목록 */}
                            <div className="mb-8">
                                <h2 className="imweb-heading-3 mb-4">포함된 기능</h2>
                                <ul className="space-y-3">
                                    {template.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span className="imweb-body">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA 버튼 */}
                            <TemplateActionButtons demoUrl={template.demoUrl} />
                        </div>

                        {/* 오른쪽: 미리보기 */}
                        <div className="sticky top-24">
                            <TemplatePreview demoUrl={template.demoUrl} templateName={template.name} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 관련 템플릿 */}
            <section className="imweb-section imweb-section-gray">
                <div className="imweb-container">
                    <h2 className="imweb-heading-2 mb-8 text-center">관련 템플릿</h2>
                    <RelatedTemplates currentTemplate={template} allTemplates={templates} />
                </div>
            </section>

            {/* 푸터 */}
            <footer className="imweb-section-sm bg-gray-900 text-gray-400">
                <div className="imweb-container">
                    <div className="imweb-grid imweb-grid-4 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">P</span>
                                </div>
                                <span className="font-bold text-white">Premium Page</span>
                            </div>
                            <p className="imweb-body-sm">프리미엄 웹사이트 제작 플랫폼</p>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">제품</h4>
                            <ul className="space-y-2 imweb-body-sm">
                                <li><Link href="/#templates" className="hover:text-white transition">템플릿</Link></li>
                                <li><Link href="/#pricing" className="hover:text-white transition">요금제</Link></li>
                                <li><Link href="/#features" className="hover:text-white transition">기능</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">지원</h4>
                            <ul className="space-y-2 imweb-body-sm">
                                <li><a href="#" className="hover:text-white transition">고객센터</a></li>
                                <li><a href="#" className="hover:text-white transition">가이드</a></li>
                                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">회사</h4>
                            <ul className="space-y-2 imweb-body-sm">
                                <li><a href="#" className="hover:text-white transition">소개</a></li>
                                <li><a href="#" className="hover:text-white transition">블로그</a></li>
                                <li><a href="#" className="hover:text-white transition">채용</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 imweb-body-sm">
                        <p>© 2024 Premium Page. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition">이용약관</a>
                            <a href="#" className="hover:text-white transition">개인정보처리방침</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
