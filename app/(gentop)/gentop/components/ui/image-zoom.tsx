
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconZoomIn } from "@tabler/icons-react";
import { cn } from "@gentop/lib/utils";

interface ImageZoomProps {
    src: string;
    alt: string;
    className?: string;
}

export const ImageZoom = ({ src, alt, className }: ImageZoomProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className={cn(
                    "relative group cursor-zoom-in my-8 w-full flex flex-col items-center",
                    className
                )}
                onClick={() => setIsOpen(true)}
            >
                <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-neutral-100 dark:bg-neutral-900">
                    {/* Image Wrapper with hover effect */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        {/* Fallback to standard img tag since we might not know dimensions ahead of time for legacy content */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full h-auto object-contain block mx-auto"
                            loading="lazy"
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full text-white">
                                <IconZoomIn size={24} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Caption */}
                {alt && alt !== "GENTOP Image" && (
                    <span className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 font-medium italic text-center px-4">
                        {alt}
                    </span>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
                        onClick={() => setIsOpen(false)}
                    >
                        <button
                            className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <IconX size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={src}
                                alt={alt}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />

                            {alt && alt !== "GENTOP Image" && (
                                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                    <span className="inline-block px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm">
                                        {alt}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
