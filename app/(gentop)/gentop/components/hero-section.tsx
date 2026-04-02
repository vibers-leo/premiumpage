
"use client";
import React from "react";
import { getTranslation } from "@gentop/lib/translations";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
export function HeroSection({ lang, nextPage }: { lang: string; nextPage: string | null }) {
    const t = getTranslation(lang);

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image with Cinematic Effects */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home/hero-bg.png"
                    alt="GENTOP Hero Background"
                    fill
                    className="object-cover opacity-70 scale-105"
                    priority
                />
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />

                {/* Animated Light Streaks Overlays (CSS based) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(173,232,19,0.15),transparent_50%)] z-20" />
            </div>

            <div className="container relative z-30 mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-block px-5 py-2 mb-10 rounded-full bg-gentop-green/10 border border-gentop-green/30 backdrop-blur-md shadow-[0_0_20px_rgba(173,232,19,0.1)]">
                        <span className="text-gentop-green font-bold text-xs tracking-[0.5em] uppercase">
                            GENERATION TOP LEADER
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-10 leading-[0.9] filter drop-shadow-2xl">
                        {t.hero.title.split(' ').map((word, i) => (
                            <span key={i} className={word.toLowerCase() === 'solution' || word === 'Provider' ? 'text-gentop-green block md:inline' : 'block md:inline'}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>

                    <div className="max-w-3xl mx-auto mb-16 px-4">
                        <motion.p
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl md:text-2xl font-black text-white/95 mb-6 tracking-tight leading-tight"
                        >
                            {t.hero.subtitle}
                        </motion.p>
                        <p className="text-base md:text-lg text-white/60 font-medium max-w-xl mx-auto leading-relaxed">
                            {t.hero.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href={`/${lang}/company/introduction`}
                            className="group relative w-full sm:w-auto px-12 py-5 bg-gentop-green text-black font-black text-base rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(173,232,19,0.6)] active:scale-95"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {t.hero.cta_company}
                                <div className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                            </span>
                        </Link>

                        <Link
                            href={`/${lang}/business`}
                            className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/20 text-white font-black text-base rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all active:scale-95 text-center"
                        >
                            {t.hero.cta_business}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="opacity-50"
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center p-1">
                        <motion.div
                            className="w-1 h-2 rounded-full bg-white"
                            animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
                <p className="text-xs text-white/50 font-medium tracking-wide">
                    {t.hero.scroll_hint}
                </p>
            </div>

            {/* Bottom Gradient Fade to Content */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
        </section>
    );
}
