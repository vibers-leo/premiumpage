'use client'

import { useEffect, useState } from 'react'
import {
    Briefcase,
    User,
    Calendar,
    ExternalLink,
    Trash2,
    Eye,
    LayoutGrid,
    Search
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface ProjectSummary {
    id: string
    name: string
    description: string | null
    thumbnail: string | null
    updatedAt: string
    user: {
        name: string | null
        email: string
    }
}

export default function ProjectsManagementPage() {
    const [projects, setProjects] = useState<ProjectSummary[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/admin/projects')
            const data = await response.json()
            if (Array.isArray(data)) {
                setProjects(data)
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">포트폴리오 관리</h1>
                    <p className="text-gray-400">사용자들이 생성한 모든 전자 카탈로그 프로젝트를 관리합니다.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        <LayoutGrid className="w-4 h-4 mr-2" />
                        그리드 뷰
                    </Button>
                </div>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                    placeholder="프로젝트명 또는 사용자 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <Card key={i} className="bg-[#0a0a0a] border-white/5 animate-pulse">
                            <div className="h-48 bg-white/5 rounded-t-xl" />
                            <CardHeader><div className="h-6 bg-white/5 rounded w-1/2" /></CardHeader>
                        </Card>
                    ))
                ) : filteredProjects.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-500">
                        표시할 프로젝트가 없습니다.
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <Card key={project.id} className="bg-[#0a0a0a] border-white/5 group hover:border-indigo-500/30 transition overflow-hidden">
                            <div className="aspect-video relative overflow-hidden bg-white/5">
                                {project.thumbnail ? (
                                    <img src={project.thumbnail} alt={project.name} className="object-cover w-full h-full group-hover:scale-110 transition duration-500" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-600">
                                        <Briefcase className="w-12 h-12" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                                    <div className="flex gap-2 w-full">
                                        <Button size="sm" asChild className="flex-1 bg-white text-black hover:bg-gray-200">
                                            <Link href={`/portfolio/${project.id}`} target="_blank">
                                                <Eye className="w-3 h-3 mr-1" /> 보기
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="destructive" className="flex-1">
                                            <Trash2 className="w-3 h-3 mr-1" /> 삭제
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <CardHeader className="p-4 space-y-1">
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-base font-bold truncate group-hover:text-indigo-400 transition">
                                        {project.name}
                                    </CardTitle>
                                    <Badge variant="outline" className="text-[10px] py-0 border-white/10 shrink-0">
                                        v1.0
                                    </Badge>
                                </div>
                                <CardDescription className="text-xs line-clamp-1 italic">
                                    {project.description || '설명 없음'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 pt-0 space-y-3">
                                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                        {project.user.name?.[0] || 'U'}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-[11px] font-medium text-white truncate">{project.user.name || '미지정'}</p>
                                        <p className="text-[10px] text-gray-500 truncate">{project.user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(project.updatedAt).toLocaleDateString()}
                                    </div>
                                    <button className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                        상세 설정 <ExternalLink className="w-2 h-2" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
