'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import { parsePriceToRupees } from '@/lib/utils'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [pincode, setPincode] = useState('')
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      amountRupees: parsePriceToRupees(product.price),
      image: product.images[0] || '/assets/images/logo2.jpeg',
      quantity: 1,
      size: selectedSize,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleCheckDelivery = () => {
    if (pincode.length === 6) {
      setShowDeliveryInfo(true)
      setTimeout(() => setShowDeliveryInfo(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-valentine-cream">
      {/* Breadcrumb */}
      <div className="bg-valentine-blush/50 border-b border-valentine-blush">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-valentine-charcoal/70">
            <Link href="/" className="hover:text-valentine-burgundy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#shop" className="hover:text-valentine-burgundy transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-valentine-charcoal font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-valentine-blush/30 rounded-lg overflow-hidden border border-valentine-blush/50">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImageIndex === idx
                      ? 'border-valentine-burgundy'
                      : 'border-transparent hover:border-valentine-blush'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              {product.brand && (
                <p className="text-sm font-semibold text-valentine-rose mb-1">
                  {product.brand}
                </p>
              )}
              <h1 className="text-2xl md:text-3xl font-serif font-semibold text-valentine-charcoal mb-2">
                {product.title}
              </h1>
              <p className="text-sm text-valentine-charcoal/60">{product.shortDescription}</p>
            </div>

            {/* Ratings */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating!)
                          ? 'text-valentine-gold'
                          : 'text-valentine-blush'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {product.rating}
                </span>
                {product.ratingCount && (
                  <span className="text-sm text-gray-500">
                    ({product.ratingCount} Ratings)
                  </span>
                )}
              </div>
            )}

            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-valentine-charcoal">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-valentine-charcoal/50 line-through">
                      {product.originalPrice}
                    </span>
                    {product.discount && (
                      <span className="text-base font-semibold text-valentine-rose">
                        {product.discount}
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="text-xs text-valentine-charcoal/50">inclusive of all taxes</p>
            </div>

            {/* Color Variations */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <p className="text-sm font-medium text-valentine-charcoal mb-3">
                  More Colors
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <Link
                      key={color.slug}
                      href={`/products/${color.slug}`}
                      className="relative w-16 h-16 rounded-md overflow-hidden border-2 border-valentine-blush hover:border-valentine-burgundy transition"
                    >
                      <Image
                        src={color.image}
                        alt={color.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-valentine-charcoal">
                  SELECT SIZE
                </p>
                <button className="text-xs text-valentine-burgundy hover:underline">
                  SIZE CHART &gt;
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isAvailable = product.availableSizes?.includes(size) ?? true
                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      className={`px-6 py-2.5 rounded-md text-sm font-medium border-2 transition ${
                        selectedSize === size
                          ? 'border-valentine-burgundy bg-valentine-burgundy text-white'
                          : isAvailable
                          ? 'border-valentine-blush hover:border-valentine-burgundy text-valentine-charcoal'
                          : 'border-valentine-blush/50 text-valentine-charcoal/40 cursor-not-allowed'
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleAddToBag}
                className={`w-full px-6 py-3.5 rounded-md font-medium flex items-center justify-center gap-2 transition ${
                  addedToCart
                    ? 'bg-valentine-rose text-white'
                    : 'bg-valentine-burgundy hover:bg-valentine-rose text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {addedToCart ? 'Added to bag' : 'Add to bag'}
              </button>
              <Link
                href="/cart"
                className="text-center text-sm text-valentine-rose hover:underline"
              >
                View cart
              </Link>
            </div>

            {/* Delivery Options */}
            <div className="border-t border-valentine-blush pt-6 space-y-3">
              <p className="text-sm font-medium text-valentine-charcoal">DELIVERY OPTIONS</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="flex-1 px-4 py-2.5 border border-valentine-blush rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-valentine-burgundy focus:border-transparent"
                  maxLength={6}
                />
                <button
                  onClick={handleCheckDelivery}
                  className="px-6 py-2.5 bg-valentine-blush hover:bg-valentine-rose/20 text-valentine-charcoal rounded-md text-sm font-medium transition"
                >
                  Check
                </button>
              </div>
              {showDeliveryInfo && (
                <p className="text-xs text-valentine-rose">
                  ✓ Delivery available! Estimated delivery: 3-5 business days
                </p>
              )}
              <p className="text-xs text-valentine-charcoal/60">
                Please enter PIN code to check delivery time & Pay on Delivery Availability
              </p>
            </div>

            {/* Product Guarantees */}
            <div className="border-t border-valentine-blush pt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-valentine-charcoal">
                <svg className="w-5 h-5 text-valentine-rose" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100% Original Products</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-valentine-charcoal">
                <svg className="w-5 h-5 text-valentine-rose" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Pay on delivery might be available</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-valentine-charcoal">
                <svg className="w-5 h-5 text-valentine-rose" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Easy 7 days returns and exchanges</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-valentine-blush pt-6">
              <h3 className="text-base font-medium text-valentine-charcoal mb-2">Product Details</h3>
              <p className="text-sm text-valentine-charcoal/70 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

