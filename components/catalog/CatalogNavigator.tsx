"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrandColorScheme } from "@catalog-core/types";

interface CatalogNavigatorProps {
    prevPage: string | null;
    nextPage: string | null;
    currentPage: number;
    totalPages: number;
    className?: string;
    /** Brand accent color for hover effects (CSS color value) */
    accentColor?: string;
    /** Position variant */
    position?: "bottom-center" | "bottom-right";
    /** Labels */
    prevLabel?: string;
    nextLabel?: string;
    pageLabel?: string;
}

export const CatalogNavigator = ({
    prevPage,
    nextPage,
    currentPage,
    totalPages,
    className,
    accentColor,
    position = "bottom-right",
    prevLabel = "Prev",
    nextLabel = "Next",
    pageLabel = "Pages",
}: CatalogNavigatorProps) => {
    const accentStyle = accentColor
        ? { "--nav-accent": accentColor } as React.CSSProperties
        : {};

    return (
        <div
            className={cn(
                "fixed z-[100] flex flex-col pointer-events-none transition-all duration-300",
                position === "bottom-center"
                    ? "bottom-6 left-0 right-0 items-center"
                    : "bottom-6 left-0 right-0 items-center md:bottom-8 md:right-10 md:left-auto md:items-end",
                className
            )}
            style={accentStyle}
        >
            <div className="pointer-events-auto flex items-center justify-between gap-6 md:gap-16 bg-background/80 backdrop-blur-md border border-border/50 px-6 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-background/90">
                {/* Prev Button */}
                <Link
                    href={prevPage || "#"}
                    className={cn(
                        "group flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300",
                        prevPage
                            ? "text-muted-foreground hover:text-[var(--nav-accent,hsl(var(--primary)))]"
                            : "text-muted-foreground/30 cursor-not-allowed pointer-events-none"
                    )}
                    aria-disabled={!prevPage}
                    onClick={(e) => !prevPage && e.preventDefault()}
                >
                    <div className={cn(
                        "p-1.5 md:p-2 rounded-full border transition-all duration-300",
                        prevPage
                            ? "border-border group-hover:border-[var(--nav-accent,hsl(var(--primary)))] group-hover:bg-[var(--nav-accent,hsl(var(--primary)))]/10"
                            : "border-border/30"
                    )}>
                        <ChevronLeft size={18} className="md:w-5 md:h-5" />
                    </div>
                    <span className="hidden md:inline font-bold">{prevLabel}</span>
                </Link>

                {/* Page Indicator */}
                <div className="flex flex-col items-center min-w-[100px]">
                    <span className="text-xl md:text-2xl font-black font-mono text-foreground flex items-baseline gap-2">
                        {currentPage} <span className="text-muted-foreground text-sm md:text-lg font-medium">/ {totalPages}</span>
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mt-0.5">
                        {pageLabel}
                    </span>
                </div>

                {/* Next Button */}
                <Link
                    href={nextPage || "#"}
                    className={cn(
                        "group flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300",
                        nextPage
                            ? "text-muted-foreground hover:text-[var(--nav-accent,hsl(var(--primary)))]"
                            : "text-muted-foreground/30 cursor-not-allowed pointer-events-none"
                    )}
                    aria-disabled={!nextPage}
                    onClick={(e) => !nextPage && e.preventDefault()}
                >
                    <span className="hidden md:inline font-bold">{nextLabel}</span>
                    <div className={cn(
                        "p-1.5 md:p-2 rounded-full border transition-all duration-300",
                        nextPage
                            ? "border-border group-hover:border-[var(--nav-accent,hsl(var(--primary)))] group-hover:bg-[var(--nav-accent,hsl(var(--primary)))]/10"
                            : "border-border/30"
                    )}>
                        <ChevronRight size={18} className="md:w-5 md:h-5" />
                    </div>
                </Link>
            </div>
        </div>
    );
};
