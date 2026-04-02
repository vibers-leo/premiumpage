'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
                        <AlertTriangle className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="imweb-heading-2 mb-2">문제가 발생했습니다</h1>
                    <p className="imweb-body text-gray-600">
                        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                    </p>
                    {error.digest && (
                        <p className="imweb-body-sm text-gray-500 mt-4">
                            오류 코드: {error.digest}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="imweb-btn imweb-btn-primary inline-flex items-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        다시 시도
                    </button>
                    <Link href="/" className="imweb-btn imweb-btn-secondary inline-flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        홈으로 가기
                    </Link>
                </div>
            </div>
        </div>
    )
}
