'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    Users,
    Briefcase,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    CreditCard,
    Plus,
    LayoutDashboard
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface DashboardStats {
    totalUsers: number
    totalProjects: number
    totalQuotes: number
    pendingQuotes: number
    newUsersToday: number
    revenueEstimate: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalProjects: 0,
        totalQuotes: 0,
        pendingQuotes: 0,
        newUsersToday: 0,
        revenueEstimate: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            // Promise.all을 통해 여러 API에서 데이터 수집
            const [usersRes, projectsRes, quotesRes] = await Promise.all([
                fetch('/api/admin/users'),
                fetch('/api/admin/projects'),
                fetch('/api/quotes')
            ])

            const users = await usersRes.json()
            const projects = await projectsRes.json()
            const quotes = await quotesRes.json()

            setStats({
                totalUsers: users.length || 0,
                totalProjects: projects.length || 0,
                totalQuotes: quotes.length || 0,
                pendingQuotes: quotes.filter((q: any) => q.status === 'pending').length || 0,
                newUsersToday: users.filter((u: any) => {
                    const today = new Date().toDateString()
                    return new Date(u.createdAt).toDateString() === today
                }).length || 0,
                revenueEstimate: projects.length * 1500000 // 예시 계산
            })
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">대시보드</h1>
                    <p className="text-gray-400">비즈니스 요약 및 시스템 활성도를 확인하세요.</p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-white text-black hover:bg-gray-200">
                        <Plus className="w-4 h-4 mr-2" /> 새 템플릿 등록
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-[#0a0a0a] border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Users className="w-12 h-12" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs uppercase tracking-wider text-gray-500 font-semibold">전체 사용자</CardDescription>
                        <CardTitle className="text-3xl font-bold">{loading ? '...' : stats.totalUsers}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-xs text-green-400">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            <span>오늘 +{stats.newUsersToday}명 가입</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0a0a0a] border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500">
                        <Briefcase className="w-12 h-12" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs uppercase tracking-wider text-gray-500 font-semibold">활성 프로젝트</CardDescription>
                        <CardTitle className="text-3xl font-bold text-indigo-400">{loading ? '...' : stats.totalProjects}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-xs text-gray-500">
                            <Activity className="w-3 h-3 mr-1" />
                            <span>시스템 전체 등록 기준</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0a0a0a] border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-yellow-500">
                        <MessageSquare className="w-12 h-12" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs uppercase tracking-wider text-gray-500 font-semibold">미확인 견적</CardDescription>
                        <CardTitle className="text-3xl font-bold text-yellow-400">{loading ? '...' : stats.pendingQuotes}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-xs text-yellow-500/80">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            <span>조치가 필요한 항목</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0a0a0a] border-white/5 overflow-hidden relative border-l-4 border-l-purple-500">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-purple-500">
                        <CreditCard className="w-12 h-12" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs uppercase tracking-wider text-gray-500 font-semibold">예상 매출액</CardDescription>
                        <CardTitle className="text-2xl font-bold">₩{(stats.revenueEstimate).toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-xs text-gray-500">
                            <span>프로젝트 평균 단가 적용</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Chart & Recent Section (Mocked) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-[#0a0a0a] border-white/5">
                    <CardHeader>
                        <CardTitle className="text-lg">시스템 상태</CardTitle>
                        <CardDescription>서버 가동 시간 및 API 활성도</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center text-gray-600">
                        <div className="flex flex-col items-center gap-4">
                            <Activity className="w-12 h-12 animate-pulse" />
                            <p className="text-sm">실시간 데이터 스트리밍 활성화됨</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0a0a0a] border-white/5">
                    <CardHeader>
                        <CardTitle className="text-lg">빠른 관리</CardTitle>
                        <CardDescription>자주 사용하는 도구</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link href="/admin/users" className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 transition group">
                            <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-sm">회원 등급 변경</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition" />
                        </Link>
                        <Link href="/admin/quotes" className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 transition group">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm">견적 상태 업데이트</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition" />
                        </Link>
                        <Link href="/admin/projects" className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 transition group">
                            <div className="flex items-center gap-3">
                                <Briefcase className="w-4 h-4 text-green-400" />
                                <span className="text-sm">포트폴리오 모니터링</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition" />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
