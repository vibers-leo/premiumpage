'use client'

import { Type, Image as ImageIcon, Square, Layout, CreditCard, Heading, FileText, Grid, FormInput } from 'lucide-react'
import { useBuilderStore } from '@/lib/builder-store'

const componentTemplates = [
    {
        type: 'text' as const,
        icon: Type,
        label: '텍스트',
        template: {
            content: '텍스트를 입력하세요',
            styles: {
                fontSize: '16px',
                color: '#000000'
            }
        }
    },
    {
        type: 'image' as const,
        icon: ImageIcon,
        label: '이미지',
        template: {
            content: '',
            styles: {
                width: '100%',
                height: 'auto'
            },
            props: {
                src: 'https://via.placeholder.com/400x300',
                alt: '이미지'
            }
        }
    },
    {
        type: 'button' as const,
        icon: Square,
        label: '버튼',
        template: {
            content: '버튼',
            styles: {
                backgroundColor: '#3B82F6',
                color: '#FFFFFF',
                padding: '12px 24px'
            },
            props: {
                href: '#'
            }
        }
    },
    {
        type: 'header' as const,
        icon: Heading,
        label: '헤더',
        template: {
            content: '사이트 제목',
            styles: {
                padding: '20px 24px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }
    },
    {
        type: 'footer' as const,
        icon: FileText,
        label: '푸터',
        template: {
            content: '© 2024 회사명. All rights reserved.',
            styles: {
                padding: '32px 24px',
                backgroundColor: '#1F2937',
                color: '#FFFFFF',
                textAlign: 'center' as const
            }
        }
    },
    {
        type: 'gallery' as const,
        icon: Grid,
        label: '갤러리',
        template: {
            content: '이미지 갤러리',
            styles: {
                display: 'grid',
                gap: '16px',
                padding: '24px'
            },
            props: {
                images: [
                    'https://via.placeholder.com/300',
                    'https://via.placeholder.com/300',
                    'https://via.placeholder.com/300'
                ],
                columns: 3
            }
        }
    },
    {
        type: 'input' as const,
        icon: FormInput,
        label: '입력 필드',
        template: {
            content: '',
            styles: {
                padding: '12px 16px',
                backgroundColor: '#FFFFFF',
                width: '100%'
            },
            props: {
                placeholder: '입력하세요...'
            }
        }
    },
    {
        type: 'section' as const,
        icon: Layout,
        label: '섹션',
        template: {
            content: '섹션 내용',
            styles: {
                padding: '48px 24px',
                backgroundColor: '#F9FAFB'
            }
        }
    },
    {
        type: 'card' as const,
        icon: CreditCard,
        label: '카드',
        template: {
            content: '카드 내용',
            styles: {
                padding: '24px',
                backgroundColor: '#FFFFFF',
                margin: '16px 0'
            }
        }
    }
]

export function ComponentPalette() {
    const addComponent = useBuilderStore((state) => state.addComponent)

    const handleAddComponent = (template: typeof componentTemplates[0]) => {
        const newComponent = {
            id: `${template.type}-${Date.now()}`,
            type: template.type,
            ...template.template
        }
        addComponent(newComponent)
    }

    return (
        <div className="p-4">
            <h2 className="imweb-heading-4 mb-4">컴포넌트</h2>
            <div className="space-y-2">
                {componentTemplates.map((template) => (
                    <button
                        key={template.type}
                        onClick={() => handleAddComponent(template)}
                        className="w-full imweb-btn imweb-btn-secondary text-left flex items-center gap-3"
                    >
                        <template.icon className="w-5 h-5" />
                        <span>{template.label}</span>
                    </button>
                ))}
            </div>

            <div className="mt-8">
                <h3 className="imweb-heading-4 mb-4">가이드</h3>
                <div className="imweb-body-sm space-y-2 text-gray-600">
                    <p>1. 원하는 컴포넌트를 클릭하여 추가</p>
                    <p>2. 캔버스에서 컴포넌트 선택</p>
                    <p>3. 오른쪽 패널에서 속성 편집</p>
                    <p>4. 드래그하여 순서 변경</p>
                </div>
            </div>
        </div>
    )
}
