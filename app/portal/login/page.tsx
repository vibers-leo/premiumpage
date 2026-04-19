'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePortalAuth } from '@/components/portal-auth-context'
import { Loader2, Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [socialUrls, setSocialUrls] = useState<{ google: string | null; naver: string | null; kakao: string | null }>({ google: null, naver: null, kakao: null })
  const { login, user } = usePortalAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/portal')
  }, [user, router])

  useEffect(() => {
    fetch('/api/portal/auth/social-urls').then(r => r.json()).then(setSocialUrls).catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await login(email, password)
    if (result.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="text-xl font-extrabold tracking-tight uppercase text-neutral-900">Premium Page</Link>
          <p className="text-neutral-400 text-sm mt-2">고객 포털 로그인</p>
        </div>

        {/* 소셜 로그인 */}
        <div className="space-y-2 mb-6">
          {socialUrls.google && (
            <a href={socialUrls.google} className="w-full h-11 flex items-center justify-center gap-3 border border-neutral-200 text-sm font-semibold text-neutral-700 hover:border-neutral-400 transition-colors">
              <GoogleIcon />
              Google로 계속하기
            </a>
          )}
          {socialUrls.naver && (
            <a href={socialUrls.naver} className="w-full h-11 flex items-center justify-center gap-3 bg-[#03C75A] text-white text-sm font-semibold hover:bg-[#02b351] transition-colors">
              <span className="font-extrabold text-base">N</span>
              네이버로 계속하기
            </a>
          )}
          {socialUrls.kakao && (
            <a href={socialUrls.kakao} className="w-full h-11 flex items-center justify-center gap-3 bg-[#FEE500] text-[#191919] text-sm font-semibold hover:bg-[#f5dc00] transition-colors">
              <KakaoIcon />
              카카오로 계속하기
            </a>
          )}
        </div>

        {(socialUrls.google || socialUrls.naver || socialUrls.kakao) && (
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400 font-medium">또는</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>
        )}

        {/* 이메일 로그인 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-xs text-red-500 bg-red-50 border border-red-100 px-4 py-2.5">{error}</div>
          )}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">이메일</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-11 px-4 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none transition-colors"
              placeholder="email@company.com"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-4 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none transition-colors"
              placeholder="6자 이상"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
            로그인
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          계정이 없으신가요?{' '}
          <Link href="/portal/register" className="text-neutral-900 font-bold hover:underline">회원가입</Link>
        </p>
        <p className="text-center mt-3">
          <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-600">← 홈으로 돌아가기</Link>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function KakaoIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#191919">
      <path d="M12 3C6.48 3 2 6.36 2 10.5c0 2.67 1.77 5.02 4.44 6.38l-.97 3.56c-.08.3.26.53.52.36l4.15-2.76c.59.08 1.21.12 1.86.12 5.52 0 10-3.36 10-7.5S17.52 3 12 3z" />
    </svg>
  )
}
