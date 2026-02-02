import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-valentine-blush/50 hover:border-valentine-blush transition-all duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
            <Image
            src={product.images?.[0] || '/assets/images/logo2.jpeg'}
            alt={product.title}
            width={400}
            height={420}
            className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover CTA */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
            <span className="bg-valentine-burgundy text-white px-6 py-3 rounded-full text-sm font-medium inline-block">
              View product
            </span>
          </div>
        </div>
      </Link>

      <Link href={`/products/${product.slug}`}>
        <div className="p-5">
          <h3 className="text-lg font-medium text-valentine-charcoal">{product.title}</h3>
          <p className="text-sm text-valentine-charcoal/60 mt-1">{product.shortDescription}</p>
        </div>
      </Link>
    </div>
  )
}

