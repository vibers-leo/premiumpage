"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Phone, Mail, MapPin } from "lucide-react";

interface CatalogFooterProps {
    companyName: string;
    address?: string;
    phone?: string;
    email?: string;
    ceo?: string;
    regNo?: string;
    copyright?: string;
    variant?: "fixed-hover-reveal" | "inline-grid";
    accentColor?: string;
    className?: string;
}

/**
 * CatalogFooter - 2가지 변형을 지원하는 통합 푸터.
 *
 * Variants:
 * 1. fixed-hover-reveal: GENTOP 패턴 - 하단 고정, 호버 시 확장
 * 2. inline-grid: Hangseong/HS-TECH 패턴 - 페이지 하단 인라인 그리드
 */
export function CatalogFooter({
    companyName,
    address,
    phone,
    email,
    ceo,
    regNo,
    copyright,
    variant = "fixed-hover-reveal",
    accentColor,
    className,
}: CatalogFooterProps) {
    const year = new Date().getFullYear();
    const copy = copyright || `© ${year} ${companyName}. All rights reserved.`;

    if (variant === "inline-grid") {
        return (
            <InlineGridFooter
                companyName={companyName} address={address} phone={phone}
                email={email} ceo={ceo} copy={copy} className={className}
            />
        );
    }

    return (
        <HoverRevealFooter
            companyName={companyName} address={address} phone={phone}
            email={email} ceo={ceo} regNo={regNo} copy={copy} className={className}
        />
    );
}

// ─── Variant 1: Fixed Hover-Reveal ───────────────────────────────

interface FooterVariantProps {
    companyName: string;
    address?: string;
    phone?: string;
    email?: string;
    ceo?: string;
    regNo?: string;
    copy: string;
    className?: string;
}

function HoverRevealFooter({ companyName, address, phone, email, ceo, regNo, copy, className }: FooterVariantProps) {
    return (
        <footer className={cn(
            "fixed bottom-0 left-0 right-0 z-50 group",
            className
        )}>
            {/* Expanded content - shows on hover */}
            <div className="max-h-0 group-hover:max-h-[300px] overflow-hidden transition-all duration-500 ease-in-out bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                    <div>
                        <p className="font-bold text-foreground mb-1">{companyName}</p>
                        {ceo && <p>CEO: {ceo}</p>}
                        {regNo && <p>Reg. No: {regNo}</p>}
                    </div>
                    <div>
                        {address && <p>{address}</p>}
                    </div>
                    <div>
                        {phone && <p>TEL: {phone}</p>}
                        {email && <p>Email: {email}</p>}
                    </div>
                </div>
            </div>

            {/* Minimal bar - always visible */}
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 px-6 py-2 flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                    {copy}
                </span>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 cursor-pointer group-hover:text-foreground transition-colors">
                    Info ↑
                </span>
            </div>
        </footer>
    );
}

// ─── Variant 2: Inline Grid ──────────────────────────────────────

function InlineGridFooter({ companyName, address, phone, email, ceo, copy, className }: FooterVariantProps) {
    return (
        <footer className={cn(
            "relative z-10 w-full pt-16 pb-24 px-6 border-t dark:border-white/5 border-slate-200 bg-slate-50 dark:bg-slate-950/50",
            className
        )}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Company */}
                <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-foreground mb-3">{companyName}</h3>
                    {ceo && (
                        <p className="text-sm text-muted-foreground mb-1">CEO: {ceo}</p>
                    )}
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Contact</h4>
                    {phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Phone size={14} />
                            <span>{phone}</span>
                        </div>
                    )}
                    {email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail size={14} />
                            <span>{email}</span>
                        </div>
                    )}
                </div>

                {/* Address */}
                {address && (
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Location</h4>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin size={14} className="mt-0.5 shrink-0" />
                            <span>{address}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t dark:border-white/5 border-slate-200">
                <p className="text-xs text-muted-foreground">{copy}</p>
            </div>
        </footer>
    );
}
