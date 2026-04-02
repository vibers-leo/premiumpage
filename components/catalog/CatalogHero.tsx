"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HeroVariant } from "@catalog-core/types";

interface CatalogHeroProps {
    variant: HeroVariant;
    title: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    backgroundImage?: string;
    cta?: { label: string; href: string; primary?: boolean }[];
    accentColor?: string;
    className?: string;
    children?: React.ReactNode;
}

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

/**
 * CatalogHero - 4가지 변형을 지원하는 통합 히어로 섹션.
 *
 * Variants:
 * 1. fullscreen-image: 풀스크린 이미지 + 오버레이 (GENTOP 패턴)
 * 2. split-layout: 좌 텍스트 / 우 이미지
 * 3. video-background: 비디오 배경 (placeholder)
 * 4. minimal: 텍스트 중심, 그라디언트 배경 (HS-TECH 패턴)
 */
export function CatalogHero({
    variant,
    title,
    subtitle,
    description,
    badge,
    backgroundImage,
    cta = [],
    accentColor,
    className,
    children,
}: CatalogHeroProps) {
    const accentStyle = accentColor
        ? { '--hero-accent': accentColor } as React.CSSProperties
        : {};

    switch (variant) {
        case 'fullscreen-image':
            return (
                <FullscreenImageHero
                    title={title} subtitle={subtitle} description={description}
                    badge={badge} backgroundImage={backgroundImage} cta={cta}
                    accentStyle={accentStyle} className={className}
                >{children}</FullscreenImageHero>
            );
        case 'split-layout':
            return (
                <SplitLayoutHero
                    title={title} subtitle={subtitle} description={description}
                    badge={badge} backgroundImage={backgroundImage} cta={cta}
                    accentStyle={accentStyle} className={className}
                >{children}</SplitLayoutHero>
            );
        case 'video-background':
            return (
                <VideoBackgroundHero
                    title={title} subtitle={subtitle} description={description}
                    badge={badge} backgroundImage={backgroundImage} cta={cta}
                    accentStyle={accentStyle} className={className}
                >{children}</VideoBackgroundHero>
            );
        case 'minimal':
        default:
            return (
                <MinimalHero
                    title={title} subtitle={subtitle} description={description}
                    badge={badge} cta={cta}
                    accentStyle={accentStyle} className={className}
                >{children}</MinimalHero>
            );
    }
}

// ─── Variant 1: Fullscreen Image ─────────────────────────────────

