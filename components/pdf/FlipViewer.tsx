'use client'

import { useState, useRef, useCallback, useEffect, forwardRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import HTMLFlipBook from 'react-pageflip'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2, Minimize2 } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface FlipViewerProps {
    fileUrl: string
    fileName?: string
}

// react-pageflip은 forwardRef가 필요
const PageView = forwardRef<HTMLDivElement, { pageNumber: number; width: number; height: number; fileUrl: string }>(
    ({ pageNumber, width, height, fileUrl }, ref) => {
        return (
            <div ref={ref} className="bg-white flex items-center justify-center" style={{ width, height }}>
                <Document file={fileUrl} loading={null} error={null}>
                    <Page
                        pageNumber={pageNumber}
                        width={width}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </Document>
            </div>
        )
    }
)
PageView.displayName = 'PageView'

// 커버 페이지 (표지/뒤표지)
const CoverPage = forwardRef<HTMLDivElement, { children: React.ReactNode; width: number; height: number }>(
    ({ children, width, height }, ref) => {
        return (
            <div ref={ref} className="bg-white flex items-center justify-center shadow-lg" style={{ width, height }}>
                {children}
            </div>
        )
    }
)
CoverPage.displayName = 'CoverPage'

export function FlipViewer({ fileUrl, fileName = 'document.pdf' }: FlipViewerProps) {
    const [numPages, setNumPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [dimensions, setDimensions] = useState({ width: 500, height: 700 })
    const flipBookRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }, [])

    // 컨테이너 크기에 맞게 페이지 사이즈 조정
    useEffect(() => {
        const updateSize = () => {
            if (!containerRef.current) return
            const container = containerRef.current
            const maxW = container.clientWidth * 0.45 // 펼침면이 아닌 단면이므로 약간 여유
            const maxH = container.clientHeight - 20
            const ratio = 210 / 297 // A4 비율
            let w = Math.min(maxW, maxH * ratio)
            let h = w / ratio
            if (h > maxH) {
                h = maxH
                w = h * ratio
            }
            setDimensions({ width: Math.floor(w), height: Math.floor(h) })
        }
        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [isFullscreen])

    const onFlip = useCallback((e: any) => {
        setCurrentPage(e.data)
    }, [])

    const goNext = () => flipBookRef.current?.pageFlip()?.flipNext()
    const goPrev = () => flipBookRef.current?.pageFlip()?.flipPrev()

    const toggleFullscreen = () => {
        if (!containerRef.current) return
        if (!isFullscreen) {
            containerRef.current.requestFullscreen?.()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen?.()
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    return (
        <div
            ref={containerRef}
            className={`flex flex-col bg-white ${isFullscreen ? 'fixed inset-0 z-[999]' : 'h-full'}`}
        >
            {/* 상단 툴바 */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-white">
                <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold text-neutral-900 truncate max-w-xs">{fileName}</h3>
                    <span className="text-[11px] font-bold text-neutral-400 tabular-nums">
                        {currentPage + 1} / {numPages}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={toggleFullscreen}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                        title={isFullscreen ? '축소' : '전체화면'}
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
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

            {/* 플립북 영역 */}
            <div className="flex-1 flex items-center justify-center bg-neutral-100 relative overflow-hidden py-8">
                {/* 좌측 넘김 버튼 */}
                <button
                    onClick={goPrev}
                    disabled={currentPage <= 0}
                    className="absolute left-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 disabled:opacity-20 transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 숨겨진 Document로 전체 페이지 수 로드 */}
                <div className="hidden">
                    <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} />
                </div>

                {/* FlipBook */}
                {numPages > 0 && (
                    <HTMLFlipBook
                        ref={flipBookRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        size="fixed"
                        minWidth={300}
                        maxWidth={800}
                        minHeight={420}
                        maxHeight={1120}
                        showCover={false}
                        mobileScrollSupport={true}
                        onFlip={onFlip}
                        className="flip-book-shadow"
                        style={{}}
                        startPage={0}
                        drawShadow={true}
                        flippingTime={600}
                        usePortrait={true}
                        startZIndex={0}
                        autoSize={false}
                        maxShadowOpacity={0.3}
                        showPageCorners={true}
                        disableFlipByClick={false}
                        swipeDistance={30}
                        clickEventForward={true}
                        useMouseEvents={true}
                    >
                        {Array.from({ length: numPages }, (_, i) => (
                            <PageView
                                key={i}
                                pageNumber={i + 1}
                                width={dimensions.width}
                                height={dimensions.height}
                                fileUrl={fileUrl}
                            />
                        ))}
                    </HTMLFlipBook>
                )}

                {/* 우측 넘김 버튼 */}
                <button
                    onClick={goNext}
                    disabled={currentPage >= numPages - 1}
                    className="absolute right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 disabled:opacity-20 transition-all"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* 하단 페이지 표시 */}
            <div className="flex items-center justify-center gap-3 px-6 py-3 border-t border-neutral-200 bg-white">
                <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(numPages, 9) }, (_, i) => {
                        let pageNum: number
                        if (numPages <= 9) {
                            pageNum = i
                        } else if (currentPage <= 4) {
                            pageNum = i
                        } else if (currentPage >= numPages - 5) {
                            pageNum = numPages - 9 + i
                        } else {
                            pageNum = currentPage - 4 + i
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => flipBookRef.current?.pageFlip()?.turnToPage(pageNum)}
                                className={`w-7 h-7 flex items-center justify-center text-[11px] font-bold transition-all ${
                                    currentPage === pageNum
                                        ? 'bg-neutral-900 text-white'
                                        : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
                                }`}
                            >
                                {pageNum + 1}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
