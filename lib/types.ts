/**
 * Cart, Checkout & Order types — ready for real payment gateway integration.
 */

export interface CartItem {
  productId: string
  slug: string
  title: string
  price: string
  /** Numeric price in rupees for calculations & payment gateway (amount in paise = amountRupees * 100) */
  amountRupees: number
  image: string
  quantity: number
  size: string
}

export interface User {
  id: string
  email: string
  name: string
}

export interface ShippingAddress {
  fullName: string
  phone: string
  email: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
}

export interface OrderItem {
  productId: string
  slug: string
  title: string
  price: string
  amountRupees: number
  image: string
  quantity: number
  size: string
}

export interface Order {
  orderId: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  subtotalRupees: number
  /** In future: shipping, tax, discount */
  totalRupees: number
  status: 'pending' | 'paid' | 'failed'
  createdAt: string
}

/** Stored order with user reference for orders/transaction history */
export interface StoredOrder extends Order {
  userEmail: string
}
