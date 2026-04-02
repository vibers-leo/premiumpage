'use client'

import { TemplatesList } from '@/components/TemplatesList'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-32">
            <header className="pt-24 pb-16 border-b border-border/50 px-6 sm:px-10">
                <div className="container mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Agency</span>
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4">Case Studies</div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                            MASTERPIECE <br />
                            <span className="gradient-text">COLLECTION</span>
                        </h1>
                        <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
                            수출 환경에 최적화된 하이엔드 템플릿 라인업. <br />
                            각 기업의 정체성을 담은 독보적인 디지털 결과물입니다.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <TemplatesList />
            </main>
        </div>
    )
}
