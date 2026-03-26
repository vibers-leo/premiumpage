'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/Loading'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess(false)

        try {
            const { auth } = await import('@/lib/firebase')
            const { sendPasswordResetEmail } = await import('firebase/auth')
            await sendPasswordResetEmail(auth, email)
            setSuccess(true)
        } catch (err: any) {
            if (err.code === 'auth/user-not-found') {
                setError('등록되지 않은 이메일 주소입니다.')
            } else if (err.code === 'auth/invalid-email') {
                setError('올바른 이메일 주소를 입력해 주세요.')
            } else if (err.code === 'auth/too-many-requests') {
                setError('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.')
            } else {
                setError('비밀번호 재설정 이메일 전송에 실패했습니다.')
            }
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
                        비밀번호 찾기
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        가입한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다
                    </p>
                </div>

                {success ? (
                    <div className="space-y-6">
                        <div className="text-center bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                            <p className="text-green-500 text-sm font-medium">
                                비밀번호 재설정 이메일을 전송했습니다.
                            </p>
                            <p className="text-muted-foreground text-xs mt-2">
                                이메일의 링크를 클릭하여 비밀번호를 재설정해 주세요.
                                <br />
                                이메일이 도착하지 않으면 스팸함을 확인해 주세요.
                            </p>
                        </div>
                        <div className="text-center">
                            <Link
                                href="/login"
                                className="font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                로그인으로 돌아가기
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm">
                                <input
                                    type="email"
                                    required
                                    className="imweb-input w-full"
                                    placeholder="이메일 주소"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                                    {isLoading ? <LoadingSpinner size="sm" /> : '재설정 링크 전송'}
                                </button>
                            </div>
                        </form>

                        <div className="text-center text-sm">
                            <p className="text-muted-foreground">
                                비밀번호가 기억나셨나요?{' '}
                                <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                                    로그인
                                </Link>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
