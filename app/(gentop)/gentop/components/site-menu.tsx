
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { getMenuItems } from "@gentop/lib/nav-data";

export const SiteMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams();
    const lang = (params?.lang as string) || 'ko';
    const menuItems = getMenuItems(lang);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <>
            {/* Menu Trigger Button - Fixed at top right */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-8 right-8 z-[6000] p-3 rounded-full bg-black/20 hover:bg-black/40 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10 shadow-lg"
                aria-label="Toggle Menu"
            >
                {isOpen ? <IconX className="text-white" /> : <IconMenu2 className="text-neutral-800 dark:text-white" />}
            </button>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[5000] bg-white/95 dark:bg-black/95 backdrop-blur-xl overflow-y-auto"
                    >
                        <div className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16 relative">

                            {/* Logo in Menu */}
                            <div className="absolute top-8 left-8">
                                <span className="text-2xl font-bold text-neutral-900 dark:text-white tracking-widest">GENTOP</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 w-full max-w-7xl pt-20">
                                {menuItems.map((section, idx) => (
                                    <motion.div
                                        key={section.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.2 }}
                                        className="flex flex-col space-y-6"
                                    >
                                        <Link href={section.link} onClick={() => setIsOpen(false)}>
                                            <h3 className="text-xl font-bold text-gentop-green border-b border-neutral-200 dark:border-white/10 pb-4 hover:text-foreground transition-colors">
                                                {section.title}
                                            </h3>
                                        </Link>
                                        <ul className="space-y-3">
                                            {section.items.map((item) => (
                                                <li key={item.name}>
                                                    <Link
                                                        href={item.link}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-lg"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-20 text-center text-neutral-500 text-sm"
                            >
                                <p>Leading the Construction & Facilities Management Industry</p>
                                <p>© 2026 GENTOP Co., Ltd. All rights reserved.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
