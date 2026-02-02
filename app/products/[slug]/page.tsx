import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProducts } from '@/lib/products'
import ProductDetailClient from './ProductDetailClient'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  // Use local products for static params generation during build
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params

  // Fetch from Supabase
  let product = null
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        colors:product_colors(*)
      `)
      .eq('slug', slug)
      .single()

    if (!error && data) {
      // Map to frontend format
      product = {
        id: data.id,
        slug: data.slug,
        brand: data.brand,
        title: data.title,
        shortDescription: data.short_description,
        description: data.description,
        price: data.price,
        originalPrice: data.original_price,
        discount: data.discount,
        rating: data.rating,
        ratingCount: data.rating_count,
        sizes: data.sizes,
        availableSizes: data.available_sizes,
        images: data.images,
        whatsappMessage: data.whatsapp_message,
        colors: data.colors?.map((c: any) => ({
          name: c.name,
          image: c.image,
          slug: c.slug
        }))
      }
    } else {
      product = getProductBySlug(slug)
    }
  } catch (err) {
    product = getProductBySlug(slug)
  }

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
