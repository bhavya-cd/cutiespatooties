'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') || '/'
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) router.replace(returnUrl)
  }, [isAuthenticated, returnUrl, router])

  if (isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const ok = await login(email, password)
      if (ok) {
        router.push(returnUrl)
      } else {
        setError('Please enter a valid email.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-valentine-rose text-4xl mb-2">♥</p>
          <h1 className="text-2xl font-serif font-semibold text-valentine-charcoal">Welcome back</h1>
          <p className="text-valentine-charcoal/60 text-sm mt-1">Sign in to checkout and manage your orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-valentine-charcoal mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border border-valentine-blush rounded-lg text-valentine-charcoal placeholder:text-valentine-charcoal/40 focus:outline-none focus:ring-2 focus:ring-valentine-burgundy focus:border-transparent"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-valentine-charcoal mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-valentine-blush rounded-lg text-valentine-charcoal placeholder:text-valentine-charcoal/40 focus:outline-none focus:ring-2 focus:ring-valentine-burgundy focus:border-transparent"
              autoComplete="current-password"
            />
            <p className="mt-1.5 text-xs text-valentine-charcoal/50">
              Demo: any email and password will work.
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-valentine-burgundy text-white py-3 rounded-full font-medium hover:bg-valentine-rose transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-valentine-charcoal/60">
          Don&apos;t have an account?{' '}
          <span className="text-valentine-charcoal">Use any email to sign in for demo.</span>
        </p>
        <p className="mt-4 text-center">
          <Link href="/" className="text-sm text-valentine-rose hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center"><p className="text-valentine-charcoal/60">Loading…</p></div>}>
      <LoginForm />
    </Suspense>
  )
}
