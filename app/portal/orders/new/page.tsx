'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Check } from 'lucide-react'
import { PortalFileUpload, AttachmentList } from '@/components/portal-file-upload'

export default function NewOrderPage() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [form, setForm] = useState({ productId: '', title: '', description: '', referenceUrl: '' })
  const [attachments, setAttachments] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/portal/products').then(r => r.json()).then(d => setProducts(d.products || [])).catch(() => {})
  }, [])

  const selectedProduct = products.find(p => p.id === form.productId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/portal/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, attachments: attachments.length ? JSON.stringify(attachments) : undefined }),
    })
    const data = await res.json()

    if (res.ok) {
      router.push(`/portal/orders/${data.order.id}`)
    } else {
      setError(data.error)
      setLoading(false)
    }
  }

  // 카테고리별 그룹핑
  const categories = ['catalog', 'leaflet', 'proposal', 'maintenance']
  const catLabels: Record<string, string> = {
    catalog: '전자카탈로그', leaflet: '리플렛', proposal: '제안서', maintenance: '유지보수',
  }

  return (
    <div className="max-w-2xl">
      <Link href="/portal/orders" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> 목록으로
      </Link>

      <h1 className="text-2xl font-extrabold tracking-tight mb-8">새 의뢰</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-xs text-red-500 bg-red-50 border border-red-100 px-4 py-2.5">{error}</div>
        )}

        {/* 서비스 선택 */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3 block">서비스 선택</label>
          {categories.map(cat => {
            const catProducts = products.filter(p => p.category === cat)
            if (catProducts.length === 0) return null
            return (
              <div key={cat} className="mb-4">
                <div className="text-xs font-bold text-neutral-500 mb-2">{catLabels[cat]}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {catProducts.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, productId: p.id, title: prev.title || `${p.name} 제작 의뢰` }))}
                      className={`text-left p-4 border transition-all ${
                        form.productId === p.id
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{p.name}</span>
                        {form.productId === p.id && <Check className="w-4 h-4 text-neutral-900" />}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">{p.priceRange || '협의'}</div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* 제목 */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">
            프로젝트 제목 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            className="w-full h-11 px-4 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none transition-colors"
            placeholder="예: ABC기업 전자카탈로그 제작"
            required
          />
        </div>

        {/* 상세 설명 */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">상세 설명</label>
          <textarea
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full h-32 px-4 py-3 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none transition-colors resize-none"
            placeholder="제작 범위, 기대하는 결과물, 참고 사항 등을 자유롭게 작성해주세요."
          />
        </div>

        {/* 참고 URL */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">참고 URL</label>
          <input
            type="url"
            value={form.referenceUrl}
            onChange={e => setForm(prev => ({ ...prev, referenceUrl: e.target.value }))}
            className="w-full h-11 px-4 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none transition-colors"
            placeholder="기존 웹사이트 또는 참고할 URL"
          />
        </div>

        {/* 파일 첨부 */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">파일 첨부</label>
          <PortalFileUpload onUpload={(url) => setAttachments(prev => [...prev, url])} />
          <AttachmentList urls={attachments} onRemove={(i) => setAttachments(prev => prev.filter((_, idx) => idx !== i))} />
        </div>

        <button
          type="submit"
          disabled={loading || !form.title}
          className="w-full h-12 bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          의뢰 접수하기
        </button>
      </form>
    </div>
  )
}
