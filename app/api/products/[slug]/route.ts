import { NextResponse } from 'next/server'
import { getProductBySlug } from '@/lib/products'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Try to fetch from Supabase
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        colors:product_colors(*)
      `)
      .eq('slug', slug)
      .single()

    if (error || !product) {
      console.log(`Supabase fetch failed for slug ${slug}, falling back to local data:`, error?.message)
      const localProduct = getProductBySlug(slug)

      if (!localProduct) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ product: localProduct }, { status: 200 })
    }

    // Map snake_case from DB to camelCase for Frontend
    const mappedProduct = {
      id: product.id,
      slug: product.slug,
      brand: product.brand,
      title: product.title,
      shortDescription: product.short_description,
      description: product.description,
      price: product.price,
      originalPrice: product.original_price,
      discount: product.discount,
      rating: product.rating,
      ratingCount: product.rating_count,
      sizes: product.sizes,
      availableSizes: product.available_sizes,
      images: product.images,
      whatsappMessage: product.whatsapp_message,
      colors: product.colors?.map((c: any) => ({
        name: c.name,
        image: c.image,
        slug: c.slug
      }))
    }

    return NextResponse.json({ product: mappedProduct }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

