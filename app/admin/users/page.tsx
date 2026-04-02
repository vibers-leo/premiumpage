'use client'

import { useEffect, useState } from 'react'
import {
    Users,
    Mail,
    Calendar,
    Shield,
    MoreVertical,
    ExternalLink,
    Search
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'

interface UserSummary {
    id: string
    name: string | null
    email: string
    role: string
    createdAt: string
    _count: {
        projects: number
    }
}

export default function UsersManagementPage() {
    const [users, setUsers] = useState<UserSummary[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users')
            const data = await response.json()
            if (Array.isArray(data)) {
                setUsers(data)
            }
        } catch (error) {
            console.error('Failed to fetch users:', error)
        } finally {
            setLoading(false)
        }
    }

    const toggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin'
        try {
            const response = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, role: newRole })
            })
            if (response.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
            }
        } catch (error) {
            console.error('Role update failed:', error)
        }
    }

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">회원 관리</h1>
                <p className="text-gray-400">플랫폼 가입 사용자 목록 및 권한을 관리합니다.</p>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="이름 또는 이메일로 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10"
                    />
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Users className="w-4 h-4 mr-2" />
                    사용자 내보내기
                </Button>
            </div>

            <Card className="bg-[#0a0a0a] border-white/5">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-400" />
                        사용자 목록 ({filteredUsers.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-gray-500 text-sm">
                                    <th className="pb-4 font-medium px-4 text-center">프로필/이름</th>
                                    <th className="pb-4 font-medium px-4">이메일</th>
                                    <th className="pb-4 font-medium px-4 text-center">권한</th>
                                    <th className="pb-4 font-medium px-4 text-center">프로젝트</th>
                                    <th className="pb-4 font-medium px-4">가입일</th>
                                    <th className="pb-4 font-medium px-4 text-right">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr><td colSpan={6} className="py-20 text-center text-gray-500">로딩 중...</td></tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr><td colSpan={6} className="py-20 text-center text-gray-500">검색 결과가 없습니다.</td></tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="group hover:bg-white/[0.02] transition">
                                            <td className="py-4 px-4 flex items-center justify-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                                                        {user.name?.[0] || 'U'}
                                                    </div>
                                                    <span className="font-medium text-sm">{user.name || '미지정'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <Badge className={user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border-purple-500/20' : 'bg-gray-500/20 text-gray-400 border-gray-500/20'}>
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <span className="text-sm font-semibold text-indigo-400">{user._count.projects}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-white/10 text-white">
                                                        <DropdownMenuLabel>메뉴</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => window.open(`/admin/users/${user.id}`, '_blank')} className="cursor-pointer hover:bg-white/5">
                                                            <ExternalLink className="w-4 h-4 mr-2" /> 상세 정보
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-white/5" />
                                                        <DropdownMenuItem
                                                            onClick={() => toggleRole(user.id, user.role)}
                                                            className="cursor-pointer hover:bg-white/5 text-purple-400"
                                                        >
                                                            <Shield className="w-4 h-4 mr-2" /> 권한 전환 ({user.role === 'admin' ? '일반' : '관리자'})
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
