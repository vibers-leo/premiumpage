'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const PDFViewer = dynamic(
    () => import('@/components/pdf/PDFViewer').then(mod => ({ default: mod.PDFViewer })),
    {
        ssr: false,
        loading: () => (
            <div className="h-full flex items-center justify-center bg-neutral-100">
                <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
            </div>
        )
    }
)

function ViewerContent() {
    const searchParams = useSearchParams()
    const url = searchParams.get('url')
    const title = searchParams.get('title') || 'Document'

    if (!url) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-neutral-400 text-sm mb-4">PDF URL이 제공되지 않았습니다</p>
                    <Link href="/pdf-converter" className="text-sm font-bold text-neutral-900 border-b border-neutral-900 pb-0.5">
                        PDF 변환기로 이동
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* 헤더 */}
            <header className="border-b border-neutral-200">
                <div className="container mx-auto px-8 max-w-screen-xl py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h1 className="text-sm font-extrabold tracking-tight">{title}</h1>
                            <p className="text-[11px] text-neutral-400">Premium Page Viewer</p>
                        </div>
                    </div>
                    <Link href="/pdf-converter" className="text-[11px] font-bold text-neutral-400 border border-neutral-200 px-3 py-1.5 hover:border-neutral-900 hover:text-neutral-900 transition-all">
                        PDF 변환기
                    </Link>
                </div>
            </header>

            {/* 뷰어 */}
            <div className="flex-1">
                <PDFViewer fileUrl={url} fileName={title} />
            </div>
        </div>
    )
}

export default function ViewerPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
            </div>
        }>
            <ViewerContent />
        </Suspense>
    )
}
