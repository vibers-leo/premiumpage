'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

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
const STATUSES = ['all', 'pending', 'in_progress', 'review', 'completed']

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/api/portal/orders').then(r => r.json()).then(d => setOrders(d.orders || [])).catch(() => {})
  }, [])

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">내 프로젝트</h1>
        <Link
          href="/portal/orders/new"
          className="h-9 px-4 bg-neutral-900 text-white font-bold text-xs flex items-center gap-2 hover:bg-neutral-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> 새 의뢰
        </Link>
      </div>

      {/* 필터 */}
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs font-bold px-4 py-2 border transition-all whitespace-nowrap ${
              filter === s ? 'border-neutral-900 text-neutral-900' : 'border-neutral-200 text-neutral-400 hover:border-neutral-400'
            }`}
          >
            {s === 'all' ? '전체' : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-neutral-400 text-sm border border-dashed border-neutral-200">
          프로젝트가 없습니다.
        </div>
      ) : (
        <div className="border border-neutral-200 divide-y divide-neutral-200">
          {filtered.map(order => (
            <Link
              key={order.id}
              href={`/portal/orders/${order.id}`}
              className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm truncate">{order.title}</div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {order.orderNumber} · {order.product?.name || '미지정'} · {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                {order._count?.comments > 0 && (
                  <span className="text-[10px] text-neutral-400 font-medium">💬 {order._count.comments}</span>
                )}
                <span className={`text-[11px] font-bold px-3 py-1 ${STATUS_COLORS[order.status] || 'bg-neutral-100'}`}>
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
