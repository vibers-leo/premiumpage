'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { PortalAuthProvider, usePortalAuth } from '@/components/portal-auth-context'
import { LayoutDashboard, ShoppingCart, Plus, LogOut, Shield, Loader2, User, Menu, X } from 'lucide-react'

function PortalShell({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, logout } = usePortalAuth()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { setMobileOpen(false) }, [pathname])

  // 로그인/회원가입 페이지는 셸 없이 렌더
  if (pathname?.startsWith('/portal/login') || pathname?.startsWith('/portal/register')) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    )
  }

  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/portal/login'
    return null
  }

  const navItems = [
    { href: '/portal', label: '대시보드', icon: LayoutDashboard },
    { href: '/portal/orders', label: '내 프로젝트', icon: ShoppingCart },
    { href: '/portal/orders/new', label: '새 의뢰', icon: Plus },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 상단 바 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 h-14">
        <div className="flex items-center justify-between h-full px-6 max-w-screen-xl mx-auto">
          <Link href="/portal" className="text-base font-extrabold tracking-tight text-neutral-900 uppercase">
            Premium Page
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-semibold px-4 py-1.5 flex items-center gap-2 transition-all ${
                  pathname === item.href
                    ? 'text-neutral-900 border border-neutral-900'
                    : 'text-neutral-500 border border-transparent hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/portal/admin"
                className={`text-[13px] font-semibold px-4 py-1.5 flex items-center gap-2 transition-all ${
                  pathname?.startsWith('/portal/admin')
                    ? 'text-neutral-900 border border-neutral-900'
                    : 'text-neutral-500 border border-transparent hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                관리자
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">{user.name || user.email}</span>
            </div>
            <button
              onClick={logout}
              className="text-neutral-400 hover:text-neutral-900 transition-colors p-1.5 hidden md:block"
              title="로그아웃"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 border border-transparent hover:border-neutral-300 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white">
            <div className="px-6 py-4 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 text-sm font-bold py-2.5 px-4 border-l-2 transition-all ${
                    pathname === item.href
                      ? 'text-neutral-900 border-neutral-900'
                      : 'text-neutral-500 border-transparent hover:border-neutral-300 hover:text-neutral-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/portal/admin"
                  className={`flex items-center gap-3 text-sm font-bold py-2.5 px-4 border-l-2 transition-all ${
                    pathname?.startsWith('/portal/admin')
                      ? 'text-neutral-900 border-neutral-900'
                      : 'text-neutral-500 border-transparent hover:border-neutral-300 hover:text-neutral-900'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  관리자
                </Link>
              )}
              <div className="pt-3 mt-2 border-t border-neutral-200">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 text-sm font-medium text-neutral-500 hover:text-neutral-900 py-2.5 px-4 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <main className="pt-14 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalAuthProvider>
      <Script src="https://js.tosspayments.com/v2/standard" strategy="afterInteractive" />
      <PortalShell>{children}</PortalShell>
    </PortalAuthProvider>
  )
}
