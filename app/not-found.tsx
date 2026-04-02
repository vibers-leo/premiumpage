'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-blue-600">404</h1>
                    <h2 className="imweb-heading-2 mt-4 mb-2">페이지를 찾을 수 없습니다</h2>
                    <p className="imweb-body text-gray-600">
                        요청하신 페이지가 존재하지 않거나 이동되었습니다.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="imweb-btn imweb-btn-primary inline-flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        홈으로 가기
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="imweb-btn imweb-btn-secondary inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        이전 페이지
                    </button>
                </div>
            </div>
        </div>
    )
}
