import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, LogOut, LayoutDashboard, LogIn } from 'lucide-react'
import { Button } from './ui/button'

export function MobileNav() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const menuItems = [
        { label: '템플릿', href: '#templates' },
        { label: '요금제', href: '#pricing' },
        { label: '기능', href: '#features' },
    ]

    return (
        <div className="md:hidden">
            {/* 햄버거 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="메뉴 열기"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* 모바일 메뉴 */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* 오버레이 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        />

                        {/* 메뉴 패널 */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-white border-l z-50 overflow-y-auto"
                        >
                            {/* 헤더 */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                                        P
                                    </div>
                                    <span className="font-bold text-xl text-gray-900">Premium Page</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                                    aria-label="메뉴 닫기"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* 사용자 정보 (로그인 시) */}
                            {session && (
                                <div className="p-6 bg-gray-50 border-b">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {session.user?.name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{session.user?.name}</p>
                                            <p className="text-xs text-gray-500">{session.user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 메뉴 아이템 */}
                            <nav className="p-6 space-y-2">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-between p-4 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all group"
                                        >
                                            <span className="text-lg font-semibold">{item.label}</span>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>
                                ))}

                                {session ? (
                                    <>
                                        <Link
                                            href="/projects"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-between p-4 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <LayoutDashboard className="w-5 h-5" />
                                                <span className="text-lg font-semibold">내 프로젝트</span>
                                            </div>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center gap-2 p-4 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span className="text-lg font-semibold">로그아웃</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <LogIn className="w-5 h-5" />
                                            <span className="text-lg font-semibold">로그인</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </nav>

                            {/* CTA 버튼 */}
                            <div className="p-6 border-t">
                                <Button
                                    asChild
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 font-bold text-white shadow-lg shadow-blue-200"
                                >
                                    <Link href="/quote" onClick={() => setIsOpen(false)}>
                                        시작하기
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
