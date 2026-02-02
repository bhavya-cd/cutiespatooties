'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCheckout } from '@/context/CheckoutContext'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrdersContext'
import { useAuth } from '@/context/AuthContext'
import { formatRupees } from '@/lib/utils'

/**
 * Payment page — ready for real gateway integration.
 *
 * INTEGRATION STEPS:
 * 1. Create API route (e.g. /api/checkout/create-payment) that:
 *    - Accepts orderId, amount in paise, customer email
 *    - Calls Stripe/Razorpay/PayU to create order or payment intent
 *    - Returns: { paymentId, clientSecret } (Stripe) or { orderId, razorpayOrderId } (Razorpay)
 * 2. Replace handlePayNow below with:
 *    - Call your API to get payment details
 *    - Open gateway (Stripe Elements, Razorpay checkout, or redirect to gateway URL)
 *    - On success callback: redirect to /checkout/success?orderId=xxx
 *    - On failure: show error, allow retry
 * 3. Configure your gateway's success/cancel URLs to point to:
 *    - Success: /checkout/success?orderId=xxx
 *    - Cancel: /checkout/payment?orderId=xxx
 */
export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get('orderId')
  const { pendingOrder, setPendingOrder } = useCheckout()
  const { clearCart } = useCart()
  const { addOrder } = useOrders()
  const { user } = useAuth()
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  const order = orderIdParam && pendingOrder?.orderId === orderIdParam ? pendingOrder : null

  useEffect(() => {
    if (!orderIdParam) {
      router.replace('/checkout')
      return
    }
    if (!pendingOrder || pendingOrder.orderId !== orderIdParam) {
      // User refreshed or came without going through checkout — redirect back
      router.replace('/checkout')
    }
  }, [orderIdParam, pendingOrder, router])

  const handlePayNow = async () => {
    if (!order) return
    setError('')
    setPaying(true)
    try {
      // --- PLUG IN YOUR PAYMENT GATEWAY HERE ---
      // Example flow:
      // const res = await fetch('/api/checkout/create-payment', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     orderId: order.orderId,
      //     amountPaise: order.totalRupees * 100,
      //     email: order.shippingAddress.email,
      //   }),
      // })
      // const data = await res.json()
      // if (data.url) window.location.href = data.url  // Razorpay redirect
      // if (data.clientSecret) { /* Stripe.confirmPayment(...) */ }

      // Simulate payment success (remove this when using real gateway)
      await new Promise((r) => setTimeout(r, 1200))
      const paidOrder = { ...order, status: 'paid' as const }
      addOrder(paidOrder)
      clearCart()
      setPendingOrder(null)
      router.push(`/checkout/success?orderId=${order.orderId}`)
    } catch (err) {
      setError('Payment failed. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  if (!order) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-valentine-charcoal/60">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-serif font-semibold text-valentine-charcoal mb-2">Payment</h1>
      <p className="text-valentine-charcoal/60 mb-8">Order #{order.orderId}</p>

      <div className="rounded-2xl border border-valentine-blush bg-white p-6 mb-6">
        <h2 className="text-lg font-medium text-valentine-charcoal mb-4">Order summary</h2>
        <ul className="space-y-3 mb-4">
          {order.items.map((item) => (
            <li key={`${item.productId}-${item.size}`} className="flex gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-valentine-blush/30 shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-valentine-charcoal truncate">{item.title}</p>
                <p className="text-xs text-valentine-charcoal/60">Size {item.size} × {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-valentine-charcoal shrink-0">
                {formatRupees(item.amountRupees * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <div className="pt-4 border-t border-valentine-blush flex justify-between">
          <span className="font-medium text-valentine-charcoal">Total</span>
          <span className="font-semibold text-valentine-charcoal">{formatRupees(order.totalRupees)}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-valentine-blush bg-white p-6 mb-6">
        <h2 className="text-lg font-medium text-valentine-charcoal mb-3">Delivery address</h2>
        <p className="text-sm text-valentine-charcoal/80">
          {order.shippingAddress.fullName}<br />
          {order.shippingAddress.addressLine1}
          {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}<br />
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
          {order.shippingAddress.phone} · {order.shippingAddress.email}
        </p>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handlePayNow}
        disabled={paying}
        className="w-full bg-valentine-burgundy text-white py-3.5 rounded-full font-medium hover:bg-valentine-rose transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {paying ? 'Processing…' : `Pay ${formatRupees(order.totalRupees)}`}
      </button>

      <p className="mt-4 text-center text-xs text-valentine-charcoal/50">
        Demo mode: clicking Pay will simulate success and redirect to confirmation.
        <br />
        For production: integrate Stripe, Razorpay, or PayU in the payment handler (see code comments).
      </p>

      <p className="mt-6 text-center">
        <Link href="/checkout" className="text-sm text-valentine-rose hover:underline">
          Back to checkout
        </Link>
      </p>
    </div>
  )
}
