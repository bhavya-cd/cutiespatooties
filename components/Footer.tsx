'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <footer className="mt-24 border-t border-valentine-blush/50 bg-white">
      {/* Newsletter - AURORA style */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center border-b border-valentine-blush/50">
        <h2 className="text-xs font-medium tracking-[0.3em] uppercase text-valentine-charcoal/70 mb-4">
          Join the Cutiespatooties Collective
        </h2>
        <p className="text-valentine-charcoal/70 text-sm max-w-md mx-auto mb-6">
          Be the first to know about new drops, offers, and updates.
        </p>
        {submitted ? (
          <p className="text-valentine-rose text-sm font-medium">Thanks for joining!</p>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 min-w-0 px-4 py-3 border border-valentine-blush rounded-md text-valentine-charcoal placeholder:text-valentine-charcoal/40 focus:outline-none focus:ring-2 focus:ring-valentine-burgundy focus:border-transparent text-sm"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-valentine-burgundy text-white text-sm font-medium tracking-wider uppercase rounded-md hover:bg-valentine-rose transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

      {/* Footer columns - AURORA style */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-valentine-charcoal mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-valentine-charcoal/70">
              <li><Link href="/cart" className="hover:text-valentine-charcoal transition-colors">Cart & Checkout</Link></li>
              <li><Link href="/account/orders" className="hover:text-valentine-charcoal transition-colors">Orders</Link></li>
              <li><span className="opacity-80">Shipping & Returns</span></li>
              <li><span className="opacity-80">FAQ</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-valentine-charcoal mb-4">About</h3>
            <ul className="space-y-2 text-sm text-valentine-charcoal/70">
              <li><Link href="#about" className="hover:text-valentine-charcoal transition-colors">Our Story</Link></li>
              <li><Link href="#shop" className="hover:text-valentine-charcoal transition-colors">Collection</Link></li>
              <li><Link href="#lookbook" className="hover:text-valentine-charcoal transition-colors">Lookbook</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-valentine-charcoal mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-valentine-charcoal/70">
              <li><span className="opacity-80">Instagram</span></li>
              <li><span className="opacity-80">Contact</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="border-t border-valentine-blush/50 py-6 text-center text-xs text-valentine-charcoal/60">
        <p>© 2026 Cutiespatooties.</p>
        <p className="mt-2">
          <Link href="#" className="hover:text-valentine-charcoal transition-colors">Privacy Policy</Link>
          <span className="mx-2">·</span>
          <Link href="#" className="hover:text-valentine-charcoal transition-colors">Terms of Service</Link>
        </p>
      </section>
    </footer>
  )
}
