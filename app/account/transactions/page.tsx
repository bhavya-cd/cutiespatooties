'use client'

import Link from 'next/link'
import { useOrders } from '@/context/OrdersContext'
import { formatRupees } from '@/lib/utils'

export default function TransactionsPage() {
  const { orders } = useOrders()
  const transactions = orders.map((o) => ({
    id: o.orderId,
    orderId: o.orderId,
    amount: o.totalRupees,
    status: o.status,
    date: o.createdAt,
    itemCount: o.items.length,
  }))

  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-valentine-charcoal mb-2">Transaction History</h1>
      <p className="text-valentine-charcoal/60 mb-8">Payment and order history.</p>

      {transactions.length === 0 ? (
        <div className="rounded-2xl border border-valentine-blush bg-white p-12 text-center">
          <p className="text-valentine-rose text-5xl mb-4">♥</p>
          <p className="text-valentine-charcoal/70 mb-2">No transactions yet</p>
          <p className="text-sm text-valentine-charcoal/60 mb-6">Transactions will appear here after you complete a purchase.</p>
          <Link
            href="/#shop"
            className="inline-block bg-valentine-burgundy text-white px-6 py-3 rounded-full font-medium hover:bg-valentine-rose transition-colors"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-valentine-blush bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-valentine-blush bg-valentine-blush/30">
                  <th className="px-4 py-3 text-sm font-medium text-valentine-charcoal">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-valentine-charcoal">Order ID</th>
                  <th className="px-4 py-3 text-sm font-medium text-valentine-charcoal">Items</th>
                  <th className="px-4 py-3 text-sm font-medium text-valentine-charcoal">Amount</th>
                  <th className="px-4 py-3 text-sm font-medium text-valentine-charcoal">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-valentine-charcoal w-20" />
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-valentine-blush/50 hover:bg-valentine-blush/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-valentine-charcoal/80">
                      {new Date(tx.date).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-valentine-charcoal">{tx.orderId}</td>
                    <td className="px-4 py-3 text-sm text-valentine-charcoal/70">{tx.itemCount} item(s)</td>
                    <td className="px-4 py-3 text-sm font-medium text-valentine-charcoal">{formatRupees(tx.amount)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                          tx.status === 'paid'
                            ? 'bg-valentine-blush text-valentine-rose'
                            : tx.status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-valentine-blush/50 text-valentine-charcoal/70'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href="/account/orders"
                        className="text-sm text-valentine-rose hover:underline"
                      >
                        View order
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
