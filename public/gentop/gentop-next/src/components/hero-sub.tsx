"use client";
import React from "react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface HeroSubProps {
    title: string;
    badge: string;
}

export const HeroSub = ({ title, badge }: HeroSubProps) => {
    return (
        <HeroHighlight containerClassName="w-full">
            <div className="relative w-full pb-8 px-4 text-center overflow-hidden" style={{ paddingTop: '140px' }}>
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20 opacity-0 dark:opacity-60 transition-opacity duration-1000"
                    fill="white"
                />

                <div className="relative z-10">
                    <div className="inline-block px-3 py-1 mb-4 rounded-full glass text-[10px] md:text-xs font-bold tracking-widest text-gentop-green uppercase border border-gentop-green/10 dark:border-none">
                        {badge}
                    </div>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tighter mb-2 drop-shadow-sm dark:drop-shadow-2xl">
                        {title}
                    </h1>
                </div>

                <BackgroundBeams className="opacity-10 dark:opacity-30" />
            </div>
        </HeroHighlight>
    );
};
