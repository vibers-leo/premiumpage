export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    }

    return (
        <div className="flex items-center justify-center">
            <div
                className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
            />
        </div>
    )
}

export function PageLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 imweb-body text-gray-600">로딩 중...</p>
            </div>
        </div>
    )
}

export function SkeletonCard() {
    return (
        <div className="imweb-card animate-pulse">
            <div className="w-14 h-14 bg-gray-200 rounded-lg mb-6" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
    )
}
