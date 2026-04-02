'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
    fileUrl: string
    fileName?: string
}

export function PDFViewer({ fileUrl, fileName = 'document.pdf' }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [scale, setScale] = useState<number>(1.0)
    const [isFlipping, setIsFlipping] = useState<boolean>(false)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages)
    }

    const goToNextPage = () => {
        if (currentPage < numPages && !isFlipping) {
            setIsFlipping(true)
            setTimeout(() => {
                setCurrentPage(currentPage + 1)
                setIsFlipping(false)
            }, 300)
        }
    }

    const goToPreviousPage = () => {
        if (currentPage > 1 && !isFlipping) {
            setIsFlipping(true)
            setTimeout(() => {
                setCurrentPage(currentPage - 1)
                setIsFlipping(false)
            }, 300)
        }
    }

    const zoomIn = () => {
        if (scale < 2.0) setScale(scale + 0.2)
    }

    const zoomOut = () => {
        if (scale > 0.6) setScale(scale - 0.2)
    }

    return (
        <div className="flex flex-col h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
            {/* 상단 툴바 */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-4">
                    <h3 className="text-white font-semibold truncate max-w-xs">{fileName}</h3>
                    <span className="text-sm text-gray-400">
                        {currentPage} / {numPages}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* 줌 컨트롤 */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={zoomOut}
                        disabled={scale <= 0.6}
                        className="text-gray-300 hover:text-white"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-400 min-w-[60px] text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={zoomIn}
                        disabled={scale >= 2.0}
                        className="text-gray-300 hover:text-white"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </Button>

                    {/* 다운로드 */}
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-gray-300 hover:text-white"
                    >
                        <a href={fileUrl} download={fileName}>
                            <Download className="w-4 h-4" />
                        </a>
                    </Button>
                </div>
            </div>

            {/* PDF 뷰어 영역 */}
            <div className="flex-1 overflow-auto bg-gray-950 flex items-center justify-center p-8">
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ rotateY: isFlipping ? 90 : 0, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: isFlipping ? -90 : 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="shadow-2xl"
                        >
                            <Document
                                file={fileUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="flex items-center justify-center h-96 w-96 bg-gray-800 rounded-lg">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                                    </div>
                                }
                                error={
                                    <div className="flex items-center justify-center h-96 w-96 bg-gray-800 rounded-lg">
                                        <p className="text-red-400">PDF 로드 실패</p>
                                    </div>
                                }
                            >
                                <Page
                                    pageNumber={currentPage}
                                    scale={scale}
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                    className="rounded-lg overflow-hidden"
                                />
                            </Document>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* 하단 네비게이션 */}
            <div className="flex items-center justify-center gap-4 px-6 py-4 bg-gray-800 border-t border-gray-700">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousPage}
                    disabled={currentPage <= 1 || isFlipping}
                    className="border-gray-600 hover:bg-gray-700"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    이전
                </Button>

                {/* 페이지 번호 표시 */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(numPages, 5) }, (_, i) => {
                        let pageNum
                        if (numPages <= 5) {
                            pageNum = i + 1
                        } else if (currentPage <= 3) {
                            pageNum = i + 1
                        } else if (currentPage >= numPages - 2) {
                            pageNum = numPages - 4 + i
                        } else {
                            pageNum = currentPage - 2 + i
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => {
                                    setIsFlipping(true)
                                    setTimeout(() => {
                                        setCurrentPage(pageNum)
                                        setIsFlipping(false)
                                    }, 300)
                                }}
                                className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-all ${currentPage === pageNum
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        )
                    })}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage >= numPages || isFlipping}
                    className="border-gray-600 hover:bg-gray-700"
                >
                    다음
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}
