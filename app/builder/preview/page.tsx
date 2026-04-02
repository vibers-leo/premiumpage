'use client'

import { useEffect, useState } from 'react'
import { BuilderComponent } from '@/lib/builder-store'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PreviewPage() {
    const [components, setComponents] = useState<BuilderComponent[]>([])

    useEffect(() => {
        const data = localStorage.getItem('builder-preview')
        if (data) {
            setComponents(JSON.parse(data))
        }
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white border-b px-6 py-4 sticky top-0 z-50">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <Link href="/builder" className="imweb-btn imweb-btn-secondary flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        빌더로 돌아가기
                    </Link>
                    <h1 className="imweb-heading-4">미리보기</h1>
                    <div className="w-32" /> {/* Spacer */}
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8">
                {components.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="imweb-body-lg text-gray-500">
                            컴포넌트가 없습니다
                        </p>
                    </div>
                ) : (
                    <div className="space-y-0">
                        {components.map((component) => (
                            <ComponentRenderer key={component.id} component={component} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

function ComponentRenderer({ component }: { component: BuilderComponent }) {
    const styles = component.styles

    switch (component.type) {
        case 'text':
            return <div style={styles}>{component.content}</div>

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
                <a
                    href={component.props?.href}
                    style={styles}
                    className="inline-block rounded-md font-semibold"
                >
                    {component.content}
                </a>
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
