'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Spotlight } from './ui/Spotlight'

export default function CoverView() {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="min-h-screen w-full dark:bg-neutral-950 bg-white antialiased dark:bg-grid-white/[0.02] bg-grid-black/[0.02] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
            {/* Interactive Mouse-Following Background */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`
                }}
            />
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.1), transparent 50%)`
                }}
            />
            <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(8, 145, 178, 0.05), transparent 60%)`
                }}
            />

            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
                <div className="flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">Since 2005</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50 mt-4 mb-8 tracking-tighter"
                    >
                        첨단 센서<br />
                        기술 솔루션.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-4 font-normal text-base dark:text-neutral-300 text-neutral-600 max-w-lg mx-auto mb-12 leading-relaxed"
                    >
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">VAISALA, SETRA, JUMO, KNICK</span> 공식 대리점.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Link
                            href="/templates/hs-tech-kr?tab=products"
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(8,145,178,0.5)]"
                        >
                            제품 보기
                        </Link>
                        <Link
                            href="/templates/hs-tech-kr?tab=business"
                            className="px-8 py-3 rounded-full border dark:border-neutral-700 border-neutral-200 dark:text-neutral-300 text-neutral-600 font-bold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                            적용 사례
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
