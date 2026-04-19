'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePortalAuth } from '@/components/portal-auth-context'
import { Users, ShoppingCart, Clock, CheckCircle2 } from 'lucide-react'

const STATUS_LABELS: Record<string, string> = {
  pending: '대기중', accepted: '수락됨', in_progress: '진행중',
  review: '검토중', revision: '수정요청', completed: '완료', cancelled: '취소',
}

export default function AdminDashboard() {
  const { isAdmin } = usePortalAuth()
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    if (!isAdmin) return
    fetch('/api/portal/admin/stats').then(r => r.json()).then(setStats).catch(() => {})
  }, [isAdmin])

  if (!isAdmin) return <div className="py-20 text-center text-neutral-400">접근 권한이 없습니다.</div>
  if (!stats) return <div className="py-20 text-center text-neutral-400 text-sm">로딩 중...</div>

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-8">관리자 대시보드</h1>

      {/* 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 mb-8">
        {[
          { label: '전체 고객', value: stats.totalClients, icon: Users },
          { label: '전체 주문', value: stats.totalOrders, icon: ShoppingCart },
          { label: '진행중', value: (stats.ordersByStatus?.in_progress || 0) + (stats.ordersByStatus?.review || 0), icon: Clock },
          { label: '완료', value: stats.ordersByStatus?.completed || 0, icon: CheckCircle2 },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6">
            <div className="flex items-center gap-2 text-neutral-400 mb-2">
              <s.icon className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">{s.label}</span>
            </div>
            <div className="text-3xl font-extrabold tracking-tight">{s.value}</div>
          </div>
        ))}
      </div>

      {/* 빠른 링크 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        <Link href="/portal/admin/orders" className="p-5 border border-neutral-200 hover:border-neutral-900 transition-all group">
          <div className="text-base font-extrabold group-hover:text-neutral-900">주문 관리</div>
          <div className="text-xs text-neutral-400 mt-1">모든 주문 확인 및 상태 변경</div>
        </Link>
        <Link href="/portal/admin/clients" className="p-5 border border-neutral-200 hover:border-neutral-900 transition-all group">
          <div className="text-base font-extrabold group-hover:text-neutral-900">고객 관리</div>
          <div className="text-xs text-neutral-400 mt-1">등록된 고객 목록 및 상세 정보</div>
        </Link>
      </div>

      {/* 최근 주문 */}
      <h2 className="text-base font-extrabold mb-4">최근 주문</h2>
      <div className="border border-neutral-200 divide-y divide-neutral-200">
        {stats.recentOrders?.map((order: any) => (
          <Link
            key={order.id}
            href={`/portal/admin/orders/${order.id}`}
            className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
          >
            <div>
              <div className="font-bold text-sm">{order.title}</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {order.user?.companyName || order.user?.name} · {order.product?.name || '미지정'} · {new Date(order.createdAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 bg-neutral-100">
              {STATUS_LABELS[order.status] || order.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
