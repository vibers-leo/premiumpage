'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', name: '', companyName: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/portal/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()

    if (res.ok) {
      router.push('/portal')
    } else {
      setError(data.error)
      setLoading(false)
    }
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="text-xl font-extrabold tracking-tight uppercase text-neutral-900">Premium Page</Link>
          <p className="text-neutral-400 text-sm mt-2">고객 포털 회원가입</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-xs text-red-500 bg-red-50 border border-red-100 px-4 py-2.5">{error}</div>
          )}
          {[
            { key: 'name', label: '담당자 이름', type: 'text', required: true, placeholder: '홍길동' },
            { key: 'email', label: '이메일', type: 'email', required: true, placeholder: 'email@company.com' },
            { key: 'password', label: '비밀번호', type: 'password', required: true, placeholder: '6자 이상' },
            { key: 'companyName', label: '회사명', type: 'text', required: false, placeholder: '(선택)' },
            { key: 'phone', label: '연락처', type: 'tel', required: false, placeholder: '(선택) 010-0000-0000' },
          ].map(field => (
            <div key={field.key}>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={field.type}
                value={(form as any)[field.key]}
                onChange={set(field.key)}
                className="w-full h-11 px-4 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none transition-colors"
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            회원가입
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          이미 계정이 있으신가요?{' '}
          <Link href="/portal/login" className="text-neutral-900 font-bold hover:underline">로그인</Link>
        </p>
      </div>
    </div>
  )
}
