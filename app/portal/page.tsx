'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePortalAuth } from '@/components/portal-auth-context'
import { ShoppingCart, Clock, CheckCircle2, Plus, ArrowRight } from 'lucide-react'

const STATUS_LABELS: Record<string, string> = {
  pending: '대기중', accepted: '수락됨', in_progress: '진행중',
  review: '검토중', revision: '수정요청', completed: '완료', cancelled: '취소',
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700', accepted: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-indigo-100 text-indigo-700', review: 'bg-purple-100 text-purple-700',
  revision: 'bg-orange-100 text-orange-700', completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-neutral-100 text-neutral-500',
}

export default function PortalDashboard() {
  const { user } = usePortalAuth()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/portal/dashboard').then(r => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <div className="py-20 text-center text-neutral-400 text-sm">로딩 중...</div>

  return (
    <div>
      {/* 인사 */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight">
          안녕하세요, {user?.name || user?.companyName || '고객'}님
        </h1>
        <p className="text-neutral-500 text-sm mt-1">프로젝트 현황을 한눈에 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 mb-8">
        {[
          { label: '전체 프로젝트', value: data.stats.total, icon: ShoppingCart },
          { label: '진행중', value: data.stats.active, icon: Clock },
          { label: '대기중', value: data.stats.pending, icon: Clock },
          { label: '완료', value: data.stats.completed, icon: CheckCircle2 },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6">
            <div className="flex items-center gap-2 text-neutral-400 mb-2">
              <stat.icon className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-3xl font-extrabold tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* 빠른 액션 */}
      <div className="flex gap-3 mb-8">
        <Link
          href="/portal/orders/new"
          className="h-10 px-5 bg-neutral-900 text-white font-bold text-sm flex items-center gap-2 hover:bg-neutral-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> 새 의뢰
        </Link>
        <Link
          href="/portal/orders"
          className="h-10 px-5 border border-neutral-300 text-neutral-700 font-bold text-sm flex items-center gap-2 hover:border-neutral-900 transition-colors"
        >
          전체 프로젝트 보기 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 최근 프로젝트 */}
      <div>
        <h2 className="text-base font-extrabold mb-4">최근 프로젝트</h2>
        {data.recentOrders.length === 0 ? (
          <div className="text-center py-16 text-neutral-400 text-sm border border-dashed border-neutral-200">
            아직 진행한 프로젝트가 없습니다.
          </div>
        ) : (
          <div className="border border-neutral-200 divide-y divide-neutral-200">
            {data.recentOrders.map((order: any) => (
              <Link
                key={order.id}
                href={`/portal/orders/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
              >
                <div>
                  <div className="font-bold text-sm">{order.title}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {order.orderNumber} · {order.product?.name || '미지정'}
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-3 py-1 ${STATUS_COLORS[order.status] || 'bg-neutral-100'}`}>
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
