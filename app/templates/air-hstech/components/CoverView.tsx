'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
    '/templates/air-hstech/images/hero-1.jpg',
    '/templates/air-hstech/images/hero-2.jpg',
    '/templates/air-hstech/images/hero-3.jpg',
    '/templates/air-hstech/images/hero-4.jpg',
]

interface CoverViewProps {
    onStart: () => void
}

export default function CoverView({ onStart }: CoverViewProps) {
    const [current, setCurrent] = useState(0)

    // Auto-advance every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % SLIDES.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0a0f1e]">
            {/* Sliding background images */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={SLIDES[current]}
                        alt="HS TECH"
                        fill
                        className="object-cover"
                        priority={current === 0}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                    className="relative px-12 py-10"
                >
                    {/* Corner brackets */}
                    <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00d4ff]/70" />
                    <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00d4ff]/70" />
                    <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00d4ff]/70" />
                    <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00d4ff]/70" />

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Image
                            src="/templates/air-hstech/images/logo-top.png"
                            alt="HS TECH"
                            width={160}
                            height={41}
                            className="object-contain invert opacity-90"
                            priority
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
                        As a leader in<br />DC Non-Starting
                    </h1>
                    <p className="text-base md:text-lg text-[#00d4ff]/80 font-mono tracking-[0.3em] uppercase mb-10">
                        Engine-Off Air Conditioner
                    </p>
                    <button
                        onClick={onStart}
                        className="group px-8 py-3 border border-white/70 text-white text-sm font-mono tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0f1e] transition-all duration-300"
                    >
                        VIEW CATALOG
                        <span className="ml-3 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </button>
                </motion.div>
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-[3px] transition-all duration-500 ${
                            i === current ? 'w-8 bg-[#00d4ff]' : 'w-3 bg-white/30'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
