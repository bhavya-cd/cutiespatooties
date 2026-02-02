'use client'

import Link from 'next/link'
import { useOrders } from '@/context/OrdersContext'
import { formatRupees } from '@/lib/utils'

export default function AccountDashboardPage() {
  const { orders } = useOrders()
  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-valentine-charcoal mb-2">Dashboard</h1>
      <p className="text-valentine-charcoal/60 mb-8">Overview of your account.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-2xl border border-valentine-blush bg-white p-6">
          <p className="text-sm text-valentine-charcoal/60 mb-1">Total orders</p>
          <p className="text-2xl font-semibold text-valentine-charcoal">{orders.length}</p>
        </div>
        <div className="rounded-2xl border border-valentine-blush bg-white p-6">
          <p className="text-sm text-valentine-charcoal/60 mb-1">Paid orders</p>
          <p className="text-2xl font-semibold text-valentine-charcoal">
            {orders.filter((o) => o.status === 'paid').length}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-valentine-charcoal">Recent orders</h2>
          {orders.length > 0 && (
            <Link
              href="/account/orders"
              className="text-sm text-valentine-rose hover:underline"
            >
              View all
            </Link>
          )}
        </div>
        {recentOrders.length === 0 ? (
          <div className="rounded-2xl border border-valentine-blush bg-white p-8 text-center text-valentine-charcoal/60">
            <p className="text-valentine-rose text-4xl mb-2">♥</p>
            <p>No orders yet.</p>
            <Link href="/#shop" className="inline-block mt-3 text-valentine-rose hover:underline text-sm">
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {recentOrders.map((order) => (
              <li key={order.orderId}>
                <Link
                  href="/account/orders"
                  className="block rounded-xl border border-valentine-blush bg-white p-4 hover:border-valentine-rose/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-valentine-charcoal">Order #{order.orderId}</p>
                      <p className="text-sm text-valentine-charcoal/60">
                        {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-valentine-charcoal">{formatRupees(order.totalRupees)}</p>
                      <span
                        className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                          order.status === 'paid'
                            ? 'bg-valentine-blush text-valentine-rose'
                            : order.status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-valentine-blush/50 text-valentine-charcoal/70'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
