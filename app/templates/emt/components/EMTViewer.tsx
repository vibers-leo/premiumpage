'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import * as THREE from 'three'

interface EMTViewerProps {
    menu: any[]
    products: any[]
    lang: 'en' | 'ko'
}

export default function EMTViewer({ menu, products, lang }: EMTViewerProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsMounted(true)

        // Three.js Background
        if (!containerRef.current) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        containerRef.current.appendChild(renderer.domElement)

        const sphereGeo = new THREE.IcosahedronGeometry(9, 2)
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.04 })
        const mainSphere = new THREE.Mesh(sphereGeo, sphereMat)
        scene.add(mainSphere)

        const pGeo = new THREE.BufferGeometry()
        const pCount = 800
        const pArr = new Float32Array(pCount * 3)
        for (let i = 0; i < pCount * 3; i++) pArr[i] = (Math.random() - 0.5) * 100
        pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3))
        const pMat = new THREE.PointsMaterial({ size: 0.064, color: 0x00ffff, transparent: true, opacity: 0.24 })
        const stars = new THREE.Points(pGeo, pMat)
        scene.add(stars)

        camera.position.z = 22

        let mouseX = 0, mouseY = 0
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', onMouseMove)

        const animate = () => {
            requestAnimationFrame(animate)
            mainSphere.rotation.y += 0.0003
            mainSphere.rotation.x += 0.0001
            stars.rotation.y -= 0.0001
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.03
            camera.lookAt(scene.position)
            renderer.render(scene, camera)
        }
        animate()

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
            renderer.dispose()
        }
    }, [])

    if (!isMounted) return null

    const handleNext = () => setCurrentSlide((prev) => (prev + 1) % 15)
    const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? 14 : prev - 1))

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
            {/* Background Effects */}
            <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />
            <div className="fixed inset-0 z-1 pointer-events-none bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.85)_100%)]" />

            {/* HUD Navigation */}
            <nav className="fixed top-0 left-0 w-full h-[100px] z-[100] flex justify-between items-center px-8 md:px-16 bg-gradient-to-b from-black/90 to-transparent">
                <div className="relative cursor-pointer group" onClick={() => setCurrentSlide(0)}>
                    <Image src="/emt/assets/logo_full.png" alt="EMT" width={120} height={40} className="object-contain" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-12 h-full">
                    {menu.map((item) => (
                        <div key={item.id} className="relative h-full flex items-center group cursor-pointer">
                            <span className="text-secondary group-hover:text-white transition-colors tracking-widest text-sm font-medium uppercase font-['Michroma']">
                                {item.label}
                            </span>
                            <div className="absolute bottom-[30px] left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />

                            {/* Submenu */}
                            <div className="absolute top-[100px] left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-xl border border-white/20 border-t-[3px] border-t-cyan-400 py-4 min-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl rounded-b-lg">
                                {item.subs.map((sub: any) => (
                                    <div
                                        key={sub.id}
                                        onClick={() => setCurrentSlide(sub.slide)}
                                        className="px-6 py-3 hover:bg-white/10 text-gray-400 hover:text-green-400 transition-all cursor-pointer whitespace-nowrap"
                                    >
                                        {sub.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hamburger */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <Menu className="w-8 h-8" />
                </button>
            </nav>

            {/* Stage / Slides */}
            <main className="relative z-10 w-full h-full pt-[130px] px-8 md:px-24">
                <AnimatePresence mode="wait">
                    {currentSlide === 0 && (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0, z: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, z: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, z: -50, filter: 'blur(10px)' }}
                            className="h-full flex flex-col justify-center items-center text-center"
                        >
                            <h1 className="font-['Syncopate'] text-5xl md:text-8xl font-black mb-8 leading-[1.1] uppercase bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                                SMART SENSOR<br />& CONTROL
                            </h1>
                            <p className="text-gray-400 text-lg md:text-2xl max-w-4xl font-light leading-relaxed">
                                {lang === 'en'
                                    ? 'Leaping forward as a global smart sensor company leading the future mobility industry.'
                                    : '미래 모빌리티 산업을 선도하는 글로벌 스마트 센서 전문 기업으로 도약합니다.'}
                            </p>
                        </motion.div>
                    )}

                    {currentSlide >= 7 && currentSlide <= 10 && (
                        <motion.div
                            key={`sensors-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="h-full flex flex-col"
                        >
                            <span className="text-cyan-400 uppercase tracking-[4px] text-sm mb-2 block">MOBILITY PRODUCTS</span>
                            <h2 className="text-5xl font-['Syncopate'] font-bold mb-12 uppercase">SENSORS</h2>

                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 flex-1 mb-20 overflow-y-auto lg:overflow-visible">
                                {products.filter(p => p.category === 'Sensors').slice((currentSlide - 7) * 5, (currentSlide - 7) * 5 + 5).map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => setSelectedProduct(product)}
                                        className="group bg-white/5 border border-white/10 p-6 flex flex-col hover:border-green-400 hover:-translate-y-2 transition-all cursor-pointer rounded-sm"
                                    >
                                        <div className="relative w-full aspect-square mb-6 group-hover:scale-105 transition-transform">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-contain drop-shadow-2xl"
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold mb-4 font-['Michroma'] leading-tight group-hover:text-green-400">{product.title}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-4 leading-relaxed flex-1 group-hover:text-white font-light">{product.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Bottom HUD Controls */}
            <div className="fixed bottom-8 right-8 z-50 flex items-center gap-8 font-['Michroma'] text-gray-500">
                <button
                    onClick={handlePrev}
                    className="p-3 px-6 border border-white/20 rounded-lg hover:border-green-400 hover:text-green-400 hover:bg-green-400/10 transition-all uppercase tracking-widest text-xs"
                >
                    Prev
                </button>
                <div className="text-2xl font-bold text-white tracking-widest min-w-[150px] text-center">
                    {String(currentSlide + 1).padStart(2, '0')} / 15
                </div>
                <button
                    onClick={handleNext}
                    className="p-3 px-6 border border-white/20 rounded-lg hover:border-green-400 hover:text-green-400 hover:bg-green-400/10 transition-all uppercase tracking-widest text-xs"
                >
                    Next
                </button>
            </div>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-8 md:p-16 backdrop-blur-2xl"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-7xl h-full bg-[#050505] rounded-xl overflow-y-auto border border-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-8 right-8 text-white p-2 px-6 border border-white/20 rounded-lg hover:border-green-400 transition-colors uppercase text-xs tracking-widest font-bold z-10"
                            >
                                Close X
                            </button>

                            <div className="flex flex-col lg:flex-row h-full">
                                <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center">
                                    <div className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4">{selectedProduct.category}</div>
                                    <h2 className="text-4xl md:text-6xl font-bold mb-8 font-['Michroma'] leading-tight">{selectedProduct.title}</h2>
                                    <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap font-light">{selectedProduct.details || selectedProduct.desc}</p>
                                </div>
                                <div className="flex-1 bg-white/[0.02] flex items-center justify-center p-12 lg:p-24 relative overflow-hidden">
                                    {/* Background Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full" />
                                    <div className="relative w-full h-full max-h-[60vh]">
                                        <Image
                                            src={selectedProduct.image}
                                            alt={selectedProduct.title}
                                            fill
                                            className="object-contain drop-shadow-[0_0_50px_rgba(0,255,255,0.2)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex flex-col p-12 overflow-y-auto"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="self-end p-4 border-2 border-white/50 rounded-full mb-12"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {menu.map((item) => (
                            <div key={item.id} className="mb-10">
                                <div className="text-green-400 text-xs tracking-widest uppercase mb-4">{item.label}</div>
                                {item.subs.map((sub: any) => (
                                    <div
                                        key={sub.id}
                                        onClick={() => {
                                            setCurrentSlide(sub.slide)
                                            setIsMobileMenuOpen(false)
                                        }}
                                        className="text-2xl font-bold mb-3 hover:text-cyan-400 transition-colors"
                                    >
                                        {sub.label}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
