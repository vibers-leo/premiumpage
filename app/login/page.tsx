'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/Loading'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.')
            } else {
                try {
                    const { auth } = await import('@/lib/firebase')
                    const { signInWithEmailAndPassword } = await import('firebase/auth')
                    await signInWithEmailAndPassword(auth, email, password)
                } catch (fbErr) {
                    console.warn('Firebase sync login failed:', fbErr)
                }

                router.push('/')
                router.refresh()
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="w-full max-w-sm">
                <div className="mb-10 text-center">
                    <div className="mx-auto w-10 h-10 border border-neutral-900 flex items-center justify-center text-neutral-900 font-extrabold text-sm mb-6">
                        P
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight">로그인</h1>
                    <p className="text-neutral-400 text-sm mt-2">Premium Page에 오신 것을 환영합니다</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        required
                        className="w-full h-11 px-4 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                        placeholder="이메일 주소"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        className="w-full h-11 px-4 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <div className="text-sm text-red-600 border border-red-200 bg-red-50 px-4 py-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 bg-neutral-900 text-white font-bold text-sm border border-neutral-900 hover:bg-neutral-700 disabled:opacity-40 transition-all flex items-center justify-center"
                    >
                        {isLoading ? <LoadingSpinner size="sm" /> : '로그인'}
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-400 mt-8">
                    계정이 없으신가요?{' '}
                    <Link href="/register" className="font-bold text-neutral-900 border-b border-neutral-900 pb-px hover:text-neutral-500 transition-colors">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    )
}
