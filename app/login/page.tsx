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
            // 1. NextAuth 로그인 (세션 관리용)
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.')
            } else {
                // 2. Firebase Auth 로그인 (클라이언트 사이드 Storage/Firestore 권한용)
                try {
                    const { auth } = await import('@/lib/firebase')
                    const { signInWithEmailAndPassword } = await import('firebase/auth')
                    await signInWithEmailAndPassword(auth, email, password)
                } catch (fbErr) {
                    console.warn('Firebase sync login failed:', fbErr)
                    // 계정 동기화 전의 구사용자인 경우 등... 여기서는 무시하거나 세션 유지
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
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 glass-card p-8 rounded-xl shadow-2xl">
                <div>
                    <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-blue-500/30">
                        P
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
                        로그인
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Premium Page에 오신 것을 환영합니다
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <input
                                type="email"
                                required
                                className="imweb-input w-full"
                                placeholder="이메일 주소"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="imweb-input w-full"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded border border-destructive/20">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full imweb-btn imweb-btn-primary flex justify-center py-3 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        >
                            {isLoading ? <LoadingSpinner size="sm" /> : '로그인'}
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <p className="text-muted-foreground">
                        계정이 없으신가요?{' '}
                        <Link href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
                            회원가입
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
