
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getTranslation } from "@gentop/lib/translations";
import { getMenuItems } from "@gentop/lib/nav-data";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const Footer = () => {
    const pathname = usePathname();
    const lang = pathname.split("/")[1] || "en";
    const t = getTranslation(lang);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer className="hidden md:block group fixed bottom-0 left-0 w-full z-50 transition-all duration-500 hover:bg-white dark:hover:bg-black hover:shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
            {/* Base Minimal Footer (Always Visible) */}
            <div className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-black/5 dark:border-white/10 py-3 px-6 flex justify-between items-center transition-colors duration-300">
                <p className="text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    COPYRIGHT(C)2019 GENTOP Co., Ltd. All Rights Reserved.
                </p>
                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] uppercase font-bold tracking-widest cursor-help">Info</span>
                </div>
            </div>

            {/* Expanded Content (Visible on Hover) */}
            <div className="max-h-0 overflow-hidden group-hover:max-h-[300px] transition-all duration-500 ease-in-out bg-white dark:bg-black w-full">
                <div className="w-full px-8 py-8 border-t border-black/5 dark:border-white/5">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-gentop-green font-bold text-sm">GENTOP Co., Ltd.</span>
                        </div>
                        <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 space-y-2 font-light">
                            <p className="whitespace-nowrap">{t.footer.address}</p>
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
                                <span>CEO: {t.footer.ceo}</span>
                                <span>Reg No: {t.footer.regNo}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-neutral-500 dark:text-neutral-400">
                                <span className="font-mono">T. {t.footer.tel}</span>
                                <span className="font-mono">E. {t.footer.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
