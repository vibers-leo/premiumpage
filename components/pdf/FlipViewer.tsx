'use client'

import { useState, useRef, useCallback, useEffect, forwardRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, Loader2, Music, Volume2, VolumeX } from 'lucide-react'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface FlipViewerProps {
    fileUrl: string
    fileName?: string
}

// react-pageflip에 넘길 단일 페이지 — 정적 이미지라서 플립 중에도 끊김 없음
const FlipPage = forwardRef<HTMLDivElement, { src: string; width: number; height: number }>(
    ({ src, width, height }, ref) => (
        <div
            ref={ref}
            style={{ width, height, overflow: 'hidden', background: '#fff' }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt=""
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block', userSelect: 'none' }}
            />
        </div>
    )
)
FlipPage.displayName = 'FlipPage'

export function FlipViewer({ fileUrl, fileName = 'document.pdf' }: FlipViewerProps) {
    const [pageImages, setPageImages] = useState<string[]>([])
    const [loadProgress, setLoadProgress] = useState({ cur: 0, total: 0 })
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [dimensions, setDimensions] = useState({ width: 460, height: 650 })
    const [sfxEnabled, setSfxEnabled] = useState(true)
    const [musicEnabled, setMusicEnabled] = useState(false)
    const flipBookRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const audioCtxRef = useRef<AudioContext | null>(null)
    const musicGainRef = useRef<GainNode | null>(null)
    const musicOscillatorsRef = useRef<OscillatorNode[]>([])

    // ── PDF → 캔버스 이미지 사전 렌더링
    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setLoadError(null)
        setPageImages([])
        setCurrentPage(0)

        async function render() {
            try {
                const pdfjsLib = await import('pdfjs-dist')
                pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

                const pdf = await pdfjsLib.getDocument(fileUrl).promise
                const total = pdf.numPages
                if (cancelled) return

                setLoadProgress({ cur: 0, total })

                const scale = 2.0
                const images: string[] = []

                for (let i = 1; i <= total; i++) {
                    if (cancelled) return
                    const page = await pdf.getPage(i)
                    const viewport = page.getViewport({ scale })
                    const canvas = document.createElement('canvas')
                    canvas.width = viewport.width
                    canvas.height = viewport.height
                    const ctx = canvas.getContext('2d')!
                    await page.render({ canvasContext: ctx, viewport }).promise
                    images.push(canvas.toDataURL('image/jpeg', 0.92))
                    setLoadProgress({ cur: i, total })
                }

                if (!cancelled) {
                    setPageImages(images)
                    setLoading(false)
                }
            } catch (err: any) {
                if (!cancelled) {
                    setLoadError(err.message || '로드 실패')
                    setLoading(false)
                }
            }
        }

        render()
        return () => { cancelled = true }
    }, [fileUrl])

    // ── 컨테이너 크기 → 페이지 치수 계산
    useEffect(() => {
        const update = () => {
            if (!containerRef.current) return
            const w = containerRef.current.clientWidth
            const h = containerRef.current.clientHeight - 96

            const ratio = 0.707
            const singleW = Math.min(w * 0.47, h * ratio, 560)
            const singleH = singleW / ratio

            setDimensions({ width: Math.floor(singleW), height: Math.floor(singleH) })
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [isFullscreen])

    // ── AudioContext 공유 헬퍼
    const getAudioCtx = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
        if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume()
        return audioCtxRef.current
    }, [])

    // ── 효과음
    const playFlipSound = useCallback(() => {
        if (!sfxEnabled) return
        try {
            const ctx = getAudioCtx()
            const duration = 0.18
            const bufferSize = Math.floor(ctx.sampleRate * duration)
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1

            const source = ctx.createBufferSource()
            source.buffer = buffer

            const filter = ctx.createBiquadFilter()
            filter.type = 'bandpass'
            filter.frequency.value = 2800
            filter.Q.value = 0.6

            const gain = ctx.createGain()
            gain.gain.setValueAtTime(0, ctx.currentTime)
            gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.012)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

            source.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)
            source.start()
            source.stop(ctx.currentTime + duration)
        } catch { /* 미지원 환경 무시 */ }
    }, [sfxEnabled, getAudioCtx])

    // ── 배경음악 시작
    const startMusic = useCallback(() => {
        try {
            const ctx = getAudioCtx()
            const masterGain = ctx.createGain()
            masterGain.gain.setValueAtTime(0, ctx.currentTime)
            masterGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 2.5)
            masterGain.connect(ctx.destination)
            musicGainRef.current = masterGain

            // Am 코드 — 조용한 앰비언트 분위기
            const freqs = [110, 130.81, 164.81, 220, 261.63, 329.63]
            const oscs = freqs.map((freq, idx) => {
                const osc = ctx.createOscillator()
                osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
                osc.frequency.value = freq

                // 미세한 디튠으로 공간감
                const detune = (idx - freqs.length / 2) * 1.2
                osc.detune.value = detune

                // 각 음마다 개별 gain으로 밸런스 조정
                const oscGain = ctx.createGain()
                oscGain.gain.value = idx < 3 ? 0.6 : 0.4
                osc.connect(oscGain)
                oscGain.connect(masterGain)
                osc.start()
                return osc
            })

            // 느린 트레몰로 LFO (0.12Hz, ±15%)
            const lfo = ctx.createOscillator()
            lfo.frequency.value = 0.12
            const lfoGain = ctx.createGain()
            lfoGain.gain.value = 0.012
            lfo.connect(lfoGain)
            lfoGain.connect(masterGain.gain)
            lfo.start()
            oscs.push(lfo)

            musicOscillatorsRef.current = oscs
        } catch { /* 미지원 환경 무시 */ }
    }, [getAudioCtx])

    // ── 배경음악 정지
    const stopMusic = useCallback(() => {
        const ctx = audioCtxRef.current
        const gain = musicGainRef.current
        if (!ctx || !gain) return
        const stopAt = ctx.currentTime + 1.5
        gain.gain.linearRampToValueAtTime(0, stopAt)
        setTimeout(() => {
            musicOscillatorsRef.current.forEach(osc => { try { osc.stop() } catch { } })
            musicOscillatorsRef.current = []
            musicGainRef.current = null
        }, 1600)
    }, [])

    // ── musicEnabled 변경 시 음악 제어
    useEffect(() => {
        if (musicEnabled) startMusic()
        else stopMusic()
    }, [musicEnabled]) // eslint-disable-line react-hooks/exhaustive-deps

    // ── 언마운트 시 음악 정지
    useEffect(() => {
        return () => { stopMusic() }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onFlip = useCallback((e: any) => {
        setCurrentPage(e.data)
        playFlipSound()
    }, [playFlipSound])

    const goNext = () => flipBookRef.current?.pageFlip()?.flipNext()
    const goPrev = () => flipBookRef.current?.pageFlip()?.flipPrev()

    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return
        if (!isFullscreen) {
            containerRef.current.requestFullscreen?.()
        } else {
            document.exitFullscreen?.()
        }
    }, [isFullscreen])

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', handler)
        return () => document.removeEventListener('fullscreenchange', handler)
    }, [])

    const numPages = pageImages.length

    return (
        <div
            ref={containerRef}
            className={`flex flex-col bg-neutral-100 select-none ${isFullscreen ? 'fixed inset-0 z-[999]' : 'h-full'}`}
        >
            {/* 상단 툴바 */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-neutral-200 bg-white flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-neutral-900 truncate max-w-[240px]">{fileName}</span>
                    {!loading && (
                        <span className="text-[11px] font-bold text-neutral-400 tabular-nums">
                            {currentPage + 1} / {numPages}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {/* 배경음악 토글 */}
                    <button
                        onClick={() => setMusicEnabled(v => !v)}
                        title={musicEnabled ? '배경음악 끄기' : '배경음악 켜기'}
                        className={`w-8 h-8 flex items-center justify-center transition-colors relative ${musicEnabled ? 'text-neutral-900' : 'text-neutral-300 hover:text-neutral-500'}`}
                    >
                        <Music className="w-4 h-4" />
                        {!musicEnabled && (
                            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="w-5 h-px bg-current rotate-45 block" />
                            </span>
                        )}
                    </button>
                    {/* 효과음 토글 */}
                    <button
                        onClick={() => setSfxEnabled(v => !v)}
                        title={sfxEnabled ? '효과음 끄기' : '효과음 켜기'}
                        className={`w-8 h-8 flex items-center justify-center transition-colors ${sfxEnabled ? 'text-neutral-900' : 'text-neutral-300 hover:text-neutral-500'}`}
                    >
                        {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                    <div className="w-px h-4 bg-neutral-200 mx-1" />
                    <button onClick={toggleFullscreen} title={isFullscreen ? '축소' : '전체화면'}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors">
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    <div className="w-px h-4 bg-neutral-200 mx-1" />
                    <a href={fileUrl} download={fileName}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors">
                        <Download className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* 본문 */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden py-6">
                {loading ? (
                    <div className="flex flex-col items-center gap-4 text-neutral-400">
                        <Loader2 className="w-7 h-7 animate-spin" />
                        <div className="text-center">
                            <p className="text-sm font-bold">
                                {loadProgress.total > 0
                                    ? `페이지 렌더링 중 ${loadProgress.cur} / ${loadProgress.total}`
                                    : 'PDF 로딩 중...'}
                            </p>
                            {loadProgress.total > 0 && (
                                <div className="mt-2 w-48 h-1 bg-neutral-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-neutral-900 transition-all duration-200"
                                        style={{ width: `${(loadProgress.cur / loadProgress.total) * 100}%` }}
                                    />
                                </div>
                            )}
                            <p className="text-xs text-neutral-400 mt-2">처음 한 번만 렌더링합니다</p>
                        </div>
                    </div>
                ) : loadError ? (
                    <div className="text-center text-neutral-400">
                        <p className="text-sm font-bold text-red-500 mb-2">로드 실패</p>
                        <p className="text-xs">{loadError}</p>
                    </div>
                ) : (
                    <>
                        {/* 이전 버튼 */}
                        <button onClick={goPrev} disabled={currentPage <= 0}
                            className="absolute left-3 z-10 w-10 h-10 flex items-center justify-center bg-white/90 border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 disabled:opacity-20 transition-all shadow-sm">
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <HTMLFlipBook
                            ref={flipBookRef}
                            width={dimensions.width}
                            height={dimensions.height}
                            size="fixed"
                            minWidth={260}
                            maxWidth={700}
                            minHeight={368}
                            maxHeight={990}
                            showCover={true}
                            mobileScrollSupport={false}
                            onFlip={onFlip}
                            className=""
                            style={{}}
                            startPage={0}
                            drawShadow={true}
                            flippingTime={700}
                            usePortrait={false}
                            startZIndex={0}
                            autoSize={false}
                            maxShadowOpacity={0.5}
                            showPageCorners={true}
                            disableFlipByClick={false}
                            swipeDistance={20}
                            clickEventForward={false}
                            useMouseEvents={true}
                        >
                            {pageImages.map((src, i) => (
                                <FlipPage
                                    key={i}
                                    src={src}
                                    width={dimensions.width}
                                    height={dimensions.height}
                                />
                            ))}
                        </HTMLFlipBook>

                        {/* 다음 버튼 */}
                        <button onClick={goNext} disabled={currentPage >= numPages - 1}
                            className="absolute right-3 z-10 w-10 h-10 flex items-center justify-center bg-white/90 border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 disabled:opacity-20 transition-all shadow-sm">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* 하단 페이지 점 네비게이터 */}
            {!loading && !loadError && numPages > 0 && (
                <div className="flex items-center justify-center gap-1.5 px-5 py-3 border-t border-neutral-200 bg-white flex-shrink-0">
                    {Array.from({ length: Math.min(numPages, 11) }, (_, i) => {
                        let p: number
                        if (numPages <= 11) p = i
                        else if (currentPage <= 5) p = i
                        else if (currentPage >= numPages - 6) p = numPages - 11 + i
                        else p = currentPage - 5 + i

                        return (
                            <button key={p}
                                onClick={() => flipBookRef.current?.pageFlip()?.turnToPage(p)}
                                className={`transition-all rounded-full ${
                                    currentPage === p
                                        ? 'w-5 h-2 bg-neutral-900'
                                        : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-500'
                                }`}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
