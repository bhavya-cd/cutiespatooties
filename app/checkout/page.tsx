'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useCheckout } from '@/context/CheckoutContext'
import { formatRupees } from '@/lib/utils'
import type { ShippingAddress } from '@/lib/types'

const emptyShipping: ShippingAddress = {
  fullName: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, itemCount, isHydrated, getSubtotalRupees } = useCart()
  const { user, isAuthenticated, isLoading } = useAuth()
  const { createOrderAndGoToPayment } = useCheckout()
  const [shipping, setShipping] = useState<ShippingAddress>(() =>
    user ? { ...emptyShipping, fullName: user.name, email: user.email } : emptyShipping
  )
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({})

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated) {
      router.replace('/login?returnUrl=/checkout')
      return
    }
    if (user) {
      setShipping((s) => ({ ...s, fullName: user.name, email: user.email }))
    }
  }, [isAuthenticated, isLoading, router, user])

  useEffect(() => {
    if (!isAuthenticated || !isHydrated) return
    if (items.length === 0) {
      router.replace('/cart')
    }
  }, [isAuthenticated, isHydrated, items.length, router])

  if (isLoading || !isAuthenticated || !isHydrated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-valentine-charcoal/60">Loading…</p>
      </div>
    )
  }

  if (items.length === 0) {
    return null
  }

  const subtotal = getSubtotalRupees()

  const validate = (): boolean => {
    const e: typeof errors = {}
    if (!shipping.fullName?.trim()) e.fullName = 'Required'
    if (!shipping.phone?.trim()) e.phone = 'Required'
    if (!shipping.email?.trim()) e.email = 'Required'
    if (!shipping.addressLine1?.trim()) e.addressLine1 = 'Required'
    if (!shipping.city?.trim()) e.city = 'Required'
    if (!shipping.state?.trim()) e.state = 'Required'
    if (!shipping.pincode?.trim() || shipping.pincode.length !== 6) e.pincode = 'Valid 6-digit pincode'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const orderId = createOrderAndGoToPayment(shipping, items)
    router.push(`/checkout/payment?orderId=${orderId}`)
  }

  return (
    <div className="min-h-[60vh] max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-serif font-semibold text-valentine-charcoal mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <h2 className="text-lg font-medium text-valentine-charcoal mb-4">Shipping address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-valentine-charcoal mb-1">Full name</label>
              <input
                value={shipping.fullName}
                onChange={(e) => setShipping((s) => ({ ...s, fullName: e.target.value }))}
                className="w-full px-4 py-2.5 border border-valentine-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-valentine-burgundy"
                placeholder="Your name"
              />
              {errors.fullName && <p className="text-xs text-red-600 mt-0.5">{errors.fullName}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-valentine-charcoal mb-1">Phone</label>
                <input
                  type="tel"
                  value={shipping.phone}
                  onChange={(e) => setShipping((s) => ({ ...s, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-valentine-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-valentine-burgundy"
                  placeholder="10-digit mobile"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-0.5">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-valentine-charcoal mb-1">Email</label>
                <input
                  type="email"
                  value={shipping.email}
                  onChange={(e) => setShipping((s) => ({ ...s, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-valentine-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-valentine-burgundy"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-0.5">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-valentine-charcoal mb-1">Address line 1</label>
              <input
                value={shipping.addressLine1}
                onChange={(e) => setShipping((s) => ({ ...s, addressLine1: e.target.value }))}
                className="w-full px-4 py-2.5 border border-valentine-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-valentine-burgundy"
                placeholder="House / Building / Street"
              />
              {errors.addressLine1 && <p className="text-xs text-red-600 mt-0.5">{errors.addressLine1}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-valentine-charcoal mb-1">Address line 2 (optional)</label>
              <input
                value={shipping.addressLine2 || ''}
                onChange={(e) => setShipping((s) => ({ ...s, addressLine2: e.target.value }))}
                className="w-full px-4 py-2.5 border border-valentine-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-valentine-burgundy"
                placeholder="Landmark, etc."
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-valentine-charcoal mb-1">City</label>
                <input
                  value={shipping.city}
                  onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-valentine-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-valentine-burgundy"
                  placeholder="City"
                />
                {errors.city && <p className="text-xs text-red-600 mt-0.5">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-valentine-charcoal mb-1">State</label>
                <input
                  value={shipping.state}
                  onChange={(e) => setShipping((s) => ({ ...s, state: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-valentine-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-valentine-burgundy"
                  placeholder="State"
                />
                {errors.state && <p className="text-xs text-red-600 mt-0.5">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-valentine-charcoal mb-1">Pincode</label>
                <input
                  value={shipping.pincode}
                  onChange={(e) => setShipping((s) => ({ ...s, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                  className="w-full px-4 py-2.5 border border-valentine-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-valentine-burgundy"
                  placeholder="6 digits"
                  maxLength={6}
                />
                {errors.pincode && <p className="text-xs text-red-600 mt-0.5">{errors.pincode}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-valentine-blush bg-white p-6">
            <h2 className="text-lg font-medium text-valentine-charcoal mb-4">Order summary</h2>
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
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
            <div className="mt-4 pt-4 border-t border-valentine-blush">
              <div className="flex justify-between text-valentine-charcoal">
                <span>Subtotal</span>
                <span className="font-medium">{formatRupees(subtotal)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-valentine-burgundy text-white py-3 rounded-full font-medium hover:bg-valentine-rose transition-colors"
            >
              Continue to payment
            </button>
            <Link href="/cart" className="block mt-3 text-center text-sm text-valentine-rose hover:underline">
              Back to cart
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
