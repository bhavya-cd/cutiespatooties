'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const sidebarLinks = [
  { href: '/account', label: 'Dashboard' },
  { href: '/account/orders', label: 'My Orders' },
  { href: '/account/transactions', label: 'Transaction History' },
]

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading, user, logout } = useAuth()

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated) {
      router.replace('/login?returnUrl=/account')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-valentine-charcoal/60">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Sidebar */}
        <aside className="md:w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <div className="mb-6">
              <p className="text-sm text-valentine-charcoal/60">Account</p>
              <p className="font-medium text-valentine-charcoal truncate">{user?.name}</p>
              <p className="text-xs text-valentine-charcoal/50 truncate">{user?.email}</p>
            </div>
            <nav className="space-y-0.5">
              {sidebarLinks.map(({ href, label }) => {
                const isActive = pathname === href || (href !== '/account' && pathname.startsWith(href))
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-valentine-blush text-valentine-burgundy'
                        : 'text-valentine-charcoal/80 hover:bg-valentine-blush/50 hover:text-valentine-charcoal'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
            <div className="pt-4 mt-4 border-t border-valentine-blush">
              <button
                type="button"
                onClick={logout}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-valentine-charcoal/80 hover:bg-valentine-blush/50 hover:text-valentine-rose transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
