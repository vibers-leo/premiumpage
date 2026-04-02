'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CoverView() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position to -1 to 1 range
            const x = (e.clientX / window.innerWidth - 0.5) * 2
            const y = (e.clientY / window.innerHeight - 0.5) * 2
            setMousePosition({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="min-h-screen w-full bg-white antialiased relative overflow-hidden flex items-center justify-center">

            {/* ─── Mouse-following Spotlight ─── */}
            <motion.div
                className="absolute pointer-events-none z-[5]"
                animate={{
                    x: mousePosition.x * (typeof window !== 'undefined' ? window.innerWidth / 2 : 0),
                    y: mousePosition.y * (typeof window !== 'undefined' ? window.innerHeight / 2 : 0),
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
                style={{
                    width: 600,
                    height: 600,
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* ─── Mesh Gradient Blobs with Parallax ─── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top-center: primary cyan glow - moves faster */}
                <motion.div
                    animate={{
                        x: mousePosition.x * 40,
                        y: mousePosition.y * 40,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-cyan-100 opacity-70 blur-[120px] mix-blend-multiply"
                />
                {/* Left-mid: blue accent - medium speed */}
                <motion.div
                    animate={{
                        x: mousePosition.x * -25,
                        y: mousePosition.y * 25,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute top-1/3 -left-48 w-[600px] h-[600px] rounded-full bg-blue-100 opacity-50 blur-[100px] mix-blend-multiply"
                />
                {/* Bottom-right: sky tint - slower */}
                <motion.div
                    animate={{
                        x: mousePosition.x * 30,
                        y: mousePosition.y * -30,
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="absolute bottom-0 right-0 w-[700px] h-[500px] rounded-full bg-sky-100 opacity-40 blur-[100px] mix-blend-multiply"
                />
            </div>

            {/* ─── Subtle Dot Pattern ─── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    opacity: 0.1,
                }}
            />

            {/* ─── Large Faint Watermark ─── */}
            <div className="absolute bottom-6 right-8 pointer-events-none select-none leading-none text-right">
                <span
                    className="font-black tracking-tighter text-neutral-900"
                    style={{ fontSize: 'min(22vw, 200px)', opacity: 0.03, lineHeight: 0.85 }}
                >
                    HS<br />TECH
                </span>
            </div>

            {/* ─── Content with 3D Tilt ─── */}
            <motion.div
                animate={{
                    rotateX: mousePosition.y * -3,
                    rotateY: mousePosition.x * 3,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                style={{ perspective: 1000 }}
                className="p-4 max-w-5xl mx-auto relative z-10 w-full"
            >
                <div className="flex flex-col items-center justify-center text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-5"
                    >
                        {/* Pill badge */}
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-white/70 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block" />
                            Global Measurement Leader
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-5xl md:text-8xl font-black text-neutral-900 mb-6 tracking-tighter uppercase leading-[0.9] mt-2"
                    >
                        THE STANDARD<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-400">
                            OF PRECISION.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-6 text-sm text-neutral-500 max-w-sm mx-auto mb-12 tracking-widest uppercase font-medium leading-loose"
                    >
                        Authorized Partner for<br />
                        <span className="text-neutral-800 font-bold">VAISALA · SETRA · JUMO</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-wrap gap-3 justify-center"
                    >
                        <Link
                            href="/templates/hs-tech?tab=products"
                            className="px-8 py-3 rounded-lg bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-700 transition-colors uppercase tracking-widest shadow-md"
                        >
                            View Products
                        </Link>
                        <Link
                            href="/templates/hs-tech?tab=contact"
                            className="px-8 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-700 font-bold text-sm hover:border-neutral-400 transition-all uppercase tracking-widest"
                        >
                            Contact Us
                        </Link>
                    </motion.div>

                    {/* Brand logos row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mt-20 flex items-center gap-10 grayscale opacity-25"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/templates/hs-tech/images/brands/vaisala.svg" alt="VAISALA" className="h-6 object-contain" />
                        <span className="text-neutral-300 text-lg">·</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/templates/hs-tech/images/brands/setra.svg" alt="SETRA" className="h-6 object-contain" />
                        <span className="text-neutral-300 text-lg">·</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/templates/hs-tech/images/brands/jumo.svg" alt="JUMO" className="h-6 object-contain" />
                    </motion.div>

                </div>
            </motion.div>
        </div>
    )
}
