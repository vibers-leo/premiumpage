'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    // 납품 카탈로그 도메인/경로에서는 헤더 숨김
    const catalogHostnames = [
        'hangseong.premiumpage.kr',
        'hstech.premiumpage.kr',
        'hstech-kr.premiumpage.kr',
        'gentop.premiumpage.kr',
        'hstechco.premiumpage.kr',
        'emt.premiumpage.kr',
        'emt-ko.premiumpage.kr',
        'magazine.vibers.co.kr',
        'vibers.premiumpage.kr',
    ]
    const catalogPaths = ['/templates/', '/gentop/', '/vibers/', '/emt/']
    const isIndividualTemplate =
        catalogPaths.some(p => pathname?.startsWith(p)) ||
        (typeof window !== 'undefined' &&
            catalogHostnames.some(h => window.location.hostname.includes(h)))

    const navLinks = [
        { href: '/portfolio', label: '포트폴리오' },
        { href: '/pricing', label: '요금제' },
        { href: '/about', label: '소개' },
        { href: '/quote', label: '제작 의뢰' },
    ]

    return (
        <>
            {!isIndividualTemplate && (
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'border-neutral-200 bg-white/95 backdrop-blur-2xl shadow-sm' : 'border-neutral-100 bg-white/80 backdrop-blur-2xl'}`}>
                    <div className="flex items-center justify-between h-20 px-6 mx-auto max-w-screen-2xl">
                        <div className="flex items-center gap-12">
                            <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                                Premium Page
                            </Link>
                            <div className="items-center hidden gap-8 lg:flex">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`text-sm font-semibold transition-all hover:text-neutral-900 ${pathname === link.href ? 'text-neutral-900' : 'text-neutral-500'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="hidden sm:block text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                            >
                                로그인
                            </Link>
                            <Button
                                asChild
                                className="hidden sm:flex h-10 px-6 text-sm font-bold transition-all rounded-full bg-neutral-900 text-white hover:bg-neutral-700 hover:scale-105"
                            >
                                <Link href="/quote">무료 상담</Link>
                            </Button>
                            {/* Mobile Menu Toggle */}
                            <button
                                className="lg:hidden p-2"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-2xl">
                            <div className="px-6 py-6 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block text-lg font-bold py-2 transition-colors hover:text-neutral-900 ${pathname === link.href ? 'text-neutral-900' : 'text-neutral-500'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-neutral-100 flex items-center gap-4">
                                    <Link href="/login" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
                                        로그인
                                    </Link>
                                </div>
                                <Button asChild className="w-full h-12 rounded-full font-bold">
                                    <Link href="/quote">무료 상담 신청하기</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </nav>
            )}

            <main className={isIndividualTemplate ? "min-h-screen" : "pt-20 min-h-screen"}>
                {children}
            </main>
        </>
    )
}
