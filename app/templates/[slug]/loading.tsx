import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 스켈레톤 */}
      <div className="sticky top-0 z-50 bg-white/95 border-b h-20">
        <div className="imweb-container h-full flex items-center justify-between">
          <Skeleton className="h-10 w-40" />
          <div className="hidden md:flex gap-8">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>

      <div className="imweb-container py-8">
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      <div className="imweb-container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 왼쪽 정보 스켈레톤 */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />

            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Skeleton className="h-14 w-48 rounded-full" />
              <Skeleton className="h-14 w-32 rounded-full" />
            </div>
          </div>

          {/* 오른쪽 프리뷰 스켈레톤 */}
          <Skeleton className="w-full aspect-[4/3] rounded-xl" />
        </div>
      </div>
    </div>
  )
}
