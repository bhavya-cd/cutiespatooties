/**
 * SEO Utilities for Cutiespatooties
 * Provides helper functions for SEO implementation
 */

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cutiespatooties.com'
  return `${baseUrl}${path}`
}

export const truncateDescription = (text: string, length: number = 160): string => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

export const generateMetaDescription = (title: string, brand?: string): string => {
  if (brand) {
    return `Shop ${title} by ${brand} at Cutiespatooties - Everyday outfits designed to make you feel effortlessly you.`
  }
  return `${title} | Cutiespatooties - Everyday fashion for everyday moments.`
}

export const generateKeywords = (
  productTitle: string,
  brand?: string,
  category?: string
): string[] => {
  const keywords = [productTitle, 'fashion', 'clothing', 'outfit']
  if (brand) keywords.push(brand)
  if (category) keywords.push(category)
  keywords.push('cutiespatooties', 'everyday wear', 'comfort fashion')
  // Remove duplicates using filter
  return keywords.filter((keyword, index) => keywords.indexOf(keyword) === index)
}

export const getImageUrl = (image: string | null): string => {
  if (!image) return 'https://cutiespatooties.com/og-image.jpg'
  if (image.startsWith('http')) return image
  return `https://cutiespatooties.com/${image}`
}

export const generateBreadcrumbs = (
  pagePath: string
): { name: string; url: string }[] => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cutiespatooties.com'
  const breadcrumbs = [{ name: 'Home', url: baseUrl }]

  const segments = pagePath.split('/').filter(Boolean)
  let currentPath = ''

  for (const segment of segments) {
    currentPath += `/${segment}`
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    breadcrumbs.push({
      name,
      url: `${baseUrl}${currentPath}`,
    })
  }

  return breadcrumbs
}

/**
 * Validate SEO on a page
 */
export const validatePageSEO = (metadata: {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}): string[] => {
  const issues = []

  if (!metadata.title || metadata.title.length < 30) {
    issues.push('Title should be at least 30 characters')
  }
  if (metadata.title && metadata.title.length > 60) {
    issues.push('Title should be less than 60 characters')
  }

  if (!metadata.description || metadata.description.length < 50) {
    issues.push('Description should be at least 50 characters')
  }
  if (metadata.description && metadata.description.length > 160) {
    issues.push('Description should be less than 160 characters')
  }

  if (!metadata.keywords || metadata.keywords.length < 3) {
    issues.push('Should have at least 3 keywords')
  }

  if (!metadata.ogImage) {
    issues.push('Should have an Open Graph image')
  }

  return issues
}

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
