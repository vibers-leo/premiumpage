'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from '@/components/ui/button'

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // 개별 템플릿 페이지 감지: 경로 기반 + 서브도메인 기반
    const isIndividualTemplate =
        // 경로 기반 감지 (직접 /templates/xxx 접근)
        pathname?.startsWith('/templates/hangseong') ||
        pathname?.startsWith('/templates/hs-tech') ||
        pathname?.startsWith('/templates/gentop') ||
        pathname?.startsWith('/templates/emt') ||
        // 서브도메인 기반 감지 (xxx.premiumpage.kr 접근)
        (typeof window !== 'undefined' && (
            window.location.hostname.includes('hangseong.premiumpage.kr') ||
            window.location.hostname.includes('hstech.premiumpage.kr') ||
            window.location.hostname.includes('hstech-kr.premiumpage.kr') ||
            window.location.hostname.includes('gentop.premiumpage.kr') ||
            window.location.hostname.includes('emt.premiumpage.kr') ||
            window.location.hostname.includes('emt-ko.premiumpage.kr')
        ))

    return (
        <>
            {!isIndividualTemplate && (
                <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 bg-background/70 backdrop-blur-2xl">
                    <div className="flex items-center justify-between h-20 px-6 mx-auto max-w-screen-2xl">
                        <div className="flex items-center gap-12">
                            <Link href="/" className="text-2xl font-black gradient-text tracking-tighter">
                                Premium Page
                            </Link>
                            <div className="items-center hidden gap-8 lg:flex">
                                <Link href="/#why" className="text-sm font-black uppercase tracking-widest transition-all hover:text-primary text-muted-foreground">
                                    Why Us
                                </Link>
                                <Link href="/#portfolio" className="text-sm font-black uppercase tracking-widest transition-all hover:text-primary text-muted-foreground">
                                    Portfolio
                                </Link>
                                <Link href="/templates" className="text-sm font-black uppercase tracking-widest transition-all hover:text-primary text-muted-foreground">
                                    All Works
                                </Link>
                                <Link href="/quote" className="text-sm font-black uppercase tracking-widest transition-all hover:text-primary text-muted-foreground">
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="hidden sm:block">
                                <ThemeToggle />
                            </div>
                            <Link
                                href="/login"
                                className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Member
                            </Link>
                            <Button
                                asChild
                                className="h-10 px-8 text-xs font-black uppercase tracking-widest transition-all rounded-full bg-foreground text-background hover:scale-105"
                            >
                                <Link href="/quote">Consulting</Link>
                            </Button>
                        </div>
                    </div>
                </nav>
            )}

            <main className={isIndividualTemplate ? "min-h-screen" : "pt-20 min-h-screen"}>
                {children}
            </main>
        </>
    )
}
