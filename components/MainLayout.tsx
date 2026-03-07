'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from "@/components/theme-toggle"
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

    // 개별 템플릿 페이지 감지
    const isIndividualTemplate =
        pathname?.startsWith('/templates/hangseong') ||
        pathname?.startsWith('/templates/hs-tech') ||
        pathname?.startsWith('/templates/gentop') ||
        pathname?.startsWith('/templates/emt') ||
        pathname?.startsWith('/templates/air-hstech') ||
        (typeof window !== 'undefined' && (
            window.location.hostname.includes('hangseong.premiumpage.kr') ||
            window.location.hostname.includes('hstech.premiumpage.kr') ||
            window.location.hostname.includes('hstech-kr.premiumpage.kr') ||
            window.location.hostname.includes('gentop.premiumpage.kr') ||
            window.location.hostname.includes('hstechco.premiumpage.kr') ||
            window.location.hostname.includes('emt.premiumpage.kr') ||
            window.location.hostname.includes('emt-ko.premiumpage.kr')
        ))

    const navLinks = [
        { href: '/templates', label: 'Portfolios' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/about', label: 'About' },
        { href: '/quote', label: 'Contact' },
    ]

    return (
        <>
            {!isIndividualTemplate && (
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'border-border/50 bg-background/90 backdrop-blur-2xl shadow-sm' : 'border-white/5 bg-background/70 backdrop-blur-2xl'}`}>
                    <div className="flex items-center justify-between h-20 px-6 mx-auto max-w-screen-2xl">
                        <div className="flex items-center gap-12">
                            <Link href="/" className="text-2xl font-black gradient-text tracking-tighter">
                                Premium Page
                            </Link>
                            <div className="items-center hidden gap-8 lg:flex">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`text-sm font-black uppercase tracking-widest transition-all hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="hidden sm:block">
                                <ThemeToggle />
                            </div>
                            <Link
                                href="/login"
                                className="hidden sm:block text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Member
                            </Link>
                            <Button
                                asChild
                                className="hidden sm:flex h-10 px-8 text-xs font-black uppercase tracking-widest transition-all rounded-full bg-foreground text-background hover:scale-105"
                            >
                                <Link href="/quote">Consulting</Link>
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
                        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-2xl">
                            <div className="px-6 py-6 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block text-lg font-bold py-2 transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-foreground'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-border flex items-center gap-4">
                                    <ThemeToggle />
                                    <Link href="/login" className="text-sm font-bold text-muted-foreground hover:text-foreground">
                                        Member
                                    </Link>
                                </div>
                                <Button asChild className="w-full h-12 rounded-full font-bold">
                                    <Link href="/quote">무료 컨설팅 신청하기</Link>
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
