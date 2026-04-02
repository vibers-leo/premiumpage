
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getMenuItems } from "@/lib/nav-data";
import { ModeToggle } from "@/components/ui/mode-toggle";

import Image from "next/image";
import { useTheme } from "next-themes";

export const Header = () => {
    const pathname = usePathname();
    const lang = pathname.split("/")[1] || "en";
    const menuItems = getMenuItems(lang);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    // Handle sub-menu hover
    const onMouseEnter = (title: string) => {
        setHoveredMenu(title);
    };
    const onMouseLeave = () => {
        setHoveredMenu(null);
    };

    // Determine logo source and inversion state
    const logoSrc = "/images/logo-original.png";
    // Invert to white if:
    // 1. Not scrolled (Header is on top of dark hero)
    // 2. Scrolled but in dark mode
    const isInverted = !isScrolled || (mounted && resolvedTheme === 'dark');

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-[8000] transition-all duration-300 ${isScrolled
                    ? "dark:bg-black/90 bg-white/90 border-b dark:border-white/10 border-black/5 backdrop-blur-md py-4 shadow-sm"
                    : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6"
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center relative">
                    {/* Logo */}
                    <Link href="/en" className="z-50 relative flex items-center gap-2 group">
                        <div className="relative w-32 h-8 md:w-36 md:h-9 transition-all duration-300">
                            <Image
                                src={logoSrc}
                                alt="GENTOP"
                                fill
                                className={`object-contain transition-all duration-300 ${isInverted ? "brightness-0 invert" : ""}`}
                                priority
                                sizes="(max-width: 768px) 128px, 144px"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        <nav className="flex items-center gap-8">
                            {menuItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="relative group"
                                    onMouseEnter={() => onMouseEnter(item.title)}
                                    onMouseLeave={onMouseLeave}
                                >
                                    {item.link.startsWith('http') ? (
                                        <a
                                            href={item.link}
                                            className={`font-bold text-sm tracking-wide transition-colors py-2 uppercase menu-hover-effect ${isScrolled
                                                ? "dark:text-white text-black hover:text-gentop-green"
                                                : "text-white hover:text-white/80 drop-shadow-md"
                                                }`}
                                        >
                                            {item.title}
                                        </a>
                                    ) : (
                                        <Link
                                            href={item.link || "#"}
                                            className={`font-bold text-sm tracking-wide transition-colors py-2 uppercase menu-hover-effect ${isScrolled
                                                ? "dark:text-white text-black hover:text-gentop-green"
                                                : "text-white hover:text-white/80 drop-shadow-md"
                                                }`}
                                        >
                                            {item.title}
                                        </Link>
                                    )}

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {hoveredMenu === item.title && item.items.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 min-w-[220px] dark:bg-black/95 bg-white backdrop-blur-md border dark:border-white/10 border-black/10 rounded-lg shadow-xl overflow-hidden py-2"
                                            >
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.link}
                                                        className="block px-4 py-2 text-sm dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>

                        {/* Language Toggle - Hidden Temporarily */}
                        <div className="hidden items-center gap-3 mr-2 px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/10">
                            <Link
                                href={pathname.replace(`/${lang}`, "/ko")}
                                className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-md transition-all ${lang === "ko" ? "bg-gentop-green text-black" : "text-neutral-500 hover:text-white"
                                    }`}
                            >
                                KR
                            </Link>
                            <Link
                                href={pathname.replace(`/${lang}`, "/en")}
                                className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-md transition-all ${lang === "en" ? "bg-gentop-green text-black" : "text-neutral-500 hover:text-white"
                                    }`}
                            >
                                EN
                            </Link>
                        </div>
                        {/* <ModeToggle /> */}
                    </div>

                    {/* Mobile Controls */}
                    <div className="lg:hidden z-50 flex items-center gap-4">
                        {/* <ModeToggle /> */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 dark:text-white text-black hover:text-gentop-green transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[7000] dark:bg-black/95 bg-white backdrop-blur-xl pt-24 px-6 overflow-y-auto lg:hidden"
                    >
                        <div className="flex flex-col space-y-8 max-w-md mx-auto pb-10">
                            <div className="hidden items-center justify-center gap-4 py-4 border-b dark:border-white/10 border-black/10">
                                <Link
                                    href={pathname.replace(`/${lang}`, "/ko")}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all ${lang === "ko" ? "bg-gentop-green text-black shadow-lg shadow-gentop-green/20" : "bg-black/5 dark:bg-white/5 text-neutral-500"
                                        }`}
                                >
                                    KOREAN
                                </Link>
                                <Link
                                    href={pathname.replace(`/${lang}`, "/en")}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all ${lang === "en" ? "bg-gentop-green text-black shadow-lg shadow-gentop-green/20" : "bg-black/5 dark:bg-white/5 text-neutral-500"
                                        }`}
                                >
                                    ENGLISH
                                </Link>
                            </div>
                            {menuItems.map((section, idx) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="border-b dark:border-white/10 border-black/10 pb-4 last:border-0"
                                >
                                    {section.link.startsWith('http') ? (
                                        <a
                                            href={section.link}
                                            className="block text-xl font-bold text-gentop-green mb-3 uppercase"
                                        >
                                            {section.title}
                                        </a>
                                    ) : (
                                        <Link
                                            href={section.link || "#"}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block text-xl font-bold text-gentop-green mb-3 uppercase"
                                        >
                                            {section.title}
                                        </Link>
                                    )}
                                    <ul className="space-y-2 pl-4 border-l dark:border-white/10 border-black/10">
                                        {section.items.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.link}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="block dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors text-base"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
