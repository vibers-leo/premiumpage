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
            // 1. Firebase Auth에 사용자 생성
            const { auth } = await import('@/lib/firebase')
            const { createUserWithEmailAndPassword } = await import('firebase/auth')

            let firebaseUser;
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                firebaseUser = userCredential.user
            } catch (fbErr: any) {
                if (fbErr.code === 'auth/email-already-in-use') {
                    throw new Error('이미 사용 중인 이메일입니다.')
                }
                throw fbErr
            }

            // 2. 우리 DB에 정보 저장 및 Firebase UID 연동
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    firebaseUid: firebaseUser.uid // 연동을 위해 UID 전달
                })
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || '내부 데이터베이스 저장 실패')
            }

            router.push('/login')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl mb-6">
                        P
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        회원가입
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        새로운 계정을 생성하세요
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            name="name"
                            type="text"
                            required
                            className="imweb-input"
                            placeholder="이름"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            name="email"
                            type="email"
                            required
                            className="imweb-input"
                            placeholder="이메일 주소"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            name="password"
                            type="password"
                            required
                            className="imweb-input"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            className="imweb-input"
                            placeholder="비밀번호 확인"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full imweb-btn imweb-btn-primary flex justify-center py-3"
                        >
                            {isLoading ? <LoadingSpinner size="sm" /> : '회원가입'}
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        이미 계정이 있으신가요?{' '}
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
