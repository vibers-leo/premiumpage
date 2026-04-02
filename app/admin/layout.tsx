import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    LayoutDashboard,
    Users,
    Briefcase,
    MessageSquare,
    Settings,
    Home,
    Search,
    Bell,
    User
} from 'lucide-react'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    // 어드민 권한 체크 (role이 'admin'인 경우만 허용)
    // 현재는 편리함을 위해 로그인이 되어있으면 기본적으로 접근 가능하게 하되, 
    // 실제 운영시에는 if (session?.user?.role !== 'admin') 로 엄격하게 제한해야 합니다.
    if (!session?.user) {
        redirect('/login')
    }

    return (
        <div className="flex min-h-screen bg-[#050505] text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col sticky top-0 h-screen">
                <div className="p-6">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                            <span className="font-bold text-xl">P</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">Admin Page</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</p>
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition group">
                        <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
                        <span className="text-sm font-medium">대시보드</span>
                    </Link>

                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6">Management</p>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition group">
                        <Users className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                        <span className="text-sm font-medium">회원 관리</span>
                    </Link>
                    <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition group">
                        <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
                        <span className="text-sm font-medium">포트폴리오 관리</span>
                    </Link>
                    <Link href="/admin/quotes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition group">
                        <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-yellow-400" />
                        <span className="text-sm font-medium">견적/주문 관리</span>
                    </Link>

                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6">System</p>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition group">
                        <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-200" />
                        <span className="text-sm font-medium">설정</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-gray-400">
                        <Home className="w-5 h-5" />
                        <span className="text-sm font-medium">메인 사이트로</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="검색..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500/50 transition"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-white/5 text-gray-400 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-[#0a0a0a]"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-white/10 ml-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-medium text-white">{session.user.name}</p>
                                <p className="text-[10px] text-gray-500 capitalize">{session.user.role || 'Admin'}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-white/10">
                                <User className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
