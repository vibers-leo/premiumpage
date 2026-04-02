'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useBuilderStore, BuilderComponent } from '@/lib/builder-store'
import { ComponentPalette } from '@/components/builder/ComponentPalette'
import { BuilderCanvas } from '@/components/builder/BuilderCanvas'
import { PropertiesPanel } from '@/components/builder/PropertiesPanel'
import { Toolbar } from '@/components/builder/Toolbar'

function BuilderContent() {
    const searchParams = useSearchParams()
    const projectId = searchParams.get('id')
    const { components, reorderComponents, loadComponents } = useBuilderStore()

    useEffect(() => {
        if (projectId) {
            fetch(`/api/projects/${projectId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.components) {
                        loadComponents(data.components)
                    }
                })
                .catch(err => console.error(err))
        }
    }, [projectId, loadComponents])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = components.findIndex((c) => c.id === active.id)
            const newIndex = components.findIndex((c) => c.id === over.id)
            reorderComponents(oldIndex, newIndex)
        }
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* 상단 툴바 */}
            <Toolbar />

            {/* 메인 레이아웃 */}
            <div className="flex-1 flex overflow-hidden">
                {/* 왼쪽: 컴포넌트 팔레트 */}
                <aside className="w-64 bg-white border-r overflow-y-auto">
                    <ComponentPalette />
                </aside>

                {/* 중앙: 캔버스 */}
                <main className="flex-1 overflow-y-auto p-8">
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
                            <BuilderCanvas />
                        </SortableContext>
                    </DndContext>
                </main>

                {/* 오른쪽: 속성 패널 */}
                <aside className="w-80 bg-white border-l overflow-y-auto">
                    <PropertiesPanel />
                </aside>
            </div>
        </div>
    )
}

export default function BuilderPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <BuilderContent />
        </Suspense>
    )
}
