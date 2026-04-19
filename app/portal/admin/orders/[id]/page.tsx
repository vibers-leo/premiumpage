'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Loader2 } from 'lucide-react'
import { usePortalAuth } from '@/components/portal-auth-context'

const STATUS_LABELS: Record<string, string> = {
  pending: '대기중', accepted: '수락됨', in_progress: '진행중',
  review: '검토중', revision: '수정요청', completed: '완료', cancelled: '취소',
}
const STATUS_FLOW = ['pending', 'accepted', 'in_progress', 'review', 'revision', 'completed', 'cancelled']

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = usePortalAuth()
  const [order, setOrder] = useState<any>(null)
  const [comment, setComment] = useState('')
  const [sending, setSending] = useState(false)
  const [updating, setUpdating] = useState(false)

  const loadOrder = () => {
    fetch(`/api/portal/admin/orders/${id}`).then(r => r.json()).then(d => setOrder(d.order)).catch(() => {})
  }
  useEffect(loadOrder, [id])

  const updateStatus = async (status: string) => {
    setUpdating(true)
    await fetch(`/api/portal/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setUpdating(false)
    loadOrder()
  }

  const sendComment = async () => {
    if (!comment.trim() || sending) return
    setSending(true)
    await fetch(`/api/portal/orders/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: comment }),
    })
    setComment('')
    setSending(false)
    loadOrder()
  }

  if (!order) return <div className="py-20 text-center text-neutral-400 text-sm">로딩 중...</div>

  return (
    <div>
      <Link href="/portal/admin/orders" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> 주문 목록
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{order.title}</h1>
          <p className="text-neutral-400 text-sm mt-1">{order.orderNumber}</p>
        </div>
      </div>

      {/* 고객 정보 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 mb-6">
        {[
          { label: '고객', value: order.user?.name || '-' },
          { label: '회사', value: order.user?.companyName || '-' },
          { label: '이메일', value: order.user?.email },
          { label: '연락처', value: order.user?.phone || '-' },
        ].map(item => (
          <div key={item.label} className="bg-white p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">{item.label}</div>
            <div className="text-sm font-medium truncate">{item.value}</div>
          </div>
        ))}
      </div>

      {/* 상태 변경 */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">상태 변경</div>
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FLOW.map(s => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              disabled={updating || order.status === s}
              className={`text-xs font-bold px-3 py-1.5 border transition-all disabled:opacity-30 ${
                order.status === s
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-600'
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* 주문 상세 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 mb-6">
        {[
          { label: '서비스', value: order.product?.name || '미지정' },
          { label: '의뢰일', value: new Date(order.createdAt).toLocaleDateString('ko-KR') },
          { label: '금액', value: order.amount ? `${order.amount.toLocaleString()}원` : '미정' },
        ].map(item => (
          <div key={item.label} className="bg-white p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">{item.label}</div>
            <div className="text-sm font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {order.description && (
        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">요청 사항</div>
          <div className="text-sm text-neutral-600 bg-neutral-50 p-4 border border-neutral-200 whitespace-pre-wrap">{order.description}</div>
        </div>
      )}

      {/* 코멘트 */}
      <h3 className="text-base font-extrabold mb-4">진행 내역</h3>
      <div className="border border-neutral-200 divide-y divide-neutral-200 mb-4">
        {order.comments?.length === 0 ? (
          <div className="py-10 text-center text-neutral-400 text-sm">아직 진행 내역이 없습니다.</div>
        ) : order.comments?.map((c: any) => (
          <div key={c.id} className={`p-4 ${c.isInternal ? 'bg-amber-50' : ''}`}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-bold ${c.user.role === 'admin' ? 'text-indigo-600' : 'text-neutral-900'}`}>
                {c.user.role === 'admin' ? '🔧 관리자' : c.user.name || '고객'}
              </span>
              {c.isInternal && <span className="text-[9px] font-bold text-amber-600 border border-amber-300 px-1.5 py-0.5">내부 메모</span>}
              <span className="text-[10px] text-neutral-300">{new Date(c.createdAt).toLocaleString('ko-KR')}</span>
            </div>
            <p className="text-sm text-neutral-600 whitespace-pre-wrap">{c.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendComment()}
          placeholder="고객에게 전달할 메시지..."
          className="flex-1 h-10 px-4 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none"
        />
        <button
          onClick={sendComment}
          disabled={!comment.trim() || sending}
          className="h-10 px-4 bg-neutral-900 text-white flex items-center gap-2 text-sm font-bold hover:bg-neutral-700 disabled:opacity-50"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
