'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { usePortalAuth } from '@/components/portal-auth-context'
import { ArrowLeft, Send, Loader2 } from 'lucide-react'

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

// 상태 진행 단계
const STATUS_STEPS = ['pending', 'accepted', 'in_progress', 'review', 'completed']

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = usePortalAuth()
  const [order, setOrder] = useState<any>(null)
  const [comment, setComment] = useState('')
  const [sending, setSending] = useState(false)

  const loadOrder = () => {
    fetch(`/api/portal/orders/${id}`).then(r => r.json()).then(d => setOrder(d.order)).catch(() => {})
  }
  useEffect(loadOrder, [id])

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

  const currentStep = STATUS_STEPS.indexOf(order.status)

  return (
    <div>
      <Link href="/portal/orders" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> 목록으로
      </Link>

      {/* 헤더 */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{order.title}</h1>
          <p className="text-neutral-400 text-sm mt-1">{order.orderNumber} · {order.product?.name || '미지정'}</p>
        </div>
        <span className={`text-xs font-bold px-4 py-1.5 ${STATUS_COLORS[order.status]}`}>
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      {/* 진행 단계 */}
      <div className="flex items-center gap-0 mb-8">
        {STATUS_STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div className={`w-full h-1.5 ${i <= currentStep ? 'bg-neutral-900' : 'bg-neutral-200'} transition-colors`} />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-bold text-neutral-400 mb-8 -mt-6">
        {STATUS_STEPS.map((step, i) => (
          <span key={step} className={i <= currentStep ? 'text-neutral-900' : ''}>{STATUS_LABELS[step]}</span>
        ))}
      </div>

      {/* 상세 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 mb-8">
        {[
          { label: '의뢰일', value: new Date(order.createdAt).toLocaleDateString('ko-KR') },
          { label: '시작일', value: order.startedAt ? new Date(order.startedAt).toLocaleDateString('ko-KR') : '미정' },
          { label: '마감일', value: order.deadline ? new Date(order.deadline).toLocaleDateString('ko-KR') : '미정' },
        ].map(item => (
          <div key={item.label} className="bg-white p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">{item.label}</div>
            <div className="text-sm font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {order.description && (
        <div className="mb-8">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">요청 사항</h3>
          <div className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-4 border border-neutral-200 whitespace-pre-wrap">
            {order.description}
          </div>
        </div>
      )}

      {/* 코멘트 */}
      <div>
        <h3 className="text-base font-extrabold mb-4">진행 내역</h3>
        <div className="border border-neutral-200 divide-y divide-neutral-200 mb-4">
          {(!order.comments || order.comments.length === 0) ? (
            <div className="text-center py-10 text-neutral-400 text-sm">아직 진행 내역이 없습니다.</div>
          ) : (
            order.comments.map((c: any) => (
              <div key={c.id} className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-bold ${c.user.role === 'admin' ? 'text-indigo-600' : 'text-neutral-900'}`}>
                    {c.user.role === 'admin' ? '🔧 관리자' : c.user.name || '고객'}
                  </span>
                  <span className="text-[10px] text-neutral-300">
                    {new Date(c.createdAt).toLocaleString('ko-KR')}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 whitespace-pre-wrap">{c.content}</p>
              </div>
            ))
          )}
        </div>

        {/* 코멘트 입력 */}
        {order.status !== 'completed' && order.status !== 'cancelled' && (
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendComment()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 h-10 px-4 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none transition-colors"
            />
            <button
              onClick={sendComment}
              disabled={!comment.trim() || sending}
              className="h-10 px-4 bg-neutral-900 text-white flex items-center gap-2 text-sm font-bold hover:bg-neutral-700 disabled:opacity-50 transition-colors"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
