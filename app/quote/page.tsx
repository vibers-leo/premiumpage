'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { templates, developmentPlans, maintenancePlans, proposalPlans } from '@/lib/data'
import { formatPrice } from '@/lib/data-utils'
import { ArrowLeft, ArrowRight, Check, Sparkles, Rocket, Mail, Phone, Building2, FileText, Loader2, Zap, Layers, Presentation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { FileUpload } from '@/components/FileUpload'

interface FormData {
    serviceType: 'pdf' | 'custom' | 'proposal' | null
    templateId: string
    developmentPlanId: string
    maintenancePlanId: string
    companyName: string
    contactName: string
    contactEmail: string
    contactPhone: string
    proposalPlanId: string
    projectDetails: string
    files: File[]
}

export default function QuotePageEnhanced() {
    // 0: 서비스 선택, 1: 템플릿(커스텀만), 2: 개발플랜, 3: 유지보수, 4: 정보입력
    const [step, setStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState<FormData>({
        serviceType: null,
        templateId: '',
        developmentPlanId: '',
        maintenancePlanId: '',
        proposalPlanId: '',
        companyName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        projectDetails: '',
        files: []
    })

    // URL 쿼리 파라미터로 플랜 자동 선택
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const service = params.get('service')
        const planId = params.get('plan')

        // PPT 제안서 서비스로 진입
        if (service === 'proposal' && planId) {
            const plan = proposalPlans.find(p => p.id === planId)
            if (plan) {
                setFormData(prev => ({
                    ...prev,
                    serviceType: 'proposal',
                    proposalPlanId: planId,
                }))
                setStep(4) // 바로 정보 입력으로
                return
            }
        }

        if (planId) {
            const plan = developmentPlans.find(p => p.id === planId)
            if (plan) {
                if (planId === '1') {
                    // Lite = PDF 변환
                    setFormData(prev => ({
                        ...prev,
                        serviceType: 'pdf',
                        templateId: '1',
                        developmentPlanId: '1',
                    }))
                    setStep(3) // 유지보수 선택으로 바로 이동
                } else {
                    // Standard/Master = 커스텀 제작
                    setFormData(prev => ({
                        ...prev,
                        serviceType: 'custom',
                        developmentPlanId: planId,
                    }))
                    setStep(1) // 템플릿 선택으로 이동
                }
            }
            return // URL 파라미터가 있으면 로컬 스토리지 복원 스킵
        }

        // 자동 저장 복원
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
                updateFormData('templateId', '1')
                updateFormData('developmentPlanId', '1')
                setStep(3)
            } else if (formData.serviceType === 'proposal') {
                // PPT 제안서 -> 플랜 선택(step 5)으로 이동
                setStep(5)
            } else {
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
        } else if (step === 5) {
            // PPT 플랜 선택 후 → 정보 입력(4)으로 이동
            setStep(4)
        }
    }

    const prevStep = () => {
        if (step === 3 && formData.serviceType === 'pdf') {
            setStep(0)
        } else if (step === 5 && formData.serviceType === 'proposal') {
            setStep(0)
        } else if (step === 4 && formData.serviceType === 'proposal') {
            setStep(5)
        } else {
            setStep(step - 1)
        }
    }

    const selectedTemplate = templates.find(t => t.id === formData.templateId)
    const selectedDevPlan = developmentPlans.find(p => p.id === formData.developmentPlanId)
    const selectedMaintPlan = maintenancePlans.find(p => p.id === formData.maintenancePlanId)

    // 총 단계 수 계산 (PDF: 3단계, Custom: 5단계, Proposal: 3단계)
    const totalSteps = formData.serviceType === 'pdf' ? 3 : formData.serviceType === 'proposal' ? 3 : 5
    const currentProgress = formData.serviceType === 'pdf'
        ? (step === 0 ? 33 : step === 3 ? 66 : 100)
        : formData.serviceType === 'proposal'
        ? (step === 0 ? 33 : step === 5 ? 66 : 100)
        : ((step + 1) / 5) * 100

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}
        if (!formData.companyName.trim()) newErrors.companyName = '회사명을 입력해주세요.'
        if (!formData.contactName.trim()) newErrors.contactName = '담당자명을 입력해주세요.'
        if (!formData.contactPhone.trim()) newErrors.contactPhone = '연락처를 입력해주세요.'
        if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
            newErrors.contactEmail = '올바른 이메일 형식을 입력해주세요.'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // 예상 납기일 계산
    const getEstimatedDelivery = (): string => {
        if (formData.serviceType === 'pdf') return '약 1주일'
        if (formData.serviceType === 'proposal') {
            if (formData.proposalPlanId === 'p1') return '1~2주'
            if (formData.proposalPlanId === 'p2') return '2~3주'
            if (formData.proposalPlanId === 'p3') return '2~4주'
            return '1~4주'
        }
        if (formData.developmentPlanId === '2') return '2~4주'
        if (formData.developmentPlanId === '3') return '4~8주'
        return '-'
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsSubmitting(true)

        try {
            const submitData = new FormData()
            submitData.append('templateId', formData.templateId)
            submitData.append('developmentPlanId', formData.developmentPlanId)
            submitData.append('maintenancePlanId', formData.maintenancePlanId)
            submitData.append('proposalPlanId', formData.proposalPlanId)
            submitData.append('serviceType', formData.serviceType || '')
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
        <div className="min-h-screen pt-20 pb-12 bg-background transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        메인으로 돌아가기
                    </Link>
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">견적 요청하기</h1>
                        <span className="text-sm font-medium text-muted-foreground">
                            Step {step === 0 ? 1 : (formData.serviceType === 'pdf' ? (step === 3 ? 2 : 3) : step + 1)} of {totalSteps}
                        </span>
                    </div>
                    <Progress value={currentProgress} className="h-2" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
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
                                    <h2 className="text-2xl font-bold mb-4">어떤 서비스가 필요하신가요?</h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <Card
                                            className={`cursor-pointer transition-all hover:border-blue-500 glass-card ${formData.serviceType === 'pdf' ? 'border-2 border-blue-500 ring-2 ring-blue-500/20' : ''}`}
                                            onClick={() => updateFormData('serviceType', 'pdf')}
                                        >
                                            <CardHeader>
                                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                                                    <FileText className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <CardTitle>PDF to Web 변환</CardTitle>
                                                <CardDescription className="text-muted-foreground">기존 PDF 파일을 웹 뷰어로 빠르게 변환</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-blue-500" /> 페이지 넘김 효과</li>
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-blue-500" /> 모바일 최적화</li>
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-blue-500" /> 경제적인 비용</li>
                                                </ul>
                                            </CardContent>
                                        </Card>

                                        <Card
                                            className={`cursor-pointer transition-all hover:border-purple-500 glass-card ${formData.serviceType === 'custom' ? 'border-2 border-purple-500 ring-2 ring-purple-500/20' : ''}`}
                                            onClick={() => updateFormData('serviceType', 'custom')}
                                        >
                                            <CardHeader>
                                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                                                    <Sparkles className="w-6 h-6 text-purple-500" />
                                                </div>
                                                <CardTitle>프리미엄 커스텀 제작</CardTitle>
                                                <CardDescription className="text-muted-foreground">전문가가 제작하는 인터랙티브 전자 카탈로그</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-purple-500" /> 맞춤형 디자인</li>
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-purple-500" /> 고급 인터랙션 & 3D</li>
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-purple-500" /> 찾기/다국어 기능</li>
                                                </ul>
                                            </CardContent>
                                        </Card>

                                        <Card
                                            className={`cursor-pointer transition-all hover:border-amber-500 glass-card ${formData.serviceType === 'proposal' ? 'border-2 border-amber-500 ring-2 ring-amber-500/20' : ''}`}
                                            onClick={() => updateFormData('serviceType', 'proposal')}
                                        >
                                            <CardHeader>
                                                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                                                    <Presentation className="w-6 h-6 text-amber-500" />
                                                </div>
                                                <CardTitle>PPT 제안서 제작</CardTitle>
                                                <CardDescription className="text-muted-foreground">IR 덱, 회사소개서, 입찰제안서 전문 디자인</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-amber-500" /> 전문 디자인 & 레이아웃</li>
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-amber-500" /> RFP 분석 & 전략 설계</li>
                                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-amber-500" /> PPT + PDF 납품</li>
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
                                    <h2 className="text-2xl font-bold mb-4">디자인 템플릿 선택</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {templates.filter(t => t.id !== '1').map((template) => ( // Basic Viewer 제외
                                            <Card
                                                key={template.id}
                                                className={`cursor-pointer transition-all hover:border-purple-500 ${formData.templateId === template.id ? 'border-2 border-purple-500 ring-2 ring-purple-500/20' : ''}`}
                                                onClick={() => updateFormData('templateId', template.id)}
                                            >
                                                <div className="aspect-video relative bg-gray-100 rounded-t-xl overflow-hidden">
                                                    {/* 이미지 플레이스홀더 */}
                                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                        {template.name} Preview
                                                    </div>
                                                </div>
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <Badge variant="outline" className="mb-2">{template.category}</Badge>
                                                            <CardTitle className="text-lg">{template.name}</CardTitle>
                                                        </div>
                                                        {template.popular && <Badge className="bg-purple-500">Popular</Badge>}
                                                    </div>
                                                    <CardDescription>{template.description}</CardDescription>
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
                                    <h2 className="text-2xl font-bold mb-4">개발 플랜 선택</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {developmentPlans.filter(p => p.id !== '1').map((plan) => ( // Lite 제외
                                            <Card
                                                key={plan.id}
                                                className={`cursor-pointer transition-all hover:border-purple-500 ${formData.developmentPlanId === plan.id ? 'border-2 border-purple-500 ring-2 ring-purple-500/20' : ''}`}
                                                onClick={() => updateFormData('developmentPlanId', plan.id)}
                                            >
                                                <CardHeader>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <CardTitle>{plan.name}</CardTitle>
                                                        {plan.popular && <Badge className="bg-purple-500">Popular</Badge>}
                                                    </div>
                                                    <div className="text-3xl font-bold">
                                                        {formatPrice(plan.price)}
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-2">
                                                        {plan.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-center text-sm text-gray-600">
                                                                <Check className="w-4 h-4 mr-2 text-green-500" />
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
                                    <h2 className="text-2xl font-bold mb-4">유지보수 플랜 선택</h2>
                                    <p className="text-gray-600 mb-6">안정적인 서비스 운영을 위해 유지보수 플랜을 선택해주세요.</p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {maintenancePlans.map((plan) => (
                                            <Card
                                                key={plan.id}
                                                className={`cursor-pointer transition-all hover:border-green-500 ${formData.maintenancePlanId === plan.id ? 'border-2 border-green-500 ring-2 ring-green-500/20' : ''}`}
                                                onClick={() => updateFormData('maintenancePlanId', plan.id)}
                                            >
                                                <CardHeader>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <CardTitle>{plan.name}</CardTitle>
                                                        {plan.popular && <Badge className="bg-green-500">Best Choice</Badge>}
                                                    </div>
                                                    <div className="text-2xl font-bold">
                                                        {formatPrice(plan.price)} <span className="text-sm font-normal text-gray-500">/월</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-2">
                                                        {plan.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-center text-sm text-gray-600">
                                                                <Check className="w-4 h-4 mr-2 text-green-500" />
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

                            {/* Step 5: PPT 제안서 플랜 선택 (Proposal Only) */}
                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold mb-4">제안서 유형 선택</h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {proposalPlans.map((plan) => (
                                            <Card
                                                key={plan.id}
                                                className={`cursor-pointer transition-all hover:border-amber-500 ${formData.proposalPlanId === plan.id ? 'border-2 border-amber-500 ring-2 ring-amber-500/20' : ''}`}
                                                onClick={() => updateFormData('proposalPlanId', plan.id)}
                                            >
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                                                        {plan.popular && <Badge className="bg-amber-500 text-white">인기</Badge>}
                                                    </div>
                                                    <div className="text-2xl font-black mt-2">{plan.priceRange}</div>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                                        {plan.features.slice(0, 4).map((feature, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                                <span>{feature}</span>
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
                                    <h2 className="text-2xl font-bold mb-4">프로젝트 정보 입력</h2>
                                    <Card>
                                        <CardContent className="space-y-4 pt-6">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">회사/단체명 <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            className={`imweb-input pl-10 w-full ${errors.companyName ? 'border-red-500' : ''}`}
                                                            placeholder="회사명 입력"
                                                            value={formData.companyName}
                                                            onChange={(e) => { updateFormData('companyName', e.target.value); setErrors(prev => ({ ...prev, companyName: '' })) }}
                                                        />
                                                    </div>
                                                    {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">담당자명 <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        className={`imweb-input w-full ${errors.contactName ? 'border-red-500' : ''}`}
                                                        placeholder="담당자 성함"
                                                        value={formData.contactName}
                                                        onChange={(e) => { updateFormData('contactName', e.target.value); setErrors(prev => ({ ...prev, contactName: '' })) }}
                                                    />
                                                    {errors.contactName && <p className="text-red-500 text-xs">{errors.contactName}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">이메일</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="email"
                                                            className={`imweb-input pl-10 w-full ${errors.contactEmail ? 'border-red-500' : ''}`}
                                                            placeholder="example@company.com"
                                                            value={formData.contactEmail}
                                                            onChange={(e) => { updateFormData('contactEmail', e.target.value); setErrors(prev => ({ ...prev, contactEmail: '' })) }}
                                                        />
                                                    </div>
                                                    {errors.contactEmail && <p className="text-red-500 text-xs">{errors.contactEmail}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">연락처 <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="tel"
                                                            className={`imweb-input pl-10 w-full ${errors.contactPhone ? 'border-red-500' : ''}`}
                                                            placeholder="010-0000-0000"
                                                            value={formData.contactPhone}
                                                            onChange={(e) => { updateFormData('contactPhone', e.target.value); setErrors(prev => ({ ...prev, contactPhone: '' })) }}
                                                        />
                                                    </div>
                                                    {errors.contactPhone && <p className="text-red-500 text-xs">{errors.contactPhone}</p>}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">프로젝트 상세 내용</label>
                                                <textarea
                                                    className="imweb-input w-full h-32 py-2"
                                                    placeholder={formData.serviceType === 'pdf' ? "변환할 PDF 파일에 대한 설명이나 요청사항을 적어주세요." : "제작하고자 하는 카탈로그의 목적, 타겟, 필요한 기능 등을 자유롭게 기술해주세요."}
                                                    value={formData.projectDetails}
                                                    onChange={(e) => updateFormData('projectDetails', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">참고 자료 / PDF 파일 올리기</label>
                                                <FileUpload
                                                    onFilesChange={(files) => updateFormData('files', [...formData.files, ...files])}
                                                    maxFiles={5}
                                                />
                                                {formData.files.length > 0 && (
                                                    <div className="mt-2 space-y-1">
                                                        {formData.files.map((file, idx) => (
                                                            <div key={idx} className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                                                <FileText className="w-4 h-4 mr-2" />
                                                                {file.name}
                                                                <button
                                                                    className="ml-auto text-red-500"
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
                                className="px-8"
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
                                    className="px-8 bg-blue-600 hover:bg-blue-700"
                                >
                                    다음 단계
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !formData.companyName || !formData.contactName || !formData.contactPhone}
                                    className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            처리중...
                                        </>
                                    ) : (
                                        <>
                                            견적 요청 완료했어요                                             <Rocket className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* 오른쪽: 예상 견적 요약 */}
                    <aside className="lg:w-80">
                        <div className="sticky top-24">
                            <Card className="glass-card shadow-xl border-t-4 border-t-blue-600 overflow-hidden">
                                <CardHeader className="bg-muted/50 pb-4">
                                    <CardTitle className="text-lg">예상 견적 요약</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Service Type</p>
                                        <div className="font-semibold text-foreground">
                                            {formData.serviceType === 'pdf' ? 'PDF to Web' : (formData.serviceType === 'custom' ? 'Premium Custom' : '선택 대기중')}
                                        </div>
                                    </div>

                                    {selectedTemplate && formData.serviceType === 'custom' && (
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Design Template</p>
                                            <div className="font-medium text-foreground">{selectedTemplate.name}</div>
                                        </div>
                                    )}

                                    {selectedDevPlan && (
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Development</p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{selectedDevPlan.name}</span>
                                                <span className="font-bold text-blue-500">{formatPrice(selectedDevPlan.price)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {selectedMaintPlan && (
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Maintenance</p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{selectedMaintPlan.name}</span>
                                                <span className="font-bold text-green-500">{formatPrice(selectedMaintPlan.price)}/월</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="border-t border-muted/50 pt-4 mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-muted-foreground">초기 구축비</span>
                                            <span className="text-xl font-bold">{formatPrice(selectedDevPlan?.price || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span className="text-muted-foreground">월 유지비용</span>
                                            <span className="font-medium">{formatPrice(selectedMaintPlan?.price || 0)}/월</span>
                                        </div>
                                        {(formData.serviceType || selectedDevPlan) && (
                                            <div className="flex justify-between items-center text-sm pt-2 border-t border-muted/30">
                                                <span className="text-muted-foreground">예상 납기</span>
                                                <span className="font-medium text-primary">{getEstimatedDelivery()}</span>
                                            </div>
                                        )}
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
