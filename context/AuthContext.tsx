'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { User } from '@/lib/types'

const AUTH_STORAGE_KEY = 'cuties-auth'

/**
 * Mock auth — replace with real auth (NextAuth, JWT API, etc.).
 * Login accepts any email/password for demo; in production validate against your backend.
 */
interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as User
    return parsed?.id && parsed?.email ? parsed : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(loadStoredUser())
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Replace with real API call: POST /api/auth/login
    if (!email.trim()) return false
    const name = email.split('@')[0]
    setUser({
      id: `user-${Date.now()}`,
      email: email.trim(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
    })
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
