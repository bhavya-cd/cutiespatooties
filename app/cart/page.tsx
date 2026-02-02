'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatRupees } from '@/lib/utils'

export default function CartPage() {
  const { items, itemCount, updateQuantity, removeItem, getSubtotalRupees } = useCart()
  const subtotal = getSubtotalRupees()

  if (itemCount === 0) {
    return (
      <div className="min-h-[60vh] max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-valentine-rose text-5xl mb-4">♥</p>
        <h1 className="text-2xl font-serif font-semibold text-valentine-charcoal mb-2">Your bag is empty</h1>
        <p className="text-valentine-charcoal/60 mb-8">Add something you love.</p>
        <Link
          href="/#shop"
          className="inline-block bg-valentine-burgundy text-white px-6 py-3 rounded-full font-medium hover:bg-valentine-rose transition-colors"
        >
          Shop collection
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-serif font-semibold text-valentine-charcoal mb-8">Your bag</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex gap-4 md:gap-6 p-4 rounded-2xl bg-white border border-valentine-blush/50"
          >
            <Link href={`/products/${item.slug}`} className="relative w-24 h-28 md:w-28 md:h-32 rounded-lg overflow-hidden shrink-0 bg-valentine-blush/30">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="font-medium text-valentine-charcoal hover:text-valentine-rose transition-colors">
                {item.title}
              </Link>
              <p className="text-sm text-valentine-charcoal/60 mt-0.5">Size: {item.size}</p>
              <p className="text-valentine-rose font-medium mt-1">{item.price}</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border border-valentine-blush rounded-md">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-valentine-charcoal hover:bg-valentine-blush/50 transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-valentine-charcoal hover:bg-valentine-blush/50 transition"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.size)}
                  className="text-sm text-valentine-charcoal/60 hover:text-valentine-rose transition-colors underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-medium text-valentine-charcoal">
                {formatRupees(item.amountRupees * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-valentine-blush">
        <div className="flex justify-between items-center mb-6">
          <span className="text-valentine-charcoal/70">Subtotal</span>
          <span className="font-semibold text-valentine-charcoal">{formatRupees(subtotal)}</span>
        </div>
        <Link
          href="/checkout"
          className="block w-full md:w-auto text-center bg-valentine-burgundy text-white px-8 py-3.5 rounded-full font-medium hover:bg-valentine-rose transition-colors"
        >
          Proceed to checkout
        </Link>
        <p className="mt-4 text-sm text-valentine-charcoal/60">
          <Link href="/#shop" className="hover:text-valentine-rose transition-colors">Continue shopping</Link>
        </p>
      </div>
    </div>
  )
}
