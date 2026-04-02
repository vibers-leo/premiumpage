'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Template } from '@/lib/data'
import { Check, X, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface TemplateComparisonProps {
    templates: Template[]
    maxTemplates?: number
}

export function TemplateComparison({ templates: allTemplates, maxTemplates = 3 }: TemplateComparisonProps) {
    const [selectedTemplates, setSelectedTemplates] = useState<Template[]>([])

    const toggleTemplate = (template: Template) => {
        if (selectedTemplates.find(t => t.id === template.id)) {
            setSelectedTemplates(selectedTemplates.filter(t => t.id !== template.id))
        } else if (selectedTemplates.length < maxTemplates) {
            setSelectedTemplates([...selectedTemplates, template])
        }
    }

    const isSelected = (templateId: string) => {
        return selectedTemplates.some(t => t.id === templateId)
    }

    const comparisonFeatures = [
        { key: 'category', label: '카테고리' },
        { key: 'features', label: '주요 기능' },
        { key: 'responsive', label: '반응형 디자인' },
        { key: 'seo', label: 'SEO 최적화' },
        { key: 'performance', label: '빠른 로딩' },
        { key: 'accessibility', label: '접근성' },
        { key: 'ssl', label: 'SSL 인증서' },
        { key: 'support', label: '기술 지원' }
    ]

    return (
        <div className="space-y-8">
            {/* 템플릿 선택 */}
            {selectedTemplates.length < maxTemplates && (
                <Card className="bg-card/50 backdrop-blur border-white/10">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            비교할 템플릿 선택 ({selectedTemplates.length}/{maxTemplates})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {allTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => toggleTemplate(template)}
                                    disabled={!isSelected(template.id) && selectedTemplates.length >= maxTemplates}
                                    className={`relative p-3 rounded-lg border-2 transition-all text-left ${isSelected(template.id)
                                            ? 'border-purple-500 bg-purple-500/20'
                                            : 'border-gray-700 hover:border-purple-500/50 bg-gray-900/50'
                                        } ${!isSelected(template.id) && selectedTemplates.length >= maxTemplates ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSelected(template.id) && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <div className="aspect-video relative mb-2 rounded overflow-hidden bg-gray-800">
                                        <Image
                                            src={template.imageUrl}
                                            alt={template.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-1">{template.name}</h4>
                                    <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                                        {template.category}
                                    </Badge>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* 비교 테이블 */}
            {selectedTemplates.length > 0 && (
                <Card className="bg-card/50 backdrop-blur border-white/10 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl">템플릿 비교</CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTemplates([])}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <X className="w-4 h-4 mr-2" />
                            초기화
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10 bg-gray-900/50">
                                        <th className="p-4 text-left text-gray-400 font-semibold sticky left-0 bg-gray-900/50 backdrop-blur">
                                            항목
                                        </th>
                                        {selectedTemplates.map((template) => (
                                            <th key={template.id} className="p-4 text-center min-w-[250px]">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="aspect-video w-full relative rounded overflow-hidden bg-gray-800">
                                                        <Image
                                                            src={template.imageUrl}
                                                            alt={template.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <h4 className="font-bold text-white">{template.name}</h4>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => toggleTemplate(template)}
                                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((feature, idx) => (
                                        <tr key={feature.key} className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-gray-900/20' : ''}`}>
                                            <td className="p-4 font-semibold text-gray-300 sticky left-0 bg-gray-900/50 backdrop-blur">
                                                {feature.label}
                                            </td>
                                            {selectedTemplates.map((template) => (
                                                <td key={template.id} className="p-4 text-center">
                                                    {feature.key === 'category' ? (
                                                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                                            {template.category}
                                                        </Badge>
                                                    ) : feature.key === 'features' ? (
                                                        <div className="text-left space-y-1">
                                                            {template.features.slice(0, 3).map((f, i) => (
                                                                <div key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                                    <span>{f}</span>
                                                                </div>
                                                            ))}
                                                            {template.features.length > 3 && (
                                                                <p className="text-xs text-gray-500">+{template.features.length - 3}개 더</p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-4 p-6 bg-gray-900/30">
                        {selectedTemplates.map((template) => (
                            <Button
                                key={template.id}
                                asChild
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                            >
                                <Link href={`/templates/${template.slug}`}>
                                    {template.name} 선택
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        ))}
                    </CardFooter>
                </Card>
            )}

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #ec4899);
          border-radius: 4px;
        }
      `}</style>
        </div>
    )
}
