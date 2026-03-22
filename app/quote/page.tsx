'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { templates, developmentPlans, maintenancePlans } from '@/lib/data'
import { formatPrice } from '@/lib/data-utils'
import { ArrowLeft, ArrowRight, Check, Sparkles, Rocket, Mail, Phone, Building2, FileText, Loader2, Zap, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { FileUpload } from '@/components/FileUpload'

interface FormData {
    serviceType: 'pdf' | 'custom' | null
    templateId: string
    developmentPlanId: string
    maintenancePlanId: string
    companyName: string
    contactName: string
    contactEmail: string
    contactPhone: string
    projectDetails: string
    files: File[]
}

export default function QuotePageEnhanced() {
    // 0: 서비스 선택, 1: 템플릿(커스텀만), 2: 개발플랜, 3: 유지보수, 4: 정보입력
    const [step, setStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        serviceType: null,
        templateId: '',
        developmentPlanId: '',
        maintenancePlanId: '',
        companyName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        projectDetails: '',
        files: []
    })

    // 자동 저장 및 복원
    useEffect(() => {
        const savedData = localStorage.getItem('quoteFormData')
        if (savedData) {
            const parsed = JSON.parse(savedData)
            setFormData({ ...parsed, files: [] })
            setStep(parseInt(localStorage.getItem('quoteFormStep') || '0'))
        }
    }, [])

    useEffect(() => {
        const { files, ...dataToSave } = formData
        localStorage.setItem('quoteFormData', JSON.stringify(dataToSave))
        localStorage.setItem('quoteFormStep', step.toString())
    }, [formData, step])

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        if (step === 0) {
            if (formData.serviceType === 'pdf') {
                // PDF 변환 선택 시 -> 템플릿 스킵, 개발 플랜은 Lite(ID: 1) 자동 선택 후 유지보수 단계(3)로 이동
                updateFormData('templateId', '1') // Basic Viewer Template
                updateFormData('developmentPlanId', '1') // Lite Plan
                setStep(3)
            } else {
                // 커스텀 제작 선택 시 -> 템플릿 선택(1)으로 이동
                setStep(1)
            }
        } else if (step === 1) {
            // 템플릿 선택 후 -> 개발 플랜(2)으로 이동
            setStep(2)
        } else if (step === 2) {
            // 개발 플랜 선택 후 -> 유지보수(3)로 이동
            setStep(3)
        } else if (step === 3) {
            setStep(4)
        }
    }

    const prevStep = () => {
        if (step === 3 && formData.serviceType === 'pdf') {
            setStep(0) // PDF인 경우 유지보수에서 서비스 선택으로 바로 복귀
        } else {
            setStep(step - 1)
        }
    }

    const selectedTemplate = templates.find(t => t.id === formData.templateId)
    const selectedDevPlan = developmentPlans.find(p => p.id === formData.developmentPlanId)
    const selectedMaintPlan = maintenancePlans.find(p => p.id === formData.maintenancePlanId)

    // 총 단계 수 계산 (PDF: 3단계, Custom: 5단계)
    const totalSteps = formData.serviceType === 'pdf' ? 3 : 5
    const currentProgress = formData.serviceType === 'pdf'
        ? (step === 0 ? 33 : step === 3 ? 66 : 100)
        : ((step + 1) / 5) * 100

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const submitData = new FormData()
            submitData.append('templateId', formData.templateId)
            submitData.append('developmentPlanId', formData.developmentPlanId)
            submitData.append('maintenancePlanId', formData.maintenancePlanId)
            submitData.append('companyName', formData.companyName)
            submitData.append('contactName', formData.contactName)
            submitData.append('contactEmail', formData.contactEmail)
            submitData.append('contactPhone', formData.contactPhone)
            submitData.append('projectDetails', formData.projectDetails)

            formData.files.forEach((file, index) => {
                submitData.append(`file${index}`, file)
            })

            const response = await fetch('/api/quotes', {
                method: 'POST',
                body: submitData
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.removeItem('quoteFormData')
                localStorage.removeItem('quoteFormStep')
                window.location.href = `/quote/success?id=${data.quoteId}`
            } else {
                alert(`❌ ${data.error}`)
            }
        } catch (error) {
            console.error(error)
            alert('오류가 발생했습니다.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen pt-8 pb-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-10">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 mb-6 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        메인으로 돌아가기
                    </Link>
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">무료 상담 신청</h1>
                        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
                            {step === 0 ? 1 : (formData.serviceType === 'pdf' ? (step === 3 ? 2 : 3) : step + 1)} / {totalSteps}
                        </span>
                    </div>
                    <Progress value={currentProgress} className="h-1.5 bg-slate-200 dark:bg-slate-800 [&>div]:bg-violet-600" />
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* 메인 폼 영역 */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {/* Step 0: 서비스 유형 선택 */}
                            {step === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">어떤 서비스가 필요하신가요?</h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <Card
                                            className={`cursor-pointer transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md ${formData.serviceType === 'pdf' ? 'border-2 border-violet-500 ring-2 ring-violet-500/15 shadow-md' : ''}`}
                                            onClick={() => updateFormData('serviceType', 'pdf')}
                                        >
                                            <CardHeader>
                                                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center mb-4">
                                                    <FileText className="w-6 h-6 text-violet-600" />
                                                </div>
                                                <CardTitle className="text-slate-900 dark:text-white font-black">PDF to Web 변환</CardTitle>
                                                <CardDescription className="text-slate-500 dark:text-slate-400">기존 PDF 파일을 웹 뷰어로 빠르게 변환</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-500 shrink-0" /> 페이지 넘김 효과</li>
                                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-500 shrink-0" /> 모바일 최적화</li>
                                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-500 shrink-0" /> 경제적인 비용</li>
                                                </ul>
                                            </CardContent>
                                        </Card>

                                        <Card
                                            className={`cursor-pointer transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md ${formData.serviceType === 'custom' ? 'border-2 border-violet-500 ring-2 ring-violet-500/15 shadow-md' : ''}`}
                                            onClick={() => updateFormData('serviceType', 'custom')}
                                        >
                                            <CardHeader>
                                                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center mb-4">
                                                    <Sparkles className="w-6 h-6 text-violet-600" />
                                                </div>
                                                <CardTitle className="text-slate-900 dark:text-white font-black">프리미엄 커스텀 제작</CardTitle>
                                                <CardDescription className="text-slate-500 dark:text-slate-400">전문가가 제작하는 인터랙티브 전자 카탈로그</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-500 shrink-0" /> 맞춤형 디자인</li>
                                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-500 shrink-0" /> 고급 인터랙션 & 3D</li>
                                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-500 shrink-0" /> 검색/다국어 기능</li>
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 1: 템플릿 선택 (Custom Only) */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">디자인 템플릿 선택</h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {templates.filter(t => t.id !== '1').map((template) => (
                                            <Card
                                                key={template.id}
                                                className={`cursor-pointer transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md ${formData.templateId === template.id ? 'border-2 border-violet-500 ring-2 ring-violet-500/15 shadow-md' : ''}`}
                                                onClick={() => updateFormData('templateId', template.id)}
                                            >
                                                <div className="aspect-video relative bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden">
                                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                                                        {template.name} Preview
                                                    </div>
                                                </div>
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <Badge variant="outline" className="mb-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400">{template.category}</Badge>
                                                            <CardTitle className="text-lg font-black text-slate-900 dark:text-white">{template.name}</CardTitle>
                                                        </div>
                                                        {template.popular && <Badge className="bg-violet-600">Popular</Badge>}
                                                    </div>
                                                    <CardDescription className="text-slate-500 dark:text-slate-400">{template.description}</CardDescription>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: 개발 플랜 선택 (Custom Only) */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">개발 플랜 선택</h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {developmentPlans.filter(p => p.id !== '1').map((plan) => (
                                            <Card
                                                key={plan.id}
                                                className={`cursor-pointer transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md ${formData.developmentPlanId === plan.id ? 'border-2 border-violet-500 ring-2 ring-violet-500/15 shadow-md' : ''}`}
                                                onClick={() => updateFormData('developmentPlanId', plan.id)}
                                            >
                                                <CardHeader>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <CardTitle className="font-black text-slate-900 dark:text-white">{plan.name}</CardTitle>
                                                        {plan.popular && <Badge className="bg-violet-600">Popular</Badge>}
                                                    </div>
                                                    <div className="text-3xl font-black text-slate-900 dark:text-white">
                                                        {formatPrice(plan.price)}
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-2.5">
                                                        {plan.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                                <Check className="w-4 h-4 text-violet-500 shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: 유지보수 플랜 선택 (Common) */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-1">유지보수 플랜 선택</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">안정적인 서비스 운영을 위해 유지보수 플랜을 선택해주세요.</p>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {maintenancePlans.map((plan) => (
                                            <Card
                                                key={plan.id}
                                                className={`cursor-pointer transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md ${formData.maintenancePlanId === plan.id ? 'border-2 border-violet-500 ring-2 ring-violet-500/15 shadow-md' : ''}`}
                                                onClick={() => updateFormData('maintenancePlanId', plan.id)}
                                            >
                                                <CardHeader>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <CardTitle className="font-black text-slate-900 dark:text-white">{plan.name}</CardTitle>
                                                        {plan.popular && <Badge className="bg-violet-600">Best Choice</Badge>}
                                                    </div>
                                                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                                                        {formatPrice(plan.price)} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">/월</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-2.5">
                                                        {plan.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                                <Check className="w-4 h-4 text-violet-500 shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: 프로젝트 정보 입력 (Common) */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">프로젝트 정보 입력</h2>
                                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm">
                                        <CardContent className="space-y-5 pt-6">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">회사/단체명</label>
                                                    <div className="relative">
                                                        <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                                        <input
                                                            type="text"
                                                            className="imweb-input pl-10 w-full"
                                                            placeholder="회사명 입력"
                                                            value={formData.companyName}
                                                            onChange={(e) => updateFormData('companyName', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">담당자명</label>
                                                    <input
                                                        type="text"
                                                        className="imweb-input w-full"
                                                        placeholder="담당자 성함"
                                                        value={formData.contactName}
                                                        onChange={(e) => updateFormData('contactName', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">이메일</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                                        <input
                                                            type="email"
                                                            className="imweb-input pl-10 w-full"
                                                            placeholder="example@company.com"
                                                            value={formData.contactEmail}
                                                            onChange={(e) => updateFormData('contactEmail', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">연락처</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                                        <input
                                                            type="tel"
                                                            className="imweb-input pl-10 w-full"
                                                            placeholder="010-0000-0000"
                                                            value={formData.contactPhone}
                                                            onChange={(e) => updateFormData('contactPhone', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">프로젝트 상세 내용</label>
                                                <textarea
                                                    className="imweb-input w-full h-32 py-3"
                                                    placeholder={formData.serviceType === 'pdf' ? "변환할 PDF 파일에 대한 설명이나 요청사항을 적어주세요." : "제작하고자 하는 카탈로그의 목적, 타겟, 필요한 기능 등을 자유롭게 기술해주세요."}
                                                    value={formData.projectDetails}
                                                    onChange={(e) => updateFormData('projectDetails', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">참고 자료 / PDF 파일 업로드</label>
                                                <FileUpload
                                                    onFilesChange={(files) => updateFormData('files', [...formData.files, ...files])}
                                                    maxFiles={5}
                                                />
                                                {formData.files.length > 0 && (
                                                    <div className="mt-2 space-y-1">
                                                        {formData.files.map((file, idx) => (
                                                            <div key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
                                                                <FileText className="w-4 h-4 mr-2 shrink-0" />
                                                                <span className="truncate">{file.name}</span>
                                                                <button
                                                                    className="ml-auto text-red-400 hover:text-red-600 transition-colors pl-2"
                                                                    onClick={() => updateFormData('files', formData.files.filter((_, i) => i !== idx))}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 네비게이션 버튼 */}
                        <div className="flex justify-between mt-8">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                disabled={step === 0 || isSubmitting}
                                className="h-11 px-8 rounded-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-300 hover:text-violet-600 dark:hover:border-violet-600 dark:hover:text-violet-400 font-semibold transition-all dark:bg-transparent"
                            >
                                이전
                            </Button>

                            {step < 4 ? (
                                <Button
                                    onClick={nextStep}
                                    disabled={
                                        (step === 0 && !formData.serviceType) ||
                                        (step === 1 && !formData.templateId) ||
                                        (step === 2 && !formData.developmentPlanId) ||
                                        (step === 3 && !formData.maintenancePlanId)
                                    }
                                    className="h-11 px-8 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-md shadow-violet-200 dark:shadow-violet-900/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                                >
                                    다음 단계
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !formData.companyName || !formData.contactName || !formData.contactPhone}
                                    className="h-11 px-8 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-md shadow-violet-200 dark:shadow-violet-900/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            처리중...
                                        </>
                                    ) : (
                                        <>
                                            견적 요청 완료
                                            <Rocket className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* 오른쪽: 예상 견적 요약 */}
                    <aside className="lg:w-72 xl:w-80">
                        <div className="sticky top-24">
                            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                                {/* 상단 보라 강조 바 */}
                                <div className="h-1 bg-gradient-to-r from-violet-500 to-indigo-500" />
                                <CardHeader className="pb-4 pt-5">
                                    <CardTitle className="text-base font-black text-slate-900 dark:text-white">예상 견적 요약</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">SERVICE TYPE</p>
                                        <div className="font-semibold text-slate-900 dark:text-white text-sm">
                                            {formData.serviceType === 'pdf' ? 'PDF to Web' : (formData.serviceType === 'custom' ? 'Premium Custom' : '—')}
                                        </div>
                                    </div>

                                    {selectedTemplate && formData.serviceType === 'custom' && (
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">DESIGN TEMPLATE</p>
                                            <div className="font-semibold text-slate-900 dark:text-white text-sm">{selectedTemplate.name}</div>
                                        </div>
                                    )}

                                    {selectedDevPlan && (
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">DEVELOPMENT</p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">{selectedDevPlan.name}</span>
                                                <span className="font-black text-violet-600">{formatPrice(selectedDevPlan.price)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {selectedMaintPlan && (
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">MAINTENANCE</p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">{selectedMaintPlan.name}</span>
                                                <span className="font-black text-violet-600">{formatPrice(selectedMaintPlan.price)}/월</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-500 dark:text-slate-400">초기 구축비</span>
                                            <span className="text-xl font-black text-slate-900 dark:text-white">{formatPrice(selectedDevPlan?.price || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-500 dark:text-slate-400">월 유지비용</span>
                                            <span className="font-bold text-slate-700 dark:text-slate-300">{formatPrice(selectedMaintPlan?.price || 0)}/월</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
