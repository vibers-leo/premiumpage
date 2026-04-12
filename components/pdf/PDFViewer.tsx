'use client'

import { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Minus } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

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

    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }, [])

    const flipTo = useCallback((page: number) => {
        if (page < 1 || page > numPages || isFlipping) return
        setIsFlipping(true)
        setTimeout(() => {
            setCurrentPage(page)
            setIsFlipping(false)
        }, 250)
    }, [numPages, isFlipping])

    const zoomIn = () => { if (scale < 2.0) setScale(s => Math.round((s + 0.2) * 10) / 10) }
    const zoomOut = () => { if (scale > 0.6) setScale(s => Math.round((s - 0.2) * 10) / 10) }

    return (
        <div className="flex flex-col h-full bg-white">
            {/* 상단 툴바 */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200">
                <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold text-neutral-900 truncate max-w-xs">{fileName}</h3>
                    <span className="text-[11px] font-bold text-neutral-400 tabular-nums">
                        {currentPage} / {numPages}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={zoomOut}
                        disabled={scale <= 0.6}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 disabled:opacity-30 transition-colors"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-bold text-neutral-400 min-w-[48px] text-center tabular-nums">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={zoomIn}
                        disabled={scale >= 2.0}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 disabled:opacity-30 transition-colors"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-neutral-200 mx-1" />
                    <a
                        href={fileUrl}
                        download={fileName}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* PDF 뷰어 영역 */}
            <div className="flex-1 overflow-auto bg-neutral-100 flex items-center justify-center p-8">
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ rotateY: isFlipping ? 90 : 0, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: isFlipping ? -90 : 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="border border-neutral-200"
                        >
                            <Document
                                file={fileUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="flex items-center justify-center h-[600px] w-[450px] bg-white">
                                        <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
                                    </div>
                                }
                                error={
                                    <div className="flex items-center justify-center h-[600px] w-[450px] bg-white">
                                        <p className="text-neutral-400 text-sm">PDF 로드 실패</p>
                                    </div>
                                }
                            >
                                <Page
                                    pageNumber={currentPage}
                                    scale={scale}
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                />
                            </Document>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* 하단 네비게이션 */}
            <div className="flex items-center justify-center gap-3 px-6 py-3 border-t border-neutral-200">
                <button
                    onClick={() => flipTo(currentPage - 1)}
                    disabled={currentPage <= 1 || isFlipping}
                    className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-bold text-neutral-500 border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 transition-all"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(numPages, 7) }, (_, i) => {
                        let pageNum: number
                        if (numPages <= 7) {
                            pageNum = i + 1
                        } else if (currentPage <= 4) {
                            pageNum = i + 1
                        } else if (currentPage >= numPages - 3) {
                            pageNum = numPages - 6 + i
                        } else {
                            pageNum = currentPage - 3 + i
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => flipTo(pageNum)}
                                className={`w-7 h-7 flex items-center justify-center text-[11px] font-bold transition-all ${
                                    currentPage === pageNum
                                        ? 'bg-neutral-900 text-white'
                                        : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
                                }`}
                            >
                                {pageNum}
                            </button>
                        )
                    })}
                </div>

                <button
                    onClick={() => flipTo(currentPage + 1)}
                    disabled={currentPage >= numPages || isFlipping}
                    className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-bold text-neutral-500 border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 transition-all"
                >
                    <ChevronRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}
