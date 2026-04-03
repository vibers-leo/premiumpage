import Link from 'next/link'

export function GlobalHeader() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-black text-neutral-900 tracking-tight">
                        Premium Page
                    </Link>
                    <div className="items-center hidden gap-6 md:flex">
                        <Link href="/portfolio" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
                            포트폴리오
                        </Link>
                        <Link href="/quote" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
                            제작 의뢰
                        </Link>
                        <Link href="/pdf-converter" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
                            PDF 변환
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/login" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
                        로그인
                    </Link>
                    <Link
                        href="/quote"
                        className="px-5 py-2 text-sm font-bold text-white transition-all bg-neutral-900 rounded-full hover:bg-neutral-700 active:scale-95"
                    >
                        무료 상담
                    </Link>
                </div>
            </div>
        </nav>
    )
}
