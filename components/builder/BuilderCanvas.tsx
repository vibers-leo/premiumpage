'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useBuilderStore, BuilderComponent } from '@/lib/builder-store'
import { Trash2, GripVertical } from 'lucide-react'

export function BuilderCanvas() {
    const components = useBuilderStore((state) => state.components)

    if (components.length === 0) {
        return (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <p className="imweb-body-lg text-gray-500">
                    왼쪽에서 컴포넌트를 추가하여 시작하세요
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-[600px]">
            {components.map((component) => (
                <SortableComponent key={component.id} component={component} />
            ))}
        </div>
    )
}

function SortableComponent({ component }: { component: BuilderComponent }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: component.id
    })

    const { selectedComponent, selectComponent, removeComponent } = useBuilderStore()
    const isSelected = selectedComponent === component.id

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    }

    const handleClick = () => {
        selectComponent(component.id)
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        removeComponent(component.id)
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={handleClick}
            className={`group relative mb-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-300'
                }`}
        >
            {/* 드래그 핸들 */}
            <div
                {...attributes}
                {...listeners}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
            >
                <GripVertical className="w-5 h-5 text-gray-400" />
            </div>

            {/* 삭제 버튼 */}
            <button
                onClick={handleDelete}
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
            >
                <Trash2 className="w-4 h-4 text-red-600" />
            </button>

            {/* 컴포넌트 렌더링 */}
            <ComponentRenderer component={component} />
        </div>
    )
}

function ComponentRenderer({ component }: { component: BuilderComponent }) {
    const styles = component.styles

    switch (component.type) {
        case 'text':
            return (
                <div style={styles}>
                    {component.content}
                </div>
            )

        case 'image':
            return (
                <img
                    src={component.props?.src}
                    alt={component.props?.alt}
                    style={styles}
                />
            )

        case 'button':
            return (
                <button
                    style={styles}
                    className="rounded-md font-semibold"
                >
                    {component.content}
                </button>
            )

        case 'header':
            return (
                <header style={styles} className="border-b">
                    <div className="font-bold text-lg">{component.content}</div>
                    <div className="text-sm text-gray-600">메뉴</div>
                </header>
            )

        case 'footer':
            return (
                <footer style={styles} className="rounded-lg">
                    {component.content}
                </footer>
            )

        case 'gallery':
            return (
                <div style={{
                    ...styles,
                    gridTemplateColumns: `repeat(${component.props?.columns || 3}, 1fr)`
                }}>
                    {component.props?.images?.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-auto rounded-lg"
                        />
                    ))}
                </div>
            )

        case 'input':
            return (
                <input
                    type="text"
                    placeholder={component.props?.placeholder}
                    style={styles}
                    className="border rounded-md"
                />
            )

        case 'section':
            return (
                <div style={styles} className="rounded-lg">
                    {component.content}
                </div>
            )

        case 'card':
            return (
                <div style={styles} className="rounded-lg border">
                    {component.content}
                </div>
            )

        default:
            return <div>{component.content}</div>
    }
}
