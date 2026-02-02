'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center">
        <p className="text-valentine-rose text-6xl mb-6">♥</p>
        <h1 className="text-3xl font-serif font-semibold text-valentine-charcoal mb-2">
          Thank you for your order
        </h1>
        <p className="text-valentine-charcoal/70 mb-2">
          We&apos;ve received your order and will get it ready for you.
        </p>
        {orderId && (
          <p className="text-valentine-charcoal/60 text-sm mb-8">
            Order number: <strong className="text-valentine-charcoal">{orderId}</strong>
          </p>
        )}
        <p className="text-valentine-charcoal/60 text-sm mb-8">
          You&apos;ll receive an email confirmation shortly with delivery details.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account/orders"
            className="inline-block bg-valentine-burgundy text-white px-6 py-3 rounded-full font-medium hover:bg-valentine-rose transition-colors"
          >
            View orders
          </Link>
          <Link
            href="/#shop"
            className="inline-block border-2 border-valentine-blush text-valentine-charcoal px-6 py-3 rounded-full font-medium hover:border-valentine-rose hover:text-valentine-rose transition-colors"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-block border-2 border-valentine-blush text-valentine-charcoal px-6 py-3 rounded-full font-medium hover:border-valentine-rose hover:text-valentine-rose transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
