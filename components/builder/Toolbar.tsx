'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useBuilderStore } from '@/lib/builder-store'
import { Save, FolderOpen, Trash2, Eye, Download, Home, Undo, Redo, Cloud, LogIn } from 'lucide-react'

export function Toolbar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const projectId = searchParams.get('id')
    const { data: session } = useSession()
    const { components, clearAll, loadComponents, undo, redo, canUndo, canRedo } = useBuilderStore()

    const [showSaveDialog, setShowSaveDialog] = useState(false)
    const [showLoadDialog, setShowLoadDialog] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleLocalSave = () => {
        const data = JSON.stringify(components, null, 2)
        localStorage.setItem('builder-components', data)

        // 다운로드
        const blob = new Blob([data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `website-${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)

        setShowSaveDialog(true)
        setTimeout(() => setShowSaveDialog(false), 2000)
    }

    const handleCloudSave = async () => {
        if (!session) return
        setIsSaving(true)

        try {
            const isNew = !projectId
            const url = isNew ? '/api/projects' : `/api/projects/${projectId}`
            const method = isNew ? 'POST' : 'PUT'

            // 프로젝트 이름 입력 (새 프로젝트인 경우)
            let name = '새 프로젝트'
            if (isNew) {
                const input = prompt('프로젝트 이름을 입력하세요:', '나의 멋진 웹사이트')
                if (!input) {
                    setIsSaving(false)
                    return
                }
                name = input
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: isNew ? name : undefined,
                    components,
                    description: 'Builder로 생성된 프로젝트'
                })
            })

            if (res.ok) {
                const data = await res.json()
                setShowSaveDialog(true)
                setTimeout(() => setShowSaveDialog(false), 2000)

                if (isNew) {
                    router.push(`/builder?id=${data.id}`)
                }
            } else {
                alert('저장 실패')
            }
        } catch (error) {
            console.error('Save failed', error)
            alert('저장 중 오류가 발생했습니다')
        } finally {
            setIsSaving(false)
        }
    }

    const handleLoad = () => {
        const data = localStorage.getItem('builder-components')
        if (data) {
            const parsed = JSON.parse(data)
            loadComponents(parsed)
            setShowLoadDialog(true)
            setTimeout(() => setShowLoadDialog(false), 2000)
        }
    }

    const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target?.result as string)
                    loadComponents(data)
                    setShowLoadDialog(true)
                    setTimeout(() => setShowLoadDialog(false), 2000)
                } catch (error) {
                    alert('파일을 불러올 수 없습니다')
                }
            }
            reader.readAsText(file)
        }
    }

    const handlePreview = () => {
        const data = JSON.stringify(components)
        localStorage.setItem('builder-preview', data)
        window.open('/builder/preview', '_blank')
    }

    const handleClear = () => {
        if (confirm('모든 컴포넌트를 삭제하시겠습니까?')) {
            clearAll()
        }
    }

    return (
        <header className="bg-white border-b px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80">
                        <Home className="w-5 h-5" />
                        <span className="font-bold">Premium Page</span>
                    </Link>
                    <span className="text-gray-300">|</span>
                    <h1 className="imweb-heading-4">웹사이트 빌더</h1>
                    {projectId && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Cloud Mode</span>}
                </div>

                <div className="flex items-center gap-2">
                    {/* 실행 취소/다시 실행 */}
                    <button
                        onClick={undo}
                        disabled={!canUndo()}
                        className="imweb-btn imweb-btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="실행 취소 (Ctrl+Z)"
                    >
                        <Undo className="w-4 h-4" />
                    </button>

                    <button
                        onClick={redo}
                        disabled={!canRedo()}
                        className="imweb-btn imweb-btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="다시 실행 (Ctrl+Y)"
                    >
                        <Redo className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-2" />

                    {/* 저장 버튼 그룹 */}
                    <button
                        onClick={handleLocalSave}
                        className="imweb-btn imweb-btn-secondary flex items-center gap-2"
                        title="로컬 저장 및 다운로드"
                    >
                        <Download className="w-4 h-4" />
                        내보내기
                    </button>

                    {session ? (
                        <button
                            onClick={handleCloudSave}
                            disabled={isSaving}
                            className="imweb-btn imweb-btn-primary flex items-center gap-2"
                        >
                            <Cloud className="w-4 h-4" />
                            {isSaving ? '저장 중...' : (projectId ? '클라우드 저장' : '프로젝트 생성')}
                        </button>
                    ) : (
                        <Link href="/login" className="imweb-btn imweb-btn-secondary flex items-center gap-2 text-blue-600">
                            <LogIn className="w-4 h-4" />
                            로그인하여 저장
                        </Link>
                    )}

                    <div className="w-px h-6 bg-gray-300 mx-2" />

                    <button
                        onClick={handleLoad}
                        className="imweb-btn imweb-btn-secondary flex items-center gap-2"
                    >
                        <FolderOpen className="w-4 h-4" />
                        불러오기
                    </button>

                    <label className="imweb-btn imweb-btn-secondary flex items-center gap-2 cursor-pointer">
                        <Download className="w-4 h-4" />
                        파일 열기
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleLoadFile}
                            className="hidden"
                        />
                    </label>

                    <button
                        onClick={handlePreview}
                        className="imweb-btn imweb-btn-primary flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        미리보기
                    </button>

                    <button
                        onClick={handleClear}
                        className="imweb-btn imweb-btn-ghost flex items-center gap-2 text-red-600"
                    >
                        <Trash2 className="w-4 h-4" />
                        전체 삭제
                    </button>
                </div>
            </div>

            {/* 저장 알림 */}
            {showSaveDialog && (
                <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    ✓ 저장되었습니다!
                </div>
            )}

            {/* 불러오기 알림 */}
            {showLoadDialog && (
                <div className="fixed top-20 right-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    ✓ 불러왔습니다!
                </div>
            )}
        </header>
    )
}
