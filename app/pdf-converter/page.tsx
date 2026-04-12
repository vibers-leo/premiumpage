'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle2, AlertCircle, Copy, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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

export default function PDFConverterPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const [copied, setCopied] = useState(false)
    const [viewMode, setViewMode] = useState<'standard' | 'flip'>('flip')

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0]
            if (droppedFile.type === 'application/pdf') {
                setFile(droppedFile)
                setError(null)
            } else {
                setError('PDF 파일만 업로드할 수 있습니다.')
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile)
                setError(null)
            } else {
                setError('PDF 파일만 업로드할 수 있습니다.')
            }
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        setError(null)

        try {
            // 1. presigned URL 발급
            const presignRes = await fetch('/api/storage/presign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: 'application/pdf',
                    folder: 'premiumpage/pdfs',
                }),
            })

            const presignData = await presignRes.json()
            if (!presignRes.ok) throw new Error(presignData.error || 'URL 생성 실패')

            // 2. NCP에 직접 업로드
            const uploadRes = await fetch(presignData.uploadUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/pdf' },
                body: file,
            })

            if (!uploadRes.ok) throw new Error('파일 업로드 실패')

            setUploadedFileUrl(presignData.publicUrl)
        } catch (err: any) {
            setError(err.message || '업로드 중 오류가 발생했습니다.')
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    const handleCopy = () => {
        if (!uploadedFileUrl) return
        navigator.clipboard.writeText(uploadedFileUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const resetUpload = () => {
        setFile(null)
        setUploadedFileUrl(null)
        setError(null)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* 헤더 */}
            <header className="border-b border-neutral-200">
                <div className="container mx-auto px-8 max-w-screen-xl py-6">
                    <Link href="/" className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-900 text-sm font-bold mb-4 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> 메인으로
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-extrabold tracking-tight">PDF to Web Converter</h1>
                        <span className="text-[10px] font-bold tracking-wider uppercase border border-neutral-900 px-2 py-0.5">BETA</span>
                    </div>
                    <p className="text-neutral-500 text-sm mt-1">PDF 파일을 인터랙티브 웹 뷰어로 변환합니다</p>
                </div>
            </header>

            <div className="container mx-auto px-8 max-w-screen-xl py-12">
                {!uploadedFileUrl ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="border border-neutral-200 p-8">
                            <h2 className="text-lg font-extrabold mb-1">PDF 업로드</h2>
                            <p className="text-neutral-400 text-sm mb-6">
                                PDF 파일을 드래그하거나 선택하여 업로드 (최대 50MB)
                            </p>

                            {/* 드래그 앤 드롭 */}
                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`relative border border-dashed p-16 text-center transition-all ${
                                    dragActive
                                        ? 'border-neutral-900 bg-neutral-50'
                                        : 'border-neutral-300 hover:border-neutral-500'
                                }`}
                            >
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-neutral-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900 mb-1">
                                            PDF 파일을 드래그하거나 클릭
                                        </p>
                                        <p className="text-xs text-neutral-400">
                                            최대 50MB · PDF 형식만 지원
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 선택된 파일 */}
                            {file && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 p-4 border border-neutral-200 flex items-center gap-4"
                                >
                                    <FileText className="w-5 h-5 text-neutral-400" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm truncate">{file.name}</p>
                                        <p className="text-xs text-neutral-400">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-neutral-900 flex-shrink-0" />
                                </motion.div>
                            )}

                            {/* 에러 */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 p-4 border border-red-200 bg-red-50 flex items-center gap-3"
                                >
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                    <p className="text-sm text-red-600">{error}</p>
                                </motion.div>
                            )}

                            {/* 업로드 버튼 */}
                            <button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className="w-full mt-6 h-12 bg-neutral-900 text-white font-bold text-sm border border-neutral-900 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {uploading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        변환 중...
                                    </>
                                ) : (
                                    '웹 뷰어로 변환'
                                )}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* 뷰어 헤더 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h2 className="text-lg font-extrabold">PDF 뷰어</h2>
                                <div className="flex items-center border border-neutral-200">
                                    <button
                                        onClick={() => setViewMode('flip')}
                                        className={`px-3 py-1.5 text-[11px] font-bold transition-all ${viewMode === 'flip' ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-900'}`}
                                    >
                                        페이지 넘김
                                    </button>
                                    <button
                                        onClick={() => setViewMode('standard')}
                                        className={`px-3 py-1.5 text-[11px] font-bold transition-all ${viewMode === 'standard' ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-900'}`}
                                    >
                                        표준 뷰어
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={resetUpload}
                                className="text-sm font-bold text-neutral-500 border border-neutral-200 px-4 py-2 hover:border-neutral-900 hover:text-neutral-900 transition-all"
                            >
                                새 파일 업로드
                            </button>
                        </div>

                        {/* PDF 뷰어 */}
                        <div className="h-[800px] border border-neutral-200 overflow-hidden">
                            {viewMode === 'flip' ? (
                                <FlipViewer fileUrl={uploadedFileUrl} fileName={file?.name} />
                            ) : (
                                <PDFViewer fileUrl={uploadedFileUrl} fileName={file?.name} />
                            )}
                        </div>

                        {/* 공유 링크 */}
                        <div className="border border-neutral-200 p-6">
                            <h3 className="text-sm font-extrabold mb-1">공유 링크</h3>
                            <p className="text-xs text-neutral-400 mb-4">아래 링크를 복사하여 공유하세요</p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={uploadedFileUrl}
                                    className="flex-1 px-4 py-2.5 border border-neutral-200 text-sm text-neutral-700 bg-neutral-50 focus:outline-none"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="h-10 px-4 border border-neutral-900 bg-neutral-900 text-white text-sm font-bold hover:bg-neutral-700 transition-all flex items-center gap-2"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? '복사됨' : '복사'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
