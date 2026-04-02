'use client'

import { useBuilderStore } from '@/lib/builder-store'

export function PropertiesPanel() {
    const { components, selectedComponent, updateComponent } = useBuilderStore()

    const component = components.find((c) => c.id === selectedComponent)

    if (!component) {
        return (
            <div className="p-6">
                <h2 className="imweb-heading-4 mb-4">속성</h2>
                <p className="imweb-body text-gray-500">
                    컴포넌트를 선택하세요
                </p>
            </div>
        )
    }

    const handleContentChange = (value: string) => {
        updateComponent(component.id, { content: value })
    }

    const handleStyleChange = (key: string, value: string) => {
        updateComponent(component.id, {
            styles: { ...component.styles, [key]: value }
        })
    }

    const handlePropChange = (key: string, value: string) => {
        updateComponent(component.id, {
            props: { ...component.props, [key]: value }
        })
    }

    return (
        <div className="p-6">
            <h2 className="imweb-heading-4 mb-6">속성 편집</h2>

            <div className="space-y-6">
                {/* 컨텐츠 */}
                <div>
                    <label className="imweb-body-sm font-semibold block mb-2">
                        내용
                    </label>
                    <textarea
                        value={component.content}
                        onChange={(e) => handleContentChange(e.target.value)}
                        className="imweb-input"
                        rows={3}
                    />
                </div>

                {/* 이미지 속성 */}
                {component.type === 'image' && (
                    <>
                        <div>
                            <label className="imweb-body-sm font-semibold block mb-2">
                                이미지 URL
                            </label>
                            <input
                                type="text"
                                value={component.props?.src || ''}
                                onChange={(e) => handlePropChange('src', e.target.value)}
                                className="imweb-input"
                            />
                        </div>
                        <div>
                            <label className="imweb-body-sm font-semibold block mb-2">
                                대체 텍스트
                            </label>
                            <input
                                type="text"
                                value={component.props?.alt || ''}
                                onChange={(e) => handlePropChange('alt', e.target.value)}
                                className="imweb-input"
                            />
                        </div>
                    </>
                )}

                {/* 버튼 링크 */}
                {component.type === 'button' && (
                    <div>
                        <label className="imweb-body-sm font-semibold block mb-2">
                            링크 URL
                        </label>
                        <input
                            type="text"
                            value={component.props?.href || ''}
                            onChange={(e) => handlePropChange('href', e.target.value)}
                            className="imweb-input"
                        />
                    </div>
                )}

                {/* 스타일 */}
                <div className="border-t pt-6">
                    <h3 className="imweb-body font-semibold mb-4">스타일</h3>

                    {/* 폰트 크기 */}
                    {(component.type === 'text' || component.type === 'button') && (
                        <div className="mb-4">
                            <label className="imweb-body-sm font-semibold block mb-2">
                                폰트 크기
                            </label>
                            <input
                                type="text"
                                value={component.styles.fontSize || ''}
                                onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                                className="imweb-input"
                                placeholder="16px"
                            />
                        </div>
                    )}

                    {/* 색상 */}
                    {(component.type === 'text' || component.type === 'button') && (
                        <div className="mb-4">
                            <label className="imweb-body-sm font-semibold block mb-2">
                                텍스트 색상
                            </label>
                            <input
                                type="color"
                                value={component.styles.color || '#000000'}
                                onChange={(e) => handleStyleChange('color', e.target.value)}
                                className="w-full h-10 rounded border"
                            />
                        </div>
                    )}

                    {/* 배경색 */}
                    <div className="mb-4">
                        <label className="imweb-body-sm font-semibold block mb-2">
                            배경색
                        </label>
                        <input
                            type="color"
                            value={component.styles.backgroundColor || '#FFFFFF'}
                            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                            className="w-full h-10 rounded border"
                        />
                    </div>

                    {/* 패딩 */}
                    <div className="mb-4">
                        <label className="imweb-body-sm font-semibold block mb-2">
                            안쪽 여백 (Padding)
                        </label>
                        <input
                            type="text"
                            value={component.styles.padding || ''}
                            onChange={(e) => handleStyleChange('padding', e.target.value)}
                            className="imweb-input"
                            placeholder="16px"
                        />
                    </div>

                    {/* 정렬 */}
                    {component.type === 'text' && (
                        <div className="mb-4">
                            <label className="imweb-body-sm font-semibold block mb-2">
                                텍스트 정렬
                            </label>
                            <select
                                value={component.styles.textAlign || 'left'}
                                onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                                className="imweb-input"
                            >
                                <option value="left">왼쪽</option>
                                <option value="center">가운데</option>
                                <option value="right">오른쪽</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
