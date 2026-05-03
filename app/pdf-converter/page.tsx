'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, Download, Loader2, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from '@/components/SectionHeader'
import { generateFlipbookHTML } from '@/lib/generate-flipbook-html'

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

export default function PDFConverterPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedKey, setUploadedKey] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const [linkCopied, setLinkCopied] = useState(false)
    const [htmlGenerating, setHtmlGenerating] = useState(false)
    const [htmlProgress, setHtmlProgress] = useState<{ cur: number; total: number } | null>(null)

    const proxyUrl = uploadedKey ? `/api/storage/proxy?k=${encodeURIComponent(uploadedKey)}` : null
    const shareUrl = uploadedKey && typeof window !== 'undefined'
        ? `${window.location.origin}/viewer?k=${encodeURIComponent(uploadedKey)}&title=${encodeURIComponent(file?.name || 'document.pdf')}`
        : ''

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(e.type === 'dragenter' || e.type === 'dragover')
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        const dropped = e.dataTransfer.files[0]
        if (dropped?.type === 'application/pdf') {
            setFile(dropped)
            setError(null)
        } else {
            setError('PDF 파일만 업로드할 수 있습니다.')
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (selected?.type === 'application/pdf') {
            setFile(selected)
            setError(null)
        } else if (selected) {
            setError('PDF 파일만 업로드할 수 있습니다.')
        }
    }

    const handleUpload = async () => {
        if (!file) return
        setUploading(true)
        setError(null)
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/api/storage/upload', { method: 'POST', body: formData })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || '업로드 실패')
            setUploadedKey(data.key)
        } catch (err: any) {
            setError(err.message || '업로드 중 오류가 발생했습니다.')
        } finally {
            setUploading(false)
        }
    }

    const handleCopyLink = () => {
        if (!shareUrl) return
        navigator.clipboard.writeText(shareUrl)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
    }

    const handleDownloadHTML = async () => {
        if (!proxyUrl || !file) return
        setHtmlGenerating(true)
        setHtmlProgress(null)
        try {
            await generateFlipbookHTML(proxyUrl, file.name, (cur, total) => {
                setHtmlProgress({ cur, total })
            })
        } catch (e) {
            console.error('HTML 생성 실패:', e)
            alert('HTML 파일 생성에 실패했습니다. 페이지 수가 많거나 파일이 너무 클 수 있습니다.')
        } finally {
            setHtmlGenerating(false)
            setHtmlProgress(null)
        }
    }

    const resetUpload = () => {
        setFile(null)
        setUploadedKey(null)
        setError(null)
    }

    return (
        <div className="min-h-screen bg-white">
            <section className="pt-12 pb-8 md:pt-16">
                <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
                    <SectionHeader
                        label="BETA · PDF Converter"
                        title="PDF to Flip Web Viewer"
                        description="PDF를 업로드하면 책 넘김 효과의 웹 뷰어로 변환합니다. 공유 링크 또는 오프라인 HTML 파일로 배포하세요."
                    />
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-8 max-w-screen-xl pb-20">
                <AnimatePresence mode="wait">
                    {!uploadedKey ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            className="max-w-xl"
                        >
                            <div className="border border-neutral-200 p-8">
                                <h2 className="text-base font-extrabold mb-1">PDF 업로드</h2>
                                <p className="text-neutral-400 text-sm mb-6">최대 50MB · PDF 형식만 지원</p>

                                {/* 드래그 앤 드롭 */}
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative border border-dashed p-14 text-center transition-all cursor-pointer ${
                                        dragActive ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-300 hover:border-neutral-500'
                                    }`}
                                >
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center">
                                            <Upload className="w-4 h-4 text-neutral-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-900">드래그하거나 클릭해서 선택</p>
                                            <p className="text-xs text-neutral-400 mt-1">PDF 파일을 여기에 끌어다 놓으세요</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 선택된 파일 */}
                                {file && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-3 p-4 border border-neutral-200 flex items-center gap-3"
                                    >
                                        <FileText className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm truncate">{file.name}</p>
                                            <p className="text-xs text-neutral-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                                    </motion.div>
                                )}

                                {/* 에러 */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-3 p-4 border border-red-200 bg-red-50 flex items-center gap-3"
                                    >
                                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        <p className="text-sm text-red-600">{error}</p>
                                    </motion.div>
                                )}

                                <button
                                    onClick={handleUpload}
                                    disabled={!file || uploading}
                                    className="w-full mt-5 h-12 bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    {uploading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> 업로드 중...</>
                                    ) : (
                                        '웹 뷰어로 변환'
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {/* 액션 패널 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 max-w-3xl">
                                {/* 공유 링크 */}
                                <div className="bg-white p-6">
                                    <p className="text-[11px] font-bold tracking-wider uppercase text-neutral-400 mb-3">공유 링크</p>
                                    <p className="text-xs text-neutral-500 mb-4 leading-relaxed">링크를 공유하면 누구나 브라우저에서 플립 뷰어로 볼 수 있습니다.</p>
                                    <div className="flex gap-2">
                                        <input
                                            readOnly
                                            value={shareUrl}
                                            className="flex-1 min-w-0 px-3 py-2 border border-neutral-200 text-xs text-neutral-500 bg-neutral-50 focus:outline-none truncate"
                                        />
                                        <button
                                            onClick={handleCopyLink}
                                            className="h-9 px-3 border border-neutral-900 bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-700 transition-all flex items-center gap-1 flex-shrink-0"
                                        >
                                            {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                            {linkCopied ? '복사됨' : '복사'}
                                        </button>
                                    </div>
                                    <Link
                                        href={shareUrl}
                                        target="_blank"
                                        className="mt-2 flex items-center gap-1 text-[11px] font-bold text-neutral-400 hover:text-neutral-900 transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3" /> 새 탭에서 열기
                                    </Link>
                                </div>

                                {/* HTML 다운로드 */}
                                <div className="bg-white p-6">
                                    <p className="text-[11px] font-bold tracking-wider uppercase text-neutral-400 mb-3">HTML 파일</p>
                                    <p className="text-xs text-neutral-500 mb-4 leading-relaxed">모든 페이지가 포함된 단일 HTML 파일. 인터넷 없이도 플립 효과로 볼 수 있습니다.</p>
                                    <button
                                        onClick={handleDownloadHTML}
                                        disabled={htmlGenerating}
                                        className="w-full h-9 border border-neutral-900 text-neutral-900 text-xs font-bold hover:bg-neutral-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                    >
                                        {htmlGenerating ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                {htmlProgress ? `페이지 변환 중 ${htmlProgress.cur}/${htmlProgress.total}` : '준비 중...'}
                                            </>
                                        ) : (
                                            <><Download className="w-3.5 h-3.5" /> HTML 다운로드</>
                                        )}
                                    </button>
                                    <p className="mt-2 text-[10px] text-neutral-400">페이지 수에 따라 1~2분 소요</p>
                                </div>

                                {/* 새 파일 */}
                                <div className="bg-white p-6 flex flex-col justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold tracking-wider uppercase text-neutral-400 mb-3">파일 정보</p>
                                        <p className="text-sm font-bold truncate">{file?.name}</p>
                                        <p className="text-xs text-neutral-400 mt-1">{file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : ''}</p>
                                    </div>
                                    <button
                                        onClick={resetUpload}
                                        className="mt-6 w-full h-9 border border-neutral-200 text-neutral-500 text-xs font-bold hover:border-neutral-900 hover:text-neutral-900 transition-all"
                                    >
                                        새 파일 업로드
                                    </button>
                                </div>
                            </div>

                            {/* 업셀 — 전문 제작 의뢰 유도 */}
                            <div className="max-w-3xl bg-neutral-950 text-white p-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                                            <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-400">커스텀 버전이 필요하신가요?</span>
                                        </div>
                                        <h3 className="text-lg font-extrabold tracking-tight mb-2">브랜드 맞춤 전자카탈로그로 업그레이드</h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed">
                                            지금 보시는 플립 뷰어에 브랜드 디자인·다국어·인터랙티브 효과를 더한<br className="hidden md:block" />
                                            전문가 버전을 제작해드립니다.
                                        </p>
                                    </div>
                                    <Link
                                        href="/quote?plan=1"
                                        className="flex-shrink-0 h-11 px-7 bg-white text-neutral-900 font-bold text-sm flex items-center gap-2 hover:bg-neutral-100 transition-colors whitespace-nowrap"
                                    >
                                        제작 의뢰하기 <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-wrap gap-x-8 gap-y-2">
                                    {['브랜드 맞춤 UI/UX 디자인', '영문 · 한글 다국어 지원', '전용 도메인 연결', '월정액 유지보수'].map(f => (
                                        <div key={f} className="flex items-center gap-2 text-xs text-neutral-400">
                                            <Check className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 플립 뷰어 미리보기 */}
                            <div className="border border-neutral-200 overflow-hidden" style={{ height: '680px' }}>
                                <FlipViewer fileUrl={proxyUrl!} fileName={file?.name} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
