'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { LogIn, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'

export function UserMenu() {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    if (status === 'loading') {
        return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    }

    if (!session) {
        return (
            <Link href="/login" className="imweb-btn imweb-btn-primary flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                로그인
            </Link>
        )
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
            >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {session.user?.name?.[0] || 'U'}
                </div>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-2 border-b">
                            <p className="font-medium text-sm truncate">{session.user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                        </div>

                        <Link
                            href="/projects"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            내 프로젝트
                        </Link>

                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            로그아웃
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
