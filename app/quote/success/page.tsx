'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Mail, Phone, Home, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

function QuoteSuccessContent() {
    const searchParams = useSearchParams()
    const quoteId = searchParams.get('id')
    const [confetti, setConfetti] = useState(true)

    useEffect(() => {
        // 3초 후 confetti 효과 종료
        const timer = setTimeout(() => setConfetti(false), 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
            {/* 배경 효과 */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
            </div>

            {/* Confetti 효과 */}
            {confetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                                y: -20,
                                rotate: 0,
                                opacity: 1
                            }}
                            animate={{
                                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                                rotate: Math.random() * 720,
                                opacity: 0
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                delay: Math.random() * 0.5,
                                ease: "easeOut"
                            }}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)]
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="container mx-auto px-4 py-12 max-w-3xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="bg-card/50 backdrop-blur-xl border-white/10 overflow-hidden">
                        {/* 성공 아이콘 */}
                        <div className="relative pt-12 pb-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="flex justify-center"
                            >
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center animate-neon-glow">
                                        <CheckCircle2 className="w-20 h-20 text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 blur-2xl opacity-50 animate-pulse" />
                                </div>
                            </motion.div>
                        </div>

                        <CardHeader className="text-center pb-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <CardTitle className="text-5xl font-black mb-4 gradient-text">
                                    견적 요청 완료!
                                </CardTitle>
                                <CardDescription className="text-xl text-gray-300">
                                    견적 요청이 성공적으로 접수되었습니다
                                </CardDescription>
                            </motion.div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/30"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Sparkles className="w-6 h-6 text-purple-400" />
                                    <h3 className="text-xl font-bold text-white">견적 요청 번호</h3>
                                </div>
                                <p className="text-4xl font-black gradient-text font-mono">
                                    #{quoteId || 'LOADING...'}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-4"
                            >
                                <div className="p-5 bg-gray-900/50 rounded-xl border border-gray-700">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">이메일 확인</h4>
                                            <p className="text-sm text-gray-400">
                                                입력하신 이메일로 견적 요청 확인 메일을 발송했습니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray-900/50 rounded-xl border border-gray-700">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-pink-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">담당자 연락</h4>
                                            <p className="text-sm text-gray-400">
                                                영업일 기준 24시간 내에 담당자가 연락드리겠습니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray-900/50 rounded-xl border border-gray-700">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">다음 단계</h4>
                                            <p className="text-sm text-gray-400">
                                                상담 후 맞춤 견적서를 제공해드리며, 계약 진행 시 프로젝트를 시작합니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </CardContent>

                        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Button
                                asChild
                                variant="outline"
                                className="flex-1 border-gray-700 hover:bg-gray-800 py-6"
                            >
                                <Link href="/">
                                    <Home className="w-5 h-5 mr-2" />
                                    홈으로
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90 py-6 font-bold"
                            >
                                <Link href="/dashboard">
                                    대시보드
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* 추가 정보 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                >
                    <p className="text-gray-400 text-sm">
                        문의사항이 있으시면{' '}
                        <a href="mailto:info@premiumpage.com" className="text-purple-400 hover:text-purple-300 underline">
                            info@premiumpage.com
                        </a>
                        {' '}또는{' '}
                        <a href="tel:02-1234-5678" className="text-purple-400 hover:text-purple-300 underline">
                            02-1234-5678
                        </a>
                        {' '}로 연락주세요.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default function QuoteSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <QuoteSuccessContent />
        </Suspense>
    )
}
