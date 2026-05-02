'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Download, Loader2, Share2 } from 'lucide-react'
import { generateFlipbookHTML } from '@/lib/generate-flipbook-html'

const PDFViewer = dynamic(
    () => import('@/components/pdf/PDFViewer').then(mod => ({ default: mod.PDFViewer })),
    { ssr: false, loading: () => <ViewerLoading /> }
)

const FlipViewer = dynamic(
    () => import('@/components/pdf/FlipViewer').then(mod => ({ default: mod.FlipViewer })),
    { ssr: false, loading: () => <ViewerLoading /> }
)

function ViewerLoading() {
    return (
        <div className="h-full flex items-center justify-center bg-neutral-100">
            <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
        </div>
    )
}

function ViewerContent() {
    const searchParams = useSearchParams()
    // ?k=KEY (proxy 방식) 또는 ?url=URL (레거시)
    const key = searchParams.get('k')
    const legacyUrl = searchParams.get('url')
    const title = searchParams.get('title') || 'Document'

    const proxyUrl = key
        ? `/api/storage/proxy?k=${encodeURIComponent(key)}`
        : legacyUrl || null

    const [viewMode, setViewMode] = useState<'flip' | 'standard'>('flip')
    const [copied, setCopied] = useState(false)
    const [htmlGenerating, setHtmlGenerating] = useState(false)
    const [htmlProgress, setHtmlProgress] = useState<{ cur: number; total: number } | null>(null)

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownloadHTML = async () => {
        if (!proxyUrl) return
        setHtmlGenerating(true)
        setHtmlProgress(null)
        try {
            await generateFlipbookHTML(proxyUrl, title, (cur, total) => {
                setHtmlProgress({ cur, total })
            })
        } catch (e) {
            console.error('HTML 생성 실패:', e)
            alert('HTML 파일 생성에 실패했습니다.')
        } finally {
            setHtmlGenerating(false)
            setHtmlProgress(null)
        }
    }

    if (!proxyUrl) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-neutral-400 text-sm mb-4">PDF 키 또는 URL이 제공되지 않았습니다</p>
                    <Link href="/pdf-converter" className="text-sm font-bold border-b border-neutral-900 pb-0.5">
                        PDF 변환기로 이동
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* 상단 바 */}
            <header className="border-b border-neutral-200 flex-shrink-0">
                <div className="container mx-auto px-6 max-w-screen-xl py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <Link href="/" className="text-neutral-400 hover:text-neutral-900 transition-colors flex-shrink-0">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div className="min-w-0">
                            <p className="text-xs font-extrabold tracking-tight truncate">{title}</p>
                            <p className="text-[10px] text-neutral-400 font-medium">Premium Page Viewer</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        {/* 뷰 모드 토글 */}
                        <div className="hidden sm:flex items-center border border-neutral-200">
                            <button
                                onClick={() => setViewMode('flip')}
                                className={`px-3 py-1.5 text-[11px] font-bold transition-all ${viewMode === 'flip' ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-900'}`}
                            >
                                플립
                            </button>
                            <button
                                onClick={() => setViewMode('standard')}
                                className={`px-3 py-1.5 text-[11px] font-bold transition-all ${viewMode === 'standard' ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-900'}`}
                            >
                                표준
                            </button>
                        </div>

                        {/* 링크 복사 */}
                        <button
                            onClick={handleCopyLink}
                            className="flex items-center gap-1.5 h-8 px-3 border border-neutral-200 text-[11px] font-bold text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all"
                        >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                            <span className="hidden sm:inline">{copied ? '복사됨' : '공유'}</span>
                        </button>

                        {/* HTML 다운로드 */}
                        <button
                            onClick={handleDownloadHTML}
                            disabled={htmlGenerating}
                            className="flex items-center gap-1.5 h-8 px-3 bg-neutral-900 text-white text-[11px] font-bold hover:bg-neutral-700 disabled:opacity-50 transition-all"
                        >
                            {htmlGenerating ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span className="hidden sm:inline">
                                        {htmlProgress ? `${htmlProgress.cur}/${htmlProgress.total}` : '생성 중...'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">HTML 저장</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* 뷰어 */}
            <div className="flex-1" style={{ minHeight: 0 }}>
                {viewMode === 'flip' ? (
                    <FlipViewer fileUrl={proxyUrl} fileName={title} />
                ) : (
                    <PDFViewer fileUrl={proxyUrl} fileName={title} />
                )}
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
