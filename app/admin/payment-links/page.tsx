'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Copy, Check, Link2, Loader2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

interface PaymentLink {
  id: string
  token: string
  amount: number
  orderName: string
  customerName: string | null
  customerEmail: string | null
  memo: string | null
  status: string
  paidAt: string | null
  expiresAt: string | null
  createdAt: string
}

export default function PaymentLinksPage() {
  const [links, setLinks] = useState<PaymentLink[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [form, setForm] = useState({
    amount: '',
    orderName: '',
    customerName: '',
    customerEmail: '',
    memo: '',
    expiresAt: '',
  })

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/admin/payment-links')
      const data = await res.json()
      setLinks(data)
    } catch {
      //
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!form.amount || !form.orderName) return
    setCreating(true)
    try {
      const res = await fetch('/api/admin/payment-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(form.amount),
          orderName: form.orderName,
          customerName: form.customerName || null,
          customerEmail: form.customerEmail || null,
          memo: form.memo || null,
          expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
        }),
      })
      const data = await res.json()
      if (data.id) {
        setLinks(prev => [data, ...prev])
        setShowForm(false)
        setForm({ amount: '', orderName: '', customerName: '', customerEmail: '', memo: '', expiresAt: '' })
      }
    } finally {
      setCreating(false)
    }
  }

  const copyLink = (token: string, id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/pay/${token}`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const statusBadge = (status: string) => {
    if (status === 'paid') return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">결제완료</Badge>
    if (status === 'expired') return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">만료</Badge>
    return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">대기중</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">결제 링크</h1>
          <p className="text-gray-400 text-sm mt-1">고객에게 전송할 결제 링크를 생성하고 관리합니다.</p>
        </div>
        <Button onClick={() => setShowForm(v => !v)} className="bg-white text-black hover:bg-gray-200">
          <Plus className="w-4 h-4 mr-2" /> 링크 생성
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-[#0a0a0a] border-white/10">
            <CardHeader>
              <CardTitle className="text-base">새 결제 링크 생성</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>결제 금액 (원) *</Label>
                  <Input
                    type="number"
                    placeholder="예: 1000000"
                    value={form.amount}
                    onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>주문명 *</Label>
                  <Input
                    placeholder="예: 프리미엄페이지 Pro 제작비"
                    value={form.orderName}
                    onChange={e => setForm(p => ({ ...p, orderName: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>고객명</Label>
                  <Input
                    placeholder="홍길동"
                    value={form.customerName}
                    onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>고객 이메일</Label>
                  <Input
                    type="email"
                    placeholder="customer@example.com"
                    value={form.customerEmail}
                    onChange={e => setForm(p => ({ ...p, customerEmail: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>메모 (내부용)</Label>
                  <Input
                    placeholder="참고사항"
                    value={form.memo}
                    onChange={e => setForm(p => ({ ...p, memo: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>만료일 (선택)</Label>
                  <Input
                    type="datetime-local"
                    value={form.expiresAt}
                    onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={() => setShowForm(false)} className="border-white/10">취소</Button>
                <Button onClick={handleCreate} disabled={creating || !form.amount || !form.orderName} className="bg-white text-black hover:bg-gray-200">
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : '생성'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : links.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Link2 className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">생성된 결제 링크가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map(link => (
            <Card key={link.id} className="bg-[#0a0a0a] border-white/5">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {statusBadge(link.status)}
                      <span className="font-semibold text-sm">{link.orderName}</span>
                    </div>
                    <div className="text-xl font-black text-primary mb-2">
                      {link.amount.toLocaleString()}원
                    </div>
                    <div className="text-xs text-gray-500 space-y-0.5">
                      {link.customerName && <div>고객: {link.customerName} {link.customerEmail && `(${link.customerEmail})`}</div>}
                      {link.memo && <div>메모: {link.memo}</div>}
                      {link.paidAt && <div className="text-green-400">결제일: {new Date(link.paidAt).toLocaleString('ko-KR')}</div>}
                      {link.expiresAt && <div>만료: {new Date(link.expiresAt).toLocaleString('ko-KR')}</div>}
                      <div>생성: {new Date(link.createdAt).toLocaleString('ko-KR')}</div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 font-mono truncate">
                      {typeof window !== 'undefined' ? `${window.location.origin}/pay/${link.token}` : `/pay/${link.token}`}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyLink(link.token, link.id)}
                    className="border-white/10 shrink-0"
                    disabled={link.status === 'paid'}
                  >
                    {copiedId === link.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
