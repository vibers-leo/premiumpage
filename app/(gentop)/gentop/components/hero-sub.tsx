"use client";
import React from "react";
import { HeroHighlight } from "@gentop/components/ui/hero-highlight";
import { Spotlight } from "@gentop/components/ui/spotlight";

interface HeroSubProps {
    title: string;
    badge: string;
}

export const HeroSub = ({ title, badge }: HeroSubProps) => {
    return (
        <HeroHighlight containerClassName="w-full">
            <div className="relative w-full pb-3 px-2 text-center overflow-hidden pt-24 md:pt-28">
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
            </div>
        </HeroHighlight>
    );
};
