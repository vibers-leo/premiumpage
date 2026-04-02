'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// PDF 뷰어를 동적으로 import (SSR 비활성화)
const PDFViewer = dynamic(
    () => import('@/components/pdf/PDFViewer').then(mod => ({ default: mod.PDFViewer })),
    {
        ssr: false,
        loading: () => (
            <div className="h-full flex items-center justify-center bg-gray-900 rounded-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        )
    }
)

export default function PDFConverterPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)

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
                setError('PDF 파일만 업로드 가능합니다.')
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
                setError('PDF 파일만 업로드 가능합니다.')
            }
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        setError(null)

        try {
            // 1. Firebase Storage에 업로드 준비
            const { storage } = await import('@/lib/firebase')
            const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage')

            const timestamp = Date.now()
            const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
            const storageRef = ref(storage, `pdfs/${fileName}`)

            // 2. 파일 업로드
            const snapshot = await uploadBytes(storageRef, file)
            const downloadUrl = await getDownloadURL(snapshot.ref)

            setUploadedFileUrl(downloadUrl)

            // 3. 데이터베이스에 프로젝트 정보 저장 (로그인한 경우)
            // 브라우저에서 직접 DB를 건드리는 대신, 기존 API를 활용하거나 정보를 전달
            await fetch('/api/upload/pdf-metadata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileUrl: downloadUrl,
                    fileName: file.name,
                    fileSize: file.size
                })
            })

        } catch (err: any) {
            setError(err.message || '업로드 중 오류가 발생했습니다.')
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    const resetUpload = () => {
        setFile(null)
        setUploadedFileUrl(null)
        setError(null)
    }

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            {/* 헤더 */}
            <header className="border-b border-border bg-background/50 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-black gradient-text">PDF to Web Converter</h1>
                    <p className="text-muted-foreground mt-2">PDF 파일을 인터랙티브 웹 뷰어로 변환하세요</p>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                {!uploadedFileUrl ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        <Card className="glass-card shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-black gradient-text">PDF 업로드</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    PDF 파일을 드래그하거나 선택하여 업로드하세요 (최대 10MB)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* 드래그 앤 드롭 영역 */}
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${dragActive
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary/50 bg-muted/30'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />

                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Upload className="w-10 h-10 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-foreground mb-2">
                                                PDF 파일을 드래그하거나 클릭하여 업로드
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                최대 10MB, PDF 형식만 지원
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 선택된 파일 정보 */}
                                {file && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-muted/50 rounded-lg border border-border flex items-center gap-4"
                                    >
                                        <FileText className="w-8 h-8 text-primary" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-foreground">{file.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    </motion.div>
                                )}

                                {/* 에러 메시지 */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg flex items-center gap-3"
                                    >
                                        <AlertCircle className="w-5 h-5 text-destructive" />
                                        <p className="text-sm text-destructive">{error}</p>
                                    </motion.div>
                                )}

                                {/* 업로드 버튼 */}
                                <Button
                                    onClick={handleUpload}
                                    disabled={!file || uploading}
                                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90 py-6 font-bold text-lg text-white"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                                            변환 중...
                                        </>
                                    ) : (
                                        '웹 뷰어로 변환'
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* 뷰어 헤더 */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-foreground">PDF 뷰어</h2>
                            <Button
                                onClick={resetUpload}
                                variant="outline"
                                className="border-border hover:bg-muted"
                            >
                                새 파일 업로드
                            </Button>
                        </div>

                        {/* PDF 뷰어 */}
                        <div className="h-[800px] bg-card border border-border rounded-xl overflow-hidden shadow-lg">
                            <PDFViewer fileUrl={uploadedFileUrl} fileName={file?.name} />
                        </div>

                        {/* 공유 정보 */}
                        <Card className="glass-card shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-foreground">공유 링크</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    아래 링크를 복사하여 다른 사람과 공유하세요
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={`${typeof window !== 'undefined' ? window.location.origin : ''}${uploadedFileUrl}`}
                                        className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${window.location.origin}${uploadedFileUrl}`)
                                            alert('링크가 복사되었습니다!')
                                        }}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        복사
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
