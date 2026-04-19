'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string | null
  role: string
  companyName: string | null
  avatarUrl: string | null
}

interface AuthCtx {
  user: User | null
  loading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthCtx>({
  user: null, loading: true, isAdmin: false,
  login: async () => ({}), logout: async () => {}, refresh: async () => {},
})

export function PortalAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/portal/auth/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/portal/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data.user)
      return {}
    }
    return { error: data.error }
  }

  const logout = async () => {
    await fetch('/api/portal/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/portal/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin: user?.role === 'admin', login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export const usePortalAuth = () => useContext(AuthContext)
