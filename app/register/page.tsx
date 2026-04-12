'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/Loading'

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.')
            setIsLoading(false)
            return
        }

        try {
            const { auth } = await import('@/lib/firebase')
            const { createUserWithEmailAndPassword } = await import('firebase/auth')

            let firebaseUser;
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                firebaseUser = userCredential.user
            } catch (fbErr: any) {
                if (fbErr.code === 'auth/email-already-in-use') {
                    throw new Error('이미 사용 중인 이메일입니다.')
                }
                throw fbErr
            }

            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    firebaseUid: firebaseUser.uid
                })
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || '회원가입에 실패했습니다.')
            }

            router.push('/login')
        } catch (err: any) {
            setError(err.message)
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
                    <h1 className="text-2xl font-extrabold tracking-tight">회원가입</h1>
                    <p className="text-neutral-400 text-sm mt-2">새로운 계정을 만들어보세요</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        type="text"
                        required
                        className="w-full h-11 px-4 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                        placeholder="이름"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full h-11 px-4 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                        placeholder="이메일 주소"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        required
                        className="w-full h-11 px-4 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="w-full h-11 px-4 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                        placeholder="비밀번호 확인"
                        value={formData.confirmPassword}
                        onChange={handleChange}
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
                        {isLoading ? <LoadingSpinner size="sm" /> : '회원가입'}
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-400 mt-8">
                    이미 계정이 있으신가요?{' '}
                    <Link href="/login" className="font-bold text-neutral-900 border-b border-neutral-900 pb-px hover:text-neutral-500 transition-colors">
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    )
}
