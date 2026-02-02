'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Order, ShippingAddress } from '@/lib/types'
import { CartItem } from '@/lib/types'
import { generateOrderId } from '@/lib/utils'

interface CheckoutContextValue {
  /** Order created at "Continue to Payment" — used on payment page and for success redirect */
  pendingOrder: Order | null
  setPendingOrder: (order: Order | null) => void
  /** Create order from cart items + shipping, then redirect to payment. Call this from checkout page. */
  createOrderAndGoToPayment: (shipping: ShippingAddress, items: CartItem[]) => string
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null)

  const createOrderAndGoToPayment = useCallback(
    (shipping: ShippingAddress, items: CartItem[]): string => {
      const subtotalRupees = items.reduce((s, i) => s + i.amountRupees * i.quantity, 0)
      const orderId = generateOrderId()
      const order: Order = {
        orderId,
        items: items.map((i) => ({
          productId: i.productId,
          slug: i.slug,
          title: i.title,
          price: i.price,
          amountRupees: i.amountRupees,
          image: i.image,
          quantity: i.quantity,
          size: i.size,
        })),
        shippingAddress: shipping,
        subtotalRupees,
        totalRupees: subtotalRupees,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      setPendingOrder(order)
      return orderId
    },
    []
  )

  const value = useMemo<CheckoutContextValue>(
    () => ({
      pendingOrder,
      setPendingOrder,
      createOrderAndGoToPayment,
    }),
    [pendingOrder, createOrderAndGoToPayment]
  )

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider')
  return ctx
}
