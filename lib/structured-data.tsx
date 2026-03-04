import { FC } from 'react'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Product' | 'BreadcrumbList'
  data: Record<string, any>
}

export const StructuredData: FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cutiespatooties Outfits',
    url: 'https://cutiespatooties.in',
    logo: 'https://cutiespatooties.in/logo.png',
    description: 'Everyday outfits designed to make you feel effortlessly you.',
    sameAs: [
      'https://www.instagram.com/cutiespatooties',
      'https://www.facebook.com/cutiespatooties',
      'https://twitter.com/cutiespatooties',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@cutiespatooties.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const WebSiteSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://cutiespatooties.in',
    name: 'Cutiespatooties Outfits',
    description: 'Everyday outfits designed to make you feel effortlessly you.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cutiespatooties.in/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const ProductSchema = ({
  name,
  description,
  price,
  currency,
  image,
  rating,
  ratingCount,
  availability,
  brand,
}: {
  name: string
  description: string
  price: number
  currency: string
  image: string
  rating?: number
  ratingCount?: number
  availability: string
  brand: string
}) => {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      url: typeof window !== 'undefined' ? window.location.href : '',
      priceCurrency: currency,
      price: price.toString(),
      availability: `https://schema.org/${availability}`,
    },
    ...(rating && ratingCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toString(),
        reviewCount: ratingCount.toString(),
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const BreadcrumbSchema = (items: { name: string; url: string }[]) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
