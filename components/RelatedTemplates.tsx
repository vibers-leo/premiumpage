'use client'

import { Template } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface RelatedTemplatesProps {
    currentTemplate: Template
    allTemplates: Template[]
    maxTemplates?: number
}

export function RelatedTemplates({ currentTemplate, allTemplates, maxTemplates = 3 }: RelatedTemplatesProps) {
    // 관련 템플릿 찾기 로직
    const getRelatedTemplates = (): Template[] => {
        // 1. 같은 카테고리의 템플릿
        const sameCategory = allTemplates.filter(
            t => t.categoryId === currentTemplate.categoryId && t.id !== currentTemplate.id
        )

        // 2. 유사한 기능을 가진 템플릿 (기능 겹치는 개수로 정렬)
        const withSimilarity = sameCategory.map(template => {
            const commonFeatures = template.features.filter(f =>
                currentTemplate.features.some(cf => cf.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(cf.toLowerCase()))
            )
            return {
                template,
                similarity: commonFeatures.length
            }
        })

        // 유사도 순으로 정렬
        withSimilarity.sort((a, b) => b.similarity - a.similarity)

        // 최대 개수만큼 반환
        return withSimilarity.slice(0, maxTemplates).map(item => item.template)
    }

    const relatedTemplates = getRelatedTemplates()

    if (relatedTemplates.length === 0) {
        return null
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-black text-white">관련 템플릿</h2>
            </div>
            <p className="text-gray-400 text-lg">
                {currentTemplate.name}과 유사한 템플릿을 확인해보세요
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTemplates.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="group bg-card/30 backdrop-blur-xl border-2 border-white/10 hover:border-purple-500/50 transition-all overflow-hidden h-full hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                            {/* 이미지 */}
                            <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                                <Image
                                    src={template.imageUrl}
                                    alt={template.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* 호버 시 미리보기 버튼 */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex gap-3">
                                        <Button
                                            asChild
                                            size="sm"
                                            className="bg-white/20 backdrop-blur-xl border-2 border-white/40 hover:bg-white/30"
                                        >
                                            <Link href={`/templates/${template.slug}`}>
                                                <Eye className="w-4 h-4 mr-2" />
                                                상세보기
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                {/* 인기 배지 */}
                                {template.popular && (
                                    <div className="absolute top-4 right-4">
                                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 font-bold">
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            인기
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            <CardHeader>
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <CardTitle className="text-xl font-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                                        {template.name}
                                    </CardTitle>
                                </div>
                                <Badge variant="secondary" className="w-fit bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                                    {template.category}
                                </Badge>
                                <CardDescription className="line-clamp-2 text-base mt-2">
                                    {template.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-gray-400">주요 기능:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {template.features.slice(0, 3).map((feature, i) => (
                                            <Badge
                                                key={i}
                                                variant="secondary"
                                                className="bg-gray-800 text-gray-300 text-xs"
                                            >
                                                {feature}
                                            </Badge>
                                        ))}
                                        {template.features.length > 3 && (
                                            <Badge variant="secondary" className="bg-gray-800 text-gray-400 text-xs">
                                                +{template.features.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 group-hover:bg-purple-500/30 transition-all font-bold"
                                >
                                    <Link href={`/templates/${template.slug}`}>
                                        자세히 보기
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* 모든 템플릿 보기 버튼 */}
            <div className="text-center pt-6">
                <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                >
                    <Link href="/#templates">
                        모든 템플릿 보기
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
