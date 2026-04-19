'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
const STATUSES = ['all', 'pending', 'accepted', 'in_progress', 'review', 'revision', 'completed', 'cancelled']

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch(`/api/portal/admin/orders?status=${filter}`).then(r => r.json()).then(d => setOrders(d.orders || [])).catch(() => {})
  }, [filter])

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">주문 관리</h1>

      <div className="flex gap-1 mb-6 overflow-x-auto">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs font-bold px-3 py-2 border transition-all whitespace-nowrap ${
              filter === s ? 'border-neutral-900 text-neutral-900' : 'border-neutral-200 text-neutral-400 hover:border-neutral-400'
            }`}
          >
            {s === 'all' ? '전체' : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="border border-neutral-200 divide-y divide-neutral-200">
        {orders.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 text-sm">주문이 없습니다.</div>
        ) : orders.map(order => (
          <Link
            key={order.id}
            href={`/portal/admin/orders/${order.id}`}
            className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm truncate">{order.title}</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {order.user?.companyName || order.user?.name || order.user?.email} · {order.product?.name || '미지정'} · {new Date(order.createdAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              {order._count?.comments > 0 && (
                <span className="text-[10px] text-neutral-400">💬 {order._count.comments}</span>
              )}
              <span className={`text-[11px] font-bold px-3 py-1 ${STATUS_COLORS[order.status]}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
