'use client'

import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/portal/admin/clients').then(r => r.json()).then(d => setClients(d.clients || [])).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">고객 관리</h1>

      {clients.length === 0 ? (
        <div className="py-20 text-center text-neutral-400 text-sm border border-dashed border-neutral-200">
          <Users className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
          등록된 고객이 없습니다.
        </div>
      ) : (
        <div className="border border-neutral-200">
          {/* 헤더 */}
          <div className="grid grid-cols-5 gap-4 px-4 py-2.5 bg-neutral-50 border-b border-neutral-200">
            {['이름', '회사', '이메일', '주문 수', '가입일'].map(h => (
              <div key={h} className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{h}</div>
            ))}
          </div>
          {/* 목록 */}
          <div className="divide-y divide-neutral-100">
            {clients.map(c => (
              <div key={c.id} className="grid grid-cols-5 gap-4 px-4 py-3 items-center hover:bg-neutral-50 transition-colors">
                <div className="text-sm font-bold truncate">{c.name || '-'}</div>
                <div className="text-sm text-neutral-600 truncate">{c.companyName || '-'}</div>
                <div className="text-sm text-neutral-500 truncate">{c.email}</div>
                <div className="text-sm font-bold">{c._count?.orders || 0}</div>
                <div className="text-xs text-neutral-400">{new Date(c.createdAt).toLocaleDateString('ko-KR')}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
