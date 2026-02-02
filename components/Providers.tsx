'use client'

import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { CheckoutProvider } from '@/context/CheckoutContext'
import { OrdersProvider } from '@/context/OrdersContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  )
}
