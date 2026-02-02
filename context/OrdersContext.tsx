'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Order, StoredOrder } from '@/lib/types'
import { useAuth } from '@/context/AuthContext'

const ORDERS_STORAGE_KEY = 'cuties-orders'

interface OrdersContextValue {
  orders: Order[]
  addOrder: (order: Order) => void
}

const OrdersContext = createContext<OrdersContextValue | null>(null)

function loadAllOrders(): StoredOrder[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredOrder[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveAllOrders(orders: StoredOrder[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [allOrders, setAllOrders] = useState<StoredOrder[]>([])

  useEffect(() => {
    setAllOrders(loadAllOrders())
  }, [])

  useEffect(() => {
    saveAllOrders(allOrders)
  }, [allOrders])

  const orders = useMemo(() => {
    if (!isAuthenticated || !user?.email) return []
    return allOrders
      .filter((o) => o.userEmail === user.email)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [allOrders, isAuthenticated, user?.email])

  const addOrder = useCallback(
    (order: Order) => {
      if (!user?.email) return
      setAllOrders((prev) => [
        { ...order, userEmail: user.email },
        ...prev,
      ])
    },
    [user?.email]
  )

  const value = useMemo<OrdersContextValue>(
    () => ({ orders, addOrder }),
    [orders, addOrder]
  )

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider')
  return ctx
}
