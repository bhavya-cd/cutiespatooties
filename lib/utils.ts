/**
 * Parse price string like "₹1,199" or "₹899" to number (rupees).
 * Used for cart total and payment gateway amount (paise = rupees * 100).
 */
export function parsePriceToRupees(priceStr: string): number {
  const cleaned = priceStr.replace(/[₹,\s]/g, '')
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

export function formatRupees(rupees: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees)
}

export function generateOrderId(): string {
  const prefix = 'CP'
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `${prefix}-${year}-${random}`
}
