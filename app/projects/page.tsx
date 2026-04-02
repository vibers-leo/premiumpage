'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, FolderOpen, MoreVertical, Trash2, Edit2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Project {
    id: string
    name: string
    description?: string
    updatedAt: string
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects')
            if (res.ok) {
                const data = await res.json()
                setProjects(data)
            }
        } catch (error) {
            console.error('Failed to fetch projects', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                fetchProjects()
            }
        } catch (error) {
            alert('삭제 실패')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <header className="bg-white border-b px-6 py-4">
                <div className="imweb-container flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">P</div>
                        <span className="font-bold text-lg">Premium Page</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">내 프로젝트</span>
                        <Link href="/builder" className="imweb-btn imweb-btn-primary flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            새 프로젝트
                        </Link>
                    </div>
                </div>
            </header>

            <main className="imweb-container py-12">
                <h1 className="imweb-heading-2 mb-8">내 프로젝트</h1>

                {isLoading ? (
                    <div className="text-center py-20">로딩 중...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">프로젝트가 없습니다</h3>
                        <p className="text-gray-500 mb-6">새로운 웹사이트를 만들어보세요</p>
                        <Link href="/builder" className="imweb-btn imweb-btn-primary inline-flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            새 프로젝트 시작하기
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div key={project.id} className="imweb-card hover:shadow-lg transition group relative">
                                <Link href={`/builder?id=${project.id}`} className="block p-6">
                                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                                        <FolderOpen className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true, locale: ko })}
                                    </p>
                                </Link>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleDelete(project.id)
                                        }}
                                        className="p-2 bg-white rounded-md shadow hover:bg-red-50 text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
