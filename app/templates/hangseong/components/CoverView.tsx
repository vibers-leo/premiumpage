
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
    {
        id: 1,
        image: '/templates/hangseong/images/slider_01.PNG',
        title: "Challenging To The Future",
        subtitle: "Conductive industry for the future.",
        align: 'center'
    },
    {
        id: 2,
        image: '/templates/hangseong/images/slider_02.PNG',
        title: "Company Specializing In Manufacturing Presses",
        subtitle: "The company will be a strong partner with a strong faith in its customers.",
        align: 'center'
    },
    {
        id: 3,
        image: '/templates/hangseong/images/slider_03.jpg',
        title: "Global Automotive Partner",
        subtitle: "Innovation, Quality, Trust since 1993.",
        align: 'center'
    },
    {
        id: 4,
        image: '/templates/hangseong/images/slider_04.jpg',
        title: "Smart Factory System",
        subtitle: "Leading the 4th Industrial Revolution with Precision Technology.",
        align: 'center'
    }
]

export default function CoverView() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 6000)
        return () => clearInterval(timer)
    }, [current])

    const nextSlide = () => {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % SLIDES.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
    }

    const goToSlide = (index: number) => {
        setDirection(index > current ? 1 : -1)
        setCurrent(index)
    }

    // Background Image Variants (Crossfade with slow zoom)
    const variants = {
        enter: {
            opacity: 0,
            scale: 1.1,
            zIndex: 1
        },
        center: {
            zIndex: 2,
            opacity: 1,
            scale: 1
        },
        exit: {
            zIndex: 0,
            opacity: 0,
            scale: 1.05
        }
    }

    // Text Content Variants
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-slate-900">
            {/* Background Slider */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 1.5, ease: "easeInOut" },
                        scale: { duration: 8, ease: "linear" }
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    {/* Fallback color if image missing */}
                    <div className="absolute inset-0 bg-slate-900" />

                    <Image
                        src={SLIDES[current].image}
                        alt={SLIDES[current].title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                <div className="max-w-7xl mx-auto w-full text-center text-white">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={current}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                            className="flex flex-col items-center"
                        >
                            <motion.h2
                                variants={textVariants}
                                className="text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 text-blue-400"
                            >
                                HANGSEONG IND.
                            </motion.h2>
                            <motion.h1
                                variants={textVariants}
                                transition={{ delay: 0.2 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight drop-shadow-2xl"
                            >
                                {SLIDES[current].title}
                            </motion.h1>
                            <motion.p
                                variants={textVariants}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-2xl text-slate-200 max-w-3xl font-light mb-10 drop-shadow-md"
                            >
                                {SLIDES[current].subtitle}
                            </motion.p>

                            <motion.div
                                variants={textVariants}
                                transition={{ delay: 0.6 }}
                                className="flex gap-4"
                            >
                                <Link href="/templates/hangseong?category=about&tab=greeting" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/50">
                                    Discover More
                                </Link>
                                <Link href="/templates/hangseong?tab=products" className="px-8 py-3 border-2 border-white/30 hover:bg-white/10 text-white font-bold rounded-full transition-all backdrop-blur-sm">
                                    Our Products
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hover:scale-110 hidden md:block"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hover:scale-110 hidden md:block"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {SLIDES.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === current
                            ? 'w-12 h-2 bg-blue-500'
                            : 'w-2 h-2 bg-white/50 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
