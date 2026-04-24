import Link from 'next/link'

export default function PortalNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="text-6xl font-extrabold text-neutral-200 mb-4">404</div>
      <h1 className="text-xl font-extrabold mb-2">페이지를 찾을 수 없습니다</h1>
      <p className="text-sm text-neutral-500 mb-8">요청하신 포털 페이지가 존재하지 않습니다.</p>
      <Link
        href="/portal"
        className="h-10 px-6 bg-neutral-900 text-white font-bold text-sm flex items-center hover:bg-neutral-700 transition-colors"
      >
        대시보드로 돌아가기
      </Link>
    </div>
  )
}
