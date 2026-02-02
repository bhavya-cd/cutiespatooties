import { NextResponse } from 'next/server'
import { getAllProducts } from '@/lib/products'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Try to fetch from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        colors:product_colors(*)
      `)

    if (error || !products || products.length === 0) {
      console.log('Supabase fetch failed or empty, falling back to local data:', error?.message)
      const localProducts = getAllProducts()
      return NextResponse.json({ products: localProducts }, { status: 200 })
    }

    // Map snake_case from DB to camelCase for Frontend
    const mappedProducts = products.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      brand: p.brand,
      title: p.title,
      shortDescription: p.short_description,
      description: p.description,
      price: p.price,
      originalPrice: p.original_price,
      discount: p.discount,
      rating: p.rating,
      ratingCount: p.rating_count,
      sizes: p.sizes,
      availableSizes: p.available_sizes,
      images: p.images,
      whatsappMessage: p.whatsapp_message,
      colors: p.colors?.map((c: any) => ({
        name: c.name,
        image: c.image,
        slug: c.slug
      }))
    }))

    return NextResponse.json({ products: mappedProducts }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

