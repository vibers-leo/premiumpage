'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MessageSquare, Calendar, CheckCircle, Clock, FileText } from 'lucide-react'

interface Project {
    id: string
    name: string
    description: string
    components: string
    thumbnail: string | null
    createdAt: string
    updatedAt: string
}

export default function CustomerDashboard() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects')
            if (!response.ok) throw new Error('Failed to fetch')
            const data = await response.json()
            setProjects(data)
        } catch (error) {
            console.error('Failed to fetch projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const deleteProject = async (id: string) => {
        if (!confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) return

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                setProjects(projects.filter(p => p.id !== id))
            } else {
                alert('삭제에 실패했습니다.')
            }
        } catch (error) {
            console.error('Delete failed:', error)
            alert('오류가 발생했습니다.')
        }
    }

    const parseComponents = (componentsStr: string) => {
        try {
            return JSON.parse(componentsStr)
        } catch (e) {
            return {}
        }
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* 배경 애니메이션 */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
            </div>

            <header className="glass-dark border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                PP
                            </div>
                            <span className="font-bold text-xl gradient-text">내 대시보드</span>
                        </Link>
                        <div className="flex gap-2">
                            <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800">
                                <Link href="/">← 홈</Link>
                            </Button>
                            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                                <Link href="/quote">새 프로젝트</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 gradient-text">내 프로젝트</h1>
                    <p className="text-gray-400">진행 중인 프로젝트를 관리하고 진행 상황을 확인하세요</p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400">로딩 중...</p>
                    </div>
                ) : projects.length === 0 ? (
                    <Card className="bg-card/50 backdrop-blur border-white/10">
                        <CardContent className="py-12 text-center">
                            <p className="text-gray-400 mb-4">아직 진행 중인 프로젝트가 없습니다.</p>
                            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                                <Link href="/quote">첫 프로젝트 시작하기</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {projects.map((project) => {
                            const components = parseComponents(project.components)
                            return (
                                <Card key={project.id} className="bg-card/50 backdrop-blur border-white/10 hover:border-purple-500/50 transition">
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                                    <FileText className="w-8 h-8 text-purple-400" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-2xl mb-2">{project.name}</CardTitle>
                                                    <CardDescription>
                                                        {components.fileName || 'PDF 변환 프로젝트'} • {(components.fileSize / 1024 / 1024).toFixed(2)} MB
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                                완료
                                            </Badge>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                    <Calendar className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400">생성일</p>
                                                    <p className="text-white font-bold">
                                                        {new Date(project.createdAt).toLocaleDateString('ko-KR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400">마지막 수정</p>
                                                    <p className="text-white font-bold">
                                                        {new Date(project.updatedAt).toLocaleDateString('ko-KR')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                                                <Link href={components.fileUrl || '#'}>
                                                    실시간 뷰어로 보기
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                                onClick={() => deleteProject(project.id)}
                                            >
                                                삭제하기
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}

                {/* 견적 요청 현황 */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-white">서비스 이용 현황</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-card/50 backdrop-blur border-white/10">
                            <CardHeader>
                                <CardTitle className="text-purple-400">내 카탈로그 프로젝트</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-white">{projects.length}</p>
                                <p className="text-sm text-gray-400 mt-2">지금까지 변환된 전자 카탈로그 개수</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur border-white/10">
                            <CardHeader>
                                <CardTitle className="text-blue-400">계정 등급</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-white">Free</p>
                                <p className="text-sm text-gray-400 mt-2">현재 이용 중인 플랜</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
