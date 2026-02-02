'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

export default function Navbar() {
  const { itemCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-valentine-blush/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-6">
        {/* Logo - left */}
        <Link href="/" className="shrink-0">
          <h1 className="text-lg md:text-xl font-serif font-semibold tracking-[0.2em] uppercase text-valentine-charcoal hover:text-valentine-rose transition-colors">
            Cutiespatooties
          </h1>
        </Link>

        {/* Centered nav - AURORA style */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-valentine-charcoal/80 flex-1">
          <Link href="#shop" className="hover:text-valentine-charcoal transition-colors">New Arrivals</Link>
          <Link href="#shop" className="hover:text-valentine-charcoal transition-colors">Collection</Link>
          <Link href="#lookbook" className="hover:text-valentine-charcoal transition-colors">Lookbook</Link>
          <Link href="#about" className="hover:text-valentine-charcoal transition-colors">Journal</Link>
        </nav>

        {/* Top right: Search, Wishlist, Account, Cart - icon row */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <button
            type="button"
            className="p-2.5 text-valentine-charcoal hover:text-valentine-rose transition-colors rounded-full hover:bg-valentine-blush/30"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <Link
            href="#shop"
            className="p-2.5 text-valentine-charcoal hover:text-valentine-rose transition-colors rounded-full hover:bg-valentine-blush/30"
            aria-label="Wishlist"
          >
            <HeartIcon />
          </Link>
          {isAuthenticated && user ? (
            <>
              <Link
                href="/account"
                className="p-2.5 text-valentine-charcoal hover:text-valentine-rose transition-colors rounded-full hover:bg-valentine-blush/30"
                aria-label="Account"
              >
                <UserIcon />
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden md:block text-xs font-medium tracking-wider uppercase text-valentine-charcoal/70 hover:text-valentine-rose px-2 py-1"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="p-2.5 text-valentine-charcoal hover:text-valentine-rose transition-colors rounded-full hover:bg-valentine-blush/30"
              aria-label="Login"
            >
              <UserIcon />
            </Link>
          )}
          <Link
            href="/cart"
            className="relative p-2.5 text-valentine-charcoal hover:text-valentine-rose transition-colors rounded-full hover:bg-valentine-blush/30"
            aria-label={`Cart, ${itemCount} items`}
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full bg-valentine-burgundy text-white text-[10px] flex items-center justify-center font-medium">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
