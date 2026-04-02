'use client'

import { useState } from 'react'
import { Monitor, Tablet, Smartphone, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'

interface TemplatePreviewProps {
    demoUrl: string
    templateName: string
}

type DeviceType = 'desktop' | 'tablet' | 'mobile'

const deviceSizes = {
    desktop: { width: '100%', height: '800px', icon: Monitor, label: '데스크톱' },
    tablet: { width: '768px', height: '1024px', icon: Tablet, label: '태블릿' },
    mobile: { width: '375px', height: '667px', icon: Smartphone, label: '모바일' }
}

export function TemplatePreview({ demoUrl, templateName }: TemplatePreviewProps) {
    const [device, setDevice] = useState<DeviceType>('desktop')
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const currentDevice = deviceSizes[device]

    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black p-4' : 'relative'}`}>
            <Card className="bg-card/50 backdrop-blur border-white/10 overflow-hidden">
                {/* 컨트롤 바 */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gray-900/50">
                    <div className="flex items-center gap-2">
                        {(Object.keys(deviceSizes) as DeviceType[]).map((deviceType) => {
                            const DeviceIcon = deviceSizes[deviceType].icon
                            return (
                                <Button
                                    key={deviceType}
                                    variant={device === deviceType ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setDevice(deviceType)}
                                    className={device === deviceType ? 'bg-purple-500 hover:bg-purple-600' : ''}
                                >
                                    <DeviceIcon className="w-4 h-4 mr-2" />
                                    {deviceSizes[deviceType].label}
                                </Button>
                            )
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsFullscreen(!isFullscreen)}
                        >
                            {isFullscreen ? (
                                <>
                                    <Minimize2 className="w-4 h-4 mr-2" />
                                    축소
                                </>
                            ) : (
                                <>
                                    <Maximize2 className="w-4 h-4 mr-2" />
                                    전체화면
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                        >
                            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                                새 탭에서 열기
                            </a>
                        </Button>
                    </div>
                </div>

                {/* 프리뷰 영역 */}
                <div className={`flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black ${isFullscreen ? 'h-[calc(100vh-80px)]' : 'min-h-[600px]'}`}>
                    <div
                        className="relative bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
                        style={{
                            width: currentDevice.width,
                            height: currentDevice.height,
                            maxWidth: '100%',
                            maxHeight: '100%'
                        }}
                    >
                        {/* 로딩 인디케이터 */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-gray-400">프리뷰 로딩 중...</p>
                                </div>
                            </div>
                        )}

                        {/* iframe */}
                        <iframe
                            src={demoUrl}
                            title={`${templateName} 프리뷰`}
                            className="w-full h-full border-0"
                            onLoad={() => setIsLoading(false)}
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        />
                    </div>
                </div>

                {/* 안내 메시지 */}
                <div className="p-4 bg-gray-900/30 border-t border-white/10">
                    <p className="text-sm text-gray-400 text-center">
                        💡 실제 웹사이트와 동일한 기능을 미리 체험해보세요. 반응형 디자인을 확인하려면 다양한 기기 크기를 선택하세요.
                    </p>
                </div>
            </Card>
        </div>
    )
}