interface VariantProps {
    title: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    backgroundImage?: string;
    cta: { label: string; href: string; primary?: boolean }[];
    accentStyle: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

function FullscreenImageHero({ title, subtitle, description, badge, backgroundImage, cta, accentStyle, className, children }: VariantProps) {
    return (
        <section
            className={cn("relative w-full h-screen flex items-center justify-center overflow-hidden", className)}
            style={accentStyle}
        >
            {/* Background */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <img src={backgroundImage} alt="" className="w-full h-full object-cover scale-105 opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
                </div>
            )}
            {!backgroundImage && (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-muted" />
            )}

            {/* Content */}
            <div className="relative z-30 text-center max-w-4xl mx-auto px-6">
                {badge && (
                    <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0 }}>
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full glass text-xs font-bold tracking-widest text-[var(--hero-accent,hsl(var(--primary)))] uppercase border border-[var(--hero-accent,hsl(var(--primary)))]/20">
                            {badge}
                        </span>
                    </motion.div>
                )}

                <motion.h1
                    {...fadeUp}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p {...fadeUp} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 font-bold mb-4">
                        {subtitle}
                    </motion.p>
                )}

                {description && (
                    <motion.p {...fadeUp} transition={{ duration: 0.8, delay: 0.6 }} className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {description}
                    </motion.p>
                )}

                {cta.length > 0 && (
                    <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.8 }} className="flex items-center justify-center gap-4 flex-wrap">
                        {cta.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={cn(
                                    "px-8 py-3 rounded-full font-bold text-sm transition-all duration-300",
                                    item.primary
                                        ? "bg-[var(--hero-accent,hsl(var(--primary)))] text-black hover:opacity-90"
                                        : "border border-white/20 text-white hover:bg-white/10"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
}

// ─── Variant 2: Split Layout ─────────────────────────────────────

function SplitLayoutHero({ title, subtitle, description, badge, backgroundImage, cta, accentStyle, className, children }: VariantProps) {
    return (
        <section
            className={cn("relative w-full min-h-screen flex items-center overflow-hidden bg-background", className)}
            style={accentStyle}
        >
            <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-32">
                {/* Left: Text */}
                <div>
                    {badge && (
                        <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0 }}>
                            <span className="inline-block px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-widest text-[var(--hero-accent,hsl(var(--primary)))] uppercase bg-[var(--hero-accent,hsl(var(--primary)))]/10">
                                {badge}
                            </span>
                        </motion.div>
                    )}

                    <motion.h1 {...fadeUp} transition={{ duration: 1, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-6">
                        {title}
                    </motion.h1>

                    {subtitle && (
                        <motion.p {...fadeUp} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl text-muted-foreground font-medium mb-4">
                            {subtitle}
                        </motion.p>
                    )}

                    {description && (
                        <motion.p {...fadeUp} transition={{ duration: 0.8, delay: 0.6 }} className="text-base text-muted-foreground/80 mb-10 leading-relaxed max-w-lg">
                            {description}
                        </motion.p>
                    )}

                    {cta.length > 0 && (
                        <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.8 }} className="flex items-center gap-4 flex-wrap">
                            {cta.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className={cn(
                                        "px-8 py-3 rounded-full font-bold text-sm transition-all duration-300",
                                        item.primary
                                            ? "bg-[var(--hero-accent,hsl(var(--primary)))] text-black hover:opacity-90"
                                            : "border border-border text-foreground hover:bg-muted"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                    {children}
                </div>

                {/* Right: Image */}
                {backgroundImage && (
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img src={backgroundImage} alt="" className="w-full h-auto object-cover" />
                    </motion.div>
                )}
            </div>
        </section>
    );
}

// ─── Variant 3: Video Background ─────────────────────────────────

function VideoBackgroundHero({ title, subtitle, description, badge, backgroundImage, cta, accentStyle, className, children }: VariantProps) {
    return (
        <section
            className={cn("relative w-full h-screen flex items-center justify-center overflow-hidden", className)}
            style={accentStyle}
        >
            {/* Video/Image Background */}
            <div className="absolute inset-0 z-0">
                {backgroundImage && (
                    <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-30 text-center max-w-3xl mx-auto px-6">
                {badge && (
                    <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0 }}>
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-widest text-white/90 uppercase border border-white/20 backdrop-blur-sm">
                            {badge}
                        </span>
                    </motion.div>
                )}

                <motion.h1 {...fadeUp} transition={{ duration: 1, delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p {...fadeUp} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 mb-10">
                        {subtitle}
                    </motion.p>
                )}

                {cta.length > 0 && (
                    <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.6 }} className="flex items-center justify-center gap-4">
                        {cta.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={cn(
                                    "px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 backdrop-blur-sm",
                                    item.primary
                                        ? "bg-white text-black hover:bg-white/90"
                                        : "border border-white/30 text-white hover:bg-white/10"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
}

// ─── Variant 4: Minimal ──────────────────────────────────────────

function MinimalHero({ title, subtitle, description, badge, cta, accentStyle, className, children }: Omit<VariantProps, 'backgroundImage'>) {
    return (
        <section
            className={cn("relative w-full min-h-[80vh] flex items-center justify-center bg-background", className)}
            style={accentStyle}
        >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--hero-accent,hsl(var(--primary)))]/5 via-transparent to-[var(--hero-accent,hsl(var(--primary)))]/3" />

            <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-32">
                {badge && (
                    <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0 }}>
                        <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                            {badge}
                        </span>
                    </motion.div>
                )}

                <motion.h1 {...fadeUp} transition={{ duration: 1, delay: 0.2 }} className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-6">
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p {...fadeUp} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-[var(--hero-accent,hsl(var(--primary)))] font-bold mb-4">
                        {subtitle}
                    </motion.p>
                )}

                {description && (
                    <motion.p {...fadeUp} transition={{ duration: 0.8, delay: 0.6 }} className="text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
                        {description}
                    </motion.p>
                )}

                {cta.length > 0 && (
                    <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.8 }} className="flex items-center justify-center gap-4">
                        {cta.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={cn(
                                    "px-8 py-3 rounded-full font-bold text-sm transition-all duration-300",
                                    item.primary
                                        ? "bg-[var(--hero-accent,hsl(var(--primary)))] text-white hover:opacity-90"
                                        : "border border-border text-foreground hover:bg-muted"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
}
