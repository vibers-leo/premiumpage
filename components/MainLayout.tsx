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
    const [hostname, setHostname] = useState('')

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        setHostname(window.location.hostname)
    }, [])

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
        catalogHostnames.some(h => hostname.includes(h))

    const navLinks = [
        { href: '/portfolio', label: '포트폴리오' },
        { href: '/pricing', label: '요금제' },
        { href: '/pdf-converter', label: 'PDF 변환' },
        { href: '/about', label: '소개' },
        { href: '/quote', label: '제작 의뢰' },
    ]

    return (
        <>
            {!isIndividualTemplate && (
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'border-neutral-300 bg-white/98 backdrop-blur-sm' : 'border-neutral-200 bg-white'}`}>
                    <div className="flex items-center justify-between h-14 px-6 md:px-8 mx-auto max-w-screen-xl">
                        {/* 로고 — 좌측 */}
                        <Link href="/" className="text-base font-extrabold tracking-tight text-neutral-900 uppercase flex-shrink-0">
                            Premium Page
                        </Link>

                        {/* 내비 — 가운데 */}
                        <div className="items-center hidden gap-1 lg:flex absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[13px] font-semibold px-4 py-1.5 border transition-all ${pathname === link.href ? 'text-neutral-900 border-neutral-900' : 'text-neutral-500 border-transparent hover:text-neutral-900 hover:border-neutral-300'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* 우측 */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <Link
                                href="/login"
                                className="hidden sm:block text-[13px] font-semibold text-neutral-400 hover:text-neutral-900 transition-colors px-3 py-1.5"
                            >
                                로그인
                            </Link>
                            <Button
                                asChild
                                className="hidden sm:flex h-8 px-4 text-[12px] font-bold transition-all rounded-none bg-neutral-900 text-white hover:bg-neutral-700 border border-neutral-900"
                            >
                                <Link href="/quote">무료 상담</Link>
                            </Button>
                            <button
                                className="lg:hidden p-2 border border-transparent hover:border-neutral-300 transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t border-neutral-200 bg-white">
                            <div className="px-6 py-5 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block text-sm font-bold py-2.5 px-4 border-l-2 transition-all ${pathname === link.href ? 'text-neutral-900 border-neutral-900' : 'text-neutral-500 border-transparent hover:border-neutral-300 hover:text-neutral-900'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-4 mt-3 border-t border-neutral-200 flex items-center gap-4">
                                    <Link href="/login" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
                                        로그인
                                    </Link>
                                </div>
                                <Button asChild className="w-full h-11 rounded-none font-bold border border-neutral-900 bg-neutral-900 text-white">
                                    <Link href="/quote">무료 상담 신청하기</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </nav>
            )}

            <main className={isIndividualTemplate ? "min-h-screen" : "pt-14 min-h-screen"}>
                {children}
            </main>
        </>
    )
}
