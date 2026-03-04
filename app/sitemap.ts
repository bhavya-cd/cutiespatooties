import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { getAllProducts } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cutiespatooties.com'

  // Fetch all products for dynamic routes
  let products = []
  try {
    const { data, error } = await supabase
      .from('products')
      .select('slug, updated_at')

    if (!error && data) {
      products = data
    } else {
      products = getAllProducts().map(p => ({ slug: p.slug, updated_at: new Date().toISOString() }))
    }
  } catch (err) {
    products = getAllProducts().map(p => ({ slug: p.slug, updated_at: new Date().toISOString() }))
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
