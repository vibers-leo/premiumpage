'use client'

import { useEffect, useState } from 'react'
import {
    MessageSquare,
    Calendar,
    Mail,
    Phone,
    Building2,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    MoreHorizontal,
    Search,
    ChevronRight,
    Download
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import { toast } from 'sonner'

interface QuoteRequest {
    id: string
    templateId: string
    developmentPlanId: string
    maintenancePlanId: string
    companyName: string | null
    contactName: string
    contactEmail: string
    contactPhone: string
    projectDetails: string | null
    status: string
    createdAt: string
    attachments: string | null
}

export default function AdminQuotesPage() {
    const [quotes, setQuotes] = useState<QuoteRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchQuotes()
    }, [])

    const fetchQuotes = async () => {
        try {
            const response = await fetch('/api/quotes')
            const data = await response.json()
            if (Array.isArray(data)) {
                setQuotes(data)
            }
        } catch (error) {
            console.error('Failed to fetch quotes:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (quoteId: string, newStatus: string) => {
        try {
            const response = await fetch('/api/quotes', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: quoteId, status: newStatus })
            })
            if (response.ok) {
                setQuotes(quotes.map(q => q.id === quoteId ? { ...q, status: newStatus } : q))
                toast.success(`상태가 ${newStatus}로 변경되었습니다.`)
            }
        } catch (error) {
            toast.error('상태 변경에 실패했습니다.')
        }
    }

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'pending': return { label: '대기중', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' }
            case 'processing': return { label: '진행중', icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' }
            case 'completed': return { label: '완료', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' }
            case 'cancelled': return { label: '취소됨', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' }
            default: return { label: status, icon: Clock, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' }
        }
    }

    const filteredQuotes = quotes.filter(q =>
        q.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.companyName?.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">견적 및 주문 관리</h1>
                <p className="text-gray-400">인입된 모든 견적 요청과 주문 상태를 관리합니다.</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="이름, 이메일, 회사명 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <Card key={i} className="bg-[#0a0a0a] border-white/5 animate-pulse h-32" />
                    ))
                ) : filteredQuotes.length === 0 ? (
                    <div className="py-20 text-center text-gray-500 bg-[#0a0a0a] rounded-xl border border-dashed border-white/10">
                        인입된 견적 내역이 없습니다.
                    </div>
                ) : (
                    filteredQuotes.map((quote) => {
                        const status = getStatusInfo(quote.status)
                        return (
                            <Card key={quote.id} className="bg-[#0a0a0a] border-white/5 hover:border-white/10 transition group overflow-hidden">
                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Status Bar */}
                                    <div className={`w-1 shrink-0 ${status.bg.replace('/10', '')}`} />

                                    <div className="flex-1 p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition">
                                                        {quote.companyName || quote.contactName}
                                                        {!quote.companyName && <span className="text-xs font-normal text-gray-500 ml-2">(개인)</span>}
                                                    </h3>
                                                    <Badge className={`${status.bg} ${status.color} ${status.border} border shadow-none`}>
                                                        <status.icon className="w-3 h-3 mr-1" />
                                                        {status.label}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(quote.createdAt).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {quote.templateId}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" className="h-9 border-white/10 hover:bg-white/5">
                                                            상태 변경 <ChevronRight className="w-4 h-4 ml-1" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-white/10 text-white w-40">
                                                        <DropdownMenuLabel>상태 선택</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => updateStatus(quote.id, 'pending')} className="hover:bg-yellow-400/10 text-yellow-500">대기중</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => updateStatus(quote.id, 'processing')} className="hover:bg-blue-400/10 text-blue-500">진행중</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => updateStatus(quote.id, 'completed')} className="hover:bg-green-400/10 text-green-500">완료</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => updateStatus(quote.id, 'cancelled')} className="hover:bg-red-400/10 text-red-500">취소</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 hover:bg-white/5">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-3">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">연락처 정보</p>
                                                <div className="space-y-2">
                                                    <p className="flex items-center gap-2 text-sm text-gray-300"><Mail className="w-3.5 h-3.5 text-gray-500" /> {quote.contactEmail}</p>
                                                    <p className="flex items-center gap-2 text-sm text-gray-300"><Phone className="w-3.5 h-3.5 text-gray-500" /> {quote.contactPhone}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">주문 상세</p>
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-300">플랜: <span className="text-indigo-400 font-medium">{quote.developmentPlanId}</span></p>
                                                    <p className="text-sm text-gray-300">유지보수: <span className="text-indigo-400 font-medium">{quote.maintenancePlanId}</span></p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">프로젝트 설명</p>
                                                <p className="text-sm text-gray-400 line-clamp-2 italic leading-relaxed">
                                                    "{quote.projectDetails || '내용 없음'}"
                                                </p>
                                            </div>
                                        </div>

                                        {quote.attachments && (
                                            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <FileText className="w-3.5 h-3.5" />
                                                    첨부파일 포함됨
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-8 text-xs text-indigo-400 hover:text-indigo-300">
                                                    <Download className="w-3.5 h-3.5 mr-1" /> 파일 다운로드
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}
