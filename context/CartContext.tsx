'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CartItem } from '@/lib/types'

const CART_STORAGE_KEY = 'cuties-cart'

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  isHydrated: boolean
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  getSubtotalRupees: () => number
}

const CartContext = createContext<CartContextValue | null>(null)

function loadStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(loadStoredCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveCart(items)
  }, [items, hydrated])

  const addItem = useCallback(
    (input: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      const quantity = input.quantity ?? 1
      setItems((prev) => {
        const key = `${input.productId}-${input.size}`
        const existing = prev.find(
          (i) => i.productId === input.productId && i.size === input.size
        )
        if (existing) {
          return prev.map((i) =>
            i.productId === input.productId && i.size === input.size
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        }
        return [...prev, { ...input, quantity } as CartItem]
      })
    },
    []
  )

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }, [])

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, size)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size ? { ...i, quantity } : i
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const getSubtotalRupees = useCallback(
    () => items.reduce((sum, i) => sum + i.amountRupees * i.quantity, 0),
    [items]
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      isHydrated: hydrated,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getSubtotalRupees,
    }),
    [items, itemCount, hydrated, addItem, removeItem, updateQuantity, clearCart, getSubtotalRupees]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
