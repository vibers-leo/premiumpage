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
                <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-slate-100/80 bg-white/80 backdrop-blur-xl shadow-sm">
                    <div className="flex items-center justify-between h-20 px-6 mx-auto max-w-screen-2xl">
                        <div className="flex items-center gap-12">
                            <Link href="/" className="text-xl font-black tracking-tighter text-slate-900">
                                Premium <span className="text-violet-600">Page</span>
                            </Link>
                            <div className="items-center hidden gap-8 lg:flex">
                                <Link href="/#why" className="text-sm font-bold transition-all hover:text-violet-600 text-slate-500">
                                    서비스 특징
                                </Link>
                                <Link href="/#portfolio" className="text-sm font-bold transition-all hover:text-violet-600 text-slate-500">
                                    납품 사례
                                </Link>
                                <Link href="/templates" className="text-sm font-bold transition-all hover:text-violet-600 text-slate-500">
                                    전체 작품
                                </Link>
                                <Link href="/quote" className="text-sm font-bold transition-all hover:text-violet-600 text-slate-500">
                                    문의하기
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="hidden sm:block">
                                <ThemeToggle />
                            </div>
                            <Button
                                asChild
                                className="h-9 px-6 text-xs font-bold uppercase tracking-widest transition-all rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-200 hover:-translate-y-0.5"
                            >
                                <Link href="/quote">무료 상담</Link>
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
