'use client'

import { useState } from 'react'
import Link from 'next/link'
import { templates, developmentPlans, maintenancePlans } from '@/lib/data'
import { formatPrice } from '@/lib/data-utils'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function QuotePage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        templateId: '',
        developmentPlanId: '',
        maintenancePlanId: '',
        companyName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        projectDetails: ''
    })

    const selectedTemplate = templates.find(t => t.id === formData.templateId)
    const selectedDevPlan = developmentPlans.find(p => p.id === formData.developmentPlanId)
    const selectedMaintPlan = maintenancePlans.find(p => p.id === formData.maintenancePlanId)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                alert(`✅ ${data.message}\n\n견적 ID: ${data.quoteId}\n\n곧 담당자가 연락드리겠습니다.`)
                // 폼 초기화
                setFormData({
                    templateId: '',
                    developmentPlanId: '',
                    maintenancePlanId: '',
                    companyName: '',
                    contactName: '',
                    contactEmail: '',
                    contactPhone: '',
                    projectDetails: ''
                })
                setStep(1)
            } else {
                alert(`❌ ${data.error}`)
            }
        } catch (error) {
            console.error('Submit error:', error)
            alert('❌ 견적 요청 제출 중 오류가 발생했습니다. 다시 시도해주세요.')
        }
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* 배경 장식 */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            {/* 헤더 */}
            <header className="glass-dark border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/" className="flex items-center gap-3 w-fit hover:opacity-80 transition">
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                PP
                            </div>
                            <span className="font-bold text-xl gradient-text">Premium Page</span>
                        </div>
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* 진행 상황 */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'bg-gray-800 text-gray-500 border border-gray-700'
                                    }`}>
                                    {s}
                                </div>
                                {s < 4 && (
                                    <div className={`flex-1 h-1 mx-2 transition-all ${step > s ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-800'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>템플릿 선택</span>
                        <span>요금제 선택</span>
                        <span>정보 입력</span>
                        <span>확인</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* 1단계: 템플릿 선택 */}
                    {step === 1 && (
                        <Card className="bg-card/50 backdrop-blur border-white/10">
                            <CardHeader>
                                <CardTitle className="text-3xl">템플릿을 선택하세요</CardTitle>
                                <CardDescription>23개의 전문 템플릿 중 선택하세요</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4 mb-8 max-h-[500px] overflow-y-auto pr-2">
                                    {templates.map((template) => (
                                        <button
                                            key={template.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, templateId: template.id })}
                                            className={`text-left p-4 rounded-lg border-2 transition-all ${formData.templateId === template.id
                                                ? 'border-purple-500 bg-purple-500/10'
                                                : 'border-gray-700 hover:border-purple-500/50 bg-gray-900/50'
                                                }`}
                                        >
                                            <h3 className="font-bold mb-1 text-white">{template.name}</h3>
                                            <Badge variant="secondary" className="mb-2 bg-gray-800 text-gray-300">
                                                {template.category}
                                            </Badge>
                                            <p className="text-xs text-gray-400">{template.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!formData.templateId}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                                >
                                    다음
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* 2단계: 요금제 선택 */}
                    {step === 2 && (
                        <Card className="bg-card/50 backdrop-blur border-white/10">
                            <CardHeader>
                                <CardTitle className="text-3xl">요금제를 선택하세요</CardTitle>
                                <CardDescription>개발비와 유지보수 요금제를 선택하세요</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-white">개발 요금제</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {developmentPlans.map((plan) => (
                                            <button
                                                key={plan.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, developmentPlanId: plan.id })}
                                                className={`text-left p-4 rounded-lg border-2 transition-all ${formData.developmentPlanId === plan.id
                                                    ? 'border-purple-500 bg-purple-500/10'
                                                    : 'border-gray-700 hover:border-purple-500/50 bg-gray-900/50'
                                                    }`}
                                            >
                                                <h4 className="font-bold mb-2 text-white">{plan.name}</h4>
                                                <p className="text-2xl font-bold mb-3 gradient-text">{formatPrice(plan.price)}</p>
                                                <ul className="space-y-1">
                                                    {plan.features.slice(0, 3).map((feature, i) => (
                                                        <li key={i} className="text-xs flex items-start gap-1 text-gray-400">
                                                            <Check className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-white">유지보수 요금제</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {maintenancePlans.map((plan) => (
                                            <button
                                                key={plan.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, maintenancePlanId: plan.id })}
                                                className={`text-left p-4 rounded-lg border-2 transition-all ${formData.maintenancePlanId === plan.id
                                                    ? 'border-purple-500 bg-purple-500/10'
                                                    : 'border-gray-700 hover:border-purple-500/50 bg-gray-900/50'
                                                    }`}
                                            >
                                                <h4 className="font-bold mb-2 text-white">{plan.name}</h4>
                                                <p className="text-2xl font-bold mb-1 gradient-text">{formatPrice(plan.price)}</p>
                                                <p className="text-sm text-gray-400 mb-3">/월</p>
                                                <ul className="space-y-1">
                                                    {plan.features.slice(0, 3).map((feature, i) => (
                                                        <li key={i} className="text-xs flex items-start gap-1 text-gray-400">
                                                            <Check className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    variant="outline"
                                    className="flex-1 border-gray-700 hover:bg-gray-800"
                                >
                                    이전
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    disabled={!formData.developmentPlanId || !formData.maintenancePlanId}
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                                >
                                    다음
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* 3단계: 연락처 정보 */}
                    {step === 3 && (
                        <Card className="bg-card/50 backdrop-blur border-white/10">
                            <CardHeader>
                                <CardTitle className="text-3xl">연락처 정보를 입력하세요</CardTitle>
                                <CardDescription>프로젝트 진행을 위한 정보를 입력해주세요</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">회사명 (선택)</label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="회사명을 입력하세요"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">담당자명 *</label>
                                    <input
                                        type="text"
                                        value={formData.contactName}
                                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="이름을 입력하세요"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">이메일 *</label>
                                    <input
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">전화번호 *</label>
                                    <input
                                        type="tel"
                                        value={formData.contactPhone}
                                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="010-1234-5678"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">프로젝트 상세 내용 *</label>
                                    <textarea
                                        value={formData.projectDetails}
                                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 text-white"
                                        placeholder="프로젝트에 대해 자세히 설명해주세요..."
                                        required
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    variant="outline"
                                    className="flex-1 border-gray-700 hover:bg-gray-800"
                                >
                                    이전
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setStep(4)}
                                    disabled={!formData.contactName || !formData.contactEmail || !formData.contactPhone || !formData.projectDetails}
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                                >
                                    다음
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* 4단계: 확인 */}
                    {step === 4 && (
                        <Card className="bg-card/50 backdrop-blur border-white/10">
                            <CardHeader>
                                <CardTitle className="text-3xl">견적 요청 확인</CardTitle>
                                <CardDescription>제출 전 내용을 확인해주세요</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <h3 className="font-bold mb-2 text-purple-400">선택한 템플릿</h3>
                                    <p className="text-lg text-white">{selectedTemplate?.name}</p>
                                    <p className="text-sm text-gray-400">{selectedTemplate?.category}</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <h3 className="font-bold mb-2 text-purple-400">개발 요금제</h3>
                                    <p className="text-lg text-white">{selectedDevPlan?.name}</p>
                                    <p className="text-2xl font-bold gradient-text">{selectedDevPlan && formatPrice(selectedDevPlan.price)}</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <h3 className="font-bold mb-2 text-purple-400">유지보수 요금제</h3>
                                    <p className="text-lg text-white">{selectedMaintPlan?.name}</p>
                                    <p className="text-2xl font-bold gradient-text">{selectedMaintPlan && formatPrice(selectedMaintPlan.price)}/월</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <h3 className="font-bold mb-2 text-purple-400">연락처 정보</h3>
                                    {formData.companyName && <p className="text-gray-300">회사: {formData.companyName}</p>}
                                    <p className="text-gray-300">담당자: {formData.contactName}</p>
                                    <p className="text-gray-300">이메일: {formData.contactEmail}</p>
                                    <p className="text-gray-300">전화: {formData.contactPhone}</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <h3 className="font-bold mb-2 text-purple-400">프로젝트 상세</h3>
                                    <p className="whitespace-pre-wrap text-gray-300">{formData.projectDetails}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    variant="outline"
                                    className="flex-1 border-gray-700 hover:bg-gray-800"
                                >
                                    이전
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                                >
                                    견적 요청 제출
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </form>
            </div>
        </div>
    )
}
