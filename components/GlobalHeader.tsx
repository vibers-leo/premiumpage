'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from "@/components/theme-toggle"

export function GlobalHeader() {
    const pathname = usePathname()

    // 템플릿 페이지에서는 공통 헤더 숨김 (독립된 페이지처럼 보이게)
    if (pathname && pathname.startsWith('/templates')) {
        return null
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-background/50 backdrop-blur-xl">
            <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-black gradient-text">
                        Premium Page
                    </Link>
                    <div className="items-center hidden gap-6 md:flex">
                        <Link href="/pdf-converter" className="text-sm font-medium transition-colors hover:text-primary-500">
                            PDF 변환
                        </Link>
                        <Link href="/quote" className="text-sm font-medium transition-colors hover:text-primary-500">
                            제작 의뢰
                        </Link>
                        <Link href="/templates" className="text-sm font-medium transition-colors hover:text-primary-500">
                            로컬템플릿 확인
                        </Link>
                        <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary-500">
                            포트폴리오
                        </Link>
                        <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary-500">
                            대시보드
                        </Link>
                        <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary-500">
                            서비스 소개
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary-500">
                        로그인
                    </Link>
                    <Link
                        href="/quote"
                        className="px-5 py-2 text-sm font-bold text-black transition-all bg-white rounded-full hover:bg-gray-200 active:scale-95"
                    >
                        시작하기
                    </Link>
                </div>
            </div>
        </nav>
    )
}
