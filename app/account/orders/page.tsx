'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useOrders } from '@/context/OrdersContext'
import { formatRupees } from '@/lib/utils'

export default function OrdersPage() {
  const { orders } = useOrders()

  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-valentine-charcoal mb-2">My Orders</h1>
      <p className="text-valentine-charcoal/60 mb-8">View and track your orders.</p>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-valentine-blush bg-white p-12 text-center">
          <p className="text-valentine-rose text-5xl mb-4">♥</p>
          <p className="text-valentine-charcoal/70 mb-2">No orders yet</p>
          <p className="text-sm text-valentine-charcoal/60 mb-6">Your orders will appear here after you place them.</p>
          <Link
            href="/#shop"
            className="inline-block bg-valentine-burgundy text-white px-6 py-3 rounded-full font-medium hover:bg-valentine-rose transition-colors"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.orderId}
              className="rounded-2xl border border-valentine-blush bg-white overflow-hidden"
            >
              <div className="p-4 md:p-6 border-b border-valentine-blush flex flex-wrap justify-between items-center gap-2">
                <div>
                  <p className="font-semibold text-valentine-charcoal">Order #{order.orderId}</p>
                  <p className="text-sm text-valentine-charcoal/60">
                    Placed on {new Date(order.createdAt).toLocaleDateString(undefined, {
                      dateStyle: 'long',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                      order.status === 'paid'
                        ? 'bg-valentine-blush text-valentine-rose'
                        : order.status === 'failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-valentine-blush/50 text-valentine-charcoal/70'
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="font-semibold text-valentine-charcoal">{formatRupees(order.totalRupees)}</p>
                </div>
              </div>
              <ul className="divide-y divide-valentine-blush/50">
                {order.items.map((item, idx) => (
                  <li key={`${item.productId}-${item.size}-${idx}`} className="flex gap-4 p-4 md:p-6">
                    <Link href={`/products/${item.slug}`} className="relative w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden shrink-0 bg-valentine-blush/30">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link href={`/products/${item.slug}`} className="font-medium text-valentine-charcoal hover:text-valentine-rose transition-colors">
                        {item.title}
                      </Link>
                      <p className="text-sm text-valentine-charcoal/60 mt-0.5">
                        Size {item.size} × {item.quantity}
                      </p>
                      <p className="text-valentine-rose font-medium mt-1">{item.price}</p>
                    </div>
                    <p className="font-medium text-valentine-charcoal shrink-0">
                      {formatRupees(item.amountRupees * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="p-4 md:p-6 bg-valentine-blush/30 border-t border-valentine-blush">
                <p className="text-sm text-valentine-charcoal/70">
                  <span className="font-medium text-valentine-charcoal">Delivery:</span>{' '}
                  {order.shippingAddress.fullName}, {order.shippingAddress.addressLine1},{' '}
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
